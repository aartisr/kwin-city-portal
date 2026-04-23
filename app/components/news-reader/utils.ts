import { getIntlLocale } from '@/lib/i18n/messages';
import type { ReaderLocale, TimeWindow } from './types';

export function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'unknown-source';
  }
}

export function isInTimeWindow(value: string | null, window: TimeWindow): boolean {
  if (window === 'all') {
    return true;
  }

  if (!value) {
    return false;
  }

  const published = new Date(value).getTime();
  if (Number.isNaN(published)) {
    return false;
  }

  const now = Date.now();
  const diff = now - published;

  if (window === '24h') {
    return diff <= 24 * 60 * 60 * 1000;
  }

  if (window === '7d') {
    return diff <= 7 * 24 * 60 * 60 * 1000;
  }

  return diff <= 30 * 24 * 60 * 60 * 1000;
}

export function formatDate(value: string | null, locale: ReaderLocale = 'en'): string {
  if (!value) {
    return locale === 'kn'
      ? 'ದಿನಾಂಕ ಲಭ್ಯವಿಲ್ಲ'
      : locale === 'hi'
      ? 'तिथि उपलब्ध नहीं'
      : locale === 'ta'
      ? 'தேதி கிடைக்கவில்லை'
      : 'Date unavailable';
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === 'kn'
      ? 'ದಿನಾಂಕ ಲಭ್ಯವಿಲ್ಲ'
      : locale === 'hi'
      ? 'तिथि उपलब्ध नहीं'
      : locale === 'ta'
      ? 'தேதி கிடைக்கவில்லை'
      : 'Date unavailable';
  }

  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}
