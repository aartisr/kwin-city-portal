'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { getLocaleDefinition, normalizeLocale, translate, type Locale } from '@/lib/i18n/messages';

type I18nContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

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
    document.documentElement.lang = getLocaleDefinition(normalized).htmlLang;
    localStorage.setItem('kwin-locale', normalized);
    document.cookie = `kwin_locale=${normalized}; path=/; max-age=31536000; samesite=lax`;
  };

  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string): string => translate(locale, key);

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
