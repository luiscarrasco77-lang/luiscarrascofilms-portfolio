import type { Metadata } from "next";
import VisionContent from "@/components/VisionContent";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "The story behind Luis Carrasco Films — from a kid with a camera to a global audiovisual production company.",
};

export default function VisionPage() {
  return <VisionContent />;
}
