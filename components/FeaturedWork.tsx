"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { allProjects, featuredProjects, type ProjectMedia } from "@/data/projects";
import { useRef, useState, useCallback, type CSSProperties, type ReactNode } from "react";
import VideoModal from "@/components/VideoModal";
import ImageModal from "@/components/ImageModal";
import WatchLink from "@/components/WatchLink";
import FadeImage from "@/components/FadeImage";
import FilmCarousel from "@/components/FilmCarousel";
import { useI18n } from "@/lib/i18n";
import { previewSrc, useHdPreviews } from "@/lib/media";

type OpenVideo = (project: ProjectMedia) => void;
type Photo = { src: string; alt: string };

// Rows shown under the lead-film carousel, one per kind of work.
const pool = [...featuredProjects, ...allProjects];
const pick = (ids: string[]) =>
  ids.map((id) => pool.find((p) => p.id === id)).filter((p): p is ProjectMedia => Boolean(p));

const FILM_ROWS = [
  { key: "commercial", films: pick(["feat-elizabeth", "feat-mestiza", "feat-realestate-h"]) },
  { key: "travel", films: pick(["feat-nayarit", "feat-ski", "feat-sunset"]) },
  {
    key: "festivals",
    films: pick(["feat-capriati", "fest-hugel-vid", "fest-blondish-vid", "fest-shimza-vid", "fest-serge-vid"]),
  },
] as const;

const PHOTOS: Photo[] = [
  { src: "/projects/fotosnaturaleza/1 3.jpg", alt: "Desert Dunes" },
  { src: "/projects/fotosnaturaleza/DJI_20260308151945_0076_D.jpg", alt: "Alpine Summit" },
  { src: "/fotos1/DSC02353.jpg", alt: "Pizol, Alpine Lakes" },
  { src: "/projects/fotosciudad/DSC07351-Enhanced-NR 2.jpg", alt: "Westminster Night" },
  { src: "/projects/fotosciudad/DSC00202.jpg", alt: "Madrid Nights" },
];

// Card shapes: landscape films 16:10, vertical films and photos 4:5. In a row,
// each card's flex-grow equals its aspect ratio, so every card in the row ends
// up exactly the same height (a justified row) on desktop.
const LANDSCAPE = 1.6;
const PORTRAIT = 0.8;

// Muted 5-second preview (HD on desktop) that plays on hover and stays
// invisible otherwise, so the sharp poster is what people see until they interact.
function useHoverPreview(src: string) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const hd = useHdPreviews();
  const enter = () => videoRef.current?.play().catch(() => {});
  const leave = () => {
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };
  const videoProps = {
    ref: videoRef,
    src: previewSrc(src, hd),
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none" as const,
    onPlaying: () => setPlaying(true),
    onPause: () => setPlaying(false),
  };
  return { playing, enter, leave, videoProps };
}

// Mobile: fixed-height cards in a horizontal swipe row. Desktop: justified row.
const cardClass =
  "group shrink-0 snap-start w-[calc(13rem*var(--a))] md:w-auto md:min-w-0 md:basis-0 md:grow-[var(--a)]";

function FilmCard({ project, onOpen }: { project: ProjectMedia; onOpen: OpenVideo }) {
  const { t } = useI18n();
  const { playing, enter, leave, videoProps } = useHoverPreview(project.src);
  const a = project.aspect === "portrait" ? PORTRAIT : LANDSCAPE;
  const description = project.description && (t.descriptions[project.description] ?? project.description);

  return (
    <div
      className={cardClass}
      style={{ "--a": a } as CSSProperties}
      data-cursor="play"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <div className="relative overflow-hidden rounded-lg md:rounded-xl bg-surface" style={{ aspectRatio: a }}>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <FadeImage
            src={project.poster}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 30vw, 60vw"
            className="object-cover"
          />
          {project.type === "video" && (
            <video
              {...videoProps}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
            />
          )}
        </div>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/30 bg-black/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300">
          <svg className="w-3 h-3 text-white ml-0.5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <WatchLink project={project} onOpen={() => onOpen(project)} />
      </div>
      <p className="mt-3 text-sm font-light text-white/90 truncate group-hover:text-white transition-colors">
        {project.title}
      </p>
      {description && <p className="mt-0.5 text-xs text-white/45 truncate">{description}</p>}
    </div>
  );
}

function PhotoCard({ photo, onOpen }: { photo: Photo; onOpen: (photo: Photo) => void }) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      aria-label={`${t.a11y.enlarge}: ${photo.alt}`}
      data-cursor="view"
      className={`${cardClass} text-left`}
      style={{ "--a": PORTRAIT } as CSSProperties}
    >
      <span className="relative block overflow-hidden rounded-lg md:rounded-xl bg-surface" style={{ aspectRatio: PORTRAIT }}>
        <FadeImage
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 768px) 20vw, 40vw"
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
      </span>
      <span className="mt-3 block text-sm font-light text-white/90 truncate group-hover:text-white transition-colors">
        {photo.alt}
      </span>
    </button>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div className="flex items-center gap-5 mb-4 md:mb-5">
        <h3 className="text-lg md:text-xl font-extralight tracking-tight whitespace-nowrap">{label}</h3>
        <span aria-hidden="true" className="h-px flex-1 bg-white/10" />
      </div>
      <div className="flex gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory -mx-5 px-5 scroll-px-5 md:mx-0 md:px-0 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {children}
      </div>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const { t, href } = useI18n();
  const [modal, setModal] = useState<ProjectMedia | null>(null);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const handleVideoClick = useCallback((project: ProjectMedia) => setModal(project), []);
  const closeModal = useCallback(() => setModal(null), []);
  const closePhoto = useCallback(() => setPhoto(null), []);

  return (
    <>
      {modal && (
        <VideoModal
          shareId={modal.id}
          src={modal.src}
          title={modal.title}
          poster={modal.poster}
          embedUrl={modal.embedUrl}
          onClose={closeModal}
        />
      )}
      {photo && <ImageModal src={photo.src} alt={photo.alt} onClose={closePhoto} />}

      <section className="pt-10 md:pt-14 pb-20 md:pb-28 bg-background">
        {/* Header */}
        <div className="flex flex-col items-start gap-5 md:flex-row md:items-end md:justify-between md:gap-6 mb-8 md:mb-12 px-5 md:px-10 max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-4">
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              {t.featured.eyebrow}
            </p>
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">{t.featured.title}</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="shrink-0"
          >
            <Link
              href={href("/work")}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/50 hover:text-white transition-colors duration-300"
            >
              <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-white/60 after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                {t.featured.viewAll}
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Lead films carousel (Pizol, HSG, Stetson, Toyota, Costa Rica), full bleed */}
        <FilmCarousel onOpen={handleVideoClick} />

        {/* The rest of the work, organised by kind */}
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 mt-16 md:mt-24 space-y-14 md:space-y-20">
          {FILM_ROWS.map((row) => (
            <Row key={row.key} label={t.gallery.categories[row.key]}>
              {row.films.map((p) => (
                <FilmCard key={p.id} project={p} onOpen={handleVideoClick} />
              ))}
            </Row>
          ))}
          <Row label={t.gallery.media.photo}>
            {PHOTOS.map((p) => (
              <PhotoCard key={p.src} photo={p} onOpen={setPhoto} />
            ))}
          </Row>
        </div>
      </section>
    </>
  );
}
