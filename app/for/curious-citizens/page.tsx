import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';

export const metadata: Metadata = {
  title: 'For Curious Citizens | KWIN City',
  description: 'A plain-language explainer for citizens who want to understand KWIN City without technical jargon.',
};

export default function CuriousCitizensPage() {
  return (
    <PersonaPage
      eyebrow="Citizen Explainer"
      title="KWIN, explained clearly — no jargon required."
      description="If you just want the truth in simple terms, this is your page. Learn what KWIN City is, what has evidence, what is still a proposal, and how to track updates responsibly."
      imageSrc="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Citizens gathering in an urban public space"
      audienceLabel="For students, families, and everyday curious visitors"
      quickActions={[
        { label: 'Start with About', href: '/about' },
        { label: 'See Why North Bengaluru', href: '/why-north-bengaluru' },
        { label: 'Check Sources', href: '/sources' },
      ]}
      stats={[
        { value: 'North', label: 'Bengaluru Location', note: 'Near Kempegowda International Airport corridor', accent: 'text-cyan-400' },
        { value: '2031+', label: 'Phased Completion', note: 'Proposal timeline — early stages', accent: 'text-violet-400' },
        { value: '5', label: 'Knowledge Sectors', note: 'Semiconductor, health, aerospace, ICT, green energy', accent: 'text-emerald-400' },
        { value: 'Free', label: 'Portal Access', note: 'All information open to the public' },
      ]}
      evidenceCta={{
        heading: 'Curious? Start exploring at your own pace.',
        body: 'No jargon. No paywall. The About page gives you the full story in plain language, the Region page shows you why this location matters, and Sources lets you see where every claim comes from.',
        links: [
          { label: 'About KWIN City', href: '/about', primary: true },
          { label: 'Why North Bengaluru', href: '/why-north-bengaluru' },
          { label: 'Check Sources', href: '/sources' },
        ],
      }}
      sections={[
        {
          title: 'What Is KWIN City?',
          body: 'KWIN City is a proposed township concept in North Bengaluru built around Knowledge, Wellbeing, and Innovation.',
          bullets: [
            'Knowledge means education and research zones.',
            'Wellbeing means health, green space, and better living conditions.',
            'Innovation means industry and future-focused jobs.',
          ],
        },
        {
          title: 'What Is Confirmed vs Proposed?',
          body: 'Some details are grounded in strong public data; others are still future plans and need official confirmation.',
          bullets: [
            'Regional growth and infrastructure trends are strongly evidenced.',
            'Some project-specific numbers are proposal-stage and clearly marked.',
            'This site shows labels so you can judge confidence for yourself.',
          ],
        },
        {
          title: 'How Can I Stay Informed?',
          body: 'Follow the source-linked pages on this portal to track updates as new official records become available.',
          bullets: [
            'Use the timeline to understand sequence and phase intent.',
            'Use the source ledger to see where each statement comes from.',
            'Return periodically for updated verification status.',
          ],
        },
        {
          title: 'Why This Portal Exists',
          body: 'Because major city projects can feel confusing. This portal turns complexity into clarity with transparent sourcing.',
          bullets: [
            'Everything important is mapped to a source.',
            'Uncertainty is shown openly, not hidden.',
            'You can explore by role, topic, or evidence depth.',
          ],
        },
      ]}
    />
  );
}
