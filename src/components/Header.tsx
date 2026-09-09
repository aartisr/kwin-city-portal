import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  ShieldCheck, 
  Menu, 
  X, 
  Compass, 
  BarChart3, 
  MapPin, 
  Activity, 
  Radio, 
  Layers, 
  Cpu,
  Share2,
  ChevronDown,
  ShieldAlert,
  Briefcase,
  Satellite,
  Mail
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  interface NavItem {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    highlight?: boolean;
    desc?: string;
  }

  const primaryNav: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: Building2, desc: 'Masterplan & 4 districts overview' },
    { id: 'spatial', label: 'Spatial Masterplan', icon: MapPin, desc: 'Interactive vector map & GIS buffers' },
    { id: 'valuation', label: 'Valuation Index', icon: BarChart3, desc: '10-year land appreciation curves' },
    { id: 'feasibility', label: 'Survey Feasibility', icon: Compass, desc: 'Survey lookup, KIADB payout & ROI' },
    { id: 'regulatory', label: 'Regulatory', icon: Layers, desc: 'Single-window statutory clearances' },
  ];

  const secondaryTools: NavItem[] = [
    { id: 'insights', label: 'Data Insights', icon: Activity, desc: 'Airport, water & job growth metrics' },
    { id: 'news', label: 'Gazette News', icon: Radio, desc: 'Live DIPR & KIADB statutory feeds' },
    { id: 'social', label: 'Social Studio', icon: Share2, desc: 'Official handles & trend generator' },
    { id: 'risks', label: 'Risk Scanner', icon: ShieldAlert, desc: 'Survey number title & flood checks' },
    { id: 'opportunities', label: 'PPP & Tenders', icon: Briefcase, desc: 'University & commercial allotments' },
    { id: 'satellite', label: 'Satellite Radar', icon: Satellite, desc: 'Sentinel-2 earth observation' },
    { id: 'evidence', label: 'Evidence Vault', icon: ShieldCheck, desc: 'SHA-256 cryptographic fact checks' },
    { id: 'contact', label: 'Contact', icon: Mail, desc: 'Research desk & inquiry form' },
  ];

  const allNavItems: NavItem[] = [
    ...primaryNav,
    ...secondaryTools
  ];

  const isSecondaryActive = secondaryTools.some(t => t.id === activeTab);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Lockup */}
        <div 
          onClick={() => {
            setActiveTab('overview');
            setMobileMenuOpen(false);
          }}
          className="flex cursor-pointer items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-slate-950">
              <Cpu className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Cinzel',serif] text-base sm:text-lg font-bold tracking-wider text-slate-100">
                KWIN<span className="text-emerald-400 font-extrabold">·CITY</span>
              </span>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                RESEARCH PORTAL
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-wide text-slate-400 hidden sm:block">
              Independent Intelligence & Analytics Portal
            </p>
          </div>
        </div>

        {/* Uncrowded Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  isActive
                    ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-200 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Tools & Intelligence Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                isSecondaryActive
                  ? 'border border-indigo-500/40 bg-indigo-500/15 text-indigo-200 shadow-sm'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <Compass className="h-4 w-4 text-indigo-400" />
              <span>More Tools</span>
              <span className="rounded-full bg-slate-800 px-1.5 py-0.5 text-[10px] text-indigo-300 font-mono">{secondaryTools.length}</span>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu Overlay */}
            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-950 p-2 shadow-2xl backdrop-blur-xl z-50 space-y-1">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80">
                  Specialized Intelligence Tools
                </div>

                {secondaryTools.map((tool) => {
                  const ToolIcon = tool.icon;
                  const isActive = activeTab === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setActiveTab(tool.id);
                        setToolsDropdownOpen(false);
                      }}
                      className={`w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all ${
                        isActive
                          ? 'border border-indigo-500/30 bg-indigo-500/15 text-indigo-200'
                          : 'hover:bg-slate-900 text-slate-300 hover:text-white'
                      }`}
                    >
                      <ToolIcon className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold">{tool.label}</div>
                        <div className="text-[10px] text-slate-400 font-light">{tool.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick Search Trigger */}
          <button
            id="global-search-trigger"
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/90 px-3 py-2 text-xs text-slate-300 transition-colors hover:border-slate-700 hover:text-white"
            title="Search entire portal (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline font-medium">Search...</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Evidence Trust Badge */}
          <div className="hidden xl:flex items-center gap-1.5 rounded-xl border border-emerald-500/20 bg-emerald-950/40 px-3 py-2 text-[11px] font-semibold text-emerald-300">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Verified Data</span>
          </div>

          {/* Mobile & Tablet Navigation Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white lg:hidden"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Full Screen / Slide-Over Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/98 px-4 py-5 lg:hidden max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
            Main Navigation & Value-Add Tools
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 rounded-xl p-3 text-left text-xs font-semibold transition-all ${
                    isActive
                      ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-200'
                      : 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                  <div className="min-w-0">
                    <div className="truncate font-bold">{item.label}</div>
                    {item.desc && <div className="text-[10px] text-slate-400 truncate font-light">{item.desc}</div>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
