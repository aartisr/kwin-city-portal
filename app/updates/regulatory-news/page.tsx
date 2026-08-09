import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import GazetteNewsFeed from '@/components/value-add/GazetteNewsFeed';

export const metadata: Metadata = {
  title: 'KWIN Regulatory News | Gazette and Policy Engine',
  description: 'Browse source-tagged gazette, policy, and infrastructure updates through a structured signal feed.',
  alternates: { canonical: 'https://kwin-city.com/updates/regulatory-news' },
};

export default function RegulatoryNewsPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Updates"
          title="Regulatory News Engine"
          description="Follow source-tagged regulatory and infrastructure updates with clear categorization for faster decision awareness."
          sourceIds={['kiadb', 'strr', 'brief']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <GazetteNewsFeed />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
