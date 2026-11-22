import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Unveiling Christ Church handles personal information.",
};

export default function PrivacyPage() {
  return (
    <PagePlaceholder
      eyebrow="Your information"
      title="Privacy Policy"
      headline="Your privacy"
      accent="matters."
      description="Our privacy policy is being prepared. We are committed to handling personal information with care, respect, and transparency."
      image="/images/interior.jpg"
      imageAlt="Church interior"
    />
  );
}
