// @vitest-environment node

import { afterEach, describe, expect, it, vi } from 'vitest';

const originalEnvironment = {
  provider: process.env.KWIN_PERSISTENCE_PROVIDER,
  url: process.env.KWIN_SUPABASE_URL,
  anonKey: process.env.KWIN_SUPABASE_ANON_KEY,
  serviceRoleKey: process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY,
};

function restore(name: keyof typeof originalEnvironment) {
  const value = originalEnvironment[name];
  const environmentName = {
    provider: 'KWIN_PERSISTENCE_PROVIDER',
    url: 'KWIN_SUPABASE_URL',
    anonKey: 'KWIN_SUPABASE_ANON_KEY',
    serviceRoleKey: 'KWIN_SUPABASE_SERVICE_ROLE_KEY',
  }[name];

  if (value === undefined) {
    delete process.env[environmentName];
  } else {
    process.env[environmentName] = value;
  }
}

describe('Supabase server client', () => {
  afterEach(() => {
    restore('provider');
    restore('url');
    restore('anonKey');
    restore('serviceRoleKey');
    vi.resetModules();
  });

  it('initializes the admin client with the production URL and service-role key without an anon key', async () => {
    process.env.KWIN_PERSISTENCE_PROVIDER = 'supabase';
    process.env.KWIN_SUPABASE_URL = 'https://example.supabase.co';
    process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY = 'service-role-test-key';
    delete process.env.KWIN_SUPABASE_ANON_KEY;
    vi.resetModules();

    const { getSupabaseAdmin } = await import('../supabase-client');

    expect(getSupabaseAdmin()).not.toBeNull();
  });
});
