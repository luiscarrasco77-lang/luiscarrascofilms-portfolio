"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { featuredProjects, photoHighlights } from "@/data/projects";
import { useRef, useState, useCallback } from "react";
import VideoModal from "@/components/VideoModal";

function FeaturedCard({
  project,
  isFullWidth,
  index,
  onVideoClick,
}: {
  project: (typeof featuredProjects)[0];
  isFullWidth?: boolean;
  index: number;
  onVideoClick: (src: string, title: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const isPortrait = project.aspect === "portrait";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.4) }}
      viewport={{ once: true, margin: "-40px" }}
      className="group relative overflow-hidden cursor-pointer"
      onMouseEnter={() => {
        setHovered(true);
        videoRef.current?.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
      }}
      onClick={() => onVideoClick(project.src, project.title)}
    >
      <div
        className={`relative w-full overflow-hidden ${
          isPortrait
            ? "aspect-[9/16]"
            : isFullWidth
              ? "aspect-[21/9]"
              : "aspect-[16/10]"
        }`}
      >
        {!hovered && (
          <img
            src={project.poster}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          />
        )}

        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster={project.poster}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ zIndex: 2 }}
        >
          <source src={project.src} type="video/mp4" />
        </video>

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-50"}`}
          style={{ zIndex: 3 }}
        />

        <div
          className="absolute inset-0 flex flex-col justify-end p-5 md:p-7"
          style={{ zIndex: 4 }}
        >
          <motion.div
            animate={hovered ? { y: 0, opacity: 1 } : { y: 4, opacity: 0.75 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-white/50 mb-1.5">{project.category}</p>
            <h3 className={`font-light text-white tracking-tight ${isFullWidth ? "text-2xl md:text-3xl" : "text-lg md:text-xl"}`}>
              {project.title}
            </h3>
            {project.description && (
              <p className="text-xs text-white/40 mt-1">{project.description}</p>
            )}
          </motion.div>
        </div>

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${hovered ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
          style={{ zIndex: 4 }}
        >
          <div className="w-14 h-14 rounded-full border border-white/30 bg-black/20 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      </div>
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
          transition={{ duration: 0.5, delay: i * 0.08 }}
          viewport={{ once: true }}
          className="overflow-hidden aspect-[3/4]"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function FeaturedWork() {
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);
  const handleVideoClick = useCallback((src: string, title: string) => setModal({ src, title }), []);
  const closeModal = useCallback(() => setModal(null), []);

  return (
    <>
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={closeModal} />}

      <section className="py-20 md:py-28 bg-background">
        <div className="w-full">
          {/* Header */}
          <div className="flex items-end justify-between mb-12 md:mb-16 px-5 md:px-10 max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-3">Selected Work</p>
              <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">Featured Projects</h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <Link
                href="/work"
                className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors duration-300"
              >
                View All Work
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
            <FeaturedCard
              project={featuredProjects[0]}
              isFullWidth
              index={0}
              onVideoClick={handleVideoClick}
            />

            {/* Photo strip — all portrait, uniform height */}
            <PhotoStrip />

            {/* Two independent flex columns — masonry, no row alignment */}
            <div className="flex gap-2 md:gap-3">
              {/* Left column: two landscape videos */}
              <div className="flex-1 flex flex-col gap-2 md:gap-3">
                <FeaturedCard project={featuredProjects[1]} index={1} onVideoClick={handleVideoClick} />
                <FeaturedCard project={featuredProjects[3]} index={3} onVideoClick={handleVideoClick} />
              </div>
              {/* Right column: portrait + landscape */}
              <div className="flex-1 flex flex-col gap-2 md:gap-3">
                <FeaturedCard project={featuredProjects[2]} index={2} onVideoClick={handleVideoClick} />
                <FeaturedCard project={featuredProjects[4]} index={4} onVideoClick={handleVideoClick} />
              </div>
            </div>

            {/* Portrait row 1 — Video | Photo | Video */}
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 min-w-0">
                <FeaturedCard project={featuredProjects[5]} index={5} onVideoClick={handleVideoClick} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-1 min-w-0 overflow-hidden aspect-[9/16]"
              >
                <img
                  src="/projects/fotosciudad/DSC00202.jpg"
                  alt="Madrid nights"
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <FeaturedCard project={featuredProjects[6]} index={6} onVideoClick={handleVideoClick} />
              </div>
            </div>

            {/* Portrait row 2 — Video | Photo | Video */}
            <div className="flex gap-2 md:gap-3">
              <div className="flex-1 min-w-0">
                <FeaturedCard project={featuredProjects[7]} index={7} onVideoClick={handleVideoClick} />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex-1 min-w-0 overflow-hidden aspect-[9/16]"
              >
                <img
                  src="/projects/fotosnaturaleza/DSC09119-2 3.jpg"
                  alt="Deadvlei"
                  loading="lazy"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
              <div className="flex-1 min-w-0">
                <FeaturedCard project={featuredProjects[8]} index={8} onVideoClick={handleVideoClick} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
