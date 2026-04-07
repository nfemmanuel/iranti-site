import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "Persistent Memory for Claude Code Agents — Iranti",
  description:
    "Claude Code starts every session with no memory of previous work. Iranti gives it a persistent memory layer in one command. How it works, what it stores, and what changes in practice.",
  alternates: { canonical: "/blog/claude-code-memory" },
  openGraph: {
    title: "Persistent Memory for Claude Code Agents — Iranti",
    description:
      "Claude Code starts every session blank. Iranti gives it persistent memory across sessions in one command — iranti claude-setup.",
    type: "article",
    url: "https://iranti.dev/blog/claude-code-memory",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Persistent Memory for Claude Code Agents — Iranti",
    description:
      "Claude Code starts every session blank. Iranti gives it persistent memory across sessions in one command.",
  },
};

export default function ClaudeCodeMemoryPost() {
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
              {["Claude Code", "MCP", "setup"].map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              How to give Claude Code persistent memory across sessions
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Claude Code is stateless by design. Every new session, it starts with no memory of
              previous work. Iranti adds a persistent memory layer via MCP — one command to set up,
              and your agent stops starting from scratch.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The problem with session-scoped memory</h2>
              <p className="mb-4">
                Claude Code is powerful within a session. It reads files, traces execution, reasons
                about your codebase, and makes decisions. But when the session ends, none of that
                reasoning persists. The next session, it re-discovers things it already figured out:
                the same config key, the same architectural decision, the same bug that was already
                explained and fixed.
              </p>
              <p className="mb-4">
                For short tasks, that&apos;s fine. For anything long-running — a feature development
                cycle, a migration, an ongoing debugging effort — the accumulated context loss
                is expensive. The agent re-reads files it already understood, asks questions it
                already answered, and makes decisions without the full history.
              </p>
              <p>
                Iranti solves this with a persistent MCP memory layer that Claude Code writes to
                and reads from automatically, across sessions and across context window boundaries.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Setup in one command</h2>
              <p className="mb-4">
                Iranti ships a stdio MCP server that Claude Code connects to through a
                project-local <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">.mcp.json</code>. The fast path:
              </p>

              <div className="space-y-3 mb-6">
                <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-2">
                  <div className="text-[var(--text-faint)] mb-2"># 1. Install</div>
                  <div className="text-teal-300">npm install -g iranti</div>
                  <div className="text-[var(--text-faint)] mt-3 mb-2"># 2. Start an instance (keep running)</div>
                  <div className="text-teal-300">iranti run --instance local</div>
                  <div className="text-[var(--text-faint)] mt-3 mb-2"># 3. Bind to your project and wire up Claude Code</div>
                  <div className="text-teal-300">iranti claude-setup</div>
                </div>
              </div>

              <p className="mb-4">
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">iranti claude-setup</code> writes
                a <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">.mcp.json</code> to
                the project root, adds an <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">CLAUDE.md</code> with
                the Iranti protocol, and registers Claude Code hooks for{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">SessionStart</code> and{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">UserPromptSubmit</code>.
                Open Claude Code in that project and the Iranti tools are available immediately.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What Claude Code can now do</h2>
              <p className="mb-4">
                With Iranti connected, Claude Code gains a set of MCP tools for structured,
                persistent memory:
              </p>

              <div className="space-y-3">
                {[
                  { tool: "iranti_write", desc: "Store a fact at a specific entity + key. Survives session end, process restart, and context window overflow." },
                  { tool: "iranti_attend", desc: "Inject relevant memory before a turn — retrieves facts the agent is likely to need based on the current task." },
                  { tool: "iranti_query", desc: "Exact lookup by entity and key. Deterministic: same address always returns the same fact." },
                  { tool: "iranti_search", desc: "Hybrid search (lexical + vector) when the exact key isn't known." },
                  { tool: "iranti_checkpoint", desc: "Save the current task state — what's done, what's next, open risks — so the next session can resume cleanly." },
                  { tool: "iranti_handshake", desc: "Session start ritual: loads operating context, recent decisions, and relevant project state from memory." },
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
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What changes in practice</h2>
              <p className="mb-4">
                The most immediate change is that Claude Code stops re-reading files it already
                understood. When a fact — an architectural decision, a config value, an important
                constraint — is in Iranti, the agent can retrieve it with a single token-efficient
                lookup instead of re-reading the source file.
              </p>
              <p className="mb-4">
                We measured this in{" "}
                <Link href="/benchmarks/b14" className="text-teal-500 hover:text-teal-400 transition-colors">
                  B14 (Context Economy)
                </Link>: over a 15-turn coding session, the Iranti arm used 37% fewer input tokens
                than the no-memory arm. The gap compounds across turns — the longer the session,
                the larger the savings.
              </p>
              <p className="mb-4">
                The second change is continuity. A session that ends mid-task can checkpoint its
                state. The next session starts by calling{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">iranti_handshake</code>, which
                loads the checkpoint and relevant context. The agent picks up where it left off
                without needing a re-briefing from the user.
              </p>
              <p>
                The third change is shared memory across tools. If you use Codex, GitHub Copilot,
                or a custom Claude API client alongside Claude Code, they can all point at the same
                Iranti instance. Facts written in one tool are immediately available in any other.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Honest limits</h2>
              <p className="mb-4">
                Iranti&apos;s memory is structured — facts need to be written explicitly using
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded mx-1">iranti_write</code>
                with an entity and key. It doesn&apos;t automatically extract memory from the conversation.
                The agent needs to follow the Iranti protocol (handshake, attend, write, checkpoint)
                for memory to accumulate reliably.
              </p>
              <p>
                The current version requires a local PostgreSQL instance with pgvector. Setup handles
                most of the bootstrap automatically, but it is a real infrastructure dependency.
                A hosted version that removes this requirement is planned.
              </p>
            </div>

            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Get started</div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://github.com/nfemmanuel/iranti#readme"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                  target="_blank" rel="noopener noreferrer"
                >
                  Install guide →
                </a>
                <Link href="/integrations" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  All integrations →
                </Link>
                <Link href="/benchmarks/b14" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  B14: context economy →
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <Comments slug="claude-code-memory" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
