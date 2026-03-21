export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-subtle)] py-16 px-6">
      <div className="max-w-6xl mx-auto">
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
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <span>v0.2.12</span>
            <span>AGPL-3.0</span>
            <span>
              Built by{" "}
              <a
                href="https://github.com/nfemmanuel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-muted)] hover:text-[var(--text-code)] transition-colors"
              >
                @nfemmanuel
              </a>
              {" · "}
              <a
                href="mailto:hello@iranti.dev"
                className="text-[var(--text-muted)] hover:text-[var(--text-code)] transition-colors"
              >
                hello@iranti.dev
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
