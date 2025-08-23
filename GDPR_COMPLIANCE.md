# GDPR Compliance Implementation

## Overview

This document describes the comprehensive GDPR compliance implementation for the Crescere website, ensuring full compliance with EU Regulation 2016/679 (GDPR) and ePrivacy Directive 2002/58/EC.

## 🚨 Critical GDPR Requirements Met

### 1. **Cookie Consent Before Tracking**
- ✅ **No cookies set before consent** - All tracking is blocked until user gives consent
- ✅ **Granular consent options** - Users can choose specific cookie types
- ✅ **Explicit consent** - No pre-ticked boxes, clear opt-in required

### 2. **Cookie Categories**
- **Necessary Cookies** - Always active, cannot be disabled
- **Functional Cookies** - User preferences and enhanced functionality
- **Analytical Cookies** - Analytics and performance monitoring
- **Marketing Cookies** - Advertising and retargeting

### 3. **User Rights Implementation**
- ✅ **Right to withdraw consent** - Easy access to change preferences
- ✅ **Right to access** - Clear information about data processing
- ✅ **Right to deletion** - Contact information for data requests
- ✅ **Right to portability** - Data export capabilities

## 🏗️ Architecture

### Components

#### 1. **CookieConsentBanner** (`src/components/ui/CookieConsentBanner.tsx`)
- **Purpose**: Initial consent collection interface
- **Features**: 
  - Granular cookie type selection
  - Accept all/Reject all options
  - Detailed preferences management
  - Mobile-responsive design

#### 2. **CookieConsentProvider** (`src/components/ui/CookieConsentProvider.tsx`)
- **Purpose**: Context provider for cookie consent state
- **Features**:
  - Manages consent state across the application
  - Applies preferences to analytics services
  - Persists user choices in localStorage

#### 3. **GDPR Utilities** (`src/lib/gdprUtils.ts`)
- **Purpose**: Utility functions for GDPR compliance
- **Features**:
  - Safe tracking functions (only after consent)
  - Consent checking utilities
  - Analytics service initialization

### Integration Points

#### Layout Integration
```tsx
// src/app/layout.tsx
<CookieConsentProvider>
  <Navigation />
  <main>{children}</main>
  <Footer />
</CookieConsentProvider>
```

#### Footer Integration
```tsx
// src/components/Footer.tsx
const { showBanner } = useCookieConsent();

<button onClick={showBanner}>
  Zmeniť nastavenia cookies
</button>
```

## 🔒 How It Works

### 1. **First Visit**
1. User visits website
2. **No tracking occurs** - All analytics blocked
3. Cookie consent banner appears at bottom
4. User must make a choice before proceeding

### 2. **Consent Collection**
1. User sees main banner with options:
   - "Nastavenia" (Settings) - Detailed preferences
   - "Prijať všetky" (Accept All) - Quick accept
2. Detailed view shows all cookie types with checkboxes
3. User can select/deselect specific cookie types
4. Only necessary cookies are pre-selected and disabled

### 3. **Consent Application**
1. User preferences saved to localStorage
2. Consent timestamp recorded
3. Analytics services initialized based on preferences
4. Banner disappears
5. Tracking begins only for consented cookie types

### 4. **Ongoing Management**
1. User can change preferences via footer button
2. Banner reappears with current settings
3. Changes applied immediately
4. New preferences saved and persisted

## 📊 Analytics Integration

### Google Analytics
```typescript
// Only loads after analytical consent
if (prefs.analytical) {
  window.gtag('consent', 'update', { 
    analytics_storage: 'granted' 
  });
}
```

### Facebook Pixel
```typescript
// Only loads after marketing consent
if (prefs.marketing) {
  window.fbq('consent', 'grant');
}
```

### Safe Tracking Functions
```typescript
import { safeAnalyticsTrack, safeMarketingTrack } from '../lib/gdprUtils';

// Safe to use anywhere - automatically checks consent
safeAnalyticsTrack('page_view', { page_location: url });
safeMarketingTrack('purchase', { value: 100 });
```

## 🧪 Testing GDPR Compliance

### Manual Testing
1. **Clear browser data** (localStorage, cookies)
2. **Visit website** - Banner should appear
3. **Check console** - Should see "Tracking blocked until consent"
4. **Accept cookies** - Tracking should begin
5. **Change preferences** - Should see updated consent

### Automated Testing
```typescript
// Test consent status
import { getConsentStatus } from '../lib/gdprUtils';

const status = getConsentStatus();
console.log('Consent status:', status);
```

### Browser Developer Tools
1. **Application tab** → Local Storage
2. **Check for**:
   - `cookiePreferences`
   - `cookieConsentGiven`
   - `cookieConsentTimestamp`

## 📋 Legal Requirements Checklist

### ✅ **GDPR Article 7 - Conditions for consent**
- [x] Freely given consent
- [x] Specific consent for each purpose
- [x] Clear and plain language
- [x] Easy withdrawal mechanism

### ✅ **GDPR Article 13 - Information to be provided**
- [x] Identity of data controller
- [x] Purpose of processing
- [x] Legal basis for processing
- [x] Data retention periods
- [x] User rights

### ✅ **ePrivacy Directive - Cookie consent**
- [x] Prior consent for non-essential cookies
- [x] Granular consent options
- [x] Easy withdrawal
- [x] Clear information about cookie purposes

### ✅ **Slovak National Law**
- [x] Law 18/2018 Z.z. compliance
- [x] Consumer protection law compliance
- [x] Distance selling regulations

## 🚀 Implementation Guide

### Adding New Analytics Services
1. **Update CookieConsentProvider**
```typescript
// Add new service initialization
if (prefs.newService) {
  initializeNewService();
}
```

2. **Update GDPR utilities**
```typescript
export const canUseNewService = (): boolean => {
  return hasConsent('newService');
};
```

3. **Update consent banner**
```typescript
// Add new cookie type to preferences interface
interface CookiePreferences {
  // ... existing types
  newService: boolean;
}
```

### Customizing Consent Banner
1. **Modify CookieConsentBanner.tsx**
2. **Update cookie type descriptions**
3. **Adjust styling and layout**
4. **Test on mobile and desktop**

### Adding New Cookie Types
1. **Update interfaces** in all components
2. **Add consent checking** in GDPR utilities
3. **Update banner UI** with new options
4. **Test consent flow** end-to-end

## 🔍 Monitoring and Maintenance

### Regular Checks
- [ ] **Monthly**: Review consent rates and user preferences
- [ ] **Quarterly**: Update legal information and policies
- [ ] **Annually**: Full GDPR compliance audit

### Key Metrics
- **Consent rate**: Percentage of users who give consent
- **Preference distribution**: Which cookie types are most/least accepted
- **Withdrawal rate**: How often users change preferences

### Legal Updates
- **Monitor EU regulations** for changes
- **Update consent mechanisms** as needed
- **Review data processing** activities
- **Update privacy policies** accordingly

## 📞 Support and Contact

### Technical Issues
- **Developer**: Check console logs for consent status
- **Testing**: Use GDPR utilities for debugging
- **Integration**: Follow implementation guide above

### Legal Questions
- **DPO Contact**: tomas@crescere.sk
- **Phone**: +421 914 222 889
- **Address**: Ulica Jozefa Adamca 9983/24, 917 01 Trnava

### Compliance Verification
- **Internal audit**: Use this document as checklist
- **External audit**: Contact data protection authorities
- **User testing**: Verify consent flow works correctly

## 📚 Additional Resources

### EU Regulations
- [GDPR Text (EU) 2016/679](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32016R0679)
- [ePrivacy Directive 2002/58/EC](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32002L0058)

### Slovak National Law
- [Law 18/2018 Z.z.](https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2018/18/)
- [Consumer Protection Law](https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2007/250/)

### Implementation Guides
- [EDPB Guidelines on Consent](https://edpb.europa.eu/our-work-tools/our-documents/guidelines/guidelines-052020-consent-under-regulation-2016679_en)
- [ICO Cookie Guidance](https://ico.org.uk/for-organisations/guide-to-pecr/guidance-on-the-use-of-cookies-and-similar-technologies/)

---

**Last Updated**: ${new Date().toLocaleDateString('en-GB')}
**Version**: 1.0
**Maintained by**: Crescere Development Team
