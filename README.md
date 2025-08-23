# Crescere - Premium Digital Business Website

A world-class, premium website for Crescere that reflects luxury, elegance, and exclusivity—on par with top-tier global creative agencies.

## 🎯 Project Overview

Crescere is a premium digital business solutions company, and this website showcases their expertise in web development, process automation, and digital consulting. The design emphasizes extraordinary premium aesthetics, extreme simplicity, and seamless user experience.

## ✨ Key Features

- **Premium Design**: Luxury aesthetic comparable to premium brands (Louis Vuitton, Apple, Rolex)
- **Full-Viewport Layout**: Each major section fits 100% of screen height for immersive premium flow
- **Pixel-Perfect Responsiveness**: Mobile-first design, flawless across all devices
- **High Performance**: Optimized for Core Web Vitals, Lighthouse scores ≥95
- **Premium Animations**: Smooth, GPU-accelerated animations with refined easing curves
- **Accessibility First**: WCAG 2.1 AA compliant with perfect contrast ratios

## 🎨 Design System

### Color Palette
- **Luxury Black**: `#060D0D` - Primary brand color
- **Premium White**: `#F5F4EB` - Background and text
- **Emerald Green**: `#146321` - Accent and CTA color
- **Emerald Green Light**: `#1A7A2A` - Hover states
- **Emerald Green Dark**: `#0F4A18` - Darker accents

### Typography
- **Display Font**: Montserrat (Bold, Semi-bold, Medium)
- **Body Font**: Poppins (Regular, Medium, Semi-bold)
- **Responsive Scale**: Hero text scales from 3rem to 8rem
- **Premium Spacing**: Optimized line heights and letter spacing

### Components
- Premium buttons with hover animations
- Luxury form inputs with focus states
- Elegant navigation with sticky behavior
- Smooth scroll-triggered animations

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion with premium easing curves
- **Icons**: Lucide React for consistent iconography
- **Deployment**: Vercel-ready with CI/CD pipeline

### Project Structure
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout with Navigation & Footer
│   ├── page.tsx        # Homepage with all sections
│   └── globals.css     # Global styles and Tailwind imports
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (Button, Input, etc.)
│   ├── sections/      # Page sections (Hero, Portfolio, Contact)
│   ├── Logo.tsx       # Premium Crescere logo component
│   ├── Navigation.tsx # Sticky navigation header
│   └── Footer.tsx     # Comprehensive footer
├── lib/               # Utility functions and helpers
└── types/             # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/crescere-website.git
   cd crescere-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Bundle analysis
npm run analyze
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px (Mobile-first approach)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1440px
- **Ultrawide**: 1440px+

### Device Testing
- ✅ iPhone (all generations)
- ✅ Android devices
- ✅ iPad and tablets
- ✅ Laptops and desktops
- ✅ Ultrawide monitors

## 🎭 Sections

### 1. Hero Section (Úvod)
- Fullscreen premium black/green gradient background
- Bold headline: "Digitálne podnikanie"
- Elegant subtitle with premium tone
- CTA: "Začať digitalizovať"
- Feature highlights with icons
- Smooth scroll indicator

### 2. Portfolio Section (Portfólio)
- Fullscreen layout with premium project cards
- Projects: Webové prezentácie, Automatizácia, Poradenstvo
- Elegant hover animations and overlays
- Technology tags and project details
- CTA for free consultation

### 3. Contact Section (Kontakt)
- Fullscreen premium layout
- Form fields: Meno, Email, Správa, GDPR checkbox
- Premium form validation with elegant feedback
- Contact information with icons
- Elegant map placeholder
- Success state with confirmation

## 🔧 Customization

### Logo Variants
The Logo component supports multiple variants:
- `full`: Icon + text (default)
- `icon`: Icon only
- `size`: sm, md, lg, xl

### Color Scheme
Modify colors in `tailwind.config.js`:
```javascript
colors: {
  'luxury-black': '#060D0D',
  'premium-white': '#F5F4EB',
  'emerald-green': '#146321',
  // ... more colors
}
```

### Typography
Adjust font sizes in `tailwind.config.js`:
```javascript
fontSize: {
  'hero': ['clamp(3rem,8vw,8rem)', { lineHeight: '1.1' }],
  'display': ['clamp(2.5rem,6vw,6rem)', { lineHeight: '1.1' }],
  // ... more sizes
}
```

## 📊 Performance

### Performance Budget
- **Initial Load**: < 1s on 4G mobile
- **Homepage Size**: < 2MB (all assets)
- **JavaScript**: < 250KB gzipped
- **Images**: WebP/AVIF with blur-up previews

### Optimization Features
- Lazy loading with blur-up previews
- Next-gen image formats (WebP/AVIF)
- CDN-ready asset optimization
- GPU-accelerated animations
- Efficient bundle splitting

## ♿ Accessibility

### WCAG 2.1 AA Compliance
- Perfect color contrast ratios
- Keyboard navigation support
- Screen reader compatibility
- ARIA labels and descriptions
- Focus management
- Semantic HTML structure

### Features
- Alt text for all images
- Proper heading hierarchy
- Form validation feedback
- Smooth scrolling support
- High contrast mode ready

## 🌐 SEO & Compliance

### SEO Features
- Semantic HTML structure
- Meta tags and Open Graph
- Structured data ready
- Sitemap generation
- Robots.txt configuration
- Google Analytics integration

### Compliance
- GDPR cookie consent
- Privacy policy integration
- Terms of service
- Cookie management
- Data protection

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy automatically on push
4. Enable preview deployments

### Other Platforms
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Any static hosting service

### Environment Variables
```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://crescere.sk
```

## 📁 Deliverables

### Website
- ✅ Fully implemented production-ready premium website
- ✅ Responsive design across all devices
- ✅ Premium animations and interactions
- ✅ Contact form with validation
- ✅ SEO optimized structure

### Logo Package
- ✅ SVG favicon (`public/favicon.svg`)
- ✅ Vector-based logo component
- ✅ Black/white and full-color variants
- ✅ Scalable from favicon to large display
- ✅ Works in light/dark mode

### Favicon Set
- ✅ SVG favicon (scalable)
- ✅ PNG variants (16x16, 32x32)
- ✅ Apple touch icon (180x180)
- ✅ Android chrome icons (192x192, 512x512)
- ✅ Web app manifest

### Social Media Kit
- ✅ Profile pictures (LinkedIn, Twitter, Instagram)
- ✅ Cover images for social platforms
- ✅ Open Graph preview images
- ✅ Premium design consistent with brand

### Source Code
- ✅ Clean, well-documented TypeScript code
- ✅ Component library and design system
- ✅ Responsive and accessible components
- ✅ Performance optimized
- ✅ SEO ready

### Documentation
- ✅ Comprehensive README
- ✅ Component documentation
- ✅ Setup and deployment guides
- ✅ Customization instructions

## 🧪 Testing

### Quality Assurance
- Cross-browser testing (Chrome, Firefox, Safari, Edge)
- Cross-device testing (iOS, Android, Windows, macOS)
- Performance testing (Lighthouse, PageSpeed Insights)
- Accessibility testing (axe-core, WAVE)
- SEO testing (Google Search Console)

### Performance Targets
- **Lighthouse Performance**: ≥95
- **Lighthouse Accessibility**: ≥95
- **Lighthouse SEO**: ≥95
- **Lighthouse Best Practices**: ≥95

## 🔮 Future Enhancements

### Planned Features
- Multi-language support (English/Slovak)
- CMS integration (Sanity/Strapi)
- Blog section
- Case studies
- Client testimonials
- Advanced analytics dashboard

### Technical Improvements
- PWA capabilities
- Advanced caching strategies
- Real-time chat integration
- Advanced form handling
- API integrations

## 📞 Support

For questions, support, or customization requests:
- **Email**: info@crescere.sk
- **Phone**: +421 123 456 789
- **Address**: Bratislava, Slovensko

## 📄 License

This project is proprietary to Crescere. All rights reserved.

---

**Built with ❤️ by Crescere Team**

*Creating premium digital experiences for modern businesses*
