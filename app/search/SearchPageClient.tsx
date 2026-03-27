'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SiteFrame from '@/components/SiteFrame';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';
import {
  type SearchEntry,
  type SearchCategory,
  querySearchIndex,
  getPopularEntries,
  CATEGORY_COLORS,
  SEARCH_INDEX,
} from '@/lib/search-index';

const ALL_CATEGORIES: SearchCategory[] = [
  'Page', 'Timeline', 'Sector', 'Sustainability', 'Pillar', 'FAQ', 'Download', 'Update', 'Data',
];

export default function SearchPageClient() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get('q') ?? '';
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<SearchCategory | 'All'>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce query → URL sync
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedQuery(query);
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) params.set('q', query.trim());
      else params.delete('q');
      router.replace(`/search?${params.toString()}`, { scroll: false });
    }, 280);
    return () => clearTimeout(t);
  }, [query, searchParams, router]);

  const rawResults = debouncedQuery.trim()
    ? querySearchIndex(debouncedQuery, 40)
    : getPopularEntries();

  const filtered =
    activeCategory === 'All'
      ? rawResults
      : rawResults.filter((r) => r.category === activeCategory);

  // Determine which categories are present in results (to avoid empty filter chips)
  const presentCategories = new Set(rawResults.map((r) => r.category));

  // Group results for display
  const grouped = filtered.reduce<Record<string, SearchEntry[]>>((acc, entry) => {
    const cat = entry.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(entry);
    return acc;
  }, {});

  const totalCount = filtered.length;

  return (
    <SiteFrame>
      <main className="min-h-screen bg-gradient-to-br from-white via-gray-50/60 to-white">

        {/* Search hero */}
        <section className="pt-28 pb-10 border-b border-gray-100">
          <div className="container">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-4">Search</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
              {l({ en: 'Find anything in KWIN City', kn: 'KWIN City ನಲ್ಲಿ ಯಾವುದನ್ನಾದರೂ ಹುಡುಕಿ', hi: 'KWIN City में कुछ भी खोजें', ta: 'KWIN City இல் எதையும் தேடுங்கள்' })}
            </h1>

            {/* Search bar */}
            <div className="relative max-w-2xl">
              <div className="flex items-center gap-3 bg-white border-2 border-gray-200 focus-within:border-amber-400 rounded-2xl px-5 py-4 shadow-sm transition-all duration-200">
                <svg
                  className="w-5 h-5 text-gray-400 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={l({ en: 'Search pages, sectors, timeline, FAQ…', kn: 'ಪುಟಗಳು, ಕ್ಷೇತ್ರಗಳು, ಕಾಲರೇಖೆ, FAQ ಹುಡುಕಿ…', hi: 'पेज, सेक्टर, टाइमलाइन, FAQ खोजें…', ta: 'பக்கங்கள், துறைகள், காலவரிசை, FAQ தேடுங்கள்…' })}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-lg outline-none"
                  autoFocus
                  autoComplete="off"
                />
                {query && (
                  <button
                    onClick={() => { setQuery(''); inputRef.current?.focus(); }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Summary */}
            <p className="mt-4 text-sm text-gray-500">
              {debouncedQuery.trim()
                ? `${totalCount} result${totalCount !== 1 ? 's' : ''} for "${debouncedQuery}"`
                : `Showing ${totalCount} popular items — start typing to search all ${SEARCH_INDEX.length}+ entries`}
            </p>
          </div>
        </section>

        {/* Category filter chips */}
        {rawResults.length > 0 && (
          <section className="sticky top-[70px] z-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
            <div className="container py-3">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                <button
                  onClick={() => setActiveCategory('All')}
                  className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                    activeCategory === 'All'
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                  }`}
                >
                  All ({rawResults.length})
                </button>
                {ALL_CATEGORIES.filter((c) => presentCategories.has(c)).map((cat) => {
                  const count = rawResults.filter((r) => r.category === cat).length;
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all ${
                        isActive
                          ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                          : `${CATEGORY_COLORS[cat]} hover:border-current`
                      }`}
                    >
                      {cat} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Results */}
        <section className="section-sm">
          <div className="container">
            {filtered.length === 0 && debouncedQuery.trim() && (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{l({ en: 'No results found', kn: 'ಯಾವುದೇ ಫಲಿತಾಂಶ ಕಂಡುಬಂದಿಲ್ಲ', hi: 'कोई परिणाम नहीं मिला', ta: 'முடிவுகள் எதுவும் கிடைக்கவில்லை' })}</h2>
                <p className="text-gray-500 mb-6">
                  {l({ en: 'Try different keywords — sector names, timeline years, or FAQ topics.', kn: 'ಬೇರೆ ಕೀವರ್ಡ್‌ಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ — ಕ್ಷೇತ್ರ ಹೆಸರುಗಳು, ಕಾಲರೇಖೆ ವರ್ಷಗಳು ಅಥವಾ FAQ ವಿಷಯಗಳು.', hi: 'अलग कीवर्ड आज़माएँ — सेक्टर नाम, टाइमलाइन वर्ष, या FAQ विषय।', ta: 'வேறு முக்கிய சொற்களை முயற்சிக்கவும் — துறை பெயர்கள், காலவரிசை ஆண்டுகள் அல்லது FAQ தலைப்புகள்.' })}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['semiconductor', 'investor', 'timeline 2027', 'sustainability', 'download'].map((hint) => (
                    <button
                      key={hint}
                      onClick={() => setQuery(hint)}
                      className="px-4 py-2 rounded-full bg-amber-50 text-amber-700 text-sm font-medium border border-amber-200 hover:bg-amber-100 transition-colors"
                    >
                      Try &ldquo;{hint}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            )}

            {Object.entries(grouped).map(([category, entries]) => (
              <div key={category} className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400">{category}</h2>
                  <div className="flex-1 h-px bg-gray-100" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {entries.map((entry, idx) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.04 }}
                    >
                      <Link
                        href={entry.href}
                        className="group flex items-start gap-3.5 p-4 bg-white rounded-xl border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all duration-200"
                      >
                        <span className="text-2xl leading-none mt-0.5 w-8 text-center shrink-0">
                          {entry.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm group-hover:text-amber-800 transition-colors leading-snug">
                            {entry.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {entry.description}
                          </p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}

            {/* No query state — invite full search */}
            {!debouncedQuery.trim() && (
              <div className="mt-12 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 p-8 text-center">
                <p className="text-amber-900 font-semibold mb-2">Looking for something specific?</p>
                <p className="text-amber-800/70 text-sm">
                  Type any keyword above — sectors, dates, features, or question keywords — to search {SEARCH_INDEX.length}+ indexed entries.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </SiteFrame>
  );
}
