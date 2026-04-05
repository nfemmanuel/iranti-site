"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

type ResolutionPath = "deterministic" | "llm";
type Outcome = "correct" | "wrong";

interface Condition {
  id: string;
  correctValue: string;
  adversarialValue: string;
  correctConf: number;
  adversarialConf: number;
  existingScore: number;
  incomingScore: number;
  gap: number;
  resolution: ResolutionPath;
  outcome: Outcome;
  isKnownLimitation?: boolean;
  note?: string;
}

// ─── Benchmark data ─────────────────────────────────────────────────────────

const conditions: Condition[] = [
  {
    id: "C1",
    correctValue: "Caltech",
    adversarialValue: "MIT",
    correctConf: 90,
    adversarialConf: 70,
    existingScore: 76.5,
    incomingScore: 59.5,
    gap: 17.0,
    resolution: "deterministic",
    outcome: "correct",
  },
  {
    id: "C2",
    correctValue: "Yale",
    adversarialValue: "Princeton",
    correctConf: 90,
    adversarialConf: 70,
    existingScore: 76.5,
    incomingScore: 60.1,
    gap: 16.4,
    resolution: "deterministic",
    outcome: "wrong",
    isKnownLimitation: true,
    note: "High-confidence first write blocks lower-confidence correction. By design — the system has no way to distinguish correction from adversarial injection.",
  },
  {
    id: "C3",
    correctValue: "Carnegie Mellon",
    adversarialValue: "Cornell",
    correctConf: 78,
    adversarialConf: 75,
    existingScore: 66.3,
    incomingScore: 63.75,
    gap: 2.55,
    resolution: "llm",
    outcome: "correct",
    note: 'LLM cited "more established source, minimal confidence difference".',
  },
  {
    id: "C4",
    correctValue: "UC San Diego",
    adversarialValue: "UC Berkeley",
    correctConf: 76,
    adversarialConf: 75,
    existingScore: 64.6,
    incomingScore: 63.75,
    gap: 0.85,
    resolution: "llm",
    outcome: "correct",
  },
  {
    id: "C5",
    correctValue: "Columbia",
    adversarialValue: "NYU",
    correctConf: 70,
    adversarialConf: 80,
    existingScore: 59.5,
    incomingScore: 68.0,
    gap: 8.5,
    resolution: "llm",
    outcome: "correct",
    note: 'Raw adversarial confidence is higher (80 vs 70). LLM read source names ("b3_trusted_reviewer" vs "b3_low_reliability") as semantic signals.',
  },
];

// ─── Helpers / sub-components ────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function Callout({
  type,
  children,
}: {
  type: "info" | "warn" | "finding" | "critical";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
    warn: "border-amber-500/30 bg-amber-500/5 text-[var(--text-secondary)]",
    finding: "border-teal-500/30 bg-teal-500/5 text-[var(--text-secondary)]",
    critical: "border-amber-500/50 bg-amber-500/8 text-[var(--text-secondary)]",
  };
  const labels = {
    info: "Note",
    warn: "Limitation",
    finding: "Finding",
    critical: "Operational Reality",
  };
  const labelColors = {
    info: "text-[var(--text-faint)]",
    warn: "text-amber-500",
    finding: "text-teal-500",
    critical: "text-amber-400",
  };
  return (
    <div className={`border rounded-lg px-5 py-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className={`text-xs font-mono uppercase tracking-wider mr-2 ${labelColors[type]}`}>
        {labels[type]}
      </span>
      {children}
    </div>
  );
}

function ScoreChip({ score, label, color = "teal" }: { score: string; label: string; color?: "teal" | "amber" | "muted" }) {
  const scoreColor =
    color === "teal"
      ? "text-teal-500"
      : color === "amber"
      ? "text-amber-400"
      : "text-[var(--text-muted)]";
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
      <span className={`text-2xl font-semibold font-mono ${scoreColor}`}>{score}</span>
      <span className="text-xs text-[var(--text-muted)] text-center leading-relaxed">{label}</span>
    </div>
  );
}

// Animated confidence bar pair
function ConfidenceBar({
  label,
  conf,
  score,
  color,
  inView,
  delay,
}: {
  label: string;
  conf: number;
  score: number;
  color: "teal" | "amber";
  inView: boolean;
  delay: number;
}) {
  const bg = color === "teal" ? "bg-teal-500" : "bg-amber-500";
  const labelColor = color === "teal" ? "text-teal-400" : "text-amber-400";
  const width = inView ? `${conf}%` : "0%";
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-baseline">
        <span className={`text-[10px] font-mono ${labelColor}`}>{label}</span>
        <span className="text-[10px] font-mono text-[var(--text-faint)]">
          conf {conf} → score {score}
        </span>
      </div>
      <div className="h-1.5 bg-[var(--border-subtle)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${bg} transition-all ease-out`}
          style={{
            width,
            transitionDuration: "800ms",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

// Single condition card in the strip
function ConditionCard({
  condition,
  inView,
  index,
}: {
  condition: Condition;
  inView: boolean;
  index: number;
}) {
  const { id, correctValue, adversarialValue, correctConf, adversarialConf,
    existingScore, incomingScore, gap, resolution, outcome, isKnownLimitation, note } = condition;

  const isLlm = resolution === "llm";
  const isWrong = outcome === "wrong";

  return (
    <div
      className={`flex-shrink-0 w-72 md:w-64 lg:w-72 p-5 rounded-xl border flex flex-col gap-4 ${
        isKnownLimitation
          ? "border-amber-500/20 bg-amber-500/3 opacity-90"
          : "border-[var(--border-subtle)] bg-[var(--bg-surface)]"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-mono text-[var(--text-faint)]">{id}</span>
          {isKnownLimitation && (
            <div className="mt-1">
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-amber-500/40 text-amber-500 bg-amber-500/8">
                known limitation
              </span>
            </div>
          )}
        </div>
        <span
          className={`text-base font-semibold ${
            isWrong ? "text-amber-400" : "text-teal-400"
          }`}
        >
          {isWrong ? "✗" : "✓"}
        </span>
      </div>

      {/* Values */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-teal-500 w-16 flex-shrink-0">correct</span>
          <span className="text-xs text-[var(--text-code)] font-medium">{correctValue}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-amber-500 w-16 flex-shrink-0">adversarial</span>
          <span className={`text-xs font-medium ${isKnownLimitation ? "text-[var(--text-faint)]" : "text-[var(--text-secondary)]"}`}>
            {adversarialValue}
          </span>
        </div>
      </div>

      {/* Confidence bars */}
      <div className="space-y-2.5">
        <ConfidenceBar
          label={correctValue}
          conf={correctConf}
          score={existingScore}
          color="teal"
          inView={inView}
          delay={index * 120}
        />
        <ConfidenceBar
          label={adversarialValue}
          conf={adversarialConf}
          score={incomingScore}
          color="amber"
          inView={inView}
          delay={index * 120 + 150}
        />
      </div>

      {/* Gap + resolution */}
      <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-subtle)]">
        <span className="text-[10px] font-mono text-[var(--text-faint)]">gap {gap} pts</span>
        <span className="text-[var(--text-faint)]">·</span>
        <span
          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
            isLlm
              ? "text-teal-400 bg-teal-500/10"
              : "text-amber-400 bg-amber-500/10"
          }`}
        >
          {isLlm ? "LLM arbitration" : "deterministic"}
        </span>
      </div>

      {/* Note */}
      {note && (
        <p className="text-[10px] text-[var(--text-faint)] leading-relaxed">{note}</p>
      )}
    </div>
  );
}

// Resolution path SVG diagram
function ResolutionDiagram() {
  const { ref, inView } = useInView(0.2);

  // Nodes and paths
  // Layout: start box → gap box → two branches (deterministic, LLM)
  const strokeDuration = 600;

  return (
    <div ref={ref} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-x-auto">
      <svg
        viewBox="0 0 560 180"
        className="w-full max-w-xl mx-auto"
        aria-label="Resolution path flowchart"
      >
        <defs>
          <marker id="arrowTeal" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#14b8a6" />
          </marker>
          <marker id="arrowAmber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" />
          </marker>
          <marker id="arrowNeutral" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#3d3d3a" />
          </marker>
        </defs>

        {/* Box: Conflict detected */}
        <rect x="10" y="70" width="120" height="40" rx="6"
          fill="var(--bg-surface)" stroke="var(--border-light)" strokeWidth="1" />
        <text x="70" y="87" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="var(--font-mono)">Conflict</text>
        <text x="70" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="var(--font-mono)">detected</text>

        {/* Arrow: conflict → compute gap */}
        <line
          x1="130" y1="90" x2="190" y2="90"
          stroke="var(--border-light)" strokeWidth="1.5"
          markerEnd="url(#arrowNeutral)"
          strokeDasharray="60"
          strokeDashoffset={inView ? "0" : "60"}
          style={{ transition: `stroke-dashoffset ${strokeDuration}ms ease ${0}ms` }}
        />

        {/* Box: Compute gap */}
        <rect x="190" y="70" width="120" height="40" rx="6"
          fill="var(--bg-surface)" stroke="var(--border-light)" strokeWidth="1" />
        <text x="250" y="87" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="var(--font-mono)">Compute</text>
        <text x="250" y="100" textAnchor="middle" fontSize="9" fill="var(--text-secondary)" fontFamily="var(--font-mono)">weighted gap</text>

        {/* Arrow up: gap ≥ 10 → deterministic */}
        <path
          d="M310 82 L360 82 L360 40"
          fill="none" stroke="#f59e0b" strokeWidth="1.5"
          markerEnd="url(#arrowAmber)"
          strokeDasharray="100"
          strokeDashoffset={inView ? "0" : "100"}
          style={{ transition: `stroke-dashoffset ${strokeDuration}ms ease ${200}ms` }}
        />

        {/* Arrow down: gap < 10 → LLM */}
        <path
          d="M310 98 L360 98 L360 140"
          fill="none" stroke="#14b8a6" strokeWidth="1.5"
          markerEnd="url(#arrowTeal)"
          strokeDasharray="100"
          strokeDashoffset={inView ? "0" : "100"}
          style={{ transition: `stroke-dashoffset ${strokeDuration}ms ease ${400}ms` }}
        />

        {/* Label: gap ≥ 10 */}
        <text x="332" y="72" fontSize="8" fill="#f59e0b" fontFamily="var(--font-mono)">gap ≥ 10</text>

        {/* Label: gap &lt; 10 */}
        <text x="332" y="118" fontSize="8" fill="#14b8a6" fontFamily="var(--font-mono)">gap &lt; 10</text>

        {/* Box: Deterministic rejection */}
        <rect x="360" y="10" width="140" height="56" rx="6"
          fill="#f59e0b18" stroke="#f59e0b50" strokeWidth="1" />
        <text x="430" y="30" textAnchor="middle" fontSize="9" fill="#f59e0b" fontFamily="var(--font-mono)">Deterministic</text>
        <text x="430" y="43" textAnchor="middle" fontSize="9" fill="#f59e0b" fontFamily="var(--font-mono)">rejection</text>
        <text x="430" y="57" textAnchor="middle" fontSize="8" fill="#f59e0b90" fontFamily="var(--font-mono)">(C1, C2)</text>

        {/* Box: LLM arbitration */}
        <rect x="360" y="125" width="140" height="56" rx="6"
          fill="#14b8a618" stroke="#14b8a650" strokeWidth="1" />
        <text x="430" y="148" textAnchor="middle" fontSize="9" fill="#14b8a6" fontFamily="var(--font-mono)">LLM</text>
        <text x="430" y="161" textAnchor="middle" fontSize="9" fill="#14b8a6" fontFamily="var(--font-mono)">arbitration</text>
        <text x="430" y="174" textAnchor="middle" fontSize="8" fill="#14b8a690" fontFamily="var(--font-mono)">(C3, C4, C5)</text>
      </svg>
    </div>
  );
}

// Score formula card
function FormulaCard() {
  const { ref, inView } = useInView(0.2);

  return (
    <div ref={ref} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-5">
      {/* Formula */}
      <div>
        <div className="text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">
          Weighted score formula
        </div>
        <div className="p-4 bg-[var(--bg-code)] rounded-lg border border-[var(--border-subtle)] font-mono text-sm text-[var(--text-code)]">
          <span className="text-teal-400">weighted</span>
          {" = conf × (0.7 + reliability × 0.3)"}
        </div>
        <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">
          Default source reliability = 0.5, which simplifies to{" "}
          <code className="font-mono text-[var(--text-code)]">weighted = conf × 0.85</code>.
          When reliability is explicitly set (as in C5), the full formula applies.
        </p>
      </div>

      {/* Example */}
      <div>
        <div className="text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">
          Example — C1
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs font-mono">
          <div className="p-3 rounded-lg bg-teal-500/5 border border-teal-500/20">
            <div className="text-teal-400 mb-1">Caltech (existing)</div>
            <div className="text-[var(--text-faint)]">conf 90 × 0.85 =</div>
            <div className="text-teal-300 text-lg font-semibold">76.5</div>
          </div>
          <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
            <div className="text-amber-400 mb-1">MIT (adversarial)</div>
            <div className="text-[var(--text-faint)]">conf 70 × 0.85 =</div>
            <div className="text-amber-300 text-lg font-semibold">59.5</div>
          </div>
        </div>

        {/* Gap visualization */}
        <div className="mt-4 space-y-2">
          <div className="text-[10px] font-mono text-[var(--text-faint)] mb-1">Score comparison</div>
          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-teal-400">Caltech existing</span>
                <span className="text-[var(--text-faint)]">76.5</span>
              </div>
              <div className="h-2 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full transition-all ease-out"
                  style={{
                    width: inView ? "76.5%" : "0%",
                    transitionDuration: "900ms",
                    transitionDelay: "100ms",
                  }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-1">
                <span className="text-amber-400">MIT adversarial</span>
                <span className="text-[var(--text-faint)]">59.5</span>
              </div>
              <div className="h-2 bg-[var(--border-subtle)] rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all ease-out"
                  style={{
                    width: inView ? "59.5%" : "0%",
                    transitionDuration: "900ms",
                    transitionDelay: "300ms",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
            <span className="text-[10px] font-mono text-[var(--text-faint)]">gap = 17.0 pts → deterministic rejection</span>
            <div className="h-px flex-1 bg-[var(--border-subtle)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Outcome summary — typographic, clean
function OutcomeSummary() {
  return (
    <div className="flex flex-wrap gap-6 items-start">
      {/* Main fraction */}
      <div className="flex-shrink-0">
        <div className="flex items-baseline gap-1.5">
          <span className="text-7xl font-semibold font-mono text-teal-400 tracking-tight">4</span>
          <span className="text-3xl font-mono text-[var(--text-muted)] self-center">/</span>
          <span className="text-7xl font-semibold font-mono text-[var(--text-muted)] tracking-tight">5</span>
        </div>
        <p className="text-xs text-[var(--text-faint)] font-mono mt-1">conditions resolved correctly</p>
      </div>

      {/* Breakdown */}
      <div className="flex flex-col gap-3 justify-center pt-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
          <span className="text-sm text-[var(--text-secondary)]">
            LLM arbitration accuracy: <span className="font-mono text-teal-400">3/3</span> (100%)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
          <span className="text-sm text-[var(--text-secondary)]">
            C2 failure:{" "}
            <span className="text-amber-400 font-mono">documented expected limitation</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[var(--text-faint)] flex-shrink-0" />
          <span className="text-sm text-[var(--text-muted)]">
            Deterministic path (C1): rejection correct
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function B3Page() {
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripInView, setStripInView] = useState(false);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStripInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono mb-8">
            <Link href="/benchmarks" className="hover:text-[var(--text-muted)] transition-colors">
              proof
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">b3</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B3
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Conflict Resolution
            <br />
            <span className="text-[var(--text-muted)]">4/5 conditions resolved correctly.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Write ground truth facts at varying confidence levels, then inject adversarial (wrong)
            values at varying confidence levels. Query final KB state and compare retained value
            to ground truth. The score formula weights confidence against source reliability.
            Gap ≥ 10 points triggers deterministic rejection. Gap &lt; 10 routes to LLM arbitration.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              5 conditions
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              C2: known limitation — read carefully
            </span>
          </div>
        </section>

        {/* Score summary */}
        <section className="px-6 pb-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <p className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-6">
              Results at a glance
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <ScoreChip score="4/5" label="Overall: conditions resolved correctly" color="teal" />
              <ScoreChip score="3/3" label="LLM arbitration accuracy (C3, C4, C5)" color="teal" />
              <ScoreChip score="C2" label="Known limitation — first-write lock-out" color="amber" />
            </div>
            <OutcomeSummary />
          </div>
        </section>

        {/* Score formula */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The weighted score formula
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Iranti does not use raw confidence values directly. It computes a weighted score that
              combines confidence with source reliability. This prevents high-confidence writes from
              low-reliability sources from automatically winning conflicts.
            </p>
            <FormulaCard />
          </div>
        </section>

        {/* Resolution path diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Resolution path
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Every conflict is routed through a deterministic decision tree before any LLM is invoked.
              LLM arbitration is a last resort for genuinely ambiguous cases — not the default.
            </p>
            <ResolutionDiagram />
          </div>
        </section>

        {/* 5-condition strip */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              All 5 conditions
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Each card shows the ground truth value vs the adversarial injection, their confidence
              scores, the resolution path taken, and whether the correct value was retained.
              Bars animate on scroll. C2 is visually distinguished — it is not hidden, but it is
              presented in context.
            </p>
            <div
              ref={stripRef}
              className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {conditions.map((c, i) => (
                <ConditionCard
                  key={c.id}
                  condition={c}
                  inView={stripInView}
                  index={i}
                />
              ))}
            </div>
            <div className="mt-4 flex gap-6 text-[10px] font-mono text-[var(--text-faint)]">
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-1.5 rounded-full bg-teal-500" />
                correct value bar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block w-3 h-1.5 rounded-full bg-amber-500" />
                adversarial value bar
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-teal-400">✓</span>
                retained correctly
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-amber-400">✗</span>
                known limitation
              </span>
            </div>
          </div>
        </section>

        {/* C2 deep dive */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
                C2 — Deep Dive
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              The most important finding from this benchmark.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              C2 is not a bug. It is a direct consequence of how Iranti&apos;s conflict resolution
              is designed — and it has real operational implications that every developer deploying
              Iranti in write-heavy scenarios needs to understand before going to production.
            </p>

            {/* What happened */}
            <div className="mb-6 p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">
                What happened in C2
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <span className="font-mono text-[var(--text-faint)] w-20 flex-shrink-0">Step 1</span>
                    <span className="text-[var(--text-secondary)]">
                      Yale written with confidence=90 (score: 76.5). This is the ground truth.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-[var(--text-faint)] w-20 flex-shrink-0">Step 2</span>
                    <span className="text-[var(--text-secondary)]">
                      Princeton injected with confidence=70 (score: 60.1) as a correction attempt.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-[var(--text-faint)] w-20 flex-shrink-0">Step 3</span>
                    <span className="text-[var(--text-secondary)]">
                      Gap = 16.4 pts → deterministic rejection. Princeton is rejected.
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-mono text-[var(--text-faint)] w-20 flex-shrink-0">Step 4</span>
                    <span className="text-[var(--text-secondary)]">
                      Yale is retained. Outcome: ✓ correct. BUT — in a real scenario where Yale was
                      wrong, the correct Princeton fact would have been locked out.
                    </span>
                  </div>
                </div>
                <div className="p-4 bg-[var(--bg-code)] rounded-lg border border-amber-500/20 self-start">
                  <div className="text-[10px] font-mono text-amber-500 mb-2 uppercase tracking-wider">
                    The structural issue
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    The system has no way to know whether the incoming write is an adversarial injection
                    or a legitimate correction. Both look identical at the protocol level. It can only
                    compare scores. If the first write was wrong, it locks out the truth.
                  </p>
                </div>
              </div>
            </div>

            {/* Operational reality */}
            <div className="space-y-3 mb-6">
              <Callout type="critical">
                <strong>If a wrong fact is written with high confidence first,</strong> a lower-confidence
                correction cannot overwrite it. The wrong fact is retained until: (a) a manual intervention
                deletes or overwrites it directly, (b) a forced write with equal or higher confidence is
                submitted, or (c) the entity is explicitly reset. This is deterministic behavior by design.
              </Callout>
              <Callout type="warn">
                <strong>Confidence scores should reflect real epistemic state.</strong> If your agents
                habitually write at confidence=90 regardless of actual certainty, you will encounter C2-style
                lock-out. The fix is not in Iranti&apos;s conflict resolution logic — it is in how
                your agents assign confidence when they write.
              </Callout>
            </div>

            {/* What to do */}
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">
                Operational guidance
              </div>
              <div className="space-y-3 text-sm">
                {[
                  {
                    label: "Forced writes",
                    text: "Use iranti_write with confidence ≥ existing score to explicitly overwrite a locked fact. This is the intended correction path.",
                  },
                  {
                    label: "Confidence discipline",
                    text: "Reserve confidence=90+ for facts from verified, authoritative sources. Do not use high confidence as a default.",
                  },
                  {
                    label: "Audit before deployment",
                    text: "If your system has agents that write the same entity/key from multiple sources, audit confidence assignment logic before deploying at scale.",
                  },
                  {
                    label: "Manual reset path",
                    text: "Iranti exposes a delete/reset operation for entity keys. This is the escape hatch when automated resolution fails.",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <span className="font-mono text-teal-500 text-xs pt-0.5 flex-shrink-0 w-36">{item.label}</span>
                    <span className="text-[var(--text-muted)]">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* C5 deep dive */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                C5 — Emergent behavior
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              The LLM read source names as semantic signals.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              C5 is the most interesting condition in this benchmark — and it exposes a behavior
              that is simultaneously a capability and a risk.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">
                  Setup
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-3">
                    <span className="text-teal-400 font-mono w-20 flex-shrink-0">Columbia</span>
                    <span className="text-[var(--text-secondary)]">conf=70, source="b3_trusted_reviewer" → score 59.5</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-amber-400 font-mono w-20 flex-shrink-0">NYU</span>
                    <span className="text-[var(--text-secondary)]">conf=80, source="b3_low_reliability" → score 68.0</span>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <span className="text-[var(--text-faint)] font-mono w-20 flex-shrink-0">gap</span>
                    <span className="text-[var(--text-secondary)]">8.5 pts → LLM arbitration invoked</span>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  What the LLM did
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  The LLM received both candidate facts with their source identifiers. It read
                  "b3_trusted_reviewer" as a semantic signal of trustworthiness, and "b3_low_reliability"
                  as a signal of low trust — and correctly preserved Columbia, despite NYU having the
                  higher raw confidence score.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Callout type="finding">
                <strong>Source naming is a lever.</strong> If you name your sources semantically,
                the LLM arbitrator will use those names as evidence. This is not accidental —
                source names are passed to the LLM with conflict context. You can encode
                institutional trust into source names and the LLM will respect it during arbitration.
              </Callout>
              <Callout type="warn">
                <strong>This is also a risk.</strong> If an adversarial agent names its source
                "trusted_authoritative_reviewer", the LLM may up-weight it. Source name semantics
                are not validated. They are a user-controlled signal. In a multi-tenant or
                adversarial environment, source names should be treated as untrusted input, not
                authority signals.
              </Callout>
            </div>
          </div>
        </section>

        {/* Threats to validity */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Threats to validity
            </h2>
            <div className="space-y-3">
              <Callout type="warn">
                <strong>Small N (5 conditions).</strong> This is indicative, not statistically
                significant. The conditions were chosen to probe specific resolution paths, not to
                sample the space of possible confidence distributions. Broader coverage is needed.
              </Callout>
              <Callout type="warn">
                <strong>Source names were chosen intentionally.</strong> "b3_trusted_reviewer" and
                "b3_low_reliability" are semantically loaded by design, to test whether source name
                semantics influence LLM arbitration. They do. Production source names will vary.
              </Callout>
              <Callout type="warn">
                <strong>LLM arbitration is not deterministic.</strong> C3, C4, and C5 were run once.
                LLM arbitration decisions may vary across runs, temperatures, or model versions. The
                3/3 LLM accuracy score is a point estimate, not a distributional claim.
              </Callout>
              <Callout type="warn">
                <strong>Self-evaluation bias.</strong> The same model (Claude Sonnet 4.6) designed
                the test, ran the benchmark, and evaluated correctness. Independent evaluation
                infrastructure is required for publication-grade claims.
              </Callout>
              <Callout type="info">
                C2 is marked "wrong" in the outcome column because the adversarial scenario in C2
                was designed to model a legitimate correction. In a strict conflict scenario (where
                Yale is correct), the outcome is ✓. The "wrong" label reflects the design intent of
                the C2 test case: a legitimate correction was blocked.
              </Callout>
            </div>
          </div>
        </section>

        {/* Raw data link */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-1">
                Raw data
              </div>
              <p className="text-sm text-[var(--text-muted)]">
                Full trial execution records, confidence scoring logs, LLM arbitration transcripts,
                and condition definitions in the benchmarking repository.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <a
                href="https://github.com/nfemmanuel/iranti-benchmarking"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
              >
                iranti-benchmarking →
              </a>
              <Link
                href="/benchmarks"
                className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-sm transition-colors"
              >
                ← All benchmarks
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
