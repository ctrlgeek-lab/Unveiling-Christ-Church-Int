import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Heart,
  Mail,
  MapPin,
  Smartphone,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Give",
  description:
    "Partner with the vision of Unveiling Christ Church–Oyugis through M-Pesa giving.",
};

const givingSteps = [
  "Open M-Pesa on your phone.",
  "Choose Lipa na M-Pesa or Pay Bill.",
  "Enter the Till or Paybill number and account details below.",
  "Enter your amount and confirm the transaction.",
];

const impact = [
  "Preach the Gospel and teach the Word faithfully.",
  "Disciple families and raise strong leaders.",
  "Serve Oyugis with practical love and outreach.",
  "Create space for worship and community.",
];

export default function GivePage() {
  const { mpesa } = siteConfig.giving;
  const till = mpesa.find((item) => item.label === "Till Number");
  const paybill = mpesa.find((item) => item.label === "Paybill Number");
  const account = mpesa.find((item) => item.label === "Account Number");
  const accountName = mpesa.find((item) => item.label === "Account Name");

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        <Image
          src="/images/hope.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05070d]/60 via-[#05070d]/80 to-[#05070d]" />
        <div className="grid-lines absolute inset-0 opacity-40" />

        <div className="shell relative">
          <Reveal>
            <p className="eyebrow">Partner with the vision</p>
            <h1 className="display-xl mt-5 max-w-4xl text-white">
              Give with
              <br />
              <span className="font-editorial italic text-blue-300">joy.</span>
            </h1>
            <p className="lede mt-7 max-w-2xl">
              Your generosity helps us unveil Christ&apos;s finished work, teach
              the Word, build families, and serve Oyugis with practical love.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#mpesa" className="btn btn-primary">
                Give via M-Pesa
                <Heart className="h-4 w-4" />
              </a>
              <Link href="/about" className="btn btn-ghost">
                Our vision
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- M-Pesa details ---------------- */}
      <section id="mpesa" className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">M-Pesa giving</p>
              <h2 className="display-lg mt-5 text-white">
                Two simple
                <br />
                <span className="font-editorial italic text-blue-300">
                  ways to give.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
                Use the Till number for a quick giving, or the Paybill number if
                you prefer to give through your account.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-blue-400/20 bg-blue-500/[0.07] p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                      <Smartphone className="h-5 w-5 text-blue-300" />
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300/70">
                      Option 01
                    </span>
                  </div>
                  <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {till?.label}
                  </p>
                  <p className="font-display mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                    {till?.value}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Lipa na M-Pesa · Buy Goods and Services
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                      <Smartphone className="h-5 w-5 text-slate-300" />
                    </span>
                    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-600">
                      Option 02
                    </span>
                  </div>
                  <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {paybill?.label}
                  </p>
                  <p className="font-display mt-2 text-3xl font-semibold tracking-[-0.04em] text-white">
                    {paybill?.value}
                  </p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Pay Bill · Account {account?.value}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                      {accountName?.label}
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-200">
                      {accountName?.value}
                    </p>
                  </div>
                  <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-blue-300">
                    M-Pesa
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 md:p-9">
              <p className="eyebrow">How to give</p>
              <ol className="mt-7 space-y-6">
                {givingSteps.map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-[10px] font-semibold text-blue-300">
                      0{i + 1}
                    </span>
                    <p className="pt-1 text-sm leading-6 text-slate-400">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
              <div className="mt-8 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-[#05070d]/60 p-4 text-[11px] leading-6 text-slate-500">
                <Check className="h-4 w-4 shrink-0 text-blue-400" />
                <p>
                  Please confirm the numbers before completing your transaction.
                  For giving assistance, email{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-blue-300 transition-colors hover:text-blue-200"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Why we give ---------------- */}
      <section className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Why we give</p>
              <h2 className="display-lg mt-5 text-white">
                Grace makes us
                <br />
                <span className="font-editorial italic text-blue-300">
                  generous.
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
                Giving is an act of worship. We give not to earn God&apos;s
                favour, but because His grace has already been freely given to us
                in Christ. Every gift becomes a seed of love, teaching, and
                practical care in our community.
              </p>
              <blockquote className="mt-8 border-l border-blue-400/40 pl-5">
                <p className="font-editorial text-xl italic leading-relaxed text-slate-200">
                  “Each of you should give what you have decided in your heart to
                  give, not reluctantly or under compulsion, for God loves a
                  cheerful giver.”
                </p>
                <cite className="mt-3 block text-[10px] font-semibold uppercase not-italic tracking-[0.18em] text-blue-300/80">
                  2 Corinthians 9:7
                </cite>
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 md:p-9">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                Your giving helps us
              </p>
              <ul className="mt-6 space-y-5">
                {impact.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10">
                      <Check className="h-3 w-3 text-blue-300" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl border border-white/[0.08] bg-[#05070d]/60 p-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Giving enquiry
                </p>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="mt-1 flex items-center gap-2 text-sm text-blue-300 transition-colors hover:text-blue-200"
                >
                  <Mail className="h-4 w-4" />
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative text-center">
          <Reveal>
            <p className="eyebrow justify-center">Thank you</p>
            <h2 className="display-lg mx-auto mt-5 max-w-3xl text-white">
              Every gift tells
              <br />
              <span className="font-editorial italic text-blue-300">
                a story of grace.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-400">
              Thank you for partnering with what God is doing at Unveiling Christ
              Church–Oyugis.
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
                Find us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
