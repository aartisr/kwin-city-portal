import type { NavGroup } from '@/components/header/types';

export const NAV_TONES = {
  active: 'text-[#8A5400] font-bold bg-amber-50 ring-1 ring-amber-200',
  idleScrolled: 'text-slate-800 hover:text-slate-950 font-medium',
  idleTop: 'text-slate-800 hover:text-slate-950 font-medium',
  dropdownActive: 'text-[#A96A00]',
  dropdownIdle: 'text-slate-900',
} as const;

export const HIGH_LEVEL_MENUS: NavGroup[] = [
  {
    key: 'discover',
    label: 'Discover',
    items: [
      { label: 'About KWIN', href: '/about', desc: 'Mission, pillars, and framework' },
      { label: 'Why North Bengaluru', href: '/why-north-bengaluru', desc: 'Regional strategic case' },
      { label: 'Timeline', href: '/timeline', desc: 'Phase-wise development roadmap' },
      { label: 'Updates', href: '/updates', icon: '📡', desc: 'Milestones & announcements' },
      { label: 'FAQ', href: '/faq', icon: '❓', desc: 'Questions answered - for every audience' },
    ],
  },
  {
    key: 'ecosystem',
    label: 'Ecosystem',
    items: [
      { label: 'Sectors', href: '/sectors', desc: 'Industry depth and opportunities' },
      { label: 'Sustainability', href: '/sustainability', desc: 'Climate and resilience lens' },
    ],
  },
  {
    key: 'research',
    label: 'Research',
    items: [
      { label: 'Data Insights', href: '/data-insights', desc: 'Live evidence dashboards' },
      { label: 'Evidence Vault', href: '/evidence', desc: 'What each dataset can prove' },
      { label: 'Analytics Dashboard', href: '/analytics', icon: '📊', desc: 'On-device page tracking insights' },
      { label: 'Sources & Claims', href: '/sources', desc: 'Full claim-to-source ledger' },
      { label: 'Document Downloads', href: '/downloads', icon: '📥', desc: 'Reports, briefs & open datasets' },
    ],
  },
  {
    key: 'intelligence',
    label: 'Intelligence',
    items: [
      { label: 'News Intelligence', href: '/news-intelligence', desc: 'Attribution-first media observatory' },
      { label: 'Live News Reader', href: '/news-reader', desc: 'On-demand OPML summary reader' },
      { label: 'Share Kit', href: '/share', icon: '↗', desc: '60-second brief and launch assets' },
      { label: 'Community Discussion', href: '/community', icon: '💬', desc: 'Open stakeholder threads and replies' },
      { label: 'Trust Center', href: '/trust', desc: 'Authenticity and originality protocol' },
      { label: 'Get the App', href: '/download', icon: '📱', desc: 'Install on Android & iOS - free' },
    ],
  },
  {
    key: 'audiences',
    label: 'Audiences',
    items: [
      { label: 'Account & Preferences', href: '/account', icon: '👤', desc: 'Sign in and save your interests' },
      { label: 'Investor', href: '/for/investor', icon: '📈', desc: 'Opportunity & risk briefing' },
      { label: 'Resident', href: '/for/resident', icon: '🏡', desc: 'Livability & community' },
      { label: 'Researcher', href: '/for/researcher', icon: '🔬', desc: 'Data & methodology' },
      { label: 'Journalist', href: '/for/journalist', icon: '📰', desc: 'Verified story angles' },
      { label: 'Curious Citizen', href: '/for/curious-citizens', icon: '🌏', desc: 'Plain-language explainer' },
      { label: 'All Audience Hubs', href: '/for', desc: 'Browse all persona pathways' },
    ],
  },
];
