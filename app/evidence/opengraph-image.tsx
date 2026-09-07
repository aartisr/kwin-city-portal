import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Evidence Library';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Evidence',
    title: 'Evidence\nLibrary',
    subtitle: 'Traceable claims, source proofs, and verification status for project intelligence.',
  });
}
