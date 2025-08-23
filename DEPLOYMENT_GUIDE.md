# Crescere Website Deployment Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0.0 or higher
- npm, yarn, or pnpm package manager
- Git for version control
- Vercel account (recommended) or alternative hosting service

### 1. Environment Setup

```bash
# Install Node.js (if not already installed)
# Visit: https://nodejs.org/en/download/

# Verify installation
node --version
npm --version

# Clone repository (if not already done)
git clone https://github.com/your-username/crescere-website.git
cd crescere-website
```

### 2. Install Dependencies

```bash
# Using npm (recommended)
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### 3. Development Server

```bash
# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### 4. Build for Production

```bash
# Create production build
npm run build

# Start production server
npm run start

# Export static files (if needed)
npm run export
```

## 🌐 Deployment Options

### Vercel (Recommended)

Vercel provides the best experience for Next.js applications with automatic deployments, preview environments, and excellent performance.

#### Setup Steps:

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Domain**
   - Go to Vercel dashboard
   - Add custom domain (e.g., crescere.sk)
   - Configure DNS settings

#### Environment Variables:
```bash
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://crescere.sk
```

#### Automatic Deployments:
- Connect GitHub repository
- Enable automatic deployments on push
- Configure preview deployments for pull requests

### Netlify

Alternative hosting platform with good Next.js support.

#### Setup Steps:

1. **Build Command**
   ```bash
   npm run build
   ```

2. **Publish Directory**
   ```
   .next
   ```

3. **Environment Variables**
   - Add in Netlify dashboard
   - Same as Vercel configuration

### AWS Amplify

Enterprise-grade hosting with AWS integration.

#### Setup Steps:

1. **Connect Repository**
   - Connect GitHub/Bitbucket repository
   - Select main branch

2. **Build Settings**
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
   ```

### Self-Hosting

For complete control over hosting environment.

#### Requirements:
- Node.js 18+ server
- Reverse proxy (Nginx/Apache)
- SSL certificate
- Domain configuration

#### Setup Steps:

1. **Server Setup**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Install PM2 for process management
   npm install -g pm2
   ```

2. **Application Setup**
   ```bash
   # Clone repository
   git clone https://github.com/your-username/crescere-website.git
   cd crescere-website

   # Install dependencies
   npm install

   # Build application
   npm run build

   # Start with PM2
   pm2 start npm --name "crescere-website" -- start
   pm2 startup
   pm2 save
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name crescere.sk www.crescere.sk;
       return 301 https://$server_name$request_uri;
   }

   server {
       listen 443 ssl http2;
       server_name crescere.sk www.crescere.sk;

       ssl_certificate /path/to/certificate.crt;
       ssl_certificate_key /path/to/private.key;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## 🔧 Configuration

### Next.js Configuration

The `next.config.js` file is already configured for optimal performance:

```javascript
/** @type {import('next').Config} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
```

### Environment Variables

Create `.env.local` file for local development:

```bash
# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Crescere

# Contact Form (if using external service)
CONTACT_FORM_ENDPOINT=https://api.example.com/contact
CONTACT_FORM_API_KEY=your-api-key
```

### TailwindCSS Configuration

The `tailwind.config.js` is configured with the Crescere brand colors and typography:

```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'luxury-black': '#060D0D',
        'premium-white': '#F5F4EB',
        'emerald-green': '#146321',
        // ... more colors
      },
      // ... typography and animations
    },
  },
  plugins: [],
}
```

## 📱 Performance Optimization

### Core Web Vitals

The website is optimized for Core Web Vitals:

- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Features

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Automatic route-based code splitting
- **Bundle Analysis**: `npm run analyze` for bundle inspection
- **Lazy Loading**: Components load only when needed
- **Font Optimization**: Google Fonts with display swap

### Performance Monitoring

```bash
# Build analysis
npm run analyze

# Lighthouse testing
npx lighthouse http://localhost:3000 --view

# Bundle size analysis
npx @next/bundle-analyzer
```

## 🔒 Security

### Security Headers

The website includes security headers:

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
]
```

### Content Security Policy

```javascript
{
  key: 'Content-Security-Policy',
  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' *.vercel-insights.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; font-src 'self' data:;"
}
```

## 📊 Analytics & Monitoring

### Google Analytics

```javascript
// _app.tsx or layout.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}
```

### Vercel Analytics

```bash
# Install Vercel Analytics
npm install @vercel/analytics

# Add to layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🧪 Testing

### Quality Assurance

```bash
# Lint code
npm run lint

# Type checking
npm run type-check

# Build testing
npm run build

# Performance testing
npm run analyze
```

### Cross-Browser Testing

- **Chrome**: Latest version
- **Firefox**: Latest version
- **Safari**: Latest version
- **Edge**: Latest version
- **Mobile**: iOS Safari, Chrome Mobile

### Device Testing

- **iPhone**: All generations (320px - 428px)
- **Android**: Various screen sizes
- **Tablet**: iPad, Android tablets
- **Desktop**: Various resolutions
- **Ultrawide**: 1440px+ monitors

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment Secrets

Add to GitHub repository secrets:

- `VERCEL_TOKEN`: Vercel API token
- `ORG_ID`: Vercel organization ID
- `PROJECT_ID`: Vercel project ID

## 📈 Monitoring & Maintenance

### Health Checks

```bash
# Check application status
curl -f http://localhost:3000/api/health

# Monitor performance
npm run analyze

# Check bundle size
npx @next/bundle-analyzer
```

### Regular Maintenance

- **Weekly**: Performance monitoring
- **Monthly**: Dependency updates
- **Quarterly**: Security audits
- **Annually**: Major version updates

### Backup Strategy

- **Code**: Git repository
- **Database**: Automated backups (if applicable)
- **Assets**: CDN with redundancy
- **Configuration**: Environment variable backups

## 🆘 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### Performance Issues
```bash
# Analyze bundle
npm run analyze

# Check Core Web Vitals
npx lighthouse http://localhost:3000
```

#### Deployment Issues
```bash
# Check logs
vercel logs

# Redeploy
vercel --prod
```

### Support Resources

- **Documentation**: This guide and README.md
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Community**: GitHub Issues, Stack Overflow

## 🎯 Next Steps

### Immediate Actions

1. **Set up environment** with Node.js and npm
2. **Install dependencies** and test locally
3. **Configure environment variables**
4. **Deploy to Vercel** or preferred platform
5. **Set up custom domain**

### Future Enhancements

- **CMS Integration**: Sanity, Strapi, or Contentful
- **Multi-language**: English/Slovak support
- **Blog Section**: Content management system
- **Advanced Analytics**: Custom dashboards
- **PWA Features**: Offline support, app-like experience

---

**Last Updated**: December 2024  
**Version**: 1.0  
**Next Review**: March 2025
