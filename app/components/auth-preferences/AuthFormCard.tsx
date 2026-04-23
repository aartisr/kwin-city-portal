import type { FormEvent } from 'react';
import type { LocalizedValue } from '@/lib/i18n/messages';
import type { SessionUser } from './config';

type TranslateFn = (values: LocalizedValue<string>) => string;

type AuthFormCardProps = {
  l: TranslateFn;
  mode: 'signin' | 'signup';
  session: SessionUser | null;
  busy: boolean;
  name: string;
  email: string;
  password: string;
  onModeChange: (mode: 'signin' | 'signup') => void;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onSignOut: () => void;
};

export function AuthFormCard({
  l,
  mode,
  session,
  busy,
  name,
  email,
  password,
  onModeChange,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onSignOut,
}: AuthFormCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => onModeChange('signin')}
          className={`px-4 py-2 rounded-lg text-sm font-bold ${mode === 'signin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          {l({ en: 'Sign In', kn: 'ಲಾಗಿನ್', hi: 'साइन इन', ta: 'உள்நுழை' })}
        </button>
        <button
          onClick={() => onModeChange('signup')}
          className={`px-4 py-2 rounded-lg text-sm font-bold ${mode === 'signup' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
        >
          {l({ en: 'Sign Up', kn: 'ನೋಂದಣಿ', hi: 'साइन अप', ta: 'பதிவு செய்' })}
        </button>
      </div>

      {session ? (
        <div className="space-y-3">
          <p className="text-sm text-slate-600">{l({ en: 'Signed in as', kn: 'ಈ ಹೆಸರಿನಲ್ಲಿ ಲಾಗಿನ್ ಆಗಿದ್ದಾರೆ', hi: 'इस रूप में साइन इन', ta: 'இவராக உள்நுழைந்துள்ளார்' })}</p>
          <p className="text-xl font-extrabold text-slate-900">{session.name}</p>
          <p className="text-sm text-slate-700">{session.email}</p>
          <button
            onClick={onSignOut}
            disabled={busy}
            className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
          >
            {l({ en: 'Sign Out', kn: 'ಲಾಗ್ ಔಟ್', hi: 'साइन आउट', ta: 'வெளியேறு' })}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'signup' ? (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Name', kn: 'ಹೆಸರು', hi: 'नाम', ta: 'பெயர்' })}</label>
              <input
                value={name}
                onChange={(event) => onNameChange(event.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2"
                placeholder={l({ en: 'Your name', kn: 'ನಿಮ್ಮ ಹೆಸರು', hi: 'आपका नाम', ta: 'உங்கள் பெயர்' })}
              />
            </div>
          ) : null}

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Email', kn: 'ಇಮೇಲ್', hi: 'ईमेल', ta: 'மின்னஞ்சல்' })}</label>
            <input
              type="email"
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Password', kn: 'ಪಾಸ್‌ವರ್ಡ್', hi: 'पासवर्ड', ta: 'கடவுச்சொல்' })}</label>
            <input
              type="password"
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              className="w-full rounded-lg border border-slate-300 px-3 py-2"
              placeholder={l({ en: 'Enter password', kn: 'ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ', hi: 'पासवर्ड दर्ज करें', ta: 'கடவுச்சொல்லை உள்ளிடவும்' })}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60"
          >
            {mode === 'signup'
              ? l({ en: 'Create Account', kn: 'ಖಾತೆ ರಚಿಸಿ', hi: 'खाता बनाएं', ta: 'கணக்கை உருவாக்கு' })
              : l({ en: 'Sign In', kn: 'ಲಾಗಿನ್', hi: 'साइन इन', ta: 'உள்நுழை' })}
          </button>
        </form>
      )}
    </div>
  );
}
