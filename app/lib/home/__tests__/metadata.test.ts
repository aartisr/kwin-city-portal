import { describe, expect, it, vi } from 'vitest';
import { generateHomeMetadata } from '@/lib/home/metadata';

vi.mock('@/lib/i18n/server', () => ({
  getServerLocale: vi.fn(async () => 'en'),
  pickByLocale: (_locale: string, values: { en: string }) => values.en,
}));

describe('home/metadata', () => {
  it('generates canonical metadata for homepage', async () => {
    const metadata = await generateHomeMetadata();

    expect(metadata.title).toBeTruthy();
    expect(metadata.description).toBeTruthy();
    expect(metadata.alternates?.canonical).toBe('https://kwin-city.com');
  });
});
