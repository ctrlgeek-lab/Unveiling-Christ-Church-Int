export const siteConfig = {
  name: "Unveiling Christ Church",
  shortName: "UCC",
  tagline: "The city of gladness. Unstoppable grace.",
  description:
    "We exist to unveil Christ's finished work and raise a generation established in grace and faith.",
  founded: "2013",
  pastor: "Pastor Maurice Adero",
  url: "https://unveilingchristchurch.org",
  primaryCta: {
    label: "Plan a Visit",
    href: "/visit",
  },
  secondaryCta: {
    label: "Watch Live",
    href: "/live",
  },
  contact: {
    email: "Unveilingchrist13@gmail.com",
    phone: "",
    location: "Oyugis, Homa Bay County, Kenya",
    address: "P.O. Box 544-40222, Oyugis",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Unveiling+Christ+Church+Oyugis",
  },
  serviceTimes: [
    { day: "Sunday", name: "Sunday Service (Live Streamed)", time: "8:00 AM" },
    { day: "Friday", name: "Friday Kesha (Special Occasions)", time: "As Announced" },
    {
      day: "Saturday",
      name: "Praise & Worship Practice (In-person)",
      time: "2:00 PM",
    },
  ],
  giving: {
    mpesa: [
      { label: "Till Number", value: "5425177" },
      { label: "Paybill Number", value: "522533" },
      { label: "Account Number", value: "8039919" },
      { label: "Account Name", value: "Unveiling Christ Church-Oyugis" },
    ],
  },
  socials: [
    {
      label: "YouTube",
      href: "https://www.youtube.com/channel/UCM_CWE7oAziNuzpMM5-trhw",
      icon: "/brand/social-youtube.svg",
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=100072601657698",
      icon: "/brand/social-facebook.svg",
    },
    {
      label: "WhatsApp",
      href: "https://wa.me/254724227788",
      icon: "/brand/social-whatsapp.svg",
    },
  ],
  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Sermons", href: "/sermons" },
    { label: "Ministries", href: "/ministries" },
    { label: "Events", href: "/events" },
    { label: "Give", href: "/give" },
  ],
};

export type SiteConfig = typeof siteConfig;
