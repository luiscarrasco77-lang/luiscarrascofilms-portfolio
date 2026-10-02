"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { t, href } = useI18n();
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 pt-24">
      <p className="text-[11px] uppercase tracking-[0.4em] text-muted mb-6">404</p>
      <h1 className="font-display text-4xl md:text-6xl font-light mb-4">{t.notFound.title}</h1>
      <p className="text-sm text-muted max-w-md mb-10">{t.notFound.text}</p>
      <Link
        href={href("/")}
        className="px-8 py-3 border border-white/25 text-[11px] uppercase tracking-[0.25em] text-white/80 hover:bg-white hover:text-black transition-all duration-300"
      >
        {t.notFound.back}
      </Link>
    </section>
  );
}
