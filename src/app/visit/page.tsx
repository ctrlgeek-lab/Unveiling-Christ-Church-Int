import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Bus,
  Calendar,
  Car,
  Check,
  Clock,
  Coffee,
  Heart,
  HeartHandshake,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Music,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Plan a Visit",
  description:
    "Plan your first visit to Unveiling Christ Church in Oyugis, Homa Bay County. Join us Sunday at 8:00 AM for worship, the Word of Grace, and a community that welcomes you.",
  openGraph: {
    title: "Plan a Visit | Unveiling Christ Church",
    description:
      "Plan your first visit to Unveiling Christ Church in Oyugis, Homa Bay County. Join us Sunday at 8:00 AM.",
    images: [{ url: "/images/church.jpg", alt: "Unveiling Christ Church, Oyugis" }],
  },
};

const whatToExpect = [
  {
    icon: Music,
    title: "Spirited Worship",
    body: "We begin with heartfelt praise and worship that prepares every heart to receive the Word. Come ready to sing.",
  },
  {
    icon: Sparkles,
    title: "The Word of Grace",
    body: "Every message is rooted in the finished work of Jesus Christ — clear, uplifting, and practical for daily life.",
  },
  {
    icon: Users,
    title: "A Welcoming Family",
    body: "You will be warmly received. Our team is ready to welcome you, answer your questions, and help you feel at home.",
  },
  {
    icon: Coffee,
    title: "Fellowship After Service",
    body: "Stick around after the service to meet people, share stories, and become part of what God is building here.",
  },
];

const serviceTimes = [
  {
    day: "Sunday",
    name: "Sunday Celebration Service",
    time: "8:00 AM",
    duration: "Approx. 3½ hours",
    description: "Our main weekly gathering with worship, prayer, and the preaching of the Word of Grace. Also broadcast live on YouTube.",
    badge: "Live Streamed",
    badgeColor: "text-red-300 bg-red-950/40 border-red-500/30",
    recommended: true,
  },
  {
    day: "Friday",
    name: "Friday Kesha / Night Prayer",
    time: "Announced",
    duration: "Overnight vigil",
    description: "Friday night prayer vigils held on special announced occasions and monthly revivals. Check our WhatsApp group for alerts.",
    badge: "Special Occasions",
    badgeColor: "text-amber-300 bg-amber-950/30 border-amber-500/30",
    recommended: false,
  },
  {
    day: "Saturday",
    name: "Praise & Worship Practice",
    time: "2:00 PM",
    duration: "In-person",
    description: "Our worship team gathers to rehearse, pray together, and prepare for Sunday's service.",
    badge: "Worship Team",
    badgeColor: "text-blue-300 bg-blue-950/30 border-blue-400/30",
    recommended: false,
  },
];

const firstVisitTips = [
  "Arrive 10–15 minutes early — our welcome team will greet you at the entrance.",
  "Dress is casual to smart casual. Come comfortable.",
  "Children's activities run alongside the main service — bring the whole family.",
  "Feel free to take notes; our sermons are rich with scripture and insight.",
  "The service is completely free — there is no obligation to give.",
];

const howToGetHere = [
  {
    icon: Car,
    title: "By Road",
    body: "We are located in Oyugis town centre, Homa Bay County. The church is accessible from Kisii, Homa Bay, and Kisumu via the B1 highway.",
  },
  {
    icon: Bus,
    title: "By Public Transport",
    body: "Matatus run regularly between Kisii, Homa Bay, and Oyugis. Alight at Oyugis stage and our church is a short walk from the town centre.",
  },
  {
    icon: MapPin,
    title: "Find Us on Google Maps",
    body: "Search 'Unveiling Christ Church Oyugis' on Google Maps for precise directions and to get walking or driving navigation.",
  },
];

const faqs = [
  {
    q: "What should I wear?",
    a: "Dress code is relaxed — come as you are. Smart casual is perfectly fine. What matters is that you are there.",
  },
  {
    q: "Can I bring my children?",
    a: "Absolutely. Children are welcome in the main service, and we have activities running alongside for younger ones.",
  },
  {
    q: "Do I need to sign up before coming?",
    a: "No, you can simply show up. However, if you would like our team to specifically expect you, send us a WhatsApp message or email in advance.",
  },
  {
    q: "Is the service in English?",
    a: "Yes, our services are primarily in English, with occasional Kiswahili and Dholuo for emphasis.",
  },
  {
    q: "How long does the service last?",
    a: "The Sunday Celebration Service runs approximately 3–3½ hours, from 8:00 AM to around 11:30 AM EAT.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, parking space is available near the church premises in Oyugis town.",
  },
];

export default function VisitPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <Image
          src="/images/church.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/50 via-[#05070d]/75 to-[#05070d]" />
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -left-32 top-24 h-[520px] w-[520px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-20 top-0 h-[480px] w-[480px] rounded-full bg-blue-500/8 blur-[140px]" />

        <div className="shell relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-7 bg-blue-400/70" />
                  Your first visit · Oyugis, Kenya
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display-xl mt-5 max-w-3xl text-white">
                  Come as you are.
                  <br />
                  <span className="font-editorial font-normal italic text-blue-300">
                    Leave with family.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="lede mt-6 max-w-xl">
                  We would love to meet you this Sunday at 8:00 AM in Oyugis, Homa Bay County.
                  There is a place set for you at the table.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={siteConfig.contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </a>
                  <a
                    href={siteConfig.socials.find((s) => s.label === "WhatsApp")?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary inline-flex items-center gap-2"
                  >
                    <Image src="/brand/social-whatsapp.svg" alt="" width={16} height={16} />
                    Let Us Know You&apos;re Coming
                  </a>
                </div>
              </Reveal>

              <Reveal delay={290}>
                <div className="mt-10 grid max-w-sm grid-cols-3 gap-4 border-t border-white/10 pt-6">
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-blue-200 md:text-3xl">
                      2013
                    </p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                      Founded
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-blue-200 md:text-3xl">
                      8 AM
                    </p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                      Sundays
                    </p>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-semibold tracking-tight text-blue-200 md:text-3xl">
                      All
                    </p>
                    <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                      Are Welcome
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="relative mx-auto w-full max-w-md lg:ml-auto lg:mr-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
                  <Image
                    src="/images/community.jpg"
                    alt="The Unveiling Christ Church community gathered together"
                    fill
                    sizes="(max-width: 1024px) 90vw, 44vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/70 via-transparent to-transparent" />
                </div>

                {/* Floating info chip */}
                <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#0a0f1c] px-5 py-4 shadow-xl md:block">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-blue-300">
                    Every Sunday
                  </p>
                  <p className="font-display mt-1 text-sm font-semibold text-white">
                    8:00 AM EAT · Oyugis
                  </p>
                </div>

                {/* Live badge */}
                <div className="absolute -right-4 top-6 hidden rounded-xl border border-red-500/30 bg-red-950/60 px-3.5 py-2 backdrop-blur-md md:block">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-red-200">
                      Live Streamed
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- What to Expect ---------------- */}
      <section className="relative border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/8 blur-[160px]" />
        <div className="shell relative">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow justify-center">What to expect</p>
              <h2 className="display-lg mx-auto mt-4 max-w-2xl text-white">
                A Sunday you won&apos;t{" "}
                <span className="font-editorial italic text-blue-300">forget.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
                From the moment you walk in, our goal is for you to feel welcomed, moved, and
                equipped to live the life God has for you.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whatToExpect.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="group flex flex-col gap-5 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 transition-all duration-300 hover:border-blue-400/25 hover:bg-white/[0.04] hover:-translate-y-1">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-300" />
                    </span>
                    <div>
                      <h3 className="font-display text-base font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Service Schedule ---------------- */}
      <section className="relative py-20 md:py-28">
        <div className="pointer-events-none absolute -right-32 top-20 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[140px]" />
        <div className="shell relative">
          <Reveal>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="eyebrow">Gather with us</p>
                <h2 className="display-lg mt-4 text-white">
                  Service{" "}
                  <span className="font-editorial italic text-blue-300">times.</span>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                  All services are held at our sanctuary in Oyugis, Homa Bay County, Kenya.
                  Sunday services are also broadcast live on YouTube.
                </p>
              </div>
              <Link href="/live" className="btn btn-secondary self-start inline-flex items-center gap-2">
                Watch Live Online
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {serviceTimes.map((service, i) => (
              <Reveal key={service.name} delay={i * 60}>
                <div
                  className={`relative flex flex-col gap-5 overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
                    service.recommended
                      ? "border-blue-400/30 bg-blue-950/20 hover:border-blue-400/50"
                      : "border-white/[0.09] bg-white/[0.025] hover:border-white/20"
                  }`}
                >
                  {service.recommended && (
                    <div className="absolute right-4 top-4">
                      <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-200">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                      <Calendar className="h-4 w-4 text-blue-300" />
                    </span>
                    <div>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${service.badgeColor}`}
                      >
                        {service.badge}
                      </span>
                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {service.day}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {service.name}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-300">
                      <Clock className="h-4 w-4" />
                      <span>{service.time}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs font-normal text-slate-400">{service.duration}</span>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-slate-400">{service.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- First Visit Tips + Photo ---------------- */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-blue-700/8 blur-[140px]" />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/60">
                <Image
                  src="/images/worship.jpg"
                  alt="Congregation in worship at Unveiling Christ Church"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/60 via-transparent to-transparent" />
              </div>
              {/* Floating Scripture chip */}
              <div className="absolute -bottom-4 right-4 max-w-[220px] rounded-2xl border border-white/10 bg-[#0a0f1c]/95 p-4 shadow-xl backdrop-blur-sm md:-right-8">
                <p className="font-editorial text-sm italic leading-relaxed text-blue-100/90">
                  &ldquo;Come, all who are weary.&rdquo;
                </p>
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">
                  Matthew 11:28
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="order-1 lg:order-2">
            <div>
              <p className="eyebrow">Before you arrive</p>
              <h2 className="display-lg mt-4 text-white">
                A few things{" "}
                <span className="font-editorial italic text-blue-300">
                  to know.
                </span>
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                We want your first visit to be easy, warm, and memorable. Here is what to
                expect when you arrive:
              </p>

              <ul className="mt-8 space-y-4">
                {firstVisitTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10">
                      <Check className="h-3 w-3 text-blue-300" />
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={siteConfig.socials.find((s) => s.label === "WhatsApp")?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  <Image src="/brand/social-whatsapp.svg" alt="" width={16} height={16} />
                  Chat With Us First
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="btn btn-ghost inline-flex items-center gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Send an Email
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Location & How to Get Here ---------------- */}
      <section className="relative py-20 md:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[140px]" />
        <div className="shell relative">
          <Reveal>
            <div className="text-center">
              <p className="eyebrow justify-center">Find us</p>
              <h2 className="display-lg mx-auto mt-4 max-w-2xl text-white">
                We are in{" "}
                <span className="font-editorial italic text-blue-300">Oyugis.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-400">
                {siteConfig.contact.address} &mdash; {siteConfig.contact.location}
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {howToGetHere.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 transition-colors hover:border-blue-400/25">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <Icon className="h-5 w-5 text-blue-300" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <div className="mt-8">
              <a
                href={siteConfig.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.04] md:p-6"
              >
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                  <MapPin className="h-6 w-6 text-blue-300" />
                </span>
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-300">
                    Open in Google Maps
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-white">
                    Unveiling Christ Church · Oyugis, Homa Bay County, Kenya
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{siteConfig.contact.address}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blue-300" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- FAQs ---------------- */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-700/8 blur-[140px]" />
        <div className="shell relative grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow">Common questions</p>
              <h2 className="display-lg mt-4 text-white">
                First visit{" "}
                <span className="font-editorial italic text-blue-300">FAQs.</span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                Haven&apos;t found what you&apos;re looking for? We&apos;re happy to answer
                any question directly.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={siteConfig.socials.find((s) => s.label === "WhatsApp")?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary inline-flex items-center gap-2 self-start"
                >
                  <MessageCircle className="h-4 w-4" />
                  Ask on WhatsApp
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="btn btn-ghost inline-flex items-center gap-2 self-start"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 transition-colors hover:border-blue-400/20"
                >
                  <div className="flex items-start gap-3">
                    <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    <div>
                      <p className="font-display font-semibold text-white">{faq.q}</p>
                      <p className="mt-2 text-sm leading-6 text-slate-400">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[160px]" />
        <div className="shell relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070b16] p-8 md:p-12 lg:p-16">
              <div className="grid-lines absolute inset-0 opacity-30" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
                <div>
                  <HeartHandshake className="h-8 w-8 text-blue-300" />
                  <h2 className="display-lg mt-5 max-w-2xl text-white">
                    There is a seat with{" "}
                    <span className="font-editorial italic text-blue-300">your name on it.</span>
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300">
                    We have been expecting you. Whether it&apos;s your first time visiting a
                    church or you are returning after a long season, Unveiling Christ Church is
                    a place of grace, gladness, and belonging.
                  </p>
                </div>

                <div className="flex shrink-0 flex-col gap-3 lg:items-stretch">
                  <a
                    href={siteConfig.contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary !min-h-12 !px-6"
                  >
                    <MapPin className="h-4 w-4" />
                    Get Directions
                  </a>
                  <a
                    href={siteConfig.socials.find((s) => s.label === "WhatsApp")?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary !min-h-12 !px-6 inline-flex items-center gap-2"
                  >
                    <Heart className="h-4 w-4 text-emerald-400" />
                    Send Us a Message
                  </a>
                  <Link href="/live" className="btn btn-ghost !min-h-12 !px-6">
                    Watch Online Instead
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
