import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    // Parse FormData for file uploads
    const formData = await request.formData();
    
    const fullName = formData.get('fullName') as string;
    const phone = formData.get('phone') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;
    const gdprConsent = formData.get('gdprConsent') as string;
    const attachments = formData.getAll('attachments') as File[];

    // Debug: Log environment variables (remove in production)
    console.log('Environment variables:', {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_USER: process.env.SMTP_USER,
      SMTP_PASS: process.env.SMTP_PASS ? '***SET***' : 'NOT SET',
      SMTP_FROM: process.env.SMTP_FROM,
      CONTACT_EMAIL: process.env.CONTACT_EMAIL
    });

    // Validate required fields
    if (!fullName || !phone || !email || !message || !gdprConsent) {
      console.log('Validation failed:', { fullName, phone, email, message, gdprConsent });
      return NextResponse.json(
        { error: 'Všetky polia sú povinné' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Email validation failed:', email);
      return NextResponse.json(
        { error: 'Neplatný formát emailu' },
        { status: 400 }
      );
    }

    // Check if required environment variables are set
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error('Missing required environment variables');
      return NextResponse.json(
        { error: 'SMTP konfigurácia nie je nastavená' },
        { status: 500 }
      );
    }

    console.log('Creating SMTP transporter...');
    
    // Create transporter with better SSL handling
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // Add connection timeout settings
      connectionTimeout: 10000, // 10 seconds
      greetingTimeout: 10000,   // 10 seconds
      socketTimeout: 10000,     // 10 seconds
    });

    console.log('SMTP transporter created, sending email...');

    // Prepare email content with attachments info
    const attachmentsInfo = attachments.length > 0 
      ? `<p><strong>Prílohy:</strong> ${attachments.map(f => f.name).join(', ')}</p>`
      : '<p><strong>Prílohy:</strong> Žiadne</p>';

    // Convert files to buffers for nodemailer
    const fileAttachments = await Promise.all(
      attachments.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        return {
          filename: file.name,
          content: buffer,
          contentType: file.type || 'application/octet-stream'
        };
      })
    );

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@crescere.sk',
      to: process.env.CONTACT_EMAIL || 'tomas@crescere.sk',
      subject: `Nová správa od ${fullName} - Crescere Kontaktný formulár`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #146321; border-bottom: 2px solid #146321; padding-bottom: 10px;">
            Nová správa z kontaktného formulára
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Informácie o odosielateľovi:</h3>
            <p><strong>Meno a priezvisko:</strong> ${fullName}</p>
            <p><strong>Telefónne číslo:</strong> ${phone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>GDPR súhlas:</strong> ${gdprConsent === 'true' ? 'Áno' : 'Nie'}</p>
            ${attachmentsInfo}
          </div>
          
          <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #146321;">
            <h3 style="color: #333; margin-top: 0;">Správa:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Táto správa bola odoslaná automaticky z webovej stránky Crescere.sk</p>
            <p>Čas odoslania: ${new Date().toLocaleString('sk-SK')}</p>
          </div>
        </div>
      `,
      text: `
        Nová správa z kontaktného formulára
        
        Informácie o odosielateľovi:
        Meno a priezvisko: ${fullName}
        Telefónne číslo: ${phone}
        Email: ${email}
        GDPR súhlas: ${gdprConsent === 'true' ? 'Áno' : 'Nie'}
        Prílohy: ${attachments.length > 0 ? attachments.map(f => f.name).join(', ') : 'Žiadne'}
        
        Správa:
        ${message}
        
        Táto správa bola odoslaná automaticky z webovej stránky Crescere.sk
        Čas odoslania: ${new Date().toLocaleString('sk-SK')}
      `,
      attachments: fileAttachments
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Send confirmation email to the user
    const userMailOptions = {
      from: process.env.SMTP_FROM || 'noreply@crescere.sk',
      to: email,
      subject: 'Crescere.sk - Potvrdenie správy',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #146321; border-bottom: 2px solid #146321; padding-bottom: 10px;">
            Ďakujeme za vašu správu!
          </h2>
          
          <p>Vážený/á ${fullName},</p>
          
          <p>ďakujeme vám za správu, ktorú ste nám odoslali. Potvrdzujeme jej prijatie a budeme vás kontaktovať v čo najkratšom čase.</p>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Vaša správa:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
            ${attachmentsInfo}
          </div>
          
          <p>Ak máte akékoľvek otázky, neváhajte nás kontaktovať spôsobom, ktorý vám najviac vyhovuje:</p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #146321; margin-top: 0; margin-bottom: 15px;">Kontaktné možnosti:</h4>
            
            <div style="margin-bottom: 15px;">
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:tomas@crescere.sk" style="color: #146321; text-decoration: none;">tomas@crescere.sk</a></p>
              <p style="margin: 8px 0;"><strong>📱 Telefón:</strong> <a href="tel:+421914222889" style="color: #146321; text-decoration: none;">+421 914 222 889</a></p>
            </div>
            
            <div style="border-top: 1px solid #146321; padding-top: 15px;">
                              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <a href="https://wa.me/421914222889" style="display: inline-block; padding: 4px 8px; color: #25D366; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">📱 WhatsApp</a>
                <a href="tel:+421914222889" style="display: inline-block; padding: 4px 8px; color: #7360f2; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">📞 Viber</a>
                <a href="https://m.me/+421914222889" style="display: inline-block; padding: 4px 8px; color: #1877f2; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">💬 Messenger</a>
                <a href="https://t.me/Crescere_sro" style="display: inline-block; padding: 4px 8px; color: #0088cc; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 500;">📨 Telegram</a>

              </div>
            </div>
          </div>
          
          <p>S pozdravom,<br><strong>Tomáš Kušmirek, MBA</strong> <em>z tímu Crescere s.r.o.</em></p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>Toto je automatická správa, prosím neodpovedajte na ňu.</p>
          </div>
        </div>
      `,
      text: `
        Ďakujeme za vašu správu!
        
        Vážený/á ${fullName},
        
        ďakujeme vám za správu, ktorú ste nám odoslali. Potvrdzujeme jej prijatie a budeme vás kontaktovať v najbližšom čase.
        
        Vaša správa:
        ${message}
        
        Prílohy: ${attachments.length > 0 ? attachments.map(f => f.name).join(', ') : 'Žiadne'}
        
        Ak máte akékoľvek otázky, neváhajte nás kontaktovať spôsobom, ktorý vám najviac vyhovuje:
        Email: tomas@crescere.sk
        Telefón: +421 914 222 889
        
        S pozdravom,

        Tomáš Kušmirek, MBA z Crescere
      `,
      attachments: fileAttachments
    };

    await transporter.sendMail(userMailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Správa bola úspešne odoslaná' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { 
        error: 'Nastala chyba pri odosielaní správy. Skúste to prosím znovu.' 
      },
      { status: 500 }
    );
  }
}
