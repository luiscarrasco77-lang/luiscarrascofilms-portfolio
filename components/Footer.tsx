"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/locales";

const footerNav = [
  { key: "work", href: "/work" },
  { key: "services", href: "/services" },
  { key: "vision", href: "/vision" },
  { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
  const { t, href } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t border-white/5 bg-surface"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Main footer */}
        <div className="py-20 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <p className="mb-5">
              <span className="font-display text-2xl uppercase tracking-[0.12em]">Luis Carrasco</span>
              <span className="ml-2.5 text-[10px] uppercase tracking-[0.5em] text-gold/80">Films</span>
            </p>
            <p className="font-display italic text-lg text-white/60 leading-snug max-w-sm">
              {t.footer.tagline}
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/55">
              <svg className="w-3.5 h-3.5 shrink-0 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              {t.location.based}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-gold/80 mb-6">
              {t.footer.navigate}
            </h4>
            <nav className="flex flex-col gap-4">
              {footerNav.map((item) => (
                <Link
                  key={item.key}
                  href={href(item.href)}
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="text-[10px] uppercase tracking-[0.35em] text-gold/80 mb-6">
              {t.footer.connect}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href={CONTACT.phoneHref}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {CONTACT.phoneDisplay}
              </a>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                WhatsApp
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href={CONTACT.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                Behance
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-300"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-muted tracking-wider">
            &copy; {currentYear} Luis Carrasco Films. {t.footer.rights}
          </p>
          <p className="text-[11px] text-white/30 tracking-[0.2em] uppercase">
            {t.footer.crafted}
          </p>
        </div>
      </div>

      {/* Oversized signature */}
      <div aria-hidden="true" className="overflow-hidden select-none pointer-events-none">
        <p className="font-display font-light uppercase whitespace-nowrap text-center text-[11vw] leading-[0.8] tracking-[0.02em] text-white/[0.04] translate-y-[18%]">
          Luis Carrasco
        </p>
      </div>
    </motion.footer>
  );
}
