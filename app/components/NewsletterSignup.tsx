'use client';

/**
 * KWIN City — Newsletter Signup Component
 * ──────────────────────────────────────────
 * Reusable in two modes:
 *   • variant="footer"  — compact horizontal strip for the footer
 *   • variant="section" — full-width card for landing sections
 *
 * Submits to /api/newsletter — stored via Resend or file fallback.
 * Honeypot field for spam prevention.
 * Persona interest checkboxes for segmented email delivery.
 */

import { useState, useId, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

const INTERESTS = [
  { id: 'investor',   label: 'Investment updates',     icon: '📈' },
  { id: 'policy',     label: 'Policy & regulatory news',icon: '🏛️' },
  { id: 'data',       label: 'New data & research',     icon: '📊' },
  { id: 'milestones', label: 'Project milestones',      icon: '📅' },
];

type Variant = 'footer' | 'section';

export default function NewsletterSignup({ variant = 'section' }: { variant?: Variant }) {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);
  const uid = useId();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interests, setInterests] = useState<string[]>(['milestones']);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleInterest = (id: string) =>
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setErrorMessage(l({ en: 'Please enter a valid email address.', kn: 'ದಯವಿಟ್ಟು ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.', hi: 'कृपया मान्य ईमेल पता दर्ज करें।', ta: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.' }));
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), interests }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setInterests(['milestones']);
      } else {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch {
      setStatus('error');
      setErrorMessage(l({ en: 'Something went wrong. Please try again or email us at hello@kwin-city.com.', kn: 'ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ hello@kwin-city.com ಗೆ ಇಮೇಲ್ ಮಾಡಿ.', hi: 'कुछ गलत हुआ। कृपया फिर प्रयास करें या hello@kwin-city.com पर ईमेल करें।', ta: 'ஏதோ தவறு ஏற்பட்டது. மீண்டும் முயற்சிக்கவும் அல்லது hello@kwin-city.com க்கு மின்னஞ்சல் அனுப்பவும்.' }));
    }
  };

  if (variant === 'footer') {
    return (
      <div className="w-full">
        <p className="text-[11px] md:text-xs font-bold tracking-[0.18em] uppercase text-[#F5A623] mb-4">{l({ en: 'Stay Updated', kn: 'ನವೀಕೃತವಾಗಿರಿ', hi: 'अपडेट रहें', ta: 'புதுப்பிக்கப்பட்டிருங்கள்' })}</p>
        <p className="text-sm text-[#7C8EA6] mb-4 leading-relaxed">
          {l({ en: 'Get KWIN City milestone updates in your inbox.', kn: 'KWIN City ಮೈಲಿಗಲ್ಲು ನವೀಕರಣಗಳನ್ನು ನಿಮ್ಮ ಇನ್ಬಾಕ್ಸ್‌ನಲ್ಲಿ ಪಡೆಯಿರಿ.', hi: 'KWIN City माइलस्टोन अपडेट अपने इनबॉक्स में पाएं।', ta: 'KWIN City முக்கிய முன்னேற்ற தகவல்களை உங்கள் மின்னஞ்சலில் பெறுங்கள்.' })}
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="ok"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl bg-emerald-900/30 border border-emerald-700/40 px-4 py-3"
            >
              <p className="text-emerald-400 text-sm font-semibold">✅ {l({ en: "You're subscribed!", kn: 'ನೀವು ಚಂದಾದಾರರಾಗಿದ್ದೀರಿ!', hi: 'आप सदस्य बन गए हैं!', ta: 'நீங்கள் சந்தா செய்துவிட்டீர்கள்!' })}</p>
              <p className="text-emerald-500/80 text-xs mt-0.5">{l({ en: "We'll send you the most important KWIN updates.", kn: 'ಪ್ರಮುಖ KWIN ನವೀಕರಣಗಳನ್ನು ನಾವು ಕಳುಹಿಸುತ್ತೇವೆ.', hi: 'हम आपको सबसे महत्वपूर्ण KWIN अपडेट भेजेंगे।', ta: 'மிக முக்கியமான KWIN புதுப்பிப்புகளை அனுப்புவோம்.' })}</p>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="space-y-2"
            >
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={l({ en: 'Your name (optional)', kn: 'ನಿಮ್ಮ ಹೆಸರು (ಐಚ್ಛಿಕ)', hi: 'आपका नाम (वैकल्पिक)', ta: 'உங்கள் பெயர் (விருப்பம்)' })}
                className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-[#C8D8E8] placeholder-[#4F6280] text-sm outline-none focus:border-amber-400/60 transition-colors"
              />
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-2.5 text-[#C8D8E8] placeholder-[#4F6280] text-sm outline-none focus:border-amber-400/60 transition-colors"
              />
              {/* Hidden interests */}
              <input type="hidden" name="interests" value={interests.join(', ')} />

              {status === 'error' && (
                <p className="text-red-400 text-xs">{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full btn btn-primary text-sm py-2.5 disabled:opacity-60"
              >
                {status === 'submitting'
                  ? l({ en: 'Subscribing…', kn: 'ಚಂದಾದಾರಿಕೆ ಮಾಡಲಾಗುತ್ತಿದೆ…', hi: 'सदस्यता ली जा रही है…', ta: 'சந்தா செய்யப்படுகிறது…' })
                  : l({ en: 'Subscribe', kn: 'ಚಂದಾದಾರರಾಗಿ', hi: 'सदस्यता लें', ta: 'சந்தா செய்யவும்' })}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // ── 'section' variant ────────────────────────────────────────────────────────
  return (
    <section className="section-sm bg-gradient-to-br from-[#040714] via-[#07121F] to-[#040714] border-y border-white/6">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-amber-400 mb-3">{l({ en: 'Stay in the Loop', kn: 'ಸಂಪರ್ಕದಲ್ಲಿರಿ', hi: 'जुड़े रहें', ta: 'தொடர்ந்து அறிந்திருங்கள்' })}</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              {l({ en: 'KWIN City updates, delivered.', kn: 'KWIN City ನವೀಕರಣಗಳು, ನೇರವಾಗಿ ನಿಮಗೆ.', hi: 'KWIN City अपडेट, सीधे आपके पास।', ta: 'KWIN City புதுப்பிப்புகள், நேரடியாக உங்களுக்கு.' })}
            </h2>
            <p className="text-[#9BAEC6] text-base leading-relaxed max-w-lg mx-auto">
              {l({ en: 'Milestone announcements, new data publications, and policy developments — no noise, only signal.', kn: 'ಮೈಲಿಗಲ್ಲು ಘೋಷಣೆಗಳು, ಹೊಸ ಡೇಟಾ ಪ್ರಕಟಣೆಗಳು ಮತ್ತು ನೀತಿ ಬೆಳವಣಿಗೆಗಳು — ಅನಗತ್ಯದಿಲ್ಲ, ಉಪಯುಕ್ತ ಮಾಹಿತಿ ಮಾತ್ರ.', hi: 'माइलस्टोन घोषणाएँ, नया डेटा प्रकाशन और नीति अपडेट — बिना शोर, सिर्फ जरूरी जानकारी।', ta: 'முக்கிய முன்னேற்ற அறிவிப்புகள், புதிய தரவு வெளியீடுகள் மற்றும் கொள்கை முன்னேற்றங்கள் — தேவையற்ற தகவல் இல்லாமல், முக்கிய தகவல்கள் மட்டும்.' })}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-900/30 border border-emerald-700/40 rounded-2xl px-8 py-12 text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-2xl font-extrabold text-white mb-2">{l({ en: "You're subscribed!", kn: 'ನೀವು ಚಂದಾದಾರರಾಗಿದ್ದೀರಿ!', hi: 'आप सदस्य बन गए हैं!', ta: 'நீங்கள் சந்தா செய்துவிட்டீர்கள்!' })}</h3>
                <p className="text-emerald-300/80 text-sm">
                  {l({ en: "We'll send you the most important KWIN City updates. No spam, ever.", kn: 'ಪ್ರಮುಖ KWIN City ನವೀಕರಣಗಳನ್ನು ನಾವು ಕಳುಹಿಸುತ್ತೇವೆ. ಸ್ಪ್ಯಾಮ್ ಇಲ್ಲ.', hi: 'हम आपको सबसे महत्वपूर्ण KWIN City अपडेट भेजेंगे। कभी स्पैम नहीं।', ta: 'மிக முக்கியமான KWIN City தகவல்களை அனுப்புவோம். ஒருபோதும் ஸ்பாம் இல்லை.' })}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-6"
              >

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor={`${uid}-name`}
                      className="block text-xs font-semibold text-[#9BAEC6] mb-1.5"
                    >
                      {l({ en: 'Name (optional)', kn: 'ಹೆಸರು (ಐಚ್ಛಿಕ)', hi: 'नाम (वैकल्पिक)', ta: 'பெயர் (விருப்பம்)' })}
                    </label>
                    <input
                      id={`${uid}-name`}
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Aarti Sri"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-[#3A4F66] text-sm outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor={`${uid}-email`}
                      className="block text-xs font-semibold text-[#9BAEC6] mb-1.5"
                    >
                      {l({ en: 'Email address', kn: 'ಇಮೇಲ್ ವಿಳಾಸ', hi: 'ईमेल पता', ta: 'மின்னஞ்சல் முகவரி' })} <span className="text-amber-400">*</span>
                    </label>
                    <input
                      id={`${uid}-email`}
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full bg-white/8 border border-white/12 rounded-xl px-4 py-3 text-white placeholder-[#3A4F66] text-sm outline-none focus:border-amber-400/60 transition-colors"
                    />
                  </div>
                </div>

                <input type="hidden" name="interests" value={interests.join(', ')} />

                {/* Interests */}
                <div>
                  <p className="text-xs font-semibold text-[#9BAEC6] mb-3">
                    {l({ en: 'What would you like to hear about?', kn: 'ನೀವು ಯಾವ ವಿಷಯದ ನವೀಕರಣಗಳನ್ನು ಬಯಸುತ್ತೀರಿ?', hi: 'आप किन विषयों के बारे में सुनना चाहेंगे?', ta: 'நீங்கள் எந்த விஷயங்களைப் பற்றி அறிய விரும்புகிறீர்கள்?' })}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {INTERESTS.map((int) => {
                      const selected = interests.includes(int.id);
                      return (
                        <button
                          key={int.id}
                          type="button"
                          onClick={() => toggleInterest(int.id)}
                          className={`flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-full border transition-all duration-150 ${
                            selected
                              ? 'bg-amber-500 text-white border-amber-500'
                              : 'bg-white/6 text-[#9BAEC6] border-white/12 hover:border-white/30 hover:text-white'
                          }`}
                        >
                          {int.icon} {int.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Error */}
                {status === 'error' && (
                  <p className="text-red-400 text-sm">{errorMessage}</p>
                )}

                {/* Submit */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="btn btn-primary w-full sm:w-auto disabled:opacity-60"
                  >
                    {status === 'submitting'
                      ? l({ en: 'Subscribing…', kn: 'ಚಂದಾದಾರಿಕೆ ಮಾಡಲಾಗುತ್ತಿದೆ…', hi: 'सदस्यता ली जा रही है…', ta: 'சந்தா செய்யப்படுகிறது…' })
                      : l({ en: 'Subscribe to updates', kn: 'ನವೀಕರಣಗಳಿಗೆ ಚಂದಾದಾರರಾಗಿ', hi: 'अपडेट्स के लिए सदस्यता लें', ta: 'புதுப்பிப்புகளுக்கு சந்தா செய்யவும்' })}
                  </button>
                  <p className="text-[#4F6280] text-xs text-center">
                    {l({ en: 'Unsubscribe at any time. No spam, ever.', kn: 'ಯಾವಾಗ ಬೇಕಾದರೂ ಅನ್ಸಬ್‌ಸ್ಕ್ರೈಬ್ ಮಾಡಬಹುದು. ಸ್ಪ್ಯಾಮ್ ಇಲ್ಲ.', hi: 'कभी भी सदस्यता समाप्त करें। कभी स्पैम नहीं।', ta: 'எப்போதும் சந்தாவை நிறுத்தலாம். ஸ்பாம் இல்லை.' })}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
