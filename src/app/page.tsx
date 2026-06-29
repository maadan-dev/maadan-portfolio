import { HomePage } from '../views/HomePage';

export default function HomeRoute() {
  return (
    <>
      {/* Server-rendered content for crawlers — matches meta description */}
      <div className="sr-only">
        <h1>Abdulyekeen Maadan — Software Developer, Lagos, Nigeria</h1>
        <p>
          Software developer based in Lagos. I build real products for real
          clients using React, TypeScript, Go, and AI-augmented workflows.
          Currently shipping NextRole NG — a full-stack CV optimization tool
          for the Nigerian job market.
        </p>
      </div>
      <div data-nosnippet>
        <HomePage />
      </div>
    </>
  );
}

