'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'kwin-news-reader-library-v1';
type Library = { saved: string[]; read: string[]; mutedDomains: string[] };
const EMPTY: Library = { saved: [], read: [], mutedDomains: [] };

function toggle(values: string[], value: string) {
  return values.includes(value) ? values.filter((entry) => entry !== value) : [...values, value];
}

export function useReaderLibrary() {
  const [library, setLibrary] = useState<Library>(EMPTY);
  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (parsed && Array.isArray(parsed.saved) && Array.isArray(parsed.read) && Array.isArray(parsed.mutedDomains)) setLibrary(parsed);
    } catch { /* Storage is an enhancement, not a dependency. */ }
  }, []);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(library)); } catch { /* noop */ }
  }, [library]);
  return {
    ...library,
    toggleSaved: (id: string) => setLibrary((state) => ({ ...state, saved: toggle(state.saved, id) })),
    markRead: (id: string) => setLibrary((state) => state.read.includes(id) ? state : ({ ...state, read: [...state.read, id] })),
    toggleMutedDomain: (domain: string) => setLibrary((state) => ({ ...state, mutedDomains: toggle(state.mutedDomains, domain) })),
  };
}
