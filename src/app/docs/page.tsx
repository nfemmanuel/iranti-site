import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { researchLinks } from "@/lib/siteData";

export const metadata: Metadata = {
  title: "Docs - Iranti Guides, Concepts, and Research Links",
  description:
    "Iranti documentation hub: setup guides, integration paths, product concepts, and evidence links for the current benchmark record.",
  alternates: { canonical: "/docs" },
  openGraph: {
    title: "Docs - Iranti Guides, Concepts, and Research Links",
    description:
      "Guides for setup and integrations, plus concept pages and benchmark research links for Iranti.",
    type: "website",
    url: "https://iranti.dev/docs",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Docs - Iranti Guides, Concepts, and Research Links",
    description:
      "Guides for setup and integrations, plus concept pages and benchmark research links for Iranti.",
  },
};

const guides = [
  {
    title: "Quickstart",
    desc: "Install the CLI, bring a database, start an instance, and bind a project.",
    href: "/docs",
    time: "10 min",
  },
  {
    title: "Claude Code guide",
    desc: "Current MCP and hook setup for Claude Code, including workspace MCP and response-persistence hooks.",
    href: "/docs",
    time: "5 min",
  },
  {
    title: "Codex guide",
    desc: "Current Codex setup path, including global configuration and VS Code MCP scaffolding.",
    href: "/docs",
    time: "5 min",
  },
  {
    title: "Manual / operator flow",
    desc: "Use the CLI as an operator surface for status, doctor, repair, lifecycle, and project binding tasks.",
    href: "/docs",
    time: "12 min",
  },
];

const concepts = [
  {
    title: "Entity + key memory",
    desc: "Iranti is strongest when an agent can address the fact it wants directly. That is why entity + key is the core retrieval model.",
  },
  {
    title: "The Staff",
    desc: "The Library, Librarian, Attendant, Archivist, and Resolutionist divide memory responsibilities into inspectable components with bounded jobs.",
  },
  {
    title: "Shared versus personal memory",
    desc: "Personal preferences belong on personal entities such as user/main. Project state belongs on project entities. The system now routes those separately.",
  },
  {
    title: "Conflict and escalation",
    desc: "Deterministic conflicts resolve automatically when the confidence gap is clear. Ambiguous cases should be understood as conservative and escalation-prone.",
  },
  {
    title: "Recovery and handoff",
    desc: "Iranti helps most when work crosses agent boundaries, process boundaries, or restart boundaries. Explicit retrieval still beats hoping the model remembers.",
  },
  {
    title: "Operator visibility",
    desc: "Health, doctor, repair, bindings, version drift, and runtime lifecycle are part of the product story, not afterthoughts.",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Docs</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-4xl">
            Use the docs to get live.
            <br />
            <span className="text-[var(--text-muted)]">Use the research links when you need claim discipline.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed">
            Iranti has two different documentation jobs: help you install and use the system,
            and help you understand what the current evidence does and does not support.
            This page keeps those jobs separate so evaluation stays clear.
          </p>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Guides</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {guides.map((guide) => (
                <a
                  key={guide.title}
                  href={guide.href}
                  className="group p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-light)] rounded-xl transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="px-2 py-0.5 rounded-full border text-xs text-amber-500 bg-amber-500/10 border-amber-500/20">Guide</span>
                    <span className="text-xs text-[var(--text-faint)] font-mono">{guide.time}</span>
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-code)] group-hover:text-[var(--text-primary)] transition-colors mb-2">{guide.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{guide.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Core ideas</span>
            </div>
            <p className="text-[var(--text-muted)] text-sm mb-10 max-w-2xl">
              Six ideas that explain how Iranti works and why the architecture choices matter.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {concepts.map((concept) => (
                <div key={concept.title} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <h3 className="text-sm font-semibold text-[var(--text-code)] mb-2">{concept.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{concept.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Research and evidence</span>
            </div>
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {researchLinks.map((link) => (
                <Link key={link.title} href={link.href} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-light)] transition-colors">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{link.title}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{link.description}</p>
                </Link>
              ))}
            </div>
            <div className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] max-w-3xl">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                The evidence pages cover benchmark methodology, trial data, and exact claim boundaries. Start with the overview, then go deeper on individual benchmarks.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">Ready to install?</h2>
              <p className="text-[var(--text-muted)] text-sm max-w-xl">Iranti is open source and free to self-host. Run <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded">npm install -g iranti</code> to get started.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/benchmarks" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors">Read the evidence</Link>
              <a href="https://github.com/nfemmanuel/iranti#readme" target="_blank" rel="noopener noreferrer" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors">Install guide →</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

