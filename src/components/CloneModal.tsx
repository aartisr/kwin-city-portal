import React, { useState } from 'react';
import { X, Download, Github, Sparkles, Check, ArrowRight, GitFork, Star } from 'lucide-react';
import { POPULAR_STARTER_REPOS } from '../data/mockProjects';

interface CloneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCloneRepository: (repoUrl: string, branch?: string) => void;
}

export const CloneModal: React.FC<CloneModalProps> = ({
  isOpen,
  onClose,
  onCloneRepository,
}) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [branch, setBranch] = useState('main');
  const [isCloning, setIsCloning] = useState(false);

  if (!isOpen) return null;

  const handleClone = (urlToClone: string, branchToUse = 'main') => {
    if (!urlToClone.trim()) return;
    setIsCloning(true);
    setTimeout(() => {
      onCloneRepository(urlToClone.trim(), branchToUse);
      setIsCloning(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-[#161b22] border border-slate-700 w-full max-w-xl rounded-xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Clone a GitHub Repository</h3>
              <p className="text-xs text-slate-400">Import remote codebase directly into your DevCloud container</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-md hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Custom Repository URL Input */}
          <div className="space-y-2">
            <label className="block text-xs font-medium text-slate-300">
              Repository URL or identifier
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={repoUrl}
                  onChange={(e) => setRepoUrl(e.target.value)}
                  placeholder="https://github.com/facebook/react or user/repo"
                  className="w-full bg-[#0d1117] border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 font-mono"
                  autoFocus
                />
              </div>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Branch"
                className="w-24 bg-[#0d1117] border border-slate-700 rounded-lg px-2.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-mono text-center"
              />
            </div>
            <p className="text-[11px] text-slate-500">
              Supports public and authenticated HTTPS GitHub repository URLs.
            </p>
          </div>

          <button
            onClick={() => handleClone(repoUrl || 'https://github.com/user/awesome-project', branch)}
            disabled={isCloning}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white py-2 px-4 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
          >
            {isCloning ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Initializing Remote Stream...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Clone & Open In Workspace</span>
              </>
            )}
          </button>

          {/* Popular Starters */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Or Quick-Start From Template
              </span>
              <span className="text-[11px] text-indigo-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Ready to build
              </span>
            </div>

            <div className="space-y-2">
              {POPULAR_STARTER_REPOS.map((starter) => (
                <div
                  key={starter.name}
                  onClick={() => handleClone(starter.url, 'main')}
                  className="p-3 bg-[#0d1117] hover:bg-slate-800/80 border border-slate-800 hover:border-indigo-500/50 rounded-lg cursor-pointer transition-all flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-white group-hover:text-indigo-300 font-mono">
                        {starter.owner}/{starter.name}
                      </span>
                      <span className="flex items-center text-[10px] text-slate-400 gap-0.5">
                        <Star className="w-2.5 h-2.5 text-amber-400" /> {starter.stars}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight">
                      {starter.description}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-3" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
