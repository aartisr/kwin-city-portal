import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/SkipLink';
import ClientEnhancements from '@/components/ClientEnhancements';
import I18nProvider from '@/lib/i18n/I18nProvider';
import { SITE_CONFIG } from '@/config/site.config';
import { getLocaleDefinition, normalizeLocale } from '@/lib/i18n/messages';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://kwin-city.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;
const SITE_LOGO = `${SITE_URL}/icon`;
const LAST_UPDATED = `${SITE_CONFIG.lastUpdatedISO}T00:00:00+05:30`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: 'KWIN City Portal',
  title: {
    default: 'KWIN City | Knowledge · Wellbeing · Innovation | North Bengaluru',
    template: '%s | KWIN City',
  },
  description:
    'KWIN City is a proposed 465-acre knowledge-economy township in Doddaballapura, North Bengaluru. Semiconductors, aerospace, health-tech, renewables and world-class R&D — designed net-zero and evidence-first.',
  keywords: [
    'KWIN City',
    'Knowledge Wellbeing Innovation City',
    'North Bengaluru township',
    'Doddaballapura smart city',
    'KIADB development',
    'Bengaluru innovation hub',
    'semiconductor park Karnataka',
    'aerospace cluster Bengaluru',
    'sustainable city India',
    'knowledge economy India',
    'net zero township',
    'Karnataka investment',
    'STRR corridor',
    'Bengaluru airport city',
  ],
  authors: [{ name: 'KWIN City Research Team', url: SITE_URL }],
  creator: 'KWIN City Portal',
  publisher: 'KWIN City',
  category: 'Urban Development, Smart Cities, Investment',
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/feed.xml`,
      'text/plain': `${SITE_URL}/llms.txt`,
      'application/opensearchdescription+xml': `${SITE_URL}/opensearch.xml`,
    },
  },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icon', sizes: '512x512', type: 'image/png' }],
    apple: [{ url: '/apple-icon', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: 'KWIN City | Knowledge · Wellbeing · Innovation | North Bengaluru',
    description:
      'A 465-acre knowledge township in Doddaballapura, North Bengaluru. Evidence-first portal for investors, residents, researchers and urban-planning professionals.',
    type: 'website',
    url: SITE_URL,
    siteName: 'KWIN City',
    locale: 'en_IN',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'KWIN City — Knowledge, Wellbeing, Innovation Township, North Bengaluru',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@kwincity',
    creator: '@kwincity',
    title: 'KWIN City | Knowledge · Wellbeing · Innovation | North Bengaluru',
    description:
      'A 465-acre knowledge township in Doddaballapura, North Bengaluru. Evidence-first portal for investors, residents, and researchers.',
    images: [OG_IMAGE],
  },
  appleWebApp: {
    capable: true,
    title: 'KWIN City',
    statusBarStyle: 'black-translucent',
  },
  verification: {
    // STEP: Paste your Google Search Console HTML-tag token here.
    // Get it from: Search Console → Settings → Ownership verification → HTML tag
    // e.g. google: 'abc123XYZ',
    //
    // Bing verification is handled via public/BingSiteAuth.xml (already in place).
  },
  other: {
    'ai-policy': `${SITE_URL}/ai.txt`,
    'llms-policy': `${SITE_URL}/llms.txt`,
  },
};

const GLOBAL_DISCOVERY_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'KWIN City',
    alternateName: 'Knowledge Wellbeing Innovation City',
    url: SITE_URL,
    logo: SITE_LOGO,
    description:
      'KWIN City is presented on this portal as a proposed 465-acre knowledge-economy township in Doddaballapura, North Bengaluru, with KIADB cited in project materials.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Doddaballapura, Karnataka, India',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'North Bengaluru, Karnataka, India',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'hello@kwin-city.com',
      url: `${SITE_URL}/contact`,
      availableLanguage: ['en', 'kn', 'hi', 'ta'],
    },
    publishingPrinciples: `${SITE_URL}/trust`,
    knowsAbout: [
      'KWIN City',
      'Knowledge Wellbeing Innovation City',
      'Doddaballapura',
      'North Bengaluru',
      'Urban development',
      'Industrial infrastructure',
      'Research and innovation districts',
    ],
    sameAs: ['https://www.kiadb.in'],
    dateModified: LAST_UPDATED,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'KWIN City Portal',
    alternateName: ['KWIN City', 'Knowledge Wellbeing Innovation City', 'KWIN'],
    inLanguage: ['en-IN', 'kn-IN', 'hi-IN', 'ta-IN'],
    publisher: {
      '@id': `${SITE_URL}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    dateModified: LAST_UPDATED,
  },
];

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get('kwin_locale')?.value);

  return (
    <html lang={getLocaleDefinition(locale).htmlLang}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="alternate" type="application/rss+xml" title="KWIN City Updates Feed" href={`${SITE_URL}/feed.xml`} />
        <link rel="alternate" type="text/plain" title="LLM Usage Policy" href={`${SITE_URL}/llms.txt`} />
        <link rel="alternate" type="text/plain" title="AI Crawling Policy" href={`${SITE_URL}/ai.txt`} />
        <link
          rel="search"
          type="application/opensearchdescription+xml"
          title="KWIN City Search"
          href={`${SITE_URL}/opensearch.xml`}
        />
        {/* PWA — mobile app experience */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KWIN City" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(GLOBAL_DISCOVERY_SCHEMA) }}
        />
        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} bg-white text-gray-900 overflow-x-hidden`}>
        <I18nProvider initialLocale={locale}>
          <SkipLink />
          <ClientEnhancements />
          {children}
        </I18nProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
