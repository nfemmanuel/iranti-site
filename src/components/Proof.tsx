import Link from "next/link";
import { benchmarkHighlights } from "@/lib/siteData";

const trustReasons = [
  "Shared facts survive process and session boundaries.",
  "Exact retrieval gives teams a cleaner answer than fuzzy memory alone.",
  "Upgrade continuity is part of the product story, not an afterthought.",
  "Claim boundaries are public, so the product does not have to hide behind hype.",
];

export default function Proof() {
  return (
    <section id="proof" className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-teal-500" />
          <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">Evidence</span>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              Why teams can trust Iranti.
              <br />
              <span className="text-[var(--text-muted)]">Because the product story is backed by real proof.</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              The value proposition is straightforward: Iranti keeps shared facts durable across tools and sessions,
              gives operators something inspectable, and avoids the usual black-box memory story. The evidence exists to support that claim,
              not to bury it under jargon.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {benchmarkHighlights.map((item) => (
                <Link key={item.id} href={item.href} className="block p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl hover:border-[var(--border-light)] transition-colors">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{item.label}</div>
                  <div className="text-xs font-mono text-amber-500 mb-2">{item.score}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.detail}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 border border-[var(--border-subtle)] bg-[var(--bg-surface)] rounded-xl">
            <div className="text-xs text-[var(--text-faint)] font-mono mb-4 uppercase tracking-wider">What this evidence means for buyers</div>
            <div className="space-y-4">
              {trustReasons.map((reason) => (
                <div key={reason} className="flex items-start gap-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                  <span className="text-teal-500 mt-0.5">-</span>
                  <span>{reason}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-[var(--border-subtle)]">
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">
                The fuller evidence page is there for evaluators who want methodology, claim boundaries, and research links.
              </p>
              <Link href="/evidence" className="text-sm font-mono text-amber-500 hover:text-amber-400 transition-colors">
                Read the evidence
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
