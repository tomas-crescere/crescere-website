"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import { WhatsAppIcon, ViberIcon, MessengerIcon, TelegramIcon } from './icons/SocialIcons';
import { Logo } from './Logo';
import { scrollToSection } from '../lib/scrollUtils';
import { PrivacyPolicyModal } from './ui/PrivacyPolicyModal';
import { TermsOfServiceModal } from './ui/TermsOfServiceModal';

import { useCookieConsent } from './ui/CookieConsentProvider';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { showBanner, openCookiesModal } = useCookieConsent();
  
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const footerLinks = {
    company: [
      { label: 'O nás', href: '#hero' },
      { label: 'Portfólio', href: '#portfolio' },
      { label: 'Kontakt', href: '#contact' },
    ],

    services: [
      { label: 'Webové stránky', href: '#portfolio' },
      { label: 'Automatizácia', href: '#portfolio' },
      { label: 'Digitálizácia', href: '#portfolio' },
      { label: 'Poradenstvo', href: '#portfolio' }
    ]
  };

  const socialMediaLinks = [
    { icon: WhatsAppIcon, href: 'https://wa.me/421914222889', label: 'WhatsApp' },
    { icon: ViberIcon, href: 'tel:+421914222889', label: 'Viber' },
    { icon: MessengerIcon, href: 'https://m.me/+421914222889', label: 'Messenger' },
    { icon: TelegramIcon, href: 'https://t.me/Crescere_sro', label: 'Telegram' }
  ];

  const contactInfo = [
    { icon: Mail, value: 'tomas@crescere.sk', href: 'mailto:tomas@crescere.sk' },
    { icon: Phone, value: '+421 914 222 889', href: 'tel:+421914222889' }
  ];

  return (
    <footer className="bg-luxury-black text-premium-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Logo variant="full" size="sm" className="mb-2" />
            <p className="text-premium-white/70 mb-2 leading-relaxed text-xs">
              Crescere s.r.o.<br/>
              Sídlo: Ulica Jozefa Adamca 9983/24, 917 01 Trnava<br/>
              IČO: 47 587 792<br/>
              DIČ: 2023994973
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-premium-white">
              Spoločnosť
            </h3>
            <ul className="space-y-1">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <button
                      onClick={() => {
                        const sectionId = link.href.replace('#', '');
                        scrollToSection(sectionId);
                      }}
                      className="text-premium-white/70 hover:text-emerald-green transition-colors duration-300 ease-premium text-xs text-left w-full"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      className="text-premium-white/70 hover:text-emerald-green transition-colors duration-300 ease-premium text-xs"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-premium-white">
              Služby
            </h3>
            <ul className="space-y-1">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => {
                      const sectionId = link.href.replace('#', '');
                      scrollToSection(sectionId);
                    }}
                    className="text-premium-white/70 hover:text-emerald-green transition-colors duration-300 ease-premium text-xs text-left w-full"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-premium-white">
              Kontakt
            </h3>
            <ul className="space-y-1">
              {contactInfo.map((contact) => (
                <li key={contact.value}>
                  <a
                    href={contact.href}
                    className="flex items-center space-x-2 text-premium-white/70 hover:text-emerald-green transition-colors duration-300 ease-premium group"
                  >
                    <contact.icon className="w-3 h-3" />
                    <span className="text-xs">{contact.value}</span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Links */}
            <div className="flex space-x-2 mt-4">
              {socialMediaLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 flex items-center justify-center transition-all duration-300 ease-premium hover:bg-gray-100 rounded-lg"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-premium-white/10 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-1 md:space-y-0">
            <p className="text-premium-white/60 text-xs">
              © {currentYear} Crescere s.r.o. Všetky práva vyhradené.
            </p>
            
            <div className="flex space-x-3 text-xs">
              <button
                onClick={() => setIsPrivacyModalOpen(true)}
                className="text-premium-white/60 hover:text-emerald-green transition-colors duration-300 ease-premium"
              >
                Ochrana os. údajov
              </button>
              <button
                onClick={() => setIsTermsModalOpen(true)}
                className="text-premium-white/60 hover:text-emerald-green transition-colors duration-300 ease-premium"
              >
                Všeobecné obchodné podmienky
              </button>
              <button
                onClick={openCookiesModal}
                className="text-premium-white/60 hover:text-emerald-green transition-colors duration-300 ease-premium"
              >
                Koláčiky súkromia (cookies)
              </button>
              <button
                onClick={() => {
                  console.log('Change cookie settings button clicked');
                  showBanner();
                }}
                className="text-premium-white/60 hover:text-emerald-green transition-colors duration-300 ease-premium"
              >
                Zmeniť nastavenia cookies
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legal Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
      
      <TermsOfServiceModal
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
      

    </footer>
  );
};
