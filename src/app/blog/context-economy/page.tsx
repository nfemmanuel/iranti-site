import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";

export default function ContextEconomyPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        {/* Header */}
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
              <time className="text-xs font-mono text-[var(--text-faint)]">2026-04-06</time>
              {["benchmarks", "token efficiency", "B14"].map(tag => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              Why Iranti uses 37% fewer tokens in long coding sessions
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              We measured cumulative input token usage over a 15-turn coding session with and without
              Iranti. By turn 15, the Iranti arm uses 37% fewer tokens. Here&apos;s exactly how we
              measured it and why the gap grows over time.
            </p>
          </div>
        </section>

        {/* Article body */}
        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-8 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The problem</h2>
              <p className="mb-4">
                AI coding sessions accumulate tokens. Every file read, every tool call, every assistant
                response — it all stays in the context window. When a coding agent needs a value from
                earlier in the session (a config key, a function signature, an environment variable),
                it either reads the file again or loses it to context compression.
              </p>
              <p>
                Neither is great. Re-reading adds the full file to the window — 300 to 600 tokens for
                a typical TypeScript module. Losing it means the agent has to re-establish context from
                scratch. In a 15-turn session with 8 recall turns, the compounding effect is
                significant.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The measurement</h2>
              <p className="mb-4">
                We designed benchmark B14 (Context Economy) to measure this directly. The setup is a
                scripted 15-turn &ldquo;DebugAuth&rdquo; session — a fictional engineer debugging a JWT
                authentication system across 7 TypeScript and SQL files.
              </p>
              <p className="mb-4">
                Two arms run the same session simultaneously:
              </p>
              <ul className="space-y-2 mb-4 ml-4">
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-amber-500 font-mono text-xs mt-1 flex-shrink-0">NO_MEMORY</span>
                  <span>
                    The agent re-reads the relevant source file when it needs a specific value. This is
                    realistic — an agent without structured memory either keeps files in context or must
                    re-read them.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="text-teal-500 font-mono text-xs mt-1 flex-shrink-0">WITH_IRANTI</span>
                  <span>
                    The agent receives a compact Iranti inject block on recall turns — a structured fact
                    containing exactly the value it needs, formatted in the v0.3.11 compact format.
                  </span>
                </li>
              </ul>
              <p>
                Token counts are exact. We used the Anthropic{" "}
                <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">
                  client.beta.messages.countTokens()
                </code>{" "}
                API — this returns the actual token count the model would see, with no approximation.
                Both arms run concurrently via{" "}
                <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">
                  Promise.all()
                </code>{" "}
                per turn for a fair baseline.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The results</h2>
              <p className="mb-6">
                Turns 1–7 are establishment turns — both arms read the same files, build the same
                context. Token counts are identical. The divergence begins at turn 8, the first recall
                turn, and compounds from there:
              </p>

              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)]">
                      <th className="text-left py-3 pr-6 text-xs font-mono text-[var(--text-faint)] uppercase">Turn</th>
                      <th className="text-right py-3 pr-6 text-xs font-mono text-amber-500 uppercase">NO_MEMORY</th>
                      <th className="text-right py-3 pr-6 text-xs font-mono text-teal-500 uppercase">WITH_IRANTI</th>
                      <th className="text-right py-3 text-xs font-mono text-[var(--text-faint)] uppercase">Saved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [7,  "establishment", 3781,  3781,  "—"],
                      [8,  "recall",        4220,  3980,  "6%"],
                      [10, "recall",        5236,  4355,  "17%"],
                      [12, "recall",        6256,  4769,  "24%"],
                      [14, "recall",        8043,  5362,  "33%"],
                      [15, "recall",        8949,  5677,  "37%"],
                    ].map(([turn, phase, nm, wi, pct]) => (
                      <tr key={turn as number} className="border-b border-[var(--border-subtle)] last:border-0">
                        <td className="py-2.5 pr-6 font-mono text-[var(--text-secondary)]">{turn}</td>
                        <td className="py-2.5 pr-6 text-right">
                          <span className={`text-xs font-mono px-1.5 py-0.5 rounded ${phase === "recall" ? "bg-teal-500/10 text-teal-500" : "bg-[var(--bg-surface)] text-[var(--text-faint)]"}`}>
                            {phase}
                          </span>
                        </td>
                        <td className="py-2.5 pr-6 font-mono text-right text-amber-500">{(nm as number).toLocaleString()}</td>
                        <td className="py-2.5 pr-6 font-mono text-right text-teal-500">{(wi as number).toLocaleString()}</td>
                        <td className="py-2.5 font-mono text-right text-[var(--text-secondary)]">{pct}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mb-4">
                By turn 15, the session uses 8,949 tokens without Iranti and 5,677 with it — a saving
                of 3,272 tokens, or 37%. Context window usage at that point: 4.5% (NO_MEMORY) vs 2.8%
                (WITH_IRANTI) of a 200k window.
              </p>
              <p>
                The curve is monotonically increasing. Each recall turn adds more separation because
                the NO_MEMORY arm accumulates one additional full file read while the WITH_IRANTI arm
                adds only the compact inject block.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Why the inject block is smaller</h2>
              <p className="mb-4">
                The token difference comes from the format of what gets added to the context window on
                recall turns.
              </p>
              <p className="mb-4">
                A file re-read via the Read tool adds the full file content as a tool result. For a
                typical TypeScript auth module, that&apos;s 300–600 tokens of function signatures,
                imports, and comments — most of which is irrelevant to the specific value the agent
                needed.
              </p>
              <p>
                An Iranti inject block contains only the fact. In v0.3.11&apos;s compact format, a
                single fact (entity key, summary, one structured value) takes 50–150 tokens. The
                identity-first retrieval means the agent receives exactly what it asked for,
                not the file it was in.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Caveats</h2>
              <p className="mb-4">
                The benchmark uses scripted, deterministic sessions. Real sessions vary in recall
                frequency. A session with heavy file I/O and low recall will show less divergence;
                a session with frequent lookups of previously-read values will show more.
              </p>
              <p>
                The 37% figure represents a moderate-recall pattern (8 recall turns in 15). We treat
                this as a representative baseline, not a best-case scenario.
              </p>
            </div>

            <div className="border border-teal-500/30 bg-teal-500/5 rounded-lg px-5 py-4">
              <span className="text-xs font-mono uppercase tracking-wider text-teal-500 mr-2">Finding</span>
              <span className="text-sm">
                Structured memory retrieval reduces context window pressure in proportion to recall
                frequency. In a typical 15-turn coding session, the saving reaches 37% — exact, not
                estimated. The mechanism is simple: compact inject blocks replace full file re-reads.
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/benchmarks/b14"
                className="text-sm font-mono text-teal-500 hover:text-teal-400 transition-colors"
              >
                View the full B14 benchmark results →
              </Link>
            </div>

          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <Comments slug="context-economy" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
