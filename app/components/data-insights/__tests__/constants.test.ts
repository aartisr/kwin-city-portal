import { describe, expect, it } from 'vitest';
import { ALL_TAGS, LOCAL_DATA } from '@/components/data-insights/constants';

describe('data-insights/constants', () => {
  it('exposes the local fallback datasets used by the chart hub', () => {
    expect(LOCAL_DATA['kwin-sectors']).toHaveLength(5);
    expect(LOCAL_DATA['kwin-phases']).toHaveLength(6);
  });

  it('builds a filter list that includes All and KWIN Plan tags', () => {
    expect(ALL_TAGS[0]).toBe('All');
    expect(ALL_TAGS).toContain('KWIN Plan');
  });
});
