'use client';

/**
 * KWIN City — Global Search Modal
 * ─────────────────────────────────
 * Triggered by Cmd+K (Mac) / Ctrl+K (Win/Linux) or by clicking the search icon.
 * Keyboard-navigable, accessible, zero-network-requests, instant results.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  type SearchEntry,
  querySearchIndex,
  getPopularEntries,
  CATEGORY_COLORS,
} from '@/lib/search-index';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

export default function SearchModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const popular = getPopularEntries();

  // Reset & focus on open
  useEffect(() => {
    if (!open) return;
    setQuery('');
    setResults([]);
    setActiveIndex(0);
    // Defer to let AnimatePresence mount before focusing
    const t = setTimeout(() => inputRef.current?.focus(), 60);
    return () => clearTimeout(t);
  }, [open]);

  // Live search
  useEffect(() => {
    const found = querySearchIndex(query, 12);
    setResults(found);
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation
  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const displayed = query.trim() ? results : popular;
      if (displayed.length === 0) {
        if (e.key === 'Escape') onClose();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % displayed.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + displayed.length) % displayed.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const chosen = displayed[activeIndex];
        if (chosen) {
          onClose();
          router.push(chosen.href);
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [query, results, popular, activeIndex, onClose, router],
  );

  const displayed = query.trim() ? results : popular;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, scale: 0.97, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label={l({ en: 'Site search', kn: 'ಸೈಟ್ ಹುಡುಕಾಟ', hi: 'साइट खोज', ta: 'தளத் தேடல்' })}
            className="fixed inset-x-0 top-[72px] z-[210] mx-auto max-w-2xl px-4"
          >
            <div className="overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100/80 ring-1 ring-black/5">

              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
                <label htmlFor="modal-search-input" className="sr-only">{l({ en: 'Search KWIN City', kn: 'KWIN City ಹುಡುಕಿ', hi: 'KWIN City खोजें', ta: 'KWIN City-ஐ தேடுங்கள்' })}</label>
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
                  id="modal-search-input"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={l({ en: 'Search KWIN City — pages, sectors, timeline…', kn: 'KWIN City ಹುಡುಕಿ — ಪುಟಗಳು, ಕ್ಷೇತ್ರಗಳು, ಟೈಮ್‌ಲೈನ್…', hi: 'KWIN City खोजें — पेज, सेक्टर, टाइमलाइन…', ta: 'KWIN City-ஐ தேடுங்கள் — பக்கங்கள், துறைகள், காலவரிசை…' })}
                  className="flex-1 bg-transparent text-gray-900 placeholder-gray-400 text-[16px] outline-none"
                  autoComplete="off"
                  spellCheck={false}
                  aria-describedby="modal-search-desc"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={l({ en: 'Clear search', kn: 'ಹುಡುಕಾಟ ತೆರವುಗೊಳಿಸಿ', hi: 'खोज साफ करें', ta: 'தேடலை அழிக்கவும்' })}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
                <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 text-[11px] font-mono border border-gray-200 whitespace-nowrap">
                  esc
                </kbd>
              </div>

              {/* Results / Popular list */}
              <div className="max-h-[60vh] overflow-y-auto overscroll-contain" role="region" aria-live="polite" aria-label={l({ en: 'Search results', kn: 'ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು', hi: 'खोज परिणाम', ta: 'தேடல் முடிவுகள்' })}>
                {!query.trim() && (
                  <div className="px-4 pt-3 pb-1">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-gray-400" id="modal-search-desc">{l({ en: 'Popular', kn: 'ಜನಪ್ರಿಯ', hi: 'लोकप्रिय', ta: 'பிரபலமானவை' })}</p>
                  </div>
                )}

                {query.trim() && results.length === 0 && (
                  <div className="py-12 text-center" role="status" aria-live="assertive">
                    <p className="text-gray-500 text-sm">
                      {l({ en: 'No results for', kn: 'ಇದಕ್ಕಾಗಿ ಫಲಿತಾಂಶಗಳಿಲ್ಲ', hi: 'इसके लिए कोई परिणाम नहीं', ta: 'இதற்கு முடிவுகள் இல்லை' })} &ldquo;<span className="font-medium text-gray-700">{query}</span>&rdquo;
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      {l({ en: 'Try a different keyword or', kn: 'ಬೇರೆ ಕೀವರ್ಡ್ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ', hi: 'कोई दूसरा कीवर्ड आजमाएँ या', ta: 'வேறு சொல் முயற்சி செய்யுங்கள் அல்லது' })}{' '}
                      <Link
                        href={`/search?q=${encodeURIComponent(query)}`}
                        className="text-amber-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                        onClick={onClose}
                      >
                        {l({ en: 'see the full results page', kn: 'ಪೂರ್ಣ ಫಲಿತಾಂಶಗಳ ಪುಟ ನೋಡಿ', hi: 'पूरा परिणाम पेज देखें', ta: 'முழு முடிவுகள் பக்கத்தை பார்க்கவும்' })}
                      </Link>
                    </p>
                  </div>
                )}

                {displayed.length > 0 && (
                  <ul className="py-2">
                    {displayed.map((entry, idx) => (
                      <li key={entry.id}>
                        <Link
                          href={entry.href}
                          onClick={onClose}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex items-center gap-3.5 px-4 py-2.5 transition-colors ${
                            idx === activeIndex ? 'bg-amber-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          <span className="text-xl leading-none shrink-0 w-7 text-center">
                            {entry.icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm font-semibold truncate ${
                                idx === activeIndex ? 'text-amber-800' : 'text-gray-900'
                              }`}
                            >
                              {entry.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate mt-0.5">
                              {entry.description}
                            </p>
                          </div>
                          <span
                            className={`hidden sm:inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${CATEGORY_COLORS[entry.category]}`}
                          >
                            {entry.category}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between gap-4 px-4 py-2.5 border-t border-gray-100 bg-gray-50/60">
                <div className="flex items-center gap-4 text-[11px] text-gray-400">
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white border border-gray-200 rounded px-1 font-mono">↑↓</kbd> {l({ en: 'navigate', kn: 'ಸಂಚರಿಸಿ', hi: 'नेविगेट करें', ta: 'நகர்த்தவும்' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="bg-white border border-gray-200 rounded px-1 font-mono">↵</kbd> {l({ en: 'open', kn: 'ತೆರೆ', hi: 'खोलें', ta: 'திற' })}
                  </span>
                </div>
                {query.trim() && results.length > 0 && (
                  <Link
                    href={`/search?q=${encodeURIComponent(query)}`}
                    onClick={onClose}
                    className="text-[11px] text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                  >
                    {l({ en: 'View all results', kn: 'ಎಲ್ಲಾ ಫಲಿತಾಂಶಗಳನ್ನು ನೋಡಿ', hi: 'सभी परिणाम देखें', ta: 'அனைத்து முடிவுகளையும் காண்க' })}
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
