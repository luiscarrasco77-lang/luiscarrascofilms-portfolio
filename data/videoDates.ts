// Date each video was first published on this site (taken from git history).
// Used as schema.org VideoObject `uploadDate` for video search results.
// Keyed by video src, or by project id for external embeds.
export const SITE_LAUNCH = "2026-04-16";

export const videoPublished: Record<string, string> = {
  "/videos/hsg-entrepreneurship.mp4": "2026-07-15",
  "/videos/hsg-reel.mp4": "2026-07-15",
  "/videos/ormond-v2.mp4": "2026-04-18",
  "/videos/prince-university.mp4": "2026-05-18",
  "/videos/reel-apagon-v2.mp4": "2026-05-18",
  "/videos/brand-swiss.mp4": "2026-10-01",
  "commercial-toyota": "2026-07-21",
};

export function publishedDate(key: { id: string; src: string }): string {
  return videoPublished[key.src] ?? videoPublished[key.id] ?? SITE_LAUNCH;
}
