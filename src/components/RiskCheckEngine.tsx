import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  HelpCircle,
  FileText,
  Compass,
  Layers,
  ArrowRight
} from 'lucide-react';
import { RISK_FACTORS } from '../data/value-add-data';
import { RiskFactor } from '../types';

export const RiskCheckEngine: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [surveyNumberQuery, setSurveyNumberQuery] = useState<string>('');
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const categories = ['all', 'Hydrological', 'Land Title', 'Execution', 'Environmental'];

  const filteredRisks = RISK_FACTORS.filter((r) => {
    return selectedCategory === 'all' || r.category === selectedCategory;
  });

  const handleScanSurvey = (e: React.FormEvent) => {
    e.preventDefault();
    if (!surveyNumberQuery.trim()) return;
    setScannedResult(`Survey #${surveyNumberQuery.trim()}: Contiguous Zone Demarcated under Section 28(4) Preliminary Notification. 0 Pending High Court Injunctions. Hydrological Buffer Compliant.`);
  };

  const getSeverityBadge = (severity: RiskFactor['severity']) => {
    if (severity === 'low') {
      return <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-semibold">Low Risk (Mitigated)</span>;
    }
    if (severity === 'moderate') {
      return <span className="rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 text-xs font-semibold">Moderate Risk (Managed)</span>;
    }
    return <span className="rounded-full bg-red-500/20 text-red-300 border border-red-500/30 px-2.5 py-0.5 text-xs font-semibold">High Focus</span>;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
              Tool #5: Risk & Governance Scanner
            </span>
            <span className="text-xs text-slate-400">
              Environmental, Land Title & Hydrological Integrity Audit
            </span>
          </div>
          <h2 className="mt-2 font-['Cinzel',serif] text-2xl sm:text-3xl font-bold text-white">
            Infrastructure & Title Risk Verification Engine
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time assessment of environmental buffers, water table vulnerabilities, litigation risks, 
            and mitigation mechanisms deployed in the KWIN masterplan.
          </p>
        </div>

        {/* Global Risk Composite Score */}
        <div className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-900/80 p-3">
          <div className="text-right">
            <div className="text-[10px] uppercase font-mono text-slate-400">Composite Risk Score</div>
            <div className="text-base font-bold text-emerald-400 font-mono">25.5 / 100 (Low Risk)</div>
          </div>
          <div className="h-10 w-10 rounded-full border-2 border-emerald-500/30 flex items-center justify-center font-bold text-xs text-emerald-300">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Survey Number / Parcel Scanner Search Bar */}
      <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
          Verify Specific Survey Number / Revenue Village Title Status
        </h3>
        <form onSubmit={handleScanSurvey} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="e.g. Survey #142/2, Doddaballapur Taluk, Kasaba Hobli..."
              value={surveyNumberQuery}
              onChange={(e) => setSurveyNumberQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-slate-950 pl-10 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl border border-amber-500/40 bg-amber-500/20 px-5 py-2.5 text-xs font-semibold text-amber-200 hover:bg-amber-500/30 transition-all shrink-0 flex items-center justify-center gap-2"
          >
            <span>Scan Title & Gazette Registry</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {scannedResult && (
          <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-xs text-emerald-200 flex items-start gap-3">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-emerald-300">Statutory Clear Title Registry Match:</div>
              <p className="mt-1 leading-relaxed">{scannedResult}</p>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="mt-8 flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all ${
              selectedCategory === cat
                ? 'border border-amber-500/40 bg-amber-500/20 text-amber-200 shadow-md ring-1 ring-amber-500/30'
                : 'border border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
            }`}
          >
            {cat === 'all' ? 'All Risk Categories' : cat}
          </button>
        ))}
      </div>

      {/* Risk Cards Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRisks.map((factor) => (
          <div
            key={factor.id}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-sm hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-slate-800">
                  {factor.category}
                </span>
                {getSeverityBadge(factor.severity)}
              </div>

              <h3 className="mt-3 font-semibold text-sm sm:text-base text-slate-100">
                {factor.title}
              </h3>

              <div className="mt-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 text-xs">
                <div className="text-[11px] font-bold text-amber-400 mb-1">
                  Master Plan Mitigation Measure:
                </div>
                <p className="text-slate-300 leading-relaxed font-light">
                  {factor.mitigation}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Risk Metric Index: <strong className="font-mono text-slate-200">{factor.score}/100</strong></span>
              <span className="text-emerald-400 font-medium">{factor.status}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
