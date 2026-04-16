import type { Metadata } from "next";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore the portfolio — travel films, festival aftermovies, action sports, and commercial productions by Luis Carrasco Films.",
};

export default function WorkPage() {
  return <Gallery />;
}
