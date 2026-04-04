import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Script from "next/script";
import { benchmarkHighlights, boundedClaims, allBenchmarks } from "@/lib/siteData";

function statusChipClass(status: "pass" | "partial" | "null") {
  if (status === "pass") return "bg-teal-500/10 text-teal-400";
  if (status === "partial") return "bg-amber-500/10 text-amber-500";
  return "bg-[var(--border-subtle)] text-[var(--text-faint)]";
}

export const metadata: Metadata = {
  title: "Evidence - Why Teams Trust Iranti",
  description:
    "Why teams trust Iranti: durable shared facts, exact retrieval, cross-tool continuity, and public evidence with explicit claim boundaries.",
  openGraph: {
    title: "Evidence - Why Teams Trust Iranti",
    description:
      "Iranti backs its product story with evidence around durable shared facts, exact retrieval, upgrade continuity, and operator trust.",
    type: "website",
    url: "https://iranti.dev/evidence",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Evidence - Why Teams Trust Iranti",
    description:
      "Iranti backs its product story with evidence around durable shared facts, exact retrieval, upgrade continuity, and operator trust.",
  },
};

const buyerProof = [
  {
    title: "Shared facts outlive one session",
    body: "Iranti is built for the moment work moves from one agent, one prompt, or one session into a longer-running workflow. Teams get durable shared state instead of repeated re-briefing.",
  },
  {
    title: "Exact retrieval beats memory theater",
    body: "The strongest current evidence supports addressed retrieval and durable handoffs. That means better continuity when agents already know what they need to look up.",
  },
  {
    title: "Operators can inspect what happened",
    body: "Iranti does not ask teams to trust hidden prompt state. Facts, provenance, conflicts, and lifecycle behavior stay visible enough to debug and operate.",
  },
  {
    title: "The story survives tool changes",
    body: "Claude Code, Codex, SDK clients, and operator tooling can all point at the same memory layer, which makes continuity more durable than tool-local memory alone.",
  },
];

const evaluatorNotes = [
  {
    title: "What is strongest today",
    body: "Addressed retrieval, persistence, relationship traversal, and upgrade continuity are the clearest current strengths.",
  },
  {
    title: "How to read the claims",
    body: "Use the product story for the value proposition and the linked research docs for exact scope, rerun boundaries, and methodological caveats.",
  },
  {
    title: "Why the honesty matters",
    body: "The public evidence is more persuasive because it separates validated strengths from bounded areas instead of turning everything into a universal green light.",
  },
];

const proofJsonLd = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: "Iranti Current Evidence Summary",
  description:
    "Current-state summary of Iranti benchmark evidence and claim boundaries across retrieval, persistence, conflict handling, discovery, relationships, recovery, and upgrade continuity.",
  url: "https://iranti.dev/evidence",
  creator: {
    "@type": "Organization",
    name: "Iranti",
    url: "https://iranti.dev",
  },
  variableMeasured: benchmarkHighlights.map((item) => ({
    "@type": "PropertyValue",
    name: item.label,
    value: item.score,
  })),
};

export default function ProofPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Script
        id="proof-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(proofJsonLd) }}
      />
      <Nav />

      <main className="pt-24 pb-16">
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-teal-500" />
            <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Evidence</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-4xl">
            Why serious teams trust Iranti.
            <br />
            <span className="text-[var(--text-muted)]">The product story is stronger because the proof is real.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-3xl leading-relaxed mb-4">
            Iranti earns trust by doing a few important things well: durable shared facts, exact retrieval when agents know what they need,
            continuity across tools, and operator-visible behavior when workflows go sideways.
          </p>
          <p className="text-base text-[var(--text-muted)] max-w-2xl">
            The technical claim boundaries are here too — scroll down for evaluator notes and research links when you need to go deeper.
          </p>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {buyerProof.map((card) => (
                <div key={card.title} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{card.title}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="p-6 border border-[var(--border-subtle)] rounded-2xl bg-[var(--bg-surface)]">
              <div className="text-xs text-[var(--text-faint)] font-mono uppercase tracking-wider mb-5">Current proof highlights</div>
              <div className="space-y-4">
                {benchmarkHighlights.map((item) => (
                  <Link key={item.id} href={item.href} className="block p-4 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-base)] hover:border-[var(--border-light)] transition-colors">
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <span className="text-sm font-semibold text-[var(--text-code)]">{item.label}</span>
                      <span className="font-mono text-xs text-teal-400">{item.id}</span>
                    </div>
                    <div className="text-xs text-amber-500 font-mono mb-2">{item.score}</div>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-px bg-teal-500" />
                <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">For evaluators</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
                Evidence first.
                <br />
                <span className="text-[var(--text-muted)]">Jargon second.</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                If you are evaluating Iranti seriously, the question is not whether every memory problem is solved.
                The question is whether the product has a credible wedge and whether the claims map to real evidence.
                That answer is much stronger today than a generic AI memory pitch would suggest.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {evaluatorNotes.map((card) => (
                <div key={card.title} className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)]">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{card.title}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Current boundaries</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              {boundedClaims.map((claim) => (
                <div key={claim} className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl text-sm text-[var(--text-secondary)] leading-relaxed">
                  {claim}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-teal-500" />
                <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">All benchmarks</span>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-teal-500" />PASS</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-amber-500" />PARTIAL</span>
                <span className="flex items-center gap-1.5"><span className="inline-block w-2 h-2 rounded-full bg-[var(--border-light)]" />NULL</span>
              </div>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {allBenchmarks.map((b) => (
                <Link
                  key={b.id}
                  href={b.href}
                  className="group p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] hover:border-[var(--border-light)] transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[var(--text-faint)]">{b.id}</span>
                    <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${statusChipClass(b.status)}`}>
                      {b.statusLabel}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{b.label}</div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">{b.detail}</p>
                  <div className="mt-3 text-xs font-mono text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">Read →</div>
                </Link>
              ))}
            </div>
            <div className="p-5 border border-[var(--border-subtle)] rounded-xl bg-[var(--bg-surface)] max-w-3xl">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Each benchmark page covers methodology, trial data, and exact claim boundaries for that capability area. Read the ones that matter most for how you plan to use Iranti.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
                Want the product story behind the evidence?
              </h2>
              <p className="text-[var(--text-muted)] text-sm max-w-xl">
                The product page turns these strengths into the buyer-facing story: durable handoffs, exact retrieval, runtime continuity, and operator trust.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/product"
                className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
              >
                Read the product story
              </Link>
              <a
                href="mailto:powerhousexiv@gmail.com"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
              >
                Request access
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
