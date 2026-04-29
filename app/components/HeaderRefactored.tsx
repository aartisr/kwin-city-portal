'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';

type NavItem = {
  label: string;
  href: string;
  icon?: string;
  desc?: string;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

const NAV_TONES = {
  active: 'text-[#A96A00] font-extrabold bg-amber-50/95 ring-1 ring-amber-200',
  idleScrolled: 'text-gray-600 hover:text-gray-900 font-semibold',
  idleTop: 'text-slate-700 hover:text-slate-900 font-semibold',
  dropdownActive: 'text-[#A96A00]',
  dropdownIdle: 'text-gray-800',
} as const;

const HIGH_LEVEL_MENUS: NavGroup[] = [
  {
    label: 'Discover',
    items: [
      { label: 'About KWIN', href: '/about', desc: 'Mission, pillars, and framework' },
      { label: 'Why North Bengaluru', href: '/why-north-bengaluru', desc: 'Regional strategic case' },
      { label: 'Timeline', href: '/timeline', desc: 'Phase-wise development roadmap' },
    ],
  },
  {
    label: 'Ecosystem',
    items: [
      { label: 'Sectors', href: '/sectors', desc: 'Industry depth and opportunities' },
      { label: 'Sustainability', href: '/sustainability', desc: 'Climate and resilience lens' },
    ],
  },
  {
    label: 'Research',
    items: [
      { label: 'Data Insights', href: '/data-insights', desc: 'Live evidence dashboards' },
      { label: 'Evidence Vault', href: '/evidence', desc: 'What each dataset can prove' },
      { label: 'Sources & Claims', href: '/sources', desc: 'Full claim-to-source ledger' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { label: 'News Intelligence', href: '/news-intelligence', desc: 'Attribution-first media observatory' },
      { label: 'Live News Reader', href: '/news-reader', desc: 'On-demand OPML summary reader' },
      { label: 'Trust Center', href: '/trust', desc: 'Authenticity and originality protocol' },
      { label: 'Get the App', href: '/download', icon: '📱', desc: 'Install on Android & iOS — free' },
    ],
  },
  {
    label: 'Audiences',
    items: [
      { label: 'Investor', href: '/for/investor', icon: '📈', desc: 'Opportunity & risk briefing' },
      { label: 'Resident', href: '/for/resident', icon: '🏡', desc: 'Livability & community' },
      { label: 'Researcher', href: '/for/researcher', icon: '🔬', desc: 'Data & methodology' },
      { label: 'Journalist', href: '/for/journalist', icon: '📰', desc: 'Verified story angles' },
      { label: 'Curious Citizen', href: '/for/curious-citizens', icon: '🌏', desc: 'Plain-language explainer' },
      { label: 'All Audience Hubs', href: '/for', desc: 'Browse all persona pathways' },
    ],
  },
];

/**
 * Refactored Header Component
 * Mirrors the grouped, five-menu information architecture used by Header.tsx.
 */
export default function Header({
  trustBannerVisible,
  onToggleTrustBanner,
}: {
  trustBannerVisible: boolean;
  onToggleTrustBanner: () => void;
}) {
  const { t, locale } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenGroup, setMobileOpenGroup] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [desktopOpenGroup, setDesktopOpenGroup] = useState<string | null>(null);
  const pathname = usePathname();

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

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const isGroupActive = (group: NavGroup) =>
    group.items.some((item) => isActive(item.href));

  const localizeGroupLabel = (label: string) => {
    if (label === 'Discover') return locale === 'kn' ? 'ಅನ್ವೇಷಿಸಿ' : locale === 'hi' ? 'खोजें' : locale === 'ta' ? 'கண்டறி' : 'Discover';
    if (label === 'Ecosystem') return locale === 'kn' ? 'ಪರಿಸರ ವ್ಯವಸ್ಥೆ' : locale === 'hi' ? 'इकोसिस्टम' : locale === 'ta' ? 'சூழல் அமைப்பு' : 'Ecosystem';
    if (label === 'Research') return locale === 'kn' ? 'ಸಂಶೋಧನೆ' : locale === 'hi' ? 'अनुसंधान' : locale === 'ta' ? 'ஆய்வு' : 'Research';
    if (label === 'Intelligence') return locale === 'kn' ? 'ಅಂತರ್ಙಾನ' : locale === 'hi' ? 'इंटेलिजेंस' : locale === 'ta' ? 'நுண்ணறிவு' : 'Intelligence';
    if (label === 'Audiences') return locale === 'kn' ? 'ಪ್ರೇಕ್ಷಕರು' : locale === 'hi' ? 'दर्शक' : locale === 'ta' ? 'பார்வையாளர் பிரிவுகள்' : 'Audiences';
    return label;
  };

  const trMenu = (href: string, field: 'label' | 'desc', fallback?: string) => {
    const key = `header.items.${href}.${field}`;
    const val = t(key);
    return val && val !== key ? val : fallback || '';
  };

  const menus: NavGroup[] = HIGH_LEVEL_MENUS.map((group) => ({
    ...group,
    label: localizeGroupLabel(group.label),
    items: group.items.map((item) => ({
      ...item,
      label: trMenu(item.href, 'label', item.label),
      desc: trMenu(item.href, 'desc', item.desc),
    })),
  }));

  const activeGroupLabel = (group: NavGroup) =>
    isGroupActive(group)
      ? NAV_TONES.active
      : scrolled
      ? NAV_TONES.idleScrolled
      : NAV_TONES.idleTop;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-2xl shadow-sm border-b border-gray-100'
          : trustBannerVisible
          ? 'bg-white/88 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_6px_24px_rgba(2,6,23,0.06)]'
          : 'bg-white backdrop-blur-2xl shadow-[0_4px_24px_rgba(2,6,23,0.07)]'
      }`}
    >
      {/* Gradient accent line — visible only when trust bar is hidden and not scrolled */}
      <div
        aria-hidden="true"
        className={`absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500 bg-gradient-to-r from-amber-300 via-cyan-300 to-amber-200 ${
          !trustBannerVisible && !scrolled ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <nav className="container flex items-center justify-between h-[70px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-xl text-[#040714] shadow-md bg-[linear-gradient(135deg,#F5A623,#E8A020)]">
            K
          </div>
          <div className="leading-none">
            <span className="font-extrabold text-lg tracking-tight text-gray-900 transition-colors">
              KWIN
            </span>
            <span className="ml-1 text-sm text-gray-500 transition-colors">
              City
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div ref={menuRef} className="hidden lg:flex items-center gap-6">
          {menus.map((group) => {
            const isOpen = desktopOpenGroup === group.label;

            return (
              <div key={group.label} className="relative">
                <button
                  onClick={() => setDesktopOpenGroup((curr) => (curr === group.label ? null : group.label))}
                  className={`flex items-center gap-1 text-sm px-2.5 py-1 rounded-full transition-all duration-200 ${activeGroupLabel(group)}`}
                >
                  {group.label}
                  <svg
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                      onClick={() => setDesktopOpenGroup(null)}
                    >
                      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                        <p className="text-[11px] font-bold tracking-widest uppercase text-gray-400">{group.label}</p>
                      </div>
                      <div className="p-2">
                        {group.items.map((item, index) => (
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
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Trust Protocol toggle */}
          <button
            onClick={onToggleTrustBanner}
            title={trustBannerVisible ? t('common.hideTrustBar') : t('common.showTrustBar')}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 border ${
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
          <Link
            href="/about"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-[#040714] bg-[linear-gradient(135deg,#F5A623,#E8A020)]"
          >
            {t('common.exploreKwin')}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="lg:hidden flex items-center gap-2">
          {/* Trust Protocol toggle — mobile */}
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
          {/* Hamburger */}
          <button
            aria-label={t('common.toggleMenu')}
            className="flex flex-col gap-[5px] focus:outline-none p-1"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              if (mobileMenuOpen) {
                setMobileOpenGroup(null);
              }
            }}
          >
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`}
            />
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${mobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-6 h-0.5 transition-all duration-300 bg-gray-900 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
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
              {menus.map((group) => {
                const isOpen = mobileOpenGroup === group.label;

                return (
                  <div key={group.label} className="mb-1">
                    <button
                      onClick={() => setMobileOpenGroup((curr) => (curr === group.label ? null : group.label))}
                      className={`flex items-center justify-between w-full text-sm font-semibold px-1 py-2.5 rounded-lg transition-colors ${
                        isGroupActive(group) ? 'text-[#E8A020] bg-amber-50' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {group.label}
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
                          {group.items.map((item) => (
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
                          ))}
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
  );
}
