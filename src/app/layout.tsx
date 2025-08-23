import type { Metadata, Viewport } from 'next';
import { Montserrat, Poppins } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsentProvider } from '@/components/ui/CookieConsentProvider';

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://crescere.sk'),
  title: 'Crescere - Digitalizácia vášho podnikania',
  description: 'Transformujeme vaše podnikanie prostredníctvom digitálnych riešení. Od webových prezentácií až po komplexnú automatizáciu procesov.',
  keywords: 'digitálne podnikanie, webové stránky, automatizácia, digitálna transformácia, SEO, e-commerce',
  authors: [{ name: 'Tomáš Kušmirek, MBA z Crescere s.r.o.' }],
  creator: 'Crescere s.r.o.',
  publisher: 'Crescere s.r.o.',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'sk_SK',
    url: 'https://crescere.sk',
    title: 'Crescere - Digitalizácia vášho podnikania',
    description: 'Transformujeme vaše podnikanie prostredníctvom digitálnych riešení. Od webových prezentácií až po komplexnú automatizáciu procesov.',
    siteName: 'Crescere',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Crescere - Digitalizácia vášho podnikania',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crescere - Digitalizácia vášho podnikania',
    description: 'Transformujeme vaše podnikanie prostredníctvom digitálnych riešení. Od webových prezentácií až po komplexnú automatizáciu procesov.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    other: [
      { rel: 'mask-icon', url: '/favicon.svg', color: '#146321' },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#146321',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light',
  themeColor: '#146321',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sk" className={`${montserrat.variable} ${poppins.variable}`}>
      <head>
        {/* Favicon for all browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="mask-icon" href="/favicon.svg" color="#146321" />
        <meta name="msapplication-TileColor" content="#146321" />
        <meta name="theme-color" content="#146321" />
      </head>
      <body className="text-luxury-black antialiased">
        <CookieConsentProvider>
          <Navigation />
          <main>
            {children}
          </main>
          <Footer />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
