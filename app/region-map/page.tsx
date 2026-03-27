import EnhancedRegionMap from '@/components/EnhancedRegionMap';

export const metadata = {
  title: 'Interactive Map | KWIN City',
  description: 'Explore KWIN City geography, infrastructure, and zones with interactive layers',
  robots: { index: false },
};

export default function InteractiveMapPage() {
  return <EnhancedRegionMap />;
}
