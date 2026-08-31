import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import HomeProgressiveDisclosure from '@/components/HomeProgressiveDisclosure';

vi.mock('@/lib/i18n/I18nProvider', () => ({
  useI18n: () => ({ locale: 'en' }),
}));

describe('HomeProgressiveDisclosure', () => {
  it('starts calm and exposes optional depth through one native control', () => {
    render(
      <HomeProgressiveDisclosure>
        <h2>Secondary experience</h2>
      </HomeProgressiveDisclosure>,
    );

    const control = screen.getByText('Explore the full KWIN experience').closest('summary');
    const details = screen.getByTestId('home-progressive-disclosure');
    expect(details).not.toHaveAttribute('open');
    expect(control).not.toBeNull();

    fireEvent.click(control!);
    expect(details).toHaveAttribute('open');
    expect(screen.getByRole('heading', { name: 'Secondary experience' })).toBeInTheDocument();
  });
});
