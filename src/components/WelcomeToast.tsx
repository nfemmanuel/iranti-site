"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "iranti_welcomed";

export default function WelcomeToast() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dimmed, setDimmed] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        const t = setTimeout(() => {
          setMounted(true);
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              setVisible(true);
              setDimmed(true);
            })
          );
        }, 1200);
        return () => clearTimeout(t);
      }
    } catch {
      // localStorage unavailable — skip
    }
  }, []);

  // Clear dim on scroll
  useEffect(() => {
    if (!dimmed) return;
    const onScroll = () => setDimmed(false);
    window.addEventListener("scroll", onScroll, { once: true, passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dimmed]);

  function dismiss() {
    setVisible(false);
    setDimmed(false);
    setTimeout(() => setMounted(false), 300);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // ignore
    }
  }

  if (!mounted) return null;

  return (
    <>
      {/* Page dim backdrop — clears on click or scroll, toast stays */}
      <div
        onClick={() => setDimmed(false)}
        style={{ transition: "opacity 400ms ease" }}
        className={`fixed inset-0 z-40 bg-[var(--bg-base)] ${
          dimmed ? "opacity-70 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Toast */}
      <div
        role="dialog"
        aria-label="Welcome to Iranti"
        style={{ transition: "opacity 300ms ease, transform 300ms ease" }}
        className={`fixed bottom-5 right-5 z-50 w-80 rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] shadow-xl p-5 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="absolute top-3 right-3 text-[var(--text-faint)] hover:text-[var(--text-secondary)] transition-colors p-1"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </button>

        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center flex-shrink-0">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <circle cx="7" cy="7" r="2.5" fill="#080808" />
              <circle cx="2" cy="4" r="1.5" fill="#080808" opacity="0.7" />
              <circle cx="12" cy="4" r="1.5" fill="#080808" opacity="0.7" />
              <circle cx="2" cy="10" r="1.5" fill="#080808" opacity="0.5" />
              <circle cx="12" cy="10" r="1.5" fill="#080808" opacity="0.5" />
            </svg>
          </span>
          <span className="text-sm font-semibold text-[var(--text-primary)]">Welcome to Iranti</span>
        </div>

        <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
          Thanks for stopping by. Iranti is still early — your thoughts on what&apos;s working or missing would genuinely help.
        </p>

        <div className="flex items-center gap-2">
          <Link
            href="/feedback"
            onClick={dismiss}
            className="glow-amber flex-1 text-center px-3.5 py-2 bg-amber-500 hover:opacity-90 text-[#080808] text-[13px] font-medium rounded-full transition-opacity"
          >
            Share feedback
          </Link>
          <button
            onClick={dismiss}
            className="px-3.5 py-2 text-[13px] text-[var(--text-faint)] hover:text-[var(--text-secondary)] transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </>
  );
}
