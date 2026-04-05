"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

/* ─── Types ────────────────────────────────────────────────────────────────── */

interface ScaleRow {
  label: string;
  n: string;
  tokens: string;
  baseline: number | null;
  iranti: number | null;
  adversarial?: boolean;
}

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const SCALE_DATA: ScaleRow[] = [
  { label: "N=5",              n: "5",   tokens: "~400 tok",   baseline: 100, iranti: null, adversarial: false },
  { label: "N=20",             n: "20",  tokens: "~1.6k tok",  baseline: 100, iranti: null, adversarial: false },
  { label: "N=20+adversarial", n: "20+", tokens: "~1.6k tok",  baseline: 100, iranti: null, adversarial: true  },
  { label: "N=100",            n: "100", tokens: "~8k tok",    baseline: 100, iranti: 100,  adversarial: false },
  { label: "N=500",            n: "500",  tokens: "~28k tok",   baseline: 100, iranti: 100,  adversarial: false },
  { label: "N=1000",           n: "1000", tokens: "~57k tok",   baseline: 100, iranti: 100,  adversarial: false },
  { label: "N=5000",           n: "5000", tokens: "~276k tok",  baseline: null, iranti: 100,  adversarial: false },
];

const NEEDLE_ENTITIES = [
  {
    id: "researcher/alice_chen",
    facts: [
      ["affiliation",       "MIT Computer Science"],
      ["publication_count", "47"],
      ["previous_employer", "OpenAI (2018–2021)"],
      ["research_focus",    "natural language processing"],
    ],
  },
  {
    id: "researcher/bob_okafor",
    facts: [
      ["affiliation",       "Stanford AI Lab"],
      ["publication_count", "23"],
      ["previous_employer", "DeepMind (2020–2023)"],
      ["research_focus",    "computer vision"],
    ],
  },
];

const WRITE_ARM_TRIALS = [
  { trial: "IB1", entity: "researcher/alice_chen",  key: "affiliation"       },
  { trial: "IB2", entity: "researcher/alice_chen",  key: "publication_count" },
  { trial: "IB3", entity: "researcher/alice_chen",  key: "previous_employer" },
  { trial: "IB4", entity: "researcher/alice_chen",  key: "research_focus"    },
  { trial: "IB5", entity: "researcher/bob_okafor",  key: "affiliation"       },
  { trial: "IB6", entity: "researcher/bob_okafor",  key: "publication_count" },
  { trial: "IB7", entity: "researcher/bob_okafor",  key: "previous_employer" },
  { trial: "IB8", entity: "researcher/bob_okafor",  key: "research_focus"    },
];

const PROVENANCE_JSON = `{
  "found": true,
  "entity": "researcher/alice_chen",
  "key": "affiliation",
  "value": "MIT Computer Science",
  "confidence": 0.98,
  "source": "agent/site_main",
  "validFrom": "2026-03-20T14:30:00Z",
  "contested": false
}`;

/* ─── Helpers ──────────────────────────────────────────────────────────────── */

function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Chart 1: Accuracy vs Scale ───────────────────────────────────────────── */

function AccuracyChart() {
  const { ref, inView } = useInView(0.2);

  const BAR_HEIGHT = 22;
  const GAP = 10;
  const GROUP_GAP = 18;
  const LABEL_W = 120;
  const CHART_W = 340;
  const PROJ_START_X = CHART_W * 0.68; // where the dashed projection starts

  // Build layout: each SCALE_DATA row has 1 or 2 bars
  const rows: Array<{
    label: string;
    tokens: string;
    adversarial: boolean;
    bars: Array<{ pct: number; kind: "baseline" | "iranti"; score: string }>;
    y: number;
  }> = [];

  let y = 0;
  for (const row of SCALE_DATA) {
    const bars: Array<{ pct: number; kind: "baseline" | "iranti"; score: string }> = [];
    if (row.baseline !== null) bars.push({ pct: row.baseline / 100, kind: "baseline", score: "10/10" });
    if (row.iranti !== null)   bars.push({ pct: row.iranti  / 100, kind: "iranti",   score: row.label === "N=100" ? "8/8" : row.label === "N=5000" ? "4/4" : "10/10" });
    rows.push({ label: row.label, tokens: row.tokens, adversarial: !!row.adversarial, bars, y });
    y += bars.length * (BAR_HEIGHT + GAP) + GROUP_GAP;
  }
  const totalH = y - GROUP_GAP + 40; // +40 for projected label

  return (
    <div ref={ref} className="w-full overflow-x-auto">
      <div className="min-w-[520px]">
        {/* Legend */}
        <div className="flex items-center gap-6 mb-5 pl-[120px]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="inline-block w-8 h-2 rounded-full bg-[var(--border-light)]" />
            Baseline (context-reading)
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <span className="inline-block w-8 h-2 rounded-full bg-amber-500" />
            Iranti (exact key lookup)
          </div>
          <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
            <svg width="32" height="8" viewBox="0 0 32 8">
              <line x1="0" y1="4" x2="32" y2="4" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
            Baseline infeasible at N≥5000
          </div>
        </div>

        <svg
          width="100%"
          viewBox={`0 0 ${LABEL_W + CHART_W + 60} ${totalH}`}
          className="overflow-visible font-mono"
          aria-label="Accuracy vs Scale bar chart"
        >
          {/* X-axis gridlines at 0%, 50%, 100% */}
          {[0, 0.5, 1].map((pct) => (
            <g key={pct}>
              <line
                x1={LABEL_W + CHART_W * pct}
                y1={0}
                x2={LABEL_W + CHART_W * pct}
                y2={totalH - 30}
                stroke="var(--border-subtle)"
                strokeWidth="1"
              />
              <text
                x={LABEL_W + CHART_W * pct}
                y={totalH - 14}
                textAnchor="middle"
                fontSize="9"
                fill="var(--text-faint)"
              >
                {pct * 100}%
              </text>
            </g>
          ))}

          {/* Projected degradation overlay — dashed region after PROJ_START_X */}
          <rect
            x={LABEL_W + PROJ_START_X}
            y={0}
            width={CHART_W - PROJ_START_X}
            height={totalH - 30}
            fill="url(#projGrad)"
            opacity="0.4"
          />
          <defs>
            <linearGradient id="projGrad" x1="0" x2="1" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.06" />
            </linearGradient>
          </defs>

          {/* Dashed projected baseline degradation line */}
          {inView && (
            <line
              x1={LABEL_W + PROJ_START_X}
              y1={(rows[6].y + BAR_HEIGHT / 2)}
              x2={LABEL_W + CHART_W + 50}
              y2={totalH - 60}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.5"
            />
          )}

          {/* "Degradation regime →" label */}
          <text
            x={LABEL_W + PROJ_START_X + 4}
            y={totalH - 32}
            fontSize="8"
            fill="#f59e0b"
            opacity="0.7"
            fontFamily="monospace"
          >
            N=5000: baseline infeasible (276k tok &gt; 200k ctx limit) →
          </text>

          {rows.map((row) =>
            row.bars.map((bar, bi) => {
              const barY = row.y + bi * (BAR_HEIGHT + GAP);
              const isIranti = bar.kind === "iranti";
              const fill = isIranti ? "#f59e0b" : "var(--border-light)";
              const textFill = isIranti ? "#f59e0b" : "var(--text-faint)";
              const delay = rows.indexOf(row) * 80 + bi * 50;

              return (
                <g key={`${row.label}-${bar.kind}`}>
                  {/* Row label — only on first bar */}
                  {bi === 0 && (
                    <>
                      <text
                        x={LABEL_W - 10}
                        y={barY + BAR_HEIGHT / 2 + 4}
                        textAnchor="end"
                        fontSize="10"
                        fill="var(--text-secondary)"
                        fontFamily="monospace"
                      >
                        {row.label}
                        {row.adversarial ? " ⚑" : ""}
                      </text>
                      <text
                        x={LABEL_W - 10}
                        y={barY + BAR_HEIGHT / 2 + 15}
                        textAnchor="end"
                        fontSize="7.5"
                        fill="var(--text-faint)"
                        fontFamily="monospace"
                      >
                        {row.tokens}
                      </text>
                    </>
                  )}

                  {/* Kind label */}
                  <text
                    x={LABEL_W + 4}
                    y={barY + BAR_HEIGHT / 2 + 4}
                    fontSize="7.5"
                    fill={textFill}
                    fontFamily="monospace"
                    opacity="0.7"
                  >
                    {bar.kind === "iranti" ? "iranti" : "baseline"}
                  </text>

                  {/* Track */}
                  <rect
                    x={LABEL_W}
                    y={barY}
                    width={CHART_W}
                    height={BAR_HEIGHT}
                    rx="4"
                    fill="var(--bg-surface)"
                  />

                  {/* Animated bar */}
                  <rect
                    x={LABEL_W}
                    y={barY}
                    width={inView ? CHART_W * bar.pct : 0}
                    height={BAR_HEIGHT}
                    rx="4"
                    fill={fill}
                    opacity={isIranti ? 0.85 : 0.35}
                    style={{
                      transition: `width 0.9s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                    }}
                  />

                  {/* Score label */}
                  <text
                    x={LABEL_W + CHART_W * bar.pct - 6}
                    y={barY + BAR_HEIGHT / 2 + 4}
                    textAnchor="end"
                    fontSize="9"
                    fill={isIranti ? "#080808" : "var(--text-muted)"}
                    fontFamily="monospace"
                    fontWeight="600"
                    opacity={inView ? 1 : 0}
                    style={{ transition: `opacity 0.4s ease ${delay + 700}ms` }}
                  >
                    {bar.score}
                  </text>
                </g>
              );
            })
          )}
        </svg>

        <p className="text-xs text-[var(--text-faint)] mt-3 pl-[120px]">
          ⚑ N=20+adversarial: wrong facts injected for needle entities. Baseline unaffected at this scale.
        </p>
      </div>
    </div>
  );
}

/* ─── Chart 2: Retrieval Matrix ────────────────────────────────────────────── */

const MATRIX_KEYS = ["affiliation", "publication_count", "previous_employer", "research_focus"];
const MATRIX_ENTITIES = ["alice_chen", "bob_okafor"];

function RetrievalMatrix() {
  const { ref, inView } = useInView(0.3);

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="text-xs font-mono border-collapse min-w-[480px]">
        <thead>
          <tr>
            <th className="text-left pb-3 pr-4 text-[var(--text-faint)] font-normal uppercase tracking-wider text-[10px]">
              Entity
            </th>
            {MATRIX_KEYS.map((k) => (
              <th
                key={k}
                className="text-center pb-3 px-3 text-[var(--text-faint)] font-normal uppercase tracking-wider text-[10px]"
              >
                {k.replace("_", "_\u200B")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {MATRIX_ENTITIES.map((entity, ei) => (
            <tr key={entity} className="border-t border-[var(--border-subtle)]">
              <td className="py-3 pr-4 text-[var(--text-secondary)] whitespace-nowrap">
                researcher/{entity}
              </td>
              {MATRIX_KEYS.map((k, ki) => {
                const delay = (ei * MATRIX_KEYS.length + ki) * 90;
                return (
                  <td key={k} className="py-3 px-3 text-center">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 rounded-md"
                      style={{
                        background: "rgba(20,184,166,0.08)",
                        border: "1px solid rgba(20,184,166,0.2)",
                        opacity: inView ? 1 : 0,
                        transform: inView ? "scale(1)" : "scale(0.5)",
                        transition: `opacity 0.35s ease ${delay}ms, transform 0.4s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6.5l2.5 2.5 5.5-6"
                          stroke="#14b8a6"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-[10px] text-[var(--text-faint)] mt-3">
        All 8 cells confirmed correct. Zero hallucinations. Zero cross-entity contamination (alice facts never attributed to bob, and vice versa).
      </p>
    </div>
  );
}

/* ─── Chart 3: Provenance Card ─────────────────────────────────────────────── */

function ProvenanceCard() {
  const { ref, inView } = useInView(0.3);

  // Simple tokeniser: keys (amber), string values (teal), others (muted)
  function renderJSON(json: string) {
    const lines = json.split("\n");
    return lines.map((line, i) => {
      const keyMatch = line.match(/^(\s*)"([\w]+)"(\s*:\s*)(.+)$/);
      if (keyMatch) {
        const [, indent, key, colon, value] = keyMatch;
        const trailing = value.replace(/,$/, "");
        const isString = trailing.startsWith('"');
        const isBool = trailing === "true" || trailing === "false";
        const isNull = trailing === "null";
        const isNum = /^\d/.test(trailing);
        let valueColor = "var(--text-secondary)";
        if (isString) valueColor = "#14b8a6";
        if (isBool || isNull) valueColor = "#f59e0b";
        if (isNum) valueColor = "#fbbf24";
        const comma = value.endsWith(",") ? "," : "";
        return (
          <div key={i}>
            <span style={{ color: "var(--text-faint)" }}>{indent}</span>
            <span style={{ color: "#f59e0b" }}>&quot;{key}&quot;</span>
            <span style={{ color: "var(--text-muted)" }}>{colon}</span>
            <span style={{ color: valueColor }}>{trailing}</span>
            <span style={{ color: "var(--text-muted)" }}>{comma}</span>
          </div>
        );
      }
      return (
        <div key={i} style={{ color: "var(--text-muted)" }}>
          {line}
        </div>
      );
    });
  }

  return (
    <div
      ref={ref}
      className="rounded-xl border border-[var(--border-subtle)] overflow-hidden"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Terminal bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
        <span className="ml-2 text-[10px] font-mono text-[var(--text-faint)]">
          iranti_query(entity=&quot;researcher/alice_chen&quot;, key=&quot;affiliation&quot;)
        </span>
      </div>
      {/* Code */}
      <pre
        className="p-5 text-xs leading-[1.7] overflow-x-auto"
        style={{ background: "var(--bg-code)", fontFamily: "var(--font-mono)" }}
      >
        {renderJSON(PROVENANCE_JSON)}
      </pre>
      {/* Metadata callouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px border-t border-[var(--border-subtle)]">
        {[
          { label: "confidence",  value: "0.98",  color: "#14b8a6" },
          { label: "source",      value: "agent", color: "var(--text-secondary)" },
          { label: "validFrom",   value: "timestamped", color: "var(--text-secondary)" },
          { label: "contested",   value: "false", color: "#f59e0b" },
        ].map(({ label, value, color }) => (
          <div key={label} className="px-4 py-3 bg-[var(--bg-surface)]">
            <div className="text-[9px] font-mono text-[var(--text-faint)] uppercase tracking-wider mb-1">{label}</div>
            <div className="text-xs font-mono" style={{ color }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Sub-components ────────────────────────────────────────────────────────── */

function ScoreChip({ score, label }: { score: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-5 py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-center">
      <span className="text-2xl font-semibold font-mono text-teal-400 tabular-nums">{score}</span>
      <span className="text-xs text-[var(--text-muted)] leading-relaxed">{label}</span>
    </div>
  );
}

function Callout({
  type,
  children,
}: {
  type: "info" | "warn" | "finding";
  children: React.ReactNode;
}) {
  const styles = {
    info:    "border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
    warn:    "border-amber-500/30 bg-amber-500/5 text-[var(--text-secondary)]",
    finding: "border-teal-500/30 bg-teal-500/5 text-[var(--text-secondary)]",
  };
  const labels    = { info: "Note", warn: "Limitation", finding: "Finding" };
  const labelCols = { info: "text-[var(--text-faint)]", warn: "text-amber-500", finding: "text-teal-400" };

  return (
    <div className={`border rounded-lg px-5 py-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className={`text-[10px] font-mono uppercase tracking-widest mr-2 ${labelCols[type]}`}>
        {labels[type]}
      </span>
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] text-[var(--text-faint)] font-mono uppercase tracking-widest mb-5">
      {children}
    </p>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */

export default function B1Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-20">

        {/* ── Breadcrumb ── */}
        <div className="px-6 pt-8 max-w-4xl mx-auto">
          <nav className="flex items-center gap-2 text-[10px] text-[var(--text-faint)] font-mono mb-8" aria-label="Breadcrumb">
            <Link href="/benchmarks" className="hover:text-[var(--text-secondary)] transition-colors">
              proof
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">b1</span>
          </nav>
        </div>

        {/* ── Header ── */}
        <section className="px-6 pb-14 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-5 h-px bg-teal-500 opacity-60" />
            <span className="text-[10px] text-teal-500 font-mono uppercase tracking-widest">Benchmark B1</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-5">
            Entity Fact Retrieval
            <br />
            <span className="text-[var(--text-muted)]">under Distractor Density.</span>
          </h1>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Does Iranti&apos;s exact entity/key lookup maintain precision as distractor entity count
            grows — a regime where context-reading is expected to degrade?
            A Needle-in-a-Haystack variant adapted for structured fact retrieval.
          </p>
          {/* Status chips */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-faint)]">
              Executed 2026-03-20 / 2026-03-21
            </span>
            <span className="px-2.5 py-1 rounded border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--text-faint)]">
              NIAH variant — structured key lookup
            </span>
            <span className="px-2.5 py-1 rounded border border-amber-500/30 text-[10px] font-mono text-amber-500">
              small-n · indicative only
            </span>
            <span className="px-2.5 py-1 rounded border border-teal-500/20 text-[10px] font-mono text-teal-500">
              hypothesis: precision holds at scale
            </span>
          </div>
        </section>

        {/* ── Score summary ── */}
        <section className="px-6 pb-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <SectionLabel>Results at a glance</SectionLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <ScoreChip score="30/30" label="Baseline across N=5, N=20, adversarial" />
              <ScoreChip score="8/8"   label="Iranti retrieval arm — prior-session KB data" />
              <ScoreChip score="8/8"   label="Iranti write arm — full ingest → retrieve" />
              <ScoreChip score="4/4" label="Iranti arm at N=5000 (~276k tok) — first positive differential" />
            </div>
            <Callout type="finding">
              At N=5000 (~276k tokens), the baseline is infeasible — the registry document exceeds the
              200k context window and cannot be read. Iranti returned all 4 target facts correctly via
              exact key lookup. This is the first positive differential in the benchmark program: Iranti
              4/4, baseline 0/4.
            </Callout>
          </div>
        </section>

        {/* ── Chart 1: Accuracy vs Scale ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Accuracy vs scale</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Both arms at ceiling across all tested N
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
              Both arms at ceiling through N=1000. At N=5000 (~276k tokens), the baseline becomes
              infeasible — the haystack document exceeds Claude&apos;s 200k context window. Iranti
              returned 4/4 facts via exact key lookup. The dashed region marks where baseline
              context-reading can no longer run.
            </p>
            <AccuracyChart />
          </div>
        </section>

        {/* ── What this measures ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Methodology</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">What this measures</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              In production multi-agent systems, agents accumulate many facts about many entities
              across their lifetime. If those facts live in context, retrieval precision degrades as
              transcript length grows — the model has more to sort through, with more surface area for
              confusion. If facts live in a structured KB, retrieval is an O(1) exact lookup unaffected
              by how many other entities exist.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B1 tests this directly: we embed two target entities (&quot;needle&quot; entities) among N
              distractor entities, ask 10 questions about the needle entities, and compare
              context-reading accuracy against Iranti&apos;s{" "}
              <code className="font-mono text-sm text-[var(--text-code)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                iranti_query(entity, key)
              </code>{" "}
              lookup.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed border-l-2 border-[var(--border-subtle)] pl-4">
              Inspired by Greg Kamradt&apos;s Needle-in-a-Haystack (2023) and RULER (Hsieh et al., 2024).
              Our adaptation replaces the sentence needle with a structured entity/key fact and replaces
              document-position variation with entity-count variation.
            </p>
          </div>
        </section>

        {/* ── Conditions ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Conditions</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Tested scales</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-[var(--border-light)]">
                    <th className="pb-3 pr-6 text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Condition</th>
                    <th className="pb-3 pr-6 text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Haystack size</th>
                    <th className="pb-3 text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: "N=5",              tokens: "~400 tok",  note: "Short haystack — high signal-to-noise" },
                    { c: "N=20",             tokens: "~1.6k tok", note: "Medium haystack" },
                    { c: "N=20+adversarial", tokens: "~1.6k tok", note: "Wrong values injected for needle entities to test confound resistance" },
                    { c: "N=100",            tokens: "~8k tok",   note: "Larger haystack — both arms still at ceiling" },
                    { c: "N=500",            tokens: "~28k tok",  note: "Long context — both arms still at ceiling" },
                    { c: "N=1000",           tokens: "~57k tok",  note: "Null differential confirmed — both arms at ceiling through ~57k tokens" },
                    { c: "N=5000",           tokens: "~276k tok", note: "First positive differential: Iranti 4/4, baseline infeasible (document exceeds 200k context window)" },
                  ].map((row) => (
                    <tr key={row.c} className="border-t border-[var(--border-subtle)]">
                      <td className="py-3 pr-6 text-xs font-mono text-[var(--text-code)]">{row.c}</td>
                      <td className="py-3 pr-6 text-xs font-mono text-[var(--text-faint)]">{row.tokens}</td>
                      <td className="py-3 text-xs text-[var(--text-muted)]">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── Needle entities ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Test data</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">The needle entities</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6">
              Two fictional researchers with four facts each. Embedded at a fixed position in every haystack.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {NEEDLE_ENTITIES.map((e) => (
                <div
                  key={e.id}
                  className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl"
                >
                  <div className="text-[10px] font-mono text-teal-400 mb-4 tracking-wide">{e.id}</div>
                  <div className="space-y-2.5">
                    {e.facts.map(([k, v]) => (
                      <div key={k} className="flex gap-3 text-xs">
                        <span className="font-mono text-[var(--text-faint)] w-36 flex-shrink-0">{k}</span>
                        <span className="text-[var(--text-secondary)]">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Retrieval Matrix ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Write arm trial results</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Full ingest → retrieve cycle
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8">
              Both entities written to KB via{" "}
              <code className="font-mono text-xs text-[var(--text-code)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                iranti_write
              </code>
              , then retrieved via{" "}
              <code className="font-mono text-xs text-[var(--text-code)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                iranti_query
              </code>{" "}
              with no haystack document in context. Tests the full pipeline — not just retrieval from
              pre-existing KB data. Each cell below represents one trial.
            </p>
            <RetrievalMatrix />

            {/* Supplementary table */}
            <div className="mt-10 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-[var(--border-light)]">
                    <th className="pb-3 pr-4 text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Trial</th>
                    <th className="pb-3 pr-4 text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Entity</th>
                    <th className="pb-3 pr-4 text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Key</th>
                    <th className="pb-3    text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {WRITE_ARM_TRIALS.map((r) => (
                    <tr key={r.trial} className="border-t border-[var(--border-subtle)]">
                      <td className="py-2.5 pr-4 text-xs font-mono text-[var(--text-faint)]">{r.trial}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono text-[var(--text-secondary)]">{r.entity}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono text-[var(--text-secondary)]">{r.key}</td>
                      <td className="py-2.5 text-xs text-teal-400 font-mono">✓ correct</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-3">
              Write arm accuracy: 8/8 (100%). Recall: 8/8. Precision: 8/8.
            </p>
          </div>
        </section>

        {/* ── Provenance card ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>The metadata advantage</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Provenance, not just value
            </h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
              Every{" "}
              <code className="font-mono text-xs text-[var(--text-code)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">
                iranti_query
              </code>{" "}
              result includes confidence, source, timestamp, and contested status. Context-reading returns
              a value and nothing else. The metadata is what allows downstream agents to reason about
              reliability — without needing to re-read the source document.
            </p>
            <ProvenanceCard />
          </div>
        </section>

        {/* ── Key findings ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <SectionLabel>Analysis</SectionLabel>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Key findings and limitations</h2>
            <div className="space-y-3">
              <Callout type="finding">
                <strong>Iranti retrieval is O(1) and deterministic.</strong> The same query returns the
                same result regardless of how many other entities exist in the KB. Baseline
                context-reading degrades in principle at scale — but we have not yet found that
                threshold with Claude Sonnet 4.6.
              </Callout>
              <Callout type="finding">
                <strong>Semantic search is not a substitute for exact query.</strong> A side test
                comparing{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">
                  iranti_search
                </code>{" "}
                (semantic) vs{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">
                  iranti_query
                </code>{" "}
                (exact) found the semantic path returned the target fact in 5th position — not first.
                For structured fact retrieval, exact key lookup is the correct tool.
              </Callout>
              <Callout type="finding">
                <strong>Retrieved facts include provenance.</strong> Every{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">
                  iranti_query
                </code>{" "}
                result includes{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">confidence</code>
                ,{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">source</code>,{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">validFrom</code>
                , and{" "}
                <code className="font-mono text-xs bg-[var(--bg-surface)] px-1 rounded">contested</code>{" "}
                fields. Context-reading returns none of this metadata.
              </Callout>
              <Callout type="finding">
                <strong>First positive differential at N=5000.</strong> At N=5000 (~276k tokens), the
                haystack document exceeds the 200k context window — baseline context-reading is
                infeasible. Iranti returned 4/4 facts correctly via exact key lookup. This is the
                condition the program was built to find: Iranti 4/4, baseline 0/4.
              </Callout>
              <Callout type="warn">
                <strong>Infeasible is not the same as degraded.</strong> The baseline scored 0/4 because
                the test could not be attempted — not because the model failed to find the needle. Both
                are a practical outcome of the same thing (no answer), but they differ technically. In
                either case, context-reading cannot serve a 5,000-entity knowledge base; Iranti can.
              </Callout>
              <Callout type="warn">
                <strong>Self-evaluation bias.</strong> The same model (Claude Sonnet 4.6) designed the
                test, ran the baseline arm, and evaluated answers. Self-consistency effects may inflate
                baseline scores. Independent evaluation infrastructure is required for
                publication-grade claims.
              </Callout>
              <Callout type="warn">
                <strong>Small-n caution.</strong> The largest arm uses 10 trials. Sample sizes are too
                small to make statistical claims. All results are directional — appropriate for
                development feedback, not benchmarking papers.
              </Callout>
            </div>
          </div>
        </section>

        {/* ── Raw data ── */}
        <section className="px-6 py-14 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-widest mb-1.5">
                Raw data
              </div>
              <p className="text-sm text-[var(--text-muted)] max-w-md">
                Full trial execution records, baseline runs, dataset definitions, and statistical notes
                are in the benchmarking repository.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href="https://github.com/nfemmanuel/iranti-benchmarking"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg font-mono transition-colors"
              >
                iranti-benchmarking →
              </a>
              <Link
                href="/benchmarks"
                className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-sm font-mono transition-colors"
              >
                ← all benchmarks
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
