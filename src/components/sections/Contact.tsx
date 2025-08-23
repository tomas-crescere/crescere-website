"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle, Upload, User } from 'lucide-react';
import { WhatsAppIcon, ViberIcon, MessengerIcon, TelegramIcon } from '../icons/SocialIcons';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Checkbox } from '../ui/Checkbox';
import { Button } from '../ui/Button';
import { GDPRModal } from '../ui/GDPRModal';
import { scrollToSection } from '../../lib/scrollUtils';

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
  gdprConsent: boolean;
  attachments: File[];
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  message?: string;
  gdprConsent?: string;
  attachments?: string;
}

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    email: '',
    message: '',
    gdprConsent: false,
    attachments: []
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isGDPRModalOpen, setIsGDPRModalOpen] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Zanechajte nám Vaše meno a priezvisko, aby sme vás vedeli správne osloviť';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Zanechajte nám telefónne číslo, aby sme Vás mohli čo najskôr kontaktovať';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email je dôležitý, aby sme Vás mohli čo najskôr kontaktovať';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Neplatný formát emailu';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Zanechajte nám správu, aby sme Vám mohli čo najskôr pomôcť';
    }

    if (!formData.gdprConsent) {
      newErrors.gdprConsent = 'Potvrďte nám prosím súhlas s GDPR, aby sme Vás mohli čo najskôr kontaktovať';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);
    setFormData(prev => ({ ...prev, attachments: files }));
    
    // Clear file error when files are selected
    if (errors.attachments) {
      setErrors(prev => ({ ...prev, attachments: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Create FormData for file uploads
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('gdprConsent', formData.gdprConsent.toString());
      
      // Append files
      selectedFiles.forEach((file) => {
        formDataToSend.append(`attachments`, file);
      });

      const response = await fetch('/api/contact', {
        method: 'POST',
        body: formDataToSend, // Don't set Content-Type header for FormData
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            fullName: '',
            phone: '',
            email: '',
            message: '',
            gdprConsent: false,
            attachments: []
          });
          setSelectedFiles([]);
        }, 5000);
      } else {
        setSubmitError(data.error || 'Nastala chyba pri odosielaní správy');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Nastala chyba pri odosielaní správy. Skúste to prosím znovu.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

    const socialMediaLinks = [
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: '+421 914 222 889',
      href: 'https://wa.me/421914222889'
    },
    {
      icon: ViberIcon,
      label: 'Viber',
      value: '+421 914 222 889',
      href: 'tel:+421914222889'
    },
    {
      icon: MessengerIcon,
      label: 'Messenger',
      value: '+421 914 222 889',
      href: 'https://m.me/+421914222889'
    },
    {
      icon: TelegramIcon,
      label: 'Telegram',
      value: '@Crescere_sro',
      href: 'https://t.me/Crescere_sro'
    }
  ];

  if (isSubmitted) {
    return (
      <section id="contact" className="h-screen bg-premium-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-16 h-16 bg-emerald-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-green" />
          </div>
          <h2 className="text-2xl font-display font-bold text-luxury-black mb-3">
            Ďakujeme!
          </h2>
          <p className="text-base text-luxury-black/70 mb-6">
            Vaša správa bola úspešne odoslaná. Budeme vás kontaktovať v najbližšom čase.
          </p>
                  <Button
          variant="primary"
          onClick={() => {
            // Scroll to portfolio section using proper utility
            scrollToSection('portfolio');
          }}
        >
          Ukážky našich projektov
        </Button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="contact" className="min-h-screen bg-premium-white pt-4 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="text-center mb-3"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-luxury-black mb-2">
            Spojte sa <span className="text-emerald-green">s nami</span>
          </h2>
          <p className="text-base text-luxury-black/70 max-w-2xl mx-auto">
            Chcete začať s digitálnou transformáciou vášho podnikania? 
            <br />
            Kontaktujte nás pre <span className="text-emerald-green">bezplatnú konzultáciu.</span>
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
              <Input
                label="Meno a priezvisko"
                placeholder="Vaše meno a priezvisko"
                name="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                error={errors.fullName}
                icon={<User className="w-4 h-4" />}
              />

              <Input
                label="Telefónne číslo"
                type="tel"
                placeholder="+421 XXX XXX XXX"
                name="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                error={errors.phone}
                icon={<Phone className="w-4 h-4" />}
              />

              <Input
                label="Email"
                type="email"
                placeholder="vas@email.sk"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                error={errors.email}
                icon={<Mail className="w-4 h-4" />}
              />

              {/* File Upload */}
              <div className="space-y-1">
                <label htmlFor="file-upload" className="block text-sm font-medium text-luxury-black">
                  Prílohy
                </label>
                <div className="relative">
                  <input
                    type="file"
                    multiple
                    className="sr-only"
                    id="file-upload"
                    name="attachments"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="file-upload"
                    className="w-full px-4 py-3 sm:px-3 sm:py-2 bg-premium-white border-2 border-emerald-green/20 rounded-lg transition-all duration-300 ease-premium hover:border-emerald-green cursor-pointer flex items-center justify-center space-x-2 group hover:bg-emerald-green/5 min-h-[44px] sm:min-h-[40px]"
                  >
                    <Upload className="w-4 h-4 text-emerald-green group-hover:text-emerald-green-light transition-colors duration-300" />
                    <span className="text-sm text-luxury-black group-hover:text-emerald-green transition-colors duration-300">
                      {selectedFiles.length > 0 ? `${selectedFiles.length} súbor(ov) vybraných` : 'Nahrať súbory'}
                    </span>
                  </label>
                </div>
                
                {/* Selected Files Display */}
                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-emerald-green/5 rounded-md border border-emerald-green/20">
                        <span className="text-xs text-luxury-black truncate flex-1">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            const newFiles = selectedFiles.filter((_, i) => i !== index);
                            setSelectedFiles(newFiles);
                            setFormData(prev => ({ ...prev, attachments: newFiles }));
                          }}
                          className="ml-2 text-emerald-green hover:text-emerald-green-light text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <p className="text-xs text-luxury-black/50">
                  Môžete nahrať viacero súborov (PDF, DOC, obrázky...)
                </p>
              </div>

              <Textarea
                label="Správa"
                placeholder="Napíšte nám vašu správu..."
                name="message"
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                error={errors.message}
                rows={2}
              />

              <Checkbox
                label={
                  <>
                    Súhlasím so spracovaním osobných údajov v súlade s{' '}
                    <button
                      type="button"
                      onClick={() => setIsGDPRModalOpen(true)}
                      className="text-emerald-green font-semibold hover:text-emerald-green-light underline decoration-2 underline-offset-2 transition-colors duration-200 cursor-pointer"
                    >
                      GDPR
                    </button>
                  </>
                }
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={(e) => handleInputChange('gdprConsent', e.target.checked)}
                error={errors.gdprConsent}
              />

              {/* Submit Error Display */}
              {submitError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-red-600 text-sm font-medium">
                    {submitError}
                  </p>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isSubmitting}
                className="w-full bg-emerald-green hover:bg-emerald-green-light text-premium-white border-emerald-green hover:border-emerald-green-light"
              >
                <Send className="mr-2 w-4 h-4" />
                {isSubmitting ? 'Odosielam...' : 'Odoslať správu'}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information & Social Media */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            {/* Contact Info */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-luxury-black mb-2">
                Kontaktné informácie
              </h3>
              
              <div className="space-y-1">
                <motion.a
                  href="mailto:tomas@crescere.sk"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-green/5 transition-colors duration-300 ease-premium group border border-transparent hover:border-emerald-green/20"
                >
                  <div className="w-6 h-6 bg-emerald-green/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-green/20 transition-colors duration-300 ease-premium">
                    <Mail className="w-3 h-3 text-emerald-green" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-luxury-black/60">Email</p>
                    <p className="text-sm font-semibold text-luxury-black group-hover:text-emerald-green transition-colors duration-300 ease-premium">
                      tomas@crescere.sk
                    </p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+421914222889"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-green/5 transition-colors duration-300 ease-premium group border border-transparent hover:border-emerald-green/20"
                >
                  <div className="w-6 h-6 bg-emerald-green/10 rounded-lg flex items-center justify-center group-hover:bg-emerald-green/20 transition-colors duration-300 ease-premium">
                    <Phone className="w-3 h-3 text-emerald-green" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-luxury-black/60">Telefón</p>
                    <p className="text-sm font-semibold text-luxury-black group-hover:text-emerald-green transition-colors duration-300 ease-premium">
                      +421 914 222 889
                    </p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold text-luxury-black">
                Kontaktovať nás môžete aj na sociálnych sieťach
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2">
                {socialMediaLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="flex items-center justify-center p-2 rounded-lg hover:bg-emerald-green/5 transition-all duration-300 ease-premium group border border-transparent hover:border-emerald-green/20"
                  >
                    <div className="w-8 h-12 flex items-center justify-center transition-all duration-300 ease-premium group-hover:scale-110 relative p-0">
                      <social.icon className="w-10 h-10" />
                      {/* Hover Tooltip */}
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-luxury-black text-premium-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10">
                        {social.label}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-luxury-black"></div>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* GDPR Modal */}
      <GDPRModal
        isOpen={isGDPRModalOpen}
        onClose={() => setIsGDPRModalOpen(false)}
      />
    </section>
  );
};
