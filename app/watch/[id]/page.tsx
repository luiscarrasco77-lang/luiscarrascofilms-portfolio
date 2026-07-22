import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects, featuredProjects, type ProjectMedia } from "@/data/projects";
import WatchView from "@/components/WatchView";

// Every shareable video (self-hosted or external embed), from both the homepage
// reel and the Work gallery.
const videoPool: ProjectMedia[] = [...featuredProjects, ...allProjects].filter(
  (p) => p.type === "video" || p.type === "embed"
);

function findVideo(id: string) {
  return videoPool.find((p) => p.id === id);
}

export function generateStaticParams() {
  const ids = new Set(videoPool.map((p) => p.id));
  return [...ids].map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const v = findVideo(id);
  if (!v) return { title: "Video" };
  return {
    title: v.title,
    description: v.description ?? `${v.title} — Luis Carrasco Films`,
    openGraph: {
      title: `${v.title} — Luis Carrasco Films`,
      description: v.description ?? undefined,
      images: v.poster ? [{ url: v.poster }] : undefined,
      type: "video.other",
    },
  };
}

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const v = findVideo(id);
  if (!v) notFound();

  return <WatchView v={v} />;
}
