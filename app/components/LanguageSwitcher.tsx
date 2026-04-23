'use client';

import { LOCALE_DEFINITIONS, type Locale } from '@/lib/i18n/locales';

export default function LanguageSwitcher({
  compact = false,
  hideLabelVisually = false,
  label,
  locale,
  onLocaleChange,
}: {
  compact?: boolean;
  hideLabelVisually?: boolean;
  label: string;
  locale: Locale;
  onLocaleChange: (nextLocale: Locale) => void;
}) {
  return (
    <label className={`inline-flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
      <span className={hideLabelVisually ? 'sr-only' : 'text-slate-600'}>{label}</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(e) => onLocaleChange(e.target.value as Locale)}
        className={`rounded-xl border border-slate-300 bg-white px-2.5 py-1.5 font-medium text-slate-800 shadow-[0_6px_18px_rgba(15,23,42,0.04)] ${
          compact ? 'min-w-[4.75rem] text-xs' : 'min-w-[5.25rem] text-sm'
        }`}
      >
        {LOCALE_DEFINITIONS.map(({ code, nativeLabel }) => (
          <option key={code} value={code}>
            {nativeLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
