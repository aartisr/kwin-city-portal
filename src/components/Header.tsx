import React from 'react';
import { ExternalLink, ShieldCheck, Share2, Printer, CheckCircle2, AlertTriangle } from 'lucide-react';
import { TARGET_WEBSITE } from '../data/evaluationData';

interface HeaderProps {
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenExport }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-0 z-40">
      {/* Notice Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-1.5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-medium border border-amber-500/30 text-[11px]">
            Independent Evaluation Report
          </span>
          <span>
            Evaluating: <strong className="text-white font-mono">{TARGET_WEBSITE.url}</strong>
          </span>
        </div>
        <div className="flex items-center gap-4 text-slate-400 text-[11px]">
          <span>Standard: 1-10 Quantitative Multi-Pillar Metric</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">Karnataka Smart Urbanism Benchmark</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center font-bold text-lg shadow-sm shadow-indigo-200">
              10
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Website Evaluation: <span className="text-indigo-700">kwin-city.com</span>
                </h1>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Score: 7.8 / 10
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                Auditing Karnataka’s Knowledge, Wellbeing & Innovation City open-access intelligence platform
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <a
            href={TARGET_WEBSITE.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200"
            title="Visit the evaluated website"
          >
            <span>Visit Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </a>

          <button
            onClick={handleCopyLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors border border-slate-200 shadow-xs"
            title="Share this evaluation report"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? 'Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={onOpenExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-xs"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Executive Brief</span>
          </button>
        </div>
      </div>
    </header>
  );
};
