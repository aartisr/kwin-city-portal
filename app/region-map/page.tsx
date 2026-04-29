import EnhancedRegionMap from '@/components/EnhancedRegionMap';

export const metadata = {
  title: 'Interactive Map',
  description:
    'Explore KWIN City geography through an interactive map prototype with zones, infrastructure layers, green-space toggles, and points of interest for North Bengaluru context.',
  alternates: { canonical: 'https://kwin-city.com/why-north-bengaluru' },
  robots: { index: false },
};

export default function InteractiveMapPage() {
  return <EnhancedRegionMap />;
}
