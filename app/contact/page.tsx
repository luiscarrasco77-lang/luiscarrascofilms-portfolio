import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Let's scale your brand through visual storytelling. Get in touch with Luis Carrasco Films.",
};

export default function ContactPage() {
  return <ContactForm />;
}
