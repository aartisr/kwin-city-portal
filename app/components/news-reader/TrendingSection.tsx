import { formatDate } from './utils';
import type { ReaderItem, ReaderLocale, ReaderText } from './types';

function getSourceTierCopy(
  l: ReaderText,
  tier: ReaderItem['sourceTier'],
): { label: string; className: string } {
  if (tier === 'primary') {
    return {
      label: l({ en: 'Primary', kn: 'ಪ್ರಾಥಮಿಕ', hi: 'प्राथमिक', ta: 'முதன்மை' }),
      className: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    };
  }

  if (tier === 'official') {
    return {
      label: l({ en: 'Official', kn: 'ಅಧಿಕೃತ', hi: 'आधिकारिक', ta: 'அதிகாரப்பூர்வ' }),
      className: 'border-sky-200 bg-sky-50 text-sky-800',
    };
  }

  return {
    label: l({ en: 'Discovery', kn: 'ಅನ್ವೇಷಣೆ', hi: 'खोज', ta: 'கண்டுபிடிப்பு' }),
    className: 'border-slate-200 bg-slate-100 text-slate-700',
  };
}

type TrendingSectionProps = {
  l: ReaderText;
  locale: ReaderLocale;
  items: ReaderItem[];
  onSelectItem: (item: ReaderItem) => void;
};

export function TrendingSection({ l, locale, items, onSelectItem }: TrendingSectionProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="relative mb-6 overflow-hidden rounded-[1.75rem] border border-amber-100/80 bg-[linear-gradient(180deg,rgba(255,252,245,0.98)_0%,rgba(255,255,255,0.98)_100%)] p-4 md:p-5 shadow-[0_14px_36px_rgba(15,23,42,0.06)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/80 to-transparent" />
      <div className="pointer-events-none absolute -right-10 top-[-3.5rem] h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(245,192,80,0.14)_0%,rgba(245,192,80,0)_72%)] blur-2xl" />
      <div className="pointer-events-none absolute -left-12 bottom-[-2.5rem] h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(6,182,212,0.10)_0%,rgba(6,182,212,0)_70%)] blur-2xl" />

      <div className="relative mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-200/80 bg-white/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-800 shadow-[0_6px_18px_rgba(232,160,32,0.08)]">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_0_4px_rgba(245,166,35,0.12)]" />
            {l({ en: 'Trending Now', kn: 'ಈಗ ಟ್ರೆಂಡಿಂಗ್', hi: 'अभी ट्रेंडिंग', ta: 'இப்போது பிரபலமானவை' })}
          </div>
          <h2 className="text-lg font-black tracking-[-0.03em] text-slate-950 sm:text-xl">
            {l({ en: 'What is moving fastest right now', kn: 'ಈಗ ಅತ್ಯಂತ ವೇಗವಾಗಿ ಚಲಿಸುತ್ತಿರುವುದು', hi: 'अभी सबसे तेज़ी से क्या आगे बढ़ रहा है', ta: 'இப்போது வேகமாக நகரும் தலைப்புகள்' })}
          </h2>
        </div>
        <div className="flex max-w-sm items-center gap-3 text-sm leading-6 text-slate-600">
          <div className="flex items-end gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3 py-2 shadow-[0_6px_18px_rgba(15,23,42,0.04)]">
            <span className="h-2.5 w-1.5 rounded-full bg-amber-400 animate-[pulse_1.4s_ease-in-out_infinite]" />
            <span className="h-4 w-1.5 rounded-full bg-cyan-400 animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:120ms]" />
            <span className="h-3 w-1.5 rounded-full bg-emerald-400 animate-[pulse_1.4s_ease-in-out_infinite] [animation-delay:240ms]" />
          </div>
          <span>
            {l({ en: 'Source-diverse quick scan, lightly ranked for signal over noise.', kn: 'ಮೂಲ ವೈವಿಧ್ಯಮಯ ತ್ವರಿತ ಸ್ಕ್ಯಾನ್, ಶಬ್ದಕ್ಕಿಂತ ಸಂಕೇತಕ್ಕೆ ಸ್ವಲ್ಪ ಹೆಚ್ಚು ಒತ್ತು.', hi: 'विविध स्रोतों का त्वरित स्कैन, शोर के बजाय संकेत पर हल्का जोर।', ta: 'மூல-பல்வேறு விரைவு பார்வை, சத்தத்தைவிட சிக்னலுக்கு சிறு முன்னுரிமை.' })}
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <button
            key={`trending-${item.link}`}
            onClick={() => onSelectItem(item)}
            className="group rounded-2xl border border-slate-200/80 bg-white/85 p-3 text-left shadow-[0_8px_24px_rgba(15,23,42,0.04)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-[0_14px_30px_rgba(15,23,42,0.08)]"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] uppercase shadow-sm ${getSourceTierCopy(l, item.sourceTier).className}`}
                >
                  {getSourceTierCopy(l, item.sourceTier).label}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600">{item.source}</span>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-slate-500">
                {formatDate(item.publishedAt, locale)}
              </span>
            </div>
            <p className="text-sm font-bold leading-6 text-slate-900 line-clamp-2 transition-colors duration-300 group-hover:text-slate-700">
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
