import { FileItem, Repository } from '../types';
import clonedTreeRaw from './clonedRepoData.json';

export const KWIN_CITY_PORTAL_REPO: Repository = {
  name: 'kwin-city-portal',
  owner: 'aartisr',
  branch: 'main',
  branches: ['main', 'develop', 'release/v1.0', 'feature/pwa-optimizations'],
  stars: 38,
  forks: 9,
  isPrivate: false,
  description: 'KWIN City - Knowledge, Wellbeing, Innovation City - Official Portal & Interactive Hub',
  storageUsed: '1.45GB',
  storageMax: '2GB',
  files: clonedTreeRaw as FileItem[],
};
