import type { Metadata } from "next";
import { SermonsExperience } from "@/components/sermons-experience";

export const metadata: Metadata = {
  title: "Sermons",
  description:
    "Watch messages from Pastor Maurice Adero at Unveiling Christ Church–Oyugis. Browse the church’s sermon playlist and watch the latest teaching.",
};

export default function SermonsPage() {
  return <SermonsExperience />;
}
