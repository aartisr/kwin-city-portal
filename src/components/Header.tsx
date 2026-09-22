import React, { useState, useRef, useEffect } from 'react';
import { 
  Building2, 
  Search, 
  Menu, 
  X, 
  Compass, 
  TrendingUp, 
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
  Users,
  Bookmark,
  Sparkles,
  User,
  FileText,
  FileCheck2,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  SlidersHorizontal,
  LogOut,
  FolderKanban
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { PWAInstallBadge } from './PWAInstallBadge';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenWatchlist?: () => void;
  onOpenPricing?: () => void;
  onOpenProfile?: () => void;
  onOpenDueDiligencePDF?: () => void;
}

interface NavItem {
  id: string;
  label: string;
  shortLabel?: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
  badge?: string;
  badgeColor?: 'emerald' | 'amber' | 'cyan' | 'indigo';
}

interface NavCategory {
  title: string;
  description: string;
  items: NavItem[];
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenWatchlist,
  onOpenPricing,
  onOpenProfile,
  onOpenDueDiligencePDF,
}) => {
  const { user, tier, watchlist, totalPortfolioAcreage } = useUser();
  const { isInstallable, install } = usePWAInstall();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);

  const toolsDropdownRef = useRef<HTMLDivElement>(null);
  const accountDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(target)) {
        setToolsDropdownOpen(false);
      }
      if (accountDropdownRef.current && !accountDropdownRef.current.contains(target)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary High-Intent Navigation (The 4 core actions users take daily)
  const primaryNav: NavItem[] = [
    { 
      id: 'overview', 
      label: 'Overview', 
      shortLabel: 'Overview',
      icon: Building2, 
      desc: 'Masterplan & 4 districts' 
    },
    { 
      id: 'spatial', 
      label: 'Masterplan GIS', 
      shortLabel: 'GIS Map',
      icon: MapPin, 
      desc: '5,800-acre cadastral explorer' 
    },
    { 
      id: 'feasibility', 
      label: 'Survey Audit', 
      shortLabel: 'Survey Audit',
      icon: Compass, 
      desc: 'Section 28 & compensation payout',
      badge: 'Statutory'
    },
    { 
      id: 'valuation', 
      label: 'Valuation Index', 
      shortLabel: 'Valuation',
      icon: TrendingUp, 
      desc: 'Guidance rate vs market comps' 
    },
  ];

  // Secondary Intelligence & Due Diligence Modules organized cleanly by mental model
  const toolCategories: NavCategory[] = [
    {
      title: "Statutory & Risk Clearances",
      description: "Land title verification & government notifications",
      items: [
        { 
          id: 'risks', 
          label: 'Risk & Hazard Scanner', 
          icon: ShieldAlert, 
          desc: 'Lake buffers, flood recharge & title encumbrances',
          badge: 'High Priority',
          badgeColor: 'amber'
        },
        { 
          id: 'regulatory', 
          label: 'KIADB Clearances', 
          icon: Layers, 
          desc: 'KUM single-window workflow & stamp duty relief',
          badge: '45-Day',
          badgeColor: 'cyan'
        },
        { 
          id: 'evidence', 
          label: 'Gazette Evidence Vault', 
          icon: FileCheck2, 
          desc: 'Primary Karnataka Government Gazette notices' 
        },
      ]
    },
    {
      title: "Physical Infrastructure & Satellite",
      description: "Remote sensing & physical project delivery",
      items: [
        { 
          id: 'satellite', 
          label: 'Sentinel-2 Satellite Radar', 
          icon: Satellite, 
          desc: 'Live multispectral NDVI & civil earthworks tracking',
          badge: 'Live Orbit',
          badgeColor: 'emerald'
        },
        { 
          id: 'insights', 
          label: 'Civic Data & Hydrology', 
          icon: Activity, 
          desc: 'Groundwater table depths & power substations' 
        },
        { 
          id: 'opportunities', 
          label: 'PPP Tenders & Allotments', 
          icon: Briefcase, 
          desc: 'KIADB industrial plots & concession tenders' 
        },
      ]
    },
    {
      title: "Market & Public Discourse",
      description: "Civic intelligence, news & expert queries",
      items: [
        { 
          id: 'discourse', 
          label: 'Discourse Lab & Citizen AI', 
          icon: Users, 
          desc: 'Community advisory forum & statutory AI guidance',
          badge: 'AI Powered',
          badgeColor: 'indigo'
        },
        { 
          id: 'news', 
          label: 'Gazette News Stream', 
          icon: Radio, 
          desc: 'Real-time notifications & road connectivity updates' 
        },
        { 
          id: 'social', 
          label: 'Communications Studio', 
          icon: Share2, 
          desc: 'Verified government briefings & social media telemetry' 
        },
        { 
          id: 'contact', 
          label: 'Research Inquiry Desk', 
          icon: Mail, 
          desc: 'Institutional due diligence inquiries & audit support' 
        },
      ]
    }
  ];

  const allSecondaryTools = toolCategories.flatMap(c => c.items);
  const activeSecondaryTool = allSecondaryTools.find(t => t.id === activeTab);
  const isSecondaryActive = Boolean(activeSecondaryTool);

  const userInitial = user?.name ? user.name[0].toUpperCase() : 'U';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/90 dark:border-slate-800/90 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl transition-colors shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8">
        
        {/* ============================================================ */}
        {/* ZONE 1: BRAND & CREDIBILITY LOCKUP                           */}
        {/* ============================================================ */}
        <div 
          onClick={() => {
            setActiveTab('overview');
            setMobileMenuOpen(false);
          }}
          className="flex cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
        >
          {/* Geometric Tech Emblem */}
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 p-0.5 shadow-sm shadow-emerald-600/20">
            <div className="flex h-full w-full items-center justify-center rounded-[9px] bg-slate-950">
              <Cpu className="h-4.5 w-4.5 text-emerald-400" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Cinzel',serif] text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-none">
                KWIN<span className="text-emerald-700 dark:text-emerald-400 font-extrabold">·CITY</span>
              </span>
              <span className="rounded-md border border-emerald-600/20 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 px-1.5 py-0.2 text-[9px] font-mono font-bold tracking-wider uppercase">
                RESEARCH
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-wide text-slate-500 dark:text-slate-400 hidden xl:block leading-none mt-1">
              5,800-Acre Land Intelligence Clearinghouse
            </p>
          </div>
        </div>

        {/* ============================================================ */}
        {/* ZONE 2: PRIMARY NAVIGATION BAR (Sleek, Uncrowded Hierarchy)  */}
        {/* ============================================================ */}
        <nav className="hidden lg:flex items-center space-x-1">
          {primaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setToolsDropdownOpen(false);
                }}
                className={`relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900'
                }`}
                title={item.desc}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-300 dark:text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="rounded bg-emerald-100 dark:bg-emerald-950/80 px-1 py-0.2 text-[9px] font-mono font-bold text-emerald-800 dark:text-emerald-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Unified "Intelligence & Tools" Mega-Menu Trigger */}
          <div className="relative" ref={toolsDropdownRef}>
            <button
              onClick={() => {
                setToolsDropdownOpen(!toolsDropdownOpen);
                setAccountDropdownOpen(false);
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                isSecondaryActive
                  ? 'border border-indigo-500/50 bg-indigo-50 text-indigo-950 dark:bg-indigo-950/40 dark:text-indigo-200 dark:border-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-900'
              }`}
              aria-expanded={toolsDropdownOpen}
            >
              <Compass className={`h-3.5 w-3.5 ${isSecondaryActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500 dark:text-slate-400'}`} />
              <span>
                {isSecondaryActive ? activeSecondaryTool?.label : 'Intelligence & Tools'}
              </span>
              <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* World-Class Structured Mega-Menu Popover */}
            {toolsDropdownOpen && (
              <div className="absolute right-0 mt-2 w-[720px] rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white/98 dark:bg-slate-950/98 p-5 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                
                {/* Popover Header */}
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold font-['Cinzel',serif] uppercase tracking-wider text-slate-900 dark:text-white">
                      Specialized Land Intelligence Modules
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    10 Secondary Tools
                  </span>
                </div>

                {/* 3 Structured Columns */}
                <div className="grid grid-cols-3 gap-5">
                  {toolCategories.map((category) => (
                    <div key={category.title} className="space-y-2">
                      <div>
                        <div className="text-[11px] font-bold text-slate-900 dark:text-slate-200">
                          {category.title}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                          {category.description}
                        </div>
                      </div>

                      <div className="space-y-1 pt-1">
                        {category.items.map((tool) => {
                          const ToolIcon = tool.icon;
                          const isActive = activeTab === tool.id;
                          return (
                            <button
                              key={tool.id}
                              onClick={() => {
                                setActiveTab(tool.id);
                                setToolsDropdownOpen(false);
                              }}
                              className={`w-full group flex items-start gap-2.5 rounded-xl p-2 text-left transition-all cursor-pointer ${
                                isActive
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-950 dark:text-emerald-200'
                                  : 'hover:bg-slate-100/80 dark:hover:bg-slate-900/80 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              <div className={`p-1.5 rounded-lg mt-0.5 shrink-0 transition-colors ${
                                isActive 
                                  ? 'bg-emerald-600 text-white' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-emerald-100 group-hover:text-emerald-800 dark:group-hover:bg-emerald-950 dark:group-hover:text-emerald-300'
                              }`}>
                                <ToolIcon className="h-3.5 w-3.5" />
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between gap-1">
                                  <span className="text-xs font-semibold truncate group-hover:text-emerald-800 dark:group-hover:text-emerald-300">
                                    {tool.label}
                                  </span>
                                  {tool.badge && (
                                    <span className={`shrink-0 rounded px-1 py-0.2 text-[8px] font-mono font-bold uppercase ${
                                      tool.badgeColor === 'amber'
                                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                        : tool.badgeColor === 'cyan'
                                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                                          : tool.badgeColor === 'indigo'
                                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300'
                                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    }`}>
                                      {tool.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 leading-normal mt-0.5">
                                  {tool.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Popover Footer Strip */}
                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <kbd className="rounded border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] font-bold">
                      ⌘K
                    </kbd>
                    <span>Instant Cadastral & Survey Number Search</span>
                  </div>

                  <button
                    onClick={() => {
                      setActiveTab('feasibility');
                      setToolsDropdownOpen(false);
                    }}
                    className="text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Check Survey Number</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

              </div>
            )}
          </div>
        </nav>

        {/* ============================================================ */}
        {/* ZONE 3: WORLD-CLASS UNIFIED WORKSPACE & COMMAND CONTROLS    */}
        {/* ============================================================ */}
        <div className="flex items-center gap-2">
          
          {/* Universal Search Trigger (Compact & Elegant) */}
          <button
            id="global-search-trigger"
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/80 hover:bg-slate-100 dark:bg-slate-900/80 dark:hover:bg-slate-900 px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
            title="Search survey numbers, gazettes, or tools (⌘K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline font-medium">Search...</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1 py-0.2 text-[9px] font-mono text-slate-500 dark:text-slate-400 font-bold">
              ⌘K
            </kbd>
          </button>

          {/* Direct Due Diligence PDF Action (Single Clear Value Trigger) */}
          {onOpenDueDiligencePDF && (
            <button
              onClick={onOpenDueDiligencePDF}
              className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-emerald-600/30 bg-emerald-50/80 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-950 text-emerald-900 dark:text-emerald-200 px-2.5 py-1.5 text-xs font-semibold transition shadow-2xs cursor-pointer"
              title="Generate Instant Bank-Grade Due Diligence Dossier"
            >
              <FileText className="h-3.5 w-3.5 text-emerald-700 dark:text-emerald-400" />
              <span>Audit PDF</span>
            </button>
          )}

          {/* Progressive Web App Install & Cache Update Badge */}
          <PWAInstallBadge variant="compact" />

          {/* ============================================================ */}
          {/* THE UNIFIED EXECUTIVE WORKSPACE / ACCOUNT CHIP (NO CLUTTER)   */}
          {/* Replaces 3 disparate buttons with a single luxury popover     */}
          {/* ============================================================ */}
          <div className="relative" ref={accountDropdownRef}>
            <button
              id="executive-workspace-trigger"
              onClick={() => {
                setAccountDropdownOpen(!accountDropdownOpen);
                setToolsDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 p-1 sm:px-2 sm:py-1 transition-all shadow-2xs cursor-pointer group"
              title="Executive Workspace: Watchlist, Plan & Profile"
              aria-expanded={accountDropdownOpen}
            >
              {/* User Avatar with Ring */}
              <div className="relative flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-emerald-600 to-teal-700 text-white text-[11px] font-bold shadow-xs">
                {userInitial}
                {/* Watchlist Counter Pip */}
                {watchlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-indigo-600 text-[8px] font-mono font-bold text-white ring-1 ring-white dark:ring-slate-950">
                    {watchlist.length}
                  </span>
                )}
              </div>

              {/* Compact Plan Badge */}
              <span className={`hidden sm:inline-flex items-center gap-1 rounded px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase ${
                tier === 'free'
                  ? 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}>
                {tier === 'free' ? 'Free' : tier}
              </span>

              <ChevronDown className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${accountDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* The Executive Workspace Popover */}
            {accountDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-slate-950 p-4 shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4">
                
                {/* User Identity Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white font-bold shadow-sm">
                      {userInitial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {user?.name || 'Investor Workspace'}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.email || 'research@kwincity.org'}
                      </div>
                      <div className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 font-semibold truncate mt-0.5">
                        {user?.role || 'Land Investor'} • {user?.organization || 'Apex Strategic Land Fund'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Plan & Subscription Card */}
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 dark:text-slate-400">
                        Access Level
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5 mt-0.5">
                        <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                        <span className="uppercase">{tier} Membership</span>
                      </div>
                    </div>

                    {onOpenPricing && (
                      <button
                        onClick={() => {
                          onOpenPricing();
                          setAccountDropdownOpen(false);
                        }}
                        className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-1 text-[11px] font-bold transition cursor-pointer shadow-2xs"
                      >
                        {tier === 'free' ? 'Upgrade Plan' : 'Manage Tier'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Portfolio & Watchlist Quick Access */}
                <div className="space-y-1">
                  {onOpenWatchlist && (
                    <button
                      onClick={() => {
                        onOpenWatchlist();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-400">
                          <Bookmark className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div>Saved Parcels Watchlist</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            {watchlist.length} parcels tracked ({totalPortfolioAcreage.toFixed(1)} acres)
                          </div>
                        </div>
                      </div>
                      <span className="rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-800 dark:text-indigo-300 font-mono text-[10px] font-bold px-2 py-0.5">
                        {watchlist.length}
                      </span>
                    </button>
                  )}

                  {onOpenDueDiligencePDF && (
                    <button
                      onClick={() => {
                        onOpenDueDiligencePDF();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400">
                          <Download className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div>Due Diligence PDF Export</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            Generate bank-grade report
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  )}

                  {onOpenProfile && (
                    <button
                      onClick={() => {
                        onOpenProfile();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <User className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <div>Investor Profile & Alerts</div>
                          <div className="text-[10px] text-slate-500 font-normal">
                            Manage contact & organization
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                    </button>
                  )}
                </div>

                {/* Optional PWA Install Option (Integrated Seamlessly) */}
                {isInstallable && (
                  <div className="pt-2 border-t border-slate-200 dark:border-slate-800">
                    <button
                      onClick={() => {
                        install();
                        setAccountDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between rounded-xl p-2 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 transition cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Download className="h-3.5 w-3.5 text-emerald-600" />
                        <span>Install Portal as App (Offline)</span>
                      </div>
                      <span className="text-[10px] font-mono uppercase bg-emerald-200 dark:bg-emerald-900 px-1.5 py-0.5 rounded font-bold">
                        PWA
                      </span>
                    </button>
                  </div>
                )}

              </div>
            )}
          </div>

          {/* Mobile & Tablet Navigation Toggle */}
          <button
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white lg:hidden shadow-2xs cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

        </div>
      </div>

      {/* ============================================================ */}
      {/* MOBILE & TABLET SLIDE-OVER NAVIGATION SHEET                  */}
      {/* ============================================================ */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white/98 dark:bg-slate-950/98 px-4 py-5 lg:hidden max-h-[85vh] overflow-y-auto space-y-5 shadow-2xl animate-in slide-in-from-top-2 duration-150">
          
          {/* Quick Search in Mobile */}
          <div 
            onClick={() => {
              onOpenSearch();
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-2.5 text-xs text-slate-500 cursor-pointer"
          >
            <Search className="h-4 w-4 text-emerald-600" />
            <span className="flex-1 font-medium">Search survey number, village, or tool...</span>
            <kbd className="rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 font-mono text-[9px] font-bold">
              ⌘K
            </kbd>
          </div>

          {/* Quick Action Bar */}
          <div className="grid grid-cols-3 gap-2">
            {onOpenDueDiligencePDF && (
              <button
                onClick={() => {
                  onOpenDueDiligencePDF();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 text-center space-y-1 cursor-pointer"
              >
                <FileText className="h-4 w-4 mx-auto text-emerald-600" />
                <div className="text-[10px] font-bold">Audit PDF</div>
              </button>
            )}

            {onOpenWatchlist && (
              <button
                onClick={() => {
                  onOpenWatchlist();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-center space-y-1 relative cursor-pointer"
              >
                <Bookmark className="h-4 w-4 mx-auto text-indigo-600" />
                <div className="text-[10px] font-bold">Watchlist ({watchlist.length})</div>
              </button>
            )}

            {onOpenPricing && (
              <button
                onClick={() => {
                  onOpenPricing();
                  setMobileMenuOpen(false);
                }}
                className="p-2.5 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 text-center space-y-1 cursor-pointer"
              >
                <Sparkles className="h-4 w-4 mx-auto text-amber-600" />
                <div className="text-[10px] font-bold">Plan ({tier})</div>
              </button>
            )}
          </div>

          {/* Core Navigation Section */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1">
              Core Diligence & Masterplan
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
                    className={`flex items-center gap-2 rounded-xl p-2.5 text-left text-xs font-bold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-xs'
                        : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-emerald-300 dark:text-white' : 'text-slate-500'}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Categorized Secondary Modules */}
          {toolCategories.map((category) => (
            <div key={category.title} className="space-y-2">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 pb-1">
                {category.title}
              </div>
              <div className="space-y-1.5">
                {category.items.map((tool) => {
                  const ToolIcon = tool.icon;
                  const isActive = activeTab === tool.id;
                  return (
                    <button
                      key={tool.id}
                      onClick={() => {
                        setActiveTab(tool.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'border border-emerald-500 bg-emerald-50 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200'
                          : 'border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <ToolIcon className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        <div className="min-w-0">
                          <div className="truncate text-xs font-bold">{tool.label}</div>
                          <div className="text-[10px] text-slate-500 truncate font-normal">{tool.desc}</div>
                        </div>
                      </div>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* User Account Drawer Footer */}
          {onOpenProfile && (
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center text-xs font-bold">
                  {userInitial}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user?.name || 'Investor Workspace'}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono">
                    Tier: {tier.toUpperCase()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  onOpenProfile();
                  setMobileMenuOpen(false);
                }}
                className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer"
              >
                Settings →
              </button>
            </div>
          )}

        </div>
      )}

    </header>
  );
};
