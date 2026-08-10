'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TOOLS_FAVORITES_STORAGE_KEY, TOOLS_RECENT_STORAGE_KEY } from '@/tools/tools-palette-storage';

type ToolOption = {
  href: string;
  icon: string;
  title: string;
  summary: string;
  lane: string;
};

function normalize(value: string) {
  return value.toLowerCase().trim();
}

function levenshteinDistance(a: string, b: string) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const matrix = Array.from({ length: a.length + 1 }, () => Array<number>(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      );
    }
  }

  return matrix[a.length][b.length];
}

function getRank(option: ToolOption, query: string) {
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(option.title);
  const lane = normalize(option.lane);
  const summary = normalize(option.summary);

  if (title === q) return 1;
  if (title.startsWith(q)) return 2;
  if (title.includes(q)) return 3;
  if (lane.includes(q)) return 4;
  if (summary.includes(q)) return 5;
  return 99;
}

export default function ToolsPowerPalette({ options }: { options: ToolOption[] }) {
  const MAX_RECENT = 6;

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const savedRecent = window.localStorage.getItem(TOOLS_RECENT_STORAGE_KEY);
      const savedFavorites = window.localStorage.getItem(TOOLS_FAVORITES_STORAGE_KEY);

      if (savedRecent) {
        const parsedRecent = JSON.parse(savedRecent);
        if (Array.isArray(parsedRecent)) {
          setRecent(parsedRecent.filter((value): value is string => typeof value === 'string'));
        }
      }

      if (savedFavorites) {
        const parsedFavorites = JSON.parse(savedFavorites);
        if (Array.isArray(parsedFavorites)) {
          setFavorites(parsedFavorites.filter((value): value is string => typeof value === 'string'));
        }
      }
    } catch {
      setRecent([]);
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(TOOLS_RECENT_STORAGE_KEY, JSON.stringify(recent));
    } catch {
      // ignore storage write failures
    }
  }, [recent]);

  useEffect(() => {
    try {
      window.localStorage.setItem(TOOLS_FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // ignore storage write failures
    }
  }, [favorites]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT' || target.isContentEditable);

      const key = event.key.toLowerCase();
      const openWithShiftT = key === 't' && event.shiftKey && !event.metaKey && !event.ctrlKey && !event.altKey;
      const openWithCommandK = key === 'k' && (event.metaKey || event.ctrlKey);

      if (!isTypingTarget && (openWithShiftT || openWithCommandK)) {
        event.preventDefault();
        setOpen(true);
      }

      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const filtered = useMemo(() => {
    const ranked = options
      .map((option) => ({ option, rank: getRank(option, query) }))
      .filter((entry) => entry.rank < 99)
      .sort((a, b) => a.rank - b.rank || a.option.title.localeCompare(b.option.title));

    return ranked.map((entry) => entry.option);
  }, [options, query]);

  const optionsByHref = useMemo(() => new Map(options.map((option) => [option.href, option])), [options]);

  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const recentOptions = useMemo(
    () => recent.map((href) => optionsByHref.get(href)).filter((tool): tool is ToolOption => Boolean(tool)),
    [recent, optionsByHref],
  );

  const favoriteOptions = useMemo(
    () => favorites.map((href) => optionsByHref.get(href)).filter((tool): tool is ToolOption => Boolean(tool)),
    [favorites, optionsByHref],
  );

  const suggestedTools = useMemo(() => {
    const q = normalize(query);
    if (!q || filtered.length > 0) return [];

    return options
      .map((option) => {
        const distanceToTitle = levenshteinDistance(q, normalize(option.title));
        const distanceToLane = levenshteinDistance(q, normalize(option.lane));
        const distance = Math.min(distanceToTitle, distanceToLane);
        return { option, distance };
      })
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .map((entry) => entry.option);
  }, [filtered.length, options, query]);

  const visibleTools = useMemo(() => {
    if (query) return filtered;

    const seen = new Set<string>();
    const merged = [...favoriteOptions, ...recentOptions, ...options].filter((tool) => {
      if (seen.has(tool.href)) return false;
      seen.add(tool.href);
      return true;
    });

    return merged;
  }, [favoriteOptions, filtered, options, query, recentOptions]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    if (activeIndex >= filtered.length) {
      setActiveIndex(Math.max(visibleTools.length - 1, 0));
    }
  }, [activeIndex, filtered.length, visibleTools.length]);

  useEffect(() => {
    if (!open) return;
    if (activeIndex >= visibleTools.length) {
      setActiveIndex(Math.max(visibleTools.length - 1, 0));
    }
  }, [activeIndex, open, visibleTools.length]);

  const onSubmit = (href: string) => {
    setRecent((current) => {
      const deduped = current.filter((entry) => entry !== href);
      return [href, ...deduped].slice(0, MAX_RECENT);
    });
    setOpen(false);
    setQuery('');
    router.push(href);
  };

  const onToggleFavorite = (href: string) => {
    setFavorites((current) => {
      if (current.includes(href)) {
        return current.filter((entry) => entry !== href);
      }
      return [href, ...current];
    });
  };

  return (
    <>
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-5 right-5 z-[340] inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-[#6F3F00] shadow-[0_10px_24px_rgba(15,23,42,0.12)] hover:bg-amber-100"
        >
          <span aria-hidden="true">⚡</span>
          <span>Tools Navigator</span>
        </button>
      ) : null}

      {open ? (
        <div className="fixed inset-0 z-[450] bg-slate-950/45 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Tools command palette"
            className="mx-auto mt-[10vh] w-[min(760px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_36px_90px_rgba(2,6,23,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#6F3F00]">Tools Navigator</p>
                <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-600">Esc to close</span>
              </div>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    setActiveIndex((prev) => Math.min(prev + 1, visibleTools.length - 1));
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                  }
                  if (event.key === 'Enter' && visibleTools[activeIndex]) {
                    event.preventDefault();
                    onSubmit(visibleTools[activeIndex].href);
                  }
                }}
                placeholder="Search tool, lane, or outcome"
                className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none"
              />
              {!query && (favoriteOptions.length > 0 || recentOptions.length > 0) ? (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {favoriteOptions.slice(0, 3).map((tool) => (
                    <button
                      key={`fav-chip-${tool.href}`}
                      type="button"
                      onClick={() => onSubmit(tool.href)}
                      className="rounded-full border border-amber-200 bg-amber-50 px-2 py-1 text-[11px] font-semibold text-[#6F3F00]"
                    >
                      ★ {tool.title}
                    </button>
                  ))}
                  {recentOptions.slice(0, 2).map((tool) => (
                    <button
                      key={`recent-chip-${tool.href}`}
                      type="button"
                      onClick={() => onSubmit(tool.href)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] font-semibold text-slate-700"
                    >
                      Recent: {tool.title}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="max-h-[54vh] overflow-y-auto p-2">
              {visibleTools.length === 0 ? (
                <div className="space-y-2">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-sm text-slate-700">No tools matched this query.</div>
                  {suggestedTools.length > 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50/70 px-3 py-3">
                      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#6F3F00]">Did you mean</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {suggestedTools.map((tool) => (
                          <button
                            key={`suggested-${tool.href}`}
                            type="button"
                            onClick={() => onSubmit(tool.href)}
                            className="rounded-full border border-amber-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-800"
                          >
                            {tool.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="space-y-1">
                  {visibleTools.map((tool, index) => {
                    const active = index === activeIndex;
                    return (
                      <div
                        key={tool.href}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition-all ${
                          active ? 'border-amber-200 bg-amber-50' : 'border-transparent bg-white hover:border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <button type="button" onClick={() => onSubmit(tool.href)} className="flex min-w-0 flex-1 items-start gap-3 text-left">
                          <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-lg shadow-[0_8px_16px_rgba(15,23,42,0.07)]">
                            {tool.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{tool.title}</span>
                              <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-600">
                                {tool.lane}
                              </span>
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-slate-700">{tool.summary}</span>
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(tool.href)}
                          aria-label={favoriteSet.has(tool.href) ? `Unpin ${tool.title}` : `Pin ${tool.title}`}
                          className={`mt-1 rounded-full border px-2 py-1 text-xs font-bold ${
                            favoriteSet.has(tool.href)
                              ? 'border-amber-200 bg-amber-50 text-[#6F3F00]'
                              : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          {favoriteSet.has(tool.href) ? '★' : '☆'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}