'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
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
  TimeWindow,
} from '@/components/news-reader/types';
import { useReaderPresets } from '@/components/news-reader/useReaderPresets';
import { formatDate, getDomain, isInTimeWindow } from '@/components/news-reader/utils';

export default function NewsReaderExperience() {
  const { locale } = useI18n();
  const l = useCallback(
    (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values),
    [locale],
  );
  const { presets, setPresets } = useReaderPresets();

  const [opmlUrl, setOpmlUrl] = useState(DEFAULT_OPML_URL);
  const [limit, setLimit] = useState(DEFAULT_STORY_LIMIT);
  const [topicQuery, setTopicQuery] = useState('kwin');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('all');
  const [presetName, setPresetName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReaderResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReaderItem | null>(null);

  useEffect(() => {
    if (!selectedItem) {
      return undefined;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedItem(null);
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedItem]);

  const sourceOptions = useMemo(() => {
    const sources = new Set<string>();
    for (const item of data?.items ?? []) {
      sources.add(item.source);
    }

    return ['all', ...Array.from(sources).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  const domainOptions = useMemo(() => {
    const domains = new Set<string>();
    for (const item of data?.items ?? []) {
      domains.add(getDomain(item.link));
    }

    return ['all', ...Array.from(domains).sort((a, b) => a.localeCompare(b))];
  }, [data]);

  const filteredItems = useMemo(() => {
    const items = data?.items ?? [];
    const normalizedTopic = topicQuery.trim().toLowerCase();

    return items.filter((item) => {
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
  }, [data, topicQuery, sourceFilter, domainFilter, timeWindow]);

  const trendingItems = useMemo(() => {
    const selected: ReaderItem[] = [];
    const usedSources = new Set<string>();

    for (const item of filteredItems) {
      if (!usedSources.has(item.source)) {
        selected.push(item);
        usedSources.add(item.source);
      }

      if (selected.length >= 6) {
        break;
      }
    }

    if (selected.length < 6) {
      for (const item of filteredItems) {
        if (!selected.includes(item)) {
          selected.push(item);
        }

        if (selected.length >= 6) {
          break;
        }
      }
    }

    return selected;
  }, [filteredItems]);

  const stats = useMemo<ReaderStatsItem[] | null>(() => {
    if (!data) {
      return null;
    }

    return [
      { label: l({ en: 'Feeds Loaded', kn: 'ಲೋಡ್ ಆದ ಫೀಡ್‌ಗಳು', hi: 'लोडेड फ़ीड्स', ta: 'ஏற்றப்பட்ட ஊட்டங்கள்' }), value: `${data.feedCount}` },
      { label: l({ en: 'Stories Visible', kn: 'ಕಾಣುವ ಕಥೆಗಳು', hi: 'दिखने वाली कहानियाँ', ta: 'காணப்படும் செய்திகள்' }), value: `${filteredItems.length}` },
      { label: l({ en: 'Stories Total', kn: 'ಒಟ್ಟು ಕಥೆಗಳು', hi: 'कुल कहानियाँ', ta: 'மொத்த செய்திகள்' }), value: `${data.itemCount}` },
      { label: l({ en: 'Refreshed', kn: 'ರಿಫ್ರೆಶ್', hi: 'रिफ्रेश', ta: 'புதுப்பிக்கப்பட்டது' }), value: formatDate(data.generatedAt, locale) },
    ];
  }, [data, filteredItems.length, l, locale]);

  const loadReader = async () => {
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
  };

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
    };

    setPresets((current) => [preset, ...current].slice(0, 12));
    setPresetName('');
  };

  const applyPreset = (preset: ReaderPreset) => {
    setOpmlUrl(preset.opmlUrl);
    setLimit(preset.limit);
  };

  const deletePreset = (id: string) => {
    setPresets((current) => current.filter((preset) => preset.id !== id));
  };

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
        onOpmlUrlChange={setOpmlUrl}
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
            <ReaderFilters
              l={l}
              topicQuery={topicQuery}
              sourceFilter={sourceFilter}
              domainFilter={domainFilter}
              timeWindow={timeWindow}
              sourceOptions={sourceOptions}
              domainOptions={domainOptions}
              onTopicQueryChange={setTopicQuery}
              onSourceFilterChange={setSourceFilter}
              onDomainFilterChange={setDomainFilter}
              onTimeWindowChange={setTimeWindow}
            />
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
            items={filteredItems}
            onSelectItem={setSelectedItem}
          />
        </div>
      </section>

      {selectedItem ? (
        <ReaderDrawer item={selectedItem} locale={locale} l={l} onClose={() => setSelectedItem(null)} />
      ) : null}
    </main>
  );
}
