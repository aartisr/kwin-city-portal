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
  Mail,
  Users
} from 'lucide-react';
import { PWAInstallBadge } from './PWAInstallBadge';

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

  // Purely critical focus areas for direct desktop access
  const primaryNav: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: Building2, desc: 'Masterplan & districts' },
    { id: 'spatial', label: 'Spatial Masterplan', icon: MapPin, desc: 'Interactive GIS' },
    { id: 'valuation', label: 'Valuation Index', icon: BarChart3, desc: 'Appreciation models' },
    { id: 'discourse', label: 'Discourse Lab', icon: Users, desc: 'Civic board & AI guide' },
  ];

  interface NavGroup {
    title: string;
    items: NavItem[];
  }

  // Grouped secondary intelligence modules to prevent menu sprawl
  const secondaryGroups: NavGroup[] = [
    {
      title: "Spatial & Hazards",
      items: [
        { id: 'satellite', label: 'Satellite Radar', icon: Satellite, desc: 'Sentinel-2 observation' },
        { id: 'risks', label: 'Risk Scanner', icon: ShieldAlert, desc: 'Survey title & flood checks' },
        { id: 'regulatory', label: 'Regulatory clearances', icon: Layers, desc: 'Statutory clearances' },
      ]
    },
    {
      title: "Value & Feasibility",
      items: [
        { id: 'feasibility', label: 'Survey Feasibility', icon: Compass, desc: 'Survey lookup & payouts' },
        { id: 'opportunities', label: 'PPP & Tenders', icon: Briefcase, desc: 'Commercial allotments' },
        { id: 'insights', label: 'Data Insights', icon: Activity, desc: 'Resource & growth metrics' },
      ]
    },
    {
      title: "Updates & Media",
      items: [
        { id: 'news', label: 'Gazette News', icon: Radio, desc: 'Live statutory notifications' },
        { id: 'social', label: 'Social Studio', icon: Share2, desc: 'Official communications' },
        { id: 'contact', label: 'Contact desk', icon: Mail, desc: 'Research inquiry desk' },
      ]
    }
  ];

  const secondaryTools: NavItem[] = secondaryGroups.flatMap(g => g.items);

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
                PORTAL
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-wide text-slate-400 hidden sm:block">
              Independent Intelligence & Analytics
            </p>
          </div>
        </div>

        {/* Clean, Non-crowded Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1.5">
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

          {/* Categorized Tools Dropdown (Mega-Menu style) */}
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
              <span>More Modules</span>
              <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Categorized Mega-Dropdown Menu */}
            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[540px] rounded-2xl border border-slate-800 bg-slate-950 p-4 shadow-2xl backdrop-blur-xl z-50 grid grid-cols-3 gap-4">
                {secondaryGroups.map((group) => (
                  <div key={group.title} className="space-y-2">
                    <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-1">
                      {group.title}
                    </div>
                    <div className="space-y-1">
                      {group.items.map((tool) => {
                        const ToolIcon = tool.icon;
                        const isActive = activeTab === tool.id;
                        return (
                          <button
                            key={tool.id}
                            onClick={() => {
                              setActiveTab(tool.id);
                              setToolsDropdownOpen(false);
                            }}
                            className={`w-full flex items-start gap-2.5 rounded-lg p-1.5 text-left transition-all ${
                              isActive
                                ? 'bg-indigo-500/10 text-indigo-200'
                                : 'hover:bg-slate-900 text-slate-300 hover:text-white'
                            }`}
                          >
                            <ToolIcon className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-[11px] font-bold leading-tight truncate">{tool.label}</div>
                              <div className="text-[9px] text-slate-400 font-light truncate leading-normal">{tool.desc}</div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Subtle PWA Install Indicator */}
          <PWAInstallBadge variant="compact" />

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

      {/* Mobile & Tablet Categorized Slide-Over Navigation */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-800 bg-slate-950/98 px-4 py-5 lg:hidden max-h-[85vh] overflow-y-auto space-y-4 shadow-2xl">
          <div className="space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-1.5">
              Core Modules
            </div>
            <div className="grid grid-cols-2 gap-2">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2.5 rounded-xl p-2.5 text-left text-xs font-semibold transition-all ${
                      isActive
                        ? 'border border-emerald-500/40 bg-emerald-500/15 text-emerald-200'
                        : 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="truncate font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {secondaryGroups.map((group) => (
            <div key={group.title} className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800/80 pb-1.5">
                {group.title}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 rounded-xl p-2.5 text-left text-xs font-semibold transition-all ${
                        isActive
                          ? 'border border-indigo-500/40 bg-indigo-500/15 text-indigo-200'
                          : 'border border-slate-800/80 bg-slate-900/60 text-slate-300 hover:bg-slate-900 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-indigo-400" />
                      <div className="min-w-0">
                        <div className="truncate font-bold text-[11px]">{item.label}</div>
                        <div className="text-[9px] text-slate-400 truncate font-light leading-normal">{item.desc}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
