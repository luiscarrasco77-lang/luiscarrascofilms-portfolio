"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

// Subtle, tiling film grain — adds cinematic texture without a network request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero() {
  const { t } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Defer the hero video until the browser is idle so it never competes with
  // hydration or the first scroll for the main thread — but load it on every
  // device (desktop and mobile). The optimized poster paints instantly as LCP.
  useEffect(() => {
    const start = () => setVideoOn(true);
    const w = window as typeof window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(start, 700);
    return () => clearTimeout(t);
  }, []);

  // Once the source is attached, load and start playing. We set the `muted`
  // *property* explicitly (React's muted attribute alone doesn't always apply it,
  // and browsers block autoplay of a non-muted video — which leaves it paused
  // showing a play button). play() may reject before data is ready; onCanPlay
  // retries.
  useEffect(() => {
    const el = videoRef.current;
    if (!videoOn || !el) return;
    el.muted = true;
    el.load();
    el.play().catch(() => {});
  }, [videoOn]);

  const handleCanPlay = () => {
    const el = videoRef.current;
    if (el) {
      el.muted = true;
      el.play().catch(() => {});
    }
    setVideoReady(true);
  };

  // Pause the video while the hero is scrolled out of view — keeps the GPU/decoder
  // free so the rest of the page scrolls smoothly.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.muted = true;
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoOn]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {/* Optimized poster — paints instantly (LCP), sits behind the video */}
        <Image
          src="/projects/fotosnaturaleza/DJI_20250507153645_0077_D 2.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          onCanPlay={handleCanPlay}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        >
          {videoOn && <source src="/videos/hero-loop.mp4" type="video/mp4" />}
        </video>
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        <div className="absolute inset-0 bg-black/20" />
        {/* Cinematic vignette — pulls focus to the center */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 38%, transparent 52%, rgba(0,0,0,0.55) 100%)",
          }}
        />
        {/* Film grain — plain overlay (no blend mode) so it never forces a
            re-composite while scrolling through the hero. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ textShadow: "0 2px 28px rgba(0,0,0,0.45)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-white/45 mb-7"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] text-white mb-6"
        >
          LUIS CARRASCO
          <br />
          <span className="text-white/60 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.3em] font-extralight">
            FILMS
          </span>
        </motion.h1>

        {/* Expanding hairline — settles after the title lands */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
          className="h-px w-24 sm:w-32 bg-gradient-to-r from-transparent via-white/50 to-transparent mb-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg text-white/60 font-light leading-relaxed tracking-wide mb-12"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <Link
            href="/work"
            className="group relative inline-flex items-center gap-3 px-10 py-4 border border-white/30 text-white text-sm uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all duration-500"
          >
            {t.hero.cta}
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
