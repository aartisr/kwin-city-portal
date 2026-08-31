import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import InvestmentRadar from '@/components/value-add/InvestmentRadar';

export const metadata: Metadata = {
  title: 'KWIN Investment Radar | Anchor Commitments and Momentum',
  description: 'Track anchor tenant and institutional momentum signals across manufacturing, biotech, education, and healthcare.',
  alternates: { canonical: 'https://kwin-city.com/tools/investment-radar' },
};

export default function InvestmentRadarPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Investment Radar"
          description="Monitor strategic commitments and phase-linked demand cues to evaluate corridor momentum."
          sourceIds={['brief', 'economicSurvey', 'kiadb']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <InvestmentRadar />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
