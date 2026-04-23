import {
  DEFAULT_LOCALE,
  LOCALE_DEFINITIONS,
  LOCALE_DETAILS,
  SUPPORTED_LOCALES,
  getIntlLocale,
  getLocaleDefinition,
  normalizeLocale,
  type Locale,
} from '@/lib/i18n/locales';
import { defaultMessages, type MessageDictionary } from './catalog/default-messages';
import { localeMessageOverrides } from './catalog/locale-overrides';
import { SPANISH_INLINE_FALLBACKS } from './catalog/spanish-inline-fallbacks';
import type { LocalizedValue } from './catalog/types';
import { mergeDeep, resolvePath } from './catalog/utils';

export const messages = SUPPORTED_LOCALES.reduce((catalog, locale) => {
  catalog[locale] = locale === DEFAULT_LOCALE
    ? defaultMessages
    : mergeDeep(defaultMessages, localeMessageOverrides[locale]) as MessageDictionary;
  return catalog;
}, {} as Record<Locale, MessageDictionary>);

export function pickLocalizedValue<T>(locale: Locale, values: LocalizedValue<T>): T {
  const resolved = (values[locale] ?? values[DEFAULT_LOCALE]) as T;

  if (locale === 'es' && values.es === undefined && typeof resolved === 'string') {
    return (SPANISH_INLINE_FALLBACKS[resolved] ?? resolved) as T;
  }

  return resolved;
}

export function translate(locale: Locale, key: string): string {
  return resolvePath(messages[locale], key)
    ?? resolvePath(messages[DEFAULT_LOCALE], key)
    ?? key;
}

export {
  DEFAULT_LOCALE,
  LOCALE_DEFINITIONS,
  LOCALE_DETAILS,
  SUPPORTED_LOCALES,
  getIntlLocale,
  getLocaleDefinition,
  normalizeLocale,
};

export type { Locale } from '@/lib/i18n/locales';
export type { DeepPartial, LocalizedValue } from './catalog/types';
