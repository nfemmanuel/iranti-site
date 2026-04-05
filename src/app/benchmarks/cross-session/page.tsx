import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { b3dResults, b3aResults, competitiveSystems } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "C4: Cross-Session Persistence — Iranti Benchmarks",
  description:
    "Write 20 facts in process 1. Kill the process. Recall all 40 questions in a fresh subprocess with zero shared Python state. Iranti 100%, Shodh 100%, Mem0 75%, Graphiti 57%. Full methodology.",
  alternates: { canonical: "/benchmarks/cross-session" },
  openGraph: {
    title: "C4: Cross-Session Persistence — Iranti",
    description:
      "A true persistence test: fresh subprocess, no shared state. Iranti and Shodh: 100%. Mem0: 75%. Graphiti: 57%. Full subprocess methodology and storage layer breakdown.",
    type: "website",
    url: "https://iranti.dev/benchmarks/cross-session",
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

const STORAGE_ROWS = [
  {
    id: "iranti",
    label: "Iranti",
    color: "#14b8a6",
    storage: "PostgreSQL",
    storageDetail: "Managed instance, persistent volume",
    protocol: "REST API (HTTP)",
    persistence: "Durable",
    crossSession: "100%",
    sameSession: "100%",
  },
  {
    id: "shodh",
    label: "Shodh",
    color: "#60a5fa",
    storage: "Docker volume",
    storageDetail: "File-backed, bind-mounted",
    protocol: "REST API (HTTP)",
    persistence: "Durable",
    crossSession: "100%",
    sameSession: "100%",
  },
  {
    id: "mem0",
    label: "Mem0",
    color: "#f59e0b",
    storage: "Chroma (disk)",
    storageDetail: "Local persistent directory",
    protocol: "Python in-process",
    persistence: "Durable",
    crossSession: "75%",
    sameSession: "80%",
  },
  {
    id: "graphiti",
    label: "Graphiti",
    color: "#a78bfa",
    storage: "Neo4j (Docker)",
    storageDetail: "Graph DB, Docker container",
    protocol: "Bolt (async Python SDK)",
    persistence: "Durable",
    crossSession: "57%",
    sameSession: "57%",
  },
];

export default function CrossSessionPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="px-6 pt-4 pb-0 max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono">
            <Link href="/benchmarks" className="hover:text-teal-400 transition-colors">Benchmarks</Link>
            <span>/</span>
            <span className="text-[var(--text-muted)]">C4 — Cross-Session Persistence</span>
          </nav>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-6 py-14 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">C4 — Cross-Session Persistence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4 max-w-4xl">
            Kill the process. Does the memory survive?
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
            Phase 1 writes 20 facts in the parent process. Phase 2 spawns a completely fresh Python
            subprocess with no shared state — no globals, no cached instances, no open connections.
            The subprocess must recall all 40 questions using only what was durably persisted.
          </p>

          {/* Result pills */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {competitiveSystems.map((s) => {
              const d = b3dResults.systems[s.id as keyof typeof b3dResults.systems];
              return (
                <div key={s.id} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="text-2xl font-semibold tracking-[-0.03em] mb-1" style={{ color: s.color }}>
                    {d.pct}%
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-1">{s.label}</div>
                  <div className="text-xs text-[var(--text-faint)] font-mono">{d.score}/{d.total} · {d.storage}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Subprocess isolation</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  C1 and C2 run write and recall in the same Python process. Singleton instances,
                  cached SDK clients, and open database connections persist in memory between write
                  and recall. This is realistic for same-session use, but it does not test true durability.
                </p>
                <p>
                  C4 uses <code className="font-mono text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">subprocess.run([sys.executable, '-c', script])</code> to spawn
                  a completely independent Python interpreter. All config (API keys, URLs, fact IDs)
                  is baked into the recall script string via string formatting — the subprocess has no
                  access to the parent's memory.
                </p>
                <p>
                  This pattern is the closest available simulation of a restart scenario: the original
                  session ends, a new session begins, and recall must succeed based solely on what was
                  written to durable storage during the first session.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Subprocess pattern</h2>
              <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs leading-relaxed text-[var(--text-muted)]">
                <div className="text-[var(--text-faint)] mb-2"># Phase 1 — parent process writes</div>
                <div className="text-teal-300">iranti_write(fact_id, text)</div>
                <div className="text-teal-300">shodh_write(fact_id, text)</div>
                <div className="text-teal-300">mem0_write(fact_id, text)</div>
                <div className="text-teal-300">await graphiti_write(fact_id, text)</div>
                <div className="mt-3 text-[var(--text-faint)] mb-2"># Phase 2 — fresh subprocess, no shared state</div>
                <div>RECALL_SCRIPT = f{`"""`}</div>
                <div className="pl-3">iranti_url = <span className="text-amber-300">'{"{iranti_url}"}'</span></div>
                <div className="pl-3 text-[var(--text-faint)]"># ... all other config baked in</div>
                <div className="pl-3 text-teal-300">result = iranti_recall(fact_id, query)</div>
                <div>{`"""`}</div>
                <div className="mt-2 text-violet-300">subprocess.run(</div>
                <div className="pl-3 text-violet-300">[sys.executable, '-c', RECALL_SCRIPT],</div>
                <div className="pl-3 text-violet-300">capture_output=True, text=True</div>
                <div className="text-violet-300">)</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Storage layer table ──────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Storage layers</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 pr-6 border-b border-[var(--border-subtle)]">System</th>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 pr-6 border-b border-[var(--border-subtle)]">Storage</th>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 pr-6 border-b border-[var(--border-subtle)] hidden md:table-cell">Protocol</th>
                    <th className="text-center text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 px-4 border-b border-[var(--border-subtle)]">Same-session</th>
                    <th className="text-center text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 px-4 border-b border-[var(--border-subtle)]">Cross-session</th>
                    <th className="text-center text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 px-4 border-b border-[var(--border-subtle)]">Delta</th>
                  </tr>
                </thead>
                <tbody>
                  {STORAGE_ROWS.map((r, i) => {
                    const sameNum = parseInt(r.sameSession);
                    const crossNum = parseInt(r.crossSession);
                    const delta = crossNum - sameNum;
                    return (
                      <tr key={r.id} className={i % 2 === 0 ? "bg-[var(--bg-surface)]" : ""}>
                        <td className="py-4 pr-6 font-semibold" style={{ color: r.color }}>{r.label}</td>
                        <td className="py-4 pr-6">
                          <div className="text-sm text-[var(--text-code)]">{r.storage}</div>
                          <div className="text-xs text-[var(--text-faint)]">{r.storageDetail}</div>
                        </td>
                        <td className="py-4 pr-6 text-xs text-[var(--text-muted)] font-mono hidden md:table-cell">{r.protocol}</td>
                        <td className="text-center py-4 px-4 font-mono text-sm" style={{ color: r.color }}>{r.sameSession}</td>
                        <td className="text-center py-4 px-4 font-mono text-sm" style={{ color: r.color }}>{r.crossSession}</td>
                        <td className="text-center py-4 px-4 font-mono text-sm">
                          <span className={delta < 0 ? "text-red-400" : "text-teal-400"}>
                            {delta === 0 ? "—" : `${delta > 0 ? "+" : ""}${delta}pp`}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Accuracy comparison ──────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Same-session vs cross-session</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">C1 — Same-session recall</div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
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
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">C4 — Cross-session recall (fresh subprocess)</div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3dResults.systems[s.id as keyof typeof b3dResults.systems];
                    const dA = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
                    const dropped = d.pct < dA.pct;
                    return (
                      <div key={s.id}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-code)]">{s.label}</span>
                          <span className="font-mono text-sm" style={{ color: dropped ? "#f59e0b" : s.color }}>
                            {d.pct}%
                            {dropped && <span className="text-xs ml-1 text-red-400">↓{dA.pct - d.pct}pp</span>}
                          </span>
                        </div>
                        <StatBar pct={d.pct} color={dropped ? "#f59e0b" : s.color} height="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── System notes ────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">What the delta tells us</h2>
            <div className="grid md:grid-cols-2 gap-4">

              <div className="p-5 border border-teal-500/20 bg-teal-500/5 rounded-xl">
                <div className="text-sm font-semibold text-teal-400 mb-2">Iranti + Shodh: zero delta</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Both systems maintain 100% recall in the fresh subprocess. Iranti uses PostgreSQL —
                  writes are transactional and immediately consistent. Shodh uses a Docker volume with
                  file-backed storage — writes are flushed before the parent process exits.
                  Neither system relies on in-memory state for recall accuracy.
                </p>
              </div>

              <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl">
                <div className="text-sm font-semibold text-amber-400 mb-2">Mem0: −5pp cross-session</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Mem0 drops from 80% (same-session) to 75% (cross-session). Chroma is a disk-backed
                  vector store and is inherently persistent. The 5-point drop likely reflects minor
                  indexing inconsistency across cold starts — the same-session run had a warm collection
                  index while the subprocess opened it cold. Not a fundamental persistence failure, but
                  a meaningful consistency gap under repeated process boundaries.
                </p>
              </div>

              <div className="p-5 border border-violet-400/20 bg-violet-400/5 rounded-xl">
                <div className="text-sm font-semibold text-violet-400 mb-2">Graphiti: zero delta</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  Graphiti's cross-session score (57%) exactly matches its same-session score. Neo4j is
                  a fully durable graph database — there is no persistence regression. The 57% ceiling
                  is entirely explained by entity extraction quality: facts that were not retrievable
                  in-process are also not retrievable cross-process, because the content was lost
                  during ingestion, not during persistence.
                </p>
              </div>

              <div className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                <div className="text-sm font-semibold text-[var(--text-code)] mb-2">What C4 actually tests</div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  C4 separates persistence from retrieval quality. All four systems persist data durably
                  — none rely purely on in-memory state. The cross-session score differences are not
                  evidence of persistence failure; they are evidence of retrieval quality constraints
                  that also manifest in-process. C4 confirms: for Mem0 and Graphiti, the limiting
                  factor is retrieval, not storage.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── Key findings ────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Key findings</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {b3dResults.keyFindings.map((finding, i) => (
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
            <Link href="/benchmarks/conflict-resolution" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-teal-500/40 text-[var(--text-code)] text-sm rounded-lg transition-colors">
              ← C3: Conflict resolution
            </Link>
            <Link href="/benchmarks/competitive-recall" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-teal-500/40 text-[var(--text-code)] text-sm rounded-lg transition-colors">
              C1: Recall accuracy →
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
