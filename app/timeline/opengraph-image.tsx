import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Development Timeline 2024 to 2030';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Timeline',
    title: 'Development\nTimeline',
    subtitle: 'Five-phase roadmap from 2024 inauguration to full ecosystem operations by 2030.',
  });
}
