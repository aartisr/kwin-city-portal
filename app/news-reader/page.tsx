import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import NewsReaderExperience from '@/components/NewsReaderExperience';

export const metadata: Metadata = {
  title: 'OPML News Reader | KWIN City',
  description:
    'On-demand OPML news reader with summary-first cards and direct links to original sources.',
  alternates: {
    canonical: 'https://kwin-city.com/news-reader',
  },
};

export default function NewsReaderPage() {
  return (
    <SiteFrame>
      <NewsReaderExperience />
    </SiteFrame>
  );
}
