import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import SatelliteTracker from '@/components/value-add/SatelliteTracker';

export const metadata: Metadata = {
  title: 'KWIN Satellite Tracker | Development Time-Lapse Signals',
  description: 'Track month-wise progress signals for corridor and phase development through structured satellite observations.',
  alternates: { canonical: 'https://kwin-city.com/updates/satellite-tracker' },
};

export default function SatelliteTrackerPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Updates"
          title="Satellite Tracker"
          description="Review month-over-month development signal summaries to ground progress discussions in repeatable evidence."
          sourceIds={['strr', 'brief']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <SatelliteTracker />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
