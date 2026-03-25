import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Sectors from '@/components/Sectors';

export const metadata: Metadata = {
  title: 'Sectors | KWIN City Research Portal',
  description: 'Industry sector framing for KWIN City with source-aware caveats and regional context.',
};

export default function SectorsPage() {
  return (
    <SiteFrame>
      <main>
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
