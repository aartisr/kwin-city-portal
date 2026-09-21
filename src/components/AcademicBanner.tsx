import React from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Quote, 
  Building,
  BarChart2
} from 'lucide-react';
import { ThemeController } from './ThemeController';

interface AcademicBannerProps {
  onOpenGovernance: () => void;
  onOpenCitation: () => void;
  activeView: 'portal' | 'scorecard';
  onToggleView: (view: 'portal' | 'scorecard') => void;
}

export const AcademicBanner: React.FC<AcademicBannerProps> = ({
  onOpenGovernance,
  onOpenCitation,
  activeView,
  onToggleView
}) => {
  return (
    <div className="w-full border-b border-amber-900/15 bg-amber-50/95 text-amber-950 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-100 py-2 px-3 sm:px-6 transition-colors z-40">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-['Plus_Jakarta_Sans']">
        
        {/* Institutional Identification & Disclaimer */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200/80 text-amber-950 dark:bg-emerald-950 dark:text-emerald-300 font-bold text-[11px] border border-amber-300 dark:border-emerald-800">
            <GraduationCap className="w-3.5 h-3.5 shrink-0 text-amber-900 dark:text-emerald-400" />
            Independent Academic Monograph
          </span>

          <span className="hidden md:inline text-amber-700/60 dark:text-slate-500">|</span>

          <span className="font-medium text-amber-950/90 dark:text-slate-300 text-[11px] leading-tight">
            <strong className="font-bold text-amber-950 dark:text-white">Public Notice:</strong> Non-governmental research clearinghouse. Not affiliated with Govt of Karnataka, KIADB, or BMRDA.
          </span>
        </div>

        {/* Action Controls & Navigation Switcher */}
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end shrink-0">
          
          {/* Dual-View Mode Switcher: Portal vs 10/10 Scorecard */}
          <div className="inline-flex items-center rounded-lg bg-amber-200/60 dark:bg-slate-800 p-0.5 border border-amber-300/80 dark:border-slate-700">
            <button
              onClick={() => onToggleView('portal')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                activeView === 'portal'
                  ? 'bg-white text-slate-950 shadow-xs dark:bg-emerald-600 dark:text-white'
                  : 'text-amber-900 hover:text-amber-950 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <Building className="w-3 h-3" />
              <span>Portal</span>
            </button>
            <button
              onClick={() => onToggleView('scorecard')}
              className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                activeView === 'scorecard'
                  ? 'bg-white text-slate-950 shadow-xs dark:bg-emerald-600 dark:text-white'
                  : 'text-amber-900 hover:text-amber-950 dark:text-slate-300 dark:hover:text-white'
              }`}
            >
              <BarChart2 className="w-3 h-3" />
              <span>10/10 Scorecard</span>
            </button>
          </div>

          {/* Academic Governance Modal Trigger */}
          <button
            onClick={onOpenGovernance}
            className="px-2 py-1 rounded-md bg-white hover:bg-amber-100/60 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-xs"
            title="View Academic Research Charter and Advisory Board"
          >
            <BookOpen className="w-3 h-3 text-amber-800 dark:text-emerald-400" />
            <span className="hidden xs:inline">Charter</span>
          </button>

          {/* Citation Generator Trigger */}
          <button
            onClick={onOpenCitation}
            className="px-2 py-1 rounded-md bg-white hover:bg-amber-100/60 text-slate-900 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 text-[11px] font-semibold transition-colors flex items-center gap-1 shadow-xs"
            title="Generate academic citation in APA, IEEE, or BibTeX"
          >
            <Quote className="w-3 h-3 text-amber-800 dark:text-cyan-400" />
            <span>Cite</span>
          </button>

          {/* Centralized Theme & Accessibility Controller */}
          <ThemeController />

        </div>

      </div>
    </div>
  );
};
