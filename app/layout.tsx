import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://luiscarrascofilms.com"),
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
        <ScrollProgress />
        <Header />
        <PageTransition>
          <main className="w-full min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
