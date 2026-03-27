/**
 * KWIN City — Full Search Results Page
 * /search?q=...
 */
import { Suspense } from 'react';
import type { Metadata } from 'next';
import SearchPageClient from './SearchPageClient';

export const metadata: Metadata = {
  title: 'Search KWIN City | Find Anything',
  description:
    'Search across all KWIN City content — pages, sectors, timeline phases, FAQ answers, documents, and updates.',
  alternates: { canonical: 'https://kwin-city.com/search' },
  robots: { index: false },
};

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageClient />
    </Suspense>
  );
}
