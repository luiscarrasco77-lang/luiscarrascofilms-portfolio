import type { MetadataRoute } from "next";
import { canonicalVideoId, videoPool } from "@/data/projects";
import { publishedDate } from "@/data/videoDates";
import { SITE_URL, languageAlternates, localizePath, locales } from "@/lib/locales";

// Every page in every language, each entry listing its hreflang alternates.
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: {
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly";
    lastModified?: string;
  }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/vision", priority: 0.7, changeFrequency: "monthly" },
  ];

  // One entry per film — duplicate ids canonicalize to the same watch page.
  const seen = new Set<string>();
  for (const v of videoPool) {
    const id = canonicalVideoId(v);
    if (seen.has(id)) continue;
    seen.add(id);
    pages.push({
      path: `/watch/${id}`,
      priority: 0.5,
      changeFrequency: "monthly",
      lastModified: publishedDate(v),
    });
  }

  return pages.flatMap(({ path, priority, changeFrequency, lastModified }) => {
    const languages = languageAlternates(path);
    return locales.map((lang) => ({
      url: `${SITE_URL}${localizePath(path, lang)}`,
      lastModified,
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
