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
  written: string;
  retrieved: string;
}

const FACTS: FactRow[] = [
  {
    key: "project/blackbox/architecture_decision",
    written: '"microservices with event sourcing"',
    retrieved: '"microservices with event sourcing"',
  },
  {
    key: "project/blackbox/primary_language",
    written: '"Go"',
    retrieved: '"Go"',
  },
  {
    key: "project/blackbox/deployment_target",
    written: '"Kubernetes on GCP"',
    retrieved: '"Kubernetes on GCP"',
  },
  {
    key: "project/blackbox/team_size",
    written: "4",
    retrieved: "4",
  },
  {
    key: "project/blackbox/estimated_completion",
    written: '"Q3 2026"',
    retrieved: '"Q3 2026"',
  },
  {
    key: "project/blackbox/risk_level",
    written: '"medium — third-party API dependency"',
    retrieved: '"medium — third-party API dependency"',
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

// ─── Blackboard Architecture Diagram ─────────────────────────────────────────

function BlackboardDiagram() {
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
  const H = 160;

  // Node geometry
  const nodeW = 160;
  const nodeH = 64;
  const kbW = 140;
  const kbH = 64;
  const yCenter = H / 2;

  // X centers
  const alphaX = nodeW / 2 + 24;
  const kbX = W / 2;
  const betaX = W - nodeW / 2 - 24;

  // Arrow endpoints: Alpha right edge → KB left edge
  const writeX1 = alphaX + nodeW / 2;
  const writeX2 = kbX - kbW / 2;
  const writeLen = writeX2 - writeX1;

  // Arrow endpoints: KB right edge → Beta left edge (slightly offset to avoid overlap)
  const readX1 = kbX + kbW / 2;
  const readX2 = betaX - nodeW / 2;
  const readLen = readX2 - readX1;

  const arrowY = yCenter - 10; // write arrow slightly above center
  const readArrowY = yCenter + 10; // read arrow slightly below center

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
        aria-label="Blackboard architecture: Agent Alpha writes to Iranti KB; Agent Beta reads from Iranti KB. No direct connection between agents."
      >
        {/* ── Agent Alpha node ── */}
        <rect
          x={alphaX - nodeW / 2}
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
          x={alphaX}
          y={yCenter - 10}
          textAnchor="middle"
          fontSize="11"
          fill="#f59e0b"
          fontFamily="monospace"
        >
          Agent Alpha
        </text>
        <text
          x={alphaX}
          y={yCenter + 8}
          textAnchor="middle"
          fontSize="9"
          fill="#d97706"
          fontFamily="monospace"
        >
          iranti_write ×6
        </text>

        {/* ── Iranti KB node ── */}
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
          shared store
        </text>

        {/* ── Agent Beta node ── */}
        <rect
          x={betaX - nodeW / 2}
          y={yCenter - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="var(--border-light)"
          strokeWidth="1"
        />
        <text
          x={betaX}
          y={yCenter - 10}
          textAnchor="middle"
          fontSize="11"
          fill="var(--text-secondary)"
          fontFamily="monospace"
        >
          Agent Beta
        </text>
        <text
          x={betaX}
          y={yCenter + 8}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-muted)"
          fontFamily="monospace"
        >
          iranti_query ×6
        </text>

        {/* ── Write arrow: Alpha → KB (amber, above center) ── */}
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
          style={fadeIn(0.1 + 0.75)}
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
          write
        </text>

        {/* ── Read arrow: KB → Beta (teal, below center) ── */}
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
          style={fadeIn(0.9 + 0.75)}
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
          read (cold)
        </text>

        {/* ── "no direct link" label between agents ── */}
        <text
          x={W / 2}
          y={H - 10}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(1.8)}
        >
          no direct message passing between agents
        </text>
      </svg>
    </div>
  );
}

// ─── 6-Fact Fidelity Grid ─────────────────────────────────────────────────────

function FidelityGrid() {
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
      <table className="w-full text-xs" style={{ minWidth: 560 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Key
            </th>
            <th className="pb-3 px-4 text-left font-mono text-amber-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              Alpha wrote
            </th>
            <th className="pb-3 px-4 text-left font-mono text-teal-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              Beta retrieved
            </th>
            <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Match
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
                <td className="py-3 px-4 font-mono text-amber-500/80 leading-tight">
                  {fact.written}
                </td>
                <td className="py-3 px-4 font-mono text-teal-500/80 leading-tight">
                  {fact.retrieved}
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
            <td className="pt-3 pr-4 font-mono text-[var(--text-faint)]">
              Total
            </td>
            <td className="pt-3 px-4 font-mono text-amber-500">6 written</td>
            <td className="pt-3 px-4 font-mono text-teal-500">6 retrieved</td>
            <td className="pt-3 pl-4 text-center font-mono text-teal-500">
              6/6
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Properties Confirmed Strip ───────────────────────────────────────────────

const PROPERTIES = [
  {
    label: "Exact value fidelity",
    detail: "All 6 values match character-for-character",
  },
  {
    label: "Source attribution auto-preserved",
    detail: "source=agent_alpha stored and returned without manual tagging",
  },
  {
    label: "Timestamp available (validFrom)",
    detail:
      "Beta can determine decision recency from validFrom on every retrieved fact",
  },
];

function PropertiesStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          PROPERTIES.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
            }, i * 120);
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
    <div
      ref={ref}
      className="grid sm:grid-cols-3 gap-4"
    >
      {PROPERTIES.map((prop, i) => {
        const visible = visibleCards.has(i);
        return (
          <div
            key={prop.label}
            className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl flex flex-col gap-3"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            {/* Teal checkmark */}
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="10"
                cy="10"
                r="9"
                stroke="#14b8a6"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <path
                d="M6 10l3 3 5-6"
                stroke="#14b8a6"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div>
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                {prop.label}
              </div>
              <div className="text-xs text-[var(--text-muted)] leading-relaxed">
                {prop.detail}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B8Page() {
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
            <span className="text-[var(--text-secondary)]">b8</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B8
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Multi-Agent Coordination
            <br />
            <span className="text-[var(--text-muted)]">
              Two isolated agents. One shared KB. No messages.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Two agents coordinate without exchanging a single message. Agent
            Alpha writes structured decisions to a shared Iranti KB; Agent Beta
            retrieves them cold — no shared context, no direct link. This is the
            blackboard model for multi-agent systems.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              6 decisions · 2 agents
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              n=6, single session
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
                score="6/6"
                label="Decisions retrieved by Beta with exact fidelity"
              />
              <ScoreChip
                score="0%"
                label="Baseline — isolated agents without shared store (definitional)"
                variant="muted"
              />
              <ScoreChip
                score="3"
                label="Storage properties automatically preserved (source, validFrom, fidelity)"
                variant="teal"
              />
            </div>
            <Callout type="finding">
              Iranti served as a typed, asynchronous coordination channel between
              two isolated agents. Source attribution and timestamps were preserved
              by the storage layer without any application-level tagging.
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
              Multi-agent systems almost always coordinate through direct
              messaging: one agent calls another, passes a payload, waits for a
              response. This works at small scale. At larger scale it creates
              tight coupling — every agent needs to know every other agent&apos;s
              address, API shape, and availability.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The blackboard model breaks that coupling. Agents write to a shared
              knowledge store as a side-effect of their own work. Other agents
              read from that store when they need information. No agent has
              to know about any other agent — only about the KB schema.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              B8 tests whether Iranti&apos;s KB can serve that coordination role
              reliably. Agent Alpha writes six structured decisions about a
              project called Blackbox. Agent Beta starts cold — no shared
              context — and retrieves all six. The KB is the only bridge between
              them.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              The 0% baseline is definitional: two agents with no shared store
              cannot share information by construction. This is not an empirical
              measurement of a competing system.
            </p>
          </div>
        </section>

        {/* Blackboard diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The blackboard architecture
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Alpha writes six decisions via{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_write
              </code>
              . Beta retrieves them cold via{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_query
              </code>
              . No message passes between agents — the KB is the only shared
              surface.
            </p>
            <BlackboardDiagram />
          </div>
        </section>

        {/* 6-fact fidelity grid */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The evidence — 6-fact fidelity grid
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Six project decisions written by Agent Alpha and retrieved by
              Agent Beta. Every value matches exactly.{" "}
              <span className="text-amber-500">Amber</span> = what Alpha wrote.{" "}
              <span className="text-teal-500">Teal</span> = what Beta retrieved.
            </p>
            <FidelityGrid />
            <p className="text-xs text-[var(--text-muted)] mt-4">
              All keys are under the{" "}
              <code className="font-mono text-[var(--text-code)]">
                project/blackbox/
              </code>{" "}
              namespace. Beta performed a cold query with no in-context
              knowledge of what Alpha had written.
            </p>
          </div>
        </section>

        {/* Properties confirmed */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Properties confirmed
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Three storage-layer guarantees were observed on every retrieved
              fact, automatically — no application code required.
            </p>
            <PropertiesStrip />
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
                <strong>Simulated, not truly isolated.</strong> Agent Alpha and
                Agent Beta were simulated within a single session. True
                multi-session, multi-process agent isolation — where Alpha runs
                in one process and Beta runs in a separate process with no shared
                memory — was not tested in this benchmark. That is the most
                meaningful real-world isolation condition and it remains
                unverified here.
              </Callout>
              <Callout type="warn">
                <strong>Small test set (n=6).</strong> Six decisions is enough
                to confirm the coordination channel works. It is not enough to
                characterize reliability at volume, under concurrent writes, or
                across large decision graphs.
              </Callout>
              <Callout type="warn">
                <strong>Source label, not session identity.</strong>{" "}
                <code className="font-mono text-sm">source=agent_alpha</code> is
                a label applied at write time, not a verified session identity.
                Both Alpha and Beta show as the same{" "}
                <code className="font-mono text-sm">benchmark_program_main</code>{" "}
                in{" "}
                <code className="font-mono text-sm">iranti_who_knows</code>. The
                attribution is useful but not cryptographically verified.
              </Callout>
              <Callout type="info">
                <strong>Definitional baseline.</strong> The 0%/100% differential
                is not an A/B measurement — it is definitional. Two isolated
                agents with no shared store cannot share information. This
                benchmark proves Iranti enables the channel; it does not compare
                Iranti against a competing coordination mechanism.
              </Callout>
            </div>
          </div>
        </section>

        {/* Conflict behavior gap */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Untested: conflict behavior
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              This benchmark did not test what happens when both agents write to
              the same key. That is the most significant gap for real multi-agent
              use.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              In a production blackboard system, multiple agents may legitimately
              produce conflicting assessments of the same fact — different risk
              levels, different architecture preferences, different timeline
              estimates. How Iranti handles concurrent writes to the same key
              (last-write-wins, versioning, contested-fact flagging, or
              arbitration) determines whether it can serve as a reliable
              coordination substrate when agents genuinely disagree.
            </p>
            <div className="p-5 bg-[var(--bg-surface)] border border-amber-500/20 rounded-xl">
              <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-3">
                Gap — not tested in B8
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    Alpha and Beta both write to{" "}
                    <code className="font-mono text-[var(--text-code)]">
                      project/blackbox/risk_level
                    </code>{" "}
                    — which value wins?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    Is the conflict surfaced as a contested fact, silently overwritten, or
                    both versions retained?
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    Can a third agent read both versions and reason about the disagreement?
                  </span>
                </li>
              </ul>
              <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
                This gap will be addressed in a future benchmark. Until then,
                B8&apos;s result should be read as: Iranti can serve as a
                one-writer / many-readers coordination channel. Concurrent-write
                semantics are unknown from this data.
              </p>
            </div>
          </div>
        </section>

        {/* Key properties confirmed (finding callouts) */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Key findings
            </h2>
            <div className="space-y-4">
              <Callout type="finding">
                <strong>Asynchronous coordination channel works.</strong> Alpha
                wrote; Beta retrieved with 100% fidelity. No synchrony or direct
                communication was required between agents.
              </Callout>
              <Callout type="finding">
                <strong>Source attribution is automatic.</strong>{" "}
                <code className="font-mono text-sm">source=agent_alpha</code>{" "}
                was preserved end-to-end by the storage layer. Application code
                did not need to thread attribution manually through retrieval.
              </Callout>
              <Callout type="finding">
                <strong>Decision recency is queryable.</strong>{" "}
                <code className="font-mono text-sm">validFrom</code> timestamps
                were available on all six retrieved facts. A downstream agent can
                determine how old a decision is and weight it accordingly.
              </Callout>
              <Callout type="finding">
                <strong>Typed coordination, not free-form messages.</strong>{" "}
                Because facts are stored under namespaced keys with typed values,
                Beta retrieved structured data — not a block of unstructured text
                to parse. The KB acts as a schema boundary between agents.
              </Callout>
            </div>
          </div>
        </section>

        {/* v0.2.16 Update */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              v0.2.16 Update: True AgentId Attribution Confirmed
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              The original B8 test used{" "}
              <code className="font-mono text-[var(--text-code)]">source=agent_alpha</code> — a
              text label attached at write time, not a verified identity. In v0.2.16 we re-ran using
              the correct mechanism: the{" "}
              <code className="font-mono text-[var(--text-code)]">agent</code> parameter that tells
              Iranti which agent identity is issuing the write. With that in place,{" "}
              <code className="font-mono text-[var(--text-code)]">iranti_who_knows</code> returns{" "}
              <code className="font-mono text-[var(--text-code)]">b8_agent_alpha</code> — not the
              session-level identity of whoever ran the benchmark.
            </p>
            <div className="space-y-4">
              <Callout type="finding">
                <strong>True agentId attribution works.</strong> When you use the{" "}
                <code className="font-mono text-sm">agent</code> parameter correctly,
                iranti_who_knows returns the actual agent identity ({" "}
                <code className="font-mono text-sm">b8_agent_alpha</code>) rather than the session
                default. Attribution tracks which logical agent wrote each fact, not which process
                submitted it.
              </Callout>
              <Callout type="info">
                <strong>The KB is globally shared — no per-agent barriers.</strong> Agent Alpha can
                see what Agent Beta wrote, and vice versa. This is by design; the coordination
                pattern depends on it. If you need to keep agents&apos; working notes private from
                each other, enforce that through naming conventions — not through any built-in agentId
                isolation mechanism, because none exists.
              </Callout>
              <Callout type="warn">
                <strong>Entity name normalization.</strong> Entity names with forward slashes get
                converted to underscores when stored. This is undocumented behavior. If you generate
                entity names programmatically, it&apos;s possible to create two names that look
                different but map to the same stored entry. Worth knowing if you&apos;re using
                path-style entity IDs.
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
                Full trial execution records, agent logs, decision payloads, and
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
