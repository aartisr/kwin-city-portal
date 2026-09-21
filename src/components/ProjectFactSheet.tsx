import React from 'react';
import { Building2 } from 'lucide-react';
import { KWIN_FACTS } from '../data/evaluationData';

export const ProjectFactSheet: React.FC = () => {
  const districts = [
    {
      name: 'Knowledge District',
      focus: 'Global Universities & Academic Research Campuses',
      tag: 'Education',
      color: 'border-blue-200 dark:border-blue-500/30 bg-blue-50/70 dark:bg-blue-950/20 text-blue-950 dark:text-blue-200',
      badgeColor: 'bg-blue-100 text-blue-950 border-blue-300 dark:bg-blue-900/60 dark:text-blue-300 dark:border-blue-700',
    },
    {
      name: 'Health & Wellbeing District',
      focus: 'Life Sciences, Precision Medicine & Super-Specialty Healthcare',
      tag: 'Life Sciences',
      color: 'border-emerald-200 dark:border-emerald-500/30 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-950 dark:text-emerald-200',
      badgeColor: 'bg-emerald-100 text-emerald-950 border-emerald-300 dark:bg-emerald-900/60 dark:text-emerald-300 dark:border-emerald-700',
    },
    {
      name: 'Innovation District',
      focus: 'Deep-Tech AI Incubators, Robotics & Semiconductor Fab R&D',
      tag: 'Deep Tech',
      color: 'border-purple-200 dark:border-purple-500/30 bg-purple-50/70 dark:bg-purple-950/20 text-purple-950 dark:text-purple-200',
      badgeColor: 'bg-purple-100 text-purple-950 border-purple-300 dark:bg-purple-900/60 dark:text-purple-300 dark:border-purple-700',
    },
    {
      name: 'Research & Advanced Mfg',
      focus: 'Aerospace, Defense, Clean-Tech & Clean Manufacturing',
      tag: 'Engineering',
      color: 'border-amber-200 dark:border-amber-500/30 bg-amber-50/70 dark:bg-amber-950/20 text-amber-950 dark:text-amber-200',
      badgeColor: 'bg-amber-100 text-amber-950 border-amber-300 dark:bg-amber-900/60 dark:text-amber-300 dark:border-amber-700',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white font-serif flex items-center gap-2">
          <Building2 className="w-5 h-5 text-emerald-700 dark:text-teal-400" />
          KWIN City Mega-Project: Baseline Reference Facts
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
          Essential facts about the official Government of Karnataka development that <code className="text-emerald-900 dark:text-teal-300 font-bold bg-slate-100 dark:bg-slate-900 px-1 py-0.5 rounded">kwin-city.com</code> analyzes and covers.
        </p>
      </div>

      {/* Facts Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {KWIN_FACTS.map((fact, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1 shadow-2xs"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              {fact.metric}
            </div>
            <div className="text-lg font-bold text-slate-950 dark:text-white font-serif">
              {fact.value}
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight font-normal">
              {fact.context}
            </div>
          </div>
        ))}
      </div>

      {/* Four Districts Blueprint */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          The 4 Core Masterplan Districts
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {districts.map((dist, i) => (
            <div
              key={i}
              className={`p-4 rounded-2xl border ${dist.color} space-y-2.5 transition-transform hover:-translate-y-0.5 shadow-2xs`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${dist.badgeColor}`}>
                  {dist.tag}
                </span>
                <span className="text-xs font-mono font-bold opacity-60">0{i + 1}</span>
              </div>
              <h4 className="text-sm font-bold text-slate-950 dark:text-white font-serif">{dist.name}</h4>
              <p className="text-xs leading-relaxed font-normal opacity-90">{dist.focus}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
