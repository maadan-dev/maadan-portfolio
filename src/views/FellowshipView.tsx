"use client";

import Image from "next/image";
import {
  projects,
  projectUrl,
  REPO_URL,
  fellowshipIntro,
  recurringTheme,
  nowBuilding,
} from "../data/fellowship";

export function FellowshipView() {
  const visibleProjects = projects.filter((project) => !project.draft);

  return (
    <main className="min-h-screen pt-24 sm:pt-28 pb-20 bg-background">
      {/* ── 1/3 VH Split Hero: Requested Typography on Left, Fading Photo on Right ── */}
      <section className="relative w-full border-b border-border/50 overflow-hidden min-h-[38vh] flex items-center mb-12 sm:mb-16">
        {/* Right-anchored fading photo backdrop (head intact, bottom cropped) */}
        <div className="absolute top-0 right-0 w-full md:w-[50%] lg:w-[46%] h-full z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/fellowship-working.webp"
            alt="Yekeen Maadan working at the NVP Tech Room during the Learn2Earn AI Engineering Fellowship"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 750px"
            className="object-cover object-[center_25%] opacity-35 sm:opacity-40 filter contrast-[112%]"
          />

          {/* Seamless multi-directional fade into the #050505 page background */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(
                  to right,
                  #050505 0%,
                  rgba(5, 5, 5, 0.98) 20%,
                  rgba(5, 5, 5, 0.65) 55%,
                  rgba(5, 5, 5, 0.25) 85%,
                  rgba(5, 5, 5, 0.65) 100%
                ),
                linear-gradient(
                  to bottom,
                  rgba(5, 5, 5, 0.8) 0%,
                  transparent 20%,
                  transparent 75%,
                  #050505 100%
                )
              `,
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12 sm:py-16 relative z-10 w-full">
          <div className="max-w-2xl">
            {/* Kicker */}
            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <span className="font-mono text-xs uppercase tracking-widest text-accent flex items-center gap-2">
                <span>&gt;_</span> 03 // SYSTEMS &amp; AI FELLOWSHIP
              </span>
              <span className="h-px w-6 bg-border/80 hidden sm:inline-block" />
              <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-text-secondary/70 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LEARN2EARN COHORT
              </span>
            </div>

            {/* Title: Bebas Neue with Accent Series */}
            <h1 className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-tight text-text-primary leading-[0.92] uppercase mb-5">
              FELLOWSHIP <span className="text-accent">SERIES.</span>
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-lg text-text-secondary font-light max-w-xl leading-relaxed mb-8">
              A Python project series, one repo, built during the Learn2Earn AI Engineering Fellowship.
              Each project links to its README for the full writeup. One continuous monorepo
              documenting the transition from core data structures and CLI utilities to autonomous LLM
              agents, document generators, and desktop interfaces — emphasizing what broke, why it
              broke, and the mental models gained.
            </p>

            {/* Metrics Bar & GitHub CTA */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-5 border-t border-border/50">
              <div className="bg-surface/80 border border-border/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="font-bebas text-lg text-accent leading-none">04</span>
                <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Shipped Builds
                </span>
              </div>
              <div className="bg-surface/80 border border-border/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="font-bebas text-lg text-text-primary leading-none">01</span>
                <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Monorepo
                </span>
              </div>
              <div className="bg-surface/80 border border-border/80 px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="font-bebas text-lg text-text-primary leading-none">100%</span>
                <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider">
                  Post-Mortem Logged
                </span>
              </div>

              <a
                href={REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-hover/80 hover:bg-accent/15 border border-border hover:border-accent/40 text-text-primary hover:text-accent font-mono text-xs uppercase tracking-widest transition-all duration-300 ml-0 sm:ml-auto"
              >
                <span>&lt;/&gt;</span>
                <span>maadan-dev / python-project-series</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content: Clean, Minimal Editorial List (No Glassmorphism Cards, No Glowing Blobs) ── */}
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        {/* Project List */}
        <ol className="list-none p-0 m-0" aria-label="Fellowship projects">
          {visibleProjects.map((project) => (
            <li
              key={project.slug}
              className="border-t border-border/50 py-8 sm:py-10"
            >
              {/* Number + Title + Badge */}
              <div className="flex items-baseline gap-3 sm:gap-4 mb-2 flex-wrap">
                <span className="font-mono text-xs tracking-widest text-accent uppercase shrink-0 font-medium">
                  {project.number}
                </span>

                <h2 className="font-bebas text-2xl sm:text-3xl tracking-wide text-text-primary m-0 leading-none">
                  {project.title}
                </h2>

                <span className="font-mono text-[11px] tracking-wider uppercase text-text-secondary/70 border border-border/70 rounded-full px-2.5 py-0.5 shrink-0 bg-surface/40">
                  {project.type}
                </span>
              </div>

              {/* Concept */}
              <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed my-3 font-light">
                <span className="font-mono text-xs font-semibold text-text-primary/70 uppercase tracking-widest mr-2">
                  Concept:
                </span>
                {project.concept}
              </p>

              {/* What Broke */}
              <div className="my-4">
                <h3 className="font-mono text-xs tracking-widest uppercase text-text-secondary/60 mb-2 font-semibold">
                  What broke:
                </h3>
                <ul className="list-none p-0 mb-6 flex flex-col gap-1.5">
                  {project.broke.map((item, i) => (
                    <li
                      key={i}
                      className="font-mono text-xs sm:text-[13px] text-text-secondary/85 leading-snug pl-4 relative"
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
              </div>

              {/* Read the Writeup Link */}
              <a
                href={projectUrl(project.slug)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs uppercase tracking-widest text-accent hover:text-white border-b border-accent/40 hover:border-white pb-0.5 transition-colors inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xs"
              >
                Read the writeup ↗
              </a>
            </li>
          ))}
        </ol>

        {/* Recurring Theme — Clean, Simple Section */}
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
          <p className="font-sans text-sm sm:text-base text-text-secondary leading-relaxed m-0 font-light">
            {recurringTheme}
          </p>
        </section>

        {/* Now Building */}
        <p className="font-mono text-xs sm:text-sm text-text-secondary/50 tracking-wider mt-8 sm:mt-12 mb-0">
          Now building — <span className="text-text-primary/80">{nowBuilding}</span>
        </p>
      </div>
    </main>
  );
}
