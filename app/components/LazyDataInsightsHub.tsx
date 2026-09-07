'use client';

import dynamic from 'next/dynamic';

const DataInsightsHub = dynamic(() => import('@/components/DataInsightsHub'), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 min-h-[420px] animate-pulse"
        >
          <div className="h-4 w-32 rounded bg-white/10 mb-4" />
          <div className="h-8 w-3/4 rounded bg-white/10 mb-3" />
          <div className="h-3 w-full rounded bg-white/10 mb-2" />
          <div className="h-3 w-5/6 rounded bg-white/10 mb-8" />
          <div className="h-[260px] rounded-2xl bg-[#07131F]" />
        </div>
      ))}
    </div>
  ),
});

export default function LazyDataInsightsHub() {
  return <DataInsightsHub />;
}
