import { FileItem, Repository } from '../types';
import clonedTreeRaw from './clonedRepoData.json';

export const TASK_LAUREATE_REPO: Repository = {
  name: 'task-laureate',
  owner: 'aartisr',
  branch: 'master',
  branches: [
    'master',
    'gh-pages',
    'dependabot/npm_and_yarn/tanstack/react-table-9.1.2',
    'dependabot/npm_and_yarn/supabase/supabase-js-2.112.3',
    'vercel/vercel-web-analytics-integrati-privz3'
  ],
  stars: 12,
  forks: 3,
  isPrivate: false,
  description: 'A generic, extensible TanStack task-management platform with Supabase backend and modern architecture.',
  storageUsed: '640MB',
  storageMax: '2GB',
  files: clonedTreeRaw as FileItem[],
};

export const KWIN_CITY_PORTAL_REPO = TASK_LAUREATE_REPO;

