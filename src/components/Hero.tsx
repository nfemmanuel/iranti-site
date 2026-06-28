"use client";

import Link from "next/link";
import { CURRENT_VERSION } from "@/lib/siteData";
import { CopyCommand } from "@/components/CopyCommand";
import { track } from "@/lib/track";

export default function Hero() {

  return (
    <section className="relative isolate min-h-screen flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
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
          Iranti gives all your AI coding tools one durable system of record.
          Stop re-briefing every tool. Keep shared facts across sessions, recover state after handoffs,
          and inspect what the system believes when work gets messy.
        </p>
        <p className="text-base text-[var(--text-muted)] max-w-2xl mx-auto mb-10">
          Built for serious multi-agent workflows: exact retrieval first, deliberate handoffs, bounded recovery,
          and operator visibility when the happy path breaks.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          <Link
            href="/docs"
            onClick={() => track("cta_get_started")}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-[13px] font-medium rounded-full transition-opacity hover:opacity-90"
          >
            Get started →
          </Link>
          <Link
            href="/benchmarks"
            onClick={() => track("cta_evidence")}
            className="px-5 py-2.5 bg-[var(--bg-surface)] border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors"
          >
            See the evidence
          </Link>
        </div>

        <div className="flex flex-col items-center gap-1.5 mb-12 w-full max-w-sm mx-auto">
          <CopyCommand command="npm install -g iranti" label="npm-install" />
          <p className="text-xs text-[var(--text-faint)]">Requires Node.js + Postgres with pgvector</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)]">
            <div className="text-2xl font-mono text-teal-400 mb-1">1</div>
            <div className="text-sm text-[var(--text-code)] mb-1">One memory layer across tools</div>
            <div className="text-xs text-[var(--text-muted)]">Claude Code, Codex, Copilot, and any MCP or HTTP client can all point at the same shared state.</div>
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
