import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import EvidenceVault from '@/components/EvidenceVault';
import JsonLd from '@/components/JsonLd';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Evidence Vault', item: 'https://kwin-city.com/evidence' },
  ],
};

export const metadata: Metadata = {
  title: 'Evidence Vault | Verified Research · Government Data · Source Ledger',
  description:
    'Seven curated datasets from OpenCity and Karnataka State government — each mapped to what it can and cannot prove about KWIN City. The gold standard for evidence-first urban research.',
  keywords: [
    'KWIN City evidence',
    'urban research portal India',
    'Karnataka open data',
    'Bengaluru government data',
    'evidence-first city portal',
    'KWIN claim verification',
  ],
  alternates: { canonical: 'https://kwin-city.com/evidence' },
  openGraph: {
    title: 'KWIN City Evidence Vault — Verified Research for Responsible Urban Development',
    description:
      'Seven verified government datasets powering KWIN City\'s evidence-first research portal.',
    url: 'https://kwin-city.com/evidence',
    type: 'website',
  },
};

export default function EvidencePage() {
  return (
    <SiteFrame>
      <JsonLd data={breadcrumb} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="Evidence Vault"
          title="The research that makes KWIN's story credible."
          description="Seven curated datasets from OpenCity and Karnataka State — each one carefully mapped to what it can and cannot prove about KWIN City. This is how responsible urban research looks."
          sourceIds={['aviation', 'strr', 'irr', 'economicSurvey', 'rainfall', 'groundwater', 'lakes']}
        />
        <EvidenceVault />
      </main>
    </SiteFrame>
  );
}
