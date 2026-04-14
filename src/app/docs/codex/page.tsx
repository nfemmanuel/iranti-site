import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export const metadata: Metadata = {
  title: "Codex Guide — Iranti Docs",
  description: "Set up Iranti with Codex CLI: global MCP registration, workspace files, and the memory protocol for Codex sessions.",
  alternates: { canonical: "/docs/codex" },
};

export default function CodexGuidePage() {
  return (
    <div className="min-h-screen">
      <GridBackground />
      <Nav />

      <main className="relative z-10 pt-24 pb-16">
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Codex guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Wire Iranti into Codex.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Codex CLI reads MCP servers from both a global registry and a workspace
            file. One command handles both — and gives VS Code the same connection so
            Codex works the same way in the terminal and the editor.
          </p>
        </section>

        <section className="px-6 pb-8 max-w-3xl mx-auto">
          <div className="p-5 bg-amber-500/5 border border-amber-500/20 rounded-xl text-sm text-[var(--text-secondary)] leading-relaxed">
            You need Iranti running before this step.{" "}
            <Link href="/docs/quickstart" className="text-amber-500 hover:text-amber-400 transition-colors">
              Follow the quickstart first →
            </Link>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto space-y-6">
          {/* Step 1 */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">1</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Run the setup command</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Run this once on the machine, from inside your bound project directory.
                  Iranti registers itself with Codex globally and writes workspace MCP
                  files for the current project.
                </p>
                <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm">
                  <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                  <pre className="text-[var(--text-code)] whitespace-pre">iranti codex-setup</pre>
                </div>
              </div>
            </div>
          </div>

          {/* What it writes */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">2</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">What gets written</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  The command registers Iranti in three places:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      file: "~/.codex/config.toml",
                      desc: "Global Codex MCP registration. Iranti is available in every Codex session on this machine.",
                    },
                    {
                      file: ".mcp.json",
                      desc: "Project-local MCP config pinned to this project's .env.iranti, so the right memory space loads automatically.",
                    },
                    {
                      file: ".vscode/mcp.json",
                      desc: "VS Code MCP config for Codex VS Code sessions. Same connection, same memory, whether you use the terminal or the editor.",
                    },
                  ].map((item) => (
                    <div key={item.file} className="flex items-start gap-3 p-3 bg-[var(--bg-code)] rounded-lg">
                      <code className="text-xs text-teal-400 font-mono shrink-0 mt-0.5">{item.file}</code>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">3</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Verify the registration</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Confirm Codex picked up the registration before opening a session:
                </p>
                <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm">
                  <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                  <pre className="text-[var(--text-code)] whitespace-pre">{`codex mcp list\ncodex mcp get iranti`}</pre>
                </div>
                <p className="text-xs text-[var(--text-faint)] mt-3 leading-relaxed">
                  You want to see command: iranti, args: mcp, and the project env path when running from a bound project.
                </p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">4</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Open Codex in your project</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Launch Codex from the directory that contains your{" "}
                  <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">.env.iranti</code>{" "}
                  file so Iranti loads the right project binding.
                </p>
                <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm">
                  <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                  <pre className="text-[var(--text-code)] whitespace-pre">codex -C /path/to/your/project</pre>
                </div>
              </div>
            </div>
          </div>

          {/* How memory works */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">How memory works in Codex</h2>
            <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              <p>
                At session start, call{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_handshake</code>{" "}
                with the current task. Iranti loads your working-memory brief and injects relevant facts before the first response.
              </p>
              <p>
                Before each response,{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_attend</code>{" "}
                checks whether any stored facts are relevant and injects them into context.
              </p>
              <p>
                Codex does not have a Stop hook like Claude Code. When your response contains a durable summary worth
                keeping — a decision, a next step, a blocker — use{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_remember_response</code>{" "}
                to persist it.
              </p>
              <p>
                At meaningful milestones, use{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_checkpoint</code>{" "}
                to save current step, next step, and open risks so interrupted work can resume cleanly — even when picking
                up in Claude Code or another tool.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/quickstart" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
              ← Quickstart
            </Link>
            <Link href="/docs/operator" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
              Operator reference →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
