import type { Metadata } from 'next';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const SITE_URL = 'https://kwin-city.com';
const OG_IMAGE = `${SITE_URL}/opengraph-image`;

export async function generateHomeMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const title = pickByLocale(locale, {
    en: 'KWIN City | North Bengaluru Knowledge Township, Evidence & Share Kit',
    kn: 'KWIN City | ಜ್ಞಾನ · ಕ್ಷೇಮ · ನವೀನತೆ | ಉತ್ತರ ಬೆಂಗಳೂರು',
    hi: 'KWIN City | ज्ञान · कल्याण · नवाचार | नॉर्थ बेंगलुरु',
  });
  const description = pickByLocale(locale, {
    en: 'Explore and share KWIN City in North Bengaluru through a 60-second brief, verified sources, project updates, sector analysis, regional data, and evidence-first research on the proposed 465-acre township.',
    kn: 'KWIN City ಉತ್ತರ ಬೆಂಗಳೂರಿನ ದೊಡ್ಡಬಳ್ಳಾಪುರದಲ್ಲಿ ಪ್ರಸ್ತಾಪಿತ 465 ಏಕರೆ ಜ್ಞಾನ-ಆರ್ಥಿಕ ಟೌನ್‌ಶಿಪ್.',
    hi: 'KWIN City नॉर्थ बेंगलुरु के डोड्डाबल्लापुर में प्रस्तावित 465 एकड़ ज्ञान-आर्थिक टाउनशिप है।',
  });

  return {
    title,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title,
      description,
      url: SITE_URL,
      type: 'website',
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: 'KWIN City - source-linked 60-second brief for North Bengaluru',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}
