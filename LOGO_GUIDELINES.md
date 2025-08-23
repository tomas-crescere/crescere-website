# Crescere Logo Usage Guidelines

## 🎯 Brand Overview

The Crescere logo represents digital growth, innovation, and exclusivity. It combines a geometric diamond shape with digital growth lines and an innovation center point, symbolizing the company's commitment to transforming businesses through digital solutions.

## 🎨 Logo Variants

### Primary Logo (Full)
- **Usage**: Primary brand presence, headers, business cards, main marketing materials
- **Components**: Icon + wordmark "Crescere"
- **Layout**: Horizontal arrangement with icon on the left, text on the right
- **Spacing**: 12px gap between icon and text

### Icon Only
- **Usage**: Favicons, social media profiles, small spaces, app icons
- **Components**: Diamond shape with growth lines and center point
- **Sizes**: Minimum 16px, recommended 24px+ for clarity

### Wordmark Only
- **Usage**: Text-heavy contexts, when icon doesn't fit
- **Components**: "Crescere" text only
- **Font**: Montserrat Bold
- **Color**: Luxury Black (#060D0D)

## 📏 Sizing & Scaling

### Minimum Sizes
- **Full Logo**: 120px width minimum
- **Icon Only**: 16px width minimum
- **Wordmark Only**: 80px width minimum

### Recommended Sizes
- **Digital Display**: 200px - 400px width
- **Print Materials**: 300px - 600px width
- **Large Format**: 600px+ width

### Scaling Rules
- Always maintain aspect ratio
- Never stretch or distort
- Ensure all elements remain visible
- Test readability at intended size

## 🎨 Color Usage

### Primary Colors
- **Luxury Black**: #060D0D (Primary text and borders)
- **Premium White**: #F5F4EB (Background and secondary text)
- **Emerald Green**: #146321 (Primary accent and fills)

### Color Combinations
- **Light Backgrounds**: Use full-color logo
- **Dark Backgrounds**: Use white/light variant
- **Single Color**: Use solid black or white
- **Print**: Use 100% black or specified brand colors

### Background Requirements
- **Light Backgrounds**: Minimum 20% contrast
- **Dark Backgrounds**: Minimum 20% contrast
- **Photographic Backgrounds**: Ensure sufficient contrast
- **Gradient Backgrounds**: Test readability across all areas

## 📐 Spacing & Clear Space

### Clear Space
- **Minimum Clear Space**: Equal to the height of the "C" in "Crescere"
- **Recommended Clear Space**: 1.5x the height of the "C"
- **No Elements**: Text, graphics, or other elements should not intrude on this space

### Layout Guidelines
- **Centered Placement**: Logo should be centered in its allocated space
- **Alignment**: Align with other design elements using consistent margins
- **Grid System**: Use 8px grid system for consistent spacing

## 🚫 Usage Restrictions

### What NOT to Do
- ❌ Don't change the logo colors
- ❌ Don't stretch or distort the logo
- ❌ Don't add effects (shadows, glows, etc.)
- ❌ Don't place on busy backgrounds
- ❌ Don't use below minimum size
- ❌ Don't rotate or tilt the logo
- ❌ Don't add borders or outlines
- ❌ Don't use outdated versions

### Prohibited Modifications
- Color changes
- Font substitutions
- Element removal or addition
- Geometric distortion
- Unauthorized combinations

## 📱 Digital Usage

### Web Applications
- **Header**: Use full logo, left-aligned
- **Favicon**: Use icon only, 32x32px
- **Social Media**: Use appropriate variant for platform
- **Email Signatures**: Use full logo with proper spacing

### Social Media
- **Profile Pictures**: Use icon only, centered
- **Cover Images**: Use full logo with clear space
- **Post Graphics**: Use appropriate variant for context
- **Stories/Reels**: Use icon only for small formats

### Mobile Applications
- **App Icon**: Use icon only, follow platform guidelines
- **Splash Screen**: Use full logo with clear space
- **In-App Branding**: Use appropriate variant for context

## 🖨️ Print Usage

### Business Materials
- **Business Cards**: Use full logo, minimum 60px width
- **Letterheads**: Use full logo, left-aligned header
- **Brochures**: Use full logo, consistent placement
- **Presentations**: Use full logo, title slide

### Marketing Materials
- **Banners**: Use full logo, minimum 200px width
- **Posters**: Use full logo, prominent placement
- **Flyers**: Use full logo, consistent branding
- **Signage**: Use full logo, appropriate scale

### Print Specifications
- **Resolution**: Minimum 300 DPI
- **Format**: Vector (AI/EPS) or high-res PNG
- **Color Mode**: CMYK for print, RGB for digital
- **Paper**: Test on intended paper stock

## 🔧 Technical Specifications

### File Formats
- **Vector**: SVG, AI, EPS (scalable)
- **Raster**: PNG (transparent background)
- **Print**: PDF, AI, EPS (high resolution)

### Export Settings
- **SVG**: Optimized, clean code
- **PNG**: 32-bit with transparency
- **AI/EPS**: CMYK color mode
- **PDF**: Print-ready, high resolution

### Web Optimization
- **SVG**: Minified, optimized paths
- **PNG**: Compressed, appropriate size
- **Favicon**: Multiple sizes for compatibility
- **Preload**: Critical logo assets

## 📋 Implementation Examples

### HTML Implementation
```html
<!-- Full Logo -->
<div class="logo">
  <svg class="logo-icon" viewBox="0 0 48 48">
    <!-- Logo SVG content -->
  </svg>
  <span class="logo-text">Crescere</span>
</div>

<!-- Icon Only -->
<div class="logo-icon-only">
  <svg viewBox="0 0 48 48">
    <!-- Logo SVG content -->
  </svg>
</div>
```

### CSS Implementation
```css
.logo {
  display: flex;
  align-items: center;
  gap: 12px; /* Clear space */
}

.logo-icon {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.logo-text {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #060D0D;
}
```

### React Component
```tsx
<Logo variant="full" size="lg" className="custom-class" />
<Logo variant="icon" size="md" />
<Logo variant="text" size="xl" />
```

## 🎯 Brand Consistency

### Visual Identity
- Use logo consistently across all touchpoints
- Maintain brand color palette
- Follow typography guidelines
- Ensure professional appearance

### Communication
- Align logo usage with brand voice
- Maintain premium positioning
- Reflect innovation and growth
- Ensure accessibility compliance

## 📞 Support & Resources

### Logo Files
- **Primary Logo**: `src/components/Logo.tsx`
- **SVG Favicon**: `public/favicon.svg`
- **Vector Sources**: Available upon request
- **High-Res Assets**: Contact design team

### Questions & Support
- **Design Team**: design@crescere.sk
- **Brand Manager**: brand@crescere.sk
- **Technical Support**: dev@crescere.sk

### Updates & Revisions
- Logo updates are communicated in advance
- Version control is maintained
- Legacy versions are deprecated
- Migration guidelines are provided

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Approved By**: Crescere Brand Team
