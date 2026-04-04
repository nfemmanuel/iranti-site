"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warn" | "finding";

// ─── Static data ──────────────────────────────────────────────────────────────

interface ExtractionRow {
  fact: string;
  groundTruth: string;
  stored: string;
  correct: boolean;
}

const ENTITY1_EXTRACTIONS: ExtractionRow[] = [
  {
    fact: "Institution",
    groundTruth: "Stanford AI Lab",
    stored: "Stanford AI Lab",
    correct: true,
  },
  {
    fact: "Publication count",
    groundTruth: "22",
    stored: "22",
    correct: true,
  },
  {
    fact: "Previous employer",
    groundTruth: "Google Brain (2016–2018)",
    stored: "Google Brain / 2016 / 2018",
    correct: true,
  },
  {
    fact: "Research focus",
    groundTruth: "out-of-distribution generalization",
    stored: "out-of-distribution generalization",
    correct: true,
  },
];

const ENTITY2_EXTRACTIONS: ExtractionRow[] = [
  {
    fact: "Institution",
    groundTruth: "MIT CSAIL",
    stored: "MIT CSAIL",
    correct: true,
  },
  {
    fact: "Publication count",
    groundTruth: "17",
    stored: "17",
    correct: true,
  },
  {
    fact: "Previous employer",
    groundTruth: "DeepMind (2019–2021)",
    stored: "DeepMind / 2019 / 2021",
    correct: true,
  },
  {
    fact: "Research focus",
    groundTruth: "causal inference",
    stored: "causal inference",
    correct: true,
  },
];

interface VersionRow {
  version: string;
  result: string;
  score: string;
  note: string;
  pass: boolean | null; // null = partial
}

const VERSION_HISTORY: VersionRow[] = [
  {
    version: "v0.2.12",
    result: "FAIL — contamination",
    score: "1/4",
    note: "3/3 wrong values matched existing KB entries",
    pass: false,
  },
  {
    version: "v0.2.14",
    result: "FAIL — chunker silent failure",
    score: "0/4",
    note: "Chunker defect — ingest returned no extractions",
    pass: false,
  },
  {
    version: "v0.2.16",
    result: "PASS — fixed",
    score: "8/8",
    note: "Both entities fully correct, no contamination",
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

// ─── Version History Table ─────────────────────────────────────────────────────

function VersionHistoryTable() {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          VERSION_HISTORY.forEach((_, i) => {
            setTimeout(() => {
              setVisibleRows((prev) => new Set(prev).add(i));
            }, i * 140);
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
              Version
            </th>
            <th className="pb-3 px-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Result
            </th>
            <th className="pb-3 px-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Score
            </th>
            <th className="pb-3 pl-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
              Notes
            </th>
          </tr>
        </thead>
        <tbody>
          {VERSION_HISTORY.map((row, i) => {
            const visible = visibleRows.has(i);
            const scoreColor =
              row.pass === true
                ? "text-teal-500"
                : row.pass === false
                ? "text-amber-500"
                : "text-[var(--text-muted)]";
            const resultColor =
              row.pass === true
                ? "text-teal-500"
                : "text-amber-500";
            return (
              <tr
                key={row.version}
                className="border-t border-[var(--border-subtle)]"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(6px)",
                  transition: "opacity 0.3s ease, transform 0.3s ease",
                }}
              >
                <td className="py-3 pr-4 font-mono text-[var(--text-code)]">
                  {row.version}
                </td>
                <td className={`py-3 px-4 font-mono ${resultColor}`}>
                  {row.result}
                </td>
                <td className={`py-3 px-4 font-mono text-center font-semibold ${scoreColor}`}>
                  {row.score}
                </td>
                <td className="py-3 pl-4 text-[var(--text-muted)]">
                  {row.note}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Extraction Results Table ──────────────────────────────────────────────────

function ExtractionTable({
  rows,
  entityLabel,
}: {
  rows: ExtractionRow[];
  entityLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleRows, setVisibleRows] = useState<Set<number>>(new Set());

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rows.forEach((_, i) => {
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
  }, [rows]);

  return (
    <div ref={ref}>
      <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">
        {entityLabel}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs" style={{ minWidth: 480 }}>
          <thead>
            <tr className="border-b border-[var(--border-light)]">
              <th className="pb-3 pr-4 text-left font-mono text-[var(--text-faint)] uppercase tracking-wider">
                Fact
              </th>
              <th className="pb-3 px-4 text-left font-mono text-teal-500 uppercase tracking-wider text-[10px]">
                Ground truth
              </th>
              <th className="pb-3 px-4 text-left font-mono text-teal-500 uppercase tracking-wider text-[10px]">
                What Iranti stored
              </th>
              <th className="pb-3 pl-4 text-center font-mono text-[var(--text-faint)] uppercase tracking-wider">
                Result
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const visible = visibleRows.has(i);
              return (
                <tr
                  key={row.fact}
                  className="border-t border-[var(--border-subtle)]"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(6px)",
                    transition: "opacity 0.3s ease, transform 0.3s ease",
                  }}
                >
                  <td className="py-3 pr-4 font-mono text-[var(--text-code)] leading-tight">
                    {row.fact}
                  </td>
                  <td className="py-3 px-4 font-mono text-teal-500/80 leading-tight">
                    {row.groundTruth}
                  </td>
                  <td className="py-3 px-4 font-mono text-teal-500/80 leading-tight">
                    {row.stored}
                  </td>
                  <td className="py-3 pl-4 text-center">
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
                        display: "inline-block",
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
              <td className="pt-3 px-4 font-mono text-teal-500">4 facts</td>
              <td className="pt-3 px-4 font-mono text-teal-500">4 correct</td>
              <td className="pt-3 pl-4 text-center font-mono text-teal-500">
                4/4
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ─── Source Text Card ──────────────────────────────────────────────────────────

function SourceTextCard() {
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
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid sm:grid-cols-2 gap-4"
      style={{
        opacity: revealed ? 1 : 0,
        transform: revealed ? "translateY(0)" : "translateY(10px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {/* Source passage */}
      <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
        <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">
          Source text (input to iranti_ingest)
        </div>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed font-mono">
          &quot;Dr. Elena Vasquez is a researcher at{" "}
          <span className="text-teal-500">Stanford AI Lab</span>. She has
          published <span className="text-teal-500">22 papers</span> to date.
          Prior to her current role, she worked at{" "}
          <span className="text-teal-500">Google Brain from 2016 to 2018</span>.
          Her research focuses on{" "}
          <span className="text-teal-500">
            out-of-distribution generalization
          </span>
          .&quot;
        </p>
        <div className="mt-3 text-xs text-[var(--text-faint)]">
          Clear, unambiguous — 4 distinct facts
        </div>
      </div>

      {/* What got stored */}
      <div className="p-5 bg-[var(--bg-surface)] border border-teal-500/25 rounded-xl">
        <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
          What iranti_ingest stored
        </div>
        <ul className="space-y-2 text-sm font-mono">
          <li className="flex items-start gap-2">
            <span className="text-teal-500 flex-shrink-0">✓</span>
            <span className="text-[var(--text-secondary)]">
              Institution:{" "}
              <span className="text-teal-500">Stanford AI Lab</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 flex-shrink-0">✓</span>
            <span className="text-[var(--text-secondary)]">
              Publications:{" "}
              <span className="text-teal-500">22</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 flex-shrink-0">✓</span>
            <span className="text-[var(--text-secondary)]">
              previous_employer.employer:{" "}
              <span className="text-teal-500">Google Brain</span>
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-teal-500 flex-shrink-0">✓</span>
            <span className="text-[var(--text-secondary)]">
              Focus:{" "}
              <span className="text-teal-500">
                out-of-distribution generalization
              </span>
            </span>
          </li>
        </ul>
        <div className="mt-3 text-xs text-teal-500/70">
          All 4 facts extracted correctly. No contamination.
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function B6Page() {
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
            <span className="text-[var(--text-secondary)]">b6</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B6
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Text Ingestion Pipeline
            <br />
            <span className="text-[var(--text-muted)]">
              8/8 facts correct across 2 entities. Fixed in v0.2.16.
            </span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            B6 tests{" "}
            <code className="font-mono text-[var(--text-code)]">
              iranti_ingest
            </code>
            : give Iranti a text passage and have it extract and store facts
            automatically. Earlier versions showed contamination (v0.2.12) and a
            silent chunker failure (v0.2.14). In v0.2.16, the pipeline works
            correctly — 8 out of 8 facts extracted, zero cross-entity
            contamination.
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              n=2 entities, 8 facts
            </span>
            <span className="px-2 py-1 rounded border border-teal-500/30 text-teal-500">
              Fixed in v0.2.16
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
                score="8/8"
                label="Facts correctly extracted across 2 researcher entities"
                variant="teal"
              />
              <ScoreChip
                score="2/2"
                label="Entities with fully correct extraction (4 facts each)"
                variant="teal"
              />
              <ScoreChip
                score="0"
                label="Cross-entity contamination errors (was 3/3 in v0.2.12)"
                variant="muted"
              />
            </div>
            <Callout type="finding">
              <code className="font-mono text-sm">iranti_ingest</code> now
              works cleanly with a real AI provider. Facts extracted from each
              passage match the source — no bleed between entities, no
              hallucinated values, no silent failures.
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
              Structured writes via{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_write
              </code>{" "}
              require the agent to explicitly name the key and provide the value.
              That works well — other benchmarks confirm it. But it shifts the
              extraction burden onto the calling agent. A more productive
              interface lets an agent hand Iranti a block of text and have the
              storage layer extract the facts automatically.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              That is what{" "}
              <code className="font-mono text-[var(--text-code)]">
                iranti_ingest
              </code>{" "}
              does. B6 tests whether this automatic extraction pipeline works
              reliably. The input is a short, unambiguous passage about a
              fictional researcher containing exactly 4 facts. A working ingest
              pipeline returns 4/4 correct per entity.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              In v0.2.16, with a real AI provider, both entities returned 4/4.
              The full version history below shows how we arrived at a clean
              result.
            </p>
          </div>
        </section>

        {/* Version history */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Honest version history
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              B6 ran against three versions. The first two showed serious
              problems. The third is clean.
            </p>
            <VersionHistoryTable />
            <div className="mt-6 space-y-3">
              <Callout type="warn">
                <strong>v0.2.12 — contamination pattern.</strong> 3 out of 4
                wrong values each matched a real entry from a different entity
                already in the KB. Confidence scores reported 87–92 on all 4
                extractions, including the 3 wrong ones — making automated
                validation unreliable. The root cause was a mock provider
                artifact interacting with KB context.
              </Callout>
              <Callout type="warn">
                <strong>v0.2.14 — chunker silent failure.</strong> A defect in
                the chunker caused the pipeline to return zero extractions
                without surfacing an error. The calling agent received an empty
                response and had no reliable way to detect the failure.
              </Callout>
              <Callout type="finding">
                <strong>v0.2.16 — fixed.</strong> Both the contamination root
                cause (mock provider interaction) and the chunker defect were
                resolved between v0.2.14 and v0.2.16. The pipeline now runs
                cleanly against a real AI provider.
              </Callout>
            </div>
          </div>
        </section>

        {/* Source text → extraction comparison */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              How it works now — source to extraction
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Entity 1 (Dr. Elena Vasquez). All 4 facts extracted and stored
              correctly. No values from other KB entries.
            </p>
            <SourceTextCard />
          </div>
        </section>

        {/* Animated extraction results tables */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Full extraction results — both entities
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-8">
              Each row shows the ground truth from the source text and what
              Iranti stored. All 8 facts correct across both entities.
            </p>
            <div className="space-y-8">
              <ExtractionTable
                rows={ENTITY1_EXTRACTIONS}
                entityLabel="Entity 1 — Dr. Elena Vasquez (Stanford AI Lab)"
              />
              <ExtractionTable
                rows={ENTITY2_EXTRACTIONS}
                entityLabel="Entity 2 — Dr. Marcus Chen (MIT CSAIL)"
              />
            </div>
          </div>
        </section>

        {/* Compound fact decomposition */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Important behavioral note — compound fact decomposition
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              The Librarian decomposes compound facts into sub-keys. A fact like
              &quot;Google Brain 2016–2018&quot; is not stored as a single
              string under{" "}
              <code className="font-mono text-[var(--text-code)]">
                previous_employer
              </code>
              . Instead, three separate keys are written:
            </p>
            <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl mb-6 font-mono text-sm overflow-x-auto">
              <div className="text-xs text-[var(--text-faint)] uppercase tracking-wider mb-4">
                Stored keys (sub-key decomposition)
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-teal-500">✓</span>
                  <span className="text-[var(--text-code)]">
                    previous_employer.employer
                  </span>
                  <span className="text-[var(--text-muted)]">→</span>
                  <span className="text-teal-500">&quot;Google Brain&quot;</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-500">✓</span>
                  <span className="text-[var(--text-code)]">
                    previous_employer.employment_start_year
                  </span>
                  <span className="text-[var(--text-muted)]">→</span>
                  <span className="text-teal-500">&quot;2016&quot;</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-teal-500">✓</span>
                  <span className="text-[var(--text-code)]">
                    previous_employer.employment_end_year
                  </span>
                  <span className="text-[var(--text-muted)]">→</span>
                  <span className="text-teal-500">&quot;2018&quot;</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-faint)]">
                Querying <span className="text-amber-500">previous_employer</span> (parent key) will return nothing.
                Query the sub-keys directly.
              </div>
            </div>
            <Callout type="warn">
              <strong>Design your queries for sub-keys.</strong> If you ingest a
              compound fact and then query the parent key (e.g.,{" "}
              <code className="font-mono text-sm">previous_employer</code>), the
              query will return nothing. This is by design — the Librarian
              stores precision over convenience. Query{" "}
              <code className="font-mono text-sm">
                previous_employer.employer
              </code>{" "}
              instead. If you mix{" "}
              <code className="font-mono text-sm">iranti_ingest</code>-written
              entries with structured{" "}
              <code className="font-mono text-sm">iranti_write</code> entries
              for the same entity, ensure the key shapes are consistent.
            </Callout>
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
                <strong>n=2 entities, single test session.</strong> Both
                entities returned 4/4, but the sample size is small. Behavior
                at scale — larger KBs, longer passages, more entity types — is
                not yet characterized.
              </Callout>
              <Callout type="warn">
                <strong>Real AI provider required.</strong> The v0.2.12
                contamination pattern was a testing artifact of the mock
                provider interacting with KB context. The v0.2.16 results were
                produced with a real AI provider.{" "}
                <code className="font-mono text-sm">iranti_ingest</code> should
                not be used with a mock provider in production contexts.
              </Callout>
              <Callout type="warn">
                <strong>Sub-key decomposition can break queries.</strong>{" "}
                Compound facts are always decomposed into sub-keys. If callers
                query the parent key, they get nothing. This is consistent
                behavior but requires awareness at the query layer.
              </Callout>
              <Callout type="info">
                <strong>Prior versions showed serious problems.</strong> v0.2.12
                and v0.2.14 both produced wrong results through different
                mechanisms. The fix landed in v0.2.16. Version pinning matters
                for this feature.
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
                <strong>
                  <code className="font-mono text-sm">iranti_ingest</code>{" "}
                  works correctly in v0.2.16 with a real AI provider.
                </strong>{" "}
                8 out of 8 facts extracted correctly across 2 entities. Zero
                cross-entity contamination. The pipeline is now ready for
                evaluation in production-like conditions.
              </Callout>
              <Callout type="finding">
                <strong>Compound facts are decomposed — design queries accordingly.</strong>{" "}
                The Librarian splits compound values into typed sub-keys. This
                is intentional precision. Query the sub-keys, not the parent
                key, and ensure consistency if mixing ingest-written and
                structured-write entries.
              </Callout>
              <Callout type="finding">
                <strong>
                  The contamination pattern in v0.2.12 was a testing artifact.
                </strong>{" "}
                Using a mock provider introduced the contamination pattern. Real
                provider runs do not exhibit it. The KB storage layer itself was
                reliable — the problem was upstream in extraction.
              </Callout>
              <Callout type="finding">
                <strong>Write durability works.</strong> What gets stored via{" "}
                <code className="font-mono text-sm">iranti_ingest</code> is
                correct and retrievable. The pipeline now composes cleanly with
                the rest of the KB surface.
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
                Full trial execution records, source text, extraction output,
                and methodology notes in the benchmarking repository.
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
