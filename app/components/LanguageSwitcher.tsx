'use client';

import { useI18n } from '@/lib/i18n/I18nProvider';
import { LOCALE_DEFINITIONS, type Locale } from '@/lib/i18n/messages';

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className={`inline-flex items-center gap-2 ${compact ? 'text-xs' : 'text-sm'}`}>
      <span className="text-gray-500">{t('common.language')}</span>
      <select
        aria-label={t('common.language')}
        value={locale}
        onChange={(e) => setLocale(e.target.value as Locale)}
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
