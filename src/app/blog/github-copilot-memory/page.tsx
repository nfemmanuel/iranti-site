import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "GitHub Copilot CLI Now Supports Iranti Shared Memory — Iranti",
  description:
    "As of v0.3.17, iranti copilot-setup wires GitHub Copilot CLI into the same shared project memory as Claude Code and Codex. One command. No re-briefing when you switch.",
  alternates: { canonical: "/blog/github-copilot-memory" },
  openGraph: {
    title: "GitHub Copilot CLI Now Supports Iranti Shared Memory",
    description:
      "iranti copilot-setup wires GitHub Copilot CLI into the same shared project memory as Claude Code and Codex. Switch tools without losing context.",
    type: "article",
    url: "https://iranti.dev/blog/github-copilot-memory",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "GitHub Copilot CLI Now Supports Iranti Shared Memory",
    description:
      "One command to wire GitHub Copilot CLI into the same shared memory as Claude Code and Codex. No more re-briefing when you switch tools.",
  },
};

export default function GithubCopilotMemoryPost() {
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
              {["Copilot", "cross-tool", "v0.3.17"].map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              GitHub Copilot CLI now supports Iranti shared memory
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              As of v0.3.17,{" "}
              <code className="text-sm text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                iranti copilot-setup
              </code>{" "}
              wires GitHub Copilot CLI into the same shared project memory as Claude Code and Codex.
              Copilot reads what the other tools wrote. You stop re-briefing every time you switch.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The same problem, a larger audience</h2>
              <p className="mb-4">
                GitHub Copilot CLI is one of the most widely used AI coding tools. It has deep IDE
                integration, GitHub-native context, and a large installed base — especially among
                developers who work primarily inside GitHub&apos;s ecosystem.
              </p>
              <p className="mb-4">
                It has the same memory problem as every other AI coding tool: each session starts blank.
                Copilot has no memory of the architectural decisions you made last week, the constraint you
                discovered yesterday, or the task you left half-finished this morning. If you use Copilot
                alongside Claude Code or Codex — which a large number of developers do — there&apos;s no
                shared layer between them. Every tool switch is a full context reset.
              </p>
              <p>
                v0.3.17 adds Copilot CLI to Iranti&apos;s supported integrations, alongside Claude Code,
                Codex CLI, and Cursor. One command from your project root wires it in.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">How it works</h2>
              <p className="mb-4">
                Run{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                  iranti copilot-setup
                </code>{" "}
                from your project root. It does three things:
              </p>

              <div className="space-y-3 mb-5">
                {[
                  {
                    label: "1. Writes the MCP config",
                    desc: (
                      <>
                        Adds Iranti as an MCP server in{" "}
                        <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1 py-0.5 rounded">.vscode/mcp.json</code>,
                        which Copilot CLI picks up automatically. Iranti&apos;s tools —{" "}
                        <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1 py-0.5 rounded">iranti_handshake</code>,{" "}
                        <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1 py-0.5 rounded">iranti_attend</code>,{" "}
                        <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1 py-0.5 rounded">iranti_write</code>, and the rest — become available in every Copilot session.
                      </>
                    ),
                  },
                  {
                    label: "2. Writes the protocol instructions",
                    desc: (
                      <>
                        Generates{" "}
                        <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1 py-0.5 rounded">.github/copilot-instructions.md</code>{" "}
                        with the Iranti protocol embedded. Copilot injects this file&apos;s contents into every session
                        automatically — so the handshake and memory protocol runs at session start without any
                        manual intervention.
                      </>
                    ),
                  },
                  {
                    label: "3. Writes the hook scaffolding",
                    desc: (
                      <>
                        Creates{" "}
                        <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1 py-0.5 rounded">.github/hooks/hooks.json</code>{" "}
                        and the per-turn reminder script as forward-compatible placeholders.
                        Copilot CLI&apos;s hook system is not yet as mature as Claude Code&apos;s — the static
                        instructions file is the effective mechanism today — but the hook files are in place
                        and will activate when Copilot&apos;s hook support matures.
                      </>
                    ),
                  },
                ].map(({ label, desc }) => (
                  <div key={label} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{label}</div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>

              <p className="text-sm">
                After setup, Copilot calls{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">iranti_handshake</code>{" "}
                at the start of each session, reads the working memory brief, and picks up where the last
                session left off — regardless of which tool wrote that memory.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Setting it up</h2>
              <p className="mb-4">From your project root:</p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-2 mb-5">
                <div className="text-[var(--text-faint)] mb-2"># Install Iranti globally (if you haven&apos;t already)</div>
                <div className="text-teal-300">npm install -g iranti</div>
                <div className="text-[var(--text-faint)] mt-3 mb-2"># Wire up Copilot CLI</div>
                <div className="text-teal-300">iranti copilot-setup</div>
              </div>

              <p className="mb-4">
                If you&apos;re also using Claude Code or Codex on the same project, run their setup
                commands too:
              </p>

              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-muted)] space-y-1 mb-5">
                <div className="text-teal-300">iranti claude-setup</div>
                <div className="text-teal-300">iranti codex-setup</div>
              </div>

              <p>
                All three tools now share the same memory store. What Claude Code figures out in a session
                is available to Copilot in the next one, and vice versa.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The honest tradeoffs</h2>
              <p className="mb-5">
                Copilot&apos;s integration is real and works in practice, but it&apos;s worth being clear about
                where it stands relative to the other integrations:
              </p>

              <div className="space-y-3">
                {[
                  {
                    label: "Claude Code",
                    desc: "The deepest integration. Native SessionStart and UserPromptSubmit hooks trigger memory injection automatically on every turn. The most reliable protocol compliance.",
                  },
                  {
                    label: "Codex CLI",
                    desc: "Full hook support via ~/.codex/hooks.json. SessionStart and UserPromptSubmit hooks both fire, so session start and per-turn injection work natively.",
                  },
                  {
                    label: "GitHub Copilot CLI",
                    desc: "Integration via static instructions injection (.github/copilot-instructions.md). Copilot reads these instructions at session start, so the handshake fires correctly. Per-turn hooks are scaffolded but Copilot's hook system is less mature — the instructions file is the primary enforcement mechanism today.",
                  },
                  {
                    label: "Cursor",
                    desc: "Integration via MCP config and .cursor/rules. Works, but Cursor is the least tested of the four integrations.",
                  },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <code className="text-xs text-teal-400 font-mono flex-shrink-0 mt-0.5 w-28">{label}</code>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What this means in practice</h2>
              <p className="mb-4">
                If you use GitHub Copilot CLI as your primary tool and occasionally drop into Claude Code
                for a complex architectural session, you no longer lose that context when you come back.
                Claude writes the decisions to Iranti. Copilot reads them at session start. You skip the
                re-briefing entirely.
              </p>
              <p className="mb-4">
                If you use all three tools depending on the task — Claude Code for long exploratory sessions,
                Codex for focused implementation, Copilot for quick edits — they now all share a common
                understanding of your project. One memory store. Every tool reads from it. Every tool
                writes to it.
              </p>
              <p>
                The goal is that the tool you pick for a given task shouldn&apos;t determine how much context
                it has. It should just know.
              </p>
            </div>

            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Get started</div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href="/docs"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  Setup guide →
                </Link>
                <Link
                  href="/integrations"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  All integrations →
                </Link>
                <Link
                  href="/product"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  How it works →
                </Link>
              </div>
              <p className="text-xs text-[var(--text-faint)] mt-4">
                Iranti is open source (AGPL-3.0) and free to self-host. Requires Postgres with pgvector.
              </p>
            </div>

          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <Comments slug="github-copilot-memory" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
