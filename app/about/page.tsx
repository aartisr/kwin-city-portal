import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Pillars from '@/components/Pillars';
import SourceReferences from '@/components/SourceReferences';

export const metadata: Metadata = {
  title: 'About KWIN | KWIN City Research Portal',
  description: 'Overview of KWIN City and how the project is currently framed on this research portal.',
};

export default function AboutPage() {
  return (
    <SiteFrame>
      <main>
        <PageIntro
          eyebrow="About KWIN City"
          title="A township designed around people, knowledge, and the future."
          description="KWIN City brings three ideas together that rarely meet at scale: world-class research and education, genuine wellbeing infrastructure, and breakthrough industrial clusters. This page tells you what's proposed, what's confirmed, and why it matters."
          sourceIds={['brief', 'kiadb']}
        />
        <section className="section bg-white">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8">
                <h2 className="text-3xl font-semibold text-gray-900 mb-4">Current reading of the project</h2>
                <p className="text-gray-700 leading-8 mb-4">
                  At this stage, the safest description is that KWIN City is a proposed North Bengaluru township framed
                  around knowledge, wellbeing, and innovation. The portal treats the brief as a live project narrative,
                  not as final proof of implementation.
                </p>
                <p className="text-gray-700 leading-8 mb-0">
                  That is why the site separates overview content from full source review and keeps major figures marked
                  as pending primary verification until public institutional records are available.
                </p>
              </div>
              <SourceReferences sourceIds={['brief', 'kiadb', 'economicSurvey']} />
            </div>
          </div>
        </section>
        <Pillars />
      </main>
    </SiteFrame>
  );
}
