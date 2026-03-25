import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';

export const metadata: Metadata = {
  title: 'For Journalists | KWIN City',
  description: 'Journalist-ready page with verified framing, quote-safe claims, source pathways, and responsible reporting context for KWIN City.',
};

export default function JournalistPage() {
  return (
    <PersonaPage
      eyebrow="Media Desk"
      title="File faster, with stronger sourcing and cleaner claim hygiene."
      description="Use this page as your reporting launchpad: what is verifiable now, what remains proposal-level, and where each statement originates in the public record."
      imageSrc="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Newsroom desk with press notes"
      audienceLabel="For journalists, editors, and newsroom researchers"
      quickActions={[
        { label: 'Open Claim Ledger', href: '/sources' },
        { label: 'Read Evidence Vault', href: '/evidence' },
        { label: 'See Timeline', href: '/timeline' },
      ]}
      stats={[
        { value: '3', label: 'Claim Confidence Tiers', note: 'Clear safe-to-report taxonomy', accent: 'text-cyan-400' },
        { value: '50+', label: 'Source Documents', note: 'All primary references accessible' },
        { value: '0', label: 'Anonymous Claims', note: 'Every statement has a traceable source', accent: 'text-emerald-400' },
        { value: 'CC', label: 'Portal License', note: 'Open for journalistic use with attribution', accent: 'text-violet-400' },
      ]}
      evidenceCta={{
        heading: 'Get the story right — and sourced.',
        body: 'The Claim Ledger gives you a direct line from narrative to primary source. Everything is labeled; nothing on this portal is anonymous or unverified claim.',
        links: [
          { label: 'Open Claim Ledger', href: '/sources', primary: true },
          { label: 'Evidence Vault', href: '/evidence' },
          { label: 'Project Timeline', href: '/timeline' },
        ],
      }}
      sections={[
        {
          title: 'What You Can Safely Report Today',
          body: 'This portal supports responsible framing by distinguishing confirmed context from unconfirmed project assertions.',
          bullets: [
            'Regional infrastructure context is evidence-backed from open datasets.',
            'Project investment/jobs figures should be attributed to project brief context unless officially confirmed.',
            'Verification labels are designed to reduce overstatement risk in headlines.',
          ],
        },
        {
          title: 'Quote-Safe Narrative Structure',
          body: 'A robust KWIN story usually separates three layers: regional readiness, project intent, and implementation evidence.',
          bullets: [
            'Lead with region and policy context where evidence is strongest.',
            'Treat roadmap claims as forward-looking unless tied to institutional updates.',
            'Use source labels and dates in copy to preserve transparency.',
          ],
        },
        {
          title: 'Fast Fact-Check Workflow',
          body: 'Move quickly by triangulating each major assertion with both source type and publication authority.',
          bullets: [
            'Start with the claim ledger and match statement-to-source before publication.',
            'Prefer primary institutional documents over tertiary references.',
            'Flag unresolved ambiguities in reporting instead of inferring certainty.',
          ],
        },
        {
          title: 'Editorial Best Practices',
          body: 'Reporting quality improves when ambition is covered alongside caveats. This page helps preserve that balance.',
          bullets: [
            'Separate what is announced from what is executed.',
            'Avoid conflating corridor-level growth with project-level completion.',
            'Revisit this portal periodically as source quality and project status evolve.',
          ],
        },
      ]}
    />
  );
}
