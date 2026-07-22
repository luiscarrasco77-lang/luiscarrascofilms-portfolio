"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";

const photoGrid = [
  { src: "/projects/fotosnaturaleza/DJI_20251026164651_0595_D.jpg", alt: "Aerial coast", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DSC09119-2 3.jpg", alt: "Deadvlei", aspect: "portrait" },
  { src: "/projects/fotosnaturaleza/DJI_20251124173736_0783_D.jpg", alt: "Sunset aerial", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DJI_20260308151022_0052_D.jpg", alt: "Alpine slope", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DJI_20251021182436_0464_D 2.jpg", alt: "Ocean aerial", aspect: "landscape" },
  { src: "/projects/fotosnaturaleza/DSC07810.jpg", alt: "Waterfall", aspect: "portrait" },
  { src: "/projects/fotosnaturaleza/DJI_20251025124753_0529_D.jpg", alt: "Caribbean cove", aspect: "landscape" },
];

export default function VisionContent() {
  const { t } = useI18n();
  return (
    <div className="w-full">

      {/* ── 1. HERO ── */}
      <section style={{ position: "relative", overflow: "hidden" }}>
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
        <div style={{ position: "relative", zIndex: 1, padding: "120px 40px 80px" }}>
          <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.35em", color: "#666", marginBottom: "24px" }}>
              {t.vision.eyebrow}
            </p>
            <h1 style={{ fontSize: "clamp(40px, 7vw, 88px)", fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
              {t.vision.titleLine1}
              <br />
              <span style={{ color: "rgba(255,255,255,0.35)" }}>{t.vision.titleLine2}</span>
            </h1>
          </div>
        </div>
      </section>

      {/* ── 2. THREE-COLUMN ROW: photo | copy | photo ── */}
      <div className="mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="md:w-[28%] relative overflow-hidden aspect-[3/4]">
            <Image
              src="/projects/KidCamera.png"
              alt="Luis as a kid with a camera"
              fill
              sizes="(min-width: 768px) 28vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="md:flex-1 flex flex-col justify-center gap-6 text-muted font-light text-base md:text-lg leading-relaxed px-0 md:px-10">
            <p>{t.vision.p1}</p>
            <p>{t.vision.p2}</p>
            <p className="text-foreground">{t.vision.p3}</p>
            <p className="text-[11px] uppercase tracking-[0.3em] text-white/25 mt-4">
              {t.vision.thenNow}
            </p>
          </div>
          <div className="md:w-[28%] relative overflow-hidden aspect-[3/4]">
            <Image
              src="/projects/CameraAfrica.JPG"
              alt="Luis filming in Africa"
              fill
              sizes="(min-width: 768px) 28vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* ── 3. EDITORIAL COPY ── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <div className="max-w-2xl">
          <p className="text-base md:text-xl text-muted font-light leading-relaxed mb-6">
            {t.vision.editorial1}
          </p>
          <p className="text-base md:text-xl font-light leading-relaxed text-foreground">
            {t.vision.editorial2}
          </p>
        </div>
      </div>

      {/* ── 4. WIDE BANNER ── */}
      <div className="mb-20 md:mb-28">
        <div className="relative overflow-hidden aspect-[21/9]">
          <Image
            src="/projects/FotoSkiSuiza.JPG"
            alt="Skiing in Switzerland"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </div>

      {/* ── 5. PULL QUOTE + PORTRAIT ── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto mb-20 md:mb-28">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="w-full md:w-[32%] relative overflow-hidden aspect-[3/4] flex-shrink-0">
            <Image
              src="/projects/fotosnaturaleza/miniormond3 2.jpg"
              alt="Luis Carrasco"
              fill
              sizes="(min-width: 768px) 32vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <blockquote className="border-l border-white/20 pl-6 md:pl-10">
            <p className="text-xl md:text-3xl lg:text-4xl font-extralight leading-tight tracking-tight text-white/80">
              {t.vision.quote}
            </p>
            <cite className="text-[11px] uppercase tracking-[0.3em] text-muted mt-6 block not-italic">
              Luis Carrasco
            </cite>
          </blockquote>
        </div>
      </div>

      {/* ── 6. PHOTO GRID ── */}
      <div className="mb-20 md:mb-28">
        <div className="flex gap-2 md:gap-3">
          {[0, 1, 2].map((col) => (
            <div key={col} className="flex-1 min-w-0 flex flex-col gap-2 md:gap-3">
              {photoGrid
                .filter((_, i) => i % 3 === col)
                .map((photo, i) => (
                  <div
                    key={i}
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
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 7. SERVICES ── */}
      <div className="px-5 md:px-10 max-w-[1400px] mx-auto pb-24 md:pb-32">
        <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-12">
          {t.vision.whatIDo}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {t.vision.services.map((s) => (
            <div key={s.title}>
              <div className="w-8 h-px bg-white/20 mb-5" />
              <h3 className="text-base font-light tracking-tight mb-3 text-white">{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
