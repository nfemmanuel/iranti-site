"use client";

import Link from "next/link";
import { CURRENT_VERSION } from "@/lib/siteData";

export default function Hero() {

  return (
    <section className="relative isolate min-h-screen flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-[-10%] bottom-[-8%] h-[56vh] opacity-[0.18] md:opacity-[0.24]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          transform: "perspective(1200px) rotateX(79deg) scale(1.7)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, transparent 0%, black 18%, black 62%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, transparent 0%, black 18%, black 62%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute inset-x-0 top-[18%] h-px opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-amber-500) 12%, transparent 50%, var(--color-teal-400) 88%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[420px] rounded-full opacity-[0.08]"
        style={{
          background: "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>v{CURRENT_VERSION} - open source, AGPL</span>
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.03] text-[var(--text-primary)] mb-6">
          Your agents keep losing state.
          <br />
          <span className="text-amber-500">Iranti fixes that.</span>
        </h1>

        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-3xl mx-auto leading-relaxed mb-4">
          Iranti gives Claude Code, Codex, SDK clients, and your own agents one durable system of record.
          Stop re-briefing every tool. Keep shared facts across sessions, recover state after handoffs,
          and inspect what the system believes when work gets messy.
        </p>
        <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
          Built for serious multi-agent workflows: exact retrieval first, deliberate handoffs, bounded recovery,
          and operator visibility when the happy path breaks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link
            href="/docs"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
          >
            Get started →
          </Link>
          <Link
            href="/benchmarks"
            className="px-5 py-3 bg-[var(--bg-surface)] border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
          >
            See the evidence
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1.5 mb-12">
          <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm text-teal-400">
            <span className="text-[var(--text-faint)] select-none">$</span>
            <span>npm install -g iranti</span>
          </div>
          <p className="text-xs text-[var(--text-faint)]">Requires Node.js + Postgres with pgvector</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="text-2xl font-mono text-teal-400 mb-1">1</div>
            <div className="text-sm text-[var(--text-code)] mb-1">One memory layer across tools</div>
            <div className="text-xs text-[var(--text-muted)]">Claude Code, Codex, SDK clients, and operator tooling can all point at the same shared state.</div>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="text-2xl font-mono text-teal-400 mb-1">20/20</div>
            <div className="text-sm text-[var(--text-code)] mb-1">Process-isolated persistence rerun</div>
            <div className="text-xs text-[var(--text-muted)]">The current record supports a real cross-process persistence story, not just same-session memory theater.</div>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="text-2xl font-mono text-amber-400 mb-1">14/14</div>
            <div className="text-sm text-[var(--text-code)] mb-1">Agent coordination scenarios cleared</div>
            <div className="text-xs text-[var(--text-muted)]">Multi-agent handoffs, shared state across independent processes, and mid-task pickup — all tested and passing on v{CURRENT_VERSION}.</div>
          </div>
        </div>
      </div>
    </section>
  );
}
