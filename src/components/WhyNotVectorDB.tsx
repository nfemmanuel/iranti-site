"use client";

import { useRef, useState, useEffect } from "react";

const rows = [
  {
    feature: "Retrieval",
    vectorDB: "Similarity (nearest neighbor)",
    iranti: "Identity-first + optional hybrid search",
    win: true,
  },
  {
    feature: "Storage model",
    vectorDB: "Embeddings in vector space",
    iranti: "Structured facts with entity + key",
    win: true,
  },
  {
    feature: "Persistence",
    vectorDB: "Stateless between calls",
    iranti: "Persistent across sessions",
    win: true,
  },
  {
    feature: "Confidence",
    vectorDB: "None",
    iranti: "Per-fact confidence scores",
    win: true,
  },
  {
    feature: "Conflict handling",
    vectorDB: "None",
    iranti: "Automatic resolution + escalation",
    win: true,
  },
  {
    feature: "Context injection",
    vectorDB: "None",
    iranti: "observe() injects missing facts",
    win: true,
  },
];

const keyPoints = [
  {
    icon: "⬡",
    label: "Not a framework",
    desc: "Iranti does not orchestrate tasks. It stores and retrieves facts.",
  },
  {
    icon: "⬡",
    label: "Framework-agnostic",
    desc: "Works with CrewAI, LangChain, raw API calls, or any other stack.",
  },
  {
    icon: "⬡",
    label: "Self-hostable",
    desc: "Runs on your PostgreSQL. Your data stays yours.",
  },
];

function useReveal(threshold = 0.15) {
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

export default function WhyNotVectorDB() {
  const { ref: cardsRef, visible: cardsVisible } = useReveal(0.1);
  const { ref: tableRef, visible: tableVisible } = useReveal(0.1);

  return (
    <section id="product" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Why Iranti
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-6 leading-tight">
              Vector databases answer{" "}
              <span className="text-[var(--text-muted)]">
                "what&apos;s similar to X?"
              </span>
              <br />
              Iranti answers{" "}
              <span className="text-amber-500">
                "what do we know about X?"
              </span>
            </h2>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              Multi-agent systems need more than nearest-neighbor retrieval.
              When Agent A writes a deadline, Agent B needs to look it up by
              name — not approximate a semantically similar one. And when two
              agents disagree about the same fact, someone has to be in charge
              of resolving that.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Iranti is the memory layer that sits underneath your agents —
              not inside any one framework, not tied to any one model provider.
              Your agents plug in. The memory persists.
            </p>

            {/* Key point cards — staggered reveal */}
            <div ref={cardsRef} className="space-y-3">
              {keyPoints.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg"
                  style={{
                    opacity: cardsVisible ? 1 : 0,
                    transform: cardsVisible ? "none" : "translateY(12px)",
                    transition: "opacity 0.5s ease, transform 0.5s ease",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="text-amber-500 text-sm mt-0.5">{item.icon}</span>
                  <div>
                    <div className="text-sm font-medium text-[var(--text-code)] mb-1">
                      {item.label}
                    </div>
                    <div className="text-sm text-[var(--text-muted)]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: comparison table — rows reveal sequentially */}
          <div ref={tableRef}>
            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden">
              <div className="grid grid-cols-3 text-xs font-mono uppercase tracking-wider border-b border-[var(--border-subtle)]">
                <div className="px-4 py-3 text-[var(--text-faint)]">Feature</div>
                <div className="px-4 py-3 text-[var(--text-faint)] border-l border-[var(--border-subtle)]">
                  Vector DB
                </div>
                <div className="px-4 py-3 text-amber-500 border-l border-[var(--border-subtle)]">
                  Iranti
                </div>
              </div>
              {rows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 text-sm ${
                    i < rows.length - 1 ? "border-b border-[var(--border-subtle)]" : ""
                  }`}
                  style={{
                    opacity: tableVisible ? 1 : 0,
                    transform: tableVisible ? "none" : "translateY(8px)",
                    transition: "opacity 0.45s ease-out, transform 0.45s ease-out",
                    transitionDelay: `${i * 70}ms`,
                  }}
                >
                  <div className="px-4 py-3.5 text-[var(--text-secondary)] font-medium">
                    {row.feature}
                  </div>
                  <div className="px-4 py-3.5 text-[var(--text-faint)] border-l border-[var(--border-subtle)]">
                    {row.vectorDB}
                  </div>
                  <div className="px-4 py-3.5 text-teal-400 border-l border-[var(--border-subtle)] flex items-start gap-2">
                    <svg
                      className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-teal-500"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    {row.iranti}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
