import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { SmartWhatsAppPopup } from '@/components/SmartWhatsAppPopup';
import { AtmosphericBackground } from '@/components/AtmosphericBackground';
import { MarketingScripts } from '@/components/marketing/MarketingScripts';

export const metadata: Metadata = {
  metadataBase: new URL('https://totodevelopment.com'),
  title: {
    default: 'TOTO Development — Digital Solutions Behind Modern Businesses',
    template: '%s | TOTO Development',
  },
  description:
    'Premier technology and creative growth agency. We engineer custom enterprise software, sub-second Next.js web platforms, high-ROAS Meta/Google ads, and commercial 3D packaging for ambitious brands.',
  keywords: [
    'TOTO Development',
    'Custom Software Bangladesh',
    'Software Development Khulna',
    'Digital Agency Khulna',
    'High-ROAS Meta Ads',
    'Google Ads Agency',
    'Commercial 3D Packaging',
    'Video Editing Agency',
    'Enterprise ERP Systems',
  ],
  authors: [{ name: 'TOTO Development' }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'TOTO Development — Digital Solutions Behind Modern Businesses',
    description:
      'We engineer custom software, Next.js web platforms, high-ROAS ad campaigns, and commercial 3D packaging for ambitious businesses.',
    url: 'https://totodevelopment.com',
    siteName: 'TOTO Development',
    images: [
      {
        url: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/toto%20new%20new%20logo.jpg',
        width: 1200,
        height: 630,
        alt: 'TOTO Development — Digital Flagship',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TOTO Development — Digital Solutions Behind Modern Businesses',
    description:
      'Custom software, high-throughput Next.js web platforms, performance ads, and commercial 3D packaging.',
    images: [
      'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/toto%20new%20new%20logo.jpg',
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const JSON_LD_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'TOTO Development',
  url: 'https://totodevelopment.com',
  logo: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/toto%20new%20new%20logo.jpg',
  image: 'https://cdn.jsdelivr.net/gh/YousufMax/image-server-001@main/toto%20new%20new%20logo.jpg',
  telephone: '+880-1410-003423',
  email: 'hello@totodevelopment.com',
  priceRange: '৳৳৳',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '256 Upper Road, Mou Market 3rd Floor, Sonadanga',
    addressLocality: 'Khulna',
    postalCode: '9000',
    addressCountry: 'BD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '48',
    bestRating: '5',
  },
  sameAs: [
    'https://linkedin.com/company/toto-development',
    'https://facebook.com/totodevelopment',
    'https://instagram.com/totodevelopment',
    'https://youtube.com/@totodevelopment',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SCHEMA) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="bg-[#050705] text-[#dae6d3] antialiased selection:bg-[#00FC43] selection:text-[#041608] min-h-screen relative flex flex-col"
      >
        <MarketingScripts />
        <AtmosphericBackground />
        <Navbar />
        <main className="relative z-10 bg-[#050705] flex-grow min-h-screen">{children}</main>
        <Footer />
        <FloatingWhatsApp />
        <SmartWhatsAppPopup />
      </body>
    </html>
  );
}
