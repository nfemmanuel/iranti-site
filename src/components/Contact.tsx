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

          </div>
        </div>
      </div>
    </section>
  );
}
