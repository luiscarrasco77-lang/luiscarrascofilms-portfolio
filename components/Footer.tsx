"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
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
              Turning stories into growth. Cinematic audiovisual production for
              brands, festivals, and lifestyle content worldwide.
            </p>
          </div>

          {/* Nav */}
          <div className="md:col-span-3">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-muted mb-6">
              Navigate
            </h4>
            <nav className="flex flex-col gap-4">
              {[
                { name: "Work", href: "/work" },
                { name: "Vision", href: "/vision" },
                { name: "Contact", href: "/contact" },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted hover:text-foreground transition-colors duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Connect */}
          <div className="md:col-span-4">
            <h4 className="text-[11px] uppercase tracking-[0.3em] text-muted mb-6">
              Connect
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
            &copy; {currentYear} Luis Carrasco Films. All rights reserved.
          </p>
          <p className="text-[11px] text-white/10 tracking-wider">
            Crafted with vision
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
