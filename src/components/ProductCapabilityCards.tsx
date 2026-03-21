"use client";

import { useRef, useState, useEffect } from "react";

const capabilities = [
  {
    title: "Temporal versioning",
    tag: "asOf query support",
    desc: "Every write is a timestamped event. Query facts as they were at any point in time — not just the current truth. Full ordered history per entity + key.",
    color: "teal",
  },
  {
    title: "Memory decay",
    tag: "Ebbinghaus model, opt-in",
    desc: "Facts lose confidence without reinforcement over time. The Archivist processes decay on a configurable schedule. Surfaces stale knowledge before it misleads agents.",
    color: "amber",
  },
  {
    title: "Namespace API keys",
    tag: "Fine-grained auth",
    desc: "API keys are scoped to entity namespaces — e.g. kb:read:project/acme. An agent can read from one project without write access, or read access to another.",
    color: "teal",
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

export default function ProductCapabilityCards() {
  const { ref, visible } = useReveal(0.15);

  return (
    <div ref={ref} className="grid md:grid-cols-3 gap-5">
      {capabilities.map((cap, i) => (
        <div
          key={cap.title}
          className={`p-5 rounded-xl border ${
            cap.color === "teal"
              ? "border-teal-500/20 bg-teal-500/5"
              : "border-amber-500/20 bg-amber-500/5"
          }`}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(12px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            transitionDelay: `${i * 80}ms`,
          }}
        >
          <div
            className={`text-xs font-mono mb-1 ${
              cap.color === "teal" ? "text-teal-500" : "text-amber-500"
            }`}
          >
            {cap.tag}
          </div>
          <h3
            className={`text-sm font-semibold mb-2 ${
              cap.color === "teal" ? "text-teal-400" : "text-amber-400"
            }`}
          >
            {cap.title}
          </h3>
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">{cap.desc}</p>
        </div>
      ))}
    </div>
  );
}
