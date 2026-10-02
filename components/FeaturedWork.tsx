"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { featuredProjects, photoHighlights, type ProjectMedia } from "@/data/projects";
import { useRef, useState, useCallback } from "react";
import VideoModal from "@/components/VideoModal";
import WatchLink from "@/components/WatchLink";
import FadeImage from "@/components/FadeImage";
import { useI18n } from "@/lib/i18n";
import { previewSrc } from "@/lib/media";

type OpenVideo = (project: ProjectMedia) => void;

// Muted 5-second preview that plays on hover and stays invisible otherwise, so
// the sharp poster is what people see until they interact.
function useHoverPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const enter = () => {
    setHovered(true);
    videoRef.current?.play().catch(() => {});
  };
  const leave = () => {
    setHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
  };
  const videoProps = {
    ref: videoRef,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "none" as const,
    onPlaying: () => setPlaying(true),
    onPause: () => setPlaying(false),
  };
  return { hovered, playing, enter, leave, videoProps };
}

function FeaturedCard({
  project,
  isFullWidth,
  index,
  onVideoClick,
}: {
  project: ProjectMedia;
  isFullWidth?: boolean;
  index: number;
  onVideoClick: OpenVideo;
}) {
  const { t } = useI18n();
  const { hovered, playing, enter, leave, videoProps } = useHoverPreview();
  const isPortrait = project.aspect === "portrait";
  const description = project.description && (t.descriptions[project.description] ?? project.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: Math.min(index * 0.1, 0.4), ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative overflow-hidden cursor-pointer bg-surface"
      data-cursor="play"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isPortrait ? "aspect-[9/16]" : isFullWidth ? "aspect-[21/9]" : "aspect-[16/10]"
        }`}
      >
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          <FadeImage
            src={project.poster}
            alt={project.title}
            fill
            sizes={isFullWidth ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover"
          />
          <video
            {...videoProps}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
          >
            <source src={previewSrc(project.src)} type="video/mp4" />
          </video>
        </div>

        <div
          // Touch screens never hover → keep the full gradient there for legibility.
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-100 md:opacity-60"}`}
          style={{ zIndex: 3 }}
        />

        <div
          className={`absolute inset-0 flex flex-col justify-end ${isFullWidth ? "p-6 md:p-10" : "p-3 sm:p-5 md:p-7"}`}
          style={{ zIndex: 4 }}
        >
          <motion.div
            animate={hovered ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.85 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold/90 mb-1.5 truncate">
              {t.gallery.categories[project.category]}
            </p>
            <h3
              className={`font-display font-light text-white leading-[1.05] ${
                isFullWidth ? "text-3xl md:text-5xl" : "text-base sm:text-2xl md:text-3xl"
              }`}
            >
              {project.title}
            </h3>
            {description && (
              <p className={`text-xs text-white/55 mt-1.5 ${isFullWidth ? "" : "hidden sm:block"}`}>{description}</p>
            )}
          </motion.div>
        </div>

        <WatchLink project={project} onOpen={() => onVideoClick(project)} />
      </div>
    </motion.div>
  );
}

function RealEstateCard({ project, onVideoClick }: { project: ProjectMedia; onVideoClick: OpenVideo }) {
  const { t } = useI18n();
  const { hovered, playing, enter, leave, videoProps } = useHoverPreview();
  const description = project.description && (t.descriptions[project.description] ?? project.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: "-40px" }}
      className="group flex-1 min-w-0 relative overflow-hidden cursor-pointer bg-surface"
      data-cursor="play"
      onMouseEnter={enter}
      onMouseLeave={leave}
    >
      <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
        <FadeImage
          src={project.poster}
          alt={project.title}
          fill
          sizes="(min-width: 768px) 68vw, 100vw"
          className="object-cover"
        />
        <video
          {...videoProps}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
        >
          <source src={previewSrc(project.src)} type="video/mp4" />
        </video>
      </div>
      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-100 md:opacity-60"}`} />
      <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-5 md:p-7">
        <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-gold/90 mb-1.5 truncate">
          {t.gallery.categories[project.category]}
        </p>
        <h3 className="font-display text-base sm:text-2xl md:text-3xl font-light text-white leading-[1.05]">{project.title}</h3>
        {description && <p className="hidden sm:block text-xs text-white/55 mt-1.5">{description}</p>}
      </div>
      <WatchLink project={project} onOpen={() => onVideoClick(project)} />
    </motion.div>
  );
}

function PhotoStrip() {
  return (
    /* All 4 photos forced to portrait aspect — same height, zero black gaps */
    <div className="grid grid-cols-4 gap-2 md:gap-3">
      {photoHighlights.map((photo, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="relative overflow-hidden aspect-[3/4] bg-surface"
        >
          <FadeImage
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 768px) 25vw, 50vw"
            className="object-cover hover:scale-[1.04] transition-transform duration-[1.2s]"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function FeaturedWork() {
  const { t, href } = useI18n();
  const [modal, setModal] = useState<ProjectMedia | null>(null);
  const handleVideoClick = useCallback((project: ProjectMedia) => setModal(project), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      {modal && (
        <VideoModal shareId={modal.id} src={modal.src} title={modal.title} poster={modal.poster} onClose={closeModal} />
      )}

      <section className="pt-12 md:pt-16 pb-20 md:pb-28 bg-background">
        <div className="w-full">
          {/* Header */}
          <div className="flex items-end justify-between gap-6 mb-12 md:mb-16 px-5 md:px-10 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-4">
                <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
                {t.featured.eyebrow}
              </p>
              <h2 className="font-display text-4xl md:text-6xl font-light leading-none">{t.featured.title}</h2>
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
                <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                  {t.featured.viewAll}
                </span>
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </div>

          {/*
            Layout strategy: flex-col stack, no CSS grid rows.
            Each section stacks independently — zero row-height mismatch.
            The 4 remaining featured cards use two independent flex columns (masonry):
            each column grows to its own natural height, no black gaps possible.
          */}
          <div className="flex flex-col gap-2 md:gap-3">
            {/* Full-width hero video */}
            <FeaturedCard project={featuredProjects[0]} isFullWidth index={0} onVideoClick={handleVideoClick} />

            {/* Photo strip — all portrait, uniform height */}
            <PhotoStrip />

            {/* Real Estate portrait + Real Estate Horizontal (fills height) */}
            <div className="flex gap-2 md:gap-3 items-stretch">
              <div className="w-[32%] min-w-0 flex-shrink-0">
                <FeaturedCard project={featuredProjects[7]} index={7} onVideoClick={handleVideoClick} />
              </div>
              <RealEstateCard project={featuredProjects[8]} onVideoClick={handleVideoClick} />
            </div>

            {/* Two independent flex columns — Lifestyle + Nayarit + Ski + Airelles */}
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 flex flex-col gap-2 md:gap-3">
                <FeaturedCard project={featuredProjects[1]} index={1} onVideoClick={handleVideoClick} />
                <FeaturedCard project={featuredProjects[3]} index={3} onVideoClick={handleVideoClick} />
              </div>
              <div className="flex-1 flex flex-col gap-2 md:gap-3">
                <FeaturedCard project={featuredProjects[2]} index={2} onVideoClick={handleVideoClick} />
                <FeaturedCard project={featuredProjects[4]} index={4} onVideoClick={handleVideoClick} />
              </div>
            </div>

            {/* Capriati | Madrid photo | Mestiza */}
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 min-w-0">
                <FeaturedCard project={featuredProjects[5]} index={5} onVideoClick={handleVideoClick} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="relative flex-1 min-w-0 overflow-hidden aspect-[9/16] bg-surface"
              >
                <FadeImage
                  src="/projects/fotosciudad/DSC00202.jpg"
                  alt="Madrid nights"
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover hover:scale-[1.04] transition-transform duration-[1.2s]"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <FeaturedCard project={featuredProjects[6]} index={6} onVideoClick={handleVideoClick} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
