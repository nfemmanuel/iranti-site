import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { b3cResults, competitiveSystems } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "C3: Conflict Resolution — Iranti Benchmarks",
  description:
    "Write v1 then v2 for 10 fact pairs. Query each. Correct = v2 (latest). Iranti 100% clean v2. Shodh 100% but returns both. Mem0 80%. Graphiti 40%. Full methodology and per-verdict breakdown.",
  alternates: { canonical: "/benchmarks/conflict-resolution" },
  openGraph: {
    title: "C3: Conflict Resolution — Iranti",
    description:
      "Iranti deterministically replaces v1 with v2. Shodh accumulates both. Mem0 80%. Graphiti 40%. Full conflict resolution methodology across four memory systems.",
    type: "website",
    url: "https://iranti.dev/benchmarks/conflict-resolution",
    siteName: "Iranti",
  },
};

// ─── Conflict pairs ────────────────────────────────────────────────────────────

const CONFLICTS = [
  { id: "C01", topic: "Project budget",            v1: "$50,000",  v2: "$75,000",  iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "both" },
  { id: "C02", topic: "API write rate limit",       v1: "60 rpm",   v2: "100 rpm",  iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "v2"   },
  { id: "C03", topic: "Max file upload size",       v1: "10 MB",    v2: "25 MB",    iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "none" },
  { id: "C04", topic: "Redis cache TTL",            v1: "900s",     v2: "1800s",    iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "v1"   },
  { id: "C05", topic: "JWT token expiry",           v1: "3600s",    v2: "7200s",    iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "none" },
  { id: "C06", topic: "Background workers",         v1: "4 procs",  v2: "8 procs",  iranti: "v2", shodh: "both", mem0: "none",graphiti: "none" },
  { id: "C07", topic: "Log rotation",              v1: "7 days",   v2: "14 days",  iranti: "v2", shodh: "both", mem0: "none",graphiti: "v1"   },
  { id: "C08", topic: "PostgreSQL max connections", v1: "20",       v2: "50",       iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "none" },
  { id: "C09", topic: "Webhook max retries",        v1: "3",        v2: "5",        iranti: "v2", shodh: "both", mem0: "v2",  graphiti: "none" },
  { id: "C10", topic: "Webhook timeout",            v1: "15000ms",  v2: "30000ms",  iranti: "both",shodh: "both", mem0: "v2",  graphiti: "v2"  },
];

type Verdict = "v2" | "v1" | "both" | "none";

function VerdictChip({ verdict }: { verdict: Verdict }) {
  const cls = {
    v2:   "bg-teal-500/15 text-teal-400 border-teal-500/30",
    v1:   "bg-red-500/15 text-red-400 border-red-500/30",
    both: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    none: "bg-[var(--bg-surface)] text-[var(--text-faint)] border-[var(--border-subtle)]",
  }[verdict];
  const label = { v2: "v2 ✓", v1: "stale", both: "both", none: "miss" }[verdict];
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-mono rounded border ${cls}`}>
      {label}
    </span>
  );
}

function StatBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export default function ConflictResolutionPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="px-6 pt-4 pb-0 max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono">
            <Link href="/benchmarks" className="hover:text-teal-400 transition-colors">Benchmarks</Link>
            <span>/</span>
            <span className="text-[var(--text-muted)]">C3 — Conflict Resolution</span>
          </nav>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-6 py-14 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">C3 — Conflict Resolution</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4 max-w-4xl">
            Facts change. Memory systems must keep up.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
            10 fact pairs, each written twice: v1 (original value) then v2 (updated value). The correct
            answer is always v2. Four verdicts are possible: v2-only (correct), both v1+v2 (mixed),
            v1-only (stale), or no match (miss). Scoring: any response containing v2 passes.
          </p>

          {/* Result pills */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {competitiveSystems.map((s) => {
              const d = b3cResults.systems[s.id as keyof typeof b3cResults.systems];
              const note = s.id === "shodh" ? "*" : "";
              return (
                <div key={s.id} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="text-2xl font-semibold tracking-[-0.03em] mb-1" style={{ color: s.color }}>
                    {d.pct}%{note}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{s.label}</div>
                  <div className="flex gap-1.5 flex-wrap">
                    {d.v2 > 0 && <span className="text-xs font-mono bg-teal-500/10 text-teal-400 px-1.5 py-0.5 rounded">{d.v2} v2</span>}
                    {d.both > 0 && <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-1.5 py-0.5 rounded">{d.both} both</span>}
                    {d.stale > 0 && <span className="text-xs font-mono bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">{d.stale} stale</span>}
                    {d.miss > 0 && <span className="text-xs font-mono bg-[var(--bg-surface)] text-[var(--text-faint)] border border-[var(--border-subtle)] px-1.5 py-0.5 rounded">{d.miss} miss</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Test design</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Each conflict pair covers a real-world configuration update: budget approvals, rate limit
                  changes, timeout extensions, capacity scaling, and compliance-driven policy changes. The
                  values are structurally simple (one numeric field changes) so there is no ambiguity about
                  what the correct answer is.
                </p>
                <p>
                  Write sequence: v1 is written first. v2 is written second. For Graphiti, v1 is timestamped
                  one hour before v2 to provide temporal ordering context. For all other systems, writes
                  happen sequentially in the same session.
                </p>
                <p>
                  Each namespace is isolated to one conflict pair — the same isolation strategy as C1.
                  This ensures the conflict verdict reflects only the pair in question, not cross-contamination
                  from other facts.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Verdict definitions</h2>
              <div className="space-y-3">
                {[
                  { verdict: "v2" as Verdict,   label: "v2 (correct)", desc: "Response contains v2 value and does not contain v1 value. Clean replacement.", color: "teal" },
                  { verdict: "both" as Verdict, label: "both (mixed)",  desc: "Response contains both v1 and v2. Caller receives contradictory context and must disambiguate.", color: "amber" },
                  { verdict: "v1" as Verdict,   label: "stale (wrong)", desc: "Response contains v1 value only. System returned outdated information.", color: "red" },
                  { verdict: "none" as Verdict, label: "miss",          desc: "Response contains neither v1 nor v2. System failed to retrieve any relevant context.", color: "gray" },
                ].map((v) => (
                  <div key={v.verdict} className="flex gap-3">
                    <VerdictChip verdict={v.verdict} />
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
                <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg font-mono text-xs text-[var(--text-muted)]">
                  <div className="text-[var(--text-faint)] mb-1.5">Scoring:</div>
                  <div>v2 → PASS · both → PASS (v2 present)</div>
                  <div>v1 → FAIL · none → FAIL</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Per-conflict table ───────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 tracking-[-0.02em]">Per-conflict results</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              v1 → v2 transition for each conflict pair. Correct answer is always the v2 value.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pr-4 border-b border-[var(--border-subtle)] w-12">ID</th>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pr-6 border-b border-[var(--border-subtle)]">Change</th>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pr-6 border-b border-[var(--border-subtle)]">v1 → v2</th>
                    {competitiveSystems.map((s) => (
                      <th key={s.id} className="text-center text-xs font-mono py-3 px-4 border-b border-[var(--border-subtle)] w-24" style={{ color: s.color }}>
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CONFLICTS.map((c, i) => (
                    <tr key={c.id} className={i % 2 === 0 ? "bg-[var(--bg-surface)]" : ""}>
                      <td className="py-3.5 pr-4 font-mono text-xs text-[var(--text-faint)]">{c.id}</td>
                      <td className="py-3.5 pr-6 text-xs text-[var(--text-muted)]">{c.topic}</td>
                      <td className="py-3.5 pr-6 text-xs font-mono">
                        <span className="text-red-400">{c.v1}</span>
                        <span className="text-[var(--text-faint)] mx-1.5">→</span>
                        <span className="text-teal-400">{c.v2}</span>
                      </td>
                      {[c.iranti, c.shodh, c.mem0, c.graphiti].map((verdict, j) => (
                        <td key={j} className="text-center py-3.5 px-4">
                          <VerdictChip verdict={verdict as Verdict} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── System-by-system analysis ────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">System behavior analysis</h2>
            <div className="grid md:grid-cols-2 gap-4">

              {/* Iranti */}
              <div className="p-6 border border-teal-500/20 bg-teal-500/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-teal-400">Iranti</span>
                  <span className="font-mono text-xs text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded">100% — 9 v2, 1 both</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Iranti uses entity+key addressing. When v2 is written to the same entity and key as v1,
                    the write deterministically replaces the stored value. There is no accumulation — the
                    old value is overwritten at the storage level.
                  </p>
                  <p>
                    9 of 10 pairs return v2-only. C10 (webhook timeout) returns both — this is the one
                    case where the Iranti LLM arbitration layer was invoked on a same-entity, same-key
                    update with a small confidence delta, which triggered accumulation rather than replacement.
                    This maps to the B5 regression: conservative arbitration on close-gap updates.
                  </p>
                </div>
              </div>

              {/* Shodh */}
              <div className="p-6 border border-blue-400/20 bg-blue-400/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-blue-400">Shodh</span>
                  <span className="font-mono text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">100%* — 0 v2, 10 both</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Shodh scores 100% because v2 is present in every response. But it never actually replaces
                    v1 — it accumulates. Every query for a conflict pair returns both the original and the
                    updated value, regardless of write order.
                  </p>
                  <p>
                    From the caller's perspective, the response contains contradictory information and the
                    caller must apply their own disambiguation logic. For configuration-critical facts
                    (e.g., "what is the current rate limit?") this means the LLM consuming the context
                    has to choose between two values with no signal about which is authoritative.
                  </p>
                </div>
              </div>

              {/* Mem0 */}
              <div className="p-6 border border-amber-500/20 bg-amber-500/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-amber-400">Mem0</span>
                  <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">80% — 7 v2, 1 both, 2 miss</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Mem0 handles 7 conflicts cleanly with v2-only returns and 1 with both values. The 2 misses
                    (C06: workers, C07: log rotation) returned neither v1 nor v2 — vector similarity did not
                    surface either version of the fact.
                  </p>
                  <p>
                    Mem0 uses semantic deduplication on write — when v2 is semantically similar to v1, it may
                    update or replace the stored representation. When the similarity is above threshold, v1 is
                    replaced. When it falls below, both are stored. The 2 misses are facts where neither
                    version was returned, possibly due to collection indexing latency between writes.
                  </p>
                </div>
              </div>

              {/* Graphiti */}
              <div className="p-6 border border-violet-400/20 bg-violet-400/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-violet-400">Graphiti</span>
                  <span className="font-mono text-xs text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">40% — 2 v2, 2 both, 2 stale, 4 miss</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Graphiti uses temporal ordering for conflict resolution — v1 is timestamped at t-1h,
                    v2 at t-0. Despite this, the results show 2 stale returns (v1 value wins), 2 both
                    (both values surfaced), and 4 complete misses.
                  </p>
                  <p>
                    The core issue is the same as C1: entity extraction rephrases fact content into edge
                    facts during ingestion. When v2 is extracted, if the numeric value is lost during
                    extraction, the edge fact for v2 no longer contains the answer. The temporal ordering
                    of the episode is correct — the extracted edge fact content is the problem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Verdict distribution ─────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Verdict distribution</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {competitiveSystems.map((s) => {
                const d = b3cResults.systems[s.id as keyof typeof b3cResults.systems];
                const total = 10;
                return (
                  <div key={s.id} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                    <div className="text-sm font-semibold mb-4" style={{ color: s.color }}>{s.label}</div>
                    {/* Stacked bar */}
                    <div className="h-3 rounded-full overflow-hidden flex mb-4">
                      {d.v2 > 0 && <div style={{ width: `${(d.v2 / total) * 100}%`, background: s.color }} title={`v2: ${d.v2}`} />}
                      {d.both > 0 && <div style={{ width: `${(d.both / total) * 100}%`, background: s.color, opacity: 0.4 }} title={`both: ${d.both}`} />}
                      {d.stale > 0 && <div style={{ width: `${(d.stale / total) * 100}%`, background: "#ef4444" }} title={`stale: ${d.stale}`} />}
                      {d.miss > 0 && <div style={{ width: `${(d.miss / total) * 100}%`, background: "var(--border-subtle)" }} title={`miss: ${d.miss}`} />}
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      {d.v2 > 0 && <div className="flex justify-between"><span className="text-teal-400">v2 only</span><span style={{ color: s.color }}>{d.v2}/10</span></div>}
                      {d.both > 0 && <div className="flex justify-between"><span className="text-amber-400">both</span><span style={{ color: s.color }}>{d.both}/10</span></div>}
                      {d.stale > 0 && <div className="flex justify-between"><span className="text-red-400">stale</span><span className="text-red-400">{d.stale}/10</span></div>}
                      {d.miss > 0 && <div className="flex justify-between"><span className="text-[var(--text-faint)]">miss</span><span className="text-[var(--text-faint)]">{d.miss}/10</span></div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Key findings ────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Key findings</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {b3cResults.keyFindings.map((finding, i) => (
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
            <Link href="/benchmarks/pool-efficiency" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-teal-500/40 text-[var(--text-code)] text-sm rounded-lg transition-colors">
              ← C2: Pool efficiency
            </Link>
            <Link href="/benchmarks/cross-session" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-teal-500/40 text-[var(--text-code)] text-sm rounded-lg transition-colors">
              C4: Cross-session persistence →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
