"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";
import { localizePath, locales, splitLocale } from "@/lib/locales";

const navItems = [
  { key: "work", href: "/work" },
  { key: "vision", href: "/vision" },
  { key: "contact", href: "/contact" },
] as const;

function LangToggle({ className = "", large = false }: { className?: string; large?: boolean }) {
  const { lang, switchLang, t } = useI18n();
  const { path } = splitLocale(usePathname());
  return (
    <div role="group" aria-label={t.a11y.language} className={`flex items-center text-[11px] uppercase tracking-[0.2em] ${className}`}>
      {locales.map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span className="text-white/20 mx-1">/</span>}
          {/* Real links (crawlable, hreflang); a plain click also remembers the choice. */}
          <a
            href={localizePath(path, l)}
            hrefLang={l === "de" ? "de-CH" : l}
            lang={l}
            aria-current={lang === l ? "true" : undefined}
            aria-label={{ en: "English", es: "Español", de: "Deutsch" }[l]}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
              e.preventDefault();
              switchLang(l);
            }}
            className={`transition-colors ${large ? "px-3 py-2.5" : ""} ${lang === l ? "text-white" : "text-white/40 hover:text-white/70"}`}
          >
            {l.toUpperCase()}
          </a>
        </span>
      ))}
    </div>
  );
}

export default function Header() {
  const { t, href } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  // Locale-free path ("/de/work" → "/work") for active-link and home checks.
  const path = splitLocale(pathname).path;
  const isHome = path === "/";

  useEffect(() => {
    let last = false;
    const onScroll = () => {
      const s = window.scrollY > 40;
      if (s !== last) {
        last = s;
        setScrolled(s);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation — reset during render when the path
  // changes (React's recommended pattern over a setState-in-effect).
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  // On non-home pages → always show background. On home → show only when scrolled.
  const showBg = !isHome || scrolled;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          showBg
            ? "bg-background/90 backdrop-blur-xl border-b border-white/5"
            : "bg-transparent"
        }`}
      >
        <div className="px-6 md:px-12 lg:px-20 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href={href("/")} className="group">
            <motion.div
              whileHover={{ letterSpacing: "0.1em" }}
              transition={{ duration: 0.3 }}
              className="text-sm md:text-base tracking-[0.18em] whitespace-nowrap transition-all"
            >
              <span className="font-semibold">LUIS CARRASCO</span>
              <span className="text-muted font-light ml-1.5 text-xs md:text-sm">FILMS</span>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={href(item.href)}
                  className={`relative text-[12px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    path === item.href
                      ? "text-white"
                      : "text-white/50 hover:text-white after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-full after:origin-center after:scale-x-0 after:bg-white/40 after:transition-transform after:duration-300 hover:after:scale-x-100"
                  }`}
                >
                  {t.nav[item.key]}
                  {path === item.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-white"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <Link
              href={href("/contact")}
              className="ml-2 px-5 py-2 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-black transition-all duration-300"
            >
              {t.nav.letsWork}
            </Link>
            <LangToggle />
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label={t.a11y.menu}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1 }}
              className="block w-5 h-px bg-white"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="block w-5 h-px bg-white origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile fullscreen nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-12"
          >
            {navItems.map((item, i) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={href(item.href)}
                  className={`text-3xl font-extralight tracking-[0.2em] uppercase ${
                    path === item.href ? "text-white" : "text-white/40"
                  }`}
                >
                  {t.nav[item.key]}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col items-center gap-8"
            >
              <Link
                href={href("/contact")}
                className="mt-4 px-8 py-3 border border-white/20 text-[11px] uppercase tracking-[0.3em] text-white/60"
              >
                {t.nav.letsWork}
              </Link>
              <LangToggle className="text-sm" large />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
