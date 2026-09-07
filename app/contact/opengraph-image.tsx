import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'Contact KWIN City';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'Contact KWIN City',
    title: 'Let us\nConnect',
    subtitle: 'Reach the KWIN City team for investor, resident, research, and media queries.',
  });
}
