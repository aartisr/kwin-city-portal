import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Timeline from '@/components/Timeline';

export const metadata: Metadata = {
  title: 'Development Timeline | KWIN City 2024–2030 Roadmap',
  description:
    'KWIN City\'s five-phase development roadmap from 2024 inauguration to full operations by 2030. Every milestone is labeled with its source and verification status.',
  keywords: [
    'KWIN City timeline',
    'KWIN development phases',
    'North Bengaluru 2030',
    'KIADB project milestones',
    'knowledge city timeline India',
  ],
  alternates: { canonical: 'https://kwin-city.com/timeline' },
  openGraph: {
    title: 'KWIN City Development Timeline — 2024 to 2030',
    description: 'Five phases. One extraordinary ambition. The KWIN City roadmap, labeled with evidence.',
    url: 'https://kwin-city.com/timeline',
    type: 'website',
  },
};

export default function TimelinePage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="Development Timeline"
          title="Five phases. One extraordinary ambition."
          description="From inauguration and land acquisition through to a fully operating knowledge-and-industry city — the KWIN roadmap is bold, phased, and open to examination. Every milestone is labeled with its source."
          sourceIds={['brief', 'kiadb']}
        />
        <Timeline />
      </main>
    </SiteFrame>
  );
}
