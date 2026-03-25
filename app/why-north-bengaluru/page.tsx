import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import WhyNorthBengaluru from '@/components/WhyNorthBengaluru';
import StrategicLocationMap from '@/components/StrategicLocationMap';

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
        
        {/* Strategic Location & Connectivity Map */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Strategic Location & Connectivity Hub 🗺️
              </h2>
              <p className="text-slate-600 max-w-3xl">
                KWIN City occupies a strategically inevitable location: adjacent to Bengaluru International Airport, 
                integrated into the Satellite Town Ring Road (STRR) corridor, and positioned within Karnataka's 
                fastest-growing northern corridor. This map visualizes the geographic rationale.
              </p>
            </div>
            <StrategicLocationMap />
          </div>
        </section>

        <WhyNorthBengaluru />
      </main>
    </SiteFrame>
  );
}
