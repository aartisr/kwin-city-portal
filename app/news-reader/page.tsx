import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import NewsReaderExperience from '@/components/NewsReaderExperience';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'OPML News Reader', kn: 'OPML ಸುದ್ದಿ ಓದುಗ', hi: 'OPML न्यूज़ रीडर' }),
    description: pickByLocale(locale, {
      en: 'Use the KWIN City OPML news reader to scan source-attributed feeds, summary-first story cards, and direct publisher links for Bengaluru and KWIN-related updates.',
      kn: 'ಸಂಗ್ರಹ ಆಧಾರಿತ OPML ಸುದ್ದಿ ಓದುಗ ಮತ್ತು ಮೂಲಗಳಿಗೆ ನೇರ ಲಿಂಕ್‌ಗಳು.',
      hi: 'सारांश-आधारित OPML न्यूज़ रीडर और मूल स्रोतों के सीधे लिंक।',
    }),
    alternates: { canonical: 'https://kwin-city.com/news-reader' },
  };
}

export default function NewsReaderPage() {
  return (
    <SiteFrame>
      <NewsReaderExperience />
    </SiteFrame>
  );
}
