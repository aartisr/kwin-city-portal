import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import WhyNorthBengaluru from '@/components/WhyNorthBengaluru';

export const metadata: Metadata = {
  title: 'Why North Bengaluru | KWIN City Research Portal',
  description: 'Regional context for why North Bengaluru is a plausible setting for KWIN City.',
};

export default function WhyNorthBengaluruPage() {
  return (
    <SiteFrame>
      <main>
        <PageIntro
          eyebrow="The Region"
          title="North Bengaluru: the most compelling urban canvas in India right now."
          description="Airport growth. Corridor infrastructure. Karnataka's economic ambition. Water realities. This page traces the regional evidence that makes KWIN's proposed location not just plausible — but strategically inevitable."
          sourceIds={['aviation', 'strr', 'irr', 'economicSurvey', 'rainfall', 'groundwater', 'lakes']}
        />
        <WhyNorthBengaluru />
      </main>
    </SiteFrame>
  );
}
