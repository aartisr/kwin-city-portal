import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import UpdatesFeed from '@/components/UpdatesFeed';
import JsonLd from '@/components/JsonLd';
import { getUpdatesSchemas } from '@/lib/updates/schemas';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'KWIN City Updates | Milestones, Official Signals, Portal Releases & Project Changes', kn: 'KWIN City ನವೀಕರಣಗಳು — ಮೈಲಿಗಲ್ಲುಗಳು ಮತ್ತು ಘೋಷಣೆಗಳು', hi: 'KWIN City अपडेट्स — माइलस्टोन और घोषणाएँ' }),
    description: pickByLocale(locale, {
      en: 'Browse KWIN City milestones, official signals, portal releases, and project changes with transparent verification labels and permanent update URLs.',
      kn: 'KWIN Cityಗಾಗಿ ಅಧಿಕೃತ ಮೈಲಿಗಲ್ಲುಗಳು, ಪೋರ್ಟಲ್ ಸುಧಾರಣೆಗಳು ಮತ್ತು ಘೋಷಣೆಗಳು.',
      hi: 'KWIN City के लिए आधिकारिक माइलस्टोन, पोर्टल सुधार और घोषणाएँ।',
    }),
    keywords: ['KWIN City updates', 'KWIN milestones', 'KWIN City news', 'North Bengaluru development updates', 'KIADB milestones'],
    alternates: { canonical: 'https://kwin-city.com/updates' },
    openGraph: {
      title: pickByLocale(locale, { en: 'KWIN City Updates — Canonical Project Milestones and Official Signals', kn: 'KWIN City ನವೀಕರಣಗಳು — ಮೈಲಿಗಲ್ಲುಗಳು, ಡೇಟಾ ಮತ್ತು ಪೋರ್ಟಲ್ ಸುದ್ದಿ', hi: 'KWIN City अपडेट्स — माइलस्टोन, डेटा और पोर्टल समाचार' }),
      description: pickByLocale(locale, {
        en: 'Follow KWIN City updates with verification-first labels, permanent URLs, source-linked context, and project milestones for North Bengaluru\'s proposed knowledge township.',
        kn: 'KWIN City ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಪೋರ್ಟಲ್ ಸುಧಾರಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವ ಪಾರದರ್ಶಕ ಚೇಂಜ್‌ಲಾಗ್.',
        hi: 'KWIN City विकास और पोर्टल सुधारों को ट्रैक करने वाला पारदर्शी चेंजलॉग।',
      }),
      url: 'https://kwin-city.com/updates',
      type: 'website',
      images: [{ url: 'https://kwin-city.com/updates/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pickByLocale(locale, { en: 'KWIN City Updates — Canonical Project Milestones and Official Signals', kn: 'KWIN City ನವೀಕರಣಗಳು — ಮೈಲಿಗಲ್ಲುಗಳು, ಡೇಟಾ ಮತ್ತು ಪೋರ್ಟಲ್ ಸುದ್ದಿ', hi: 'KWIN City अपडेट्स — माइलस्टोन, डेटा और पोर्टल समाचार' }),
      description: pickByLocale(locale, {
        en: 'Follow KWIN City updates with verification-first labels, permanent URLs, source-linked context, and project milestones for North Bengaluru\'s proposed knowledge township.',
        kn: 'ಪರಿಶೀಲನೆ-ಮೊದಲು KWIN City ಅಧಿಕೃತ ನವೀಕರಣಗಳು.',
        hi: 'सत्यापन-प्रथम KWIN City आधिकारिक अपडेट्स।',
      }),
      images: ['https://kwin-city.com/updates/opengraph-image'],
    },
  };
}

export default function UpdatesRoute() {
  return (
    <SiteFrame>
      <JsonLd data={getUpdatesSchemas()} />
      <UpdatesFeed />
    </SiteFrame>
  );
}
