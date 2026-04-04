"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

interface FactRow {
  key: string;
  value: string;
  agentId: string;
  source: string;
}

const FACTS: FactRow[] = [
  {
    key: "primary_researcher",
    value: '"Dr. Elena Vasquez"',
    agentId: "benchmark_program_main",
    source: "research_agent",
  },
  {
    key: "research_focus",
    value: '"quantum error correction algorithms"',
    agentId: "benchmark_program_main",
    source: "research_agent",
  },
  {
    key: "institution",
    value: '"MIT Quantum Computing Lab"',
    agentId: "benchmark_program_main",
    source: "research_agent",
  },
  {
    key: "current_phase",
    value: '"Phase 2: algorithm optimization"',
    agentId: "benchmark_program_main",
    source: "research_agent",
  },
  {
    key: "expected_publication",
    value: '"Q4 2026"',
    agentId: "benchmark_program_main",
    source: "research_agent",
  },
];

const API_RESPONSE_EXAMPLE = `{
  "entity": "project/stellar_echo",
  "key": "primary_researcher",
  "value": "Dr. Elena Vasquez",
  "agentId": "benchmark_program_main",
  "source": "research_agent",
  "validFrom": "2026-03-21T09:14:22.441Z",
  "confidence": 0.9
}`;

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

function CheckIcon({ visible }: { visible: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1)" : "scale(0.5)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
        flexShrink: 0,
      }}
    >
      <path
        d="M3 8l3.5 3.5L13 5"
        stroke="#14b8a6"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Two-Layer Attribution Diagram ────────────────────────────────────────────

function AttributionDiagram() {
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
  const H = 200;

  // Fact node (center)
  const factX = W / 2;
  const factY = H / 2;
  const factW = 140;
  const factH = 56;

  // AgentId node (left)
  const agentX = 160;
  const agentY = H / 2;
  const agentW = 176;
  const agentH = 64;

  // Source node (right)
  const sourceX = W - 160;
  const sourceY = H / 2;
  const sourceW = 176;
  const sourceH = 64;

  // Arrow: agentId node right edge -> fact left edge
  const arrowAgent_x1 = agentX + agentW / 2;
  const arrowAgent_x2 = factX - factW / 2;
  const arrowAgentLen = arrowAgent_x2 - arrowAgent_x1;

  // Arrow: fact right edge -> source node left edge
  const arrowSource_x1 = factX + factW / 2;
  const arrowSource_x2 = sourceX - sourceW / 2;
  const arrowSourceLen = arrowSource_x2 - arrowSource_x1;

  const lineStyle = (len: number, delay: number) =>
    revealed
      ? {
          strokeDasharray: Math.abs(len),
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 0.75s ease ${delay}s`,
        }
      : {
          strokeDasharray: Math.abs(len),
          strokeDashoffset: Math.abs(len),
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
        aria-label="Two-layer attribution: a stored fact connects to agentId (session identity, amber) on the left and source label (declared semantic source, teal) on the right."
      >
        {/* AgentId node (amber, left) */}
        <rect
          x={agentX - agentW / 2}
          y={agentY - agentH / 2}
          width={agentW}
          height={agentH}
          rx="8"
          fill="transparent"
          stroke="#f59e0b"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x={agentX}
          y={agentY - 12}
          textAnchor="middle"
          fontSize="9"
          fill="#d97706"
          fontFamily="monospace"
          style={fadeIn(0.1)}
        >
          session identity
        </text>
        <text
          x={agentX}
          y={agentY + 4}
          textAnchor="middle"
          fontSize="10"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(0.15)}
        >
          agentId
        </text>
        <text
          x={agentX}
          y={agentY + 18}
          textAnchor="middle"
          fontSize="9"
          fill="#d97706"
          fontFamily="monospace"
          style={fadeIn(0.2)}
        >
          benchmark_program_main
        </text>

        {/* Fact node (center) */}
        <rect
          x={factX - factW / 2}
          y={factY - factH / 2}
          width={factW}
          height={factH}
          rx="8"
          fill="transparent"
          stroke="var(--border-light)"
          strokeWidth="1"
        />
        <text
          x={factX}
          y={factY - 8}
          textAnchor="middle"
          fontSize="11"
          fill="var(--text-secondary)"
          fontFamily="monospace"
          style={fadeIn(0.0)}
        >
          Stored Fact
        </text>
        <text
          x={factX}
          y={factY + 10}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-muted)"
          fontFamily="monospace"
          style={fadeIn(0.05)}
        >
          project/stellar_echo
        </text>

        {/* Source node (teal, right) */}
        <rect
          x={sourceX - sourceW / 2}
          y={sourceY - sourceH / 2}
          width={sourceW}
          height={sourceH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x={sourceX}
          y={sourceY - 12}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(0.8)}
        >
          semantic source
        </text>
        <text
          x={sourceX}
          y={sourceY + 4}
          textAnchor="middle"
          fontSize="10"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.85)}
        >
          source label
        </text>
        <text
          x={sourceX}
          y={sourceY + 18}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(0.9)}
        >
          research_agent
        </text>

        {/* Arrow: AgentId -> Fact (amber) */}
        <line
          x1={arrowAgent_x1}
          y1={agentY}
          x2={arrowAgent_x2 - 8}
          y2={factY}
          stroke="#f59e0b"
          strokeWidth="1.5"
          style={lineStyle(arrowAgentLen, 0.2)}
        />
        <polygon
          points={`${arrowAgent_x2 - 8},${factY - 5} ${arrowAgent_x2},${factY} ${arrowAgent_x2 - 8},${factY + 5}`}
          fill="#f59e0b"
          style={fadeIn(0.2 + 0.75)}
        />
        <text
          x={(arrowAgent_x1 + arrowAgent_x2) / 2}
          y={agentY - 10}
          textAnchor="middle"
          fontSize="9"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(0.5)}
        >
          stored by
        </text>

        {/* Arrow: Fact -> Source (teal) */}
        <line
          x1={arrowSource_x1}
          y1={factY}
          x2={arrowSource_x2 - 8}
          y2={sourceY}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={lineStyle(arrowSourceLen, 0.9)}
        />
        <polygon
          points={`${arrowSource_x2 - 8},${sourceY - 5} ${arrowSource_x2},${sourceY} ${arrowSource_x2 - 8},${sourceY + 5}`}
          fill="#14b8a6"
          style={fadeIn(0.9 + 0.75)}
        />
        <text
          x={(arrowSource_x1 + arrowSource_x2) / 2}
          y={sourceY - 10}
          textAnchor="middle"
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.2)}
        >
          declared as
        </text>

        {/* Footer label */}
        <text
          x={W / 2}
          y={H - 8}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(1.8)}
        >
          two independent attribution layers — session identity + semantic source
        </text>
      </svg>
    </div>
  );
}

// ─── 5-Fact Attribution Grid ──────────────────────────────────────────────────

function AttributionGrid() {
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
            }, i * 110);
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
      <table className="w-full text-xs" style={{ minWidth: 640 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Key (project/stellar_echo/)
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
              Value
            </th>
            <th className="pb-3 px-4 text-left font-mono text-amber-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              agentId
            </th>
            <th className="pb-3 px-4 text-left font-mono text-teal-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              source
            </th>
            <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Attributed
            </th>
          </tr>
        </thead>
        <tbody>
          {FACTS.map((fact, i) => {
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
                <td className="py-3 pr-4 font-mono text-[var(--text-code)] leading-tight">
                  {fact.key}
                </td>
                <td className="py-3 px-4 font-mono text-[var(--text-secondary)] leading-tight">
                  {fact.value}
                </td>
                <td className="py-3 px-4 font-mono text-amber-500/80 leading-tight whitespace-nowrap">
                  {fact.agentId}
                </td>
                <td className="py-3 px-4 font-mono text-teal-500/80 leading-tight whitespace-nowrap">
                  {fact.source}
                </td>
                <td className="py-3 pl-4 text-center">
                  <div className="flex items-center justify-center">
                    <CheckIcon visible={visible} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-[var(--border-light)]">
            <td className="pt-3 pr-4 font-mono text-[var(--text-faint)]">Total</td>
            <td className="pt-3 px-4 font-mono text-[var(--text-muted)]">5 facts</td>
            <td className="pt-3 px-4 font-mono text-amber-500">5/5 agentId</td>
            <td className="pt-3 px-4 font-mono text-teal-500">5/5 source</td>
            <td className="pt-3 pl-4 text-center font-mono text-teal-500">5/5</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── API Response Card ─────────────────────────────────────────────────────────

function ApiResponseCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-[var(--border-subtle)] flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
          </div>
          <span className="text-xs font-mono text-[var(--text-faint)]">
            iranti_who_knows(&quot;project/stellar_echo&quot;) — response shape (one fact)
          </span>
        </div>
        <pre className="px-5 py-4 text-xs font-mono text-[var(--text-code)] leading-relaxed overflow-x-auto whitespace-pre">
          {API_RESPONSE_EXAMPLE}
        </pre>
      </div>
    </div>
  );
}

// ─── Attribution Layer Cards ───────────────────────────────────────────────────

const LAYERS = [
  {
    color: "amber" as const,
    title: "Layer 1: agentId (session identity)",
    detail:
      "Automatically captured from the authenticated session that called iranti_write. This is who actually ran the code — the process or agent runtime that holds the session token.",
    field: "agentId",
    value: "benchmark_program_main",
  },
  {
    color: "teal" as const,
    title: "Layer 2: source (semantic source)",
    detail:
      "Declared by the agent at write time as a named attribute. This is who the agent claims to be acting as — a role, persona, or sub-agent identity. It is asserted, not verified.",
    field: "source",
    value: "research_agent",
  },
];

function LayerCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          LAYERS.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
            }, i * 130);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid sm:grid-cols-2 gap-4">
      {LAYERS.map((layer, i) => {
        const isVisible = visibleCards.has(i);
        const borderColor =
          layer.color === "amber"
            ? "border-amber-500/30"
            : "border-teal-500/30";
        const labelColor =
          layer.color === "amber" ? "text-amber-500" : "text-teal-500";
        const valueColor =
          layer.color === "amber" ? "text-amber-500/80" : "text-teal-500/80";
        return (
          <div
            key={layer.title}
            className={`p-5 bg-[var(--bg-surface)] border ${borderColor} rounded-xl flex flex-col gap-3`}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <div className={`text-xs font-mono uppercase tracking-wider ${labelColor}`}>
              {layer.title}
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {layer.detail}
            </p>
            <div className="pt-1 border-t border-[var(--border-subtle)]">
              <span className="text-xs text-[var(--text-faint)] font-mono">
                {layer.field}:{" "}
              </span>
              <span className={`text-xs font-mono ${valueColor}`}>
                {layer.value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B10Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono mb-8">
            <Link
              href="/evidence"
              className="hover:text-[var(--text-muted)] transition-colors"
            >
              proof
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">b10</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B10
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Knowledge Provenance
            <br />
            <span className="text-[var(--text-muted)]">
              Two attribution layers. Every fact traceable.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Iranti attributes any stored fact to both (a) the agent ID that stored
            it and (b) the source label the agent declared at write time. This
            two-layer chain — session identity plus semantic source — lets
            downstream agents and operators ask not just{" "}
            <em>what</em> is known, but <em>who</em> established it and under
            what role.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              5 facts · iranti_who_knows API
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              n=5, single namespace
            </span>
          </div>
        </section>

        {/* Score summary */}
        <section className="px-6 pb-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <p className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-6">
              Results at a glance
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <ScoreChip
                score="5/5"
                label="Facts attributed correctly with both agentId and source"
              />
              <ScoreChip
                score="2"
                label="Attribution layers per fact (session identity + semantic source)"
                variant="amber"
              />
              <ScoreChip
                score="100%"
                label="Provenance coverage — validFrom timestamps on all 5 facts"
                variant="teal"
              />
            </div>
            <Callout type="finding">
              Every stored fact returned by{" "}
              <code className="font-mono text-sm">iranti_who_knows</code>{" "}
              carried a two-layer attribution chain:{" "}
              <code className="font-mono text-sm">agentId</code> (the
              authenticated session) and{" "}
              <code className="font-mono text-sm">source</code> (the declared
              semantic identity). No application-level tagging was required —
              the storage layer preserved both automatically.
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
              In a multi-agent system, knowledge accumulates fast. Facts get
              written by many agents across many sessions. Without provenance,
              a downstream agent has no way to evaluate the trustworthiness of
              a stored fact — it cannot tell whether the fact came from a
              high-confidence research agent or an early brainstorm.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B10 tests whether Iranti&apos;s{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_who_knows
              </code>{" "}
              API correctly returns two independent attribution layers for every
              stored fact: the session-level identity of the writer (
              <code className="font-mono text-[var(--text-code)]">agentId</code>
              ) and the semantic role the agent declared itself as (
              <code className="font-mono text-[var(--text-code)]">source</code>
              ).
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Five facts about a research project were written under the{" "}
              <code className="font-mono text-[var(--text-code)]">
                project/stellar_echo/
              </code>{" "}
              namespace. Each was stored by{" "}
              <code className="font-mono text-[var(--text-code)]">
                benchmark_program_main
              </code>{" "}
              acting as{" "}
              <code className="font-mono text-[var(--text-code)]">
                research_agent
              </code>
              .{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_who_knows
              </code>{" "}
              was then called on the namespace — returning all five facts with
              both attribution fields present.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              The benchmark does not test attribution across multiple distinct
              agentIds or sources. All five facts share the same writer
              identity. Cross-source disambiguation is not verified here.
            </p>
          </div>
        </section>

        {/* Attribution diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The two-layer attribution chain
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Each stored fact connects to two independent provenance layers.{" "}
              <span className="text-amber-500">Amber</span> = session identity (
              <code className="font-mono text-[var(--text-code)]">agentId</code>
              ).{" "}
              <span className="text-teal-500">Teal</span> = declared semantic
              source (
              <code className="font-mono text-[var(--text-code)]">source</code>
              ).
            </p>
            <AttributionDiagram />
          </div>
        </section>

        {/* Layer explanation cards */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              What each layer means
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              The two layers answer different questions. AgentId answers{" "}
              <em>who ran the code</em>. Source answers{" "}
              <em>what role that agent was playing</em>.
            </p>
            <LayerCards />
          </div>
        </section>

        {/* 5-fact attribution grid */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The evidence — 5-fact attribution grid
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              All five facts stored under{" "}
              <code className="font-mono text-[var(--text-code)]">
                project/stellar_echo/
              </code>
              , with the{" "}
              <span className="text-amber-500">agentId</span> and{" "}
              <span className="text-teal-500">source</span> fields returned by{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_who_knows
              </code>
              .
            </p>
            <AttributionGrid />
          </div>
        </section>

        {/* API response card */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              API response shape
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              The full response structure returned per fact by{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_who_knows
              </code>
              . Both attribution fields, value, and timestamp are present on
              every fact in the response.
            </p>
            <ApiResponseCard />
            <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
              <code className="font-mono text-[var(--text-code)]">validFrom</code>{" "}
              timestamps were present on all five returned facts, making provenance
              time-aware — a downstream agent can determine how old a fact is and
              factor recency into its reasoning.
            </p>
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
                <strong>Source label is not cryptographically verified.</strong>{" "}
                <code className="font-mono text-sm">source=research_agent</code>{" "}
                is a declared attribute, not a verified session identity. Any
                agent with write access to the namespace can declare any source
                label. The attribution is useful for semantic organization but
                should not be treated as a trust boundary.
              </Callout>
              <Callout type="warn">
                <strong>Small test set (n=5).</strong> Five facts under a
                single namespace with a single writer identity is sufficient to
                confirm the attribution mechanism works. It does not characterize
                behavior with multiple competing writers, conflicting source
                labels, or high-volume provenance queries.
              </Callout>
              <Callout type="warn">
                <strong>Single writer — no cross-source disambiguation tested.</strong>{" "}
                All five facts were written by the same agentId with the same
                source label. B10 does not verify that{" "}
                <code className="font-mono text-sm">iranti_who_knows</code>{" "}
                correctly distinguishes between facts written by different agents
                under the same namespace. That is a separate capability not tested
                here.
              </Callout>
              <Callout type="info">
                <strong>Namespace scope only.</strong> The query was scoped to{" "}
                <code className="font-mono text-sm">project/stellar_echo</code>.
                Cross-namespace provenance queries were not tested.
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
                <strong>Two-layer attribution is automatic.</strong> Both{" "}
                <code className="font-mono text-sm">agentId</code> and{" "}
                <code className="font-mono text-sm">source</code> were preserved
                by the storage layer without any application-level tagging.
                Provenance requires no extra engineering effort at write time.
              </Callout>
              <Callout type="finding">
                <strong>
                  <code className="font-mono text-sm">iranti_who_knows</code>{" "}
                  returns full attribution context.
                </strong>{" "}
                A single API call on a namespace returns all stored facts with
                complete provenance — value, agentId, source, validFrom, and
                confidence — enabling downstream agents to make trust-weighted
                decisions.
              </Callout>
              <Callout type="finding">
                <strong>Provenance is time-aware.</strong>{" "}
                <code className="font-mono text-sm">validFrom</code> timestamps
                on all five facts mean downstream agents can determine recency
                and weight older knowledge appropriately.
              </Callout>
              <Callout type="finding">
                <strong>Session identity and semantic role are decoupled.</strong>{" "}
                A single agentId (
                <code className="font-mono text-sm">benchmark_program_main</code>
                ) can act as multiple semantic sources across different operations.
                This lets runtime identity stay stable while declared roles shift
                with context.
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
                Full trial execution records, agent logs, provenance payloads, and
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
                href="/evidence"
                className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-sm transition-colors"
              >
                All benchmarks
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
