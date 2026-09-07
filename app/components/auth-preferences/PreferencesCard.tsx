import type { LocalizedValue } from '@/lib/i18n/messages';
import { allTopics, type Preferences, type SessionUser } from './config';
import { frequencyLabel, topicLabel } from './labels';

type TranslateFn = (values: LocalizedValue<string>) => string;

type PreferencesCardProps = {
  l: TranslateFn;
  session: SessionUser | null;
  preferences: Preferences;
  busy: boolean;
  onPreferencesChange: (updater: (previous: Preferences) => Preferences) => void;
  onSave: () => void;
};

export function PreferencesCard({
  l,
  session,
  preferences,
  busy,
  onPreferencesChange,
  onSave,
}: PreferencesCardProps) {
  return (
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
              onChange={(event) =>
                onPreferencesChange((previous) => ({
                  ...previous,
                  persona: event.target.value as Preferences['persona'],
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
                    onClick={() =>
                      onPreferencesChange((previous) => ({
                        ...previous,
                        favoriteTopics: active
                          ? previous.favoriteTopics.filter((item) => item !== topic)
                          : [...previous.favoriteTopics, topic],
                      }))
                    }
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-colors ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                    }`}
                  >
                    {topicLabel(topic, l)}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">{l({ en: 'Digest Frequency', kn: 'ಡೈಜೆಸ್ಟ್ ಅವಧಿ', hi: 'डाइजेस्ट आवृत्ति', ta: 'சுருக்க மடல் இடைவெளி' })}</label>
            <div className="flex gap-2">
              {(['daily', 'weekly', 'monthly'] as const).map((frequency) => (
                <button
                  key={frequency}
                  onClick={() => onPreferencesChange((previous) => ({ ...previous, digestFrequency: frequency }))}
                  className={`px-3 py-1.5 rounded-lg text-sm font-semibold border ${
                    preferences.digestFrequency === frequency
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-300'
                  }`}
                >
                  {frequencyLabel(frequency, l)}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={preferences.emailUpdates}
              onChange={(event) =>
                onPreferencesChange((previous) => ({
                  ...previous,
                  emailUpdates: event.target.checked,
                }))
              }
              className="w-4 h-4"
            />
            <span className="text-sm text-slate-700">{l({ en: 'Enable email updates', kn: 'ಇಮೇಲ್ ನವೀಕರಣಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ', hi: 'ईमेल अपडेट सक्षम करें', ta: 'மின்னஞ்சல் புதுப்பிப்புகளை இயக்கு' })}</span>
          </label>

          <button
            onClick={onSave}
            disabled={busy}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {l({ en: 'Save Preferences', kn: 'ಆದ್ಯತೆಗಳನ್ನು ಉಳಿಸಿ', hi: 'प्राथमिकताएँ सहेजें', ta: 'முன்னுரிமைகளை சேமிக்கவும்' })}
          </button>
        </div>
      )}
    </div>
  );
}
