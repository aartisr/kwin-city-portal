import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Industry Sectors';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Sectors',
    title: 'Industry\nSectors',
    subtitle: 'Semiconductors, aerospace, health-tech, ICT and renewables in one strategic cluster.',
  });
}
