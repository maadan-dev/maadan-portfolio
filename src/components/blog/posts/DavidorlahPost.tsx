export function DavidorlahPost() {
  return (
    <>
      <p>
        A Lagos agribusiness needed to stop generating land contracts in Microsoft Word. Here's how I automated it — entirely in the browser, no backend, no server costs, and no sensitive data leaving the client's device.
      </p>

      <h2>The Problem</h2>
      <p>
        When a client purchases farmland from a real estate investment company, two legal documents need to be generated immediately:
      </p>
      <ol className="list-decimal pl-6 mb-6">
        <li className="mb-2">A <strong>Deed of Assignment</strong> — transferring ownership of the land plot</li>
        <li className="mb-2">A <strong>Farm Estate Management/Ownership Agreement</strong> — governing the farming relationship and ROI terms</li>
      </ol>
      <p>
        The old process: open a Word template, manually find and replace the client's name, calculate the plot price, figure out the 36% annual ROI, type the amount in words, adjust the documentation fees, repeat across both documents, pray nothing was missed.
      </p>
      <p>
        Every transaction touched by human hands is a transaction that could have the wrong figure, the wrong name, or the wrong clause. In a legal document, that's not a typo — it's a liability.
      </p>
      <p>
        The ask was simple: build a tool where staff enter client details and plot count, and both documents generate instantly as downloadable PDFs.
      </p>

      <h2>Architecture: Why I Went Fully Client-Side</h2>
      <p>
        The instinct for most developers is to reach for a backend PDF solution — Puppeteer, a headless Chrome instance, an HTML-to-PDF API. I deliberately chose not to.
      </p>
      <p><strong>The problems with backend PDF generation:</strong></p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2">Spinning up a headless browser is slow. We're talking 3–8 seconds per render depending on infrastructure.</li>
        <li className="mb-2">Running PDF renderers on serverless functions is expensive at scale. CPU-heavy operations burn through execution time fast.</li>
        <li className="mb-2">Most importantly: this tool processes real legal documents containing client names, addresses, and transaction amounts. Sending that data to any server — even your own — is a data handling responsibility you have to architect around.</li>
      </ul>
      <p><strong>The solution: <code>@react-pdf/renderer</code></strong></p>
      <p>
        This library renders PDF documents inside the browser using React components. The entire pipeline runs on the user's CPU:
      </p>
      
      <div className="my-8 p-6 rounded-lg bg-surface border border-border/50 font-mono text-sm overflow-x-auto text-accent">
        User fills form → React state updates → Calculations run instantly → @react-pdf renders in browser → PDF blob downloads directly
      </div>

      <p>
        Zero backend. Zero server costs. Zero data transmission. The client's details never leave their device.
      </p>
      <p>
        The tradeoff is that you lose server-side processing power and caching, but for a document generator of this scope, that's an entirely acceptable trade.
      </p>

      <h2>The Business Logic</h2>
      <p>
        Both documents share a single calculation engine derived from the company's fixed pricing structure:
      </p>
      <pre className="bg-[#050505] p-6 rounded-lg border border-border/50 overflow-x-auto text-sm my-6 text-text-primary"><code>{`const PLOT_PRICE = 2_999_999           // ₦2,999,999 per plot — not ₦3M, intentional
const ANNUAL_ROI_RATE = 0.36           // 36% guaranteed annual return
const DEED_FEE = 100_000               // per plot
const SURVEY_FEE = 250_000             // per plot

function calculateTotals(plots: number, deposit?: number) {
  const plotPrice = PLOT_PRICE * plots
  const annualROI = plotPrice * ANNUAL_ROI_RATE
  const deedFee = DEED_FEE * plots
  const surveyFee = SURVEY_FEE * plots
  const totalDocFees = deedFee + surveyFee
  const totalPayable = plotPrice + totalDocFees
  const balance = deposit ? plotPrice - deposit : 0

  // Installment duration: 3 months for 1 plot, 6 months for 2+
  const installmentDuration = plots >= 2 ? 6 : 3

  return { plotPrice, annualROI, deedFee, surveyFee, totalDocFees, totalPayable, balance, installmentDuration }
}`}</code></pre>
      <p>
        One important detail: the plot price is ₦2,999,999 — not ₦3,000,000. That's deliberate pricing psychology on the company's part. The generator preserves it exactly.
      </p>
      <p>
        The tool also handles two payment scenarios with conditional document content:
      </p>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2"><strong>Full payment:</strong> straightforward lump sum clause</li>
        <li className="mb-2"><strong>Installment:</strong> deposit amount, balance, duration, and adjusted clause wording — all auto-populated</li>
      </ul>

      <h2>The Bug Log</h2>
      <p>
        This is where it gets interesting. Here's every technical problem I hit and how I solved each one.
      </p>

      <h3>Bug 1: The Naira Symbol Rendered as a Broken Pipe (¦)</h3>
      <p>Every <code>₦</code> in the document came out as <code>¦</code>.</p>
      <p><strong>Why:</strong> <code>@react-pdf/renderer</code> defaults to standard PDF core fonts — Helvetica, Times-Roman. These are legacy fonts that predate Unicode's Naira symbol (<code>U+20A6</code>). The glyph simply doesn't exist in their character maps.</p>
      <p><strong>Fix:</strong> Register a modern Unicode-compliant font via <code>Font.register()</code>. Roboto contains the correct Naira glyph and renders it cleanly.</p>

      <h3>Bug 2: Google Fonts CDN Returned 404s</h3>
      <p>After switching to Roboto, font loading failed with a 404.</p>
      <p><strong>Why:</strong> I pointed <code>Font.register()</code> at Google Fonts' CDN <code>.woff2</code> URLs. Google dynamically re-hashes these filenames during font updates. The URL I hardcoded became stale.</p>
      <p><strong>Fix:</strong> Use the stable, versioned <code>.ttf</code> URLs from Google's static servers (locked to a specific version tag) instead of the dynamic CDN paths. Better yet — download the font file locally and serve it from <code>/public/fonts/</code>. No external dependency, no surprise breakage.</p>

      <h3>Bug 3: The fi/fl Ligature Bug — Characters Dropping Silently</h3>
      <p>Words containing <code>fi</code>, <code>fl</code>, or <code>ff</code> were rendering with missing characters. "first" became "frst". "five" became "fve". "affixed" became "afxed".</p>
      <p>This one was subtle. The PDFs looked mostly fine at a glance but read wrong on close inspection — exactly the kind of bug that would embarrass you in a legal document.</p>
      <p><strong>Why:</strong> <code>@react-pdf</code>'s underlying font shaping engine (fontkit) reads a font's GSUB table — the Glyph Substitution table. When it encounters <code>f</code> followed by <code>i</code>, it substitutes both characters with a single ligature glyph (<code>ﬁ</code>). The problem is the renderer then fails to compile that ligature glyph into the final PDF output, leaving a blank where the ligature was.</p>
      <p><strong>Fix:</strong> Strip the GSUB table from the font file entirely. A custom Node.js script parses the downloaded Roboto TTF binary and zeroes out the GSUB table data, replacing it with a minimal empty stub. Without ligature mappings, the engine renders every character individually — <code>f</code> and <code>i</code> separately — which is exactly what we need.</p>

      <h3>Bug 4: Automatic Word Hyphenation Breaking Legal Copy</h3>
      <p>Standard words were being split mid-word across line breaks with hyphens. Legal text does not hyphenate. It looked wrong immediately.</p>
      <p><strong>Why:</strong> <code>@react-pdf</code> applies an automatic hyphenation algorithm to text wrapping by default.</p>
      <p><strong>Fix:</strong> One line:</p>
      <pre className="bg-[#050505] p-6 rounded-lg border border-border/50 overflow-x-auto text-sm my-6 text-text-primary"><code>{`Font.registerHyphenationCallback(word => [word])`}</code></pre>
      <p>This tells the layout engine never to split any word, ever. Line wrapping happens at word boundaries only.</p>

      <h3>Bug 5: Number-in-Words Failing Beyond 10</h3>
      <p>For small plot counts everything looked right — "THREE (3) PLOTS". For larger purchases it fell apart — "32 (32) PLOTS".</p>
      <p><strong>Why:</strong> The initial implementation used a static array lookup that only covered 0–10. Anything beyond that fell through to the raw number.</p>
      <p><strong>Fix:</strong> Replace the static array with the <code>number-to-words</code> npm package. It handles any integer correctly and dynamically — "THIRTY-TWO (32) PLOTS", "ONE HUNDRED AND TWENTY (120) PLOTS", whatever the input.</p>

      <h3>Bug 6: A Ghost Hyphen Appearing Before the Amount in Words</h3>
      <p>Page 2 of the Deed displayed: <code>₦32,999,989.00 (-Thirty-Two Million...)</code></p>
      <p>That hyphen before "Thirty" wasn't in the template. It appeared out of nowhere.</p>
      <p><strong>Why:</strong> The markup was structured as <code>{`{priceInFigures} ({priceInWords})`}</code>. When the text justified and wrapped, the line break landed exactly between the opening parenthesis <code>(</code> and the first word. The layout engine inserted an automatic hyphen at the line break point, visually producing <code>(-</code>.</p>
      <p><strong>Fix:</strong> Combine the values into a single string using a non-breaking space (<code>\u00A0</code>):</p>
      <pre className="bg-[#050505] p-6 rounded-lg border border-border/50 overflow-x-auto text-sm my-6 text-text-primary"><code>{`const priceDisplay = \`\${priceInFigures}\\u00A0(\${priceInWords})\``}</code></pre>
      <p>The non-breaking space forces the engine to treat the figure and the opening parenthesis as one unbreakable unit. The line break moves elsewhere and the hyphen disappears.</p>

      <h3>Bug 7: A Phantom Blank Page in the Farm Agreement</h3>
      <p>Page 2 of the Farm Agreement was completely empty. Content jumped from page 1 to page 3.</p>
      <p><strong>Why:</strong> The document had separate <code>&lt;Page&gt;</code> containers for the introductory clauses and the WHEREAS section. The introductory text overflowed its A4 height limit, causing the engine to generate a continuation page. The next explicit <code>&lt;Page&gt;</code> component then started fresh, leaving the overflow continuation blank.</p>
      <p><strong>Fix:</strong> Merge the introductory section and WHEREAS clauses into a single <code>&lt;Page&gt;</code> container and let the content flow naturally. The engine handles pagination automatically from that point. The document went from 5 pages to 4 pages — the correct count.</p>

      <h2>What the Tool Actually Does</h2>
      <p><strong>Input:</strong> client name(s), address, number of plots, payment type, date.</p>
      <p><strong>Output:</strong> two legally structured, correctly calculated, print-ready PDF documents — generated in under two seconds, entirely in the browser.</p>
      <p>The summary card updates live as you type. All figures recalculate in real time. Both PDFs download with one click after generation.</p>
      <p>The tool is hosted as a demo at <a href="https://tools.maadan.dev" target="_blank" rel="noopener noreferrer">tools.maadan.dev</a> under the client's branding before handover.</p>

      <h2>Takeaways</h2>
      <ul className="list-disc pl-6 mb-6">
        <li className="mb-2"><strong>Host your fonts locally.</strong> CDN font URLs break silently and at the worst possible time. Serve from <code>/public/fonts/</code> and eliminate the dependency.</li>
        <li className="mb-2"><strong>Know your renderer's limitations before you start.</strong> <code>@react-pdf/renderer</code> is powerful but it has sharp edges — ligatures, hyphenation, and page overflow all behave differently than you'd expect from a browser layout engine. Read the internals before you hit them as bugs.</li>
        <li className="mb-2"><strong>Client-side PDF generation is underused.</strong> Most developers default to backend solutions out of habit. For document generators handling sensitive data with moderate complexity, running everything in the browser is faster, cheaper, and more private.</li>
        <li className="mb-2"><strong>The boring problems are the expensive ones.</strong> None of these bugs were architecturally interesting. They were font encoding, string formatting, and page container scoping. But each one would have made the tool look broken in front of a paying client. The craft is in catching all of them.</li>
      </ul>

      <div className="mt-16 pt-8 border-t border-border/50 italic text-sm text-text-secondary">
        <p>Built with Next.js, @react-pdf/renderer, and number-to-words. Deployed on Vercel.</p>
      </div>
    </>
  );
}
