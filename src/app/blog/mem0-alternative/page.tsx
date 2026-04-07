import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Iranti vs Mem0: What the Benchmarks Actually Show",
  description:
    "A direct comparison of Iranti and Mem0 across four benchmarks: recall accuracy, pool efficiency, conflict resolution, and cross-session persistence. Where each wins and where the tradeoffs are.",
  alternates: { canonical: "/blog/mem0-alternative" },
  openGraph: {
    title: "Iranti vs Mem0: What the Benchmarks Actually Show",
    description:
      "Four benchmarks, two memory systems. Recall accuracy, pool efficiency, conflict resolution, cross-session persistence. Where Iranti and Mem0 differ — and why it matters.",
    type: "article",
    url: "https://iranti.dev/blog/mem0-alternative",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iranti vs Mem0: What the Benchmarks Actually Show",
    description:
      "Four benchmarks, two memory systems. Where Iranti and Mem0 differ and why it matters for production agent workflows.",
  },
};

type Row = { dimension: string; iranti: string; mem0: string; note: string; winner: "iranti" | "mem0" | "both" };

const rows: Row[] = [
  {
    dimension: "Recall accuracy (C1)",
    iranti: "100% (40/40)",
    mem0: "80% (32/40)",
    note: "Mem0 misses 8 questions across HIGH and LOW risk tiers. Iranti uses exact entity+key lookup — misses are structurally impossible if the fact was written.",
    winner: "iranti",
  },
  {
    dimension: "Pool efficiency (C2)",
    iranti: "5.0 (100% / 20 tok)",
    mem0: "4.44 (80% / 18 tok)",
    note: "Mem0 is lean on tokens (18/query). Iranti is slightly heavier (20/query) but 100% accurate. Efficiency score favors Iranti, but Mem0 is the closest competitor.",
    winner: "iranti",
  },
  {
    dimension: "Conflict resolution (C3)",
    iranti: "100% — 9 v2-only, 1 both",
    mem0: "80% — 7 v2-only, 1 both, 2 miss",
    note: "Iranti's entity+key model deterministically replaces old values. Mem0 uses semantic deduplication — works on 7/10 pairs, misses 2 where semantic similarity is too low to trigger an update.",
    winner: "iranti",
  },
  {
    dimension: "Cross-session persistence (C4)",
    iranti: "100% (40/40)",
    mem0: "75% (30/40)",
    note: "Mem0 drops 5 points from its same-session score — Chroma read variance under parallel queries. Iranti (PostgreSQL) is fully consistent across process restarts.",
    winner: "iranti",
  },
];

export default function Mem0AlternativePost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link href="/blog" className="text-xs font-mono text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors">
                ← blog
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <time className="text-xs font-mono text-[var(--text-faint)]">2026-04-07</time>
              {["comparison", "benchmarks", "Mem0"].map(tag => (
                <span key={tag} className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              Iranti vs Mem0: what the benchmarks actually show
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              We ran both systems through four benchmarks: recall accuracy, pool efficiency,
              conflict resolution, and cross-session persistence. This is what we found — with
              the methodology, the numbers, and the honest tradeoffs.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What we tested and why</h2>
              <p className="mb-4">
                Mem0 is one of the most widely used memory libraries for AI agents. It&apos;s designed
                around semantic memory — facts are stored as embeddings, deduplicated by
                semantic similarity on write, and retrieved via vector search. It works well
                for conversational memory and is easy to integrate.
              </p>
              <p className="mb-4">
                Iranti takes a different approach: structured, addressed memory. Facts are stored
                at explicit <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">entity/key</code> addresses,
                retrieved by exact lookup or hybrid search, and written with confidence scores
                and provenance. The design trades some flexibility for determinism and inspectability.
              </p>
              <p>
                The question isn&apos;t which is better in the abstract — it&apos;s which performs better
                on specific dimensions that matter for production agent workflows. We tested four.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            {/* Benchmark table */}
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Results across four benchmarks</h2>
              <div className="space-y-4">
                {rows.map((row) => (
                  <div key={row.dimension} className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
                    <div className="px-5 py-3 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)] flex items-center justify-between gap-4">
                      <span className="text-sm font-semibold text-[var(--text-primary)]">{row.dimension}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-subtle)]">
                      <div className="px-5 py-4">
                        <div className="text-xs font-mono text-teal-500 mb-1">Iranti</div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{row.iranti}</div>
                      </div>
                      <div className="px-5 py-4">
                        <div className="text-xs font-mono text-amber-500 mb-1">Mem0</div>
                        <div className="text-sm font-semibold text-[var(--text-primary)]">{row.mem0}</div>
                      </div>
                    </div>
                    <div className="px-5 py-3 border-t border-[var(--border-subtle)]">
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">{row.note}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[var(--text-faint)] mt-4">
                All benchmarks run 2026-04-05. Mem0 v1.0.x. Full methodology:{" "}
                <Link href="/benchmarks" className="text-teal-500 hover:text-teal-400 transition-colors">benchmarks →</Link>
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Where the architectural difference matters most</h2>
              <p className="mb-4">
                The gap between Iranti and Mem0 is largest on conflict resolution and cross-session
                persistence. Both trace back to the same root cause: Mem0&apos;s semantic deduplication
                is probabilistic, while Iranti&apos;s entity+key addressing is deterministic.
              </p>
              <p className="mb-4">
                When you write a new value to the same entity and key in Iranti, the old value
                is always replaced. There&apos;s no similarity threshold to cross, no case where an
                update fails because the semantic distance was too small. For configuration-heavy
                workflows — where the correct value of a fact matters and stale values cause
                real problems — this is a meaningful difference.
              </p>
              <p className="mb-4">
                The cross-session gap (100% vs 75%) reflects a different issue: Mem0&apos;s Chroma
                backend shows read variance under parallel queries across process restarts.
                In a single-threaded, single-session workflow, Mem0 performs consistently.
                In multi-agent or multi-session setups with concurrent reads, the gap widens.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Where Mem0 has real advantages</h2>
              <p className="mb-4">
                Mem0 is significantly easier to get started with. It doesn&apos;t require PostgreSQL
                — the default backend is Chroma, which is zero-infrastructure to run. For teams
                that don&apos;t want to manage a database, that&apos;s a real advantage.
              </p>
              <p className="mb-4">
                Mem0 also handles unstructured conversational memory more naturally. You can
                write arbitrary text and let Mem0&apos;s semantic layer handle deduplication and
                retrieval. Iranti requires explicit entity+key structure — that produces better
                benchmark results but demands more intentional write discipline from the agent.
              </p>
              <p>
                For pure semantic recall use cases (e.g. &quot;what did the user say about X last week?&quot;),
                Mem0&apos;s approach is a reasonable fit. Iranti is stronger when the use case
                requires deterministic retrieval, conflict handling, or cross-session durability.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">MCP and integration surface</h2>
              <p className="mb-4">
                Iranti ships as an MCP server — connectable to Claude Code, GitHub Copilot,
                Codex, or any MCP-compliant client with one setup command. Memory written by one
                tool is immediately available in any other tool pointing at the same Iranti instance.
              </p>
              <p>
                Mem0 has a Python and TypeScript SDK but not a native MCP server. If your tooling
                is MCP-centric, Iranti integrates without a custom adapter.
              </p>
            </div>

            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">See the full benchmarks</div>
              <div className="flex gap-3 flex-wrap">
                <Link href="/benchmarks/competitive-recall" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  C1: Recall accuracy →
                </Link>
                <Link href="/benchmarks/conflict-resolution" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  C3: Conflict resolution →
                </Link>
                <Link href="/benchmarks/cross-session" className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors">
                  C4: Cross-session →
                </Link>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
