import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Sectors from '@/components/Sectors';
import JsonLd from '@/components/JsonLd';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Industry Sectors', item: 'https://kwin-city.com/sectors' },
  ],
};

const itemListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'KWIN City Industry Sectors',
  description: 'Five high-growth sector clusters in KWIN City, North Bengaluru',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Semiconductors & Advanced Manufacturing' },
    { '@type': 'ListItem', position: 2, name: 'Aerospace & Defence' },
    { '@type': 'ListItem', position: 3, name: 'Health-tech & Life Sciences' },
    { '@type': 'ListItem', position: 4, name: 'ICT & Deep Tech' },
    { '@type': 'ListItem', position: 5, name: 'Renewable Energy' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Industry Sectors | Semiconductors · Aerospace · Health-tech · Renewables',
      kn: 'ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳು | ಸೆಮಿಕಂಡಕ್ಟರ್ · ಏರೋಸ್ಪೇಸ್ · ಹೆಲ್ತ್-ಟೆಕ್ · ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿ',
      hi: 'उद्योग क्षेत्र | सेमीकंडक्टर · एयरोस्पेस · हेल्थ-टेक · नवीकरणीय ऊर्जा',
    }),
    description: pickByLocale(locale, {
      en: 'KWIN City targets five high-growth sectors: semiconductors, aerospace & defence, health-tech, ICT & deep tech, and renewable energy. Explore the investment thesis and evidence behind each cluster in North Bengaluru.',
      kn: 'KWIN City ಐದು ವೇಗವಾಗಿ ಬೆಳೆಯುವ ಕ್ಷೇತ್ರಗಳನ್ನು ಗುರಿಯಾಗಿಸಿದೆ. ಪ್ರತಿ ಕ್ಷೇತ್ರದ ಹಿಂದೆ ಇರುವ ಸಾಕ್ಷ್ಯಾಧಾರವನ್ನು ಇಲ್ಲಿ ನೋಡಿ.',
      hi: 'KWIN City पांच उच्च-विकास क्षेत्रों पर केंद्रित है। प्रत्येक क्लस्टर के पीछे के प्रमाण यहां देखें।',
    }),
    keywords: [
      'semiconductor park North Bengaluru',
      'aerospace cluster Karnataka',
      'health tech Bengaluru',
      'renewable energy township India',
      'ICT cluster KWIN',
      'KWIN City sectors',
      'deep tech India',
      'Karnataka industrial investment',
    ],
    alternates: { canonical: 'https://kwin-city.com/sectors' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City Industry Sectors — Semiconductors, Aerospace, Health-tech, Renewables',
        kn: 'KWIN City ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳು — ಸೆಮಿಕಂಡಕ್ಟರ್, ಏರೋಸ್ಪೇಸ್, ಹೆಲ್ತ್-ಟೆಕ್, ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿ',
        hi: 'KWIN City उद्योग क्षेत्र — सेमीकंडक्टर, एयरोस्पेस, हेल्थ-टेक, नवीकरणीय ऊर्जा',
      }),
      description: pickByLocale(locale, {
        en: 'Five high-growth sector clusters driving KWIN City investment: semiconductors, aerospace, health-tech, ICT, and renewables.',
        kn: 'KWIN City ಹೂಡಿಕೆಯನ್ನು ಮುನ್ನಡೆಸುವ ಐದು ವೇಗದ ಕ್ಷೇತ್ರಗಳು.',
        hi: 'KWIN City निवेश को आगे बढ़ाने वाले पांच उच्च-विकास क्षेत्र।',
      }),
      url: 'https://kwin-city.com/sectors',
      type: 'website',
      images: [{ url: 'https://kwin-city.com/sectors/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pickByLocale(locale, {
        en: 'KWIN City Industry Sectors — Semiconductors, Aerospace, Health-tech, Renewables',
        kn: 'KWIN City ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳು — ಸೆಮಿಕಂಡಕ್ಟರ್, ಏರೋಸ್ಪೇಸ್, ಹೆಲ್ತ್-ಟೆಕ್, ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿ',
        hi: 'KWIN City उद्योग क्षेत्र — सेमीकंडक्टर, एयरोस्पेस, हेल्थ-टेक, नवीकरणीय ऊर्जा',
      }),
      description: pickByLocale(locale, {
        en: 'Five high-growth sector clusters driving KWIN City investment: semiconductors, aerospace, health-tech, ICT, and renewables.',
        kn: 'KWIN City ಹೂಡಿಕೆಯನ್ನು ಮುನ್ನಡೆಸುವ ಐದು ವೇಗದ ಕ್ಷೇತ್ರಗಳು.',
        hi: 'KWIN City निवेश को आगे बढ़ाने वाले पांच उच्च-विकास क्षेत्र।',
      }),
      images: ['https://kwin-city.com/sectors/opengraph-image'],
    },
  };
}

export default async function SectorsPage() {
  const locale = await getServerLocale();
  return (
    <SiteFrame>
      <JsonLd data={[breadcrumb, itemListSchema]} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={pickByLocale(locale, { en: 'Industry Sectors', kn: 'ಕೈಗಾರಿಕಾ ಕ್ಷೇತ್ರಗಳು', hi: 'उद्योग क्षेत्र' })}
          title={pickByLocale(locale, {
            en: 'The industries that will power KWIN — and why they belong here.',
            kn: 'KWIN ಅನ್ನು ಮುನ್ನಡೆಸುವ ಕೈಗಾರಿಕೆಗಳು — ಮತ್ತು ಅವು ಇಲ್ಲಿ ಯಾಕೆ ಸೂಕ್ತ.',
            hi: 'वे उद्योग जो KWIN को आगे बढ़ाएंगे — और वे यहां क्यों उपयुक्त हैं।',
          })}
          description={pickByLocale(locale, {
            en: 'From semiconductors to aerospace, health-tech to renewables — KWIN\'s sector strategy aligns with where global capital is flowing and where Karnataka has built genuine competitive depth. Explore the ambition and the evidence behind it.',
            kn: 'ಸೆಮಿಕಂಡಕ್ಟರ್‌ನಿಂದ ಏರೋಸ್ಪೇಸ್‌ವರೆಗೆ, ಹೆಲ್ತ್-ಟೆಕ್‌ನಿಂದ ನವೀಕರಿಸಬಹುದಾದ ಶಕ್ತಿವರೆಗೆ — KWIN ಕ್ಷೇತ್ರ ತಂತ್ರ ಇಲ್ಲಿ ವಿವರಿಸಲಾಗಿದೆ.',
            hi: 'सेमीकंडक्टर से एयरोस्पेस तक, हेल्थ-टेक से नवीकरणीय ऊर्जा तक — KWIN की सेक्टर रणनीति यहां प्रस्तुत है।',
          })}
          sourceIds={['brief', 'economicSurvey', 'aviation', 'strr']}
        />
        <Sectors />
      </main>
    </SiteFrame>
  );
}
