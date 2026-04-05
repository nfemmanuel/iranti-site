import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductStaffCards from "@/components/ProductStaffCards";
import ProductCapabilityCards from "@/components/ProductCapabilityCards";

export const metadata: Metadata = {
  title: "Product - Iranti Shared Memory and Recovery Infrastructure",
  description:
    "Iranti is shared memory and recovery infrastructure for multi-agent workflows: exact retrieval, durable facts, cross-tool handoff, bounded recovery, and operator visibility.",
  alternates: { canonical: "/product" },
  openGraph: {
    title: "Product - Iranti Shared Memory and Recovery Infrastructure",
    description:
      "Shared memory and recovery infrastructure for workflows that need durable facts, bounded recovery, conflict management, and operator control.",
    type: "website",
    url: "https://iranti.dev/product",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Product - Iranti Shared Memory and Recovery Infrastructure",
    description:
      "Shared memory and recovery infrastructure for workflows that need durable facts, bounded recovery, conflict management, and operator control.",
  },
};

const pillars = [
  {
    title: "Stop re-briefing every tool",
    desc: "Iranti is strongest when an agent knows what it needs: entity + key retrieval, explicit facts, provenance, and consistency across sessions and tools.",
  },
  {
    title: "Keep one shared system of record",
    desc: "Claude Code, Codex, SDK clients, and direct HTTP callers can all point at the same memory layer instead of each tool reinventing memory for itself.",
  },
  {
    title: "Trust it because you can inspect it",
    desc: "Health, doctor, repair, lifecycle, bindings, and version drift are part of the product, because memory infrastructure without inspectability becomes a trust problem fast.",
  },
  {
    title: "Recovery is useful when it stays honest",
    desc: "Iranti helps most with explicit recovery, handoffs, and durable state. The product should not pretend autonomous recovery is already a solved problem everywhere.",
  },
];

const comparisons = [
  {
    label: "Raw context memory",
    note: "Good for a single model turn. Weak for persistence, shared facts, and operator inspection.",
  },
  {
    label: "Vector DB only",
    note: "Great for similarity search. Not enough on its own for exact addressed retrieval, conflict handling, or provenance-heavy workflows.",
  },
  {
    label: "Framework-native memory",
    note: "Useful inside a framework. Weaker when the problem is memory that needs to outlive the framework boundary itself.",
  },
  {
    label: "Custom memory layer",
    note: "Always possible. Also where many teams rediscover that persistence, conflict handling, lifecycle, and inspection are substantial work.",
  },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Product</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-4xl">
            Shared memory and recovery infrastructure,
            <br />
            <span className="text-amber-500">not another agent wrapper.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-4">
            Iranti exists for the moment when one model, one prompt, and one tool-specific memory feature stop being enough.
            It gives teams a shared place to store durable facts, recover state, inspect provenance, and survive tool changes without losing the thread.
          </p>
          <p className="text-base text-[var(--text-muted)] max-w-2xl">
            The strongest product story is not abstract AI memory. It is durable handoff, exact retrieval, runtime continuity, and operator control.
          </p>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
                Architecture that earns trust.
                <br />
                <span className="text-[var(--text-muted)]">One bounded system.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Iranti is deliberately split into the Library, Librarian, Attendant, Archivist, and Resolutionist so memory behavior stays inspectable.
                That structure is part of the value: operators and developers can reason about what the system is doing instead of treating memory as black-box magic.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                A memory layer that cannot explain itself eventually becomes another source of workflow superstition. Iranti is built to avoid that trap.
              </p>
            </div>

            <ProductStaffCards />
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[1.05fr_0.95fr] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-teal-500" />
                <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Why teams reach for it</span>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {pillars.map((pillar) => (
                  <div key={pillar.title} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                    <h3 className="text-sm font-semibold text-[var(--text-code)] mb-2">{pillar.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-amber-500" />
                <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Compared with the usual alternatives</span>
              </div>
              <div className="space-y-4">
                {comparisons.map((item) => (
                  <div key={item.label} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                    <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{item.label}</div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Capabilities</span>
            </div>
            <ProductCapabilityCards />
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto p-6 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
            <div className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-3">One sentence positioning</div>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-4xl">
              Iranti is shared memory and recovery infrastructure for multi-agent workflows that need durable facts,
              bounded recovery, cross-tool handoff, conflict-aware writes, and operator visibility.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">Ready to check the evidence?</h2>
              <p className="text-[var(--text-muted)] text-sm max-w-xl">The evidence page has the current benchmark state, real claim boundaries, and methodology links for serious evaluators.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/benchmarks" className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors">See the evidence</Link>
              <a href="mailto:powerhousexiv@gmail.com" className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors">Request access</a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

