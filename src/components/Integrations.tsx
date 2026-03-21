"use client";

import { useRef, useState, useEffect } from "react";

const integrations = [
  {
    name: "Claude Code",
    type: "MCP + Hooks",
    desc: "Native MCP server. Use iranti claude-setup for automatic .mcp.json configuration and SessionStart hooks.",
    cmd: "iranti claude-setup",
    tier: "first",
  },
  {
    name: "Codex",
    type: "MCP",
    desc: "Global MCP registry integration. Run iranti codex-setup once, then launch Codex from any bound project.",
    cmd: "iranti codex-setup",
    tier: "first",
  },
  {
    name: "iranti chat",
    type: "CLI",
    desc: "Interactive terminal session backed by Iranti memory. Write, query, relate, and resolve conflicts via slash commands. Use /history, /relate, /confidence.",
    cmd: "iranti chat",
    tier: "first",
  },
  {
    name: "CrewAI",
    type: "Python client",
    desc: "Validated 6/6 fact transfer. Wrap write and query as CrewAI tools — researcher writes, analyst reads.",
    cmd: "pip install iranti",
    tier: "validated",
  },
  {
    name: "LangChain",
    type: "Python client",
    desc: "Validated 5/5 fact transfer. Use IrantiClient as memory backend for any LangChain agent.",
    cmd: "pip install iranti",
    tier: "validated",
  },
  {
    name: "OpenAI API",
    type: "Python/TS client",
    desc: "Raw API integration validated with 9 lines of Python. Works with any OpenAI-compatible endpoint.",
    cmd: "pip install iranti",
    tier: "validated",
  },
  {
    name: "Any LLM",
    type: "Middleware",
    desc: "IrantiMiddleware wraps before_send() and after_receive() for any model via API. Not browser-tab injection.",
    cmd: "@iranti/sdk",
    tier: "general",
  },
];

const tierColors = {
  first: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  validated: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  general: "text-[var(--text-muted)] bg-[var(--border-subtle)] border-[var(--border-light)]",
};

const tierLabels = {
  first: "Native",
  validated: "Validated",
  general: "General",
};

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

export default function Integrations() {
  const { ref: gridRef, visible: gridVisible } = useReveal(0.08);

  return (
    <section id="integrations" className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Integrations
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3 leading-tight">
              Works with your stack.
              <br />
              <span className="text-[var(--text-muted)]">Not instead of it.</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-xl leading-relaxed">
              Iranti integrates with the tools you already use — Claude Code,
              Codex, CrewAI, LangChain — through a REST API and published npm
              and Python packages. No lock-in.
            </p>
          </div>

          <div className="flex gap-3 text-xs">
            {(["first", "validated", "general"] as const).map((tier) => (
              <div
                key={tier}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${tierColors[tier]}`}
              >
                <span>{tierLabels[tier]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card grid — staggered reveal + hover lift */}
        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item, i) => {
            const c = tierColors[item.tier as keyof typeof tierColors];
            return (
              <div
                key={item.name}
                className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl transition-[border-color,box-shadow,transform] duration-200 ease-out hover:border-[var(--border-light)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] group"
                style={{
                  opacity: gridVisible ? 1 : 0,
                  transform: gridVisible ? "translateY(0)" : "translateY(14px)",
                  transition:
                    "opacity 0.5s ease-out, transform 0.5s ease-out, border-color 0.2s ease, box-shadow 0.2s ease",
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-sm font-semibold text-[var(--text-code)] mb-0.5">
                      {item.name}
                    </div>
                    <div className="text-xs text-[var(--text-faint)] font-mono">
                      {item.type}
                    </div>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full border text-xs ${c}`}
                  >
                    {tierLabels[item.tier as keyof typeof tierLabels]}
                  </span>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg">
                  <span className="text-[var(--text-faint)] font-mono text-xs">$</span>
                  <span className="text-xs text-[var(--text-secondary)] font-mono">
                    {item.cmd}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Honest boundary note */}
        <div className="mt-8 p-4 border border-[var(--border-subtle)] rounded-xl flex items-start gap-3">
          <svg
            className="w-4 h-4 text-[var(--text-faint)] mt-0.5 flex-shrink-0"
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm.75 4.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8 6.5a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4A.75.75 0 018 6.5z" />
          </svg>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            <span className="text-[var(--text-secondary)] font-medium">Browser-tab injection is not supported.</span>{" "}
            ChatGPT and Claude web UIs block external memory injection via Content Security Policy.
            Iranti works through API-based middleware, MCP servers, and direct SDK integration — not
            browser extensions or clipboard hooks.
          </p>
        </div>
      </div>
    </section>
  );
}
