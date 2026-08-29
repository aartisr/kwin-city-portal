import React from 'react';
import { GitBranch, GitPullRequest, PlayCircle, ShieldCheck, Download, Code, ExternalLink } from 'lucide-react';
import { Repository } from '../types';

interface NavbarProps {
  activeTab: 'editor' | 'pull-requests' | 'actions' | 'security';
  setActiveTab: (tab: 'editor' | 'pull-requests' | 'actions' | 'security') => void;
  repository: Repository;
  onOpenCloneModal: () => void;
  onOpenDesktopModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  repository,
  onOpenCloneModal,
  onOpenDesktopModal,
}) => {
  return (
    <nav id="app-navbar" className="h-12 border-b border-slate-800 flex items-center justify-between px-4 bg-[#161b22] select-none z-20">
      <div className="flex items-center gap-6">
        {/* Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('editor')}>
          <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-white tracking-tight text-sm md:text-base">DevCloud</span>
            <span className="hidden sm:inline-block text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700/60">
              {repository.owner}/{repository.name}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-4 text-sm font-medium text-slate-400">
          <button
            id="tab-editor-btn"
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1.5 py-3 transition-colors ${
              activeTab === 'editor'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'hover:text-slate-200 cursor-pointer'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>

          <button
            id="tab-pr-btn"
            onClick={() => setActiveTab('pull-requests')}
            className={`flex items-center gap-1.5 py-3 transition-colors ${
              activeTab === 'pull-requests'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'hover:text-slate-200 cursor-pointer'
            }`}
          >
            <GitPullRequest className="w-3.5 h-3.5" />
            <span>Pull Requests</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-slate-800 text-indigo-400 rounded-full font-mono">
              1
            </span>
          </button>

          <button
            id="tab-actions-btn"
            onClick={() => setActiveTab('actions')}
            className={`hidden sm:flex items-center gap-1.5 py-3 transition-colors ${
              activeTab === 'actions'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'hover:text-slate-200 cursor-pointer'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>Actions</span>
          </button>

          <button
            id="tab-security-btn"
            onClick={() => setActiveTab('security')}
            className={`hidden md:flex items-center gap-1.5 py-3 transition-colors ${
              activeTab === 'security'
                ? 'text-white border-b-2 border-indigo-500 font-semibold'
                : 'hover:text-slate-200 cursor-pointer'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Security</span>
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          id="btn-open-desktop"
          onClick={onOpenDesktopModal}
          className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded text-xs font-medium border border-slate-700 flex items-center gap-1.5 transition-all shadow-xs"
          title="Open project in local VS Code or DevCloud Desktop"
        >
          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden sm:inline">Open in Desktop</span>
          <span className="sm:hidden">Desktop</span>
        </button>

        <button
          id="btn-clone-repo"
          onClick={onOpenCloneModal}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Clone Repository</span>
        </button>
      </div>
    </nav>
  );
};
