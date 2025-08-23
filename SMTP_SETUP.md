# SMTP Email Setup Guide - WebSupport (Slovakia)

## Overview
This guide will help you set up SMTP email functionality for the contact form on your Crescere website using WebSupport's email service.

## What We've Implemented

### ✅ **Features:**
- **Contact form submission** via API endpoint
- **SMTP email sending** using nodemailer
- **Professional email templates** in HTML and text format
- **Automatic confirmation emails** to users
- **Error handling** and validation
- **GDPR compliance** tracking

### 📧 **Email Flow:**
1. User fills out contact form
2. Form data is sent to `/api/contact` endpoint
3. Email is sent to your business email (tomas@crescere.sk)
4. Confirmation email is sent to the user
5. Success/error message is displayed

## Setup Instructions

### 1. **Create Environment File**
```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your actual WebSupport SMTP credentials
nano .env.local
```

### 2. **Configure WebSupport SMTP Settings**

#### **WebSupport Configuration (Recommended for Slovakia):**
```env
SMTP_HOST=smtp.websupport.sk
SMTP_PORT=587
SMTP_USER=your-email@yourdomain.sk
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.sk
CONTACT_EMAIL=tomas@crescere.sk
```

**WebSupport Setup Steps:**
1. **Log into WebSupport Control Panel**
   - Go to [https://admin.websupport.sk](https://admin.websupport.sk)
   - Sign in with your WebSupport account

2. **Access Email Settings**
   - Navigate to **Email** → **Email accounts**
   - Or find **Email** in the main menu

3. **Create Email Account (if needed)**
   - Click **Create new email account**
   - Choose your domain (e.g., crescere.sk)
   - Set email address (e.g., noreply@crescere.sk)
   - Set a strong password
   - Note: Use this password in `SMTP_PASS`

4. **Enable SMTP**
   - Make sure SMTP is enabled for your email account
   - WebSupport typically enables SMTP by default

5. **Get SMTP Credentials**
   - **SMTP_HOST**: `smtp.websupport.sk`
   - **SMTP_PORT**: `587` (or try `465` if 587 doesn't work)
   - **SMTP_USER**: Your full email address
   - **SMTP_PASS**: Your email account password

#### **Alternative: Use Existing Email**
If you already have an email account with WebSupport:
- Use your existing email credentials
- Make sure SMTP is enabled
- Test with a simple email client first

### 3. **Test the Setup**
1. Start your development server: `npm run dev`
2. Fill out the contact form on your website
3. Check your email for the new message
4. Check the user's email for the confirmation

## WebSupport SMTP Details

### **Server Information:**
- **SMTP Host**: `smtp.websupport.sk`
- **SMTP Port**: `587` (STARTTLS) or `465` (SSL)
- **Security**: STARTTLS (recommended) or SSL
- **Authentication**: Required

### **Port Options:**
- **Port 587**: STARTTLS (recommended, more secure)
- **Port 465**: SSL (alternative if 587 doesn't work)
- **Port 25**: Not recommended (often blocked)

### **Common WebSupport Domains:**
- `smtp.websupport.sk` (main SMTP server)
- `mail.yourdomain.sk` (domain-specific, if configured)

## Email Templates

### **Business Email (to you):**
- Professional HTML layout with your brand colors
- All form data clearly organized
- Timestamp and source information
- Responsive design

### **User Confirmation Email:**
- Thank you message
- Copy of their submitted message
- Your contact information
- Professional branding

## Troubleshooting

### **Common WebSupport Issues:**

#### **"Authentication failed" error:**
- Verify your email credentials
- Check if SMTP is enabled for your email account
- Ensure you're using the correct email address and password

#### **"Connection timeout" error:**
- Try port 465 instead of 587
- Check if your firewall blocks SMTP
- Verify WebSupport SMTP server status

#### **"Relay access denied" error:**
- WebSupport SMTP should work for authenticated users
- Contact WebSupport support if issues persist
- Check if your hosting plan includes email services

### **Testing SMTP Connection:**
```bash
# Test with telnet (if available)
telnet smtp.websupport.sk 587

# Or use online SMTP testers
# https://www.smtper.net/
```

### **WebSupport Support:**
- **Email**: support@websupport.sk
- **Phone**: +421 2 3333 3333
- **Live Chat**: Available in control panel

## Security Considerations

### ✅ **Implemented Security:**
- Input validation and sanitization
- Environment variable protection
- Error logging without exposing sensitive data
- Secure SMTP connection with authentication

### 🔒 **Additional Recommendations:**
- Add rate limiting to prevent spam
- Implement CAPTCHA for production
- Add IP-based blocking for abuse
- Monitor email sending logs

## Production Deployment

### **Environment Variables:**
- Ensure `.env.local` is not committed to git
- Set environment variables in your hosting platform
- Use production SMTP credentials

### **WebSupport Production:**
- Use your actual domain email account
- Consider dedicated email hosting for high volume
- Monitor email delivery rates

## Support

If you encounter issues:
1. Check the browser console for errors
2. Verify your WebSupport SMTP credentials
3. Test with a simple email client first
4. Check the server logs for detailed error messages
5. Contact WebSupport support if SMTP issues persist

## Files Modified/Created

- `src/app/api/contact/route.ts` - API endpoint for form submission
- `src/components/sections/Contact.tsx` - Updated form handling
- `env.example` - Environment variables template (WebSupport focused)
- `SMTP_SETUP.md` - This setup guide

---

**WebSupport SMTP is perfect for Slovakia!** 🇸🇰 The contact form will now send emails through your local hosting provider. 🎉
