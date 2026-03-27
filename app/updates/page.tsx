import type { Metadata } from 'next';
import SiteFrame from '@/components/SiteFrame';
import UpdatesFeed from '@/components/UpdatesFeed';

export const metadata: Metadata = {
  title: 'KWIN City Updates — Milestones & Announcements',
  description:
    'Official milestones, portal improvements, and project announcements for KWIN City — all tracked with transparent verification tiers.',
  keywords: [
    'KWIN City updates',
    'KWIN milestones',
    'KWIN City news',
    'North Bengaluru development updates',
    'KIADB milestones',
  ],
  alternates: { canonical: 'https://kwin-city.com/updates' },
  openGraph: {
    title: 'KWIN City Updates — Milestones, Data & Portal News',
    description:
      'A transparent changelog tracking every significant KWIN City development and portal improvement.',
    url: 'https://kwin-city.com/updates',
    type: 'website',
  },
};

export default function UpdatesRoute() {
  return (
    <SiteFrame>
      <UpdatesFeed />
    </SiteFrame>
  );
}
