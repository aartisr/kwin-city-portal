import React from 'react';
import { GitBranch, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { Repository } from '../types';

interface StatusBarProps {
  repository: Repository;
  line: number;
  col: number;
  isModified?: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({
  repository,
  line,
  col,
  isModified = false,
}) => {
  return (
    <footer
      id="app-status-bar"
      className="h-6 bg-[#6366f1] text-white flex items-center justify-between px-3 text-[10px] font-medium select-none z-20 shrink-0"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 hover:bg-indigo-700/60 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <GitBranch className="w-3 h-3" />
          <span>{repository.branch}{isModified ? '*' : ''}</span>
        </div>

        <div className="flex items-center gap-1.5 hover:bg-indigo-700/60 px-1.5 py-0.5 rounded cursor-pointer transition-colors">
          <RefreshCw className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Syncing 0↓ 0↑</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-2.5 h-2.5 text-indigo-200" />
            0 Errors
          </span>
          <span className="flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5 text-amber-200" />
            1 Warning
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="hover:bg-indigo-700/60 px-1.5 py-0.5 rounded cursor-pointer">
          UTF-8
        </span>
        <span className="hover:bg-indigo-700/60 px-1.5 py-0.5 rounded cursor-pointer">
          TypeScript JSX
        </span>
        <span className="hover:bg-indigo-700/60 px-1.5 py-0.5 rounded cursor-pointer font-mono">
          Line {line}, Col {col}
        </span>
      </div>
    </footer>
  );
};
