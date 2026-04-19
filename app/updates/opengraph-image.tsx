import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Updates - Milestones and Announcements';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Updates',
    title: 'Milestones\nand Announcements',
    subtitle: 'Official project updates with verification tiers, timeline links, and transparent sourcing.',
  });
}
