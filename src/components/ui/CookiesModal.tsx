"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cookie, Settings, Eye, Shield, Info, Globe, CheckCircle, AlertTriangle, Mail, Phone, User } from 'lucide-react';
import { Button } from './Button';

interface CookiesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences?: {
    necessary: boolean;
    functional: boolean;
    analytical: boolean;
    marketing: boolean;
    timestamp?: number;
  };
  onPreferencesChange?: (preferences: {
    necessary: boolean;
    functional: boolean;
    analytical: boolean;
    marketing: boolean;
    timestamp?: number;
  }) => void;
}

export const CookiesModal: React.FC<CookiesModalProps> = ({ isOpen, onClose, preferences, onPreferencesChange }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Always true, cannot be disabled
    functional: preferences?.functional ?? false,
    analytical: preferences?.analytical ?? false,
    marketing: preferences?.marketing ?? false
  });

  // Sync preferences when modal opens or preferences change
  useEffect(() => {
    if (preferences) {
      setCookiePreferences({
        necessary: true, // Always true
        functional: preferences.functional ?? false,
        analytical: preferences.analytical ?? false,
        marketing: preferences.marketing ?? false
      });
    }
  }, [preferences]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('cookiePreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setCookiePreferences({
          necessary: true, // Always true
          functional: parsed.functional ?? false,
          analytical: parsed.analytical ?? false,
          marketing: parsed.marketing ?? false
        });
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error);
      }
    }
  }, []);

  if (!isOpen) return null;

  const sections = [
    { id: 'overview', label: 'Prehľad', icon: Cookie },
    { id: 'types', label: 'Typy cookies', icon: Settings },
    { id: 'preferences', label: 'Nastavenia', icon: Shield },
    { id: 'legal', label: 'Právne informácie', icon: Info }
  ];

  const handleCookieChange = (type: string, value: boolean) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    setCookiePreferences(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const savePreferences = () => {
    // Save preferences to localStorage with timestamp
    const preferencesWithTimestamp = {
      ...cookiePreferences,
      timestamp: Date.now()
    };
    
    localStorage.setItem('cookiePreferences', JSON.stringify(preferencesWithTimestamp));
    
    // Update global cookie consent context
    if (onPreferencesChange) {
      onPreferencesChange(preferencesWithTimestamp);
    }
    
    // Apply preferences immediately to ensure synchronization
    applyCookiePreferences(cookiePreferences);
    
    // Close modal
    onClose();
  };

  const applyCookiePreferences = (prefs: typeof cookiePreferences) => {
    // Apply functional cookies
    if (prefs.functional) {
      // Enable functional features
      console.log('Functional cookies enabled');
    } else {
      // Disable functional features
      console.log('Functional cookies disabled');
    }
    
    // Apply analytical cookies
    if (prefs.analytical) {
      // Enable analytics
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).gtag) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted'
        });
      }
    } else {
      // Disable analytics
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).gtag) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied'
        });
      }
    }
    
    // Apply marketing cookies
    if (prefs.marketing) {
      // Enable marketing tracking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fbq('consent', 'grant');
      }
    } else {
      // Disable marketing tracking
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== 'undefined' && (window as any).fbq) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fbq('consent', 'revoke');
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="bg-premium-white rounded-lg shadow-lg max-w-4xl w-full max-h-[80vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-emerald-green/5 to-emerald-green/10">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-emerald-green/20 rounded-xl flex items-center justify-center">
                <Cookie className="w-6 h-6 text-emerald-green" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-luxury-black">
                  Cookies a súkromie
                </h2>
                <p className="text-sm text-luxury-black/60">GDPR Compliance • ePrivacy Directive</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl hover:bg-gray-100 flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="flex h-[calc(80vh-80px)]">
            {/* Sidebar Navigation */}
            <div className="w-48 border-r border-gray-100 bg-gray-50/50 p-2 flex flex-col h-full">
              <nav className="space-y-2 flex-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-md text-left transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-emerald-green text-premium-white shadow-md'
                        : 'hover:bg-gray-100 text-luxury-black/70 hover:text-luxury-black'
                    }`}
                  >
                    <section.icon className="w-4 h-4" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </nav>
              
              {/* Date at bottom of sidebar */}
              <div className="mt-auto pt-4 border-t border-emerald-green/20">
                <div className="text-xs text-emerald-green/80 text-center">
                  <div className="font-medium">Posledná aktualizácia:</div>
                  <div className="text-emerald-green/90 font-semibold mt-1">
                    {new Date().toLocaleDateString('sk-SK')}
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-3">
              {activeSection === 'overview' && (
                <div className="space-y-3">
                  <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-md p-3">
                    <h3 className="text-base font-semibold text-luxury-black mb-2 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-emerald-green mr-2" />
                      Dôležité informácie
                    </h3>
                    <p className="text-sm text-luxury-black/80 leading-relaxed">
                      Táto politika cookies je v súlade s <strong>GDPR (EU) 2016/679</strong>, 
                      <strong> ePrivacy Directive 2002/58/EC</strong> a <strong>zákonom č. 18/2018 Z.z.</strong> 
                      o ochrane osobných údajov.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-luxury-black mb-1.5">Čo sú cookies?</h3>
                      <p className="text-sm text-luxury-black/70 leading-relaxed">
                        Cookies sú malé textové súbory, ktoré sa ukladajú vo vašom prehliadači a pomáhajú nám 
                        zlepšovať funkčnosť webovej stránky a váš používateľský zážitok.
                      </p>
                      <p className="text-sm text-luxury-black/70 leading-relaxed">
                        Používame ich na analýzu návštevnosti, zapamätanie vašich preferencií a zabezpečenie 
                        bezpečnosti webovej stránky.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base font-semibold text-luxury-black mb-1.5">Kontakt DPO</h3>
                      <div className="space-y-1.5">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">tomas@crescere.sk</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-4 h-4 text-emerald-green" />
                          <span className="text-sm text-luxury-black/70">+421 914 222 889</span>
                        </div>
                      </div>
                      
                      {/* Company Executives */}
                      <div className="mt-3 pt-2 border-t border-emerald-green/20">
                        <h4 className="text-xs font-medium text-emerald-green/80 mb-1.5">Vedenie spoločnosti:</h4>
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <User className="w-3 h-3 text-emerald-green/70" />
                            <span className="text-xs text-luxury-black/60">Tomáš Kušmirek, MBA - Majiteľ a konateľ</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <User className="w-3 h-3 text-emerald-green/70" />
                            <span className="text-xs text-luxury-black/60">Mgr. Viera Bobáková - Konateľ</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <h4 className="font-semibold text-luxury-black mb-2">Vaše práva</h4>
                    <p className="text-sm text-luxury-black/70 mb-2">
                      Podľa GDPR máte právo na:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-luxury-black/70">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Informácie o používaní cookies</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Možnosť odmietnuť nepotrebné cookies</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Prístup k vašim údajom</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <span>Vymazanie vašich údajov</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'types' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Typy cookies a ich účel</h3>
                  
                  <div className="space-y-6">
                    {/* Necessary Cookies */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-luxury-black flex items-center">
                          <Shield className="w-5 h-5 text-green-600 mr-2" />
                          Nevyhnutné cookies
                        </h4>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Vždy aktívne</span>
                      </div>
                      <p className="text-sm text-luxury-black/70 mb-3">
                        Tieto cookies sú nevyhnutné pre základnú funkčnosť webovej stránky a nemôžu byť vypnuté.
                      </p>
                      <ul className="text-sm text-luxury-black/70 space-y-1">
                        <li>• Session cookies pre bezpečnosť a identifikáciu</li>
                        <li>• CSRF tokeny pre ochranu pred útokmi</li>
                        <li>• Cookies pre zapamätanie jazykových nastavení</li>
                        <li>• Cookies pre základnú funkcionalitu formulárov</li>
                      </ul>
                      <p className="text-xs text-green-600 mt-3">
                        <strong>Doba uchovávania:</strong> Do zatvorenia prehliadača alebo max. 24 hodín
                      </p>
                    </div>

                    {/* Functional Cookies */}
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-luxury-black flex items-center">
                          <Settings className="w-5 h-5 text-blue-600 mr-2" />
                          Funkčné cookies
                        </h4>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Voliteľné</span>
                      </div>
                      <p className="text-sm text-luxury-black/70 mb-3">
                        Pomáhajú zapamätať vaše preferencie a zlepšovať používateľský zážitok.
                      </p>
                      <ul className="text-sm text-luxury-black/70 space-y-1">
                        <li>• Zapamätanie preferencií (jazyk, región)</li>
                        <li>• Personalizácia obsahu a rozloženia</li>
                        <li>• Zapamätanie nastavení formulárov</li>
                        <li>• Funkčné vylepšenia a animácie stránky</li>
                      </ul>
                      <p className="text-xs text-blue-600 mt-3">
                        <strong>Doba uchovávania:</strong> 30 dní
                      </p>
                    </div>

                    {/* Analytical Cookies */}
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-luxury-black flex items-center">
                          <Eye className="w-5 h-5 text-purple-600 mr-2" />
                          Analytické cookies
                        </h4>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Voliteľné</span>
                      </div>
                      <p className="text-sm text-luxury-black/70 mb-3">
                        Pomáhajú nám pochopiť, ako používate našu webovú stránku a zlepšovať naše služby.
                      </p>
                      <ul className="text-sm text-luxury-black/70 space-y-1">
                        <li>• Analýza návštevnosti a správania používateľov</li>
                        <li>• Merače výkonu stránky a rýchlosti</li>
                        <li>• Identifikácia problémov a chýb</li>
                        <li>• Štatistiky a reporty o používaní</li>
                      </ul>
                      <p className="text-xs text-purple-600 mt-3">
                        <strong>Doba uchovávania:</strong> 2 roky
                      </p>
                    </div>

                    {/* Marketing Cookies */}
                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-luxury-black flex items-center">
                          <Globe className="w-5 h-5 text-orange-600 mr-2" />
                          Marketingové cookies
                        </h4>
                        <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Voliteľné</span>
                      </div>
                      <p className="text-sm text-luxury-black/70 mb-3">
                        Používajú sa na zobrazovanie relevantných reklám a meranie ich účinnosti.
                      </p>
                      <ul className="text-sm text-luxury-black/70 space-y-1">
                        <li>• Personalizované reklamy a obsah</li>
                        <li>• Sledovanie konverzií a interakcií</li>
                        <li>• Retargeting kampane a remarketing</li>
                        <li>• Sociálne médiá integrácia a sledovanie</li>
                      </ul>
                      <p className="text-xs text-orange-600 mt-3">
                        <strong>Doba uchovávania:</strong> 1 rok
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'preferences' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Nastavenia cookies</h3>
                  
                  <div className="bg-emerald-green/5 border border-emerald-green/20 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-4">Spravujte svoje preferencie</h4>
                    <p className="text-sm text-luxury-black/70 mb-6">
                      Môžete si vybrať, ktoré typy cookies chcete povoliť. Nevyhnutné cookies sú vždy aktívne 
                      pre správne fungovanie webovej stránky.
                    </p>

                    <div className="space-y-4">
                      {/* Necessary Cookies - Always enabled */}
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-green-600" />
                          <div>
                            <h5 className="font-medium text-luxury-black">Nevyhnutné cookies</h5>
                            <p className="text-sm text-luxury-black/60">Vždy aktívne - základná funkcionalita</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={cookiePreferences.necessary}
                            disabled
                            className="w-4 h-4 text-green-600 bg-green-100 border-green-300 rounded focus:ring-green-500"
                          />
                          <span className="text-sm text-green-600 font-medium">Vždy</span>
                        </div>
                      </div>

                      {/* Functional Cookies */}
                      <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Settings className="w-5 h-5 text-blue-600" />
                          <div>
                            <h5 className="font-medium text-luxury-black">Funkčné cookies</h5>
                            <p className="text-sm text-luxury-black/60">Preferencie a personalizácia</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookiePreferences.functional}
                          onChange={(e) => handleCookieChange('functional', e.target.checked)}
                          className="w-4 h-4 text-blue-600 bg-blue-100 border-blue-300 rounded focus:ring-blue-500"
                        />
                      </div>

                      {/* Analytical Cookies */}
                      <div className="flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Eye className="w-5 h-5 text-purple-600" />
                          <div>
                            <h5 className="font-medium text-luxury-black">Analytické cookies</h5>
                            <p className="text-sm text-luxury-black/60">Analýza návštevnosti a výkonu</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookiePreferences.analytical}
                          onChange={(e) => handleCookieChange('analytical', e.target.checked)}
                          className="w-4 h-4 text-purple-600 bg-purple-100 border-purple-300 rounded focus:ring-purple-500"
                        />
                      </div>

                      {/* Marketing Cookies */}
                      <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-orange-600" />
                          <div>
                            <h5 className="font-medium text-luxury-black">Marketingové cookies</h5>
                            <p className="text-sm text-luxury-black/60">Personalizované reklamy a meranie</p>
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={cookiePreferences.marketing}
                          onChange={(e) => handleCookieChange('marketing', e.target.checked)}
                          className="w-4 h-4 text-orange-600 bg-orange-100 border-orange-300 rounded focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-luxury-black/70">
                          <p className="font-medium text-luxury-black mb-1">Dôležité upozornenie</p>
                          <p>
                            Vypnutie niektorých cookies môže ovplyvniť funkčnosť webovej stránky. 
                            Vaše preferencie sa uložia a budú respektované pri ďalších návštevách.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'legal' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-luxury-black mb-4">Právne informácie</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Právny základ</h4>
                      <div className="space-y-3 text-sm text-luxury-black/70">
                        <div className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-emerald-green rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>Nevyhnutné cookies:</strong> Oprávnený záujem (legitimate interest)</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-emerald-green rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>Funkčné cookies:</strong> Súhlas (consent)</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-emerald-green rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>Analytické cookies:</strong> Súhlas (consent)</span>
                        </div>
                        <div className="flex items-start space-x-2">
                          <span className="w-2 h-2 bg-emerald-green rounded-full mt-2 flex-shrink-0"></span>
                          <span><strong>Marketingové cookies:</strong> Súhlas (consent)</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold text-luxury-black">Doba uchovávania</h4>
                      <div className="space-y-3 text-sm text-luxury-black/70">
                        <div className="flex items-center justify-between">
                          <span>Session cookies</span>
                          <span className="font-medium">Do zatvorenia prehliadača</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Krátkodobé</span>
                          <span className="font-medium">24 hodín - 30 dní</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Dlhodobé</span>
                          <span className="font-medium">1-2 roky</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Tretie strany</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Niektoré cookies môžu byť nastavené tretími stranami (Google Analytics, Facebook, atď.). 
                      Tieto služby majú vlastné zásady ochrany osobných údajov.
                    </p>
                    <div className="text-sm text-luxury-black/70 space-y-2">
                      <p>• <strong>Google Analytics:</strong> <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zásady ochrany osobných údajov</a></p>
                      <p>• <strong>Facebook:</strong> <a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Zásady ochrany osobných údajov</a></p>
                    </div>
                  </div>

                  <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                    <h4 className="font-semibold text-luxury-black mb-3">Ako spravovať cookies</h4>
                    <p className="text-sm text-luxury-black/70 mb-3">
                      Cookies môžete spravovať v nastaveniach vášho prehliadača:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-luxury-black/70">
                      <div>
                        <p className="font-medium mb-2">Chrome / Edge</p>
                        <p>Nastavenia → Súkromie a bezpečnosť → Cookies a iné údaje stránok</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Firefox</p>
                        <p>Nastavenia → Súkromie a bezpečnosť → Cookies a údaje stránok</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Safari</p>
                        <p>Preferencie → Súkromie → Cookies a údaje webových stránok</p>
                      </div>
                      <div>
                        <p className="font-medium mb-2">Opera</p>
                        <p>Nastavenia → Súkromie a bezpečnosť → Cookies</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50/50">
            <div className="text-xs text-luxury-black/50">
              Posledná aktualizácia: {new Date().toLocaleDateString('sk-SK')}
            </div>
            <div className="flex space-x-3">
              <Button
                variant="secondary"
                onClick={() => window.open('mailto:tomas@crescere.sk?subject=Otázka k cookies', '_blank')}
                className="border-gray-300 text-luxury-black hover:bg-gray-100"
              >
                Kontaktovať DPO
              </Button>
              <Button
                variant="primary"
                onClick={savePreferences}
                className="bg-emerald-green hover:bg-emerald-green-light text-premium-white border-emerald-green hover:border-emerald-green-light"
              >
                Uložiť preferencie
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
