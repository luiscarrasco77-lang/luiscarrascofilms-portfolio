// Locale config shared by the proxy, server components and client components.
// Kept tiny on purpose: the dictionaries live in lib/dictionaries.ts (server).

export const locales = ["en", "es", "de"] as const;
export type Lang = (typeof locales)[number];
export const defaultLocale: Lang = "en";

export const SITE_URL = "https://luiscarrascofilms.com";

export function hasLocale(value: string): value is Lang {
  return (locales as readonly string[]).includes(value);
}

/** "/work" → "/work" (en), "/de/work" (de), "/es/work" (es). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

/** "/de/work" → { lang: "de", path: "/work" }; "/work" → { lang: "en", path: "/work" }. */
export function splitLocale(pathname: string): { lang: Lang; path: string } {
  const seg = pathname.split("/")[1] ?? "";
  if (hasLocale(seg) && seg !== defaultLocale) {
    const rest = pathname.slice(seg.length + 1);
    return { lang: seg, path: rest === "" ? "/" : rest };
  }
  if (seg === defaultLocale) {
    const rest = pathname.slice(seg.length + 1);
    return { lang: defaultLocale, path: rest === "" ? "/" : rest };
  }
  return { lang: defaultLocale, path: pathname || "/" };
}

/** hreflang map for a bare path (used by page metadata + sitemap). */
export function languageAlternates(path: string): Record<string, string> {
  return {
    en: `${SITE_URL}${localizePath(path, "en")}`,
    es: `${SITE_URL}${localizePath(path, "es")}`,
    de: `${SITE_URL}${localizePath(path, "de")}`,
    "de-CH": `${SITE_URL}${localizePath(path, "de")}`,
    "x-default": `${SITE_URL}${localizePath(path, "en")}`,
  };
}

// Business details (single source of truth for UI + structured data).
export const CONTACT = {
  email: "contact@luiscarrascofilms.com",
  phoneDisplay: "+41 76 288 16 35",
  phoneHref: "tel:+41762881635",
  whatsappHref: "https://wa.me/41762881635",
  instagram: "https://www.instagram.com/carrascoluis_/",
  behance: "https://www.behance.net/luiscarrasco07",
  city: "St. Gallen",
  country: "Switzerland",
  geo: { lat: 47.4245, lng: 9.3767 },
} as const;
