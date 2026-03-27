import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import DownloadsPage from '@/components/DownloadsPage';

export const metadata: Metadata = {
  title: 'Document Downloads | KWIN City Resource Library',
  description:
    'Official reports, policy briefs, open datasets, and project documents for KWIN City — all sourced, verified, and downloadable.',
  keywords: [
    'KWIN City documents',
    'KIADB reports',
    'KWIN downloads',
    'Karnataka industrial policy',
    'North Bengaluru data',
  ],
  alternates: { canonical: 'https://kwin-city.com/downloads' },
  openGraph: {
    title: 'KWIN City Document Library — Reports, Policy & Open Data',
    description:
      'Transparent, tiered document library covering everything from official KIADB notifications to open datasets.',
    url: 'https://kwin-city.com/downloads',
    type: 'website',
  },
};

export default function DownloadsRoute() {
  return (
    <SiteFrame>
      <DownloadsPage />
    </SiteFrame>
  );
}
