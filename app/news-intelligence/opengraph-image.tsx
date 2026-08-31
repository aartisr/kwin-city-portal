import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City News Intelligence';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City News Intelligence',
    title: 'News\nIntelligence',
    subtitle: 'Curated coverage and contextual reading of KWIN-related developments.',
  });
}
