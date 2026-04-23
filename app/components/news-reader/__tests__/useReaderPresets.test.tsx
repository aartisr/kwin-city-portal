import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { PRESET_STORAGE_KEY } from '@/components/news-reader/constants';
import { useReaderPresets } from '@/components/news-reader/useReaderPresets';

describe('news-reader/useReaderPresets', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('loads saved presets from localStorage', async () => {
    localStorage.setItem(
      PRESET_STORAGE_KEY,
      JSON.stringify([{ id: 'preset-1', name: 'Default', opmlUrl: '/feeds/default.opml', limit: 24 }]),
    );

    const { result } = renderHook(() => useReaderPresets());

    await waitFor(() => {
      expect(result.current.presets).toHaveLength(1);
    });
  });

  it('persists preset changes back to localStorage', async () => {
    const { result } = renderHook(() => useReaderPresets());

    act(() => {
      result.current.setPresets([{ id: 'preset-2', name: 'Investor', opmlUrl: '/feeds/investor.opml', limit: 48 }]);
    });

    await waitFor(() => {
      expect(JSON.parse(localStorage.getItem(PRESET_STORAGE_KEY) || '[]')).toEqual([
        { id: 'preset-2', name: 'Investor', opmlUrl: '/feeds/investor.opml', limit: 48 },
      ]);
    });
  });
});
