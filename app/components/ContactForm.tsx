'use client';

import { useState, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ─── Persona definitions ──────────────────────────────────────────────────────
const PERSONAS = [
  {
    id: 'investor',
    label: 'Investor',
    icon: '📈',
    placeholder:
      "Tell us about your investment focus — sector, scale, timeline — or ask a specific question about KWIN's opportunity landscape...",
  },
  {
    id: 'resident',
    label: 'Resident',
    icon: '🏡',
    placeholder:
      "Ask us about livability, location, connectivity, or what everyday life at KWIN City might look like for you and your family...",
  },
  {
    id: 'researcher',
    label: 'Researcher',
    icon: '🔬',
    placeholder:
      "Tell us what you are researching and how KWIN's data or evidence system might be useful for your work...",
  },
  {
    id: 'journalist',
    label: 'Journalist',
    icon: '📰',
    placeholder:
      "Describe your story angle, publication, or request for additional primary source material and expert access...",
  },
  {
    id: 'other',
    label: 'Other',
    icon: '💬',
    placeholder:
      "Tell us about yourself and how we can help. There is no wrong question — we read everything...",
  },
] as const;

type PersonaId = (typeof PERSONAS)[number]['id'];
type FormState = 'idle' | 'submitting' | 'success' | 'error';

// ─── Input styles shared ──────────────────────────────────────────────────────
const inputBase =
  'w-full rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder:text-[#4F6280] ' +
  'px-4 py-3 text-[15px] leading-6 outline-none ' +
  'focus:border-[#F5A623]/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-[#F5A623]/10 ' +
  'transition-all duration-200 autofill:bg-transparent';

export default function ContactForm() {
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);

  const [persona, setPersona] = useState<PersonaId | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // hidden anti-spam field
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const selectedPersona = PERSONAS.find((p) => p.id === persona);
  const messagePlaceholder =
    selectedPersona?.placeholder ??
    'Tell us what you have in mind. We read every message personally...';
  const charCount = message.length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (formState === 'submitting') return;

    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          persona: selectedPersona?.label ?? 'Visitor',
          website: honeypot, // honeypot — server checks this
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setFormState('error');
        return;
      }

      setFormState('success');
    } catch {
      setErrorMsg('Could not connect. Please check your internet connection and try again.');
      setFormState('error');
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(150deg,#040714_0%,#0D1640_45%,#07131F_100%)] pt-28 pb-20 px-4">
      <div className="max-w-xl mx-auto">

        {/* Eyebrow + heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F5A623] mb-4">
            Reach out
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            How can we{' '}
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              help you?
            </span>
          </h1>
          <p className="text-[#64748B] text-base">
            We read every message personally.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] backdrop-blur-sm overflow-hidden"
        >
          {/* Amber top accent line */}
          <div className="h-[3px] w-full bg-gradient-to-r from-[#F5A623] via-[#F5A623]/60 to-transparent" />

          <AnimatePresence mode="wait">
            {/* ── SUCCESS STATE ─────────────────────────────────────────── */}
            {formState === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="p-10 flex flex-col items-center text-center gap-5"
              >
                {/* Animated checkmark circle */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 220, damping: 16 }}
                  className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center"
                >
                  <motion.svg
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
                    viewBox="0 0 24 24"
                    fill="none"
                    className="w-8 h-8"
                  >
                    <motion.path
                      d="M5 13l4 4L19 7"
                      stroke="#10B981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                </motion.div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-2">Message sent.</h2>
                  <p className="text-[#94A3B8] text-sm leading-relaxed max-w-xs">
                    Thank you, {name.split(' ')[0]}. We will be in touch shortly.
                  </p>
                </div>

                <Link
                  href="/"
                  className="mt-2 text-sm font-semibold text-[#F5A623] hover:text-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>←</span> Back to KWIN City
                </Link>
              </motion.div>
            ) : (
              /* ── FORM STATE ─────────────────────────────────────────────── */
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >

                {/* Anti-spam honeypot (hidden from real users) */}
                <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* ── PERSONA CHIPS ───────────────────────────────────── */}
                <fieldset>
                  <legend className="block text-xs font-bold tracking-[0.14em] uppercase text-[#64748B] mb-3">
                    Who are you?
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {PERSONAS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setPersona(p.id);
                          // Move focus to name after persona selection
                          setTimeout(() => nameRef.current?.focus(), 60);
                        }}
                        aria-pressed={persona === p.id}
                        className={[
                          'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-200',
                          persona === p.id
                            ? 'bg-[#F5A623] border-[#F5A623] text-[#040714] shadow-[0_0_18px_rgba(245,166,35,0.25)]'
                            : 'bg-white/[0.03] border-white/10 text-[#94A3B8] hover:border-[#F5A623]/40 hover:text-white',
                        ].join(' ')}
                      >
                        <span className="text-base leading-none">{p.icon}</span>
                        {p.label}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* ── NAME + EMAIL (side-by-side on sm+) ──────────────── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${uid}-name`}
                      className="block text-xs font-bold tracking-[0.14em] uppercase text-[#64748B] mb-2"
                    >
                      Your name
                    </label>
                    <input
                      ref={nameRef}
                      id={`${uid}-name`}
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Arjun Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${uid}-email`}
                      className="block text-xs font-bold tracking-[0.14em] uppercase text-[#64748B] mb-2"
                    >
                      Your email
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="arjun@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputBase}
                    />
                  </div>
                </div>

                {/* ── MESSAGE ─────────────────────────────────────────── */}
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <label
                      htmlFor={`${uid}-message`}
                      className="text-xs font-bold tracking-[0.14em] uppercase text-[#64748B]"
                    >
                      Message
                    </label>
                    <span
                      className={[
                        'text-[11px] tabular-nums transition-colors',
                        charCount > 900 ? 'text-amber-400' : 'text-[#4F6280]',
                      ].join(' ')}
                    >
                      {charCount}/1000
                    </span>
                  </div>
                  <textarea
                    id={`${uid}-message`}
                    required
                    rows={5}
                    maxLength={1000}
                    placeholder={messagePlaceholder}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputBase} resize-none`}
                  />
                </div>

                {/* ── ERROR MESSAGE ────────────────────────────────────── */}
                <AnimatePresence>
                  {formState === 'error' && errorMsg && (
                    <motion.p
                      key="err"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* ── SUBMIT ──────────────────────────────────────────── */}
                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={formState === 'submitting'}
                    className={[
                      'group relative w-full rounded-xl py-3.5 px-6 font-bold text-[15px] text-[#040714]',
                      'bg-[linear-gradient(135deg,#F5A623,#E8962E)]',
                      'shadow-[0_4px_24px_rgba(245,166,35,0.22)]',
                      'hover:shadow-[0_6px_32px_rgba(245,166,35,0.35)] hover:brightness-110',
                      'disabled:opacity-60 disabled:cursor-not-allowed',
                      'transition-all duration-200',
                    ].join(' ')}
                  >
                    {formState === 'submitting' ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        Send Message
                        <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5">
                          →
                        </span>
                      </span>
                    )}
                  </button>

                  {/* Privacy note */}
                  <p className="text-center text-[11px] text-[#3D5070] flex items-center justify-center gap-1.5">
                    <svg className="w-3 h-3 text-[#3D5070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Your information is treated with absolute discretion.
                  </p>
                </div>

              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Bottom nav */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 text-sm text-[#4F6280]"
        >
          <Link href="/" className="hover:text-[#F5A623] transition-colors">
            ← Back to KWIN City
          </Link>
        </motion.p>

      </div>
    </div>
  );
}
