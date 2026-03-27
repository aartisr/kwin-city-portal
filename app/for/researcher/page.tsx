import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
  title: pickByLocale(locale, {
    en: 'For Researchers | KWIN City — Reproducible Evidence · Open Data · Methodology',
    kn: 'ಸಂಶೋಧಕರಿಗಾಗಿ | KWIN City — ಪುನರುತ್ಪಾದಕ ಸಾಕ್ಷ್ಯ · ಓಪನ್ ಡೇಟಾ · ವಿಧಾನಶಾಸ್ತ್ರ',
    hi: 'शोधकर्ताओं के लिए | KWIN City — पुनरुत्पाद्य प्रमाण · ओपन डेटा · कार्यप्रणाली',
  }),
  description: pickByLocale(locale, {
    en: 'Researcher-grade portal for KWIN City: traceable data layers, Karnataka government open data, evidence quality tiers, claim-to-source mapping, and reproducible inquiry pathways.',
    kn: 'KWIN City ಸಂಶೋಧಕರಿಗೆ: ಟ್ರೇಸ್ ಮಾಡಬಹುದಾದ ಡೇಟಾ, ತೆರೆಯಾದ ಮೂಲಗಳು ಮತ್ತು ಪುನರುತ್ಪಾದಕ ವಿಧಾನ.',
    hi: 'KWIN City शोधकर्ताओं के लिए: ट्रेस करने योग्य डेटा, ओपन स्रोत और पुनरुत्पाद्य कार्यप्रणाली।',
  }),
  keywords: [
    'KWIN City research',
    'urban research India',
    'Karnataka open data research',
    'evidence-based city portal',
    'smart city research methodology',
  ],
  alternates: { canonical: 'https://kwin-city.com/for/researcher' },
  openGraph: {
    title: pickByLocale(locale, {
      en: 'KWIN City for Researchers — From Narrative to Reproducible Evidence',
      kn: 'KWIN City ಸಂಶೋಧಕರಿಗಾಗಿ — ಕಥನದಿಂದ ಪುನರುತ್ಪಾದಕ ಸಾಕ್ಷ್ಯವರೆಗೆ',
      hi: 'KWIN City शोधकर्ताओं के लिए — कथा से पुनरुत्पाद्य प्रमाण तक',
    }),
    description: pickByLocale(locale, {
      en: 'Data layers, claim ledger, and methodology for academic and policy researchers.',
      kn: 'ಶೈಕ್ಷಣಿಕ ಮತ್ತು ನೀತಿ ಸಂಶೋಧಕರಿಗಾಗಿ ಡೇಟಾ ಪದರಗಳು ಮತ್ತು ವಿಧಾನಶಾಸ್ತ್ರ.',
      hi: 'शैक्षणिक और नीति शोधकर्ताओं के लिए डेटा लेयर और कार्यप्रणाली।',
    }),
    url: 'https://kwin-city.com/for/researcher',
    type: 'website',
  },
  };
}

export default async function ResearcherPage() {
  const locale = await getServerLocale();
  return (
    <PersonaPage
      eyebrow={pickByLocale(locale, { en: 'Researcher Console', kn: 'ಸಂಶೋಧಕ ಕಾನ್ಸೋಲ್', hi: 'रिसर्चर कंसोल' })}
      title={pickByLocale(locale, {
        en: 'From narrative claims to reproducible evidence workflows.',
        kn: 'ಕಥನದ ಹೇಳಿಕೆಗಳಿಂದ ಪುನರುತ್ಪಾದಕ ಸಾಕ್ಷ್ಯ ಕಾರ್ಯಪ್ರವಾಹವರೆಗೆ.',
        hi: 'कथात्मक दावों से पुनरुत्पाद्य प्रमाण कार्यप्रवाह तक।',
      })}
      description={pickByLocale(locale, {
        en: 'This portal is structured to support evidence-grade inquiry. Use it to trace assertions to sources, compare status labels, and develop your own independent interpretations.',
        kn: 'ಈ ಪೋರ್ಟಲ್ ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಸಂಶೋಧನೆಯನ್ನು ಬೆಂಬಲಿಸುವಂತೆ ವಿನ್ಯಾಸಗೊಳಿಸಲಾಗಿದೆ.',
        hi: 'यह पोर्टल प्रमाण-आधारित अनुसंधान को समर्थन देने के लिए बनाया गया है।',
      })}
      imageSrc="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Researchers in data lab"
      audienceLabel={pickByLocale(locale, {
        en: 'For academics, policy analysts, and data scientists',
        kn: 'ಶೈಕ್ಷಣಿಕರು, ನೀತಿ ವಿಶ್ಲೇಷಕರು ಮತ್ತು ಡೇಟಾ ವಿಜ್ಞಾನಿಗಳಿಗಾಗಿ',
        hi: 'शिक्षाविदों, नीति विश्लेषकों और डेटा वैज्ञानिकों के लिए',
      })}
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
