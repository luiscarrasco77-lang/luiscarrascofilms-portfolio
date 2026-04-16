import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Luis Carrasco Films",
    template: "%s — Luis Carrasco Films",
  },
  description:
    "Turning stories into growth. Cinematic audiovisual production for brands, festivals, and lifestyle content worldwide.",
  authors: [{ name: "Luis Carrasco" }],
  keywords: [
    "cinematography",
    "filmmaker",
    "director",
    "b-roll",
    "travel film",
    "festival aftermovie",
    "commercial production",
    "Luis Carrasco",
  ],
  openGraph: {
    title: "Luis Carrasco Films",
    description:
      "Turning stories into growth. Cinematic production for brands and creators.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground antialiased">
        <Header />
        <PageTransition>
          <main className="w-full min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
