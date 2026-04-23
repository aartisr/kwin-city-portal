'use client';

import dynamic from 'next/dynamic';

const NewsletterSignup = dynamic(() => import('@/components/NewsletterSignup'), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 animate-pulse">
      <div className="h-4 w-28 rounded bg-white/10 mb-4" />
      <div className="h-3 w-2/3 rounded bg-white/10 mb-2" />
      <div className="h-3 w-1/2 rounded bg-white/10" />
    </div>
  ),
});

export default function DeferredNewsletterSignup() {
  return <NewsletterSignup variant="footer" />;
}
