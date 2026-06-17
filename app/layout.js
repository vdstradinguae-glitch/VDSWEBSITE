import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://vdsdxb.ae';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VDS General Trading LLC | Agro Commodities, Medical Equipment & AI Automation – Dubai, UAE',
    template: '%s | VDS General Trading LLC',
  },
  description:
    'VDS General Trading LLC is a Dubai-based UAE-registered company specializing in wholesale agro commodity trading (onion, potato, garlic), MOHAP-compliant medical equipment supply, and AI voice & email automation agents. Serving GCC, Africa & South Asia markets.',
  keywords: [
    'VDS General Trading',
    'medical equipment supplier UAE',
    'agro commodity trading Dubai',
    'onion potato garlic exporter UAE',
    'AI automation agents UAE',
    'wholesale onion exporter Dubai',
    'MOHAP medical equipment',
    'GCC trading company',
    'Africa South Asia re-export Dubai',
  ],
  authors: [{ name: 'VDS General Trading LLC' }],
  creator: 'VDS General Trading LLC',
  publisher: 'VDS General Trading LLC',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'VDS General Trading LLC',
    title: 'VDS General Trading LLC – Trading Excellence Across Continents',
    description:
      'A UAE-registered Dubai trading house. Agro commodities, MOHAP-compliant healthcare equipment, and next-generation AI automation agents.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'VDS General Trading – Dubai headquarters',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VDS General Trading LLC – Trading Excellence Across Continents',
    description:
      'Agro commodities, MOHAP-compliant medical equipment, and AI automation. UAE-registered. Globally trusted.',
    images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: { icon: '/favicon.ico' },
};

export const viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'VDS General Trading LLC',
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      sameAs: [],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+971-54-269-5401',
          email: 'sales@vdsdxb.ae',
          contactType: 'sales',
          areaServed: ['AE', 'GCC', 'Africa', 'South Asia'],
          availableLanguage: ['English', 'Arabic'],
        },
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'VDS General Trading LLC',
      image: `${SITE_URL}/og.jpg`,
      url: SITE_URL,
      telephone: '+971-54-269-5401',
      email: 'sales@vdsdxb.ae',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      areaServed: ['United Arab Emirates', 'GCC', 'Africa', 'South Asia'],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="bg-white text-navy antialiased font-sans">
        {children}
        <Toaster theme="light" richColors position="top-center" />
      </body>
    </html>
  );
}
