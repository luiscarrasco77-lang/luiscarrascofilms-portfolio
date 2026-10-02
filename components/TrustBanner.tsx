"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const brands = [
  "TOYOTA",
  "PIZOL",
  "STETSON UNIVERSITY",
  "SURFSHARK",
  "HUGEL",
  "LES AIRELLES",
  "HSG ST GALLEN",
  "MESTIZA",
  "BLOND:ISH",
  "SHIMZA",
  "JOSEPH CAPRIATI",
  "SERGE DEVANT",
];

export default function TrustBanner() {
  const { t } = useI18n();
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-14 md:py-16 border-y border-white/[0.06] overflow-hidden bg-surface"
    >
      <p className="flex items-center justify-center gap-4 text-center text-[10px] uppercase tracking-[0.4em] text-white/40 mb-10 px-6">
        <span aria-hidden="true" className="hidden sm:block h-px w-8 bg-gold/50" />
        {t.trust.label}
        <span aria-hidden="true" className="hidden sm:block h-px w-8 bg-gold/50" />
      </p>

      {/* Edge-faded marquee — names dissolve into the background at both ends */}
      <div
        className="relative flex"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex shrink-0 items-center animate-marquee" style={{ gap: "4.5rem" }}>
          {[...brands, ...brands].map((brand, i) => (
            <span key={i} className="flex shrink-0 items-center gap-[4.5rem]">
              <span className="font-display text-2xl md:text-[1.7rem] font-light tracking-[0.12em] uppercase text-white/40 transition-colors duration-500 hover:text-white">
                {brand}
              </span>
              <span aria-hidden="true" className="w-1 h-1 rotate-45 bg-gold/40" />
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
