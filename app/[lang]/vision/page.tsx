import type { Metadata } from "next";
import VisionContent from "@/components/VisionContent";
import { hasLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/vision">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "vision", "/vision") : {};
}

export default function VisionPage() {
  return <VisionContent />;
}
