"use client";

import { useState } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

function CodeBlock({
  lines,
  onCopy,
}: {
  lines: { cmd: string; comment?: string }[];
  onCopy?: () => void;
}) {
  const [copied, setCopied] = useState(false);

  const text = lines.map((l) => l.cmd).join("\n");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-[var(--text-faint)] hover:text-[var(--text-secondary)] transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy"
      >
        {copied ? (
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
            <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
          </svg>
        )}
      </button>
      <div className="p-4 space-y-1">
        {lines.map((l, i) => (
          <div key={i} className="font-mono text-sm">
            <span className="text-[var(--text-faint)] mr-2">$</span>
            <span className="text-[var(--text-code)]">{l.cmd}</span>
            {l.comment && (
              <span className="text-[var(--text-faint)] ml-3">{l.comment}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GetStartedContent() {
  return (
    <main className="pt-24 pb-16">
      {/* Hero */}
      <section className="px-6 py-16 max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Get started
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-3xl">
          Up in four commands.
          <br />
          <span className="text-[var(--text-muted)]">Friction documented honestly.</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed">
          Iranti requires Node.js 18+ and PostgreSQL. The setup wizard walks
          you through configuration. If something breaks, the diagnostics
          command tells you exactly what.
        </p>
      </section>

      {/* Path selector */}
      <section className="px-6 py-4 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Quick install", href: "#quick" },
              { label: "Claude Code", href: "#claude-code" },
              { label: "Codex", href: "#codex" },
              { label: "iranti chat", href: "#chat" },
            ].map((path) => (
              <a
                key={path.label}
                href={path.href}
                className="px-4 py-1.5 text-sm border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-secondary)] hover:text-[var(--text-code)] rounded-lg transition-colors"
              >
                {path.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Path 1: Quick install */}
      <section id="quick" className="px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Path 1 — Quick install
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-8">
            Core setup
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                {
                  step: 1,
                  label: "Install the CLI",
                  lines: [{ cmd: "npm install -g iranti", comment: "# requires Node.js 18+" }],
                },
                {
                  step: 2,
                  label: "Run guided setup",
                  lines: [{ cmd: "iranti setup", comment: "# walks through postgres, API keys, and project binding" }],
                },
                {
                  step: 3,
                  label: "Start your instance",
                  lines: [{ cmd: "iranti run --instance local", comment: "# runs on port 3001 by default" }],
                },
                {
                  step: 4,
                  label: "Bind your project",
                  lines: [{ cmd: "iranti project init . --instance local --agent-id my_agent", comment: "# writes .env.iranti" }],
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--text-code)] mb-2">{item.label}</div>
                    <CodeBlock
                      lines={item.lines}
                      onCopy={() => trackEvent("step_copy", { step: item.label })}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {/* PostgreSQL note */}
              <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl">
                <div className="text-xs text-amber-500 font-mono mb-2 uppercase tracking-wider">
                  PostgreSQL requirement
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                  Iranti requires a running PostgreSQL instance. If you do not have one, the
                  easiest path is Docker:
                </p>
                <CodeBlock lines={[
                  { cmd: "docker run -d --name iranti-pg -e POSTGRES_PASSWORD=iranti -p 5432:5432 postgres:15" },
                ]} />
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mt-3">
                  Setup friction is real. We document it honestly rather than pretending it
                  doesn&apos;t exist. The wizard will ask for your connection string and
                  configure everything else automatically.
                </p>
              </div>

              {/* Diagnostics */}
              <div className="p-5 border border-[var(--border-subtle)] rounded-xl">
                <div className="text-sm font-medium text-[var(--text-code)] mb-3">Troubleshooting</div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                  If any step fails, run the full diagnostic report:
                </p>
                <CodeBlock lines={[{ cmd: "iranti doctor --debug" }]} />
                <p className="text-xs text-[var(--text-faint)] leading-relaxed mt-3">
                  This outputs a structured diagnosis of every component: database connection,
                  API server, config files, and project bindings.
                </p>
              </div>

              {/* Quick verify */}
              <div className="p-5 border border-[var(--border-subtle)] rounded-xl">
                <div className="text-sm font-medium text-[var(--text-code)] mb-3">Verify the install</div>
                <CodeBlock lines={[
                  { cmd: "iranti doctor --instance local", comment: "# health check" },
                ]} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path 2: Claude Code */}
      <section id="claude-code" className="px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Path 2 — Claude Code integration
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            MCP + automatic session hooks
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
            Iranti provides a native MCP server for Claude Code. One command configures
            the{" "}
            <code className="text-[var(--text-secondary)] font-mono text-sm">.mcp.json</code> file and
            installs SessionStart hooks that automatically load relevant memory at the start
            of each session.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text-code)] mb-2">Ensure Iranti is running</div>
                  <CodeBlock lines={[{ cmd: "iranti run --instance local" }]} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text-code)] mb-2">Run auto-setup in your project</div>
                  <CodeBlock lines={[{ cmd: "iranti claude-setup .", comment: "# configures .mcp.json and hooks" }]} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text-code)] mb-2">Launch Claude Code</div>
                  <CodeBlock lines={[{ cmd: "claude" }]} />
                </div>
              </div>
            </div>

            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
              <div className="text-xs text-[var(--text-faint)] font-mono mb-3">// what happens on session start</div>
              <div className="font-mono text-xs space-y-1">
                <div className="text-[var(--text-secondary)]">SessionStart hook fires</div>
                <div className="text-[var(--text-faint)] pl-4">↓</div>
                <div className="text-teal-400 pl-4">Attendant.brief(task=current_task)</div>
                <div className="text-[var(--text-faint)] pl-8">↓</div>
                <div className="text-[var(--text-secondary)] pl-8">relevant facts injected into context</div>
                <div className="text-[var(--text-faint)] pl-4 mt-2">↓ on write</div>
                <div className="text-amber-400 pl-4">iranti_write MCP tool</div>
                <div className="text-[var(--text-faint)] pl-8">↓</div>
                <div className="text-teal-400 pl-8">Librarian.receive() + conflict check</div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
                <a
                  href="https://github.com/nfemmanuel/iranti/blob/main/docs/guides/claude-code.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Full Claude Code guide →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Path 3: Codex */}
      <section id="codex" className="px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Path 3 — Codex integration
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            Global MCP registry
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
            Iranti integrates with Codex through the global MCP registry. Run the setup
            command once, then any Codex session in a bound project will have access to
            Iranti memory tools.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text-code)] mb-2">Register globally</div>
                  <CodeBlock lines={[{ cmd: "iranti codex-setup", comment: "# registers in global MCP config" }]} />
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--text-code)] mb-2">Launch Codex in your project</div>
                  <CodeBlock lines={[{ cmd: "codex -C /path/to/your/project" }]} />
                </div>
              </div>
            </div>

            <div className="p-5 border border-[var(--border-subtle)] rounded-xl">
              <div className="text-sm font-medium text-[var(--text-code)] mb-3">Docs</div>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/nfemmanuel/iranti/blob/main/docs/guides/codex.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
                  >
                    Codex integration guide →
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/nfemmanuel/iranti/blob/main/docs/guides/quickstart.md"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                  >
                    Quickstart guide
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Path 4: iranti chat */}
      <section id="chat" className="px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              iranti chat
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
            Interactive memory inspection
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
            <code className="text-[var(--text-secondary)] font-mono">iranti chat</code> opens an interactive
            terminal session backed by your Iranti memory. Use it to inspect what your agents
            know, write facts directly, explore relationships, and review conflict history — all
            through slash commands.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <CodeBlock lines={[{ cmd: "iranti chat", comment: "# requires a running instance" }]} />
              <div className="mt-6 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-xl p-5">
                <div className="text-xs text-[var(--text-faint)] font-mono mb-3">// available slash commands</div>
                <div className="space-y-2 font-mono text-xs">
                  {[
                    { cmd: "/history <entity>", desc: "full write history for an entity" },
                    { cmd: "/relate <a> <b>", desc: "explore relationships between entities" },
                    { cmd: "/confidence <entity> <key>", desc: "view confidence score and source" },
                    { cmd: "/conflicts", desc: "list active unresolved escalations" },
                    { cmd: "/write <entity> <key> <value>", desc: "write a fact directly" },
                    { cmd: "/query <entity> <key>", desc: "look up a specific fact" },
                  ].map((item) => (
                    <div key={item.cmd} className="flex gap-3">
                      <span className="text-amber-400 flex-shrink-0">{item.cmd}</span>
                      <span className="text-[var(--text-faint)]">— {item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 border border-[var(--border-subtle)] rounded-xl">
                <div className="text-sm font-medium text-[var(--text-code)] mb-2">When to use iranti chat</div>
                <ul className="space-y-2">
                  {[
                    "Debug why an agent retrieved unexpected facts",
                    "Manually write seed facts before a long agent run",
                    "Inspect conflict escalations without writing code",
                    "Verify that facts are persisting correctly across sessions",
                    "Explore the relationship graph between entities",
                  ].map((item) => (
                    <li key={item} className="text-sm text-[var(--text-muted)] flex items-start gap-2">
                      <span className="text-teal-500 mt-0.5 flex-shrink-0">·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Python client */}
      <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Python SDK
            </span>
          </div>
          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-8">
            Python client
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <CodeBlock lines={[{ cmd: "pip install iranti" }]} />
              <div className="mt-4 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">{`from iranti import IrantiClient

client = IrantiClient(
    base_url="http://localhost:3001",
    api_key="your_api_key"
)

# Write a fact
client.write(
    entity="project/my_project",
    key="deadline",
    value={"date": "2026-04-01"},
    summary="Project deadline is April 2026",
    confidence=90,
    source="project_brief",
    agent="planner_agent"
)

# Any agent reads it back
result = client.query("project/my_project", "deadline")
print(result.value)  # {"date": "2026-04-01"}`}</pre>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-5 border border-[var(--border-subtle)] rounded-xl">
                <div className="text-sm font-medium text-[var(--text-code)] mb-3">TypeScript SDK</div>
                <CodeBlock lines={[{ cmd: "npm install @iranti/sdk", comment: "# v0.2.12" }]} />
              </div>
              <div className="p-5 border border-[var(--border-subtle)] rounded-xl">
                <div className="text-sm font-medium text-[var(--text-code)] mb-3">Guides</div>
                <ul className="space-y-2">
                  {[
                    { label: "Quickstart", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/quickstart.md" },
                    { label: "Security quickstart", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/security-quickstart.md" },
                    { label: "Claude Code guide", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/claude-code.md" },
                    { label: "Codex guide", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/codex.md" },
                  ].map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--text-muted)] hover:text-[var(--text-code)] transition-colors"
                      >
                        {l.label} →
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
        <div className="max-w-6xl mx-auto">
          <div className="p-8 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-sm font-medium text-[var(--text-code)] mb-2">Need help?</div>
              <p className="text-sm text-[var(--text-muted)]">
                Open an issue on GitHub. We respond to real setup questions.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="https://github.com/nfemmanuel/iranti/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
              >
                Open an issue
              </a>
              <Link
                href="/integrations"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
              >
                View integrations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
