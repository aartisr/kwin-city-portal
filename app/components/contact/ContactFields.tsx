import type { Ref } from 'react';
import { inputBase } from './styles';
import type { ContactText } from './config';

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
  fieldErrors: Partial<Record<'name' | 'email' | 'message', string>>;
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
  fieldErrors,
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
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? `${uid}-name-error` : undefined}
          />
          {fieldErrors.name ? <p id={`${uid}-name-error`} className="mt-2 text-sm font-medium text-red-700">{fieldErrors.name}</p> : null}
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
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? `${uid}-email-error` : undefined}
          />
          {fieldErrors.email ? <p id={`${uid}-email-error`} className="mt-2 text-sm font-medium text-red-700">{fieldErrors.email}</p> : null}
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
          className={`${inputBase} resize-y`}
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? `${uid}-message-error ${uid}-charcount` : `${uid}-charcount`}
        />
        {fieldErrors.message ? <p id={`${uid}-message-error`} className="mt-2 text-sm font-medium text-red-700">{fieldErrors.message}</p> : null}
      </div>
    </>
  );
}
