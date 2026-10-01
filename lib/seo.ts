// Server-side SEO helpers: per-page metadata (canonical + hreflang + Open Graph)
// and schema.org structured data for the local business.
import type { Metadata } from "next";
import { getDictionary } from "./dictionaries";
import { CONTACT, SITE_URL, languageAlternates, localizePath, locales, type Lang } from "./locales";

export const BRAND = "Luis Carrasco Films";

export const OG_LOCALE: Record<Lang, string> = { en: "en_US", es: "es_ES", de: "de_CH" };

const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Luis Carrasco Films — Cinematographer & Director, St. Gallen, Switzerland",
};

export type PageKey = "home" | "work" | "vision" | "contact";

export function pageMetadata(lang: Lang, page: PageKey, path: string): Metadata {
  const s = getDictionary(lang).seo[page];
  const url = `${SITE_URL}${localizePath(path, lang)}`;
  const fullTitle = page === "home" ? s.title : `${s.title} | ${BRAND}`;
  return {
    title: page === "home" ? { absolute: s.title } : s.title,
    description: s.description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      url,
      siteName: BRAND,
      title: fullTitle,
      description: s.description,
      locale: OG_LOCALE[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: s.description,
      images: [OG_IMAGE.url],
    },
  };
}

export function siteMetadata(lang: Lang): Metadata {
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.seo.home.title, template: `%s | ${BRAND}` },
    description: t.seo.siteDescription,
    applicationName: BRAND,
    authors: [{ name: "Luis Carrasco", url: SITE_URL }],
    creator: "Luis Carrasco",
    keywords: t.seo.keywords,
    formatDetection: { telephone: true, email: true },
    openGraph: {
      type: "website",
      siteName: BRAND,
      locale: OG_LOCALE[lang],
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
    // Regional signals for local search (St. Gallen, Switzerland).
    other: {
      "geo.region": "CH-SG",
      "geo.placename": "St. Gallen",
      "geo.position": `${CONTACT.geo.lat};${CONTACT.geo.lng}`,
      ICBM: `${CONTACT.geo.lat}, ${CONTACT.geo.lng}`,
    },
  };
}

/** schema.org graph: the business (local service), its founder and the website. */
export function businessJsonLd(lang: Lang) {
  const t = getDictionary(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: BRAND,
        url: `${SITE_URL}/`,
        description: t.seo.siteDescription,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        logo: `${SITE_URL}/icon.svg`,
        telephone: CONTACT.phoneHref.replace("tel:", ""),
        email: CONTACT.email,
        address: {
          "@type": "PostalAddress",
          addressLocality: "St. Gallen",
          postalCode: "9000",
          addressRegion: "SG",
          addressCountry: "CH",
        },
        geo: { "@type": "GeoCoordinates", latitude: CONTACT.geo.lat, longitude: CONTACT.geo.lng },
        areaServed: [
          { "@type": "City", name: "St. Gallen" },
          { "@type": "City", name: "Zürich" },
          { "@type": "City", name: "Winterthur" },
          { "@type": "AdministrativeArea", name: "Eastern Switzerland" },
          { "@type": "Country", name: "Switzerland" },
          { "@type": "Country", name: "Liechtenstein" },
          { "@type": "Place", name: "Europe" },
        ],
        knowsLanguage: ["de", "en", "es"],
        knowsAbout: [
          "Video production",
          "Cinematography",
          "Brand films",
          "Corporate video",
          "Commercials",
          "Tourism films",
          "Event and festival videos",
          "Drone filming",
          "Color grading",
        ],
        sameAs: [CONTACT.instagram, CONTACT.behance],
        founder: { "@id": `${SITE_URL}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Luis Carrasco",
        jobTitle: "Cinematographer & Director",
        url: SITE_URL,
        image: `${SITE_URL}${OG_IMAGE.url}`,
        worksFor: { "@id": `${SITE_URL}/#business` },
        sameAs: [CONTACT.instagram, CONTACT.behance],
        workLocation: { "@type": "Place", name: "St. Gallen, Switzerland" },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BRAND,
        inLanguage: lang === "de" ? "de-CH" : lang,
        publisher: { "@id": `${SITE_URL}/#business` },
      },
    ],
  };
}

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
