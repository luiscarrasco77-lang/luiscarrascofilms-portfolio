"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Subtle, tiling film grain — adds cinematic texture without a network request.
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOn, setVideoOn] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  // Defer the heavy hero video until the browser is idle, so it never competes
  // with hydration or the first scroll for the main thread.
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

  // Once the source is attached, kick off loading + autoplay.
  useEffect(() => {
    if (videoOn) videoRef.current?.load();
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
          onCanPlay={() => setVideoReady(true)}
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
        {/* Film grain */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
          style={{ backgroundImage: GRAIN }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
          className="max-w-2xl text-base sm:text-lg text-white/60 font-light leading-relaxed tracking-wide mb-12"
        >
          Turning stories into growth. We build digital stories that connect,
          convert, and create loyal communities.
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
            View the Work
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
