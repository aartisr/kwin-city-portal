import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import DownloadsPage from '@/components/DownloadsPage';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Document Downloads | Resource Library',
      kn: 'ದಸ್ತಾವೇಜು ಡೌನ್‌ಲೋಡ್‌ಗಳು | ಸಂಪನ್ಮೂಲ ಗ್ರಂಥಾಲಯ',
      hi: 'दस्तावेज़ डाउनलोड | संसाधन पुस्तकालय',
    }),
    description: pickByLocale(locale, {
      en: 'Official reports, policy briefs, open datasets, and project documents for KWIN City — all sourced, verified, and downloadable.',
      kn: 'KWIN Cityಗಾಗಿ ಅಧಿಕೃತ ವರದಿಗಳು, ನೀತಿ ಸಂಕ್ಷಿಪ್ತಗಳು ಮತ್ತು ಡೇಟಾಸೆಟ್‌ಗಳು.',
      hi: 'KWIN City के लिए आधिकारिक रिपोर्ट, नीति सार और डेटासेट।',
    }),
    keywords: [
      'KWIN City documents', 'KIADB reports', 'KWIN downloads', 'Karnataka industrial policy', 'North Bengaluru data',
    ],
    alternates: { canonical: 'https://kwin-city.com/downloads' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City Document Library — Reports, Policy & Open Data',
        kn: 'KWIN City ದಸ್ತಾವೇಜು ಗ್ರಂಥಾಲಯ — ವರದಿಗಳು, ನೀತಿ ಮತ್ತು ಓಪನ್ ಡೇಟಾ',
        hi: 'KWIN City दस्तावेज़ पुस्तकालय — रिपोर्ट, नीति और ओपन डेटा',
      }),
      description: pickByLocale(locale, {
        en: 'Transparent, tiered document library covering everything from official KIADB notifications to open datasets.',
        kn: 'ಅಧಿಕೃತ KIADB ಸೂಚನೆಗಳಿಂದ ಓಪನ್ ಡೇಟಾಸೆಟ್‌ಗಳವರೆಗೆ ಪಾರದರ್ಶಕ ದಸ್ತಾವೇಜು ಗ್ರಂಥಾಲಯ.',
        hi: 'आधिकारिक KIADB नोटिस से ओपन डेटासेट तक पारदर्शी दस्तावेज़ पुस्तकालय।',
      }),
      url: 'https://kwin-city.com/downloads',
      type: 'website',
    },
  };
}

export default function DownloadsRoute() {
  return (
    <SiteFrame>
      <DownloadsPage />
    </SiteFrame>
  );
}
