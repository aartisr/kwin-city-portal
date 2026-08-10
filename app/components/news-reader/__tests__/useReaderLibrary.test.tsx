import React from 'react';
import { act, renderHook, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useReaderLibrary } from '@/components/news-reader/useReaderLibrary';

const STORAGE_KEY = 'kwin-news-reader-library-v1';

describe('news-reader/useReaderLibrary', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads stored library state from localStorage', async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      saved: ['story-1'],
      read: ['story-2'],
      mutedDomains: ['example.com'],
    }));

    const { result } = renderHook(() => useReaderLibrary());

    await waitFor(() => {
      expect(result.current.saved).toEqual(['story-1']);
    });
    expect(result.current.read).toEqual(['story-2']);
    expect(result.current.mutedDomains).toEqual(['example.com']);
  });

  it('toggles saved and muted domains and marks read once', async () => {
    const { result } = renderHook(() => useReaderLibrary());

    act(() => {
      result.current.toggleSaved('story-1');
      result.current.toggleSaved('story-2');
      result.current.toggleSaved('story-1');
      result.current.markRead('story-2');
      result.current.markRead('story-2');
      result.current.toggleMutedDomain('example.com');
      result.current.toggleMutedDomain('example.com');
      result.current.toggleMutedDomain('domain.io');
    });

    expect(result.current.saved).toEqual(['story-2']);
    expect(result.current.read).toEqual(['story-2']);
    expect(result.current.mutedDomains).toEqual(['domain.io']);

    await waitFor(() => {
      const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      expect(persisted.saved).toEqual(['story-2']);
      expect(persisted.read).toEqual(['story-2']);
      expect(persisted.mutedDomains).toEqual(['domain.io']);
    });
  });

  it('ignores malformed storage payload and falls back to defaults', async () => {
    localStorage.setItem(STORAGE_KEY, '{malformed-json');

    const { result } = renderHook(() => useReaderLibrary());

    await waitFor(() => {
      expect(result.current.saved).toEqual([]);
    });
    expect(result.current.read).toEqual([]);
    expect(result.current.mutedDomains).toEqual([]);
  });
});
