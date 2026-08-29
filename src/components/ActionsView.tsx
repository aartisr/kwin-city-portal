import React from 'react';
import { PlayCircle, CheckCircle2, RefreshCw, GitCommit, Clock, GitBranch } from 'lucide-react';
import { MOCK_WORKFLOWS } from '../data/mockProjects';

export const ActionsView: React.FC = () => {
  return (
    <div className="flex-1 bg-[#0d1117] p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-indigo-400" />
              DevCloud Actions & Pipelines
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Automated continuous integration, test runs, and cloud deployments
            </p>
          </div>
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Run Workflow</span>
          </button>
        </div>

        {/* Workflow runs */}
        <div className="bg-[#161b22] border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80">
          {MOCK_WORKFLOWS.map((run) => (
            <div key={run.id} className="p-4 hover:bg-slate-800/40 transition-colors flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-semibold text-white hover:text-indigo-300 cursor-pointer">
                    {run.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1 font-mono">
                    <span className="flex items-center gap-1 text-slate-300">
                      <GitBranch className="w-2.5 h-2.5 text-indigo-400" />
                      {run.branch}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <GitCommit className="w-2.5 h-2.5 text-slate-500" />
                      {run.commitHash}
                    </span>
                    <span>•</span>
                    <span className="text-slate-500">{run.trigger}</span>
                  </div>
                </div>
              </div>

              <div className="text-right text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
                  {run.status}
                </span>
                <p className="text-[11px] text-slate-500 mt-1 font-mono">{run.duration} • {run.timeAgo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
