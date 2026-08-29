import { useState, useMemo, useCallback } from 'react';
import { Repository, FileItem, OpenTab, TerminalLog } from '../types';
import { TASK_LAUREATE_REPO } from '../data/kwinRepo';

export function useWorkspace() {
  const [repository, setRepository] = useState<Repository>(TASK_LAUREATE_REPO);
  const [activeFileId, setActiveFileId] = useState<string>('file-package-json');
  const [openTabs, setOpenTabs] = useState<OpenTab[]>([
    { id: 'file-package-json', name: 'package.json', path: 'package.json', language: 'json' },
    { id: 'file-README-md', name: 'README.md', path: 'README.md', language: 'markdown' },
    { id: 'file-vercel-json', name: 'vercel.json', path: 'vercel.json', language: 'json' },
  ]);
  const [logs, setLogs] = useState<TerminalLog[]>([
    { id: '1', type: 'input', text: 'git clone https://github.com/aartisr/task-laureate.git' },
    { id: '2', type: 'output', text: "Cloning into 'task-laureate'..." },
    { id: '3', type: 'info', text: 'remote: Enumerating objects: 2140, done.' },
    { id: '4', type: 'info', text: 'remote: Counting objects: 100% (2140/2140), done.' },
    { id: '5', type: 'success', text: 'remote: Compressing objects: 100% (1430/1430), done.' },
    { id: '6', type: 'output', text: 'Receiving objects: 100% (2140/2140), 8.2 MiB | 14.6 MiB/s, done.' },
    { id: '7', type: 'success', text: '✔ Repository aartisr/task-laureate successfully synchronized and loaded.' },
    { id: '8', type: 'info', text: 'Detected TanStack task-management platform with Supabase & Vite.' },
  ]);

  const findFileById = (files: FileItem[], id: string): FileItem | null => {
    for (const file of files) {
      if (file.id === id) return file;
      if (file.children) {
        const found = findFileById(file.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const activeFile = useMemo(() => {
    return findFileById(repository.files, activeFileId);
  }, [repository.files, activeFileId]);

  const addLog = (type: TerminalLog['type'], text: string) => {
    setLogs((prev) => [...prev, { id: String(Date.now() + Math.random()), type, text }]);
  };

  const updateFileContentInTree = (
    files: FileItem[],
    fileId: string,
    newContent: string
  ): FileItem[] => {
    return files.map((file) => {
      if (file.id === fileId) {
        return { ...file, content: newContent, isModified: true };
      }
      if (file.children) {
        return {
          ...file,
          children: updateFileContentInTree(file.children, fileId, newContent),
        };
      }
      return file;
    });
  };

  const handleUpdateFileContent = useCallback((fileId: string, content: string) => {
    setRepository((prev) => ({
      ...prev,
      files: updateFileContentInTree(prev.files, fileId, content),
    }));
    setOpenTabs((prev) =>
      prev.map((tab) => (tab.id === fileId ? { ...tab, isModified: true } : tab))
    );
  }, []);

  const handleSelectFile = useCallback((file: FileItem) => {
    setActiveFileId(file.id);
    if (!openTabs.some((t) => t.id === file.id)) {
      setOpenTabs((prev) => [
        ...prev,
        {
          id: file.id,
          name: file.name,
          path: file.path,
          language: file.language || 'typescript',
        },
      ]);
    }
  }, [openTabs]);

  const handleSelectTab = useCallback((tabId: string) => {
    setActiveFileId(tabId);
  }, []);

  const handleCloseTab = useCallback((tabId: string) => {
    const nextTabs = openTabs.filter((t) => t.id !== tabId);
    setOpenTabs(nextTabs);
    if (activeFileId === tabId && nextTabs.length > 0) {
      setActiveFileId(nextTabs[nextTabs.length - 1].id);
    }
  }, [openTabs, activeFileId]);

  const handleAddFile = useCallback((fileName: string, parentPath = 'src') => {
    const ext = fileName.split('.').pop() || '';
    const lang = ext === 'ts' || ext === 'tsx' ? 'typescript' : ext === 'json' ? 'json' : ext === 'md' ? 'markdown' : 'plaintext';
    const newFile: FileItem = {
      id: `file-${Date.now()}`,
      name: fileName,
      path: `${parentPath}/${fileName}`,
      type: 'file',
      language: lang,
      content: `// ${fileName}\nexport default function init() {\n  console.log('Created ${fileName}');\n}\n`,
    };
    setRepository((prev) => {
      const addToFileList = (items: FileItem[]): FileItem[] => {
        return items.map((item) => {
          if (item.name === parentPath && item.type === 'folder') {
            return { ...item, children: [...(item.children || []), newFile] };
          }
          if (item.children) {
            return { ...item, children: addToFileList(item.children) };
          }
          return item;
        });
      };
      return { ...prev, files: addToFileList(prev.files) };
    });
    handleSelectFile(newFile);
    addLog('info', `Created new file: ${parentPath}/${fileName}`);
  }, [handleSelectFile]);

  const handleChangeBranch = useCallback((branch: string) => {
    setRepository((prev) => ({ ...prev, branch }));
    addLog('input', `git checkout ${branch}`);
    addLog('success', `Switched to branch '${branch}'`);
  }, []);

  const handleCloneRepository = useCallback((url: string, branch = 'main') => {
    const cleanName = url.split('/').pop()?.replace('.git', '') || 'cloned-repo';
    const ownerName = url.includes('github.com') ? url.split('github.com/')[1]?.split('/')[0] || 'remote-user' : 'remote-user';
    addLog('input', `git clone ${url}`);
    addLog('output', `Cloning into '${cleanName}'...`);
    addLog('info', 'remote: Enumerating objects: 1842, done.');
    addLog('info', 'remote: Counting objects: 100% (1842/1842), done.');
    addLog('success', `✔ Repository '${ownerName}/${cleanName}' cloned successfully.`);
    setRepository({
      name: cleanName,
      owner: ownerName,
      branch: branch,
      branches: [branch, 'develop', 'release/v1.0'],
      stars: 1240,
      forks: 310,
      isPrivate: false,
      description: `Cloned from ${url}`,
      storageUsed: '1.4GB',
      storageMax: '2GB',
      files: [
        {
          id: 'folder-src',
          name: 'src',
          path: 'src',
          type: 'folder',
          children: [
            {
              id: 'file-main-ts',
              name: 'index.ts',
              path: 'src/index.ts',
              type: 'file',
              language: 'typescript',
              content: `// Workspace entry for ${cleanName}\nimport { DevCloudWorkspace } from './client';\n\nexport const workspace = new DevCloudWorkspace({\n  origin: '${url}',\n  branch: '${branch}'\n});\n\nconsole.log('[DevCloud] Loaded repository ${cleanName}');\n`,
            },
            {
              id: 'file-client-ts',
              name: 'client.ts',
              path: 'src/client.ts',
              type: 'file',
              language: 'typescript',
              content: `export class DevCloudWorkspace {\n  constructor(public config: { origin: string; branch: string }) {}\n}\n`,
            },
          ],
        },
        {
          id: 'file-pkg',
          name: 'package.json',
          path: 'package.json',
          type: 'file',
          language: 'json',
          content: `{\n  "name": "${cleanName}",\n  "version": "0.1.0",\n  "type": "module"\n}\n`,
        },
        {
          id: 'file-readme',
          name: 'README.md',
          path: 'README.md',
          type: 'file',
          language: 'markdown',
          content: `# ${cleanName}\n\nCloned from [${url}](${url}).\n\nReady for development in DevCloud!`,
        },
      ],
    });
    setActiveFileId('file-main-ts');
    setOpenTabs([{ id: 'file-main-ts', name: 'index.ts', path: 'src/index.ts', language: 'typescript' }]);
  }, []);

  const handleExecuteCommand = useCallback((cmd: string) => {
    addLog('input', cmd);
    const lower = cmd.trim().toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setLogs([]);
      return;
    }
    if (lower === 'help') {
      addLog('info', 'DevCloud Shell Utilities:');
      addLog('output', '  git clone <url>      - Clone remote GitHub repository');
      addLog('output', '  git status           - Show working tree status');
      addLog('output', '  git branch           - List repository branches');
      addLog('output', '  git checkout <name>  - Switch branches');
      addLog('output', '  npm run dev          - Boot active Vite development server');
      addLog('output', '  npm test             - Execute Jest & Vitest test suite');
      addLog('output', '  ls [dir]             - List workspace directory files');
      addLog('output', '  clear                - Clear console history');
      return;
    }
    if (lower.startsWith('git clone')) {
      const parts = cmd.trim().split(/\s+/);
      const url = parts[2] || 'https://github.com/user/awesome-project.git';
      handleCloneRepository(url);
      return;
    }
    if (lower === 'git status') {
      addLog('output', `On branch ${repository.branch}`);
      addLog('output', `Your branch is up to date with 'origin/${repository.branch}'.`);
      const findModified = (items: FileItem[]): string[] => {
        let list: string[] = [];
        for (const item of items) {
          if (item.type === 'file' && item.isModified) {
            list.push(item.path);
          }
          if (item.children) {
            list = list.concat(findModified(item.children));
          }
        }
        return list;
      };
      const modifiedFromRepo = findModified(repository.files);
      const modifiedFromTabs = openTabs.filter((t) => t.isModified).map((t) => t.path);
      const allModified = Array.from(new Set([...modifiedFromRepo, ...modifiedFromTabs]));
      if (allModified.length > 0) {
        addLog('info', 'Changes not staged for commit:');
        addLog('output', '  (use "git add <file>..." to update what will be committed)');
        allModified.forEach((m) => addLog('error', `\tmodified:   ${m}`));
      } else {
        addLog('success', 'nothing to commit, working tree clean');
      }
      return;
    }
    if (lower === 'git diff' || lower.startsWith('git diff')) {
      addLog('output', 'diff --git a/next.config.js b/next.config.js');
      addLog('output', '--- a/next.config.js');
      addLog('output', '+++ b/next.config.js');
      addLog('success', '+  experimental: {');
      addLog('success', '+    optimizePackageImports: [');
      addLog('success', '+      "lucide-react", "date-fns", "lodash-es",');
      addLog('success', '+      "@radix-ui/react-accordion", "@radix-ui/react-dialog",');
      addLog('success', '+      "@radix-ui/react-dropdown-menu", "@radix-ui/react-tooltip"');
      addLog('success', '+    ]');
      addLog('success', '+  }');
      return;
    }
    if (lower === 'git add .' || lower.startsWith('git add')) {
      addLog('info', 'Staged modified files for commit.');
      return;
    }
    if (lower.startsWith('git commit')) {
      setRepository((prev) => ({
        ...prev,
        files: prev.files.map((f) => ({ ...f, isModified: false })),
      }));
      setOpenTabs((prev) => prev.map((t) => ({ ...t, isModified: false })));
      addLog('success', `[${repository.branch} a57b00e] perf: optimize package imports for radix ui and verify vercel deployment readiness`);
      addLog('output', ' 1 file changed, 14 insertions(+)');
      return;
    }
    if (lower === 'git log' || lower.startsWith('git log')) {
      addLog('info', 'commit cb6fe7a52e8d91f4b891a27e781190bc2a72091d (HEAD -> master, origin/master)');
      addLog('output', 'Author: Aarti Sri Ravikumar <166765628+aartisr@users.noreply.github.com>');
      addLog('output', 'Date:   Fri Aug 28 22:14:10 2026 -0400\n');
      addLog('output', '    refactor: modularize list experience and reporting\n');
      addLog('info', 'commit c25b7dd4129e81bc72149b1897210bcfa8120412');
      addLog('output', 'Author: Aarti Sri Ravikumar <166765628+aartisr@users.noreply.github.com>');
      addLog('output', 'Date:   Fri Aug 28 19:30:15 2026 -0400\n');
      addLog('output', '    backlinks\n');
      return;
    }
    if (lower.startsWith('git push')) {
      addLog('info', 'Enumerating objects: 4, done.');
      addLog('info', 'Counting objects: 100% (4/4), done.');
      addLog('info', 'Compressing objects: 100% (2/2), done.');
      addLog('output', 'Writing objects: 100% (2/2), 340 bytes | 340.00 KiB/s, done.');
      addLog('output', 'Total 2 (delta 1), reused 0 (delta 0), pack-reused 0');
      addLog('success', `To https://github.com/${repository.owner}/${repository.name}.git`);
      addLog('success', `   c25b7dd..cb6fe7a  ${repository.branch} -> ${repository.branch}`);
      return;
    }
    if (lower.startsWith('git remote')) {
      addLog('output', `origin\thttps://github.com/${repository.owner}/${repository.name}.git (fetch)`);
      addLog('output', `origin\thttps://github.com/${repository.owner}/${repository.name}.git (push)`);
      return;
    }
    if (lower === 'git branch') {
      repository.branches.forEach((b) => {
        if (b === repository.branch) {
          addLog('success', `* ${b}`);
        } else {
          addLog('output', `  ${b}`);
        }
      });
      return;
    }
    if (lower.startsWith('git checkout')) {
      const bName = cmd.trim().split(/\s+/)[2];
      if (bName) {
        handleChangeBranch(bName);
      } else {
        addLog('error', 'fatal: branch name required');
      }
      return;
    }
    if (lower === 'ls' || lower === 'ls src') {
      addLog('info', 'Directory listing:');
      if (lower === 'ls src') {
        const srcFolder = repository.files.find((f) => f.name === 'src');
        srcFolder?.children?.forEach((child) => addLog('output', `  ${child.name}`));
      } else {
        repository.files.forEach((f) => addLog('output', `  ${f.name}${f.type === 'folder' ? '/' : ''}`));
      }
      return;
    }
    if (lower.startsWith('npm run dev') || lower === 'npm dev') {
      addLog('info', '> awesome-project@1.0.0 dev');
      addLog('info', '> vite --host 0.0.0.0 --port 3000');
      addLog('success', '  VITE v6.2.3  ready in 128 ms');
      addLog('success', '  ➜  Local:   http://localhost:3000/');
      addLog('success', '  ➜  Network: https://ais-dev-w7u2rhrwtna4zk5w3dpsad-433861030990.us-east5.run.app/');
      return;
    }
    if (lower.startsWith('npm test') || lower === 'npm run test') {
      addLog('info', '> awesome-project@1.0.0 test');
      addLog('info', '> vitest run');
      addLog('success', '✓ src/main.test.ts (2 tests) 24ms');
      addLog('success', '✓ src/utils.test.ts (4 tests) 18ms');
      addLog('success', 'Test Files  2 passed (2)');
      addLog('success', 'Tests       6 passed (6)');
      return;
    }
    addLog('output', `Command executed: ${cmd}`);
  }, [addLog, repository, handleChangeBranch, handleCloneRepository, openTabs]);

  return {
    repository,
    setRepository,
    activeFileId,
    setActiveFileId,
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
  };
}
