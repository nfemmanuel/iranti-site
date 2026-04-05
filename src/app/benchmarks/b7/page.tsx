"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

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

// ─── Session Timeline Diagram ─────────────────────────────────────────────────

interface TimelineEvent {
  turn: number;
  label: string;
  type: "date" | "number" | "name" | "percent";
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  { turn: 3, label: "date fact", type: "date" },
  { turn: 12, label: "number fact", type: "number" },
  { turn: 22, label: "number fact", type: "number" },
  { turn: 31, label: "% fact", type: "percent" },
  { turn: 40, label: "name fact", type: "name" },
  { turn: 45, label: "name fact", type: "name" },
  { turn: 47, label: "Apr 10", type: "date" },
  { turn: 48, label: "Apr 12", type: "date" },
  { turn: 49, label: "Apr 19", type: "date" },
  { turn: 50, label: "Apr 22", type: "date" },
];

function SessionTimelineDiagram() {
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
  const H = 240;
  const timelineY = 110;
  const timelineX1 = 32;
  const timelineX2 = W - 80;
  const timelineLen = timelineX2 - timelineX1;

  // Map turn number (1-51) to x position
  const turnToX = (turn: number) =>
    timelineX1 + ((turn - 1) / 50) * timelineLen;

  const probeX = timelineX2 + 20;

  const typeColor = (type: TimelineEvent["type"]) => {
    if (type === "date") return "#f59e0b";
    if (type === "number") return "#14b8a6";
    if (type === "name") return "#a78bfa";
    return "#60a5fa"; // percent
  };

  const lineStyle = (len: number, delay: number) =>
    revealed
      ? {
          strokeDasharray: len,
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 0.9s ease ${delay}s`,
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
        style={{ minWidth: 380 }}
        aria-label="Session timeline: fact events across 51 turns, with Iranti arm writing to KB at each event and baseline arm reading at the end"
      >
        {/* ── Timeline baseline ── */}
        <line
          x1={timelineX1}
          y1={timelineY}
          x2={timelineX2 - 8}
          y2={timelineY}
          stroke="var(--border-light)"
          strokeWidth="1.5"
          style={lineStyle(timelineLen, 0.05)}
        />
        {/* Arrow head */}
        <polygon
          points={`${timelineX2 - 8},${timelineY - 5} ${timelineX2},${timelineY} ${timelineX2 - 8},${timelineY + 5}`}
          fill="var(--border-light)"
          style={fadeIn(0.05 + 0.9)}
        />

        {/* ── Turn labels ── */}
        <text
          x={timelineX1}
          y={timelineY + 20}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(0.1)}
        >
          Turn 1
        </text>
        <text
          x={timelineX2}
          y={timelineY + 20}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(0.1)}
        >
          Turn 51
        </text>

        {/* ── Iranti arm: amber dots + write lines ── */}
        {TIMELINE_EVENTS.map((evt, i) => {
          const x = turnToX(evt.turn);
          const color = typeColor(evt.type);
          const delay = 0.2 + i * 0.08;
          // Draw write line going up
          const writeLen = 28;
          return (
            <g key={`iranti-${i}`}>
              {/* Vertical write line (amber for date cluster) */}
              <line
                x1={x}
                y1={timelineY - 4}
                x2={x}
                y2={timelineY - writeLen - 4}
                stroke={color}
                strokeWidth="1"
                strokeOpacity="0.6"
                style={lineStyle(writeLen, delay)}
              />
              {/* Dot on timeline */}
              <circle
                cx={x}
                cy={timelineY}
                r="3.5"
                fill={color}
                fillOpacity="0.9"
                style={fadeIn(delay + 0.3)}
              />
              {/* Fact label */}
              <text
                x={x}
                y={timelineY - writeLen - 10}
                textAnchor="middle"
                fontSize="8"
                fill={color}
                fontFamily="monospace"
                style={fadeIn(delay + 0.3)}
              >
                {evt.label}
              </text>
              {/* Turn label */}
              <text
                x={x}
                y={timelineY - writeLen - 20}
                textAnchor="middle"
                fontSize="7"
                fill="var(--text-faint)"
                fontFamily="monospace"
                style={fadeIn(delay + 0.3)}
              >
                T{evt.turn}
              </text>
            </g>
          );
        })}

        {/* ── Probe questions block ── */}
        <rect
          x={probeX - 4}
          y={timelineY - 20}
          width={54}
          height={40}
          rx="6"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.4"
          strokeWidth="1"
          style={fadeIn(1.2)}
        />
        <text
          x={probeX + 23}
          y={timelineY - 5}
          textAnchor="middle"
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.2)}
        >
          10 probe
        </text>
        <text
          x={probeX + 23}
          y={timelineY + 9}
          textAnchor="middle"
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.2)}
        >
          questions
        </text>

        {/* ── Legend ── */}
        <g style={fadeIn(1.4)}>
          {/* Iranti arm */}
          <circle cx={timelineX1} cy={timelineY + 52} r="4" fill="#f59e0b" />
          <text
            x={timelineX1 + 12}
            y={timelineY + 56}
            fontSize="9"
            fill="var(--text-muted)"
            fontFamily="monospace"
          >
            Iranti arm — write to KB as facts stated
          </text>
          {/* Baseline arm */}
          <line
            x1={timelineX1 - 4}
            y1={timelineY + 72}
            x2={timelineX1 + 4}
            y2={timelineY + 72}
            stroke="var(--text-faint)"
            strokeWidth="1.5"
          />
          <text
            x={timelineX1 + 12}
            y={timelineY + 76}
            fontSize="9"
            fill="var(--text-faint)"
            fontFamily="monospace"
          >
            Baseline arm — reads entire transcript at end
          </text>
          {/* Color key */}
          <circle cx={320} cy={timelineY + 52} r="3" fill="#f59e0b" />
          <text
            x={332}
            y={timelineY + 56}
            fontSize="8"
            fill="var(--text-faint)"
            fontFamily="monospace"
          >
            date
          </text>
          <circle cx={360} cy={timelineY + 52} r="3" fill="#14b8a6" />
          <text
            x={372}
            y={timelineY + 56}
            fontSize="8"
            fill="var(--text-faint)"
            fontFamily="monospace"
          >
            number
          </text>
          <circle cx={420} cy={timelineY + 52} r="3" fill="#a78bfa" />
          <text
            x={432}
            y={timelineY + 56}
            fontSize="8"
            fill="var(--text-faint)"
            fontFamily="monospace"
          >
            name
          </text>
          <circle cx={470} cy={timelineY + 52} r="3" fill="#60a5fa" />
          <text
            x={482}
            y={timelineY + 56}
            fontSize="8"
            fill="var(--text-faint)"
            fontFamily="monospace"
          >
            %
          </text>
        </g>
      </svg>
    </div>
  );
}

// ─── Scale Context Bar ────────────────────────────────────────────────────────

function ScaleContextBar() {
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

  // 5,500 / 200,000 = 2.75%
  const testedPct = 2.75;
  // "degradation begins" at ~100k = 50%
  const degradationPct = 50;

  return (
    <div ref={ref} className="space-y-4">
      {/* Token bar */}
      <div className="relative h-8 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
        {/* Tested region */}
        <div
          className="absolute left-0 top-0 h-full bg-teal-500/80 rounded-l-lg"
          style={{
            width: `${testedPct}%`,
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.5s ease 0.2s, width 0.9s ease 0.2s",
          }}
        />
        {/* Degradation marker */}
        <div
          className="absolute top-0 h-full border-l border-dashed border-amber-500/60"
          style={{
            left: `${degradationPct}%`,
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.5s ease 0.8s",
          }}
        />
        {/* 200k label at far right */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <span className="text-[10px] font-mono text-[var(--text-faint)]">
            200,000 tokens
          </span>
        </div>
      </div>

      {/* Annotation row */}
      <div className="relative" style={{ height: 36 }}>
        {/* B7 label */}
        <div
          className="absolute flex flex-col items-center gap-0.5"
          style={{
            left: `${testedPct}%`,
            transform: "translateX(-50%)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.4s ease 0.9s",
          }}
        >
          <div className="w-px h-2 bg-teal-500" />
          <span className="text-[9px] font-mono text-teal-500 whitespace-nowrap">
            B7 tested here ↑
          </span>
          <span className="text-[9px] font-mono text-[var(--text-faint)] whitespace-nowrap">
            ~5,500 tokens
          </span>
        </div>

        {/* Degradation label */}
        <div
          className="absolute flex flex-col items-center gap-0.5"
          style={{
            left: `${degradationPct}%`,
            transform: "translateX(-50%)",
            opacity: revealed ? 1 : 0,
            transition: "opacity 0.4s ease 1.1s",
          }}
        >
          <div className="w-px h-2 bg-amber-500/60" />
          <span className="text-[9px] font-mono text-amber-500 whitespace-nowrap">
            Degradation expected ~100k tokens
          </span>
        </div>
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
        The teal region (left edge) represents B7&apos;s 5,500-token transcript
        — 2.75% of Claude&apos;s 200k context window. At this scale, nothing
        requires Iranti. The discriminative test begins where context-reading
        becomes probabilistic about precision among similar values — around
        100k–200k tokens.
      </p>
    </div>
  );
}

// ─── Four-Date Cluster ────────────────────────────────────────────────────────

const FOUR_DATES = [
  { turn: 47, date: "April 10", event: "Checkpoint freeze" },
  { turn: 48, date: "April 12", event: "Phase 1 deployment" },
  { turn: 49, date: "April 19", event: "Deployment deadline" },
  { turn: 50, date: "April 22", event: "Stakeholder demo" },
];

function FourDateCluster() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          FOUR_DATES.forEach((_, i) => {
            setTimeout(() => {
              setVisibleCards((prev) => new Set(prev).add(i));
            }, i * 100);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FOUR_DATES.map((d, i) => {
          const visible = visibleCards.has(i);
          return (
            <div
              key={d.date}
              className="p-4 bg-[var(--bg-surface)] border border-amber-500/30 rounded-xl flex flex-col gap-2"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.35s ease, transform 0.35s ease",
              }}
            >
              <div className="text-[10px] font-mono text-[var(--text-faint)]">
                Turn {d.turn}
              </div>
              <div className="text-base font-semibold font-mono text-amber-500">
                {d.date}
              </div>
              <div className="text-[11px] text-[var(--text-muted)] leading-snug">
                {d.event}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
        <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-2">
          Why this cluster matters at scale
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          At 5,500 tokens, all four dates are trivially recallable — they appear
          in the final four turns of a short transcript. At{" "}
          <span className="text-amber-500 font-mono">100k+ tokens</span> with
          intervening content, context-reading becomes probabilistic about
          precision among similar values like April 10, 12, 19, and 22.
          Iranti&apos;s exact-match lookup is{" "}
          <span className="text-teal-500">deterministic regardless of scale</span>
          — each date is stored under a distinct key and retrieved exactly as
          written.
        </p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B7Page() {
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
            <span className="text-[var(--text-secondary)]">b7</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B7
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Conversational Episodic Memory
            <br />
            <span className="text-[var(--text-muted)]">
              10/10 both arms. Null result — expected at this scale.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            A 51-turn synthetic meeting transcript embeds 12 facts across the
            conversation. Both the context-reading baseline and Iranti-assisted
            arm score 10/10. The null result is correct — 5,500 tokens is well
            within Claude&apos;s context window. B7 establishes the methodology
            and write-and-retrieve pattern. The discriminative test requires
            50,000–200,000 tokens.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              51-turn transcript · ~5,500 tokens
            </span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">
              Methodology establishment
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
                score="10/10"
                label="Context-reading baseline — expected ceiling at this length"
                variant="muted"
              />
              <ScoreChip
                score="10/10"
                label="Iranti-assisted — write-and-retrieve pattern confirmed"
              />
              <ScoreChip
                score="Null"
                label="Differential — methodology test, not discriminative"
                variant="amber"
              />
            </div>
            <Callout type="info">
              Both arms answered all 10 probe questions correctly. The null
              result is expected and honest: 5,500 tokens (~2.75% of Claude&apos;s
              200k context window) is trivially recallable without memory
              infrastructure. B7 proves the pattern works; it does not yet prove
              a performance advantage.
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
              Long-running agents accumulate facts across many turns: dates set
              in early meetings, thresholds established mid-conversation, names
              and identifiers introduced then referred to later. Episodic recall
              is the ability to retrieve a specific fact from its point of origin
              in a long conversation — not by scanning the whole transcript, but
              by querying a structured store.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              B7 simulates a 51-turn project meeting. Twelve facts are embedded
              across the transcript: project dates, milestone numbers, a
              ROUGE-L threshold, a stakeholder name, and percentages. Ten probe
              questions are drawn from those facts at the end of the session.
              The question is whether an agent with Iranti — writing facts to
              its KB as they appear — recalls them more reliably than an agent
              that re-reads the entire transcript each time.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              At 5,500 tokens, there is no difference. That is the right answer.
              The benchmark is not designed to show an advantage at this scale —
              it is designed to confirm that the infrastructure works before
              scaling to longer transcripts where the advantage becomes real.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              B7 is a methodology-establishment benchmark. Read the scale
              context section below before drawing conclusions about Iranti&apos;s
              performance in production episodic-recall scenarios.
            </p>
          </div>
        </section>

        {/* Session timeline diagram */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Session timeline
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Twelve facts are embedded across 51 turns. The Iranti arm writes
              each fact to its KB at the moment it is stated (colored dots). The
              baseline arm reads the full transcript at the end. At this length,
              both strategies are equally effective.
            </p>
            <SessionTimelineDiagram />
          </div>
        </section>

        {/* Scale context */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Scale context
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              5,500 tokens is 2.75% of Claude&apos;s 200,000-token context window.
              Context-reading works perfectly at this length. The interesting
              comparison begins where context-reading degrades.
            </p>
            <ScaleContextBar />
          </div>
        </section>

        {/* Four-date cluster */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The four-date cluster
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Turns 47–50 establish four project dates in quick succession —
              a deliberate design for the scale-up benchmark. At 5,500 tokens
              all four are trivially distinguishable. At 100k+ tokens with
              intervening content, they become the critical test of precision.
            </p>
            <FourDateCluster />
          </div>
        </section>

        {/* What B7 actually proves */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              What B7 actually proves
            </h2>
            <div className="space-y-4">
              <Callout type="finding">
                <strong>Write-and-retrieve pattern works.</strong> The Iranti
                arm correctly wrote 12 facts to its KB as they appeared in the
                transcript and retrieved the right values at probe time. The
                pattern is functional and ready to scale.
              </Callout>
              <Callout type="finding">
                <strong>Evaluation infrastructure is functional.</strong> The
                10-probe scoring system, synthetic transcript generation, and
                two-arm comparison methodology produced clean, interpretable
                results. This infrastructure will support B7-scale-up with
                50k and 200k token transcripts.
              </Callout>
              <Callout type="finding">
                <strong>Context-reading works at this length.</strong> The
                baseline arm&apos;s 10/10 score is the expected result. This is
                not a failure of the benchmark — it is the correct control
                measurement confirming the evaluation is calibrated.
              </Callout>
            </div>
          </div>
        </section>

        {/* What B7 cannot prove */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              What B7 cannot prove
            </h2>
            <div className="space-y-4">
              <Callout type="warn">
                <strong>Not discriminative at this scale.</strong> A null result
                with both arms at 10/10 tells you nothing about Iranti&apos;s
                recall advantage. The advantage only becomes measurable when
                context-reading begins to fail — which does not happen at
                5,500 tokens.
              </Callout>
              <Callout type="warn">
                <strong>Not comparable to B1/B2.</strong> B1 and B2 test
                cross-session recall — facts stored in one session retrieved
                in a later session. B7 tests within-session episodic recall.
                These are different problems. B7&apos;s null result says nothing
                about cross-session performance.
              </Callout>
              <Callout type="warn">
                <strong>Not a production recall signal.</strong> Production
                episodic recall involves much longer transcripts, cross-session
                gaps, and retrieval under ambiguity. B7&apos;s clean 10/10
                result does not predict performance under those conditions.
              </Callout>
            </div>
          </div>
        </section>

        {/* What's next */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              What&apos;s next — scale-up plan
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              B7 establishes the methodology. The discriminative benchmarks are
              B7-50k and B7-200k, which will test whether Iranti&apos;s exact-match
              lookup maintains accuracy where context-reading degrades.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-3">
                  B7-50k — planned
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span>~50,000-token transcript (~500 turns)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span>Same 12 fact types, denser embedding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span>Four-date cluster test under intervening content</span>
                  </li>
                </ul>
              </div>
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-3">
                  B7-200k — planned
                </div>
                <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span>Full context-window stress test</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span>Cross-session recall variant (facts from earlier sessions)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                    <span>Precision under similar-value ambiguity</span>
                  </li>
                </ul>
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
                <strong>Synthetic transcript.</strong> The 51-turn meeting was
                generated, not drawn from real project conversations. Synthetic
                transcripts may embed facts more clearly than real meetings where
                facts are stated ambiguously, contradicted, or revised. Real-world
                episodic recall is harder.
              </Callout>
              <Callout type="warn">
                <strong>Self-evaluation.</strong> The probe questions were
                answered and scored within the same evaluation framework that
                generated the benchmark. Independent evaluation by a separate
                system or human reviewer was not performed.
              </Callout>
              <Callout type="warn">
                <strong>Moderate length only.</strong> 5,500 tokens does not
                stress-test any recall mechanism. Both context-reading and
                Iranti should score 10/10 here. Conclusions about episodic
                memory advantages cannot be drawn from this benchmark alone.
              </Callout>
              <Callout type="info">
                <strong>n=10 probe questions.</strong> Ten probes drawn from
                twelve embedded facts provides a reasonable methodology check
                but is not a large enough sample to characterize recall
                reliability statistically. Scale-up benchmarks will use
                larger probe sets.
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
                Full trial execution records, transcript, probe questions,
                scoring notes, and methodology details in the benchmarking
                repository.
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
