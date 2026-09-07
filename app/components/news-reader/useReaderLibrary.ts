'use client';

import { useEffect, useState } from 'react';
import type { ReaderItem } from './types';

const STORAGE_KEY = 'kwin-news-reader-library-v1';
export type SavedReaderBrief = Pick<ReaderItem, 'title' | 'link' | 'summary' | 'summarySource' | 'source' | 'sourceTier' | 'provenance' | 'publishedAt' | 'kwinRelevanceReasons'> & { savedAt: string };
type Library = { saved: string[]; read: string[]; mutedDomains: string[]; followedTopics: string[]; savedBriefs: Record<string, SavedReaderBrief> };
const EMPTY: Library = { saved: [], read: [], mutedDomains: [], followedTopics: [], savedBriefs: {} };

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
}

export function useReaderLibrary() {
  const [library, setLibrary] = useState<Library>(EMPTY);
  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (parsed && Array.isArray(parsed.saved) && Array.isArray(parsed.read) && Array.isArray(parsed.mutedDomains)) {
        setLibrary({
          ...EMPTY,
          ...parsed,
          followedTopics: Array.isArray(parsed.followedTopics) ? parsed.followedTopics : [],
          savedBriefs: parsed.savedBriefs && typeof parsed.savedBriefs === 'object' ? parsed.savedBriefs : {},
        });
      }
    } catch { /* Storage is an enhancement, not a dependency. */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(library)); } catch { /* noop */ }
  }, [library]);
  return {
    ...library,
    toggleSaved: (id: string, item?: ReaderItem) => setLibrary((state) => {
      const isRemoving = state.saved.includes(id);
      const savedBriefs = { ...state.savedBriefs };
      if (isRemoving) delete savedBriefs[id];
      else if (item) {
        savedBriefs[id] = {
          title: item.title, link: item.link, summary: item.summary, summarySource: item.summarySource,
          source: item.source, sourceTier: item.sourceTier, provenance: item.provenance,
          publishedAt: item.publishedAt, kwinRelevanceReasons: item.kwinRelevanceReasons,
          savedAt: new Date().toISOString(),
        };
      }
      return { ...state, saved: toggle(state.saved, id).slice(-50), savedBriefs };
    }),
    markRead: (id: string) => setLibrary((state) => state.read.includes(id) ? state : ({ ...state, read: [...state.read, id] })),
    toggleMutedDomain: (domain: string) => setLibrary((state) => ({ ...state, mutedDomains: toggle(state.mutedDomains, domain) })),
    toggleFollowedTopic: (topic: string) => setLibrary((state) => ({ ...state, followedTopics: toggle(state.followedTopics, topic) })),
  };
}
