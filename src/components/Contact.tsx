export default function Contact() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Early Access
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
            Closed beta is running now.
            <br />
            <span className="text-[var(--text-muted)]">Open beta is on the way.</span>
          </h2>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-lg">
            We&apos;re working with a small group of teams building serious multi-agent workflows.
            If you care about shared state, recovery, and operator control — and want to shape
            what Iranti looks like before it opens up — reach out.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:powerhousexiv@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Request early access
            </a>

            <a
              href="https://github.com/nfemmanuel/iranti/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
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
              Follow on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
