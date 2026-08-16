'use client';

import Link from 'next/link';
import { useId, useMemo, useState } from 'react';
import { NAV_TONES } from '@/components/header/navigation';
import {
  filterToolIntentSections,
  getToolQuickActions,
} from '@/components/header/tools-intents';
import type { NavItem } from '@/components/header/types';

type ToolFinderProps = {
  items: NavItem[];
  isActive: (href: string) => boolean;
  onNavigate: () => void;
  compact?: boolean;
};

export default function ToolFinder({ items, isActive, onNavigate, compact = false }: ToolFinderProps) {
  const [query, setQuery] = useState('');
  const inputId = useId();
  const sections = useMemo(() => filterToolIntentSections(items, query), [items, query]);
  const quickActions = useMemo(() => getToolQuickActions(items), [items]);
  const resultCount = sections.reduce((count, section) => count + section.items.length, 0);

  return (
    <div data-testid="tool-finder" className="flex min-h-0 flex-col">
      <div className={`${compact ? 'pb-2' : 'sticky top-0 z-10 bg-white pb-3'}`}>
        <div className="relative">
          <label htmlFor={inputId} className="sr-only">Find a KWIN tool</label>
          <span aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">⌕</span>
          <input
            id={inputId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a tool by task…"
            autoComplete="off"
            className="h-11 w-full rounded-2xl border border-slate-300 bg-slate-50 pl-9 pr-20 text-sm font-medium text-slate-950 outline-none transition focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-100"
          />
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500" aria-live="polite">
            {resultCount} {resultCount === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        {!query ? (
          <div className={`mt-2 grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`} aria-label="Recommended tools">
            {quickActions.map((action) => (
              <Link
                key={action.key}
                href={action.href}
                onClick={onNavigate}
                className="flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-900 transition hover:border-amber-300 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
              >
                <span aria-hidden="true">{action.icon}</span>
                <span className="truncate">{action.title}</span>
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      <div className={`${compact ? '' : 'min-h-0 overflow-y-auto overscroll-contain pr-1'} space-y-2`}>
        {sections.length ? sections.map((section) => (
          <section key={section.key} aria-labelledby={`${inputId}-${section.key}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-baseline justify-between gap-3">
              <h4 id={`${inputId}-${section.key}`} className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#6F3F00]">{section.title}</h4>
              <span className="text-[10px] font-semibold text-slate-500">{section.items.length}</span>
            </div>
            {!compact ? <p className="mt-1 text-[0.72rem] leading-5 text-slate-700">{section.summary}</p> : null}
            <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={`group flex min-h-14 items-start gap-2.5 rounded-xl border px-3 py-2.5 transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    isActive(item.href)
                      ? 'border-amber-200 bg-amber-50 shadow-sm'
                      : 'border-transparent bg-white hover:border-slate-200 hover:shadow-sm'
                  }`}
                >
                  <span aria-hidden="true" className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-50 text-sm">{item.icon ?? '→'}</span>
                  <span className="min-w-0">
                    <span className={`block text-[0.84rem] font-bold leading-5 ${isActive(item.href) ? NAV_TONES.dropdownActive : NAV_TONES.dropdownIdle}`}>{item.label}</span>
                    {item.desc ? <span className="mt-0.5 line-clamp-1 block text-[0.68rem] leading-4 text-slate-600">{item.desc}</span> : null}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-7 text-center" role="status">
            <p className="text-sm font-bold text-slate-900">No matching tool</p>
            <p className="mt-1 text-xs text-slate-600">Try “risk”, “map”, “policy”, or “investment”.</p>
            <button type="button" onClick={() => setQuery('')} className="mt-3 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-900">Clear search</button>
          </div>
        )}
      </div>

      {!compact ? (
        <div className="sticky bottom-0 z-10 mt-2 border-t border-slate-200 bg-white pt-2">
          <Link href="/tools" onClick={onNavigate} className="flex min-h-11 items-center justify-between rounded-xl bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
            <span>View all tools in Command Center</span><span aria-hidden="true">→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
