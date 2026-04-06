"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

interface TurnRow {
  turn: number;
  phase: "establishment" | "recall";
  noMemory: number;
  withIranti: number;
  delta: number;
  deltaPct: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TURNS: TurnRow[] = [
  { turn: 1,  phase: "establishment", noMemory: 1081, withIranti: 1081, delta: 0,    deltaPct: 0  },
  { turn: 2,  phase: "establishment", noMemory: 1556, withIranti: 1556, delta: 0,    deltaPct: 0  },
  { turn: 3,  phase: "establishment", noMemory: 1969, withIranti: 1969, delta: 0,    deltaPct: 0  },
  { turn: 4,  phase: "establishment", noMemory: 2379, withIranti: 2379, delta: 0,    deltaPct: 0  },
  { turn: 5,  phase: "establishment", noMemory: 2779, withIranti: 2779, delta: 0,    deltaPct: 0  },
  { turn: 6,  phase: "establishment", noMemory: 3252, withIranti: 3252, delta: 0,    deltaPct: 0  },
  { turn: 7,  phase: "establishment", noMemory: 3781, withIranti: 3781, delta: 0,    deltaPct: 0  },
  { turn: 8,  phase: "recall",        noMemory: 4220, withIranti: 3980, delta: 240,  deltaPct: 6  },
  { turn: 9,  phase: "recall",        noMemory: 4730, withIranti: 4163, delta: 567,  deltaPct: 12 },
  { turn: 10, phase: "recall",        noMemory: 5236, withIranti: 4355, delta: 881,  deltaPct: 17 },
  { turn: 11, phase: "recall",        noMemory: 5802, withIranti: 4542, delta: 1260, deltaPct: 22 },
  { turn: 12, phase: "recall",        noMemory: 6256, withIranti: 4769, delta: 1487, deltaPct: 24 },
  { turn: 13, phase: "recall",        noMemory: 6711, withIranti: 4981, delta: 1730, deltaPct: 26 },
  { turn: 14, phase: "recall",        noMemory: 8043, withIranti: 5362, delta: 2681, deltaPct: 33 },
  { turn: 15, phase: "recall",        noMemory: 8949, withIranti: 5677, delta: 3272, deltaPct: 37 },
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
    <div className={`border rounded-lg px-5 py-4 text-sm leading-relaxed ${styles[type]}`}>
      <span className={`text-xs font-mono uppercase tracking-wider mr-2 ${labelColors[type]}`}>
        {labels[type]}
      </span>
      {children}
    </div>
  );
}

// ─── Divergence Chart ─────────────────────────────────────────────────────────

function DivergenceChart() {
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
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const W = 720;
  const H = 260;
  const padL = 64;
  const padR = 24;
  const padT = 20;
  const padB = 44;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  const maxTok = 10000;
  const turns = 15;

  const xOf = (turn: number) => padL + ((turn - 1) / (turns - 1)) * chartW;
  const yOf = (tok: number) => padT + chartH - (tok / maxTok) * chartH;

  const nmPoints = TURNS.map(r => `${xOf(r.turn)},${yOf(r.noMemory)}`).join(" ");
  const wiPoints = TURNS.map(r => `${xOf(r.turn)},${yOf(r.withIranti)}`).join(" ");

  // Divergence fill area (between the two lines, from turn 8 onward)
  const recallTurns = TURNS.filter(r => r.phase === "recall");
  const fillTop = recallTurns.map(r => `${xOf(r.turn)},${yOf(r.noMemory)}`).join(" ");
  const fillBottom = [...recallTurns].reverse().map(r => `${xOf(r.turn)},${yOf(r.withIranti)}`).join(" ");
  const fillPoints = `${fillTop} ${fillBottom}`;

  const fadeIn = (delay: number) => ({
    opacity: revealed ? 1 : 0,
    transition: `opacity 0.4s ease ${delay}s`,
  });

  // Animated stroke for the two lines
  const totalNmLen = 900; // approximate
  const totalWiLen = 750;

  const lineAnim = (totalLen: number, delay: number) =>
    revealed
      ? {
          strokeDasharray: totalLen,
          strokeDashoffset: 0,
          transition: `stroke-dashoffset 1.1s ease ${delay}s`,
        }
      : {
          strokeDasharray: totalLen,
          strokeDashoffset: totalLen,
          transition: "none",
        };

  // Y-axis ticks
  const yTicks = [0, 2500, 5000, 7500, 10000];

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[720px] mx-auto"
        style={{ minWidth: 320 }}
        aria-label="Divergence chart: cumulative input tokens per turn for NO_MEMORY vs WITH_IRANTI arms"
      >
        {/* Y-axis grid lines and labels */}
        {yTicks.map(t => (
          <g key={t}>
            <line
              x1={padL}
              y1={yOf(t)}
              x2={W - padR}
              y2={yOf(t)}
              stroke="var(--border-subtle)"
              strokeWidth="0.75"
              strokeDasharray="4 3"
            />
            <text
              x={padL - 8}
              y={yOf(t) + 4}
              textAnchor="end"
              fontSize="9"
              fill="var(--text-faint)"
              fontFamily="monospace"
            >
              {t === 0 ? "0" : `${(t / 1000).toFixed(0)}k`}
            </text>
          </g>
        ))}

        {/* Divergence fill */}
        <polygon
          points={fillPoints}
          fill="#14b8a6"
          fillOpacity={revealed ? 0.07 : 0}
          style={{ transition: `fill-opacity 0.6s ease 0.8s` }}
        />

        {/* Turn 8 divider */}
        <line
          x1={xOf(8)}
          y1={padT}
          x2={xOf(8)}
          y2={padT + chartH}
          stroke="var(--border-light)"
          strokeWidth="1"
          strokeDasharray="3 3"
          style={fadeIn(0.6)}
        />
        <text
          x={xOf(8)}
          y={padT - 6}
          textAnchor="middle"
          fontSize="8"
          fill="var(--text-faint)"
          fontFamily="monospace"
          style={fadeIn(0.7)}
        >
          recall starts
        </text>

        {/* NO_MEMORY line (amber) */}
        <polyline
          points={nmPoints}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={lineAnim(totalNmLen, 0)}
        />

        {/* WITH_IRANTI line (teal) */}
        <polyline
          points={wiPoints}
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={lineAnim(totalWiLen, 0.1)}
        />

        {/* Final point labels */}
        <text
          x={xOf(15) + 6}
          y={yOf(8949) + 4}
          fontSize="9"
          fill="#f59e0b"
          fontFamily="monospace"
          style={fadeIn(1.2)}
        >
          8,949
        </text>
        <text
          x={xOf(15) + 6}
          y={yOf(5677) + 4}
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={fadeIn(1.2)}
        >
          5,677
        </text>

        {/* X-axis labels (every 3 turns) */}
        {[1, 4, 7, 8, 11, 15].map(t => (
          <text
            key={t}
            x={xOf(t)}
            y={padT + chartH + 16}
            textAnchor="middle"
            fontSize="9"
            fill="var(--text-faint)"
            fontFamily="monospace"
          >
            {t}
          </text>
        ))}
        <text
          x={W / 2}
          y={H - 4}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-faint)"
          fontFamily="monospace"
        >
          turn
        </text>

        {/* Legend */}
        <rect x={padL} y={padT + 4} width={10} height={2} fill="#f59e0b" style={fadeIn(1.3)} />
        <text x={padL + 14} y={padT + 10} fontSize="9" fill="#f59e0b" fontFamily="monospace" style={fadeIn(1.3)}>
          NO_MEMORY
        </text>
        <rect x={padL + 90} y={padT + 4} width={10} height={2} fill="#14b8a6" style={fadeIn(1.3)} />
        <text x={padL + 104} y={padT + 10} fontSize="9" fill="#14b8a6" fontFamily="monospace" style={fadeIn(1.3)}>
          WITH_IRANTI
        </text>
      </svg>
    </div>
  );
}

// ─── Turn table ───────────────────────────────────────────────────────────────

function TurnTable() {
  const ref = useRef<HTMLTableElement>(null);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let i = 0;
          const tick = () => {
            setVisibleRows(v => v + 1);
            i++;
            if (i < TURNS.length) setTimeout(tick, 40);
          };
          tick();
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table ref={ref} className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-[var(--border-subtle)]">
            <th className="text-left py-3 pr-4 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider">Turn</th>
            <th className="text-left py-3 pr-4 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider">Phase</th>
            <th className="text-right py-3 pr-4 text-xs font-mono text-amber-500 uppercase tracking-wider">No memory</th>
            <th className="text-right py-3 pr-4 text-xs font-mono text-teal-500 uppercase tracking-wider">With Iranti</th>
            <th className="text-right py-3 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider">Saved</th>
          </tr>
        </thead>
        <tbody>
          {TURNS.map((row, i) => (
            <tr
              key={row.turn}
              className="border-b border-[var(--border-subtle)] last:border-0"
              style={{
                opacity: i < visibleRows ? 1 : 0,
                transform: i < visibleRows ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
            >
              <td className="py-2.5 pr-4 font-mono text-[var(--text-secondary)]">{row.turn}</td>
              <td className="py-2.5 pr-4">
                <span
                  className={`text-xs font-mono px-2 py-0.5 rounded ${
                    row.phase === "recall"
                      ? "bg-teal-500/10 text-teal-500"
                      : "bg-[var(--bg-surface)] text-[var(--text-faint)]"
                  }`}
                >
                  {row.phase}
                </span>
              </td>
              <td className="py-2.5 pr-4 font-mono text-right text-amber-500">
                {row.noMemory.toLocaleString()}
              </td>
              <td className="py-2.5 pr-4 font-mono text-right text-teal-500">
                {row.withIranti.toLocaleString()}
              </td>
              <td className="py-2.5 font-mono text-right text-[var(--text-secondary)]">
                {row.deltaPct > 0 ? (
                  <span className="text-teal-500">{row.deltaPct}%</span>
                ) : (
                  <span className="text-[var(--text-faint)]">—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B14Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        {/* Header */}
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <Link
                href="/benchmarks"
                className="text-xs font-mono text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
              >
                ← benchmarks
              </Link>
              <span className="text-[var(--border-light)]">/</span>
              <span className="text-xs font-mono text-[var(--text-faint)]">b14</span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-faint)]">
                B14
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-500">
                PASS
              </span>
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-3">
              Context Economy
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
              Iranti uses 37% fewer input tokens by turn 15 of a coding session compared
              to an agent that re-reads files on recall turns. Token counts are exact —
              measured via the Anthropic <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">countTokens</code> API,
              not char/4 estimates.
            </p>

            <div className="flex flex-wrap gap-2 text-xs font-mono text-[var(--text-faint)]">
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded">
                v0.3.11
              </span>
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded">
                2026-04-06
              </span>
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded">
                claude-sonnet-4-6
              </span>
              <span className="px-2 py-1 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded">
                15 turns
              </span>
            </div>
          </div>
        </section>

        {/* Score chips */}
        <section className="px-6 py-12 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <ScoreChip score="37%" label="token saving at turn 15" variant="teal" />
              <ScoreChip score="3,272" label="tokens saved (absolute)" variant="teal" />
              <ScoreChip score="Turn 8" label="first divergence" variant="muted" />
              <ScoreChip score="15" label="session turns measured" variant="muted" />
            </div>
          </div>
        </section>

        {/* Divergence chart */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Token divergence over time
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Cumulative input tokens at each turn. Both arms are identical through turn 7.
              The gap widens monotonically from turn 8 as recall turns accumulate.
            </p>
            <DivergenceChart />
          </div>
        </section>

        {/* Per-turn table */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Per-turn results
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Full 15-turn breakdown. Tokens are cumulative input tokens at the start of each turn.
            </p>
            <TurnTable />
          </div>
        </section>

        {/* What this measures */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              What this measures
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Every multi-turn AI coding session accumulates tokens. When an agent needs
              a specific value from an earlier file — a config key, a function signature,
              a database schema — it either keeps the file in context (inflating token
              count every turn) or re-reads it (adding a full tool result to the window).
              Either way, context grows faster than it needs to.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Iranti&apos;s inject blocks are the alternative: instead of the full file (~300–600 tok),
              the agent receives a compact structured fact (~50–150 tok) with exactly the
              value it needed. The difference compounds across every recall turn.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-amber-500 uppercase tracking-wider mb-3">
                  NO_MEMORY arm
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Agent re-reads the relevant source file on recall turns. A file read adds
                  the full file content as a tool result to the messages array. All prior
                  tool results also accumulate — the window grows with every turn.
                </p>
              </div>
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  WITH_IRANTI arm
                </div>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  Agent receives a compact inject block on recall turns. Iranti&apos;s
                  identity-first retrieval returns only the needed fact. The inject block
                  is ~50–150 tokens vs. ~300–600 for a file re-read.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How we measured */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
              How we measured it
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              The benchmark uses the Anthropic{" "}
              <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">
                client.beta.messages.countTokens()
              </code>{" "}
              API to get exact token counts for the full messages array at each turn — no
              generation, no sampling, no char/4 approximation. Both arms run concurrently
              via{" "}
              <code className="text-xs bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">
                Promise.all()
              </code>{" "}
              per turn for a fair comparison.
            </p>
            <ul className="space-y-3 mb-6">
              {[
                "7 synthetic TypeScript/SQL files covering a fictional auth system (~300–600 tok each)",
                "15-turn DebugAuth session: 7 establishment turns then 8 recall turns",
                "Establishment turns identical across both arms — no divergence until recall",
                "Recall turns: NO_MEMORY re-reads the relevant file; WITH_IRANTI uses a pre-computed v0.3.11 inject block",
                "Model: claude-sonnet-4-6 (token counts are model-specific)",
                "Context window: 200k tokens — session reaches 4.5% (NO_MEMORY) vs 2.8% (WITH_IRANTI) by turn 15",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-teal-500 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Callout type="warn">
              Agent re-read behavior is scripted (deterministic). In real sessions, recall
              frequency varies. This benchmark represents a moderate-recall pattern — sessions
              with more recalls will see larger savings; sessions with fewer will see less.
            </Callout>
          </div>
        </section>

        {/* Key finding */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <Callout type="finding">
              <strong className="text-[var(--text-primary)]">37% fewer tokens at turn 15</strong> —
              exact, not estimated. Context window usage: 2.8% (WITH_IRANTI) vs 4.5% (NO_MEMORY)
              of a 200k window. The saving is not a one-time gain; it compounds across every recall
              turn as the gap widens monotonically from turn 8.
            </Callout>
          </div>
        </section>

        {/* Nav */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link
              href="/benchmarks/b13"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-mono"
            >
              ← B13: Upgrade continuity
            </Link>
            <Link
              href="/benchmarks"
              className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-mono"
            >
              All benchmarks →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
