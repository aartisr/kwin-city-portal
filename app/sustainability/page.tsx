import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Sustainability from '@/components/Sustainability';

export const metadata: Metadata = {
  title: 'Sustainability | KWIN City Research Portal',
  description: 'Sustainability, water, and resilience context for KWIN City.',
};

export default function SustainabilityPage() {
  return (
    <SiteFrame>
      <main>
        <PageIntro
          eyebrow="Sustainability"
          title="A city that works with nature, not against it."
          description="Solar self-sufficiency, interconnected lakes, 40% green cover, near-zero waste. KWIN's sustainability ambitions are tested in this section against the actual rainfall, groundwater, and lake-governance evidence for the region."
          sourceIds={['brief', 'rainfall', 'groundwater', 'lakes', 'kiadb']}
        />
        <Sustainability />
      </main>
    </SiteFrame>
  );
}
