import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
  title: pickByLocale(locale, {
    en: 'KWIN City Explained Simply | For Curious Citizens',
    kn: 'KWIN City ಸರಳ ವಿವರಣೆ | ಕುತೂಹಲಕರ ನಾಗರಿಕರಿಗಾಗಿ',
    hi: 'KWIN City सरल व्याख्या | जिज्ञासु नागरिकों के लिए',
  }),
  description: pickByLocale(locale, {
    en: 'What is KWIN City? A plain-language guide — no jargon. Understand what is proposed, what has evidence, and what is still a plan for North Bengaluru’s knowledge township.',
    kn: 'KWIN City ಎಂದರೇನು? ಸರಳ ಭಾಷೆಯಲ್ಲಿ ವಿವರಣೆ — ಜಾರ್ಗನ್ ಇಲ್ಲದೆ.',
    hi: 'KWIN City क्या है? सरल भाषा में गाइड — बिना जार्गन।',
  }),
  keywords: [
    'what is KWIN City',
    'KWIN City explained',
    'North Bengaluru new city',
    'knowledge city India explained',
    'Doddaballapura city project',
  ],
  alternates: { canonical: 'https://kwin-city.com/for/curious-citizens' },
  openGraph: {
    title: pickByLocale(locale, {
      en: 'KWIN City Explained Simply — No Jargon, Just Facts',
      kn: 'KWIN City ಸರಳ ವಿವರಣೆ — ಜಾರ್ಗನ್ ಇಲ್ಲ, ನಿಜಾಂಶ ಮಾತ್ರ',
      hi: 'KWIN City सरल व्याख्या — बिना जार्गन, सिर्फ तथ्य',
    }),
    description: pickByLocale(locale, {
      en: 'What is KWIN City? What is confirmed, what is proposed? A plain-language guide for everyone.',
      kn: 'KWIN City ಏನು? ಏನು ದೃಢೀಕೃತ, ಏನು ಪ್ರಸ್ತಾಪಿತ? ಎಲ್ಲರಿಗೂ ಸರಳ ಮಾರ್ಗದರ್ಶಿ.',
      hi: 'KWIN City क्या है? क्या पुष्ट है, क्या प्रस्तावित है? सभी के लिए सरल गाइड।',
    }),
    url: 'https://kwin-city.com/for/curious-citizens',
    type: 'website',
  },
  };
}

export default async function CuriousCitizensPage() {
  const locale = await getServerLocale();
  return (
    <PersonaPage
      eyebrow={pickByLocale(locale, { en: 'Citizen Explainer', kn: 'ನಾಗರಿಕ ವಿವರಣೆ', hi: 'नागरिक व्याख्या' })}
      title={pickByLocale(locale, {
        en: 'KWIN, explained clearly — no jargon required.',
        kn: 'KWIN ಸರಳವಾಗಿ — ಜಾರ್ಗನ್ ಬೇಡ.',
        hi: 'KWIN स्पष्ट तरीके से — बिना जार्गन।',
      })}
      description={pickByLocale(locale, {
        en: 'If you just want the truth in simple terms, this is your page. Learn what KWIN City is, what has evidence, what is still a proposal, and how to track updates responsibly.',
        kn: 'ಸರಳವಾಗಿ ನಿಜಾಂಶಗಳನ್ನು ತಿಳಿದುಕೊಳ್ಳಲು ಈ ಪುಟ ನಿಮಗಾಗಿ.',
        hi: 'सरल शब्दों में तथ्य समझने के लिए यह पेज आपके लिए है।',
      })}
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
