import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { DUE_DILIGENCE_STEPS } from '../data/evaluationData';

export const DueDiligenceGuide: React.FC = () => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (id: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalCount = DUE_DILIGENCE_STEPS.length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white font-serif flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
            Investor & Researcher Due Diligence Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
            Crucial protocols when utilizing independent portals like <code className="text-emerald-900 dark:text-teal-300 font-bold bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">kwin-city.com</code> for North Bengaluru land & corridor analysis.
          </p>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xs">
          <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Verification:</div>
          <div className="text-sm font-bold text-emerald-800 dark:text-teal-400 font-mono">
            {completedCount} / {totalCount} Done
          </div>
          <div className="w-16 bg-slate-200 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 dark:bg-teal-500 h-full transition-all duration-300"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DUE_DILIGENCE_STEPS.map((step) => {
          const isDone = !!completedSteps[step.id];

          return (
            <div
              key={step.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all duration-200 space-y-3 shadow-2xs ${
                isDone
                  ? 'border-emerald-300 dark:border-emerald-500/40 bg-emerald-50/60 dark:bg-emerald-950/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 ${
                      isDone
                        ? 'bg-emerald-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-teal-300 border border-slate-300 dark:border-slate-700'
                    }`}
                  >
                    0{step.stepNumber}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-950 dark:text-white leading-snug font-serif">
                    {step.title}
                  </h3>
                </div>

                <button
                  onClick={() => toggleStep(step.id)}
                  className={`shrink-0 rounded-lg border transition text-xs font-bold flex items-center gap-1 px-3 py-1.5 cursor-pointer shadow-2xs ${
                    isDone
                      ? 'border-emerald-400 bg-emerald-100 text-emerald-950 dark:border-emerald-500/50 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {isDone ? 'Verified' : 'Mark Done'}
                </button>
              </div>

              {/* Action item */}
              <p className="text-xs text-slate-800 dark:text-slate-300 leading-relaxed font-normal">
                {step.actionItem}
              </p>

              {/* Official Source Reference */}
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-2">
                <span className="text-slate-600 dark:text-slate-400">
                  <strong className="text-slate-900 dark:text-slate-300 font-semibold">Statutory Authority:</strong> {step.officialSource}
                </span>
              </div>

              {/* Risk Flag Warning */}
              <div className="rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 p-2.5 text-[11px] text-rose-950 dark:text-rose-300/90 flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-rose-700 dark:text-rose-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="font-bold">Risk to Avoid:</strong> {step.riskFlag}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
