import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = [
  "app/manifest.ts",
  "app/icon.tsx",
  "app/apple-icon.tsx",
  "app/offline/page.tsx",
  "app/lib/pwa/config.ts",
  "app/components/PwaRegistration.tsx",
  "app/components/PwaInstallPrompt.tsx",
  "public/sw.js",
];

await Promise.all(
  requiredFiles.map(async (file) => {
    try {
      await access(file, constants.R_OK);
    } catch {
      throw new Error(`PWA contract is missing required file: ${file}`);
    }
  }),
);

const [worker, manifest, layout, nextConfig] = await Promise.all([
  readFile("public/sw.js", "utf8"),
  readFile("app/manifest.ts", "utf8"),
  readFile("app/layout.tsx", "utf8"),
  readFile("next.config.js", "utf8"),
]);

const requirements = [
  [worker, "SKIP_WAITING", "controlled service-worker updates"],
  [worker, "CLEAR_RUNTIME_CACHES", "runtime cache reset support"],
  [worker, 'request.headers.get("RSC")', "RSC cache exclusion"],
  [worker, "NEVER_CACHE_PREFIXES", "private route exclusions"],
  [worker, "NETWORK_TIMEOUT_MS", "bounded navigation requests"],
  [worker, "CACHE_LIMITS", "bounded runtime caches"],
  [manifest, "PWA_CONFIG", "central manifest configuration"],
  [manifest, "maskable", "maskable application icon"],
  [layout, "/manifest.webmanifest", "manifest discovery metadata"],
  [layout, "appleWebApp", "Apple standalone metadata"],
  [nextConfig, "/sw.js", "service-worker revalidation headers"],
  [nextConfig, "Service-Worker-Allowed", "explicit service-worker scope"],
];

for (const [source, token, label] of requirements) {
  if (!source.includes(token))
    throw new Error(`PWA contract missing ${label}.`);
}

if (/caches\.keys\(\)[\s\S]*keys\.map\([^)]*caches\.delete/.test(worker)) {
  throw new Error("Service worker must not delete caches it does not own.");
}

console.log(
  `Verified PWA contract across ${requiredFiles.length} required files.`,
);
