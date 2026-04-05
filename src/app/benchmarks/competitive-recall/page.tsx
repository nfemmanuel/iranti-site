import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { b3aResults, competitiveSystems } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Agent Memory Recall: Iranti vs Mem0, Shodh & Graphiti",
  description:
    "Iranti vs Shodh, Mem0, and Graphiti on recall accuracy: 20 config-heavy facts, 40 questions, isolated namespaces. Full methodology, per-tier breakdown, and Graphiti entity extraction analysis.",
  alternates: { canonical: "/benchmarks/competitive-recall" },
  openGraph: {
    title: "Agent Memory Recall — Iranti vs Mem0, Shodh & Graphiti",
    description:
      "Iranti 100% · Shodh 100% · Mem0 80% · Graphiti 57%. Full methodology for a 20-fact, 40-question recall benchmark across four memory systems.",
    type: "website",
    url: "https://iranti.dev/benchmarks/competitive-recall",
    siteName: "Iranti",
  },
};

// ─── Static helpers ────────────────────────────────────────────────────────────

function StatBar({ pct, color, height = "h-1.5" }: { pct: number; color: string; height?: string }) {
  return (
    <div className={`flex-1 ${height} rounded-full overflow-hidden`} style={{ background: "var(--border-subtle)" }}>
      <div className={`h-full rounded-full`} style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

// 20 benchmark facts with tier and miss info
const FACTS = [
  { id: "F01", risk: "HIGH",   q: "JWT expiry + public key path",                mem0: true,  graphiti: false },
  { id: "F02", risk: "HIGH",   q: "DB max connections + idle timeout",            mem0: true,  graphiti: false },
  { id: "F03", risk: "HIGH",   q: "Rate limit write RPM + header name",           mem0: false, graphiti: false },
  { id: "F04", risk: "HIGH",   q: "Feature flags + default-enabled flag",         mem0: true,  graphiti: false },
  { id: "F05", risk: "HIGH",   q: "Worker count + job timeout",                   mem0: true,  graphiti: false },
  { id: "F06", risk: "MEDIUM", q: "Log file path + rotation days",                mem0: true,  graphiti: true  },
  { id: "F07", risk: "MEDIUM", q: "Cache TTL seconds + max memory MB",            mem0: true,  graphiti: false },
  { id: "F08", risk: "MEDIUM", q: "From email address + send timeout",            mem0: true,  graphiti: true  },
  { id: "F09", risk: "MEDIUM", q: "Elasticsearch index name + debounce MS",       mem0: true,  graphiti: false },
  { id: "F10", risk: "MEDIUM", q: "Max file size MB + S3 bucket name",            mem0: true,  graphiti: true  },
  { id: "F11", risk: "LOW",    q: "Auth middleware chain + order",                mem0: false, graphiti: false },
  { id: "F12", risk: "LOW",    q: "AWS region + deployment strategy",             mem0: true,  graphiti: true  },
  { id: "F13", risk: "LOW",    q: "Stable API version + v0 sunset date",          mem0: true,  graphiti: true  },
  { id: "F14", risk: "LOW",    q: "Health endpoint method + auth requirement",    mem0: false, graphiti: true  },
  { id: "F15", risk: "LOW",    q: "Session TTL days + invalidate on pw change",   mem0: true,  graphiti: false },
  { id: "F16", risk: "HIGH",   q: "Encryption algorithm + PBKDF2 iterations",     mem0: true,  graphiti: false },
  { id: "F17", risk: "HIGH",   q: "Webhook signature header + timeout MS",        mem0: false, graphiti: false },
  { id: "F18", risk: "MEDIUM", q: "Audit table name + immutability",              mem0: true,  graphiti: false },
  { id: "F19", risk: "LOW",    q: "CORS credentials + preflight cache seconds",   mem0: true,  graphiti: true  },
  { id: "F20", risk: "HIGH",   q: "Stripe webhook path + max amount cents",       mem0: true,  graphiti: false },
];

const tierColor: Record<string, string> = {
  HIGH: "text-red-400", MEDIUM: "text-amber-400", LOW: "text-teal-400",
};

export default function CompetitiveRecallPage() {
  const sysColors: Record<string, string> = {
    iranti: "#14b8a6", shodh: "#60a5fa", mem0: "#f59e0b", graphiti: "#a78bfa",
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* ── Breadcrumb ───────────────────────────────────────────────────── */}
        <div className="px-6 pt-4 pb-0 max-w-6xl mx-auto">
          <nav className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono">
            <Link href="/benchmarks" className="hover:text-teal-400 transition-colors">Benchmarks</Link>
            <span>/</span>
            <span className="text-[var(--text-muted)]">C1 — Competitive Recall</span>
          </nav>
        </div>

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <section className="px-6 py-14 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">C1 — Competitive Recall Accuracy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4 max-w-4xl">
            Can a memory system reliably recall what it wrote?
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-10">
            20 config-heavy facts. 40 recall questions. Each system writes each fact to its own isolated
            namespace, then answers two targeted questions about that fact. Score: expected answer substring
            appears in the returned context. No LLM judge.
          </p>

          {/* Result pills */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {competitiveSystems.map((s) => {
              const d = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
              return (
                <div key={s.id} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="text-2xl font-semibold tracking-[-0.03em] mb-1" style={{ color: s.color }}>
                    {d.pct}%
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-1">{s.label}</div>
                  <div className="text-xs text-[var(--text-faint)] font-mono">{d.score}/{d.total} · {d.tokPerQuery} tok/query</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Methodology ─────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Corpus design</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  The 20 facts cover real-world application configuration: JWT auth, PostgreSQL connection
                  pooling, rate limiting, feature flags, background workers, logging, Redis caching, email
                  delivery, Elasticsearch, file uploads, encryption, webhooks, audit logs, CORS, and payment processing.
                </p>
                <p>
                  Facts are assigned a risk tier based on operational severity: <span className="font-mono text-red-400">HIGH</span> for
                  security and data integrity configs, <span className="font-mono text-amber-400">MEDIUM</span> for
                  infrastructure settings, <span className="font-mono text-teal-400">LOW</span> for operational
                  preferences. 8 HIGH, 6 MEDIUM, 6 LOW facts.
                </p>
                <p>
                  Each fact contains at least two independently queryable values — one semantic (e.g., a path or
                  name) and one numeric (e.g., a timeout or limit). Both are tested as separate questions to
                  probe each system's ability to return exact config values.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">Isolation and scoring</h2>
              <div className="space-y-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Each fact is written to a dedicated, isolated namespace per system. For Iranti and Shodh
                  this is a per-fact user ID. For Mem0 it is a per-fact user identifier with a dedicated
                  Chroma collection. For Graphiti it is a per-fact <code className="font-mono text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">group_id</code>.
                </p>
                <p>
                  Isolation ensures that each query can only return context from the one fact written to
                  that scope — eliminating cross-contamination. The score is a deterministic substring
                  match: the expected answer string must appear verbatim in the returned context.
                </p>
                <div className="p-3 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg font-mono text-xs text-[var(--text-muted)]">
                  <div className="text-[var(--text-faint)] mb-1.5">Scoring function:</div>
                  <div>answer_hit(expected, text) {`→`}</div>
                  <div className="pl-3">expected.lower() in text.lower()</div>
                  <div className="pl-3 text-[var(--text-faint)]"># Yes/No: match "true"/"false" aliases</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── System comparison bars ──────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">System comparison</h2>
            <div className="grid md:grid-cols-2 gap-8">

              {/* Accuracy bars */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">Recall accuracy</div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
                    return (
                      <div key={s.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-code)] font-medium">{s.label}</span>
                          <span className="font-mono text-sm" style={{ color: s.color }}>{d.pct}% ({d.score}/{d.total})</span>
                        </div>
                        <StatBar pct={d.pct} color={s.color} height="h-2" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Token cost bars */}
              <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">Avg tokens per query</div>
                <div className="space-y-4">
                  {competitiveSystems.map((s) => {
                    const d = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
                    const maxTok = 40;
                    return (
                      <div key={s.id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-[var(--text-code)] font-medium">{s.label}</span>
                          <span className="font-mono text-sm" style={{ color: s.color }}>{d.tokPerQuery} tok/q</span>
                        </div>
                        <StatBar pct={Math.min((d.tokPerQuery / maxTok) * 100, 100)} color={s.color} height="h-2" />
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-[var(--text-faint)] font-mono mt-3">
                  Lower is better — injected context size per query
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Tier breakdown ──────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 tracking-[-0.02em]">Results by risk tier</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Questions scored per tier (HIGH / MEDIUM / LOW). Each tier shows questions correct / total.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider py-3 pr-8 border-b border-[var(--border-subtle)]">Tier</th>
                    {competitiveSystems.map((s) => (
                      <th key={s.id} className="text-center text-xs font-mono uppercase tracking-wider py-3 px-6 border-b border-[var(--border-subtle)]" style={{ color: s.color }}>
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(["HIGH", "MEDIUM", "LOW"] as const).map((tier, i) => {
                    const row = b3aResults.byTier[tier];
                    return (
                      <tr key={tier} className={i % 2 === 0 ? "bg-[var(--bg-surface)]" : ""}>
                        <td className={`py-4 pr-8 font-mono font-semibold text-sm ${tierColor[tier]}`}>{tier}</td>
                        {competitiveSystems.map((s) => {
                          const [correct, total] = row[s.id as keyof typeof row];
                          const pct = Math.round((correct / total) * 100);
                          return (
                            <td key={s.id} className="text-center py-4 px-6">
                              <span className="font-mono text-sm" style={{ color: s.color }}>{correct}/{total}</span>
                              <span className="text-xs text-[var(--text-faint)] font-mono ml-1.5">({pct}%)</span>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Per-fact breakdown ──────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2 tracking-[-0.02em]">Per-fact recall table</h2>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              ✓ = both questions answered correctly · ✗ = one or both questions missed
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pr-3 border-b border-[var(--border-subtle)] w-12">ID</th>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pr-6 border-b border-[var(--border-subtle)] w-14">Tier</th>
                    <th className="text-left text-xs text-[var(--text-faint)] font-mono py-3 pr-6 border-b border-[var(--border-subtle)]">Questions</th>
                    {competitiveSystems.map((s) => (
                      <th key={s.id} className="text-center text-xs font-mono py-3 px-4 border-b border-[var(--border-subtle)] w-20" style={{ color: s.color }}>
                        {s.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {FACTS.map((f, i) => (
                    <tr key={f.id} className={i % 2 === 0 ? "bg-[var(--bg-surface)]" : ""}>
                      <td className="py-3 pr-3 font-mono text-xs text-[var(--text-faint)]">{f.id}</td>
                      <td className={`py-3 pr-6 font-mono text-xs font-semibold ${tierColor[f.risk]}`}>{f.risk}</td>
                      <td className="py-3 pr-6 text-xs text-[var(--text-muted)]">{f.q}</td>
                      {/* Iranti: always pass */}
                      <td className="text-center py-3 px-4 text-teal-400 font-mono text-base">✓</td>
                      {/* Shodh: always pass */}
                      <td className="text-center py-3 px-4 text-blue-400 font-mono text-base">✓</td>
                      {/* Mem0 */}
                      <td className="text-center py-3 px-4 font-mono text-base">
                        <span style={{ color: f.mem0 ? "#f59e0b" : "#ef4444" }}>{f.mem0 ? "✓" : "✗"}</span>
                      </td>
                      {/* Graphiti */}
                      <td className="text-center py-3 px-4 font-mono text-base">
                        <span style={{ color: f.graphiti ? "#a78bfa" : "#ef4444" }}>{f.graphiti ? "✓" : "✗"}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-[var(--border-subtle)]">
                    <td colSpan={3} className="py-3 text-xs text-[var(--text-faint)] font-mono">Total</td>
                    {competitiveSystems.map((s) => {
                      const d = b3aResults.systems[s.id as keyof typeof b3aResults.systems];
                      return (
                        <td key={s.id} className="text-center py-3 px-4 font-mono text-sm font-semibold" style={{ color: s.color }}>
                          {d.pct}%
                        </td>
                      );
                    })}
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Miss pattern note */}
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <div className="p-4 border border-amber-500/20 bg-amber-500/5 rounded-xl text-sm">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-2">Mem0 miss pattern</div>
                <p className="text-[var(--text-muted)] leading-relaxed text-xs">
                  Mem0 misses F03, F11, F14, F17 — spanning HIGH and LOW tiers. The common thread is structured
                  config values that lack strong semantic context: rate limit header names, middleware ordering,
                  health endpoint auth flags, and webhook signature headers. Mem0's vector similarity finds
                  semantically related context but not the exact config key-value.
                </p>
              </div>
              <div className="p-4 border border-violet-400/20 bg-violet-400/5 rounded-xl text-sm">
                <div className="text-xs font-mono text-violet-400 uppercase tracking-wider mb-2">Graphiti miss pattern</div>
                <p className="text-[var(--text-muted)] leading-relaxed text-xs">
                  Graphiti misses 17 of 40 questions. The pattern concentrates on numeric config values:
                  millisecond timeouts, RPM limits, iteration counts, byte counts. LLM entity extraction
                  rephrases facts semantically — "JWT expiry is 3600 seconds" becomes an edge like
                  "JWT token expiry is issued by myapp.prod" — the number is lost in translation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Graphiti deep dive ──────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4 tracking-[-0.02em]">
              Why Graphiti loses numeric values
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                <p>
                  Graphiti (getzep/graphiti v0.28.2) uses an LLM to extract entities and relationships from
                  each ingested episode. The extracted entities and their edge <code className="font-mono text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">fact</code> strings
                  are what get returned on search — not the original verbatim text.
                </p>
                <p>
                  During extraction, the LLM is asked to identify subjects, predicates, and objects in
                  natural language. Numeric configuration values — which lack semantic subject-predicate
                  structure — are frequently absorbed into vague predicates or dropped entirely.
                </p>
                <p>
                  The benchmark searched with per-fact <code className="font-mono text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">group_id</code> isolation,
                  meaning each query was scoped to the exact namespace where that fact was written.
                  The issue is not retrieval routing — it is that the extractable fact content itself
                  no longer contains the original numeric value.
                </p>
              </div>
              <div className="space-y-3">
                <div className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs">
                  <div className="text-[var(--text-faint)] mb-2">Input episode body:</div>
                  <div className="text-violet-300 leading-relaxed">
                    JWT authentication config. Uses RS256 signing.<br />
                    [expirySeconds=3600, issuer=myapp.prod,<br />
                    &nbsp;keyFile=/etc/secrets/jwt-public.pem]
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono">
                  <span>↓</span>
                  <span>LLM entity extraction</span>
                </div>
                <div className="p-4 bg-[var(--bg-surface)] border border-violet-400/20 rounded-xl font-mono text-xs">
                  <div className="text-[var(--text-faint)] mb-2">Extracted edge.fact (what search returns):</div>
                  <div className="text-violet-300 leading-relaxed">
                    "JWT token expiry is issued by myapp.prod"
                  </div>
                  <div className="text-red-400 mt-2">→ 3600 not found · /etc/secrets/jwt-public.pem not found</div>
                </div>
                <p className="text-xs text-[var(--text-faint)] leading-relaxed">
                  Graphiti is well-suited for narrative and relationship-heavy knowledge where semantic
                  extraction adds value. It is not well-suited for verbatim config recall where exact
                  numeric values must survive the write-read round trip.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Cognee exclusion ────────────────────────────────────────────── */}
        <section className="px-6 py-8 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] flex gap-4">
              <div className="text-[var(--text-faint)] font-mono text-xs shrink-0 mt-0.5">NOTE</div>
              <div className="text-sm text-[var(--text-muted)] leading-relaxed">
                <strong className="text-[var(--text-code)]">Cognee was excluded from this benchmark.</strong>{" "}
                Cognee requires Python &lt;3.14 (strict upper bound in its package metadata). The benchmark
                environment runs Python 3.14.2 — no compatible version of Cognee could be installed via pip.
                This is not a performance disqualification. Cognee will be re-evaluated when a compatible
                release is available.
              </div>
            </div>
          </div>
        </section>

        {/* ── Key findings ────────────────────────────────────────────────── */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6 tracking-[-0.02em]">Key findings</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {b3aResults.keyFindings.map((finding, i) => (
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
              C2: Pool efficiency →
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
