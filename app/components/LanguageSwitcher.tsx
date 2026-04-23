'use client';

import { LOCALE_DEFINITIONS, type Locale } from '@/lib/i18n/locales';

export default function LanguageSwitcher({
  compact = false,
  label,
  locale,
  onLocaleChange,
}: {
  compact?: boolean;
  label: string;
  locale: Locale;
  onLocaleChange: (nextLocale: Locale) => void;
}) {
  return (
    <label className={`inline-flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
      <span className="text-gray-500">{label}</span>
      <select
        aria-label={label}
        value={locale}
        onChange={(e) => onLocaleChange(e.target.value as Locale)}
        className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-gray-700"
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
