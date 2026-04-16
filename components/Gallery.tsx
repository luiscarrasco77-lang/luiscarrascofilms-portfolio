"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import { allProjects, categories, type ProjectMedia } from "@/data/projects";
import VideoModal from "@/components/VideoModal";

function GalleryItem({
  project,
  onVideoClick,
}: {
  project: ProjectMedia;
  onVideoClick: (src: string, title: string) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const isPortrait = project.aspect === "portrait";

  const handleMouseEnter = () => {
    setHovered(true);
    if (project.type === "video") videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovered(false);
    if (project.type === "video") {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (project.type === "video") onVideoClick(project.src, project.title);
  };

  return (
    <div
      className="group relative overflow-hidden cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className={`relative w-full ${isPortrait ? "aspect-[9/16]" : "aspect-[16/10]"}`}>
        {project.type === "image" ? (
          <img
            src={project.src}
            alt={project.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            {project.poster && !hovered && (
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
          </>
        )}

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ zIndex: 3 }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
          style={{ zIndex: 4 }}
        >
          <p className="text-sm font-light text-white">{project.title}</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-0.5">{project.category}</p>
        </div>

        {project.type === "video" && (
          <div
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300"
            style={{ zIndex: 4 }}
          >
            <svg
              className="w-3 h-3 text-white ml-0.5 group-hover:text-black transition-colors"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [modal, setModal] = useState<{ src: string; title: string } | null>(null);

  const handleVideoClick = useCallback((src: string, title: string) => {
    setModal({ src, title });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const filtered =
    selectedCategory === "all"
      ? allProjects
      : allProjects.filter((p) => p.category === selectedCategory);

  return (
    <>
      {modal && (
        <VideoModal src={modal.src} title={modal.title} onClose={closeModal} />
      )}

      <section className="pt-28 pb-24 md:pt-32 md:pb-32 px-5 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight">
              Portfolio
            </h1>
            <p className="text-sm text-muted mt-2">
              Click any video to watch with sound
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-250 ${
                  selectedCategory === cat.id
                    ? "bg-white text-black font-medium"
                    : "text-white/50 hover:text-white hover:bg-white/8"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/*
            CSS columns masonry: items flow top→bottom per column independently.
            No rows = no black gaps when portrait and landscape items mix.
          */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="columns-2 md:columns-3 gap-2 md:gap-3"
            >
              {filtered.map((project) => (
                <div key={project.id} className="break-inside-avoid mb-2 md:mb-3">
                  <GalleryItem
                    project={project}
                    onVideoClick={handleVideoClick}
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
