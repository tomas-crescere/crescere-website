"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Settings, Shield, Eye, Globe, X, CheckCircle, Info } from 'lucide-react';
import { Button } from './Button';

interface CookieConsentBannerProps {
  onConsentChange: (preferences: CookiePreferences) => void;
  onOpenCookiesModal?: () => void;
}

export interface CookiePreferences {
  necessary: boolean;
  functional: boolean;
  analytical: boolean;
  marketing: boolean;
  timestamp: number;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onConsentChange, onOpenCookiesModal }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    functional: false,
    analytical: false,
    marketing: false,
    timestamp: Date.now()
  });

  useEffect(() => {
    // Load saved preferences if they exist
    const savedPreferences = localStorage.getItem('cookiePreferences');
    
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error);
      }
    }
  }, []);

  const handlePreferenceChange = (type: keyof CookiePreferences, value: boolean) => {
    if (type === 'necessary') return; // Cannot disable necessary cookies
    
    const newPreferences = {
      ...preferences,
      [type]: value,
      timestamp: Date.now()
    };
    setPreferences(newPreferences);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      functional: true,
      analytical: true,
      marketing: true,
      timestamp: Date.now()
    };
    setPreferences(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptSelected = () => {
    saveConsent(preferences);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      functional: false,
      analytical: false,
      marketing: false,
      timestamp: Date.now()
    };
    setPreferences(onlyNecessary);
    saveConsent(onlyNecessary);
  };

  const saveConsent = (consentPreferences: CookiePreferences) => {
    // Save to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(consentPreferences));
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookieConsentTimestamp', Date.now().toString());
    
    // Notify parent component
    onConsentChange(consentPreferences);
    
    // Apply cookie preferences (this would integrate with your analytics services)
    applyCookiePreferences(consentPreferences);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // This function would integrate with your actual analytics and marketing services
    // Example implementation:
    
    if (prefs.analytical) {
      // Enable Google Analytics, etc.
      console.log('Analytical cookies enabled');
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    } else {
      // Disable analytics
      console.log('Analytical cookies disabled');
      // window.gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled');
      // window.gtag('consent', 'update', { ad_storage: 'granted' });
    } else {
      // Disable marketing cookies
      console.log('Marketing cookies disabled');
      // window.gtag('consent', 'update', { ad_storage: 'denied' });
    }
    
    if (prefs.functional) {
      // Enable functional cookies
      console.log('Functional cookies enabled');
    } else {
      // Disable functional cookies
      console.log('Functional cookies disabled');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-premium-white border-t-4 border-emerald-green shadow-2xl"
      >
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          {/* Main Banner */}
          {!showDetails && (
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-start space-x-3 flex-1">
                <div className="w-10 h-10 bg-emerald-green/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Cookie className="w-5 h-5 text-emerald-green" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-luxury-black mb-1">
                    Cookies a súkromie
                  </h3>
                  <p className="text-sm text-luxury-black/70 leading-relaxed">
                    Používame cookies na zlepšenie vášho zážitku, analýzu návštevnosti a personalizáciu obsahu. 
                    Môžete si vybrať, ktoré typy cookies chcete povoliť.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                <Button
                  variant="secondary"
                  onClick={() => setShowDetails(true)}
                  className="border-gray-300 text-luxury-black hover:bg-gray-100"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Nastavenia
                </Button>
                <Button
                  variant="primary"
                  onClick={acceptAll}
                  className="bg-emerald-green hover:bg-emerald-green-light text-premium-white border-emerald-green hover:border-emerald-green-light"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Prijať všetky
                </Button>
              </div>
            </div>
          )}

          {/* Detailed Preferences */}
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-luxury-black">
                  Nastavenia cookies
                </h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Necessary Cookies */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <h4 className="font-semibold text-luxury-black">Nevyhnutné</h4>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Vždy aktívne</span>
                  </div>
                  <p className="text-sm text-luxury-black/70 mb-3">
                    Základná funkcionalita webovej stránky, bezpečnosť a session management.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.necessary}
                      disabled
                      className="w-4 h-4 text-green-600 bg-green-100 border-green-300 rounded focus:ring-green-500"
                    />
                    <span className="text-sm text-green-600 font-medium">Vždy povolené</span>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <h4 className="font-semibold text-luxury-black">Funkčné</h4>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Voliteľné</span>
                  </div>
                  <p className="text-sm text-luxury-black/70 mb-3">
                    Zapamätanie preferencií, personalizácia obsahu a vylepšenia funkčnosti.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={(e) => handlePreferenceChange('functional', e.target.checked)}
                      className="w-4 h-4 text-blue-600 bg-blue-100 border-blue-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-luxury-black/70">Povoliť funkčné cookies</span>
                  </div>
                </div>

                {/* Analytical Cookies */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <h4 className="font-semibold text-luxury-black">Analytické</h4>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Voliteľné</span>
                  </div>
                  <p className="text-sm text-luxury-black/70 mb-3">
                    Analýza návštevnosti, výkonu stránky a zlepšovanie služieb.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.analytical}
                      onChange={(e) => handlePreferenceChange('analytical', e.target.checked)}
                      className="w-4 h-4 text-purple-600 bg-purple-100 border-purple-300 rounded focus:ring-purple-500"
                    />
                    <span className="text-sm text-luxury-black/70">Povoliť analytické cookies</span>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-orange-600" />
                      <h4 className="font-semibold text-luxury-black">Marketingové</h4>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">Voliteľné</span>
                  </div>
                  <p className="text-sm text-luxury-black/70 mb-3">
                    Personalizované reklamy, retargeting a meranie konverzií.
                  </p>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={(e) => handlePreferenceChange('marketing', e.target.checked)}
                      className="w-4 h-4 text-orange-600 bg-orange-100 border-orange-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm text-luxury-black/70">Povoliť marketingové cookies</span>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-luxury-black/70">
                    <p className="font-medium text-luxury-black mb-1">Dôležité upozornenie</p>
                    <p>
                      Nevyhnutné cookies sú vždy aktívne pre správne fungovanie webovej stránky. 
                      Ostatné typy cookies môžete povoliť alebo zakázať podľa vašich preferencií. 
                      Vaše nastavenia sa uložia a budú respektované pri ďalších návštevách.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={rejectAll}
                    className="border-red-300 text-red-700 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Odmietnuť všetky
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDetails(false)}
                    className="border-gray-300 text-luxury-black hover:bg-gray-100"
                  >
                    Späť
                  </Button>
                </div>
                
                <div className="flex space-x-3">
                  <Button
                    variant="secondary"
                    onClick={onOpenCookiesModal || (() => {})}
                    className="border-gray-300 text-luxury-black hover:bg-gray-100"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Viac informácií
                  </Button>
                  <Button
                    variant="primary"
                    onClick={acceptSelected}
                    className="bg-emerald-green hover:bg-emerald-green-light text-premium-white border-emerald-green hover:border-emerald-green-light"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Uložiť nastavenia
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
