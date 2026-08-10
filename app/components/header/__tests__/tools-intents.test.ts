import { describe, expect, it } from 'vitest';
import { getToolIntentSections, getToolQuickActions } from '@/components/header/tools-intents';
import type { NavItem } from '@/components/header/types';

describe('header/tools-intents', () => {
  it('maps intent sections from matching nav items and drops empty sections', () => {
    const navItems: NavItem[] = [
      { label: 'Risk Check', href: '/tools/risk-check', icon: '🛡️' },
      { label: 'Accessibility', href: '/tools/accessibility', icon: '🛣️' },
      { label: 'Regulatory Navigator', href: '/tools/regulatory-navigator', icon: '📜' },
      { label: 'Valuation Index', href: '/tools/valuation-index', icon: '📈' },
      { label: 'Regulatory News', href: '/updates/regulatory-news', icon: '📰' },
    ];

    const sections = getToolIntentSections(navItems);

    expect(sections.length).toBeGreaterThan(0);
    expect(sections.every((section) => section.items.length > 0)).toBe(true);

    const dueDiligence = sections.find((section) => section.key === 'due-diligence');
    expect(dueDiligence?.items.map((item) => item.href)).toEqual([
      '/tools/risk-check',
      '/tools/accessibility',
      '/tools/regulatory-navigator',
    ]);

    // Policy and Data has one matching item in this fixture and should still render.
    const policyData = sections.find((section) => section.key === 'policy-data');
    expect(policyData?.items.map((item) => item.href)).toEqual(['/updates/regulatory-news']);
  });

  it('builds quick actions with nav-driven labels/icons and sensible defaults', () => {
    const navItems: NavItem[] = [
      {
        label: 'Risk Check Pro',
        href: '/tools/risk-check',
        icon: '✅',
        desc: 'Deep risk analysis',
      },
      {
        label: 'Spatial Explorer',
        href: '/tools/spatial-explorer',
        desc: 'Map-driven exploration',
      },
    ];

    const actions = getToolQuickActions(navItems);

    const riskAction = actions.find((action) => action.key === 'risk-check');
    expect(riskAction).toMatchObject({
      title: 'Risk Check Pro',
      icon: '✅',
      desc: 'Deep risk analysis',
    });

    // No icon in nav item should fall back to static quick action icon.
    const spatialAction = actions.find((action) => action.key === 'spatial-explorer');
    expect(spatialAction).toMatchObject({
      title: 'Spatial Explorer',
      icon: '🗺️',
      desc: 'Map-driven exploration',
    });

    // Missing nav item should use defaults from TOOL_QUICK_ACTIONS.
    const commandCenter = actions.find((action) => action.key === 'all-tools');
    expect(commandCenter).toMatchObject({
      title: 'Command Center',
      icon: '⚡',
      href: '/tools',
    });
  });
});
