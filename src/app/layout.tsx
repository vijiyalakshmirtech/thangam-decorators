import type { Metadata } from 'next';
import React from 'react';
import '@/styles/globals.css';
import { SmoothScrollProvider } from '@/components/site/SmoothScrollProvider';
import { AnalyticsInitializer } from '@/components/site/AnalyticsInitializer';

export const metadata: Metadata = {
  metadataBase: new URL('https://thangam-decorators.vercel.app'),
  title: 'Thangam Decorators — Wedding & Stage Decoration in Erode',
  description: 'Bespoke wedding mandapams, reception stages, and traditional floral decoration by P.T. Selvam in Erode. Contact +91 98426 69882 for consultations.',
  authors: [{ name: 'P.T. Selvam — Thangam Decorators' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Thangam Decorators',
    url: 'https://thangam-decorators.vercel.app/',
    title: 'Thangam Decorators — Wedding & Stage Decoration in Erode',
    description: 'Bespoke wedding mandapams, reception stages, and traditional floral decoration by P.T. Selvam in Erode.',
    locale: 'en_IN',
    images: [
      {
        url: 'https://thangam-decorators.vercel.app/assets/brand/og-image.webp',
        secureUrl: 'https://thangam-decorators.vercel.app/assets/brand/og-image.webp',
        type: 'image/webp',
        width: 1200,
        height: 630,
        alt: 'Thangam Decorators — Luxury Wedding and Stage Decoration in Erode',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thangam Decorators — Wedding & Stage Decoration in Erode',
    description: 'Bespoke wedding mandapams, reception stages, and traditional floral decoration by P.T. Selvam in Erode.',
    images: ['https://thangam-decorators.vercel.app/assets/brand/og-image.webp'],
  },
  verification: {
    google: 'g2_TAj0e5UClwExQqGPLR9BwmorAJrmHweiFFMLhILo',
  },
  icons: {
    icon: '/assets/brand/logo.jpg',
    apple: '/assets/brand/logo.jpg',
  },
  other: {
    'geo.region': 'IN-TN',
    'geo.placename': 'Erode',
    'geo.position': '11.3410;77.7172',
    ICBM: '11.3410, 77.7172',
    'theme-color': '#F7F0E4',
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://thangam-decorators.vercel.app/#website',
      url: 'https://thangam-decorators.vercel.app/',
      name: 'Thangam Decorators',
      alternateName: 'தங்கம் டெக்கரேட்டர்ஸ்',
      description: 'Bespoke wedding mandapams, reception stages, and floral decoration in Erode by P.T. Selvam.',
      publisher: {
        '@id': 'https://thangam-decorators.vercel.app/#business',
      },
      inLanguage: ['en-IN', 'ta-IN'],
    },
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://thangam-decorators.vercel.app/#business',
      name: 'Thangam Decorators',
      alternateName: 'தங்கம் டெக்கரேட்டர்ஸ்',
      url: 'https://thangam-decorators.vercel.app/',
      logo: 'https://thangam-decorators.vercel.app/assets/brand/logo.jpg',
      image: 'https://thangam-decorators.vercel.app/assets/brand/og-image.webp',
      telephone: '+919842669882',
      email: 'Ptselvam4970@gmail.com',
      priceRange: '₹₹',
      founder: {
        '@type': 'Person',
        name: 'P.T. Selvam',
        jobTitle: 'Proprietor & Stage Designer',
      },
      address: {
        '@type': 'PostalAddress',
        streetAddress: '7/11, Agathiyar Veethi',
        addressLocality: 'Erode',
        postalCode: '638001',
        addressRegion: 'Tamil Nadu',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 11.341,
        longitude: 77.7172,
      },
      areaServed: [
        { '@type': 'City', name: 'Erode' },
        { '@type': 'City', name: 'Perundurai' },
        { '@type': 'City', name: 'Bhavani' },
        { '@type': 'City', name: 'Gobichettipalayam' },
        { '@type': 'City', name: 'Tiruppur' },
        { '@type': 'City', name: 'Salem' },
        { '@type': 'City', name: 'Coimbatore' },
        { '@type': 'City', name: 'Namakkal' },
        { '@type': 'City', name: 'Karur' },
        { '@type': 'AdministrativeArea', name: 'Tamil Nadu' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Stage & Event Decoration Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Traditional Wedding & Muhurtham Mandapam Decoration',
              description: 'Authentic South Indian Vedic temple mandapams with carved pillars, fresh jasmine, and lotus garlands.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Grand Evening Reception Stage Decoration',
              description: 'Luxury reception backdrops, cascading floral columns, crystal chandeliers, and ambient stage lighting.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Pre-Wedding & Family Ceremony Decor',
              description: 'Haldi canopy swings, Engagement backdrops, Seemantham cradle decor, and Gruhapravesam setups.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Cultural & Floral Alankaram Artistry',
              description: 'Traditional flower garlands, deity alankarams, and temple festival stage decor.',
            },
          },
        ],
      },
      sameAs: [
        'https://www.instagram.com/selvampts/',
        'https://www.facebook.com/people/Thangam-Decorators/100065652632732/',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://thangam-decorators.vercel.app/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which locations in Tamil Nadu does Thangam Decorators serve?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We are based in Erode (638 001) and regularly execute wedding, reception, and event decorations across Erode district, Perundurai, Bhavani, Gobichettipalayam, Tiruppur, Salem, Coimbatore, Namakkal, and Karur.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of stage decoration services do you provide?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We specialize in 4 core decor offerings: Traditional Muhurtham Mandapams, Grand Reception Stages with floral arches and candelabras, Pre-Wedding family ceremonies (Haldi, Mehendi, Seemantham), and Temple Festival Alankarams.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can you create a custom stage design from our reference photos?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. P.T. Selvam and our stage craftsmanship team work directly with you to adapt inspiration photos to your specific wedding hall dimensions, lighting setup, and aesthetic preferences.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you use fresh flowers for traditional Muhurtham Mandapams?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. We directly source fresh temple jasmine (malli), lotus blooms, marigolds, and sevvanthi daily from regional flower markets for authentic fragrance and traditional sacred beauty.',
          },
        },
        {
          '@type': 'Question',
          name: 'How early should we book our wedding stage decoration?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'For auspicious Tamil Muhurtham dates (especially during peak wedding months), we recommend booking 2 to 4 months in advance to lock in your date. For intimate home functions, we accept bookings with shorter lead times subject to availability.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where can we view photographs of your authentic past stage setups?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can explore our verified Portfolio gallery on this website, featuring real client stage setups photographed on-site across wedding venues in Erode and Western Tamil Nadu.',
          },
        },
        {
          '@type': 'Question',
          name: 'How can we discuss our event requirements and receive a quote?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You can call P.T. Selvam directly at +91 98426 69882, send an inquiry via WhatsApp, or submit your event details through our online consultation form.',
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Mukta+Malar:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@400;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="bg-[#F7F0E4] text-[#1F161A] font-sans antialiased min-h-screen selection:bg-[#6E1830] selection:text-[#FFFDF8] overflow-x-hidden">
        <AnalyticsInitializer />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
