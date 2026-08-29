import React, { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { FileExplorer } from './components/FileExplorer';
import { CodeEditor } from './components/CodeEditor';
import { TerminalPanel } from './components/TerminalPanel';
import { StatusBar } from './components/StatusBar';
import { CloneModal } from './components/CloneModal';
import { DesktopModal } from './components/DesktopModal';
import { PullRequestsView } from './components/PullRequestsView';
import { ActionsView } from './components/ActionsView';
import { SecurityView } from './components/SecurityView';
import { useWorkspace } from './hooks/useWorkspace';
import { FileItem } from './types';

export default function App() {
  const [activeNavTab, setActiveNavTab] = useState<'editor' | 'pull-requests' | 'actions' | 'security'>('editor');
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false);
  const [isDesktopModalOpen, setIsDesktopModalOpen] = useState(false);

  const {
    repository,
    setRepository,
    activeFileId,
    activeFile,
    openTabs,
    logs,
    setLogs,
    addLog,
    handleUpdateFileContent,
    handleSelectFile,
    handleSelectTab,
    handleCloseTab,
    handleAddFile,
    handleChangeBranch,
    handleExecuteCommand,
    handleCloneRepository
  } = useWorkspace();

  const handleCursorChange = useCallback((line: number, col: number) => {
    setCursorPos({ line, col });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col bg-[#0f1117] text-slate-300 font-sans overflow-hidden">
      <Navbar
        activeTab={activeNavTab}
        setActiveTab={setActiveNavTab}
        repository={repository}
        onOpenCloneModal={() => setIsCloneModalOpen(true)}
        onOpenDesktopModal={() => setIsDesktopModalOpen(true)}
      />

      <div className="flex-1 flex overflow-hidden">
        {activeNavTab === 'editor' && (
          <>
            <FileExplorer
              repository={repository}
              activeFileId={activeFileId}
              onSelectFile={handleSelectFile}
              onAddFile={handleAddFile}
              onChangeBranch={handleChangeBranch}
            />

            <div className="flex-1 flex flex-col min-w-0 bg-[#0d1117]">
              <CodeEditor
                activeFile={activeFile}
                openTabs={openTabs}
                onSelectTab={handleSelectTab}
                onCloseTab={handleCloseTab}
                onUpdateFileContent={handleUpdateFileContent}
                onCursorChange={handleCursorChange}
              />

              <TerminalPanel
                logs={logs}
                onExecuteCommand={handleExecuteCommand}
                onClearLogs={() => setLogs([])}
              />
            </div>
          </>
        )}

        {activeNavTab === 'pull-requests' && <PullRequestsView />}
        {activeNavTab === 'actions' && <ActionsView />}
        {activeNavTab === 'security' && <SecurityView />}
      </div>

      <StatusBar
        repository={repository}
        line={cursorPos.line}
        col={cursorPos.col}
        isModified={activeFile?.isModified}
      />

      <CloneModal
        isOpen={isCloneModalOpen}
        onClose={() => setIsCloneModalOpen(false)}
        onCloneRepository={handleCloneRepository}
      />

      <DesktopModal
        isOpen={isDesktopModalOpen}
        onClose={() => setIsDesktopModalOpen(false)}
        repository={repository}
      />
    </div>
  );
}

