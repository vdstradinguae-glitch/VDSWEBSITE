import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

// Always hardcoded to production — do NOT use NEXT_PUBLIC_BASE_URL from emergent.sh
const SITE_URL = 'https://vdsdxb.ae';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VDS General Trading LLC | AI Automation, Digital Marketing & Trading — Dubai UAE',
    template: '%s | VDS General Trading LLC Dubai',
  },
  description:
    'Dubai-based UAE trading company: AI voice automation agents, SEO & digital marketing, agro commodity trading, and MOHAP-compliant medical equipment. Serving UAE, GCC, MENA, US.',
  keywords: [
    'AI voice automation UAE',
    'AI agents Dubai',
    'digital marketing agency Dubai',
    'SEO services Dubai',
    'GEO AEO optimization UAE',
    'AI automation company Dubai',
    'agro commodity trading Dubai',
    'wholesale onion exporter UAE',
    'potato garlic supplier GCC',
    'medical equipment supplier UAE',
    'MOHAP medical equipment Dubai',
    'healthcare equipment rental UAE',
    'VDS General Trading LLC',
    'trading company Dubai UAE',
    'GCC trading company',
  ],
  authors: [{ name: 'VDS General Trading LLC', url: SITE_URL }],
  creator: 'VDS General Trading LLC',
  publisher: 'VDS General Trading LLC',
  alternates: { canonical: SITE_URL + '/' },
  openGraph: {
    type: 'website',
    locale: 'en_AE',
    url: SITE_URL,
    siteName: 'VDS General Trading LLC',
    title: 'VDS General Trading LLC | AI Automation & Trading — Dubai UAE',
    description:
      'UAE-registered Dubai company: AI voice agents, digital marketing (SEO/GEO/AEO), agro commodity trading & MOHAP medical equipment. Serving UAE, GCC, MENA & US.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'VDS General Trading LLC — Dubai, UAE',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VDS General Trading LLC | AI Automation & Trading — Dubai UAE',
    description:
      'AI automation, SEO/GEO/AEO digital marketing, agro commodities & medical equipment. UAE-registered. Serving UAE, GCC, MENA & US.',
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
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  themeColor: '#0d1b2a',
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'VDS General Trading LLC',
      legalName: 'VDS General Trading LLC',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
        width: 200,
        height: 200,
      },
      foundingDate: '2024',
      description:
        'UAE-registered Dubai trading company offering AI voice automation, digital marketing (SEO/GEO/AEO), agro commodity trading, and MOHAP-compliant medical equipment supply.',
      sameAs: [
        'https://www.linkedin.com/company/vds-general-trading',
        'https://www.facebook.com/vdsgeneraltrading',
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+971-54-269-5401',
          email: 'sales@vdsdxb.ae',
          contactType: 'sales',
          areaServed: ['AE', 'SA', 'OM', 'KW', 'QA', 'BH', 'US', 'GB', 'DE'],
          availableLanguage: ['English', 'Arabic'],
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
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
      currenciesAccepted: 'AED, USD, EUR',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Dubai',
        addressLocality: 'Dubai',
        addressRegion: 'Dubai',
        addressCountry: 'AE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 25.2048,
        longitude: 55.2708,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Saudi Arabia' },
        { '@type': 'Country', name: 'Kuwait' },
        { '@type': 'Country', name: 'Qatar' },
        { '@type': 'Country', name: 'Bahrain' },
        { '@type': 'Country', name: 'Oman' },
        { '@type': 'Country', name: 'United States' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'VDS General Trading Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'AI Voice & Email Automation Agents UAE',
              url: `${SITE_URL}/ai-automation`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Digital Marketing SEO GEO AEO Dubai',
              url: `${SITE_URL}/digital-marketing`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Agro Commodity Trading Dubai',
              url: `${SITE_URL}/agro-trading`,
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'MOHAP Medical Equipment Supply UAE',
              url: `${SITE_URL}/healthcare-equipment`,
            },
          },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services does VDS General Trading LLC offer in the UAE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VDS General Trading LLC offers four core services in the UAE: AI voice and email automation agents, digital marketing (SEO, GEO, AEO), wholesale agro commodity trading (onion, potato, garlic), and MOHAP-compliant medical equipment supply and rental.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is VDS General Trading LLC registered in the UAE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. VDS General Trading LLC is a UAE-registered Limited Liability Company headquartered in Dubai, serving UAE, GCC, MENA, Europe and United States.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is GEO and AEO in digital marketing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'GEO (Generative Engine Optimisation) optimises your business to be cited by AI tools like ChatGPT, Perplexity and Google AI Overviews. AEO (Answer Engine Optimisation) structures your content to appear in direct answer boxes and voice search. VDS offers both for UAE businesses.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does VDS supply MOHAP-approved medical equipment in UAE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. VDS General Trading LLC supplies MOHAP-compliant medical equipment to hospitals, clinics, polyclinics and medical distributors across the UAE with full documentation and traceability.',
          },
        },
        {
          '@type': 'Question',
          name: 'What agro commodities does VDS export from Dubai?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'VDS trades and re-exports onion, potato, garlic, ginger, pulses, spices and dry grocery through Jebel Ali to UAE, GCC, Europe and United States.',
          },
        },
      ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-navy antialiased font-sans">
        {children}
        <Toaster theme="light" richColors position="top-center" />
      </body>
    </html>
  );
}
