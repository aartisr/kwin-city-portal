/**
 * Accessibility Utilities
 * Common ARIA patterns and helpers for accessible components
 */

export const a11y = {
  /**
   * Generate aria attributes for a disclosure button (menu, accordion, dropdown)
   */
  disclosure: (isOpen: boolean, menuId?: string) => ({
    'aria-expanded': isOpen,
    'aria-haspopup': 'true' as const,
    ...(menuId && { 'aria-controls': menuId }),
  }),

  /**
   * Generate aria attributes for a menu
   */
  menu: (id: string, label: string) => ({
    role: 'menu',
    id,
    'aria-label': label,
  }),

  /**
   * Generate aria attributes for a menu item
   */
  menuItem: (_href: string, current?: boolean) => ({
    role: 'menuitem',
    ...(current && { 'aria-current': 'page' }),
  }),

  /**
   * Generate aria attributes for a button that opens a modal/dialog
   */
  modalButton: (dialogId: string, label?: string) => ({
    'aria-haspopup': 'dialog',
    'aria-controls': dialogId,
    ...(label && { 'aria-label': label }),
  }),

  /**
   * Generate aria attributes for a tab button
   */
  tab: (active: boolean, panelId: string, tabId: string) => ({
    role: 'tab',
    'aria-selected': active,
    'aria-controls': panelId,
    id: tabId,
    tabIndex: active ? 0 : -1,
  }),

  /**
   * Generate aria attributes for a tab panel
   */
  tabPanel: (id: string, tabId: string) => ({
    role: 'tabpanel',
    id,
    'aria-labelledby': tabId,
  }),

  /**
   * Generate aria attributes for loading state
   */
  loading: (isLoading: boolean) => ({
    'aria-busy': isLoading,
    'aria-live': 'polite' as const,
  }),

  /**
   * Generate aria attributes for status message (success, error, info)
   */
  status: (type: 'success' | 'error' | 'info' = 'info') => ({
    role: 'status',
    'aria-live': type === 'error' ? ('assertive' as const) : ('polite' as const),
    'aria-atomic': true,
  }),

  /**
   * Generate aria attributes for form error
   */
  error: (errorId: string, hasError: boolean) => ({
    'aria-invalid': hasError,
    ...(hasError && { 'aria-describedby': errorId }),
  }),

  /**
   * Generate aria attributes for visually hidden skip link
   */
  skipLink: {
    className: 'sr-only focus:not-sr-only',
    style: {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: 0,
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      borderWidth: 0,
    },
    // On focus, make it visible
    onFocus: (e: React.FocusEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.clip = 'auto';
      e.currentTarget.style.width = 'auto';
      e.currentTarget.style.height = 'auto';
    },
    onBlur: (e: React.FocusEvent<HTMLAnchorElement>) => {
      e.currentTarget.style.clip = 'rect(0, 0, 0, 0)';
      e.currentTarget.style.width = '1px';
      e.currentTarget.style.height = '1px';
    },
  },
};

/**
 * Common focus styles for use in Tailwind
 */
export const focusStyles = {
  outline: 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500',
  ring: 'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
  shadow: 'focus-visible:shadow-[0_0_0_3px_rgba(59,130,246,0.5)]',
};

/**
 * Ensure keyboard accessibility for custom buttons
 */
export const useKeyboardButton = (
  onActivate: () => void,
  keys: string[] = ['Enter', ' ']
) => {
  return {
    onKeyDown: (e: React.KeyboardEvent) => {
      if (keys.includes(e.key)) {
        e.preventDefault();
        onActivate();
      }
    },
  };
};

/**
 * Check if element is visible to screen readers
 */
export const isVisuallyHidden = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  return (
    style.display === 'none' ||
    style.visibility === 'hidden' ||
    style.opacity === '0' ||
    element.getAttribute('aria-hidden') === 'true'
  );
};

/**
 * Announce message to screen readers
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.style.position = 'absolute';
  announcement.style.left = '-10000px';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Remove after message is read
  setTimeout(() => announcement.remove(), 3000);
};

/**
 * Generate unique IDs for ARIA relationships
 */
export const useAria = () => {
  const generateId = (prefix: string) =>
    `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

  return { generateId };
};
