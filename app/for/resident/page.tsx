import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
  title: pickByLocale(locale, {
    en: 'For Residents | KWIN City — Livability, Healthcare, Green Cover & Connectivity',
    kn: 'ನಿವಾಸಿಗಳಿಗಾಗಿ | KWIN City — ವಾಸಸ್ಥಿತಿ, ಆರೋಗ್ಯ, ಹಸಿರು ಆವರಣ ಮತ್ತು ಸಂಪರ್ಕತೆ',
    hi: 'निवासियों के लिए | KWIN City — जीवन गुणवत्ता, स्वास्थ्य, ग्रीन कवर और कनेक्टिविटी',
  }),
  description: pickByLocale(locale, {
    en: 'Resident-focused guide to KWIN City: access, healthcare, international schools, 40% green cover, air quality, and everyday quality-of-life evidence for a future North Bengaluru community.',
    kn: 'ನಿವಾಸಿಗಳಿಗಾಗಿ KWIN City ಮಾರ್ಗದರ್ಶಿ: ಪ್ರವೇಶ, ಆರೋಗ್ಯ, ಹಸಿರು ಆವರಣ ಮತ್ತು ದೈನಂದಿನ ಜೀವನ ಗುಣಮಟ್ಟ.',
    hi: 'निवासियों के लिए KWIN City गाइड: पहुंच, स्वास्थ्य, ग्रीन कवर और दैनिक जीवन गुणवत्ता।',
  }),
  keywords: [
    'KWIN City residents',
    'live in North Bengaluru',
    'sustainable community Bengaluru',
    'Doddaballapura housing',
    'knowledge city livability India',
  ],
  alternates: { canonical: 'https://kwin-city.com/for/resident' },
  openGraph: {
    title: pickByLocale(locale, {
      en: 'KWIN City for Residents — Livability, Healthcare & Green Community',
      kn: 'KWIN City ನಿವಾಸಿಗಳಿಗಾಗಿ — ವಾಸಸ್ಥಿತಿ, ಆರೋಗ್ಯ ಮತ್ತು ಹಸಿರು ಸಮುದಾಯ',
      hi: 'KWIN City निवासियों के लिए — जीवन गुणवत्ता, स्वास्थ्य और हरित समुदाय',
    }),
    description: pickByLocale(locale, {
      en: 'What daily life in KWIN City may look like — evidence-first, jargon-free.',
      kn: 'KWIN City ಯ ದೈನಂದಿನ ಜೀವನ ಹೇಗಿರಬಹುದು — ಸರಳ ಮತ್ತು ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಪರಿಚಯ.',
      hi: 'KWIN City में दैनिक जीवन कैसा हो सकता है — सरल और प्रमाण-आधारित परिचय।',
    }),
    url: 'https://kwin-city.com/for/resident',
    type: 'website',
  },
  };
}

export default async function ResidentPage() {
  const locale = await getServerLocale();
  return (
    <PersonaPage
      eyebrow={pickByLocale(locale, { en: 'Resident Guide', kn: 'ನಿವಾಸಿ ಮಾರ್ಗದರ್ಶಿ', hi: 'निवासी गाइड' })}
      title={pickByLocale(locale, {
        en: 'A city story measured by daily life, not just master plans.',
        kn: 'ಮಾಸ್ಟರ್ ಪ್ಲ್ಯಾನ್ ಮಾತ್ರವಲ್ಲ, ದೈನಂದಿನ ಜೀವನದಿಂದ ಅಳೆಯುವ ನಗರದ ಕಥೆ.',
        hi: 'सिर्फ मास्टर प्लान नहीं, दैनिक जीवन से मापी जाने वाली शहर की कहानी।',
      })}
      description={pickByLocale(locale, {
        en: 'If you are evaluating KWIN City as a future place to live, this page distills what matters most: access, healthcare, education, ecology, and real neighborhood quality.',
        kn: 'ಭವಿಷ್ಯದ ವಾಸಸ್ಥಳವಾಗಿ KWIN City ಯನ್ನು ಪರಿಶೀಲಿಸುವವರಿಗೆ ಮುಖ್ಯ ಅಂಶಗಳನ್ನು ಈ ಪುಟ ಒದಗಿಸುತ್ತದೆ.',
        hi: 'भविष्य के निवास स्थान के रूप में KWIN City का मूल्यांकन करने वालों के लिए यह पेज मुख्य बिंदु देता है।',
      })}
      imageSrc="https://images.unsplash.com/photo-1475483768296-6163e08872a1?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Green urban park with families"
      audienceLabel={pickByLocale(locale, {
        en: 'For families, professionals, and long-term residents',
        kn: 'ಕುಟುಂಬಗಳು, ವೃತ್ತಿಪರರು ಮತ್ತು ದೀರ್ಘಾವಧಿ ನಿವಾಸಿಗಳಿಗಾಗಿ',
        hi: 'परिवारों, पेशेवरों और दीर्घकालिक निवासियों के लिए',
      })}
      quickActions={[
        { label: pickByLocale(locale, { en: 'See Sustainability Plan', kn: 'ಸ್ಥಿರತಾ ಯೋಜನೆ ನೋಡಿ', hi: 'सस्टेनेबिलिटी प्लान देखें' }), href: '/sustainability' },
        { label: pickByLocale(locale, { en: 'Explore Regional Context', kn: 'ಪ್ರಾದೇಶಿಕ ಹಿನ್ನೆಲೆ ಅನ್ವೇಷಿಸಿ', hi: 'क्षेत्रीय संदर्भ देखें' }), href: '/why-north-bengaluru' },
        { label: pickByLocale(locale, { en: 'Review Sources', kn: 'ಮೂಲಗಳನ್ನು ಪರಿಶೀಲಿಸಿ', hi: 'स्रोत समीक्षा करें' }), href: '/sources' },
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
