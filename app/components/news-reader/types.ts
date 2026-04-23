import type { LocalizedValue, Locale } from '@/lib/i18n/messages';

export type ReaderItem = {
  title: string;
  link: string;
  summary: string;
  fullContent?: string;
  source: string;
  sourceFeedUrl: string;
  publishedAt: string | null;
};

export type ReaderResponse = {
  opmlUrl: string;
  feedCount: number;
  itemCount: number;
  generatedAt: string;
  items: ReaderItem[];
  cache?: {
    hit: boolean;
    ttlMs: number;
  };
};

export type ReaderPreset = {
  id: string;
  name: string;
  opmlUrl: string;
  limit: number;
};

export type TimeWindow = 'all' | '24h' | '7d' | '30d';

export type ReaderStatsItem = {
  label: string;
  value: string;
};

export type ReaderText = (values: LocalizedValue<string>) => string;

export type ReaderLocale = Locale;
