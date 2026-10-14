import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const now = new Date();

  const routes = [
    { path: "", priority: 1 },
    { path: "sobre", priority: 0.8 },
    { path: "trajetoria", priority: 0.8 },
    { path: "projetos", priority: 0.9 },
    { path: "universo-tech", priority: 0.7 },
    { path: "alem-do-codigo", priority: 0.6 },
    { path: "contato", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: new URL(path, baseUrl).toString(),
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
