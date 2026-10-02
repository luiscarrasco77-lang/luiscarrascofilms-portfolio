"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";

export default function Hero() {
  const { t, href } = useI18n();
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

  // Once the source is attached, load and try to play. We set the `muted`
  // *property* explicitly (React's muted attribute alone doesn't always apply it,
  // and browsers refuse to autoplay a non-muted video).
  const tryPlay = () => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = true;
    el.play().catch(() => {});
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!videoOn || !el) return;
    // Safari decides autoplay eligibility from the `muted` ATTRIBUTE at the moment
    // the source is set — and React doesn't render that attribute. Set the muted
    // attribute + property + defaultMuted BEFORE assigning src so Safari treats it
    // as a muted video and allows autoplay.
    el.defaultMuted = true;
    el.muted = true;
    el.setAttribute("muted", "");
    el.setAttribute("playsinline", "");
    if (!el.getAttribute("src")) {
      // Phones and data-saver / slow connections get the lighter 720p loop.
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
      const light =
        window.matchMedia("(max-width: 767px)").matches ||
        conn?.saveData === true ||
        /(^|-)(2g|3g)$/.test(conn?.effectiveType ?? "");
      el.setAttribute("src", light ? "/videos/hero-loop-720.mp4" : "/videos/hero-loop.mp4");
    }
    el.load();
    el.play().catch(() => {});
  }, [videoOn]);

  // Pause the video while the hero is scrolled out of view — keeps the GPU/decoder
  // free so the rest of the page scrolls smoothly.
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else el.pause();
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [videoOn]);

  // Fallback: if automatic autoplay is blocked (e.g. Safari in Low Power Mode),
  // start the video on the first user gesture — gestures are allowed to play
  // media even when autoplay isn't.
  useEffect(() => {
    const onGesture = () => tryPlay();
    const opts: AddEventListenerOptions = { once: true, passive: true };
    const events = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, onGesture, opts));
    return () => events.forEach((e) => window.removeEventListener(e, onGesture));
  }, []);

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
          preload
          fetchPriority="high"
          sizes="100vw"
          className="object-cover"
        />
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onLoadedData={tryPlay}
          onCanPlay={tryPlay}
          onPlaying={() => setVideoReady(true)}
          onPause={() => setVideoReady(false)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"}`}
        />
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
      </div>

      {/* Content */}
      <div
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 pt-16 text-center"
        style={{ textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className={`flex items-center gap-4 text-[10px] sm:text-[11px] uppercase font-normal text-white/60 mb-8 ${
            // long titles get tighter tracking on phones so they stay on one line
            t.hero.eyebrow.length > 28 ? "tracking-[0.3em] sm:tracking-[0.5em]" : "tracking-[0.5em]"
          }`}
        >
          <span aria-hidden="true" className="hidden sm:block h-px w-10 bg-gold/60" />
          {t.hero.eyebrow}
          <span aria-hidden="true" className="hidden sm:block h-px w-10 bg-gold/60" />
        </motion.p>

        {/* One H1 = brand + location (strong local signal) */}
        <h1 className="flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.15em] text-white mb-6"
          >
            LUIS CARRASCO
            <br />
            <span className="text-white/60 text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.3em] font-extralight">
              FILMS
            </span>
          </motion.span>

          {/* Expanding hairline — settles after the title lands */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
            className="block h-px w-24 sm:w-40 bg-gradient-to-r from-transparent via-gold/70 to-transparent mb-7 origin-center"
          />

          {/* Location — clearly visible */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="inline-flex items-center gap-2.5 text-[10px] sm:text-xs font-normal uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/85 mb-7"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <span className="sr-only"> – </span>
            {t.location.based}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg text-white/60 font-light leading-relaxed tracking-wide mb-12"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        >
          <Link
            href={href("/work")}
            className="group relative inline-flex items-center gap-4 px-10 py-4 border border-white/35 overflow-hidden text-white text-[11px] uppercase font-normal tracking-[0.32em] transition-colors duration-500 hover:text-black before:absolute before:inset-0 before:bg-white before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.22,1,0.36,1)] hover:before:scale-x-100"
          >
            <span className="relative">{t.hero.cta}</span>
            <svg
              className="relative w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 [@media(max-height:820px)]:hidden"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-white/45">
            {t.hero.scroll}
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
