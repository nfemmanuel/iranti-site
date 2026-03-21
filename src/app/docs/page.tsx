import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Docs — Iranti",
  description:
    "Iranti documentation: quickstart guide, Claude Code MCP integration, Codex integration, security quickstart, and concept reference. Full docs live on GitHub.",
};

const guides = [
  {
    title: "Quickstart",
    desc: "Install the CLI, start an instance, bind a project, and write your first fact. Covers Node.js + PostgreSQL setup.",
    href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/quickstart.md",
    tag: "Guide",
    tagColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    time: "10 min",
  },
  {
    title: "Claude Code Integration",
    desc: "Configure the MCP server, install SessionStart hooks, and use iranti_write / iranti_query from Claude Code. One command setup.",
    href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/claude-code.md",
    tag: "Guide",
    tagColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    time: "5 min",
  },
  {
    title: "Codex Integration",
    desc: "Register Iranti in the global Codex MCP config. One-time setup gives every bound project access to memory tools.",
    href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/codex.md",
    tag: "Guide",
    tagColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    time: "5 min",
  },
  {
    title: "Security Quickstart",
    desc: "API key configuration, instance isolation modes (shared vs isolated), and network security considerations for production.",
    href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/security-quickstart.md",
    tag: "Guide",
    tagColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    time: "8 min",
  },
];

const concepts = [
  {
    title: "Entity + Key model",
    desc: "Facts are stored as entity/key pairs. An entity is a typed identifier (project/my_project, user/alice). A key names the specific fact. Together they form the primary lookup address.",
    tag: "Concept",
    tagColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "Confidence scoring",
    desc: "Every write carries a confidence score (0–100). When two agents write conflicting values for the same entity+key, the higher-confidence value wins. Ties use timestamps. Gaps < 10 escalate to LLM arbitration.",
    tag: "Concept",
    tagColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "Conflict resolution",
    desc: "Iranti detects same entity+key conflicts automatically. Resolution is deterministic for large confidence gaps. LLM arbitration handles ambiguous cases. Unresolvable conflicts escalate to escalation/active/.",
    tag: "Concept",
    tagColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "Agent isolation modes",
    desc: "Isolated mode: each agent has its own namespace. Shared mode: all agents in a project share the same entity space. Mode is set at project init time via --mode isolated or --mode shared.",
    tag: "Concept",
    tagColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "The Staff architecture",
    desc: "Iranti is composed of five internal components: Librarian (ingestion + conflict detection), Attendant (retrieval + briefing), Archivist (long-term storage), Mediator (conflict resolution), Attendant (session hooks).",
    tag: "Concept",
    tagColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  },
  {
    title: "iranti chat",
    desc: "Interactive terminal session for inspecting and writing memory directly. Use /history, /relate, /confidence, /conflicts, /write, and /query. Not an agent — a direct interface to the knowledge base.",
    tag: "CLI",
    tagColor: "text-[var(--text-muted)] bg-[var(--border-subtle)] border-[var(--border-light)]",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Docs
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-3xl">
            Documentation.
            <br />
            <span className="text-[var(--text-muted)]">Full source on GitHub.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-6">
            Guides and concept reference are below. All docs live in the GitHub
            repository alongside the source — they are versioned with the code
            and kept current.
          </p>
          <a
            href="https://github.com/nfemmanuel/iranti"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition-colors"
          >
            github.com/nfemmanuel/iranti →
          </a>
        </section>

        {/* Guides */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
                Guides
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {guides.map((g) => (
                <a
                  key={g.title}
                  href={g.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-light)] rounded-xl transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${g.tagColor}`}>
                        {g.tag}
                      </span>
                    </div>
                    <span className="text-xs text-[var(--text-faint)] font-mono">{g.time}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-code)] group-hover:text-[var(--text-primary)] transition-colors mb-2">
                    {g.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{g.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Concepts */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Concepts
              </span>
            </div>
            <p className="text-[var(--text-muted)] text-sm mb-10 max-w-xl">
              Core model and vocabulary for understanding how Iranti works.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {concepts.map((c) => (
                <div
                  key={c.title}
                  className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-0.5 rounded-full border text-xs ${c.tagColor}`}>
                      {c.tag}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--text-code)] mb-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* API reference placeholder */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="p-6 border border-[var(--border-subtle)] rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-xs text-[var(--text-faint)] font-mono mb-2 uppercase tracking-wider">
                  API Reference
                </div>
                <p className="text-sm text-[var(--text-muted)] max-w-md">
                  The full REST API reference, Python SDK reference, and TypeScript SDK reference
                  are available in the GitHub repository.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a
                  href="https://github.com/nfemmanuel/iranti/tree/main/docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
                >
                  Browse docs on GitHub
                </a>
                <Link
                  href="/get-started"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
                >
                  Get started
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
