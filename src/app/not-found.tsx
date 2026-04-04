import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        <section className="px-6 py-24 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">404</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-3xl">
            This entity doesn&apos;t exist.
            <br />
            <span className="text-[var(--text-muted)]">Or maybe it never did.</span>
          </h1>

          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-10">
            The agent queried for this page but the KB came back empty.
            Check the URL, or head somewhere that&apos;s definitely real.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
            >
              Back home
            </Link>
            <Link
              href="/evidence"
              className="inline-flex items-center px-6 py-3 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
            >
              Read the evidence
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
