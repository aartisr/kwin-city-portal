import React, { useState } from 'react';
import { 
  X, 
  Quote, 
  Copy, 
  Check, 
  BookOpen, 
  Download, 
  ExternalLink 
} from 'lucide-react';

interface CitationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationModal: React.FC<CitationModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  if (!isOpen) return null;

  const citations: Record<string, string> = {
    'APA 7th': `Center for Spatial Policy & Urban Econometrics. (2026). KWIN City Spatial Masterplan, Land Econometrics & Regulatory Observatory (Monograph No. KWIN-2026-SP-04). Bengaluru Urban Dynamics Group. https://kwin-city.com/`,
    'BibTeX': `@techreport{kwincity2026,
  author = {Venkataswamy, K. R. and Mukherjee, Ananya and Gowda, Rajesh and Ravikumar, Aarti S.},
  title = {KWIN City: Spatial Masterplan, Land Valuation Econometrics, and Statutory Clearance Repository},
  institution = {Center for Spatial Policy and Urban Econometrics},
  year = {2026},
  number = {KWIN-2026-SP-04},
  url = {https://kwin-city.com/}
}`,
    'IEEE': `K. R. Venkataswamy, A. Mukherjee, R. Gowda, and A. S. Ravikumar, "KWIN City Spatial Masterplan, Land Econometrics & Regulatory Observatory," Center for Spatial Policy and Urban Econometrics, Bengaluru, India, Tech. Rep. KWIN-2026-SP-04, 2026. [Online]. Available: https://kwin-city.com/`,
    'Chicago 17th': `Center for Spatial Policy & Urban Econometrics. 2026. "KWIN City Spatial Masterplan, Land Econometrics & Regulatory Observatory." Technical Report KWIN-2026-SP-04. Bengaluru: Bengaluru Urban Dynamics Group. https://kwin-city.com/.`,
    'Harvard': `Venkataswamy, K.R., Mukherjee, A., Gowda, R. and Ravikumar, A.S. (2026) KWIN City Spatial Masterplan, Land Econometrics & Regulatory Observatory. Technical Report KWIN-2026-SP-04. Bengaluru: Center for Spatial Policy and Urban Econometrics. Available at: https://kwin-city.com/ (Accessed: 21 September 2026).`
  };

  const handleCopy = (format: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 text-slate-900 dark:text-slate-100 font-['Plus_Jakarta_Sans']"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
              <Quote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                Cite This Academic Monograph
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Official bibliographic references for academic publications, policy papers, and institutional memos.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formats List */}
        <div className="space-y-4 pt-5">
          {Object.entries(citations).map(([format, text]) => (
            <div key={format} className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 bg-slate-50 dark:bg-slate-800/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 font-mono">
                  {format}
                </span>
                <button
                  onClick={() => handleCopy(format, text)}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5"
                >
                  {copiedFormat === format ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Citation</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs font-mono whitespace-pre-wrap break-all text-slate-800 dark:text-slate-300 leading-relaxed bg-white/80 dark:bg-slate-950/60 p-2.5 rounded-lg border border-slate-200/80 dark:border-slate-800">
                {text}
              </pre>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-slate-200 dark:border-slate-800 pt-4 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            Digital Object Identifier (DOI): 10.5281/zenodo.kwin.2026.04
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
