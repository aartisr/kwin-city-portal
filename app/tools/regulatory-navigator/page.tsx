import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import RegulatoryChecklist from '@/components/value-add/RegulatoryChecklist';

export const metadata: Metadata = {
  title: 'KWIN Regulatory Navigator | Persona-Based Compliance Checklist',
  description:
    'Follow persona-specific regulatory steps, required documents, and expected timelines for KWIN-related planning and execution journeys.',
  alternates: { canonical: 'https://kwin-city.com/tools/regulatory-navigator' },
};

export default function RegulatoryNavigatorPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Regulatory Navigator"
          description="Get a practical checklist of authorities, documents, and sequencing requirements tailored to your persona."
          sourceIds={['kiadb', 'strr', 'brief']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <RegulatoryChecklist />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
