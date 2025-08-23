"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CookieConsentBanner, CookiePreferences } from './CookieConsentBanner';
import { CookiesModal } from './CookiesModal';
import { blockTrackingUntilConsent, initializeAnalytics, initializeMarketing } from '../../lib/gdprUtils';

interface CookieConsentContextType {
  preferences: CookiePreferences;
  updatePreferences: (newPreferences: CookiePreferences) => void;
  showBanner: () => void;
  hasConsented: boolean;
  openCookiesModal: () => void;
  isCookiesModalOpen: boolean;
  closeCookiesModal: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

interface CookieConsentProviderProps {
  children: ReactNode;
}

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    functional: false,
    analytical: false,
    marketing: false,
    timestamp: Date.now()
  });
  const [hasConsented, setHasConsented] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isCookiesModalOpen, setIsCookiesModalOpen] = useState(false);

  useEffect(() => {
    // Block all tracking until consent is given
    blockTrackingUntilConsent();
    
    // Check for existing consent on component mount
    const savedPreferences = localStorage.getItem('cookiePreferences');
    const consentGiven = localStorage.getItem('cookieConsentGiven');
    
    if (consentGiven && savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        setHasConsented(true);
        applyCookiePreferences(parsed);
      } catch (error) {
        console.error('Error parsing saved cookie preferences:', error);
        // If there's an error, show banner again
        setIsBannerVisible(true);
      }
    } else {
      // No consent given, show banner
      setIsBannerVisible(true);
    }
  }, []);

  const updatePreferences = (newPreferences: CookiePreferences) => {
    setPreferences(newPreferences);
    setHasConsented(true);
    setIsBannerVisible(false);
    
    // Save to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(newPreferences));
    localStorage.setItem('cookieConsentGiven', 'true');
    localStorage.setItem('cookieConsentTimestamp', Date.now().toString());
    
    // Apply the preferences
    applyCookiePreferences(newPreferences);
  };

  const applyCookiePreferences = (prefs: CookiePreferences) => {
    // This function applies cookie preferences to various services
    // It should be called whenever preferences change
    
    console.log('Applying cookie preferences:', prefs);
    
    // Initialize analytics if consent given
    if (prefs.analytical) {
      initializeAnalytics();
    }
    
    // Initialize marketing if consent given
    if (prefs.marketing) {
      initializeMarketing();
    }
    
    // Helper function to check if gtag exists
    const hasGtag = () => {
      return typeof window !== 'undefined' && 
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             typeof (window as any).gtag === 'function';
    };
    
    // Helper function to check if fbq exists
    const hasFbq = () => {
      return typeof window !== 'undefined' && 
             // eslint-disable-next-line @typescript-eslint/no-explicit-any
             typeof (window as any).fbq === 'function';
    };
    
    // Example: Google Analytics consent management
    if (hasGtag()) {
      if (prefs.analytical) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag('consent', 'update', { 
          analytics_storage: 'granted',
          ad_storage: prefs.marketing ? 'granted' : 'denied'
        });
        console.log('Google Analytics consent granted');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).gtag('consent', 'update', { 
          analytics_storage: 'denied',
          ad_storage: 'denied'
        });
        console.log('Google Analytics consent denied');
      }
    }

    // Example: Facebook Pixel consent management
    if (hasFbq()) {
      if (prefs.marketing) {
        // Enable Facebook Pixel
        console.log('Facebook Pixel enabled');
      } else {
        // Disable Facebook Pixel
        console.log('Facebook Pixel disabled');
      }
    }

    // Example: Other analytics services
    if (prefs.functional) {
      // Enable functional cookies (preferences, etc.)
      console.log('Functional cookies enabled');
    } else {
      // Disable functional cookies
      console.log('Functional cookies disabled');
    }

    // Log the current preferences for debugging
    console.log('Cookie preferences applied successfully');
  };

  const handleShowBanner = () => {
    console.log('Cookie consent banner requested by user');
    setIsBannerVisible(true);
  };

  const handleOpenCookiesModal = () => {
    setIsCookiesModalOpen(true);
    // Temporarily hide the banner while the detailed modal is open
    setIsBannerVisible(false);
  };

  const value: CookieConsentContextType = {
    preferences,
    updatePreferences,
    showBanner: handleShowBanner,
    hasConsented,
    openCookiesModal: handleOpenCookiesModal,
    isCookiesModalOpen,
    closeCookiesModal: () => {
      setIsCookiesModalOpen(false);
      // Show the banner again if user hasn't consented yet
      if (!hasConsented) {
        setIsBannerVisible(true);
      }
    }
  };

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      {isBannerVisible && (
        <CookieConsentBanner 
          onConsentChange={updatePreferences}
          onOpenCookiesModal={handleOpenCookiesModal}
        />
      )}
      <CookiesModal
        isOpen={isCookiesModalOpen}
        onClose={() => {
          setIsCookiesModalOpen(false);
          // Show the banner again if user hasn't consented yet
          if (!hasConsented) {
            setIsBannerVisible(true);
          }
        }}
        preferences={preferences}
        onPreferencesChange={(newPrefs) => {
          updatePreferences({
            ...newPrefs,
            timestamp: Date.now()
          });
          // Close the modal after saving preferences
          setIsCookiesModalOpen(false);
        }}
      />
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = (): CookieConsentContextType => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

// Type declaration for global gtag function
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
    fbq: (command: string, eventName: string, parameters?: Record<string, unknown>) => void;
  }
}
