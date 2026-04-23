import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatDate, getDomain, isInTimeWindow } from '@/components/news-reader/utils';

describe('news-reader/utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-04-22T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('extracts clean domains and handles invalid URLs safely', () => {
    expect(getDomain('https://www.example.com/story')).toBe('example.com');
    expect(getDomain('not-a-url')).toBe('unknown-source');
  });

  it('filters published dates into the requested time window', () => {
    expect(isInTimeWindow('2026-04-22T08:00:00Z', '24h')).toBe(true);
    expect(isInTimeWindow('2026-04-10T08:00:00Z', '7d')).toBe(false);
    expect(isInTimeWindow(null, 'all')).toBe(true);
    expect(isInTimeWindow('invalid-date', '30d')).toBe(false);
  });

  it('formats dates and returns localized fallback text when unavailable', () => {
    expect(formatDate('2026-04-22T10:30:00Z', 'en')).toContain('2026');
    expect(formatDate(null, 'hi')).toBe('तिथि उपलब्ध नहीं');
    expect(formatDate('invalid-date', 'ta')).toBe('தேதி கிடைக்கவில்லை');
  });
});
