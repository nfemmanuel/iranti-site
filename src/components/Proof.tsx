import { Gauge, ConflictBar } from "./BenchmarkGauge";

const externalBenchmarks = [
  {
    id: "B1",
    name: "Entity Fact Retrieval",
    description: "Write fictional entity facts to Iranti, retrieve in a new session with zero in-context knowledge. Baseline arm uses the same LLM reading from context.",
    result: "16/16",
    accuracy: "100%",
    note: "Two arms: 8 prior-session retrieval + 8 same-session write→retrieve. No hallucination. Entity isolation confirmed across 2 distinct entities × 4 keys.",
    status: "PASS",
  },
  {
    id: "B2",
    name: "Cross-Session Persistence",
    description: "5 researcher entities × 4 facts written in Session 1. Retrieve all 20 in Session 2 with no conversation history. Baseline (no memory): 0% recall, definitional.",
    result: "20/20",
    accuracy: "100%",
    note: "Zero hallucination across all 20 facts. Genuine cross-session evidence: facts written 2026-03-20 retrieved 2026-03-21 in separate invocations.",
    status: "PASS",
  },
  {
    id: "B3",
    name: "Conflict Resolution",
    description: "5 adversarial conflict scenarios with varying confidence gaps. Tests deterministic resolution (gap ≥10), LLM arbitration (gap <10), and source-reliability weighting.",
    result: "4/5",
    accuracy: "80%",
    note: "C2 failure is documented and expected: a high-confidence wrong write blocks lower-confidence corrections. This is a known design property, not a bug. LLM arbitration: 3/3 (100%).",
    status: "PARTIAL",
  },
];

const validationResults = [
  {
    goal: "Easy Integration",
    experiment: "Raw HTTP (9 lines of Python)",
    score: "3/3",
    status: "PASS",
  },
  {
    goal: "Context Persistence",
    experiment: "observe() API — facts missing from context",
    score: "6/6",
    status: "PASS",
  },
  {
    goal: "Cross-Agent Retrieval",
    experiment: "Agent 2 reads facts written by Agent 1",
    score: "5/5",
    status: "PASS",
  },
  {
    goal: "Per-Agent Persistence",
    experiment: "Cross-process: write in P1, read in P2",
    score: "5/5",
    status: "PASS",
  },
  {
    goal: "Response Quality",
    experiment: "Memory injection vs no injection",
    score: "0→2/2",
    status: "PASS",
  },
];

const conflictResults = [
  { suite: "Direct contradiction", score: "4/4", note: "Same entity+key conflicts resolved or escalated" },
  { suite: "Temporal conflict", score: "4/4", note: "Equal-score ties use deterministic temporal tie-breaks" },
  { suite: "Cascading conflict", score: "4/4", note: "Same-entity cross-key contradiction checks" },
  { suite: "Multi-hop conflict", score: "4/4", note: "Relationship-aware contradiction checks" },
];

const frameworkResults = [
  { framework: "Raw OpenAI API", entity: "project/void_runner", score: "5/5", time: "14.0s" },
  { framework: "LangChain", entity: "project/stellar_drift", score: "5/5", time: "2.9s" },
  { framework: "CrewAI", entity: "project/nexus_prime", score: "6/6", time: "60s" },
];

export default function Proof() {
  return (
    <section id="proof" className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-teal-500" />
          <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
            Proof
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              Validated results.
              <br />
              <span className="text-[var(--text-muted)]">
                Not marketing claims.
              </span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              These experiments used fictional entities and invented facts that
              no LLM can know from training data. Every result is reproducible.
              Limitations are documented alongside the wins.
            </p>
          </div>

          {/* Animated gauges */}
          <div className="flex items-center justify-around gap-2 py-4">
            <Gauge value={20} total={20} label="Persistence" sub="cross-session" size={110} />
            <Gauge value={16} total={16} label="Conflicts" sub="adversarial" size={110} />
            <Gauge value={4} total={4} label="Consistency" sub="serialization" size={110} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Goal validation */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4 font-mono uppercase tracking-wider">
              Goal Validation
            </h3>
            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
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
                  <div className="px-4 py-3 text-[var(--text-muted)] border-l border-[var(--border-subtle)] text-xs">
                    {r.experiment}
                  </div>
                  <div className="px-4 py-3 font-mono text-teal-400 border-l border-[var(--border-subtle)]">
                    {r.score}
                  </div>
                  <div className="px-4 py-3 border-l border-[var(--border-subtle)]">
                    <span className="px-2 py-0.5 bg-teal-500/10 text-teal-400 text-xs rounded font-mono">
                      {r.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Framework compat */}
          <div>
            <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-4 font-mono uppercase tracking-wider">
              Framework Compat
            </h3>
            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden mb-6">
              {frameworkResults.map((r, i) => (
                <div
                  key={r.framework}
                  className={`p-4 ${
                    i < frameworkResults.length - 1 ? "border-b border-[var(--border-subtle)]" : ""
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-[var(--text-code)]">
                      {r.framework}
                    </span>
                    <span className="font-mono text-sm text-teal-400">
                      {r.score}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--text-faint)] font-mono">
                    {r.entity}
                  </div>
                </div>
              ))}
            </div>

            {/* Honesty box */}
            <div className="p-4 bg-[var(--bg-surface)] border border-amber-500/20 rounded-xl">
              <div className="text-xs text-amber-500 font-mono mb-2">
                Honest scope
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                These are internal validation experiments. An external benchmarking
                program is underway — it includes both wins and documented weaknesses
                (multi-hop search discovery, ingest pipeline accuracy). No results will
                be published until sample sizes are adequate for statistical defensibility.
                Reproducibility over spectacle.
              </p>
            </div>
          </div>
        </div>

        {/* Conflict benchmark */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-6 font-mono uppercase tracking-wider">
            Conflict Benchmark — Internal Adversarial Suite
          </h3>
          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-5">
            {conflictResults.map((r, i) => (
              <ConflictBar
                key={r.suite}
                label={r.suite}
                score={r.score}
                note={r.note}
                delay={i * 120}
              />
            ))}
          </div>
        </div>

        {/* External benchmarks */}
        <div className="mt-12 pt-12 border-t border-[var(--border-subtle)]">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              External Benchmark Program
            </span>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {externalBenchmarks.map((b) => (
              <div
                key={b.id}
                className={`p-5 rounded-xl border ${
                  b.status === "PASS"
                    ? "bg-[var(--bg-surface)] border-[var(--border-subtle)]"
                    : "bg-[var(--bg-surface)] border-amber-500/20"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs font-mono text-[var(--text-faint)] mb-1 block">{b.id}</span>
                    <span className="text-sm font-semibold text-[var(--text-code)]">{b.name}</span>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <div className={`text-xl font-mono font-semibold ${b.status === "PASS" ? "text-teal-400" : "text-amber-400"}`}>
                      {b.result}
                    </div>
                    <div className="text-xs text-[var(--text-faint)]">{b.accuracy}</div>
                  </div>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
                  {b.description}
                </p>
                <div className={`text-xs leading-relaxed p-3 rounded-lg ${
                  b.status === "PASS"
                    ? "bg-[var(--bg-code)] text-[var(--text-faint)]"
                    : "bg-amber-500/5 text-[var(--text-muted)] border border-amber-500/10"
                }`}>
                  {b.note}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 border border-[var(--border-subtle)] rounded-xl flex items-start gap-3">
            <svg className="w-4 h-4 text-[var(--text-faint)] mt-0.5 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8 6.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 6.5z" />
            </svg>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              <span className="text-[var(--text-secondary)] font-medium">Benchmark methodology:</span>{" "}
              All external benchmarks use fictional entities — values no LLM can know from training data.
              Single benchmark agent; no shared context between write and retrieve phases.
              The B3 C2 limitation (high-confidence first write blocks corrections) is a known design property documented in the conflict resolution spec.
              Full raw results and methodology are{" "}
              <a
                href="https://github.com/nfemmanuel/iranti-benchmarking"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-400 transition-colors underline underline-offset-2"
              >
                available in the benchmarking repo
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
