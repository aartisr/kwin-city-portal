import { formatDate, getDomain } from './utils';
import type { ReaderItem, ReaderLocale, ReaderText } from './types';

type ReaderDrawerProps = {
  item: ReaderItem;
  locale: ReaderLocale;
  l: ReaderText;
  onClose: () => void;
};

export function ReaderDrawer({ item, locale, l, onClose }: ReaderDrawerProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={item.title}
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-2xl flex-col bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-200 bg-cyan-50 px-2.5 py-1 text-[11px] font-bold tracking-[0.08em] uppercase text-cyan-800">
              {item.source}
            </span>
            <span className="text-[11px] text-slate-500">{formatDate(item.publishedAt, locale)}</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              {l({ en: 'Open Original', kn: 'ಮೂಲ ತೆರೆ', hi: 'मूल खोलें', ta: 'மூலத்தைத் திற' })} ↗
            </a>
            <button
              onClick={onClose}
              aria-label={l({ en: 'Close reader', kn: 'ರೀಡರ್ ಮುಚ್ಚಿ', hi: 'रीडर बंद करें', ta: 'ரீடரை மூடு' })}
              className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          <h1 className="text-2xl font-extrabold leading-tight text-slate-900 mb-5">{item.title}</h1>

          {item.fullContent && item.fullContent.length > item.summary.length + 20 ? (
            <div className="prose prose-slate prose-sm max-w-none leading-8 text-slate-700 whitespace-pre-line">
              {item.fullContent}
            </div>
          ) : (
            <>
              <p className="leading-8 text-slate-700">{item.summary}</p>
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                <strong>
                  {l({ en: 'Full article not available in RSS feed.', kn: 'RSS ಫೀಡ್‌ನಲ್ಲಿ ಸಂಪೂರ್ಣ ಲೇಖನ ಲಭ್ಯವಿಲ್ಲ.', hi: 'RSS फ़ीड में पूरा लेख उपलब्ध नहीं है।', ta: 'RSS ஊட்டத்தில் முழு கட்டுரை கிடைக்கவில்லை.' })}
                </strong>{' '}
                {l({ en: 'Open the original source to read the complete story.', kn: 'ಪೂರ್ಣ ಕಥೆ ಓದಲು ಮೂಲ ಮೂಲವನ್ನು ತೆರೆಯಿರಿ.', hi: 'पूरी कहानी पढ़ने के लिए मूल स्रोत खोलें।', ta: 'முழு செய்தியைப் படிக்க மூலத்தைத் திறக்கவும்.' })}
              </div>
            </>
          )}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            {l({ en: "Content from the publisher's RSS feed", kn: 'ಪ್ರಕಾಶಕರ RSS ಫೀಡ್‌ನ ವಿಷಯ', hi: 'प्रकाशक के RSS फ़ीड की सामग्री', ta: 'வெளியீட்டாளரின் RSS ஊட்ட உள்ளடக்கம்' })}{' '}
            · <span className="font-semibold">{item.source}</span>
          </span>
          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            {l({ en: 'Read full article at', kn: 'ಪೂರ್ಣ ಲೇಖನ ಓದಿ:', hi: 'पूरा लेख पढ़ें:', ta: 'முழு கட்டுரையைப் படிக்க:' })} {getDomain(item.link)} ↗
          </a>
        </div>
      </div>
    </>
  );
}
