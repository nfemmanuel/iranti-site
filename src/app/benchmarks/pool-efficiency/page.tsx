import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { b3bResults, competitiveSystems } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Memory Token Efficiency: Iranti vs Mem0, Shodh & Graphiti",
  description:
    "All 20 facts in one shared namespace. Iranti scores 5.0 efficiency (100% accuracy, 20 tok/query). Shodh returns 66 tok/query despite 92% accuracy. Full methodology and token breakdown.",
  alternates: { canonical: "/benchmarks/pool-efficiency" },
  openGraph: {
    title: "Memory Token Efficiency — Iranti vs Mem0, Shodh & Graphiti",
    description:
      "Iranti 5.0 · Mem0 4.44 · Shodh 1.39 · Graphiti 1.22. Accuracy matters — but so does injection size. Full pool efficiency benchmark methodology.",
    type: "website",
    url: "https://iranti.dev/benchmarks/pool-efficiency",
    siteName: "Iranti",
  },
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatBar({ pct, color, height = "h-1.5" }: { pct: number; color: string; height?: string }) {
  return (
    <div className={`flex-1 ${height} rounded-full overflow-hidden`} style={{ background: "var(--border-subtle)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default function PoolEfficiencyPage() {
  const maxEff = 5.0;
  const maxTok = 70;

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="px-6 pt-4 pb-0 max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono">
            <Link href="/benchmarks" className="hover:text-teal-400 transition-colors">Benchmarks</Link>
            <span>/</span>
            <span className="text-[var(--text-muted)]">C2 — Pool Efficiency</span>
          </nav>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-6 py-14 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">C2 — Pool Efficiency</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4 max-w-4xl">
            Accuracy is half the story.
            <br />
            <span className="text-[var(--text-muted)]">Token cost is the other half.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
            All 20 facts written to a single shared namespace. 40 queries must find the right fact
            among everything stored. The efficiency score compounds accuracy and injection size:
            a system that returns too much context loses points even if it finds the right answer.
          </p>

          {/* Result pills */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {competitiveSystems.map((s) => {
              const d = b3bResults.systems[s.id as keyof typeof b3bResults.systems];
              return (
                <div key={s.id} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="text-2xl font-semibold tracking-[-0.03em] mb-1" style={{ color: s.color }}>
                    {d.efficiency}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-1">{s.label}</div>
                  <div className="text-xs text-[var(--text-faint)] font-mono">{d.pct}% · {d.tokPerQuery} tok/query</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">The pool test</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  C1 tests each fact in isolation — one fact per namespace, zero competition for retrieval.
                  C2 is harder: all 20 facts are written to a single shared namespace, and each query must
                  return the one relevant fact from the full pool.
                </p>
                <p>
                  This tests how well each system concentrates its injection on relevant content versus
                  returning bulk context. In production, a memory pool grows over time — systems that
                  return more context with each query impose higher token cost at inference time.
                </p>
                <p>
                  For Iranti, the shared namespace is a single project/user context. For Shodh, a single
                  user ID. For Mem0, a single user ID with one Chroma collection. For Graphiti, a single
                  <code className="font-mono text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded ml-1">group_id</code> containing all episodes.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Efficiency formula</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  The efficiency score is a compound metric that penalizes token bloat:
                </p>
                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="font-mono text-center text-base text-[var(--text-primary)] mb-3">
                    efficiency = accuracy% ÷ avg_tok_per_query
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 border border-teal-500/20 rounded-lg bg-teal-500/5">
                      <div className="text-teal-400 mb-1">Iranti</div>
                      <div className="text-[var(--text-muted)]">100 ÷ 20 = <span className="text-teal-300 font-semibold">5.0</span></div>
                    </div>
                    <div className="p-3 border border-blue-400/20 rounded-lg bg-blue-400/5">
                      <div className="text-blue-400 mb-1">Shodh</div>
                      <div className="text-[var(--text-muted)]">92 ÷ 66 = <span className="text-blue-300 font-semibold">1.39</span></div>
                    </div>
                    <div className="p-3 border border-amber-500/20 rounded-lg bg-amber-500/5">
                      <div className="text-amber-400 mb-1">Mem0</div>
                      <div className="text-[var(--text-muted)]">80 ÷ 18 = <span className="text-amber-300 font-semibold">4.44</span></div>
                    </div>
                    <div className="p-3 border border-violet-400/20 rounded-lg bg-violet-400/5">
                      <div className="text-violet-400 mb-1">Graphiti</div>
                      <div className="text-[var(--text-muted)]">60 ÷ 49 = <span className="text-violet-300 font-semibold">1.22</span></div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-faint)]">
                  Tokens counted as whitespace-delimited words in the returned context string.
                  Per-query averages computed across all 40 queries.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Three-axis comparison ────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Three-axis comparison</h2>
            <div className="grid md:grid-cols-3 gap-4">

              {/* Accuracy */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">Accuracy</div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3bResults.systems[s.id as keyof typeof b3bResults.systems];
                    return (
                      <div key={s.id}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-code)]">{s.label}</span>
                          <span className="font-mono text-sm" style={{ color: s.color }}>{d.pct}%</span>
                        </div>
                        <StatBar pct={d.pct} color={s.color} height="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Token cost */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">Avg tok/query <span className="normal-case">(lower = better)</span></div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3bResults.systems[s.id as keyof typeof b3bResults.systems];
                    return (
                      <div key={s.id}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-code)]">{s.label}</span>
                          <span className="font-mono text-sm" style={{ color: s.color }}>{d.tokPerQuery}</span>
                        </div>
                        <StatBar pct={(d.tokPerQuery / maxTok) * 100} color={s.color} height="h-2" />
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[var(--text-faint)] font-mono mt-3">Bar length = relative token cost</p>
              </div>

              {/* Efficiency */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">Efficiency score</div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3bResults.systems[s.id as keyof typeof b3bResults.systems];
                    return (
                      <div key={s.id}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-code)]">{s.label}</span>
                          <span className="font-mono text-sm" style={{ color: s.color }}>{d.efficiency}</span>
                        </div>
                        <StatBar pct={(d.efficiency / maxEff) * 100} color={s.color} height="h-2" />
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[var(--text-faint)] font-mono mt-3">Normalized to max 5.0</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Token bloat analysis ─────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">
              Why Shodh's token cost collapses efficiency
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  In C1 (isolated namespaces), Shodh returned 20 tokens per query — identical to Iranti.
                  This is because each namespace contained exactly one fact, so recall returned exactly that
                  fact's text.
                </p>
                <p>
                  In C2 (shared pool of 20 facts), Shodh's token count jumps to 66 tokens per query.
                  Shodh's recall implementation returns the full text of each matched memory without
                  summarization or truncation. When the pool contains 20 facts and recall is tuned to
                  return top-k results, the returned context includes multiple full fact texts.
                </p>
                <p>
                  At 66 tok/query across 40 queries, Shodh injects 2,640 tokens of memory context into
                  a typical session — versus Iranti's 800. At scale, this differential compounds across
                  every turn that involves memory retrieval.
                </p>
                <div className="p-4 border border-blue-400/20 bg-blue-400/5 rounded-xl">
                  <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">Shodh accuracy in pool: 92%</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Shodh still finds the right answer 92% of the time — the accuracy degradation from isolated
                    to pool is small (100% → 92%). The problem is not retrieval quality, it is injection volume.
                    The correct fact is in the context, surrounded by other facts.
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Isolated (C1) vs Pool (C2)</div>
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="border-b border-[var(--border-subtle)]">
                        <th className="text-left text-[var(--text-faint)] pb-2 pr-4">System</th>
                        <th className="text-right text-[var(--text-faint)] pb-2 pr-4">Isolated tok/q</th>
                        <th className="text-right text-[var(--text-faint)] pb-2">Pool tok/q</th>
                      </tr>
                    </thead>
                    <tbody className="space-y-1">
                      {[
                        { id: "iranti",   label: "Iranti",   iso: 20, pool: 20, color: "#14b8a6" },
                        { id: "shodh",    label: "Shodh",    iso: 20, pool: 66, color: "#60a5fa" },
                        { id: "mem0",     label: "Mem0",     iso: 13, pool: 18, color: "#f59e0b" },
                        { id: "graphiti", label: "Graphiti", iso: 37, pool: 49, color: "#a78bfa" },
                      ].map((r) => (
                        <tr key={r.id} className="border-b border-[var(--border-subtle)]/50">
                          <td className="py-2.5 pr-4" style={{ color: r.color }}>{r.label}</td>
                          <td className="text-right py-2.5 pr-4 text-[var(--text-muted)]">{r.iso}</td>
                          <td className="text-right py-2.5" style={{ color: r.pool > r.iso * 1.5 ? "#ef4444" : r.color }}>
                            {r.pool}{r.pool > r.iso * 1.5 ? " ↑" : ""}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border border-teal-500/20 bg-teal-500/5 rounded-xl">
                  <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-2">Iranti pool behavior</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    Iranti's attend-based injection returns only the entity facts relevant to the current
                    query — 20 tokens whether the pool has 1 fact or 1,000. This is a consequence of
                    structured entity+key addressing: the query maps to specific entity attributes, not a
                    full-text search across all stored content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Key findings ────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Key findings</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {b3bResults.keyFindings.map((finding, i) => (
                <div key={i} className="flex gap-4 p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="font-mono text-xs text-teal-500 shrink-0 mt-0.5">{String(i + 1).padStart(2, "0")}</div>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{finding}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Navigation ──────────────────────────────────────────────────── */}
        <section className="px-6 py-8 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row gap-3">
            <Link href="/benchmarks" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors">
              ← All benchmarks
            </Link>
            <Link href="/benchmarks/competitive-recall" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-teal-500/40 text-[var(--text-code)] text-sm rounded-lg transition-colors">
              ← C1: Recall accuracy
            </Link>
            <Link href="/benchmarks/conflict-resolution" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-teal-500/40 text-[var(--text-code)] text-sm rounded-lg transition-colors">
              C3: Conflict resolution →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
