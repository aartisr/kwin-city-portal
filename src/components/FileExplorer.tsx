import React, { useState } from 'react';
import { Plus, Search, ChevronRight, ChevronDown, GitBranch, HardDrive, Check, FilePlus } from 'lucide-react';
import { FileItem, Repository } from '../types';

interface FileExplorerProps {
  repository: Repository;
  activeFileId: string;
  onSelectFile: (file: FileItem) => void;
  onAddFile: (name: string, parentPath?: string) => void;
  onChangeBranch: (branch: string) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({
  repository,
  activeFileId,
  onSelectFile,
  onAddFile,
  onChangeBranch,
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'folder-src': true,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isCreatingFile, setIsCreatingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  };

  const handleCreateFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFileName.trim()) {
      onAddFile(newFileName.trim(), 'src');
      setNewFileName('');
      setIsCreatingFile(false);
    }
  };

  const renderFileNode = (item: FileItem, depth = 0) => {
    const isFolder = item.type === 'folder';
    const isExpanded = expandedFolders[item.id] ?? false;
    const isActive = item.id === activeFileId;

    if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase()) && !isFolder) {
      return null;
    }

    if (isFolder) {
      return (
        <div key={item.id} className="select-none">
          <div
            onClick={() => toggleFolder(item.id)}
            className="flex items-center gap-1.5 py-1 px-2 hover:bg-slate-800/60 rounded cursor-pointer text-sm text-indigo-400 font-medium transition-colors"
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
          >
            {isExpanded ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            )}
            <span className="text-sm">📂</span>
            <span className="truncate">{item.name}</span>
          </div>

          {isExpanded && item.children && (
            <div className="space-y-0.5">
              {item.children.map((child) => renderFileNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div
        key={item.id}
        id={`file-item-${item.id}`}
        onClick={() => onSelectFile(item)}
        className={`flex items-center gap-2 text-sm cursor-pointer transition-all ${
          isActive
            ? 'bg-indigo-500/10 text-indigo-300 border-r-2 border-indigo-500 py-1 font-medium'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 py-1'
        }`}
        style={{ paddingLeft: `${depth * 12 + 16}px` }}
      >
        <span className="text-xs">📄</span>
        <span className="truncate flex-1">{item.name}</span>
        {item.isModified && (
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 shrink-0" title="Modified" />
        )}
      </div>
    );
  };

  return (
    <aside id="workspace-sidebar" className="w-60 md:w-64 border-r border-slate-800 bg-[#0d1117] flex flex-col shrink-0 select-none">
      {/* Sidebar Header */}
      <div className="p-3.5 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Files
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsSearching(!isSearching)}
              className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800"
              title="Search files"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsCreatingFile(!isCreatingFile)}
              className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800"
              title="Create new file"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search input if active */}
        {isSearching && (
          <div className="mb-3">
            <input
              type="text"
              placeholder="Filter files..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#161b22] border border-slate-700 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              autoFocus
            />
          </div>
        )}

        {/* New File Inline Form */}
        {isCreatingFile && (
          <form onSubmit={handleCreateFileSubmit} className="mb-3 flex items-center gap-1">
            <input
              type="text"
              placeholder="e.g. config.ts"
              value={newFileName}
              onChange={(e) => setNewFileName(e.target.value)}
              className="w-full bg-[#161b22] border border-indigo-500/80 rounded px-2 py-1 text-xs text-slate-200 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-500"
            >
              Add
            </button>
          </form>
        )}

        {/* File Tree */}
        <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-260px)]">
          {repository.files.map((file) => renderFileNode(file))}
        </div>
      </div>

      {/* User & Storage Footer */}
      <div className="mt-auto p-3.5 bg-[#161b22]/60 border-t border-slate-800/80 relative">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-[11px] font-bold shadow-xs">
              AD
            </div>
            <div>
              <p className="text-xs font-medium text-white tracking-tight">{repository.owner}</p>
              <button
                onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                className="text-[10px] text-slate-400 hover:text-indigo-300 flex items-center gap-1 transition-colors text-left"
              >
                <GitBranch className="w-2.5 h-2.5 text-indigo-400" />
                <span>{repository.branch}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Branch Switcher Dropdown */}
        {isBranchDropdownOpen && (
          <div className="absolute bottom-16 left-3 right-3 bg-[#161b22] border border-slate-700 rounded-md shadow-xl p-2 z-30 space-y-1 text-xs">
            <p className="text-[10px] font-semibold uppercase text-slate-500 px-2 py-1">
              Switch Branch
            </p>
            {repository.branches.map((b) => (
              <button
                key={b}
                onClick={() => {
                  onChangeBranch(b);
                  setIsBranchDropdownOpen(false);
                }}
                className={`w-full text-left px-2 py-1.5 rounded flex items-center justify-between hover:bg-slate-800 ${
                  b === repository.branch ? 'text-indigo-400 font-medium' : 'text-slate-300'
                }`}
              >
                <span className="truncate">{b}</span>
                {b === repository.branch && <Check className="w-3 h-3 text-indigo-400" />}
              </button>
            ))}
          </div>
        )}

        {/* Storage Bar */}
        <div className="space-y-1.5">
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[60%] rounded-full transition-all duration-500"></div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-500">
            <span>Storage: {repository.storageUsed} / {repository.storageMax}</span>
            <span className="text-indigo-400/80">60%</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
