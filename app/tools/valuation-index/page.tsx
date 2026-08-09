import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import ValuationIndex from '@/components/value-add/ValuationIndex';

export const metadata: Metadata = {
  title: 'KWIN Valuation Index | Land and Guidance Value Trends',
  description: 'Compare directional market rates and guidance values across key KWIN-adjacent zones.',
  alternates: { canonical: 'https://kwin-city.com/tools/valuation-index' },
};

export default function ValuationIndexPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Valuation Index"
          description="Track directional rate movement and guidance references to support more transparent corridor pricing decisions."
          sourceIds={['economicSurvey', 'kiadb', 'brief']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <ValuationIndex />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
