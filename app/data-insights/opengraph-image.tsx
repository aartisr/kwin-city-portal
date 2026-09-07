import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Data Insights';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Data Insights',
    title: 'Data\nInsights',
    subtitle: 'Dashboards and trend signals for North Bengaluru growth, sectors, and sustainability.',
  });
}
