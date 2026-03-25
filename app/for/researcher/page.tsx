import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';

export const metadata: Metadata = {
  title: 'For Researchers | KWIN City',
  description: 'Researcher-focused view of KWIN City data layers, methods, evidence quality, and reproducible inquiry pathways.',
};

export default function ResearcherPage() {
  return (
    <PersonaPage
      eyebrow="Researcher Console"
      title="From narrative claims to reproducible evidence workflows."
      description="This portal is structured to support evidence-grade inquiry. Use it to trace assertions to sources, compare status labels, and develop your own independent interpretations."
      imageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Researchers in data lab"
      audienceLabel="For academics, policy analysts, and data scientists"
      quickActions={[
        { label: 'Open Evidence Vault', href: '/evidence' },
        { label: 'Open Sources & Claims', href: '/sources' },
        { label: 'Study Timeline Structure', href: '/timeline' },
      ]}
      stats={[
        { value: '50+', label: 'Indexed Sources', note: 'Government, institutional, and open data', accent: 'text-cyan-400' },
        { value: '3', label: 'Claim Confidence Tiers', note: 'Confirmed / Proposal / Regional Evidence' },
        { value: '100%', label: 'Provenance-Labeled', note: 'Every substantive claim traced to source', accent: 'text-emerald-400' },
        { value: 'Open', label: 'Data Access', note: 'All source links publicly accessible', accent: 'text-violet-400' },
      ]}
      evidenceCta={{
        heading: 'The full data layer is open for your research.',
        body: 'Dive into the complete evidence set, inspect individual source metadata, and trace every claim through to its primary publication. The methodology is documented for peer scrutiny.',
        links: [
          { label: 'Evidence Vault', href: '/evidence', primary: true },
          { label: 'Sources & Claims', href: '/sources' },
          { label: 'Project Timeline', href: '/timeline' },
        ],
      }}
      sections={[
        {
          title: 'Data Provenance Model',
          body: 'Each source is classified by relevance and confidence, enabling clearer treatment of project-adjacent versus project-confirming evidence.',
          bullets: [
            'Structured mapping of claims to explicit sources.',
            'Status qualifiers prevent over-assertion from contextual data.',
            'Source registry approach supports transparent citation audits.',
          ],
        },
        {
          title: 'Methodological Guardrails',
          body: 'This site avoids collapsing promotional language and verifiable records into a single confidence layer.',
          bullets: [
            'Confirmed context and proposal-level statements are intentionally separated.',
            'Causality assumptions are restrained where evidence is only contextual.',
            'Open limitations are documented to reduce narrative bias.',
          ],
        },
        {
          title: 'Research Opportunities',
          body: 'KWIN creates fertile ground for studying urbanization, infrastructure sequencing, policy signaling, and regional innovation geographies.',
          bullets: [
            'Spatial-temporal analysis of phased urban-industrial projects.',
            'Evidence quality tracking across evolving institutional disclosures.',
            'Comparative study against other corridor-led development models.',
          ],
        },
        {
          title: 'Suggested Research Workflow',
          body: 'Start with the claim ledger, validate key assertions, then construct your own evidence graph and confidence scoring model.',
          bullets: [
            'Identify top-impact claims and their strongest supporting records.',
            'Check recency and source authority before downstream interpretation.',
            'Document where conclusions rely on pending or partial verification.',
          ],
        },
      ]}
    />
  );
}
