import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { canonicalVideoId, videoPool, type ProjectMedia } from "@/data/projects";
import { publishedDate } from "@/data/videoDates";
import { videoDurations } from "@/data/videoDurations";
import WatchView from "@/components/WatchView";
import { getDictionary } from "@/lib/dictionaries";
import { SITE_URL, hasLocale, languageAlternates, localizePath, type Lang } from "@/lib/locales";
import { BRAND, OG_LOCALE, jsonLdScript } from "@/lib/seo";

function findVideo(id: string) {
  return videoPool.find((p) => p.id === id);
}

// Combined with the [lang] layout's params → every video in every language.
// Duplicate ids stay reachable (links already shared), but canonicalize to one URL.
export function generateStaticParams() {
  const ids = new Set(videoPool.map((p) => p.id));
  return [...ids].map((id) => ({ id }));
}

/** Localized, unique copy for a video page: "Pizol: Imagefilm in den Schweizer Alpen". */
function videoCopy(v: ProjectMedia, lang: Lang) {
  const t = getDictionary(lang);
  const kind = t.watch.kinds[v.category];
  const detail = v.description ? (t.descriptions[v.description] ?? v.description) : kind;
  return {
    title: `${v.title}: ${detail}`,
    description: `${v.title}: ${detail}. ${t.watch.seoSuffix}`,
  };
}

export async function generateMetadata({ params }: PageProps<"/[lang]/watch/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const v = findVideo(id);
  if (!v || !hasLocale(lang)) return { title: "Video" };
  const path = `/watch/${canonicalVideoId(v)}`;
  const url = `${SITE_URL}${localizePath(path, lang)}`;
  const { title, description } = videoCopy(v, lang);
  const fullTitle = `${title} | ${BRAND}`;
  return {
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "video.other",
      url,
      siteName: BRAND,
      locale: OG_LOCALE[lang],
      title: fullTitle,
      description,
      images: v.poster ? [{ url: v.poster }] : undefined,
      videos: v.type === "video" ? [{ url: `${SITE_URL}${v.src}`, type: "video/mp4" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: v.poster ? [v.poster] : undefined,
    },
  };
}

export default async function WatchPage({ params }: PageProps<"/[lang]/watch/[id]">) {
  const { lang, id } = await params;
  const v = findVideo(id);
  if (!v || !hasLocale(lang)) notFound();

  const { title, description } = videoCopy(v, lang);
  const videoLd = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description,
    inLanguage: lang === "de" ? "de-CH" : lang,
    thumbnailUrl: v.poster ? [`${SITE_URL}${v.poster}`] : undefined,
    uploadDate: `${publishedDate(v)}T12:00:00+02:00`,
    duration: videoDurations[v.src],
    // Self-hosted files expose the file itself; external films their player URL.
    ...(v.type === "video" ? { contentUrl: `${SITE_URL}${v.src}` } : { embedUrl: v.embedUrl }),
    creator: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(videoLd) }} />
      <WatchView v={v} />
    </>
  );
}
