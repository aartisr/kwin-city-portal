import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'You Are Offline | KWIN City',
  description: 'No internet connection. Your cached KWIN City pages are still available.',
  robots: { index: false },
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[linear-gradient(150deg,#040714_0%,#0D1640_50%,#07131F_100%)] text-white">
      {/* Top ambient glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[120px] bg-amber-500/10 pointer-events-none"
      />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* KWIN Logo */}
        <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center font-extrabold text-3xl text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] shadow-2xl shadow-amber-500/30 mb-8">
          K
        </div>

        <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-amber-400 mb-3">
          No Connection
        </p>

        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
          You&apos;re offline right now
        </h1>

        <p className="text-[#7C8EA6] leading-7 text-base mb-8">
          The KWIN City portal needs an internet connection to load fresh data.
          Pages you&apos;ve visited recently are still available below.
        </p>

        {/* Cached pages quick links */}
        <div className="grid grid-cols-2 gap-2.5 mb-8 text-sm">
          {[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About KWIN' },
            { href: '/why-north-bengaluru', label: 'Why North Bengaluru' },
            { href: '/sectors', label: 'Sectors' },
            { href: '/timeline', label: 'Timeline' },
            { href: '/data-insights', label: 'Data Insights' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2.5 rounded-xl border border-white/10 bg-white/[0.05] text-[#94A3B8] hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all font-medium"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)] hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      </div>
    </div>
  );
}
