'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import SearchModal from '@/components/SearchModal';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { HIGH_LEVEL_MENUS, NAV_TONES } from '@/components/header/navigation';
import { translateGroupLabel, translateNavItem } from '@/components/header/i18n';
import { useHeaderSession } from '@/components/header/useHeaderSession';
import type { NavGroup } from '@/components/header/types';

export default function Header({
  trustBannerVisible,
  onToggleTrustBanner,
}: {
  trustBannerVisible: boolean;
  onToggleTrustBanner: () => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpenGroup, setDesktopOpenGroup] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const currentUser = useHeaderSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDesktopOpenGroup(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
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

  const translatedGroupLabel = (label: string) => translateGroupLabel(t, label);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-2xl shadow-sm border-b border-gray-100'
            : trustBannerVisible
            ? 'bg-white/88 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_6px_24px_rgba(2,6,23,0.06)]'
            : 'bg-white backdrop-blur-2xl shadow-[0_4px_24px_rgba(2,6,23,0.07)]'
        }`}
      >
        <div
          aria-hidden="true"
          className={`absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500 bg-gradient-to-r from-amber-300 via-cyan-300 to-amber-200 ${
            !trustBannerVisible && !scrolled ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <nav className="container flex items-center justify-between h-[70px]">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl text-[#040714] shadow-md bg-[linear-gradient(135deg,#F5A623,#E8A020)]">
              K
            </div>
            <div className="leading-none">
              <span className="font-extrabold text-lg tracking-tight text-gray-900 transition-colors">KWIN</span>
              <span className="ml-1 text-sm text-gray-500 transition-colors">City</span>
            </div>
          </Link>

          <div ref={menuRef} className="hidden lg:flex items-center gap-6" role="navigation" aria-label="Main navigation">
            {HIGH_LEVEL_MENUS.map((group) => {
              const isOpen = desktopOpenGroup === group.label;
              const menuId = `menu-${group.label.toLowerCase().replace(/\s+/g, '-')}`;

              return (
                <div key={group.label} className="relative">
                  <button
                    onClick={() => setDesktopOpenGroup((curr) => (curr === group.label ? null : group.label))}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                    aria-controls={menuId}
                    className={`flex items-center gap-1 text-sm px-2.5 py-1 rounded-full transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${activeGroupLabel(group)}`}
                  >
                    {translatedGroupLabel(group.label)}
                    <svg
                      className={`w-3.5 h-3.5 transition-transform duration-200`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                        role="menu"
                        id={menuId}
                        aria-label={`${translatedGroupLabel(group.label)} menu`}
                        onClick={() => setDesktopOpenGroup(null)}
                      >
                        <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                          <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">{translatedGroupLabel(group.label)}</p>
                        </div>
                        <div className="p-2">
                          {group.items.map((rawItem, index) => {
                            const item = translateNavItem(t, rawItem);
                            return (
                            <motion.div
                              key={item.href}
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.16, delay: index * 0.03 }}
                            >
                              <Link
                                href={item.href}
                                className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors group ${
                                  isActive(item.href) ? 'bg-amber-50' : 'hover:bg-gray-50'
                                }`}
                              >
                                {item.icon ? <span className="text-lg leading-none mt-0.5">{item.icon}</span> : null}
                                <div className="min-w-0">
                                  <div className={`text-sm font-bold ${isActive(item.href) ? NAV_TONES.dropdownActive : NAV_TONES.dropdownIdle}`}>
                                    {item.label}
                                  </div>
                                  {item.desc ? <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div> : null}
                                </div>
                                {isActive(item.href) ? <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E8A020] mt-2" /> : null}
                              </Link>
                            </motion.div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 group/header-actions">
            <LanguageSwitcher compact />

            <button
              aria-label={`${t('common.search')} KWIN City (Cmd+K)`}
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-gray-800 border border-gray-200 hover:border-amber-300 bg-white hover:bg-amber-50 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden xl:inline text-xs font-medium text-gray-400">{t('common.search')}</span>
              <kbd className="hidden xl:inline text-[10px] font-mono bg-gray-100 border border-gray-200 rounded px-1.5 py-0.5 text-gray-400">Cmd+K</kbd>
            </button>

            <div className="w-0 overflow-hidden opacity-0 group-hover/header-actions:w-9 group-focus-within/header-actions:w-9 group-hover/header-actions:opacity-100 group-focus-within/header-actions:opacity-100 transition-all duration-200">
              <Link
                href="/about"
                aria-label={t('common.exploreKwin')}
                title={t('common.exploreKwin')}
                className="inline-flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 hover:text-[#A96A00] border border-gray-200 hover:border-amber-300 bg-white hover:bg-amber-50 transition-all duration-150"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3l2.2 4.46L19 9l-3.5 3.41.83 4.83L12 15.1l-4.33 2.14.83-4.83L5 9l4.8-1.54L12 3z" />
                </svg>
              </Link>
            </div>

            <button
              onClick={onToggleTrustBanner}
              aria-label={trustBannerVisible ? t('common.hideTrustBar') : t('common.showTrustBar')}
              aria-pressed={trustBannerVisible}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
                trustBannerVisible
                  ? 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100'
                  : 'bg-transparent text-slate-400 border-slate-200 hover:text-slate-600 hover:border-slate-300'
              }`}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill={trustBannerVisible ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span className="hidden xl:inline">{t('common.trust')}</span>
            </button>

            {currentUser ? (
              <Link
                href="/account"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                title={`${t('common.signedIn')}: ${currentUser.email}`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
                <span className="max-w-[140px] truncate">{currentUser.name}</span>
              </Link>
            ) : null}
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <button
              aria-label={t('common.search')}
              onClick={() => setSearchOpen(true)}
              className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 text-gray-500 hover:text-gray-800 hover:border-amber-300 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <LanguageSwitcher compact />


            <button
              onClick={onToggleTrustBanner}
              title={trustBannerVisible ? t('common.hideTrustBar') : t('common.showTrustBar')}
              className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 ${
                trustBannerVisible
                  ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                  : 'bg-transparent text-slate-400 border-slate-200'
              }`}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill={trustBannerVisible ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </button>

            <button
              aria-label={t('common.toggleMenu')}
              aria-expanded={mobileMenuOpen}
              className="flex flex-col gap-[5px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded p-1"
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (mobileMenuOpen) {
                  setMobileOpenGroup(null);
                }
              }}
            >
              <span className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden bg-white backdrop-blur-xl border-b border-gray-200 shadow-2xl"
            >
              <div className="container py-5 flex flex-col gap-1">
                {currentUser ? (
                  <Link
                    href="/account"
                    className="mb-2 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setMobileOpenGroup(null);
                    }}
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{t('common.signedIn')}</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.name}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-600">{t('common.account')}</span>
                  </Link>
                ) : null}

                {HIGH_LEVEL_MENUS.map((group) => {
                  const isOpen = mobileOpenGroup === group.label;

                  return (
                    <div key={group.label} className="mb-1">
                      <button
                        onClick={() => setMobileOpenGroup((curr) => (curr === group.label ? null : group.label))}
                        className={`flex items-center justify-between w-full text-sm font-semibold px-1 py-2.5 rounded-lg transition-colors ${
                          isGroupActive(group) ? 'text-[#E8A020] bg-amber-50' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {translatedGroupLabel(group.label)}
                        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pl-3 border-l-2 border-amber-200 ml-1"
                          >
                            {group.items.map((rawItem) => {
                              const item = translateNavItem(t, rawItem);
                              return (
                              <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-start gap-2 text-sm py-2 px-2 rounded-lg transition-colors ${
                                  isActive(item.href) ? 'text-[#E8A020] font-bold' : 'text-gray-600 hover:text-gray-900'
                                }`}
                                onClick={() => {
                                  setMobileMenuOpen(false);
                                  setMobileOpenGroup(null);
                                }}
                              >
                                {item.icon ? <span>{item.icon}</span> : null}
                                <div className="min-w-0">
                                  <div>{item.label}</div>
                                  {item.desc ? <div className="text-xs text-gray-500">{item.desc}</div> : null}
                                </div>
                              </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <Link
                  href="/about"
                  className="mt-3 w-full text-center btn btn-primary"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileOpenGroup(null);
                  }}
                >
                  {t('common.exploreKwin')}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
