import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export const metadata: Metadata = {
  title: "Claude Code Guide — Iranti Docs",
  description: "Set up Iranti with Claude Code: MCP config, CLAUDE.md, and response-persistence hooks.",
  alternates: { canonical: "/docs/claude-code" },
};

export default function ClaudeCodeGuidePage() {
  return (
    <div className="min-h-screen">
      <GridBackground />
      <Nav />

      <main className="relative z-10 pt-24 pb-16">
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Claude Code guide</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Wire Iranti into Claude Code.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            This is the highest-fidelity path. Claude Code supports MCP natively and respects
            session hooks, so memory gets written and retrieved on every turn without any
            manual prompting.
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
                  Run this from your project root. It writes the MCP config, protocol instructions, and session hooks automatically.
                </p>
                <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm">
                  <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                  <pre className="text-[var(--text-code)] whitespace-pre">iranti claude-setup</pre>
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
                  The command writes three files to your project:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      file: ".mcp.json",
                      desc: "Registers Iranti as a workspace MCP server so Claude Code connects to it on startup.",
                    },
                    {
                      file: "CLAUDE.md",
                      desc: "Injects the session protocol into Claude Code's context — when to call handshake, attend, write, and checkpoint.",
                    },
                    {
                      file: "Session hooks",
                      desc: "PostToolUse and UserPromptSubmit hooks that fire iranti_attend and iranti_write automatically on every turn.",
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
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Restart Claude Code</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Restart Claude Code so it picks up the new MCP server and hooks. On the next session start,
                  you should see{" "}
                  <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_handshake</code>{" "}
                  in the tool call log.
                </p>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  You can also verify the MCP connection from the terminal:
                </p>
                <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm mt-3">
                  <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                  <pre className="text-[var(--text-code)] whitespace-pre">iranti doctor</pre>
                </div>
              </div>
            </div>
          </div>

          {/* How memory works */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">How memory works in practice</h2>
            <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
              <p>
                At session start, Claude Code calls{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_handshake</code>{" "}
                with the current task. Iranti loads your working-memory brief — recent decisions, open risks, next steps — and injects it before the first response.
              </p>
              <p>
                Before each response,{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_attend</code>{" "}
                checks whether any stored facts are relevant to the current message. If they are, they get injected into context.
              </p>
              <p>
                After file edits and confirmed findings,{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_write</code>{" "}
                persists the fact. The next session starts with it already loaded.
              </p>
              <p>
                At task completion or natural pauses,{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_checkpoint</code>{" "}
                saves current step, next step, open risks, and recent outputs so interrupted work can resume cleanly.
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
