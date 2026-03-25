import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';

export const metadata: Metadata = {
  title: 'For Investors | KWIN City',
  description: 'Investment-focused briefing on KWIN City sectors, opportunity windows, and risk-aware due diligence context.',
};

export default function InvestorPage() {
  return (
    <PersonaPage
      eyebrow="Investor Desk"
      title="Where long-horizon capital meets North Bengaluru momentum."
      description="KWIN City sits at the intersection of infrastructure acceleration, industrial policy, and knowledge-economy ambition. This page is a practical lens for investors evaluating strategic entry points and risk conditions."
      imageSrc="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Business district skyline"
      audienceLabel="For institutional, strategic, and venture investors"
      quickActions={[
        { label: 'View Industry Sectors', href: '/sectors' },
        { label: 'See Full Evidence', href: '/evidence' },
        { label: 'Read Source Ledger', href: '/sources' },
      ]}
      stats={[
        { value: '~4,500', label: 'Proposed Acres', note: 'Project brief figure — unverified' },
        { value: '₹40,000 Cr', label: 'Stated Investment Target', note: 'Proposal-level; cross-check required', accent: 'text-emerald-400' },
        { value: '5 Clusters', label: 'Knowledge Sectors', note: 'Semiconductor, Aerospace, Health-tech, ICT, Renewables', accent: 'text-cyan-400' },
        { value: '~33 km', label: 'Airport Distance', note: 'KIAL adjacency advantage', accent: 'text-violet-400' },
      ]}
      evidenceCta={{
        heading: 'Ready to pressure-test the thesis?',
        body: 'Every investment claim on this portal is labeled with its confidence level. Use the Evidence Vault and Claim Ledger to move from narrative to investable insight.',
        links: [
          { label: 'Open Evidence Vault', href: '/evidence', primary: true },
          { label: 'Review Claim Ledger', href: '/sources' },
          { label: 'See Timeline', href: '/timeline' },
        ],
      }}
      sections={[
        {
          title: 'Opportunity Landscape',
          body: 'KWIN is framed around knowledge, wellbeing, and innovation sectors with semiconductor and advanced-industry orientation in the broader plan narrative.',
          bullets: [
            'Sector mix includes semiconductor, aerospace, health-tech, ICT, and renewables.',
            'Airport-region adjacency strengthens logistics and global connectivity assumptions.',
            'Planned phasing allows staggered capital deployment rather than all-at-once exposure.',
          ],
        },
        {
          title: 'Risk and Verification Discipline',
          body: 'This portal separates confirmed context from proposal-level claims. Treat all unverified figures as scenario inputs, not certainty.',
          bullets: [
            'Cross-check each strategic claim in the source ledger before commitment.',
            'Prioritize KIADB and statutory records over secondary references.',
            'Track tender progression as the most practical leading signal of execution pace.',
          ],
        },
        {
          title: 'Due Diligence Checklist',
          body: 'Use this quick protocol to move from narrative to investable insight without overfitting to promotional framing.',
          bullets: [
            'Validate land, utility, and access status against latest institutional releases.',
            'Assess corridor-level economic indicators from Karnataka government publications.',
            'Map your thesis to phase-specific timelines, not headline project narratives.',
          ],
        },
        {
          title: 'How This Portal Helps',
          body: 'You get a consolidated decision surface that blends project claims with regional evidence and clear verification labels.',
          bullets: [
            'Claim-by-claim provenance with confidence qualifiers.',
            'Fast route to timeline, sectors, and infrastructure context pages.',
            'Transparent separation of what is known, proposed, and still pending confirmation.',
          ],
        },
      ]}
    />
  );
}
