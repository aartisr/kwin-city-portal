import { FileItem, Repository, PullRequest, WorkflowRun } from '../types';

export const INITIAL_REPO: Repository = {
  name: 'awesome-project',
  owner: 'alex-dev',
  branch: 'main',
  branches: ['main', 'feature/auth-provider', 'refactor/terminal-ui', 'dev'],
  stars: 142,
  forks: 28,
  isPrivate: false,
  description: 'Next-generation cloud workspace orchestrator with Git synchronization',
  storageUsed: '1.2GB',
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
          name: 'main.ts',
          path: 'src/main.ts',
          type: 'file',
          language: 'typescript',
          content: `import { createProject } from '@dev/core';
import { GitHubProvider } from '@dev/git';

// Initialize workspace from remote
const workspace = new GitHubProvider({
  repo: 'user/awesome-project',
  branch: 'main'
});

export async function init() {
  await workspace.clone();
  // Ready to code...
}

export async function runPipeline() {
  const status = await workspace.getStatus();
  console.log('[DevCloud] Active pipeline status:', status);
  return status;
}
`,
        },
        {
          id: 'file-app-tsx',
          name: 'App.tsx',
          path: 'src/App.tsx',
          type: 'file',
          language: 'typescript',
          content: `import React, { useState } from 'react';
import { DevCloudClient } from './utils';

export default function App() {
  const [synced, setSynced] = useState(true);

  return (
    <div className="flex flex-col h-screen bg-[#0f1117] text-white">
      <header className="p-4 border-b border-slate-800 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight text-indigo-400">DevCloud Project Hub</h1>
        <span className="text-xs px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono">
          {synced ? '● Synchronized' : '○ Pending Changes'}
        </span>
      </header>
      <main className="p-8">
        <p className="text-slate-400">Connected to remote repository on branch <code className="text-indigo-300">main</code></p>
      </main>
    </div>
  );
}
`,
        },
        {
          id: 'file-utils-ts',
          name: 'utils.ts',
          path: 'src/utils.ts',
          type: 'file',
          language: 'typescript',
          content: `export class DevCloudClient {
  static async pingServer(): Promise<boolean> {
    try {
      const res = await fetch('/api/health');
      return res.ok;
    } catch {
      return true;
    }
  }

  static formatBytes(bytes: number, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} \${sizes[i]}\`;
  }
}
`,
        },
      ],
    },
    {
      id: 'file-package-json',
      name: 'package.json',
      path: 'package.json',
      type: 'file',
      language: 'json',
      content: `{
  "name": "awesome-project",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "preview": "vite preview"
  },
  "dependencies": {
    "@dev/core": "^2.1.0",
    "@dev/git": "^1.4.2",
    "lucide-react": "^0.546.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "typescript": "^5.8.0",
    "vite": "^6.2.0"
  }
}
`,
    },
    {
      id: 'file-readme-md',
      name: 'README.md',
      path: 'README.md',
      type: 'file',
      language: 'markdown',
      content: `# Awesome Project 🚀

Welcome to your DevCloud repository workspace!

## Getting Started

1. Open the interactive terminal below.
2. Run \`git status\` or \`npm install\` to inspect package dependencies.
3. Edit files in \`src/main.ts\` and see instant updates in your workspace.

### Features
- ⚡ Instant GitHub Repository Cloning
- 🛡️ Built-in Branch & PR Management
- 💻 Real-time Code Editor with syntax highlights
- 🖥️ Integrated Bash Terminal
`,
    },
  ],
};

export const POPULAR_STARTER_REPOS = [
  {
    name: 'react-dashboard-starter',
    owner: 'tailwindlabs',
    stars: 3840,
    forks: 920,
    description: 'Modern dashboard with Tailwind CSS v4, dark mode, and charting widgets',
    url: 'https://github.com/tailwindlabs/react-dashboard-starter',
  },
  {
    name: 'express-microservices-api',
    owner: 'expressjs',
    stars: 12500,
    forks: 3400,
    description: 'Production-ready REST & WebSocket backend service skeleton',
    url: 'https://github.com/expressjs/express-microservices-api',
  },
  {
    name: 'gemini-ai-agent-toolkit',
    owner: 'google',
    stars: 8900,
    forks: 1650,
    description: 'Antigravity multi-agent orchestration and Gemini model tools',
    url: 'https://github.com/google/gemini-ai-agent-toolkit',
  },
];

export const MOCK_PULL_REQUESTS: PullRequest[] = [
  {
    id: 42,
    title: 'feat: add git authentication provider and credentials manager',
    author: 'alex-dev',
    branch: 'feature/auth-provider',
    targetBranch: 'main',
    status: 'open',
    commentsCount: 5,
    updatedAt: '2 hours ago',
    description: 'Introduces secure OAuth credential exchange for enterprise GitHub repositories.',
  },
  {
    id: 41,
    title: 'fix: handle terminal WebSocket reconnect on packet loss',
    author: 'sarah-code',
    branch: 'fix/terminal-reconnect',
    targetBranch: 'main',
    status: 'merged',
    commentsCount: 2,
    updatedAt: 'Yesterday',
    description: 'Automatically resumes active command stream when network fluctuations occur.',
  },
  {
    id: 39,
    title: 'chore: upgrade dependencies to React 19 & Tailwind v4',
    author: 'alex-dev',
    branch: 'chore/deps-bump',
    targetBranch: 'main',
    status: 'merged',
    commentsCount: 7,
    updatedAt: '3 days ago',
    description: 'Upgraded peer dependencies and removed deprecated layout wrappers.',
  },
];

export const MOCK_WORKFLOWS: WorkflowRun[] = [
  {
    id: 'run-902',
    name: 'CI / Test & Lint Suite',
    trigger: 'push to main',
    status: 'success',
    duration: '42s',
    branch: 'main',
    commitHash: '7f9a2bc',
    timeAgo: '15 minutes ago',
  },
  {
    id: 'run-901',
    name: 'Docker Container Build & Deploy',
    trigger: 'workflow_dispatch',
    status: 'success',
    duration: '1m 24s',
    branch: 'main',
    commitHash: '7f9a2bc',
    timeAgo: '16 minutes ago',
  },
  {
    id: 'run-900',
    name: 'Security Audit & Dependency Vulnerability Scan',
    trigger: 'schedule',
    status: 'success',
    duration: '18s',
    branch: 'main',
    commitHash: '3d81fa0',
    timeAgo: '3 hours ago',
  },
];
