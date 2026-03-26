'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function TrustBanner() {
  const [isHidden, setIsHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (currentY < 120) {
        setIsHidden(false);
      } else if (delta > 6) {
        setIsHidden(true);
      } else if (delta < -6) {
        setIsHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div
        className={`transition-all duration-300 ${isHidden ? 'h-0' : 'h-[88px] md:h-[52px]'}`}
        aria-hidden="true"
      />

      <section
        className={`fixed left-0 right-0 top-[70px] z-40 border-b border-cyan-100 shadow-[0_10px_24px_rgba(15,23,42,0.08)] bg-[linear-gradient(90deg,rgba(236,254,255,0.96)_0%,rgba(248,250,252,0.96)_45%,rgba(255,251,235,0.96)_100%)] backdrop-blur-xl transition-all duration-300 ${
          isHidden ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="container py-2.5 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <p className="text-xs md:text-sm text-slate-700 leading-6">
            <span className="font-bold text-slate-900">Trust Protocol:</span> every major claim must be source-linked,
            status-labeled, and reviewable for what it can and cannot prove.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold">
            <Link href="/trust" className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">
              Trust Center
            </Link>
            <Link href="/sources" className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">
              Source Ledger
            </Link>
            <Link href="/news-intelligence" className="rounded-md bg-slate-900 px-2.5 py-1.5 text-white hover:bg-slate-800">
              News Intelligence
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
