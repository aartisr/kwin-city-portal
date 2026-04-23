import { formatDate } from './utils';
import type { ReaderItem, ReaderLocale, ReaderText } from './types';

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
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 md:p-5 shadow-[0_10px_26px_rgba(15,23,42,0.05)]">
      <div className="flex items-center justify-between gap-3 mb-3">
        <h2 className="text-sm font-extrabold tracking-[0.12em] uppercase text-slate-900">
          {l({ en: 'Trending Now', kn: 'ಈಗ ಟ್ರೆಂಡಿಂಗ್', hi: 'अभी ट्रेंडिंग', ta: 'இப்போது பிரபலமானவை' })}
        </h2>
        <span className="text-xs text-slate-500">
          {l({ en: 'Source-diverse quick scan', kn: 'ವೈವಿಧ್ಯಮಯ ಮೂಲಗಳ ತ್ವರಿತ ಸ್ಕ್ಯಾನ್', hi: 'विविध स्रोतों का त्वरित स्कैन', ta: 'பல்வேறு மூலங்களின் விரைவு பார்வை' })}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {items.map((item) => (
          <button
            key={`trending-${item.link}`}
            onClick={() => onSelectItem(item)}
            className="group rounded-xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-3 hover:border-cyan-300 transition-colors text-left"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-cyan-700">{item.source}</span>
              <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt, locale)}</span>
            </div>
            <p className="text-sm font-bold leading-6 text-slate-900 line-clamp-2 group-hover:text-slate-700">
              {item.title}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
