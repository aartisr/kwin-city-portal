'use client';

import type { ReactNode } from 'react';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

export default function HomeProgressiveDisclosure({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);

  return (
    <section className="border-y border-slate-200 bg-slate-50" aria-labelledby="home-deep-dive-title">
      <details className="group" data-testid="home-progressive-disclosure">
        <summary className="container flex min-h-28 cursor-pointer list-none items-center justify-between gap-5 py-6 marker:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-cyan-700 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0">
            <span className="block text-xs font-black uppercase tracking-[0.18em] text-cyan-800">
              {l({ en: 'Optional deep dive', kn: 'ಐಚ್ಛಿಕ ಆಳವಾದ ನೋಟ', hi: 'वैकल्पिक गहराई', ta: 'விருப்பமான ஆழ்ந்த பார்வை' })}
            </span>
            <span id="home-deep-dive-title" className="mt-1 block text-xl font-extrabold text-slate-950 sm:text-2xl">
              {l({ en: 'Explore the full KWIN experience', kn: 'ಸಂಪೂರ್ಣ KWIN ಅನುಭವವನ್ನು ಅನ್ವೇಷಿಸಿ', hi: 'पूरा KWIN अनुभव देखें', ta: 'முழு KWIN அனுபவத்தை ஆராயுங்கள்' })}
            </span>
            <span className="mt-1 block max-w-2xl text-sm leading-6 text-slate-600">
              {l({
                en: 'Open when you want visuals, regional context, audience guides, tools, and the evidence collection.',
                kn: 'ದೃಶ್ಯಗಳು, ಪ್ರಾದೇಶಿಕ ಸಂದರ್ಭ, ಪ್ರೇಕ್ಷಕರ ಮಾರ್ಗದರ್ಶಿಗಳು, ಸಾಧನಗಳು ಮತ್ತು ಸಾಕ್ಷ್ಯ ಸಂಗ್ರಹ ಬೇಕಾದಾಗ ತೆರೆಯಿರಿ.',
                hi: 'विजुअल, क्षेत्रीय संदर्भ, दर्शक गाइड, टूल और साक्ष्य संग्रह चाहिए तो खोलें।',
                ta: 'காட்சிகள், பிராந்திய சூழல், பயனர் வழிகாட்டிகள், கருவிகள் மற்றும் ஆதாரத் தொகுப்பு தேவையானபோது திறக்கவும்.',
              })}
            </span>
          </span>
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-slate-300 bg-white text-2xl font-light text-slate-700 shadow-sm transition-transform group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="border-t border-slate-200" data-testid="home-deep-dive-content">
          {children}
        </div>
      </details>
    </section>
  );
}
