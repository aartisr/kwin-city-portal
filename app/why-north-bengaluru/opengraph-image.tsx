import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'Why North Bengaluru for KWIN City';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'Why North Bengaluru',
    title: 'Airport City\nSTRR Corridor',
    subtitle: 'Strategic location advantages backed by aviation, infrastructure, and growth corridor data.',
  });
}
