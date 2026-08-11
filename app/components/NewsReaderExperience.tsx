'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';
import { DEFAULT_OPML_URL, DEFAULT_STORY_LIMIT } from '@/components/news-reader/constants';
import { ReaderDrawer } from '@/components/news-reader/ReaderDrawer';
import { ReaderFilters } from '@/components/news-reader/ReaderFilters';
import { ReaderHero } from '@/components/news-reader/ReaderHero';
import { ReaderResults } from '@/components/news-reader/ReaderResults';
import { TrendingSection } from '@/components/news-reader/TrendingSection';
import type {
  ReaderItem,
  ReaderPreset,
  ReaderResponse,
  ReaderStatsItem,
  ReaderSortMode,
  TimeWindow,
} from '@/components/news-reader/types';
import { useReaderPresets } from '@/components/news-reader/useReaderPresets';
import { formatDate, getDomain, isInTimeWindow } from '@/components/news-reader/utils';
import { LAST_READER_STATE_STORAGE_KEY } from '@/components/news-reader/constants';
import { clusterReaderItems, sortReaderClusters } from '@/components/news-reader/intelligence';
import { useReaderLibrary } from '@/components/news-reader/useReaderLibrary';

function normalizeTrendingText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function getTrendingFingerprint(item: ReaderItem): string {
  const title = normalizeTrendingText(item.title);
  const domain = getDomain(item.link);
  const publishedDay = item.publishedAt ? item.publishedAt.slice(0, 10) : 'unknown-day';

  return `${title}::${domain}::${publishedDay}`;
}

function dedupeReaderItems(items: ReaderItem[]): ReaderItem[] {
  const seenFingerprints = new Set<string>();
  const uniqueItems: ReaderItem[] = [];

  for (const item of items) {
    const fingerprint = getTrendingFingerprint(item);
    if (seenFingerprints.has(fingerprint)) {
      continue;
    }

    seenFingerprints.add(fingerprint);
    uniqueItems.push(item);
  }

  return uniqueItems;
}

function readLastReaderState() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(LAST_READER_STATE_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as { opmlUrl?: unknown; limit?: unknown };
    const opmlUrl = typeof parsed.opmlUrl === 'string' && parsed.opmlUrl.trim() ? parsed.opmlUrl : null;
    const limit = typeof parsed.limit === 'number' && Number.isFinite(parsed.limit) ? parsed.limit : null;

    if (!opmlUrl || !limit) {
      return null;
    }

    return { opmlUrl, limit };
  } catch {
    return null;
  }
}

function persistLastReaderState(opmlUrl: string, limit: number) {
  try {
    window.localStorage.setItem(
      LAST_READER_STATE_STORAGE_KEY,
      JSON.stringify({ opmlUrl, limit }),
    );
  } catch {
    // Ignore storage write failures.
  }
}

export default function NewsReaderExperience() {
  const { locale } = useI18n();
  const l = useCallback(
    (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values),
    [locale],
  );
  const { presets, setPresets } = useReaderPresets();
  const library = useReaderLibrary();
  const hasAutoLoaded = useRef(false);
  const lastReaderState = readLastReaderState();

  const [opmlUrl, setOpmlUrl] = useState(lastReaderState?.opmlUrl ?? DEFAULT_OPML_URL);
  const [limit, setLimit] = useState(lastReaderState?.limit ?? DEFAULT_STORY_LIMIT);
  // Start broad: the reader is a regional intelligence stream. A pre-filled
  // KWIN query hid most of the reviewed feed inventory and clustered the few
  // remaining matching reports into only a couple of visible cards.
  const [topicQuery, setTopicQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [sourceMode, setSourceMode] = useState<'all' | 'official' | 'primary'>('all');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('all');
  const [sort, setSort] = useState<ReaderSortMode>('significance');
  const [presetName, setPresetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReaderResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReaderItem | null>(null);

  const sourceOptions = useMemo(() => {
    const sources = new Set<string>();
    for (const item of data?.items ?? []) {
      if (sourceMode === 'primary' && item.sourceTier !== 'primary') {
        continue;
      }

      if (sourceMode === 'official' && item.sourceTier === 'contextual') {
        continue;
      }

      sources.add(item.source);
    }

    return ['all', ...Array.from(sources).sort((a, b) => a.localeCompare(b))];
  }, [data, sourceMode]);

  const domainOptions = useMemo(() => {
    const domains = new Set<string>();
    for (const item of data?.items ?? []) {
      if (sourceMode === 'primary' && item.sourceTier !== 'primary') {
        continue;
      }

      if (sourceMode === 'official' && item.sourceTier === 'contextual') {
        continue;
      }

      domains.add(getDomain(item.link));
    }

    return ['all', ...Array.from(domains).sort((a, b) => a.localeCompare(b))];
  }, [data, sourceMode]);

  const sourceScopedItems = useMemo(() => {
    const items = data?.items ?? [];

    return items.filter((item) => {
      if (sourceMode === 'primary') {
        return item.sourceTier === 'primary';
      }

      if (sourceMode === 'official') {
        return item.sourceTier !== 'contextual';
      }

      return true;
    });
  }, [data, sourceMode]);

  const filteredItems = useMemo(() => {
    const items = sourceScopedItems;
    const normalizedTopic = topicQuery.trim().toLowerCase();

    const matchedItems = items.filter((item) => {
      if (normalizedTopic) {
        const haystack = `${item.title} ${item.summary} ${item.source}`.toLowerCase();
        if (!haystack.includes(normalizedTopic)) {
          return false;
        }
      }

      if (sourceFilter !== 'all' && item.source !== sourceFilter) {
        return false;
      }

      if (domainFilter !== 'all' && getDomain(item.link) !== domainFilter) {
        return false;
      }

      return isInTimeWindow(item.publishedAt, timeWindow);
    });

    return dedupeReaderItems(matchedItems).filter((item) => !library.mutedDomains.includes(getDomain(item.originalLink || item.link)));
  }, [sourceScopedItems, topicQuery, sourceFilter, domainFilter, timeWindow, library.mutedDomains]);

  const clusters = useMemo(
    () => sortReaderClusters(clusterReaderItems(filteredItems), sort),
    [filteredItems, sort],
  );

  useEffect(() => {
    if (!selectedItem) return undefined;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedItem(null);
      else if (event.key.toLowerCase() === 's' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault(); library.toggleSaved(selectedItem.link);
      } else if (event.key.toLowerCase() === 'm' && !event.metaKey && !event.ctrlKey) {
        event.preventDefault(); library.toggleMutedDomain(getDomain(selectedItem.originalLink || selectedItem.link)); setSelectedItem(null);
      } else if (event.key === 'j' || event.key === 'k') {
        event.preventDefault();
        const items = clusters.map((cluster) => cluster.representative);
        const next = items[items.findIndex((item) => item.link === selectedItem.link) + (event.key === 'j' ? 1 : -1)];
        if (next) setSelectedItem(next);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [clusters, library, selectedItem]);

  const trendingItems = useMemo(() => {
    const selected: ReaderItem[] = [];
    const usedSources = new Set<string>();

    for (const item of clusters.map((cluster) => cluster.representative)) {
      if (!usedSources.has(item.source)) {
        selected.push(item);
        usedSources.add(item.source);
      }

      if (selected.length >= 6) {
        break;
      }
    }

    if (selected.length < 6) {
      for (const item of clusters.map((cluster) => cluster.representative)) {
        if (!selected.includes(item)) {
          selected.push(item);
        }

        if (selected.length >= 6) {
          break;
        }
      }
    }

    return selected;
  }, [clusters]);

  const stats = useMemo<ReaderStatsItem[] | null>(() => {
    if (!data) {
      return null;
    }

    return [
      { label: l({ en: 'Feeds Loaded', kn: 'ಲೋಡ್ ಆದ ಫೀಡ್‌ಗಳು', hi: 'लोडेड फ़ीड्स', ta: 'ஏற்றப்பட்ட ஊட்டங்கள்' }), value: `${data.feedCount}` },
      { label: l({ en: 'Story Clusters', kn: 'ಕಥೆ ಕ್ಲಸ್ಟರ್‌ಗಳು', hi: 'स्टोरी क्लस्टर', ta: 'செய்தி குழுக்கள்' }), value: `${clusters.length}` },
      { label: l({ en: 'Stories Total', kn: 'ಒಟ್ಟು ಕಥೆಗಳು', hi: 'कुल कहानियाँ', ta: 'மொத்த செய்திகள்' }), value: `${data.itemCount}` },
      { label: l({ en: 'Refreshed', kn: 'ರಿಫ್ರೆಶ್', hi: 'रिफ्रेश', ta: 'புதுப்பிக்கப்பட்டது' }), value: formatDate(data.generatedAt, locale) },
    ];
  }, [clusters.length, data, l, locale]);

  const loadReader = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({ opmlUrl, limit: String(limit) });
      const response = await fetch(`/api/news-reader?${params.toString()}`, { cache: 'no-store' });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(
          payload.error
            || l({ en: 'Reader failed to load.', kn: 'ರೀಡರ್ ಲೋಡ್ ಆಗಲಿಲ್ಲ.', hi: 'रीडर लोड नहीं हो सका।', ta: 'ரீடர் ஏற்றப்படவில்லை.' }),
        );
      }

      setData(payload as ReaderResponse);
      setSourceFilter('all');
      setDomainFilter('all');
      setSourceMode('all');
      setTimeWindow('all');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : l({ en: 'Reader failed to load.', kn: 'ರೀಡರ್ ಲೋಡ್ ಆಗಲಿಲ್ಲ.', hi: 'रीडर लोड नहीं हो सका।', ta: 'ரீடர் ஏற்றப்படவில்லை.' }),
      );
    } finally {
      setIsLoading(false);
    }
  }, [limit, l, opmlUrl]);

  const savePreset = () => {
    const trimmed = presetName.trim();
    if (!trimmed) {
      return;
    }

    const preset: ReaderPreset = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      name: trimmed,
      opmlUrl,
      limit,
      topicQuery,
      sourceMode,
      timeWindow,
      sort,
    };

    setPresets((current) => [preset, ...current].slice(0, 12));
    setPresetName('');
  };

  const applyPreset = (preset: ReaderPreset) => {
    setOpmlUrl(preset.opmlUrl);
    setLimit(preset.limit);
    setTopicQuery(preset.topicQuery ?? '');
    setSourceMode(preset.sourceMode ?? 'all');
    setTimeWindow(preset.timeWindow ?? 'all');
    setSort(preset.sort ?? 'significance');
  };

  const handleSourceModeChange = (value: 'all' | 'official' | 'primary') => {
    setSourceMode(value);
    setSourceFilter('all');
    setDomainFilter('all');
  };

  const deletePreset = (id: string) => {
    setPresets((current) => current.filter((preset) => preset.id !== id));
  };

  useEffect(() => {
    persistLastReaderState(opmlUrl, limit);
  }, [opmlUrl, limit]);

  useEffect(() => {
    if (hasAutoLoaded.current) {
      return;
    }

    hasAutoLoaded.current = true;
    void loadReader();
  }, [loadReader]);

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f5f7fb_100%)]">
      <ReaderHero
        l={l}
        opmlUrl={opmlUrl}
        limit={limit}
        isLoading={isLoading}
        presetName={presetName}
        presets={presets}
        stats={stats}
        cache={data?.cache}
        onLimitChange={setLimit}
        onPresetNameChange={setPresetName}
        onLoadReader={loadReader}
        onUseDefaultOpml={() => setOpmlUrl(DEFAULT_OPML_URL)}
        onShowAllTopics={() => setTopicQuery('')}
        onSavePreset={savePreset}
        onApplyPreset={applyPreset}
        onDeletePreset={deletePreset}
      />

      <section className="py-10 md:py-12">
        <div className="container">
          {data ? (
            <>
            <ReaderFilters
              l={l}
              topicQuery={topicQuery}
              sourceFilter={sourceFilter}
              domainFilter={domainFilter}
              sourceMode={sourceMode}
              timeWindow={timeWindow}
              sourceOptions={sourceOptions}
              domainOptions={domainOptions}
              onTopicQueryChange={setTopicQuery}
              onSourceFilterChange={setSourceFilter}
              onDomainFilterChange={setDomainFilter}
              onSourceModeChange={handleSourceModeChange}
              onTimeWindowChange={setTimeWindow}
            />
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm">
              <label className="flex items-center gap-2 font-semibold text-slate-700">Rank by
                <select value={sort} onChange={(event) => setSort(event.target.value as ReaderSortMode)} className="rounded-lg border border-slate-300 bg-white px-2 py-1 font-normal">
                  <option value="significance">Significance</option><option value="newest">Newest</option><option value="source-breadth">Source breadth</option>
                </select>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">{library.saved.length} saved · {library.read.length} read</span>
                <button onClick={() => {
                  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), saved: library.saved, clusters }, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob); const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'kwin-reader-export.json'; anchor.click(); URL.revokeObjectURL(url);
                }} className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-slate-100">Export workspace</button>
              </div>
            </div>
            </>
          ) : null}

          <TrendingSection
            l={l}
            locale={locale}
            items={!isLoading ? trendingItems : []}
            onSelectItem={setSelectedItem}
          />

          <ReaderResults
            l={l}
            locale={locale}
            isLoading={isLoading}
            error={error}
            hasLoadedData={Boolean(data)}
            items={clusters.map((cluster) => ({ ...cluster.representative, cluster }))}
            savedIds={library.saved}
            readIds={library.read}
            onSelectItem={(item) => { library.markRead(item.link); setSelectedItem(item); }}
            onToggleSaved={library.toggleSaved}
            onToggleMutedDomain={library.toggleMutedDomain}
          />
        </div>
      </section>

      {selectedItem ? (
        <ReaderDrawer item={selectedItem} locale={locale} l={l} onClose={() => setSelectedItem(null)} />
      ) : null}
    </main>
  );
}
