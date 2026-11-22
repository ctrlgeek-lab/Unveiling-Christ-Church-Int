import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  Cross,
  Flame,
  Globe2,
  HeartHandshake,
  Play,
  Quote,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "The story, vision, mission, leadership, statement of faith, identity, and ministry commitment of Unveiling Christ Church–Oyugis.",
};

const visionCommitments = [
  {
    number: "01",
    title: "To unveil Christ to mankind",
    body: "To make Jesus Christ and His redemptive work known through the preaching and teaching of the Gospel.",
  },
  {
    number: "02",
    title: "To raise a generation established in grace",
    body: "To help believers grow in the understanding of their identity and inheritance in Christ, becoming established in faith and walking in the victory and gladness found in Him.",
  },
];

const missionPillars = [
  {
    icon: BookOpen,
    title: "Sound Bible teaching",
    body: "Teaching Scripture in context and making the finished work of Christ clear so that people can understand and apply the Gospel to their lives.",
  },
  {
    icon: Sparkles,
    title: "Establishing believers in grace",
    body: "Equipping believers to understand their identity in Christ, grow in faith, and live from the benefits of Christ's redemptive work.",
  },
  {
    icon: Users,
    title: "Building strong families and leaders",
    body: "Developing Christian leadership and strengthening families in line with the church's stated mission.",
  },
  {
    icon: Globe2,
    title: "Evangelism and community impact",
    body: "Sharing the Gospel and reaching communities and nations with God's love and power through evangelism, outreach and ministry.",
  },
];

const ministryDNA = [
  {
    letter: "A",
    icon: Cross,
    title: "Christ's finished work is the foundation of our preaching",
    body: "We proclaim what Jesus accomplished through His life, death, resurrection and ascension. Our teaching directs people to Christ as the complete basis of redemption, rather than suggesting that human effort can improve the work He finished. We help people understand what Christ's redemptive work means for their relationship with God, their identity in Christ and their Christian lives.",
    emphasis:
      "Look to Jesus, understand His finished work, and learn to live in the benefits of His redemption.",
    emphasisLabel: "Our preaching emphasis",
  },
  {
    letter: "B",
    icon: Sparkles,
    title: "Grace establishes believers in Christ",
    body: "We teach the unmerited favour of God revealed through Jesus Christ. Our aim is to help believers understand that their standing and inheritance in Christ are grounded in His redemptive work. Grace-centred teaching should therefore produce understanding, confidence in Christ and a life shaped by the Gospel—not guilt-based appeals or pressure.",
    emphasis:
      "Reveal Christ's grace and establish believers in the knowledge of what they have received in Him.",
    emphasisLabel: "Our preaching emphasis",
  },
  {
    letter: "C",
    icon: BookOpen,
    title: "Faith helps believers understand and live from the Gospel",
    body: "Our Statement of Faith places importance on faith in Christ and on the believer's access to God through Him. We therefore teach people to understand Scripture, believe the Gospel and apply its truth to daily life. Faith is not presented as a way to improve Christ's finished work. It is central to how believers receive and live in the benefits of that work, according to the church's teaching.",
    emphasis:
      "Build understanding, encourage faith in Christ and equip believers to live from their identity and inheritance in Him.",
    emphasisLabel: "Our preaching emphasis",
  },
  {
    letter: "D",
    icon: Flame,
    title: "The Holy Spirit empowers ministry",
    body: "Our Statement of Faith affirms the present availability of the gifts of the Holy Spirit and ministry gifts. The church's mission also calls for teaching and preaching in the demonstration of the Spirit and of power, in accordance with 1 Corinthians 2:4–5. This shapes a ministry that values both sound biblical teaching and the active work of the Holy Spirit, with spiritual gifts operating decently and in order.",
    emphasis:
      "Sound biblical teaching and the active work of the Holy Spirit, with spiritual gifts operating decently and in order.",
    emphasisLabel: "In practice",
  },
  {
    letter: "E",
    icon: Globe2,
    title: "Outreach brings the Gospel to people",
    body: "The church's stated vision of reaping the harvest of the earth recognises two groups: people who have not yet believed the Gospel and need to hear about Jesus Christ, and believers who need greater understanding and illumination concerning their redemptive inheritance in Christ. Our outreach therefore includes evangelism, crusades, community engagement and teaching that establishes believers in grace and faith.",
    emphasis:
      "Make Christ known and impact communities and nations with God's love and power.",
    emphasisLabel: "Our outreach",
  },
];

const identityCommitments = [
  {
    icon: BookOpen,
    title: "The authority of Scripture",
  },
  {
    icon: Cross,
    title: "The finished work of Christ",
  },
  {
    icon: Sparkles,
    title: "The believer's inheritance in Him",
  },
  {
    icon: Flame,
    title: "The work of the Holy Spirit",
  },
  {
    icon: Globe2,
    title: "The mission of making Christ known",
  },
];

const structureGroups = [
  {
    title: "Congregational life",
    description:
      "Discipleship, care, and belonging across every generation.",
    icon: Users,
    departments: [
      "Men's Ministry",
      "Ladies' Ministry",
      "Youth Ministry",
      "Children's Ministry",
      "Sunday School",
      "Counseling",
    ],
  },
  {
    title: "Worship & witness",
    description:
      "Leading the church in worship and carrying the Gospel beyond our walls.",
    icon: Flame,
    departments: [
      "Praise & Worship",
      "Media & Tech",
      "Prayer & Intercession",
      "Evangelism & Outreach",
      "Missions",
      "Hospitality",
    ],
  },
  {
    title: "Operations & care",
    description:
      "Stewarding the practical and pastoral needs of the church and community.",
    icon: HeartHandshake,
    departments: [
      "Finance",
      "Admin & HR",
      "Ushering & Protocol",
      "Security",
      "Transport",
      "Health & Welfare",
    ],
  },
];

const structureBodies = [
  {
    title: "Mission Partners Committee",
    body: "Walking with mission partners and coordinating the church's wider mission relationships.",
  },
  {
    title: "Welfare Foundation",
    body: "Supporting welfare and benevolence work alongside the church's care ministries.",
  },
];

const articles = [
  {
    title: "The inspiration and authority of Scripture",
    body: "We believe that the original words of Scripture in both the Old and New Testaments were given by the inspiration of God. Scripture remains relevant to believers today and must be interpreted in context, with attention to its original significance and the New Covenant.",
    references:
      "2 Timothy 3:16–17; 2 Peter 3:16–17; 2 Peter 1:19–21",
  },
  {
    title: "One God eternally existent in three persons",
    body: "We believe there is one God who eternally exists as God the Father, God the Son and God the Holy Spirit.",
    references:
      "Ephesians 4:5–6; 2 Corinthians 8:16; Genesis 1:26; Matthew 3:16–17",
  },
  {
    title: "The deity and redemptive work of Jesus Christ",
    body: "We believe in the deity of Jesus Christ, His virgin birth, conception by the Holy Spirit, death, bodily resurrection and bodily ascension into heaven. Jesus is central to our faith and the foundation of our redemption.",
    references:
      "John 1:1–4; Matthew 1:18–25; Luke 1:30–35; John 20:25–29; Acts 1:9–11",
  },
  {
    title: "The return of Jesus Christ",
    body: "We believe in the imminent return of Jesus Christ and that believers will be caught up to meet the Lord in the air.",
    references:
      "1 Thessalonians 4:13–18; 1 Corinthians 15:51–55; Matthew 24:29–30",
  },
  {
    title: "The finished and complete redemptive work of Christ",
    body: "We believe that Jesus lived a sinless life, was crucified, died and bodily rose from the dead to redeem those who believe in Him. He is the only mediator between God and humanity. His work on the cross is complete and requires no human improvement.",
    references:
      "Romans 10:9–10, 12; 1 Timothy 2:5; John 19:30; Colossians 2:9–10; Hebrews 10:14; Galatians 3:3",
  },
  {
    title: "The benefits of Christ's redemptive work",
    body: "We believe Christ's redemptive work addressed the problem of sin and its consequences, including sickness, poverty and curses, as stated in the church's approved declaration.",
    references:
      "Romans 5:17–19; 2 Corinthians 5:21; 1 Peter 2:24; 2 Corinthians 8:9; Galatians 3:13–14",
  },
  {
    title: "The believer's identity, indwelling God and access to grace",
    body: "We believe that at salvation, God—the Father, Son and Holy Spirit—lives within the believer, who is seated with Christ Jesus. Through Christ, believers have immediate access to the throne of grace and are full sons of God by faith in Christ.",
    references:
      "Colossians 1:27; John 13:20; John 14:23; Ephesians 2:6; Hebrews 4:14–16; Galatians 3:26",
  },
  {
    title: "The gifts of the Holy Spirit and ministry gifts today",
    body: "We believe the gifts and ministry gifts operating in the early church remain available to believers today. They are ministered by grace through faith alone and should operate decently and in order.",
    references:
      "Acts 2:38–39; Galatians 3:2–5; Romans 11:29; 1 Corinthians 4:1; 1 Corinthians 12:4–13; Ephesians 4:11–13",
  },
  {
    title: "The final resurrection and eternal destiny",
    body: "We believe in the final resurrection of both the saved and the lost: the saved to eternal life and the lost to eternal death.",
    references:
      "Revelation 20:11–15; 1 Corinthians 15:12–23; John 5:24; 1 John 5:11–13; John 3:17–18",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="relative isolate overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
        <div className="pointer-events-none absolute -left-40 top-20 h-[480px] w-[480px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="grid-lines absolute inset-0 opacity-20" />

        <div className="shell relative">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-center xl:gap-16">
            <Reveal>
              <div>
                <p className="eyebrow">About Unveiling Christ Church</p>
                <h1 className="display-xl mt-5 max-w-4xl text-white">
                  The city of
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    gladness.
                  </span>
                </h1>
                <p className="lede mt-7 max-w-2xl">
                  Known as{" "}
                  <span className="text-slate-100">
                    The City of Gladness – Unstoppable Grace
                  </span>
                  , we are a Christian ministry in Oyugis, Homa Bay County,
                  Kenya, committed to revealing Jesus Christ and helping people
                  live in the benefits of His redemptive work.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/visit" className="btn btn-primary">
                    Plan a Visit
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={siteConfig.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch Online
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="relative mx-auto w-full max-w-xl xl:max-w-none">
                <div className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-blue-600/15 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/[0.03] p-2 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
                  <div className="relative aspect-[10/9] overflow-hidden rounded-[1.5rem] bg-[#0a1020]">
                    <Image
                      src="/images/pastor-maurice-adero.jpg"
                      alt="Pastor Maurice Adero preaching at Unveiling Christ Church"
                      fill
                      priority
                      sizes="(max-width: 1280px) 92vw, 44vw"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="mt-14 grid gap-4 border-t border-white/12 pt-6 text-[10px] uppercase tracking-[0.18em] text-slate-400 sm:grid-cols-3">
              <p>
                <span className="block text-slate-600">Founded</span>
                <span className="mt-1 block text-slate-200">2013</span>
              </p>
              <p>
                <span className="block text-slate-600">Lead Pastor</span>
                <span className="mt-1 block text-slate-200">
                  Pastor Maurice Adero
                </span>
              </p>
              <p>
                <span className="block text-slate-600">Home</span>
                <span className="mt-1 block text-slate-200">
                  Oyugis, Kenya
                </span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Story ---------------- */}
      <section id="story" className="relative overflow-hidden py-20 md:py-28">
        <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="eyebrow">Our story</p>
              <h2 className="display-lg mt-5 text-white">
                A ministry
                <br />
                <span className="font-editorial italic text-blue-300">
                  rooted in grace.
                </span>
              </h2>
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/community.jpg"
                    alt="The church family studying the Word together"
                    fill
                    sizes="(max-width: 1024px) 90vw, 30vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/70 to-transparent" />
                </div>
                <div className="bg-white/[0.025] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                    Since 2013
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    A family learning to live from the finished work of Christ.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="space-y-7 text-[15px] leading-8 text-slate-400">
              <p>
                <span className="font-medium text-slate-200">
                  Unveiling Christ Church–Oyugis
                </span>
                , known as{" "}
                <span className="text-slate-200">
                  The City of Gladness – Unstoppable Grace
                </span>
                , is a Christian ministry based in Oyugis, Homa Bay County,
                Kenya. Founded in 2013 and led by Pastor Maurice Adero, the
                church is committed to revealing Jesus Christ, teaching the truth
                of the Gospel, and helping people understand and live in the
                benefits of Christ&apos;s redemptive work.
              </p>
              <p>
                Our ministry emphasis is revealing Christ&apos;s unmerited
                favour and transforming lives. We are a Bible and faith-based
                teaching church that seeks to establish people in their identity
                in Christ, helping believers understand what Jesus accomplished
                through His death and resurrection.
              </p>
              <p>
                Our ministry is centred on Jesus Christ, the authority of
                Scripture, the work of the Holy Spirit, and the practical
                transformation of lives through the Gospel of grace and faith.
              </p>

              <div className="relative mt-10 rounded-2xl border border-blue-400/15 bg-blue-500/[0.06] p-6 md:p-8">
                <Quote className="h-6 w-6 text-blue-300/70" />
                <p className="font-editorial mt-4 text-2xl italic leading-relaxed text-slate-100 md:text-3xl">
                  “We are committed to revealing Jesus Christ, teaching the truth
                  of the Gospel, and helping people live in the benefits of His
                  redemptive work.”
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <p className="font-display text-3xl font-semibold text-blue-300">
                    2013
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Founded
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <p className="font-display text-3xl font-semibold text-blue-300">
                    Oyugis
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Our home
                  </p>
                </div>
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <p className="font-display text-3xl font-semibold text-blue-300">
                    One
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Family in Christ
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Vision ---------------- */}
      <section id="vision" className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[420px] w-[420px] rounded-full bg-blue-700/10 blur-[130px]" />
        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow">Our vision</p>
                <h2 className="display-lg mt-5 max-w-lg text-white">
                  To unveil Christ
                  <br />
                  to mankind.
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    A generation established in grace.
                  </span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="space-y-4">
                {visionCommitments.map((item) => (
                  <div
                    key={item.number}
                    className="rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 md:p-7"
                  >
                    <p className="text-[10px] font-semibold tracking-[0.2em] text-blue-300/80">
                      {item.number}
                    </p>
                    <h3 className="font-display mt-3 text-xl font-semibold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-400">
                      {item.body}
                    </p>
                  </div>
                ))}
                <p className="border-l border-blue-400/30 pl-5 text-sm leading-7 text-slate-500">
                  We recognise the importance of reaching people who have not yet
                  believed the Gospel and helping Christians who need a clearer
                  understanding of their redemptive inheritance in Christ.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- Mission ---------------- */}
      <section id="mission" className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow">Our mission</p>
              <h2 className="display-lg mt-5 text-white">
                Christ&apos;s finished work,
                <br />
                <span className="font-editorial italic text-blue-300">
                  lived out in families and cities.
                </span>
              </h2>
              <p className="mt-6 text-[15px] leading-8 text-slate-400">
                To unveil Christ&apos;s finished work through sound teaching,
                establish believers in Grace, build strong families and leaders,
                and evangelize and impact our community and nations with
                God&apos;s love and power.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {missionPillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <Reveal key={pillar.title} delay={i * 80}>
                  <div className="card-hover h-full rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                        <Icon className="h-5 w-5 text-blue-300" />
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display mt-6 text-xl font-semibold text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">
                      {pillar.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal delay={120}>
            <p className="mt-8 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              <Check className="h-3.5 w-3.5 text-blue-400" />
              Teaching and preaching in the demonstration of the Spirit and of
              power · 1 Corinthians 2:4–5
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Leadership ---------------- */}
      <section id="leadership" className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow">Leadership</p>
                <h2 className="display-md mt-4 text-white">
                  Led by grace.
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    Shepherded with care.
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-slate-400">
                We are grateful for the pastoral leadership that serves our
                church and community.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-12 grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] md:grid-cols-[0.7fr_1.3fr]">
              <div className="relative min-h-[340px] overflow-hidden bg-[#0a0f1c] md:min-h-[420px]">
                <Image
                  src="/images/pastor-maurice-adero.jpg"
                  alt="Pastor Maurice Adero, lead pastor of Unveiling Christ Church"
                  fill
                  sizes="(max-width: 767px) 100vw, 36vw"
                  style={{ objectPosition: "center 20%" }}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/80 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-200/80">
                    Lead Pastor
                  </p>
                  <p className="font-display mt-1 text-lg font-semibold text-white">
                    Pastor Maurice Adero
                  </p>
                </div>
              </div>
              <div className="p-7 md:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  Lead Pastor
                </p>
                <h3 className="font-display mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                  Pastor Maurice Adero
                </h3>
                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-400">
                  Leading the UCC family in Oyugis with a passion for the Gospel
                  of grace and the practical transformation of lives.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/visit" className="btn btn-primary">
                    Plan a Visit
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href={siteConfig.secondaryCta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost"
                  >
                    <Play className="h-3.5 w-3.5 fill-current" />
                    Watch Online
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Structure ---------------- */}
      <section
        id="structure"
        className="relative overflow-hidden border-b border-white/[0.07] py-20 md:py-28"
      >
        <div className="pointer-events-none absolute -left-40 top-16 h-[460px] w-[460px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">Our structure</p>
                <h2 className="display-lg mt-5 max-w-xl text-white">
                  One body.
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    Ordered for service.
                  </span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-xl text-[15px] leading-8 text-slate-400 lg:pb-2">
                Our Senior Pastor and the Executive &amp; Elders provide
                spiritual oversight and governance. Department leaders
                coordinate the ministry and operations that carry our shared
                mission, while teams and volunteers serve together across every
                area of church life.
              </p>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="relative mt-12 overflow-hidden rounded-[2rem] border border-white/10 bg-[#070c16] p-5 md:p-8">
              <div className="grid-lines pointer-events-none absolute inset-0 opacity-25" />
              <div className="relative">
                <div className="mx-auto max-w-sm text-center">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-blue-300/70">
                    Spiritual leadership
                  </p>
                  <div className="mt-3 rounded-2xl border border-blue-300/25 bg-blue-500/10 px-5 py-4 shadow-[0_20px_60px_-35px_rgba(37,99,235,0.8)]">
                    <p className="font-display text-lg font-semibold text-white">
                      Senior Pastor
                    </p>
                    <p className="mt-1 text-xs text-blue-100/75">
                      Pastor Maurice Adero
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="mx-auto h-7 w-px bg-gradient-to-b from-blue-400/45 to-blue-400/10"
                />

                <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
                  <p className="font-display text-base font-semibold text-white">
                    Executive &amp; Elders
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    Prayerful oversight, spiritual counsel, and governance.
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="mx-auto h-7 w-px bg-gradient-to-b from-blue-400/45 to-blue-400/10"
                />

                <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-center">
                  <p className="font-display text-base font-semibold text-white">
                    Department Leaders
                  </p>
                  <p className="mt-1 text-xs leading-6 text-slate-400">
                    Coordinating ministry teams, operations, and accountability.
                  </p>
                </div>

                <div
                  aria-hidden="true"
                  className="mx-auto h-7 w-px bg-gradient-to-b from-blue-400/45 to-blue-400/10"
                />

                <div className="grid gap-3 md:grid-cols-3">
                  {structureGroups.map((group, index) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="h-full rounded-2xl border border-white/[0.09] bg-[#0a101d] p-5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">
                              0{index + 1}
                            </p>
                            <h3 className="font-display mt-2 text-base font-semibold text-white">
                              {group.title}
                            </h3>
                          </div>
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                            <Icon className="h-4 w-4 text-blue-300" />
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-6 text-slate-400">
                          {group.description}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-1.5">
                          {group.departments.map((department) => (
                            <li
                              key={department}
                              className="rounded-full border border-white/10 bg-white/[0.025] px-2.5 py-1 text-[10px] leading-4 text-slate-300"
                            >
                              {department}
                            </li>
                          ))}
                        </ul>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-3 flex flex-col items-start justify-between gap-3 rounded-2xl border border-blue-400/15 bg-blue-500/[0.05] px-5 py-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-display text-sm font-semibold text-white">
                      Ministry teams &amp; volunteers
                    </p>
                    <p className="mt-1 text-xs leading-6 text-slate-400">
                      The hands and hearts serving across every department.
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-200/70">
                    <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                    Serving together
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {structureBodies.map((body, index) => (
              <Reveal key={body.title} delay={200 + index * 80}>
                <article className="card-hover h-full rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 md:p-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">
                    Related body
                  </p>
                  <h3 className="font-display mt-2 text-lg font-semibold text-white">
                    {body.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {body.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={360}>
            <p className="mt-5 text-[10px] font-medium leading-5 tracking-[0.04em] text-slate-600">
              This overview reflects our current leadership, ministry, and
              support structure.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ---------------- Statement of Faith ---------------- */}
      <section id="statement-of-faith" className="py-20 md:py-28">
        <div className="shell">
          <Reveal>
            <div className="max-w-2xl">
              <p className="eyebrow">What we believe</p>
              <h2 className="display-lg mt-5 text-white">
                Nine articles
                <br />
                <span className="font-editorial italic text-blue-300">
                  of faith.
                </span>
              </h2>
              <p className="mt-6 text-[15px] leading-8 text-slate-400">
                Our Statement of Faith is rooted in Scripture and centred on the
                finished work of Jesus Christ. Tap any article to read the
                summary and its key references.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-3 lg:grid-cols-2">
            {articles.map((article, i) => (
              <Reveal key={article.title} delay={i * 40}>
                <details
                  className="group rounded-2xl border border-white/[0.09] bg-white/[0.025] p-5 transition-colors open:border-blue-400/25 open:bg-white/[0.04] md:p-6"
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-start gap-4 [&::-webkit-details-marker]:hidden">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-[10px] font-semibold text-blue-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display flex-1 text-base font-semibold leading-snug text-white">
                      {article.title}
                    </span>
                    <span className="relative mt-1 flex h-5 w-5 shrink-0 items-center justify-center text-blue-300">
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span className="absolute h-3.5 w-px bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                    </span>
                  </summary>
                  <div className="mt-5 border-t border-white/[0.08] pt-5 md:pl-12">
                    <p className="text-sm leading-7 text-slate-400">
                      {article.body}
                    </p>
                    <p className="mt-4 text-[10px] font-medium leading-5 tracking-[0.04em] text-slate-600">
                      <span className="font-semibold uppercase tracking-[0.16em] text-blue-300/70">
                        Key references:
                      </span>{" "}
                      {article.references}
                    </p>
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Ministry DNA ---------------- */}
      <section
        id="ministry-dna"
        className="relative overflow-hidden border-y border-white/[0.07] bg-[#070b14] py-20 md:py-28"
      >
        <div className="pointer-events-none absolute -right-40 top-20 h-[460px] w-[460px] rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <Reveal>
              <div>
                <p className="eyebrow">Our ministry DNA</p>
                <h2 className="display-lg mt-5 max-w-2xl text-white">
                  Not occasional subjects.
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    The heart of our ministry.
                  </span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="max-w-xl text-[15px] leading-8 text-slate-400 lg:pb-2">
                These are not merely subjects we teach occasionally. They are
                central to how we understand the Gospel and the purpose of our
                ministry.
              </p>
            </Reveal>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {ministryDNA.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.letter}
                  delay={index * 70}
                  className={index === 0 ? "md:col-span-2" : "h-full"}
                >
                  <article className="card-hover relative h-full overflow-hidden rounded-2xl border border-white/[0.09] bg-white/[0.025] p-6 md:p-7">
                    {index === 0 && (
                      <Cross
                        className="pointer-events-none absolute -bottom-12 -right-4 hidden h-64 w-64 text-blue-300/[0.04] md:block"
                        strokeWidth={0.6}
                        aria-hidden="true"
                      />
                    )}
                    <div className="relative flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-400/20 bg-blue-500/10 text-[11px] font-semibold tracking-[0.14em] text-blue-300">
                          {item.letter}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                          <Icon className="h-5 w-5 text-blue-300" />
                        </span>
                      </div>
                      <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="font-display relative mt-6 max-w-2xl text-xl font-semibold leading-snug text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-3 max-w-3xl text-sm leading-7 text-slate-400">
                      {item.body}
                    </p>

                    <div className="relative mt-5 max-w-3xl border-l border-blue-400/30 pl-4">
                      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">
                        {item.emphasisLabel}
                      </p>
                      <p className="mt-1.5 text-sm italic leading-7 text-blue-100/80">
                        {item.emphasis}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- Identity & commitment ---------------- */}
      <section
        id="identity"
        className="relative overflow-hidden border-t border-white/[0.07] py-20 md:py-28"
      >
        <div className="pointer-events-none absolute -left-48 top-0 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
        <div className="shell relative">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
            <Reveal>
              <div>
                <p className="eyebrow">Our identity &amp; ministry commitment</p>
                <h2 className="display-lg mt-5 max-w-xl text-white">
                  A church where
                  <br />
                  <span className="font-editorial italic text-blue-300">
                    Christ is seen clearly.
                  </span>
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-8 text-slate-400">
                  Unveiling Christ Church–Oyugis seeks to be a church where
                  Jesus Christ is unveiled through sound teaching, the Gospel of
                  grace is clearly proclaimed, believers are established in
                  faith, and communities are reached with God&apos;s love and
                  power.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="rounded-[2rem] border border-white/[0.09] bg-white/[0.025] p-6 md:p-8">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-300">
                  We remain committed to
                </p>
                <div className="mt-6 grid gap-2">
                  {identityCommitments.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.title}
                        className="group flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-blue-400/20 hover:bg-white/[0.04]"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10">
                          <Icon className="h-4 w-4 text-blue-300" />
                        </span>
                        <p className="font-display flex-1 text-sm font-medium leading-snug text-slate-100 md:text-base">
                          {item.title}
                        </p>
                        <span className="text-[10px] font-semibold tracking-[0.18em] text-slate-600">
                          0{index + 1}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 border-t border-white/[0.08] pt-6">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-blue-300/70">
                    Our ministry is guided by this conviction
                  </p>
                  <p className="font-editorial mt-2 text-xl italic leading-relaxed text-blue-100/90 md:text-2xl">
                    The clearer people see Christ and understand His finished
                    work, the better equipped they are to live from their
                    identity in Him and share the Gospel with others.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={160}>
            <div className="mt-14 grid gap-6 border-t border-white/[0.08] pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end">
              <div>
                <p className="font-display text-lg font-semibold tracking-[-0.02em] text-white sm:text-2xl md:text-3xl">
                  Unveiling Christ Church–Oyugis
                </p>
                <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200/80">
                  The City of Gladness – Unstoppable Grace
                </p>
              </div>
              <p className="font-editorial text-2xl italic leading-snug text-blue-200 lg:text-right lg:text-3xl">
                Revealing Christ&apos;s Unmerited Favour. Transforming Lives.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-white/[0.07] py-20 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-700/10 blur-[140px]" />
        <div className="shell relative text-center">
          <Reveal>
            <HeartHandshake className="mx-auto h-7 w-7 text-blue-300" />
            <h2 className="display-lg mx-auto mt-6 max-w-3xl text-white">
              Come and see.
              <br />
              <span className="font-editorial italic text-blue-300">
                There is a place for you.
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-400">
              The best way to know us is to gather with us. Join us this Sunday
              in Oyugis, or reach out — we would love to meet you.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link href="/visit" className="btn btn-primary">
                Plan a Visit
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Contact us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
