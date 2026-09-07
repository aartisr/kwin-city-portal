/**
 * KWIN City — Global Search Index
 * ─────────────────────────────────
 * Thin public facade over the static search corpus, scoring logic, and UI
 * metadata. Keeping this file stable preserves existing imports throughout
 * the app while the underlying modules stay focused and composable.
 */

export { CATEGORY_COLORS, getPopularEntries, SEARCH_INDEX } from './search-index/data';
export { querySearchIndex } from './search-index/query';
export type { SearchCategory, SearchEntry } from './search-index/types';
