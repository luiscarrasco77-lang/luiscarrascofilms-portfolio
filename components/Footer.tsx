"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const footerNav = [
  { key: "work", href: "/work" },
  { key: "vision", href: "/vision" },
  { key: "contact", href: "/contact" },
] as const;

export default function Footer() {
  const { t } = useI18n();
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
            <h3 className="text-lg tracking-[0.15em] mb-4">
              <span className="font-semibold">LUIS CARRASCO</span>
              <span className="text-muted font-light ml-1.5">FILMS</span>
            </h3>
            <p className="text-sm text-muted leading-relaxed max-w-sm">
              {t.footer.tagline}
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-muted mb-6">
              {t.footer.navigate}
            </h4>
            <nav className="flex flex-col gap-4">
              {footerNav.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-300"
                >
                  {t.nav[item.key]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-muted mb-6">
              {t.footer.connect}
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://www.instagram.com/carrascoluis_/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300"
              >
                Instagram
              </a>
              <a
                href="https://www.behance.net/luiscarrasco07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300"
              >
                Behance
              </a>
              <a
                href="mailto:contact@luiscarrascofilms.com"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[11px] text-muted tracking-wider">
            &copy; {currentYear} Luis Carrasco Films. {t.footer.rights}
          </p>
          <p className="text-[11px] text-white/10 tracking-wider">
            {t.footer.crafted}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
