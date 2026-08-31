import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import OpenDataStudio from '@/components/value-add/OpenDataStudio';

export const metadata: Metadata = {
  title: 'KWIN Open Data Studio | Spatial API and Export Utilities',
  description: 'Browse open KWIN datasets and queue machine-readable exports for analytics and research workflows.',
  alternates: { canonical: 'https://kwin-city.com/tools/open-data-studio' },
};

export default function OpenDataStudioPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Open Data Studio"
          description="Access open dataset catalog metadata and generate export jobs for GeoJSON, CSV, and JSON outputs."
          sourceIds={['brief', 'kiadb']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-5xl">
            <OpenDataStudio />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
