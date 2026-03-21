export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* CTA row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 mb-12 border-b border-[var(--border-subtle)]">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
              Ready to give your agents memory?
            </h2>
            <p className="text-[var(--text-muted)] text-sm">
              Open source. Self-hostable. PostgreSQL-backed. No lock-in.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <a
              href="https://github.com/nfemmanuel/iranti"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
            >
              View on GitHub
            </a>
            <a
              href="/get-started"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
            >
              Get started
            </a>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {[
            {
              heading: "Product",
              links: [
                { label: "How it works", href: "/product" },
                { label: "Proof & benchmarks", href: "/proof" },
                { label: "Integrations", href: "/integrations" },
                { label: "Get started", href: "/get-started" },
              ],
            },
            {
              heading: "Docs",
              links: [
                { label: "Docs overview", href: "/docs" },
                { label: "Quickstart", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/quickstart.md" },
                { label: "Claude Code guide", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/claude-code.md" },
                { label: "Security", href: "https://github.com/nfemmanuel/iranti/blob/main/docs/guides/security-quickstart.md" },
              ],
            },
            {
              heading: "Community",
              links: [
                { label: "GitHub", href: "https://github.com/nfemmanuel/iranti" },
                { label: "Issues", href: "https://github.com/nfemmanuel/iranti/issues" },
                { label: "Discussions", href: "https://github.com/nfemmanuel/iranti/discussions" },
                { label: "Changelog", href: "https://github.com/nfemmanuel/iranti/blob/main/CHANGELOG.md" },
              ],
            },
            {
              heading: "Packages",
              links: [
                { label: "iranti (npm)", href: "https://www.npmjs.com/package/iranti" },
                { label: "@iranti/sdk (npm)", href: "https://www.npmjs.com/package/@iranti/sdk" },
                { label: "iranti (PyPI)", href: "https://pypi.org/project/iranti/" },
                { label: "AGPL license", href: "https://www.gnu.org/licenses/agpl-3.0.en.html" },
              ],
            },
          ].map((col) => (
            <div key={col.heading}>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-faint)] mb-3">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-sm text-[var(--text-muted)] hover:text-[var(--text-code)] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-[var(--text-faint)]">
          <div className="flex items-center gap-2.5">
            <span className="w-5 h-5 rounded-sm bg-amber-500 flex items-center justify-center flex-shrink-0">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <circle cx="7" cy="7" r="2.5" fill="#080808" />
                <circle cx="2" cy="4" r="1.5" fill="#080808" opacity="0.7" />
                <circle cx="12" cy="4" r="1.5" fill="#080808" opacity="0.7" />
                <circle cx="2" cy="10" r="1.5" fill="#080808" opacity="0.5" />
                <circle cx="12" cy="10" r="1.5" fill="#080808" opacity="0.5" />
              </svg>
            </span>
            <span>
              <strong className="text-[var(--text-muted)]">iranti</strong> — memory infrastructure for multi-agent AI
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>v0.2.12</span>
            <span>AGPL-3.0</span>
            <span>
              <em>Iranti</em> is the Yoruba word for memory and remembrance.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
