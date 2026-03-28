'use client';

/**
 * KWIN City — Updates Feed Component
 * ─────────────────────────────────────
 * First-party milestone changelog + portal update feed.
 * Features:
 *  • Vertical timeline layout with date connectors
 *  • Category filter chips
 *  • Verification tier badges
 *  • Rich card with summary, body expand, related links
 *  • Schema.org Dataset / NewsArticle structured data (via page)
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@/content/pages/updates.json';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { type Locale, getIntlLocale, pickLocalizedValue } from '@/lib/i18n/messages';

type VerificationTier = 'verified' | 'pending' | 'contextual';

interface UpdateLink {
  label: string;
  href: string;
}

interface UpdateEntry {
  id: string;
  date: string;
  title: string;
  summary: string;
  body: string;
  category: string;
  verificationTier: VerificationTier;
  tags: string[];
  links: UpdateLink[];
}

interface UpdateCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
}

const TIER_BADGES: Record<VerificationTier, { icon: string; badge: string }> = {
  verified:   { icon: '✅', badge: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
  pending:    { icon: '🔍', badge: 'text-amber-700 bg-amber-50 border-amber-200' },
  contextual: { icon: '⚪', badge: 'text-gray-600 bg-gray-100 border-gray-200' },
};

const CATEGORY_STYLES: Record<string, { dot: string; chip: string }> = {
  milestone: { dot: 'bg-amber-400',   chip: 'bg-amber-50 text-amber-700 border-amber-200' },
  portal:    { dot: 'bg-blue-500',    chip: 'bg-blue-50 text-blue-700 border-blue-200' },
  policy:    { dot: 'bg-purple-500',  chip: 'bg-purple-50 text-purple-700 border-purple-200' },
  data:      { dot: 'bg-teal-500',    chip: 'bg-teal-50 text-teal-700 border-teal-200' },
  research:  { dot: 'bg-emerald-500', chip: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
};

function formatDate(iso: string, locale: Locale) {
  const intlLocale = getIntlLocale(locale);
  return new Date(iso).toLocaleDateString(intlLocale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function UpdateCard({ entry, catMeta, locale }: { entry: UpdateEntry; catMeta: UpdateCategory | undefined; locale: Locale }) {
  const [expanded, setExpanded] = useState(false);
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const tier = TIER_BADGES[entry.verificationTier];
  const tierLabel =
    entry.verificationTier === 'verified'
      ? l({ en: 'Verified', kn: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ', hi: 'सत्यापित', ta: 'சரிபார்க்கப்பட்டது' })
      : entry.verificationTier === 'pending'
        ? l({ en: 'Pending', kn: 'ಬಾಕಿ', hi: 'लंबित', ta: 'நிலுவை' })
        : l({ en: 'Contextual', kn: 'ಸಂದರ್ಭಾತ್ಮಕ', hi: 'प्रासंगिक', ta: 'சூழல் சார்ந்த' });
  const catStyles = CATEGORY_STYLES[entry.category] ?? { dot: 'bg-gray-400', chip: 'bg-gray-100 text-gray-600 border-gray-200' };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 hover:border-amber-100 hover:shadow-md transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Top metadata row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <time dateTime={entry.date} className="text-xs text-gray-400 font-medium">
            {formatDate(entry.date, locale)}
          </time>
          <span className="text-gray-200">·</span>
          {catMeta && (
            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${catStyles.chip}`}>
              {catMeta.icon} {catMeta.label}
            </span>
          )}
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${tier.badge}`}>
            {tier.icon} {tierLabel}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-snug">{entry.title}</h3>

        {/* Summary */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{entry.summary}</p>

        {/* Expandable body */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm text-gray-700 leading-relaxed border-t border-gray-100 pt-4 mb-4">
                {entry.body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
          {/* Related links */}
          <div className="flex flex-wrap gap-1.5">
            {entry.links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-xs font-semibold text-blue-700 hover:text-blue-900 underline-offset-2 hover:underline transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>

          {/* Read more toggle */}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 transition-colors flex items-center gap-1"
          >
            {expanded
              ? l({ en: 'Show less', kn: 'ಕಡಿಮೆ ತೋರಿಸಿ', hi: 'कम दिखाएँ', ta: 'குறைவாக காட்டு' })
              : l({ en: 'Read more', kn: 'ಇನ್ನಷ್ಟು ಓದಿ', hi: 'और पढ़ें', ta: 'மேலும் படிக்க' })}
            <svg
              className={`w-3 h-3 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}

export default function UpdatesFeed() {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const categories: UpdateCategory[] = data.categories as UpdateCategory[];
  const entries: UpdateEntry[] = data.entries as UpdateEntry[];

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filtered = activeCategory === 'all'
    ? entries
    : entries.filter((e) => e.category === activeCategory);

  const countByCategory = (id: string) =>
    id === 'all' ? entries.length : entries.filter((e) => e.category === id).length;

  const getCatMeta = (id: string) => categories.find((c) => c.id === id);

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50/30 to-white">

      {/* Hero */}
      <section className="pt-28 pb-12 border-b border-gray-100">
        <div className="container">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-4">{l({ en: 'Project Record', kn: 'ಯೋಜನೆ ದಾಖಲಾತಿ', hi: 'परियोजना अभिलेख', ta: 'திட்ட பதிவுகள்' })}</p>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                {data.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">{data.description}</p>
            </div>

            {/* Stats */}
            <div className="shrink-0 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-5 py-3 text-center">
                <p className="text-3xl font-extrabold text-gray-900">{entries.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">{l({ en: 'Total entries', kn: 'ಒಟ್ಟು ನಮೂದುಗಳು', hi: 'कुल प्रविष्टियाँ', ta: 'மொத்த பதிவுகள்' })}</p>
              </div>
              <div className="rounded-xl bg-gray-50 border border-gray-100 px-5 py-3 text-center">
                <p className="text-3xl font-extrabold text-emerald-700">
                  {entries.filter((e) => e.verificationTier === 'verified').length}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{l({ en: 'Verified', kn: 'ದೃಢೀಕರಿಸಲಾಗಿದೆ', hi: 'सत्यापित', ta: 'சரிபார்க்கப்பட்டது' })}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="sticky top-[70px] z-10 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="container py-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 text-xs font-bold px-3.5 py-1.5 rounded-full border transition-all ${
                activeCategory === 'all'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
              }`}
            >
              {l({ en: 'All', kn: 'ಎಲ್ಲಾ', hi: 'सभी', ta: 'அனைத்து' })} ({countByCategory('all')})
            </button>
            {categories.map((cat) => {
              const styles = CATEGORY_STYLES[cat.id] ?? { dot: 'bg-gray-400', chip: 'bg-gray-50 text-gray-600 border-gray-200' };
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : `${styles.chip} hover:shadow-sm`
                  }`}
                >
                  {cat.icon} {cat.label} ({countByCategory(cat.id)})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline feed */}
      <section className="section-sm">
        <div className="container">
          <div className="max-w-3xl">

            {/* Timeline thread */}
            <div className="relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-3 top-0 bottom-0 w-px bg-gray-200" aria-hidden="true" />

              <AnimatePresence mode="popLayout">
                {filtered.map((entry, idx) => {
                  const catStyles = CATEGORY_STYLES[entry.category] ?? { dot: 'bg-gray-400', chip: '' };
                  const catMeta = getCatMeta(entry.category);
                  return (
                    <motion.div
                      key={entry.id}
                      layout
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12, scale: 0.97 }}
                      transition={{ duration: 0.24, delay: idx * 0.04 }}
                      className="relative mb-6"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`absolute -left-5 top-5 w-3.5 h-3.5 rounded-full border-2 border-white ${catStyles.dot} shadow-sm`}
                        aria-hidden="true"
                      />

                      <UpdateCard entry={entry} catMeta={catMeta} locale={locale} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {filtered.length === 0 && (
                <div className="text-center py-16 -ml-8">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-gray-500 text-sm">{l({ en: 'No updates in this category yet.', kn: 'ಈ ವರ್ಗದಲ್ಲಿ ಇನ್ನೂ ನವೀಕರಣಗಳಿಲ್ಲ.', hi: 'इस श्रेणी में अभी कोई अपडेट नहीं है।', ta: 'இந்த பிரிவில் இன்னும் புதுப்பிப்புகள் இல்லை.' })}</p>
                  <button
                    onClick={() => setActiveCategory('all')}
                    className="mt-3 text-amber-700 text-sm font-semibold hover:underline"
                  >
                    {l({ en: 'View all updates', kn: 'ಎಲ್ಲಾ ನವೀಕರಣಗಳನ್ನು ನೋಡಿ', hi: 'सभी अपडेट देखें', ta: 'அனைத்து புதுப்பிப்புகளையும் காண்க' })}
                  </button>
                </div>
              )}
            </div>

            {/* Subscribe CTA */}
            <div className="mt-10 -ml-8 rounded-2xl bg-gradient-to-br from-[#040714] to-[#0D1640] border border-white/10 px-8 py-8 text-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-2">{l({ en: 'Never miss an update', kn: 'ಯಾವ ನವೀಕರಣವೂ ತಪ್ಪಿಸಿಕೊಳ್ಳಬೇಡಿ', hi: 'कोई अपडेट न छूटे', ta: 'எந்த புதுப்பிப்பையும் தவற விடாதீர்கள்' })}</p>
              <h3 className="text-xl font-extrabold text-white mb-2">{l({ en: 'Get updates in your inbox', kn: 'ನವೀಕರಣಗಳನ್ನು ನಿಮ್ಮ ಇನ್ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಪಡೆಯಿರಿ', hi: 'अपडेट सीधे इनबॉक्स में पाएं', ta: 'புதுப்பிப்புகளை உங்கள் மின்னஞ்சலில் பெறுங்கள்' })}</h3>
              <p className="text-[#9BAEC6] text-sm max-w-sm mx-auto mb-5">
                {l({ en: 'Subscribe to KWIN City updates for milestone announcements, new data, and portal launches.', kn: 'ಮೈಲಿಗಲ್ಲು ಘೋಷಣೆಗಳು, ಹೊಸ ಡೇಟಾ ಮತ್ತು ಪೋರ್ಟಲ್ ಬಿಡುಗಡೆಗಳಿಗಾಗಿ KWIN City ನವೀಕರಣಗಳಿಗೆ ಚಂದಾದಾರರಾಗಿ.', hi: 'माइलस्टोन घोषणाओं, नए डेटा और पोर्टल लॉन्च के लिए KWIN City अपडेट्स की सदस्यता लें।', ta: 'முக்கிய முன்னேற்ற அறிவிப்புகள், புதிய தரவு மற்றும் தள வெளியீடுகளுக்காக KWIN City புதுப்பிப்புகளுக்கு சந்தா செய்யவும்.' })}
              </p>
              <Link href="/#newsletter" className="btn btn-primary inline-flex">
                {l({ en: 'Subscribe', kn: 'ಚಂದಾದಾರರಾಗಿ', hi: 'सदस्यता लें', ta: 'சந்தா செய்யவும்' })}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
