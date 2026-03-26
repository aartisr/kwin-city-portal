import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Sustainability from '@/components/Sustainability';
import JsonLd from '@/components/JsonLd';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Sustainability', item: 'https://kwin-city.com/sustainability' },
  ],
};

export const metadata: Metadata = {
  title: 'Sustainability | Net-Zero Township · 40% Green Cover · Solar Self-Sufficient',
  description:
    'KWIN City is designed for net-zero carbon operations — solar self-sufficient, 40% green cover, interconnected lakes, and near-zero waste. Explore the sustainability evidence and water-resilience data for North Bengaluru.',
  keywords: [
    'net zero city India',
    'sustainable township Bengaluru',
    'KWIN sustainability',
    'green city Karnataka',
    'solar energy township India',
    'water resilience Bengaluru',
    'eco township North Bengaluru',
  ],
  alternates: { canonical: 'https://kwin-city.com/sustainability' },
  openGraph: {
    title: 'KWIN City Sustainability — Net-Zero · Solar · 40% Green Cover',
    description:
      'KWIN City is designed net-zero from Day 1. Explore solar, water, green cover, and resilience evidence.',
    url: 'https://kwin-city.com/sustainability',
    type: 'website',
  },
};

export default function SustainabilityPage() {
  return (
    <SiteFrame>
      <JsonLd data={breadcrumb} />
      <main>
        <PageIntro
          eyebrow="Sustainability"
          title="A city that works with nature, not against it."
          description="Solar self-sufficiency, interconnected lakes, 40% green cover, near-zero waste. KWIN's sustainability ambitions are tested in this section against growth trajectory, groundwater, and lake-governance evidence for the region."
          sourceIds={['brief', 'rainfall', 'groundwater', 'lakes', 'kiadb']}
        />
        <Sustainability />
      </main>
    </SiteFrame>
  );
}
