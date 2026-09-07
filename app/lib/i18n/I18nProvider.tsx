'use client';

import { createContext, useContext, useMemo } from 'react';
import { translate, type Locale } from '@/lib/i18n/messages';
import { LocaleProvider, useLocale } from '@/lib/i18n/locale-context';

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
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <I18nProviderInner>{children}</I18nProviderInner>
    </LocaleProvider>
  );
}

function I18nProviderInner({ children }: { children: React.ReactNode }) {
  const { locale, setLocale } = useLocale();
  const value = useMemo<I18nContextValue>(() => {
    const t = (key: string): string => translate(locale, key);

    return { locale, setLocale, t };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
