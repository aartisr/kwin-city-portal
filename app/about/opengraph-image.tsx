import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'About KWIN City';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'About KWIN City',
    title: 'Knowledge\nWellbeing Innovation',
    subtitle: 'A proposed North Bengaluru township shaped around people, research, and future-ready industry.',
  });
}
