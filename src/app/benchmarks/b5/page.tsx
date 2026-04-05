"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

type Outcome = "accepted" | "rejected-correct" | "error-timeout";

interface TestCase {
  id: string;
  description: string;
  gap: number | null;
  gapLabel: string;
  outcome: Outcome;
  outcomeLabel: string;
  note: string;
}

const TEST_CASES: TestCase[] = [
  {
    id: "T1",
    description: "New source, higher raw conf (92 vs 85), gap 2.9 pts",
    gap: 2.9,
    gapLabel: "2.9 pts",
    outcome: "error-timeout",
    outcomeLabel: "ERROR",
    note: "LLM arbitration — DB transaction timed out (~10s API, 5s window)",
  },
  {
    id: "T1b",
    description: "Same source, higher conf (97 vs 85), gap 10.4 pts",
    gap: 10.4,
    gapLabel: "10.4 pts",
    outcome: "accepted",
    outcomeLabel: "ACCEPTED",
    note: "Deterministic resolution — gap exceeded threshold",
  },
  {
    id: "T2",
    description: "Lower-confidence update to high-confidence fact",
    gap: null,
    gapLabel: "negative",
    outcome: "rejected-correct",
    outcomeLabel: "REJECTED",
    note: "Correct behavior — lower confidence lost",
  },
  {
    id: "T3",
    description: "Same value, lower confidence (duplicate detection)",
    gap: null,
    gapLabel: "same value",
    outcome: "rejected-correct",
    outcomeLabel: "REJECTED",
    note: "Duplicate value with lower score — deduplicated",
  },
  {
    id: "T4",
    description: "New source, small confidence increase (80 → 85), gap 4.25 pts",
    gap: 4.25,
    gapLabel: "4.25 pts",
    outcome: "error-timeout",
    outcomeLabel: "ERROR",
    note: "LLM arbitration — DB transaction timed out (~16s API, 5s window)",
  },
  {
    id: "T5",
    description: "New source, forced high confidence (70 → 99), gap 24.6 pts",
    gap: 24.6,
    gapLabel: "24.6 pts",
    outcome: "accepted",
    outcomeLabel: "ACCEPTED",
    note: "Deterministic resolution — large gap bypasses LLM arbitration entirely",
  },
];

const DETERMINISTIC_THRESHOLD = 10;
// T5 has the largest gap (24.6 pts); set ceiling to 28 for headroom
const MAX_GAP_FOR_BARS = 28;

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

// ─── Animated Test Cases Table ────────────────────────────────────────────────

function TestCasesTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          TEST_CASES.forEach((_, i) => {
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

  function outcomeColor(outcome: Outcome) {
    if (outcome === "accepted") return "text-teal-500";
    if (outcome === "rejected-correct") return "text-teal-500/70";
    return "text-amber-500";
  }

  function outcomeBadge(outcome: Outcome) {
    if (outcome === "accepted")
      return "bg-teal-500/10 border-teal-500/30 text-teal-500";
    if (outcome === "rejected-correct")
      return "bg-teal-500/5 border-teal-500/20 text-teal-500/70";
    return "bg-amber-500/10 border-amber-500/30 text-amber-500";
  }

  function barColor(outcome: Outcome) {
    if (outcome === "accepted") return "#14b8a6";
    if (outcome === "rejected-correct") return "#14b8a6";
    return "#f59e0b";
  }

  function barOpacity(outcome: Outcome) {
    if (outcome === "rejected-correct") return 0.45;
    return 0.85;
  }

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-xs" style={{ minWidth: 580 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Case
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Description
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
              Gap
            </th>
            <th className="pb-3 pl-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Outcome
            </th>
          </tr>
        </thead>
        <tbody>
          {TEST_CASES.map((tc, i) => {
            const visible = visibleRows.has(i);
            return (
              <tr
                key={tc.id}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-mono text-[var(--text-code)] font-semibold">
                  {tc.id}
                </td>
                <td className="py-3 px-4 text-[var(--text-secondary)] leading-snug">
                  {tc.description}
                  <div className="text-[var(--text-faint)] mt-0.5">{tc.note}</div>
                </td>
                <td className={`py-3 px-4 font-mono whitespace-nowrap ${outcomeColor(tc.outcome)}`}>
                  {tc.gapLabel}
                </td>
                <td className="py-3 pl-4">
                  <span
                    className={`inline-block px-2 py-0.5 border rounded font-mono text-[10px] uppercase tracking-wider ${outcomeBadge(tc.outcome)}`}
                  >
                    {tc.outcomeLabel}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="border-t border-[var(--border-light)]">
            <td colSpan={4} className="pt-3 font-mono text-[var(--text-faint)] text-[10px]">
              Teal = accepted or correctly rejected. Amber = error (LLM arbitration timed out; incumbent preserved by rollback).
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Score Gap Visualization ──────────────────────────────────────────────────

function ScoreGapViz() {
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

  // threshold line position as % of bar area
  const thresholdPct = (DETERMINISTIC_THRESHOLD / MAX_GAP_FOR_BARS) * 100;

  function vizBarColor(outcome: Outcome) {
    if (outcome === "accepted") return "#14b8a6"; // teal-500
    if (outcome === "rejected-correct") return "#14b8a6";
    return "#f59e0b"; // amber-500
  }

  function vizBarOpacity(outcome: Outcome) {
    if (outcome === "rejected-correct") return 0.45;
    return 0.85;
  }

  function barWidthPct(tc: TestCase): number {
    if (tc.gap === null) {
      return (1.2 / MAX_GAP_FOR_BARS) * 100;
    }
    return Math.min((tc.gap / MAX_GAP_FOR_BARS) * 100, 100);
  }

  return (
    <div ref={ref} className="space-y-4">
      {/* threshold legend */}
      <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-faint)] mb-2">
        <span>0 pts</span>
        <div className="flex-1 relative h-px bg-[var(--border-subtle)]">
          <div
            className="absolute top-0 h-5 border-l border-dashed border-teal-500/60 -translate-y-1/2"
            style={{ left: `${thresholdPct}%` }}
          />
        </div>
        <span className="text-teal-500/80 whitespace-nowrap">
          10 pt threshold (deterministic)
        </span>
        <span>{MAX_GAP_FOR_BARS} pts</span>
      </div>

      {/* bars */}
      <div className="space-y-3 relative">
        {/* vertical threshold line behind bars */}
        <div
          className="absolute top-0 bottom-0 border-l border-dashed border-teal-500/30 pointer-events-none"
          style={{ left: `calc(${thresholdPct}% + 4rem)` }}
        />

        {TEST_CASES.map((tc, i) => {
          const widthPct = barWidthPct(tc);
          const color = vizBarColor(tc.outcome);
          const opacity = vizBarOpacity(tc.outcome);
          const delay = i * 0.1;

          return (
            <div key={tc.id} className="flex items-center gap-4">
              <span className="w-8 text-xs font-mono text-[var(--text-faint)] flex-shrink-0 text-right">
                {tc.id}
              </span>
              <div className="flex-1 h-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded overflow-hidden relative">
                {/* bar fill */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    height: "100%",
                    width: revealed ? `${widthPct}%` : "0%",
                    backgroundColor: color,
                    opacity,
                    borderRadius: "inherit",
                    transition: `width 0.65s cubic-bezier(0.4, 0, 0.2, 1) ${delay}s`,
                  }}
                />
                {/* threshold marker inside bar area */}
                <div
                  className="absolute top-0 bottom-0 border-l border-dashed border-teal-500/50 pointer-events-none"
                  style={{ left: `${thresholdPct}%` }}
                />
              </div>
              <span
                className="w-20 text-xs font-mono flex-shrink-0"
                style={{ color, opacity: revealed ? 1 : 0, transition: `opacity 0.3s ease ${delay + 0.65}s` }}
              >
                {tc.gapLabel}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-[var(--text-faint)] leading-relaxed pt-2">
        Bar length = weighted score gap between update and existing fact.
        Teal = accepted or correctly rejected. Amber = LLM arbitration triggered a timeout.
        The vertical dashed line marks the 10-point threshold above which resolution is deterministic.
        T1b and T5 both clear this threshold and both were accepted. T1 and T4 fall below it and both errored.
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B5Page() {
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
            <span className="text-[var(--text-secondary)]">b5</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B5
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Knowledge Currency
            <br />
            <span className="text-[var(--text-muted)]">
              Updating a fact is harder than writing one.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Long-lived agents depend on KB facts staying accurate as the world
            changes. B5 tests whether Iranti supports updating facts that already
            exist. The finding: update behavior is complex and depends on source
            reliability, not just confidence scores.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              n=5 test cases
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              LLM-arbitrated writes: transaction timeout
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
                score="2/6"
                label="Updates accepted (T1b deterministic, T5 large-gap cross-source)"
                variant="teal"
              />
              <ScoreChip
                score="2/6"
                label="Correct rejections (lower-conf or duplicate updates blocked)"
                variant="teal"
              />
              <ScoreChip
                score="2/6"
                label="Errors — LLM-arbitrated writes timed out (T1, T4)"
                variant="amber"
              />
            </div>
            <Callout type="finding">
              There is no simple &ldquo;update this fact&rdquo; operation. All writes go through
              conflict detection. When the score gap is &ge;10 points, resolution is
              deterministic and reliable. When the gap falls below the threshold, LLM
              arbitration is triggered — and under a real provider, the DB transaction
              times out before the result can persist.
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
              A KB that only supports writing new facts is useful for accumulation
              but fragile for long-lived agents. The world changes. Decisions get
              revised. Facts go stale. An agent system that cannot update its own
              knowledge will eventually act on wrong information with high confidence.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B5 probes Iranti&apos;s update semantics directly: can a higher-confidence
              or more current value replace an existing fact? The answer depends on
              whether the conflict resolves deterministically (gap &ge;10 points in
              weighted score) or routes to LLM arbitration. When the gap is large
              enough, the write succeeds regardless of source history. When it is
              not, LLM arbitration fires — and under a real provider, the DB
              transaction times out before the result can persist.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              T2 and T3 produce correct rejections: a lower-confidence update
              should not displace a high-confidence fact, and a duplicate value
              with lower score should be deduped. T1b and T5 confirm that
              deterministic resolution works for both same-source and cross-source
              writes when the score gap is sufficient. T1 and T4 expose the
              transaction timeout defect on the LLM-arbitrated path.
            </p>
          </div>
        </section>

        {/* Animated test cases table */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The six test cases
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Each case attempts to update an existing KB fact with a new value.
              <span className="text-teal-500"> Teal</span> = accepted or correctly rejected.
              <span className="text-amber-500"> Amber</span> = error (transaction timeout).
              Gap = weighted score delta between update and existing value.
            </p>
            <TestCasesTable />
          </div>
        </section>

        {/* Score gap visualization */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Confidence gap vs. outcome
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Each bar shows the weighted score gap between the incoming update and the
              existing fact. The dashed vertical line marks the ~10-point threshold
              above which Iranti resolves conflicts deterministically — bypassing LLM
              arbitration entirely. Below that line, arbitration runs and the DB
              transaction times out under a real provider.
            </p>
            <ScoreGapViz />
          </div>
        </section>

        {/* Why source reliability matters */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              Why source reliability matters
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Iranti tracks source reliability as an accumulated signal: the more
              facts a source has written that were accepted and stable, the higher
              its reliability score. This is a sound design for preventing noisy or
              adversarial sources from overwriting high-quality facts.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The problem emerges when a new, correct source attempts to update a fact
              originally written by an established source. The new source has no
              accumulated reliability — even if its confidence on this specific fact
              is higher. When the score gap is below the deterministic threshold,
              LLM arbitration is triggered. Under a real LLM provider, the API
              latency (8–16 s observed) exceeds the 5,000 ms DB transaction window,
              causing a transaction timeout before the result can persist. The
              incumbent is preserved by rollback.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              T5 (new) shows the workaround: with a confidence gap large enough to
              score 24.6 points above the existing fact, deterministic resolution
              fires without any LLM call — and the update succeeds even across
              different sources. The reliable update path is a large gap, not a
              same-source write.
            </p>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">
                The accumulation mechanic
              </div>
              <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    Every accepted write increases the writing source&apos;s reliability score.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    A new source starts with no history — it has no reliability advantage even if its value is better.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    Deterministic resolution (gap &gt; ~10 pts) bypasses this bias and lets a
                    sufficiently superior value win regardless of source history.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>
                    Below the threshold, LLM arbitration runs — and under a real provider,
                    the DB transaction times out before the result persists. Incumbent is
                    preserved by rollback. The write silently fails from the caller&apos;s perspective.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* The stale fact problem */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              The stale fact problem
            </h2>
            <Callout type="warn">
              <strong>Silent persistence of wrong facts.</strong> When a legitimate
              update is rejected by LLM arbitration, the KB retains the original
              value with no flag that a challenge was attempted or that an alternative
              exists. A downstream agent querying that fact will receive a confident,
              high-score answer that may be outdated. Stale facts can persist silently.
              There is no &ldquo;contested&rdquo; or &ldquo;possibly outdated&rdquo; marker on rejected updates.
            </Callout>
            <p className="text-[var(--text-secondary)] leading-relaxed mt-6 mb-4">
              This is not a bug in the traditional sense — the conflict detection
              worked as designed. But the design has a gap: it treats an update
              rejection as &ldquo;fact unchanged&rdquo; rather than &ldquo;fact challenged.&rdquo; For
              long-lived agents, that distinction matters. A fact that was challenged
              and survived arbitration is epistemically different from a fact that
              was never challenged.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              Until a flagging or versioning mechanism exists, teams using Iranti for
              knowledge that changes over time should periodically rewrite facts from
              the original source with an elevated confidence score to force deterministic
              resolution, or use the same source identifier for all updates to avoid
              the established-source bias.
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
                <strong>Small test set (n=6).</strong> Six test cases document the
                behavior pattern and surface the transaction timeout defect. They are
                not enough to characterize the LLM arbitration boundary precisely or
                measure how the timeout rate varies with model latency distribution.
              </Callout>
              <Callout type="warn">
                <strong>Single session.</strong> All cases were tested within one
                session. Cross-session source reliability accumulation — where an established
                source built its history across many prior sessions — was not tested.
              </Callout>
              <Callout type="warn">
                <strong>LLM arbitration outcome is unobservable.</strong> T1 and T4
                triggered LLM arbitration but timed out before results could persist.
                Whether the &ldquo;established source bias&rdquo; observed in v0.2.12 (mock LLM)
                still holds with a real provider is unknown — the test cases that would
                expose it cannot complete under current infrastructure.
              </Callout>
              <Callout type="info">
                <strong>T2 and T3 are correct behavior.</strong> Rejecting a lower-confidence
                update and deduplicating a same-value lower-score entry are the intended
                semantics. These are not limitations — they are confirmation that basic
                conflict detection works correctly.
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
                <strong>No simple update operation.</strong> Every write to an existing
                key goes through conflict detection. There is no way to force an update
                without either exceeding the deterministic threshold or using the same
                source identifier as the original write.
              </Callout>
              <Callout type="finding">
                <strong>LLM-arbitrated writes time out under a real provider (v0.2.16).</strong>{" "}
                In v0.2.12 (mock LLM), T1 and T4 returned a clean REJECTED with an LLM
                reason string. In v0.2.16 with a real OpenAI call, the same cases produce
                a transaction timeout error — the incumbent is preserved by rollback, but
                no reason is returned. Whether the &ldquo;established source bias&rdquo; from v0.2.12
                still holds in v0.2.16 is unknown: the LLM result never persists.
              </Callout>
              <Callout type="finding">
                <strong>Deterministic resolution requires a ~10-point gap.</strong> T1b
                (same source, gap 10.4 pts) and T5 (cross-source, gap 24.6 pts) both
                accepted deterministically. Updates below this gap will route to LLM
                arbitration — which currently times out under a real provider. For
                cross-source updates, a large confidence gap is the only reliable path.
              </Callout>
              <Callout type="finding">
                <strong>Duplicate detection works correctly.</strong> T3 confirmed that
                a same-value, lower-confidence write is correctly identified and rejected
                as a duplicate. The deduplication logic operates as expected.
              </Callout>
              <Callout type="finding">
                <strong>No contested-fact flag exists.</strong> Rejected updates leave
                no trace in the KB. Agents querying updated keys receive the original
                value with no indication that a more recent alternative was proposed and
                rejected. This is the primary operational risk for long-lived agents.
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
                Full trial execution records, conflict resolution logs, and methodology
                notes in the benchmarking repository.
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
