import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';

export const metadata: Metadata = {
  title: 'For Residents | KWIN City',
  description: 'Resident-focused guide to livability, connectivity, sustainability, and everyday quality-of-life factors in the KWIN vision.',
};

export default function ResidentPage() {
  return (
    <PersonaPage
      eyebrow="Resident Guide"
      title="A city story measured by daily life, not just master plans."
      description="If you are evaluating KWIN City as a future place to live, this page distills what matters most: access, healthcare, education, ecology, and real neighborhood quality."
      imageSrc="https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Green urban park with families"
      audienceLabel="For families, professionals, and long-term residents"
      quickActions={[
        { label: 'See Sustainability Plan', href: '/sustainability' },
        { label: 'Explore Regional Context', href: '/why-north-bengaluru' },
        { label: 'Review Sources', href: '/sources' },
      ]}
      stats={[
        { value: '30%', label: 'Green Cover Target', note: 'Proposed in sustainability plan', accent: 'text-emerald-400' },
        { value: '~33 km', label: 'From KIAL', note: 'Direct airport corridor access', accent: 'text-cyan-400' },
        { value: '4+', label: 'Transport Modes', note: 'Road, metro, rail, and walk-path in plan' },
        { value: '24/7', label: 'Utility Design Goal', note: 'Power and water continuity in brief', accent: 'text-violet-400' },
      ]}
      evidenceCta={{
        heading: 'Understand what life in KWIN would actually look like.',
        body: 'The sustainability plan, regional data, and infrastructure sections give you the clearest picture of livability outcomes — what is planned, what is confirmed, and what is still aspirational.',
        links: [
          { label: 'Sustainability Plan', href: '/sustainability', primary: true },
          { label: 'Why North Bengaluru', href: '/why-north-bengaluru' },
          { label: 'Review Sources', href: '/sources' },
        ],
      }}
      sections={[
        {
          title: 'Everyday Livability',
          body: 'The wellbeing pillar emphasizes green cover, water systems, healthcare, and livable urban form as core to resident value.',
          bullets: [
            'Green and lake-linked planning is highlighted in the sustainability framing.',
            'Healthcare and education ambitions are present but should be verified as delivery plans mature.',
            'Neighborhood quality depends on phased execution and transport connectivity outcomes.',
          ],
        },
        {
          title: 'Mobility and Access',
          body: 'North Bengaluru momentum is strongly linked to airport connectivity and ring-road alignment in regional datasets.',
          bullets: [
            'Airport corridor advantages are supported by regional mobility evidence.',
            'STRR and IRR documentation is important for commute expectations.',
            'Travel-time assumptions should be revisited periodically as projects evolve.',
          ],
        },
        {
          title: 'School, Health, and Community',
          body: 'Residents should evaluate not only announced anchors but also the broader ecosystem that supports stable daily life.',
          bullets: [
            'Track institutional announcements for schools and hospitals in official records.',
            'Compare proposed amenities with existing surrounding catchment capacity.',
            'Look for phased milestones that indicate usable services, not only planned zones.',
          ],
        },
        {
          title: 'How to Evaluate Confidence',
          body: 'Use this portal to distinguish between proposed outcomes and already substantiated context in plain language.',
          bullets: [
            'Use the claim ledger to identify each source behind each major statement.',
            'Treat unverified numbers as directional signals until formally confirmed.',
            'Re-check this portal for updates as evidence quality changes over time.',
          ],
        },
      ]}
    />
  );
}
