import { cookies } from 'next/headers';
import { normalizeLocale, type Locale } from '@/lib/i18n/messages';

export async function getServerLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get('kwin_locale')?.value);
}

export function pickByLocale<T>(
  locale: Locale,
  values: { en: T; kn: T; hi: T }
): T {
  return values[locale] ?? values.en;
}
