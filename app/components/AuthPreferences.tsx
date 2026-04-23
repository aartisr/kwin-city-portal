'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';
import { AuthFormCard } from '@/components/auth-preferences/AuthFormCard';
import { PreferencesCard } from '@/components/auth-preferences/PreferencesCard';
import { defaultPreferences, type Preferences, type SessionUser } from '@/components/auth-preferences/config';

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

  const loadSession = async () => {
    const response = await fetch('/api/auth/me', { cache: 'no-store' });
    if (!response.ok) {
      setSession(null);
      return;
    }

    const data = (await response.json()) as { user: SessionUser | null; csrf?: string };
    setSession(data.user);
    if (data.csrf) {
      setCsrf(data.csrf);
    }
  };

  const loadPreferences = async () => {
    const response = await fetch('/api/preferences', { cache: 'no-store' });
    if (!response.ok) {
      setPreferences(defaultPreferences);
      return;
    }

    const data = (await response.json()) as { preferences: Preferences };
    setPreferences(data.preferences);
  };

  useEffect(() => {
    loadSession().catch(() => setSession(null));
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    loadPreferences().catch(() => setPreferences(defaultPreferences));
  }, [session]);

  const handleAuth = async (event: FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setStatus('');

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/signin';
      const payload = mode === 'signup' ? { name, email, password } : { email, password };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { error?: string; user?: SessionUser };
      if (!response.ok) {
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

  const savePreferences = async () => {
    setBusy(true);
    setStatus('');

    try {
      const response = await fetch('/api/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-csrf-token': csrf,
        },
        body: JSON.stringify(preferences),
      });

      const data = (await response.json()) as { error?: string };
      if (!response.ok) {
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
        <AuthFormCard
          l={l}
          mode={mode}
          session={session}
          busy={busy}
          name={name}
          email={email}
          password={password}
          onModeChange={setMode}
          onNameChange={setName}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleAuth}
          onSignOut={signOut}
        />

        <PreferencesCard
          l={l}
          session={session}
          preferences={preferences}
          busy={busy}
          onPreferencesChange={(updater) => setPreferences((previous) => updater(previous))}
          onSave={savePreferences}
        />
      </section>

      {status ? (
        <div className="container pb-10">
          <p className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">{status}</p>
        </div>
      ) : null}
    </main>
  );
}
