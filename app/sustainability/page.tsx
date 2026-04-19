import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import Sustainability from '@/components/Sustainability';
import JsonLd from '@/components/JsonLd';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Sustainability', item: 'https://kwin-city.com/sustainability' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Sustainability | Net-Zero Township · 40% Green Cover · Solar Self-Sufficient',
      kn: 'ಸ್ಥಿರತೆಯ ನಗರ | ನೆಟ್-ಶೂನ್ಯ · ಹಸಿರು ಆವರಣ · ಸೌರ ಸ್ವಯಂಸಂಪೂರ್ಣತೆ',
      hi: 'सस्टेनेबिलिटी | नेट-ज़ीरो टाउनशिप · ग्रीन कवर · सौर आत्मनिर्भरता',
    }),
    description: pickByLocale(locale, {
      en: 'KWIN City is designed for net-zero carbon operations — solar self-sufficient, 40% green cover, interconnected lakes, and near-zero waste. Explore the sustainability evidence and water-resilience data for North Bengaluru.',
      kn: 'KWIN City ಅನ್ನು ನೆಟ್-ಶೂನ್ಯ ಕಾರ್ಬನ್ ಕಾರ್ಯಾಚರಣೆಗೆ ರೂಪಿಸಲಾಗಿದೆ. ಸ್ಥಿರತೆಯ ಸಾಕ್ಷ್ಯಗಳನ್ನು ಇಲ್ಲಿ ನೋಡಿ.',
      hi: 'KWIN City को नेट-ज़ीरो कार्बन संचालन के लिए डिज़ाइन किया गया है। सस्टेनेबिलिटी के प्रमाण यहां देखें।',
    }),
    keywords: [
      'net zero city India',
      'sustainable township Bengaluru',
      'KWIN sustainability',
      'green city Karnataka',
      'solar energy township India',
      'water resilience Bengaluru',
      'eco township North Bengaluru',
    ],
    alternates: { canonical: 'https://kwin-city.com/sustainability' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'KWIN City Sustainability — Net-Zero · Solar · 40% Green Cover',
        kn: 'KWIN City ಸ್ಥಿರತೆ — ನೆಟ್-ಶೂನ್ಯ · ಸೌರ · 40% ಹಸಿರು',
        hi: 'KWIN City सस्टेनेबिलिटी — नेट-ज़ीरो · सौर · 40% ग्रीन कवर',
      }),
      description: pickByLocale(locale, {
        en: 'KWIN City is designed net-zero from Day 1. Explore solar, water, green cover, and resilience evidence.',
        kn: 'KWIN City ಆರಂಭದಿಂದಲೇ ನೆಟ್-ಶೂನ್ಯ ದೃಷ್ಟಿಯಿಂದ ವಿನ್ಯಾಸಗೊಂಡಿದೆ.',
        hi: 'KWIN City को शुरुआत से ही नेट-ज़ीरो दृष्टिकोण से डिज़ाइन किया गया है।',
      }),
      url: 'https://kwin-city.com/sustainability',
      type: 'website',
      images: [{ url: 'https://kwin-city.com/sustainability/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pickByLocale(locale, {
        en: 'KWIN City Sustainability — Net-Zero · Solar · 40% Green Cover',
        kn: 'KWIN City ಸ್ಥಿರತೆ — ನೆಟ್-ಶೂನ್ಯ · ಸೌರ · 40% ಹಸಿರು',
        hi: 'KWIN City सस्टेनेबिलिटी — नेट-ज़ीरो · सौर · 40% ग्रीन कवर',
      }),
      description: pickByLocale(locale, {
        en: 'KWIN City is designed net-zero from Day 1. Explore solar, water, green cover, and resilience evidence.',
        kn: 'KWIN City ಆರಂಭದಿಂದಲೇ ನೆಟ್-ಶೂನ್ಯ ದೃಷ್ಟಿಯಿಂದ ವಿನ್ಯಾಸಗೊಂಡಿದೆ.',
        hi: 'KWIN City को शुरुआत से ही नेट-ज़ीरो दृष्टिकोण से डिज़ाइन किया गया है।',
      }),
      images: ['https://kwin-city.com/sustainability/opengraph-image'],
    },
  };
}

export default async function SustainabilityPage() {
  const locale = await getServerLocale();
  return (
    <SiteFrame>
      <JsonLd data={breadcrumb} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={pickByLocale(locale, { en: 'Sustainability', kn: 'ಸ್ಥಿರತೆ', hi: 'सस्टेनेबिलिटी' })}
          title={pickByLocale(locale, {
            en: 'A city that works with nature, not against it.',
            kn: 'ಪ್ರಕೃತಿಗೆ ವಿರುದ್ಧವಾಗಿ ಅಲ್ಲ, ಪ್ರಕೃತಿಯ ಜೊತೆ ಕೆಲಸ ಮಾಡುವ ನಗರ.',
            hi: 'प्रकृति के खिलाफ नहीं, प्रकृति के साथ काम करने वाला शहर।',
          })}
          description={pickByLocale(locale, {
            en: 'Solar self-sufficiency, interconnected lakes, 40% green cover, near-zero waste. KWIN\'s sustainability ambitions are tested in this section against growth trajectory, groundwater, and lake-governance evidence for the region.',
            kn: 'ಸೌರ ಸ್ವಯಂಸಂಪೂರ್ಣತೆ, ಪರಸ್ಪರ ಸಂಪರ್ಕಿತ ಕೆರೆಗಳು ಮತ್ತು ಹಸಿರು ಆವರಣ — KWIN ಸ್ಥಿರತಾ ಗುರಿಗಳನ್ನು ಇಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ.',
            hi: 'सौर आत्मनिर्भरता, आपस में जुड़े झील तंत्र और ग्रीन कवर — KWIN के सस्टेनेबिलिटी लक्ष्यों की यहां समीक्षा है।',
          })}
          sourceIds={['brief', 'rainfall', 'groundwater', 'lakes', 'kiadb']}
        />
        <Sustainability />
      </main>
    </SiteFrame>
  );
}
