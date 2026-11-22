"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useState, useSyncExternalStore } from "react";
import {
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  ExternalLink,
  Heart,
  HeartHandshake,
  Maximize2,
  Minimize2,
  Play,
  Radio,
  Send,
  Share2,
  Sparkles,
  Volume2,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";
import { submitPrayerRequest } from "@/app/actions/church-actions";
import {
  channelConfig,
  latestLiveStream,
  pastLiveStreams,
  type LiveStream,
} from "@/data/live-streams";

function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

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

type ServiceSchedule = {
  dayName: string;
  hour: number; // 24-hr format EAT
  minute: number;
  durationMinutes: number;
  title: string;
  description: string;
  tag: string;
};

const SUNDAY_SERVICE: ServiceSchedule = {
  dayName: "Sunday",
  hour: 8,
  minute: 0,
  durationMinutes: 210, // 3.5 hrs -> ends 11:30 AM EAT
  title: "Sunday Celebration Service",
  description:
    "Live ministration of the Word of Grace, spirited worship, and communion from Oyugis Sanctuary.",
  tag: "Weekly Live Broadcast",
};

const BROADCAST_SCHEDULE = [
  {
    dayName: "Every Sunday",
    time: "8:00 AM EAT",
    title: "Sunday Celebration Service",
    type: "Weekly Live Broadcast",
    description:
      "Our consistent weekly sanctuary live stream. Experience worship, intercession, and the preaching of the Word of Grace.",
    badge: "Consistent Weekly Broadcast",
    isWeekly: true,
  },
  {
    dayName: "Friday (Periodic)",
    time: "Kesha / Night Vigil",
    title: "Friday Kesha & All-Night Prayer",
    type: "Special Occasions",
    description:
      "Friday night prayer vigils are broadcast live on special announced occasions and monthly revivals. Check our channel and WhatsApp alerts.",
    badge: "Streamed on Special Occasions",
    isWeekly: false,
  },
  {
    dayName: "Crusades",
    time: "Multi-Day Campaigns",
    title: "Outreach Crusades & Revivals",
    type: "Field Broadcasts",
    description:
      "Outdoor gospel campaigns across Homa Bay County (e.g. Kajimo Crusade). Broadcast live during active crusade dates.",
    badge: "Field Revival Coverage",
    isWeekly: false,
  },
];

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  targetService: ServiceSchedule;
  isLive: boolean;
};

let clockNow = Date.now();
let clockTimer: ReturnType<typeof setInterval> | null = null;
const clockListeners = new Set<() => void>();

function subscribeToClock(listener: () => void) {
  clockListeners.add(listener);

  if (!clockTimer) {
    clockTimer = setInterval(() => {
      clockNow = Date.now();
      clockListeners.forEach((notify) => notify());
    }, 1000);
  }

  return () => {
    clockListeners.delete(listener);

    if (clockListeners.size === 0 && clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  };
}

function getClockSnapshot() {
  return clockNow;
}

function getServerClockSnapshot() {
  return 0;
}

function subscribeToSavedNotes(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);

  return () => window.removeEventListener("storage", onStoreChange);
}

function getSavedNotesSnapshot() {
  try {
    return localStorage.getItem("ucc_live_notes") ?? "";
  } catch {
    return "";
  }
}

function getServerSavedNotesSnapshot() {
  return "";
}

const countdownPlaceholder: Countdown = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  targetService: SUNDAY_SERVICE,
  isLive: false,
};

function getNextSundayServiceStatus(now: Date = new Date()): Countdown {
  // Current time in Africa/Nairobi (EAT = UTC+3)
  const eatString = now.toLocaleString("en-US", {
    timeZone: "Africa/Nairobi",
  });
  const eat = new Date(eatString);
  const currentDay = eat.getDay(); // 0 = Sunday
  const currentHours = eat.getHours();
  const currentMins = eat.getMinutes();
  const currentTimeInMinutes = currentHours * 60 + currentMins;

  const serviceStartMinutes = 8 * 60; // 8:00 AM (480 mins)
  const serviceEndMinutes = serviceStartMinutes + SUNDAY_SERVICE.durationMinutes; // 11:30 AM (690 mins)

  // 1. Check if currently LIVE (Sunday 8:00 AM - 11:30 AM EAT)
  if (
    currentDay === 0 &&
    currentTimeInMinutes >= serviceStartMinutes &&
    currentTimeInMinutes < serviceEndMinutes
  ) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      targetService: SUNDAY_SERVICE,
      isLive: true,
    };
  }

  // 2. Calculate remaining time until next Sunday 8:00 AM EAT
  let daysAhead = (7 - currentDay) % 7;
  if (currentDay === 0 && currentTimeInMinutes >= serviceEndMinutes) {
    daysAhead = 7; // Sunday service is over for today; next is in 7 days
  } else if (currentDay === 0 && currentTimeInMinutes < serviceStartMinutes) {
    daysAhead = 0; // It's early Sunday morning before 8:00 AM!
  }

  const targetDate = new Date(eat);
  targetDate.setDate(eat.getDate() + daysAhead);
  targetDate.setHours(8, 0, 0, 0);

  const diffMs = targetDate.getTime() - eat.getTime();
  const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;

  return {
    days,
    hours,
    minutes,
    seconds,
    targetService: SUNDAY_SERVICE,
    isLive: false,
  };
}

export function LiveExperience() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const now = useSyncExternalStore(
    subscribeToClock,
    getClockSnapshot,
    getServerClockSnapshot,
  );
  const countdown =
    now === 0
      ? countdownPlaceholder
      : getNextSundayServiceStatus(new Date(now));

  const previousSundayStream =
    pastLiveStreams.find((s) => s.category === "Sunday Service") ?? latestLiveStream;
  const [activeVideo, setActiveVideo] = useState<LiveStream>(previousSundayStream);
  const [theaterMode, setTheaterMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "prayer" | "give">(
    "notes",
  );

  // Notes state. Saved notes are read after hydration; a local draft takes
  // over as soon as the user starts typing.
  const storedNotes = useSyncExternalStore(
    subscribeToSavedNotes,
    getSavedNotesSnapshot,
    getServerSavedNotesSnapshot,
  );
  const [notesDraft, setNotesDraft] = useState<string | null>(null);
  const userNotes = notesDraft ?? storedNotes;
  const [notesCopied, setNotesCopied] = useState(false);

  // Prayer state
  const [prayerName, setPrayerName] = useState("");
  const [prayerRequest, setPrayerRequest] = useState("");
  const [isConfidential, setIsConfidential] = useState(false);
  const [prayerSent, setPrayerSent] = useState(false);

  // Giving copy state
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Share state
  const [shared, setShared] = useState(false);

  // Unique IDs for accessibility
  const prayerNameId = useId();
  const prayerRequestId = useId();
  const confidentialId = useId();
  const userNotesId = useId();

  const handleNotesChange = (value: string) => {
    setNotesDraft(value);
    try {
      localStorage.setItem("ucc_live_notes", value);
    } catch {
      // ignore
    }
  };

  const copyNotes = async () => {
    const formatted = `UNVEILING CHRIST CHURCH — LIVE SERVICE NOTES
Date: ${new Date().toLocaleDateString("en-KE", { dateStyle: "full" })}
Message: ${activeVideo.title}
Speaker: ${siteConfig.pastor}

--- KEY SCRIPTURES ---
• Romans 8:31-39: "If God is for us, who can be against us?"
• Galatians 2:20: "I have been crucified with Christ; it is no longer I who live, but Christ lives in me."
• Ephesians 2:8-9: "For by grace you have been saved through faith, and that not of yourselves; it is the gift of God."

--- MY NOTES ---
${userNotes.trim() || "(No personal notes added)"}

---
Unveiling Christ Church · Oyugis, Kenya
https://unveilingchristchurch.org/live`;

    try {
      await navigator.clipboard.writeText(formatted);
      setNotesCopied(true);
      setTimeout(() => setNotesCopied(false), 2400);
    } catch {
      // ignore
    }
  };

  const downloadNotes = () => {
    const formatted = `UNVEILING CHRIST CHURCH — LIVE SERVICE NOTES
Date: ${new Date().toLocaleDateString("en-KE", { dateStyle: "full" })}
Message: ${activeVideo.title}
Speaker: ${siteConfig.pastor}

--- KEY SCRIPTURES ---
• Romans 8:31-39
• Galatians 2:20
• Ephesians 2:8-9

--- MY NOTES ---
${userNotes.trim() || "(No personal notes added)"}
`;
    const blob = new Blob([formatted], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `UCC-Notes-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `${siteConfig.name} Live Online`,
      text: `Join us live online for worship and the Word at Unveiling Christ Church!`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // fallback
      }
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch {
      // ignore
    }
  };

  const handlePrayerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prayerRequest.trim()) return;

    // Persist to Supabase backend
    await submitPrayerRequest({
      name: prayerName.trim() || undefined,
      request: prayerRequest.trim(),
      isConfidential,
    });

    const text = `*PRAYER REQUEST - UNVEILING CHRIST CHURCH ONLINE*
*Name:* ${prayerName.trim() || "Anonymous Online Visitor"}
*Confidential:* ${isConfidential ? "Yes (Pastoral Team Only)" : "No"}
*Request:*
${prayerRequest.trim()}

_Submitted via UCC Live Experience_`;

    const encoded = encodeURIComponent(text);
    // Open church WhatsApp prayer contact
    window.open(`https://wa.me/254724227788?text=${encoded}`, "_blank");
    setPrayerSent(true);
    setTimeout(() => {
      setPrayerRequest("");
      setPrayerSent(false);
    }, 4000);
  };

  const mpesaTill = siteConfig.giving.mpesa.find((i) =>
    i.label.toLowerCase().includes("till"),
  );
  const mpesaPaybill = siteConfig.giving.mpesa.find((i) =>
    i.label.toLowerCase().includes("paybill"),
  );
  const mpesaAcc = siteConfig.giving.mpesa.find((i) =>
    i.label.toLowerCase().includes("account number"),
  );

  return (
    <div
      className={`relative min-h-screen transition-colors duration-700 ${
        theaterMode ? "bg-[#020306]" : "bg-[#05070d]"
      }`}
    >
      {/* ---------------- Background atmosphere ---------------- */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="hero-wash absolute inset-0 opacity-80" />
        <div className="grid-lines absolute inset-0 opacity-40" />
        <div className="absolute -left-40 top-20 h-[36rem] w-[36rem] rounded-full bg-blue-600/10 blur-[140px]" />
        <div className="absolute -right-24 top-40 h-[38rem] w-[38rem] rounded-full bg-blue-500/10 blur-[150px]" />
      </div>

      {/* ---------------- Header Banner / Status Bar ---------------- */}
      <section className="relative pt-28 md:pt-36">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  {countdown.isLive ? (
                    <span className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-red-300">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                      </span>
                      LIVE BROADCAST IN SESSION
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/25 bg-blue-500/10 px-3.5 py-1 text-xs font-medium tracking-wider text-blue-200">
                      <Radio className="h-3.5 w-3.5 text-blue-400" />
                      CHURCH ONLINE · OYUGIS
                    </span>
                  )}

                  <span className="text-xs text-slate-400">
                    East Africa Time (EAT · UTC+3)
                  </span>
                </div>

                <h1 className="display-lg mt-4 text-white">
                  Experience{" "}
                  <span className="font-editorial italic text-blue-300">
                    Church Online.
                  </span>
                </h1>
                <p className="mt-2 max-w-2xl text-base text-slate-300 md:text-lg">
                  Wherever you are across Kenya and the nations, join our family
                  for uninterrupted worship, revelation of grace, and heartfelt
                  prayer.
                </p>
              </div>

              {/* Countdown or Live Pill */}
              <div className="flex flex-col sm:items-end">
                {countdown.isLive ? (
                  <div className="rounded-2xl border border-red-500/30 bg-red-950/30 p-4 text-right backdrop-blur-md">
                    <p className="text-xs font-semibold uppercase tracking-wider text-red-300">
                      Now Broadcasting Live
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      {countdown.targetService?.title}
                    </p>
                    <p className="text-xs text-red-200/80">
                      Streaming from Oyugis Sanctuary
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md">
                    <div className="flex items-center justify-between gap-4 text-xs font-medium text-slate-400">
                      <span>NEXT BROADCAST:</span>
                      <span className="font-semibold text-blue-300">
                        {countdown.targetService?.dayName} ·{" "}
                        {countdown.targetService?.title}
                      </span>
                    </div>

                    {mounted ? (
                      <div className="mt-3 grid grid-cols-4 gap-2 text-center">
                        <div className="rounded-xl border border-white/5 bg-black/40 px-3 py-2">
                          <span className="font-display text-xl font-bold text-white md:text-2xl">
                            {String(countdown.days).padStart(2, "0")}
                          </span>
                          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                            Days
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-black/40 px-3 py-2">
                          <span className="font-display text-xl font-bold text-white md:text-2xl">
                            {String(countdown.hours).padStart(2, "0")}
                          </span>
                          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                            Hours
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-black/40 px-3 py-2">
                          <span className="font-display text-xl font-bold text-white md:text-2xl">
                            {String(countdown.minutes).padStart(2, "0")}
                          </span>
                          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                            Mins
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/5 bg-black/40 px-3 py-2">
                          <span className="font-display text-xl font-bold text-blue-300 md:text-2xl">
                            {String(countdown.seconds).padStart(2, "0")}
                          </span>
                          <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                            Secs
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-3 h-14 w-60 animate-pulse rounded-xl bg-white/5" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Main Stream Console & Interactive Companion ---------------- */}
      <section className="relative mt-8 pb-16 md:mt-12 md:pb-24">
        <div className="shell">
          <div
            className={`grid gap-8 transition-all duration-500 ${
              theaterMode ? "lg:grid-cols-1" : "lg:grid-cols-[1.55fr_1fr]"
            }`}
          >
            {/* Left: Countdown Screen + Previous Sunday Stream Video Player */}
            <div className="space-y-6">
              {/* ---------------- 1. Kickoff Countdown Display Screen ---------------- */}
              <div className="group relative overflow-hidden rounded-2xl border border-red-500/25 bg-black shadow-2xl shadow-blue-950/30">
                <div className="relative aspect-[16/8] sm:aspect-[16/7] w-full overflow-hidden bg-gradient-to-b from-[#091122] via-[#050811] to-black p-4 sm:p-6 md:p-8 text-center flex flex-col justify-between">
                  <Image
                    src="/images/worship.jpg"
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="pointer-events-none object-cover opacity-20"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#05070d]/70 to-[#05070d]/95" />
                  <div className="grid-lines pointer-events-none absolute inset-0 opacity-30" />

                  {/* Header inside countdown screen */}
                  <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-left">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/40 bg-red-950/50 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-red-200 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                      </span>
                      {countdown.isLive ? "BROADCAST IN SESSION" : "LIVE STREAM KICKOFF"}
                    </span>
                    <span className="text-[10px] sm:text-xs text-slate-400 font-medium">
                      Every Sunday · 8:00 AM EAT (UTC+3)
                    </span>
                  </div>

                  {/* Center Countdown Display */}
                  <div className="relative z-10 my-auto py-2">
                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.22em] text-blue-300">
                      The City of Gladness · Sanctuary Broadcast
                    </p>
                    <h3 className="font-display text-base sm:text-2xl md:text-3xl font-extrabold text-white mt-1">
                      {countdown.isLive
                        ? "Sunday Service Is Broadcasting Live Now!"
                        : "Sunday Service Kickoff In:"}
                    </h3>

                    {/* Big Digital Countdown Clock */}
                    {mounted ? (
                      <div className="mt-3 sm:mt-4 grid grid-cols-4 gap-2 sm:gap-3.5 max-w-lg mx-auto">
                        <div className="rounded-xl border border-white/10 bg-black/60 p-2 sm:p-3 backdrop-blur-md shadow-lg shadow-black/50">
                          <span className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
                            {String(countdown.days).padStart(2, "0")}
                          </span>
                          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                            Days
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/60 p-2 sm:p-3 backdrop-blur-md shadow-lg shadow-black/50">
                          <span className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
                            {String(countdown.hours).padStart(2, "0")}
                          </span>
                          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                            Hours
                          </span>
                        </div>
                        <div className="rounded-xl border border-white/10 bg-black/60 p-2 sm:p-3 backdrop-blur-md shadow-lg shadow-black/50">
                          <span className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-white">
                            {String(countdown.minutes).padStart(2, "0")}
                          </span>
                          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-slate-400 mt-0.5">
                            Mins
                          </span>
                        </div>
                        <div className="rounded-xl border border-red-500/25 bg-red-950/40 p-2 sm:p-3 backdrop-blur-md shadow-lg shadow-red-950/50">
                          <span className="font-display text-xl sm:text-3xl md:text-4xl font-extrabold text-red-300">
                            {String(countdown.seconds).padStart(2, "0")}
                          </span>
                          <span className="block text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider text-red-300/80 mt-0.5">
                            Secs
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="mt-4 h-16 w-72 max-w-full mx-auto animate-pulse rounded-xl bg-white/5" />
                    )}
                  </div>

                  {/* Actions inside countdown screen */}
                  <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
                    <a
                      href="#previous-sunday-stream"
                      className="btn btn-primary !py-1.5 !px-3.5 text-xs font-semibold shadow-lg shadow-blue-600/30 inline-flex items-center gap-1.5"
                    >
                      <Play className="h-3 w-3 fill-current" />
                      Watch Below (Previous Sunday Service)
                    </a>
                    <a
                      href={channelConfig.streamsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary !py-1.5 !px-3.5 text-xs font-semibold inline-flex items-center gap-1.5"
                    >
                      <YouTubeMark className="h-3 w-3 text-red-500" />
                      Set YouTube Reminder
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* ---------------- 2. Previous Sunday's Live Stream Display Screen (Player) ---------------- */}
              <div
                id="previous-sunday-stream"
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-blue-950/30"
              >
                {/* Header Bar above player */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] bg-[#070b16] px-4 py-2.5 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/15 border border-blue-400/30 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                      <Play className="h-2.5 w-2.5 fill-current text-blue-400" />
                      Previous Sunday&apos;s Live Stream
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {activeVideo.timeAgo || "Latest Sunday Service"}
                    </span>
                  </div>

                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Oyugis Sanctuary Broadcast
                  </span>
                </div>

                {/* 16:9 Video Container */}
                <div className="relative aspect-video w-full bg-[#03060c]">
                  <iframe
                    src={youtubeEmbedUrl(activeVideo.id)}
                    title={activeVideo.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </div>

                {/* Player Toolbar Under Video */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08] bg-[#070b16] px-4 py-3 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-blue-500/10 px-2.5 py-1 font-medium text-blue-300">
                      <Volume2 className="h-3.5 w-3.5" />
                      HD Audio & Video
                    </span>
                    <span className="text-slate-400">
                      Speaker:{" "}
                      <strong className="text-white font-medium">
                        {siteConfig.pastor}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setTheaterMode(!theaterMode)}
                      className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                      title={
                        theaterMode ? "Exit theater mode" : "Enter theater mode"
                      }
                    >
                      {theaterMode ? (
                        <>
                          <Minimize2 className="h-3.5 w-3.5" />
                          Normal View
                        </>
                      ) : (
                        <>
                          <Maximize2 className="h-3.5 w-3.5" />
                          Theater Mode
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleShare}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-slate-300 transition-colors hover:border-white/20 hover:text-white"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      {shared ? "Link Copied!" : "Share"}
                    </button>

                    <a
                      href={youtubeWatchUrl(activeVideo.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-red-600/90 px-3 py-1 font-medium text-white transition-colors hover:bg-red-500"
                    >
                      <YouTubeMark className="h-3.5 w-3.5" />
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>


              {/* Title & Metadata Card */}
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-500/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
                    {activeVideo.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Clock className="h-3.5 w-3.5" />
                    {activeVideo.timeAgo || "Live Stream Recording"}
                  </span>
                </div>

                <h2 className="mt-3 text-xl font-bold text-white md:text-2xl">
                  {activeVideo.title}
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Preached live at Unveiling Christ Church, Oyugis. Unveiling the
                  revelation of the finished work of Jesus Christ, justification
                  by faith, and effortless reigning in life through abundant
                  grace.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/[0.07] pt-4 text-xs text-slate-400">
                  <span>
                    Location:{" "}
                    <strong className="text-slate-200">
                      {siteConfig.contact.location}
                    </strong>
                  </span>
                  <span>·</span>
                  <span>
                    Live Fellowship WhatsApp:{" "}
                    <a
                      href={
                        siteConfig.socials.find((s) => s.label === "WhatsApp")
                          ?.href
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300"
                    >
                      Chat with Us
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Companion Console (Tabs: Notes, Prayer, Give) */}
            <div className="flex flex-col">
              <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#070b16] shadow-xl">
                {/* Tab Selectors */}
                <div className="grid grid-cols-3 border-b border-white/[0.08] bg-black/40">
                  <button
                    type="button"
                    onClick={() => setActiveTab("notes")}
                    className={`flex items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-wider transition-all ${
                      activeTab === "notes"
                        ? "border-b-2 border-blue-400 bg-white/[0.04] text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sparkles className="h-3.5 w-3.5 text-blue-400" />
                    NOTES
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("prayer")}
                    className={`flex items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-wider transition-all ${
                      activeTab === "prayer"
                        ? "border-b-2 border-blue-400 bg-white/[0.04] text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <HeartHandshake className="h-3.5 w-3.5 text-amber-400" />
                    PRAYER
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("give")}
                    className={`flex items-center justify-center gap-2 py-3.5 text-xs font-semibold tracking-wider transition-all ${
                      activeTab === "give"
                        ? "border-b-2 border-blue-400 bg-white/[0.04] text-white"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Heart className="h-3.5 w-3.5 text-rose-400" />
                    GIVING
                  </button>
                </div>

                {/* Tab 1: Sermon Notes & Interactive Scratchpad */}
                {activeTab === "notes" && (
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Interactive Sermon Notes
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={copyNotes}
                          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:text-white"
                          title="Copy notes to clipboard"
                        >
                          {notesCopied ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-400" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              Copy
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={downloadNotes}
                          className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300 hover:text-white"
                          title="Download notes file"
                        >
                          <Download className="h-3 w-3" />
                          Save
                        </button>
                      </div>
                    </div>

                    {/* Pre-filled Scripture anchor points */}
                    <div className="mt-4 rounded-xl border border-blue-500/15 bg-blue-500/[0.04] p-3 text-xs">
                      <p className="font-semibold text-blue-200">
                        Today&apos;s Anchor Scripture References:
                      </p>
                      <ul className="mt-1.5 space-y-1 text-slate-300">
                        <li>
                          •{" "}
                          <strong className="text-white">Romans 8:31-39</strong>{" "}
                          — If God is for us, nothing can separate us from His
                          love.
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-white">Galatians 2:20</strong>{" "}
                          — It is no longer I who live, but Christ lives in me.
                        </li>
                        <li>
                          •{" "}
                          <strong className="text-white">Ephesians 2:8-9</strong>{" "}
                          — Saved by grace through faith, a gift from God.
                        </li>
                      </ul>
                    </div>

                    {/* Personal scratchpad textarea */}
                    <div className="mt-4 flex flex-1 flex-col">
                      <label
                        htmlFor={userNotesId}
                        className="text-xs font-medium text-slate-400"
                      >
                        Your Personal Thoughts & Revelations:
                      </label>
                      <textarea
                        id={userNotesId}
                        value={userNotes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        placeholder="Write down what the Holy Spirit is speaking to your heart during this service... (Notes auto-save on your device)"
                        rows={7}
                        className="mt-2 w-full flex-1 rounded-xl border border-white/10 bg-black/40 p-3.5 text-xs leading-relaxed text-slate-200 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
                      />
                    </div>

                    <p className="mt-3 text-[11px] text-slate-500">
                      💡 Tip: Click &quot;Copy&quot; or &quot;Save&quot; to keep
                      your notes for personal study or group discussions.
                    </p>
                  </div>
                )}

                {/* Tab 2: Prayer Request */}
                {activeTab === "prayer" && (
                  <form
                    onSubmit={handlePrayerSubmit}
                    className="flex flex-1 flex-col p-5 md:p-6"
                  >
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Submit a Live Prayer Request
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Our intercessory prayer team and Pastor Maurice will
                        agree with you in faith right now.
                      </p>
                    </div>

                    {prayerSent ? (
                      <div className="my-auto rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-5 text-center">
                        <Check className="mx-auto h-8 w-8 text-emerald-400" />
                        <h4 className="mt-2 font-semibold text-emerald-200">
                          Request Forwarded to Prayer Line
                        </h4>
                        <p className="mt-1 text-xs text-slate-300">
                          We are standing in agreement with you. The prayer of
                          faith prevails!
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mt-4 space-y-3.5 text-xs">
                          <div>
                            <label
                              htmlFor={prayerNameId}
                              className="block font-medium text-slate-300"
                            >
                              Your Name (Optional)
                            </label>
                            <input
                              id={prayerNameId}
                              type="text"
                              value={prayerName}
                              onChange={(e) => setPrayerName(e.target.value)}
                              placeholder="e.g. John or Sarah"
                              className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 px-3.5 py-2.5 text-slate-200 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                          </div>

                          <div>
                            <label
                              htmlFor={prayerRequestId}
                              className="block font-medium text-slate-300"
                            >
                              What would you like us to pray for? *
                            </label>
                            <textarea
                              id={prayerRequestId}
                              required
                              rows={4}
                              value={prayerRequest}
                              onChange={(e) => setPrayerRequest(e.target.value)}
                              placeholder="Share your prayer need, health, family, breakthrough, or thanksgiving..."
                              className="mt-1.5 w-full rounded-xl border border-white/10 bg-black/40 p-3.5 text-slate-200 placeholder:text-slate-500 focus:border-blue-400 focus:outline-none"
                            />
                          </div>

                          <label
                            htmlFor={confidentialId}
                            className="flex cursor-pointer items-center gap-2 pt-1 text-slate-400"
                          >
                            <input
                              id={confidentialId}
                              type="checkbox"
                              checked={isConfidential}
                              onChange={(e) =>
                                setIsConfidential(e.target.checked)
                              }
                              className="rounded border-white/20 bg-black/40 text-blue-500 focus:ring-0"
                            />
                            <span>Keep confidential (Pastoral team only)</span>
                          </label>
                        </div>

                        <div className="mt-5 pt-2">
                          <button
                            type="submit"
                            className="btn btn-primary w-full justify-center text-xs"
                          >
                            <Send className="h-3.5 w-3.5" />
                            Send to Pastor & Prayer Team
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                )}

                {/* Tab 3: Online Giving */}
                {activeTab === "give" && (
                  <div className="flex flex-1 flex-col p-5 md:p-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                        Give Tithes & Offerings Online
                      </h3>
                      <p className="mt-1 text-xs text-slate-400">
                        Honor God through M-Pesa from anywhere in Kenya or via
                        Wave / International transfer.
                      </p>
                    </div>

                    <div className="mt-4 space-y-3">
                      {/* Till Number Card */}
                      {mpesaTill && (
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Lipa Na M-Pesa Till</span>
                            <span className="text-[10px] text-emerald-400 font-medium">
                              Zero customer transaction fees
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="font-mono text-xl font-bold tracking-wider text-white">
                              {mpesaTill.value}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy("till", mpesaTill.value)
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                            >
                              {copiedKey === "till" ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy Till
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Paybill Number Card */}
                      {mpesaPaybill && (
                        <div className="rounded-xl border border-white/10 bg-black/40 p-3.5">
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>M-Pesa Paybill</span>
                            <span>{siteConfig.giving.mpesa.find(i => i.label.includes("Name"))?.value}</span>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div>
                              <div className="font-mono text-base font-bold text-white">
                                Paybill: {mpesaPaybill.value}
                              </div>
                              {mpesaAcc && (
                                <div className="text-xs text-slate-300">
                                  Account: {mpesaAcc.value}
                                </div>
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopy("paybill", mpesaPaybill.value)
                              }
                              className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300 hover:text-white"
                            >
                              {copiedKey === "paybill" ? (
                                <>
                                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy Paybill
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-5 border-t border-white/[0.08] pt-4">
                      <Link
                        href="/give"
                        className="btn btn-ghost w-full justify-center text-xs"
                      >
                        View Full Giving Guide & FAQs
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Weekly Live Broadcast Schedule ---------------- */}
      <section className="relative border-y border-white/[0.08] bg-black/30 py-16 md:py-20">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="eyebrow">Tune in every week</p>
                <h2 className="display-sm mt-3 text-white">
                  Live Broadcast Schedule.
                </h2>
                <p className="mt-2 text-sm text-slate-400 max-w-xl">
                  Join our online congregation at these scheduled broadcast
                  times. All streams originate live from our sanctuary in
                  Oyugis, Kenya.
                </p>
              </div>

              <a
                href={siteConfig.secondaryCta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center gap-2 self-start"
              >
                <YouTubeMark className="h-4 w-4 text-red-500" />
                Subscribe to YouTube Channel
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {BROADCAST_SCHEDULE.map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#070b14] p-6 transition-all duration-300 hover:border-blue-400/40 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
                      {item.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="h-3.5 w-3.5 text-blue-400" />
                      {item.dayName}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-300">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-300">
                    {item.description}
                  </p>

                  <div className="mt-5 border-t border-white/[0.06] pt-4 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-blue-300/80">{item.badge}</span>
                    <span className="text-emerald-400 font-medium">Free Access</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Recent Service Messages & Archive ---------------- */}
      <section className="relative py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="eyebrow">Channel stream archive</p>
                <h2 className="display-sm mt-3 text-white">
                  Recent Live Broadcasts.
                </h2>
                <p className="mt-2 text-sm text-slate-400 max-w-xl">
                  Missed the latest service? Click any broadcast below to watch
                  it right here in the live player, or explore our full archive.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/live/past-streams"
                  className="btn btn-primary inline-flex items-center gap-2"
                >
                  Browse All Past Streams ({pastLiveStreams.length})
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
                <a
                  href={channelConfig.streamsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost inline-flex items-center gap-1.5"
                >
                  <YouTubeMark className="h-3.5 w-3.5 text-red-500" />
                  Channel
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {pastLiveStreams.slice(0, 8).map((stream) => {
                const isSelected = activeVideo.id === stream.id;
                return (
                  <button
                    key={stream.id}
                    type="button"
                    onClick={() => {
                      setActiveVideo(stream);
                      const el = document.getElementById("previous-sunday-stream");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={`group relative flex flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                      isSelected
                        ? "border-blue-400 ring-2 ring-blue-500/30 bg-blue-950/20"
                        : "border-white/10 bg-[#070b14] hover:border-white/25 hover:-translate-y-1"
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                      <Image
                        src={stream.thumbnail}
                        alt={stream.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                      {/* Stream Time Ago */}
                      <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/80 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
                        {stream.timeAgo}
                      </span>

                      {/* Play Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-black/40">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg">
                          <Play className="h-5 w-5 fill-current ml-0.5" />
                        </span>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold uppercase tracking-wider text-blue-300">
                          {stream.category}
                        </span>
                        {stream.views && (
                          <span className="text-slate-400">
                            {stream.views} views
                          </span>
                        )}
                      </div>
                      <h4 className="mt-1.5 line-clamp-2 text-sm font-bold text-white group-hover:text-blue-200">
                        {stream.title}
                      </h4>
                      <p className="mt-auto pt-3 text-xs text-slate-400">
                        Speaker: {siteConfig.pastor}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Community & First-Time Visitor Bridge ---------------- */}
      <section className="relative border-t border-white/[0.08] bg-gradient-to-b from-transparent to-blue-950/20 py-16 md:py-24">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#070b16] p-8 md:p-12 lg:p-16">
              <div className="grid-lines absolute inset-0 opacity-30" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative max-w-2xl">
                <span className="eyebrow">Connect With Us</span>
                <h2 className="display-sm mt-3 text-white">
                  Watching From Outside Oyugis?
                </h2>
                <p className="mt-3 text-sm text-slate-300 md:text-base leading-relaxed">
                  You are part of our family. Connect with our pastoral team,
                  receive encouragement, and let us know where you are watching
                  from. If you ever travel through Homa Bay County, we would
                  love to welcome you in person.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href="/visit" className="btn btn-primary">
                    Plan an In-Person Visit
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>

                  <a
                    href={
                      siteConfig.socials.find((s) => s.label === "WhatsApp")
                        ?.href
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary inline-flex items-center gap-2"
                  >
                    <Image
                      src="/brand/social-whatsapp.svg"
                      alt=""
                      width={16}
                      height={16}
                    />
                    Join WhatsApp Fellowship
                  </a>

                  <Link href="/contact" className="btn btn-ghost">
                    Contact Church Office
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
