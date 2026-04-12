import type { NavGroup } from '@/components/header/types';

export const NAV_TONES = {
  active: 'text-[#A96A00] font-extrabold bg-amber-50/95 ring-1 ring-amber-200',
  idleScrolled: 'text-gray-600 hover:text-gray-900 font-semibold',
  idleTop: 'text-slate-700 hover:text-slate-900 font-semibold',
  dropdownActive: 'text-[#A96A00]',
  dropdownIdle: 'text-gray-800',
} as const;

export const HIGH_LEVEL_MENUS: NavGroup[] = [
  {
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
    label: 'Ecosystem',
    items: [
      { label: 'Sectors', href: '/sectors', desc: 'Industry depth and opportunities' },
      { label: 'Sustainability', href: '/sustainability', desc: 'Climate and resilience lens' },
    ],
  },
  {
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
    label: 'Intelligence',
    items: [
      { label: 'News Intelligence', href: '/news-intelligence', desc: 'Attribution-first media observatory' },
      { label: 'Live News Reader', href: '/news-reader', desc: 'On-demand OPML summary reader' },
      { label: 'Community Discussion', href: '/community', icon: '💬', desc: 'Open stakeholder threads and replies' },
      { label: 'Trust Center', href: '/trust', desc: 'Authenticity and originality protocol' },
      { label: 'Get the App', href: '/download', icon: '📱', desc: 'Install on Android & iOS - free' },
    ],
  },
  {
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
