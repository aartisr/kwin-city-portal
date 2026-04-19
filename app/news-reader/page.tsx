import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import NewsReaderExperience from '@/components/NewsReaderExperience';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'OPML News Reader', kn: 'OPML ಸುದ್ದಿ ಓದುಗ', hi: 'OPML न्यूज़ रीडर' }),
    description: pickByLocale(locale, {
      en: 'On-demand OPML news reader with summary-first cards and direct links to original sources.',
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
