import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/page-placeholder";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Unveiling Christ Church. We would love to hear from you.",
};

export default function ContactPage() {
  return (
    <PagePlaceholder
      eyebrow="Say hello"
      title="Contact"
      headline="We would love"
      accent="to hear from you."
      description="Email us, or join us this Sunday in Oyugis. We would love to hear from you and help you take your next step."
      image="/images/church.jpg"
      imageAlt="Church exterior"
      note={`A contact form is coming soon. For now, email us at ${siteConfig.contact.email}.`}
    />
  );
}
