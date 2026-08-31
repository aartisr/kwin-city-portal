import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Sustainability and Net-Zero Plan';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Sustainability',
    title: 'Net-Zero\nSustainability',
    subtitle: 'Solar self-sufficiency, 40% green cover, water resilience, and near-zero waste systems.',
  });
}
