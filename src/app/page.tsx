import { HomePage } from '../views/HomePage';

export default function HomeRoute() {
  return (
    <>
      {/* Server-rendered content for crawlers — matches meta description */}
      <div className="sr-only">
        <h1>Abdulyekeen Maadan — Software Developer, Lagos, Nigeria</h1>
        <p>
          Software developer based in Lagos. I build production software for real
          clients using Next.js, React, TypeScript, and Go. Open for freelance and
          part-time remote work.
        </p>
      </div>
      <div data-nosnippet>
        <HomePage />
      </div>
    </>
  );
}

