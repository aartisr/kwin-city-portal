declare module '@playwright/test' {
  export const test: any;
  export const expect: any;
  export type Page = any;
}

declare module '@axe-core/playwright' {
  export function injectAxe(page: any): Promise<void>;
  export function checkA11y(page: any, context?: any, options?: any): Promise<void>;
}
