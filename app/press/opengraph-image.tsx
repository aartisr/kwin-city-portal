import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Press and Media Kit';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Press',
    title: 'Media Kit\nCitation Ready',
    subtitle: 'Attribution guidance, source routes, and editorial assets for responsible coverage.',
  });
}