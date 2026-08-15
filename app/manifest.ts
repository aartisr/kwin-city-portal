import type { MetadataRoute } from "next";
import { PWA_CONFIG } from "@/lib/pwa/config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PWA_CONFIG.name,
    short_name: PWA_CONFIG.shortName,
    description: PWA_CONFIG.description,
    start_url: PWA_CONFIG.startUrl,
    scope: PWA_CONFIG.scope,
    id: "/",
    display: "standalone",
    background_color: PWA_CONFIG.backgroundColor,
    theme_color: PWA_CONFIG.themeColor,
    categories: ["news", "government", "productivity"],
    lang: "en-IN",
    dir: "ltr",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: PWA_CONFIG.shortcuts.map((shortcut) => ({
      name: shortcut.name,
      short_name: shortcut.shortName,
      url: shortcut.url,
      description: shortcut.description,
    })),
    screenshots: [
      {
        src: "/opengraph-image",
        sizes: "1200x630",
        type: "image/png",
        label: "KWIN City Portal home screen",
        form_factor: "wide",
      },
    ],
    prefer_related_applications: false,
  };
}
