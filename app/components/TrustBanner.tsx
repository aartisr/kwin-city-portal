'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type TrustBannerProps = {
  visible: boolean;
  forceVisible?: boolean;
  protocolLabel: string;
  bodyText: string;
  trustLabel: string;
  sourcesLabel: string;
  newsIntelligenceLabel: string;
  statusText?: string;
  degraded?: boolean;
  contentAgeDays?: number;
  factualAuditAgeDays?: number;
  executionStatusAgeDays?: number;
};

function classifyAge(ageDays: number, warningThreshold: number) {
  if (ageDays <= Math.max(1, Math.floor(warningThreshold / 3))) {
    return {
      label: 'Live',
      tone: 'text-emerald-700 border-emerald-200 bg-emerald-50',
    };
  }

  if (ageDays <= warningThreshold) {
    return {
      label: 'Watching',
      tone: 'text-amber-700 border-amber-200 bg-amber-50',
    };
  }

  return {
    label: 'Action needed',
    tone: 'text-rose-700 border-rose-200 bg-rose-50',
  };
}

export default function TrustBanner({
  visible,
  forceVisible = false,
  protocolLabel,
  bodyText,
  trustLabel,
  sourcesLabel,
  newsIntelligenceLabel,
  statusText,
  degraded = false,
  contentAgeDays = 0,
  factualAuditAgeDays = 0,
  executionStatusAgeDays = 0,
}: TrustBannerProps) {
  const [isScrollHidden, setIsScrollHidden] = useState(false);
  const bannerRef = useRef<HTMLElement>(null);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastY.current;

      if (currentY < 120) {
        setIsScrollHidden(false);
      } else if (delta > 6) {
        setIsScrollHidden(true);
      } else if (delta < -6) {
        setIsScrollHidden(false);
      }

      lastY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const updateBannerHeight = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        if ((!visible && !forceVisible) || isScrollHidden) {
          document.documentElement.style.setProperty('--kwin-trust-banner-height', '0px');
          return;
        }

        const height = Math.ceil(bannerRef.current?.getBoundingClientRect().height ?? 0);
        document.documentElement.style.setProperty('--kwin-trust-banner-height', `${height}px`);
      });
    };

    updateBannerHeight();

    const observer = 'ResizeObserver' in window ? new ResizeObserver(updateBannerHeight) : null;
    if (observer && bannerRef.current) observer.observe(bannerRef.current);
    window.addEventListener('resize', updateBannerHeight);

    return () => {
      window.cancelAnimationFrame(frameId);
      observer?.disconnect();
      window.removeEventListener('resize', updateBannerHeight);
      document.documentElement.style.setProperty('--kwin-trust-banner-height', '0px');
    };
  }, [visible, forceVisible, isScrollHidden]);

  const isVisible = (visible || forceVisible) && !isScrollHidden;
  const freshest = Math.max(contentAgeDays, factualAuditAgeDays, executionStatusAgeDays);
  const freshnessScore = Math.max(0, Math.min(100, 100 - freshest * 3));
  const contentState = classifyAge(contentAgeDays, 3);
  const factualState = classifyAge(factualAuditAgeDays, 14);
  const executionState = classifyAge(executionStatusAgeDays, 14);

  return (
    <>
      <div
        className="transition-all duration-300"
        style={{ height: isVisible ? 'var(--kwin-trust-banner-height)' : '0px' }}
        aria-hidden="true"
      />

      <section
        ref={bannerRef}
        data-testid="trust-banner"
        role="region"
        aria-label="Trust banner"
        className={`fixed left-0 right-0 top-[var(--kwin-header-height)] z-40 border-b shadow-[0_10px_24px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 ${
          degraded
            ? 'border-amber-200 bg-[linear-gradient(90deg,rgba(255,251,235,0.96)_0%,rgba(254,242,242,0.96)_100%)]'
            : 'border-cyan-100 bg-[linear-gradient(90deg,rgba(236,254,255,0.96)_0%,rgba(248,250,252,0.96)_45%,rgba(255,251,235,0.96)_100%)]'
        } ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="container py-2.5 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="text-xs md:text-sm text-slate-700 leading-6">
            <div className="flex flex-wrap items-center gap-2">
              <p>
                <span className="font-bold text-slate-900">{protocolLabel}</span>{' '}
                {bodyText}
              </p>
              <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.13em] ${
                degraded
                  ? 'border-amber-300 bg-amber-100 text-amber-900'
                  : 'border-emerald-300 bg-emerald-100 text-emerald-900'
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${degraded ? 'bg-amber-600' : 'bg-emerald-600 motion-safe:animate-pulse'}`} aria-hidden="true" />
                {degraded ? 'Freshness degraded' : 'Freshness healthy'}
              </span>
            </div>

            {statusText ? (
              <p className={`mt-1 font-medium ${degraded ? 'text-amber-800' : 'text-slate-600'}`}>
                {statusText}
              </p>
            ) : null}

            <div className="mt-2 grid gap-2 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200/80 bg-white/80 px-2 py-1.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Content</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{contentAgeDays}d</p>
                  <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${contentState.tone}`}>
                    {contentState.label}
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white/80 px-2 py-1.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Audit</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{factualAuditAgeDays}d</p>
                  <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${factualState.tone}`}>
                    {factualState.label}
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-slate-200/80 bg-white/80 px-2 py-1.5">
                <p className="text-[10px] uppercase tracking-[0.15em] text-slate-500">Execution</p>
                <div className="mt-1 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">{executionStatusAgeDays}d</p>
                  <span className={`rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${executionState.tone}`}>
                    {executionState.label}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500">Freshness score</span>
              <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full ${degraded ? 'bg-amber-500' : 'bg-emerald-500'}`}
                  style={{ width: `${freshnessScore}%` }}
                  aria-hidden="true"
                />
              </div>
              <span className={`text-xs font-bold ${degraded ? 'text-amber-800' : 'text-emerald-800'}`}>{freshnessScore}%</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold lg:justify-end">
            <Link href="/trust" className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">
              {trustLabel}
            </Link>
            <Link href="/sources" className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-slate-700 hover:bg-slate-50">
              {sourcesLabel}
            </Link>
            <Link href="/news-intelligence" className="rounded-md bg-slate-900 px-2.5 py-1.5 text-white hover:bg-slate-800">
              {newsIntelligenceLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
