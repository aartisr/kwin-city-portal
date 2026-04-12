import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useHeaderSession } from '@/components/header/useHeaderSession';

afterEach(() => {
  vi.restoreAllMocks();
});

describe('header/useHeaderSession', () => {
  it('returns null when session endpoint is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network down'));

    const { result } = renderHook(() => useHeaderSession());

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });

  it('sets user when auth endpoint returns a valid user payload', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        user: {
          id: 'u-1',
          name: 'Aarti',
          email: 'aarti@example.com',
        },
      }),
    } as Response);

    const { result } = renderHook(() => useHeaderSession());

    await waitFor(() => {
      expect(result.current).toEqual({
        id: 'u-1',
        name: 'Aarti',
        email: 'aarti@example.com',
      });
    });
  });

  it('keeps null when endpoint responds without ok status', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    } as Response);

    const { result } = renderHook(() => useHeaderSession());

    await waitFor(() => {
      expect(result.current).toBeNull();
    });
  });
});
