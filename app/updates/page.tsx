import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import UpdatesFeed from '@/components/UpdatesFeed';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'KWIN City Updates — Milestones & Announcements', kn: 'KWIN City ನವೀಕರಣಗಳು — ಮೈಲಿಗಲ್ಲುಗಳು ಮತ್ತು ಘೋಷಣೆಗಳು', hi: 'KWIN City अपडेट्स — माइलस्टोन और घोषणाएँ' }),
    description: pickByLocale(locale, {
      en: 'Official milestones, portal improvements, and project announcements for KWIN City — all tracked with transparent verification tiers.',
      kn: 'KWIN Cityಗಾಗಿ ಅಧಿಕೃತ ಮೈಲಿಗಲ್ಲುಗಳು, ಪೋರ್ಟಲ್ ಸುಧಾರಣೆಗಳು ಮತ್ತು ಘೋಷಣೆಗಳು.',
      hi: 'KWIN City के लिए आधिकारिक माइलस्टोन, पोर्टल सुधार और घोषणाएँ।',
    }),
    keywords: ['KWIN City updates', 'KWIN milestones', 'KWIN City news', 'North Bengaluru development updates', 'KIADB milestones'],
    alternates: { canonical: 'https://kwin-city.com/updates' },
    openGraph: {
      title: pickByLocale(locale, { en: 'KWIN City Updates — Milestones, Data & Portal News', kn: 'KWIN City ನವೀಕರಣಗಳು — ಮೈಲಿಗಲ್ಲುಗಳು, ಡೇಟಾ ಮತ್ತು ಪೋರ್ಟಲ್ ಸುದ್ದಿ', hi: 'KWIN City अपडेट्स — माइलस्टोन, डेटा और पोर्टल समाचार' }),
      description: pickByLocale(locale, {
        en: 'A transparent changelog tracking every significant KWIN City development and portal improvement.',
        kn: 'KWIN City ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಪೋರ್ಟಲ್ ಸುಧಾರಣೆಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡುವ ಪಾರದರ್ಶಕ ಚೇಂಜ್‌ಲಾಗ್.',
        hi: 'KWIN City विकास और पोर्टल सुधारों को ट्रैक करने वाला पारदर्शी चेंजलॉग।',
      }),
      url: 'https://kwin-city.com/updates',
      type: 'website',
    },
  };
}

export default function UpdatesRoute() {
  return (
    <SiteFrame>
      <UpdatesFeed />
    </SiteFrame>
  );
}
