import type { Metadata } from "next";
import Image from "next/image";
import {
  projects,
  projectUrl,
  REPO_URL,
  fellowshipIntro,
  recurringTheme,
  nowBuilding,
} from "../../data/fellowship";

export const metadata: Metadata = {
  title: "Fellowship | Yekeen Maadan",
  description:
    "A Python project series built during the Learn2Earn AI Engineering Fellowship — one repo, real bugs, and what each project taught me.",
  alternates: {
    canonical: "/fellowship",
  },
  openGraph: {
    title: "Fellowship | Yekeen Maadan",
    description:
      "A Python project series built during the Learn2Earn AI Engineering Fellowship — one repo, real bugs, and what each project taught me.",
    url: "https://www.maadan.dev/fellowship",
    images: [
      {
        url: "/og/fellowship.jpg",
        width: 1200,
        height: 630,
        alt: "Fellowship Python Project Series — Yekeen Maadan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fellowship | Yekeen Maadan",
    description:
      "A Python project series built during the Learn2Earn AI Engineering Fellowship.",
    images: ["/og/fellowship.jpg"],
    site: "@maadan_dev",
    creator: "@maadan_dev",
  },
};

export default function FellowshipPage() {
  const visibleProjects = projects.filter((project) => !project.draft);

  return (
    <main className="min-h-screen pt-28 md:pt-36 pb-20 px-5 md:px-8 max-w-3xl mx-auto">
      {/* ── Header ────────────────────────────────────────────── */}
      <header className="mb-8 md:mb-10">
        <h1 className="font-bebas text-5xl sm:text-6xl md:text-7xl tracking-wider text-text-primary leading-none mb-4">
          Fellowship
        </h1>

        <p className="font-barlow-condensed text-base sm:text-lg text-text-secondary leading-relaxed mb-3">
          {fellowshipIntro}
        </p>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-barlow-condensed text-xs uppercase tracking-widest text-text-secondary/70 hover:text-text-primary border-b border-border/80 hover:border-text-primary pb-0.5 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
        >
          github.com/maadan-dev/python-project-series ↗
        </a>
      </header>

      {/* ── Fellowship photo ──────────────────────────────────── */}
      <div className="mb-10 sm:mb-14 rounded-lg overflow-hidden border border-border/40">
        <Image
          src="/images/fellowship-working.webp"
          alt="Working at the NVP Tech Room during the Learn2Earn AI Engineering Fellowship"
          width={720}
          height={960}
          sizes="(max-width: 768px) 100vw, 720px"
          priority
          className="w-full h-auto object-cover block"
        />
      </div>

      {/* ── Project cards ─────────────────────────────────────── */}
      <ol className="list-none p-0 m-0" aria-label="Fellowship projects">
        {visibleProjects.map((project) => (
          <li
            key={project.slug}
            className="border-t border-border/50 py-8 sm:py-10"
          >
            {/* number + title + badge */}
            <div className="flex items-baseline gap-3 sm:gap-4 mb-2 flex-wrap">
              <span className="font-barlow-condensed text-xs tracking-widest text-text-secondary/50 uppercase shrink-0 font-medium">
                {project.number}
              </span>

              <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-text-primary m-0 leading-none">
                {project.title}
              </h2>

              <span className="font-barlow-condensed text-[11px] tracking-wider uppercase text-text-secondary/70 border border-border/70 rounded-full px-2.5 py-0.5 shrink-0 bg-surface/40">
                {project.type}
              </span>
            </div>

            {/* concept */}
            <p className="font-barlow-condensed text-sm sm:text-base text-text-secondary leading-relaxed my-3">
              <span className="font-semibold text-text-secondary/50 uppercase tracking-widest text-xs mr-2">
                Concept
              </span>
              {project.concept}
            </p>

            {/* what broke */}
            <h3 className="font-barlow-condensed text-xs tracking-widest uppercase text-text-secondary/60 mb-2 font-semibold">
              What broke
            </h3>
            <ul className="list-none p-0 mb-6 flex flex-col gap-1.5">
              {project.broke.map((item, i) => (
                <li
                  key={i}
                  className="font-barlow-condensed text-sm sm:text-base text-text-secondary/80 leading-snug pl-4 relative"
                >
                  <span
                    className="absolute left-0 text-text-secondary/40 select-none"
                    aria-hidden="true"
                  >
                    –
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            {/* read the writeup */}
            <a
              href={projectUrl(project.slug)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-barlow-condensed text-xs uppercase tracking-widest text-text-secondary/80 hover:text-text-primary border-b border-border hover:border-text-primary pb-0.5 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
            >
              Read the writeup ↗
            </a>
          </li>
        ))}
      </ol>

      {/* ── Recurring theme ───────────────────────────────────── */}
      <section
        aria-labelledby="recurring-theme"
        className="border-t border-border/50 pt-8 sm:pt-10 mt-2"
      >
        <h2
          id="recurring-theme"
          className="font-bebas text-xl sm:text-2xl tracking-wide text-text-primary/90 mb-3"
        >
          The recurring theme
        </h2>
        <p className="font-barlow-condensed text-sm sm:text-base text-text-secondary leading-relaxed m-0">
          {recurringTheme}
        </p>
      </section>

      {/* ── Now building ──────────────────────────────────────── */}
      <p className="font-barlow-condensed text-xs sm:text-sm text-text-secondary/50 tracking-wider mt-8 sm:mt-12 mb-0">
        Now building — {nowBuilding}
      </p>
    </main>
  );
}
