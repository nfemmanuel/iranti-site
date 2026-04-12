import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "Five Things Iranti Solves That Memory Layers Don't | Iranti",
  description:
    "Most AI memory layers store facts. Iranti coordinates agents. Here are five real problems Iranti solves that no generic memory layer touches — backed by benchmark data.",
  alternates: { canonical: "/blog/agent-coordination-layer" },
  openGraph: {
    title: "Five Things Iranti Solves That Memory Layers Don't",
    description:
      "Most AI memory layers store facts. Iranti coordinates agents. Five proven use cases, benchmark data included.",
    type: "article",
    url: "https://iranti.dev/blog/agent-coordination-layer",
    siteName: "Iranti",
    images: [{ url: "https://iranti.dev/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Five Things Iranti Solves That Memory Layers Don't",
    description:
      "Most AI memory layers store facts. Iranti coordinates agents. Five proven use cases with benchmark data.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Five Things Iranti Solves That Memory Layers Don't",
  description:
    "Most AI memory layers store facts. Iranti coordinates agents. Here are five real problems Iranti solves that no generic memory layer touches — backed by benchmark data.",
  datePublished: "2026-04-12",
  dateModified: "2026-04-12",
  author: {
    "@type": "Organization",
    name: "Iranti",
    url: "https://iranti.dev",
  },
  publisher: {
    "@type": "Organization",
    name: "Iranti",
    url: "https://iranti.dev",
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://iranti.dev/blog/agent-coordination-layer",
  },
  keywords: [
    "AI agent coordination",
    "multi-agent memory",
    "Claude Code memory",
    "agent session recovery",
    "cross-tool AI context",
    "MCP memory server",
    "AI coding tools",
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Is Iranti just a vector database wrapper?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Iranti uses PostgreSQL with pgvector for storage, but the primary retrieval path is deterministic addressed lookup (entity + key), not similarity search. Vector search exists for when the exact key is unknown. The architecture also includes a conflict resolution layer, an operator visibility API, and a session recovery mechanism — none of which a vector database provides.",
      },
    },
    {
      "@type": "Question",
      name: "How is Iranti different from Claude's built-in memory?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Claude's built-in memory is single-agent and lives inside Anthropic's infrastructure. Iranti is self-hostable, multi-agent, and tool-agnostic — the same memory store works for Claude Code, Codex, GitHub Copilot, and any other MCP-compatible client. Claude's memory does not survive switching to Codex. Iranti's does.",
      },
    },
    {
      "@type": "Question",
      name: "Does Iranti work with multiple AI coding tools at the same time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Iranti provides setup commands for Claude Code (iranti claude-setup), Codex (iranti codex-setup), and GitHub Copilot (iranti copilot-setup). All three tools read from and write to the same memory store. A finding made by Claude Code is immediately available to Codex when you switch.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when two agents write conflicting facts about the same thing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Iranti's Librarian component detects the conflict and resolves it using confidence score, recency, and source identity. You can also escalate unresolvable conflicts to human review through the Resolutionist. Silent overwrites do not happen.",
      },
    },
    {
      "@type": "Question",
      name: "Is Iranti free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Iranti is open source under AGPL-3.0. The npm package and the Python package are both free. Self-hosting requires only Node.js and a PostgreSQL database.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use Iranti for workflows outside of coding?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. The same memory infrastructure works for research workflows, document processing pipelines, and any multi-step AI task where agents need shared state. The iranti-site blog covers research workflows as a documented use case.",
      },
    },
  ],
};

export default function AgentCoordinationLayerPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <Script id="ld-article" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Script id="ld-faq" type="application/ld+json" strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <main>
        {/* Header */}
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/blog"
                className="text-xs font-mono text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
              >
                {"<- blog"}
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <time className="text-xs font-mono text-[var(--text-faint)]">2026-04-12</time>
              {["multi-agent", "coordination", "use cases"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              Five things Iranti solves that memory layers don&apos;t
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Most AI memory tools store facts and retrieve them by similarity. That solves about 20%
              of the problem. The other 80% is coordination: agents sharing state across tools, work
              surviving crashes, conflicting beliefs getting resolved, teams knowing what their agents
              actually know. Here is where Iranti sits relative to every other option.
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            {/* Intro */}
            <div>
              <p className="mb-4">
                The label &ldquo;memory layer&rdquo; undersells what serious multi-agent workflows need.
                A memory layer stores and retrieves. That is necessary. It is not sufficient. The
                real pain in AI-assisted development shows up in four places that storage alone does
                not address: agents with no shared state, work lost to process restarts, tools that
                start fresh every time you switch, and nobody knowing what the AI thinks it knows.
              </p>
              <p>
                Iranti was built for all five problems. The benchmark data covers them. Here is what
                each one looks like in practice.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* 1 */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                1. Your agents share state without explicit handoff
              </h2>
              <p className="mb-4">
                When two agents work on the same project, the default behavior is that the second one
                starts blank. Agent A spends three turns finding that the database uses a non-standard
                connection pool. Agent B opens a new session and discovers the same thing from scratch.
                You pay for that context twice: in tokens, in time, and in drift risk if B reaches a
                different conclusion.
              </p>
              <p className="mb-4">
                Iranti fixes this with identity-addressed writes. Every fact is stored under an entity
                and a key:
                <code className="text-xs text-teal-400 font-mono bg-[var(--bg-code)] px-1.5 py-0.5 rounded mx-1">
                  project/my-api
                </code>
                +
                <code className="text-xs text-teal-400 font-mono bg-[var(--bg-code)] px-1.5 py-0.5 rounded mx-1">
                  db_pool_config
                </code>.
                Any agent that holds the address retrieves the fact deterministically. No similarity
                threshold. No probabilistic miss. The second agent reads what the first one wrote.
              </p>
              <p className="mb-4">
                The{" "}
                <Link href="/benchmarks/b1" className="text-amber-400 hover:text-amber-300 transition-colors">
                  entity retrieval benchmark
                </Link>{" "}
                covers this directly. Iranti scores 100% recall on exact addressed lookup across all
                test scenarios. Competing systems using only vector retrieval average 78%.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 my-6">
                {[
                  { stat: "14/14", label: "Agent coordination scenarios passed", color: "text-amber-400" },
                  { stat: "100%", label: "Recall on exact addressed lookup", color: "text-teal-400" },
                  { stat: "78%", label: "Competing systems (vector-only)", color: "text-[var(--text-muted)]" },
                ].map(({ stat, label, color }) => (
                  <div
                    key={stat}
                    className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-center"
                  >
                    <div className={`text-2xl font-mono font-semibold ${color} mb-1`}>{stat}</div>
                    <div className="text-xs text-[var(--text-muted)] leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              <p>
                The{" "}
                <Link href="/benchmarks" className="text-amber-400 hover:text-amber-300 transition-colors">
                  full benchmark suite
                </Link>{" "}
                ran 14 agent coordination scenarios covering sequential handoffs, concurrent writes,
                and task resumption across cold boots. Iranti passed all 14.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* 2 */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                2. Work survives crashes and session restarts
              </h2>
              <p className="mb-4">
                In-memory context dies when the process dies. This is the failure mode that hurts most
                in practice. You close a terminal. The agent crashes. Your IDE restarts. Everything
                that agent knew — the file it was debugging, the constraint it discovered, the plan it
                had written — is gone. The next session starts blank.
              </p>
              <p className="mb-4">
                Iranti writes facts to PostgreSQL at the moment of ingestion, not at session end. There
                is no flush step. There is no explicit save. When you restart your session, the Attendant
                reads the project memory and surfaces the relevant facts before the first response. The
                agent picks up where the previous one stopped.
              </p>
              <p className="mb-4">
                The persistence benchmark ran 20 separate scenarios covering cold boots, process kills,
                and session restarts. Every fact written before the interruption was retrievable after.
                Twenty out of twenty.
              </p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl my-6">
                <p className="text-sm text-[var(--text-secondary)] italic mb-2">
                  &ldquo;The core challenge of long-running agents is that they must work in discrete
                  sessions, and each new session begins with no memory of what came before. Imagine a
                  software project staffed by engineers working in shifts, where each new engineer
                  arrives with no memory of what happened on the previous shift.&rdquo;
                </p>
                <p className="text-xs text-[var(--text-faint)]">
                  — Justin Young, Anthropic Engineering Blog, &ldquo;Effective Harnesses for Long-Running Agents&rdquo; (Nov 2025)
                </p>
              </div>

              <p>
                Process isolation was the hardest test case. Running in a subprocess, killing the parent,
                restarting from cold: all 20 reruns passed. The{" "}
                <Link href="/benchmarks/b7" className="text-amber-400 hover:text-amber-300 transition-colors">
                  upgrade continuity benchmark
                </Link>{" "}
                covers the related scenario of surviving a version upgrade.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* 3 */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                3. You switch tools without re-briefing
              </h2>
              <p className="mb-4">
                Most developers who use AI for coding use more than one tool. Claude Code for reasoning
                tasks. Codex for bulk edits. GitHub Copilot inside the IDE. Each tool starts with no
                knowledge of what the others discovered. Switching from Claude Code to Codex means
                copying context by hand, or just accepting that Codex starts from scratch.
              </p>
              <p className="mb-4">
                Iranti solves this with a single shared memory store. All three tools connect to the
                same Iranti instance through MCP. What Claude Code writes, Codex reads. What Copilot
                discovers, both of them can retrieve. The setup is three commands:
              </p>
              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs space-y-2 my-4">
                <div className="text-[var(--text-faint)]"># Wire each tool into the shared memory store</div>
                <div className="text-teal-300">iranti claude-setup</div>
                <div className="text-teal-300">iranti codex-setup</div>
                <div className="text-teal-300">iranti copilot-setup</div>
              </div>
              <p className="mb-4">
                In the{" "}
                <Link
                  href="/blog/6k-downloads"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  6,000 downloads data
                </Link>
                , the three-tool pattern was more common than expected. A meaningful fraction of early
                adopters were already running at least two of these tools on the same project. That
                signal drove the{" "}
                <Link
                  href="/blog/github-copilot-memory"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Copilot integration
                </Link>{" "}
                up the roadmap.
              </p>
              <p>
                The cross-tool handoff also covers a broader case: different team members using
                different tools on the same codebase. If your colleague prefers Codex and you use
                Claude Code, your shared project memory stays consistent. Neither tool re-discovers
                what the other already wrote.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* 4 */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                4. Conflicting agent beliefs get resolved, not silently overwritten
              </h2>
              <p className="mb-4">
                Two agents working on the same codebase will eventually write different values to the
                same key. Agent A concludes the auth service uses JWT. Agent B, working from a different
                file set, concludes it uses session tokens. A generic memory layer picks one and
                discards the other, silently. You find out when something breaks.
              </p>
              <p className="mb-4">
                Iranti detects the conflict before writing. The Librarian component compares the
                incoming value against the stored one, checks confidence scores, recency, and source
                identity, and resolves or escalates. If it resolves, the winner is recorded with a
                conflict log entry. If it cannot resolve, it escalates to human review through the
                Resolutionist.
              </p>
              <p className="mb-4">
                The{" "}
                <Link href="/benchmarks/b3" className="text-amber-400 hover:text-amber-300 transition-colors">
                  conflict handling benchmark
                </Link>{" "}
                tests this across adversarial write patterns: simultaneous updates, high-confidence
                vs low-confidence agents, and stale updates arriving out of order. Iranti resolves
                correctly in all tested scenarios. No silent data loss.
              </p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl my-6">
                <p className="text-sm text-[var(--text-secondary)] italic mb-2">
                  &ldquo;Agents don&apos;t fail because they can&apos;t reason. They fail because they
                  operate on inconsistent views of shared state.&rdquo;
                </p>
                <p className="text-xs text-[var(--text-faint)]">
                  — Mikiko Bazeley, O&apos;Reilly Radar, &ldquo;Why Multi-Agent Systems Need Memory Engineering&rdquo; (Feb 2026)
                </p>
              </div>

              <p>
                This matters more as agent counts grow. A single-agent workflow rarely produces
                conflicts. A three-agent workflow running in parallel produces them regularly. The
                Librarian runs on every write, not just when conflicts are expected.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* 5 */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                5. You can inspect what your agents actually know
              </h2>
              <p className="mb-4">
                Black-box AI memory is a liability on a team. If your agent makes a decision based on
                a stale or wrong fact, you need to find it and correct it. With a generic memory layer,
                you have no view into the stored state. You cannot audit it. You cannot correct it.
                You cannot tell whether the agent is acting on what you told it or on something it
                inferred three sessions ago.
              </p>
              <p className="mb-4">
                Iranti exposes the full memory store through a queryable API and a web interface.
                Every stored fact has a source tag (which agent wrote it), a confidence score, a
                timestamp, and a history of past values. You can query by entity, by key, by agent,
                or by topic. You can overwrite wrong facts directly. You can archive stale ones.
              </p>
              <p className="mb-4">
                For teams, this changes the trust model. The AI is not a black box that occasionally
                gets things wrong for unknown reasons. It is a system with inspectable state that you
                can read, correct, and audit. The 2024 State of AI Agents report from Scale AI found
                that lack of observability was the top reported barrier to deploying AI agents in
                production environments. Iranti addresses this directly.
              </p>
              <p>
                Self-hosting also means the data stays in your infrastructure. No vendor holds your
                project memory. No third-party sees your codebase facts. The{" "}
                <Link href="/docs" className="text-amber-400 hover:text-amber-300 transition-colors">
                  docs
                </Link>{" "}
                cover local setup in under five minutes.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* 6 token */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                One more: token budgets stay manageable as sessions grow
              </h2>
              <p className="mb-4">
                Long coding sessions accumulate tokens. Every file read, every tool call, every re-read
                of a value the agent already retrieved — it all stays in context. Without external
                memory, agents re-read files to retrieve values they already knew. The cost compounds.
              </p>
              <p className="mb-4">
                The{" "}
                <Link
                  href="/blog/context-economy"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  context economy benchmark
                </Link>{" "}
                measured this directly over a scripted 15-turn session. By turn 15, the Iranti arm
                uses 37% fewer input tokens than the no-memory baseline. The gap grows because each
                recall turn avoids a full file re-read. In sessions with 8 or more recall turns, the
                savings are consistent.
              </p>
              <p>
                This is not the core value proposition of Iranti, but it is a real effect. Faster
                sessions, lower API costs, and less context pressure on the model all follow from
                the same mechanism: facts stay in memory and get retrieved by address instead of
                re-read from disk.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* What this means in practice */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
                What this means in practice
              </h2>
              <p className="mb-4">
                The five problems above are not edge cases. They show up in any workflow where more
                than one agent runs, sessions restart, or tools switch. That covers most serious AI
                development work in 2025.
              </p>
              <p className="mb-4">
                A memory layer that only stores and retrieves solves the first problem partially.
                Iranti solves all five because the architecture was built around coordination, not
                storage. The storage is PostgreSQL — reliable and boring. The coordination layer on
                top is what differentiates it.
              </p>
              <p className="mb-4">
                The{" "}
                <a
                  href="https://modelcontextprotocol.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Model Context Protocol
                </a>{" "}
                makes this tool-agnostic. Any MCP-compatible client connects to the same runtime.
                As new tools adopt MCP — and{" "}
                <a
                  href="https://github.com/modelcontextprotocol/servers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition-colors"
                >
                  the list grows fast
                </a>
                {" "} — the same Iranti instance extends to cover them without configuration changes.
              </p>
              <p>
                Install takes one command. The{" "}
                <Link href="/docs" className="text-amber-400 hover:text-amber-300 transition-colors">
                  quickstart guide
                </Link>{" "}
                covers Claude Code setup in under five minutes. If you run two AI tools on the same
                project, the setup pays for itself in the first session.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* FAQ */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Is Iranti just a vector database wrapper?",
                    a: "No. Iranti uses PostgreSQL with pgvector, but the primary retrieval path is deterministic addressed lookup — entity plus key — not similarity search. Vector search exists for when the exact key is unknown. The architecture also includes conflict resolution, operator visibility, and session recovery, none of which a vector database provides.",
                  },
                  {
                    q: "How is Iranti different from Claude's built-in memory?",
                    a: "Claude's built-in memory is single-agent and lives inside Anthropic's infrastructure. Iranti is self-hostable, multi-agent, and tool-agnostic. The same memory store works for Claude Code, Codex, and GitHub Copilot. Claude's memory does not survive switching to Codex. Iranti's does.",
                  },
                  {
                    q: "Does Iranti work with multiple AI coding tools at the same time?",
                    a: "Yes. Iranti provides setup commands for Claude Code, Codex, and GitHub Copilot. All three tools read from and write to the same store. A finding from Claude Code is immediately available when you switch to Codex.",
                  },
                  {
                    q: "What happens when two agents write conflicting facts about the same entity?",
                    a: "The Librarian component detects the conflict and resolves it using confidence score, recency, and source identity. Unresolvable conflicts escalate to human review. Silent overwrites do not happen.",
                  },
                  {
                    q: "Is Iranti free to use?",
                    a: "Yes. Iranti is open source under AGPL-3.0. The npm package and the Python package are both free. Self-hosting requires Node.js and a PostgreSQL database.",
                  },
                  {
                    q: "Does Iranti work outside of coding workflows?",
                    a: "Yes. The same memory infrastructure works for research workflows, document pipelines, and any multi-step AI task where agents need shared state. The research workflows use case is documented in the blog.",
                  },
                ].map(({ q, a }) => (
                  <div key={q}>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{q}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        <Comments slug="agent-coordination-layer" />
      </main>

      <Footer />
    </div>
  );
}
