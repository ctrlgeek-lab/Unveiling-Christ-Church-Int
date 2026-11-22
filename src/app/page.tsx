import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Clock,
  Heart,
  MapPin,
  Music,
  Play,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { sermons, youtubeWatchUrl } from "@/data/sermons";

const gatherings = [
  {
    icon: Sparkles,
    title: "Sunday Service",
    description:
      "A joyful gathering of worship, prayer, and the Word. Come expectant — there is room for you at the table.",
    detail: "Sundays · 8:00 AM",
  },
  {
    icon: Heart,
    title: "Friday Prayers",
    description:
      "A weekly rhythm of seeking God together for our church, our city, and the nations.",
    detail: "Fridays · 5:00 PM",
  },
  {
    icon: Music,
    title: "Praise & Worship Practice",
    description:
      "Our worship team gathers to rehearse, pray, and prepare for Sunday.",
    detail: "Saturdays · 2:00 PM",
  },
];

const latestSermons = [...sermons]
  .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
  .slice(0, 3);

const ministries = [
  {
    name: "Worship & Creative Arts",
    slug: "worship",
    description:
      "Singers, musicians, and creatives who lead our church into the presence of God.",
    image: "/ministries/worship/worship-1.webp",
  },
  {
    name: "Preaching & Teaching",
    slug: "preaching",
    description:
      "Men and women set apart to study, teach, and proclaim the Word of God.",
    image: "/ministries/preaching/preaching-1.webp",
  },
  {
    name: "Kids Ministry",
    slug: "kids",
    description:
      "A safe, joyful place for children ages 1–12 to discover the love of Jesus.",
    image: "/ministries/kids/kids-1.webp",
  },
  {
    name: "Youth Ministry",
    slug: "youth",
    description:
      "A generation ages 13 and above finding identity, purpose, and friendship in Christ.",
    image: "/ministries/youth/youth-1.webp",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate min-h-[100svh] overflow-hidden noise">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <video
            className="hero-video-mask absolute inset-y-0 right-0 h-full w-full object-cover object-[52%_20%] opacity-[0.78] md:left-auto md:w-[72%] lg:w-[65%] xl:w-[58%] md:object-[50%_15%] md:opacity-[0.88]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/hero-video-poster.jpg"
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="image-vignette pointer-events-none absolute inset-0" />
        <div className="hero-wash pointer-events-none absolute inset-0" />
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />

        <div className="shell relative flex min-h-[100svh] flex-col justify-end pb-10 pt-32 md:pb-14">
          <div className="max-w-4xl">
            <Reveal>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/20 px-4 py-2 backdrop-blur-md">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-300 opacity-70" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-300" />
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-blue-100/90">
                  Unstoppable grace · Oyugis, Kenya
                </span>
              </div>
            </Reveal>

            <Reveal delay={90}>
              <h1 className="display-xl max-w-4xl text-white">
                The city of
                <br />
                <span className="font-editorial italic text-blue-300">
                  gladness.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="lede mt-7 max-w-xl text-slate-200/90">
                We exist to unveil Christ&apos;s finished work and raise a
                generation established in grace and faith.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link href="/visit" className="btn btn-primary">
                  {siteConfig.primaryCta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={siteConfig.secondaryCta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                >
                  <Play className="h-3.5 w-3.5 fill-current" />
                  {siteConfig.secondaryCta.label}
                </a>
                <Link
                  href="/give"
                  className="inline-flex items-center gap-2 px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400 transition-colors hover:text-blue-300"
                >
                  <Heart className="h-3.5 w-3.5" />
                  Give
                </Link>
              </div>
            </Reveal>
          </div>

          <Reveal delay={340}>
            <div className="mt-14 grid gap-5 border-t border-white/12 pt-6 text-[11px] text-slate-300/80 sm:grid-cols-3 md:mt-20">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-blue-300" />
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-slate-500">
                    Sunday service
                  </span>
                  {siteConfig.serviceTimes[0].time}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-blue-300" />
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-slate-500">
                    Find us
                  </span>
                  {siteConfig.contact.location}
                </span>
              </div>
              <div className="flex items-center gap-3 sm:justify-end">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15">
                  <ArrowRight className="h-3.5 w-3.5 rotate-90 text-blue-200" />
                </span>
                <span>
                  <span className="block text-[9px] uppercase tracking-[0.22em] text-slate-500">
                    Come as you are
                  </span>
                  Everyone is welcome
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Welcome ---------------- */}
      <section id="welcome" className="relative overflow-hidden py-24 md:py-32">
        <div className="pointer-events-none absolute -right-40 top-20 h-[520px] w-[520px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative grid items-center gap-14 lg:grid-cols-[1fr_0.95fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Welcome home</p>
              <h2 className="display-lg mt-5 max-w-xl text-white">
                All are welcome.
                <br />
                <span className="font-editorial italic text-blue-300">
                  Come as you are.
                </span>
              </h2>
              <p className="mt-7 max-w-lg text-[15px] leading-8 text-slate-400">
                Come and join this family of Christ. There is a place for
                everyone — a home where grace is real, the Word is taught, and
                every person is valued.
              </p>
              <blockquote className="mt-9 border-l border-blue-400/40 pl-5">
                <p className="font-editorial text-xl italic leading-relaxed text-slate-200 md:text-2xl">
                  “To reap the harvest of the earth by teaching and preaching in
                  the demonstration of the Spirit and of power.”
                </p>
                <cite className="mt-3 block text-[10px] font-semibold uppercase not-italic tracking-[0.18em] text-blue-300/80">
                  1 Corinthians 2:4–5
                </cite>
              </blockquote>
              <Link
                href="/about"
                className="group mt-9 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300"
              >
                Discover our story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[#0a0f1c] p-2 shadow-[0_30px_90px_-35px_rgba(0,0,0,0.9)]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.55rem] bg-[#07101f]">
                  <Image
                    src="/images/pastor-maurice-and-wife-portrait.jpg"
                    alt="Pastor Maurice Adero and his wife at Unveiling Christ Church"
                    fill
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 rounded-[1.55rem] ring-1 ring-inset ring-white/10" />
                </div>
                <div className="flex flex-wrap items-end justify-between gap-5 px-5 pb-3 pt-5">
                  <div>
                    <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                      Lead Pastor
                    </p>
                    <p className="font-display mt-1.5 text-base font-semibold text-white">
                      Pastor Maurice Adero
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    <span>Grace</span>
                    <span className="h-1 w-1 rounded-full bg-blue-400/70" />
                    <span>Family</span>
                    <span className="h-1 w-1 rounded-full bg-blue-400/70" />
                    <span>Purpose</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Gatherings ---------------- */}
      <section id="gatherings" className="relative border-y border-white/[0.07] bg-[#070b14] py-24 md:py-28">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">Gather with us</p>
                <h2 className="display-md mt-4 max-w-lg text-white">
                  There is a rhythm to belonging.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-sm text-sm leading-7 text-slate-400">
                Every week we make space for worship, prayer, and friendship.
                Find the gathering that fits your season.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {gatherings.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="card-hover group h-full rounded-2xl border border-white/[0.09] bg-white/[0.025] p-7">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                        <Icon className="h-5 w-5 text-blue-300" />
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display mt-8 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {item.description}
                    </p>
                    <p className="mt-6 flex items-center gap-2 border-t border-white/[0.08] pt-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-300/90">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {item.detail}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Teachings ---------------- */}
      <section id="teachings" className="py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">Latest teachings</p>
                <h2 className="display-md mt-4 text-white">
                  Truth that changes
                  <br />
                  the way we live.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <Link
                href="/sermons"
                className="group inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-300"
              >
                Browse all sermons
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {latestSermons.map((sermon, i) => (
              <Reveal key={sermon.id} delay={i * 100}>
                <a
                  href={youtubeWatchUrl(sermon.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10">
                    <Image
                      src={sermon.thumbnail}
                      alt={sermon.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/80 via-[#05070d]/10 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-100 backdrop-blur-sm">
                      {sermon.tag}
                    </div>
                    <div className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/30 backdrop-blur-sm transition-colors group-hover:border-blue-300/50 group-hover:bg-blue-500/30">
                      <Play className="ml-0.5 h-4 w-4 fill-white text-white" />
                    </div>
                  </div>
                  <h3 className="font-display mt-5 text-xl font-semibold text-white transition-colors group-hover:text-blue-200">
                    {sermon.shortTitle ?? sermon.title}
                  </h3>
                  <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
                    Sunday Teaching · {sermon.duration}
                  </p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Ministries ---------------- */}
      <section id="ministries" className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">Find your place</p>
              <h2 className="display-md mt-4 text-white">
                Faith grows in
                <span className="font-editorial italic text-blue-300">
                  {" "}
                  community.
                </span>
              </h2>
              <p className="mt-5 text-sm leading-7 text-slate-400">
                You were not made to do life alone. From the worship team to
                outreach in the city, there is a place where your gifts can
                serve and your faith can grow.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ministries.map((ministry, i) => (
              <Reveal key={ministry.name} delay={i * 90}>
                <Link
                  href={`/ministries/${ministry.slug}`}
                  className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 p-6"
                >
                  <Image
                    src={ministry.image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/55 to-[#05070d]/10" />
                  <div className="absolute inset-0 bg-blue-600/0 transition-colors duration-500 group-hover:bg-blue-600/10" />
                  <div className="relative">
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-300/80">
                      0{i + 1}
                    </p>
                    <h3 className="font-display mt-2 text-lg font-semibold leading-snug text-white">
                      {ministry.name}
                    </h3>
                    <p className="mt-2 text-[12px] leading-5 text-slate-400">
                      {ministry.description}
                    </p>
                    <span className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-300 opacity-0 transition-opacity group-hover:opacity-100">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <Link
              href="/ministries"
              className="mt-8 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/80 transition-colors hover:text-white"
            >
              Explore all seven ministries
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Events / Give ---------------- */}
      <section id="events" className="py-24 md:py-32">
        <div className="shell grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <div className="relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] border border-white/10 p-8 md:p-10">
              <Image
                src="/images/interior.jpg"
                alt="Church gathering space"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-[#05070d]/70 to-[#05070d]/30" />
              <div className="relative">
                <p className="eyebrow">What&apos;s coming up</p>
                <h2 className="display-md mt-4 max-w-md text-white">
                  Make room for
                  <span className="font-editorial italic text-blue-300">
                    {" "}
                    encounter.
                  </span>
                </h2>
              </div>
              <div className="relative mt-16 space-y-3">
                <div className="flex items-center gap-4 rounded-xl border border-white/12 bg-black/30 p-4 backdrop-blur-md">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-blue-500/15 text-blue-200">
                    <span className="text-[8px] font-bold uppercase tracking-widest">
                      Nov
                    </span>
                    <span className="font-display text-lg font-semibold leading-none">
                      06
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Worship Night
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      6 November 2026 · 9:00 PM
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-blue-300" />
                </div>
                <div className="flex items-center gap-4 rounded-xl border border-white/12 bg-black/30 p-4 backdrop-blur-md">
                  <div className="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg bg-white/5 text-slate-300">
                    <span className="text-[8px] font-bold uppercase tracking-widest">
                      Dec
                    </span>
                    <span className="font-display text-lg font-semibold leading-none">
                      01
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Life in Christ Crusade
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-400">
                      1–6 December 2026 · Glory after glory
                    </p>
                  </div>
                  <ArrowUpRight className="ml-auto h-4 w-4 text-slate-500" />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative flex h-full min-h-[420px] flex-col justify-between overflow-hidden rounded-[2rem] border border-blue-400/20 bg-gradient-to-br from-blue-600/20 via-[#0a0f1c] to-[#05070d] p-8 md:p-10">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-[80px]" />
              <div className="relative">
                <p className="eyebrow">Partner with the vision</p>
                <h2 className="display-md mt-4 text-white">
                  Generosity
                  <br />
                  builds the
                  <span className="font-editorial italic text-blue-300">
                    {" "}
                    family.
                  </span>
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
                  Your partnership helps us preach the Gospel, disciple families,
                  and serve Oyugis with practical love.
                </p>
              </div>
              <div className="relative mt-12">
                <Link href="/give" className="btn btn-primary w-full sm:w-auto">
                  Give with joy
                  <Heart className="h-4 w-4" />
                </Link>
                <div className="mt-5 space-y-1.5 text-[10px] uppercase tracking-[0.14em] text-slate-500">
                  <p>
                    M-Pesa Till{" "}
                    <span className="font-semibold text-slate-200">5425177</span>
                  </p>
                  <p>
                    Paybill{" "}
                    <span className="font-semibold text-slate-200">522533</span>{" "}
                    · A/C{" "}
                    <span className="font-semibold text-slate-200">8039919</span>
                  </p>
                  <p className="normal-case tracking-[0.08em] text-slate-400">
                    Unveiling Christ Church-Oyugis
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Visit ---------------- */}
      <section id="visit" className="relative overflow-hidden border-t border-white/[0.07] py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[150px]" />
        <div className="shell relative text-center">
          <Reveal>
            <p className="eyebrow justify-center">Your first visit</p>
            <h2 className="display-lg mx-auto mt-5 max-w-3xl text-white">
              Come as you are.
              <br />
              <span className="font-editorial italic text-blue-300">
                Leave with family.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-400">
              We would love to meet you this Sunday at{" "}
              {siteConfig.serviceTimes[0].time}. Tell us you are coming and our
              team will help you find your way.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/visit" className="btn btn-primary">
                Plan a Visit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a
                href={siteConfig.contact.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                <MapPin className="h-4 w-4" />
                Get directions
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
