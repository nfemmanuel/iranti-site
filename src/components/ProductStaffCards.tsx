"use client";

import { useRef, useState, useEffect } from "react";

const staff = [
  {
    name: "Library",
    role: "Knowledge base",
    desc: "PostgreSQL tables. Current truth lives in knowledge_base. Closed and contested intervals live in archive. Facts are attached to entities by key.",
    color: "amber",
  },
  {
    name: "Librarian",
    role: "Write manager",
    desc: "All agent writes go through here. Detects conflicts, resolves them deterministically when possible, escalates to humans when genuinely ambiguous.",
    color: "teal",
  },
  {
    name: "Attendant",
    role: "Per-agent memory",
    desc: "One instance per agent. Manages working memory — what to load at session start, what to inject per turn, what to persist between sessions.",
    color: "teal",
  },
  {
    name: "Archivist",
    role: "Decay + cleanup",
    desc: "Archives expired and low-confidence entries on a schedule. Supports Ebbinghaus-style decay — facts lose confidence without reinforcement. Never deletes; worst case is a messy archive.",
    color: "amber",
  },
  {
    name: "Resolutionist",
    role: "Conflict review",
    desc: "Interactive CLI for human conflict review. Reads pending escalation files, guides a reviewer through competing facts, writes authoritative resolutions.",
    color: "amber",
  },
];

const colorMap = {
  amber: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    dot: "bg-amber-500",
    label: "text-amber-500",
  },
  teal: {
    border: "border-teal-500/20",
    bg: "bg-teal-500/5",
    dot: "bg-teal-500",
    label: "text-teal-500",
  },
};

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function ProductStaffCards() {
  const { ref, visible } = useReveal(0.1);

  return (
    <div ref={ref} className="space-y-3">
      {staff.map((s, i) => {
        const c = colorMap[s.color as keyof typeof colorMap];
        return (
          <div
            key={s.name}
            className={`p-4 rounded-xl border ${c.border} ${c.bg}`}
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
              transitionDelay: `${i * 80}ms`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-sm font-semibold ${c.label}`}>{s.name}</span>
                  <span className="text-xs text-[var(--text-faint)] font-mono">{s.role}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
