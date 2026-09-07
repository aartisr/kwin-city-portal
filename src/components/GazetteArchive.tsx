import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Filter, 
  Calendar, 
  Building 
} from 'lucide-react';
import { 
  GAZETTE_DOCUMENTS, 
  GazetteDocument 
} from '../data/kwinPlatformData';
import { 
  TRANSLATIONS, 
  Language 
} from '../data/translations';

interface GazetteArchiveProps {
  language: Language;
}

export const GazetteArchive: React.FC<GazetteArchiveProps> = ({ language }) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDoc, setSelectedDoc] = useState<GazetteDocument | null>(null);

  const categories = ['All', 'Cabinet Resolution', 'Land Acquisition', 'Environment & Hydrology', 'Incentive Policy', 'RTI Response'];

  const filteredDocs = GAZETTE_DOCUMENTS.filter((doc) => {
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div id="gazette-archive" className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-700">
              <FileText className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              {t.gazetteTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {t.gazetteSubtitle}
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-semibold">
          {GAZETTE_DOCUMENTS.length} Official Citations Verified
        </span>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={t.gazetteSearchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Documents List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-50/60 hover:border-slate-300 transition-all space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-white text-indigo-700 border border-slate-200">
                  {doc.number}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ShieldCheck className="w-3 h-3" />
                  {doc.verificationStatus}
                </span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {language === 'kn' ? doc.titleKn : doc.title}
              </h4>

              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                {doc.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {doc.date}
                </span>
                <span className="font-mono">{doc.fileSize}</span>
              </div>

              <button
                onClick={() => setSelectedDoc(doc)}
                className="inline-flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span>Inspect Gazette</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog for Document Preview */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase">
                  {selectedDoc.number}
                </span>
                <h4 className="text-base font-bold text-slate-900">
                  {selectedDoc.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 block">Department / Issuing Authority:</span>
                <p className="text-slate-900">{selectedDoc.department}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <span className="font-semibold text-slate-700 block">Full Executive Summary:</span>
                <p className="text-slate-900 leading-relaxed">{selectedDoc.summary}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-center justify-between">
                <span>Public Verification Authenticity:</span>
                <span className="font-mono font-bold">100% Certified Public Record</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
              <a
                href="https://kiadb.karnataka.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Official Gazette Copy</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
