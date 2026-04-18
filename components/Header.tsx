"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navItems = [
  { name: "Work", href: "/work" },
  { name: "Vision", href: "/vision" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

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
        <div className="px-8 md:px-32 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <motion.div
              whileHover={{ opacity: 0.75 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3"
            >
              {/* LC monogram */}
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="36" height="36" fill="black"/>
                {/* L */}
                <line x1="8" y1="8" x2="8" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="8" y1="26" x2="16" y2="26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                {/* C */}
                <path d="M28 12 C28 12 20 10 20 18 C20 26 28 24 28 24" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
              </svg>
              <div className="text-sm md:text-base tracking-[0.18em]">
                <span className="font-semibold">LUIS CARRASCO</span>
                <span className="text-muted font-light ml-1.5 text-xs md:text-sm">FILMS</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className={`relative text-[12px] uppercase tracking-[0.22em] transition-colors duration-300 ${
                    pathname === item.href ? "text-white" : "text-white/50 hover:text-white"
                  }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-white"
                    />
                  )}
                </Link>
              </motion.div>
            ))}
            <Link
              href="/contact"
              className="ml-2 px-5 py-2 border border-white/20 text-[11px] uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-black transition-all duration-300"
            >
              Let&apos;s Work
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Menu"
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
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={item.href}
                  className={`text-3xl font-extralight tracking-[0.2em] uppercase ${
                    pathname === item.href ? "text-white" : "text-white/40"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                className="mt-4 px-8 py-3 border border-white/20 text-[11px] uppercase tracking-[0.3em] text-white/60"
              >
                Let&apos;s Work
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
