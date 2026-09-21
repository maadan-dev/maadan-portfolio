import Image from 'next/image';

export function BugWasntWherePost() {
  return (
    <>
      <p>
        A few days ago, I posted a WhatsApp status: a silhouette of a head carrying the formal ε-δ definition of a limit inside its thoughts, with a caption underneath — "Can't believe this is actually useful at the end 😭"
      </p>

      <p>
        It was mostly a joke.
      </p>

      <p>
        Then a programmer on my contacts replied, genuinely confused: "How is something like this actually useful in programming?"
      </p>

      <p>
        Fair question. If you've never studied real analysis, ε and δ can look like the purest form of academic suffering.
      </p>

      <div className="my-12 relative w-full aspect-square max-w-sm mx-auto">
        <Image 
          src="/images/limit_meme.webp"
          alt="Epsilon delta definition of a limit meme"
          fill
          className="rounded-lg object-contain border border-border/50"
        />
      </div>

      <p>
        So I tried explaining it without the calculus.
      </p>

      <p>
        Think of an oven. ε is the amount of error you're willing to tolerate. δ is how precisely you need to control the input to stay within that tolerance. That's essentially the intuition behind the formal definition.
      </p>

      <p>
        And then I started seeing the programming connections everywhere.
      </p>

      <p>
        Floating-point calculations deal with tiny errors and rounding differences. Instead of expecting two computed values to be exactly equal, you check whether their difference is small enough: <code>abs(a - b) &lt; EPSILON</code>. Optimization algorithms need stopping conditions. Numerical stability matters because tiny errors can propagate into catastrophic failures.
      </p>

      <p>
        Suddenly, that definition I had memorized years ago wasn't something to reproduce in an exam. It was a way of thinking about boundaries, tolerances, and conditions.
      </p>

      <p>
        Explaining it to someone else made me realize something bigger.
      </p>

      <hr className="my-12 border-border/30" />

      <h2>A mental operating system</h2>

      <p>
        Math isn't just the collection of theorems you remember. It's a mental operating system. It trains you to ask: what exactly are the conditions here? What happens at the boundary? What am I allowed to assume?
      </p>

      <p>
        That habit follows you into engineering whether you notice it or not.
      </p>

      <p>
        I started noticing it when I was writing code. Before touching a problem, I started forcing myself to write three things:
      </p>

      <ul>
        <li><strong>ASSUMES</strong> — what must be true for this to work?</li>
        <li><strong>PROMISES</strong> — what does this function actually guarantee?</li>
        <li><strong>WILL NOT HANDLE</strong> — what is explicitly outside its responsibility?</li>
      </ul>

      <p>
        The third one is where things get interesting. Because "will not handle" is where invisible assumptions finally surface. If I write "this function will not handle duplicate values" — I've made an assumption visible. Now I can challenge it. Either way, I've stopped pretending the assumption doesn't exist.
      </p>

      <hr className="my-12 border-border/30" />

      <h2>The dangerous kind of bug</h2>

      <p>
        I learned this the hard way with quicksort. I implemented it. It worked. Then I tested it with duplicate values — and it silently dropped them from the output. No error. Just wrong results.
      </p>

      <p>
        The problem wasn't the line where I noticed the failure. It was the assumption underneath the algorithm: I had assumed the input contained distinct values. The algorithm worked perfectly under that assumption. The problem was I had never acknowledged the assumption existed.
      </p>

      <p>
        That's the dangerous kind of bug. Not because the code is complicated. Because you don't know what you're assuming.
      </p>

      <p>
        And this scales far beyond one sorting algorithm.
      </p>

      <p>
        Think about a system built from multiple services. Service A assumes Service B always returns a value. Service B assumes A will retry on failure. The database assumes requests are idempotent. The frontend assumes the API response always contains the field it needs.
      </p>

      <p>
        Every component works exactly as designed. The system still fails.
      </p>

      <p>
        Because the assumptions live between the components — not inside them. That's where most real engineering problems hide. In the gaps.
      </p>

      <hr className="my-12 border-border/30" />

      <h2>Outsourcing the thinking</h2>

      <p>
        This is also why I don't think AI tools are the problem. Outsourcing the thinking is.
      </p>

      <p>
        An AI can write the function, suggest the architecture, debug the error. But if you don't know what the system is supposed to assume, promise, or refuse to handle — you can generate perfectly reasonable code for a problem you never actually understood.
      </p>

      <p>
        I've done this myself. I skipped a hackathon once because I told myself I wasn't ready. The real problem was simpler: I hadn't opened the documentation. I had reached a conclusion before investigating the premise. That's the same mistake in a different outfit.
      </p>

      <p>
        Eventually I built a contact book from scratch. Five files. Clean structure. Every function deliberately reasoned through before a single line was written. Nothing revolutionary. But it felt different — because I wasn't just asking "how do I make this work?" I was asking "what am I assuming here?"
      </p>

      <p>
        That shift is the whole game.
      </p>

      <p>
        The goal isn't to memorize more syntax. It isn't to use fewer tools. It has nothing to do with whether you studied maths, computer science, or something else entirely.
      </p>

      <p>
        The real question is:
      </p>

      <p className="font-semibold text-lg">
        Can you find the broken assumption before you start solving?
      </p>

      <p>
        That's what maths taught me. Two years after I graduated.
      </p>
    </>
  );
}
