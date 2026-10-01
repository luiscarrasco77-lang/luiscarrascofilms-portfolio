import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import { hasLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "work", "/work") : {};
}

export default function WorkPage() {
  return <Gallery />;
}
