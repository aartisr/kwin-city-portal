'use client';

/**
 * KWIN City — FAQ Page Component
 * ───────────────────────────────
 * Persona-grouped accordion with:
 *  • Smooth animated expand / collapse
 *  • Verification notes per answer
 *  • Related link chips
 *  • Group + question filter
 *  • FAQ schema.org JSON-LD injected via <script>
 *  • Full keyboard accessibility (Space / Enter to toggle)
 */

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import data from '@/content/pages/faq.json';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

interface RelatedLink {
  label: string;
  href: string;
}

interface FaqQuestion {
  id: string;
  question: string;
  answer: string;
  verificationNote: string | null;
  relatedLinks: RelatedLink[];
}

interface FaqGroup {
  id: string;
  label: string;
  icon: string;
  audience: string;
  questions: FaqQuestion[];
}

// Build FAQ schema.org markup
function buildFaqSchema(groups: FaqGroup[]) {
  const allQ = groups.flatMap((g) => g.questions);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allQ.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };
}

function AccordionItem({
  q,
  groupId,
  locale,
}: {
  q: FaqQuestion;
  groupId: string;
  locale: 'en' | 'kn' | 'hi' | 'ta';
}) {
  const [open, setOpen] = useState(false);
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const answerId = `faq-answer-${groupId}-${q.id}`;
  const buttonId = `faq-btn-${groupId}-${q.id}`;

  const toggle = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        id={buttonId}
        aria-controls={answerId}
        onClick={toggle}
        className={`w-full flex items-start justify-between gap-4 px-5 py-4 text-left transition-colors duration-150 ${
          open ? 'bg-amber-50' : 'bg-white hover:bg-gray-50'
        }`}
      >
        <span
          className={`text-sm font-semibold leading-snug ${
            open ? 'text-amber-900' : 'text-gray-900'
          }`}
        >
          {q.question}
        </span>
        <span
          className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200 ${
            open
              ? 'bg-amber-500 border-amber-500 text-white rotate-180'
              : 'bg-white border-gray-200 text-gray-400'
          }`}
          aria-hidden="true"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={answerId}
            role="region"
            aria-labelledby={buttonId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-2 bg-amber-50/30 border-t border-amber-100/60">
              {/* Answer */}
              <p className="text-sm text-gray-700 leading-relaxed">{q.answer}</p>

              {/* Verification note */}
              {q.verificationNote && (
                <div className="mt-3 flex gap-2 items-start bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5">
                  <span className="text-base leading-none">🔍</span>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <span className="font-bold">{l({ en: 'Verification note', kn: 'ಪರಿಶೀಲನಾ ಟಿಪ್ಪಣಿ', hi: 'सत्यापन नोट', ta: 'சரிபார்ப்பு குறிப்பு' })}: </span>
                    {q.verificationNote}
                  </p>
                </div>
              )}

              {/* Related links */}
              {q.relatedLinks.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {q.relatedLinks.map((link) => (
                    link.href.startsWith('http') ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-white border border-gray-200 rounded-full text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-white border border-gray-200 rounded-full text-blue-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqPage() {
  const { locale } = useI18n();
  const l = (values: { en: string; kn?: string; hi?: string; ta?: string }) => pickLocalizedValue(locale, values);
  const groups: FaqGroup[] = data.groups as FaqGroup[];
  const [activeGroup, setActiveGroup] = useState<string>('all');
  const [filterQuery, setFilterQuery] = useState('');

  const schema = buildFaqSchema(groups);

  const filteredGroups = groups
    .filter((g) => activeGroup === 'all' || g.id === activeGroup)
    .map((g) => ({
      ...g,
      questions: g.questions.filter(
        (q) =>
          !filterQuery ||
          q.question.toLowerCase().includes(filterQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(filterQuery.toLowerCase()),
      ),
    }))
    .filter((g) => g.questions.length > 0);

  const totalVisible = filteredGroups.reduce((n, g) => n + g.questions.length, 0);

  return (
    <>
      {/* FAQ Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <main className="min-h-screen bg-gradient-to-br from-white via-gray-50/40 to-white">

        {/* Hero */}
        <section className="pt-28 pb-12 border-b border-gray-100">
          <div className="container">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-4">{l({ en: 'Help Centre', kn: 'ಸಹಾಯ ಕೇಂದ್ರ', hi: 'सहायता केंद्र', ta: 'உதவி மையம்' })}</p>
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
                  <p className="text-3xl font-extrabold text-gray-900">
                    {groups.reduce((n, g) => n + g.questions.length, 0)}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{l({ en: 'Questions answered', kn: 'ಉತ್ತರಿಸಿದ ಪ್ರಶ್ನೆಗಳು', hi: 'जवाब दिए गए प्रश्न', ta: 'பதில் அளிக்கப்பட்ட கேள்விகள்' })}</p>
                </div>
                <div className="rounded-xl bg-gray-50 border border-gray-100 px-5 py-3 text-center">
                  <p className="text-3xl font-extrabold text-gray-900">{groups.length}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{l({ en: 'Audience groups', kn: 'ಪ್ರೇಕ್ಷಕ ಗುಂಪುಗಳು', hi: 'दर्शक समूह', ta: 'பார்வையாளர் குழுக்கள்' })}</p>
                </div>
              </div>
            </div>

            {/* Inline filter box */}
            <div className="mt-8 relative max-w-md">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder={l({ en: 'Filter questions…', kn: 'ಪ್ರಶ್ನೆಗಳನ್ನು ಫಿಲ್ಟರ್ ಮಾಡಿ…', hi: 'प्रश्न फ़िल्टर करें…', ta: 'கேள்விகளை வடிகட்டி…' })}
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-amber-400 rounded-xl text-sm outline-none transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Group chips + accordion */}
        <section className="section-sm">
          <div className="container">

            {/* Group filter tabs */}
            <div className="flex flex-wrap gap-2 mb-10">
              <button
                onClick={() => setActiveGroup('all')}
                className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                  activeGroup === 'all'
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                }`}
              >
                🌐 {l({ en: 'All Groups', kn: 'ಎಲ್ಲಾ ಗುಂಪುಗಳು', hi: 'सभी समूह', ta: 'அனைத்து குழுக்கள்' })}
              </button>
              {groups.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setActiveGroup(g.id)}
                  className={`flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                    activeGroup === g.id
                      ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-amber-300'
                  }`}
                >
                  {g.icon} {g.label}
                </button>
              ))}
            </div>

            {(filterQuery || activeGroup !== 'all') && (
              <p className="text-sm text-gray-500 mb-6">
                {l({ en: 'Showing', kn: 'ತೋರಿಸಲಾಗುತ್ತಿದೆ', hi: 'दिखाए जा रहे हैं', ta: 'காண்பிக்கப்படுகிறது' })} <span className="font-semibold text-gray-800">{totalVisible}</span> {l({ en: totalVisible !== 1 ? 'questions' : 'question', kn: 'ಪ್ರಶ್ನೆಗಳು', hi: totalVisible !== 1 ? 'प्रश्न' : 'प्रश्न', ta: 'கேள்விகள்' })}
                {filterQuery ? ` ${l({ en: 'matching', kn: 'ಹೊಂದುವ', hi: 'मेल खाते', ta: 'பொருந்தும்' })} "${filterQuery}"` : ''}
              </p>
            )}

            {/* Accordion groups */}
            <div className="max-w-3xl space-y-12">
              {filteredGroups.map((group) => (
                <div key={group.id}>
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{group.icon}</span>
                    <div>
                      <h2 className="text-lg font-extrabold text-gray-900">{group.label}</h2>
                      <p className="text-xs text-gray-500">{group.audience}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {group.questions.map((q) => (
                      <AccordionItem key={q.id} q={q} groupId={group.id} locale={locale} />
                    ))}
                  </div>
                </div>
              ))}

              {filteredGroups.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-4xl mb-3">🤔</p>
                  <p className="text-gray-500 text-sm mb-4">
                    {l({ en: 'No questions match', kn: 'ಯಾವುದೇ ಪ್ರಶ್ನೆಗಳು ಹೊಂದಿಕೆಯಾಗಲಿಲ್ಲ', hi: 'कोई प्रश्न मेल नहीं खाता', ta: 'பொருந்தும் கேள்விகள் இல்லை' })} &ldquo;{filterQuery}&rdquo;
                  </p>
                  <button
                    onClick={() => setFilterQuery('')}
                    className="text-amber-700 text-sm font-semibold hover:underline"
                  >
                    {l({ en: 'Clear filter', kn: 'ಫಿಲ್ಟರ್ ತೆರವುಗೊಳಿಸಿ', hi: 'फ़िल्टर साफ करें', ta: 'வடிகட்டியை அழிக்கவும்' })}
                  </button>
                </div>
              )}
            </div>

            {/* Still have questions CTA */}
            <div className="max-w-3xl mt-16 rounded-2xl bg-[linear-gradient(135deg,#040714,#0D1640)] border border-white/10 p-8 text-center">
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-2">{l({ en: 'Still have questions?', kn: 'ಇನ್ನೂ ಪ್ರಶ್ನೆಗಳಿವೆಯೆ?', hi: 'अब भी प्रश्न हैं?', ta: 'இன்னும் கேள்விகள் உள்ளதா?' })}</p>
              <h3 className="text-xl font-extrabold text-white mb-2">{l({ en: "We'll add it to the FAQ", kn: 'ನಾವು ಅದನ್ನು FAQ ಗೆ ಸೇರಿಸುತ್ತೇವೆ', hi: 'हम इसे FAQ में जोड़ देंगे', ta: 'அதை FAQ-இல் சேர்ப்போம்' })}</h3>
              <p className="text-[#9BAEC6] text-sm max-w-sm mx-auto mb-5">
                {l({ en: "If your question isn't answered here, reach out and we'll respond — and add it to this page.", kn: 'ನಿಮ್ಮ ಪ್ರಶ್ನೆಗೆ ಇಲ್ಲಿ ಉತ್ತರ ಇಲ್ಲದಿದ್ದರೆ, ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ. ನಾವು ಉತ್ತರಿಸಿ ಈ ಪುಟಕ್ಕೆ ಸೇರಿಸುತ್ತೇವೆ.', hi: 'यदि आपके प्रश्न का उत्तर यहां नहीं है, हमसे संपर्क करें। हम जवाब देंगे और इसे इस पेज में जोड़ देंगे।', ta: 'உங்கள் கேள்விக்கு இங்கே பதில் இல்லை என்றால், எங்களை தொடர்புகொள்ளுங்கள். நாங்கள் பதிலளித்து இந்தப் பக்கத்தில் சேர்ப்போம்.' })}
              </p>
              <a href="mailto:hello@kwin-city.com?subject=FAQ+question" className="btn btn-primary inline-flex">
                {l({ en: 'Ask a question', kn: 'ಪ್ರಶ್ನೆಯನ್ನು ಕೇಳಿ', hi: 'प्रश्न पूछें', ta: 'ஒரு கேள்வி கேளுங்கள்' })}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
