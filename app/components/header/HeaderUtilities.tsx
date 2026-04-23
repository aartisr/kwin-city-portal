import Link from 'next/link';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import type { HeaderLabels } from '@/components/header/config';
import type { AuthUser } from '@/components/header/types';
import type { Locale } from '@/lib/i18n/locales';

type HeaderUtilitiesProps = {
  labels: HeaderLabels;
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  trustBannerVisible: boolean;
  onToggleTrustBanner: () => void;
  onOpenSearch: () => void;
  currentUser: AuthUser | null;
};

export default function HeaderUtilities({
  labels,
  locale,
  setLocale,
  trustBannerVisible,
  onToggleTrustBanner,
  onOpenSearch,
  currentUser,
}: HeaderUtilitiesProps) {
  return (
    <div className="hidden items-center justify-end gap-2 min-[1440px]:flex">
      <LanguageSwitcher compact hideLabelVisually label={labels.language} locale={locale} onLocaleChange={setLocale} />

      <button
        type="button"
        aria-label={`${labels.search} KWIN City (Cmd+K)`}
        onClick={onOpenSearch}
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
  );
}
