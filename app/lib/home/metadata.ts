import type { Metadata } from 'next';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateHomeMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();

  return {
    title: pickByLocale(locale, {
      en: 'KWIN City | North Bengaluru Knowledge Township, Evidence & Updates',
      kn: 'KWIN City | ಜ್ಞಾನ · ಕ್ಷೇಮ · ನವೀನತೆ | ಉತ್ತರ ಬೆಂಗಳೂರು',
      hi: 'KWIN City | ज्ञान · कल्याण · नवाचार | नॉर्थ बेंगलुरु',
    }),
    description: pickByLocale(locale, {
      en: 'Explore KWIN City in North Bengaluru through verified sources, project updates, sector analysis, regional data, and evidence-first research on the proposed 465-acre township.',
      kn: 'KWIN City ಉತ್ತರ ಬೆಂಗಳೂರಿನ ದೊಡ್ಡಬಳ್ಳಾಪುರದಲ್ಲಿ ಪ್ರಸ್ತಾಪಿತ 465 ಏಕರೆ ಜ್ಞಾನ-ಆರ್ಥಿಕ ಟೌನ್‌ಶಿಪ್.',
      hi: 'KWIN City नॉर्थ बेंगलुरु के डोड्डाबल्लापुर में प्रस्तावित 465 एकड़ ज्ञान-आर्थिक टाउनशिप है।',
    }),
    alternates: {
      canonical: 'https://kwin-city.com',
    },
  };
}
