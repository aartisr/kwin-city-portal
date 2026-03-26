import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

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
    // Add Google Search Console & Bing verification tokens here when available
    // google: 'YOUR_GOOGLE_VERIFICATION_TOKEN',
    // other: { 'msvalidate.01': ['YOUR_BING_TOKEN'] },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        {/* Preconnect to external origins for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} bg-white text-gray-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
