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
    id: 18,
    title: 'chore(deps): bump @tanstack/react-table from 8.21.2 to 9.1.2',
    author: 'dependabot[bot]',
    branch: 'dependabot/npm_and_yarn/tanstack/react-table-9.1.2',
    targetBranch: 'master',
    status: 'open',
    commentsCount: 2,
    updatedAt: '3 hours ago',
    description: 'Bumps @tanstack/react-table to latest stable release with virtualized row performance enhancements.',
  },
  {
    id: 17,
    title: 'chore(deps): bump @supabase/supabase-js from 2.108.0 to 2.112.3',
    author: 'dependabot[bot]',
    branch: 'dependabot/npm_and_yarn/supabase/supabase-js-2.112.3',
    targetBranch: 'master',
    status: 'open',
    commentsCount: 1,
    updatedAt: '5 hours ago',
    description: 'Updates Supabase client library with hardened session token refreshes and edge channel stability.',
  },
  {
    id: 16,
    title: 'refactor: modularize list experience and reporting dashboard',
    author: 'aartisr',
    branch: 'refactor/list-experience',
    targetBranch: 'master',
    status: 'merged',
    commentsCount: 4,
    updatedAt: 'Yesterday',
    description: 'Deconstructs massive task board views into reusable TanStack data tables and accessible drawer components.',
  },
  {
    id: 15,
    title: 'Address Usability Gaps in Task Focus Mode',
    author: 'aartisr',
    branch: 'feat/focus-mode-ux',
    targetBranch: 'master',
    status: 'merged',
    commentsCount: 3,
    updatedAt: '2 days ago',
    description: 'Improves focus mode timer contrast, task completion animations, and keyboard accessibility shortcuts.',
  },
];

export const MOCK_WORKFLOWS: WorkflowRun[] = [
  {
    id: 'run-104',
    name: 'CI / Quality Gate (Lint, Typecheck & Test)',
    trigger: 'push to master',
    status: 'success',
    duration: '48s',
    branch: 'master',
    commitHash: 'cb6fe7a',
    timeAgo: '20 minutes ago',
  },
  {
    id: 'run-103',
    name: 'Vercel Preview Deployment',
    trigger: 'pull_request',
    status: 'success',
    duration: '1m 12s',
    branch: 'master',
    commitHash: 'cb6fe7a',
    timeAgo: '22 minutes ago',
  },
  {
    id: 'run-102',
    name: 'Supabase Migrations & Security Verify',
    trigger: 'schedule',
    status: 'success',
    duration: '22s',
    branch: 'master',
    commitHash: 'c25b7dd',
    timeAgo: '4 hours ago',
  },
];
