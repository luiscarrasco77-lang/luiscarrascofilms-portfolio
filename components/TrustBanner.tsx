"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const brands = [
  "TOYOTA",
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
      className="py-12 border-y border-white/5 overflow-hidden bg-surface"
    >
      <p className="text-center text-[10px] uppercase tracking-[0.4em] text-white/30 mb-8 px-6">
        {t.trust.label}
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
        <div className="flex shrink-0 animate-marquee" style={{ gap: "5rem" }}>
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="shrink-0 text-[12px] tracking-[0.35em] uppercase text-white/25 font-light transition-colors duration-500 hover:text-white/60"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
