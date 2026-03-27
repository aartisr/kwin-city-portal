import type { Metadata } from 'next';
import PersonaPage from '@/components/PersonaPage';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'For Investors | KWIN City — ₹40,000 Cr Opportunity · 5 Sector Clusters',
      kn: 'ಹೂಡಿಕೆದಾರರಿಗಾಗಿ | KWIN City — ₹40,000 ಕೋಟಿ ಅವಕಾಶ · 5 ಕ್ಷೇತ್ರಗಳು',
      hi: 'निवेशकों के लिए | KWIN City — ₹40,000 करोड़ अवसर · 5 सेक्टर',
    }),
    description: pickByLocale(locale, {
      en: 'Investment-focused briefing on KWIN City: ₹40,000 crore investment target, five sector clusters (semiconductors, aerospace, health-tech, ICT, renewables), risk framework, and due diligence checklist. North Bengaluru.',
      kn: 'KWIN City ಹೂಡಿಕೆ ಬ್ರೀಫಿಂಗ್: ₹40,000 ಕೋಟಿ ಗುರಿ, ಐದು ಕ್ಷೇತ್ರಗಳು, ಅಪಾಯ ಚೌಕಟ್ಟು ಮತ್ತು ಡ್ಯೂ ಡಿಲಿಜೆನ್ಸ್ ಚೆಕ್‌ಲಿಸ್ಟ್.',
      hi: 'KWIN City निवेश ब्रीफिंग: ₹40,000 करोड़ लक्ष्य, पांच सेक्टर, जोखिम ढांचा और ड्यू डिलिजेंस चेकलिस्ट।',
    }),
    keywords: [
      'invest in North Bengaluru',
      'KWIN City investment opportunity',
      'Karnataka industrial investment',
      'semiconductor investment India',
      'aerospace investment Karnataka',
      'KIADB investment',
      'Bengaluru real estate investment',
    ],
    alternates: { canonical: 'https://kwin-city.com/for/investor' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City for Investors — ₹40,000 Cr Opportunity in North Bengaluru',
        kn: 'KWIN City ಹೂಡಿಕೆದಾರರಿಗಾಗಿ — ಉತ್ತರ ಬೆಂಗಳೂರಿನ ₹40,000 ಕೋಟಿ ಅವಕಾಶ',
        hi: 'KWIN City निवेशकों के लिए — नॉर्थ बेंगलुरु में ₹40,000 करोड़ अवसर',
      }),
      description: pickByLocale(locale, {
        en: 'Evidence-first investment briefing: five sector clusters, risk framework, and due diligence checklist for KWIN City.',
        kn: 'ಸಾಕ್ಷ್ಯಾಧಾರಿತ ಹೂಡಿಕೆ ಮಾರ್ಗದರ್ಶಿ: ಕ್ಷೇತ್ರಗಳು, ಅಪಾಯ ಚೌಕಟ್ಟು ಮತ್ತು ಪರಿಶೀಲನಾ ಪಟ್ಟಿಗಳು.',
        hi: 'प्रमाण-आधारित निवेश गाइड: सेक्टर, जोखिम ढांचा और जांच सूची।',
      }),
      url: 'https://kwin-city.com/for/investor',
      type: 'website',
    },
  };
}

export default async function InvestorPage() {
  const locale = await getServerLocale();
  return (
    <PersonaPage
      eyebrow={pickByLocale(locale, { en: 'Investor Desk', kn: 'ಹೂಡಿಕೆದಾರರ ಡೆಸ್ಕ್', hi: 'निवेशक डेस्क' })}
      title={pickByLocale(locale, {
        en: 'Where long-horizon capital meets North Bengaluru momentum.',
        kn: 'ದೀರ್ಘಾವಧಿ ಬಂಡವಾಳ ಮತ್ತು ಉತ್ತರ ಬೆಂಗಳೂರಿನ ವೇಗ ಸೇರುವ ಸ್ಥಳ.',
        hi: 'जहां दीर्घकालिक पूंजी नॉर्थ बेंगलुरु की गति से मिलती है।',
      })}
      description={pickByLocale(locale, {
        en: 'KWIN City sits at the intersection of infrastructure acceleration, industrial policy, and knowledge-economy ambition. This page is a practical lens for investors evaluating strategic entry points and risk conditions.',
        kn: 'ಮೂಲಸೌಕರ್ಯ ವೇಗ, ಕೈಗಾರಿಕಾ ನೀತಿ ಮತ್ತು ಜ್ಞಾನ ಆರ್ಥಿಕತೆಯ ಸಂಗಮದಲ್ಲಿ KWIN City ಇದೆ.',
        hi: 'इंफ्रास्ट्रक्चर गति, औद्योगिक नीति और ज्ञान-अर्थव्यवस्था के संगम पर KWIN City स्थित है।',
      })}
      imageSrc="https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=1400&h=900&q=80&auto=format&fit=crop"
      imageAlt="Business district skyline"
      audienceLabel={pickByLocale(locale, {
        en: 'For institutional, strategic, and venture investors',
        kn: 'ಸಂಸ್ಥಾತ್ಮಕ, ತಂತ್ರಾತ್ಮಕ ಮತ್ತು ವೆಂಚರ್ ಹೂಡಿಕೆದಾರರಿಗಾಗಿ',
        hi: 'संस्थागत, रणनीतिक और वेंचर निवेशकों के लिए',
      })}
      quickActions={[
        { label: pickByLocale(locale, { en: 'View Industry Sectors', kn: 'ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳನ್ನು ನೋಡಿ', hi: 'उद्योग सेक्टर देखें' }), href: '/sectors' },
        { label: pickByLocale(locale, { en: 'See Full Evidence', kn: 'ಪೂರ್ಣ ಸಾಕ್ಷ್ಯ ನೋಡಿ', hi: 'पूरा प्रमाण देखें' }), href: '/evidence' },
        { label: pickByLocale(locale, { en: 'Read Source Ledger', kn: 'ಮೂಲ ಲೆಡ್ಜರ್ ಓದಿ', hi: 'स्रोत लेजर पढ़ें' }), href: '/sources' },
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
