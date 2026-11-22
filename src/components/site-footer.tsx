import Image from "next/image";
import { siteConfig } from "@/config/site";

const values = ["Preaching", "Worship", "Prayer", "Transformation"];

export function SiteFooter() {
  return (
    <footer
      id="site-footer"
      className="relative scroll-mt-24 overflow-hidden border-t border-blue-200/20 bg-[#03163d] text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_78%_18%,rgba(37,99,235,0.26),transparent_55%),linear-gradient(110deg,#020f2e_0%,#041f52_50%,#03163d_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: "url('/brand/world-map.svg')",
          backgroundSize: "1100px auto",
          backgroundPosition: "right 10%",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02] mix-blend-soft-light"
        style={{
          backgroundImage: "url('/brand/ucc-background-logo.png')",
          backgroundSize: "360px auto",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-[49px] h-16 opacity-80">
        <svg
          viewBox="0 0 1440 64"
          preserveAspectRatio="none"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 42C210 16 470 58 740 36C980 16 1220 34 1440 18"
            stroke="#f5c542"
            strokeWidth="2"
          />
          <path
            d="M0 51C210 25 470 67 740 45C980 25 1220 43 1440 27"
            stroke="#38bdf8"
            strokeWidth="1.5"
            opacity="0.85"
          />
        </svg>
      </div>

      <div className="shell relative z-10">
        <div className="flex flex-col gap-9 py-10 lg:flex-row lg:items-center lg:justify-between lg:py-12">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6">
            <Image
              src="/brand/ucc-favicon-128.png"
              alt=""
              width={128}
              height={128}
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />
            <span className="hidden h-20 w-px shrink-0 bg-blue-300/50 sm:block" />
            <div>
              <p className="font-display text-[1.65rem] font-semibold uppercase leading-none tracking-[0.02em] text-white sm:text-3xl">
                Unveiling Christ
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-blue-100/90 sm:text-base">
                Church-Oyugis
              </p>
              <div className="mt-2 flex items-center gap-3">
                <span className="h-px w-8 bg-[#f5c542]" />
                <span className="font-script text-[2rem] leading-none text-[#ffd166] sm:text-[2.4rem]">
                  City of Gladness
                </span>
                <span className="h-px w-8 bg-[#f5c542]" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:items-end">
            <div className="flex items-center gap-3">
              {siteConfig.socials.map((social) => {
                const icon = (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.8)]">
                    <Image
                      src={social.icon}
                      alt=""
                      width={20}
                      height={20}
                    />
                  </span>
                );

                if (!social.href) {
                  return (
                    <span
                      key={social.label}
                      role="img"
                      aria-label={`${social.label} — link coming soon`}
                      title={`${social.label} link coming soon`}
                      className="cursor-default"
                    >
                      {icon}
                    </span>
                  );
                }

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>

            <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-100/80 sm:text-[10px]">
              {values.map((value, index) => (
                <span key={value} className="flex items-center gap-2">
                  {value}
                  {index < values.length - 1 && (
                    <span className="text-blue-300/50">|</span>
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-blue-300/30 py-4 text-center text-[10px] tracking-[0.08em] text-blue-100/70 gap-2">
          <span>© 2026 Unveiling Christ Church-Oyugis. All Rights Reserved.</span>
          <a
            href="/admin"
            className="text-blue-300/60 hover:text-blue-200 transition underline underline-offset-4"
          >
            Church Staff Portal
          </a>
        </div>
      </div>
    </footer>
  );
}
