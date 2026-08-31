'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getLocaleDefinition, normalizeLocale, type Locale } from '@/lib/i18n/locales';

type LocaleContextValue = {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  initialLocale,
  children,
}: {
  initialLocale?: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>(normalizeLocale(initialLocale));

  const value = useMemo<LocaleContextValue>(() => {
    const setLocale = (nextLocale: Locale) => {
      const normalized = normalizeLocale(nextLocale);
      setLocaleState(normalized);
      document.documentElement.lang = getLocaleDefinition(normalized).htmlLang;
      localStorage.setItem('kwin-locale', normalized);
      document.cookie = `kwin_locale=${normalized}; path=/; max-age=31536000; samesite=lax`;
      router.refresh();
    };

    return { locale, setLocale };
  }, [locale, router]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
}
