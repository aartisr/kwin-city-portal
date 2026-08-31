import type { Metadata } from 'next';
import SectorComparison from '@/components/SectorComparison';
import SiteFrame from '@/components/SiteFrame';

const PAGE_URL = 'https://kwin-city.com/sectors/comparison';

export const metadata: Metadata = {
  title: 'KWIN City Sector Comparison | Knowledge, Wellbeing, Innovation',
  description:
    'Compare KWIN City pillars side by side: Knowledge, Wellbeing, and Innovation, with primary focus, lead departments, and strategic drivers.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'KWIN City Sector Comparison — Knowledge, Wellbeing, Innovation',
    description:
      'Compare KWIN City\'s Knowledge, Wellbeing, and Innovation pillars side by side, including focus areas, lead actors, sector logic, and strategic development drivers.',
    url: PAGE_URL,
    type: 'website',
    images: [{ url: 'https://kwin-city.com/sectors/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City Sector Comparison',
    description:
      'Compare KWIN City\'s Knowledge, Wellbeing, and Innovation pillars side by side, including focus areas, lead actors, sector logic, and strategic development drivers.',
    images: ['https://kwin-city.com/sectors/opengraph-image'],
  },
};

export default function SectorComparisonPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <SectorComparison />
      </main>
    </SiteFrame>
  );
}
