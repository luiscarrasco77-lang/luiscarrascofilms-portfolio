"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const photoGrid = [
  { src: "/projects/fotosnaturaleza/DJI_20251026164651_0595_D.jpg", alt: "Aerial coast", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DSC09119-2 3.jpg", alt: "Deadvlei", aspect: "portrait" },
  { src: "/projects/fotosnaturaleza/DJI_20251124173736_0783_D.jpg", alt: "Sunset aerial", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DJI_20260308151022_0052_D.jpg", alt: "Alpine slope", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DJI_20251021182436_0464_D 2.jpg", alt: "Ocean aerial", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DSC07810.jpg", alt: "Waterfall", aspect: "portrait" },
];

export default function VisionContent() {
  return (
    <div className="w-full">

      {/* ── 1. HERO — background photo, title sits naturally below the header ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        {/* Background photo fills section height */}
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/projects/fotosnaturaleza/DJI_20260308151945_0076_D.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover", opacity: 0.35 }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,5,0.4) 0%, transparent 40%, rgba(5,5,5,0.8) 85%, #050505 100%)" }} />
        </div>

        {/* Title — in normal document flow, padded below the fixed header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ position: "relative", zIndex: 1, padding: "120px 40px 80px" }}
        >
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.35em", color: "#666", marginBottom: "24px" }}>
              The Vision
            </p>
            <h1 style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              A kid with a camera
              <br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>full of dreams.</span>
            </h1>
          </div>
        </motion.div>
      </section>

      {/* ── 2. THREE-COLUMN ROW: photo | copy | photo ─────────────────────── */}
      {/*    All three columns same height — flex items-stretch eliminates gaps */}
      <div className="mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row gap-3">

          {/* Left photo: KidCamera */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:w-[28%] relative overflow-hidden aspect-[3/4]"
          >
            <Image
              src="/projects/KidCamera.png"
              alt="Luis as a kid with a camera"
              fill
              sizes="(min-width: 768px) 28vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Center copy */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="md:flex-1 flex flex-col justify-center gap-6 text-muted font-light text-base md:text-lg leading-relaxed px-0 md:px-10"
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
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/25 mt-4">
              Then &amp; now — always behind the lens
            </p>
          </motion.div>

          {/* Right photo: Africa */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:w-[28%] relative overflow-hidden aspect-[3/4]"
          >
            <Image
              src="/projects/CameraAfrica.JPG"
              alt="Luis filming in Africa"
              fill
              sizes="(min-width: 768px) 28vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>

      {/* ── 3. EDITORIAL COPY ─────────────────────────────────────────────── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-base md:text-xl text-muted font-light leading-relaxed mb-6"
          >
            It started with a camera and the open road. What began as a personal
            obsession with capturing movement and light became a career spanning
            five continents, global brands, and millions of views.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-base md:text-xl font-light leading-relaxed text-foreground"
          >
            From the snow-covered peaks of the French Alps to the electric energy
            of underground music festivals — every frame tells a story
            engineered for impact.
          </motion.p>
        </div>
      </div>

      {/* ── 4. WIDE BANNER — FotoSkiSuiza ─────────────────────────────────── */}
      <div className="mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative overflow-hidden aspect-[21/9]"
        >
          <Image
            src="/projects/FotoSkiSuiza.JPG"
            alt="Skiing in Switzerland"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </motion.div>
      </div>

      {/* ── 5. PULL QUOTE + PORTRAIT (miniormond3 vertical) ───────────────── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">

          {/* Portrait photo — vertical */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-[32%] relative overflow-hidden aspect-[3/4] flex-shrink-0"
          >
            <Image
              src="/projects/fotosnaturaleza/miniormond3 2.jpg"
              alt="Luis Carrasco"
              fill
              sizes="(min-width: 768px) 32vw, 100vw"
              className="object-cover object-top"
            />
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="border-l border-white/20 pl-6 md:pl-10"
          >
            <p className="text-xl md:text-3xl lg:text-4xl font-extralight leading-tight tracking-tight text-white/80">
              &ldquo;In a world full of AI and noise, companies look for
              craftsmen — not machines. Storytelling is the engine behind growth.&rdquo;
            </p>
            <cite className="text-[11px] uppercase tracking-[0.3em] text-muted mt-6 block not-italic">
              Luis Carrasco
            </cite>
          </motion.blockquote>
        </div>
      </div>

      {/* ── 6. PHOTO GRID — full-bleed, no CSS grid rows, no black gaps ── */}
      <div className="mb-20 md:mb-28">
        <div className="flex gap-2 md:gap-3">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
              {photoGrid
                .filter((_, i) => i % 3 === col)
                .map((photo, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: col * 0.07 + i * 0.1 }}
                    viewport={{ once: true }}
                    className={`relative overflow-hidden ${
                      photo.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(min-width: 768px) 33vw, 50vw"
                      className="object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. SERVICES ───────────────────────────────────────────────────── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto pb-24 md:pb-32">
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

    </div>
  );
}
