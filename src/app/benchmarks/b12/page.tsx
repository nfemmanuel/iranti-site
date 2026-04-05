"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

interface RecoveryRow {
  method: string;
  total: string;
  totalNum: number;
  setup: string;
  setupNum: number;
  progress: string;
  progressNum: number;
  variant: "teal" | "amber" | "muted";
}

const RECOVERY_ROWS: RecoveryRow[] = [
  {
    method: "No Iranti",
    total: "0/8",
    totalNum: 0,
    setup: "0/4",
    setupNum: 0,
    progress: "0/4",
    progressNum: 0,
    variant: "muted",
  },
  {
    method: "Handshake only",
    total: "0/8",
    totalNum: 0,
    setup: "0/4",
    setupNum: 0,
    progress: "0/4",
    progressNum: 0,
    variant: "muted",
  },
  {
    method: "Observe + hint",
    total: "5/8",
    totalNum: 5,
    setup: "4/4",
    setupNum: 4,
    progress: "1/4",
    progressNum: 1,
    variant: "amber",
  },
  {
    method: "Explicit query",
    total: "8/8",
    totalNum: 8,
    setup: "4/4",
    setupNum: 4,
    progress: "4/4",
    progressNum: 4,
    variant: "teal",
  },
];

interface FactRow {
  key: string;
  value: string;
  confidence: number;
  recoveredByObserve: boolean;
  category: "setup" | "progress";
}

const FACTS: FactRow[] = [
  {
    key: "evaluation_goal",
    value: "compare GPT-4o, Claude 3.5, Gemini 1.5 Pro on multi-hop reasoning",
    confidence: 95,
    recoveredByObserve: true,
    category: "setup",
  },
  {
    key: "dataset",
    value: "HotpotQA bridge subset (questions 1–100)",
    confidence: 95,
    recoveredByObserve: true,
    category: "setup",
  },
  {
    key: "models_under_test",
    value: "GPT-4o, Claude-3.5-Sonnet, Gemini-1.5-Pro",
    confidence: 95,
    recoveredByObserve: true,
    category: "setup",
  },
  {
    key: "primary_metric",
    value: "exact_match on final answer",
    confidence: 95,
    recoveredByObserve: true,
    category: "setup",
  },
  {
    key: "preliminary_finding",
    value: "GPT-4o outperforming others on bridge questions by ~8% EM",
    confidence: 90,
    recoveredByObserve: true,
    category: "progress",
  },
  {
    key: "next_step",
    value: "run questions 81–100 to complete bridge subset",
    confidence: 90,
    recoveredByObserve: false,
    category: "progress",
  },
  {
    key: "open_question",
    value: "Whether bridge advantage holds on comparison questions (questions 101–200)",
    confidence: 90,
    recoveredByObserve: false,
    category: "progress",
  },
  {
    key: "partial_result",
    value: "questions 1–80 processed; GPT-4o EM=0.74 on bridge subset so far",
    confidence: 90,
    recoveredByObserve: false,
    category: "progress",
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

// ─── Recovery Results Table ───────────────────────────────────────────────────

function RecoveryTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          RECOVERY_ROWS.forEach((_, i) => {
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

  const scoreColorMap = {
    teal: "text-teal-500",
    muted: "text-[var(--text-muted)]",
    amber: "text-amber-500",
  };

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-xs" style={{ minWidth: 560 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Recovery method
            </th>
            <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Total
            </th>
            <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Setup (4)
            </th>
            <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Progress (4)
            </th>
          </tr>
        </thead>
        <tbody>
          {RECOVERY_ROWS.map((row, i) => {
            const visible = visibleRows.has(i);
            return (
              <tr
                key={row.method}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-mono text-[var(--text-secondary)] leading-tight whitespace-nowrap">
                  {row.method}
                </td>
                <td
                  className={`py-3 px-4 text-center font-mono font-semibold text-base ${scoreColorMap[row.variant]}`}
                >
                  {row.total}
                </td>
                <td
                  className={`py-3 px-4 text-center font-mono ${
                    row.setupNum === 4
                      ? "text-teal-500"
                      : row.setupNum === 0
                      ? "text-[var(--text-muted)]"
                      : "text-amber-500"
                  }`}
                >
                  {row.setup}
                </td>
                <td
                  className={`py-3 pl-4 text-center font-mono ${
                    row.progressNum === 4
                      ? "text-teal-500"
                      : row.progressNum === 0
                      ? "text-[var(--text-muted)]"
                      : "text-amber-500"
                  }`}
                >
                  {row.progress}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Facts Breakdown Table ────────────────────────────────────────────────────

function FactsTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          FACTS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => new Set(prev).add(i));
            }, i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-xs" style={{ minWidth: 600 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Category
            </th>
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Key
            </th>
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Value
            </th>
            <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Conf.
            </th>
            <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Observe+hint
            </th>
          </tr>
        </thead>
        <tbody>
          {FACTS.map((fact, i) => {
            const visible = visibleRows.has(i);
            const isSetup = fact.category === "setup";
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
                <td className="py-3 pr-4 whitespace-nowrap">
                  <span
                    className={`text-xs font-mono px-2 py-0.5 rounded ${
                      isSetup
                        ? "text-teal-500 border border-teal-500/30 bg-teal-500/5"
                        : "text-amber-500 border border-amber-500/30 bg-amber-500/5"
                    }`}
                  >
                    {fact.category}
                  </span>
                </td>
                <td className="py-3 pr-4 font-mono text-[var(--text-code)] whitespace-nowrap">
                  {fact.key}
                </td>
                <td className="py-3 pr-4 text-[var(--text-muted)] leading-relaxed max-w-[240px]">
                  {fact.value}
                </td>
                <td className="py-3 px-4 text-center font-mono text-[var(--text-faint)]">
                  {fact.confidence}
                </td>
                <td className="py-3 pl-4 text-center">
                  {fact.recoveredByObserve ? (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="inline-block"
                      aria-label="recovered"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="6"
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="1.5"
                      />
                      <polyline
                        points="4,7 6,9 10,5"
                        fill="none"
                        stroke="#14b8a6"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      className="inline-block"
                      aria-label="missed"
                    >
                      <circle
                        cx="7"
                        cy="7"
                        r="6"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                      />
                      <line
                        x1="4.5"
                        y1="4.5"
                        x2="9.5"
                        y2="9.5"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                        strokeLinecap="round"
                      />
                      <line
                        x1="9.5"
                        y1="4.5"
                        x2="4.5"
                        y2="9.5"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeOpacity="0.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Session Recovery Diagram ─────────────────────────────────────────────────

function SessionRecoveryDiagram() {
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
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 720;
  const H = 300;

  // Node geometry
  const nodeW = 148;
  const nodeH = 68;
  const yTop = 40;
  const yBottom = H - nodeH - 20;
  const yMid = (yTop + yBottom + nodeH) / 2 - nodeH / 2;

  // X positions
  const sess1X = nodeW / 2 + 30;
  const kbX = W / 2;
  const sess2X = W - nodeW / 2 - 30;

  // Arrow: Session 1 → KB
  const arr1X1 = sess1X + nodeW / 2;
  const arr1X2 = kbX - nodeW / 2;
  const arrY = yMid + nodeH / 2;

  // Arrow: KB → Session 2
  const arr2X1 = kbX + nodeW / 2;
  const arr2X2 = sess2X - nodeW / 2;

  const fadeIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 0.35s ease ${delay}s`,
  });

  const drawLine = (len: number, delay: number) =>
    revealed
      ? {
          strokeDasharray: len,
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 0.7s ease ${delay}s`,
        }
      : {
          strokeDasharray: len,
          strokeDashoffset: len,
          transition: "none",
        };

  // Recovery method label positions (stacked on session 2 side)
  const modalities = [
    { label: "No Iranti", color: "#6b7280", dy: -52 },
    { label: "Handshake only", color: "#6b7280", dy: -30 },
    { label: "Observe + hint", color: "#f59e0b", dy: -8 },
    { label: "Explicit query", color: "#14b8a6", dy: 14 },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[720px] mx-auto"
        style={{ minWidth: 360 }}
        aria-label="Session recovery flow: Session 1 interrupted, data persists in Iranti KB, Session 2 recovers via four modalities."
      >
        {/* ── Session 1 node (interrupted) ── */}
        <rect
          x={sess1X - nodeW / 2}
          y={yMid}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        {/* Break line across top of session 1 node — simulates interruption */}
        <line
          x1={sess1X - nodeW / 2 + 12}
          y1={yMid + nodeH + 8}
          x2={sess1X + nodeW / 2 - 12}
          y2={yMid + nodeH + 8}
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          style={fadeIn(0.5)}
        />
        <text
          x={sess1X}
          y={yMid + 22}
          textAnchor="middle"
          fontSize="11"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.1)}
        >
          Session 1
        </text>
        <text
          x={sess1X}
          y={yMid + 38}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(0.15)}
        >
          8 facts written
        </text>
        <text
          x={sess1X}
          y={yMid + 54}
          textAnchor="middle"
          fontSize="8"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(0.2)}
        >
          ⚡ interrupted
        </text>
        <text
          x={sess1X}
          y={yMid + nodeH + 22}
          textAnchor="middle"
          fontSize="8"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(0.55)}
        >
          session break
        </text>

        {/* ── Iranti KB node (center, bridge) ── */}
        <rect
          x={kbX - nodeW / 2}
          y={yMid}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.7"
          strokeWidth="1.5"
        />
        <text
          x={kbX}
          y={yMid + 22}
          textAnchor="middle"
          fontSize="11"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.2)}
        >
          Iranti KB
        </text>
        <text
          x={kbX}
          y={yMid + 38}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(0.25)}
        >
          8/8 facts persist
        </text>
        <text
          x={kbX}
          y={yMid + 54}
          textAnchor="middle"
          fontSize="8"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.3)}
        >
          write durability solid
        </text>

        {/* ── Session 2 node (recovery) ── */}
        <rect
          x={sess2X - nodeW / 2}
          y={yMid}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text
          x={sess2X}
          y={yMid + 22}
          textAnchor="middle"
          fontSize="11"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.35)}
        >
          Session 2
        </text>
        <text
          x={sess2X}
          y={yMid + 38}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(0.4)}
        >
          fresh context
        </text>
        <text
          x={sess2X}
          y={yMid + 54}
          textAnchor="middle"
          fontSize="8"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.45)}
        >
          4 recovery modes
        </text>

        {/* ── Arrow: Session 1 → KB ── */}
        <line
          x1={arr1X1}
          y1={arrY}
          x2={arr1X2 - 8}
          y2={arrY}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={drawLine(arr1X2 - arr1X1, 0.1)}
        />
        <polygon
          points={`${arr1X2 - 8},${arrY - 5} ${arr1X2},${arrY} ${arr1X2 - 8},${arrY + 5}`}
          fill="#14b8a6"
          style={fadeIn(0.85)}
        />
        <text
          x={(arr1X1 + arr1X2) / 2}
          y={arrY - 10}
          textAnchor="middle"
          fontSize="8"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.9)}
        >
          iranti_write (8 facts)
        </text>

        {/* ── Arrow: KB → Session 2 ── */}
        <line
          x1={arr2X1}
          y1={arrY}
          x2={arr2X2 - 8}
          y2={arrY}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={drawLine(arr2X2 - arr2X1, 0.8)}
        />
        <polygon
          points={`${arr2X2 - 8},${arrY - 5} ${arr2X2},${arrY} ${arr2X2 - 8},${arrY + 5}`}
          fill="#14b8a6"
          style={fadeIn(1.55)}
        />
        <text
          x={(arr2X1 + arr2X2) / 2}
          y={arrY - 10}
          textAnchor="middle"
          fontSize="8"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.6)}
        >
          recovery retrieval
        </text>

        {/* ── Recovery modality labels below session 2 ── */}
        {modalities.map((m, i) => (
          <text
            key={m.label}
            x={sess2X}
            y={yMid + nodeH + 28 + i * 20}
            textAnchor="middle"
            fontSize="8"
            fill={m.color}
            fontFamily="monospace"
            style={fadeIn(1.7 + i * 0.1)}
          >
            {m.label}
          </text>
        ))}

        {/* ── Label above session 2 (modalities header) ── */}
        <text
          x={sess2X}
          y={yMid + nodeH + 14}
          textAnchor="middle"
          fontSize="8"
          fill="#6b7280"
          fontFamily="monospace"
          style={fadeIn(1.65)}
        >
          modalities tested ↓
        </text>
      </svg>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B12Page() {
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
            <span className="text-[var(--text-secondary)]">b12</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B12
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Interrupted Session Recovery
            <br />
            <span className="text-[var(--text-muted)]">
              Data always survives. Recovery depends on retrieval.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            B12 tests whether an AI agent can recover its working state after a
            session interruption. An agent wrote 8 facts to Iranti during a
            session, which was then interrupted. A fresh session opened and
            recovery was tested four ways. The finding: write durability is
            solid — all 8 facts survive — but how many you get back depends
            entirely on how the new session retrieves them.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              n=8 facts, 4 modalities
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              v0.2.16
            </span>
          </div>
        </section>

        {/* Score summary */}
        <section className="px-6 pb-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <p className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-6">
              Results at a glance
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <ScoreChip
                score="8/8"
                label="Facts surviving session break — write durability is solid"
                variant="teal"
              />
              <ScoreChip
                score="5/8"
                label="Recovery via iranti_observe + hint — setup facts crowd out progress facts"
                variant="amber"
              />
              <ScoreChip
                score="8/8"
                label="Recovery via explicit iranti_query — perfect, but requires knowing entity IDs upfront"
                variant="teal"
              />
            </div>
            <Callout type="finding">
              The data is never the problem — write durability is solid. Recovery
              is a retrieval design question. The modality you choose determines
              what comes back.
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
              Long-running AI agent tasks are rarely uninterrupted. Sessions
              time out, contexts are reset, processes crash, or work is handed
              off to a different agent instance. When that happens, any working
              state that was not persisted is gone. Session recovery is the
              ability to reconstruct that working state — goals, progress,
              intermediate findings, open questions — in a fresh session, fast
              enough to continue without starting over.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B12 sets up a realistic scenario: an agent analyzing LLM
              multi-hop reasoning performance writes 8 facts to Iranti across
              the session — 4 describing the evaluation setup (high confidence)
              and 4 describing in-progress work (slightly lower confidence). The
              session is then interrupted. A new session opens, and recovery is
              tested four ways: no retrieval, handshake only, observe with a
              semantic hint, and explicit key-based query.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              The benchmark isolates two distinct questions: first, did the data
              survive the session break at all (write durability)? Second, how
              much can a recovery session actually retrieve, and does the
              retrieval strategy matter? These turn out to have very different
              answers.
            </p>
          </div>
        </section>

        {/* The four recovery modalities */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The four recovery modalities
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Each modality represents a distinct retrieval strategy. Same
              underlying data in all four cases — the only variable is how the
              recovery session asks for it.
            </p>
            <RecoveryTable />
            <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
              No Iranti and Handshake-only both score 0/8 for different reasons.
              No Iranti has no persistent storage at all. Handshake-only has the
              data but does not retrieve it — the handshake returns session
              metadata, not stored facts.
            </p>
          </div>
        </section>

        {/* SVG diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Session break and recovery flow
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Session 1 writes 8 facts to Iranti, then is interrupted. The
              Iranti KB holds all 8 facts intact across the break. Session 2
              opens fresh and attempts recovery via one of four modalities. The
              KB is the bridge — the question is only which retrieval path
              Session 2 uses.
            </p>
            <SessionRecoveryDiagram />
          </div>
        </section>

        {/* The 8 facts breakdown */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The 8 facts: setup vs. progress
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Setup facts describe the evaluation configuration — stable,
              high-confidence (95). Progress facts describe in-flight work —
              findings, next steps, open questions — written at confidence 90.
              The observe+hint column shows which facts were returned when the
              recovery session used{" "}
              <code className="text-[var(--text-code)] font-mono text-xs">
                iranti_observe
              </code>{" "}
              with a semantic hint.
            </p>
            <FactsTable />
            <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
              All 8 facts were confirmed present in the KB after the session
              break. The observe+hint column reflects what the recovery session
              actually received — 5 of 8, not 8 of 8.
            </p>
          </div>
        </section>

        {/* Why progress facts are harder to recover */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Why progress facts are harder to recover
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              When{" "}
              <code className="text-[var(--text-code)] font-mono text-xs">
                iranti_observe
              </code>{" "}
              is called with a semantic hint, it returns results ranked by
              confidence. Setup facts were written at confidence 95; progress
              facts at confidence 90. With a bounded result set, the
              higher-confidence setup facts rank first and fill the available
              slots. Progress facts are present in the KB but are ranked lower —
              they get crowded out before the result window closes.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              This is not a data loss problem. Every fact is retrievable with an
              explicit query. It is a retrieval design problem: if you rely on
              observe to surface everything, confidence ranking will consistently
              deprioritize lower-confidence entries even when those entries
              represent the most critical in-progress work.
            </p>
            <div className="space-y-3">
              <Callout type="finding">
                <strong>Confidence ranking is load-bearing.</strong> Setup facts
                (95) crowd out progress facts (90) in bounded observe results.
                The confidence delta is small but the effect is deterministic —
                all 4 setup facts come back, and only 1 of 4 progress facts
                makes the cut.
              </Callout>
              <Callout type="finding">
                <strong>Progress facts are the most critical to recover.</strong>{" "}
                Setup facts describe a stable configuration that can often be
                reconstructed from other context. Progress facts — partial
                results, next steps, open questions — are the unique product of
                work done and cannot be reconstructed without the data.
              </Callout>
            </div>
          </div>
        </section>

        {/* Practical recommendations */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Practical recommendations
            </h2>
            <div className="space-y-4">
              <div className="border border-[var(--border-subtle)] rounded-lg px-5 py-4">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-2">
                  Write early
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Write facts to Iranti as soon as they are established, not at
                  the end of a session. If the session is interrupted before a
                  final write, facts written mid-session survive. Facts written
                  only at cleanup do not.
                </p>
              </div>
              <div className="border border-[var(--border-subtle)] rounded-lg px-5 py-4">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-2">
                  Match confidence levels
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  If you want{" "}
                  <code className="text-[var(--text-code)] font-mono text-xs">
                    iranti_observe
                  </code>{" "}
                  to surface progress facts alongside setup facts, write them at
                  the same confidence level. The 5-point gap (90 vs 95) was
                  enough to produce a lopsided recovery result. When in-progress
                  work is equally critical, mark it equally confident.
                </p>
              </div>
              <div className="border border-[var(--border-subtle)] rounded-lg px-5 py-4">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-2">
                  Design for handoff
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Before any long-running task, write a manifest fact that lists
                  the entity IDs and key names the recovery session will need.
                  Store the manifest at high confidence so observe surfaces it
                  reliably. A recovery session that finds the manifest can then
                  run explicit queries for everything else.
                </p>
              </div>
              <div className="border border-[var(--border-subtle)] rounded-lg px-5 py-4">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-2">
                  Use explicit query for complete recovery
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  <code className="text-[var(--text-code)] font-mono text-xs">
                    iranti_query
                  </code>{" "}
                  with known entity IDs and key names gives 8/8 perfect
                  recovery. If the recovery session has or can discover the
                  entity IDs, prefer explicit query over observe for
                  mission-critical state. Observe is useful for exploration;
                  explicit query is the right tool for known recovery targets.
                </p>
              </div>
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
                <strong>n=1 trial.</strong> This was a single test run, not a
                distribution. The 5/8 observe result and the 8/8 explicit query
                result are directionally meaningful but should not be read as
                precise rates. Confidence ranking effects may vary across
                different KB states, hint qualities, and result window sizes.
              </Callout>
              <Callout type="warn">
                <strong>Session break was simulated.</strong> The interruption
                was a clean context clear — not a crash, timeout, or hard
                process termination. Real-world interruptions may involve
                partially written state, inflight writes that did not commit, or
                other failure modes not covered here.
              </Callout>
              <Callout type="warn">
                <strong>Controlled scenario.</strong> The 8 facts were purpose-
                written to test recovery. Real agent sessions write facts with
                varying structures, entity distributions, and confidence levels
                that may change observe ranking behavior in ways this test did
                not exercise.
              </Callout>
              <Callout type="info">
                <strong>Explicit query requires prior knowledge.</strong> The
                8/8 explicit query result is only achievable if the recovery
                session knows which entity IDs and keys to query. This knowledge
                must come from somewhere — a manifest, documentation, or an
                observe call that surfaces the right entry first.
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
                <strong>Write durability is solid.</strong> All 8 facts survived
                the session break intact. Iranti is a reliable persistence layer
                for agent working state — data is not the failure point in
                session recovery.
              </Callout>
              <Callout type="finding">
                <strong>iranti_handshake is not a recovery tool.</strong> It
                returns session metadata, not stored facts. Agents that call
                only the handshake after a session break will recover 0/8 facts,
                even though all 8 are present and retrievable in the KB.
              </Callout>
              <Callout type="finding">
                <strong>
                  Observe + hint gives partial recovery, biased toward setup.
                </strong>{" "}
                Confidence ranking causes high-confidence setup facts (95) to
                crowd out lower-confidence progress facts (90) in bounded
                observe results. This produces a predictable and deterministic
                gap — not random, but structural.
              </Callout>
              <Callout type="finding">
                <strong>Explicit query gives perfect recovery.</strong> With
                known entity IDs and key names, iranti_query retrieves all 8
                facts without degradation. The tradeoff is that this requires
                the recovery session to know what to ask for — which must be
                planned for at write time.
              </Callout>
              <Callout type="finding">
                <strong>Recovery is a design question, not a product bug.</strong>{" "}
                The gap between 5/8 and 8/8 is not caused by data loss or
                retrieval failure — the data is there. It is caused by retrieval
                strategy. Teams that design their agents with explicit handoff
                manifests and consistent confidence levels will get full
                recovery. Teams that rely on observe will get partial recovery,
                weighted toward their most confident (typically setup) facts.
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
                Full trial execution records, fact tables, per-modality recovery
                traces, and methodology notes in the benchmarking repository.
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
