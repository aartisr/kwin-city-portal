import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import SpatialExplorer from '@/components/value-add/SpatialExplorer';

export const metadata: Metadata = {
  title: 'KWIN Spatial Explorer | 2D and 3D Layout Utility',
  description: 'Explore KWIN phase layers for transport, zoning, utility corridors, and anchor clusters with map and layer context.',
  alternates: { canonical: 'https://kwin-city.com/tools/spatial-explorer' },
};

export default function SpatialExplorerPage() {
  return (
    <SiteFrame>
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="KWIN Tools"
          title="Spatial Explorer"
          description="Inspect phase overlays and layout context with an interactive map surface and source-linked layer metadata."
          sourceIds={['kiadb', 'strr', 'brief']}
        />
        <section className="section bg-slate-50">
          <div className="container max-w-6xl">
            <SpatialExplorer />
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
