import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";
import {
  allBenchmarks,
  b3aResults, b3bResults, b3cResults, b3dResults,
  competitiveOverview, competitiveSystems, weaknessFindings,
} from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Benchmarks — Iranti",
  description:
    "Iranti's full benchmark suite: competitive recall accuracy vs Shodh, Mem0, and Graphiti; pool efficiency; conflict resolution; cross-session persistence. Every claim has a script behind it.",
  alternates: { canonical: "/benchmarks" },
  openGraph: {
    title: "Benchmarks — Iranti",
    description:
      "Competitive recall, pool efficiency, conflict resolution, cross-session persistence. Every number has a methodology behind it — including where we fall short.",
    type: "website",
    url: "https://iranti.dev/benchmarks",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benchmarks — Iranti",
    description:
      "Iranti vs Shodh, Mem0, and Graphiti across recall, efficiency, conflict resolution, and persistence. Full methodology and weakness disclosure.",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function statusChipClass(status: "pass" | "partial" | "null") {
  if (status === "pass")    return "bg-teal-500/10 text-teal-400";
  if (status === "partial") return "bg-amber-500/10 text-amber-500";
  return "bg-[var(--border-subtle)] text-[var(--text-faint)]";
}

function subjectColor(color: string) {
  if (color === "teal")   return "border-teal-500/30 bg-teal-500/5 text-teal-400";
  if (color === "blue")   return "border-blue-400/30 bg-blue-400/5 text-blue-300";
  if (color === "amber")  return "border-amber-500/30 bg-amber-500/5 text-amber-400";
  if (color === "violet") return "border-violet-400/30 bg-violet-400/5 text-violet-300";
  return "";
}

// Static bar — server-safe, pure CSS
function StatBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
      <div className="h-full rounded-full transition-none" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Iranti Benchmark Suite v0.3.10",
  description:
    "Competitive memory benchmark suite: recall accuracy, pool efficiency, conflict resolution, and cross-session persistence across Iranti, Shodh, Mem0, and Graphiti.",
  url: "https://iranti.dev/benchmarks",
  creator: { "@type": "Organization", name: "Iranti", url: "https://iranti.dev" },
  datePublished: "2026-04-05",
  measurementTechnique: "Automated script-based evaluation with deterministic substring scoring",
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BenchmarksPage() {
  const sysColors: Record<string, string> = {
    iranti: "#14b8a6", shodh: "#60a5fa", mem0: "#f59e0b", graphiti: "#a78bfa",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Script id="benchmarks-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <main className="pt-24 pb-16">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Benchmarks</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-5 max-w-4xl">
            Every claim has a script behind it.
            <br />
            <span className="text-[var(--text-muted)]">Including where we fall short.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
            Iranti runs a public benchmark suite across recall accuracy, injection efficiency, conflict resolution,
            and cross-session persistence — against Shodh, Mem0, and Graphiti on the same corpus.
            Results include honest weakness disclosure.
          </p>

          {/* Hero stats — each links to its section anchor */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { stat: "100%", label: "Recall accuracy", sub: "C1 — 40/40 questions", anchor: "#competitive-recall", color: "teal" },
              { stat: "5.0",  label: "Efficiency score", sub: "C2 — best in suite",   anchor: "#pool-efficiency",    color: "teal" },
              { stat: "10/10",label: "Conflicts resolved", sub: "C3 — deterministic", anchor: "#conflict-resolution", color: "teal" },
              { stat: "100%", label: "Cross-session",    sub: "C4 — fresh subprocess", anchor: "#cross-session",      color: "teal" },
            ].map((h) => (
              <Link
                key={h.anchor}
                href={h.anchor}
                className="group p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] hover:border-teal-500/30 transition-colors"
              >
                <div className="text-3xl font-semibold tracking-[-0.03em] text-teal-400 mb-1 group-hover:text-teal-300 transition-colors">
                  {h.stat}
                </div>
                <div className="text-sm font-semibold text-[var(--text-code)] mb-1">{h.label}</div>
                <div className="text-xs text-[var(--text-faint)] font-mono">{h.sub}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Competitive overview table ────────────────────────────────────── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Competitive Suite — vs. the field</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
              Four systems. Four dimensions. Same corpus.
            </h2>
            <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl">
              20 config-heavy facts, 40 recall questions. Identical input written to every system.
              Scored deterministically — no LLM judge.
            </p>

            {/* Overview table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 pr-6 border-b border-[var(--border-subtle)]">
                      Benchmark
                    </th>
                    {competitiveSystems.map((s) => (
                      <th key={s.id} className="text-center text-xs font-mono uppercase tracking-wider py-3 px-4 border-b border-[var(--border-subtle)]" style={{ color: s.color }}>
                        {s.label}
                      </th>
                    ))}
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pl-4 border-b border-[var(--border-subtle)] hidden md:table-cell">metric</th>
                  </tr>
                </thead>
                <tbody>
                  {competitiveOverview.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? "bg-[var(--bg-surface)]" : ""}>
                      <td className="py-3.5 pr-6 text-[var(--text-code)] font-medium">
                        <Link href={row.href} className="hover:text-teal-400 transition-colors">
                          <span className="font-mono text-xs text-[var(--text-faint)] mr-2">{row.id}</span>
                          {row.benchmark}
                        </Link>
                      </td>
                      {competitiveSystems.map((s) => {
                        const score = row.scores[s.id as keyof typeof row.scores];
                        const isIranti = s.id === "iranti";
                        return (
                          <td key={s.id} className={`text-center py-3.5 px-4 font-mono text-sm ${isIranti ? "font-semibold" : "text-[var(--text-muted)]"}`} style={isIranti ? { color: s.color } : {}}>
                            {score}
                          </td>
                        );
                      })}
                      <td className="py-3.5 pl-4 text-xs text-[var(--text-faint)] font-mono hidden md:table-cell">{row.metric}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 p-4 border border-amber-500/30 bg-amber-500/5 rounded-xl flex gap-3">
                <span className="font-mono text-xs text-amber-400 shrink-0 mt-0.5">*</span>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  <strong className="text-amber-400">Shodh scores 100% on conflict resolution</strong> — but never replaces old values. Every query returns both v1 and v2, leaving the caller to disambiguate. This is accumulation, not resolution.{" "}
                  <Link href="/benchmarks/conflict-resolution" className="text-teal-500 hover:text-teal-400">See C3 for full breakdown →</Link>
                </p>
              </div>
              <p className="text-xs text-[var(--text-faint)] font-mono mt-3">Cognee excluded — Python 3.14 incompatible (requires &lt;3.14). Will be re-evaluated when a compatible release is available.</p>
            </div>

            {/* 4 benchmark mini-cards */}
            <div className="grid md:grid-cols-2 gap-4" id="competitive-recall">

              {/* C1 */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]" id="competitive-recall">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--text-faint)]">C1</span>
                    <h3 className="text-base font-semibold text-[var(--text-code)] mt-0.5">Recall accuracy</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Isolated namespace — 1 fact per query scope</p>
                  </div>
                  <Link href={b3aResults.href} className="text-xs text-teal-500 hover:text-teal-400 font-mono whitespace-nowrap ml-4">Full methodology →</Link>
                </div>
                <div className="space-y-2.5">
                  {competitiveSystems.map((s) => {
                    const d = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
                    return (
                      <div key={s.id} className="flex items-center gap-3">
                        <span className="w-16 text-right text-xs text-[var(--text-faint)] font-mono">{s.label}</span>
                        <StatBar pct={d.pct} color={s.color} />
                        <span className="w-10 text-xs font-mono" style={{ color: s.color }}>{d.pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* C2 */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]" id="pool-efficiency">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--text-faint)]">C2</span>
                    <h3 className="text-base font-semibold text-[var(--text-code)] mt-0.5">Pool efficiency</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">All 20 facts in one namespace — find the needle</p>
                  </div>
                  <Link href={b3bResults.href} className="text-xs text-teal-500 hover:text-teal-400 font-mono whitespace-nowrap ml-4">Full methodology →</Link>
                </div>
                <div className="space-y-2.5">
                  {competitiveSystems.map((s) => {
                    const d = b3bResults.systems[s.id as keyof typeof b3bResults.systems];
                    const maxEff = 5.0;
                    return (
                      <div key={s.id} className="flex items-center gap-3">
                        <span className="w-16 text-right text-xs text-[var(--text-faint)] font-mono">{s.label}</span>
                        <StatBar pct={(d.efficiency / maxEff) * 100} color={s.color} />
                        <span className="w-10 text-xs font-mono" style={{ color: s.color }}>{d.efficiency}</span>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[var(--text-faint)] mt-3 font-mono">efficiency = accuracy% / avg_tok_per_query</p>
              </div>

              {/* C3 */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]" id="conflict-resolution">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--text-faint)]">C3</span>
                    <h3 className="text-base font-semibold text-[var(--text-code)] mt-0.5">Conflict resolution</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Write v1 then v2 — correct answer is v2 (latest)</p>
                  </div>
                  <Link href={b3cResults.href} className="text-xs text-teal-500 hover:text-teal-400 font-mono whitespace-nowrap ml-4">Full methodology →</Link>
                </div>
                <div className="space-y-2.5">
                  {competitiveSystems.map((s) => {
                    const d = b3cResults.systems[s.id as keyof typeof b3cResults.systems];
                    const bothNote = s.id === "shodh" ? " (returns both)" : "";
                    return (
                      <div key={s.id} className="flex items-center gap-3">
                        <span className="w-16 text-right text-xs text-[var(--text-faint)] font-mono">{s.label}</span>
                        <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--border-subtle)" }}>
                          {/* stacked: v2 solid + both lighter */}
                          <div className="h-full flex">
                            <div style={{ width: `${(d.v2 / 10) * 100}%`, background: s.color }} />
                            <div style={{ width: `${(d.both / 10) * 100}%`, background: s.color, opacity: 0.35 }} />
                          </div>
                        </div>
                        <span className="w-10 text-xs font-mono" style={{ color: s.color }}>{d.pct}%{bothNote}</span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex gap-3 mt-3 text-xs text-[var(--text-faint)] font-mono">
                  <span className="flex items-center gap-1"><span className="w-2 h-1.5 rounded-sm inline-block bg-teal-500" />v2 only</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-1.5 rounded-sm inline-block bg-teal-500 opacity-35" />both values</span>
                </div>
              </div>

              {/* C4 */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]" id="cross-session">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-mono text-xs text-[var(--text-faint)]">C4</span>
                    <h3 className="text-base font-semibold text-[var(--text-code)] mt-0.5">Cross-session persistence</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-1">Write → kill process → recall in fresh subprocess</p>
                  </div>
                  <Link href={b3dResults.href} className="text-xs text-teal-500 hover:text-teal-400 font-mono whitespace-nowrap ml-4">Full methodology →</Link>
                </div>
                <div className="space-y-2.5">
                  {competitiveSystems.map((s) => {
                    const d = b3dResults.systems[s.id as keyof typeof b3dResults.systems];
                    return (
                      <div key={s.id} className="flex items-center gap-3">
                        <span className="w-16 text-right text-xs text-[var(--text-faint)] font-mono">{s.label}</span>
                        <StatBar pct={d.pct} color={s.color} />
                        <span className="w-10 text-xs font-mono" style={{ color: s.color }}>{d.pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Internal benchmarks B1–B13 ───────────────────────────────────── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]" id="internal">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-px bg-teal-500" />
                  <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Internal benchmarks — B1 through B13</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  Core capability coverage.
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1 max-w-xl">
                  13 benchmarks covering retrieval, persistence, conflict, discovery, relationships, recovery, and continuity.
                  Each page has full methodology and raw trial data.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono flex-shrink-0">
                <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-teal-500" />PASS</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-amber-500" />PARTIAL</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allBenchmarks.map((b) => (
                <Link
                  key={b.id}
                  href={b.href}
                  className="group p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] hover:border-[var(--border-light)] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[var(--text-faint)]">{b.id}</span>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${statusChipClass(b.status)}`}>
                      {b.statusLabel}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{b.label}</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{b.detail}</p>
                  <div className="mt-3 text-xs font-mono text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">Read →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── Weaknesses ───────────────────────────────────────────────────── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]" id="weaknesses">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Where things fall short</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
              Honest disclosure.
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl mb-8">
              Every system in this suite has real weaknesses. We include Iranti's own as prominently as the competitors'.
              The benchmark data for each finding is linked.
            </p>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {weaknessFindings.map((w, i) => (
                <div
                  key={i}
                  className={`p-5 border rounded-xl text-sm ${subjectColor(w.subjectColor)}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${subjectColor(w.subjectColor)}`}>
                      {w.subject}
                    </span>
                    <Link href={w.evidenceHref} className="text-xs font-mono opacity-60 hover:opacity-100 transition-opacity">
                      {w.evidence} →
                    </Link>
                  </div>
                  <div className="font-semibold text-[var(--text-code)] mb-2 leading-snug">{w.finding}</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{w.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
                Want the product story behind the benchmarks?
              </h2>
              <p className="text-[var(--text-muted)] text-sm max-w-xl">
                The product page translates these results into the buyer-facing case: structured injection, exact retrieval,
                deterministic conflict resolution, and operator-visible behavior.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/product"
                className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
              >
                Product story
              </Link>
              <a
                href="mailto:powerhousexiv@gmail.com"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
              >
                Request access
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
