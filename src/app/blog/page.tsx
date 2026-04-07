import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const POSTS = [
  {
    slug: "github-copilot-memory",
    date: "2026-04-07",
    title: "GitHub Copilot CLI now supports Iranti shared memory",
    summary:
      "As of v0.3.17, iranti copilot-setup wires GitHub Copilot CLI into the same shared project memory as Claude Code and Codex. How the integration works, what's different about Copilot's hook system, and what it means when all three tools share one memory store.",
    tags: ["Copilot", "cross-tool", "v0.3.17"],
  },
  {
    slug: "claude-code-codex-shared-memory",
    date: "2026-04-07",
    title: "How to share context between Claude Code and Codex (without re-briefing)",
    summary:
      "Every time you switch from Claude Code to Codex, it starts blank. Here's the problem, the current workarounds developers are using, and the one setup that actually solves it.",
    tags: ["Claude Code", "Codex", "cross-tool"],
  },
  {
    slug: "mcp-memory-server",
    date: "2026-04-07",
    title: "Iranti: a persistent memory MCP server for AI agents",
    summary:
      "Iranti ships a stdio MCP server that any MCP-compatible client can connect to. Connect Claude Code, GitHub Copilot, Codex, or your own agent and get structured, persistent, cross-session memory with exact retrieval, conflict handling, and operator visibility.",
    tags: ["MCP", "memory", "infrastructure"],
  },
  {
    slug: "mem0-alternative",
    date: "2026-04-07",
    title: "Iranti vs Mem0: what the benchmarks actually show",
    summary:
      "A direct comparison across four benchmarks: recall accuracy, pool efficiency, conflict resolution, and cross-session persistence. Where each system wins and where the architectural tradeoffs land.",
    tags: ["comparison", "benchmarks", "Mem0"],
  },
  {
    slug: "claude-code-memory",
    date: "2026-04-07",
    title: "How to give Claude Code persistent memory across sessions",
    summary:
      "Claude Code starts every session with no memory of previous work. Iranti adds a persistent MCP memory layer in one command. How it works, what it stores, and what changes in practice.",
    tags: ["Claude Code", "MCP", "setup"],
  },
  {
    slug: "research-workflows",
    date: "2026-04-07",
    title: "Your AI research assistant shouldn't lose its memory every session",
    summary:
      "Three research workflows where persistent agent memory eliminates the most frustrating part of working with AI: literature review that builds across sessions, hypothesis tracking that survives experiment cycles, and manuscript writing with real continuity.",
    tags: ["research", "use cases", "workflows"],
  },
  {
    slug: "context-economy",
    date: "2026-04-06",
    title: "Why Iranti uses 37% fewer tokens in long coding sessions",
    summary:
      "We measured cumulative input token usage over a 15-turn coding session with and without Iranti. By turn 15, the Iranti arm uses 37% fewer tokens. Here's exactly how we measured it and why the gap grows over time.",
    tags: ["benchmarks", "token efficiency", "B14"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-faint)] mb-4">
              Blog
            </div>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-3">
              Research notes
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Benchmark methodology, engineering decisions, and observations on building
              persistent memory infrastructure for multi-agent AI systems.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-px">
              {POSTS.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-8 border-b border-[var(--border-subtle)] hover:border-[var(--border-light)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-xs font-mono text-[var(--text-faint)]">
                      {post.date}
                    </time>
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-teal-500 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
