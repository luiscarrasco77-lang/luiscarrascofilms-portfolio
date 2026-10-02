"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

// Homepage overview of what Luis offers, linking to the full services page.
export default function ServicesTeaser() {
  const { t, href } = useI18n();
  const s = t.services;

  return (
    <section className="px-5 md:px-10 py-24 md:py-32 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-5">
              <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
              {s.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-extralight tracking-tight leading-[1.1] text-balance">{s.homeTitle}</h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:pt-12 flex flex-col items-start gap-8"
          >
            <p className="text-base text-muted leading-relaxed">{s.intro}</p>
            <Link
              href={href("/services")}
              className="group flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70 hover:text-white transition-colors duration-300"
            >
              <span className="relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gold after:transition-transform after:duration-500 group-hover:after:scale-x-100">
                {s.homeLink}
              </span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.25} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/[0.08]">
          {s.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
              viewport={{ once: true }}
              className="group py-9 sm:pr-10 border-b border-white/[0.08]"
            >
              <span className="block text-[11px] tracking-[0.3em] text-gold/80 mb-5">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-lg md:text-xl font-light tracking-tight mb-3 transition-colors duration-500 group-hover:text-gold">
                {item.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed max-w-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
