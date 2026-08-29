import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Trash2, Maximize2, Minimize2, ChevronRight } from 'lucide-react';
import { TerminalLog } from '../types';

interface TerminalPanelProps {
  logs: TerminalLog[];
  onExecuteCommand: (command: string) => void;
  onClearLogs: () => void;
}

export const TerminalPanel: React.FC<TerminalPanelProps> = ({
  logs,
  onExecuteCommand,
  onClearLogs,
}) => {
  const [activeTab, setActiveTab] = useState<'terminal' | 'output' | 'debug'>('terminal');
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (cmd) {
      setHistory((prev) => [...prev, cmd]);
      setHistoryIdx(-1);
      onExecuteCommand(cmd);
      setInputVal('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInputVal(history[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx >= history.length) {
          setHistoryIdx(-1);
          setInputVal('');
        } else {
          setHistoryIdx(nextIdx);
          setInputVal(history[nextIdx]);
        }
      }
    }
  };

  return (
    <div
      id="terminal-panel"
      className={`border-t border-slate-800 bg-[#0d1117] flex flex-col transition-all duration-200 ${
        isExpanded ? 'h-72' : 'h-36 md:h-44'
      }`}
    >
      {/* Tabs Header */}
      <div className="h-8 border-b border-slate-800 px-4 flex items-center justify-between bg-[#161b22]/40 select-none">
        <div className="flex items-center gap-4 h-full">
          <button
            onClick={() => setActiveTab('terminal')}
            className={`text-[10px] font-bold uppercase tracking-wider h-full flex items-center transition-colors ${
              activeTab === 'terminal'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab('output')}
            className={`text-[10px] font-bold uppercase tracking-wider h-full flex items-center transition-colors ${
              activeTab === 'output'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Output
          </button>
          <button
            onClick={() => setActiveTab('debug')}
            className={`text-[10px] font-bold uppercase tracking-wider h-full flex items-center transition-colors ${
              activeTab === 'debug'
                ? 'text-indigo-400 border-b-2 border-indigo-400'
                : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Debug Console
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearLogs}
            className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800"
            title="Clear terminal"
          >
            <Trash2 className="w-3 h-3" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 text-slate-500 hover:text-slate-300 rounded hover:bg-slate-800"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
        </div>
      </div>

      {/* Terminal View Content */}
      <div
        className="flex-1 p-3 font-mono text-xs text-slate-400 bg-black/20 overflow-y-auto space-y-1"
        onClick={() => inputRef.current?.focus()}
      >
        {activeTab === 'terminal' && (
          <>
            {logs.map((log) => {
              if (log.type === 'input') {
                return (
                  <div key={log.id} className="flex items-center gap-2">
                    <span className="text-emerald-500 font-bold">➜</span>
                    <span className="text-blue-400 font-medium">workspace</span>
                    <span className="text-slate-300">{log.text}</span>
                  </div>
                );
              }
              if (log.type === 'success') {
                return (
                  <div key={log.id} className="text-emerald-400">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'error') {
                return (
                  <div key={log.id} className="text-rose-400">
                    {log.text}
                  </div>
                );
              }
              if (log.type === 'info') {
                return (
                  <div key={log.id} className="text-indigo-300/90">
                    {log.text}
                  </div>
                );
              }
              return (
                <div key={log.id} className="text-slate-400">
                  {log.text}
                </div>
              );
            })}

            {/* Active input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
              <span className="text-emerald-500 font-bold">➜</span>
              <span className="text-blue-400 font-medium">workspace</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type 'help', 'git status', 'npm run dev', or 'git clone <url>'..."
                className="flex-1 bg-transparent text-slate-200 outline-none font-mono text-xs placeholder:text-slate-600"
                autoFocus
              />
            </form>
          </>
        )}

        {activeTab === 'output' && (
          <div className="space-y-1 text-slate-400">
            <p className="text-indigo-400">[DevCloud Build Daemon] v2.4.0 active</p>
            <p className="text-slate-500">[Vite v6.2.3] ready in 142ms</p>
            <p className="text-emerald-400">➜ Network: https://ais-dev-w7u2rhrwtna4zk5w3dpsad-433861030990.us-east5.run.app:3000/</p>
            <p className="text-slate-500">Watching for workspace modifications...</p>
          </div>
        )}

        {activeTab === 'debug' && (
          <div className="space-y-1 text-slate-400">
            <p className="text-slate-500">Debugger listening on ws://127.0.0.1:9229/session</p>
            <p className="text-slate-500">Debugger attached. No active breakpoints hit.</p>
          </div>
        )}

        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
