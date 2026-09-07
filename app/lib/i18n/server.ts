import { cookies } from 'next/headers';
import {
  normalizeLocale,
  pickLocalizedValue,
  type Locale,
  type LocalizedValue,
} from '@/lib/i18n/messages';

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get('kwin_locale')?.value);
}

export function pickByLocale<T>(
  locale: Locale,
  values: LocalizedValue<T>
): T {
  return pickLocalizedValue(locale, values);
}
