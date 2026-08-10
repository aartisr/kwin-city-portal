'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { TOOLS_FAVORITES_STORAGE_KEY, TOOLS_RECENT_STORAGE_KEY } from '@/tools/tools-palette-storage';

type ToolUsageOption = {
  href: string;
  icon: string;
  title: string;
};

export default function ToolsUsageStrip({ options }: { options: ToolUsageOption[] }) {
  const [recent, setRecent] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const readStorage = () => {
      try {
        const savedRecent = window.localStorage.getItem(TOOLS_RECENT_STORAGE_KEY);
        const savedFavorites = window.localStorage.getItem(TOOLS_FAVORITES_STORAGE_KEY);

        const parsedRecent = savedRecent ? JSON.parse(savedRecent) : [];
        const parsedFavorites = savedFavorites ? JSON.parse(savedFavorites) : [];

        setRecent(Array.isArray(parsedRecent) ? parsedRecent.filter((value): value is string => typeof value === 'string') : []);
        setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites.filter((value): value is string => typeof value === 'string') : []);
      } catch {
        setRecent([]);
        setFavorites([]);
      }
    };

    readStorage();
    window.addEventListener('storage', readStorage);
    return () => window.removeEventListener('storage', readStorage);
  }, []);

  const byHref = useMemo(() => new Map(options.map((option) => [option.href, option])), [options]);

  const favoriteOptions = useMemo(
    () => favorites.map((href) => byHref.get(href)).filter((option): option is ToolUsageOption => Boolean(option)).slice(0, 4),
    [byHref, favorites],
  );

  const recentOptions = useMemo(
    () =>
      recent
        .map((href) => byHref.get(href))
        .filter((option): option is ToolUsageOption => Boolean(option))
        .filter((option) => !favorites.includes(option.href))
        .slice(0, 4),
    [byHref, favorites, recent],
  );

  if (favoriteOptions.length === 0 && recentOptions.length === 0) {
    return null;
  }

  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3 md:grid-cols-2">
        <section>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#6F3F00]">Pinned</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {favoriteOptions.length > 0 ? (
              favoriteOptions.map((tool) => (
                <Link key={`pin-${tool.href}`} href={tool.href} className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-[#6F3F00]">
                  <span aria-hidden="true">{tool.icon}</span>
                  <span>{tool.title}</span>
                </Link>
              ))
            ) : (
              <p className="text-xs text-slate-500">Pin tools from the navigator star icon.</p>
            )}
          </div>
        </section>

        <section>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-700">Recent</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {recentOptions.length > 0 ? (
              recentOptions.map((tool) => (
                <Link key={`recent-${tool.href}`} href={tool.href} className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                  <span aria-hidden="true">{tool.icon}</span>
                  <span>{tool.title}</span>
                </Link>
              ))
            ) : (
              <p className="text-xs text-slate-500">Open tools from the navigator to build your recent list.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}