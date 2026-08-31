import { describe, expect, it } from 'vitest';
import { DEFAULT_OPML_URL, DEFAULT_STORY_LIMIT, PRESET_STORAGE_KEY } from '@/components/news-reader/constants';

describe('news-reader/constants', () => {
  it('keeps stable defaults for reader bootstrapping and persistence', () => {
    expect(DEFAULT_OPML_URL).toBe('/feeds/kwin-city-news-feeds.opml');
    expect(DEFAULT_STORY_LIMIT).toBe(36);
    expect(PRESET_STORAGE_KEY).toContain('kwin-news-reader-presets');
  });
});
