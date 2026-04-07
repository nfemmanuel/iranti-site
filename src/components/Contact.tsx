export default function Contact() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Get started
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
            Open source and free to self-host.
            <br />
            <span className="text-[var(--text-muted)]">Your data stays on your machine.</span>
          </h2>

          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 text-lg">
            Install in one command. Bring your own Postgres instance with pgvector,
            run <code className="text-sm text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">iranti claude-setup</code> from
            your project root, and your agent has persistent shared memory.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://github.com/nfemmanuel/iranti#readme"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
            >
              Install guide →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
