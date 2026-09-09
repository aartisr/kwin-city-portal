import { useState, useCallback, useEffect } from 'react';

export type PortalTab = 
  | 'overview' 
  | 'spatial' 
  | 'valuation' 
  | 'feasibility'
  | 'regulatory' 
  | 'insights' 
  | 'risks' 
  | 'opportunities' 
  | 'news' 
  | 'social' 
  | 'satellite' 
  | 'evidence' 
  | 'contact'
  | 'discourse';

const tabPaths: Record<PortalTab, string> = {
  overview: '/',
  spatial: '/spatial',
  valuation: '/valuation',
  feasibility: '/feasibility',
  regulatory: '/regulatory',
  insights: '/insights',
  risks: '/risks',
  opportunities: '/opportunities',
  news: '/news',
  social: '/social',
  satellite: '/satellite',
  evidence: '/evidence',
  contact: '/contact',
  discourse: '/discourse',
};

const pathTabs = Object.entries(tabPaths).reduce<Record<string, PortalTab>>((paths, [tab, path]) => {
  paths[path] = tab as PortalTab;
  return paths;
}, {});

function tabFromLocation(): PortalTab | undefined {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  return pathTabs[path];
}

export function useKwinPortal(initialTab: PortalTab = 'overview') {
  const [activeTab, setActiveTabState] = useState<PortalTab>(() => {
    const pathTab = tabFromLocation();
    if (pathTab) return pathTab;
    const saved = localStorage.getItem('kwin_active_tab');
    if (saved === 'evaluation') return 'overview';
    return (saved as PortalTab) || initialTab;
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const setActiveTab = useCallback((tab: PortalTab | string) => {
    const validTab = (tab === 'evaluation' ? 'overview' : tab) as PortalTab;
    setActiveTabState(validTab);
    localStorage.setItem('kwin_active_tab', validTab);
    const nextPath = tabPaths[validTab];
    if (nextPath && window.location.pathname !== nextPath) {
      window.history.pushState({ tab: validTab }, '', nextPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const openSearch = useCallback(() => setIsSearchOpen(true), []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const pathTab = tabFromLocation();
      if (pathTab) {
        setActiveTabState(pathTab);
        localStorage.setItem('kwin_active_tab', pathTab);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return {
    activeTab,
    setActiveTab,
    isSearchOpen,
    openSearch,
    closeSearch,
  };
}
