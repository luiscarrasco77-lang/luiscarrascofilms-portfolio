"use client";

import { motion } from "framer-motion";

const brands = [
  "TOYOTA",
  "DISNEY",
  "SURFSHARK",
  "HUGEL",
  "LES AIRELLES",
  "MESTIZA",
  "BLOND:ISH",
  "SHIMZA",
  "JOSEPH CAPRIATI",
  "SERGE DEVANT",
];

export default function TrustBanner() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-10 border-y border-white/5 overflow-hidden bg-surface"
    >
      <div className="relative flex">
        <div
          className="flex shrink-0 animate-marquee"
          style={{ gap: "5rem" }}
        >
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={i}
              className="shrink-0 text-[12px] tracking-[0.35em] uppercase text-white/20 font-light"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
