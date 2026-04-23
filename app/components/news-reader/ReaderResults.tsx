import { formatDate } from './utils';
import type { ReaderItem, ReaderLocale, ReaderText } from './types';

type ReaderResultsProps = {
  l: ReaderText;
  locale: ReaderLocale;
  isLoading: boolean;
  error: string | null;
  hasLoadedData: boolean;
  items: ReaderItem[];
  onSelectItem: (item: ReaderItem) => void;
};

export function ReaderResults({
  l,
  locale,
  isLoading,
  error,
  hasLoadedData,
  items,
  onSelectItem,
}: ReaderResultsProps) {
  if (error) {
    return (
      <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse">
            <div className="h-3 w-24 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-11/12 rounded bg-slate-200" />
            <div className="mt-2 h-5 w-4/5 rounded bg-slate-200" />
            <div className="mt-4 h-3 w-full rounded bg-slate-200" />
            <div className="mt-2 h-3 w-full rounded bg-slate-200" />
            <div className="mt-2 h-3 w-5/6 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    );
  }

  if (items.length) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
        {items.map((item) => (
          <article
            key={`${item.link}-${item.title}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.10)]"
          >
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase text-cyan-800">
                {item.source}
              </span>
              <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt, locale)}</span>
            </div>

            <h2 className="text-lg font-extrabold leading-6 text-slate-900 mb-3 line-clamp-3">{item.title}</h2>
            <p className="text-sm text-slate-700 leading-7 min-h-[126px]">{item.summary}</p>

            <div className="mt-4 flex items-center justify-between gap-3">
              <button
                onClick={() => onSelectItem(item)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                </svg>
                {l({ en: 'Read in Reader', kn: 'ರೀಡರ್‌ನಲ್ಲಿ ಓದಿ', hi: 'रीडर में पढ़ें', ta: 'ரீடரில் படிக்க' })}
              </button>
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                {l({ en: 'Original', kn: 'ಮೂಲ', hi: 'मूल', ta: 'மூலம்' })} ↗
              </a>
            </div>
          </article>
        ))}
      </div>
    );
  }

  if (hasLoadedData) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
        {l({
          en: 'No stories match the current filters. Try changing the topic keyword or widening source/domain/time filters.',
          kn: 'ಪ್ರಸ್ತುತ ಫಿಲ್ಟರ್‌ಗಳಿಗೆ ಹೊಂದುವ ಕಥೆಗಳಿಲ್ಲ. ವಿಷಯ ಕೀವರ್ಡ್ ಬದಲಿಸಿ ಅಥವಾ ಮೂಲ/ಡೊಮೇನ್/ಸಮಯ ಫಿಲ್ಟರ್ ವಿಸ್ತರಿಸಿ.',
          hi: 'वर्तमान फ़िल्टर से कोई कहानी मेल नहीं खाती। विषय कीवर्ड बदलें या स्रोत/डोमेन/समय फ़िल्टर व्यापक करें।',
          ta: 'தற்போதைய வடிகட்டிகளுக்கு பொருந்தும் செய்திகள் இல்லை. தலைப்பு முக்கியச்சொல்லை மாற்றவும் அல்லது மூலம்/டொமைன்/நேர வடிகட்டிகளை விரிவுபடுத்தவும்.',
        })}
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-700">
      {l({
        en: 'Load an OPML file to start reading. The reader will display concise summaries and preserve direct links to original publishers.',
        kn: 'ಓದನ್ನು ಪ್ರಾರಂಭಿಸಲು OPML ಫೈಲ್ ಲೋಡ್ ಮಾಡಿ. ರೀಡರ್ ಸಂಕ್ಷಿಪ್ತ ಸಾರಾಂಶಗಳನ್ನು ತೋರಿಸಿ ಮೂಲ ಪ್ರಕಾಶಕರ ನೇರ ಲಿಂಕ್‌ಗಳನ್ನು ಉಳಿಸುತ್ತದೆ.',
        hi: 'पढ़ना शुरू करने के लिए OPML फ़ाइल लोड करें। रीडर संक्षिप्त सारांश दिखाएगा और मूल प्रकाशकों के सीधे लिंक सुरक्षित रखेगा।',
        ta: 'படிக்கத் தொடங்க OPML கோப்பை ஏற்றுங்கள். ரீடர் சுருக்கமான சுருக்கங்களை காட்டி மூல வெளியீட்டாளர்களின் நேரடி இணைப்புகளை பாதுகாக்கும்.',
      })}
    </div>
  );
}
