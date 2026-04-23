import type { Ref } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { inputBase } from './styles';
import type { ContactText, FormState } from './config';

type ContactFieldsProps = {
  l: ContactText;
  uid: string;
  nameRef: Ref<HTMLInputElement>;
  name: string;
  email: string;
  message: string;
  honeypot: string;
  charCount: number;
  messagePlaceholder: string;
  formState: FormState;
  errorMsg: string;
  errorRequestId: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onMessageChange: (value: string) => void;
  onHoneypotChange: (value: string) => void;
};

export function ContactFields({
  l,
  uid,
  nameRef,
  name,
  email,
  message,
  honeypot,
  charCount,
  messagePlaceholder,
  formState,
  errorMsg,
  errorRequestId,
  onNameChange,
  onEmailChange,
  onMessageChange,
  onHoneypotChange,
}: ContactFieldsProps) {
  return (
    <>
      <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
        <input
          tabIndex={-1}
          autoComplete="off"
          name="website"
          value={honeypot}
          onChange={(event) => onHoneypotChange(event.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="block text-xs font-bold tracking-[0.14em] uppercase text-[#64748B] mb-2"
          >
            {l({ en: 'Your name', kn: 'ನಿಮ್ಮ ಹೆಸರು', hi: 'आपका नाम', ta: 'உங்கள் பெயர்' })}
          </label>
          <input
            ref={nameRef}
            id={`${uid}-name`}
            type="text"
            required
            maxLength={120}
            autoComplete="name"
            placeholder="Arjun Sharma"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            className={inputBase}
            aria-describedby={formState === 'error' ? `${uid}-error` : undefined}
          />
        </div>

        <div>
          <label
            htmlFor={`${uid}-email`}
            className="block text-xs font-bold tracking-[0.14em] uppercase text-[#64748B] mb-2"
          >
            {l({ en: 'Your email', kn: 'ನಿಮ್ಮ ಇಮೇಲ್', hi: 'आपका ईमेल', ta: 'உங்கள் மின்னஞ்சல்' })}
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            required
            maxLength={200}
            inputMode="email"
            autoComplete="email"
            placeholder="arjun@example.com"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            className={inputBase}
            aria-describedby={formState === 'error' ? `${uid}-error` : undefined}
          />
        </div>
      </div>

      <div>
        <div className="flex items-baseline justify-between mb-2">
          <label htmlFor={`${uid}-message`} className="text-xs font-bold tracking-[0.14em] uppercase text-[#64748B]">
            {l({ en: 'Message', kn: 'ಸಂದೇಶ', hi: 'संदेश', ta: 'செய்தி' })}
          </label>
          <span
            id={`${uid}-charcount`}
            className={[
              'text-[11px] tabular-nums transition-colors',
              charCount > 900 ? 'text-amber-400' : 'text-[#4F6280]',
            ].join(' ')}
            aria-live="polite"
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
          onChange={(event) => onMessageChange(event.target.value)}
          className={`${inputBase} resize-none`}
          aria-describedby={formState === 'error' ? `${uid}-error` : `${uid}-charcount`}
        />
      </div>

      <AnimatePresence>
        {formState === 'error' && errorMsg ? (
          <motion.p
            id={`${uid}-error`}
            key="err"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3"
            role="alert"
            aria-live="polite"
          >
            {errorMsg}
            {errorRequestId ? ` Reference ID: ${errorRequestId}` : ''}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </>
  );
}
