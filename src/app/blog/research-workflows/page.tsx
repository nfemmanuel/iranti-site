import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Persistent Memory for AI Research Workflows — Iranti",
  description:
    "Three research use cases where persistent agent memory changes the workflow: literature review, hypothesis tracking, and long-form manuscript writing. How researchers stop re-briefing their AI every session.",
  alternates: { canonical: "/blog/research-workflows" },
  openGraph: {
    title: "Persistent Memory for AI Research Workflows — Iranti",
    description:
      "Three research use cases where persistent agent memory changes the workflow: literature review, hypothesis tracking, and long-form manuscript writing.",
    type: "article",
    url: "https://iranti.site/blog/research-workflows",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Persistent Memory for AI Research Workflows — Iranti",
    description:
      "Three research use cases where persistent agent memory changes the workflow. How researchers stop re-briefing their AI every session.",
  },
};

export default function ResearchWorkflowsPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        {/* Header */}
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/blog"
                className="text-xs font-mono text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
              >
                ← blog
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <time className="text-xs font-mono text-[var(--text-faint)]">2026-04-07</time>
              {["research", "use cases", "workflows"].map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              Your AI research assistant shouldn&apos;t lose its memory every session
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Three research workflows where persistent agent memory eliminates the most frustrating
              part of working with AI: having to re-explain everything from scratch each time.
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The problem is re-briefing</h2>
              <p className="mb-4">
                Researchers who work with AI assistants regularly hit the same wall: each new session
                starts blank. The AI doesn&apos;t know what papers you already read last Tuesday, which
                experimental branches you ruled out in December, or what the argument structure of
                chapter four was before you restructured it. So you explain. Again.
              </p>
              <p className="mb-4">
                This isn&apos;t a failure of the model. It&apos;s a failure of the memory layer — or rather,
                the absence of one. The model is stateless by design. The question is whether the
                infrastructure around it is.
              </p>
              <p>
                Iranti is persistent shared memory for AI agents. It stores structured facts across
                sessions, survives context window limits, and lets agents pick up exactly where they
                left off. What follows are three research use cases where that difference is most
                concrete.
              </p>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--border-subtle)]" />

            {/* Use case 1 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-teal-500 bg-teal-500/10 px-2 py-1 rounded uppercase tracking-wider">Use case 1</span>
                <span className="text-xs text-[var(--text-faint)] font-mono">Literature review &amp; synthesis</span>
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Building a knowledge graph across 50 papers — one session at a time
              </h2>
              <p className="mb-4">
                A literature review isn&apos;t a single session. You read papers across days or weeks,
                making connections, flagging contradictions, noting which claims need verification.
                The problem is that a stateless AI assistant treats each session as the first one.
                By session twelve, you&apos;ve re-explained your research area from scratch eleven times.
              </p>
              <p className="mb-4">
                With Iranti, the agent writes facts to memory as it reads. A paper on attention
                mechanisms gets stored under <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">paper/attention-is-all-you-need</code> with
                a summary, key claims, and a flag that it&apos;s been read. Contradictions with earlier
                papers get linked explicitly. Next session, the agent queries what&apos;s been covered
                before diving into a new paper — no re-reading, no re-briefing.
              </p>
              <p className="mb-4">
                The result isn&apos;t just efficiency. It&apos;s continuity. An agent that knows what it already
                knows can make connections across the full body of work rather than reasoning only from
                whatever fits in the current context window.
              </p>

              {/* Concrete memory example */}
              <div className="p-4 border border-teal-500/20 bg-teal-500/5 rounded-xl text-xs font-mono text-[var(--text-muted)] space-y-1.5">
                <div className="text-teal-500 uppercase tracking-wider text-[10px] mb-2">What gets stored</div>
                <div><span className="text-[var(--text-faint)]">entity:</span> <span className="text-teal-300">paper/vaswani-2017-attention</span></div>
                <div><span className="text-[var(--text-faint)]">key:</span> <span className="text-teal-300">synthesis</span></div>
                <div><span className="text-[var(--text-faint)]">value:</span> <span className="text-teal-300">{"{ summary, key_claims, contradicts: ['paper/bahdanau-2015-alignment'], status: 'read' }"}</span></div>
                <div><span className="text-[var(--text-faint)]">confidence:</span> <span className="text-teal-300">0.9</span></div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--border-subtle)]" />

            {/* Use case 2 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-teal-500 bg-teal-500/10 px-2 py-1 rounded uppercase tracking-wider">Use case 2</span>
                <span className="text-xs text-[var(--text-faint)] font-mono">Hypothesis tracking &amp; experimental iteration</span>
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                Keeping an AI in the loop across a full experimental cycle
              </h2>
              <p className="mb-4">
                Experimental research is iterative. You run an experiment, interpret results with AI
                help, form a revised hypothesis, and run again — sometimes across weeks. The model
                helping you interpret run 47 has no idea what happened in runs 1 through 46.
                So you paste in a summary of the last three runs, which means the model is really
                only working with whatever context you remembered to include.
              </p>
              <p className="mb-4">
                With Iranti, each experimental run gets written to memory with its parameters,
                outcome, and your verdict on what it means. The AI agent can query the full
                experimental history before interpreting a new result — not just the last three
                runs, but every run where a specific parameter was varied, every branch that
                was ruled out and why.
              </p>
              <p className="mb-4">
                This changes what the agent can reason about. Instead of working from a summary
                you cobbled together, it&apos;s working from a structured log of what actually happened.
                Dead ends stay dead. Ruled-out hypotheses stay ruled out. The agent doesn&apos;t
                re-suggest what you already tried.
              </p>

              <div className="p-4 border border-teal-500/20 bg-teal-500/5 rounded-xl text-xs font-mono text-[var(--text-muted)] space-y-1.5">
                <div className="text-teal-500 uppercase tracking-wider text-[10px] mb-2">What gets stored</div>
                <div><span className="text-[var(--text-faint)]">entity:</span> <span className="text-teal-300">experiment/run-047</span></div>
                <div><span className="text-[var(--text-faint)]">key:</span> <span className="text-teal-300">result</span></div>
                <div><span className="text-[var(--text-faint)]">value:</span> <span className="text-teal-300">{"{ accuracy: 0.82, params: { lr: 0.001, epochs: 40 }, verdict: 'ruled out — overfitting at epoch 10' }"}</span></div>
                <div><span className="text-[var(--text-faint)]">confidence:</span> <span className="text-teal-300">1.0</span></div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--border-subtle)]" />

            {/* Use case 3 */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-mono text-teal-500 bg-teal-500/10 px-2 py-1 rounded uppercase tracking-wider">Use case 3</span>
                <span className="text-xs text-[var(--text-faint)] font-mono">Manuscript &amp; dissertation writing</span>
              </div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                An AI writing collaborator that actually knows where you left off
              </h2>
              <p className="mb-4">
                Writing a dissertation or long paper with AI assistance is a months-long project.
                Each writing session, you open a conversation and explain what the argument is, where
                the chapter fits, what the last reviewer said, and what you&apos;re trying to fix. The AI
                helps for that session. Next time, you explain it all again.
              </p>
              <p className="mb-4">
                With Iranti, the manuscript&apos;s structure lives in memory — each chapter&apos;s argument,
                its current draft status, the editorial decisions made so far, and the reviewer
                feedback that&apos;s still unresolved. The agent can retrieve the state of the manuscript
                before the session starts. It knows chapter three was restructured last week, that
                the passive voice note from the supervisor still applies to section 3.2, and that
                the conclusion is the priority this session.
              </p>
              <p className="mb-4">
                This also helps when multiple AI sessions touch the same work. Each session can
                write its changes and decisions back to memory, so the next session — even in a
                different tool — starts with an accurate picture of the current state.
              </p>

              <div className="p-4 border border-teal-500/20 bg-teal-500/5 rounded-xl text-xs font-mono text-[var(--text-muted)] space-y-1.5">
                <div className="text-teal-500 uppercase tracking-wider text-[10px] mb-2">What gets stored</div>
                <div><span className="text-[var(--text-faint)]">entity:</span> <span className="text-teal-300">manuscript/chapter-3</span></div>
                <div><span className="text-[var(--text-faint)]">key:</span> <span className="text-teal-300">status</span></div>
                <div><span className="text-[var(--text-faint)]">value:</span> <span className="text-teal-300">{"{ draft: 'v3', argument: 'contrastive learning reduces labelling cost', open_notes: ['passive voice in 3.2', 'citation needed — claim on p.7'] }"}</span></div>
                <div><span className="text-[var(--text-faint)]">confidence:</span> <span className="text-teal-300">0.95</span></div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[var(--border-subtle)]" />

            {/* Honest limits */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What to know before trying this</h2>
              <p className="mb-4">
                Iranti is structured memory — it stores explicit, keyed facts, not a free-form
                transcript. That means the AI agent needs to write facts deliberately, using
                the <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">iranti_write</code> tool
                and explicit entity+key addressing. It won&apos;t automatically extract memory from an
                unstructured conversation.
              </p>
              <p className="mb-4">
                The upside of that design is reliability: facts are stored at known addresses,
                retrievable by exact lookup, with provenance and timestamps attached. The agent
                and the researcher can both inspect what&apos;s in memory. There are no surprises about
                what was retained or lost.
              </p>
              <p>
                The current version requires a local PostgreSQL setup. If you&apos;re comfortable with
                that, the setup guide is short. Claude Code and Codex integration is one command.
              </p>
            </div>

            {/* CTA */}
            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Get started</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                Install Iranti, bind it to your project, and run <code className="text-teal-400 bg-[var(--bg-base)] px-1.5 py-0.5 rounded">iranti claude-setup</code> to
                connect it to Claude Code. The first session with persistent memory usually
                demonstrates the value immediately.
              </p>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://github.com/nfemmanuel/iranti#readme"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install guide →
                </a>
                <Link
                  href="/integrations"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  Integrations →
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
