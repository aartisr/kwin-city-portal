import { useEffect, useState } from 'react';
import type { AuthUser } from '@/components/header/types';

export function useHeaderSession(): AuthUser | null {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadSession = async () => {
      try {
        const res = await fetch('/api/auth/me', {
          method: 'GET',
          credentials: 'include',
          cache: 'no-store',
          signal: controller.signal,
        });
        if (!res.ok) return;

        const data = (await res.json()) as { user?: AuthUser | null };
        setCurrentUser(data.user ?? null);
      } catch {
        // Silent fail: header should remain usable when auth endpoint is unavailable.
      }
    };

    loadSession();
    return () => controller.abort();
  }, []);

  return currentUser;
}
