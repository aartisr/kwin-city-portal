'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

type Preferences = {
  persona: 'investor' | 'resident' | 'researcher' | 'journalist' | 'citizen';
  favoriteTopics: string[];
  digestFrequency: 'daily' | 'weekly' | 'monthly';
  emailUpdates: boolean;
};

const defaultPreferences: Preferences = {
  persona: 'resident',
  favoriteTopics: ['timeline'],
  digestFrequency: 'weekly',
  emailUpdates: true,
};

const allTopics = ['timeline', 'sectors', 'sustainability', 'evidence', 'news-intelligence'];

export default function AuthPreferences() {
  const { locale } = useI18n();
  const isKn = locale === 'kn';
  const isHi = locale === 'hi';
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<SessionUser | null>(null);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [csrf, setCsrf] = useState('');

  const loadSession = async () => {
    const res = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!res.ok) {
      setSession(null);
      return;
    }
    const data = (await res.json()) as { user: SessionUser | null; csrf?: string };
    setSession(data.user);
    if (data.csrf) setCsrf(data.csrf);
  };

  const loadPreferences = async () => {
    const res = await fetch('/api/preferences', { cache: 'no-store' });
    if (!res.ok) {
      setPreferences(defaultPreferences);
      return;
    }
    const data = (await res.json()) as { preferences: Preferences };
    setPreferences(data.preferences);
  };

  useEffect(() => {
    loadSession().catch(() => setSession(null));
  }, []);

  useEffect(() => {
    if (!session) return;
    loadPreferences().catch(() => setPreferences(defaultPreferences));
  }, [session]);

  const handleAuth = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setStatus('');

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
      const payload =
        mode === 'signup'
          ? { name, email, password }
          : { email, password };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        body: JSON.stringify(payload),
      });

      const data = (await res.json()) as { error?: string; user?: SessionUser };

      if (!res.ok) {
        setStatus(data.error || 'Authentication failed.');
        return;
      }

      setSession(data.user || null);
      setPassword('');
      setStatus(mode === 'signup' ? 'Account created and signed in.' : 'Signed in successfully.');
    } catch {
      setStatus('Request failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    setBusy(true);
    try {
      await fetch('/api/auth/signout', {
        method: 'POST',
        headers: { 'x-csrf-token': csrf },
      });
      setSession(null);
      setPreferences(defaultPreferences);
      setStatus('Signed out.');
      await loadSession();
    } finally {
      setBusy(false);
    }
  };

  const toggleTopic = (topic: string) => {
    setPreferences((prev) => {
      const has = prev.favoriteTopics.includes(topic);
      return {
        ...prev,
        favoriteTopics: has ? prev.favoriteTopics.filter((t) => t !== topic) : [...prev.favoriteTopics, topic],
      };
    });
  };

  const savePreferences = async () => {
    setBusy(true);
    setStatus('');
    try {
      const res = await fetch('/api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        body: JSON.stringify(preferences),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus(data.error || 'Could not save preferences.');
        return;
      }
      setStatus('Preferences saved.');
    } catch {
      setStatus('Request failed. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="bg-gradient-to-r from-[#102A43] to-[#0F4C75] text-white py-14">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{isKn ? 'ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳು' : isHi ? 'खाता और प्राथमिकताएँ' : 'Account and Preferences'}</h1>
          <p className="text-slate-200 max-w-2xl">
            {isKn ? 'ಸರ್ವರ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಬಳಕೆದಾರರ ಆದ್ಯತೆಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತ ಸೆಷನ್ ದೃಢೀಕರಣ.' : isHi ? 'सर्वर पर संग्रहीत उपयोगकर्ता प्राथमिकताओं के साथ सुरक्षित सत्र प्रमाणीकरण।' : 'Secure session authentication with server-stored user preferences.'}
          </p>
        </div>
      </section>

      <section className="container py-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setMode('signin')}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${mode === 'signin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {isKn ? 'ಲಾಗಿನ್' : isHi ? 'साइन इन' : 'Sign In'}
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-lg text-sm font-bold ${mode === 'signup' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700'}`}
            >
              {isKn ? 'ನೋಂದಣಿ' : isHi ? 'साइन अप' : 'Sign Up'}
            </button>
          </div>

          {session ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-600">{isKn ? 'ಈ ಹೆಸರಿನಲ್ಲಿ ಲಾಗಿನ್ ಆಗಿದ್ದಾರೆ' : isHi ? 'इस रूप में साइन इन' : 'Signed in as'}</p>
              <p className="text-xl font-extrabold text-slate-900">{session.name}</p>
              <p className="text-sm text-slate-700">{session.email}</p>
              <button
                onClick={signOut}
                disabled={busy}
                className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {isKn ? 'ಲಾಗ್ ಔಟ್' : isHi ? 'साइन आउट' : 'Sign Out'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              {mode === 'signup' ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{isKn ? 'ಹೆಸರು' : isHi ? 'नाम' : 'Name'}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    placeholder={isKn ? 'ನಿಮ್ಮ ಹೆಸರು' : isHi ? 'आपका नाम' : 'Your name'}
                  />
                </div>
              ) : null}

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{isKn ? 'ಇಮೇಲ್' : isHi ? 'ईमेल' : 'Email'}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{isKn ? 'ಪಾಸ್‌ವರ್ಡ್' : isHi ? 'पासवर्ड' : 'Password'}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder={isKn ? 'ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' : isHi ? 'पासवर्ड दर्ज करें' : 'Enter password'}
                />
              </div>

              <button
                type="submit"
                disabled={busy}
                className="w-full px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors disabled:opacity-60"
              >
                {mode === 'signup' ? (isKn ? 'ಖಾತೆ ರಚಿಸಿ' : isHi ? 'खाता बनाएं' : 'Create Account') : (isKn ? 'ಲಾಗಿನ್' : isHi ? 'साइन इन' : 'Sign In')}
              </button>
            </form>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">{isKn ? 'ಉಳಿಸಿದ ಆದ್ಯತೆಗಳು' : isHi ? 'सहेजी गई प्राथमिकताएँ' : 'Saved Preferences'}</h2>
          {!session ? (
            <p className="text-slate-600">Sign in to manage saved preferences.</p>
          ) : (
            <div className="space-y-5">
              <div>
                <label htmlFor="primary-persona" className="block text-sm font-semibold text-slate-700 mb-1">
                  Primary Persona
                </label>
                <select
                  id="primary-persona"
                  title="Primary Persona"
                  value={preferences.persona}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      persona: e.target.value as Preferences['persona'],
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="investor">Investor</option>
                  <option value="resident">Resident</option>
                  <option value="researcher">Researcher</option>
                  <option value="journalist">Journalist</option>
                  <option value="citizen">Curious Citizen</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">Favorite Topics</p>
                <div className="flex flex-wrap gap-2">
                  {allTopics.map((topic) => {
                    const active = preferences.favoriteTopics.includes(topic);
                    return (
                      <button
                        key={topic}
                        onClick={() => toggleTopic(topic)}
                        className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                          active
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                        }`}
                      >
                        {topic}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Digest Frequency</label>
                <div className="flex gap-2">
                  {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                    <button
                      key={freq}
                      onClick={() => setPreferences((prev) => ({ ...prev, digestFrequency: freq }))}
                      className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                        preferences.digestFrequency === freq
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {freq}
                    </button>
                  ))}
                </div>
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={preferences.emailUpdates}
                  onChange={(e) => setPreferences((prev) => ({ ...prev, emailUpdates: e.target.checked }))}
                  className="w-4 h-4"
                />
                <span className="text-sm text-slate-700">Enable email updates</span>
              </label>

              <button
                onClick={savePreferences}
                disabled={busy}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </section>

      {status ? (
        <div className="container pb-10">
          <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">{status}</p>
        </div>
      ) : null}
    </main>
  );
}
