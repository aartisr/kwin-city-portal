import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Evidence Library | KWIN City',
  description: 'Interactive evidence filtering utility for the KWIN City portal.',
  alternates: { canonical: 'https://kwin-city.com/evidence' },
  robots: { index: false, follow: true },
};

export default function EvidenceLibraryLayout({ children }: { children: ReactNode }) {
  return children;
}
