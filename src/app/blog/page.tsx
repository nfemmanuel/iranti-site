import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const POSTS = [
  {
    slug: "context-economy",
    date: "2026-04-06",
    title: "Why Iranti uses 37% fewer tokens in long coding sessions",
    summary:
      "We measured cumulative input token usage over a 15-turn coding session with and without Iranti. By turn 15, the Iranti arm uses 37% fewer tokens. Here's exactly how we measured it and why the gap grows over time.",
    tags: ["benchmarks", "token efficiency", "B14"],
  },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-4xl mx-auto">
            <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-faint)] mb-4">
              Blog
            </div>
            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-3">
              Research notes
            </h1>
            <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl">
              Benchmark methodology, engineering decisions, and observations on building
              persistent memory infrastructure for multi-agent AI systems.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-px">
              {POSTS.map(post => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-8 border-b border-[var(--border-subtle)] hover:border-[var(--border-light)] transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <time className="text-xs font-mono text-[var(--text-faint)]">
                      {post.date}
                    </time>
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-lg font-semibold text-[var(--text-primary)] group-hover:text-teal-500 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                    {post.summary}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
