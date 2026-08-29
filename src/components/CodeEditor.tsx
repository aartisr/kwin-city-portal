import React, { useState } from 'react';
import { Copy, Check, Save, FileCode, Sparkles, Edit3, Eye } from 'lucide-react';
import { OpenTab, FileItem } from '../types';

interface CodeEditorProps {
  activeFile: FileItem | null;
  openTabs: OpenTab[];
  onSelectTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onUpdateFileContent: (fileId: string, content: string) => void;
  onCursorChange?: (line: number, col: number) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  activeFile,
  openTabs,
  onSelectTab,
  onCloseTab,
  onUpdateFileContent,
  onCursorChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if (!activeFile) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[#0d1117] text-slate-500 font-mono text-sm">
        Select a file from the explorer to view code.
      </div>
    );
  }

  const lines = (activeFile.content || '').split('\n');

  const handleCopy = () => {
    if (activeFile.content) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    onUpdateFileContent(activeFile.id, val);

    // Calculate cursor line & col
    const textBeforeCursor = val.substring(0, e.target.selectionStart);
    const lineCount = textBeforeCursor.split('\n').length;
    const lastLineLength = textBeforeCursor.split('\n').pop()?.length || 0;
    onCursorChange?.(lineCount, lastLineLength + 1);
  };

  // Syntax highlighting renderer for realistic, colorful code display matching design HTML
  const renderHighlightedLine = (line: string, index: number) => {
    const trimmed = line.trim();

    // Comments
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return <span key={index} className="text-slate-500 italic">{line}</span>;
    }

    // Markdown headers
    if (activeFile.language === 'markdown' && trimmed.startsWith('#')) {
      return <span key={index} className="text-indigo-300 font-bold">{line}</span>;
    }

    // JSON keys & values
    if (activeFile.language === 'json') {
      const parts = line.split(':');
      if (parts.length === 2) {
        return (
          <span key={index}>
            <span className="text-purple-400">{parts[0]}</span>:
            <span className="text-emerald-400">{parts[1]}</span>
          </span>
        );
      }
    }

    // Tokenized TypeScript / JS line rendering
    const tokens = line.split(/(\s+|[{}();,<>.'"=:])+/);

    return (
      <span key={index}>
        {tokens.map((token, tIdx) => {
          if (['import', 'export', 'from', 'const', 'let', 'var', 'function', 'async', 'await', 'return', 'class', 'new', 'interface', 'type'].includes(token)) {
            return <span key={tIdx} className="text-purple-400 font-medium">{token}</span>;
          }
          if (token.startsWith("'") || token.startsWith('"') || token.startsWith('`') || token.endsWith("'") || token.endsWith('"')) {
            return <span key={tIdx} className="text-emerald-400">{token}</span>;
          }
          if (['true', 'false', 'null', 'undefined'].includes(token)) {
            return <span key={tIdx} className="text-amber-400">{token}</span>;
          }
          if (['createProject', 'GitHubProvider', 'DevCloudClient', 'App', 'init', 'runPipeline', 'clone', 'useState', 'useEffect', 'pingServer', 'formatBytes'].includes(token)) {
            return <span key={tIdx} className="text-yellow-300">{token}</span>;
          }
          if (['workspace', 'status', 'repo', 'branch', 'props', 'res', 'bytes'].includes(token)) {
            return <span key={tIdx} className="text-blue-400">{token}</span>;
          }
          return <span key={tIdx} className="text-slate-300">{token}</span>;
        })}
      </span>
    );
  };

  return (
    <main id="code-editor-main" className="flex-1 flex flex-col bg-[#0d1117] overflow-hidden">
      {/* Tab bar & Breadcrumbs */}
      <div className="h-10 bg-[#161b22] border-b border-slate-800 flex items-center justify-between px-4 gap-4 select-none">
        <div className="flex items-center gap-2 overflow-x-auto">
          {openTabs.map((tab) => {
            const isActive = tab.id === activeFile.id;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-t text-xs font-mono cursor-pointer transition-colors border-t-2 ${
                  isActive
                    ? 'bg-[#0d1117] text-white border-indigo-500 font-medium'
                    : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/40'
                }`}
              >
                <span>📄</span>
                <span>{tab.name}</span>
                {tab.isModified && (
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                )}
                {openTabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className="ml-1 text-slate-500 hover:text-slate-300 text-xs hover:bg-slate-700/50 rounded px-1"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 shrink-0 text-xs">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`px-2.5 py-1 rounded flex items-center gap-1.5 border transition-all ${
              isEditing
                ? 'bg-indigo-600/20 text-indigo-300 border-indigo-500/50'
                : 'bg-slate-800/60 text-slate-400 border-slate-700 hover:text-white'
            }`}
            title={isEditing ? 'Switch to syntax highlight mode' : 'Direct edit mode'}
          >
            {isEditing ? <Eye className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isEditing ? 'Preview' : 'Edit Mode'}</span>
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 border border-slate-800"
            title="Copy file content"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 p-4 md:p-6 font-mono text-sm leading-relaxed overflow-auto relative">
        {isEditing ? (
          <div className="flex h-full min-h-[300px]">
            {/* Line numbers */}
            <div className="text-slate-600 text-right select-none pr-4 space-y-0.5 border-r border-slate-800/60 font-mono text-sm">
              {lines.map((_, idx) => (
                <div key={idx} className="h-6 leading-6">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* Editable textarea */}
            <textarea
              value={activeFile.content || ''}
              onChange={handleTextChange}
              className="flex-1 bg-transparent text-slate-200 resize-none outline-none pl-4 font-mono text-sm leading-6 selection:bg-indigo-500/30 whitespace-pre"
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="flex gap-6 h-full min-h-[250px]">
            {/* Line numbers */}
            <div className="text-slate-600 text-right select-none space-y-0.5 font-mono text-sm shrink-0">
              {lines.map((_, idx) => (
                <div key={idx} className="h-6 leading-6">
                  {String(idx + 1).padStart(2, '0')}
                </div>
              ))}
            </div>

            {/* Highlighted Code Display */}
            <div className="flex-1 overflow-x-auto space-y-0.5 font-mono text-sm">
              {lines.map((line, idx) => (
                <div key={idx} className="h-6 leading-6 whitespace-pre font-mono">
                  {renderHighlightedLine(line, idx)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
