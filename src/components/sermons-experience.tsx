"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Clock,
  ExternalLink,
  ListVideo,
  Play,
  Quote,
  Radio,
  X,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { pastLiveStreams } from "@/data/live-streams";
import {
  featuredSermon,
  sermonPlaylist,
  sermons,
  youtubeEmbedUrl,
  youtubeWatchUrl,
  type Sermon,
} from "@/data/sermons";

function YouTubeMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
    </svg>
  );
}

export function SermonsExperience() {
  const [activeSermon, setActiveSermon] = useState<Sermon | null>(null);

  useEffect(() => {
    if (!activeSermon) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveSermon(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeSermon]);

  return (
    <>
      <section className="relative isolate overflow-hidden pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="absolute inset-0 -z-10 bg-[#05070d]" />
        <div className="hero-wash absolute inset-0 -z-10 opacity-90" />
        <div className="grid-lines absolute inset-0 -z-10 opacity-60" />
        <div className="pointer-events-none absolute -left-32 top-1/4 -z-10 h-[28rem] w-[28rem] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-0 -z-10 h-[32rem] w-[32rem] rounded-full bg-blue-500/10 blur-[130px]" />

        <div className="shell relative">
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.04fr] lg:gap-12 xl:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow flex items-center gap-3">
                  <span className="h-px w-7 bg-blue-400/70" />
                  Sermons · The City of Gladness
                </p>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="display-xl mt-5 text-white">
                  The Word,
                  <br />
                  <span className="font-editorial font-normal italic text-blue-300">
                    unveiled.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={150}>
                <p className="lede mt-6 max-w-xl">
                  Sit under the teaching of Pastor Maurice Adero — messages
                  rooted in the finished work of Christ, the grace of God, and
                  the life we now have in Him.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                  <a
                    href={youtubeWatchUrl(featuredSermon.id)}
                    onClick={(event) => {
                      event.preventDefault();
                      setActiveSermon(featuredSermon);
                    }}
                    className="btn btn-primary whitespace-nowrap !min-h-12 !px-6"
                    aria-haspopup="dialog"
                  >
                    <Play className="h-4 w-4 fill-current" />
                    Watch the featured message
                  </a>
                  <a
                    href={sermonPlaylist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost whitespace-nowrap !min-h-12 !px-6"
                  >
                    <YouTubeMark className="h-4 w-4" />
                    Open the playlist
                  </a>
                  <Link
                    href="/live/past-streams"
                    className="btn btn-secondary whitespace-nowrap !min-h-12 !px-6 inline-flex items-center gap-2 border-red-500/30 hover:border-red-500/60"
                  >
                    <Radio className="h-4 w-4 text-red-400" />
                    Past Live Streams ({pastLiveStreams.length})
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={290}>
                <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  <span className="inline-flex items-center gap-2 text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.9)]" />
                    {sermons.length} messages
                  </span>
                  <span>New every Sunday</span>
                  <span>Oyugis, Kenya</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={140} className="w-full">
              <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto lg:mr-0">
                <div className="pointer-events-none absolute -inset-5 rounded-[2.6rem] bg-blue-500/10 blur-2xl" />
                <a
                  href={youtubeWatchUrl(featuredSermon.id)}
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveSermon(featuredSermon);
                  }}
                  className="group relative block w-full overflow-hidden rounded-[1.9rem] border border-white/12 bg-white/[0.03] p-2.5 shadow-[0_30px_100px_-40px_rgba(37,99,235,0.6)] transition duration-500 hover:border-blue-300/30"
                  aria-label={`Watch featured message: ${featuredSermon.title}`}
                  aria-haspopup="dialog"
                >
                  <span className="flex items-center justify-between gap-3 px-2 pb-3 pt-1">
                    <span className="inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-100">
                      <span className="h-1 w-1 rounded-full bg-blue-300" />
                      Featured message
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
                      <Clock className="h-3 w-3" />
                      {featuredSermon.duration}
                    </span>
                  </span>

                  <span className="relative block overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0a0f1c]">
                    <span className="relative block aspect-video">
                      <Image
                        src="/images/sermons-hero-pastor.webp"
                        alt="Pastor Maurice Adero ministering at Unveiling Christ Church"
                        fill
                        priority
                        quality={92}
                        sizes="(max-width: 767px) 92vw, (max-width: 1023px) 620px, 600px"
                        className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.012]"
                      />
                    </span>
                  </span>

                  <span className="mt-4 flex flex-col gap-4 px-2 pb-2 sm:flex-row sm:items-end sm:justify-between">
                    <span className="min-w-0">
                      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-200/90">
                        {featuredSermon.tag}
                      </span>
                      <span className="font-display mt-1 block text-[24px] font-semibold leading-[1.04] tracking-[-0.035em] text-white md:text-[28px]">
                        {featuredSermon.shortTitle ?? featuredSermon.title}
                      </span>
                      <span className="font-editorial mt-1 block text-base italic text-blue-100/90">
                        {featuredSermon.subtitle ?? featuredSermon.tag}
                      </span>
                    </span>
                    <span className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-blue-300/25 bg-blue-500/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-100 sm:self-auto">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-[#05070d]">
                        <Play className="ml-0.5 h-3 w-3 fill-current" />
                      </span>
                      Watch now
                    </span>
                  </span>
                </a>

                <div className="mt-4 flex items-center justify-between gap-4 px-1.5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    From the playlist
                  </p>
                  <a
                    href={sermonPlaylist.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[10px] font-medium text-blue-200/80 transition hover:text-white"
                  >
                    Watch on YouTube
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="relative border-y border-white/[0.07] bg-[#070b14]">
        <div className="shell grid gap-5 py-9 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
          <div className="flex items-center gap-3">
            <Quote className="h-4 w-4 text-blue-400/80" />
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-500">
              The word we preach
            </p>
          </div>
          <p className="font-editorial text-lg italic leading-relaxed text-slate-200 md:text-xl">
            “So then faith comes by hearing, and hearing by the word of God.”
          </p>
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300/70">
            Romans 10:17
          </p>
        </div>
      </section>

      <section
        id="library"
        className="relative overflow-hidden bg-[#070b14] py-20 md:py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="shell relative">
          <Reveal>
            <div className="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">The sermon library</p>
                <h2 className="display-md mt-4 max-w-xl text-white">
                  Every message,
                  <br className="hidden sm:block" /> one Christ.
                </h2>
              </div>
              <div className="max-w-sm md:text-right">
                <p className="text-sm leading-7 text-slate-400">
                  Browse the messages gathered in the playlist. Every one is an
                  invitation to see Jesus more clearly.
                </p>
                <a
                  href={sermonPlaylist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200/80 transition hover:text-white"
                >
                  Open the full playlist
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>

          {/* Live Streams Banner */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-r from-red-950/25 via-black/40 to-blue-950/25 p-5 md:p-6 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-600/20 border border-red-500/30 text-red-400">
                  <Radio className="h-5 w-5" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400">
                      Live Broadcast Recordings
                    </span>
                    <span className="rounded-full bg-red-500/20 px-2 py-0.2 text-[9px] font-semibold text-red-300">
                      30 Streams
                    </span>
                  </div>
                  <h3 className="mt-1 text-base font-bold text-white">
                    Looking for full Sunday & Crusade Live Streams?
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-300">
                    Explore our complete channel recordings with uncut worship sessions, revival nights, and prayers.
                  </p>
                </div>
              </div>

              <Link
                href="/live/past-streams"
                className="btn btn-primary whitespace-nowrap self-start sm:self-center !py-2.5 !px-5 text-xs"
              >
                Explore Past Live Streams
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              <ListVideo className="h-3.5 w-3.5 text-blue-300" />
              {sermons.length} curated messages
            </span>
            <p className="hidden text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-600 sm:block">
              New messages every Sunday
            </p>
          </div>

          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-6">
            {sermons.map((sermon, index) => (
              <Reveal
                key={sermon.id}
                delay={(index % 3) * 70}
                className="h-full"
              >
                <a
                  href={youtubeWatchUrl(sermon.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(event) => {
                    event.preventDefault();
                    setActiveSermon(sermon);
                  }}
                  className="group flex h-full flex-col"
                  aria-label={`Watch ${sermon.title}`}
                  aria-haspopup="dialog"
                >
                  <span className="relative block aspect-video overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0a0f1c] shadow-[0_18px_40px_-30px_rgba(0,0,0,0.9)]">
                    <Image
                      src={sermon.thumbnail}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-[#05070d]/60 via-transparent to-transparent opacity-80" />

                    <span className="absolute left-3 top-3 inline-flex h-6 items-center rounded-full border border-white/15 bg-[#05070d]/55 px-2.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md">
                      E{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-3 top-3 inline-flex h-6 items-center gap-1.5 rounded-full border border-white/15 bg-[#05070d]/55 px-2.5 text-[10px] font-medium text-white/90 backdrop-blur-md">
                      <Clock className="h-3 w-3" />
                      {sermon.duration}
                    </span>

                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#05070d]/55 text-white shadow-xl backdrop-blur-md">
                        <Play className="ml-0.5 h-4 w-4 fill-current" />
                      </span>
                    </span>
                    <span className="absolute inset-x-3 bottom-3 translate-y-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-white/75 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      Play message
                    </span>
                  </span>

                  <span className="mt-4 flex flex-1 flex-col">
                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.15em]">
                      <span className="text-blue-300/80">{sermon.tag}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-600" />
                      <span className="text-slate-500">
                        {siteConfig.pastor}
                      </span>
                    </span>
                    <span className="font-display mt-2 line-clamp-3 text-[19px] font-semibold leading-snug tracking-[-0.02em] text-white transition-colors group-hover:text-blue-100">
                      {sermon.title}
                    </span>
                    <span className="mt-auto flex items-center gap-1.5 pt-3 text-[10px] font-medium text-slate-500 transition group-hover:text-blue-200/80">
                      Watch message
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Past Live Streams Section ---------------- */}
      <section className="relative border-t border-white/[0.08] bg-[#05070d] py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="eyebrow flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  Channel Broadcasts · Oyugis Sanctuary
                </p>
                <h2 className="display-sm mt-3 text-white">
                  Recorded Live Streams.
                </h2>
                <p className="mt-2 text-sm text-slate-400 max-w-xl">
                  Watch full, uncut Sunday services, Kajimo crusades, and worship
                  sessions recorded live on our official YouTube channel.
                </p>
              </div>

              <Link
                href="/live/past-streams"
                className="btn btn-primary inline-flex items-center gap-2 self-start"
              >
                <Radio className="h-4 w-4" />
                Browse All 30 Past Live Streams
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pastLiveStreams.slice(0, 4).map((stream) => (
                <div
                  key={stream.id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] transition-all duration-300 hover:border-red-500/40 hover:-translate-y-1"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <Image
                      src={stream.thumbnail}
                      alt={stream.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute top-2.5 left-2.5 rounded-full bg-red-600/90 px-2 py-0.5 text-[9px] font-semibold text-white">
                      Recorded Live
                    </span>
                    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[10px] font-medium text-slate-200">
                      {stream.timeAgo}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-300">
                      {stream.category}
                    </span>
                    <h3 className="mt-1 line-clamp-2 text-xs font-bold text-white group-hover:text-blue-200">
                      {stream.title}
                    </h3>
                    <div className="mt-auto pt-3 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.05]">
                      <span>{stream.views ? `${stream.views} views` : "Oyugis Sanctuary"}</span>
                      <a
                        href={stream.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red-400 hover:text-red-300 inline-flex items-center gap-1 font-medium"
                      >
                        YouTube <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#05070d] py-16 md:py-24">
        <div className="shell">
          <div className="relative overflow-hidden rounded-[2rem] border border-blue-300/15 bg-[#08101f] px-6 py-11 md:px-12 md:py-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-[100px]" />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />
            <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="eyebrow">Keep listening</p>
                <h2 className="display-lg mt-4 max-w-2xl text-white">
                  The word is always{" "}
                  <span className="font-editorial font-normal italic text-blue-300">
                    within reach.
                  </span>
                </h2>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                  New messages are added to the playlist as they are shared.
                  Subscribe on YouTube, or plan your first visit in Oyugis.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
                <a
                  href={sermonPlaylist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !min-h-12 !px-5"
                >
                  <YouTubeMark className="h-4 w-4" />
                  Open the playlist
                </a>
                <Link
                  href={siteConfig.primaryCta.href}
                  className="btn btn-ghost !min-h-12 !px-5"
                >
                  {siteConfig.primaryCta.label}
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {activeSermon && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-[#02040b]/90 backdrop-blur-md"
            onClick={() => setActiveSermon(null)}
            aria-hidden="true"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="sermon-player-title"
            className="dialog-in relative z-10 w-full max-w-5xl"
          >
            <div className="mb-3 flex items-start justify-between gap-4">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300/80">
                  Now playing
                </p>
                <h2
                  id="sermon-player-title"
                  className="font-display mt-1 max-w-3xl text-lg font-semibold leading-snug tracking-[-0.02em] text-white md:text-xl"
                >
                  {activeSermon.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveSermon(null)}
                autoFocus
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white transition hover:border-white/30 hover:bg-white/10"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/12 bg-black shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
              <iframe
                src={youtubeEmbedUrl(activeSermon.id)}
                title={activeSermon.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">
                {siteConfig.pastor}
                <span className="mx-2 text-slate-700">·</span>
                {activeSermon.duration}
              </p>
              <a
                href={youtubeWatchUrl(activeSermon.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-200/80 transition hover:text-white"
              >
                Open on YouTube
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
