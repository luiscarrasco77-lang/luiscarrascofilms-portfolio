"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/locales";

// Closing section of the homepage: location + a direct line to start a project.
export default function ContactCTA() {
  const { t, href } = useI18n();

  return (
    <section className="relative overflow-hidden border-t border-white/5">
      {/* Swiss alpine backdrop, heavily darkened so the copy stays the focus */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/posters/pizol-brand.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-28 md:py-36 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.3em] text-white/50 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-gold/60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
          </span>
          {t.cta.eyebrow}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight leading-[1.1] text-balance mb-6"
        >
          {t.cta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-base text-white/55 font-light leading-relaxed max-w-xl mx-auto mb-12"
        >
          {t.cta.text}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-10"
        >
          <Link
            href={href("/contact")}
            className="group inline-flex items-center gap-4 px-11 py-4 bg-white text-black text-[11px] font-normal uppercase tracking-[0.32em] hover:bg-gold transition-colors duration-500"
          >
            {t.cta.button}
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-[11px] uppercase tracking-[0.2em] text-white/45">
            <a href={CONTACT.phoneHref} className="hover:text-white transition-colors duration-300">
              {CONTACT.phoneDisplay}
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/15" aria-hidden="true" />
            <a href={`mailto:${CONTACT.email}`} className="normal-case tracking-[0.1em] hover:text-white transition-colors duration-300">
              {CONTACT.email}
            </a>
            <span className="hidden sm:block w-px h-3 bg-white/15" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {t.location.short}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
