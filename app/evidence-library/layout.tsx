import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Evidence Library | KWIN City',
  description:
    'Use the KWIN City evidence library to filter source records, inspect verification tiers, and trace project claims to documents before opening the public Evidence Vault.',
  alternates: { canonical: 'https://kwin-city.com/evidence' },
  robots: { index: false, follow: true },
};

export default function EvidenceLibraryLayout({ children }: { children: ReactNode }) {
  return children;
}
