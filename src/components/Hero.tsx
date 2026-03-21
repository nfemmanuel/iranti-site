"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

function useCountUp(target: number, duration = 900, delay = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now();
      const frame = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(ease * target));
        if (progress < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return count;
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const c1 = useCountUp(20, 800, 200);
  const c2 = useCountUp(16, 900, 350);
  const c3 = useCountUp(4, 700, 500);

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install -g iranti");
    setCopied(true);
    trackEvent("install_copy");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-16 px-6 overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full opacity-[0.06]"
        style={{
          background:
            "radial-gradient(ellipse, #f59e0b 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border-light)] bg-[var(--bg-surface)] text-xs text-[var(--text-secondary)] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
          <span>v0.2.12 — open source, AGPL</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6">
          Memory infrastructure
          <br />
          <span className="text-amber-500">for multi-agent AI.</span>
        </h1>

        {/* Subhead */}
        <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-4">
          Iranti gives agents persistent, identity-based shared memory.
          Facts written by one agent are retrievable by any other through exact{" "}
          <code className="text-[var(--text-code)] font-mono text-base">
            entity + key
          </code>{" "}
          lookup.
        </p>
        <p className="text-base text-[var(--text-muted)] max-w-xl mx-auto mb-10">
          Conflict-aware. Session-persistent. Framework-agnostic.
          Not an agent framework — the memory layer underneath one.
        </p>

        {/* Install command */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-lg font-mono text-sm">
            <span className="text-[var(--text-muted)]">$</span>
            <span className="text-[var(--text-code)]">npm install -g iranti</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-[var(--text-muted)] hover:text-[var(--text-code)] transition-colors"
              aria-label="Copy install command"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" />
                  <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/proof"
              className="px-5 py-3 bg-[var(--bg-surface)] border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
            >
              See proof
            </Link>
            <a
              href="https://github.com/nfemmanuel/iranti"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        {/* Proof strip */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <span className="text-teal-500 font-medium font-mono">{c1}/20</span>
            <span>cross-session retrieval</span>
          </div>
          <span className="text-[var(--border-light)]">·</span>
          <div className="flex items-center gap-2">
            <span className="text-teal-500 font-medium font-mono">{c2}/16</span>
            <span>conflict benchmark</span>
          </div>
          <span className="text-[var(--border-light)]">·</span>
          <div className="flex items-center gap-2">
            <span className="text-teal-500 font-medium font-mono">{c3}/4</span>
            <span>consistency validation</span>
          </div>
          <span className="text-[var(--border-light)]">·</span>
          <div className="flex items-center gap-2">
            <span className="text-amber-500 font-medium font-mono">npm</span>
            <span>+</span>
            <span className="text-amber-500 font-medium font-mono">PyPI</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--border-light)]">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="animate-bounce"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
          />
        </svg>
      </div>
    </section>
  );
}
