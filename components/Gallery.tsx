"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback, useEffect, useMemo } from "react";
import FadeImage from "@/components/FadeImage";
import { previewSrc } from "@/lib/media";
import { allProjects, categories, type ProjectMedia } from "@/data/projects";
import VideoModal from "@/components/VideoModal";
import ImageModal from "@/components/ImageModal";
import WatchLink from "@/components/WatchLink";
import { useI18n } from "@/lib/i18n";

const mediaTypes = [{ id: "all" }, { id: "video" }, { id: "photo" }] as const;

// Column count (2 on mobile, 3 on desktop) and the grid's pixel width — updates on resize.
function useGrid() {
  const [grid, setGrid] = useState({ cols: 2, width: 0 });
  useEffect(() => {
    const update = () => {
      const width = document.documentElement.clientWidth;
      const cols = window.innerWidth >= 768 ? 3 : 2;
      setGrid((g) => (g.cols === cols && g.width === width ? g : { cols, width }));
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return grid;
}

// Card height relative to its column width (portrait 3:4, landscape 4:3) plus the row gap.
const relHeight = (p: ProjectMedia, gap: number) => (p.aspect === "portrait" ? 4 / 3 : 3 / 4) + gap;

// Search budget for an exhaustive layout (small filtered sets only).
const MAX_LAYOUTS = 200_000;

// Splits items into columns (each column keeps reading order) so the column
// bottoms end as level as possible. Large sets use the greedy shortest-column
// rule; small sets (a single category) try every assignment for the most level
// ending, starting from the greedy one so ties keep that layout.
function buildColumns(items: ProjectMedia[], numCols: number, exactGap: number) {
  const cols: ProjectMedia[][] = Array.from({ length: numCols }, () => []);
  const heights = new Array(numCols).fill(0);

  if (exactGap > 0 && Math.pow(numCols, items.length) <= MAX_LAYOUTS) {
    let best = Infinity;
    let bestAssign: number[] = [];
    const assign: number[] = [];
    const visit = (k: number) => {
      if (k === items.length) {
        const spread = Math.max(...heights) - Math.min(...heights);
        if (spread < best - 1e-3) {
          best = spread;
          bestAssign = [...assign];
        }
        return;
      }
      const order = heights.map((_, c) => c).sort((a, b) => heights[a] - heights[b] || a - b);
      const h = relHeight(items[k], exactGap);
      for (const c of order) {
        assign[k] = c;
        heights[c] += h;
        visit(k + 1);
        heights[c] -= h;
      }
    };
    visit(0);
    bestAssign.forEach((c, i) => cols[c].push(items[i]));
    return cols;
  }

  const GAP = 0.04; // approximate relative gap — keeps the main layout stable
  items.forEach((item) => {
    let shortest = 0;
    for (let c = 1; c < numCols; c++) {
      if (heights[c] < heights[shortest] - 1e-6) shortest = c;
    }
    cols[shortest].push(item);
    heights[shortest] += relHeight(item, GAP);
  });
  return cols;
}

// How many items at the bottom of each column may stretch, and by how much at
// most, so every column ends flush with the tallest one.
const TAIL_GROW = 4;
const MAX_GROW = 1.35;

function GalleryItem({
  project,
  onOpen,
  grow = false,
}: {
  project: ProjectMedia;
  onOpen: (project: ProjectMedia) => void;
  grow?: boolean;
}) {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const isPortrait = project.aspect === "portrait";
  const isVideo = project.type === "video";
  const isEmbed = project.type === "embed";
  const isImage = project.type === "image";

  // Hover plays a light 5-second preview, never the full film.
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
      className={`group relative overflow-hidden cursor-pointer bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-white/70 ${grow ? "flex flex-col grow" : ""}`}
      // Tail items absorb the leftover column height (object-cover crops a touch),
      // capped relative to their natural size via the column's container width.
      style={grow ? { maxHeight: `calc(100cqw * ${isPortrait ? 4 / 3 : 3 / 4} * ${MAX_GROW})` } : undefined}
      data-cursor={isImage ? "view" : "play"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Photos open the lightbox; videos are handled by their WatchLink.
      {...(isImage && {
        role: "button",
        tabIndex: 0,
        "aria-label": `${t.a11y.enlarge}: ${project.title}`,
        onClick: () => onOpen(project),
        onKeyDown: (e: React.KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(project);
          }
        },
      })}
    >
      <div className={`relative w-full overflow-hidden ${isPortrait ? "aspect-[3/4]" : "aspect-[4/3]"} ${grow ? "grow" : ""}`}>
        <div className="absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]">
          {(!isVideo || project.poster) && (
            <FadeImage
              src={isVideo || isEmbed ? project.poster : project.src}
              alt={`${project.title} – ${t.gallery.categories[project.category]}`}
              fill
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover"
            />
          )}
          {isVideo && (
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="none"
              onPlaying={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${playing ? "opacity-100" : "opacity-0"}`}
            >
              <source src={previewSrc(project.src)} type="video/mp4" />
            </video>
          )}
        </div>

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ zIndex: 3 }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 p-4 md:p-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          style={{ zIndex: 4 }}
        >
          <p className="text-sm font-light text-white">{project.title}</p>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold/90 mt-1">{t.gallery.categories[project.category]}</p>
        </div>

        {/* Corner badge: play for video/embed, expand for photos */}
        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full border border-white/30 bg-black/25 backdrop-blur-sm flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-300"
          style={{ zIndex: 4 }}
        >
          {isImage ? (
            <svg className="w-3.5 h-3.5 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-white ml-0.5 group-hover:text-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
        {!isImage && <WatchLink project={project} onOpen={() => onOpen(project)} />}
      </div>
    </div>
  );
}

export default function Gallery() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mediaFilter, setMediaFilter] = useState<"all" | "video" | "photo">("all");
  const [modal, setModal] = useState<{ id: string; src: string; title: string; poster?: string; embedUrl?: string } | null>(null);
  const [imageModal, setImageModal] = useState<{ src: string; alt: string } | null>(null);
  const { cols: numCols, width: gridWidth } = useGrid();

  const handleOpen = useCallback((project: ProjectMedia) => {
    if (project.type === "image") {
      setImageModal({ src: project.src, alt: project.title });
    } else {
      setModal({ id: project.id, src: project.src, title: project.title, poster: project.poster, embedUrl: project.embedUrl });
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

  // All cards share one shape (e.g. Festivals: all portrait) → a plain grid with
  // the last row centered; columns could never end level for such a set.
  const uniform = filtered.length > 0 && filtered.every((p) => p.aspect === filtered[0].aspect);

  // Balanced masonry (no black gap at the bottom of any column).
  const columns = useMemo(() => {
    const gapPx = numCols === 3 ? 12 : 8;
    const colWidth = gridWidth > 0 ? (gridWidth - gapPx * (numCols - 1)) / numCols : 0;
    return buildColumns(filtered, numCols, colWidth > 0 ? gapPx / colWidth : 0);
  }, [filtered, numCols, gridWidth]);

  return (
    <>
      {modal && <VideoModal shareId={modal.id} src={modal.src} title={modal.title} poster={modal.poster} embedUrl={modal.embedUrl} onClose={closeModal} />}
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
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-3 max-w-xl text-sm text-muted font-light leading-relaxed"
          >
            {t.gallery.intro}
          </motion.p>
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
              className={`w-full gap-2 md:gap-3 ${uniform ? "flex flex-wrap justify-center" : "flex"}`}
            >
              {uniform
                ? filtered.map((project) => (
                    <div
                      key={project.id}
                      className="min-w-0 basis-[calc((100%-0.5rem)/2)] md:basis-[calc((100%-1.5rem)/3)]"
                    >
                      <GalleryItem project={project} onOpen={handleOpen} />
                    </div>
                  ))
                : columns.map((col, ci) => (
                    <div key={ci} className="@container flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
                      {col.map((project, i) => (
                        <GalleryItem
                          key={project.id}
                          project={project}
                          onOpen={handleOpen}
                          grow={i >= col.length - TAIL_GROW}
                        />
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
