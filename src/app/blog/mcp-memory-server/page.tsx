import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Iranti: A Persistent Memory MCP Server for AI Agents",
  description:
    "Iranti is a persistent memory MCP server. Any MCP-compatible client — Claude Code, GitHub Copilot, Codex — can read and write structured facts that survive across sessions, processes, and tools.",
  alternates: { canonical: "/blog/mcp-memory-server" },
  openGraph: {
    title: "Iranti: A Persistent Memory MCP Server for AI Agents",
    description:
      "Iranti is a persistent memory MCP server. Connect any MCP client, write structured facts, and retrieve them deterministically — across sessions, processes, and tools.",
    type: "article",
    url: "https://iranti.site/blog/mcp-memory-server",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iranti: A Persistent Memory MCP Server for AI Agents",
    description:
      "Any MCP-compatible client can connect to Iranti and get persistent, cross-session memory. One setup command per tool.",
  },
};

const tools = [
  { name: "iranti_handshake", category: "Session", desc: "Initialize working memory for the session. Loads operating rules, recent decisions, and task-relevant facts." },
  { name: "iranti_attend",    category: "Session", desc: "Pre-turn memory injection. Call before every reply to retrieve facts the agent is likely to need." },
  { name: "iranti_write",     category: "Write",   desc: "Store a structured fact at entity + key. Persists to PostgreSQL immediately. Survives session end and process restart." },
  { name: "iranti_query",     category: "Read",    desc: "Exact lookup by entity and key. Deterministic: same address always returns the same current fact." },
  { name: "iranti_search",    category: "Read",    desc: "Hybrid search (lexical + vector similarity) for when the exact key is unknown." },
  { name: "iranti_checkpoint", category: "Session", desc: "Save task state: current step, next step, open risks, file changes. Next session resumes from here." },
  { name: "iranti_ingest",    category: "Write",   desc: "Extract structured facts from prose or documents and write them to the knowledge base." },
  { name: "iranti_observe",   category: "Read",    desc: "Pull facts an agent should know about an entity — proactive injection with explicit recovery hints." },
  { name: "iranti_relate",    category: "Graph",   desc: "Write a typed relationship between two entities." },
  { name: "iranti_related",   category: "Graph",   desc: "Traverse one hop from an entity — returns all directly related entities." },
  { name: "iranti_history",   category: "Read",    desc: "Read the full version history of a fact key — all values, confidence scores, and timestamps." },
  { name: "iranti_who_knows", category: "Read",    desc: "Find which agents have written to a given entity — provenance and attribution." },
];

const categoryColors: Record<string, string> = {
  Session: "text-amber-400",
  Write:   "text-teal-400",
  Read:    "text-blue-400",
  Graph:   "text-violet-400",
};

export default function McpMemoryServerPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/blog" className="text-xs font-mono text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                ← blog
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <time className="text-xs font-mono text-[var(--text-faint)]">2026-04-07</time>
              {["MCP", "memory", "infrastructure"].map(tag => (
                <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              Iranti: a persistent memory MCP server for AI agents
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Iranti ships a stdio MCP server that any MCP-compatible client can connect to.
              Connect Claude Code, GitHub Copilot, Codex, or your own agent and get structured,
              persistent, cross-session memory — with exact retrieval, conflict handling, and
              operator visibility included.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Why a memory MCP server</h2>
              <p className="mb-4">
                The Model Context Protocol gives AI tools a standard interface for calling
                external capabilities. Most MCP servers expose read-only data sources, API
                wrappers, or task-execution tools. Memory is different: it needs to be
                readable and writable, persistent across sessions, and shared across tools.
              </p>
              <p className="mb-4">
                Iranti is built specifically for this. It exposes a set of MCP tools for writing
                structured facts, reading them back by exact address or hybrid search, managing
                session state, traversing entity relationships, and inspecting provenance. The
                backend is PostgreSQL with pgvector — durable, consistent, and queryable.
              </p>
              <p>
                Because Iranti is a standard MCP server, any tool that speaks MCP can use it
                without a custom adapter. One Iranti instance can serve multiple clients simultaneously.
                Facts written by Claude Code are immediately available to a Codex agent in the
                same project.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Connect any MCP client</h2>
              <p className="mb-4">
                Iranti ships fast-path setup commands for the most common MCP clients:
              </p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-3">
                <div>
                  <div className="text-[var(--text-faint)] mb-1.5"># Claude Code</div>
                  <div className="text-teal-300">iranti claude-setup</div>
                </div>
                <div>
                  <div className="text-[var(--text-faint)] mb-1.5"># GitHub Copilot</div>
                  <div className="text-teal-300">iranti copilot-setup</div>
                </div>
                <div>
                  <div className="text-[var(--text-faint)] mb-1.5"># Codex</div>
                  <div className="text-teal-300">iranti codex-setup</div>
                </div>
                <div>
                  <div className="text-[var(--text-faint)] mb-1.5"># Any other MCP client — point at the stdio server</div>
                  <div className="text-teal-300">iranti mcp</div>
                </div>
              </div>

              <p className="mt-4 text-sm">
                Each setup command writes the appropriate MCP config file for that client
                and adds protocol instructions so the agent knows how to use the Iranti tools.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">MCP tools exposed</h2>
              <div className="space-y-2">
                {tools.map(({ name, category, desc }) => (
                  <div key={name} className="flex items-start gap-4 p-3.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg">
                    <div className="flex-shrink-0 w-36">
                      <code className="text-xs text-teal-400 font-mono">{name}</code>
                      <div className={`text-[10px] font-mono mt-0.5 ${categoryColors[category] ?? "text-[var(--text-faint)]"}`}>{category}</div>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What makes this different from other memory MCP servers</h2>
              <p className="mb-4">
                Most MCP memory tools expose simple key-value storage or semantic search. Iranti
                adds a layer on top of storage: the <strong className="text-[var(--text-primary)] font-medium">Attendant</strong> (per-agent memory
                injection), the <strong className="text-[var(--text-primary)] font-medium">Librarian</strong> (conflict-aware writes), and the{" "}
                <strong className="text-[var(--text-primary)] font-medium">Archivist</strong> (lifecycle and maintenance). These aren&apos;t just
                storage primitives — they implement memory behaviour that holds up in
                multi-agent and multi-session workflows.
              </p>
              <div className="space-y-3">
                {[
                  { label: "Conflict handling", desc: "When two agents write different values to the same key, the Librarian detects the conflict, applies resolution logic, and escalates to a human if confidence is too close to call." },
                  { label: "Exact addressed retrieval", desc: "iranti_query returns the current value at entity + key deterministically. Same address, same result — no similarity threshold, no probabilistic miss." },
                  { label: "Session protocol", desc: "iranti_handshake and iranti_attend implement a turn discipline that ensures memory is loaded at the right time, not just available in theory." },
                  { label: "Provenance", desc: "Every write records who wrote it, when, and with what confidence. iranti_who_knows traces attribution across agents." },
                ].map(({ label, desc }) => (
                  <div key={label} className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <div className="text-sm font-semibold text-[var(--text-code)] mb-1.5">{label}</div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Benchmark evidence</h2>
              <p className="mb-4">
                Iranti&apos;s MCP memory layer has been tested against three other memory systems
                across four benchmarks. On recall accuracy and cross-session persistence, Iranti
                scores 100%. On pool efficiency, it achieves the best accuracy/token ratio
                tested. On conflict resolution, it is the only system that deterministically
                replaces old values.
              </p>
              <Link href="/benchmarks" className="text-sm text-teal-500 hover:text-teal-400 transition-colors">
                See the full benchmark results →
              </Link>
            </div>

            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Get started</div>
              <div className="flex gap-3 flex-wrap">
                <a href="https://github.com/nfemmanuel/iranti#readme" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors" target="_blank" rel="noopener noreferrer">
                  Install guide →
                </a>
                <Link href="/integrations" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  Integrations →
                </Link>
                <Link href="/benchmarks" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  Benchmarks →
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
