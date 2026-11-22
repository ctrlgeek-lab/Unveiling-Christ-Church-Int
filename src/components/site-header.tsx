"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          solid
            ? "border-b border-white/[0.07] bg-[#05070d]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[84px] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label={`${siteConfig.name} home`}
          >
            <span className="relative block h-10 w-10 overflow-hidden rounded-[11px] ring-1 ring-blue-300/20">
              <Image
                src="/brand/ucc-favicon-128.png"
                alt=""
                fill
                sizes="40px"
                className="object-cover"
                priority
              />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-[9px] font-semibold uppercase tracking-[0.32em] text-blue-200/80">
                Unveiling
              </span>
              <span className="font-display mt-1 text-[15px] font-semibold uppercase tracking-[0.12em] text-white">
                Christ Church
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[12px] font-medium tracking-[0.08em] transition-colors ${
                    active ? "text-white" : "text-slate-300/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-blue-300 to-blue-600" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/live"
              className="group relative inline-flex items-center justify-center gap-2 rounded-full border border-red-500/40 bg-red-950/25 px-4 py-2 text-[11px] font-semibold tracking-wider text-red-200 backdrop-blur-md transition-all duration-300 hover:bg-red-600 hover:border-red-500 hover:text-white hover:shadow-[0_0_24px_rgba(239,68,68,0.55)] hover:scale-105 active:scale-95"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span>Watch Live</span>
            </Link>
            <Link
              href={siteConfig.primaryCta.href}
              className="btn btn-primary !min-h-10 !px-5 !text-[11px]"
            >
              {siteConfig.primaryCta.label}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-[#05070d]/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="shell flex h-full flex-col justify-between pb-10 pt-28">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-white/[0.08] py-5"
                style={{
                  transitionDelay: open ? `${80 + i * 45}ms` : "0ms",
                }}
              >
                <span className="font-display text-3xl font-medium tracking-tight text-white">
                  {item.label}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300/60">
                  0{i + 1}
                </span>
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Link
              href="/live"
              className="group relative inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/40 bg-red-950/30 px-5 py-3.5 text-xs font-semibold tracking-wider text-red-200 transition-all duration-300 hover:bg-red-600 hover:border-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
              onClick={() => setOpen(false)}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              <span>Watch Live Stream</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <Link href={siteConfig.primaryCta.href} className="btn btn-primary w-full" onClick={() => setOpen(false)}>
              {siteConfig.primaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-slate-500">
              {siteConfig.contact.location}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
