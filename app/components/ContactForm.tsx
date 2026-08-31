'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';
import { ContactFields } from '@/components/contact/ContactFields';
import { ContactSuccessState } from '@/components/contact/ContactSuccessState';
import { getMessagePlaceholder, getSelectedPersona, type FormState, type PersonaId } from '@/components/contact/config';
import { PersonaSelector } from '@/components/contact/PersonaSelector';

type FieldName = 'name' | 'email' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;

const CONTACT_EMAIL = 'hello@kwin-city.com';

export default function ContactForm() {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const uid = useId();
  const nameRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const [persona, setPersona] = useState<PersonaId | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg] = useState('');
  const [errorRequestId, setErrorRequestId] = useState('');

  const selectedPersona = getSelectedPersona(persona);
  const messagePlaceholder = getMessagePlaceholder(selectedPersona);
  const charCount = message.length;

  const validate = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = 'Enter your name so we know how to address you.';
    if (!email.trim()) errors.email = 'Enter an email address so we can reply.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errors.email = 'Enter a valid email address, such as name@example.com.';
    if (!message.trim()) errors.message = 'Tell us a little about what you need.';
    else if (message.trim().length < 20) errors.message = 'Please add a little more detail (at least 20 characters) so we can respond usefully.';
    return errors;
  };

  const clearFieldError = (field: FieldName) => {
    setFieldErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
    if (formState === 'error') setFormState('idle');
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formState === 'submitting') return;

    const errors = validate();
    if (Object.keys(errors).length) {
      setFieldErrors(errors);
      setErrorMsg('Please correct the highlighted fields and try again.');
      setErrorRequestId('');
      setFormState('error');
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
      return;
    }

    setFormState('submitting');
    setFieldErrors({});
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
        window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
        return;
      }
      setFormState('success');
    } catch {
      setErrorMsg('We could not connect right now. Check your connection and try again, or email us directly.');
      setFormState('error');
      window.requestAnimationFrame(() => errorSummaryRef.current?.focus());
    }
  };

  return (
    <main id="main-content" className="kwin-page-top overflow-hidden bg-[#f7f8fc] pb-16">
      <section className="relative isolate overflow-hidden bg-[#07112d] px-4 pb-16 pt-12 text-white sm:px-6 lg:px-8">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_12%,rgba(245,166,35,0.22),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(6,182,212,0.18),transparent_30%)]" />
        <div className="mx-auto max-w-6xl">
          <p className="inline-flex rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-amber-200">Contact KWIN City</p>
          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.65fr)] lg:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">A clear route to the right conversation.</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">Ask a project question, request evidence, share a correction, or begin a media, research, or partnership conversation. Choose the context that best fits, then write in your own words.</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
              <p className="text-sm font-bold text-white">Prefer email?</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="mt-2 inline-flex break-all text-base font-semibold text-amber-200 underline decoration-amber-200/40 underline-offset-4 hover:text-white">{CONTACT_EMAIL}</a>
              <p className="mt-3 text-sm leading-6 text-slate-300">Use the form when context helps us route your message. Do not send passwords, financial details, or sensitive documents.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(17rem,.75fr)] lg:px-8">
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] sm:p-8">
          {formState === 'success' ? <ContactSuccessState name={name} /> : (
            <form noValidate onSubmit={handleSubmit} className="space-y-7" aria-describedby={`${uid}-form-note`}>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-amber-700">Start here</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">Tell us what brings you here.</h2>
                <p id={`${uid}-form-note`} className="mt-2 text-sm leading-6 text-slate-600">Three short fields are all that is required. You can choose a path to give us useful context, but it is optional.</p>
              </div>

              {formState === 'error' && errorMsg ? <div ref={errorSummaryRef} tabIndex={-1} role="alert" aria-live="assertive" className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"><p className="font-bold">There’s something to fix</p><p className="mt-1">{errorMsg}{errorRequestId ? ` Reference ID: ${errorRequestId}` : ''}</p></div> : null}

              <PersonaSelector l={l} selectedPersona={persona} onSelect={(personaId) => { setPersona(personaId); window.setTimeout(() => nameRef.current?.focus(), 0); }} />
              <ContactFields l={l} uid={uid} nameRef={nameRef} name={name} email={email} message={message} honeypot={honeypot} charCount={charCount} messagePlaceholder={messagePlaceholder} fieldErrors={fieldErrors} onNameChange={(value) => { setName(value); clearFieldError('name'); }} onEmailChange={(value) => { setEmail(value); clearFieldError('email'); }} onMessageChange={(value) => { setMessage(value); clearFieldError('message'); }} onHoneypotChange={setHoneypot} />

              <div className="border-t border-slate-200 pt-6">
                <button type="submit" disabled={formState === 'submitting'} className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[#0b1738] px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-[#142453] disabled:cursor-wait disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                  {formState === 'submitting' ? 'Sending your message…' : 'Send message'}
                </button>
                <p className="mt-3 text-center text-xs leading-5 text-slate-500">By sending, you are asking KWIN City to use these details to respond to this enquiry. For source corrections, include the page or claim URL where possible.</p>
              </div>
            </form>
          )}
        </div>

        <aside className="space-y-4" aria-label="Helpful contact routes">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-[0_14px_32px_rgba(15,23,42,0.05)]"><p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-800">Before you write</p><h2 className="mt-2 text-xl font-black text-slate-950">Find an answer in the evidence.</h2><p className="mt-3 text-sm leading-6 text-slate-600">The fastest answer may already be source-linked and ready to inspect.</p><div className="mt-5 grid gap-2"><Link href="/faq" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50">Browse common questions <span aria-hidden="true">→</span></Link><Link href="/sources" className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-cyan-300 hover:bg-cyan-50">Review sources and claims <span aria-hidden="true">→</span></Link></div></div>
          <div className="rounded-[24px] bg-[#eaf5f7] p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-900">Good messages are easy to route</p><ul className="mt-4 space-y-3 text-sm leading-6 text-slate-700"><li><strong className="text-slate-950">Research:</strong> name the question, timeframe, or dataset.</li><li><strong className="text-slate-950">Media:</strong> include your publication and deadline.</li><li><strong className="text-slate-950">Correction:</strong> link the page or claim and the supporting source.</li></ul></div>
          <div className="rounded-[24px] border border-amber-200 bg-amber-50 p-6"><p className="text-sm font-bold text-amber-950">Trust and safety</p><p className="mt-2 text-sm leading-6 text-amber-900">We will not ask for a password, OTP, bank information, or payment over this form. If a message appears suspicious, use this page or the official email address above to verify it.</p></div>
        </aside>
      </section>
    </main>
  );
}
