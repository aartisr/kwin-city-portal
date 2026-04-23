import type { HeaderLabels } from '@/components/header/config';

type MobileHeaderActionsProps = {
  labels: HeaderLabels;
  trustBannerVisible: boolean;
  mobileMenuOpen: boolean;
  onOpenSearch: () => void;
  onToggleTrustBanner: () => void;
  onToggleMobileMenu: () => void;
};

export default function MobileHeaderActions({
  labels,
  trustBannerVisible,
  mobileMenuOpen,
  onOpenSearch,
  onToggleTrustBanner,
  onToggleMobileMenu,
}: MobileHeaderActionsProps) {
  return (
    <div className="flex items-center gap-2 justify-end min-[1440px]:hidden">
      <button
        type="button"
        aria-label={labels.search}
        onClick={onOpenSearch}
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
        onClick={onToggleMobileMenu}
      >
        <div className="flex flex-col gap-[4px]">
          <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'translate-y-[4.5px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${mobileMenuOpen ? '-translate-y-[4.5px] -rotate-45' : ''}`} />
        </div>
        <span className="hidden text-sm font-semibold sm:inline">{labels.toggleMenu}</span>
      </button>
    </div>
  );
}
