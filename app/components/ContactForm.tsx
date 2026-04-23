'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';
import { ContactFields } from '@/components/contact/ContactFields';
import { ContactSuccessState } from '@/components/contact/ContactSuccessState';
import {
  getMessagePlaceholder,
  getSelectedPersona,
  type FormState,
  type PersonaId,
} from '@/components/contact/config';
import { PersonaSelector } from '@/components/contact/PersonaSelector';

export default function ContactForm() {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);

  const [persona, setPersona] = useState<PersonaId | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [errorRequestId, setErrorRequestId] = useState('');

  const selectedPersona = getSelectedPersona(persona);
  const messagePlaceholder = getMessagePlaceholder(selectedPersona);
  const charCount = message.length;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formState === 'submitting') {
      return;
    }

    setFormState('submitting');
    setErrorMsg('');
    setErrorRequestId('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          persona: selectedPersona?.label ?? 'Visitor',
          website: honeypot,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.');
        setErrorRequestId(typeof data.requestId === 'string' ? data.requestId : '');
        setFormState('error');
        return;
      }

      setFormState('success');
    } catch {
      setErrorMsg('Could not connect. Please check your internet connection and try again.');
      setFormState('error');
    }
  };

  return (
    <div className="min-h-screen bg-[linear-gradient(150deg,#040714_0%,#0D1640_45%,#07131F_100%)] pt-28 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#F5A623] mb-4">
            {l({ en: 'Reach out', kn: 'ಸಂಪರ್ಕಿಸಿ', hi: 'संपर्क करें', ta: 'தொடர்பு கொள்ளவும்' })}
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">
            {l({ en: 'How can we ', kn: 'ನಾವು ನಿಮಗೆ ', hi: 'हम आपकी ', ta: 'நாங்கள் உங்களுக்கு ' })}
            <span className="bg-gradient-to-r from-amber-400 to-amber-200 bg-clip-text text-transparent">
              {l({ en: 'help you?', kn: 'ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?', hi: 'कैसे मदद कर सकते हैं?', ta: 'எப்படி உதவலாம்?' })}
            </span>
          </h1>
          <p className="text-[#64748B] text-base">We read every message personally.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border border-white/[0.08] bg-[linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] backdrop-blur-sm overflow-hidden"
        >
          <div className="h-[3px] w-full bg-gradient-to-r from-[#F5A623] via-[#F5A623]/60 to-transparent" />

          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <ContactSuccessState name={name} />
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="p-6 sm:p-8 space-y-6"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PersonaSelector
                  l={l}
                  selectedPersona={persona}
                  onSelect={(personaId) => {
                    setPersona(personaId);
                    setTimeout(() => nameRef.current?.focus(), 60);
                  }}
                />

                <ContactFields
                  l={l}
                  uid={uid}
                  nameRef={nameRef}
                  name={name}
                  email={email}
                  message={message}
                  honeypot={honeypot}
                  charCount={charCount}
                  messagePlaceholder={messagePlaceholder}
                  formState={formState}
                  errorMsg={errorMsg}
                  errorRequestId={errorRequestId}
                  onNameChange={setName}
                  onEmailChange={setEmail}
                  onMessageChange={setMessage}
                  onHoneypotChange={setHoneypot}
                />

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
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
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

                  <p className="text-center text-[11px] text-[#3D5070] flex items-center justify-center gap-1.5">
                    <svg className="w-3 h-3 text-[#3D5070]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Your information is treated with absolute discretion.
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

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
