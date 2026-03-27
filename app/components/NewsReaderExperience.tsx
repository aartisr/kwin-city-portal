'use client';

import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

type ReaderItem = {
  title: string;
  link: string;
  summary: string;
  fullContent?: string;
  source: string;
  sourceFeedUrl: string;
  publishedAt: string | null;
};

type ReaderResponse = {
  opmlUrl: string;
  feedCount: number;
  itemCount: number;
  generatedAt: string;
  items: ReaderItem[];
  cache?: {
    hit: boolean;
    ttlMs: number;
  };
};

type ReaderPreset = {
  id: string;
  name: string;
  opmlUrl: string;
  limit: number;
};

const PRESET_STORAGE_KEY = 'kwin-news-reader-presets-v1';

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return 'unknown-source';
  }
}

function isInTimeWindow(value: string | null, window: 'all' | '24h' | '7d' | '30d'): boolean {
  if (window === 'all') {
    return true;
  }
  if (!value) {
    return false;
  }
  const published = new Date(value).getTime();
  if (Number.isNaN(published)) {
    return false;
  }
  const now = Date.now();
  const diff = now - published;
  if (window === '24h') {
    return diff <= 24 * 60 * 60 * 1000;
  }
  if (window === '7d') {
    return diff <= 7 * 24 * 60 * 60 * 1000;
  }
  return diff <= 30 * 24 * 60 * 60 * 1000;
}

function formatDate(value: string | null, locale: 'en' | 'kn' | 'hi' | 'ta' = 'en'): string {
  if (!value) {
    return locale === 'kn' ? 'ದಿನಾಂಕ ಲಭ್ಯವಿಲ್ಲ' : locale === 'hi' ? 'तिथि उपलब्ध नहीं' : locale === 'ta' ? 'தேதி கிடைக்கவில்லை' : 'Date unavailable';
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === 'kn' ? 'ದಿನಾಂಕ ಲಭ್ಯವಿಲ್ಲ' : locale === 'hi' ? 'तिथि उपलब्ध नहीं' : locale === 'ta' ? 'தேதி கிடைக்கவில்லை' : 'Date unavailable';
  }
  const intlLocale = locale === 'kn' ? 'kn-IN' : locale === 'hi' ? 'hi-IN' : locale === 'ta' ? 'ta-IN' : 'en-IN';
  return new Intl.DateTimeFormat(intlLocale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export default function NewsReaderExperience() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const [opmlUrl, setOpmlUrl] = useState('/feeds/kwin-city-news-feeds.opml');
  const [limit, setLimit] = useState(36);
  const [topicQuery, setTopicQuery] = useState('kwin');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [domainFilter, setDomainFilter] = useState('all');
  const [timeWindow, setTimeWindow] = useState<'all' | '24h' | '7d' | '30d'>('all');
  const [presetName, setPresetName] = useState('');
  const [presets, setPresets] = useState<ReaderPreset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ReaderResponse | null>(null);
  const [selectedItem, setSelectedItem] = useState<ReaderItem | null>(null);

  useEffect(() => {
    if (!selectedItem) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedItem(null);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [selectedItem]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(PRESET_STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw) as ReaderPreset[];
      if (Array.isArray(parsed)) {
        setPresets(parsed);
      }
    } catch {
      // Ignore invalid storage payloads
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presets));
    } catch {
      // Ignore storage write failures
    }
  }, [presets]);

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
      if (!isInTimeWindow(item.publishedAt, timeWindow)) {
        return false;
      }
      return true;
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

  const stats = useMemo(() => {
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
      const params = new URLSearchParams({
        opmlUrl,
        limit: String(limit),
      });
      const response = await fetch(`/api/news-reader?${params.toString()}`, { cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || l({ en: 'Reader failed to load.', kn: 'ರೀಡರ್ ಲೋಡ್ ಆಗಲಿಲ್ಲ.', hi: 'रीडर लोड नहीं हो सका।', ta: 'ரீடர் ஏற்றப்படவில்லை.' }));
      }
      setData(payload as ReaderResponse);
      setSourceFilter('all');
      setDomainFilter('all');
      setTimeWindow('all');
    } catch (err) {
      const message = err instanceof Error ? err.message : l({ en: 'Reader failed to load.', kn: 'ರೀಡರ್ ಲೋಡ್ ಆಗಲಿಲ್ಲ.', hi: 'रीडर लोड नहीं हो सका।', ta: 'ரீடர் ஏற்றப்படவில்லை.' });
      setError(message);
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
    setPresets((curr) => [preset, ...curr].slice(0, 12));
    setPresetName('');
  };

  const applyPreset = (preset: ReaderPreset) => {
    setOpmlUrl(preset.opmlUrl);
    setLimit(preset.limit);
  };

  const deletePreset = (id: string) => {
    setPresets((curr) => curr.filter((p) => p.id !== id));
  };

  return (
    <main className="bg-[linear-gradient(180deg,#f8fafc_0%,#ffffff_38%,#f5f7fb_100%)]">
      <section className="pt-28 pb-12 border-b border-slate-200">
        <div className="container">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-700 mb-4">{l({ en: 'News Reader', kn: 'ಸುದ್ದಿ ಓದುಗ', hi: 'न्यूज़ रीडर', ta: 'செய்தி வாசிப்பான்' })}</p>
          <div className="rounded-3xl border border-slate-200 bg-[radial-gradient(1200px_520px_at_0%_0%,rgba(14,165,233,0.14),transparent_60%),radial-gradient(900px_420px_at_100%_12%,rgba(245,158,11,0.16),transparent_60%),linear-gradient(180deg,#ffffff,#f8fafc)] p-8 md:p-12 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-700 mb-4">{l({ en: 'On-Demand Reader', kn: 'ಆನ್-ಡಿಮ್ಯಾಂಡ್ ರೀಡರ್', hi: 'ऑन-डिमांड रीडर', ta: 'தேவைப்படி வாசிப்பான்' })}</p>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight max-w-5xl">
              {l({ en: 'OPML News Reader', kn: 'OPML ಸುದ್ದಿ ರೀಡರ್', hi: 'OPML न्यूज़ रीडर', ta: 'OPML செய்தி வாசிப்பான்' })}
            </h1>
            <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
              {l({ en: 'Enter any OPML URL, load it instantly, and read a concise summary-first stream. Every story links directly to the original publication.', kn: 'ಯಾವುದೇ OPML URL ನಮೂದಿಸಿ, ತಕ್ಷಣ ಲೋಡ್ ಮಾಡಿ, ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ ಆಧಾರಿತ ಓದನ್ನು ಪಡೆಯಿರಿ. ಪ್ರತಿಯೊಂದು ಕಥೆಯೂ ಮೂಲ ಪ್ರಕಟಣೆಗೆ ನೇರ ಲಿಂಕ್ ಹೊಂದಿರುತ್ತದೆ.', hi: 'कोई भी OPML URL दर्ज करें, तुरंत लोड करें और संक्षिप्त सारांश-आधारित स्ट्रीम पढ़ें। हर कहानी मूल प्रकाशन से सीधे जुड़ती है।', ta: 'எந்த OPML URL-யையும் உள்ளிட்டு உடனே ஏற்றி, சுருக்கம்-முன்னுரிமை ஓட்டத்தில் படியுங்கள். ஒவ்வொரு செய்தியும் மூல வெளியீட்டிற்கு நேரடியாக இணைகிறது.' })}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">OPML URL</span>
                  <input
                    value={opmlUrl}
                    onChange={(e) => setOpmlUrl(e.target.value)}
                    className="h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200"
                    placeholder="https://example.com/my-feeds.opml"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Stories</span>
                  <select
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value))}
                    className="h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200"
                  >
                    <option value={24}>24</option>
                    <option value={36}>36</option>
                    <option value={48}>48</option>
                    <option value={72}>72</option>
                  </select>
                </label>
                <button
                  onClick={loadReader}
                  disabled={isLoading}
                  className="h-11 self-end rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
                >
                  {isLoading ? l({ en: 'Loading...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', hi: 'लोड हो रहा है...', ta: 'ஏற்றப்படுகிறது...' }) : l({ en: 'Load Reader', kn: 'ರೀಡರ್ ಲೋಡ್ ಮಾಡಿ', hi: 'रीडर लोड करें', ta: 'ரீடரை ஏற்று' })}
                </button>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-cyan-800">
                  {l({ en: 'Default topic: KWIN', kn: 'ಡೀಫಾಲ್ಟ್ ವಿಷಯ: KWIN', hi: 'डिफ़ॉल्ट विषय: KWIN', ta: 'இயல்புநிலை தலைப்பு: KWIN' })}
                </span>
                <button
                  onClick={() => setOpmlUrl('/feeds/kwin-city-news-feeds.opml')}
                  className="rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  {l({ en: 'Use KWIN Default OPML', kn: 'KWIN ಡೀಫಾಲ್ಟ್ OPML ಬಳಸಿ', hi: 'KWIN डिफ़ॉल्ट OPML उपयोग करें', ta: 'KWIN இயல்புநிலை OPML பயன்படுத்தவும்' })}
                </button>
                <button
                  onClick={() => setTopicQuery('')}
                  className="rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  {l({ en: 'Show All Topics', kn: 'ಎಲ್ಲಾ ವಿಷಯಗಳನ್ನು ತೋರಿಸಿ', hi: 'सभी विषय दिखाएँ', ta: 'அனைத்து தலைப்புகளையும் காண்பி' })}
                </button>
                <span className="text-slate-300">|</span>
                <div className="flex items-center gap-2">
                  <input
                    value={presetName}
                    onChange={(e) => setPresetName(e.target.value)}
                    className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700"
                    placeholder={l({ en: 'Preset name', kn: 'ಪ್ರಿಸೆಟ್ ಹೆಸರು', hi: 'प्रीसेट नाम', ta: 'முன்னமைவு பெயர்' })}
                  />
                  <button
                    onClick={savePreset}
                    className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                  >
                    {l({ en: 'Save Preset', kn: 'ಪ್ರಿಸೆಟ್ ಉಳಿಸಿ', hi: 'प्रीसेट सहेजें', ta: 'முன்னமைவை சேமிக்கவும்' })}
                  </button>
                </div>
                <span>{l({ en: 'Summary-only cards, linked to original source.', kn: 'ಮೂಲ ಮೂಲಕ್ಕೆ ಲಿಂಕ್ ಹೊಂದಿರುವ ಸಾರಾಂಶ ಕಾರ್ಡ್‌ಗಳು.', hi: 'केवल सारांश कार्ड, मूल स्रोत से लिंक सहित।', ta: 'சுருக்க அட்டைகள் மட்டும், மூலத்துடன் இணைக்கப்பட்டவை.' })}</span>
              </div>

              {presets.length ? (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {presets.map((preset) => (
                    <div key={preset.id} className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs">
                      <button onClick={() => applyPreset(preset)} className="text-slate-700 hover:text-slate-900">
                        {preset.name}
                      </button>
                      <button onClick={() => deletePreset(preset.id)} className="text-slate-400 hover:text-rose-600" aria-label="Delete preset">
                        x
                      </button>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {stats ? (
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
                {stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-[11px] uppercase tracking-[0.1em] text-slate-500">{s.label}</p>
                    <p className="mt-1 text-sm font-bold text-slate-900">{s.value}</p>
                  </div>
                ))}
              </div>
            ) : null}

            {data?.cache ? (
              <p className="mt-3 text-xs text-slate-500">
                {data.cache.hit ? l({ en: 'Served from cache for faster loading.', kn: 'ವೇಗದ ಲೋಡ್‌ಗಾಗಿ ಕ್ಯಾಶ್‌ನಿಂದ ನೀಡಲಾಗಿದೆ.', hi: 'तेज़ लोडिंग के लिए कैश से परोसा गया।', ta: 'வேகமான ஏற்றத்திற்காக கேஷிலிருந்து வழங்கப்பட்டது.' }) : l({ en: 'Fresh fetch completed.', kn: 'ಹೊಸ ಫೆಚ್ ಪೂರ್ಣಗೊಂಡಿದೆ.', hi: 'नया फ़ेच पूरा हुआ।', ta: 'புதிய பெறுதல் முடிந்தது.' })}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="container">
          {data ? (
            <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">{l({ en: 'Topic Keyword', kn: 'ವಿಷಯ ಕೀವರ್ಡ್', hi: 'विषय कीवर्ड', ta: 'தலைப்பு முக்கியச்சொல்' })}</span>
                  <input
                    value={topicQuery}
                    onChange={(e) => setTopicQuery(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                    placeholder="kwin"
                  />
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">{l({ en: 'Source', kn: 'ಮೂಲ', hi: 'स्रोत', ta: 'மூலம்' })}</span>
                  <select
                    value={sourceFilter}
                    onChange={(e) => setSourceFilter(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                  >
                    {sourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source === 'all' ? l({ en: 'All Sources', kn: 'ಎಲ್ಲಾ ಮೂಲಗಳು', hi: 'सभी स्रोत', ta: 'அனைத்து மூலங்கள்' }) : source}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">{l({ en: 'Domain', kn: 'ಡೊಮೇನ್', hi: 'डोमेन', ta: 'டொமைன்' })}</span>
                  <select
                    value={domainFilter}
                    onChange={(e) => setDomainFilter(e.target.value)}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                  >
                    {domainOptions.map((domain) => (
                      <option key={domain} value={domain}>
                        {domain === 'all' ? l({ en: 'All Domains', kn: 'ಎಲ್ಲಾ ಡೊಮೇನ್‌ಗಳು', hi: 'सभी डोमेन', ta: 'அனைத்து டொமைன்கள்' }) : domain}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">{l({ en: 'Published Within', kn: 'ಈ ಅವಧಿಯಲ್ಲಿ ಪ್ರಕಟಿತ', hi: 'इस अवधि में प्रकाशित', ta: 'இந்த காலத்தில் வெளியிடப்பட்டது' })}</span>
                  <select
                    value={timeWindow}
                    onChange={(e) => setTimeWindow(e.target.value as 'all' | '24h' | '7d' | '30d')}
                    className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
                  >
                    <option value="all">{l({ en: 'Any time', kn: 'ಯಾವಾಗ ಬೇಕಾದರೂ', hi: 'कभी भी', ta: 'எந்த நேரமும்' })}</option>
                    <option value="24h">{l({ en: 'Last 24 hours', kn: 'ಕಳೆದ 24 ಗಂಟೆಗಳು', hi: 'पिछले 24 घंटे', ta: 'கடைசி 24 மணி நேரம்' })}</option>
                    <option value="7d">{l({ en: 'Last 7 days', kn: 'ಕಳೆದ 7 ದಿನಗಳು', hi: 'पिछले 7 दिन', ta: 'கடைசி 7 நாட்கள்' })}</option>
                    <option value="30d">{l({ en: 'Last 30 days', kn: 'ಕಳೆದ 30 ದಿನಗಳು', hi: 'पिछले 30 दिन', ta: 'கடைசி 30 நாட்கள்' })}</option>
                  </select>
                </label>
              </div>
            </div>
          ) : null}

          {error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
              {error}
            </div>
          ) : null}

          {!isLoading && trendingItems.length > 0 ? (
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-[0_10px_26px_rgba(15,23,42,0.05)]">
              <div className="flex items-center justify-between gap-3 mb-3">
                <h2 className="text-sm font-extrabold tracking-[0.12em] uppercase text-slate-900">{l({ en: 'Trending Now', kn: 'ಈಗ ಟ್ರೆಂಡಿಂಗ್', hi: 'अभी ट्रेंडिंग', ta: 'இப்போது பிரபலமானவை' })}</h2>
                <span className="text-xs text-slate-500">{l({ en: 'Source-diverse quick scan', kn: 'ವೈವಿಧ್ಯಮಯ ಮೂಲಗಳ ತ್ವರಿತ ಸ್ಕ್ಯಾನ್', hi: 'विविध स्रोतों का त्वरित स्कैन', ta: 'பல்வேறு மூலங்களின் விரைவு பார்வை' })}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {trendingItems.map((item) => (
                  <button
                    key={`trending-${item.link}`}
                    onClick={() => setSelectedItem(item)}
                    className="group rounded-xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-3 hover:border-cyan-300 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-700">{item.source}</span>
                      <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt, locale)}</span>
                    </div>
                    <p className="text-sm font-bold leading-6 text-slate-900 line-clamp-2 group-hover:text-slate-700">
                      {item.title}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          ) : null}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {Array.from({ length: 9 }).map((_, idx) => (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
                  <div className="h-3 w-24 rounded bg-slate-200" />
                  <div className="mt-3 h-5 w-11/12 rounded bg-slate-200" />
                  <div className="mt-2 h-5 w-4/5 rounded bg-slate-200" />
                  <div className="mt-4 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-full rounded bg-slate-200" />
                  <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && filteredItems.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
              {filteredItems.map((item) => (
                <article
                  key={`${item.link}-${item.title}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
                >
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase text-cyan-800">
                      {item.source}
                    </span>
                    <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt)}</span>
                  </div>

                  <h2 className="text-lg font-extrabold leading-6 text-slate-900 mb-3 line-clamp-3">{item.title}</h2>
                  <p className="text-sm text-slate-700 leading-7 min-h-[126px]">{item.summary}</p>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5"><path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /></svg>
                      {l({ en: 'Read in Reader', kn: 'ರೀಡರ್‌ನಲ್ಲಿ ಓದಿ', hi: 'रीडर में पढ़ें', ta: 'ரீடரில் படிக்க' })}
                    </button>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-slate-500 hover:text-slate-800"
                    >
                      {l({ en: 'Original', kn: 'ಮೂಲ', hi: 'मूल', ta: 'மூலம்' })} ↗
                    </a>
                  </div>
                </article>
              ))}
            </div>
          ) : null}

          {!isLoading && data && filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
              {l({ en: 'No stories match the current filters. Try changing the topic keyword or widening source/domain/time filters.', kn: 'ಪ್ರಸ್ತುತ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಹೊಂದುವ ಕಥೆಗಳಿಲ್ಲ. ವಿಷಯ ಕೀವರ್ಡ್ ಬದಲಿಸಿ ಅಥವಾ ಮೂಲ/ಡೊಮೇನ್/ಸಮಯ ಫಿಲ್ಟರ್ ವಿಸ್ತರಿಸಿ.', hi: 'वर्तमान फ़िल्टर से कोई कहानी मेल नहीं खाती। विषय कीवर्ड बदलें या स्रोत/डोमेन/समय फ़िल्टर व्यापक करें।', ta: 'தற்போதைய வடிகட்டிகளுக்கு பொருந்தும் செய்திகள் இல்லை. தலைப்பு முக்கியச்சொல்லை மாற்றவும் அல்லது மூலம்/டொமைன்/நேர வடிகட்டிகளை விரிவுபடுத்தவும்.' })}
            </div>
          ) : null}

          {!isLoading && !error && !data ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
              {l({ en: 'Load an OPML file to start reading. The reader will display concise summaries and preserve direct links to original publishers.', kn: 'ಓದನ್ನು ಪ್ರಾರಂಭಿಸಲು OPML ಫೈಲ್ ಲೋಡ್ ಮಾಡಿ. ರೀಡರ್ ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶಗಳನ್ನು ತೋರಿಸಿ ಮೂಲ ಪ್ರಕಾಶಕರ ನೇರ ಲಿಂಕ್‌ಗಳನ್ನು ಉಳಿಸುತ್ತದೆ.', hi: 'पढ़ना शुरू करने के लिए OPML फ़ाइल लोड करें। रीडर संक्षिप्त सारांश दिखाएगा और मूल प्रकाशकों के सीधे लिंक सुरक्षित रखेगा।', ta: 'படிக்கத் தொடங்க OPML கோப்பை ஏற்றுங்கள். ரீடர் சுருக்கமான சுருக்கங்களை காட்டி மூல வெளியீட்டாளர்களின் நேரடி இணைப்புகளை பாதுகாக்கும்.' })}
            </div>
          ) : null}
        </div>
      </section>

      {/* ── In-page reading drawer ── */}
      {selectedItem ? (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
            aria-hidden="true"
          />

          {/* Drawer panel */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label={selectedItem.title}
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-white shadow-2xl"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase text-cyan-800">
                  {selectedItem.source}
                </span>
                <span className="text-[11px] text-slate-500">{formatDate(selectedItem.publishedAt, locale)}</span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href={selectedItem.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  {l({ en: 'Open Original', kn: 'ಮೂಲ ತೆರೆ', hi: 'मूल खोलें', ta: 'மூலத்தைத் திற' })} ↗
                </a>
                <button
                  onClick={() => setSelectedItem(null)}
                  aria-label={l({ en: 'Close reader', kn: 'ರೀಡರ್ ಮುಚ್ಚಿ', hi: 'रीडर बंद करें', ta: 'ரீடரை மூடு' })}
                  className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                    <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <h1 className="text-2xl font-extrabold leading-tight text-slate-900 mb-5">
                {selectedItem.title}
              </h1>

              {selectedItem.fullContent && selectedItem.fullContent.length > selectedItem.summary.length + 20 ? (
                <div className="prose prose-slate prose-sm max-w-none leading-8 text-slate-700 whitespace-pre-line">
                  {selectedItem.fullContent}
                </div>
              ) : (
                <>
                  <p className="leading-8 text-slate-700">{selectedItem.summary}</p>
                  <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                    <strong>{l({ en: 'Full article not available in RSS feed.', kn: 'RSS ಫೀಡ್‌ನಲ್ಲಿ ಸಂಪೂರ್ಣ ಲೇಖನ ಲಭ್ಯವಿಲ್ಲ.', hi: 'RSS फ़ीड में पूरा लेख उपलब्ध नहीं है।', ta: 'RSS ஊட்டத்தில் முழு கட்டுரை கிடைக்கவில்லை.' })}</strong> {l({ en: 'Open the original source to read the complete story.', kn: 'ಪೂರ್ಣ ಕಥೆ ಓದಲು ಮೂಲ ಮೂಲವನ್ನು ತೆರೆಯಿರಿ.', hi: 'पूरी कहानी पढ़ने के लिए मूल स्रोत खोलें।', ta: 'முழு செய்தியைப் படிக்க மூலத்தைத் திறக்கவும்.' })}
                  </div>
                </>
              )}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between gap-3">
              <span className="text-xs text-slate-500">{l({ en: "Content from the publisher's RSS feed", kn: 'ಪ್ರಕಾಶಕರ RSS ಫೀಡ್‌ನ ವಿಷಯ', hi: 'प्रकाशक के RSS फ़ीड की सामग्री', ta: 'வெளியீட்டாளரின் RSS ஊட்ட உள்ளடக்கம்' })} · <span className="font-semibold">{selectedItem.source}</span></span>
              <a
                href={selectedItem.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                {l({ en: 'Read full article at', kn: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ:', hi: 'पूरा लेख पढ़ें:', ta: 'முழு கட்டுரையைப் படிக்க:' })} {getDomain(selectedItem.link)} ↗
              </a>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}
