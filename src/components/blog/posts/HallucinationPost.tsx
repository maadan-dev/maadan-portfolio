export function HallucinationPost() {
  return (
    <>
      <p>
        When I first built <a href="https://nextroleng.tech" target="_blank" rel="noopener noreferrer">NextRole NG</a>, the AI was confidently inserting CRM experience, Next.js, and Ionic into CVs of candidates who had never touched those tools. The output looked impressive. It was fiction.
      </p>
      <p>
        A candidate who submitted that CV to GTBank would get caught in the background check and blacklisted. The tool wasn't just unhelpful — it was actively harmful.
      </p>
      <p>
        Every fix I tried at the prompt level made things marginally better and then worse in a different way. It took me a while to realise I was solving the wrong problem. The hallucination wasn't coming from bad prompts. It was coming from bad architecture.
      </p>

      <h2>The Root Cause Nobody Talks About</h2>
      <p>
        Most AI CV tools make one LLM call. They pass in the CV, pass in the job description, and ask the model to produce an optimized CV. The problem is that this puts the model in two incompatible modes simultaneously — <strong>extraction mode</strong> and <strong>generation mode</strong> — inside the same call.
      </p>
      <p>
        In extraction mode, the model should be conservative and faithful. It should only report what is actually in the document. In generation mode, the model is rewarded for producing impressive, relevant output. When you combine these in one call, generation mode wins. The model starts with what's in the CV and then drifts toward what would make the output look good.
      </p>
      <p>
        This is not a prompt engineering failure. You cannot write a system instruction that fully overrides this dynamic because the tension is structural. The model is optimizing for output quality within the same call where it's supposed to be reporting facts. Asking it to "never invent skills" while simultaneously asking it to "rewrite these bullets to be more impressive" is asking it to hold two opposing objectives at the same time.
      </p>
      <p>
        The fix is to separate these modes architecturally.
      </p>

      <h2>The Two-Phase Solution</h2>
      <p>
        <strong>Phase 1</strong> has one job: extract verified facts. Nothing else. It receives the CV — either as raw text or as a PDF passed directly to Gemini's multimodal API — and returns a structured JSON object I call <code>CVFacts</code>. This contains the candidate's roles with their original bullets, tools they actually used, achievements with real numbers, education with actual grades, and projects with real links.
      </p>
      <p>
        The Phase 1 prompt has no generative instruction in it at all. It is purely extractive. The model is not asked to improve anything, reframe anything, or make anything sound better. It is asked to report what is there.
      </p>
      <p>
        <strong>Phase 2</strong> receives <code>CVFacts</code> as its ground truth. It never sees the original CV. It can only work with what Phase 1 extracted. The prompt is explicit: you may combine similar responsibilities, reframe tasks into achievements, infer impact without inventing numbers, and prioritize tools based on job relevance. You may <em>not</em> create fake companies, create fake roles, or introduce tools not present in <code>CVFacts</code>.
      </p>
      <p>
        This architectural separation does something a single-call system cannot: it forces the model to commit to facts before it enters generation mode. By the time Phase 2 starts rewriting, the facts are locked. The model cannot drift toward impressive fiction because the fiction has no entry point — it would have to contradict the structured data it received as input, which models are strongly disinclined to do.
      </p>

      <div className="my-12 p-6 md:p-8 rounded-lg bg-surface border border-border/50">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-6">Architecture Overview</p>
        <div className="flex flex-col gap-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-24 font-mono text-xs text-text-secondary text-right">INPUT</span>
            <span className="h-px flex-1 bg-border/50"></span>
            <span className="shrink-0 px-3 py-1.5 bg-surface-hover rounded border border-border text-text-primary">CV (PDF / DOCX / Text)</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-text-secondary text-lg">↓</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-24 font-mono text-xs text-accent text-right">PHASE 1</span>
            <span className="h-px flex-1 bg-accent/30"></span>
            <span className="shrink-0 px-3 py-1.5 bg-accent/10 rounded border border-accent/30 text-text-primary">Extract facts only → <code className="text-accent">CVFacts</code></span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-text-secondary text-lg">↓</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-24 font-mono text-xs text-accent text-right">PHASE 2</span>
            <span className="h-px flex-1 bg-accent/30"></span>
            <span className="shrink-0 px-3 py-1.5 bg-accent/10 rounded border border-accent/30 text-text-primary">Generate from <code className="text-accent">CVFacts</code> only</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-text-secondary text-lg">↓</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-24 font-mono text-xs text-text-secondary text-right">VERIFY</span>
            <span className="h-px flex-1 bg-border/50"></span>
            <span className="shrink-0 px-3 py-1.5 bg-surface-hover rounded border border-border text-text-primary">Post-generation constraint checks</span>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-text-secondary text-lg">↓</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-24 font-mono text-xs text-text-secondary text-right">OUTPUT</span>
            <span className="h-px flex-1 bg-border/50"></span>
            <span className="shrink-0 px-3 py-1.5 bg-surface-hover rounded border border-border text-text-primary">Verified, hallucination-free CV</span>
          </div>
        </div>
      </div>

      <h2>The Layered Constraint System</h2>
      <p>
        Architecture alone is not enough. Phase 2 still has generative freedom within the facts it receives, and that freedom can produce subtle distortions — injecting a tool from one role into another role's bullets, pattern-matching to a training example instead of the candidate's actual experience, softening honest assessments into corporate-friendly vagueness.
      </p>
      <p>
        Each of these failure modes got its own constraint layer:
      </p>

      <h3>Cross-role tool contamination</h3>
      <p>
        The Phase 2 prompt receives roles as a structured block — title, company, duration, and original bullets per role — not as a flat list. An explicit rule states that a tool may only appear in a bullet for the role where it appeared in the original content. A candidate who used Power BI at Cowrywise and Excel in a freelance role cannot have Power BI appear in their freelance bullets.
      </p>

      <h3>Absent keyword injection</h3>
      <p>
        When a job description mentions Tableau and the candidate has never used Tableau, the naive approach is to stuff Tableau into bullets anyway. My prompt reframes missing keywords not as targets but as hard exclusions: <em>these skills are absent from the candidate's CV — do not introduce them under any circumstance</em>. If the JD requires them and they are genuinely absent, reflect that in the match score and weak areas only.
      </p>

      <h3>Strong bullet preservation</h3>
      <p>
        If a bullet already follows APR structure (Action-Process-Result) with a real metric, the model is instructed to enhance it minimally — not simplify it, not split it, not remove the number. The goal is improvement, not replacement.
      </p>

      <h3>Honest alignment scoring</h3>
      <p>
        If the model returns <code>alignment: weak</code> but <code>recommended_action: proceed</code>, a post-generation verification layer catches the contradiction and corrects it programmatically before the response reaches the user. The AI doesn't get the final word — code does.
      </p>

      <h2>What This Produces</h2>
      <p>
        The result is a system where the AI operates as a <strong>constrained editor</strong> rather than a creative writer. It cannot invent. It can only reframe, prioritize, and sharpen what is already there.
      </p>
      <p>
        This matters beyond the technical implementation. The trust model for a CV tool is different from most AI products. If a writing assistant invents a sentence, the user reads it and decides whether it sounds right. If a CV tool invents a skill, the user submits it to an employer, gets caught, and gets blacklisted in an industry. The cost of hallucination is not a bad paragraph — it is a real person's career.
      </p>
      <p>
        The constraint system is not just good engineering. It is the product's ethical foundation. <em>No fake experience</em> is a hard rule, not a guideline, and the architecture enforces it at every layer.
      </p>

      <div className="mt-16 pt-8 border-t border-border/50">
        <p>
          I built NextRole NG in roughly two weeks after completing a 30-day Go bootcamp. The hallucination problem took longer to solve than the entire rest of the pipeline. That felt disproportionate until I understood why — because the hallucination problem is not a technical problem. It is a product integrity problem that happens to have a technical solution.
        </p>
        <p>
          If you are building anything where AI output has real consequences for real people, the question worth asking is not <em>"how do I prompt this better."</em> It is <em>"what does the architecture need to look like so the model cannot lie even if it wanted to."</em>
        </p>
      </div>
    </>
  );
}
