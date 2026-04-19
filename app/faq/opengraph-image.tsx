import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City FAQ';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City FAQ',
    title: 'Frequently Asked\nQuestions',
    subtitle: 'Clear answers on project scope, timeline, sustainability, and evidence methodology.',
  });
}
