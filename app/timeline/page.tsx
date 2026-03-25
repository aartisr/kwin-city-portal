import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Timeline from '@/components/Timeline';

export const metadata: Metadata = {
  title: 'Timeline | KWIN City Research Portal',
  description: 'Working development timeline for KWIN City with explicit verification boundaries.',
};

export default function TimelinePage() {
  return (
    <SiteFrame>
      <main>
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
