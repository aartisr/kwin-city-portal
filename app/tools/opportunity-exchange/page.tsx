import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import OpportunityExchange from '@/components/value-add/OpportunityExchange';

export const metadata: Metadata = {
  title: 'KWIN Opportunity Exchange | Investor and Developer Matchmaking',
  description: 'Submit structured requirements and discover recent opportunity-board demand for collaboration around KWIN corridors.',
  alternates: { canonical: 'https://kwin-city.com/tools/opportunity-exchange' },
};

export default function OpportunityExchangePage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Opportunity Exchange"
          description="Connect investors, developers, and landowners through structured requirement capture and exchange-board visibility."
          sourceIds={['brief']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <OpportunityExchange />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
