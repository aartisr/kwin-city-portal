export const LOCALE_DEFINITIONS = [
  { code: 'en', label: 'English', nativeLabel: 'English', htmlLang: 'en-IN' },
  { code: 'kn', label: 'Kannada', nativeLabel: 'ಕನ್ನಡ', htmlLang: 'kn-IN' },
  { code: 'hi', label: 'Hindi', nativeLabel: 'हिन्दी', htmlLang: 'hi-IN' },
  { code: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்', htmlLang: 'ta-IN' },
  { code: 'te', label: 'Telugu', nativeLabel: 'తెలుగు', htmlLang: 'te-IN' },
  { code: 'es', label: 'Spanish', nativeLabel: 'Español', htmlLang: 'es-ES' },
] as const;

export type Locale = (typeof LOCALE_DEFINITIONS)[number]['code'];

export type LocaleDetails = Omit<(typeof LOCALE_DEFINITIONS)[number], 'code'>;

export const SUPPORTED_LOCALES = LOCALE_DEFINITIONS.map(({ code }) => code) as Locale[];
export const DEFAULT_LOCALE = 'en' as const satisfies Locale;

export const LOCALE_DETAILS = LOCALE_DEFINITIONS.reduce((acc, definition) => {
  acc[definition.code] = {
    label: definition.label,
    nativeLabel: definition.nativeLabel,
    htmlLang: definition.htmlLang,
  };
  return acc;
}, {} as Record<Locale, LocaleDetails>);

export const HTML_LANG = SUPPORTED_LOCALES.reduce((acc, locale) => {
  acc[locale] = LOCALE_DETAILS[locale].htmlLang;
  return acc;
}, {} as Record<Locale, string>);

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  const lower = value.toLowerCase();
  if (SUPPORTED_LOCALES.includes(lower as Locale)) return lower as Locale;
  return DEFAULT_LOCALE;
}

export function getLocaleDefinition(locale: Locale): LocaleDetails {
  return LOCALE_DETAILS[locale] ?? LOCALE_DETAILS[DEFAULT_LOCALE];
}

export function getIntlLocale(locale: Locale): string {
  const map: Record<Locale, string> = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN',
    ta: 'ta-IN',
    te: 'te-IN',
    es: 'es-ES',
  };
  return map[locale] ?? map[DEFAULT_LOCALE];
}
