import React, { useState } from 'react';
import { X, Copy, Check, Monitor, Terminal, ExternalLink } from 'lucide-react';
import { Repository } from '../types';

interface DesktopModalProps {
  isOpen: boolean;
  onClose: () => void;
  repository: Repository;
}

export const DesktopModal: React.FC<DesktopModalProps> = ({
  isOpen,
  onClose,
  repository,
}) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);

  if (!isOpen) return null;

  const cloneCmd = `git clone https://github.com/${repository.owner}/${repository.name}.git`;
  const cliCmd = `npx @devcloud/cli open ${repository.owner}/${repository.name}`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-[#161b22] border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Open in Desktop Environment</h3>
              <p className="text-xs text-slate-400">Sync with your local IDE, VS Code, or command line</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="p-3.5 bg-[#0d1117] border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-indigo-400" /> DevCloud CLI Direct Connect
              </span>
              <button
                onClick={() => handleCopy(cliCmd, 'cli')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
              >
                {copiedType === 'cli' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'cli' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <code className="block bg-black/40 p-2 rounded text-xs font-mono text-slate-300 overflow-x-auto">
              {cliCmd}
            </code>
          </div>

          <div className="p-3.5 bg-[#0d1117] border border-slate-800 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <span>⚡</span> Standard Git Clone
              </span>
              <button
                onClick={() => handleCopy(cloneCmd, 'git')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono"
              >
                {copiedType === 'git' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'git' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <code className="block bg-black/40 p-2 rounded text-xs font-mono text-slate-300 overflow-x-auto">
              {cloneCmd}
            </code>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => {
                window.open(`vscode://vscode.git/clone?url=https://github.com/${repository.owner}/${repository.name}.git`, '_blank');
              }}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span>VS Code</span>
            </button>
            <button
              onClick={() => {
                window.open(`cursor://vscode.git/clone?url=https://github.com/${repository.owner}/${repository.name}.git`, '_blank');
              }}
              className="p-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 flex items-center justify-center gap-2 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              <span>Cursor IDE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
