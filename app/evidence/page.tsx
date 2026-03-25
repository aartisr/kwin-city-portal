import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import EvidenceVault from '@/components/EvidenceVault';

export const metadata: Metadata = {
  title: 'Evidence Vault | KWIN City Research Portal',
  description: 'Regional and project-adjacent evidence used to frame KWIN City responsibly.',
};

export default function EvidencePage() {
  return (
    <SiteFrame>
      <main>
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
