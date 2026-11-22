import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Administrator Dashboard | Unveiling Christ Church",
  description:
    "Manage sermons, events, church announcements, prayer requests, and website settings for Unveiling Christ Church.",
  robots: {
    index: false,
    follow: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

// Next.js 16: Ensure admin route is dynamic and not statically prerendered
export const instant = false;

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#05070d] text-slate-100 antialiased selection:bg-blue-500/30">
      {children}
    </div>
  );
}
