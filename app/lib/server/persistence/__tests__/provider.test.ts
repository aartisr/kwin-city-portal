import { afterEach, describe, expect, it, vi } from "vitest";

const originalEnvironment = { ...process.env };

afterEach(() => {
  vi.unstubAllEnvs();
  process.env = { ...originalEnvironment };
});

describe("persistence provider selection", () => {
  it("uses the file provider by default", async () => {
    delete process.env.KWIN_PERSISTENCE_PROVIDER;
    delete process.env.KWIN_SUPABASE_URL;
    delete process.env.KWIN_SUPABASE_ANON_KEY;
    delete process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY;
    const { configuredPersistenceProvider, getPersistenceHealth } =
      await import("../index");

    expect(configuredPersistenceProvider()).toBe("file");
    expect(getPersistenceHealth()).toMatchObject({
      provider: "file",
      available: true,
    });
  });

  it("uses Supabase when explicitly configured with server credentials", async () => {
    process.env.KWIN_PERSISTENCE_PROVIDER = "supabase";
    process.env.KWIN_SUPABASE_URL = "https://example.supabase.co";
    process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY = "test-service-role";
    const { configuredPersistenceProvider, getPersistenceHealth } =
      await import("../index");

    expect(configuredPersistenceProvider()).toBe("supabase");
    expect(getPersistenceHealth()).toMatchObject({
      provider: "supabase",
      available: true,
      durable: true,
    });
  });
});
