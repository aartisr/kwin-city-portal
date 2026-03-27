import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Sectors from '@/components/Sectors';
import JsonLd from '@/components/JsonLd';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Industry Sectors', item: 'https://kwin-city.com/sectors' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'KWIN City Industry Sectors',
  description: 'Five high-growth sector clusters in KWIN City, North Bengaluru',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Semiconductors & Advanced Manufacturing' },
    { '@type': 'ListItem', position: 2, name: 'Aerospace & Defence' },
    { '@type': 'ListItem', position: 3, name: 'Health-tech & Life Sciences' },
    { '@type': 'ListItem', position: 4, name: 'ICT & Deep Tech' },
    { '@type': 'ListItem', position: 5, name: 'Renewable Energy' },
  ],
};

export const metadata: Metadata = {
  title: 'Industry Sectors | Semiconductors · Aerospace · Health-tech · Renewables',
  description:
    'KWIN City targets five high-growth sectors: semiconductors, aerospace & defence, health-tech, ICT & deep tech, and renewable energy. Explore the investment thesis and evidence behind each cluster in North Bengaluru.',
  keywords: [
    'semiconductor park North Bengaluru',
    'aerospace cluster Karnataka',
    'health tech Bengaluru',
    'renewable energy township India',
    'ICT cluster KWIN',
    'KWIN City sectors',
    'deep tech India',
    'Karnataka industrial investment',
  ],
  alternates: { canonical: 'https://kwin-city.com/sectors' },
  openGraph: {
    title: 'KWIN City Industry Sectors — Semiconductors, Aerospace, Health-tech, Renewables',
    description:
      'Five high-growth sector clusters driving KWIN City investment: semiconductors, aerospace, health-tech, ICT, and renewables.',
    url: 'https://kwin-city.com/sectors',
    type: 'website',
  },
};

export default function SectorsPage() {
  return (
    <SiteFrame>
      <JsonLd data={[breadcrumb, itemListSchema]} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="Industry Sectors"
          title="The industries that will power KWIN — and why they belong here."
          description="From semiconductors to aerospace, health-tech to renewables — KWIN's sector strategy aligns with where global capital is flowing and where Karnataka has built genuine competitive depth. Explore the ambition and the evidence behind it."
          sourceIds={['brief', 'economicSurvey', 'aviation', 'strr']}
        />
        <Sectors />
      </main>
    </SiteFrame>
  );
}
