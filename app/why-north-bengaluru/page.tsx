import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import PageIntro from '@/components/PageIntro';
import WhyNorthBengaluru from '@/components/WhyNorthBengaluru';
import StrategicLocationMap from '@/components/StrategicLocationMap';
import JsonLd from '@/components/JsonLd';

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

export const metadata: Metadata = {
  title: 'Why North Bengaluru | Airport City · STRR Corridor · Fastest-Growing Region',
  description:
    'North Bengaluru is India\'s most compelling urban canvas: adjacent to Kempegowda International Airport, integrated into the STRR corridor, and at the heart of Karnataka\'s fastest-growing northern belt. Explore the evidence.',
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
    title: 'Why North Bengaluru — Airport City, STRR Corridor, India\'s Fastest-Growing Region',
    description:
      'The strategic case for North Bengaluru as India\'s next knowledge-economy hub — backed by aviation data, infrastructure maps, and Karnataka economic evidence.',
    url: 'https://kwin-city.com/why-north-bengaluru',
    type: 'website',
  },
};

export default function WhyNorthBengaluruPage() {
  return (
    <SiteFrame>
      <JsonLd data={[breadcrumb, placeSchema]} />
      <main id="main-content" role="main">
        <PageIntro
          eyebrow="The Region"
          title="North Bengaluru: the most compelling urban canvas in India right now."
          description="Airport growth. Corridor infrastructure. Karnataka's economic ambition. Water realities. This page traces the regional evidence that makes KWIN's proposed location not just plausible — but strategically inevitable."
          sourceIds={['aviation', 'strr', 'irr', 'economicSurvey', 'rainfall', 'groundwater', 'lakes']}
        />
        
        {/* Strategic Location & Connectivity Map */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">
                Strategic Location & Connectivity Hub 🗺️
              </h2>
              <p className="text-slate-600 max-w-3xl">
                KWIN City occupies a strategically inevitable location: adjacent to Bengaluru International Airport, 
                integrated into the Satellite Town Ring Road (STRR) corridor, and positioned within Karnataka's 
                fastest-growing northern corridor. This map visualizes the geographic rationale.
              </p>
            </div>
            <StrategicLocationMap />
          </div>
        </section>

        <WhyNorthBengaluru />
      </main>
    </SiteFrame>
  );
}
