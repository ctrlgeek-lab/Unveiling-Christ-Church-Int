import type { Metadata } from "next";
import { PastStreamsExperience } from "@/components/past-streams-experience";

export const metadata: Metadata = {
  title: "Past Live Streams Archive",
  description:
    "Explore past live stream recordings from Unveiling Christ Church, Oyugis. Sunday Services, Kajimo Crusades, Night Revivals, and Prophetic Worship ministrations.",
  openGraph: {
    title: "Past Live Streams Archive | Unveiling Christ Church",
    description:
      "Explore past live stream recordings from Unveiling Christ Church, Oyugis. Sunday Services, Kajimo Crusades, Night Revivals, and Prophetic Worship ministrations.",
    images: [
      {
        url: "/images/worship.jpg",
        alt: "Unveiling Christ Church live recordings",
      },
    ],
  },
};

export default function PastStreamsPage() {
  return <PastStreamsExperience />;
}
