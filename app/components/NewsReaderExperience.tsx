'use client';

import { useEffect, useMemo, useState } from 'react';

type ReaderItem = {
  title: string;
  link: string;
  summary: string;
  source: string;
  sourceFeedUrl: string;
  publishedAt: string | null;
};

type ReaderResponse = {
  opmlUrl: string;
  feedCount: number;
  itemCount: number;
  generatedAt: string;
  items: ReaderItem[];
  cache?: {
    hit: boolean;
    ttlMs: number;
  };
};

type ReaderPreset = {
  id: string;
  name: string;
  opmlUrl: string;
  limit: number;
};

const PRESET_STORAGE_KEY = 'kwin-news-reader-presets-v1';

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'unknown-source';
  }
}

function isInTimeWindow(value: string | null, window: 'all' | '24h' | '7d' | '30d'): boolean {
  if (window === 'all') {
    return true;
  }
  if (!value) {
    return false;
  }
  const published = new Date(value).getTime();
  if (Number.isNaN(published)) {
    return false;
  }
  const now = Date.now();
  const diff = now - published;
  if (window === '24h') {
    return diff <= 24 * 60 * 60 * 1000;
  }
  if (window === '7d') {
    return diff <= 7 * 24 * 60 * 60 * 1000;
  }
  return diff <= 30 * 24 * 60 * 60 * 1000;
}

function formatDate(value: string | null): string {
  if (!value) {
    return 'Date unavailable';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return 'Date unavailable';
  }
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function NewsReaderExperience() {
  const [opmlUrl, setOpmlUrl] = useState('/feeds/kwin-city-news-feeds.opml');
  const [limit, setLimit] = useState(36);
  const [topicQuery, setTopicQuery] = useState('kwin');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [timeWindow, setTimeWindow] = useState<'all' | '24h' | '7d' | '30d'>('all');
  const [presetName, setPresetName] = useState('');
  const [presets, setPresets] = useState<ReaderPreset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReaderResponse | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRESET_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as ReaderPreset[];
      if (Array.isArray(parsed)) {
        setPresets(parsed);
      }
    } catch {
      // Ignore invalid storage payloads
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
    } catch {
      // Ignore storage write failures
    }
  }, [presets]);

  const sourceOptions = useMemo(() => {
    const sources = new Set<string>();
    for (const item of data?.items ?? []) {
      sources.add(item.source);
    }
    return ['all', ...Array.from(sources).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  const domainOptions = useMemo(() => {
    const domains = new Set<string>();
    for (const item of data?.items ?? []) {
      domains.add(getDomain(item.link));
    }
    return ['all', ...Array.from(domains).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  const filteredItems = useMemo(() => {
    const items = data?.items ?? [];
    const normalizedTopic = topicQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (normalizedTopic) {
        const haystack = `${item.title} ${item.summary} ${item.source}`.toLowerCase();
        if (!haystack.includes(normalizedTopic)) {
          return false;
        }
      }
      if (sourceFilter !== 'all' && item.source !== sourceFilter) {
        return false;
      }
      if (domainFilter !== 'all' && getDomain(item.link) !== domainFilter) {
        return false;
      }
      if (!isInTimeWindow(item.publishedAt, timeWindow)) {
        return false;
      }
      return true;
    });
  }, [data, topicQuery, sourceFilter, domainFilter, timeWindow]);

  const trendingItems = useMemo(() => {
    const selected: ReaderItem[] = [];
    const usedSources = new Set<string>();

    for (const item of filteredItems) {
      if (!usedSources.has(item.source)) {
        selected.push(item);
        usedSources.add(item.source);
      }
      if (selected.length >= 6) {
        break;
      }
    }

    if (selected.length < 6) {
      for (const item of filteredItems) {
        if (!selected.includes(item)) {
          selected.push(item);
        }
        if (selected.length >= 6) {
          break;
        }
      }
    }

    return selected;
  }, [filteredItems]);

  const stats = useMemo(() => {
    if (!data) {
      return null;
    }
    return [
      { label: 'Feeds Loaded', value: `${data.feedCount}` },
      { label: 'Stories Visible', value: `${filteredItems.length}` },
      { label: 'Stories Total', value: `${data.itemCount}` },
      { label: 'Refreshed', value: formatDate(data.generatedAt) },
    ];
  }, [data, filteredItems.length]);

  const loadReader = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        opmlUrl,
        limit: String(limit),
      });
      const response = await fetch(`/api/news-reader?${params.toString()}`, { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Reader failed to load.');
      }
      setData(payload as ReaderResponse);
      setSourceFilter('all');
      setDomainFilter('all');
      setTimeWindow('all');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Reader failed to load.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const savePreset = () => {
    const trimmed = presetName.trim();
    if (!trimmed) {
      return;
    }
    const preset: ReaderPreset = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmed,
      opmlUrl,
      limit,
    };
    setPresets((curr) => [preset, ...curr].slice(0, 12));
    setPresetName('');
  };

  const applyPreset = (preset: ReaderPreset) => {
    setOpmlUrl(preset.opmlUrl);
    setLimit(preset.limit);
  };

  const deletePreset = (id: string) => {
    setPresets((curr) => curr.filter((p) => p.id !== id));
  };

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f5f7fb_100%)]">
      <section className="pt-28 pb-12 border-b border-slate-200">
        <div className="container">
          <div className="rounded-3xl border border-slate-200 bg-[radial-gradient(1200px_520px_at_0%_0%,rgba(14,165,233,0.14),transparent_60%),radial-gradient(900px_420px_at_100%_12%,rgba(245,158,11,0.16),transparent_60%),linear-gradient(180deg,#ffffff,#f8fafc)] p-8 md:p-12 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-700 mb-4">On-Demand Reader</p>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight max-w-5xl">
              OPML News Reader
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
              Enter any OPML URL, load it instantly, and read a concise summary-first stream.
              Every story links directly to the original publication.
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">OPML URL</span>
                  <input
                    value={opmlUrl}
                    onChange={(e) => setOpmlUrl(e.target.value)}
                    className="h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200"
                    placeholder="https://example.com/my-feeds.opml"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Stories</span>
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                    <option value={72}>72</option>
                  </select>
                </label>
                <button
                  onClick={loadReader}
                  disabled={isLoading}
                  className="h-11 self-end rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                >
                  {isLoading ? 'Loading...' : 'Load Reader'}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-cyan-800">
                  Default topic: KWIN
                </span>
                <button
                  onClick={() => setOpmlUrl('/feeds/kwin-city-news-feeds.opml')}
                  className="rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  Use KWIN Default OPML
                </button>
                <button
                  onClick={() => setTopicQuery('')}
                  className="rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  Show All Topics
                </button>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-2">
                  <input
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700"
                    placeholder="Preset name"
                  />
                  <button
                    onClick={savePreset}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                  >
                    Save Preset
                  </button>
                </div>
                <span>Summary-only cards, linked to original source.</span>
              </div>

              {presets.length ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {presets.map((preset) => (
                    <div key={preset.id} className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs">
                      <button onClick={() => applyPreset(preset)} className="text-slate-700 hover:text-slate-900">
                        {preset.name}
                      </button>
                      <button onClick={() => deletePreset(preset.id)} className="text-slate-400 hover:text-rose-600" aria-label="Delete preset">
                        x
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {stats ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-slate-500">{s.label}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{s.value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {data?.cache ? (
              <p className="mt-3 text-xs text-slate-500">
                {data.cache.hit ? 'Served from cache for faster loading.' : 'Fresh fetch completed.'}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          {data ? (
            <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Topic Keyword</span>
                  <input
                    value={topicQuery}
                    onChange={(e) => setTopicQuery(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                    placeholder="kwin"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Source</span>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                  >
                    {sourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source === 'all' ? 'All Sources' : source}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Domain</span>
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                  >
                    {domainOptions.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain === 'all' ? 'All Domains' : domain}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Published Within</span>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value as 'all' | '24h' | '7d' | '30d')}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                  >
                    <option value="all">Any time</option>
                    <option value="24h">Last 24 hours</option>
                    <option value="7d">Last 7 days</option>
                    <option value="30d">Last 30 days</option>
                  </select>
                </label>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              {error}
            </div>
          ) : null}

          {!isLoading && trendingItems.length > 0 ? (
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-[0_10px_26px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-sm font-extrabold tracking-[0.12em] uppercase text-slate-900">Trending Now</h2>
                <span className="text-xs text-slate-500">Source-diverse quick scan</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {trendingItems.map((item) => (
                  <a
                    key={`trending-${item.link}`}
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-3 hover:border-cyan-300 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-700">{item.source}</span>
                      <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt)}</span>
                    </div>
                    <p className="text-sm font-bold leading-6 text-slate-900 line-clamp-2 group-hover:text-slate-700">
                      {item.title}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
                  <div className="h-3 w-24 rounded bg-slate-200" />
                  <div className="mt-3 h-5 w-11/12 rounded bg-slate-200" />
                  <div className="mt-2 h-5 w-4/5 rounded bg-slate-200" />
                  <div className="mt-4 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && filteredItems.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {filteredItems.map((item) => (
                <article
                  key={`${item.link}-${item.title}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase text-cyan-800">
                      {item.source}
                    </span>
                    <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt)}</span>
                  </div>

                  <h2 className="text-lg font-extrabold leading-6 text-slate-900 mb-3 line-clamp-3">{item.title}</h2>
                  <p className="text-sm text-slate-700 leading-7 min-h-[126px]">{item.summary}</p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      Read Original Source
                    </a>
                    <a
                      href={item.sourceFeedUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      Feed XML
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {!isLoading && data && filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
              No stories match the current filters. Try changing the topic keyword or widening source/domain/time filters.
            </div>
          ) : null}

          {!isLoading && !error && !data ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
              Load an OPML file to start reading. The reader will display concise summaries and preserve direct links to original publishers.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  );
}
