import React, { useState } from 'react';
import { GitPullRequest, MessageSquare, CheckCircle, Clock, GitMerge, Search, Plus } from 'lucide-react';
import { MOCK_PULL_REQUESTS } from '../data/mockProjects';
import { PullRequest } from '../types';

export const PullRequestsView: React.FC = () => {
  const [prs, setPrs] = useState<PullRequest[]>(MOCK_PULL_REQUESTS);
  const [filter, setFilter] = useState<'all' | 'open' | 'merged'>('open');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPrs = prs.filter((pr) => {
    const matchesFilter = filter === 'all' || pr.status === filter;
    const matchesSearch = pr.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pr.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex-1 bg-[#0d1117] p-6 overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <h2 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
              <GitPullRequest className="w-5 h-5 text-indigo-400" />
              Pull Requests
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Review code diffs, branches, and review requests for this repository
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search PRs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#161b22] border border-slate-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>New PR</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => setFilter('open')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filter === 'open'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            1 Open
          </button>
          <button
            onClick={() => setFilter('merged')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filter === 'merged'
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            2 Merged
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filter === 'all'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-slate-800/60 text-slate-400 hover:text-white'
            }`}
          >
            All PRs
          </button>
        </div>

        {/* PR List */}
        <div className="bg-[#161b22] border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800/80">
          {filteredPrs.map((pr) => (
            <div key={pr.id} className="p-4 hover:bg-slate-800/40 transition-colors flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {pr.status === 'open' ? (
                    <GitPullRequest className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <GitMerge className="w-4 h-4 text-purple-400" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white hover:text-indigo-300 cursor-pointer">
                      {pr.title}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">#{pr.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{pr.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                    <span>by <span className="text-slate-300 font-medium">{pr.author}</span></span>
                    <span>•</span>
                    <span className="font-mono bg-slate-800 px-1.5 py-0.5 rounded text-indigo-300 text-[10px]">
                      {pr.branch} → {pr.targetBranch}
                    </span>
                    <span>•</span>
                    <span>Updated {pr.updatedAt}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400 text-xs shrink-0">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{pr.commentsCount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
