'use client';

import { KWIN_NEWS_TIMELINE } from '@/data/kwin/news-timeline';
import { formatDate } from './utils';
import type { ReaderItem, ReaderLocale, ReaderText } from './types';

type KwinNewsChronicleProps = {
  l: ReaderText;
  locale: ReaderLocale;
  liveItems: ReaderItem[];
  onSelectItem: (item: ReaderItem) => void;
};

export function KwinNewsChronicle({ l, locale, liveItems, onSelectItem }: KwinNewsChronicleProps) {
  return (
    <section id="kwin-news-chronicle" className="mb-10 scroll-mt-24" aria-labelledby="kwin-news-chronicle-title">
      <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-[radial-gradient(circle_at_0%_0%,rgba(245,158,11,0.16),transparent_30%),radial-gradient(circle_at_100%_0%,rgba(6,182,212,0.13),transparent_28%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-8">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400" />
        <div className="relative flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-3xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-bold tracking-[0.15em] uppercase text-amber-900">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {l({ en: 'KWIN evidence chronicle', kn: 'KWIN ಸಾಕ್ಷ್ಯ ಕಾಲಾನುಕ್ರಮ', hi: 'KWIN साक्ष्य इतिहास', ta: 'KWIN ஆதார காலவரிசை' })}
            </p>
            <h2 id="kwin-news-chronicle-title" className="text-2xl font-black tracking-[-0.04em] text-slate-950 md:text-3xl">
              {l({ en: 'KWIN coverage, strongest signal first', kn: 'KWIN ವರದಿ, ಪ್ರಬಲ ಸಂಕೇತ ಮೊದಲು', hi: 'KWIN कवरेज, सबसे मजबूत संकेत पहले', ta: 'KWIN செய்திக் கவரேஜ், வலுவான சிக்னல் முதலில்' })}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              {l({ en: 'Live, publisher-attributed reporting is followed by a source-linked record from the September 2024 public launch. Coverage is never treated as proof: open the original record before relying on a claim.', kn: 'ಲೈವ್, ಪ್ರಕಾಶಕ-ಆಪಾದಿತ ವರದಿಯ ನಂತರ ಸೆಪ್ಟೆಂಬರ್ 2024 ಸಾರ್ವಜನಿಕ ಬಿಡುಗಡೆದಿಂದ ಮೂಲ-ಲಿಂಕ್ ದಾಖಲೆ ಇದೆ. ವರದಿಯನ್ನು ಸಾಬೀತಾಗಿ ಪರಿಗಣಿಸಲಾಗುವುದಿಲ್ಲ; ಹೇಳಿಕೆಯನ್ನು ನಂಬುವ ಮೊದಲು ಮೂಲ ದಾಖಲೆಯನ್ನು ತೆರೆಯಿರಿ.', hi: 'लाइव, प्रकाशक-नामित रिपोर्टिंग के बाद सितंबर 2024 के सार्वजनिक लॉन्च से स्रोत-लिंक रिकॉर्ड है। रिपोर्टिंग को प्रमाण नहीं माना जाता; किसी दावे पर भरोसा करने से पहले मूल रिकॉर्ड खोलें।', ta: 'நேரடி, வெளியீட்டாளர்-அடையாளப்படுத்தப்பட்ட செய்திகளுக்குப் பின் செப்டம்பர் 2024 பொது வெளியீட்டிலிருந்து மூல-இணைக்கப்பட்ட பதிவு உள்ளது. செய்திக் கவரேஜ் ஆதாரமாக கருதப்படாது; எந்தக் கூற்றையும் நம்பும் முன் மூலப் பதிவைத் திறக்கவும்.' })}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/85 px-4 py-3 text-right shadow-sm">
            <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500">{l({ en: 'Timeline anchor', kn: 'ಕಾಲರೇಖೆ ಆಧಾರ', hi: 'टाइमलाइन आधार', ta: 'காலவரிசை தொடக்கம்' })}</p>
            <p className="mt-1 text-sm font-extrabold text-slate-900">26 Sep 2024</p>
            <p className="text-xs text-slate-500">{l({ en: 'official launch release', kn: 'ಅಧಿಕೃತ ಬಿಡುಗಡೆ', hi: 'आधिकारिक लॉन्च विज्ञप्ति', ta: 'அதிகாரப்பூர்வ வெளியீடு' })}</p>
          </div>
        </div>

        <div className="relative mt-7 rounded-2xl border border-slate-200 bg-white/80 p-4 md:p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-cyan-800">{l({ en: 'Live KWIN signals', kn: 'ಲೈವ್ KWIN ಸಂಕೇತಗಳು', hi: 'लाइव KWIN संकेत', ta: 'நேரடி KWIN சிக்னல்கள்' })}</p>
              <p className="mt-1 text-sm text-slate-600">{l({ en: 'Explicit KWIN relevance first · newest breaks ties · related reports are grouped', kn: 'ಸ್ಪಷ್ಟ KWIN ಪ್ರಸ್ತುತತೆ ಮೊದಲು · ಹೊಸದು ಸಮಬಲ ಮುರಿಯುತ್ತದೆ · ಸಂಬಂಧಿತ ವರದಿಗಳನ್ನು ಗುಂಪು ಮಾಡಲಾಗಿದೆ', hi: 'स्पष्ट KWIN प्रासंगिकता पहले · नवीनतम बराबरी तोड़ता है · संबंधित रिपोर्ट समूहित हैं', ta: 'வெளிப்படையான KWIN பொருத்தம் முதலில் · புதியது சமநிலையைத் தீர்க்கும் · தொடர்புடைய செய்திகள் தொகுக்கப்படும்' })}</p>
            </div>
            <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-bold text-cyan-800">{liveItems.length}</span>
          </div>
          {liveItems.length ? (
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {liveItems.slice(0, 6).map((item) => (
                <button key={item.link} onClick={() => onSelectItem(item)} className="group rounded-xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-md">
                  <div className="flex items-center justify-between gap-3 text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">
                    <span className="truncate">{item.source}</span>
                    <time dateTime={item.publishedAt ?? undefined}>{formatDate(item.publishedAt, locale)}</time>
                  </div>
                  <h3 className="mt-2 text-base font-extrabold leading-6 text-slate-900 group-hover:text-cyan-800">{item.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">{item.summary}</p>
                  {item.summarySource === 'discovery-snippet' ? (
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Publisher-indexed summary</p>
                  ) : item.summarySource === 'unavailable' ? (
                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-amber-700">Summary unavailable from feed</p>
                  ) : null}
                  {item.kwinRelevanceReasons?.length ? (
                    <p className="mt-3 text-xs font-semibold text-cyan-800">{item.kwinRelevanceReasons.slice(0, 2).join(' · ')}</p>
                  ) : null}
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">{l({ en: 'No live KWIN matches in this refresh. The verified archive below remains available, and broader regional coverage continues after it.', kn: 'ಈ ರಿಫ್ರೆಶ್‌ನಲ್ಲಿ ಲೈವ್ KWIN ಹೊಂದಾಣಿಕೆಗಳಿಲ್ಲ. ಕೆಳಗಿನ ಪರಿಶೀಲಿತ ಆರ್ಕೈವ್ ಲಭ್ಯವಿದೆ; ಅದರ ನಂತರ ವ್ಯಾಪಕ ಪ್ರಾದೇಶಿಕ ವರದಿ ಮುಂದುವರಿಯುತ್ತದೆ.', hi: 'इस रिफ्रेश में कोई लाइव KWIN मैच नहीं है। नीचे का सत्यापित संग्रह उपलब्ध है, और उसके बाद व्यापक क्षेत्रीय कवरेज जारी है।', ta: 'இந்த புதுப்பிப்பில் நேரடி KWIN பொருத்தங்கள் இல்லை. கீழேயுள்ள சரிபார்க்கப்பட்ட காப்பகம் கிடைக்கிறது; அதன்பின் பரந்த பிராந்திய கவரேஜ் தொடர்கிறது.' })}</p>
          )}
        </div>

        <div className="relative mt-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold tracking-[0.14em] uppercase text-slate-500">{l({ en: 'Source-linked public record', kn: 'ಮೂಲ-ಲಿಂಕ್ ಸಾರ್ವಜನಿಕ ದಾಖಲೆ', hi: 'स्रोत-लिंक सार्वजनिक रिकॉर्ड', ta: 'மூல-இணைக்கப்பட்ட பொது பதிவு' })}</p>
              <h3 className="mt-1 text-xl font-black text-slate-900">{l({ en: 'From launch to the present', kn: 'ಬಿಡುಗಡೆಯಿಂದ ಇಂದಿನವರೆಗೆ', hi: 'लॉन्च से वर्तमान तक', ta: 'வெளியீட்டிலிருந்து இன்று வரை' })}</h3>
            </div>
            <p className="max-w-md text-sm text-slate-500">{l({ en: 'Reverse chronological. Official sources are marked separately from independent reporting.', kn: 'ಹಿಮ್ಮುಖ ಕಾಲಾನುಕ್ರಮ. ಅಧಿಕೃತ ಮೂಲಗಳನ್ನು ಸ್ವತಂತ್ರ ವರದಿಯಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ.', hi: 'उल्टा कालक्रम। आधिकारिक स्रोत स्वतंत्र रिपोर्टिंग से अलग चिह्नित हैं।', ta: 'தலைகீழ் காலவரிசை. அதிகாரப்பூர்வ மூலங்கள் சுயாதீன செய்தியிலிருந்து தனியாக குறிக்கப்படுகின்றன.' })}</p>
          </div>
          <ol className="relative ml-2 border-l-2 border-slate-200 pl-6 md:ml-4 md:pl-8">
            {KWIN_NEWS_TIMELINE.map((entry) => (
              <li key={entry.url} className="relative pb-8 last:pb-0">
                <span className={`absolute -left-[2.05rem] top-1.5 h-4 w-4 rounded-full border-4 border-white shadow-sm md:-left-[2.58rem] ${entry.sourceType === 'official' ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
                <article className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] md:p-5">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">
                    <time dateTime={entry.date} className="text-slate-500">{new Intl.DateTimeFormat(locale === 'kn' ? 'kn-IN' : locale === 'hi' ? 'hi-IN' : locale === 'ta' ? 'ta-IN' : 'en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(`${entry.date}T00:00:00Z`))}</time>
                    <span className={`rounded-full px-2.5 py-1 ${entry.sourceType === 'official' ? 'bg-emerald-50 text-emerald-800' : 'bg-cyan-50 text-cyan-800'}`}>{entry.sourceType === 'official' ? l({ en: 'Official record', kn: 'ಅಧಿಕೃತ ದಾಖಲೆ', hi: 'आधिकारिक रिकॉर्ड', ta: 'அதிகாரப்பூர்வ பதிவு' }) : l({ en: 'Independent reporting', kn: 'ಸ್ವತಂತ್ರ ವರದಿ', hi: 'स्वतंत्र रिपोर्टिंग', ta: 'சுயாதீன செய்தி' })}</span>
                    <span className="text-slate-400">{entry.milestone}</span>
                  </div>
                  <h4 className="mt-3 text-lg font-extrabold leading-7 text-slate-900">{entry.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{entry.summary}</p>
                  <a href={entry.url} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-cyan-800 hover:text-cyan-950">
                    {entry.publisher} <span aria-hidden="true">↗</span><span className="sr-only">{l({ en: '(opens in a new tab)', kn: '(ಹೊಸ ಟ್ಯಾಬ್‌ನಲ್ಲಿ ತೆರೆಯುತ್ತದೆ)', hi: '(नए टैब में खुलता है)', ta: '(புதிய தாவலில் திறக்கும்)' })}</span>
                  </a>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
