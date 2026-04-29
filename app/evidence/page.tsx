import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import EvidenceVault from '@/components/EvidenceVault';
import JsonLd from '@/components/JsonLd';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Evidence Vault', item: 'https://kwin-city.com/evidence' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Evidence Vault | Verified Research · Government Data · Source Ledger',
      kn: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ | ಪರಿಶೀಲಿತ ಸಂಶೋಧನೆ · ಸರ್ಕಾರಿ ಡೇಟಾ · ಮೂಲ ಲೆಡ್ಜರ್',
      hi: 'एविडेंस वॉल्ट | सत्यापित शोध · सरकारी डेटा · स्रोत लेजर',
    }),
    description: pickByLocale(locale, {
      en: 'Seven curated datasets from OpenCity and Karnataka State government — each mapped to what it can and cannot prove about KWIN City. The gold standard for evidence-first urban research.',
      kn: 'KWIN City ಕುರಿತು ಯಾವುದು ಸಾಬೀತಾಗುತ್ತದೆ ಮತ್ತು ಯಾವುದು ಸಾಬೀತಾಗುವುದಿಲ್ಲ ಎಂಬುದನ್ನು ತೋರಿಸುವ ಪರಿಶೀಲಿತ ಡೇಟಾಸೆಟ್‌ಗಳು.',
      hi: 'KWIN City के बारे में क्या सिद्ध होता है और क्या नहीं, यह दिखाने वाले सत्यापित डेटासेट।',
    }),
    keywords: [
      'KWIN City evidence',
      'urban research portal India',
      'Karnataka open data',
      'Bengaluru government data',
      'evidence-first city portal',
      'KWIN claim verification',
    ],
    alternates: { canonical: 'https://kwin-city.com/evidence' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City Evidence Vault — Verified Research for Responsible Urban Development',
        kn: 'KWIN City ಸಾಕ್ಷ್ಯ ಭಂಡಾರ — ಜವಾಬ್ದಾರಿಯುತ ನಗರಾಭಿವೃದ್ಧಿಗೆ ಪರಿಶೀಲಿತ ಸಂಶೋಧನೆ',
        hi: 'KWIN City एविडेंस वॉल्ट — जिम्मेदार शहरी विकास के लिए सत्यापित शोध',
      }),
      description: pickByLocale(locale, {
        en: 'Review seven curated government and open-data evidence layers that explain what each dataset can and cannot prove about KWIN City and North Bengaluru.',
        kn: 'KWIN City ಸಂಶೋಧನೆಗೆ ಬೆಂಬಲಿಸುವ ಪರಿಶೀಲಿತ ಸರ್ಕಾರದ ಡೇಟಾಸೆಟ್‌ಗಳು.',
        hi: 'KWIN City शोध पोर्टल को समर्थित करने वाले सत्यापित सरकारी डेटासेट।',
      }),
      url: 'https://kwin-city.com/evidence',
      type: 'website',
    },
  };
}

export default async function EvidencePage() {
  const locale = await getServerLocale();
  return (
    <SiteFrame>
      <JsonLd data={breadcrumb} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={pickByLocale(locale, { en: 'Evidence Vault', kn: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ', hi: 'एविडेंस वॉल्ट' })}
          title={pickByLocale(locale, {
            en: 'The research that makes KWIN\'s story credible.',
            kn: 'KWIN ಕಥೆಗೆ ನಂಬಿಕೆ ನೀಡುವ ಸಂಶೋಧನೆ.',
            hi: 'वह शोध जो KWIN की कहानी को विश्वसनीय बनाता है।',
          })}
          description={pickByLocale(locale, {
            en: 'Seven curated datasets from OpenCity and Karnataka State — each one carefully mapped to what it can and cannot prove about KWIN City. This is how responsible urban research looks.',
            kn: 'OpenCity ಮತ್ತು ಕರ್ನಾಟಕ ರಾಜ್ಯದ ಆಯ್ದ ಡೇಟಾಸೆಟ್‌ಗಳು KWIN City ಕುರಿತ ಸಾಕ್ಷ್ಯಾಧಾರವನ್ನು ಸ್ಪಷ್ಟಪಡಿಸುತ್ತವೆ.',
            hi: 'OpenCity और कर्नाटक राज्य के चुने हुए डेटासेट KWIN City पर प्रमाण को स्पष्ट करते हैं।',
          })}
          sourceIds={['aviation', 'strr', 'irr', 'economicSurvey', 'rainfall', 'groundwater', 'lakes']}
        />
        <EvidenceVault />
      </main>
    </SiteFrame>
  );
}
