'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { NAV_TONES } from '@/components/header/navigation';
import { useHeaderSession } from '@/components/header/useHeaderSession';
import type { NavGroup } from '@/components/header/types';
import { useLocale } from '@/lib/i18n/locale-context';

const SearchModal = dynamic(() => import('@/components/SearchModal'), {
  ssr: false,
});

type HeaderLabels = {
  search: string;
  account: string;
  signedIn: string;
  trust: string;
  hideTrustBar: string;
  showTrustBar: string;
  toggleMenu: string;
  exploreKwin: string;
  language: string;
};

const GROUP_STORIES: Record<
  string,
  {
    eyebrow: string;
    title: string;
    body: string;
    accent: string;
  }
> = {
  discover: {
    eyebrow: 'Orientation',
    title: 'Start with the story before the detail.',
    body: 'High-traffic headers like Apple and Airbnb make the first decision obvious. This section is the guided entry point into the KWIN vision.',
    accent: 'from-[#F5A623]/20 via-[#F5A623]/8 to-transparent',
  },
  ecosystem: {
    eyebrow: 'Context',
    title: 'Frame the ecosystem, not just the project.',
    body: 'Strong premium headers use fewer top-level choices and sharper grouping. This section collects the economic and sustainability case in one place.',
    accent: 'from-cyan-400/18 via-cyan-300/8 to-transparent',
  },
  research: {
    eyebrow: 'Evidence',
    title: 'Bring the proof layer forward.',
    body: 'Stripe, GitHub, and Notion surface the “serious work” paths clearly. This section keeps the data, sources, and downloads one click away.',
    accent: 'from-emerald-400/18 via-emerald-300/8 to-transparent',
  },
  intelligence: {
    eyebrow: 'Signal',
    title: 'Live context should feel immediate.',
    body: 'The best headers make evolving information feel accessible without overwhelming people. This section concentrates news, trust, and community signals.',
    accent: 'from-violet-400/16 via-fuchsia-300/6 to-transparent',
  },
  audiences: {
    eyebrow: 'Pathways',
    title: 'Different visitors need different entry routes.',
    body: 'Airbnb and LinkedIn both make intent-based routes obvious. This section helps investors, residents, researchers, and journalists self-select quickly.',
    accent: 'from-amber-300/18 via-cyan-300/8 to-transparent',
  },
};

function splitItems(items: NavGroup['items']) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

export default function Header({
  trustBannerVisible,
  onToggleTrustBanner,
  menuGroups,
  labels,
}: {
  trustBannerVisible: boolean;
  onToggleTrustBanner: () => void;
  menuGroups: NavGroup[];
  labels: HeaderLabels;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpenGroup, setDesktopOpenGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const currentUser = useHeaderSession();
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const desktopNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (desktopNavRef.current && !desktopNavRef.current.contains(event.target as Node)) {
        setDesktopOpenGroup(null);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (mobileMenuOpen || searchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = previousOverflow;
    }

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen, searchOpen]);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }

      if (event.key === 'Escape') {
        setDesktopOpenGroup(null);
        setMobileMenuOpen(false);
        setMobileOpenGroup(null);
        setSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => isActive(item.href));

  const activeGroupLabel = (group: NavGroup) =>
    isGroupActive(group)
      ? NAV_TONES.active
      : scrolled
      ? NAV_TONES.idleScrolled
      : NAV_TONES.idleTop;

  const activeDesktopMenu = useMemo(
    () => menuGroups.find((group) => group.key === desktopOpenGroup) ?? null,
    [desktopOpenGroup, menuGroups],
  );

  const desktopStory = activeDesktopMenu ? GROUP_STORIES[activeDesktopMenu.key] ?? GROUP_STORIES.discover : null;
  const desktopColumns = activeDesktopMenu ? splitItems(activeDesktopMenu.items) : [[], []];

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[300]">
        <div className="container py-2.5">
          <div
            className={`relative isolate overflow-visible rounded-[28px] border transition-all duration-500 ${
              scrolled
                ? 'border-slate-200/80 bg-white/92 shadow-[0_18px_60px_rgba(2,6,23,0.12)] backdrop-blur-2xl'
                : trustBannerVisible
                ? 'border-slate-200/70 bg-white/88 shadow-[0_18px_54px_rgba(2,6,23,0.10)] backdrop-blur-2xl'
                : 'border-white/65 bg-white/82 shadow-[0_18px_52px_rgba(2,6,23,0.09)] backdrop-blur-2xl'
            }`}
          >
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent transition-opacity duration-500 ${
                scrolled ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-300/70 to-transparent transition-opacity duration-500 ${
                !trustBannerVisible && !scrolled ? 'opacity-100' : 'opacity-0'
              }`}
            />

            <nav className="grid h-[72px] grid-cols-[minmax(11rem,auto)_auto] items-center gap-3 px-3 md:px-4 min-[1440px]:grid-cols-[minmax(11rem,auto)_minmax(0,1fr)_auto]">
              <Link
                href="/"
                className="group relative z-10 flex min-w-[11rem] flex-shrink-0 items-center gap-3 rounded-2xl px-1.5 py-1.5 transition-transform duration-300 hover:-translate-y-0.5 sm:min-w-[12rem]"
                aria-label="KWIN City home"
              >
                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#F5A623,#E8A020)] text-xl font-extrabold text-[#040714] shadow-[0_14px_34px_rgba(232,160,32,0.32)] transition-transform duration-300 group-hover:scale-[1.03]">
                  <span className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.42),transparent_58%)]" aria-hidden="true" />
                  <span className="relative">K</span>
                </div>
                <div className="flex-none rounded-2xl border border-[#13204A] bg-[linear-gradient(135deg,#061126,#0D1B3D)] px-3.5 py-2.5 leading-none shadow-[0_14px_34px_rgba(2,6,23,0.22)]">
                  <div className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[1.12rem] font-black tracking-[0.01em] text-white">KWIN</span>
                    <span className="text-[0.94rem] font-bold text-[#F5C050]">City</span>
                  </div>
                  <div className="mt-1 hidden flex-col items-start gap-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-300 2xl:flex">
                    <span>Evidence-First Portal</span>
                    <span className="text-slate-400 tracking-[0.16em]">North Bengaluru</span>
                  </div>
                </div>
              </Link>

              <div className="hidden min-w-0 items-center justify-center min-[1440px]:flex">
                <div ref={desktopNavRef} className="relative z-[320] flex min-w-0 max-w-[648px] flex-1 justify-center">
                  <div className="flex items-center gap-1 rounded-full border border-slate-300/90 bg-white/95 px-1 py-1 shadow-[0_12px_28px_rgba(15,23,42,0.06)] backdrop-blur-xl">
                    {menuGroups.map((group) => {
                      const isOpen = desktopOpenGroup === group.key;
                      const menuId = `menu-${group.key}`;

                      return (
                        <button
                          key={group.key}
                          type="button"
                          onMouseEnter={() => setDesktopOpenGroup(group.key)}
                          onFocus={() => setDesktopOpenGroup(group.key)}
                          onClick={() => setDesktopOpenGroup((curr) => (curr === group.key ? null : group.key))}
                          aria-expanded={isOpen}
                          aria-haspopup="true"
                          aria-controls={menuId}
                          className={`group inline-flex h-9 items-center gap-1.5 rounded-full px-3 py-2 text-[0.92rem] whitespace-nowrap transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${activeGroupLabel(group)} ${
                            isOpen ? 'bg-slate-950 text-white shadow-[0_10px_22px_rgba(15,23,42,0.14)] ring-0 hover:text-white' : ''
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                              isOpen ? 'bg-[#F5C050]' : isGroupActive(group) ? 'bg-[#E8A020]' : 'bg-slate-400'
                            }`}
                            aria-hidden="true"
                          />
                          <span>{group.label}</span>
                          <svg
                            className="h-3 w-3 flex-shrink-0 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>

                  {activeDesktopMenu && desktopStory ? (
                    <div
                      id={`menu-${activeDesktopMenu.key}`}
                      role="menu"
                      aria-label={`${activeDesktopMenu.label} menu`}
                      className="absolute left-1/2 top-full z-[360] w-[min(980px,calc(100vw-3rem))] -translate-x-1/2 pt-4 pointer-events-auto"
                    >
                      <div className="overflow-hidden rounded-[24px] border border-slate-300 bg-white shadow-[0_28px_72px_rgba(2,6,23,0.16)] ring-1 ring-slate-200/90">
                        <div className="grid lg:grid-cols-[0.88fr_1.12fr]">
                          <div className={`relative overflow-hidden border-b border-slate-200 lg:border-b-0 lg:border-r ${desktopStory.accent}`}>
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.94))]" aria-hidden="true" />
                            <div className="relative">
                              <div className="px-5 pt-5 pb-4 lg:px-6 lg:pt-6 lg:pb-5">
                              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A96A00]">{desktopStory.eyebrow}</p>
                              <h3 className="mt-2.5 max-w-sm text-[1.5rem] font-extrabold leading-tight tracking-tight text-slate-950">
                                {desktopStory.title}
                              </h3>
                              <p className="mt-2.5 max-w-md text-[0.92rem] leading-6 text-slate-700">
                                {desktopStory.body}
                              </p>

                              <div className="mt-4 grid gap-2.5">
                                {activeDesktopMenu.items.slice(0, 2).map((item) => (
                                  <Link
                                    key={`${activeDesktopMenu.key}-${item.href}-featured`}
                                    href={item.href}
                                    className="group rounded-[18px] border border-slate-200 bg-white px-3.5 py-3 transition-all duration-200 hover:border-amber-200 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                                    onClick={() => setDesktopOpenGroup(null)}
                                  >
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                                      {item.icon ? <span aria-hidden="true">{item.icon}</span> : null}
                                      <span>{item.label}</span>
                                    </div>
                                    {item.desc ? <p className="mt-1 text-xs leading-5 text-slate-600">{item.desc}</p> : null}
                                  </Link>
                                ))}
                              </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 sm:p-4.5 lg:p-5">
                            <div className="grid gap-2.5 sm:grid-cols-2">
                              {desktopColumns.map((column, columnIndex) => (
                                <div key={`${activeDesktopMenu.key}-col-${columnIndex}`} className="space-y-2">
                                  {column.map((item) => (
                                    <Link
                                      key={item.href}
                                      href={item.href}
                                      onClick={() => setDesktopOpenGroup(null)}
                                      className={`group flex min-h-[74px] items-start gap-3 rounded-[18px] border px-3.5 py-3 transition-all duration-200 ${
                                        isActive(item.href)
                                          ? 'border-amber-200 bg-amber-50 shadow-[0_8px_20px_rgba(245,166,35,0.10)]'
                                          : 'border-transparent bg-slate-50 hover:border-slate-200 hover:bg-white hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)]'
                                      }`}
                                    >
                                      {item.icon ? (
                                        <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
                                          {item.icon}
                                        </span>
                                      ) : (
                                        <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#E8A020] to-cyan-400" />
                                      )}
                                      <div className="min-w-0">
                                        <div className={`text-[0.95rem] font-bold leading-5 ${isActive(item.href) ? NAV_TONES.dropdownActive : NAV_TONES.dropdownIdle}`}>
                                          {item.label}
                                        </div>
                                        {item.desc ? <div className="mt-0.5 text-[0.76rem] leading-5 text-slate-600">{item.desc}</div> : null}
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="hidden items-center justify-end gap-2 min-[1440px]:flex">
                <LanguageSwitcher compact hideLabelVisually label={labels.language} locale={locale} onLocaleChange={setLocale} />

                <button
                  type="button"
                  aria-label={`${labels.search} KWIN City (Cmd+K)`}
                  onClick={() => setSearchOpen(true)}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white/95 text-slate-700 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:bg-amber-50/70 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={onToggleTrustBanner}
                  aria-label={trustBannerVisible ? labels.hideTrustBar : labels.showTrustBar}
                  aria-pressed={trustBannerVisible}
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                    trustBannerVisible
                      ? 'border-cyan-200 bg-cyan-50 text-cyan-800 shadow-[0_10px_24px_rgba(6,182,212,0.14)]'
                      : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:text-slate-950'
                  }`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill={trustBannerVisible ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </button>

                {currentUser ? (
                  <Link
                    href="/account"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-300 bg-white px-3.5 py-2 text-sm font-semibold text-slate-800 shadow-[0_10px_24px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50"
                    title={`${labels.signedIn}: ${currentUser.email}`}
                  >
                    <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span className="max-w-[120px] truncate">{currentUser.name}</span>
                  </Link>
                ) : (
                  <Link
                    href="/about"
                    aria-label={labels.exploreKwin}
                    title={labels.exploreKwin}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,#F5A623,#E8A020)] text-[#040714] shadow-[0_14px_28px_rgba(232,160,32,0.26)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(232,160,32,0.34)]"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M12 6v12m-6-6h12" />
                    </svg>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2 justify-end min-[1440px]:hidden">
                <button
                  type="button"
                  aria-label={labels.search}
                  onClick={() => setSearchOpen(true)}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-700 transition-colors hover:border-amber-200 hover:text-slate-950"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={onToggleTrustBanner}
                  title={trustBannerVisible ? labels.hideTrustBar : labels.showTrustBar}
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-200 ${
                    trustBannerVisible
                      ? 'border-cyan-200 bg-cyan-50 text-cyan-800'
                      : 'border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill={trustBannerVisible ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </button>

                <button
                  type="button"
                  aria-label={labels.toggleMenu}
                  aria-expanded={mobileMenuOpen}
                  className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white text-slate-800 transition-colors hover:border-slate-400 sm:w-auto sm:gap-2 sm:px-3.5"
                  onClick={() => {
                    setMobileMenuOpen((value) => !value);
                    setMobileOpenGroup(null);
                  }}
                >
                  <div className="flex flex-col gap-[4px]">
                    <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[4.5px] rotate-45' : ''}`} />
                    <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                    <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[4.5px] -rotate-45' : ''}`} />
                  </div>
                  <span className="hidden text-sm font-semibold sm:inline">{labels.toggleMenu}</span>
                </button>
              </div>
            </nav>
          </div>

          {mobileMenuOpen ? (
            <div className="px-1 pt-3 min-[1440px]:hidden md:flex md:justify-end">
              <div className="max-h-[calc(100vh-108px)] overflow-y-auto rounded-[30px] border border-slate-200/80 bg-white/96 p-4 shadow-[0_28px_80px_rgba(2,6,23,0.18)] backdrop-blur-2xl md:w-[min(620px,100%)]">
                <div className="rounded-[24px] border border-slate-200 bg-[linear-gradient(135deg,rgba(245,166,35,0.10),rgba(6,182,212,0.08))] p-4">
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#A96A00]">Navigation</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    A clearer route structure, inspired by the strongest current web headers: fewer decisions up front, richer context after the first click.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchOpen(true);
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700"
                    >
                      <span aria-hidden="true">⌘</span>
                      <span>{labels.search}</span>
                    </button>
                    <Link
                      href="/about"
                      className="flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#F5A623,#E8A020)] px-3 py-3 text-sm font-bold text-[#040714]"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{labels.exploreKwin}</span>
                    </Link>
                  </div>
                </div>

                <div className="mt-4">
                  <LanguageSwitcher compact label={labels.language} locale={locale} onLocaleChange={setLocale} />
                </div>

                {currentUser ? (
                  <Link
                    href="/account"
                    className="mt-4 flex items-center justify-between rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3.5"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileOpenGroup(null);
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">{labels.signedIn}</p>
                      <p className="mt-1 truncate text-sm font-bold text-slate-900">{currentUser.name}</p>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{labels.account}</span>
                  </Link>
                ) : null}

                <div className="mt-4 space-y-3">
                  {menuGroups.map((group) => {
                    const isOpen = mobileOpenGroup === group.key;
                    const groupStory = GROUP_STORIES[group.key] ?? GROUP_STORIES.discover;

                    return (
                      <section
                        key={group.key}
                        className={`overflow-hidden rounded-[26px] border transition-all duration-200 ${
                          isOpen ? 'border-slate-200 bg-slate-50/80 shadow-[0_18px_48px_rgba(15,23,42,0.08)]' : 'border-slate-200/80 bg-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setMobileOpenGroup((curr) => (curr === group.key ? null : group.key))}
                          className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left"
                        >
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A96A00]">{groupStory.eyebrow}</p>
                            <p className={`mt-1 truncate text-sm font-bold ${isGroupActive(group) ? 'text-[#A96A00]' : 'text-slate-950'}`}>{group.label}</p>
                            <p className="mt-1 text-xs leading-5 text-slate-600">{groupStory.title}</p>
                          </div>
                          <svg className={`mt-1 h-4 w-4 flex-shrink-0 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>

                        {isOpen ? (
                          <div className="border-t border-slate-200 px-3 pb-3 pt-2">
                            <div className="space-y-1">
                              {group.items.map((item) => (
                                <Link
                                  key={item.href}
                                  href={item.href}
                                  className={`flex items-start gap-3 rounded-2xl px-3 py-3 transition-colors ${
                                    isActive(item.href) ? 'bg-amber-50 text-[#A96A00]' : 'hover:bg-white'
                                  }`}
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileOpenGroup(null);
                                  }}
                                >
                                  {item.icon ? (
                                    <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                                      {item.icon}
                                    </span>
                                  ) : (
                                    <span className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-[#E8A020] to-cyan-400" />
                                  )}
                                  <span className="min-w-0">
                                    <span className="block text-sm font-semibold">{item.label}</span>
                                    {item.desc ? <span className="mt-1 block text-xs leading-5 text-slate-500">{item.desc}</span> : null}
                                  </span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </section>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </header>

      {searchOpen ? <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} /> : null}
    </>
  );
}
