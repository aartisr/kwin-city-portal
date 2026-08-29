export interface FileItem {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: FileItem[];
  content?: string;
  language?: string;
  isModified?: boolean;
}

export interface OpenTab {
  id: string;
  name: string;
  path: string;
  language: string;
  isModified?: boolean;
}

export interface TerminalLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'info';
  text: string;
  timestamp?: string;
}

export interface Repository {
  name: string;
  owner: string;
  branch: string;
  branches: string[];
  stars: number;
  forks: number;
  isPrivate: boolean;
  description: string;
  files: FileItem[];
  storageUsed: string;
  storageMax: string;
}

export interface PullRequest {
  id: number;
  title: string;
  author: string;
  branch: string;
  targetBranch: string;
  status: 'open' | 'merged' | 'closed';
  commentsCount: number;
  updatedAt: string;
  description: string;
}

export interface WorkflowRun {
  id: string;
  name: string;
  trigger: string;
  status: 'success' | 'in_progress' | 'failed' | 'queued';
  duration: string;
  branch: string;
  commitHash: string;
  timeAgo: string;
}
