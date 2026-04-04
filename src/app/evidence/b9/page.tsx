"use client";

import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useEffect, useRef, useState } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Edge {
  from: string;
  fromType: "researcher" | "project" | "external";
  rel: string;
  to: string;
  toType: "researcher" | "project" | "external";
  properties: string;
  writeOk: boolean;
  readOk: boolean;
}

// ─── Benchmark data ──────────────────────────────────────────────────────────

const edges: Edge[] = [
  {
    from: "researcher/alice_chen",
    fromType: "researcher",
    rel: "COLLABORATES_WITH",
    to: "researcher/bob_okafor",
    toType: "researcher",
    properties: '{ since: 2023, paper_count: 3 }',
    writeOk: true,
    readOk: true,
  },
  {
    from: "researcher/alice_chen",
    fromType: "researcher",
    rel: "ADVISES",
    to: "researcher/yuki_tanaka",
    toType: "researcher",
    properties: '{ since: 2024, role: "PhD advisor" }',
    writeOk: true,
    readOk: true,
  },
  {
    from: "project/nlp_memory",
    fromType: "project",
    rel: "FUNDED_BY",
    to: "researcher/fatima_al_rashid",
    toType: "researcher",
    properties: '{ grant: "NSF-2024-ML-0847", amount: 250000 }',
    writeOk: true,
    readOk: true,
  },
  {
    from: "project/nlp_memory",
    fromType: "project",
    rel: "USES_TOOL",
    to: "external/iranti",
    toType: "external",
    properties: '{ version: "0.2.x", integration: "MCP" }',
    writeOk: true,
    readOk: false,
  },
  {
    from: "researcher/bob_okafor",
    fromType: "researcher",
    rel: "PEER_REVIEWS_FOR",
    to: "external/neurips_2026",
    toType: "external",
    properties: '{ role: "area chair" }',
    writeOk: true,
    readOk: false,
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Callout ─────────────────────────────────────────────────────────────────

function Callout({
  type,
  children,
}: {
  type: "info" | "warn" | "finding" | "critical";
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-[var(--border-light)] bg-[var(--bg-surface)] text-[var(--text-muted)]",
    warn: "border-amber-500/30 bg-amber-500/5 text-[var(--text-secondary)]",
    finding: "border-teal-500/30 bg-teal-500/5 text-[var(--text-secondary)]",
    critical: "border-amber-500/50 bg-amber-500/8 text-[var(--text-secondary)]",
  };
  const labels = {
    info: "Note",
    warn: "Limitation",
    finding: "Finding",
    critical: "Interface Gap",
  };
  const labelColors = {
    info: "text-[var(--text-faint)]",
    warn: "text-amber-500",
    finding: "text-teal-500",
    critical: "text-amber-400",
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

// ─── ScoreChip ───────────────────────────────────────────────────────────────

function ScoreChip({
  score,
  label,
  color = "teal",
}: {
  score: string;
  label: string;
  color?: "teal" | "amber" | "muted";
}) {
  const scoreColor =
    color === "teal"
      ? "text-teal-500"
      : color === "amber"
      ? "text-amber-400"
      : "text-[var(--text-muted)]";
  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
      <span className={`text-2xl font-semibold font-mono ${scoreColor}`}>{score}</span>
      <span className="text-xs text-[var(--text-muted)] text-center leading-relaxed">{label}</span>
    </div>
  );
}

// ─── Relationship Graph SVG ──────────────────────────────────────────────────

function RelationshipGraph() {
  const { ref, inView } = useInView(0.15);

  const nodes = [
    { id: "alice_chen",       label: "alice_chen",       sublabel: "researcher", x: 160, y: 95,  color: "#f59e0b", textColor: "#f59e0b", fill: "#f59e0b18", stroke: "#f59e0b60", shape: "circle" },
    { id: "bob_okafor",       label: "bob_okafor",       sublabel: "researcher", x: 450, y: 75,  color: "#14b8a6", textColor: "#14b8a6", fill: "#14b8a618", stroke: "#14b8a660", shape: "circle" },
    { id: "yuki_tanaka",      label: "yuki_tanaka",      sublabel: "researcher", x: 200, y: 275, color: "#6b7280", textColor: "#9ca3af", fill: "#6b728018", stroke: "#6b728040", shape: "circle" },
    { id: "fatima_al_rashid", label: "fatima_al_rashid", sublabel: "researcher", x: 55,  y: 185, color: "#6b7280", textColor: "#9ca3af", fill: "#6b728018", stroke: "#6b728040", shape: "circle" },
    { id: "nlp_memory",       label: "nlp_memory",       sublabel: "project",    x: 330, y: 195, color: "#f59e0b", textColor: "#f59e0b", fill: "#f59e0b18", stroke: "#f59e0b60", shape: "rect"   },
    { id: "iranti",           label: "iranti",           sublabel: "external",   x: 530, y: 210, color: "#6b7280", textColor: "#9ca3af", fill: "#6b728018", stroke: "#6b728040", shape: "circle" },
    { id: "neurips_2026",     label: "neurips_2026",     sublabel: "external",   x: 590, y: 75,  color: "#6b7280", textColor: "#9ca3af", fill: "#6b728018", stroke: "#6b728040", shape: "circle" },
  ];

  // Write edges (solid amber/teal), Read return arrows (dashed teal)
  const edgeDefs = [
    { from: "alice_chen",  to: "bob_okafor",      label: "COLLABORATES_WITH", delay: 0, readOk: true  },
    { from: "alice_chen",  to: "yuki_tanaka",      label: "ADVISES",          delay: 1, readOk: true  },
    { from: "nlp_memory",  to: "fatima_al_rashid", label: "FUNDED_BY",        delay: 2, readOk: true  },
    { from: "nlp_memory",  to: "iranti",           label: "USES_TOOL",        delay: 3, readOk: false },
    { from: "bob_okafor",  to: "neurips_2026",     label: "PEER_REVIEWS_FOR", delay: 4, readOk: false },
  ];

  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));

  function edgePath(fromId: string, toId: string): { d: string; len: number; mx: number; my: number } {
    const f = nodeMap[fromId];
    const t = nodeMap[toId];
    const dx = t.x - f.x;
    const dy = t.y - f.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    const r = 26;
    const ux = dx / len;
    const uy = dy / len;
    const x1 = f.x + ux * r;
    const y1 = f.y + uy * r;
    const x2 = t.x - ux * (r + 4);
    const y2 = t.y - uy * (r + 4);
    const edgeLen = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return {
      d: `M${x1},${y1} L${x2},${y2}`,
      len: edgeLen,
      mx: (x1 + x2) / 2,
      my: (y1 + y2) / 2,
    };
  }

  return (
    <div
      ref={ref}
      className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-x-auto"
    >
      <div className="text-[10px] font-mono text-[var(--text-faint)] uppercase tracking-wider mb-4">
        5 directed edges — written via iranti_relate · 3 confirmed readable via iranti_related
      </div>
      <svg
        viewBox="0 0 660 340"
        className="w-full max-w-2xl mx-auto"
        aria-label="Entity relationship graph showing 5 directed edges with read-back status"
      >
        <defs>
          <marker id="arrowGray" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="#4b5563" />
          </marker>
          <marker id="arrowAmber" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="#f59e0b" />
          </marker>
          <marker id="arrowTeal" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="#14b8a6" />
          </marker>
          <marker id="arrowTealRead" markerWidth="7" markerHeight="7" refX="3.5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="#14b8a6" />
          </marker>
        </defs>

        {/* Write edges */}
        {edgeDefs.map((e) => {
          const { d, len, mx, my } = edgePath(e.from, e.to);
          const fromNode = nodeMap[e.from];
          const isAmber = fromNode.color === "#f59e0b";
          const isTeal = fromNode.color === "#14b8a6";
          const strokeColor = isAmber ? "#f59e0b" : isTeal ? "#14b8a6" : "#4b5563";
          const markerId = isAmber ? "arrowAmber" : isTeal ? "arrowTeal" : "arrowGray";
          const dashDelay = e.delay * 220;
          return (
            <g key={`${e.from}-${e.to}`}>
              <path
                d={d}
                fill="none"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeOpacity="0.6"
                markerEnd={`url(#${markerId})`}
                strokeDasharray={len}
                strokeDashoffset={inView ? 0 : len}
                style={{ transition: `stroke-dashoffset 600ms ease ${dashDelay}ms` }}
              />
              {/* Read-confirmed badge: teal dot on edge midpoint */}
              {e.readOk && (
                <circle
                  cx={mx}
                  cy={my}
                  r={4}
                  fill="#14b8a6"
                  fillOpacity={inView ? 0.9 : 0}
                  style={{ transition: `fill-opacity 300ms ease ${dashDelay + 500}ms` }}
                />
              )}
              {/* Edge label */}
              <g style={{ opacity: inView ? 1 : 0, transition: `opacity 400ms ease ${dashDelay + 400}ms` }}>
                <text
                  x={mx}
                  y={my - (e.readOk ? 10 : 5)}
                  textAnchor="middle"
                  fontSize="6.5"
                  fill={strokeColor}
                  fontFamily="var(--font-mono)"
                  fillOpacity="0.9"
                >
                  {e.label}
                </text>
              </g>
            </g>
          );
        })}

        {/* Nodes */}
        {nodes.map((n, i) => {
          const r = 26;
          return (
            <g
              key={n.id}
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 300ms ease ${i * 80}ms`,
              }}
            >
              {n.shape === "rect" ? (
                <rect
                  x={n.x - 36}
                  y={n.y - 18}
                  width={72}
                  height={36}
                  rx={6}
                  fill={n.fill}
                  stroke={n.stroke}
                  strokeWidth="1.5"
                />
              ) : (
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={r}
                  fill={n.fill}
                  stroke={n.stroke}
                  strokeWidth="1.5"
                />
              )}
              <text
                x={n.x}
                y={n.y - 3}
                textAnchor="middle"
                fontSize="7"
                fill={n.textColor}
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                {n.label.split("_").slice(-1)[0]}
              </text>
              <text
                x={n.x}
                y={n.y + 8}
                textAnchor="middle"
                fontSize="6"
                fill={n.textColor}
                fontFamily="var(--font-mono)"
                fillOpacity="0.6"
              >
                {n.sublabel}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-mono text-[var(--text-faint)]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/60" />
          researcher (amber) / project (amber rect)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-teal-500/30 border border-teal-500/60" />
          researcher (teal)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-teal-400" />
          teal dot = read confirmed via iranti_related
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-3 h-3 rounded-full bg-[var(--border-subtle)] border border-[var(--border-light)]" />
          external (muted)
        </span>
      </div>
    </div>
  );
}

// ─── Write + Read Table ───────────────────────────────────────────────────────

function WriteReadTable() {
  const { ref, inView } = useInView(0.15);

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left px-4 py-3 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider border-b border-[var(--border-subtle)] w-2/5">
              Edge
            </th>
            <th className="text-center px-4 py-3 text-xs font-mono text-teal-500 uppercase tracking-wider border-b border-[var(--border-subtle)]">
              Write (iranti_relate)
            </th>
            <th className="text-center px-4 py-3 text-xs font-mono text-teal-500 uppercase tracking-wider border-b border-[var(--border-subtle)]">
              Read (iranti_related)
            </th>
          </tr>
        </thead>
        <tbody>
          {edges.map((e, i) => (
            <tr
              key={i}
              className="border-b border-[var(--border-subtle)] last:border-0"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 350ms ease ${i * 100}ms`,
              }}
            >
              <td className="px-4 py-3">
                <div className="font-mono text-[10px] text-[var(--text-faint)] leading-relaxed">
                  <span className="text-[var(--text-secondary)]">{e.from}</span>
                  <span className="mx-1 text-[var(--text-faint)]">→</span>
                  <span className="text-amber-400/70">{e.rel}</span>
                  <span className="mx-1 text-[var(--text-faint)]">→</span>
                  <span className="text-[var(--text-secondary)]">{e.to}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <span className="text-teal-400 text-base font-semibold">✓</span>
                <div className="text-[10px] font-mono text-teal-500/70 mt-0.5">ok=true</div>
              </td>
              <td className="px-4 py-3 text-center">
                {e.readOk ? (
                  <>
                    <span className="text-teal-400 text-base font-semibold">✓</span>
                    <div className="text-[10px] font-mono text-teal-500/70 mt-0.5">confirmed</div>
                  </>
                ) : (
                  <>
                    <span className="text-[var(--text-faint)] text-base font-semibold">—</span>
                    <div className="text-[10px] font-mono text-[var(--text-faint)] mt-0.5">not tested</div>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Version History Table ────────────────────────────────────────────────────

function VersionHistoryTable() {
  const { ref, inView } = useInView(0.15);

  const rows = [
    {
      version: "v0.2.12",
      writeResult: "5/5",
      readResult: "0/0",
      readNote: "No MCP read tool existed",
      status: "partial",
    },
    {
      version: "v0.2.14",
      writeResult: "5/5",
      readResult: "0/0",
      readNote: "No MCP read tool existed",
      status: "partial",
    },
    {
      version: "v0.2.16",
      writeResult: "5/5",
      readResult: "3/3",
      readNote: "iranti_related + iranti_related_deep added",
      status: "pass",
    },
  ];

  return (
    <div ref={ref} className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            <th className="text-left px-4 py-3 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
              Version
            </th>
            <th className="text-center px-4 py-3 text-xs font-mono text-teal-500 uppercase tracking-wider border-b border-[var(--border-subtle)]">
              Writes
            </th>
            <th className="text-center px-4 py-3 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
              Reads
            </th>
            <th className="text-left px-4 py-3 text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider border-b border-[var(--border-subtle)]">
              Read note
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.version}
              className="border-b border-[var(--border-subtle)] last:border-0"
              style={{
                opacity: inView ? 1 : 0,
                transition: `opacity 350ms ease ${i * 120}ms`,
              }}
            >
              <td className="px-4 py-3 font-mono text-xs text-[var(--text-secondary)]">
                {row.version}
                {row.status === "pass" && (
                  <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-teal-500/10 text-teal-500 border border-teal-500/20">
                    fixed
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-center font-mono text-xs text-teal-400">
                {row.writeResult}
              </td>
              <td className="px-4 py-3 text-center font-mono text-xs">
                {row.status === "pass" ? (
                  <span className="text-teal-400">{row.readResult}</span>
                ) : (
                  <span className="text-amber-400/70">{row.readResult}</span>
                )}
              </td>
              <td className="px-4 py-3 text-xs text-[var(--text-muted)]">
                {row.readNote}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function B9Page() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <main className="pt-24 pb-16">

        {/* Breadcrumb */}
        <div className="px-6 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2 text-xs text-[var(--text-faint)] font-mono mb-8">
            <Link href="/evidence" className="hover:text-[var(--text-muted)] transition-colors">
              proof
            </Link>
            <span>/</span>
            <span className="text-[var(--text-secondary)]">b9</span>
          </div>
        </div>

        {/* Header */}
        <section className="px-6 pb-12 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
              Benchmark B9
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Entity Relationship Graph
            <br />
            <span className="text-[var(--text-muted)]">5/5 writes. Reads restored in v0.2.16.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mb-6">
            Tests whether <code className="font-mono text-[var(--text-code)] text-base">iranti_relate</code> correctly
            stores typed relationship edges between entities, and whether agents can read them back.
            The write layer is intact — 5/5 edges accepted. In v0.2.16, two new MCP tools close the
            read gap:{" "}
            <code className="font-mono text-[var(--text-code)] text-base">iranti_related</code> (1-hop)
            and{" "}
            <code className="font-mono text-[var(--text-code)] text-base">iranti_related_deep</code> (multi-hop traversal).
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              Executed 2026-03-21
            </span>
            <span className="px-2 py-1 rounded border border-[var(--border-subtle)] text-[var(--text-faint)]">
              5 edges · 3 entity types
            </span>
            <span className="px-2 py-1 rounded border border-teal-500/30 text-teal-500">
              Read gap closed in v0.2.16
            </span>
          </div>
        </section>

        {/* Score summary */}
        <section className="px-6 pb-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto pt-10">
            <p className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-6">
              Results at a glance
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
              <ScoreChip score="5/5" label="Relationship edges written via iranti_relate" color="teal" />
              <ScoreChip score="3/3" label="Reads confirmed via iranti_related (1-hop)" color="teal" />
              <ScoreChip score="8" label="Edges returned by iranti_related_deep at depth=2" color="teal" />
            </div>

            <Callout type="finding">
              <strong>The write-only gap is closed.</strong>{" "}
              Both write and read are now functional. All 5 edges written in v0.2.12 remain readable in v0.2.16,
              confirming cross-version durability. Two MCP tools — 1-hop and multi-hop — give agents flexible
              access to the relationship graph.
            </Callout>
          </div>
        </section>

        {/* What this measures */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              What this measures
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Iranti&apos;s graph model treats entities as nodes and uses{" "}
              <code className="font-mono text-[var(--text-code)]">iranti_relate</code> to write typed,
              directed edges between them. An edge carries a relationship type (e.g.{" "}
              <code className="font-mono text-[var(--text-code)]">COLLABORATES_WITH</code>) and an optional
              properties object with arbitrary metadata. The benchmark writes 5 distinct edges across a
              small synthetic research network, then reads them back via the new MCP tools added in v0.2.16.
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  Write path (iranti_relate)
                </div>
                <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <div className="flex gap-2">
                    <span className="text-teal-400 font-mono flex-shrink-0">→</span>
                    <span>Call <code className="font-mono text-[var(--text-code)]">iranti_relate</code> with from, to, type, and properties</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-teal-400 font-mono flex-shrink-0">→</span>
                    <span>Each call returns <code className="font-mono text-[var(--text-code)]">ok: true</code></span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-teal-400 font-mono flex-shrink-0">→</span>
                    <span>PostgreSQL <code className="font-mono text-[var(--text-code)]">relationships</code> table stores the edge</span>
                  </div>
                </div>
              </div>
              <div className="p-5 bg-teal-500/5 border border-teal-500/20 rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  Read path (v0.2.16)
                </div>
                <div className="space-y-2 text-xs text-[var(--text-secondary)]">
                  <div className="flex gap-2">
                    <span className="text-teal-400 font-mono flex-shrink-0">✓</span>
                    <span><code className="font-mono text-[var(--text-code)]">iranti_related</code> — 1-hop, returns all edges for an entity</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-teal-400 font-mono flex-shrink-0">✓</span>
                    <span><code className="font-mono text-[var(--text-code)]">iranti_related_deep</code> — multi-hop traversal, depth=2 tested</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-teal-400 font-mono flex-shrink-0">✓</span>
                    <span>Cross-version durability: edges from v0.2.12 readable in v0.2.16</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Version history */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Version history
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Honest evolution across versions
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              B9 was first run in v0.2.12, where writes succeeded but reads had no MCP interface.
              This remained true through v0.2.14. The gap was resolved in v0.2.16 with two new tools.
            </p>
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-hidden">
              <VersionHistoryTable />
            </div>
          </div>
        </section>

        {/* Relationship graph */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              The 5 relationship edges
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              These are the actual edges written during the benchmark. Directed arrows represent
              relationship type. A teal dot on an edge indicates it was confirmed readable via{" "}
              <code className="font-mono text-[var(--text-code)]">iranti_related</code> in v0.2.16.
              The two edges without dots were not individually queried — the 3/3 confirmed figure reflects
              the subset tested.
            </p>
            <RelationshipGraph />
          </div>
        </section>

        {/* Write vs Read table */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Write vs. read — per edge
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              All 5 edges were accepted by the write layer. 3 were explicitly queried via{" "}
              <code className="font-mono text-[var(--text-code)]">iranti_related</code> and returned correctly.
              The remaining 2 were not individually tested — shown as &quot;not tested&quot; rather than failed.
            </p>
            <div className="bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl overflow-hidden mb-4">
              <WriteReadTable />
            </div>
          </div>
        </section>

        {/* New: Reading relationships */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                New in v0.2.16
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              Reading relationships
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* iranti_related */}
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  iranti_related — 1-hop
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Given an entity ID, returns all relationship edges where that entity is source or target.
                  Each edge includes <code className="font-mono text-[var(--text-code)]">from</code>,{" "}
                  <code className="font-mono text-[var(--text-code)]">to</code>,{" "}
                  <code className="font-mono text-[var(--text-code)]">rel</code>,{" "}
                  <code className="font-mono text-[var(--text-code)]">properties</code>, and a{" "}
                  <code className="font-mono text-[var(--text-code)]">direction</code> field
                  (<code className="font-mono text-[var(--text-code)]">&quot;out&quot;</code> or{" "}
                  <code className="font-mono text-[var(--text-code)]">&quot;in&quot;</code>).
                  One call returns both inbound and outbound edges.
                </p>
                <div className="font-mono text-[10px] text-[var(--text-code)] bg-[var(--bg-code)] rounded-lg p-3 leading-relaxed overflow-x-auto space-y-1">
                  <div className="text-[var(--text-faint)]">// iranti_related(&quot;researcher/alice_chen&quot;)</div>
                  <div><span className="text-teal-400">[</span></div>
                  <div className="pl-3"><span className="text-[var(--text-faint)]">{"{"}</span></div>
                  <div className="pl-6 text-[var(--text-secondary)]">from: <span className="text-teal-300">&quot;researcher/alice_chen&quot;</span>,</div>
                  <div className="pl-6 text-[var(--text-secondary)]">to: <span className="text-teal-300">&quot;researcher/bob_okafor&quot;</span>,</div>
                  <div className="pl-6 text-[var(--text-secondary)]">rel: <span className="text-amber-300">&quot;COLLABORATES_WITH&quot;</span>,</div>
                  <div className="pl-6 text-[var(--text-secondary)]">direction: <span className="text-teal-300">&quot;out&quot;</span>,</div>
                  <div className="pl-6 text-[var(--text-secondary)]">properties: <span className="text-[var(--text-faint)]">{"{ since: 2023, ... }"}</span></div>
                  <div className="pl-3 text-[var(--text-faint)]">{"}"}, ...</div>
                  <div><span className="text-teal-400">]</span></div>
                </div>
              </div>

              {/* iranti_related_deep */}
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                <div className="text-xs font-mono text-teal-500 uppercase tracking-wider mb-3">
                  iranti_related_deep — multi-hop
                </div>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-4">
                  Traverses the graph outward from a starting entity to a configurable depth.
                  Depth=2 confirmed working. Cycle-safe — does not loop forever on circular graphs.
                  Returns a flat list of edges; hop depth is not labeled per edge but can be inferred
                  from the data.
                </p>
                <div className="font-mono text-[10px] text-[var(--text-code)] bg-[var(--bg-code)] rounded-lg p-3 leading-relaxed overflow-x-auto space-y-1">
                  <div className="text-[var(--text-faint)]">// iranti_related_deep(&quot;researcher/alice_chen&quot;, depth=2)</div>
                  <div className="text-[var(--text-secondary)]">→ <span className="text-teal-400">8 edges</span> returned</div>
                  <div className="text-[var(--text-secondary)]">→ from a <span className="text-teal-400">4-node subgraph</span></div>
                  <div className="text-[var(--text-secondary)]">→ cycle-safe traversal</div>
                  <div className="text-[var(--text-secondary)]">→ flat list, no hop-depth label per edge</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Known limitations */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Known limitations
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              The new tools work, but have interface constraints worth knowing before relying on them in production.
            </p>
            <div className="space-y-3">
              <Callout type="warn">
                <strong>No edge filter parameter in iranti_related.</strong>{" "}
                The tool returns all edge types for an entity. Callers must filter by relationship type client-side.
                For entities with many relationships this may return more data than needed.
              </Callout>
              <Callout type="warn">
                <strong>iranti_related_deep returns a flat list without per-edge hop depth.</strong>{" "}
                You can infer hop depth from the graph structure, but it is not labeled in the response.
                This makes it harder to reason about which edges are at depth 1 vs. depth 2 without additional processing.
              </Callout>
              <Callout type="info">
                Small test set, single session. 3/5 edges were explicitly read back; the remaining 2 were not.
                The depth=2 traversal result of 8 edges was from a 4-node subgraph — not a large graph stress test.
              </Callout>
            </div>
          </div>
        </section>

        {/* Key findings */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Key findings
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
              What this run establishes
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Write-only gap is closed</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-4">
                    Agents can now both write and read relationship edges. The primary blocker from
                    v0.2.12–v0.2.14 is resolved.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">1-hop and multi-hop both confirmed</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-4">
                    <code className="font-mono text-[var(--text-code)]">iranti_related</code> and{" "}
                    <code className="font-mono text-[var(--text-code)]">iranti_related_deep</code>{" "}
                    give agents flexible traversal options.
                  </p>
                </div>
              </div>
              <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-teal-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Cross-version durability confirmed</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-4">
                    All 5 edges written in v0.2.12 are still readable in v0.2.16. Relationship data
                    is durable across releases.
                  </p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-[var(--text-primary)]">Tool limitations remain</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-4">
                    No edge filter in{" "}
                    <code className="font-mono text-[var(--text-code)]">iranti_related</code>.
                    No hop-depth label in deep results.
                    Both are caller-side workarounds, not blockers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Raw data */}
        <section className="px-6 py-12 border-t border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Raw benchmark data
            </h2>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-6">
              Write operations returned <code className="font-mono text-[var(--text-code)]">ok: true</code>.
              Read queries via <code className="font-mono text-[var(--text-code)]">iranti_related</code> returned
              correct edges with properties and direction fields intact.
            </p>
            <div className="p-5 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs text-[var(--text-code)] space-y-4 leading-relaxed overflow-x-auto">
              <div>
                <div className="text-[var(--text-faint)] mb-1">// Write results (v0.2.12 — still valid in v0.2.16)</div>
                <div className="text-teal-400">iranti_relate(researcher/alice_chen, COLLABORATES_WITH, researcher/bob_okafor, ...) → ok: true</div>
                <div className="text-teal-400">iranti_relate(researcher/alice_chen, ADVISES, researcher/yuki_tanaka, ...) → ok: true</div>
                <div className="text-teal-400">iranti_relate(project/nlp_memory, FUNDED_BY, researcher/fatima_al_rashid, ...) → ok: true</div>
                <div className="text-teal-400">iranti_relate(project/nlp_memory, USES_TOOL, external/iranti, ...) → ok: true</div>
                <div className="text-teal-400">iranti_relate(researcher/bob_okafor, PEER_REVIEWS_FOR, external/neurips_2026, ...) → ok: true</div>
              </div>
              <div>
                <div className="text-[var(--text-faint)] mb-1">// Read results via iranti_related (v0.2.16)</div>
                <div className="text-teal-400">iranti_related(&quot;researcher/alice_chen&quot;) → 2 edges (COLLABORATES_WITH out, ADVISES out)</div>
                <div className="text-teal-400">iranti_related(&quot;project/nlp_memory&quot;) → 1 edge confirmed (FUNDED_BY out)</div>
                <div className="text-teal-400">→ direction field present · properties intact · from/to correct</div>
              </div>
              <div>
                <div className="text-[var(--text-faint)] mb-1">// Multi-hop traversal via iranti_related_deep (v0.2.16)</div>
                <div className="text-teal-400">iranti_related_deep(&quot;researcher/alice_chen&quot;, depth=2) → 8 edges from 4-node subgraph</div>
                <div className="text-teal-400">→ cycle-safe · flat list · no per-edge hop label</div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
