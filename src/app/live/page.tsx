import type { Metadata } from "next";
import { LiveExperience } from "@/components/live-experience";

export const metadata: Metadata = {
  title: "Live Stream · Church Online",
  description:
    "Join Unveiling Christ Church live online from Oyugis, Kenya. Experience uninterrupted worship, revelation of grace, interactive sermon notes, and prayer.",
  openGraph: {
    title: "Live Stream · Church Online | Unveiling Christ Church",
    description:
      "Join Unveiling Christ Church live online from Oyugis, Kenya. Experience uninterrupted worship, revelation of grace, interactive sermon notes, and prayer.",
    images: [
      {
        url: "/images/worship.jpg",
        alt: "Unveiling Christ Church live worship gathering",
      },
    ],
  },
};

export default function LivePage() {
  return <LiveExperience />;
}
