"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import { allProjects, categories, type ProjectMedia } from "@/data/projects";
import VideoModal from "@/components/VideoModal";

// Returns 2 on mobile, 3 on desktop — updates on resize
function useCols() {
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const update = () => setCols(window.innerWidth >= 768 ? 3 : 2);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return cols;
}

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

  return (
    <div
      className={`group relative overflow-hidden ${project.type === "video" ? "cursor-pointer" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => project.type === "video" && onVideoClick(project.src, project.title)}
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
            <svg className="w-3 h-3 text-white ml-0.5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
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
  const numCols = useCols();

  const handleVideoClick = useCallback((src: string, title: string) => setModal({ src, title }), []);
  const closeModal = useCallback(() => setModal(null), []);

  const filtered = useMemo(
    () => selectedCategory === "all" ? allProjects : allProjects.filter((p) => p.category === selectedCategory),
    [selectedCategory]
  );

  // Distribute items across columns for masonry — each column is an independent flex stack
  const columns = useMemo(() => {
    const cols: ProjectMedia[][] = Array.from({ length: numCols }, () => []);
    filtered.forEach((item, i) => cols[i % numCols].push(item));
    return cols;
  }, [filtered, numCols]);

  return (
    <>
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={closeModal} />}

      <section className="pt-32 pb-24 md:pt-36 md:pb-32">
        {/* Title — scrolls with content */}
        <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-8 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extralight tracking-tight"
          >
            Portfolio
          </motion.h1>
        </div>

        {/* Sticky bar — categories + hint, always visible below header */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-y border-white/5 mb-8 md:mb-10">
          <div className="px-5 md:px-10 max-w-[1400px] mx-auto py-3 md:py-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap gap-2"
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] rounded-full transition-all duration-250 ${
                    selectedCategory === cat.id
                      ? "bg-white text-black font-medium"
                      : "text-white/50 hover:text-white hover:bg-white/8"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 md:ml-auto">
              Click any video to watch with sound
            </p>
          </div>
        </div>

        {/* Masonry grid — full-bleed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${numCols}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex gap-2 md:gap-3 w-full"
          >
            {columns.map((col, ci) => (
              <div key={ci} className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
                {col.map((project) => (
                  <GalleryItem key={project.id} project={project} onVideoClick={handleVideoClick} />
                ))}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </section>
    </>
  );
}
