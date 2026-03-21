import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Benchmark Results — Iranti Multi-Agent Memory Validation",
  description:
    "Iranti benchmark results: 20/20 cross-session persistent memory retrieval, 16/16 adversarial conflict resolution, 4/4 consistency. Reproducible methodology. Validated with CrewAI, LangChain, OpenAI API.",
  openGraph: {
    title: "Benchmark Results — Iranti Multi-Agent Memory Validation",
    description:
      "Iranti benchmark results: 20/20 cross-session persistent memory retrieval, 16/16 adversarial conflict resolution, 4/4 consistency. Validated with CrewAI, LangChain, OpenAI API.",
    type: "website",
    url: "https://iranti.dev/proof",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benchmark Results — Iranti Multi-Agent Memory Validation",
    description:
      "Iranti benchmark results: 20/20 cross-session persistent memory retrieval, 16/16 adversarial conflict resolution, 4/4 consistency. Validated with CrewAI, LangChain, OpenAI API.",
  },
};

const validationResults = [
  { goal: "Easy Integration", experiment: "Raw HTTP (9 lines of Python)", score: "3/3", status: "PASS" },
  { goal: "Context Persistence", experiment: "observe() API — facts missing from context", score: "6/6", status: "PASS" },
  { goal: "Cross-Agent Retrieval", experiment: "Agent 2 reads facts written by Agent 1", score: "5/5", status: "PASS" },
  { goal: "Per-Agent Persistence", experiment: "Cross-process: write in P1, read in P2", score: "5/5", status: "PASS" },
  { goal: "Response Quality", experiment: "Memory injection vs no injection", score: "0→2/2", status: "PASS" },
];

const conflictResults = [
  { suite: "Direct contradiction", score: "4/4", note: "Same entity+key conflicts resolved or escalated correctly" },
  { suite: "Temporal conflict", score: "4/4", note: "Equal-score ties use deterministic temporal tie-breaks" },
  { suite: "Cascading conflict", score: "4/4", note: "Same-entity cross-key contradiction checks" },
  { suite: "Multi-hop conflict", score: "4/4", note: "Relationship-aware contradiction checks" },
];

const frameworkResults = [
  { framework: "Raw OpenAI API", entity: "project/void_runner", score: "5/5", time: "14.0s", detail: "9 lines of Python. Write a fact, read it back from a fresh client instance in a separate process." },
  { framework: "LangChain", entity: "project/stellar_drift", score: "5/5", time: "2.9s", detail: "IrantiClient used as memory backend. Agent chain reads facts written by a different chain." },
  { framework: "CrewAI", entity: "project/nexus_prime", score: "6/6", time: "60s", detail: "Researcher agent writes facts. Analyst agent reads them back. No shared state between crew roles." },
];

const proofJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Iranti Multi-Agent Memory Validation Results",
  description:
    "Internal validation benchmark for Iranti persistent memory infrastructure. 20/20 cross-session retrieval, 16/16 adversarial conflict resolution, 4/4 write consistency. Tested with CrewAI, LangChain, and raw OpenAI API.",
  url: "https://iranti.dev/proof",
  creator: {
    "@type": "Organization",
    name: "Iranti",
    url: "https://iranti.dev",
  },
  variableMeasured: [
    { "@type": "PropertyValue", name: "Cross-session retrieval", value: "20/20" },
    { "@type": "PropertyValue", name: "Adversarial conflict resolution", value: "16/16" },
    { "@type": "PropertyValue", name: "Write consistency", value: "4/4" },
  ],
};

export default function ProofPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Script
        id="proof-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(proofJsonLd) }}
      />
      <Nav />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Proof
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-3xl">
            Validated results.
            <br />
            <span className="text-[var(--text-muted)]">Not marketing claims.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-4">
            Every number on this page maps to a reproducible experiment. We used
            fictional entities and invented facts that no LLM can know from
            training data. Limitations are documented alongside the wins.
          </p>

          {/* Big numbers */}
          <div className="grid grid-cols-3 gap-4 mt-10 max-w-lg">
            {[
              { n: "20/20", label: "Persistence", sub: "cross-session retrieval" },
              { n: "16/16", label: "Conflicts", sub: "adversarial benchmark" },
              { n: "4/4", label: "Consistency", sub: "write serialization" },
            ].map((stat) => (
              <div key={stat.label} className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-center">
                <div className="text-2xl font-mono font-semibold text-teal-400 mb-1">{stat.n}</div>
                <div className="text-xs font-medium text-[var(--text-code)] mb-0.5">{stat.label}</div>
                <div className="text-xs text-[var(--text-faint)]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Methodology */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Methodology
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-8 leading-tight">
              How these experiments were run.
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                {
                  title: "Fictional entities",
                  desc: "All entities used in tests (project/void_runner, project/stellar_drift, etc.) are invented names. No LLM has prior knowledge of them. This eliminates training-data contamination.",
                  color: "teal",
                },
                {
                  title: "Cross-process isolation",
                  desc: "Write operations and read operations were performed in separate processes with no shared in-memory state. Persistence was the only path for a read to succeed.",
                  color: "teal",
                },
                {
                  title: "Adversarial conflict design",
                  desc: "The conflict benchmark injected deliberate contradictions: same key, different values, different timestamps, different confidence scores. The system had to resolve or escalate each one correctly.",
                  color: "amber",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className={`p-5 rounded-xl border ${
                    item.color === "teal"
                      ? "border-teal-500/20 bg-teal-500/5"
                      : "border-amber-500/20 bg-amber-500/5"
                  }`}
                >
                  <div className={`text-sm font-semibold mb-2 ${item.color === "teal" ? "text-teal-400" : "text-amber-400"}`}>
                    {item.title}
                  </div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Honest scope */}
            <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl max-w-2xl">
              <div className="text-xs text-amber-500 font-mono mb-2 uppercase tracking-wider">
                Honest scope
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                These are internal validation experiments, not a peer-reviewed benchmark suite. The
                goal was to verify that Iranti&apos;s core guarantees hold — not to produce a
                publishable research artifact. A broader benchmarking program against external,
                recognizable benchmarks is underway. Results will be published with full methodology
                when ready.
              </p>
            </div>
          </div>
        </section>

        {/* Goal Validation */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-8">
              Goal Validation — Retrieval
            </h2>

            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden mb-8">
              <div className="grid grid-cols-[1fr_1.5fr_auto_auto] text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
                <div className="px-4 py-2.5">Goal</div>
                <div className="px-4 py-2.5 border-l border-[var(--border-subtle)]">Experiment</div>
                <div className="px-4 py-2.5 border-l border-[var(--border-subtle)]">Score</div>
                <div className="px-4 py-2.5 border-l border-[var(--border-subtle)]">Result</div>
              </div>
              {validationResults.map((r, i) => (
                <div
                  key={r.goal}
                  className={`grid grid-cols-[1fr_1.5fr_auto_auto] text-sm ${
                    i < validationResults.length - 1 ? "border-b border-[var(--border-subtle)]" : ""
                  }`}
                >
                  <div className="px-4 py-3 text-[var(--text-code)] font-medium">{r.goal}</div>
                  <div className="px-4 py-3 text-[var(--text-muted)] border-l border-[var(--border-subtle)] text-xs">{r.experiment}</div>
                  <div className="px-4 py-3 font-mono text-teal-400 border-l border-[var(--border-subtle)]">{r.score}</div>
                  <div className="px-4 py-3 border-l border-[var(--border-subtle)]">
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 text-xs rounded font-mono">
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conflict Benchmark */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Conflict Benchmark
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
              Adversarial conflict resolution — 4 suites × 4 tests = 16/16
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
              The conflict benchmark tests a deliberate adversarial design: each suite introduces
              a specific category of contradiction. The system must correctly resolve or escalate
              every test case. 16/16 means zero unhandled or incorrectly resolved conflicts.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {conflictResults.map((r) => (
                <div key={r.suite} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-[var(--text-code)]">{r.suite}</span>
                    <span className="font-mono text-sm text-teal-400">{r.score}</span>
                  </div>
                  <p className="text-xs text-[var(--text-faint)] leading-relaxed">{r.note}</p>
                </div>
              ))}
            </div>

            <div className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] max-w-2xl">
              <div className="text-xs text-[var(--text-faint)] font-mono mb-2">// resolution logic</div>
              <div className="font-mono text-xs space-y-1">
                <div className="text-[var(--text-secondary)]">if confidence_a {">"} confidence_b:</div>
                <div className="text-teal-400 pl-4">resolve(keep=a, archive=b)</div>
                <div className="text-[var(--text-secondary)]">elif confidence_a == confidence_b:</div>
                <div className="text-teal-400 pl-4">resolve(keep=newer, archive=older)</div>
                <div className="text-[var(--text-secondary)]">else:</div>
                <div className="text-amber-400 pl-4">escalate(to=&quot;escalation/active/&quot;)</div>
              </div>
            </div>
          </div>
        </section>

        {/* Framework Compatibility */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Framework Compatibility
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3">
              Consistency validation — 4/4
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
              Consistency tests verify that writes are serialized correctly under concurrent
              load — last-write-wins with deterministic tie-breaking. All four consistency
              test cases pass.
            </p>

            <div className="grid md:grid-cols-3 gap-5">
              {frameworkResults.map((r) => (
                <div key={r.framework} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-[var(--text-code)]">{r.framework}</span>
                    <span className="font-mono text-sm text-teal-400">{r.score}</span>
                  </div>
                  <div className="text-xs text-[var(--text-faint)] font-mono mb-3">{r.entity}</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{r.detail}</p>
                  <div className="mt-3 text-xs text-[var(--text-faint)] font-mono">time: {r.time}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Source */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
              <div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  Source is public
                </h2>
                <p className="text-[var(--text-muted)] text-sm max-w-md">
                  The benchmark scripts live in the Iranti GitHub repo. You can run them yourself
                  against a local instance.
                </p>
              </div>
              <div className="flex gap-3 flex-shrink-0">
                <a
                  href="https://github.com/nfemmanuel/iranti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
                >
                  View on GitHub
                </a>
                <Link
                  href="/get-started"
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
                >
                  Get started
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
