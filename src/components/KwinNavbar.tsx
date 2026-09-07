import React from 'react';
import { 
  Building2, 
  Map, 
  Layers, 
  FileText, 
  Droplets, 
  Satellite, 
  Award, 
  BarChart3, 
  Sparkles,
  Download,
  ArrowLeftRight
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../data/translations';

interface KwinNavbarProps {
  language: Language;
  currentMode: 'platform' | 'audit' | 'comparison';
  onSelectMode: (mode: 'platform' | 'audit' | 'comparison') => void;
  onOpenAuditReport: () => void;
  onOpenExport: () => void;
}

export const KwinNavbar: React.FC<KwinNavbarProps> = ({
  language,
  currentMode,
  onSelectMode,
  onOpenAuditReport,
  onOpenExport,
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                KWIN CITY
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                10.0 PLATFORM
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium truncate max-w-[210px] sm:max-w-none">
              {language === 'kn' ? 'ಜ್ಞಾನ, ಕ್ಷೇಮ ಮತ್ತು ನಾವೀನ್ಯತೆ ನಗರ' : 'Knowledge, Wellbeing & Innovation City'}
            </p>
          </div>
        </div>

        {/* Center Mode Switcher: Upgraded Platform vs Before/After vs Audit View */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => onSelectMode('platform')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentMode === 'platform'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Upgraded 10/10</span> Platform
          </button>

          <button
            onClick={() => onSelectMode('comparison')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentMode === 'comparison'
                ? 'bg-white text-amber-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-amber-600" />
            <span>Before vs After</span>
          </button>

          <button
            onClick={() => onSelectMode('audit')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
              currentMode === 'audit'
                ? 'bg-white text-indigo-700 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden md:inline">Audit</span> Scorecard
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* 10/10 Proof Button */}
          <button
            onClick={onOpenAuditReport}
            className="hidden md:inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold hover:bg-emerald-100 transition-colors"
          >
            <Award className="w-4 h-4 text-emerald-600" />
            <span>10 / 10 Verified</span>
          </button>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span> Report
          </button>
        </div>

      </div>
    </header>
  );
};
