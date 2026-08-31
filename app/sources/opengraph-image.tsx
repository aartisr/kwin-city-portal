import { ROUTE_OG_SIZE, createRouteOgImage } from '@/lib/og/createRouteOgImage';

export const alt = 'KWIN City Sources and Claim Ledger';
export const size = ROUTE_OG_SIZE;
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return createRouteOgImage({
    eyebrow: 'KWIN City Sources',
    title: 'Sources and\nClaim Ledger',
    subtitle: 'Primary institutional records and claim-to-source mappings for transparent verification.',
  });
}
