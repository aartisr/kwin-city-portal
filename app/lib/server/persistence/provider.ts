import type {
  PersistenceHealth,
  PersistenceProvider,
  PersistenceProviderId,
} from "./contracts";

const FILE_PROVIDER: PersistenceProvider = {
  id: "file",
  health: () => ({
    provider: "file",
    available: true,
    durable: process.env.NODE_ENV !== "production",
    detail: "Local JSON fallback; not durable on serverless deployments.",
  }),
};

export function configuredPersistenceProvider(): PersistenceProviderId {
  const configured =
    process.env.KWIN_PERSISTENCE_PROVIDER?.trim().toLowerCase();
  if (configured === "supabase") return "supabase";
  if (configured === "file") return "file";

  // Preserve the existing zero-config behavior: credentials select Supabase
  // unless an operator explicitly requests the file provider.
  if (
    process.env.KWIN_SUPABASE_URL &&
    (process.env.KWIN_SUPABASE_ANON_KEY ||
      process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY)
  ) {
    return "supabase";
  }
  return "file";
}

export function getPersistenceHealth(): PersistenceHealth {
  if (configuredPersistenceProvider() === "supabase") {
    const available = Boolean(
      process.env.KWIN_SUPABASE_URL &&
      process.env.KWIN_SUPABASE_SERVICE_ROLE_KEY,
    );
    return {
      provider: "supabase",
      available,
      durable: available,
      detail: available
        ? undefined
        : "Supabase requires KWIN_SUPABASE_URL and KWIN_SUPABASE_SERVICE_ROLE_KEY.",
    };
  }

  return FILE_PROVIDER.health();
}
