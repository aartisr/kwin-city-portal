import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import ChangeTimeline from '@/components/value-add/ChangeTimeline';

export const metadata: Metadata = {
  title: 'KWIN Change Tracker | Timeline and Progress Signals',
  description:
    'Track KWIN timeline signals, phase progression, and source-backed changes with transparent status context.',
  alternates: { canonical: 'https://kwin-city.com/updates/change-tracker' },
};

export default function ChangeTrackerPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Updates"
          title="Change Tracker"
          description="Follow project-phase movement through source-linked updates that make planning assumptions explicit."
          sourceIds={['brief', 'kiadb']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <ChangeTimeline />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
