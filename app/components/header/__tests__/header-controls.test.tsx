// @vitest-environment node
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = (file: string) => readFileSync(resolve(process.cwd(), 'app/components/header', file), 'utf8');

describe('header responsive-control contracts', () => {
  it('keeps Search, Trust, and Menu in the laptop utility set', () => {
    const utilities = source('HeaderUtilities.tsx');

    expect(utilities).toContain('data-testid="desktop-header-utilities" className="hidden shrink-0 items-center justify-end gap-2 lg:flex"');
    expect(utilities).toContain('data-testid="desktop-header-search"');
    expect(utilities).toContain('data-testid="desktop-header-trust"');
    expect(utilities).toContain('data-testid="desktop-header-menu"');
    expect(utilities).toContain('xl:inline-flex');
    expect(utilities).toContain('2xl:inline-flex');
  });

  it('keeps compact controls below the laptop breakpoint, with Trust deferred only on very narrow phones', () => {
    const mobileActions = source('MobileHeaderActions.tsx');

    expect(mobileActions).toContain('data-testid="mobile-header-actions" className="flex items-center gap-2 justify-end lg:hidden"');
    expect(mobileActions).toContain('data-testid="mobile-header-search"');
    expect(mobileActions).toContain('data-testid="mobile-header-trust"');
    expect(mobileActions).toContain('data-testid="mobile-header-menu"');
    expect(mobileActions).toContain('hidden h-10 w-10 items-center justify-center rounded-2xl border transition-all duration-200 min-[381px]:flex');
  });

  it('does not hide the shared Menu sheet at laptop widths', () => {
    const menuSheet = source('MobileMenuSheet.tsx');

    expect(menuSheet).toContain('data-testid="header-menu-sheet"');
    expect(menuSheet).not.toMatch(/data-testid="header-menu-sheet"[^>]*lg:hidden/);
  });
});
