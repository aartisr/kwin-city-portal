import EnhancedRegionMap from '@/components/EnhancedRegionMap';

export const metadata = {
  title: 'Interactive Map',
  description:
    'Explore KWIN City geography through a live interactive Mapbox experience with regional framing, proposed zones, infrastructure overlays, ecological systems, and strategic points of interest across North Bengaluru.',
  alternates: { canonical: 'https://kwin-city.com/region-map' },
  robots: { index: true, follow: true },
};

export default function InteractiveMapPage() {
  return <EnhancedRegionMap />;
}
