"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

const FACT_KEYS = ["affiliation", "publication_count", "previous_employer", "research_focus"] as const;
type FactKey = typeof FACT_KEYS[number];

interface Researcher {
  id: string;
  shortId: string;
  facts: Record<FactKey, string>;
}

const RESEARCHERS: Researcher[] = [
  {
    id: "researcher/priya_nair",
    shortId: "priya_nair",
    facts: {
      affiliation: "University of Toronto",
      publication_count: "34",
      previous_employer: "IBM Research (2016–2020)",
      research_focus: "federated learning",
    },
  },
  {
    id: "researcher/james_osei",
    shortId: "james_osei",
    facts: {
      affiliation: "Oxford Machine Learning Research Group",
      publication_count: "19",
      previous_employer: "Meta AI (2021–2023)",
      research_focus: "graph neural networks",
    },
  },
  {
    id: "researcher/yuki_tanaka",
    shortId: "yuki_tanaka",
    facts: {
      affiliation: "KAIST AI Institute",
      publication_count: "28",
      previous_employer: "Samsung Research (2017–2021)",
      research_focus: "vision-language models",
    },
  },
  {
    id: "researcher/fatima_al_rashid",
    shortId: "fatima_al_rashid",
    facts: {
      affiliation: "KAUST",
      publication_count: "41",
      previous_employer: "Microsoft Research (2015–2019)",
      research_focus: "causal inference",
    },
  },
  {
    id: "researcher/marco_deluca",
    shortId: "marco_deluca",
    facts: {
      affiliation: "ETH Zurich AI Center",
      publication_count: "56",
      previous_employer: "NVIDIA Research (2018–2022)",
      research_focus: "hardware-efficient neural networks",
    },
  },
];

const FACT_KEY_LABELS: Record<FactKey, string> = {
  affiliation: "affiliation",
  publication_count: "pub_count",
  previous_employer: "prev_employer",
  research_focus: "research_focus",
};

// ─── Shared components ────────────────────────────────────────────────────────

function ScoreChip({ score, label, variant = "teal" }: { score: string; label: string; variant?: "teal" | "muted" }) {
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
      <span
        className={`text-2xl font-semibold font-mono ${variant === "teal" ? "text-teal-500" : "text-[var(--text-muted)]"}`}
      >
        {score}
      </span>
      <span className="text-xs text-[var(--text-muted)] text-center leading-relaxed">{label}</span>
    </div>
  );
}

function Callout({ type, children }: { type: CalloutType; children: React.ReactNode }) {
  const styles: Record<CalloutType, string> = {
    info: "border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
    warn: "border-amber-500/30 bg-amber-500/5 text-[var(--text-secondary)]",
    finding: "border-teal-500/30 bg-teal-500/5 text-[var(--text-secondary)]",
  };
  const labels: Record<CalloutType, string> = { info: "Note", warn: "Limitation", finding: "Finding" };
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

// ─── Write vs Read Timeline ───────────────────────────────────────────────────

function WriteReadTimeline() {
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
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Dimensions
  const W = 720;
  const H = 120;
  const nodeW = 160;
  const nodeH = 52;
  const gap = 60;
  const y = H / 2;

  // Node x-centers
  const x1 = nodeW / 2 + 20;           // Session 1
  const x2 = W / 2;                     // KB persists
  const x3 = W - nodeW / 2 - 20;        // Session 2

  // Arrow endpoints (edges of node boxes)
  const arrow1x1 = x1 + nodeW / 2;
  const arrow1x2 = x2 - nodeW / 2;
  const arrow2x1 = x2 + nodeW / 2;
  const arrow2x2 = x3 - nodeW / 2;

  const arrowLen1 = arrow1x2 - arrow1x1;
  const arrowLen2 = arrow2x2 - arrow2x1;

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

  return (
    <div className="w-full overflow-x-auto">
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[720px] mx-auto"
        style={{ minWidth: 340 }}
        aria-label="Write-to-read timeline: Session 1 writes to KB, Session 2 retrieves from KB"
      >
        {/* Arrow 1: S1 → KB */}
        <line
          x1={arrow1x1}
          y1={y}
          x2={arrow1x2 - 8}
          y2={y}
          stroke="#f59e0b"
          strokeWidth="1.5"
          style={lineStyle(arrowLen1, 0.1)}
        />
        <polygon
          points={`${arrow1x2 - 8},${y - 5} ${arrow1x2},${y} ${arrow1x2 - 8},${y + 5}`}
          fill="#f59e0b"
          style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.2s ease ${0.1 + 0.7}s` }}
        />
        {/* Arrow 2: KB → S2 */}
        <line
          x1={arrow2x1}
          y1={y}
          x2={arrow2x2 - 8}
          y2={y}
          stroke="#14b8a6"
          strokeWidth="1.5"
          style={lineStyle(arrowLen2, 0.85)}
        />
        <polygon
          points={`${arrow2x2 - 8},${y - 5} ${arrow2x2},${y} ${arrow2x2 - 8},${y + 5}`}
          fill="#14b8a6"
          style={{ opacity: revealed ? 1 : 0, transition: `opacity 0.2s ease ${0.85 + 0.7}s` }}
        />

        {/* Node 1: Session 1 Write */}
        <rect
          x={x1 - nodeW / 2}
          y={y - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#f59e0b"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text x={x1} y={y - 8} textAnchor="middle" fontSize="11" fill="#f59e0b" fontFamily="monospace">
          Session 1
        </text>
        <text x={x1} y={y + 9} textAnchor="middle" fontSize="10" fill="#d97706" fontFamily="monospace">
          iranti_write ×20
        </text>

        {/* Node 2: KB */}
        <rect
          x={x2 - nodeW / 2}
          y={y - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="var(--border-light)"
          strokeWidth="1"
        />
        <text x={x2} y={y - 8} textAnchor="middle" fontSize="11" fill="var(--text-secondary)" fontFamily="monospace">
          KB persists
        </text>
        <text x={x2} y={y + 9} textAnchor="middle" fontSize="10" fill="var(--text-muted)" fontFamily="monospace">
          durable storage
        </text>

        {/* Node 3: Session 2 Retrieve */}
        <rect
          x={x3 - nodeW / 2}
          y={y - nodeH / 2}
          width={nodeW}
          height={nodeH}
          rx="8"
          fill="transparent"
          stroke="#14b8a6"
          strokeOpacity="0.5"
          strokeWidth="1"
        />
        <text x={x3} y={y - 8} textAnchor="middle" fontSize="11" fill="#14b8a6" fontFamily="monospace">
          Session 2
        </text>
        <text x={x3} y={y + 9} textAnchor="middle" fontSize="10" fill="#0d9488" fontFamily="monospace">
          iranti_query ×20
        </text>

        {/* Labels above arrows */}
        <text
          x={(arrow1x1 + arrow1x2) / 2}
          y={y - 16}
          textAnchor="middle"
          fontSize="9"
          fill="#f59e0b"
          fontFamily="monospace"
          style={{ opacity: revealed ? 0.7 : 0, transition: `opacity 0.4s ease 0.9s` }}
        >
          write
        </text>
        <text
          x={(arrow2x1 + arrow2x2) / 2}
          y={y - 16}
          textAnchor="middle"
          fontSize="9"
          fill="#14b8a6"
          fontFamily="monospace"
          style={{ opacity: revealed ? 0.7 : 0, transition: `opacity 0.4s ease 1.65s` }}
        >
          retrieve (no context)
        </text>
      </svg>
    </div>
  );
}

// ─── Recall Rate Bar ──────────────────────────────────────────────────────────

function RecallBar() {
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
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-5">
      {/* Iranti bar */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-mono text-[var(--text-secondary)]">Iranti</span>
          <span className="text-xs font-mono text-teal-500">20 / 20 &nbsp;(100%)</span>
        </div>
        <div className="h-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
          <div
            className="h-full bg-teal-500 rounded-full"
            style={{
              width: revealed ? "100%" : "0%",
              transition: "width 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.15s",
            }}
          />
        </div>
      </div>

      {/* Baseline bar */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="text-xs font-mono text-[var(--text-muted)]">Baseline (LLM without memory)</span>
          <span className="text-xs font-mono text-[var(--text-faint)]">0 / 20 &nbsp;(0%)</span>
        </div>
        <div className="h-3 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: "0%",
              borderLeft: revealed ? "2px solid var(--border-medium)" : "none",
              transition: "border-left 0.2s ease 0.9s",
            }}
          />
        </div>
        <p className="text-xs text-[var(--text-faint)] mt-1.5 leading-relaxed">
          Definitional — a stateless LLM has no access to Session 1 data in Session 2. This is not an empirical measurement.
        </p>
      </div>
    </div>
  );
}

// ─── 5×4 Persistence Grid ────────────────────────────────────────────────────

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
      }}
    >
      <path d="M3 8l3.5 3.5L13 5" stroke="#14b8a6" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PersistenceGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleCells, setVisibleCells] = useState<Set<string>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger: row-by-row, then column-by-column within row
          RESEARCHERS.forEach((r, ri) => {
            FACT_KEYS.forEach((k, ci) => {
              const delay = (ri * FACT_KEYS.length + ci) * 80;
              setTimeout(() => {
                setVisibleCells((prev) => new Set(prev).add(`${ri}-${ci}`));
              }, delay);
            });
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
      <table className="w-full text-xs" style={{ minWidth: 600 }}>
        <thead>
          <tr className="border-b border-[var(--border-light)]">
            {/* Session column header */}
            <th className="pb-3 pr-3 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
              Entity
            </th>
            <th className="pb-3 pr-3 text-center font-mono text-amber-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              S1 write
            </th>
            {FACT_KEYS.map((k) => (
              <th key={k} className="pb-3 px-3 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider whitespace-nowrap">
                {FACT_KEY_LABELS[k]}
              </th>
            ))}
            <th className="pb-3 pl-3 text-center font-mono text-teal-500 uppercase tracking-wider whitespace-nowrap text-[10px]">
              S2 read
            </th>
          </tr>
        </thead>
        <tbody>
          {RESEARCHERS.map((r, ri) => (
            <tr key={r.id} className="border-t border-[var(--border-subtle)]">
              {/* Entity name */}
              <td className="py-3 pr-3 font-mono text-[var(--text-secondary)] whitespace-nowrap">
                {r.shortId}
              </td>
              {/* S1 write indicator */}
              <td className="py-3 pr-3 text-center">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-amber-500/30 bg-amber-500/10">
                  <span className="text-amber-500 text-[9px] font-mono">W</span>
                </span>
              </td>
              {/* Fact cells */}
              {FACT_KEYS.map((k, ci) => (
                <td key={k} className="py-3 px-3 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <CheckIcon visible={visibleCells.has(`${ri}-${ci}`)} />
                    <span className="text-[var(--text-faint)] leading-tight hidden sm:block" style={{ fontSize: 9, maxWidth: 100 }}>
                      {r.facts[k]}
                    </span>
                  </div>
                </td>
              ))}
              {/* S2 read indicator */}
              <td className="py-3 pl-3 text-center">
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border border-teal-500/30 bg-teal-500/10">
                  <span className="text-teal-500 text-[9px] font-mono">R</span>
                </span>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="border-t border-[var(--border-light)]">
            <td className="pt-3 pr-3 font-mono text-[var(--text-faint)]">Total</td>
            <td className="pt-3 pr-3 text-center text-amber-500 font-mono">5</td>
            {FACT_KEYS.map((k) => (
              <td key={k} className="pt-3 px-3 text-center text-teal-500 font-mono">5/5</td>
            ))}
            <td className="pt-3 pl-3 text-center text-teal-500 font-mono">20/20</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B2Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono mb-8">
            <Link href="/benchmarks" className="hover:text-[var(--text-muted)] transition-colors">proof</Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">b2</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Benchmark B2</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Cross-Session Memory
            <br />
            <span className="text-[var(--text-muted)]">Persistence.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Can facts written to Iranti in one process session be retrieved accurately
            in a later, entirely separate session — with no in-context knowledge
            of what was written? This is the core promise of durable memory infrastructure.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">Executed 2026-03-20 → 2026-03-21</span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">5 entities × 4 facts = 20 facts</span>
            <span className="px-2 py-1 rounded border border-amber-500/30 text-amber-500">small-n — indicative only</span>
          </div>
        </section>

        {/* Score summary */}
        <section className="px-6 pb-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <p className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-6">Results at a glance</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
              <ScoreChip score="20/20" label="Facts recalled in Session 2 (100%)" />
              <ScoreChip score="0/20" label="Baseline — stateless LLM (definitional)" variant="muted" />
              <ScoreChip score="0" label="Hallucinated facts returned" />
            </div>
            <Callout type="finding">
              Iranti provides cross-session persistence that a stateless LLM cannot. The 0% baseline is not
              a performance measurement — it is definitional. Without external memory, a new session has
              no access to prior session data.
            </Callout>
          </div>
        </section>

        {/* Write vs Read Timeline */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">The mechanism</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Session 1 writes 20 facts via{" "}
              <code className="font-mono text-[var(--text-code)]">iranti_write</code>.
              The KB is the only bridge between sessions. Session 2 opens with no knowledge
              of Session 1 — only{" "}
              <code className="font-mono text-[var(--text-code)]">iranti_query</code> calls recover the facts.
            </p>
            <WriteReadTimeline />
          </div>
        </section>

        {/* Recall rate bar */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Recall rate</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              How many of the 20 written facts were correctly recalled in Session 2?
              The baseline is 0% by definition — stateless LLMs have no memory between
              process invocations.
            </p>
            <RecallBar />
          </div>
        </section>

        {/* Persistence grid */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">The evidence — 5 × 4 persistence grid</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Five fictional researcher entities, each with four facts, written in Session 1 and
              retrieved in Session 2. Every cell below confirms a correct retrieval.
              The KB was the only persistence mechanism between sessions.
            </p>
            <PersistenceGrid />
            <p className="text-xs text-[var(--text-muted)] mt-4">
              Each checkmark represents a fact correctly retrieved in Session 2 with no in-context knowledge of what was written.
              W = written (Session 1). R = retrieved (Session 2).
            </p>
          </div>
        </section>

        {/* Ground truth entities */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Ground truth entities</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Five fictional researchers. All entity IDs and fact values are synthetic — fabricated
              specifically for this benchmark, not drawn from real individuals.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {RESEARCHERS.map((r) => (
                <div key={r.id} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-xs font-mono text-teal-500 mb-3">{r.id}</div>
                  <div className="space-y-2">
                    {FACT_KEYS.map((k) => (
                      <div key={k} className="flex gap-3 text-xs">
                        <span className="font-mono text-[var(--text-faint)] w-36 flex-shrink-0">{k}</span>
                        <span className="text-[var(--text-secondary)]">{r.facts[k]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What this measures */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">What this measures</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Large language models are stateless. Every new API call or process invocation starts
              with a blank context window. Any facts a model encountered in a previous session
              are gone — unless they were written to durable external storage and re-injected
              into the next session.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              This statefulness gap matters acutely for agents. An agent that remembers a
              user&apos;s preferences, builds a research profile over multiple calls, or tracks
              evolving project state — all of that continuity depends entirely on what is
              written to persistent storage between sessions.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              B2 tests whether Iranti&apos;s KB is genuinely durable across distinct process
              invocations, not merely intra-session consistent. The test is intentionally
              simple: if anything breaks at this level (write, persist, retrieve across boundary),
              everything built on top of it fails.
            </p>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              This benchmark is not about recall precision under noise (that is B1). It is about
              the existence of the persistence guarantee — does the KB survive the session boundary?
            </p>
          </div>
        </section>

        {/* Cross-session evidence */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Additional cross-session evidence</h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Beyond the synthetic benchmark, production writes from unrelated work confirm the same property.
            </p>
            <div className="space-y-3">
              {[
                {
                  ticket: "ticket/cp_t010",
                  written: "2026-03-20",
                  retrieved: "2026-03-21",
                  note: "Entity and fact data written during B1 benchmark execution. Retrieved correctly in B2 planning session the following day.",
                },
                {
                  ticket: "ticket/cp_t011",
                  written: "2026-03-20",
                  retrieved: "2026-03-21",
                  note: "Cross-reference written during benchmark logging. Confirmed retrievable in separate process session.",
                },
              ].map((e) => (
                <div key={e.ticket} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <span className="text-xs font-mono text-[var(--text-code)]">{e.ticket}</span>
                    <div className="flex items-center gap-2 text-xs font-mono text-[var(--text-faint)] flex-shrink-0">
                      <span className="text-amber-500">{e.written}</span>
                      <span>→</span>
                      <span className="text-teal-500">{e.retrieved}</span>
                    </div>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{e.note}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
              These are incidental observations from live work, not controlled trials. They corroborate
              the benchmark result but do not replace it.
            </p>
          </div>
        </section>

        {/* Threats to validity */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Threats to validity</h2>
            <div className="space-y-4">
              <Callout type="warn">
                <strong>Single-arm test.</strong> There is no independently operated baseline arm.
                The 0% baseline is an analytic claim (stateless LLMs have no cross-session memory),
                not an experimentally measured result. This is appropriate for a definitional claim
                but would not satisfy an independent review board.
              </Callout>
              <Callout type="warn">
                <strong>Possible intra-session retrieval.</strong> If the write and retrieve operations
                occurred within a single long-running process — rather than two genuinely separate invocations
                — this would be intra-session retrieval, not cross-session. The 2026-03-20 → 2026-03-21
                ticket evidence is the clearest demonstration of the genuine session boundary being crossed.
              </Callout>
              <Callout type="warn">
                <strong>Synthetic entities.</strong> All five researcher entities are fabricated. The KB
                could not have populated these facts from model weights. This controls for a confound
                but means results say nothing about retrieval quality on real, semantically complex entities.
              </Callout>
              <Callout type="info">
                <strong>Small N.</strong> 20 facts across 5 entities is a correctness check, not a
                reliability study. A persistence guarantee should hold at 100% for all N — but this
                benchmark does not stress-test volume, concurrency, or failure modes.
              </Callout>
            </div>
          </div>
        </section>

        {/* Key properties confirmed */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">Key properties confirmed</h2>
            <div className="space-y-4">
              <Callout type="finding">
                <strong>Durable persistence across session boundary.</strong> Facts written in Session 1
                are available in Session 2. The KB survived the process invocation boundary.
              </Callout>
              <Callout type="finding">
                <strong>Zero hallucination on retrieval.</strong> All 20 returned facts matched the
                ground truth exactly. No values were confabulated or blended across entities.
              </Callout>
              <Callout type="finding">
                <strong>Entity isolation maintained.</strong> With 5 researcher entities sharing the same
                4 key names, retrieval returned the correct value for the correct entity in every case.
                No cross-entity bleed was observed.
              </Callout>
              <Callout type="finding">
                <strong>Retrieved facts carry provenance.</strong>{" "}
                <code className="font-mono text-sm">iranti_query</code> responses include{" "}
                <code className="font-mono text-sm">confidence</code>,{" "}
                <code className="font-mono text-sm">source</code>,{" "}
                <code className="font-mono text-sm">validFrom</code>, and{" "}
                <code className="font-mono text-sm">contested</code> metadata.
                An LLM without memory returns none of this — only the value, with no audit trail.
              </Callout>
            </div>
          </div>
        </section>

        {/* Raw data link */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-1">Raw data</div>
              <p className="text-sm text-[var(--text-muted)]">
                Full trial execution records, session logs, entity definitions, and methodology notes
                in the benchmarking repository.
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
              <Link href="/benchmarks" className="px-4 py-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-sm transition-colors">
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
