import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "How to Share Context Between Claude Code and Codex (Without Re-Briefing) — Iranti",
  description:
    "Every time you switch from Claude Code to Codex, it starts blank. Here's the problem, the current workarounds developers are using, and the one setup that actually solves it.",
  alternates: { canonical: "/blog/claude-code-codex-shared-memory" },
  openGraph: {
    title: "How to Share Context Between Claude Code and Codex (Without Re-Briefing)",
    description:
      "Every time you switch from Claude Code to Codex, it starts blank. Iranti is the shared project memory layer that connects them.",
    type: "article",
    url: "https://iranti.dev/blog/claude-code-codex-shared-memory",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Share Context Between Claude Code and Codex (Without Re-Briefing)",
    description:
      "Every time you switch from Claude Code to Codex, it starts blank. Here's the one setup that actually solves it.",
  },
};

export default function ClaudeCodeCodexSharedMemoryPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
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
              {["Claude Code", "Codex", "cross-tool"].map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              How to share context between Claude Code and Codex (without re-briefing)
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              You&apos;ve been in Claude Code for two hours. You&apos;ve worked through the architecture,
              debugged three layers of state management, made decisions about the database schema
              and API contract. Then you switch to Codex — and it starts blank. This is the
              cross-tool context problem, and there&apos;s now a setup that actually solves it.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Why this happens</h2>
              <p className="mb-4">
                Claude Code, Codex, Cursor, and every other AI coding tool maintain memory in isolation.
                Each tool has its own session history, its own understanding of your project, its own
                accumulated context — and none of that crosses tool boundaries.
              </p>
              <p className="mb-4">
                This isn&apos;t an oversight. It&apos;s an architectural reality: these tools are stateless
                by default, and the session context that builds up during a coding session lives in the
                conversation thread, not in a shared project store. When the session ends, the context
                doesn&apos;t persist anywhere the next tool can read.
              </p>
              <p>
                Claude Code&apos;s Auto Memory and{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">CLAUDE.md</code>{" "}
                files help <em>within</em> Claude, but they don&apos;t cross to Codex. Codex has its own
                memory pipeline — JSONL rollout files, SQLite-stored summaries — but it doesn&apos;t read
                from Claude. There is no shared layer. When you switch tools, you&apos;re the context bridge.
                Every time.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How developers are solving this today</h2>
              <p className="mb-5">The workarounds developers have landed on fall into three categories:</p>

              <div className="space-y-5">
                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">The HANDOFF.md method</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Write a handoff document before switching tools. Capture the current state, recent
                    decisions, open tasks. Load it into the new tool at the start of the session. This
                    works — it&apos;s also fully manual. You have to remember to write it, keep it accurate,
                    and load it every time. Most developers forget. The ones who don&apos;t describe
                    maintaining it as a part-time job.
                  </p>
                </div>
                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">The CLAUDE.md everything method</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Compress everything important into{" "}
                    <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">CLAUDE.md</code>{" "}
                    and keep it ruthlessly up to date. Claude reads it at session start. But{" "}
                    <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">CLAUDE.md</code>{" "}
                    is Claude-only, has a line limit, gets stale, and doesn&apos;t auto-update. It does
                    nothing for Codex.
                  </p>
                </div>
                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">The re-briefing method</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                    Just explain things again. Most developers end up here by default. It costs 15–30
                    minutes per tool switch, compounds across a workday, and is the thing people are
                    describing when they say AI tools are &ldquo;not quite there yet.&rdquo;
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm">
                All three are coping mechanisms. None of them solve the problem — they just manage it.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What actually works: a shared project memory layer</h2>
              <p className="mb-4">
                The underlying issue is that there&apos;s no memory layer that lives at the <em>project level</em>{" "}
                rather than the <em>tool level</em>. Something that Claude can write to, Codex can read from,
                and that persists across sessions, tool switches, and context window resets.
              </p>
              <p className="mb-4">
                This is what Iranti is built to be. Iranti is an MCP server that connects to your project
                repository and gives any MCP-compatible tool — Claude Code, Codex, Cursor, Windsurf —
                access to the same shared memory store. It runs on Postgres locally (your data never leaves
                your machine), and it exposes a simple protocol: tools write facts when they learn something,
                and inject relevant facts when they start a new session.
              </p>
              <p>
                When Claude Code figures out something important — an architectural decision, a debugging
                insight, the current task state — it writes it to Iranti. When you switch to Codex and start
                a new session, Iranti injects what&apos;s relevant. Codex starts informed, not blank.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Setting it up</h2>
              <p className="mb-4">
                Requirements: Node.js, Postgres with pgvector. If you have those, setup takes about
                15 minutes.
              </p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-2 mb-4">
                <div className="text-[var(--text-faint)] mb-2"># Install Iranti globally</div>
                <div className="text-teal-300">npm install -g iranti</div>
                <div className="text-[var(--text-faint)] mt-3 mb-2"># Wire up Claude Code (run from your repo root)</div>
                <div className="text-teal-300">iranti claude-setup</div>
              </div>

              <p className="mb-4">For Codex:</p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] mb-5">
                <div className="text-teal-300">iranti codex-setup</div>
              </div>

              <p>
                After that, both tools connect to the same Iranti instance. Memory written in a Claude
                session is available to your next Codex session automatically, and vice versa. The first
                time you switch tools after setup, you&apos;ll notice: Codex knows what Claude figured out.
                You don&apos;t re-brief. You just keep building.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What gets remembered</h2>
              <p className="mb-5">
                Iranti doesn&apos;t capture everything — it captures what matters. The protocol
                distinguishes between:
              </p>

              <div className="space-y-3">
                {[
                  { label: "Facts", desc: "Architectural decisions, constraints, API contracts, environment details — durable and trusted across sessions." },
                  { label: "Session state", desc: "Current task, recent progress, open questions, what to do next." },
                  { label: "Checkpoints", desc: "Snapshots of session state at meaningful milestones, designed specifically for recovery if a session crashes or a context window fills." },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <span className="text-xs text-teal-400 font-mono flex-shrink-0 mt-0.5 font-semibold">{label}</span>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-sm">
                The developer (or the AI tool, on your behalf) writes explicitly. This is different from
                systems that auto-extract memories via an LLM call on every conversation — those are
                probabilistic and hard to correct if they get something wrong. Iranti&apos;s memory is
                explicit, traceable, and auditable. You can see exactly what your AI tools believe about
                your project, and you can correct it if it&apos;s wrong.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Session recovery as a side effect</h2>
              <p className="mb-4">
                The same architecture that enables cross-tool memory also gives you structured session
                recovery. If a session crashes mid-task — context window overflow, connectivity drop,
                whatever — Iranti has the last checkpoint. When you restart (in any tool), you can resume
                from where you left off rather than reconstructing context from scratch. The checkpoint
                includes: current task, what was just completed, what&apos;s next, and open risks.
              </p>
              <p>
                Developers who&apos;ve hit the &ldquo;4-hour session lost to a crash&rdquo; problem describe this
                as the thing they didn&apos;t know they needed until they had it.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Comparing the options</h2>
              <p className="mb-5">
                If you&apos;re evaluating options for Claude Code memory or cross-tool context sharing,
                here&apos;s the honest landscape:
              </p>

              <div className="space-y-3">
                {[
                  {
                    tool: "Claude Native Auto Memory",
                    desc: "Great for single-tool Claude users, zero setup, already installed. The limit: Claude-only. The moment you use Codex or anything else, it doesn't help.",
                  },
                  {
                    tool: "Mem0 MCP",
                    desc: "Excellent general-purpose memory layer, good for building AI products that serve multiple users. Not designed for a developer's own workflow — it's for application developers, not the developer working on their project.",
                  },
                  {
                    tool: "Shodh-Memory",
                    desc: "Lightweight, fully offline, one-command install. Excellent for single-tool solo use. No cross-tool support, no session recovery.",
                  },
                  {
                    tool: "Engram / SNARC",
                    desc: "Strong salience-gated memory model. Single-developer only, no cross-tool handoff.",
                  },
                  {
                    tool: "Iranti",
                    desc: "The only option with automatic cross-tool handoff. If you use more than one AI coding tool on the same project, it's the only tool that connects them. Trade-off: requires Postgres.",
                  },
                ].map(({ tool, desc }) => (
                  <div key={tool} className="flex gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <code className="text-xs text-teal-400 font-mono flex-shrink-0 mt-0.5">{tool}</code>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Is this worth the setup?</h2>
              <p className="mb-4">
                If you use one AI coding tool exclusively and never switch, no. Claude&apos;s native memory
                handles the single-tool case adequately.
              </p>
              <p className="mb-4">
                If you use Claude Code and Codex on the same project — even occasionally — the
                re-briefing cost adds up fast. One tool switch costs 15–20 minutes. If you switch tools
                twice a day, five days a week, that&apos;s 2.5–3.5 hours a week. Over a month, that&apos;s
                a full workday spent re-explaining context your AI tools should already have.
              </p>
              <p>
                Iranti&apos;s 15-minute setup pays for itself in the first tool switch.
              </p>
            </div>

            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Get started</div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/docs"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  Setup guide: Claude Code + Codex →
                </Link>
                <Link
                  href="/product"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  How it works →
                </Link>
                <Link
                  href="/benchmarks"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  Benchmarks →
                </Link>
              </div>
              <p className="text-xs text-[var(--text-faint)] mt-4">
                Iranti is open source (AGPL-3.0) and free to self-host. Your project data stays on your machine.
              </p>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
