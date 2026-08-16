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
    expect(result.current.followedTopics).toEqual([]);
    expect(result.current.savedBriefs).toEqual({});
  });

  it('stores a bounded offline brief snapshot and followed topic without cluster objects', async () => {
    const { result } = renderHook(() => useReaderLibrary());
    const story = {
      title: 'KWIN policy update', link: 'https://example.com/story', summary: 'A policy update.',
      source: 'Example', sourceFeedUrl: 'https://example.com/rss', sourceTier: 'official' as const,
      provenance: 'direct-institutional' as const, isKwinRelated: true,
      authenticity: 'verified-feed' as const, publishedAt: '2026-08-15T10:00:00.000Z',
    };

    act(() => {
      result.current.toggleSaved(story.link, story);
      result.current.toggleFollowedTopic('policy, planning, or regulation');
    });

    expect(result.current.savedBriefs[story.link]).toMatchObject({ title: story.title, source: story.source });
    expect(result.current.followedTopics).toEqual(['policy, planning, or regulation']);
    expect(result.current.savedBriefs[story.link]).not.toHaveProperty('fullContent');

    await waitFor(() => {
      const persisted = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      expect(persisted.savedBriefs[story.link].title).toBe(story.title);
    });
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
