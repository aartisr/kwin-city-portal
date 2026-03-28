'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

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
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [session, setSession] = useState<SessionUser | null>(null);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const [csrf, setCsrf] = useState('');

  const topicLabel = (topic: string) => {
    if (topic === 'timeline') return l({ en: 'Timeline', kn: 'ಟೈಮ್‌ಲೈನ್', hi: 'टाइमलाइन', ta: 'காலவரிசை' });
    if (topic === 'sectors') return l({ en: 'Sectors', kn: 'ಕ್ಷೇತ್ರಗಳು', hi: 'सेक्टर', ta: 'துறைகள்' });
    if (topic === 'sustainability') return l({ en: 'Sustainability', kn: 'ಸ್ಥಿರತೆ', hi: 'स्थिरता', ta: 'நிலைத்தன்மை' });
    if (topic === 'evidence') return l({ en: 'Evidence', kn: 'ಸಾಕ್ಷ್ಯ', hi: 'प्रमाण', ta: 'ஆதாரம்' });
    if (topic === 'news-intelligence') return l({ en: 'News Intelligence', kn: 'ಸುದ್ದಿ ಒಳನೋಟ', hi: 'समाचार इंटेलिजेंस', ta: 'செய்தி நுண்ணறிவு' });
    return topic;
  };

  const freqLabel = (freq: Preferences['digestFrequency']) => {
    if (freq === 'daily') return l({ en: 'Daily', kn: 'ದಿನನಿತ್ಯ', hi: 'दैनिक', ta: 'தினசரி' });
    if (freq === 'weekly') return l({ en: 'Weekly', kn: 'ವಾರಂವಾರ', hi: 'साप्ताहिक', ta: 'வாராந்திர' });
    return l({ en: 'Monthly', kn: 'ಮಾಸಿಕ', hi: 'मासिक', ta: 'மாதாந்திர' });
  };

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
        setStatus(data.error || l({ en: 'Authentication failed.', kn: 'ದೃಢೀಕರಣ ವಿಫಲವಾಗಿದೆ.', hi: 'प्रमाणीकरण विफल हुआ।', ta: 'அங்கீகாரம் தோல்வியடைந்தது.' }));
        return;
      }

      setSession(data.user || null);
      setPassword('');
      setStatus(
        mode === 'signup'
          ? l({ en: 'Account created and signed in.', kn: 'ಖಾತೆ ರಚಿಸಿ ಲಾಗಿನ್ ಮಾಡಲಾಗಿದೆ.', hi: 'खाता बनाया गया और साइन इन हुआ।', ta: 'கணக்கு உருவாக்கப்பட்டு உள்நுழைந்துள்ளது.' })
          : l({ en: 'Signed in successfully.', kn: 'ಯಶಸ್ವಿಯಾಗಿ ಲಾಗಿನ್ ಆಗಿದೆ.', hi: 'सफलतापूर्वक साइन इन हुआ।', ta: 'வெற்றிகரமாக உள்நுழைந்தது.' }),
      );
    } catch {
      setStatus(l({ en: 'Request failed. Please try again.', kn: 'ವಿನಂತಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', hi: 'अनुरोध विफल हुआ। कृपया फिर प्रयास करें।', ta: 'கோரிக்கை தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.' }));
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
      setStatus(l({ en: 'Signed out.', kn: 'ಲಾಗ್ ಔಟ್ ಆಗಿದೆ.', hi: 'साइन आउट हो गया।', ta: 'வெளியேறிவிட்டீர்கள்.' }));
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
        setStatus(data.error || l({ en: 'Could not save preferences.', kn: 'ಆದ್ಯತೆಗಳನ್ನು ಉಳಿಸಲಾಗಲಿಲ್ಲ.', hi: 'प्राथमिकताएँ सहेजी नहीं जा सकीं।', ta: 'முன்னுரிமைகளை சேமிக்க முடியவில்லை.' }));
        return;
      }
      setStatus(l({ en: 'Preferences saved.', kn: 'ಆದ್ಯತೆಗಳು ಉಳಿಸಲಾಗಿದೆ.', hi: 'प्राथमिकताएँ सहेजी गईं।', ta: 'முன்னுரிமைகள் சேமிக்கப்பட்டன.' }));
    } catch {
      setStatus(l({ en: 'Request failed. Please try again.', kn: 'ವಿನಂತಿ ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.', hi: 'अनुरोध विफल हुआ। कृपया फिर प्रयास करें।', ta: 'கோரிக்கை தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.' }));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <section className="bg-gradient-to-r from-[#102A43] to-[#0F4C75] text-white py-14">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">{l({ en: 'Account and Preferences', kn: 'ಖಾತೆ ಮತ್ತು ಆದ್ಯತೆಗಳು', hi: 'खाता और प्राथमिकताएँ', ta: 'கணக்கும் முன்னுரிமைகளும்' })}</h1>
          <p className="text-slate-200 max-w-2xl">
            {l({ en: 'Secure session authentication with server-stored user preferences.', kn: 'ಸರ್ವರ್‌ನಲ್ಲಿ ಉಳಿಸಿದ ಬಳಕೆದಾರರ ಆದ್ಯತೆಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತ ಸೆಷನ್ ದೃಢೀಕರಣ.', hi: 'सर्वर पर संग्रहीत उपयोगकर्ता प्राथमिकताओं के साथ सुरक्षित सत्र प्रमाणीकरण।', ta: 'சேவையகத்தில் சேமிக்கப்பட்ட பயனர் முன்னுரிமைகளுடன் பாதுகாப்பான அமர்வு உறுதிப்படுத்தல்.' })}
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
              {l({ en: 'Sign In', kn: 'ಲಾಗಿನ್', hi: 'साइन इन', ta: 'உள்நுழை' })}
            </button>
            <button
              onClick={() => setMode('signup')}
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
                onClick={signOut}
                disabled={busy}
                className="mt-2 px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors disabled:opacity-60"
              >
                {l({ en: 'Sign Out', kn: 'ಲಾಗ್ ಔಟ್', hi: 'साइन आउट', ta: 'வெளியேறு' })}
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuth} className="space-y-4">
              {mode === 'signup' ? (
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Name', kn: 'ಹೆಸರು', hi: 'नाम', ta: 'பெயர்' })}</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Password', kn: 'ಪಾಸ್‌ವರ್ಡ್', hi: 'पासवर्ड', ta: 'கடவுச்சொல்' })}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">{l({ en: 'Saved Preferences', kn: 'ಉಳಿಸಿದ ಆದ್ಯತೆಗಳು', hi: 'सहेजी गई प्राथमिकताएँ', ta: 'சேமிக்கப்பட்ட முன்னுரிமைகள்' })}</h2>
          {!session ? (
            <p className="text-slate-600">{l({ en: 'Sign in to manage saved preferences.', kn: 'ಉಳಿಸಿದ ಆದ್ಯತೆಗಳನ್ನು ನಿರ್ವಹಿಸಲು ಲಾಗಿನ್ ಮಾಡಿ.', hi: 'सहेजी गई प्राथमिकताएँ प्रबंधित करने के लिए साइन इन करें।', ta: 'சேமிக்கப்பட்ட முன்னுரிமைகளை நிர்வகிக்க உள்நுழைக.' })}</p>
          ) : (
            <div className="space-y-5">
              <div>
                <label htmlFor="primary-persona" className="block text-sm font-semibold text-slate-700 mb-1">
                  {l({ en: 'Primary Persona', kn: 'ಮುಖ್ಯ ವ್ಯಕ್ತಿತ್ವ', hi: 'मुख्य पर्सोना', ta: 'முதன்மை நபர் வகை' })}
                </label>
                <select
                  id="primary-persona"
                  title={l({ en: 'Primary Persona', kn: 'ಮುಖ್ಯ ವ್ಯಕ್ತಿತ್ವ', hi: 'मुख्य पर्सोना', ta: 'முதன்மை நபர் வகை' })}
                  value={preferences.persona}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      persona: e.target.value as Preferences['persona'],
                    }))
                  }
                  className="w-full rounded-lg border border-slate-300 px-3 py-2"
                >
                  <option value="investor">{l({ en: 'Investor', kn: 'ಹೂಡಿಕೆದಾರ', hi: 'निवेशक', ta: 'முதலீட்டாளர்' })}</option>
                  <option value="resident">{l({ en: 'Resident', kn: 'ನಿವಾಸಿ', hi: 'निवासी', ta: 'வசிப்பவர்' })}</option>
                  <option value="researcher">{l({ en: 'Researcher', kn: 'ಸಂಶೋಧಕ', hi: 'शोधकर्ता', ta: 'ஆராய்ச்சியாளர்' })}</option>
                  <option value="journalist">{l({ en: 'Journalist', kn: 'ಪತ್ರಕರ್ತ', hi: 'पत्रकार', ta: 'செய்தியாளர்' })}</option>
                  <option value="citizen">{l({ en: 'Curious Citizen', kn: 'ಕುತೂಹಲ ನಾಗರಿಕ', hi: 'जिज्ञासु नागरिक', ta: 'ஆர்வமுள்ள குடிமகன்' })}</option>
                </select>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-700 mb-2">{l({ en: 'Favorite Topics', kn: 'ಇಷ್ಟವಾದ ವಿಷಯಗಳು', hi: 'पसंदीदा विषय', ta: 'பிடித்த தலைப்புகள்' })}</p>
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
                        {topicLabel(topic)}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Digest Frequency', kn: 'ಡೈಜೆಸ್ಟ್ ಅವಧಿ', hi: 'डाइजेस्ट आवृत्ति', ta: 'சுருக்க மடல் இடைவெளி' })}</label>
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
                      {freqLabel(freq)}
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
                <span className="text-sm text-slate-700">{l({ en: 'Enable email updates', kn: 'ಇಮೇಲ್ ನವೀಕರಣಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ', hi: 'ईमेल अपडेट सक्षम करें', ta: 'மின்னஞ்சல் புதுப்பிப்புகளை இயக்கு' })}</span>
              </label>

              <button
                onClick={savePreferences}
                disabled={busy}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
              >
                {l({ en: 'Save Preferences', kn: 'ಆದ್ಯತೆಗಳನ್ನು ಉಳಿಸಿ', hi: 'प्राथमिकताएँ सहेजें', ta: 'முன்னுரிமைகளை சேமிக்கவும்' })}
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
