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
  | 'contact';

export function useKwinPortal(initialTab: PortalTab = 'overview') {
  const [activeTab, setActiveTabState] = useState<PortalTab>(() => {
    const saved = localStorage.getItem('kwin_active_tab');
    if (saved === 'evaluation') return 'overview';
    return (saved as PortalTab) || initialTab;
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const setActiveTab = useCallback((tab: PortalTab | string) => {
    const validTab = (tab === 'evaluation' ? 'overview' : tab) as PortalTab;
    setActiveTabState(validTab);
    localStorage.setItem('kwin_active_tab', validTab);
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

  return {
    activeTab,
    setActiveTab,
    isSearchOpen,
    openSearch,
    closeSearch,
  };
}
