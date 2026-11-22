import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, MapPin, ArrowRight, Sparkles, Users } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { getUpcomingEvents } from "@/lib/supabase/data";

export const metadata: Metadata = {
  title: "Events & Gatherings",
  description:
    "Upcoming services, worship nights, revivals, and gatherings at Unveiling Christ Church, Oyugis.",
};

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="min-h-screen bg-ink pt-28 pb-20">
      {/* Background glow effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="shell relative z-10 space-y-16">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <p className="eyebrow justify-center">Gather with Us</p>
            <h1 className="display-lg mt-4 text-white">
              Events &amp;{" "}
              <span className="font-editorial italic text-blue-300">Gatherings.</span>
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">
              Join us for uplifting worship nights, transformative revival meetings, and weekly
              celebrations of grace at the City of Gladness in Oyugis.
            </p>
          </div>
        </Reveal>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => (
            <Reveal key={event.id} delay={idx * 60}>
              <div className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] p-6 transition-all duration-300 hover:border-blue-400/30 hover:bg-white/[0.04] hover:-translate-y-1">
                {event.flyer_url && (
                  <div className="relative -mx-6 -mt-6 mb-5 h-48 overflow-hidden">
                    <img
                      src={event.flyer_url}
                      alt={event.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05070d] via-transparent to-transparent" />
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full border border-blue-400/25 bg-blue-500/10 px-3 py-1 text-[11px] font-semibold text-blue-300">
                      {event.category}
                    </span>
                    {event.is_featured && (
                      <span className="rounded-full border border-amber-400/30 bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                        Featured ★
                      </span>
                    )}
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold text-white transition group-hover:text-blue-200">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {event.description ||
                      "A special gathering of praise, prayer, and the teaching of God's Word."}
                  </p>

                  <div className="mt-5 space-y-2 border-t border-white/[0.06] pt-4 text-xs text-slate-300">
                    <div className="flex items-center gap-2.5">
                      <Calendar className="h-4 w-4 text-blue-400 shrink-0" />
                      <span>
                        {new Date(event.event_date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Clock className="h-4 w-4 text-blue-400 shrink-0" />
                      <span>{event.time_label || "8:00 AM"}</span>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <MapPin className="h-4 w-4 text-blue-400 shrink-0" />
                      <span className="line-clamp-1">
                        {event.location || "Main Sanctuary, Oyugis"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06]">
                  <Link
                    href={event.registration_url || "/visit"}
                    className="flex items-center justify-between text-xs font-semibold text-blue-400 transition group-hover:text-blue-300"
                  >
                    <span>Plan Your Visit</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom invitation card */}
        <Reveal delay={120}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-blue-900/30 via-[#0a0f1d] to-[#070b14] p-8 sm:p-10 text-center">
            <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Are you planning to attend for the first time?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-xs sm:text-sm text-slate-300">
              Let our hospitality and ushering team know you are coming so we can reserve a warm
              seat for you and your family this Sunday!
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href="/visit" className="btn btn-primary">
                Plan a Visit
              </Link>
              <Link href="/live" className="btn btn-ghost">
                Watch Live Stream
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
