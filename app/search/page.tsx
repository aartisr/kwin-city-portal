/**
 * KWIN City — Full Search Results Page
 * /search?q=...
 */
import { Suspense } from 'react';
import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import SearchPageClient from './SearchPageClient';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, { en: 'Search KWIN City | Find Anything', kn: 'KWIN City ಹುಡುಕಿ | ಯಾವುದನ್ನಾದರೂ ಕಂಡುಹಿಡಿಯಿರಿ', hi: 'KWIN City खोजें | कुछ भी ढूंढें' }),
    description: pickByLocale(locale, {
      en: 'Search across all KWIN City content — pages, sectors, timeline phases, FAQ answers, documents, and updates.',
      kn: 'KWIN City ನ ಎಲ್ಲಾ ವಿಷಯಗಳಲ್ಲಿ ಹುಡುಕಿ.',
      hi: 'KWIN City की सभी सामग्री में खोजें।',
    }),
    alternates: { canonical: 'https://kwin-city.com/search' },
    robots: { index: false },
  };
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SiteFrame>
        <SearchPageClient />
      </SiteFrame>
    </Suspense>
  );
}
