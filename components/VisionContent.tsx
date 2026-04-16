"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// 6 photos distributed across 3 flex columns (2 per column) — no CSS grid rows → no black gaps
const bottomPhotos = [
  { src: "/projects/fotosnaturaleza/DJI_20251026164651_0595_D.jpg", alt: "Aerial coast", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DSC09119-2 3.jpg", alt: "Deadvlei", aspect: "portrait" },
  { src: "/projects/fotosnaturaleza/DJI_20251124173736_0783_D.jpg", alt: "Sunset aerial", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DJI_20260308151022_0052_D.jpg", alt: "Alpine slope", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DJI_20251021182436_0464_D 2.jpg", alt: "Ocean aerial", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DSC07810.jpg", alt: "Waterfall", aspect: "portrait" },
];

export default function VisionContent() {
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <article className="pt-32 pb-24 md:pt-44 md:pb-32 w-full overflow-x-hidden">

      {/* ─── Opening statement ─────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-24 md:mb-32">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[11px] uppercase tracking-[0.3em] text-muted mb-10"
        >
          The Vision
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extralight leading-[1.05] tracking-tight max-w-4xl"
        >
          A kid with a camera
          <br />
          <span className="text-muted">full of dreams.</span>
        </motion.h1>
      </div>

      {/* ─── Kid + Africa photos + copy ─────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-24 md:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 items-center">

          {/* Photos */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div className="overflow-hidden aspect-[3/4]">
                <img
                  src="/projects/KidCamera.png"
                  alt="Luis as a kid with a camera"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden aspect-[3/4]">
                <img
                  src="/projects/CameraAfrica.JPG"
                  alt="Luis filming in Africa"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <p className="text-xs text-muted mt-4 tracking-wider">
              Then &amp; now — always behind the lens
            </p>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 text-muted font-light text-base md:text-lg leading-relaxed"
          >
            <p>
              From a toy camera in my childhood hands to a cinema rig
              across five continents — the obsession never changed.
              Only the tools did.
            </p>
            <p>
              Every frame is a decision. Every cut is an argument.
              Every story is a reason to keep moving.
            </p>
            <p className="text-foreground">
              What started as curiosity became craft.
              What became craft became a career.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Editorial block: parallax portrait + copy ───────────────────── */}
      <div
        ref={parallaxRef}
        className="max-w-[1400px] mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-24 md:mb-32"
      >
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden aspect-[3/4]"
        >
          <motion.img
            src="/projects/fotosnaturaleza/miniormond3 2.jpg"
            alt="Luis Carrasco"
            className="w-full h-full object-cover"
            style={{ y: imageY }}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 text-base md:text-lg text-muted font-light leading-relaxed"
        >
          <p>
            It started with a camera and the open road. What began as a personal
            obsession with capturing movement and light became a career spanning
            five continents, global brands, and millions of views.
          </p>
          <p>
            From the snow-covered peaks of the French Alps to the electric energy
            of underground music festivals, from luxury hotels in Courchevel to
            the raw coastlines of Costa Rica — every frame tells a story
            engineered for impact.
          </p>
          <p className="text-foreground">
            In a world full of AI and noise, companies and creators look for
            craftsmen, not machines. Storytelling isn&apos;t just art — it&apos;s the
            engine behind growth.
          </p>
        </motion.div>
      </div>

      {/* ─── Pull quote ───────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-24 md:mb-32">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="border-l border-white/20 pl-6 md:pl-10"
        >
          <p className="text-xl md:text-3xl lg:text-4xl font-extralight leading-tight tracking-tight text-white/80 max-w-3xl">
            &ldquo;We don&apos;t just make films. We build visual ecosystems that
            drive real growth.&rdquo;
          </p>
          <cite className="text-[11px] uppercase tracking-[0.3em] text-muted mt-5 block not-italic">
            Luis Carrasco
          </cite>
        </motion.blockquote>
      </div>

      {/* ─── Photo grid — 3 independent flex columns (no CSS grid rows → no black gaps) */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 mb-24 md:mb-32">
        <div className="flex gap-2 md:gap-3">
          {/* col 0: photos[0] + photos[3] */}
          {/* col 1: photos[1] + photos[4] */}
          {/* col 2: photos[2] + photos[5] */}
          {[0, 1, 2].map((colIdx) => (
            <div key={colIdx} className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
              {bottomPhotos
                .filter((_, i) => i % 3 === colIdx)
                .map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (colIdx * 0.08) + (i * 0.12) }}
                    viewport={{ once: true }}
                    className={`overflow-hidden ${photo.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"}`}
                  >
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ─── Services grid ────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.3em] text-muted mb-12"
        >
          What I Do
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            {
              title: "Direction & Cinematography",
              desc: "Concept-to-delivery creative direction. From brand campaigns to travel documentaries, every project gets a cinematic treatment built for digital performance.",
            },
            {
              title: "Editing & Post-Production",
              desc: "Fast-paced, high-retention editing. Color grading, sound design, and motion graphics crafted for the platforms that matter — YouTube, Instagram, TikTok.",
            },
            {
              title: "Brand Strategy & Content",
              desc: "More than production — I help brands build visual ecosystems. Content strategies that turn viewers into communities and communities into customers.",
            },
          ].map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-px bg-white/20 mb-5" />
              <h3 className="text-base font-light tracking-tight mb-3 text-white">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  );
}
