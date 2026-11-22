import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cross,
  HeartHandshake,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { ministries } from "@/data/ministries";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Ministries",
  description:
    "Discover the seven ministry expressions of Unveiling Christ Church in Oyugis, Kenya, and find a place to grow, serve, and belong.",
};

const ministryFacts = [
  { value: "07", label: "Ministry expressions" },
  { value: "01", label: "Shared mission" },
  { value: "You", label: "Belong here" },
];

const heroImages = [
  {
    ministry: ministries.find((ministry) => ministry.slug === "worship"),
    label: "Worship & Creative Arts",
    meta: "01 / Sing",
    className: "col-span-2 aspect-[16/9]",
    sizes: "(max-width: 1023px) 90vw, 38vw",
  },
  {
    ministry: ministries.find((ministry) => ministry.slug === "kids"),
    label: "Next generation",
    meta: "03 / Grow",
    className: "aspect-[4/5]",
    sizes: "(max-width: 1023px) 44vw, 19vw",
  },
  {
    ministry: ministries.find((ministry) => ministry.slug === "crusades-evangelism"),
    label: "Beyond the walls",
    meta: "05 / Go",
    className: "aspect-[4/5]",
    sizes: "(max-width: 1023px) 44vw, 19vw",
  },
];

export default function MinistriesPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="grid-lines absolute inset-0 -z-10 opacity-40" />
        <div className="pointer-events-none absolute -left-40 top-24 -z-10 h-[480px] w-[480px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="shell relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.92fr] lg:gap-12 xl:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-7 bg-blue-400/70" />
                  Ministries · Oyugis, Kenya
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display-xl mt-5 max-w-2xl text-white">
                  One family.
                  <br />
                  <span className="font-editorial font-normal italic text-blue-300">
                    Many gifts.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="lede mt-7 max-w-xl">
                  Seven ministry expressions, one shared mission: to unveil
                  Christ, strengthen His people, and carry His love into Oyugis
                  and beyond.
                </p>
              </Reveal>

              <Reveal delay={210}>
                <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
                  There is a place for your gifts and a people for your season.
                  Explore the ministries below and take the next step toward
                  belonging.
                </p>
              </Reveal>

              <Reveal delay={280}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={siteConfig.primaryCta.href} className="btn btn-primary">
                    {siteConfig.primaryCta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a href="#ministry-index" className="btn btn-ghost">
                    Explore the ministries
                    <ArrowDown className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>

              <Reveal delay={340}>
                <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-white/10 pt-5">
                  {ministryFacts.map((fact) => (
                    <div key={fact.label}>
                      <p className="font-display text-2xl font-semibold tracking-[-0.04em] text-blue-200 md:text-3xl">
                        {fact.value}
                      </p>
                      <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.17em] text-slate-500">
                        {fact.label}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal delay={140}>
              <div className="relative mx-auto w-full max-w-[590px] lg:ml-auto lg:mr-0">
                <div className="pointer-events-none absolute -inset-5 rounded-[2.6rem] bg-blue-500/10 blur-2xl" />
                <div className="relative grid grid-cols-2 gap-3">
                  {heroImages.map((item, index) => {
                    if (!item.ministry) return null;

                    return (
                      <Link
                        key={item.ministry.slug}
                        href={`/ministries/${item.ministry.slug}`}
                        className={`group relative overflow-hidden rounded-[1.45rem] border border-white/12 bg-[#0a0f1c] ${item.className}`}
                      >
                        <Image
                          src={item.ministry.image.src}
                          alt={item.ministry.image.alt}
                          fill
                          priority={index === 0}
                          sizes={item.sizes}
                          style={{ objectPosition: item.ministry.image.position }}
                          className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.035]"
                        />
                        <span className="absolute inset-0 bg-gradient-to-t from-[#05070d]/90 via-[#05070d]/10 to-transparent" />
                        <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
                          <span>
                            <span className="block text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-200/80">
                              {item.meta}
                            </span>
                            <span className="font-display mt-1 block text-sm font-semibold leading-tight text-white sm:text-base">
                              {item.label}
                            </span>
                          </span>
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:bg-white group-hover:text-[#05070d]">
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </span>
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center justify-between gap-4 px-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    One body · Many members
                  </p>
                  <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-200/80">
                    <Cross className="h-3 w-3" />
                    Christ at the centre
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Ministry index ---------------- */}
      <section
        id="ministry-index"
        className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28"
      >
        <div className="pointer-events-none absolute right-0 top-16 h-[420px] w-[420px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">The ministry index</p>
                <h2 className="display-lg mt-4 max-w-2xl text-white">
                  Seven ways to
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    belong.
                  </span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-sm text-sm leading-7 text-slate-400 md:pb-1 md:text-right">
                Select a ministry to meet the people, see the vision, and
                discover your next step.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 space-y-4">
            {ministries.map((ministry, index) => (
              <Reveal key={ministry.slug} delay={index * 55}>
                <Link
                  href={`/ministries/${ministry.slug}`}
                  className="group relative block min-h-[210px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#0a0f1c] transition duration-500 hover:border-blue-300/30 hover:shadow-[0_30px_80px_-46px_rgba(37,99,235,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
                >
                  <Image
                    src={ministry.image.src}
                    alt=""
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1279px) 90vw, 1240px"
                    style={{ objectPosition: ministry.image.position }}
                    className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.035]"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,13,0.98)_0%,rgba(5,7,13,0.92)_33%,rgba(5,7,13,0.54)_64%,rgba(5,7,13,0.14)_100%)]" />
                  <span className="absolute inset-0 bg-gradient-to-t from-[#05070d]/65 via-transparent to-transparent" />
                  <span className="absolute inset-0 bg-blue-950/20 mix-blend-multiply" />
                  <span
                    aria-hidden="true"
                    className="font-display pointer-events-none absolute -bottom-7 right-20 hidden select-none text-[10rem] font-semibold leading-none tracking-[-0.08em] text-white/[0.055] lg:block"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="relative z-10 flex min-h-[210px] items-center justify-between gap-5 p-6 pr-24 md:p-8 md:pr-32">
                    <div className="min-w-0 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="flex h-7 min-w-7 items-center justify-center rounded-full border border-blue-300/25 bg-blue-500/10 px-2 text-[9px] font-semibold tracking-[0.14em] text-blue-200">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
                          {ministry.kicker}
                        </span>
                      </div>
                      <h3 className="font-display mt-4 max-w-2xl text-[clamp(1.85rem,3.35vw,3.25rem)] font-semibold uppercase leading-[0.95] tracking-[-0.045em] text-white">
                        {ministry.name}
                      </h3>
                      <p className="font-editorial mt-2 text-lg italic text-blue-100/90 md:text-xl">
                        {ministry.tagline}
                      </p>
                      <p className="mt-3 line-clamp-2 max-w-xl text-[13px] leading-6 text-slate-300/75 md:text-sm">
                        {ministry.summary}
                      </p>
                    </div>

                    <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col items-center gap-2.5 md:right-8">
                      <span className="hidden text-[8px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:block">
                        Explore
                      </span>
                      <span className="flex h-13 w-13 items-center justify-center rounded-full border border-white/20 bg-white text-[#05070d] shadow-[0_12px_35px_-14px_rgba(0,0,0,0.8)] transition duration-300 group-hover:scale-105 group-hover:border-[#ffd166] group-hover:bg-[#ffd166]">
                        <ArrowUpRight className="h-5 w-5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-blue-300/15 bg-[#07132d] p-7 md:p-10 lg:p-12">
              <div className="grid-lines absolute inset-0 opacity-30" />
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <p className="eyebrow flex items-center gap-3">
                    <HeartHandshake className="h-4 w-4" />
                    You belong here
                  </p>
                  <h2 className="display-md mt-4 max-w-xl text-white">
                    Not sure where to start?
                    <br />
                    <span className="font-editorial italic text-blue-300">
                      Start with a Sunday.
                    </span>
                  </h2>
                  <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                    The best way to discover the life of our church is to meet
                    the people. Join us this Sunday in Oyugis, or reach out and
                    we will help you find the right next step.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                  <Link href={siteConfig.primaryCta.href} className="btn btn-primary">
                    {siteConfig.primaryCta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Talk to us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/10 pt-5 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <span className="flex items-center gap-2">
                  <Users className="h-3.5 w-3.5 text-blue-400" />
                  A family, not a crowd
                </span>
                <span className="hidden h-3 w-px bg-white/10 sm:block" />
                <span>Sunday · 8:00 AM</span>
                <span className="hidden h-3 w-px bg-white/10 sm:block" />
                <span>Oyugis, Homa Bay County</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
