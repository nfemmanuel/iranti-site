import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { b3cResults, competitiveSystems } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "C3: Conflict Resolution — Iranti vs Shodh, Mem0 & Graphiti",
  description:
    "Two systems scored 100% on conflict resolution. One of them is wrong. Shodh returns both the old and new value on every query — your agent can't tell which is current. Full benchmark methodology.",
  alternates: { canonical: "/benchmarks/conflict-resolution" },
  openGraph: {
    title: "C3: Conflict Resolution — Iranti vs Shodh, Mem0 & Graphiti",
    description:
      "Two systems scored 100%. One of them is wrong. When Shodh returns both rate limits, your agent has to guess which is authoritative. Iranti deterministically replaces v1 with v2.",
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
  { id: "C07", topic: "Log rotation",               v1: "7 days",   v2: "14 days",  iranti: "v2", shodh: "both", mem0: "none",graphiti: "v1"   },
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
            Two systems scored 100%.
            <br />
            <span className="text-[var(--text-muted)]">One of them is wrong.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
            Iranti and Shodh both pass this benchmark — because the scoring counts any response containing
            the updated value as correct. But Shodh returns the old value too. On every single query.
            Your agent receives contradictory context and has to guess which value is authoritative.
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

        {/* ── The silent failure ──────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">The silent failure</span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">
              What your agent actually receives from Shodh
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Scenario */}
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  You've just updated the API write rate limit from 60 to 100 requests per minute.
                  You write the updated fact to your memory system. Later, your agent needs to enforce
                  the limit and queries for the current value.
                </p>
                <p>
                  In Iranti, the write deterministically replaced the old value. The agent gets back
                  <strong className="text-teal-400"> 100 rpm</strong>. Done.
                </p>
                <p>
                  In Shodh, both facts are stored. The agent gets back both — and nothing in the response
                  signals which one is current. It may apply the wrong limit, log a misleading rate, or
                  produce non-deterministic behavior depending on which value the LLM picks from the context.
                </p>
                <p className="text-xs text-[var(--text-faint)] leading-relaxed">
                  This happened on all 10 conflict pairs in the test — not as an edge case, but as the
                  consistent behavior. Shodh accumulates; it does not replace.
                </p>
              </div>

              {/* Context injection comparison */}
              <div className="space-y-3">
                <div className="p-4 border border-teal-500/25 bg-teal-500/5 rounded-xl">
                  <div className="text-xs font-mono text-teal-500 mb-3 uppercase tracking-wider">Iranti — injected context</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] leading-relaxed space-y-1">
                    <div><span className="text-[var(--text-faint)]">entity:</span> <span className="text-teal-300">api/rate-limits</span></div>
                    <div><span className="text-[var(--text-faint)]">key:</span> <span className="text-teal-300">writeRpm</span></div>
                    <div><span className="text-[var(--text-faint)]">value:</span> <span className="text-teal-300 font-semibold">100</span></div>
                    <div><span className="text-[var(--text-faint)]">confidence:</span> <span className="text-teal-300">0.95</span></div>
                  </div>
                  <div className="mt-3 text-xs text-teal-400">→ Agent enforces 100 rpm. Correct.</div>
                </div>

                <div className="p-4 border border-amber-500/25 bg-amber-500/5 rounded-xl">
                  <div className="text-xs font-mono text-amber-500 mb-3 uppercase tracking-wider">Shodh — injected context</div>
                  <div className="font-mono text-xs text-[var(--text-muted)] leading-relaxed space-y-1">
                    <div className="text-[var(--text-faint)]">memory 1:</div>
                    <div className="pl-3">API write rate limit is <span className="text-amber-300 font-semibold">60</span> requests per minute per key.</div>
                    <div className="text-[var(--text-faint)] mt-1.5">memory 2:</div>
                    <div className="pl-3">API write rate limit increased to <span className="text-amber-300 font-semibold">100</span> requests per minute per key.</div>
                  </div>
                  <div className="mt-3 text-xs text-amber-400">→ Agent sees both. No signal about which is current.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Test design</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  10 fact pairs, each covering a real-world configuration update: budget approvals, rate limit
                  changes, timeout extensions, capacity scaling, compliance-driven policy changes. The values
                  are structurally simple — one numeric field changes — so there is no ambiguity about
                  what the correct answer is.
                </p>
                <p>
                  Write sequence: v1 is written first, v2 is written second, same namespace. For Graphiti,
                  v1 is timestamped one hour before v2 to give temporal ordering context. All namespaces
                  are isolated per conflict pair — same isolation as C1.
                </p>
                <p>
                  Scoring is lenient: any response containing v2 counts as a pass. This is why Shodh
                  scores 100% — the correct value is present. The "both" verdict is the footnote that
                  makes the score misleading.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Verdict definitions</h2>
              <div className="space-y-3">
                {[
                  { verdict: "v2" as Verdict,   desc: "Response contains the updated value only. Clean replacement — no ambiguity for the caller." },
                  { verdict: "both" as Verdict, desc: "Response contains both old and new values. Passes the benchmark. Fails in production — caller must guess which is authoritative." },
                  { verdict: "v1" as Verdict,   desc: "Response contains only the outdated value. Fails the benchmark and returns wrong information." },
                  { verdict: "none" as Verdict, desc: "Response contains neither value. System failed to retrieve any relevant context." },
                ].map((v) => (
                  <div key={v.verdict} className="flex gap-3">
                    <VerdictChip verdict={v.verdict} />
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Per-conflict table ───────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 tracking-[-0.02em]">Per-conflict results</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              v1 → v2 for each pair. Correct answer is always v2. Note Shodh's column: 10/10 "both" is not the same as 10/10 "v2 only."
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
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Why each system behaves this way</h2>
            <div className="grid md:grid-cols-2 gap-4">

              {/* Iranti */}
              <div className="p-6 border border-teal-500/20 bg-teal-500/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-teal-400">Iranti</span>
                  <span className="font-mono text-xs text-teal-500 bg-teal-500/10 px-2 py-0.5 rounded">9 v2-only · 1 both</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Iranti uses entity+key addressing. Writing v2 to the same entity and key as v1
                    deterministically overwrites the stored value at the storage level — there is no
                    accumulation by design. 9 of 10 pairs return v2-only.
                  </p>
                  <p>
                    The one "both" (C10: webhook timeout) is the known B5 regression: conservative LLM
                    arbitration on a close-confidence update treated v2 as a challenger rather than a
                    replacement, accumulating instead of overwriting. Direct writes (same entity+key,
                    same source) are unaffected — this is an LLM arbitration edge case only.
                  </p>
                </div>
              </div>

              {/* Shodh */}
              <div className="p-6 border border-blue-400/20 bg-blue-400/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-blue-400">Shodh</span>
                  <span className="font-mono text-xs text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded">10 both · 0 v2-only</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Shodh is an accumulative memory system. It does not replace facts — it appends them.
                    A second write of the same information creates a second memory record alongside the first.
                    Recall returns all matching records, regardless of recency.
                  </p>
                  <p>
                    This behavior is consistent and predictable — it is not a bug. But it means the caller
                    is responsible for disambiguation. In an LLM-driven pipeline with no post-processing,
                    the agent receives contradictory values and must choose, with no signal about which
                    was written more recently or which is authoritative.
                  </p>
                </div>
              </div>

              {/* Mem0 */}
              <div className="p-6 border border-amber-500/20 bg-amber-500/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-amber-400">Mem0</span>
                  <span className="font-mono text-xs text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">7 v2-only · 1 both · 2 miss</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Mem0 uses semantic deduplication on write. When v2 is semantically similar enough to v1,
                    Mem0 updates the existing record rather than creating a new one — producing clean v2-only
                    returns. This works correctly on 7 of 10 pairs.
                  </p>
                  <p>
                    The 2 misses (workers, log rotation) returned neither value — the semantic similarity
                    between v1 and v2 was too low to trigger deduplication, but recall also failed to surface
                    either record for those queries. These are retrieval gaps, not conflict handling failures.
                  </p>
                </div>
              </div>

              {/* Graphiti */}
              <div className="p-6 border border-violet-400/20 bg-violet-400/5 rounded-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-violet-400">Graphiti</span>
                  <span className="font-mono text-xs text-violet-400 bg-violet-400/10 px-2 py-0.5 rounded">2 v2 · 2 both · 2 stale · 4 miss</span>
                </div>
                <div className="space-y-2 text-xs text-[var(--text-muted)] leading-relaxed">
                  <p>
                    Graphiti was given the best possible setup: v1 timestamped at t−1h, v2 at t−0, so
                    temporal ordering was explicit. Despite this, 2 pairs returned the stale value and
                    4 returned nothing.
                  </p>
                  <p>
                    The root cause is entity extraction: when Graphiti's LLM extracts edge facts from v2,
                    numeric values are often rephrased or dropped. If the v2 edge fact no longer contains
                    the updated number, the temporal ordering is irrelevant — the answer was lost at ingestion.
                    See <Link href="/benchmarks/competitive-recall" className="text-violet-400 hover:text-violet-300 underline underline-offset-2">C1</Link> for the full extraction analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Verdict distribution ─────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 tracking-[-0.02em]">Verdict distribution</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Shodh's bar is entirely amber — 100% "both". That is a different result from Iranti's 90% teal.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {competitiveSystems.map((s) => {
                const d = b3cResults.systems[s.id as keyof typeof b3cResults.systems];
                const total = 10;
                return (
                  <div key={s.id} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                    <div className="text-sm font-semibold mb-4" style={{ color: s.color }}>{s.label}</div>
                    <div className="h-3 rounded-full overflow-hidden flex mb-4">
                      {d.v2 > 0 && <div style={{ width: `${(d.v2 / total) * 100}%`, background: s.color }} title={`v2: ${d.v2}`} />}
                      {d.both > 0 && <div style={{ width: `${(d.both / total) * 100}%`, background: s.color, opacity: 0.4 }} title={`both: ${d.both}`} />}
                      {d.stale > 0 && <div style={{ width: `${(d.stale / total) * 100}%`, background: "#ef4444" }} title={`stale: ${d.stale}`} />}
                      {d.miss > 0 && <div style={{ width: `${(d.miss / total) * 100}%`, background: "var(--border-subtle)" }} title={`miss: ${d.miss}`} />}
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      {d.v2 > 0 && <div className="flex justify-between"><span className="text-teal-400">v2 only</span><span style={{ color: s.color }}>{d.v2}/10</span></div>}
                      {d.both > 0 && <div className="flex justify-between"><span className="text-amber-400">both values</span><span style={{ color: s.color }}>{d.both}/10</span></div>}
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
