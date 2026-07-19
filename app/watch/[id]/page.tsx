import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allProjects, featuredProjects, type ProjectMedia } from "@/data/projects";

// Every shareable video, from both the homepage reel and the Work gallery.
const videoPool: ProjectMedia[] = [...featuredProjects, ...allProjects].filter(
  (p) => p.type === "video"
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

  const isPortrait = v.aspect === "portrait";

  return (
    <section className="min-h-screen bg-background px-4 md:px-8 pt-24 md:pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-300 mb-8"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          Back to Work
        </Link>

        <div className={`mx-auto ${isPortrait ? "max-w-[440px]" : "max-w-5xl"}`}>
          <video
            controls
            autoPlay
            playsInline
            poster={v.poster || undefined}
            className="w-full max-h-[80vh] bg-black"
          >
            <source src={v.src} type="video/mp4" />
          </video>

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-2">
              {v.category}
            </p>
            <h1 className="text-2xl md:text-3xl font-extralight tracking-tight">
              {v.title}
            </h1>
            {v.description && (
              <p className="text-sm text-muted mt-3 max-w-xl leading-relaxed">
                {v.description}
              </p>
            )}

            <Link
              href="/work"
              className="group inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
            >
              Explore more work
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
