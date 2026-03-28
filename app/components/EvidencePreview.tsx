'use client';

import Link from 'next/link';
import { KWIN_EVIDENCE_SOURCES } from '@/data/constants';
import { useI18n } from '@/lib/i18n/I18nProvider';
import { pickLocalizedValue } from '@/lib/i18n/messages';

export default function EvidencePreview() {
  const preview = KWIN_EVIDENCE_SOURCES.slice(0, 3);
  const { locale } = useI18n();
  const l = (values: Parameters<typeof pickLocalizedValue<string>>[1]) => pickLocalizedValue(locale, values);

  return (
    <section
      className="section relative overflow-hidden bg-[linear-gradient(160deg,#0D1333_0%,#040714_100%)]"
    >
      {/* Gold orb */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none bg-[radial-gradient(circle_at_80%_0%,rgba(245,166,35,0.08),transparent_55%)]"
      />

      <div className="container relative z-10">
        <div className="max-w-3xl mb-12">
          <div className="eyebrow text-[#F5A623] mb-3">
            {l({ en: 'Research Foundation', kn: 'ಸಂಶೋಧನಾ ಆಧಾರ', hi: 'शोध आधार', ta: 'ஆராய்ச்சி அடித்தளம்' })}
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 leading-tight">
            {l({ en: 'Every claim.', kn: 'ಪ್ರತಿಯೊಂದು ಹೇಳಿಕೆ.', hi: 'हर दावा।', ta: 'ஒவ்வொரு கூற்றும்.' })}{' '}
            <span className="gradient-text-gold">
              {l({ en: 'Every source.', kn: 'ಪ್ರತಿಯೊಂದು ಮೂಲ.', hi: 'हर स्रोत।', ta: 'ஒவ்வொரு மூலமும்.' })}
            </span>{' '}
            {l({ en: 'In full.', kn: 'ಪೂರ್ಣವಾಗಿ.', hi: 'पूरा विवरण.', ta: 'முழுமையாக.' })}
          </h2>
          <p className="text-lg text-[#94A3B8] leading-relaxed max-w-2xl">
            {l({
              en: 'Transparency is how we earn your trust. This portal was built from the ground up with every substantive claim traced to a published source, and every limitation clearly stated. Here is a preview.',
              kn: 'ಪಾರದರ್ಶಕತೆಯ ಮೂಲಕವೇ ನಾವು ನಿಮ್ಮ ವಿಶ್ವಾಸ ಗಳಿಸುತ್ತೇವೆ. ಈ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಪ್ರತಿಯೊಂದು ಮಹತ್ವದ ಹೇಳಿಕೆಯನ್ನು ಪ್ರಕಟಿತ ಮೂಲಕ್ಕೆ ಅನುಸರಿಸಲಾಗಿದೆ, ಮತ್ತು ಪ್ರತಿಯೊಂದು ಮಿತಿಯನ್ನೂ ಸ್ಪಷ್ಟವಾಗಿ ಸೂಚಿಸಲಾಗಿದೆ. ಇದು ಒಂದು ಪೂರ್ವಾವಲೋಕನ.',
              hi: 'पारदर्शिता से ही हम आपका भरोसा कमाते हैं। इस पोर्टल में हर महत्वपूर्ण दावे को प्रकाशित स्रोत से जोड़ा गया है और हर सीमा स्पष्ट रूप से बताई गई है। यह एक झलक है।',
              ta: 'வெளிப்படைத்தன்மை மூலமே உங்கள் நம்பிக்கையை நாங்கள் பெறுகிறோம். இந்த தளத்தில் உள்ள ஒவ்வொரு முக்கிய கூற்றும் வெளியிடப்பட்ட மூலத்துடன் இணைக்கப்பட்டுள்ளது; ஒவ்வொரு வரம்பும் தெளிவாக குறிப்பிடப்பட்டுள்ளது. இதோ ஒரு முன்னோட்டம்.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
          {preview.map((source) => (
            <article
              key={source.id}
              className="rounded-2xl border border-white/8 p-6 transition-colors hover:border-white/14 bg-[rgba(255,255,255,0.04)]"
            >
              <div className="eyebrow text-[#64748B] mb-3">{source.publisher}</div>
              <h3 className="text-xl font-bold text-white mb-3">{source.title}</h3>
              <p className="text-[#94A3B8] text-sm leading-7">{source.summary}</p>
            </article>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/evidence" className="btn btn-primary">
            {l({ en: 'Open Evidence Vault', kn: 'ಸಾಕ್ಷ್ಯ ಭಂಡಾರ ತೆರೆಯಿರಿ', hi: 'एविडेंस वॉल्ट खोलें', ta: 'ஆதார களஞ்சியத்தைத் திறக்கவும்' })}
          </Link>
          <Link href="/sources" className="btn btn-outline-light">
            {l({ en: 'Review Claim Ledger', kn: 'ಹೇಳಿಕೆ ಲೆಡ್ಜರ್ ಪರಿಶೀಲಿಸಿ', hi: 'क्लेम लेजर देखें', ta: 'கூற்று பதிவேட்டை பரிசீலிக்கவும்' })}
          </Link>
        </div>
      </div>
    </section>
  );
}

