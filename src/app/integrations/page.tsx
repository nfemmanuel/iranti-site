import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Integrations — Iranti",
  description:
    "Iranti integrations: Claude Code (MCP + hooks), Codex (MCP), iranti chat (CLI), CrewAI, LangChain, OpenAI API, and any LLM via middleware. Honest boundary: browser-tab injection is not supported.",
};

const nativeIntegrations = [
  {
    name: "Claude Code",
    type: "MCP + Hooks",
    tier: "Native",
    tierColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    cmd: "iranti claude-setup",
    setupTime: "< 1 minute",
    desc: "The deepest Iranti integration. One command configures the MCP server and installs SessionStart hooks that automatically load relevant memory into context at the beginning of each Claude Code session.",
    detail: [
      "Automatic .mcp.json configuration",
      "SessionStart hooks load relevant facts",
      "iranti_write and iranti_query MCP tools available to Claude",
      "Works in isolated and shared agent modes",
    ],
    docsHref: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/claude-code.md",
  },
  {
    name: "Codex",
    type: "MCP",
    tier: "Native",
    tierColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    cmd: "iranti codex-setup",
    setupTime: "< 1 minute",
    desc: "Global MCP registry integration. Run iranti codex-setup once and every Codex session launched inside a bound project directory will have access to Iranti memory tools.",
    detail: [
      "Registers in global Codex MCP config",
      "Works across all bound projects after one setup",
      "Launch Codex normally — memory tools are available",
      "No per-project configuration needed after first setup",
    ],
    docsHref: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/codex.md",
  },
  {
    name: "iranti chat",
    type: "CLI",
    tier: "Native",
    tierColor: "text-amber-500 bg-amber-500/10 border-amber-500/20",
    cmd: "iranti chat",
    setupTime: "instant",
    desc: "An interactive terminal session backed by your Iranti memory instance. Not an agent — a direct interface for inspecting, writing, querying, and resolving facts. Use for debugging, seeding, and exploring the knowledge base.",
    detail: [
      "/history <entity> — full write history",
      "/relate <a> <b> — entity relationship exploration",
      "/confidence <entity> <key> — view score and source",
      "/conflicts — list active escalations",
      "/write and /query for direct fact manipulation",
    ],
    docsHref: "https://github.com/nfemmanuel/iranti",
  },
];

const validatedIntegrations = [
  {
    name: "CrewAI",
    type: "Python client",
    tier: "Validated",
    tierColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    cmd: "pip install iranti",
    score: "6/6",
    entity: "project/nexus_prime",
    desc: "Wrap IrantiClient.write() and IrantiClient.query() as CrewAI tools. Assign write to the researcher role and query to the analyst role. Memory transfers cross agent boundaries inside the crew.",
    snippet: `from iranti import IrantiClient
from crewai import Tool

client = IrantiClient(base_url="http://localhost:3001",
                      api_key="your_key")

write_tool = Tool(
    name="write_memory",
    func=lambda x: client.write(**x),
    description="Persist a fact to shared memory"
)`,
  },
  {
    name: "LangChain",
    type: "Python client",
    tier: "Validated",
    tierColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    cmd: "pip install iranti",
    score: "5/5",
    entity: "project/stellar_drift",
    desc: "Use IrantiClient as the memory backend for any LangChain agent. Write facts in one chain and retrieve them from a different chain or process. Validated across 5 distinct fact types.",
    snippet: `from iranti import IrantiClient

client = IrantiClient(base_url="http://localhost:3001",
                      api_key="your_key")

# In agent A's chain
client.write(entity="user/alice", key="preference",
             value="prefers concise summaries",
             agent="chain_a", confidence=85)

# In agent B's chain
result = client.query("user/alice", "preference")`,
  },
  {
    name: "OpenAI API",
    type: "Python/TS client",
    tier: "Validated",
    tierColor: "text-teal-500 bg-teal-500/10 border-teal-500/20",
    cmd: "pip install iranti",
    score: "5/5",
    entity: "project/void_runner",
    desc: "Direct HTTP integration validated with 9 lines of Python. Write a fact in one process, retrieve it from a different process. Works with any OpenAI-compatible endpoint.",
    snippet: `import requests

# Write
requests.post("http://localhost:3001/api/kb/write", json={
    "entity": "project/void_runner",
    "key": "status",
    "value": "active",
    "agent": "monitor_agent",
    "confidence": 95
}, headers={"Authorization": "Bearer your_key"})

# Read (different process, same result)
r = requests.get("http://localhost:3001/api/kb/query",
    params={"entity": "project/void_runner", "key": "status"},
    headers={"Authorization": "Bearer your_key"})`,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Integrations
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-3xl">
            Works with your stack.
            <br />
            <span className="text-[var(--text-muted)]">Not instead of it.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
            Iranti integrates through a REST API and published npm and Python packages.
            Native MCP support for Claude Code and Codex. Framework-agnostic for everything else.
            No lock-in — the memory layer is always portable.
          </p>

          <div className="flex gap-3 mt-8 flex-wrap">
            {[
              { label: "Native", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
              { label: "Validated", color: "text-teal-500 bg-teal-500/10 border-teal-500/20" },
              { label: "General", color: "text-[var(--text-muted)] bg-[var(--border-subtle)] border-[var(--border-light)]" },
            ].map((tier) => (
              <span
                key={tier.label}
                className={`px-3 py-1 rounded-full border text-xs font-mono ${tier.color}`}
              >
                {tier.label}
              </span>
            ))}
          </div>
        </section>

        {/* Native integrations */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
                Native
              </span>
            </div>

            <div className="space-y-8">
              {nativeIntegrations.map((item) => (
                <div
                  key={item.name}
                  className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-light)] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                    <div className="flex items-start gap-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-base font-semibold text-[var(--text-code)]">{item.name}</span>
                          <span className={`px-2 py-0.5 rounded-full border text-xs ${item.tierColor}`}>
                            {item.tier}
                          </span>
                        </div>
                        <div className="text-xs text-[var(--text-faint)] font-mono">{item.type}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 flex-shrink-0">
                      <div className="text-xs text-[var(--text-faint)]">setup: {item.setupTime}</div>
                      <a
                        href={item.docsHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
                      >
                        Docs →
                      </a>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{item.desc}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg mb-3">
                        <span className="text-[var(--text-faint)] font-mono text-xs">$</span>
                        <span className="text-xs text-[var(--text-secondary)] font-mono">{item.cmd}</span>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {item.detail.map((d) => (
                        <li key={d} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5 flex-shrink-0">·</span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Validated integrations */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Validated
              </span>
            </div>
            <p className="text-[var(--text-muted)] text-sm mb-10 max-w-xl">
              These integrations have been tested end-to-end with real agent workflows. Results are
              reproducible using the benchmark scripts in the GitHub repo.
            </p>

            <div className="space-y-8">
              {validatedIntegrations.map((item) => (
                <div
                  key={item.name}
                  className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-base font-semibold text-[var(--text-code)]">{item.name}</span>
                        <span className={`px-2 py-0.5 rounded-full border text-xs ${item.tierColor}`}>
                          {item.tier}
                        </span>
                      </div>
                      <div className="text-xs text-[var(--text-faint)] font-mono">{item.type}</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-xs text-[var(--text-faint)] font-mono">{item.entity}</div>
                      <div className="font-mono text-sm text-teal-400">{item.score}</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{item.desc}</p>
                      <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg">
                        <span className="text-[var(--text-faint)] font-mono text-xs">$</span>
                        <span className="text-xs text-[var(--text-secondary)] font-mono">{item.cmd}</span>
                      </div>
                    </div>
                    <div className="bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
                      <pre className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">{item.snippet}</pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* General / Any LLM */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-[var(--text-faint)]" />
              <span className="text-xs text-[var(--text-muted)] font-mono uppercase tracking-wider">
                General
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
              Any LLM via middleware
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
              <code className="text-[var(--text-secondary)] font-mono">IrantiMiddleware</code> wraps{" "}
              <code className="text-[var(--text-secondary)] font-mono">before_send()</code> and{" "}
              <code className="text-[var(--text-secondary)] font-mono">after_receive()</code> for any model via
              API. If your framework has a pre/post hook, Iranti can sit in that hook.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg inline-flex max-w-xs">
              <span className="text-[var(--text-faint)] font-mono text-xs">$</span>
              <span className="text-xs text-[var(--text-secondary)] font-mono">npm install @iranti/sdk</span>
            </div>
          </div>
        </section>

        {/* Honest boundary */}
        <section className="px-6 py-8 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="p-5 border border-[var(--border-subtle)] rounded-xl flex items-start gap-3 max-w-2xl">
              <svg className="w-4 h-4 text-[var(--text-faint)] mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8 6.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 6.5z" />
              </svg>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                <span className="text-[var(--text-secondary)] font-medium">Browser-tab injection is not supported.</span>{" "}
                ChatGPT and Claude web UIs block external memory injection via Content Security
                Policy. Iranti works through API-based middleware, MCP servers, and direct SDK
                integration — not browser extensions or clipboard hooks. If you see a tool claiming
                to inject memory into browser-tab AI interfaces, that is not what Iranti does.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
                Ready to integrate?
              </h2>
              <p className="text-[var(--text-muted)] text-sm">
                Start with the quick install, then pick your integration path.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="https://github.com/nfemmanuel/iranti"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
              >
                View on GitHub
              </a>
              <Link
                href="/get-started"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
