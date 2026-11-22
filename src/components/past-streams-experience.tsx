"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  Eye,
  Play,
  Radio,
  Search,
  Share2,
  X,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import {
  channelConfig,
  pastLiveStreams,
  type LiveStream,
} from "@/data/live-streams";

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

const CATEGORIES = [
  "All",
  "Sunday Service",
  "Crusade & Revival",
  "Worship & Prayer",
  "Youth",
] as const;

export function PastStreamsExperience() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalStream, setActiveModalStream] = useState<LiveStream | null>(
    null,
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const searchInputId = useId();

  useEffect(() => {
    if (!activeModalStream) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveModalStream(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeModalStream]);

  // Filter streams
  const filteredStreams = pastLiveStreams.filter((stream) => {
    const matchesCategory =
      selectedCategory === "All" || stream.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      stream.title.toLowerCase().includes(query) ||
      stream.category.toLowerCase().includes(query) ||
      stream.timeAgo.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const handleCopyShare = async (stream: LiveStream) => {
    try {
      await navigator.clipboard.writeText(stream.url);
      setCopiedId(stream.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05070d]">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="hero-wash absolute inset-0 opacity-80" />
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute -right-24 top-40 h-[38rem] w-[38rem] rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      {/* ---------------- Hero Section ---------------- */}
      <section className="relative pt-28 md:pt-36 pb-12">
        <div className="shell">
          <Reveal>
            <div className="flex items-center gap-3 text-xs">
              <Link
                href="/live"
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Live Broadcast
              </Link>
              <span className="text-slate-600">/</span>
              <span className="text-blue-300 font-medium">
                Past Live Streams Archive
              </span>
            </div>

            <div className="mt-5 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div>
                <span className="eyebrow">Direct Channel Broadcasts</span>
                <h1 className="display-lg mt-3 text-white">
                  Past Live{" "}
                  <span className="font-editorial italic text-blue-300">
                    Streams.
                  </span>
                </h1>
                <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">
                  Watch recorded live broadcasts directly from our sanctuary in
                  Oyugis and outreach crusades across Homa Bay County. Catch every
                  message, prayer session, and worship encounter.
                </p>
              </div>

              {/* YouTube Channel Stats & Links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Link href="/live" className="btn btn-primary">
                  <Radio className="h-4 w-4" />
                  Watch Live Stream
                </Link>

                <a
                  href={channelConfig.streamsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary inline-flex items-center gap-2"
                >
                  <YouTubeMark className="h-4 w-4 text-red-500" />
                  View Channel Streams
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Filters & Search Bar ---------------- */}
      <section className="relative border-y border-white/[0.08] bg-black/40 py-6 sticky top-[84px] z-30 backdrop-blur-xl">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? pastLiveStreams.length
                    : pastLiveStreams.filter((s) => s.category === cat).length;
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "border border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] rounded-full px-1.5 py-0.2 ${
                        isSelected
                          ? "bg-white/25 text-white"
                          : "bg-white/10 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <label htmlFor={searchInputId} className="sr-only">
                Search live streams
              </label>
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                id={searchInputId}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search live streams..."
                className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-2 pl-9 pr-8 text-xs text-slate-200 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Grid of Past Live Streams ---------------- */}
      <section className="relative py-12 md:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-8">
              <span>
                Showing{" "}
                <strong className="text-white font-medium">
                  {filteredStreams.length}
                </strong>{" "}
                of {pastLiveStreams.length} past live broadcasts
              </span>
              <span className="hidden sm:inline">
                Channel ID:{" "}
                <code className="text-blue-300 font-mono">
                  {channelConfig.id}
                </code>
              </span>
            </div>

            {filteredStreams.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-12 text-center">
                <Search className="mx-auto h-8 w-8 text-slate-500" />
                <h3 className="mt-3 text-base font-semibold text-white">
                  No live streams matched your search
                </h3>
                <p className="mt-1 text-xs text-slate-400">
                  Try clearing your query or switching categories.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="mt-4 btn btn-ghost text-xs"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredStreams.map((stream) => (
                  <div
                    key={stream.id}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/30"
                  >
                    {/* Thumbnail Container */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                      <Image
                        src={stream.thumbnail}
                        alt={stream.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Recorded Live Badge */}
                      <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                        Recorded Live
                      </span>

                      {/* Stream Time / Views Badge */}
                      <span className="absolute bottom-3 right-3 rounded-md bg-black/85 px-2 py-0.5 text-[10px] font-medium text-slate-200 backdrop-blur-md">
                        {stream.timeAgo || "Past Stream"}
                      </span>

                      {/* Play overlay button */}
                      <button
                        type="button"
                        onClick={() => setActiveModalStream(stream)}
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50"
                        title="Watch stream in player"
                      >
                        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-xl transform transition-transform group-hover:scale-110">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </span>
                      </button>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-semibold uppercase tracking-wider text-blue-300">
                          {stream.category}
                        </span>
                        {stream.views && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {stream.views} views
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 line-clamp-2 text-sm font-bold text-white group-hover:text-blue-200 transition-colors">
                        {stream.title}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        Speaker: {siteConfig.pastor}
                      </p>

                      {/* Action Links */}
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/[0.06] text-xs">
                        <button
                          type="button"
                          onClick={() => setActiveModalStream(stream)}
                          className="font-medium text-blue-300 hover:text-white inline-flex items-center gap-1"
                        >
                          <Play className="h-3 w-3" />
                          Watch Now
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyShare(stream)}
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white"
                            title="Copy stream link"
                          >
                            {copiedId === stream.id ? (
                              <Check className="h-3.5 w-3.5 text-emerald-400" />
                            ) : (
                              <Share2 className="h-3.5 w-3.5" />
                            )}
                          </button>

                          <a
                            href={stream.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-red-400 hover:text-red-300"
                            title="Open on YouTube"
                          >
                            <YouTubeMark className="h-3.5 w-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------- Dedicated Stream Modal Viewer ---------------- */}
      {activeModalStream && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md">
          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/15 bg-[#070b16] shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-5 py-3.5">
              <div className="flex items-center gap-2 text-xs">
                <span className="rounded-full bg-red-600/90 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  RECORDED BROADCAST
                </span>
                <span className="text-slate-400">{activeModalStream.timeAgo}</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={activeModalStream.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-200 hover:text-white"
                >
                  <YouTubeMark className="h-3.5 w-3.5 text-red-500" />
                  YouTube
                  <ArrowUpRight className="h-3 w-3" />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveModalStream(null)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                  title="Close player"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Video Player 16:9 */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeModalStream.id}?autoplay=1&rel=0`}
                title={activeModalStream.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            {/* Modal Footer Info */}
            <div className="p-5 md:p-6 bg-[#070b16]">
              <div className="flex flex-wrap items-center gap-2 text-xs text-blue-300 font-semibold uppercase tracking-wider">
                <span>{activeModalStream.category}</span>
                {activeModalStream.views && (
                  <>
                    <span>·</span>
                    <span className="text-slate-400 font-normal">
                      {activeModalStream.views} views
                    </span>
                  </>
                )}
              </div>

              <h2 className="mt-2 text-base md:text-lg font-bold text-white">
                {activeModalStream.title}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Live ministration by {siteConfig.pastor} · Unveiling Christ Church,
                Oyugis Sanctuary.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
