import { SEARCH_INDEX } from './data';
import type { SearchEntry } from './types';

function scoreEntry(entry: SearchEntry, query: string): number {
  const normalizedQuery = query.toLowerCase().trim();
  const words = normalizedQuery.split(/\s+/).filter(Boolean);

  if (!words.length) {
    return 0;
  }

  let score = 0;
  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const tags = entry.tags.join(' ').toLowerCase();

  for (const word of words) {
    if (title === word) {
      score += 10;
    } else if (title.includes(word)) {
      score += 7;
    }

    if (tags.includes(word)) {
      score += 4;
    }

    if (description.includes(word)) {
      score += 2;
    }

    if (entry.category.toLowerCase().includes(word)) {
      score += 3;
    }
  }

  return score;
}

export function querySearchIndex(query: string, limit = 20): SearchEntry[] {
  if (!query.trim()) {
    return [];
  }

  return SEARCH_INDEX.map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
