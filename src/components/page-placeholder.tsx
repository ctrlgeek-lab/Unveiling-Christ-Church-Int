import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  headline: string;
  accent: string;
  description: string;
  image: string;
  imageAlt: string;
  note?: string;
};

export function PagePlaceholder({
  eyebrow,
  title,
  headline,
  accent,
  description,
  image,
  imageAlt,
  note,
}: PagePlaceholderProps) {
  return (
    <section className="relative isolate overflow-hidden pb-24 pt-32 md:pb-32 md:pt-40">
      <div className="pointer-events-none absolute -right-32 top-10 h-[520px] w-[520px] rounded-full bg-blue-700/10 blur-[140px]" />
      <div className="grid-lines absolute inset-0 opacity-40" />
      <div className="shell relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            {title}
          </p>
          <h1 className="display-lg mt-5 max-w-xl text-white">
            {headline}{" "}
            <span className="font-editorial italic text-blue-300">{accent}</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-400">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/visit" className="btn btn-primary">
              Plan a Visit
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              <Mail className="h-4 w-4" />
              Contact us
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-[11px] leading-6 text-slate-500">
            <Compass className="h-5 w-5 shrink-0 text-blue-400" />
            <p>
              {note ??
                `This page is being prepared with ${siteConfig.shortName}'s own story, photos, and details. Check back soon, or reach out and we will point you in the right direction.`}
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-[#0a0f1c] px-5 py-4 md:block">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-blue-300">
              {siteConfig.shortName}
            </p>
            <p className="font-display mt-1 text-sm font-semibold text-white">
              {siteConfig.contact.location}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
