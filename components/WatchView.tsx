"use client";

import Link from "next/link";
import FadeImage from "@/components/FadeImage";
import { useI18n } from "@/lib/i18n";
import { canonicalVideoId, type ProjectMedia } from "@/data/projects";

export default function WatchView({ v, related = [] }: { v: ProjectMedia; related?: ProjectMedia[] }) {
  const { t, href } = useI18n();
  const isPortrait = v.aspect === "portrait";

  return (
    <section className="min-h-screen bg-background px-4 md:px-8 pt-24 md:pt-28 pb-20">
      <div className="max-w-6xl mx-auto">
        <Link
          href={href("/work")}
          className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/40 hover:text-white transition-colors duration-300 mb-8"
        >
          <svg
            className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          {t.watch.back}
        </Link>

        <div className={`mx-auto ${isPortrait ? "max-w-[440px]" : "max-w-5xl"}`}>
          {v.embedUrl ? (
            <div className="relative w-full aspect-video bg-black">
              <iframe
                src={v.embedUrl}
                title={v.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; clipboard-write; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <video
              controls
              autoPlay
              playsInline
              poster={v.poster || undefined}
              className="w-full max-h-[80vh] bg-black"
            >
              <source src={v.src} type="video/mp4" />
            </video>
          )}

          <div className="mt-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/50 mb-3">
              {t.gallery.categories[v.category]}
            </p>
            <h1 className="text-2xl md:text-3xl font-extralight tracking-tight">{v.title}</h1>
            {v.description && (
              <p className="text-sm text-muted mt-3 max-w-xl leading-relaxed">
                {t.descriptions[v.description] ?? v.description}
              </p>
            )}

            <Link
              href={href("/work")}
              className="group inline-flex items-center gap-2 mt-8 text-[11px] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
            >
              {t.watch.exploreMore}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-20 md:mt-28">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-8">
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              {t.watch.moreFilms}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {related.map((r) => (
                <Link key={r.id} href={href(`/watch/${canonicalVideoId(r)}`)} className="group block" data-cursor="play">
                  <div className="relative aspect-video overflow-hidden rounded-lg md:rounded-xl bg-surface">
                    <FadeImage
                      src={r.poster}
                      alt={r.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-3 text-sm font-light text-white/90 group-hover:text-white transition-colors">{r.title}</p>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40 mt-1">{t.gallery.categories[r.category]}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
