"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import { IrantiMark } from "./Logo";

const links = [
  { label: "Product", href: "/product" },
  { label: "Evidence", href: "/evidence" },
  { label: "Docs", href: "/docs" },
  { label: "Integrations", href: "/integrations" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--bg-base)]/90 backdrop-blur-md border-b border-[var(--border-subtle)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
          aria-label="Iranti home"
        >
          <IrantiMark size={24} />
          <span className="text-[var(--text-primary)] font-semibold text-[15px] tracking-[-0.01em]">
            iranti
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={pathname === l.href || pathname.startsWith(l.href + "/") ? "page" : undefined}
              className={`px-3 py-1.5 text-sm transition-colors ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--text-muted)]"
                  : "text-[var(--text-code)] hover:text-[var(--text-primary)]"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://github.com/nfemmanuel/iranti"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href="mailto:powerhousexiv@gmail.com"
            className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded transition-colors"
          >
            Request access
          </a>
        </div>

        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] px-6 py-4 space-y-1">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`block py-2 text-sm transition-colors ${
                pathname === l.href || pathname.startsWith(l.href + "/")
                  ? "text-[var(--text-primary)] underline underline-offset-4 decoration-[var(--text-muted)]"
                  : "text-[var(--text-code)] hover:text-[var(--text-primary)]"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-col gap-2">
            <a
              href="https://github.com/nfemmanuel/iranti"
              target="_blank"
              rel="noopener noreferrer"
              className="py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:powerhousexiv@gmail.com"
              className="w-full text-center px-4 py-2 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded transition-colors"
            >
              Request access
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
