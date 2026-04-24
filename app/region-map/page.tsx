import EnhancedRegionMap from '@/components/EnhancedRegionMap';

export const metadata = {
  title: 'Interactive Map',
  description: 'Explore KWIN City geography, infrastructure, and zones with interactive layers',
  alternates: { canonical: 'https://kwin-city.com/why-north-bengaluru' },
  robots: { index: false },
};

export default function InteractiveMapPage() {
  return <EnhancedRegionMap />;
}
