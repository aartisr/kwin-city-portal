import type { TimeWindow, ReaderText } from './types';

type ReaderFiltersProps = {
  l: ReaderText;
  topicQuery: string;
  sourceFilter: string;
  domainFilter: string;
  sourceMode: 'all' | 'official' | 'primary';
  timeWindow: TimeWindow;
  sourceOptions: string[];
  domainOptions: string[];
  onTopicQueryChange: (value: string) => void;
  onSourceFilterChange: (value: string) => void;
  onDomainFilterChange: (value: string) => void;
  onSourceModeChange: (value: 'all' | 'official' | 'primary') => void;
  onTimeWindowChange: (value: TimeWindow) => void;
};

export function ReaderFilters({
  l,
  topicQuery,
  sourceFilter,
  domainFilter,
  sourceMode,
  timeWindow,
  sourceOptions,
  domainOptions,
  onTopicQueryChange,
  onSourceFilterChange,
  onDomainFilterChange,
  onSourceModeChange,
  onTimeWindowChange,
}: ReaderFiltersProps) {
  return (
    <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">
            {l({ en: 'Topic Keyword', kn: 'ವಿಷಯ ಕೀವರ್ಡ್', hi: 'विषय कीवर्ड', ta: 'தலைப்பு முக்கியச்சொல்' })}
          </span>
          <input
            value={topicQuery}
            onChange={(event) => onTopicQueryChange(event.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
            placeholder="kwin"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">
            {l({ en: 'Source Mode', kn: 'ಮೂಲ ವಿಧಾನ', hi: 'स्रोत मोड', ta: 'மூல முறை' })}
          </span>
          <select
            value={sourceMode}
            onChange={(event) => onSourceModeChange(event.target.value as 'all' | 'official' | 'primary')}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="all">{l({ en: 'All sources', kn: 'ಎಲ್ಲಾ ಮೂಲಗಳು', hi: 'सभी स्रोत', ta: 'அனைத்து மூலங்கள்' })}</option>
            <option value="official">{l({ en: 'Official sources only', kn: 'ಅಧಿಕೃತ ಮೂಲಗಳು ಮಾತ್ರ', hi: 'केवल आधिकारिक स्रोत', ta: 'அதிகாரப்பூர்வ மூலங்கள் மட்டும்' })}</option>
            <option value="primary">{l({ en: 'Original sources only', kn: 'ಮೂಲ ಮೂಲಗಳು ಮಾತ್ರ', hi: 'केवल मूल स्रोत', ta: 'மூல மூலங்கள் மட்டும்' })}</option>
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">
            {l({ en: 'Source', kn: 'ಮೂಲ', hi: 'स्रोत', ta: 'மூலம்' })}
          </span>
          <select
            value={sourceFilter}
            onChange={(event) => onSourceFilterChange(event.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            {sourceOptions.map((source) => (
              <option key={source} value={source}>
                {source === 'all' ? l({ en: 'All Sources', kn: 'ಎಲ್ಲಾ ಮೂಲಗಳು', hi: 'सभी स्रोत', ta: 'அனைத்து மூலங்கள்' }) : source}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">
            {l({ en: 'Domain', kn: 'ಡೊಮೇನ್', hi: 'डोमेन', ta: 'டொமைன்' })}
          </span>
          <select
            value={domainFilter}
            onChange={(event) => onDomainFilterChange(event.target.value)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            {domainOptions.map((domain) => (
              <option key={domain} value={domain}>
                {domain === 'all' ? l({ en: 'All Domains', kn: 'ಎಲ್ಲಾ ಡೊಮೇನ್‌ಗಳು', hi: 'सभी डोमेन', ta: 'அனைத்து டொமைன்கள்' }) : domain}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold tracking-[0.08em] uppercase text-slate-500">
            {l({ en: 'Published Within', kn: 'ಈ ಅವಧಿಯಲ್ಲಿ ಪ್ರಕಟಿತ', hi: 'इस अवधि में प्रकाशित', ta: 'இந்த காலத்தில் வெளியிடப்பட்டது' })}
          </span>
          <select
            value={timeWindow}
            onChange={(event) => onTimeWindowChange(event.target.value as TimeWindow)}
            className="h-10 rounded-lg border border-slate-300 bg-white px-3 text-sm"
          >
            <option value="all">{l({ en: 'Any time', kn: 'ಯಾವಾಗ ಬೇಕಾದರೂ', hi: 'कभी भी', ta: 'எந்த நேரமும்' })}</option>
            <option value="24h">{l({ en: 'Last 24 hours', kn: 'ಕಳೆದ 24 ಗಂಟೆಗಳು', hi: 'पिछले 24 घंटे', ta: 'கடைசி 24 மணி நேரம்' })}</option>
            <option value="7d">{l({ en: 'Last 7 days', kn: 'ಕಳೆದ 7 ದಿನಗಳು', hi: 'पिछले 7 दिन', ta: 'கடைசி 7 நாட்கள்' })}</option>
            <option value="30d">{l({ en: 'Last 30 days', kn: 'ಕಳೆದ 30 ದಿನಗಳು', hi: 'पिछले 30 दिन', ta: 'கடைசி 30 நாட்கள்' })}</option>
          </select>
        </label>
      </div>
    </div>
  );
}
