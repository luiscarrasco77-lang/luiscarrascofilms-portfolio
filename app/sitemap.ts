import type { MetadataRoute } from "next";

const BASE_URL = "https://luiscarrascofilms.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/vision", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: route === "" || route === "/work" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
