"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Image from "next/image";
import { allProjects, categories, type ProjectMedia } from "@/data/projects";
import VideoModal from "@/components/VideoModal";
import ImageModal from "@/components/ImageModal";
import { useI18n } from "@/lib/i18n";

const mediaTypes = [{ id: "all" }, { id: "video" }, { id: "photo" }] as const;

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
  onOpen,
}: {
  project: ProjectMedia;
  onOpen: (project: ProjectMedia) => void;
}) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const isPortrait = project.aspect === "portrait";
  const isVideo = project.type === "video";
  const isEmbed = project.type === "embed";
  const isImage = project.type === "image";

  const handleMouseEnter = () => {
    if (isVideo) videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    if (isVideo) {
      videoRef.current?.pause();
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="group relative overflow-hidden cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70"
      role="button"
      tabIndex={0}
      aria-label={isImage ? `Enlarge ${project.title} photo` : `Play ${project.title} video`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(project);
        }
      }}
    >
      <div className={`relative w-full ${isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
        {!isVideo ? (
          <Image
            src={isEmbed ? project.poster : project.src}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <>
            {/* Optimized poster always sits behind; the muted video (preload=none)
                paints over it only once it starts playing on hover. */}
            {project.poster && (
              <Image
                src={project.poster}
                alt={project.title}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
                style={{ zIndex: 1 }}
              />
            )}
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
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
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-0.5">{t.gallery.categories[project.category]}</p>
        </div>

        {/* Corner badge: play for video/embed, expand for photos */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-300"
          style={{ zIndex: 4 }}
        >
          {isImage ? (
            <svg className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-white ml-0.5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mediaFilter, setMediaFilter] = useState<"all" | "video" | "photo">("all");
  const [modal, setModal] = useState<{ id: string; src: string; title: string; embedUrl?: string } | null>(null);
  const [imageModal, setImageModal] = useState<{ src: string; alt: string } | null>(null);
  const numCols = useCols();

  const handleOpen = useCallback((project: ProjectMedia) => {
    if (project.type === "image") {
      setImageModal({ src: project.src, alt: project.title });
    } else {
      setModal({ id: project.id, src: project.src, title: project.title, embedUrl: project.embedUrl });
    }
  }, []);
  const closeModal = useCallback(() => setModal(null), []);
  const closeImageModal = useCallback(() => setImageModal(null), []);

  const filtered = useMemo(
    () =>
      allProjects.filter((p) => {
        const catOk = selectedCategory === "all" || p.category === selectedCategory;
        const mediaOk =
          mediaFilter === "all" ||
          (mediaFilter === "video" && (p.type === "video" || p.type === "embed")) ||
          (mediaFilter === "photo" && p.type === "image");
        return catOk && mediaOk;
      }),
    [selectedCategory, mediaFilter]
  );

  // Balanced masonry: place each item into the currently shortest column so all
  // columns end at nearly the same height (no black gap at the bottom). Item
  // height is driven by aspect ratio — portrait 3:4 is taller than landscape 4:3.
  // A small per-item term accounts for the gap between rows.
  const columns = useMemo(() => {
    const cols: ProjectMedia[][] = Array.from({ length: numCols }, () => []);
    const heights = new Array(numCols).fill(0);
    const GAP = 0.04; // relative gap added per item
    filtered.forEach((item) => {
      const h = (item.aspect === "portrait" ? 4 / 3 : 3 / 4) + GAP;
      let shortest = 0;
      for (let c = 1; c < numCols; c++) {
        if (heights[c] < heights[shortest] - 1e-6) shortest = c;
      }
      cols[shortest].push(item);
      heights[shortest] += h;
    });
    return cols;
  }, [filtered, numCols]);

  return (
    <>
      {modal && <VideoModal shareId={modal.id} src={modal.src} title={modal.title} embedUrl={modal.embedUrl} onClose={closeModal} />}
      {imageModal && <ImageModal src={imageModal.src} alt={imageModal.alt} onClose={closeImageModal} />}

      <section className="pt-32 pb-24 md:pt-36 md:pb-32">
        {/* Title — scrolls with content */}
        <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-8 md:mb-10">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extralight tracking-tight"
          >
            {t.gallery.title}
          </motion.h1>
        </div>

        {/* Sticky bar — media type + categories, always visible below header */}
        <div className="sticky top-16 z-30 bg-background/95 backdrop-blur-md border-y border-white/5 mb-8 md:mb-10">
          <div className="px-5 md:px-10 max-w-[1400px] mx-auto py-3 md:py-4 space-y-3">
            {/* Media type — All / Video / Photography */}
            <div className="flex flex-wrap items-center gap-2">
              {mediaTypes.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMediaFilter(m.id)}
                  className={`px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] rounded-full border transition-all duration-250 ${
                    mediaFilter === m.id
                      ? "bg-white text-black border-white font-medium"
                      : "text-white/60 border-white/15 hover:text-white hover:border-white/40"
                  }`}
                >
                  {t.gallery.media[m.id]}
                </button>
              ))}
            </div>

            {/* Categories */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/5 pt-3">
              <div className="flex flex-wrap gap-2">
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
                    {t.gallery.categories[cat.id]}
                  </button>
                ))}
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-white/40 md:ml-auto">
                {t.gallery.hint}
              </p>
            </div>
          </div>
        </div>

        {/* Masonry grid — full-bleed */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <motion.div
              key={`${selectedCategory}-${mediaFilter}-${numCols}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex gap-2 md:gap-3 w-full"
            >
              {columns.map((col, ci) => (
                <div key={ci} className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
                  {col.map((project) => (
                    <GalleryItem key={project.id} project={project} onOpen={handleOpen} />
                  ))}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-5 md:px-10 max-w-[1400px] mx-auto text-sm text-muted py-20 text-center"
            >
              {t.gallery.empty}
            </motion.p>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
