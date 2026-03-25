import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'KWIN City | Knowledge, Wellbeing, Innovation | BAJA Associates',
    template: '%s | BAJA Associates',
  },
  description: 'KWIN City - Doddaballapura, Bengaluru. A knowledge-driven, innovation-focused township in North Bengaluru featuring world-class infrastructure, research institutions, and sustainable development.',
  keywords: ['KWIN City', 'Bengaluru', 'Innovation', 'Knowledge District', 'Wellbeing', 'Doddaballapura'],
  authors: [{ name: 'Aarti S Ravikumar' }],
  creator: 'BAJA Associates',
  openGraph: {
    title: 'KWIN City | Knowledge, Wellbeing, Innovation | BAJA Associates',
    description: 'A vision for sustainable urban development and knowledge-based growth in North Bengaluru',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City | Knowledge, Wellbeing, Innovation | BAJA Associates',
    description: 'A vision for sustainable urban development and knowledge-based growth in North Bengaluru',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description as string} />
        <link rel="canonical" href="https://kwin.city" />
      </head>
      <body className={`${inter.variable} bg-white text-gray-900 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
