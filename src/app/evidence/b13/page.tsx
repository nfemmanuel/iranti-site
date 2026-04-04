"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

interface ResultRow {
  test: string;
  result: string;
  note: string;
  pass: boolean;
}

const RESULTS: ResultRow[] = [
  {
    test: "v0.2.12 facts in v0.2.16",
    result: "4/5 reads correct",
    note: "1 miss = probe used wrong key name",
    pass: true,
  },
  {
    test: "Post-upgrade writes",
    result: "3/3",
    note: "Immediate, no warmup period",
    pass: true,
  },
  {
    test: "Conflict state",
    result: "Preserved",
    note: "Not resolved or altered by upgrade",
    pass: true,
  },
  {
    test: "API surface",
    result: "Stable",
    note: "iranti_handshake returns same structure",
    pass: true,
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

// ─── Version Timeline Diagram ─────────────────────────────────────────────────

function VersionTimeline() {
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

  const nodeY = 88;
  const nodeR = 28;

  const v1X = 110;
  const v2X = W / 2;
  const v3X = W - 110;

  const seg1Len = v2X - v1X - nodeR * 2;
  const seg2Len = v3X - v2X - nodeR * 2;

  const seg1X1 = v1X + nodeR;
  const seg1X2 = v2X - nodeR;
  const seg2X1 = v2X + nodeR;
  const seg2X2 = v3X - nodeR;

  const lineStyle = (len: number, delay: number) =>
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

  const fadeIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 0.35s ease ${delay}s`,
  });

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[720px] mx-auto"
        style={{ minWidth: 340 }}
        aria-label="Version timeline: data written in v0.2.12, passes through v0.2.14, still readable in v0.2.16"
      >
        {/* ── Connecting lines ── */}
        <line
          x1={seg1X1}
          y1={nodeY}
          x2={seg1X2}
          y2={nodeY}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={lineStyle(seg1Len, 0.15)}
        />
        <polygon
          points={`${seg1X2 - 7},${nodeY - 5} ${seg1X2},${nodeY} ${seg1X2 - 7},${nodeY + 5}`}
          fill="#14b8a6"
          style={fadeIn(0.15 + 0.7)}
        />

        <line
          x1={seg2X1}
          y1={nodeY}
          x2={seg2X2}
          y2={nodeY}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={lineStyle(seg2Len, 0.95)}
        />
        <polygon
          points={`${seg2X2 - 7},${nodeY - 5} ${seg2X2},${nodeY} ${seg2X2 - 7},${nodeY + 5}`}
          fill="#14b8a6"
          style={fadeIn(0.95 + 0.7)}
        />

        {/* ── v0.2.12 node ── */}
        <circle
          cx={v1X}
          cy={nodeY}
          r={nodeR}
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          style={fadeIn(0)}
        />
        <text
          x={v1X}
          y={nodeY - 6}
          textAnchor="middle"
          fontSize="10"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.1)}
        >
          v0.2.12
        </text>
        <text
          x={v1X}
          y={nodeY + 8}
          textAnchor="middle"
          fontSize="8"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(0.1)}
        >
          write
        </text>

        {/* ── v0.2.14 node ── */}
        <circle
          cx={v2X}
          cy={nodeY}
          r={nodeR}
          fill="transparent"
          stroke="var(--border-light)"
          strokeWidth="1"
          style={fadeIn(0.5)}
        />
        <text
          x={v2X}
          y={nodeY - 6}
          textAnchor="middle"
          fontSize="10"
          fill="var(--text-secondary)"
          fontFamily="monospace"
          style={fadeIn(0.6)}
        >
          v0.2.14
        </text>
        <text
          x={v2X}
          y={nodeY + 8}
          textAnchor="middle"
          fontSize="8"
          fill="var(--text-muted)"
          fontFamily="monospace"
          style={fadeIn(0.6)}
        >
          upgrade
        </text>

        {/* ── v0.2.16 node ── */}
        <circle
          cx={v3X}
          cy={nodeY}
          r={nodeR}
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.6"
          strokeWidth="1.5"
          style={fadeIn(1.3)}
        />
        <text
          x={v3X}
          y={nodeY - 6}
          textAnchor="middle"
          fontSize="10"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.4)}
        >
          v0.2.16
        </text>
        <text
          x={v3X}
          y={nodeY + 8}
          textAnchor="middle"
          fontSize="8"
          fill="#0d9488"
          fontFamily="monospace"
          style={fadeIn(1.4)}
        >
          still readable
        </text>

        {/* ── Labels below nodes ── */}
        <text
          x={v1X}
          y={nodeY + nodeR + 22}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(0.3)}
        >
          data written here
        </text>
        <text
          x={v2X}
          y={nodeY + nodeR + 22}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(0.85)}
        >
          incremental upgrade
        </text>
        <text
          x={v3X}
          y={nodeY + nodeR + 22}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(1.6)}
        >
          reads confirmed here
        </text>

        {/* ── "data flows through" label ── */}
        <text
          x={W / 2}
          y={H - 14}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(1.8)}
        >
          data integrity preserved across all 3 versions
        </text>
      </svg>
    </div>
  );
}

// ─── Results Table ─────────────────────────────────────────────────────────────

function ResultsTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          RESULTS.forEach((_, i) => {
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
      <table className="w-full text-xs" style={{ minWidth: 520 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Test
            </th>
            <th className="pb-3 px-4 text-left font-mono text-teal-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              Result
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Note
            </th>
            <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Pass
            </th>
          </tr>
        </thead>
        <tbody>
          {RESULTS.map((row, i) => {
            const visible = visibleRows.has(i);
            return (
              <tr
                key={row.test}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-mono text-[var(--text-code)] leading-tight">
                  {row.test}
                </td>
                <td className="py-3 px-4 font-mono text-teal-500/80 leading-tight">
                  {row.result}
                </td>
                <td className="py-3 px-4 text-[var(--text-muted)] leading-tight">
                  {row.note}
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
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B13Page() {
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
            <span className="text-[var(--text-secondary)]">b13</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B13
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Runtime Upgrade Safety
            <br />
            <span className="text-[var(--text-muted)]">
              Data written in v0.2.12 reads correctly in v0.2.16.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Memory systems are only useful if they can be trusted over time. An
            agent writes a fact on Monday running v0.2.12. The system is upgraded
            Wednesday. The agent reads that fact on Friday running v0.2.16. Is it
            still there? B13 tests exactly this: three incremental version upgrades,
            5 cross-version probes, and a running research program as the most
            honest form of evidence.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Versions 0.2.12 → 0.2.14 → 0.2.16
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Cross-version durability
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
                score="4/5"
                label="Cross-version reads confirmed (v0.2.12 → v0.2.16)"
                variant="teal"
              />
              <ScoreChip
                score="3/3"
                label="Post-upgrade writes succeed immediately"
                variant="teal"
              />
              <ScoreChip
                score="1/1"
                label="Conflict state preserved across all 3 versions"
                variant="teal"
              />
            </div>
            <Callout type="finding">
              Iranti treats version upgrades as invisible to stored knowledge.
              Data written in v0.2.12 is readable in v0.2.16 without any
              migration step or warmup period.
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
              Every persistent system faces the upgrade problem. When storage
              formats, schema layouts, or serialization approaches change between
              versions, previously written data can become unreadable. For a
              memory infrastructure layer, this is a critical failure mode:
              agents accumulate knowledge over time and that knowledge must survive
              whatever version the operator chooses to run.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B13 tests upgrade safety across three incremental versions of
              Iranti: 0.2.12, 0.2.14, and 0.2.16. Data written in the earliest
              version is probed in the latest. Post-upgrade write capability is
              confirmed immediately after each upgrade. A conflict state created
              during the benchmark program is checked for integrity.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Beyond the targeted probe, the benchmark program itself is
              evidence: 11 benchmark tracks ran across all three versions, and
              agents naturally read data from earlier versions throughout. No
              upgrade ever caused a read failure during that program.
            </p>
          </div>
        </section>

        {/* How we tested it */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              How we tested it
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Two complementary approaches were used, each with a different
              signal quality.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  Targeted probe
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  5 specific entity-key pairs were written in v0.2.12 and then
                  explicitly queried in v0.2.16 after both intermediate upgrades
                  completed. 4 of 5 returned correctly. The 1 miss was a probe
                  design error — the query used a slightly different key name
                  than what was written. The entity was present and readable with
                  the correct key.
                </p>
              </div>
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
                  The program as evidence
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  More compelling than any synthetic probe: 11 benchmark tracks
                  ran across all three versions. B6 was re-run in v0.2.14 and
                  v0.2.16 reading entities first written in v0.2.12. B9 did the
                  same. No upgrade caused a read failure. The absence of failures
                  across a real research program running over weeks is the
                  strongest possible evidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Version timeline diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Version timeline
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Data written at v0.2.12 flows intact through two incremental upgrades
              and remains readable at v0.2.16. Each upgrade step is a full version
              promotion, not a patch.
            </p>
            <VersionTimeline />
          </div>
        </section>

        {/* Results table */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Test results
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Four upgrade safety properties measured across the v0.2.12 → v0.2.16
              upgrade path.
            </p>
            <ResultsTable />
            <p className="text-xs text-[var(--text-muted)] mt-4">
              The 4/5 cross-version read score reflects a probe design error, not
              a storage failure. The entity with the missed key was confirmed
              readable once the correct key was used.
            </p>
          </div>
        </section>

        {/* The program as evidence */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              The program as the strongest evidence
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              We built a research program on top of Iranti across 3 versions.
              Nothing broke. That is more meaningful than any synthetic test
              designed to pass.
            </p>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl mb-6">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">
                Cross-version reads observed in the program
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">B6 re-run in v0.2.14:</strong>{" "}
                    read entities originally written in v0.2.12. All reads succeeded.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">B6 re-run in v0.2.16:</strong>{" "}
                    same v0.2.12 entities, two upgrades later. All reads succeeded.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">B9 re-run in v0.2.16:</strong>{" "}
                    queried v0.2.12 entities for temporal consistency validation. No data
                    loss detected.
                  </span>
                </li>
                <li className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    <strong className="text-[var(--text-primary)]">11 tracks across 3 versions:</strong>{" "}
                    zero upgrade-related read failures recorded in the entire benchmark
                    program log.
                  </span>
                </li>
              </ul>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              A synthetic probe can be designed to pass. A real research program
              running continuously across upgrades cannot. The absence of failures
              here is the kind of evidence operators should care about.
            </p>
          </div>
        </section>

        {/* What this means in practice */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              What this means in practice
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  heading: "Your data survives the upgrade",
                  body: "Agents that wrote facts in an earlier version will find those facts intact after upgrading. No migration step is required.",
                },
                {
                  heading: "New writes work immediately",
                  body: "Post-upgrade write capability is confirmed within the same session. There is no warmup period before the system accepts new facts.",
                },
                {
                  heading: "Conflict states are preserved exactly",
                  body: "The contested entity created during the benchmark program remained in its exact conflict state through all three versions. Upgrades do not resolve or alter contested knowledge.",
                },
                {
                  heading: "Tools work the same way",
                  body: "The iranti_handshake tool returns the same structure in v0.2.16 as in v0.2.12. Agents do not need to adapt their tool calls across versions.",
                },
              ].map((item) => (
                <div
                  key={item.heading}
                  className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M3 8l3.5 3.5L13 5"
                        stroke="#14b8a6"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.heading}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-6">
                    {item.body}
                  </p>
                </div>
              ))}
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
                <strong>No cold restart test.</strong> The Iranti instance was
                live throughout the benchmark. A full cold restart — shutting the
                process down and starting a fresh one — after an upgrade was not
                tested. Data durability across a cold restart combined with an
                upgrade is a separate (and important) question.
              </Callout>
              <Callout type="warn">
                <strong>Incremental upgrades only.</strong> Only sequential
                incremental upgrades were tested: 0.2.12 → 0.2.14 → 0.2.16, in
                order. Jumping versions (e.g., 0.2.12 → 0.2.16 directly) was not
                tested and the result is unknown.
              </Callout>
              <Callout type="warn">
                <strong>No adversarial scenarios.</strong> Upgrade safety was
                tested under normal operating conditions. Partial writes at the
                exact moment of upgrade, upgrade failures midway, or instance
                crashes during version transitions were not tested.
              </Callout>
              <Callout type="warn">
                <strong>0.2.x series only.</strong> All tested versions are in
                the 0.2.x minor version series. This data cannot be used to make
                claims about major version boundary safety or the behavior of
                future 0.3.x or 1.0 transitions.
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
                <strong>Cross-version data integrity is solid.</strong> 4 of 5
                entity-key pairs from v0.2.12 were readable in v0.2.16 without
                any migration. The 1 miss was a probe design error, not data
                loss. The entity was confirmed present with the correct key.
              </Callout>
              <Callout type="finding">
                <strong>Write durability works across upgrades.</strong> 3 new
                facts written immediately after confirming v0.2.16 were all
                successful with no warmup period or state reconciliation step.
              </Callout>
              <Callout type="finding">
                <strong>API stability confirmed across 3 versions.</strong> The{" "}
                <code className="font-mono text-sm">iranti_handshake</code> tool
                returns the same structure in v0.2.16 as in v0.2.12. Agents do
                not need to change their tool usage patterns across minor version
                upgrades.
              </Callout>
              <Callout type="finding">
                <strong>The benchmark program is the best evidence.</strong>{" "}
                Eleven benchmark tracks, three versions, weeks of research work
                accumulated on top of Iranti — no upgrade ever caused data loss.
                This is a stronger signal than any targeted synthetic probe.
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
                Full trial execution records, upgrade logs, probe results, and
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
