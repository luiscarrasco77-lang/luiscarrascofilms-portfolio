"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { allProjects, canonicalVideoId, featuredProjects, type ProjectMedia } from "@/data/projects";
import VideoModal from "@/components/VideoModal";
import { useI18n } from "@/lib/i18n";

// Each name opens the film made with / for them.
const brands: { name: string; video: string }[] = [
  { name: "TOYOTA", video: "commercial-toyota" },
  { name: "PIZOL", video: "commercial-pizol-brand" },
  { name: "STETSON UNIVERSITY", video: "commercial-prince-university" },
  { name: "HSG ST GALLEN", video: "commercial-hsg-long" },
  { name: "DOS LOCOS DE VIAJE", video: "travel-sudafrica-vid" },
  { name: "HUGEL", video: "fest-hugel-vid" },
  { name: "MESTIZA", video: "feat-mestiza" },
  { name: "BLOND:ISH", video: "fest-blondish-vid" },
  { name: "SHIMZA", video: "fest-shimza-vid" },
  { name: "JOSEPH CAPRIATI", video: "feat-capriati" },
  { name: "SERGE DEVANT", video: "fest-serge-vid" },
];

const pool = [...featuredProjects, ...allProjects];
const items = brands
  .map((b) => ({ ...b, project: pool.find((p) => p.id === b.video) }))
  .filter((b): b is { name: string; video: string; project: ProjectMedia } => Boolean(b.project));

export default function TrustBanner() {
  const { t, href } = useI18n();
  const [modal, setModal] = useState<ProjectMedia | null>(null);
  const close = useCallback(() => setModal(null), []);

  return (
    <>
      {modal && (
        <VideoModal
          shareId={modal.id}
          src={modal.src}
          title={modal.title}
          poster={modal.poster}
          embedUrl={modal.embedUrl}
          onClose={close}
        />
      )}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-9 md:py-11 border-y border-white/[0.06] overflow-hidden bg-surface"
      >
        <p className="flex items-center justify-center gap-4 text-center text-[10px] uppercase tracking-[0.4em] text-white/40 mb-7 px-6">
          <span aria-hidden="true" className="hidden sm:block h-px w-8 bg-white/25" />
          {t.trust.label}
          <span aria-hidden="true" className="hidden sm:block h-px w-8 bg-white/25" />
        </p>

        {/* Edge-faded marquee; it pauses under the pointer (or keyboard focus) so names are easy to click */}
        <div
          className="relative flex"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="flex shrink-0 items-center animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
            {[0, 1].map((copy) =>
              items.map(({ name, project }) => (
                <span
                  key={`${copy}-${name}`}
                  aria-hidden={copy === 1 ? true : undefined}
                  className="flex shrink-0 items-center gap-[4.5rem] pr-[4.5rem]"
                >
                  <Link
                    href={href(`/watch/${canonicalVideoId(project)}`)}
                    prefetch={false}
                    tabIndex={copy === 1 ? -1 : undefined}
                    data-cursor="play"
                    onClick={(e) => {
                      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
                      e.preventDefault();
                      setModal(project);
                    }}
                    className="py-2 text-[12px] tracking-[0.35em] uppercase text-white/35 font-light transition-colors duration-300 hover:text-white focus-visible:text-white focus-visible:outline-none"
                  >
                    {name}
                  </Link>
                  <span aria-hidden="true" className="w-1 h-1 rotate-45 bg-white/20" />
                </span>
              ))
            )}
          </div>
        </div>
      </motion.section>
    </>
  );
}
