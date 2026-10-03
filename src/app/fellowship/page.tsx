import type { Metadata } from "next";
import { FellowshipView } from "@/views/FellowshipView";
import { fellowshipIntro, projects, recurringTheme } from "@/data/fellowship";

export const metadata: Metadata = {
  title: "Fellowship | Yekeen Maadan",
  description:
    "A Python project series built during the Learn2Earn AI Engineering Fellowship — one repo, real bugs, and what each project taught me.",
  alternates: {
    canonical: "https://www.maadan.dev/fellowship",
  },
  openGraph: {
    title: "Fellowship | Yekeen Maadan",
    description:
      "A Python project series built during the Learn2Earn AI Engineering Fellowship — one repo, real bugs, and what each project taught me.",
    url: "https://www.maadan.dev/fellowship",
    siteName: "Maadan Dev",
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
      "A Python project series built during the Learn2Earn AI Engineering Fellowship — one repo, real bugs, and what each project taught me.",
    images: ["/og/fellowship.jpg"],
    site: "@maadan_dev",
    creator: "@maadan_dev",
  },
};

export default function FellowshipPage() {
  return (
    <>
      {/* SEO-visible server-rendered content for search crawlers */}
      <div className="sr-only">
        <h1>Learn2Earn AI Engineering Fellowship Python Project Series — Yekeen Maadan</h1>
        <p>{fellowshipIntro}</p>
        <p>{recurringTheme}</p>
        <ul>
          {projects.map((p) => (
            <li key={p.slug}>
              <h2>
                {p.number}. {p.title} ({p.type})
              </h2>
              <p>{p.concept}</p>
              <ul>
                {p.broke.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Main client view with rich animations and interactive cards */}
      <div data-nosnippet>
        <FellowshipView />
      </div>
    </>
  );
}
