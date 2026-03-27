'use client';

import { useEffect, useMemo, useState } from 'react';

type PageView = {
  path: string;
  title: string;
  timestamp: string;
  referrer: string;
};

type EngagementMetric = {
  path: string;
  timeOnPage: number;
  scrollDepth: number;
  timestamp: string;
};

const fmtDateTime = (iso: string) => {
  try {
    return new Date(iso).toLocaleString();
  } catch {
    return iso;
  }
};

export default function AnalyticsDashboard() {
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [engagement, setEngagement] = useState<EngagementMetric[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const pv = JSON.parse(localStorage.getItem('pageAnalytics') || '[]') as PageView[];
    const em = JSON.parse(localStorage.getItem('engagementMetrics') || '[]') as EngagementMetric[];

    setPageViews(pv);
    setEngagement(em);
  }, []);

  const summary = useMemo(() => {
    const totalViews = pageViews.length;
    const uniquePaths = new Set(pageViews.map((v) => v.path)).size;

    const avgTime = engagement.length
      ? Math.round(engagement.reduce((sum, m) => sum + m.timeOnPage, 0) / engagement.length)
      : 0;

    const avgScroll = engagement.length
      ? Math.round(engagement.reduce((sum, m) => sum + m.scrollDepth, 0) / engagement.length)
      : 0;

    const pathCounts = pageViews.reduce<Record<string, number>>((acc, v) => {
      acc[v.path] = (acc[v.path] || 0) + 1;
      return acc;
    }, {});

    const topPages = Object.entries(pathCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([path, views]) => ({ path, views }));

    return { totalViews, uniquePaths, avgTime, avgScroll, topPages };
  }, [pageViews, engagement]);

  const clearAnalytics = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('pageAnalytics');
    localStorage.removeItem('engagementMetrics');
    setPageViews([]);
    setEngagement([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-14">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Analytics Dashboard</h1>
          <p className="text-blue-100 max-w-2xl">
            Snapshot of on-device page tracking for Sprint 2 validation and UX tuning.
          </p>
        </div>
      </section>

      <section className="container py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Total Views</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.totalViews}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Unique Pages</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.uniquePaths}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Avg Time On Page</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.avgTime}s</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-2">Avg Scroll Depth</p>
            <p className="text-3xl font-extrabold text-slate-900">{summary.avgScroll}%</p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Top Pages</h2>
            {summary.topPages.length === 0 ? (
              <p className="text-slate-600">No tracked page views yet.</p>
            ) : (
              <div className="space-y-2">
                {summary.topPages.map((row) => (
                  <div key={row.path} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                    <span className="text-sm font-semibold text-slate-800">{row.path}</span>
                    <span className="text-sm text-slate-600">{row.views} views</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-xl font-extrabold text-slate-900 mb-4">Latest Engagement</h2>
            {engagement.length === 0 ? (
              <p className="text-slate-600">No engagement records yet.</p>
            ) : (
              <div className="max-h-72 overflow-auto space-y-2">
                {[...engagement].reverse().slice(0, 10).map((row, i) => (
                  <div key={`${row.timestamp}-${i}`} className="rounded-lg border border-slate-200 px-3 py-2">
                    <p className="text-sm font-bold text-slate-900">{row.path}</p>
                    <p className="text-xs text-slate-600">{fmtDateTime(row.timestamp)}</p>
                    <p className="text-xs text-slate-700 mt-1">
                      {row.timeOnPage}s on page, {row.scrollDepth}% scroll
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-sm text-amber-900">
            Analytics are local to this browser and never sent to a server in this Sprint 2 implementation.
          </p>
          <button
            onClick={clearAnalytics}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors"
          >
            Clear Local Analytics
          </button>
        </div>
      </section>
    </main>
  );
}
