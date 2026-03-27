import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import './globals.css';
import { SkipLink } from '@/components/SkipLink';
import PwaRegistration from '@/components/PwaRegistration';
import PwaInstallPrompt from '@/components/PwaInstallPrompt';
import PageAnalytics from '@/components/PageAnalytics';
import I18nProvider from '@/lib/i18n/I18nProvider';
import { HTML_LANG, normalizeLocale } from '@/lib/i18n/messages';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const SITE_URL = 'https://kwin-city.com';
const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  verification: {
    // STEP: Paste your Google Search Console HTML-tag token here.
    // Get it from: Search Console → Settings → Ownership verification → HTML tag
    // e.g. google: 'abc123XYZ',
    //
    // Bing verification is handled via public/BingSiteAuth.xml (already in place).
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const locale = normalizeLocale(cookieStore.get('kwin_locale')?.value);

  return (
    <html lang={HTML_LANG[locale]}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        {/* PWA — mobile app experience */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="KWIN City" />
        <link rel="manifest" href="/manifest.webmanifest" />
        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} bg-white text-gray-900 overflow-x-hidden`}>
        <I18nProvider initialLocale={locale}>
          <SkipLink />
          <PwaRegistration />
          <PwaInstallPrompt />
          <PageAnalytics />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
