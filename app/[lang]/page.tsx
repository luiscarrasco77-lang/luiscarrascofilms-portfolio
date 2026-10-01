import type { Metadata } from "next";
import Hero from "@/components/Hero";
import TrustBanner from "@/components/TrustBanner";
import Stats from "@/components/Stats";
import FeaturedWork from "@/components/FeaturedWork";
import ContactCTA from "@/components/ContactCTA";
import { hasLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "home", "/") : {};
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBanner />
      <Stats />
      <FeaturedWork />
      <ContactCTA />
    </>
  );
}
