import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { hasLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "contact", "/contact") : {};
}

export default function ContactPage() {
  return <ContactForm />;
}
