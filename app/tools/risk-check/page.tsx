import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import RiskCheckForm from '@/components/value-add/RiskCheckForm';

export const metadata: Metadata = {
  title: 'KWIN Risk Check | Parcel and Area Due-Diligence Signals',
  description:
    'Run a source-grounded preliminary risk check using parcel, area, or coordinate inputs with transparent confidence and recommendations.',
  alternates: { canonical: 'https://kwin-city.com/tools/risk-check' },
};

export default function RiskCheckPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Risk Check"
          description="Assess preliminary land and corridor risk signals before deeper due diligence. Every result includes source-linked context and explicit caveats."
          sourceIds={['kiadb', 'strr', 'lakes']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <RiskCheckForm />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
