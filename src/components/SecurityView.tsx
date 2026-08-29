import React from 'react';
import { ShieldCheck, Lock, AlertCircle, KeyRound, Check } from 'lucide-react';

export const SecurityView: React.FC = () => {
  return (
    <div className="flex-1 bg-[#0d1117] p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="border-b border-slate-800 pb-5">
          <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
            Security & Compliance
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Vulnerability scanning, secret detection, and branch protection policies
          </p>
        </div>

        {/* Security Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-[#161b22] border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" /> Dependabot Alerts
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
                Passing
              </span>
            </div>
            <p className="text-xs text-slate-400">0 vulnerabilities found across 14 dependencies.</p>
          </div>

          <div className="p-4 bg-[#161b22] border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <KeyRound className="w-4 h-4 text-indigo-400" /> Secret Scanning
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-medium">
                Active
              </span>
            </div>
            <p className="text-xs text-slate-400">Protects API keys and tokens from being committed.</p>
          </div>

          <div className="p-4 bg-[#161b22] border border-slate-800 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" /> Branch Protection
              </span>
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[10px] font-medium">
                Enabled
              </span>
            </div>
            <p className="text-xs text-slate-400">Direct pushes to <code className="text-indigo-300">main</code> require a reviewed PR.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
