import React, { useState } from 'react';
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react';

interface InteractiveAuditSandboxProps {
  currentScore: number;
}

export const InteractiveAuditSandbox: React.FC<InteractiveAuditSandboxProps> = ({ currentScore }) => {
  // Improvements checklist simulation
  const [activeImprovements, setActiveImprovements] = useState<Record<string, boolean>>({
    disclaimer: false,
    masthead: false,
    govLinks: false,
    vectorGIS: false,
    reraNotice: false,
  });

  const improvements = [
    {
      id: 'disclaimer',
      title: 'Persistent "Independent Portal" Top Banner',
      impact: +0.6,
      category: 'Governance & Trust',
      detail: 'Eliminates citizen/investor confusion regarding official state status.',
    },
    {
      id: 'masthead',
      title: 'Named Editorial Masthead & Advisory Disclosure',
      impact: +0.4,
      category: 'Transparency',
      detail: 'Discloses author credentials, urban planning background, and independence.',
    },
    {
      id: 'govLinks',
      title: 'Direct Outbound Links to KIADB / Karnataka Gazette',
      impact: +0.4,
      category: 'Authority',
      detail: 'Enables users to verify Section 28-1 and 28-4 statutory notifications directly.',
    },
    {
      id: 'vectorGIS',
      title: 'Interactive Vector GIS Map with Cadastral Boundaries',
      impact: +0.5,
      category: 'Content Depth',
      detail: 'Replaces static diagrams with zoomable revenue village survey layers.',
    },
    {
      id: 'reraNotice',
      title: 'Mandatory Karnataka RERA Consumer Warning',
      impact: +0.3,
      category: 'Consumer Protection',
      detail: 'Protects buyers from unapproved layouts claiming KWIN adjacency.',
    },
  ];

  const toggleImprovement = (id: string) => {
    setActiveImprovements((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const potentialGain = improvements
    .filter((item) => activeImprovements[item.id])
    .reduce((acc, curr) => acc + curr.impact, 0);

  const projectedScore = Math.min(10, currentScore + potentialGain);

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 space-y-6 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-teal-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" /> Simulation Sandbox
          </div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white font-serif">
            How https://kwin-city.com/ Can Reach a 9.0+ / 10 Score
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
            Toggle high-impact governance and technical upgrades to model the rating progression.
          </p>
        </div>

        {/* Projected Score Badge */}
        <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl flex items-center gap-4 shrink-0 shadow-2xs">
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wider text-slate-600 dark:text-slate-400 font-bold">
              Projected Score
            </div>
            <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-serif">
              {projectedScore.toFixed(1)} <span className="text-xs text-slate-500 font-normal">/ 10</span>
            </div>
          </div>
          {potentialGain > 0 && (
            <div className="text-xs font-bold text-emerald-950 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/40 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> +{potentialGain.toFixed(1)}
            </div>
          )}
        </div>
      </div>

      {/* Upgrades List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {improvements.map((item) => {
          const isActive = !!activeImprovements[item.id];

          return (
            <div
              key={item.id}
              onClick={() => toggleImprovement(item.id)}
              className={`p-4 rounded-2xl border cursor-pointer select-none transition-all duration-200 flex items-start gap-3 shadow-2xs ${
                isActive
                  ? 'bg-emerald-50/70 border-emerald-400 dark:bg-teal-950/20 dark:border-teal-500/50 shadow-xs'
                  : 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-800/90 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <input
                type="checkbox"
                checked={isActive}
                onChange={() => {}} // handled by parent div click
                className="mt-1 accent-emerald-600 dark:accent-teal-500 rounded cursor-pointer h-4 w-4"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-950 dark:text-white leading-snug font-serif">
                    {item.title}
                  </h4>
                  <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-teal-400 shrink-0 ml-2">
                    +{item.impact.toFixed(1)} pts
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">{item.category}</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">{item.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5 shadow-2xs">
        <AlertCircle className="w-4 h-4 text-emerald-700 dark:text-teal-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed font-normal">
          <strong className="text-slate-950 dark:text-white font-bold">Strategic Takeaway:</strong> The site does not need a massive technical overhaul—its PWA and spatial analysis are already in the 8.0–8.4 range. Rather, its score is weighed down by <strong>editorial transparency and official disclaimers (4.8–5.2)</strong>. Implementing the checklist above immediately elevates <code className="text-emerald-900 dark:text-teal-300 font-bold bg-slate-200 dark:bg-slate-900 px-1 py-0.5 rounded">kwin-city.com</code> to an authoritative tier.
        </div>
      </div>
    </div>
  );
};
