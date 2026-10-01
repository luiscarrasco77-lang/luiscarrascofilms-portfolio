"use client";

import Link from "next/link";
import { canonicalVideoId, type ProjectMedia } from "@/data/projects";
import { useI18n } from "@/lib/i18n";

// Invisible full-card link to a video's own page. Crawlers (and cmd/middle-click)
// get a real URL; a plain click opens the in-page player instead.
export default function WatchLink({
  project,
  onOpen,
}: {
  project: ProjectMedia;
  onOpen: () => void;
}) {
  const { href } = useI18n();
  return (
    <Link
      href={href(`/watch/${canonicalVideoId(project)}`)}
      prefetch={false}
      scroll={false}
      aria-label={project.title}
      className="absolute inset-0 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-white/70"
      style={{ zIndex: 5 }}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        onOpen();
      }}
    />
  );
}
