import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import Cursor from "@/components/Cursor";
import { LanguageProvider } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, locales } from "@/lib/locales";
import { businessJsonLd, jsonLdScript, siteMetadata } from "@/lib/seo";

// Jost (geometric sans) for UI and body; Cormorant Garamond for editorial display type.
const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Pre-render every page for every language. Any other language segment 404s
// (notFound below); the proxy only ever routes en / es / de here anyway.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#070707",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? siteMetadata(lang) : {};
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html
      lang={lang === "de" ? "de-CH" : lang}
      className={`${jost.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(businessJsonLd(lang)) }}
        />
        <LanguageProvider lang={lang} dict={dict}>
          <ScrollProgress />
          <Header />
          <PageTransition>
            <main className="w-full min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
          <Cursor />
        </LanguageProvider>
        {/* Site-wide film grain — a static tile, no animation, ignores the pointer */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[70] opacity-[0.035]"
          style={{ backgroundImage: GRAIN }}
        />
      </body>
    </html>
  );
}
