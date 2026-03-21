"use client";

import { useEffect, useRef, useState } from "react";

const nodes = [
  { id: "agent", label: "Agent", sub: "write(entity, key, value)", x: 50, y: 60, color: "secondary" },
  { id: "librarian", label: "Librarian", sub: "conflict detection", x: 50, y: 200, color: "amber" },
  { id: "library", label: "Library", sub: "knowledge_base", x: 20, y: 340, color: "teal" },
  { id: "escalation", label: "Escalation", sub: "human review queue", x: 80, y: 340, color: "muted" },
  { id: "attendant", label: "Attendant", sub: "per-agent brief", x: 50, y: 480, color: "teal" },
];

const edges = [
  { from: "agent", to: "librarian", label: "write", delay: 0 },
  { from: "librarian", to: "library", label: "resolved", delay: 300 },
  { from: "librarian", to: "escalation", label: "escalated", delay: 400 },
  { from: "library", to: "attendant", label: "handshake(task)", delay: 600 },
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
    <div ref={ref} className="relative w-full max-w-sm mx-auto select-none" style={{ height: 560 }}>
      {/* SVG connector lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 560" preserveAspectRatio="xMidYMid meet">
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
          x1="100" y1="92" x2="100" y2="180"
          stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.4"
          markerEnd="url(#arrow-amber)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 1 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Librarian → Library */}
        <path
          d="M 85 230 Q 50 280 55 320"
          fill="none" stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.5"
          markerEnd="url(#arrow-teal)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 2 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Librarian → Escalation */}
        <path
          d="M 115 230 Q 150 280 148 320"
          fill="none" stroke="#5c5c58" strokeWidth="1" strokeOpacity="0.5"
          markerEnd="url(#arrow-muted)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 3 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Library → Attendant */}
        <path
          d="M 55 370 Q 75 420 90 460"
          fill="none" stroke="#14b8a6" strokeWidth="1" strokeOpacity="0.4"
          markerEnd="url(#arrow-teal)"
          strokeDasharray="4 3"
          className={`transition-opacity duration-500 ${step >= 4 ? "opacity-100" : "opacity-0"}`}
        />

        {/* Edge labels */}
        <text x="112" y="140" fontSize="8" fill="#f59e0b" fillOpacity="0.7" fontFamily="monospace">write</text>
        <text x="38" y="285" fontSize="8" fill="#14b8a6" fillOpacity="0.7" fontFamily="monospace">resolved</text>
        <text x="130" y="285" fontSize="8" fill="#5c5c58" fillOpacity="0.7" fontFamily="monospace">escalated</text>
        <text x="40" y="425" fontSize="8" fill="#14b8a6" fillOpacity="0.7" fontFamily="monospace">brief(task)</text>
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
