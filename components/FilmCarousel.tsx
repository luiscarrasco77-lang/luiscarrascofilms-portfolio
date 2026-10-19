"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { allProjects, featuredProjects, type ProjectMedia } from "@/data/projects";
import FadeImage from "@/components/FadeImage";
import WatchLink from "@/components/WatchLink";
import { useI18n } from "@/lib/i18n";
import { previewSrc, useHdPreviews } from "@/lib/media";

// Lead films shown in the homepage carousel, in order.
const SLIDE_IDS = [
  "commercial-pizol-brand",
  "commercial-hsg-long",
  "commercial-prince-university",
  "commercial-toyota",
  "feat-costarica",
];
const pool = [...featuredProjects, ...allProjects];
const slides = SLIDE_IDS.map((id) => pool.find((p) => p.id === id)).filter(
  (p): p is ProjectMedia => Boolean(p)
);

const DURATION = 7000; // ms per slide

// Position of slide i relative to the active one, wrapped into [-n/2, n/2).
function offsetOf(i: number, active: number, n: number) {
  return ((((i - active) % n) + n + Math.floor(n / 2)) % n) - Math.floor(n / 2);
}

// DJI-style carousel: the active film plays its HD preview, neighbours peek in
// at the sides, arrows / swipe / keys switch films and it advances on its own
// while on screen (paused on hover and for reduced motion).
export default function FilmCarousel({ onOpen }: { onOpen: (project: ProjectMedia) => void }) {
  const { t } = useI18n();
  const hd = useHdPreviews();
  const n = slides.length;
  // prev is kept so a slide wrapping from one end to the other can skip its animation.
  const [{ active, prev: prevActive }, setPos] = useState({ active: 0, prev: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const elapsed = useRef(0);
  const swipeX = useRef<number | null>(null);

  const go = useCallback(
    (target: number) => setPos((p) => ({ prev: p.active, active: ((target % n) + n) % n })),
    [n]
  );
  const prev = useCallback(() => setPos((p) => ({ prev: p.active, active: (p.active - 1 + n) % n })), [n]);
  const next = useCallback(() => setPos((p) => ({ prev: p.active, active: (p.active + 1) % n })), [n]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    if (rootRef.current) io.observe(rootRef.current);
    return () => {
      mq.removeEventListener("change", update);
      io.disconnect();
    };
  }, []);

  // Only the active film plays; the others rest on their poster.
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === active && inView && !reducedMotion) v.play().catch(() => {});
      else {
        v.pause();
        if (i !== active) v.currentTime = 0;
      }
    });
  }, [active, inView, reducedMotion, hd]);

  // Progress bar + auto-advance, driven by rAF (no re-render per frame).
  useEffect(() => {
    elapsed.current = 0;
    barRefs.current.forEach((b, i) => b && (b.style.transform = i < active ? "scaleX(1)" : "scaleX(0)"));
    const running = inView && !hovered && !reducedMotion;
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const bar = barRefs.current[active];
      if (bar) bar.style.transform = `scaleX(${Math.min(elapsed.current / DURATION, 1)})`;
      if (elapsed.current >= DURATION) {
        next();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, inView, hovered, reducedMotion, next]);

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.featured.title}
      tabIndex={0}
      className="relative w-full overflow-hidden outline-none touch-pan-y [--gap:8px] md:[--gap:12px] [--w:88vw] md:[--w:84vw]"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse") swipeX.current = e.clientX;
      }}
      onPointerUp={(e) => {
        if (swipeX.current === null) return;
        const dx = e.clientX - swipeX.current;
        swipeX.current = null;
        if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
      }}
    >
      {/* Height follows the slide: 4:5 on phones, ~2.2:1 on desktop */}
      <div className="relative w-full aspect-[1/1.11] md:aspect-[2.6/1]">
        {slides.map((p, i) => {
          const offset = offsetOf(i, active, n);
          const prevOffset = offsetOf(i, prevActive, n);
          const isActive = offset === 0;
          const isVideo = p.type === "video";
          const description = p.description && (t.descriptions[p.description] ?? p.description);
          return (
            <div
              key={p.id}
              aria-hidden={!isActive}
              className={`absolute top-0 left-[calc(50%-var(--w)/2)] h-full w-[var(--w)] overflow-hidden rounded-xl md:rounded-2xl bg-surface ${
                isActive ? "" : "cursor-pointer"
              }`}
              style={{
                transform: `translateX(calc(${offset} * (var(--w) + var(--gap))))`,
                // A slide wrapping around from one end to the other jumps without animating.
                transition:
                  Math.abs(offset - prevOffset) > 1
                    ? "none"
                    : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.8s ease",
                opacity: isActive ? 1 : 0.45,
              }}
              data-cursor={isActive ? "play" : undefined}
              onClick={isActive ? undefined : () => go(i)}
            >
              <div
                className={`absolute inset-0 transition-transform ease-linear ${
                  !isVideo && isActive && !reducedMotion ? "scale-110 duration-[7000ms]" : "scale-100 duration-700"
                }`}
              >
                <FadeImage
                  src={p.poster}
                  alt={p.title}
                  fill
                  sizes="(min-width: 768px) 84vw, 88vw"
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  className="object-cover"
                />
                {isVideo && (
                  <video
                    ref={(el) => {
                      videoRefs.current[i] = el;
                    }}
                    src={previewSrc(p.src, hd)}
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              <div
                className={`absolute inset-x-0 bottom-0 p-6 md:p-12 transition-all duration-700 ${
                  isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-white/60 mb-2">
                  {t.gallery.categories[p.category]}
                </p>
                <h3 className="font-hero text-3xl md:text-6xl font-semibold tracking-tight text-white leading-none">
                  {p.title}
                </h3>
                {description && <p className="text-sm text-white/60 mt-3 max-w-md">{description}</p>}
                <span className="relative z-[6] pointer-events-none mt-6 inline-flex items-center gap-2.5 rounded-full bg-white text-black pl-4 pr-5 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em]">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  {t.carousel.watch}
                </span>
              </div>

              {isActive && <WatchLink project={p} onOpen={() => onOpen(p)} />}
            </div>
          );
        })}

        {/* Arrows, sitting on the edges of the active film */}
        <button
          type="button"
          onClick={prev}
          aria-label={t.carousel.prev}
          className="hidden md:flex absolute z-10 top-1/2 -translate-y-1/2 left-[calc(50%-var(--w)/2+24px)] w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label={t.carousel.next}
          className="hidden md:flex absolute z-10 top-1/2 -translate-y-1/2 right-[calc(50%-var(--w)/2+24px)] w-12 h-12 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white items-center justify-center hover:bg-white hover:text-black transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Progress indicators */}
      <div className="flex justify-center gap-2 mt-5 md:mt-6">
        {slides.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => go(i)}
            aria-label={`${i + 1} / ${n}: ${p.title}`}
            aria-current={i === active ? "true" : undefined}
            className="group py-2"
          >
            <span className="relative block h-[2px] w-8 md:w-10 overflow-hidden rounded-full bg-white/20">
              <span
                ref={(el) => {
                  barRefs.current[i] = el;
                }}
                className="absolute inset-0 origin-left bg-white"
                style={{ transform: "scaleX(0)" }}
              />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
