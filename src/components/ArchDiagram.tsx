"use client";

import { useEffect, useRef, useState } from "react";

const nodes = [
  { id: "agent", label: "Agent", sub: "write(entity, key, value)", x: 50, y: 40, color: "secondary" },
  { id: "librarian", label: "Librarian", sub: "conflict detection", x: 50, y: 170, color: "amber" },
  { id: "library", label: "Library", sub: "knowledge_base", x: 20, y: 310, color: "teal" },
  { id: "escalation", label: "Escalation", sub: "human review queue", x: 80, y: 310, color: "muted" },
  { id: "attendant", label: "Attendant", sub: "per-agent brief", x: 20, y: 450, color: "teal" },
  { id: "resolutionist", label: "Resolutionist", sub: "auth_json output", x: 80, y: 450, color: "amber" },
  { id: "archivist", label: "Archivist", sub: "apply + archive", x: 50, y: 590, color: "amber" },
];

const edges = [
  { from: "agent", to: "librarian", label: "write", delay: 0 },
  { from: "librarian", to: "library", label: "resolved", delay: 300 },
  { from: "librarian", to: "escalation", label: "escalated", delay: 400 },
  { from: "library", to: "attendant", label: "brief(task)", delay: 600 },
  { from: "escalation", to: "resolutionist", label: "pending", delay: 700 },
  { from: "resolutionist", to: "archivist", label: "auth_json", delay: 900 },
  { from: "archivist", to: "library", label: "apply", delay: 1100 },
];

const colorMap = {
  amber: { border: "border-amber-500/30", bg: "bg-amber-500/8", text: "text-amber-400", dot: "bg-amber-500" },
  teal: { border: "border-teal-500/30", bg: "bg-teal-500/8", text: "text-teal-400", dot: "bg-teal-500" },
  secondary: { border: "border-[var(--border-light)]", bg: "bg-[var(--bg-surface)]", text: "text-[var(--text-code)]", dot: "bg-[var(--text-muted)]" },
  muted: { border: "border-[var(--border-subtle)]", bg: "bg-[var(--bg-surface)]", text: "text-[var(--text-muted)]", dot: "bg-[var(--text-faint)]" },
};

export default function ArchDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timers = edges.map((e, i) =>
      setTimeout(() => setStep((s) => Math.max(s, i + 1)), 400 + e.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible]);

  return (
    <div ref={ref} className="relative w-full max-w-sm mx-auto select-none" style={{ height: 680 }}>
      {/* SVG connector lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 680" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker id="arrow-amber" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#f59e0b" opacity="0.6" />
          </marker>
          <marker id="arrow-teal" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#14b8a6" opacity="0.6" />
          </marker>
          <marker id="arrow-muted" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 z" fill="#5c5c58" opacity="0.6" />
          </marker>
        </defs>

        {/* Agent → Librarian */}
        <line
          x1="100" y1="100" x2="100" y2="170"
          stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4"
          markerEnd="url(#arrow-amber)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Librarian → Library */}
        <path
          d="M 85 230 Q 50 270 55 310"
          fill="none" stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.5"
          markerEnd="url(#arrow-teal)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Librarian → Escalation */}
        <path
          d="M 115 230 Q 150 270 148 310"
          fill="none" stroke="#5c5c58" strokeWidth="1" strokeOpacity="0.5"
          markerEnd="url(#arrow-muted)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 3 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Library → Attendant */}
        <line
          x1="40" y1="370" x2="40" y2="450"
          stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.4"
          markerEnd="url(#arrow-teal)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 4 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Escalation → Resolutionist */}
        <line
          x1="160" y1="370" x2="160" y2="450"
          stroke="#5c5c58" strokeWidth="1" strokeOpacity="0.4"
          markerEnd="url(#arrow-muted)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 5 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Resolutionist → Archivist */}
        <path
          d="M 145 510 Q 130 550 115 590"
          fill="none" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.5"
          markerEnd="url(#arrow-amber)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 6 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Archivist → Library (feedback loop) */}
        <path
          d="M 85 590 C 50 562 22 462 38 372"
          fill="none" stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.4"
          markerEnd="url(#arrow-teal)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 7 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Edge labels */}
        <text x="104" y="138" fontSize="8" fill="#f59e0b" fillOpacity="0.7" fontFamily="monospace">write</text>
        <text x="28" y="270" fontSize="8" fill="#14b8a6" fillOpacity="0.7" fontFamily="monospace">resolved</text>
        <text x="130" y="270" fontSize="8" fill="#5c5c58" fillOpacity="0.7" fontFamily="monospace">escalated</text>
        <text x="4" y="415" fontSize="8" fill="#14b8a6" fillOpacity="0.7" fontFamily="monospace">brief(task)</text>
        <text x="163" y="415" fontSize="8" fill="#5c5c58" fillOpacity="0.7" fontFamily="monospace">pending</text>
        <text x="122" y="550" fontSize="8" fill="#f59e0b" fillOpacity="0.7" fontFamily="monospace">auth_json</text>
        <text x="4" y="488" fontSize="8" fill="#14b8a6" fillOpacity="0.7" fontFamily="monospace">apply</text>
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => {
        const c = colorMap[node.color as keyof typeof colorMap];
        const delay = i * 100;
        return (
          <div
            key={node.id}
            className={`absolute border rounded-xl px-4 py-3 ${c.border} ${c.bg} transition-all duration-500`}
            style={{
              left: `${node.x}%`,
              top: node.y,
              transform: "translateX(-50%)",
              opacity: visible ? 1 : 0,
              transitionDelay: `${delay}ms`,
              minWidth: 130,
            }}
          >
            <div className="flex items-center gap-2 mb-0.5">
              <div className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
              <span className={`text-sm font-semibold ${c.text}`}>{node.label}</span>
            </div>
            <div className="text-xs text-[var(--text-faint)] font-mono pl-3.5">{node.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
