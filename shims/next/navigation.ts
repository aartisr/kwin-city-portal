export function useRouter() {
  return {
    push: () => {},
    replace: () => {},
    back: () => {},
    forward: () => {},
    refresh: () => {},
    prefetch: () => {},
  };
}

export function usePathname() {
  return '/';
}

export function useSearchParams() {
  return new URLSearchParams();
}

export function notFound() {
  const error = new Error('NEXT_NOT_FOUND');
  (error as any).digest = 'NEXT_NOT_FOUND';
  throw error;
}

export function redirect(url: string) {
  const error = new Error(`NEXT_REDIRECT: ${url}`);
  (error as any).digest = `NEXT_REDIRECT;${url}`;
  throw error;
}
