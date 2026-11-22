import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  HeartHandshake,
  Quote,
  Sparkles,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import {
  getMinistry,
  getMinistryIndex,
  ministries,
} from "@/data/ministries";

export const instant = false;

export function generateStaticParams() {
  return ministries.map((ministry) => ({ slug: ministry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ministry = getMinistry(slug);

  if (!ministry) {
    return {
      title: "Ministry not found",
    };
  }

  return {
    title: ministry.name,
    description: ministry.summary,
    openGraph: {
      title: ministry.name,
      description: ministry.summary,
      images: [
        {
          url: ministry.image.src,
          alt: ministry.image.alt,
        },
      ],
    },
  };
}

const focusIcons = [BookOpen, Sparkles, HeartHandshake];

export default async function MinistryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ministry = getMinistry(slug);

  if (!ministry) {
    notFound();
  }

  const index = getMinistryIndex(ministry.slug);
  const previous =
    ministries[index === 0 ? ministries.length - 1 : index - 1];
  const next =
    ministries[index === ministries.length - 1 ? 0 : index + 1];

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="grid-lines absolute inset-0 -z-10 opacity-40" />
        <div className="pointer-events-none absolute -left-40 top-24 -z-10 h-[480px] w-[480px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="pointer-events-none absolute -right-24 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="shell relative">
          <Reveal>
            <Link
              href="/ministries"
              className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All ministries
            </Link>
          </Reveal>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1fr_0.94fr] lg:gap-14 xl:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-7 bg-blue-400/70" />
                  Ministry {String(index + 1).padStart(2, "0")} /{" "}
                  {String(ministries.length).padStart(2, "0")}
                </p>
              </Reveal>

              <Reveal delay={70}>
                <h1 className="display-lg mt-5 max-w-2xl text-balance text-white">
                  {ministry.name}
                </h1>
              </Reveal>

              <Reveal delay={130}>
                <p className="font-editorial mt-4 text-2xl italic text-blue-300 md:text-3xl">
                  {ministry.tagline}
                </p>
              </Reveal>

              <Reveal delay={190}>
                <p className="lede mt-6 max-w-xl">{ministry.intro}</p>
              </Reveal>

              <Reveal delay={250}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={siteConfig.primaryCta.href} className="btn btn-primary">
                    {siteConfig.primaryCta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Contact us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="relative mx-auto w-full max-w-[580px] lg:ml-auto lg:mr-0">
                <div className="pointer-events-none absolute -inset-5 rounded-[2.7rem] bg-blue-500/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] p-2 shadow-[0_35px_100px_-48px_rgba(0,0,0,0.9)]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.55rem] bg-[#0a0f1c]">
                    <Image
                      src={ministry.image.src}
                      alt={ministry.image.alt}
                      fill
                      priority
                      sizes="(max-width: 1023px) 90vw, 44vw"
                      style={{ objectPosition: ministry.image.position }}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/80 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6">
                      <div>
                        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-200/80">
                          Ministry expression
                        </p>
                        <p className="font-display mt-1 text-lg font-semibold text-white md:text-xl">
                          {ministry.shortName}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="font-display text-5xl font-semibold leading-none tracking-[-0.07em] text-white/20 md:text-6xl"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={180}>
            <div className="mt-14 grid gap-5 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Open to
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200">
                  {ministry.audience}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  At the centre
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200">
                  {ministry.centre}
                </p>
              </div>
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Next step
                </p>
                <p className="mt-2 max-w-xs text-sm leading-6 text-slate-200">
                  Talk with the ministry team and come and see.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Story and focus ---------------- */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="pointer-events-none absolute -right-32 top-10 h-[440px] w-[440px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow">Our heart</p>
                <h2 className="display-lg mt-4 max-w-lg text-white">
                  A place to grow.
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    A people to serve with.
                  </span>
                </h2>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-6 text-[15px] leading-8 text-slate-400">
                {ministry.about.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {ministry.focus.map((item, focusIndex) => {
              const Icon = focusIcons[focusIndex];
              return (
                <Reveal key={item.title} delay={focusIndex * 80}>
                  <article className="group h-full rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 transition-colors hover:border-blue-400/25 hover:bg-white/[0.04]">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                        <Icon className="h-4 w-4 text-blue-300" />
                      </span>
                      <span className="text-[9px] font-semibold tracking-[0.16em] text-slate-600">
                        0{focusIndex + 1}
                      </span>
                    </div>
                    <h3 className="font-display mt-6 text-lg font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {item.body}
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Scripture ---------------- */}
      <section className="relative overflow-hidden border-b border-blue-300/15 bg-[#06122b] py-16 md:py-20">
        <div className="grid-lines absolute inset-0 opacity-25" />
        <div className="pointer-events-none absolute -right-20 -top-16 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="shell relative">
          <div className="grid gap-7 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-300/20 bg-blue-500/10">
              <Quote className="h-5 w-5 text-blue-300" />
            </span>
            <p className="font-editorial max-w-4xl text-2xl italic leading-relaxed text-slate-100 md:text-3xl">
              &ldquo;{ministry.verse.text}&rdquo;
            </p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200/80">
              {ministry.verse.reference}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- Gallery ---------------- */}
      <section className="py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">Life in this ministry</p>
                <h2 className="display-md mt-4 text-white">
                  Serving together.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <p className="max-w-sm text-sm leading-7 text-slate-400 md:pb-1 md:text-right">
                A glimpse of the people and moments that shape this ministry.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-[1.22fr_0.78fr] md:items-stretch">
            <Reveal>
              <figure className="group relative aspect-[16/10] overflow-hidden rounded-[1.7rem] border border-white/10">
                <Image
                  src={ministry.gallery[0].src}
                  alt={ministry.gallery[0].alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 60vw"
                  style={{ objectPosition: ministry.gallery[0].position }}
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#05070d]/85 via-[#05070d]/5 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5 md:p-6">
                  <span className="text-[9px] font-semibold tracking-[0.18em] text-blue-300/80">
                    01
                  </span>
                  <span className="max-w-md text-sm leading-6 text-slate-100">
                    {ministry.gallery[0].caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={120}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-[1.7rem] border border-white/10 md:h-full md:aspect-auto md:min-h-[280px]">
                <Image
                  src={ministry.gallery[1].src}
                  alt={ministry.gallery[1].alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 38vw"
                  style={{ objectPosition: ministry.gallery[1].position }}
                  className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.025]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-[#05070d]/85 via-[#05070d]/5 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end gap-3 p-5">
                  <span className="text-[9px] font-semibold tracking-[0.18em] text-blue-300/80">
                    02
                  </span>
                  <span className="max-w-xs text-sm leading-6 text-slate-100">
                    {ministry.gallery[1].caption}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Get involved ---------------- */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Take the next step</p>
              <h2 className="display-lg mt-4 max-w-md text-white">
                Come and
                <br />
                <span className="font-editorial italic text-blue-300">
                  be part of it.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
                You do not need to have everything figured out. Start by meeting
                the people, asking your questions, and taking one step at a
                time.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={siteConfig.primaryCta.href} className="btn btn-primary">
                  {siteConfig.primaryCta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-3">
              {ministry.involvement.map((item, stepIndex) => (
                <div
                  key={item}
                  className="flex items-start gap-4 rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition-colors hover:border-blue-400/20 hover:bg-white/[0.04]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-[10px] font-semibold tracking-[0.12em] text-blue-300">
                    {String(stepIndex + 1).padStart(2, "0")}
                  </span>
                  <p className="flex-1 pt-1.5 text-sm leading-7 text-slate-200">
                    {item}
                  </p>
                  <Check className="mt-2 h-4 w-4 shrink-0 text-blue-400" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Previous / next ---------------- */}
      <section className="py-12 md:py-16">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/ministries/${previous.slug}`}
              className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition-colors hover:border-blue-400/25 hover:bg-white/[0.04]"
            >
              <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
                Previous ministry
              </span>
              <span className="font-display mt-3 block text-base font-semibold text-white">
                {previous.name}
              </span>
            </Link>
            <Link
              href={`/ministries/${next.slug}`}
              className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 text-left transition-colors hover:border-blue-400/25 hover:bg-white/[0.04] sm:text-right"
            >
              <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:justify-end">
                Next ministry
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="font-display mt-3 block text-base font-semibold text-white">
                {next.name}
              </span>
            </Link>
          </div>
          <div className="mt-6 text-center">
            <Link
              href="/ministries"
              className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/80 transition-colors hover:text-white"
            >
              Back to all ministries
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
