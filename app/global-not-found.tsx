import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "404 – Luis Carrasco Films",
  robots: { index: false },
};

// Shown for URLs that match no route at all. It renders outside the [lang]
// layout, so it carries its own styles and speaks all three languages.
export default function GlobalNotFound() {
  return (
    <html lang="en" className={geistSans.variable}>
      <body className="antialiased bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
          <Link href="/" className="text-sm tracking-[0.18em] mb-16">
            <span className="font-semibold">LUIS CARRASCO</span>
            <span className="text-muted font-light ml-1.5 text-xs">FILMS</span>
          </Link>
          <p className="text-[11px] uppercase tracking-[0.4em] text-muted mb-6">404</p>
          <h1 className="text-3xl md:text-5xl font-extralight tracking-tight mb-4">Page not found</h1>
          <p className="text-sm text-muted mb-10">Seite nicht gefunden · Página no encontrada</p>
          <Link
            href="/"
            className="px-8 py-3 border border-white/25 text-[11px] uppercase tracking-[0.25em] text-white/80 hover:bg-white hover:text-black transition-all duration-300"
          >
            Home
          </Link>
        </main>
      </body>
    </html>
  );
}
