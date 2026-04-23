import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import LazyStrategicLocationMap from '@/components/LazyStrategicLocationMap';
import PageIntro from '@/components/PageIntro';
import WhyNorthBengaluru from '@/components/WhyNorthBengaluru';
import JsonLd from '@/components/JsonLd';
import { getServerLocale, pickByLocale } from '@/lib/i18n/server';

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kwin-city.com' },
    { '@type': 'ListItem', position: 2, name: 'Why North Bengaluru', item: 'https://kwin-city.com/why-north-bengaluru' },
  ],
};

const placeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'North Bengaluru, Karnataka',
  description:
    'North Bengaluru is India\'s fastest-growing urban corridor, adjacent to Kempegowda International Airport and integrated into the STRR infrastructure belt.',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 13.2905,
    longitude: 77.5419,
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Doddaballapura',
    addressRegion: 'Karnataka',
    addressCountry: 'IN',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  return {
    title: pickByLocale(locale, {
      en: 'Why North Bengaluru | Airport, STRR, Growth Corridor & Regional Advantage',
      kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು ಯಾಕೆ | ಏರ್‌ಪೋರ್ಟ್ ಸಿಟಿ · STRR ಕಾರಿಡಾರ್ · ವೇಗವಾಗಿ ಬೆಳೆಯುತ್ತಿರುವ ಪ್ರದೇಶ',
      hi: 'नॉर्थ बेंगलुरु क्यों | एयरपोर्ट सिटी · STRR कॉरिडोर · सबसे तेज़ी से बढ़ता क्षेत्र',
    }),
    description: pickByLocale(locale, {
      en: 'See why North Bengaluru matters: airport adjacency, STRR connectivity, industrial momentum, water realities, and the regional evidence behind KWIN City’s proposed location.',
      kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು ಭಾರತದ ಅತ್ಯಂತ ತಾಕತ್ತಿನ ನಗರ ಪ್ರದೇಶಗಳಲ್ಲಿ ಒಂದು. ಸಾಕ್ಷ್ಯಾಧಾರಗಳನ್ನು ಇಲ್ಲಿ ನೋಡಿ.',
      hi: 'नॉर्थ बेंगलुरु भारत का एक अत्यंत रणनीतिक शहरी क्षेत्र है। प्रमाण यहां देखें।',
    }),
    keywords: [
      'North Bengaluru development',
      'Doddaballapura investment',
      'KIAL airport city',
      'Bengaluru aerospace corridor',
      'STRR corridor real estate',
      'Karnataka economic growth',
      'Bengaluru satellite city',
      'KWIN City location',
    ],
    alternates: { canonical: 'https://kwin-city.com/why-north-bengaluru' },
    openGraph: {
      title: pickByLocale(locale, {
        en: 'Why North Bengaluru — Airport Access, STRR, Infrastructure and Growth Signals',
        kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು ಯಾಕೆ — ಏರ್‌ಪೋರ್ಟ್ ಸಿಟಿ, STRR ಕಾರಿಡಾರ್',
        hi: 'नॉर्थ बेंगलुरु क्यों — एयरपोर्ट सिटी, STRR कॉरिडोर',
      }),
      description: pickByLocale(locale, {
        en: 'A data-backed regional case for North Bengaluru with aviation, corridor, infrastructure, and economic-growth evidence.',
        kn: 'ವಿಮಾನಯಾನ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ ಡೇಟಾದ ಆಧಾರದಿಂದ ಉತ್ತರ ಬೆಂಗಳೂರುಗಾಗಿ ತಂತ್ರಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ.',
        hi: 'एविएशन और इंफ्रास्ट्रक्चर डेटा के आधार पर नॉर्थ बेंगलुरु का रणनीतिक विश्लेषण।',
      }),
      url: 'https://kwin-city.com/why-north-bengaluru',
      type: 'website',
      images: [{ url: 'https://kwin-city.com/why-north-bengaluru/opengraph-image' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: pickByLocale(locale, {
        en: 'Why North Bengaluru — Airport City, STRR Corridor, India\'s Fastest-Growing Region',
        kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು ಯಾಕೆ — ಏರ್‌ಪೋರ್ಟ್ ಸಿಟಿ, STRR ಕಾರಿಡಾರ್',
        hi: 'नॉर्थ बेंगलुरु क्यों — एयरपोर्ट सिटी, STRR कॉरिडोर',
      }),
      description: pickByLocale(locale, {
        en: 'The strategic case for North Bengaluru as India\'s next knowledge-economy hub — backed by aviation data, infrastructure maps, and Karnataka economic evidence.',
        kn: 'ವಿಮಾನಯಾನ ಮತ್ತು ಮೂಲಸೌಕರ್ಯ ಡೇಟಾದ ಆಧಾರದಿಂದ ಉತ್ತರ ಬೆಂಗಳೂರುಗಾಗಿ ತಂತ್ರಾತ್ಮಕ ವಿಶ್ಲೇಷಣೆ.',
        hi: 'एविएशन और इंफ्रास्ट्रक्चर डेटा के आधार पर नॉर्थ बेंगलुरु का रणनीतिक विश्लेषण।',
      }),
      images: ['https://kwin-city.com/why-north-bengaluru/opengraph-image'],
    },
  };
}

export default async function WhyNorthBengaluruPage() {
  const locale = await getServerLocale();
  return (
    <SiteFrame>
      <JsonLd data={[breadcrumb, placeSchema]} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow={pickByLocale(locale, { en: 'The Region', kn: 'ಪ್ರದೇಶ', hi: 'यह क्षेत्र' })}
          title={pickByLocale(locale, {
            en: 'North Bengaluru: the most compelling urban canvas in India right now.',
            kn: 'ಉತ್ತರ ಬೆಂಗಳೂರು: ಇದೀಗ ಭಾರತದ ಅತ್ಯಂತ ತಾಕತ್ತಿನ ನಗರ ವೇದಿಕೆ.',
            hi: 'नॉर्थ बेंगलुरु: इस समय भारत का सबसे रणनीतिक शहरी कैनवास।',
          })}
          description={pickByLocale(locale, {
            en: 'Airport growth. Corridor infrastructure. Karnataka\'s economic ambition. Water realities. This page traces the regional evidence that makes KWIN\'s proposed location not just plausible — but strategically inevitable.',
            kn: 'ಏರ್‌ಪೋರ್ಟ್ ಬೆಳವಣಿಗೆ, ಕಾರಿಡಾರ್ ಮೂಲಸೌಕರ್ಯ ಮತ್ತು ನೀರಿನ ವಾಸ್ತವತೆಗಳ ಆಧಾರದ ಮೇಲೆ KWIN ಸ್ಥಳ ಆಯ್ಕೆಯನ್ನು ಇಲ್ಲಿ ವಿವರಿಸಲಾಗಿದೆ.',
            hi: 'एयरपोर्ट वृद्धि, कॉरिडोर इंफ्रास्ट्रक्चर और जल वास्तविकताओं के आधार पर KWIN स्थान का विश्लेषण यहां है।',
          })}
          sourceIds={['aviation', 'strr', 'irr', 'economicSurvey', 'rainfall', 'groundwater', 'lakes']}
        />
        
        {/* Strategic Location & Connectivity Map */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                {pickByLocale(locale, {
                  en: 'Strategic Location & Connectivity Hub 🗺️',
                  kn: 'ತಂತ್ರಾತ್ಮಕ ಸ್ಥಳ ಮತ್ತು ಸಂಪರ್ಕ ಕೇಂದ್ರ 🗺️',
                  hi: 'रणनीतिक स्थान और कनेक्टिविटी हब 🗺️',
                })}
              </h2>
              <p className="text-slate-600 max-w-3xl">
                {pickByLocale(locale, {
                  en: 'KWIN City occupies a strategically inevitable location: adjacent to Bengaluru International Airport, integrated into the Satellite Town Ring Road (STRR) corridor, and positioned within Karnataka\'s fastest-growing northern corridor. This map visualizes the geographic rationale.',
                  kn: 'KWIN City ತಂತ್ರಾತ್ಮಕವಾಗಿ ಪ್ರಮುಖ ಸ್ಥಳದಲ್ಲಿದೆ: ಅಂತರರಾಷ್ಟ್ರೀಯ ವಿಮಾನ ನಿಲ್ದಾಣ ಸಮೀಪ, STRR ಕಾರಿಡಾರ್ ಸಂಪರ್ಕ, ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕ ಬೆಳವಣಿಗೆ ಅಕ್ಷದಲ್ಲಿ ಸ್ಥಾಪಿತವಾಗಿದೆ.',
                  hi: 'KWIN City एक रणनीतिक स्थान पर है: अंतरराष्ट्रीय हवाईअड्डे के पास, STRR कॉरिडोर से जुड़ा हुआ, और कर्नाटक के तेज़ी से बढ़ते उत्तरी क्षेत्र में स्थित।',
                })}
              </p>
            </div>
            <LazyStrategicLocationMap />
          </div>
        </section>

        <WhyNorthBengaluru />
      </main>
    </SiteFrame>
  );
}
