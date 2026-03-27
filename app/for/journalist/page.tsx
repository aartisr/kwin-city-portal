import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
  title: pickByLocale(locale, {
    en: 'For Journalists | KWIN City — Verified Story Angles · Source Pathways',
    kn: 'ಪತ್ರಕರ್ತರಿಗಾಗಿ | KWIN City — ಪರಿಶೀಲಿತ ಕಥಾ ದೃಷ್ಟಿಕೋನಗಳು · ಮೂಲ ಮಾರ್ಗಗಳು',
    hi: 'पत्रकारों के लिए | KWIN City — सत्यापित स्टोरी एंगल · स्रोत मार्ग',
  }),
  description: pickByLocale(locale, {
    en: 'Journalist-ready KWIN City briefing: verified facts ready for publication, quote-safe claims, primary source pathways, and responsible reporting context for North Bengaluru’s proposed knowledge township.',
    kn: 'ಪತ್ರಕರ್ತರಿಗಾಗಿ KWIN City ಬ್ರಿಫಿಂಗ್: ಪರಿಶೀಲಿತ ಅಂಶಗಳು, ಮೂಲ ಮಾರ್ಗಗಳು ಮತ್ತು ಜವಾಬ್ದಾರಿಯುತ ವರದಿ ಪರಿಪ್ರೇಕ್ಷ್ಯ.',
    hi: 'पत्रकारों के लिए KWIN City ब्रीफिंग: सत्यापित तथ्य, स्रोत मार्ग और जिम्मेदार रिपोर्टिंग संदर्भ।',
  }),
  keywords: [
    'KWIN City news',
    'North Bengaluru development news',
    'KIADB press',
    'Karnataka smart city journalism',
    'Bengaluru township story',
  ],
  alternates: { canonical: 'https://kwin-city.com/for/journalist' },
  openGraph: {
    title: pickByLocale(locale, {
      en: 'KWIN City for Journalists — Verified Story Angles & Primary Sources',
      kn: 'KWIN City ಪತ್ರಕರ್ತರಿಗಾಗಿ — ಪರಿಶೀಲಿತ ಕಥಾ ದೃಷ್ಟಿಕೋನಗಳು ಮತ್ತು ಮೂಲಗಳು',
      hi: 'KWIN City पत्रकारों के लिए — सत्यापित स्टोरी एंगल और प्राथमिक स्रोत',
    }),
    description: pickByLocale(locale, {
      en: 'File faster with stronger sourcing. Verified claims, quote-ready frames, and primary source pathways.',
      kn: 'ಬಲವಾದ ಮೂಲಾಧಾರದಿಂದ ವೇಗವಾಗಿ ವರದಿ ಮಾಡಿ.',
      hi: 'मजबूत स्रोत आधार के साथ तेज़ और विश्वसनीय रिपोर्टिंग करें।',
    }),
    url: 'https://kwin-city.com/for/journalist',
    type: 'website',
  },
  };
}

export default async function JournalistPage() {
  const locale = await getServerLocale();
  return (
    <PersonaPage
      eyebrow={pickByLocale(locale, { en: 'Media Desk', kn: 'ಮೀಡಿಯಾ ಡೆಸ್ಕ್', hi: 'मीडिया डेस्क' })}
      title={pickByLocale(locale, {
        en: 'File faster, with stronger sourcing and cleaner claim hygiene.',
        kn: 'ಬಲವಾದ ಮೂಲಾಧಾರ ಮತ್ತು ಸ್ಪಷ್ಟ ಹೇಳಿಕೆಗಳೊಂದಿಗೆ ವೇಗವಾಗಿ ವರದಿ ಮಾಡಿ.',
        hi: 'मजबूत स्रोत और स्पष्ट दावों के साथ तेज़ रिपोर्टिंग करें।',
      })}
      description={pickByLocale(locale, {
        en: 'Use this page as your reporting launchpad: what is verifiable now, what remains proposal-level, and where each statement originates in the public record.',
        kn: 'ಈ ಪುಟವು ವರದಿ ಪ್ರಾರಂಭಿಸಲು ಮಾರ್ಗದರ್ಶಿ: ಏನು ಪರಿಶೀಲಿತ, ಏನು ಪ್ರಸ್ತಾವನೆ, ಮತ್ತು ಯಾವ ಹೇಳಿಕೆ ಯಾವ ಮೂಲದಿಂದ ಬಂದಿದೆ.',
        hi: 'यह पेज रिपोर्टिंग का लॉन्चपैड है: क्या सत्यापित है, क्या प्रस्ताव स्तर पर है, और कौन सा दावा किस स्रोत से है।',
      })}
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
