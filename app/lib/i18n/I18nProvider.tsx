'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { DEFAULT_LOCALE, messages, normalizeLocale, type Locale, HTML_LANG } from '@/lib/i18n/messages';

type I18nContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function resolvePath(obj: unknown, key: string): string | undefined {
  const parts = key.split('.');
  let current: unknown = obj;
  for (const part of parts) {
    if (!current || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === 'string' ? current : undefined;
}

export default function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale?: string;
  children: React.ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(normalizeLocale(initialLocale));

  const setLocale = (nextLocale: Locale) => {
    const normalized = normalizeLocale(nextLocale);
    setLocaleState(normalized);
    document.documentElement.lang = HTML_LANG[normalized];
    localStorage.setItem('kwin-locale', normalized);
    document.cookie = `kwin_locale=${normalized}; path=/; max-age=31536000; samesite=lax`;
  };

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string): string => {
      const byLocale = resolvePath(messages[locale], key);
      if (byLocale) return byLocale;
      const byDefault = resolvePath(messages[DEFAULT_LOCALE], key);
      return byDefault ?? key;
    };

    return { locale, setLocale, t };
  }, [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
