'use client';

/**
 * KWIN City — Document Downloads Page
 * /downloads
 * ─────────────────────────────────────
 * JSON-driven, filterable document library with:
 *  • Category filter chips
 *  • Verification-tier badges (✅ Verified / 🔍 Pending / ⚪ Contextual)
 *  • File type labels
 *  • Publisher attribution
 *  • Keyboard-accessible
 */

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@/content/pages/downloads.json';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

type VerificationTier = 'verified' | 'pending' | 'contextual';

interface Document {
  id: string;
  title: string;
  description: string;
  category: string;
  fileType: string;
  verificationTier: VerificationTier;
  publisher: string;
  publishedDate: string;
  language: string;
  href: string;
  isExternal: boolean;
  tags: string[];
}

interface Category {
  id: string;
  label: string;
  icon: string;
  description: string;
}

const TIER_CONFIG: Record<VerificationTier, { label: string; badge: string; icon: string; bg: string }> = {
  verified:   { label: 'Verified',  icon: '✅', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', bg: 'bg-emerald-500' },
  pending:    { label: 'Pending',   icon: '🔍', badge: 'bg-amber-50 text-amber-700 border-amber-200',       bg: 'bg-amber-500' },
  contextual: { label: 'Contextual',icon: '⚪', badge: 'bg-gray-100 text-gray-600 border-gray-200',          bg: 'bg-gray-400' },
};

const FILE_TYPE_STYLES: Record<string, string> = {
  PDF:     'bg-red-50 text-red-600 border-red-100',
  CSV:     'bg-teal-50 text-teal-700 border-teal-100',
  XLSX:    'bg-green-50 text-green-700 border-green-100',
  default: 'bg-gray-100 text-gray-600 border-gray-200',
};

export default function DownloadsPage() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const categories: Category[] = data.categories as Category[];
  const documents: Document[] = data.documents as Document[];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTier, setActiveTier] = useState<VerificationTier | 'all'>('all');

  const filtered = documents.filter((doc) => {
    const catMatch = activeCategory === 'all' || doc.category === activeCategory;
    const tierMatch = activeTier === 'all' || doc.verificationTier === activeTier;
    return catMatch && tierMatch;
  });

  const countByCategory = (catId: string) =>
    documents.filter((d) => catId === 'all' || d.category === catId).length;

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-slate-50/40 to-white">

      {/* Page intro */}
      <section className="pt-28 pb-12 border-b border-gray-100">
        <div className="container">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-4">{l({ en: 'Resource Library', kn: 'ಸಂಪನ್ಮೂಲ ಗ್ರಂಥಾಲಯ', hi: 'संसाधन पुस्तकालय', ta: 'வள நூலகம்' })}</p>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
                {data.title}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">{data.description}</p>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-4 shrink-0">
              {(
                [
                  { n: documents.filter((d) => d.verificationTier === 'verified').length,   label: 'Verified',   color: 'text-emerald-700' },
                  { n: documents.filter((d) => d.verificationTier === 'pending').length,    label: 'Pending',    color: 'text-amber-600' },
                  { n: documents.filter((d) => d.verificationTier === 'contextual').length, label: 'Contextual', color: 'text-gray-500' },
                ] as { n: number; label: string; color: string }[]
              ).map((stat) => (
                <div key={stat.label} className="rounded-xl bg-gray-50 border border-gray-100 px-4 py-3 text-center">
                  <p className={`text-3xl font-extrabold ${stat.color}`}>{stat.n}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tier legend */}
          <div className="mt-8 flex flex-wrap gap-3">
            {(Object.entries(TIER_CONFIG) as [VerificationTier, typeof TIER_CONFIG[VerificationTier]][]).map(([tier, cfg]) => (
              <span key={tier} className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border ${cfg.badge}`}>
                {cfg.icon} {cfg.label}
              </span>
            ))}
            <span className="text-xs text-gray-400 self-center ml-1">{l({ en: '— Source verification status', kn: '— ಮೂಲ ಪರಿಶೀಲನಾ ಸ್ಥಿತಿ', hi: '— स्रोत सत्यापन स्थिति', ta: '— ஆதார சரிபார்ப்பு நிலை' })}</span>
          </div>
        </div>
      </section>

      {/* Category cards */}
      <section className="section-sm">
        <div className="container">
          <h2 className="text-xs font-bold tracking-[0.18em] uppercase text-gray-400 mb-5">{l({ en: 'Browse by Category', kn: 'ವರ್ಗದ ಪ್ರಕಾರ ನೋಡಿ', hi: 'श्रेणी के अनुसार देखें', ta: 'வகைப்படி உலாவவும்' })}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
            <button
              onClick={() => setActiveCategory('all')}
              className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'border-amber-400 bg-amber-50 shadow-sm'
                  : 'border-gray-100 bg-white hover:border-amber-200 hover:shadow-sm'
              }`}
            >
              <p className="text-2xl mb-2">📁</p>
              <p className="font-bold text-sm text-gray-900">{l({ en: 'All Documents', kn: 'ಎಲ್ಲಾ ದಸ್ತಾವೇಜುಗಳು', hi: 'सभी दस्तावेज़', ta: 'அனைத்து ஆவணங்கள்' })}</p>
              <p className="text-xs text-gray-500 mt-0.5">{countByCategory('all')} items</p>
            </button>

            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                  activeCategory === cat.id
                    ? 'border-amber-400 bg-amber-50 shadow-sm'
                    : 'border-gray-100 bg-white hover:border-amber-200 hover:shadow-sm'
                }`}
              >
                <p className="text-2xl mb-2">{cat.icon}</p>
                <p className="font-bold text-sm text-gray-900">{cat.label}</p>
                <p className="text-xs text-gray-500 mt-0.5">{countByCategory(cat.id)} items</p>
              </button>
            ))}
          </div>

          {/* Tier filter row */}
          <div className="flex items-center gap-2 flex-wrap mb-8">
            <span className="text-xs text-gray-400 font-medium">Filter by verification:</span>
            {(['all', 'verified', 'pending', 'contextual'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setActiveTier(t)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                  activeTier === t
                    ? 'bg-amber-500 text-white border-amber-500'
                    : t === 'all'
                    ? 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                    : `${TIER_CONFIG[t].badge} hover:shadow-sm`
                }`}
              >
                {t === 'all' ? 'All Tiers' : `${TIER_CONFIG[t].icon} ${TIER_CONFIG[t].label}`}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-sm text-gray-500 mb-6">
            Showing <span className="font-semibold text-gray-800">{filtered.length}</span> of {documents.length} documents
          </p>

          {/* Document cards grid */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={`${activeCategory}-${activeTier}`}
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {filtered.map((doc, idx) => {
                const tier = TIER_CONFIG[doc.verificationTier];
                const fileStyle = FILE_TYPE_STYLES[doc.fileType] ?? FILE_TYPE_STYLES.default;
                const Cat = categories.find((c) => c.id === doc.category);

                return (
                  <motion.div
                    key={doc.id}
                    layout
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.24, delay: idx * 0.04 }}
                    className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:border-amber-200 hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    {/* Tier accent bar */}
                    <div className={`h-1 w-full ${tier.bg}`} />

                    <div className="p-5 flex flex-col flex-1">
                      {/* Top row — type + tier */}
                      <div className="flex items-center justify-between mb-3 gap-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${fileStyle}`}>
                          {doc.fileType}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${tier.badge}`}>
                          {tier.icon} {tier.label}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-amber-800 transition-colors">
                        {doc.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-3 flex-1">
                        {doc.description}
                      </p>

                      {/* Publisher + date */}
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          🏛️ {doc.publisher}
                        </span>
                        <span className="flex items-center gap-1">
                          📅 {doc.publishedDate}
                        </span>
                        {Cat && (
                          <span className="flex items-center gap-1">
                            {Cat.icon} {Cat.label}
                          </span>
                        )}
                      </div>

                      {/* CTA */}
                      {doc.isExternal ? (
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                        >
                          View source ↗
                        </a>
                      ) : (
                        <Link
                          href={doc.href}
                          className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition-colors"
                        >
                          Read on portal →
                        </Link>
                      )}
                    </div>
                  </motion.div>
                );
              })}

              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <p className="text-4xl mb-3">📭</p>
                  <p className="text-gray-500 text-sm">No documents match this filter combination.</p>
                  <button
                    onClick={() => { setActiveCategory('all'); setActiveTier('all'); }}
                    className="mt-4 text-amber-700 text-sm font-semibold hover:underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Submit a document CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#040714,#0D1640)] border border-white/10 px-8 py-10 text-center">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-3">Missing a document?</p>
            <h2 className="text-2xl font-extrabold text-white mb-3">Help us grow the library</h2>
            <p className="text-[#9BAEC6] text-sm max-w-lg mx-auto mb-6">
              If you have an official document, data file, or policy brief we&apos;ve missed, share it with us and we&apos;ll
              verify and add it.
            </p>
            <a
              href="mailto:hello@kwin-city.com?subject=Document+submission"
              className="btn btn-primary inline-flex"
            >
              Submit a document
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
