"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

interface ResultRow {
  arm: string;
  score: string;
  scoreNum: number;
  scoreTotal: number;
  breakdown: string;
  variant: "teal" | "amber" | "muted";
}

const RESULTS: ResultRow[] = [
  {
    arm: "Baseline (context-reading)",
    score: "4/4",
    scoreNum: 4,
    scoreTotal: 4,
    breakdown:
      "Model scans a plain text document; all 4 multi-hop entity chains resolved correctly.",
    variant: "muted",
  },
  {
    arm: "Iranti oracle path",
    score: "4/4",
    scoreNum: 4,
    scoreTotal: 4,
    breakdown:
      "Entity IDs known upfront; exact lookup chains work perfectly across both hops.",
    variant: "teal",
  },
  {
    arm: "Iranti search path",
    score: "1/4",
    scoreNum: 1,
    scoreTotal: 4,
    breakdown:
      "Search-based entity discovery at hop 2 fails; consistently returns oldest KB entries, ignores recent writes.",
    variant: "amber",
  },
];

const HYPOTHESES = [
  {
    title: "Indexing lag",
    detail:
      "Vector embeddings may not generate immediately for newly written entries. When the benchmark writes an entity and then queries for it seconds later, the embedding index may not yet include it — causing search to fall back to older, already-indexed entries.",
  },
  {
    title: "Value-vs-summary indexing",
    detail:
      "Search may index auto-generated summaries rather than structured field values. If the summary does not faithfully reproduce the written value, attribute-value searches will miss the correct entry even when it is present in the store.",
  },
  {
    title: "Score bias toward older entries",
    detail:
      "Older KB entries have accumulated higher confidence scores over repeated reads. When search returns the top-5 by relevance, score-weighted ranking may consistently surface high-confidence old entries over lower-scored new ones, regardless of semantic match quality.",
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

// ─── Two-Hop Chain Diagram ────────────────────────────────────────────────────

function TwoHopDiagram() {
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
  const H = 220;

  // Node geometry
  const nodeW = 148;
  const nodeH = 60;
  const yCenter = H / 2 - 10;

  // X centers for 3 nodes
  const aliceX = nodeW / 2 + 24;
  const mitX = W / 2;
  const unknownX = W - nodeW / 2 - 24;

  // Arrow 1: Alice → MIT (oracle, solid teal)
  const arrow1X1 = aliceX + nodeW / 2;
  const arrow1X2 = mitX - nodeW / 2;
  const arrow1Len = arrow1X2 - arrow1X1;
  const arrow1Y = yCenter;

  // Arrow 2: MIT → Unknown (search, dashed amber)
  const arrow2X1 = mitX + nodeW / 2;
  const arrow2X2 = unknownX - nodeW / 2;
  const arrow2Len = arrow2X2 - arrow2X1;
  const arrow2Y = yCenter;

  const oracleLineStyle = (len: number, delay: number) =>
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

  // Dashed amber line: draw using strokeDasharray pattern for "dashed" appearance
  // We animate the offset for the draw-on effect, then the dashes are the pattern
  const searchLineStyle = (len: number, delay: number) => {
    if (revealed) {
      return {
        strokeDasharray: `8 5`,
        strokeDashoffset: 0,
        opacity: 1,
        transition: `opacity 0.6s ease ${delay}s`,
      };
    }
    return {
      strokeDasharray: `8 5`,
      strokeDashoffset: 0,
      opacity: 0,
      transition: "none",
    };
  };

  const fadeIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 0.3s ease ${delay}s`,
  });

  // Failure X mark
  const xCx = (arrow2X1 + arrow2X2) / 2;
  const xCy = arrow2Y;

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[720px] mx-auto"
        style={{ minWidth: 340 }}
        aria-label="Two-hop entity chain: Alice Chen to MIT CS via oracle path (teal, solid), then MIT CS to unknown entity via search path (amber, dashed, failing)."
      >
        {/* ── Alice Chen node ── */}
        <rect
          x={aliceX - nodeW / 2}
          y={yCenter - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.55"
          strokeWidth="1"
        />
        <text
          x={aliceX}
          y={yCenter - 8}
          textAnchor="middle"
          fontSize="11"
          fill="#14b8a6"
          fontFamily="monospace"
        >
          Alice Chen
        </text>
        <text
          x={aliceX}
          y={yCenter + 10}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
        >
          entity/person/alice
        </text>

        {/* ── MIT CS node ── */}
        <rect
          x={mitX - nodeW / 2}
          y={yCenter - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.45"
          strokeWidth="1"
        />
        <text
          x={mitX}
          y={yCenter - 8}
          textAnchor="middle"
          fontSize="11"
          fill="#14b8a6"
          fontFamily="monospace"
        >
          MIT CS
        </text>
        <text
          x={mitX}
          y={yCenter + 10}
          textAnchor="middle"
          fontSize="9"
          fill="#0d9488"
          fontFamily="monospace"
        >
          entity/dept/mit-cs
        </text>

        {/* ── Unknown node (search target) ── */}
        <rect
          x={unknownX - nodeW / 2}
          y={yCenter - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#f59e0b"
          strokeOpacity="0.45"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        <text
          x={unknownX}
          y={yCenter - 8}
          textAnchor="middle"
          fontSize="11"
          fill="#f59e0b"
          fontFamily="monospace"
        >
          ? (search target)
        </text>
        <text
          x={unknownX}
          y={yCenter + 10}
          textAnchor="middle"
          fontSize="9"
          fill="#d97706"
          fontFamily="monospace"
        >
          ID unknown — need search
        </text>

        {/* ── Hop 1 arrow: Alice → MIT (solid teal) ── */}
        <line
          x1={arrow1X1}
          y1={arrow1Y}
          x2={arrow1X2 - 8}
          y2={arrow1Y}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={oracleLineStyle(arrow1Len, 0.1)}
        />
        <polygon
          points={`${arrow1X2 - 8},${arrow1Y - 5} ${arrow1X2},${arrow1Y} ${arrow1X2 - 8},${arrow1Y + 5}`}
          fill="#14b8a6"
          style={fadeIn(0.1 + 0.75)}
        />
        <text
          x={(arrow1X1 + arrow1X2) / 2}
          y={arrow1Y - 10}
          textAnchor="middle"
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(0.9)}
        >
          Hop 1: exact lookup ✓
        </text>

        {/* ── Hop 2 arrow: MIT → Unknown (dashed amber, failing) ── */}
        <line
          x1={arrow2X1}
          y1={arrow2Y}
          x2={arrow2X2 - 8}
          y2={arrow2Y}
          stroke="#f59e0b"
          strokeWidth="1.5"
          style={searchLineStyle(arrow2Len, 1.0)}
        />
        <polygon
          points={`${arrow2X2 - 8},${arrow2Y - 5} ${arrow2X2},${arrow2Y} ${arrow2X2 - 8},${arrow2Y + 5}`}
          fill="#f59e0b"
          style={fadeIn(1.5)}
        />
        <text
          x={(arrow2X1 + arrow2X2) / 2}
          y={arrow2Y - 10}
          textAnchor="middle"
          fontSize="9"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(1.1)}
        >
          Hop 2: search-based ✗
        </text>

        {/* ── Failure X mark ── */}
        <line
          x1={xCx - 6}
          y1={xCy + 18}
          x2={xCx + 6}
          y2={xCy + 30}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          style={fadeIn(1.6)}
        />
        <line
          x1={xCx + 6}
          y1={xCy + 18}
          x2={xCx - 6}
          y2={xCy + 30}
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          style={fadeIn(1.6)}
        />

        {/* ── Legend ── */}
        <line
          x1={aliceX - 20}
          y1={H - 22}
          x2={aliceX + 10}
          y2={H - 22}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={fadeIn(2.0)}
        />
        <text
          x={aliceX + 14}
          y={H - 18}
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(2.0)}
        >
          oracle path (exact lookup)
        </text>
        <line
          x1={mitX + 30}
          y1={H - 22}
          x2={mitX + 60}
          y2={H - 22}
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="5 3"
          style={fadeIn(2.1)}
        />
        <text
          x={mitX + 64}
          y={H - 18}
          fontSize="9"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(2.1)}
        >
          search path (failing)
        </text>
      </svg>
    </div>
  );
}

// ─── Results Table ────────────────────────────────────────────────────────────

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
      <table className="w-full text-xs" style={{ minWidth: 520 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Arm
            </th>
            <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Score
            </th>
            <th className="pb-3 pl-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Per-question breakdown
            </th>
          </tr>
        </thead>
        <tbody>
          {RESULTS.map((row, i) => {
            const visible = visibleRows.has(i);
            return (
              <tr
                key={row.arm}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-mono text-[var(--text-secondary)] leading-tight whitespace-nowrap">
                  {row.arm}
                </td>
                <td
                  className={`py-3 px-4 text-center font-mono font-semibold text-base ${scoreColorMap[row.variant]}`}
                >
                  {row.score}
                </td>
                <td className="py-3 pl-4 text-[var(--text-muted)] leading-relaxed">
                  {row.breakdown}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-[var(--border-light)]">
            <td className="pt-3 pr-4 font-mono text-[var(--text-faint)]">
              Total (3 arms)
            </td>
            <td className="pt-3 px-4 text-center font-mono text-[var(--text-faint)]">
              9/12
            </td>
            <td className="pt-3 pl-4 font-mono text-[var(--text-faint)]">
              Oracle path drives all Iranti correctness
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Search Failure Analysis ───────────────────────────────────────────────────

function SearchFailureAnalysis() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          HYPOTHESES.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
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

  return (
    <div ref={ref} className="space-y-4">
      {HYPOTHESES.map((h, i) => {
        const visible = visibleCards.has(i);
        return (
          <div
            key={h.title}
            className="border border-amber-500/30 bg-amber-500/5 rounded-lg px-5 py-4"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.35s ease, transform 0.35s ease",
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono text-amber-500 uppercase tracking-wider">
                Hypothesis {i + 1}
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                {h.title}
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {h.detail}
            </p>
          </div>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B4Page() {
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
            <span className="text-[var(--text-secondary)]">b4</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B4
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Multi-hop Entity Reasoning
            <br />
            <span className="text-[var(--text-muted)]">
              Oracle path: 4/4. Search path: 1/4.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            B4 tests whether Iranti supports chained entity lookups — hop 1
            resolves an entity, hop 2 uses that result to find another. The
            finding is a clear split: when entity IDs are known upfront, chains
            work perfectly. When hop 2 requires search-based discovery, it
            consistently fails.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              n=4, 3 arms
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              Search discovery gap documented
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
                score="4/4"
                label="Oracle path — entity IDs known, exact lookup chains work perfectly"
                variant="teal"
              />
              <ScoreChip
                score="1/4"
                label="Search path — search-based discovery at hop 2 fails reliably"
                variant="amber"
              />
              <ScoreChip
                score="4/4"
                label="Baseline (context-reading) — expected for small KB size"
                variant="muted"
              />
            </div>
            <Callout type="finding">
              The oracle path and search path produce opposite results. This is
              not a marginal gap — it is a capability boundary. Multi-hop
              reasoning in Iranti is currently reliable only when callers supply
              entity IDs directly.
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
              Multi-hop entity reasoning is the ability to chain lookups: resolve
              entity A, extract a property from A, use that property to locate
              entity B, then continue. This pattern appears constantly in
              real-world agent work — traversing org charts, tracing dependency
              graphs, following relationship chains across a knowledge base.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B4 constructs two-hop chains and tests them three ways. The
              baseline arm gives the model a plain text document and lets it read
              the answer directly — no Iranti calls, just context. The oracle arm
              provides entity IDs at each hop so Iranti can do exact lookups. The
              search arm withholds the hop-2 ID and forces the model to discover
              the target entity by querying on attribute values.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              The gap between oracle (4/4) and search (1/4) isolates the exact
              failure: not the chaining logic, not the model, not the hop-1
              retrieval — just search-based entity discovery at intermediate
              hops.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              The baseline outperforming search-based Iranti is expected at small
              KB sizes. As KB size grows beyond what fits in context, the
              ordering is expected to invert. This benchmark does not test that
              crossover point.
            </p>
          </div>
        </section>

        {/* Two-hop chain diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The two-hop chain
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Hop 1 uses an exact entity ID — the oracle path (solid teal) works
              perfectly. Hop 2 requires discovering the next entity by attribute
              value — the search path (dashed amber) fails consistently. The
              broken step is search, not the chain logic.
            </p>
            <TwoHopDiagram />
          </div>
        </section>

        {/* Results comparison table */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Results across all three arms
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Four multi-hop chains tested per arm. The oracle arm matches the
              baseline. The search arm fails 3 of 4.
            </p>
            <ResultsTable />
            <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
              All chains used the same underlying entity graph. The only
              difference between oracle and search arms is whether the hop-2
              entity ID was supplied or had to be discovered through search.
            </p>
          </div>
        </section>

        {/* Search failure analysis */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Why did search fail? Three hypotheses
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              The search arm consistently returned the oldest KB entries and
              ignored recently written ones. The raw results do not conclusively
              determine the cause — these are the three most plausible
              explanations from the observed behavior.
            </p>
            <SearchFailureAnalysis />
            <p className="text-xs text-[var(--text-muted)] mt-6 leading-relaxed">
              These hypotheses are not mutually exclusive. All three could
              contribute simultaneously. Isolating the actual cause requires a
              targeted follow-up benchmark that controls for write timing,
              summary content, and entry age independently.
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
                <strong>Small test set (n=4).</strong> Four chains per arm is
                enough to identify a clear directional signal. It is not enough
                to characterize the failure rate precisely — the true search
                failure rate could range from 50% to near 100% on different KB
                configurations.
              </Callout>
              <Callout type="warn">
                <strong>Single session.</strong> All three arms ran in one
                benchmark session. Session-specific factors — KB state at test
                time, ordering effects, specific entity values chosen — may
                influence results in ways that do not generalize.
              </Callout>
              <Callout type="warn">
                <strong>Single KB size.</strong> The crossover point where
                search-based Iranti outperforms context-reading baseline was not
                tested. At large KB sizes, context-reading becomes impossible and
                the oracle path remains the only reliable option. This benchmark
                does not characterize that regime.
              </Callout>
              <Callout type="info">
                <strong>Hypotheses are unverified.</strong> The three search
                failure hypotheses are inferred from behavior, not confirmed
                through controlled experiments. Do not treat them as established
                facts about Iranti&apos;s internals.
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
                <strong>Oracle multi-hop works perfectly.</strong> When entity
                IDs are known at each hop, Iranti chains exact lookups without
                error. Chain as many hops as needed — the constraint is ID
                availability, not chain depth.
              </Callout>
              <Callout type="finding">
                <strong>Search-based discovery is unreliable at hop 2.</strong>{" "}
                Using search to discover the next entity in a chain currently
                fails 3 of 4 times. Applications that depend on attribute-value
                searches at intermediate hops should not rely on this path in
                production.
              </Callout>
              <Callout type="finding">
                <strong>Context-reading matches oracle at small scale.</strong>{" "}
                For knowledge bases small enough to fit in context, the baseline
                approach (plain text document) is equivalent to the oracle path.
                The oracle path advantage emerges at scale, which this benchmark
                does not test.
              </Callout>
              <Callout type="finding">
                <strong>This is a documented capability gap, not a bug.</strong>{" "}
                The failure is in search-based entity discovery, a known hard
                problem in vector search systems. The gap is real, documented
                honestly, and has a clear workaround: supply entity IDs whenever
                possible.
              </Callout>
            </div>
          </div>
        </section>

        {/* v0.2.16 Update */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              v0.2.16 Update: Search Restored
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              The search regression that caused 1/4 in v0.2.12 and a full crash in v0.2.14 has been
              fixed in v0.2.16. Vector scoring is now active (scores 0.35–0.74), and the three
              original failing queries — find-by-institution, find-by-prior-employer,
              find-by-institution-peer — now work correctly. The test used direct attribute values,
              which is now the reliable path.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-xs" style={{ minWidth: 500 }}>
                <thead>
                  <tr className="border-b border-[var(--border-light)]">
                    <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">Version</th>
                    <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">iranti_search</th>
                    <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">Vector score</th>
                    <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">Direct attribute</th>
                    <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">Semantic paraphrase</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { v: "0.2.12", status: "Degraded", vector: "0 (disabled)", direct: "Partial", semantic: "Fails", statusColor: "text-amber-500" },
                    { v: "0.2.14", status: "Crashes", vector: "N/A", direct: "N/A", semantic: "N/A", statusColor: "text-amber-500" },
                    { v: "0.2.16", status: "Operational", vector: "0.35–0.74", direct: "Works ✓", semantic: "Fails", statusColor: "text-teal-500" },
                  ].map((row) => (
                    <tr key={row.v} className="border-t border-[var(--border-subtle)]">
                      <td className="py-3 pr-4 font-mono text-[var(--text-code)]">{row.v}</td>
                      <td className={`py-3 px-4 text-center font-mono ${row.statusColor}`}>{row.status}</td>
                      <td className="py-3 px-4 text-center font-mono text-[var(--text-muted)]">{row.vector}</td>
                      <td className={`py-3 px-4 text-center font-mono ${row.v === "0.2.16" ? "text-teal-500" : "text-[var(--text-muted)]"}`}>{row.direct}</td>
                      <td className="py-3 pl-4 text-center font-mono text-amber-500">{row.semantic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="space-y-4">
              <Callout type="finding">
                <strong>Direct attribute search now works.</strong> Queries like &ldquo;find the
                researcher at MIT Computer Science&rdquo; or &ldquo;find the researcher who came from
                OpenAI&rdquo; now return the correct entity. The original 3 failing queries from
                v0.2.12 all pass in v0.2.16. Multi-hop chains over direct attributes are viable.
              </Callout>
              <Callout type="warn">
                <strong>Remaining ceiling: semantic paraphrase.</strong> If the query describes an
                entity indirectly — &ldquo;find the researcher who studies causality and inference
                without econometrics&rdquo; — rather than naming an attribute directly, search still
                fails. The system retrieves by attribute value better than it reasons about semantic
                descriptions of what those values mean. Design multi-hop chains around direct attribute
                lookups, not indirect descriptions.
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
                Full trial execution records, per-question scores, entity
                graphs, and methodology notes in the benchmarking repository.
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
