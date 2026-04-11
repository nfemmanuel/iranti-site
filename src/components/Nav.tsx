"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { IrantiMark } from "./Logo";

const links = [
  { label: "Product", href: "/product" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Docs", href: "/docs" },
  { label: "Integrations", href: "/integrations" },
  { label: "Blog", href: "/blog" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-[var(--bg-base)]/80 backdrop-blur-xl border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0 group"
          aria-label="Iranti home"
        >
          <IrantiMark size={22} />
          <span className="text-[var(--text-primary)] font-semibold text-[14px] tracking-[-0.01em]">
            iranti
          </span>
        </Link>

        {/* Center pill nav */}
        <div className="hidden md:flex items-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-base)]/60 backdrop-blur-sm px-1.5 py-1 gap-0.5">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.label}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`px-3 py-1 rounded-full text-[13px] font-medium transition-colors duration-150 ${
                  active
                    ? "bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-sm"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-2 shrink-0">
          <ThemeToggle />
          <Link
            href="/docs"
            className="px-3.5 py-1.5 bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-base)] text-[13px] font-medium rounded-full transition-opacity"
          >
            Get started
          </Link>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors p-1"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-[var(--bg-base)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)] px-6 py-5 space-y-0.5">
          {links.map((l) => {
            const active = pathname === l.href || pathname.startsWith(l.href + "/");
            return (
              <Link
                key={l.label}
                href={l.href}
                className={`flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  active
                    ? "bg-[var(--bg-surface)] text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)]"
                }`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="pt-4">
            <Link
              href="/docs"
              className="flex items-center justify-center w-full px-4 py-2.5 bg-[var(--text-primary)] text-[var(--bg-base)] text-sm font-medium rounded-full transition-opacity hover:opacity-90"
              onClick={() => setOpen(false)}
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
