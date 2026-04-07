import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Integrations - Iranti for Claude Code, Codex, SDKs, and Agent Frameworks",
  description:
    "Iranti integrates with Claude Code, Codex, SDKs, and agent frameworks so teams can share memory and recovery across the tools they already use.",
  alternates: { canonical: "/integrations" },
  openGraph: {
    title: "Integrations - Iranti for Claude Code, Codex, SDKs, and Agent Frameworks",
    description:
      "Native Claude Code and Codex setup, plus SDK and HTTP integrations for workflows that need shared, inspectable memory and recovery.",
    type: "website",
    url: "https://iranti.dev/integrations",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Integrations - Iranti for Claude Code, Codex, SDKs, and Agent Frameworks",
    description:
      "Native Claude Code and Codex setup, plus SDK and HTTP integrations for workflows that need shared, inspectable memory and recovery.",
  },
};

const nativeIntegrations = [
  {
    name: "Claude Code",
    setup: "iranti claude-setup",
    summary: "Deepest current integration: MCP plus hooks, including pre-turn retrieval and post-response persistence on the Claude path.",
    bullets: [
      "Writes .mcp.json, .vscode/mcp.json, and .claude/settings.local.json",
      "SessionStart, UserPromptSubmit, and Stop hooks",
      "Best fit when you want memory retrieval without relying on model discretion",
    ],
  },
  {
    name: "Codex",
    setup: "iranti codex-setup",
    summary: "MCP-native integration for Codex CLI and VS Code. The current setup path covers global Codex config and workspace MCP scaffolding.",
    bullets: [
      "Global Codex registration plus workspace MCP files",
      "Best fit for exact recall, shared facts, and explicit durable writes",
      "Useful paired with project binding and doctor checks",
    ],
  },
  {
    name: "iranti chat",
    setup: "iranti chat",
    summary: "Operator-facing inspection surface for debugging memory, seeding facts, checking history, and understanding what the system currently believes.",
    bullets: [
      "Good for handoff debugging and conflict inspection",
      "Lets you query, inspect history, and verify confidence/provenance directly",
      "Complements the UI rather than replacing the API or SDK",
    ],
  },
];

const sdkIntegrations = [
  {
    name: "Raw HTTP / OpenAI-style stacks",
    status: "Validated",
    note: "Strongest for teams building their own orchestration and wanting the fewest assumptions.",
  },
  {
    name: "LangChain",
    status: "Validated",
    note: "Best framed as a framework you plug into Iranti, not as a memory system Iranti competes with directly.",
  },
  {
    name: "CrewAI",
    status: "Validated",
    note: "Best demonstration of shared-memory handoff: one role writes, another role retrieves, neither relies on shared prompt state.",
  },
  {
    name: "Custom agent systems",
    status: "General",
    note: "If your agents can make HTTP or SDK calls, Iranti can usually sit underneath them as the memory layer.",
  },
];

const boundaries = [
  "Iranti is strongest when the client can make explicit read and write calls, or when the host supports deterministic hooks.",
  "Browser-tab AI memory injection is not the product. CSP and host limits make that the wrong abstraction layer.",
  "Framework integrations should be described as framework-agnostic persistence, not as deep framework orchestration.",
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Integrations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-4xl">
            Iranti fits under your existing workflow.
            <br />
            <span className="text-[var(--text-muted)]">It does not ask you to rebuild your stack around it.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            The right integration story for Iranti is simple: keep your agents, your orchestration,
            and your model choices. Add a memory layer that survives sessions, survives agent boundaries,
            and gives operators something inspectable when a workflow goes sideways.
          </p>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Native paths</span>
            </div>
            <div className="grid lg:grid-cols-3 gap-5">
              {nativeIntegrations.map((item) => (
                <div key={item.name} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-base font-semibold text-[var(--text-code)]">{item.name}</span>
                    <span className="px-2 py-0.5 rounded-full border text-xs text-amber-500 bg-amber-500/10 border-amber-500/20">Native</span>
                  </div>
                  <div className="font-mono text-xs text-amber-400 mb-3">{item.setup}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{item.summary}</p>
                  <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                    {item.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-teal-500" />
                <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">SDK and API paths</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4">
                The bigger opportunity is not one IDE.
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
                Iranti matters most when the memory layer can outlive any one tool. That is why the site
                keeps pointing back to SDKs, HTTP integrations, and cross-tool handoffs instead of sounding
                like the product only exists inside Claude Code or Codex.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {sdkIntegrations.map((item) => (
                  <div key={item.name} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm font-semibold text-[var(--text-code)]">{item.name}</span>
                      <span className={`px-2 py-0.5 rounded-full border text-xs ${item.status === 'Validated' ? 'text-teal-500 bg-teal-500/10 border-teal-500/20' : 'text-[var(--text-muted)] bg-[var(--border-subtle)] border-[var(--border-light)]'}`}>
                        {item.status}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-4">What integration success looks like</div>
              <div className="space-y-4 text-sm text-[var(--text-secondary)]">
                <p><strong className="text-[var(--text-code)]">Agent A writes a fact.</strong> Agent B can retrieve it cold later, in another process, without borrowing A&apos;s prompt context.</p>
                <p><strong className="text-[var(--text-code)]">An operator can inspect the state.</strong> They can query the fact, inspect provenance, review conflicts, and reason about what happened.</p>
                <p><strong className="text-[var(--text-code)]">A tool swap does not destroy memory.</strong> Claude, Codex, HTTP clients, and SDK consumers all point at the same underlying system of record.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Boundaries</span>
            </div>
            <div className="grid lg:grid-cols-3 gap-4">
              {boundaries.map((item) => (
                <div key={item} className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl text-sm text-[var(--text-secondary)] leading-relaxed">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
                Ready to choose a path?
              </h2>
              <p className="text-[var(--text-muted)] text-sm max-w-xl">
                Open source and free to self-host. Run <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">npm install -g iranti</code> to get started, or read the evidence page first.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/benchmarks" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors">
                Read the evidence
              </Link>
              <a href="https://github.com/nfemmanuel/iranti#readme" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors">
                Install guide →
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

