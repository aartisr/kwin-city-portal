'use client';

/**
 * SkipLink Component
 * Provides keyboard-only users with a way to skip directly to main content
 * Follows WCAG 2.1 best practices for navigation accessibility
 */

export function SkipLink() {
  const handleSkip = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView();
    }
  };

  return (
    <a
      href="#main-content"
      onClick={handleSkip}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-amber-600 focus:text-white focus:rounded-lg focus:font-bold focus:outline-2 focus:outline-offset-2 focus:outline-white"
    >
      Skip to main content
    </a>
  );
}
