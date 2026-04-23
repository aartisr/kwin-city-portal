'use client';

import dynamic from 'next/dynamic';

const StrategicLocationMap = dynamic(() => import('@/components/StrategicLocationMap'), {
  ssr: false,
  loading: () => (
    <div className="rounded-3xl overflow-hidden border border-slate-200 bg-[linear-gradient(135deg,#F8FAFC_0%,#E2E8F0_100%)] min-h-[560px] flex items-center justify-center p-8">
      <div className="max-w-lg text-center">
        <div className="h-12 w-12 rounded-full bg-slate-300 animate-pulse mx-auto mb-5" />
        <h3 className="text-xl font-bold text-slate-900 mb-3">Loading strategic location map</h3>
        <p className="text-slate-600 leading-relaxed">
          Preparing the interactive connectivity view for airport access, STRR positioning, and KWIN&apos;s regional context.
        </p>
      </div>
    </div>
  ),
});

export default function LazyStrategicLocationMap() {
  return <StrategicLocationMap />;
}
