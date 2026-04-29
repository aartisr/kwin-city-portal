import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import FaqPage from '@/components/FaqPage';

export const metadata: Metadata = {
  title: 'KWIN City FAQ | Investor, Research, Location, Sustainability & Source Questions',
  description:
    'Find clear answers to common KWIN City questions on location, project status, sectors, sustainability, evidence, and source methodology.',
  keywords: [
    'KWIN City FAQ',
    'KWIN questions answers',
    'KIADB investment FAQ',
    'North Bengaluru development questions',
    'knowledge wellbeing innovation township',
  ],
  alternates: { canonical: 'https://kwin-city.com/faq' },
  openGraph: {
    title: 'KWIN City FAQ — Clear Answers on Status, Location, Sectors and Evidence',
    description:
      'Find concise KWIN City answers on project status, location, sectors, sustainability, evidence standards, investment pathways, and source-verification methods.',
    url: 'https://kwin-city.com/faq',
    type: 'website',
    images: [{ url: 'https://kwin-city.com/faq/opengraph-image' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KWIN City FAQ — Clear Answers on Status, Location, Sectors and Evidence',
    description:
      'Find concise KWIN City answers on project status, location, sectors, sustainability, evidence standards, investment pathways, and source-verification methods.',
    images: ['https://kwin-city.com/faq/opengraph-image'],
  },
};

export default function FaqRoute() {
  return (
    <SiteFrame>
      <FaqPage />
    </SiteFrame>
  );
}
