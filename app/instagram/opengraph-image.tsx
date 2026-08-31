import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Instagram Hub';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Social',
    title: 'Visual Brief\nSource Trail',
    subtitle: 'A mobile-first path from Instagram curiosity to KWIN City data, sectors, sources, and updates.',
  });
}

