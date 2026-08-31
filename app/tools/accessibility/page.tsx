import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import AccessibilityCalculator from '@/components/value-add/AccessibilityCalculator';

export const metadata: Metadata = {
  title: 'KWIN Accessibility Calculator | Travel Time and Corridor Impact',
  description:
    'Estimate current and projected travel times for KWIN-related routes using mode-based assumptions with transparent methodology.',
  alternates: { canonical: 'https://kwin-city.com/tools/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Accessibility Calculator"
          description="Quantify current travel friction and projected improvements to evaluate location readiness for residents, investors, and operators."
          sourceIds={['aviation', 'strr', 'irr']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <AccessibilityCalculator />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
