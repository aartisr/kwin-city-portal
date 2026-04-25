'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import BrandLockup from '@/components/header/BrandLockup';
import { GROUP_STORIES, splitItems, type HeaderLabels } from '@/components/header/config';
import DesktopNav from '@/components/header/DesktopNav';
import HeaderUtilities from '@/components/header/HeaderUtilities';
import MobileHeaderActions from '@/components/header/MobileHeaderActions';
import MobileMenuSheet from '@/components/header/MobileMenuSheet';
import { NAV_TONES } from '@/components/header/navigation';
import { useHeaderSession } from '@/components/header/useHeaderSession';
import type { NavGroup } from '@/components/header/types';
import { useLocale } from '@/lib/i18n/locale-context';

const SearchModal = dynamic(() => import('@/components/SearchModal'), {
  ssr: false,
});

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
    document.body.style.overflow = mobileMenuOpen || searchOpen ? 'hidden' : previousOverflow;

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

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  const isGroupActive = (group: NavGroup) => group.items.some((item) => isActive(item.href));

  const activeGroupLabel = (group: NavGroup) =>
    isGroupActive(group) ? NAV_TONES.active : scrolled ? NAV_TONES.idleScrolled : NAV_TONES.idleTop;

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

            <nav className="grid h-[72px] grid-cols-[minmax(11rem,auto)_auto] items-center gap-3 px-3 md:px-4 min-[1200px]:grid-cols-[minmax(11rem,auto)_minmax(0,1fr)_auto]">
              <BrandLockup />
              <DesktopNav
                menuGroups={menuGroups}
                desktopNavRef={desktopNavRef}
                activeDesktopMenu={activeDesktopMenu}
                desktopStory={desktopStory}
                desktopColumns={desktopColumns}
                activeGroupLabel={activeGroupLabel}
                isActive={isActive}
                isGroupActive={isGroupActive}
                onOpenGroup={setDesktopOpenGroup}
                onToggleGroup={(key) => setDesktopOpenGroup((curr) => (curr === key ? null : key))}
                onCloseMenu={() => setDesktopOpenGroup(null)}
              />
              <HeaderUtilities
                labels={labels}
                locale={locale}
                setLocale={setLocale}
                trustBannerVisible={trustBannerVisible}
                onToggleTrustBanner={onToggleTrustBanner}
                onOpenSearch={() => setSearchOpen(true)}
                currentUser={currentUser}
              />
              <MobileHeaderActions
                labels={labels}
                trustBannerVisible={trustBannerVisible}
                mobileMenuOpen={mobileMenuOpen}
                onOpenSearch={() => setSearchOpen(true)}
                onToggleTrustBanner={onToggleTrustBanner}
                onToggleMobileMenu={() => {
                  setMobileMenuOpen((value) => !value);
                  setMobileOpenGroup(null);
                }}
              />
            </nav>
          </div>

          {mobileMenuOpen ? (
            <MobileMenuSheet
              menuGroups={menuGroups}
              labels={labels}
              locale={locale}
              setLocale={setLocale}
              currentUser={currentUser}
              mobileOpenGroup={mobileOpenGroup}
              isActive={isActive}
              isGroupActive={isGroupActive}
              onToggleGroup={(key) => setMobileOpenGroup((curr) => (curr === key ? null : key))}
              onCloseMenu={() => {
                setMobileMenuOpen(false);
                setMobileOpenGroup(null);
              }}
              onOpenSearch={() => setSearchOpen(true)}
            />
          ) : null}
        </div>
      </header>

      {searchOpen ? <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} locale={locale} /> : null}
    </>
  );
}
