"use client";

import { motion } from "framer-motion";

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
    <div className="w-full overflow-x-hidden">

      {/* ── 1. HERO TITLE — tall section so title never touches the header ── */}
      {/* Fixed header = 64px. Section min-height + flex-end pushes title down. */}
      <div
        className="flex flex-col justify-end px-5 md:px-10 pb-16 md:pb-24"
        style={{ minHeight: "55vh", paddingTop: "100px" }}
      >
        <div className="max-w-[1400px] mx-auto w-full">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-[11px] uppercase tracking-[0.35em] text-muted mb-8 md:mb-10"
          >
            The Vision
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-[88px] font-extralight leading-[1.05] tracking-tight"
          >
            A kid with a camera
            <br />
            <span className="text-white/35">full of dreams.</span>
          </motion.h1>
        </div>
      </div>

      {/* ── 2. THREE-COLUMN ROW: photo | copy | photo ─────────────────────── */}
      {/*    All three columns same height — flex items-stretch eliminates gaps */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row gap-3">

          {/* Left photo: KidCamera */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="md:w-[28%] overflow-hidden aspect-[3/4]"
          >
            <img
              src="/projects/KidCamera.png"
              alt="Luis as a kid with a camera"
              className="w-full h-full object-cover"
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
            className="md:w-[28%] overflow-hidden aspect-[3/4]"
          >
            <img
              src="/projects/CameraAfrica.JPG"
              alt="Luis filming in Africa"
              className="w-full h-full object-cover"
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

      {/* ── 4. FULL-WIDTH PORTRAIT PHOTO ──────────────────────────────────── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="overflow-hidden aspect-[21/9]"
        >
          <img
            src="/projects/fotosnaturaleza/miniormond3 2.jpg"
            alt="Luis Carrasco"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
      </div>

      {/* ── 5. PULL QUOTE ─────────────────────────────────────────────────── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="border-l border-white/20 pl-6 md:pl-10"
        >
          <p className="text-xl md:text-3xl lg:text-4xl font-extralight leading-tight tracking-tight text-white/80 max-w-3xl">
            &ldquo;In a world full of AI and noise, companies look for
            craftsmen — not machines. Storytelling is the engine behind growth.&rdquo;
          </p>
          <cite className="text-[11px] uppercase tracking-[0.3em] text-muted mt-5 block not-italic">
            Luis Carrasco
          </cite>
        </motion.blockquote>
      </div>

      {/* ── 6. PHOTO GRID — 3 flex columns, no CSS grid rows, no black gaps ── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
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
                    className={`overflow-hidden ${
                      photo.aspect === "portrait" ? "aspect-[3/4]" : "aspect-[16/10]"
                    }`}
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
