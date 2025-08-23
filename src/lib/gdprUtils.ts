import { CookiePreferences } from '../components/ui/CookieConsentBanner';

/**
 * GDPR Compliance Utilities
 * Ensures no tracking or analytics happen before proper consent
 */

// Check if user has given consent for specific cookie types
export const hasConsent = (cookieType: Exclude<keyof CookiePreferences, 'timestamp'>): boolean => {
  if (typeof window === 'undefined') return false;
  
  const savedPreferences = localStorage.getItem('cookiePreferences');
  if (!savedPreferences) return false;
  
  try {
    const preferences: CookiePreferences = JSON.parse(savedPreferences);
    return Boolean(preferences[cookieType]);
  } catch {
    return false;
  }
};

// Check if analytics can be loaded
export const canLoadAnalytics = (): boolean => {
  return hasConsent('analytical');
};

// Check if marketing cookies can be set
export const canSetMarketingCookies = (): boolean => {
  return hasConsent('marketing');
};

// Check if functional cookies can be set
export const canSetFunctionalCookies = (): boolean => {
  return hasConsent('functional');
};

// Safe analytics tracking - only if consent given
export const safeAnalyticsTrack = (event: string, parameters?: Record<string, unknown>): void => {
  if (!canLoadAnalytics()) {
    console.log('Analytics tracking blocked - no consent given for:', event);
    return;
  }
  
  // Safe to track - user has given consent
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, parameters);
  }
};

// Safe marketing tracking - only if consent given
export const safeMarketingTrack = (event: string, parameters?: Record<string, unknown>): void => {
  if (!canSetMarketingCookies()) {
    console.log('Marketing tracking blocked - no consent given for:', event);
    return;
  }
  
  // Safe to track - user has given consent
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', event, parameters);
  }
};

// Initialize analytics services only after consent
export const initializeAnalytics = (): void => {
  if (!canLoadAnalytics()) {
    console.log('Analytics initialization blocked - no consent given');
    return;
  }
  
  // Initialize Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    console.log('Analytics initialized with consent');
  }
};

// Initialize marketing services only after consent
export const initializeMarketing = (): void => {
  if (!canSetMarketingCookies()) {
    console.log('Marketing services blocked - no consent given');
    return;
  }
  
  // Initialize Facebook Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('consent', 'grant');
    console.log('Marketing services initialized with consent');
  }
};

// Block all tracking until consent is given
export const blockTrackingUntilConsent = (): void => {
  if (typeof window === 'undefined') return;
  
  // Override common tracking functions to prevent tracking before consent
  const originalGtag = window.gtag;
  const originalFbq = window.fbq;
  
  // Block Google Analytics until consent
  if (originalGtag) {
    window.gtag = function(command: string, targetId: string, config?: Record<string, unknown>) {
      if (canLoadAnalytics()) {
        return originalGtag(command, targetId, config);
      } else {
        console.log('Google Analytics blocked - no consent given');
        return;
      }
    };
  }
  
  // Block Facebook Pixel until consent
  if (originalFbq) {
    window.fbq = function(command: string, eventName: string, parameters?: Record<string, unknown>) {
      if (canSetMarketingCookies()) {
        return originalFbq(command, eventName, parameters);
      } else {
        console.log('Facebook Pixel blocked - no consent given');
        return;
      }
    };
  }
  
  console.log('Tracking blocked until consent is given');
};

// Restore original tracking functions after consent
export const restoreTrackingAfterConsent = (): void => {
  if (typeof window === 'undefined') return;
  
  // This would restore original functions if needed
  // For now, we just log that tracking is enabled
  console.log('Tracking enabled after consent given');
};

// GDPR-compliant page view tracking
export const trackPageView = (url: string): void => {
  if (!canLoadAnalytics()) {
    console.log('Page view tracking blocked - no consent given');
    return;
  }
  
  // Safe to track page view
  safeAnalyticsTrack('page_view', { page_location: url });
};

// GDPR-compliant event tracking
export const trackEvent = (eventName: string, parameters?: Record<string, unknown>): void => {
  if (!canLoadAnalytics()) {
    console.log('Event tracking blocked - no consent given');
    return;
  }
  
  // Safe to track event
  safeAnalyticsTrack(eventName, parameters);
};

// Check if GDPR consent banner should be shown
export const shouldShowConsentBanner = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const consentGiven = localStorage.getItem('cookieConsentGiven');
  return !consentGiven;
};

// Get current consent status
export const getConsentStatus = (): {
  hasConsented: boolean;
  preferences: CookiePreferences | null;
  timestamp: number | null;
} => {
  if (typeof window === 'undefined') {
    return { hasConsented: false, preferences: null, timestamp: null };
  }
  
  const consentGiven = localStorage.getItem('cookieConsentGiven');
  const savedPreferences = localStorage.getItem('cookiePreferences');
  const timestamp = localStorage.getItem('cookieConsentTimestamp');
  
  if (!consentGiven || !savedPreferences) {
    return { hasConsented: false, preferences: null, timestamp: null };
  }
  
  try {
    const preferences: CookiePreferences = JSON.parse(savedPreferences);
    return {
      hasConsented: true,
      preferences,
      timestamp: timestamp ? parseInt(timestamp) : null
    };
  } catch {
    return { hasConsented: false, preferences: null, timestamp: null };
  }
};

// Export types for use in other components
export type { CookiePreferences };
