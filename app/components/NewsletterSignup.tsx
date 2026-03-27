'use client';

/**
 * KWIN City — Newsletter Signup Component
 * ──────────────────────────────────────────
 * Reusable in two modes:
 *   • variant="footer"  — compact horizontal strip for the footer
 *   • variant="section" — full-width card for landing sections
 *
 * Uses Netlify Forms (data-netlify="true") — zero backend code.
 * Honeypot field for spam prevention.
 * Persona interest checkboxes for segmented email delivery.
 */

import { useState, useId, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTERESTS = [
  { id: 'investor',   label: 'Investment updates',     icon: '📈' },
  { id: 'policy',     label: 'Policy & regulatory news',icon: '🏛️' },
  { id: 'data',       label: 'New data & research',     icon: '📊' },
  { id: 'milestones', label: 'Project milestones',      icon: '📅' },
];

type Variant = 'footer' | 'section';

export default function NewsletterSignup({ variant = 'section' }: { variant?: Variant }) {
  const uid = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>(['milestones']);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleInterest = (id: string) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const encoded = new URLSearchParams();
      for (const [k, v] of formData.entries()) {
        encoded.append(k, String(v));
      }
      // Netlify Forms POST
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encoded.toString(),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setInterests(['milestones']);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again or email us at hello@kwin-city.com.');
    }
  };

  if (variant === 'footer') {
    return (
      <div className="w-full">
        <p className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-4">Stay Updated</p>
        <p className="text-sm text-[#7C8EA6] mb-4 leading-relaxed">
          Get KWIN City milestone updates in your inbox.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-emerald-900/30 border border-emerald-700/40 px-4 py-3"
            >
              <p className="text-emerald-400 text-sm font-semibold">✅ You&apos;re subscribed!</p>
              <p className="text-emerald-500/80 text-xs mt-0.5">We&apos;ll send you the most important KWIN updates.</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              name="kwin-newsletter"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-2"
            >
              <input type="hidden" name="form-name" value="kwin-newsletter" />
              {/* Honeypot — hidden from real users */}
              <div aria-hidden="true" className="hidden">
                <input name="bot-field" tabIndex={-1} autoComplete="off" />
              </div>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-[#C8D8E8] placeholder-[#4F6280] text-sm outline-none focus:border-amber-400/60 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-[#C8D8E8] placeholder-[#4F6280] text-sm outline-none focus:border-amber-400/60 transition-colors"
              />
              {/* Hidden interests */}
              <input type="hidden" name="interests" value={interests.join(', ')} />

              {status === 'error' && (
                <p className="text-red-400 text-xs">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn btn-primary text-sm py-2.5 disabled:opacity-60"
              >
                {status === 'submitting' ? 'Subscribing…' : 'Subscribe'}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── 'section' variant ────────────────────────────────────────────────────────
  return (
    <section className="section-sm bg-gradient-to-br from-[#040714] via-[#07121F] to-[#040714] border-y border-white/6">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-3">Stay in the Loop</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              KWIN City updates, delivered.
            </h2>
            <p className="text-[#9BAEC6] text-base leading-relaxed max-w-lg mx-auto">
              Milestone announcements, new data publications, and policy developments — no noise, only signal.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-900/30 border border-emerald-700/40 rounded-2xl px-8 py-12 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-extrabold text-white mb-2">You&apos;re subscribed!</h3>
                <p className="text-emerald-300/80 text-sm">
                  We&apos;ll send you the most important KWIN City updates. No spam, ever.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                name="kwin-newsletter"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
              >
                <input type="hidden" name="form-name" value="kwin-newsletter" />
                <div aria-hidden="true" className="hidden">
                  <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${uid}-name`}
                      className="block text-xs font-semibold text-[#9BAEC6] mb-1.5"
                    >
                      Name (optional)
                    </label>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarti Sri"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-[#3A4F66] text-sm outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${uid}-email`}
                      className="block text-xs font-semibold text-[#9BAEC6] mb-1.5"
                    >
                      Email address <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-[#3A4F66] text-sm outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                </div>

                <input type="hidden" name="interests" value={interests.join(', ')} />

                {/* Interests */}
                <div>
                  <p className="text-xs font-semibold text-[#9BAEC6] mb-3">
                    What would you like to hear about?
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((int) => {
                      const selected = interests.includes(int.id);
                      return (
                        <button
                          key={int.id}
                          type="button"
                          onClick={() => toggleInterest(int.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-150 ${
                            selected
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-white/6 text-[#9BAEC6] border-white/12 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {int.icon} {int.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {status === 'submitting' ? 'Subscribing…' : 'Subscribe to updates'}
                  </button>
                  <p className="text-[#4F6280] text-xs text-center">
                    Unsubscribe at any time. No spam, ever.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
