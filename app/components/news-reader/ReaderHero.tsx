import type { ReaderPreset, ReaderResponse, ReaderStatsItem, ReaderText } from './types';

type ReaderHeroProps = {
  l: ReaderText;
  opmlUrl: string;
  limit: number;
  isLoading: boolean;
  presetName: string;
  presets: ReaderPreset[];
  stats: ReaderStatsItem[] | null;
  cache?: ReaderResponse['cache'];
  onOpmlUrlChange: (value: string) => void;
  onLimitChange: (value: number) => void;
  onPresetNameChange: (value: string) => void;
  onLoadReader: () => void;
  onUseDefaultOpml: () => void;
  onShowAllTopics: () => void;
  onSavePreset: () => void;
  onApplyPreset: (preset: ReaderPreset) => void;
  onDeletePreset: (id: string) => void;
};

export function ReaderHero({
  l,
  opmlUrl,
  limit,
  isLoading,
  presetName,
  presets,
  stats,
  cache,
  onOpmlUrlChange,
  onLimitChange,
  onPresetNameChange,
  onLoadReader,
  onUseDefaultOpml,
  onShowAllTopics,
  onSavePreset,
  onApplyPreset,
  onDeletePreset,
}: ReaderHeroProps) {
  return (
    <section className="kwin-page-top pb-12 border-b border-slate-200">
      <div className="container">
        <p className="text-xs font-bold tracking-[0.2em] uppercase text-cyan-700 mb-4">
          {l({ en: 'News Reader', kn: 'ಸುದ್ದಿ ಓದುಗ', hi: 'न्यूज़ रीडर', ta: 'செய்தி வாசிப்பான்' })}
        </p>
        <div className="rounded-3xl border border-slate-200 bg-[radial-gradient(1200px_520px_at_0%_0%,rgba(14,165,233,0.14),transparent_60%),radial-gradient(900px_420px_at_100%_12%,rgba(245,158,11,0.16),transparent_60%),linear-gradient(180deg,#ffffff,#f8fafc)] p-8 md:p-12 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
          <p className="text-xs font-bold tracking-[0.22em] uppercase text-cyan-700 mb-4">
            {l({ en: 'On-Demand Reader', kn: 'ಆನ್-ಡಿಮ್ಯಾಂಡ್ ರೀಡರ್', hi: 'ऑन-डिमांड रीडर', ta: 'தேவைப்படி வாசிப்பான்' })}
          </p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight max-w-5xl">
            {l({ en: 'OPML News Reader', kn: 'OPML ಸುದ್ದಿ ರೀಡರ್', hi: 'OPML न्यूज़ रीडर', ta: 'OPML செய்தி வாசிப்பான்' })}
          </h1>
          <p className="mt-5 text-base md:text-lg text-slate-700 max-w-4xl leading-8">
            {l({
              en: 'Enter any OPML URL, load it instantly, and read a concise summary-first stream. Every story links directly to the original publication.',
              kn: 'ಯಾವುದೇ OPML URL ನಮೂದಿಸಿ, ತಕ್ಷಣ ಲೋಡ್ ಮಾಡಿ, ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶ ಆಧಾರಿತ ಓದನ್ನು ಪಡೆಯಿರಿ. ಪ್ರತಿಯೊಂದು ಕಥೆಯೂ ಮೂಲ ಪ್ರಕಟಣೆಗೆ ನೇರ ಲಿಂಕ್ ಹೊಂದಿರುತ್ತದೆ.',
              hi: 'कोई भी OPML URL दर्ज करें, तुरंत लोड करें और संक्षिप्त सारांश-आधारित स्ट्रीम पढ़ें। हर कहानी मूल प्रकाशन से सीधे जुड़ती है।',
              ta: 'எந்த OPML URL-யையும் உள்ளிட்டு உடனே ஏற்றி, சுருக்கம்-முன்னுரிமை ஓட்டத்தில் படியுங்கள். ஒவ்வொரு செய்தியும் மூல வெளியீட்டிற்கு நேரடியாக இணைகிறது.',
            })}
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">OPML URL</span>
                <input
                  value={opmlUrl}
                  onChange={(event) => onOpmlUrlChange(event.target.value)}
                  className="h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200"
                  placeholder="https://example.com/my-feeds.opml"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">Stories</span>
                <select
                  value={limit}
                  onChange={(event) => onLimitChange(Number(event.target.value))}
                  className="h-11 rounded-xl border border-slate-300 bg-white px-3.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  <option value={24}>24</option>
                  <option value={36}>36</option>
                  <option value={48}>48</option>
                  <option value={72}>72</option>
                </select>
              </label>

              <button
                onClick={onLoadReader}
                disabled={isLoading}
                className="h-11 self-end rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:opacity-60"
              >
                {isLoading
                  ? l({ en: 'Loading...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', hi: 'लोड हो रहा है...', ta: 'ஏற்றப்படுகிறது...' })
                  : l({ en: 'Load Reader', kn: 'ರೀಡರ್ ಲೋಡ್ ಮಾಡಿ', hi: 'रीडर लोड करें', ta: 'ரீடரை ஏற்று' })}
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-cyan-800">
                {l({ en: 'Default topic: KWIN', kn: 'ಡೀಫಾಲ್ಟ್ ವಿಷಯ: KWIN', hi: 'डिफ़ॉल्ट विषय: KWIN', ta: 'இயல்புநிலை தலைப்பு: KWIN' })}
              </span>
              <button
                onClick={onUseDefaultOpml}
                className="rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
              >
                {l({ en: 'Use KWIN Default OPML', kn: 'KWIN ಡೀಫಾಲ್ಟ್ OPML ಬಳಸಿ', hi: 'KWIN डिफ़ॉल्ट OPML उपयोग करें', ta: 'KWIN இயல்புநிலை OPML பயன்படுத்தவும்' })}
              </button>
              <button
                onClick={onShowAllTopics}
                className="rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
              >
                {l({ en: 'Show All Topics', kn: 'ಎಲ್ಲಾ ವಿಷಯಗಳನ್ನು ತೋರಿಸಿ', hi: 'सभी विषय दिखाएँ', ta: 'அனைத்து தலைப்புகளையும் காண்பி' })}
              </button>
              <span className="text-slate-300">|</span>
              <div className="flex items-center gap-2">
                <input
                  value={presetName}
                  onChange={(event) => onPresetNameChange(event.target.value)}
                  className="h-8 rounded-lg border border-slate-300 bg-white px-2.5 text-xs text-slate-700"
                  placeholder={l({ en: 'Preset name', kn: 'ಪ್ರಿಸೆಟ್ ಹೆಸರು', hi: 'प्रीसेट नाम', ta: 'முன்னமைவு பெயர்' })}
                />
                <button
                  onClick={onSavePreset}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  {l({ en: 'Save Preset', kn: 'ಪ್ರಿಸೆಟ್ ಉಳಿಸಿ', hi: 'प्रीसेट सहेजें', ta: 'முன்னமைவை சேமிக்கவும்' })}
                </button>
              </div>
              <span>
                {l({ en: 'Summary-only cards, linked to original source.', kn: 'ಮೂಲ ಮೂಲಕ್ಕೆ ಲಿಂಕ್ ಹೊಂದಿರುವ ಸಾರಾಂಶ ಕಾರ್ಡ್‌ಗಳು.', hi: 'केवल सारांश कार्ड, मूल स्रोत से लिंक सहित।', ta: 'சுருக்க அட்டைகள் மட்டும், மூலத்துடன் இணைக்கப்பட்டவை.' })}
              </span>
            </div>

            {presets.length ? (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {presets.map((preset) => (
                  <div key={preset.id} className="inline-flex items-center gap-1 rounded-full border border-slate-300 bg-white px-2 py-1 text-xs">
                    <button onClick={() => onApplyPreset(preset)} className="text-slate-700 hover:text-slate-900">
                      {preset.name}
                    </button>
                    <button
                      onClick={() => onDeletePreset(preset.id)}
                      className="text-slate-400 hover:text-rose-600"
                      aria-label="Delete preset"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {stats ? (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                  <p className="text-[11px] uppercase tracking-[0.1em] text-slate-500">{stat.label}</p>
                  <p className="mt-1 text-sm font-bold text-slate-900">{stat.value}</p>
                </div>
              ))}
            </div>
          ) : null}

          {cache ? (
            <p className="mt-3 text-xs text-slate-500">
              {cache.hit
                ? l({ en: 'Served from cache for faster loading.', kn: 'ವೇಗದ ಲೋಡ್‌ಗಾಗಿ ಕ್ಯಾಶ್‌ನಿಂದ ನೀಡಲಾಗಿದೆ.', hi: 'तेज़ लोडिंग के लिए कैश से परोसा गया।', ta: 'வேகமான ஏற்றத்திற்காக கேஷிலிருந்து வழங்கப்பட்டது.' })
                : l({ en: 'Fresh fetch completed.', kn: 'ಹೊಸ ಫೆಚ್ ಪೂರ್ಣಗೊಂಡಿದೆ.', hi: 'नया फ़ेच पूरा हुआ।', ta: 'புதிய பெறுதல் முடிந்தது.' })}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
