"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

interface AuroraFact {
  key: string;
  value: string;
}

const AURORA_FACTS: AuroraFact[] = [
  { key: "lead_architect", value: '"Marcus Chen"' },
  { key: "stack", value: '"Rust + WebAssembly"' },
  { key: "target_platform", value: '"browser-native execution"' },
  { key: "current_milestone", value: '"M3: performance benchmarking"' },
  { key: "risk_flag", value: '"WASM memory model edge cases"' },
];

interface ConditionRow {
  label: string;
  observeCall: string;
  factsMatched: number;
  factsTotal: number;
  agentCorrect: string;
  score: number;
  scoreTotal: number;
  status: "pass" | "partial" | "fail";
}

const CONDITIONS: ConditionRow[] = [
  {
    label: "Full recovery",
    observeCall: "Yes, exact entity",
    factsMatched: 5,
    factsTotal: 5,
    agentCorrect: "Yes",
    score: 5,
    scoreTotal: 5,
    status: "pass",
  },
  {
    label: "Partial recovery",
    observeCall: "Yes, partial pattern",
    factsMatched: 3,
    factsTotal: 5,
    agentCorrect: "Partially",
    score: 3,
    scoreTotal: 5,
    status: "partial",
  },
  {
    label: "Cold start (baseline)",
    observeCall: "No",
    factsMatched: 0,
    factsTotal: 5,
    agentCorrect: "No",
    score: 0,
    scoreTotal: 5,
    status: "fail",
  },
  {
    label: "Auto-detection (v0.2.16)",
    observeCall: "Yes, no hint (auto)",
    factsMatched: 5,
    factsTotal: 6,
    agentCorrect: "Partially",
    score: 5,
    scoreTotal: 6,
    status: "partial",
  },
];

// ─── Shared components ────────────────────────────────────────────────────────

function ScoreChip({
  score,
  label,
  variant = "teal",
}: {
  score: string;
  label: string;
  variant?: "teal" | "muted" | "amber";
}) {
  const colorMap = {
    teal: "text-teal-500",
    muted: "text-[var(--text-muted)]",
    amber: "text-amber-500",
  };
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
      <span className={`text-2xl font-semibold font-mono ${colorMap[variant]}`}>
        {score}
      </span>
      <span className="text-xs text-[var(--text-muted)] text-center leading-relaxed">
        {label}
      </span>
    </div>
  );
}

function Callout({
  type,
  children,
}: {
  type: CalloutType;
  children: React.ReactNode;
}) {
  const styles: Record<CalloutType, string> = {
    info: "border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
    warn: "border-amber-500/30 bg-amber-500/5 text-[var(--text-secondary)]",
    finding: "border-teal-500/30 bg-teal-500/5 text-[var(--text-secondary)]",
  };
  const labels: Record<CalloutType, string> = {
    info: "Note",
    warn: "Limitation",
    finding: "Finding",
  };
  const labelColors: Record<CalloutType, string> = {
    info: "text-[var(--text-faint)]",
    warn: "text-amber-500",
    finding: "text-teal-500",
  };
  return (
    <div
      className={`border rounded-lg px-5 py-4 text-sm leading-relaxed ${styles[type]}`}
    >
      <span
        className={`text-xs font-mono uppercase tracking-wider mr-2 ${labelColors[type]}`}
      >
        {labels[type]}
      </span>
      {children}
    </div>
  );
}

// ─── Context Recovery Diagram ─────────────────────────────────────────────────

function RecoveryDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 720;
  const H = 180;
  const nodeW = 150;
  const nodeH = 64;
  const kbW = 140;
  const kbH = 64;
  const yCenter = H / 2;

  const session1X = nodeW / 2 + 24;
  const kbX = W / 2;
  const session2X = W - nodeW / 2 - 24;

  const writeX1 = session1X + nodeW / 2;
  const writeX2 = kbX - kbW / 2;
  const writeLen = writeX2 - writeX1;

  const readX1 = kbX + kbW / 2;
  const readX2 = session2X - nodeW / 2;
  const readLen = readX2 - readX1;

  const arrowY = yCenter - 10;
  const readArrowY = yCenter + 10;

  const lineStyle = (len: number, delay: number) =>
    revealed
      ? {
          strokeDasharray: len,
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 0.75s ease ${delay}s`,
        }
      : {
          strokeDasharray: len,
          strokeDashoffset: len,
          transition: "none",
        };

  const fadeIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 0.3s ease ${delay}s`,
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[720px] mx-auto"
        style={{ minWidth: 340 }}
        aria-label="Context recovery diagram: Session 1 writes 5 facts to Iranti KB. Session 2 starts cold and calls iranti_observe to reconstruct context."
      >
        {/* Session 1 node */}
        <rect
          x={session1X - nodeW / 2}
          y={yCenter - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#f59e0b"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x={session1X}
          y={yCenter - 10}
          textAnchor="middle"
          fontSize="11"
          fill="#f59e0b"
          fontFamily="monospace"
        >
          Session 1
        </text>
        <text
          x={session1X}
          y={yCenter + 8}
          textAnchor="middle"
          fontSize="9"
          fill="#d97706"
          fontFamily="monospace"
        >
          iranti_write ×5
        </text>

        {/* Iranti KB node */}
        <rect
          x={kbX - kbW / 2}
          y={yCenter - kbH / 2}
          width={kbW}
          height={kbH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <text
          x={kbX}
          y={yCenter - 10}
          textAnchor="middle"
          fontSize="11"
          fill="#14b8a6"
          fontFamily="monospace"
        >
          Iranti KB
        </text>
        <text
          x={kbX}
          y={yCenter + 8}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
        >
          project/aurora
        </text>

        {/* Session 2 node */}
        <rect
          x={session2X - nodeW / 2}
          y={yCenter - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="var(--border-light)"
          strokeWidth="1"
        />
        <text
          x={session2X}
          y={yCenter - 10}
          textAnchor="middle"
          fontSize="11"
          fill="var(--text-secondary)"
          fontFamily="monospace"
        >
          Session 2
        </text>
        <text
          x={session2X}
          y={yCenter + 8}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-muted)"
          fontFamily="monospace"
        >
          iranti_observe
        </text>

        {/* Write arrow: Session 1 → KB */}
        <line
          x1={writeX1}
          y1={arrowY}
          x2={writeX2 - 8}
          y2={arrowY}
          stroke="#f59e0b"
          strokeWidth="1.5"
          style={lineStyle(writeLen, 0.1)}
        />
        <polygon
          points={`${writeX2 - 8},${arrowY - 5} ${writeX2},${arrowY} ${writeX2 - 8},${arrowY + 5}`}
          fill="#f59e0b"
          style={fadeIn(0.85)}
        />
        <text
          x={(writeX1 + writeX2) / 2}
          y={arrowY - 8}
          textAnchor="middle"
          fontSize="9"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(0.9)}
        >
          write (5 facts)
        </text>

        {/* Read arrow: KB → Session 2 */}
        <line
          x1={readX1}
          y1={readArrowY}
          x2={readX2 - 8}
          y2={readArrowY}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={lineStyle(readLen, 0.9)}
        />
        <polygon
          points={`${readX2 - 8},${readArrowY - 5} ${readX2},${readArrowY} ${readX2 - 8},${readArrowY + 5}`}
          fill="#14b8a6"
          style={fadeIn(1.65)}
        />
        <text
          x={(readX1 + readX2) / 2}
          y={readArrowY + 16}
          textAnchor="middle"
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.7)}
        >
          observe (cold session)
        </text>

        {/* Break label */}
        <text
          x={W / 2}
          y={H - 10}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(1.8)}
        >
          session break — zero in-context knowledge at Session 2 start
        </text>
      </svg>
    </div>
  );
}

// ─── Conditions Comparison Table ──────────────────────────────────────────────

function ConditionsTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          CONDITIONS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => new Set(prev).add(i));
            }, i * 130);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const statusColors: Record<ConditionRow["status"], string> = {
    pass: "text-teal-500",
    partial: "text-amber-500",
    fail: "text-[var(--text-faint)]",
  };

  const statusLabels: Record<ConditionRow["status"], string> = {
    pass: "PASS",
    partial: "PARTIAL",
    fail: "FAIL",
  };

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-xs" style={{ minWidth: 580 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Condition
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
              observe() call
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
              Facts matched
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
              Agent correct
            </th>
            <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Score
            </th>
          </tr>
        </thead>
        <tbody>
          {CONDITIONS.map((row, i) => {
            const visible = visibleRows.has(i);
            return (
              <tr
                key={row.label}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-semibold text-[var(--text-primary)]">
                  {row.label}
                </td>
                <td className="py-3 px-4 font-mono text-[var(--text-muted)]">
                  {row.observeCall}
                </td>
                <td className="py-3 px-4 font-mono text-[var(--text-secondary)]">
                  {row.factsMatched}/{row.factsTotal}
                </td>
                <td className="py-3 px-4 text-[var(--text-secondary)]">
                  {row.agentCorrect}
                </td>
                <td
                  className={`py-3 pl-4 text-center font-mono font-semibold ${statusColors[row.status]}`}
                >
                  {row.score}/{row.scoreTotal}
                  <div className={`text-[10px] font-mono mt-0.5 ${statusColors[row.status]}`}>
                    {statusLabels[row.status]}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Relevance Ranking Bars ───────────────────────────────────────────────────

function RelevanceBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const bars = [
    { label: "Full recovery", score: 5, total: 5, status: "pass" as const },
    { label: "Partial recovery", score: 3, total: 5, status: "partial" as const },
    { label: "Cold start (baseline)", score: 0, total: 5, status: "fail" as const },
  ];

  return (
    <div ref={ref} className="space-y-5">
      {bars.map((bar, i) => {
        const pct = bar.total > 0 ? (bar.score / bar.total) * 100 : 0;
        const delay = i * 0.15;
        return (
          <div key={bar.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[var(--text-secondary)]">
                {bar.label}
              </span>
              <span
                className={`text-sm font-mono font-semibold ${
                  bar.status === "pass"
                    ? "text-teal-500"
                    : bar.status === "partial"
                    ? "text-amber-500"
                    : "text-[var(--text-faint)]"
                }`}
              >
                {bar.score}/{bar.total}
              </span>
            </div>
            <div
              className="h-3 rounded-full border border-[var(--border-subtle)] overflow-hidden bg-[var(--bg-surface)]"
            >
              <div
                className={`h-full rounded-full transition-none ${
                  bar.status === "pass"
                    ? "bg-teal-500"
                    : bar.status === "partial"
                    ? "bg-amber-500"
                    : ""
                }`}
                style={{
                  width: revealed ? `${pct}%` : "0%",
                  transition: revealed
                    ? `width 0.7s ease ${delay}s`
                    : "none",
                  opacity: bar.score === 0 ? 0 : 1,
                }}
              />
            </div>
          </div>
        );
      })}
      <p className="text-xs text-[var(--text-faint)] pt-1">
        Bar width = fraction of facts recovered. Full width = 5/5. Empty bar = 0/5 baseline (no observe call).
      </p>
    </div>
  );
}

// ─── Aurora Facts Table ───────────────────────────────────────────────────────

function AuroraFactsTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          AURORA_FACTS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => new Set(prev).add(i));
            }, i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-xs" style={{ minWidth: 400 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Key (under project/aurora)
            </th>
            <th className="pb-3 pl-4 text-left font-mono text-teal-500 uppercase tracking-wider text-[10px]">
              Value written
            </th>
          </tr>
        </thead>
        <tbody>
          {AURORA_FACTS.map((fact, i) => {
            const visible = visibleRows.has(i);
            return (
              <tr
                key={fact.key}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-mono text-[var(--text-code)]">
                  {fact.key}
                </td>
                <td className="py-3 pl-4 font-mono text-teal-500/80">
                  {fact.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Named Failures ───────────────────────────────────────────────────────────

function NamedFailureCard({
  id,
  name,
  children,
}: {
  id: string;
  name: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 bg-[var(--bg-surface)] border border-amber-500/20 rounded-xl">
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-mono text-amber-500 uppercase tracking-wider px-2 py-0.5 border border-amber-500/30 rounded">
          {id}
        </span>
        <span className="text-sm font-semibold text-[var(--text-primary)]">
          {name}
        </span>
      </div>
      <div className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {children}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B11Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono mb-8">
            <Link
              href="/benchmarks"
              className="hover:text-[var(--text-muted)] transition-colors"
            >
              proof
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">b11</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B11
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Context Recovery
            <br />
            <span className="text-[var(--text-muted)]">
              5/6 with hint. Auto-detection restored in v0.2.16.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            An agent writes 5 project facts to Iranti during Session 1. Session 2
            starts with zero in-context knowledge — no system prompt, no prior
            conversation. The agent calls{" "}
            <code className="font-mono text-[var(--text-code)]">
              iranti_observe
            </code>{" "}
            and attempts to reconstruct full working context from persistent
            memory alone.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              5 facts · 3 conditions
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              v0.2.16: auto-detection fixed, 1/6 gap unexplained
            </span>
          </div>
        </section>

        {/* Score summary */}
        <section className="px-6 pb-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <p className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-6">
              Results at a glance
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <ScoreChip
                score="5/5"
                label="Facts recovered in full-recovery condition (exact entity)"
              />
              <ScoreChip
                score="3/5"
                label="Facts recovered in partial-recovery condition (partial pattern)"
                variant="amber"
              />
              <ScoreChip
                score="0/5"
                label="Cold start baseline — no observe() call, no memory"
                variant="muted"
              />
              <ScoreChip
                score="5/6"
                label="Auto-detection (v0.2.16) — no hints required"
              />
            </div>
            <Callout type="finding">
              When the entity name matched exactly,{" "}
              <code className="font-mono text-sm">iranti_observe</code> injected
              all 5 facts and the agent answered correctly. Partial entity
              patterns yielded partial recovery. No observe call meant no memory
              — the agent fell back to training data.
            </Callout>
          </div>
        </section>

        {/* What this measures */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              What this measures
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              LLM agents have no persistent memory across sessions by default.
              When a session ends, everything in context is gone. The agent in
              the next session starts from scratch — it may hallucinate, pull
              from training data, or simply ask the user to re-explain what was
              already worked out.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B11 tests whether{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_observe
              </code>{" "}
              can serve as a reliable context recovery mechanism. The scenario is
              realistic: a project called Aurora has an ongoing technical
              workstream. 5 structured facts are written during Session 1. In
              Session 2, a new agent instance starts cold and must reconstruct
              working context without any human re-briefing.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Three conditions are tested: full recovery (exact entity match),
              partial recovery (pattern match returning a subset), and a cold
              start baseline (no memory call at all). The baseline is
              definitional — an agent that does not query memory cannot recover
              context from persistent storage.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Two named failure modes — entity drift and over-injection — were
              identified as sharp edges. Both are documented below.
            </p>
          </div>
        </section>

        {/* Recovery diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The context recovery flow
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Session 1 writes 5 facts via{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_write
              </code>
              . After the session break, Session 2 starts cold and calls{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_observe
              </code>{" "}
              to reconstruct context from the KB. No shared context exists
              between sessions except what is stored in Iranti.
            </p>
            <RecoveryDiagram />
          </div>
        </section>

        {/* Aurora facts */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The written context — project/aurora
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              5 structured facts written to{" "}
              <code className="font-mono text-[var(--text-code)]">
                project/aurora
              </code>{" "}
              during Session 1. These are the facts the agent in Session 2 must
              recover via{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_observe
              </code>
              .
            </p>
            <AuroraFactsTable />
          </div>
        </section>

        {/* Conditions table */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Recovery conditions
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Three conditions tested across the same fact set. Each condition
              varies what observe() was called with — or whether it was called at
              all.
            </p>
            <ConditionsTable />
          </div>
        </section>

        {/* Relevance ranking bars */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Facts recovered per condition
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Visual comparison of how many of the 5 project facts were injected
              into context under each recovery condition.
            </p>
            <RelevanceBars />
          </div>
        </section>

        {/* Named failures */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Named failure modes
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Two sharp edges were identified during B11. Both are structural
              properties of how{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_observe
              </code>{" "}
              works, not transient bugs.
            </p>
            <div className="space-y-4">
              <NamedFailureCard id="F1" name="Entity drift">
                <p className="mb-3">
                  If the agent uses a slightly different entity name at retrieve
                  time — for example,{" "}
                  <code className="font-mono text-[var(--text-code)] text-xs">
                    project/aurora
                  </code>{" "}
                  at write time but{" "}
                  <code className="font-mono text-[var(--text-code)] text-xs">
                    project/aurora_v2
                  </code>{" "}
                  at observe time —{" "}
                  <code className="font-mono text-[var(--text-code)] text-xs">
                    iranti_observe
                  </code>{" "}
                  returns nothing. There is no fuzzy matching.
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  This is a sharp edge for long-running projects where entity
                  naming evolves. The agent must use a consistent, stable entity
                  identifier at both write and observe time. Any drift in naming
                  convention — a suffix, a version tag, a case difference — will
                  silently produce zero context injection with no error signal.
                </p>
              </NamedFailureCard>
              <NamedFailureCard id="F2" name="Over-injection">
                <p className="mb-3">
                  <code className="font-mono text-[var(--text-code)] text-xs">
                    iranti_observe
                  </code>{" "}
                  injects all matching facts regardless of their relevance to the
                  current task. In a large knowledge base with many stored facts
                  under a broad entity pattern, this can flood the agent&apos;s
                  context window with unrelated information.
                </p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  In B11&apos;s controlled scenario (5 facts, single project), this was
                  not a problem. In production use with hundreds of stored facts
                  per project entity, over-injection may consume significant
                  context budget and degrade response quality by introducing
                  irrelevant facts that the agent must filter mentally. Task-scoped
                  observe patterns are advisable in dense KBs.
                </p>
              </NamedFailureCard>
            </div>
          </div>
        </section>

        {/* Honest limitations */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Honest limitations
            </h2>
            <div className="space-y-4">
              <Callout type="warn">
                <strong>Small n.</strong> Three conditions is enough to establish
                that observe()-based recovery works and to identify structural
                failure modes. It is not enough to characterize reliability
                across diverse project types, large knowledge bases, or
                adversarial entity naming patterns.
              </Callout>
              <Callout type="warn">
                <strong>Single session simulation.</strong> The session break
                was simulated within a single benchmark program, not tested
                across genuinely separate processes or API sessions. True
                cross-session isolation — where each session is a separate
                network call with no shared state — was not verified here.
              </Callout>
              <Callout type="warn">
                <strong>Entity naming sensitivity is a sharp edge.</strong>{" "}
                The partial recovery condition (3/5) was produced by a pattern
                match returning a subset — not by a naming mismatch. A full
                entity drift scenario (F1) would have produced 0/5 with no error
                signal. This risk is real and undercommunicated by the headline
                score.
              </Callout>
              <Callout type="info">
                <strong>Definitional baseline.</strong> The cold start 0/5
                result is not an empirical failure of Iranti — it is the
                expected result when the tool is not called. This baseline exists
                to establish what context recovery without memory looks like, not
                to benchmark a competing system.
              </Callout>
            </div>
          </div>
        </section>

        {/* Key findings */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Key findings
            </h2>
            <div className="space-y-4">
              <Callout type="finding">
                <strong>Exact entity match yields full recovery.</strong> When
                the agent observed{" "}
                <code className="font-mono text-sm">project/aurora</code> with
                the exact entity name used at write time, all 5 facts were
                injected and the agent answered correctly. Context recovery
                worked as designed.
              </Callout>
              <Callout type="finding">
                <strong>Entity naming is load-bearing.</strong> The difference
                between 5/5 and 0/5 recovery is a single string match. There is
                no fuzzy resolution, no intent-based lookup, no synonym handling.
                Stable, explicit entity identifiers are a first-class operational
                requirement for observe()-based workflows.
              </Callout>
              <Callout type="finding">
                <strong>Over-injection is a production concern, not a test
                concern.</strong> In B11&apos;s small KB, inject-all behavior
                caused no harm. In production KBs with hundreds of facts per
                project, context budget management requires task-scoped entity
                patterns or explicit observe filters.
              </Callout>
              <Callout type="finding">
                <strong>Cold start baseline confirms the value of the tool.</strong>{" "}
                Without{" "}
                <code className="font-mono text-sm">iranti_observe</code>, the
                agent had 0/5 factual grounding and answered from training data.
                The observe call is not optional for cross-session continuity —
                it is the mechanism.
              </Callout>
            </div>
          </div>
        </section>

        {/* v0.2.16 Update */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                v0.2.16 Update: Auto-Detection Fixed
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 border border-teal-500/30 text-teal-500 rounded">
                2026-03-21
              </span>
            </div>

            {/* Version comparison table */}
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-xs" style={{ minWidth: 560 }}>
                <thead>
                  <tr className="border-b border-[var(--border-light)]">
                    <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
                      Capability
                    </th>
                    <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
                      v0.2.12
                    </th>
                    <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
                      v0.2.14
                    </th>
                    <th className="pb-3 pl-4 text-center font-mono text-teal-500 uppercase tracking-wider">
                      v0.2.16
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "iranti_attend classifier",
                      v12: "Broken (silent fail)",
                      v14: "Fixed",
                      v16: "Fixed",
                      v12Color: "text-[var(--text-faint)]",
                      v14Color: "text-teal-500",
                      v16Color: "text-teal-500",
                    },
                    {
                      label: "Entity auto-detection",
                      v12: "Broken (0 candidates)",
                      v14: "Broken",
                      v16: "Fixed (confidence 0.82)",
                      v12Color: "text-[var(--text-faint)]",
                      v14Color: "text-[var(--text-faint)]",
                      v16Color: "text-teal-500",
                    },
                    {
                      label: "observe + hint",
                      v12: "5/6",
                      v14: "5/6",
                      v16: "5/6",
                      v12Color: "text-amber-500",
                      v14Color: "text-amber-500",
                      v16Color: "text-amber-500",
                    },
                    {
                      label: "observe (auto, no hint)",
                      v12: "0/6",
                      v14: "0/6",
                      v16: "5/6",
                      v12Color: "text-[var(--text-faint)]",
                      v14Color: "text-[var(--text-faint)]",
                      v16Color: "text-teal-500",
                    },
                    {
                      label: "sla_uptime — 1/6 gap (unexplained)",
                      v12: "—",
                      v14: "—",
                      v16: "Slash retracted; gap unexplained",
                      v12Color: "text-[var(--text-faint)]",
                      v14Color: "text-[var(--text-faint)]",
                      v16Color: "text-[var(--text-muted)]",
                    },
                  ].map((row) => (
                    <tr
                      key={row.label}
                      className="border-t border-[var(--border-subtle)]"
                    >
                      <td className="py-3 pr-4 font-semibold text-[var(--text-primary)]">
                        {row.label}
                      </td>
                      <td className={`py-3 px-4 text-center font-mono ${row.v12Color}`}>
                        {row.v12}
                      </td>
                      <td className={`py-3 px-4 text-center font-mono ${row.v14Color}`}>
                        {row.v14}
                      </td>
                      <td className={`py-3 pl-4 text-center font-mono ${row.v16Color}`}>
                        {row.v16}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              <Callout type="finding">
                <strong>Auto-detection is the most significant improvement in v0.2.16.</strong>{" "}
                Previously, the system could not identify the correct entity from
                raw context text — it returned 0 candidates, forcing every
                observe call to carry an explicit hint. Now the classifier
                resolves the entity automatically at confidence 0.82, returning
                5/6 facts with no hint required. The{" "}
                <code className="font-mono text-sm">iranti_attend</code>{" "}
                pipeline now works end-to-end for the first time.
              </Callout>

              <Callout type="info">
                <strong>1/6 gap: unexplained.</strong> The benchmark recorded a{" "}
                <code className="font-mono text-sm">parse_error/invalid_json</code>{" "}
                debug entry for one dropped fact (
                <code className="font-mono text-sm">sla_uptime</code>). Fresh
                v6.0 revalidation confirmed that slash-bearing values return
                correctly through query, search, observe, and attend — slash
                handling is retracted as a product defect. The 1/6 gap remains
                and its root cause is currently unexplained.
              </Callout>

              <Callout type="info">
                <strong>Attend noise from typescript_smoke: resolved.</strong>{" "}
                A test-artifact entry (
                <code className="font-mono text-sm">user/main/favorite_city</code>,
                source: <code className="font-mono text-sm">typescript_smoke</code>)
                surfaced during v0.2.16 benchmarking under forceInject with no
                entityHints. This has since been resolved upstream — it is not
                an open product issue.
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
                Full trial execution records, session logs, entity payloads, and
                methodology notes in the benchmarking repository.
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
