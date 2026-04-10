import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Comments from "@/components/Comments";

export const metadata: Metadata = {
  title: "6,000 Downloads in Three Weeks: What We Learned Building Agent Memory Infrastructure",
  description:
    "Iranti hit 6,000 npm downloads three weeks after launch without a Product Hunt post or major marketing push. Here is what the adoption pattern tells us about where multi-agent tooling actually is.",
  alternates: { canonical: "/blog/6k-downloads" },
  openGraph: {
    title: "6,000 Downloads in Three Weeks: What We Learned Building Agent Memory Infrastructure",
    description:
      "Iranti hit 6,000 npm downloads three weeks after launch. Here is what the adoption pattern tells us about the real state of agent memory infrastructure.",
    type: "article",
    url: "https://iranti.dev/blog/6k-downloads",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "6,000 Downloads in Three Weeks: What We Learned Building Agent Memory Infrastructure",
    description:
      "6,000 downloads, no Product Hunt launch. The agent memory problem is more widespread than we expected.",
  },
};

export default function SixKDownloadsPost() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main>
        <section className="px-6 py-16 border-b border-[var(--border-subtle)]">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-6">
              <Link
                href="/blog"
                className="text-xs font-mono text-[var(--text-faint)] hover:text-[var(--text-muted)] transition-colors"
              >
                {"<- blog"}
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-5">
              <time className="text-xs font-mono text-[var(--text-faint)]">2026-04-09</time>
              {["milestone", "agent memory", "infrastructure"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-faint)]"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-3xl font-semibold text-[var(--text-primary)] mb-4 leading-tight">
              6,000 downloads in three weeks: what we learned building agent memory infrastructure
            </h1>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
              Three weeks after publishing Iranti to npm, it had 6,000 downloads. No Product Hunt
              post. No Hacker News launch. No major marketing. Just the package, a README, and a
              benchmarks page. The number surprised us. The shape of the adoption surprised us
              more.
            </p>
          </div>
        </section>

        <section className="px-6 py-12">
          <div className="max-w-3xl mx-auto space-y-10 text-[var(--text-secondary)] leading-relaxed">

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The problem we set out to solve</h2>
              <p className="mb-4">
                Multi-agent AI systems have a memory problem that nobody talks about plainly.
                When two agents work on the same project, the second agent does not know what the
                first one learned. When a long-running agent is killed and restarted, it loses its
                working state. When an agent generates a plan, a draft, or a finding in one session,
                that output vanishes when the context window clears.
              </p>
              <p className="mb-4">
                The standard responses to this problem are well-known: stuff everything into the
                context window until it overflows, embed everything into a vector database and hope
                similarity retrieval finds the right thing, or use whatever memory the agent
                framework bundles. None of these are wrong. They are wrong for this specific job.
              </p>
              <p>
                What was missing was an infrastructure layer that treats memory as a first-class
                system concern: persistent, identity-addressed, conflict-aware, and visible to
                operators. The kind of thing that, once you have it, you wonder how you ran serious
                agent workflows without it.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What we built</h2>
              <p className="mb-4">
                Iranti is a local-first memory server for multi-agent AI systems. The backend is
                PostgreSQL with pgvector. The protocol layer is MCP (Model Context Protocol),
                which means any MCP-compatible agent host can connect without a custom adapter.
                The runtime exposes a structured set of tools that implement a specific memory
                discipline, not just storage primitives.
              </p>
              <p className="mb-4">
                The design is identity-first. Every fact is addressed by an entity and a key:
                <code className="text-xs text-teal-400 font-mono bg-[var(--bg-code)] px-1.5 py-0.5 rounded mx-1">project/my-api</code> +
                <code className="text-xs text-teal-400 font-mono bg-[var(--bg-code)] px-1.5 py-0.5 rounded mx-1">deployment_status</code>.
                Retrieval is deterministic: same address, same result. No similarity threshold, no probabilistic miss.
                Vector search exists for when the exact key is unknown, but the primary path
                is direct addressed lookup.
              </p>
              <p className="mb-4">
                Four internal components handle different concerns. The Librarian owns all writes:
                it detects conflicts when two agents write different values to the same key and
                resolves them by confidence, recency, and source identity. The Attendant owns
                memory injection: it decides what facts to surface to an agent before each reply,
                based on task context. The Archivist handles lifecycle: archiving superseded facts,
                running compaction, maintaining the temporal record. The Resolutionist handles
                escalation when the Librarian cannot resolve a conflict automatically.
              </p>
              <p>
                The full setup for Claude Code is one command:
              </p>
              <div className="mt-3 p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl font-mono text-xs space-y-2">
                <div className="text-[var(--text-faint)]"># Install globally</div>
                <div className="text-teal-300">npm install -g iranti</div>
                <div className="text-[var(--text-faint)] pt-1"># Wire Iranti into Claude Code for the current project</div>
                <div className="text-teal-300">iranti claude-setup</div>
                <div className="text-[var(--text-faint)] pt-1"># Start the Iranti runtime</div>
                <div className="text-teal-300">iranti run</div>
              </div>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">The benchmark data</h2>
              <p className="mb-4">
                We ran two benchmark suites before publishing. The first is competitive: Iranti
                against Mem0, Shodh, and Graphiti across four scenarios covering same-session
                recall, cross-session persistence, shared pool behavior, and conflict resolution.
                The second is internal: 13 tests covering the Iranti-specific capabilities that
                competitive systems do not even attempt.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 my-6">
                {[
                  { stat: "20/20", label: "Process-isolated persistence reruns", color: "text-teal-400" },
                  { stat: "14/14", label: "Agent coordination scenarios", color: "text-amber-400" },
                  { stat: "100%", label: "Recall on exact addressed lookup", color: "text-teal-400" },
                ].map(({ stat, label, color }) => (
                  <div key={stat} className="p-4 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl text-center">
                    <div className={`text-2xl font-mono font-semibold ${color} mb-1`}>{stat}</div>
                    <div className="text-xs text-[var(--text-muted)] leading-snug">{label}</div>
                  </div>
                ))}
              </div>

              <p className="mb-4">
                The 20/20 persistence score matters because process isolation is the failure mode
                that actually hurts in practice. Starting a new terminal session, switching from
                Claude Code to Codex, restarting an agent after a crash: all of these kill
                in-memory state. The 20 reruns span cold boots, process restarts, and session
                handoffs. Every fact written before the restart was retrievable after.
              </p>
              <p>
                The 14/14 coordination score covers scenarios where two or more agents run
                concurrently or sequentially and need to share state without explicit handoff.
                Agent A writes a discovery. Agent B picks up the task from a different process.
                The question is whether B knows what A learned. In all 14 scenarios, it did.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What surprised us about the adoption</h2>
              <p className="mb-4">
                We expected slow adoption. Infrastructure is hard to sell. It does not have a
                dramatic demo. The value only shows up after you have run a few multi-agent
                workflows and experienced the re-briefing problem firsthand. We thought we would
                spend the first few months explaining why this category exists.
              </p>
              <p className="mb-4">
                We did not have to. Engineers who found Iranti already knew the problem. They
                were already running Claude Code and Codex on the same projects. They were already
                copying context between tools by hand. They were already losing work when agents
                restarted. The install rate among people who landed on the benchmarks page was
                notably high: they checked the evidence first, then installed.
              </p>
              <p className="mb-4">
                The three-tool setup pattern was also more common than we predicted. We assumed
                most installs would be single-agent users who wanted cross-session persistence.
                What we found was that a meaningful fraction of early adopters were running at
                least two of Claude Code, Codex, and GitHub Copilot on the same project and
                wanted all three to share the same memory layer. That drove the Copilot
                integration up the roadmap.
              </p>
              <p>
                The download numbers also arrived steadily, not in a spike. There was no launch
                event. The curve was organic search and word of mouth. That is a better signal
                than a Product Hunt spike: it means people with the specific problem found the
                specific solution.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What the adoption tells us about the market</h2>
              <p className="mb-4">
                The agent tooling market is further along than the public discourse suggests.
                Engineers are not experimenting with multi-agent systems in sandboxes. They are
                running them on real projects and hitting real infrastructure gaps. The gap between
                &quot;agent frameworks are maturing&quot; and &quot;agent infrastructure exists&quot;
                is where a lot of practical pain lives right now.
              </p>
              <p className="mb-4">
                Memory is one of the clearest gaps. Compute is solved: you can spin up as many
                parallel agents as you can afford. Coordination is partially solved: frameworks
                handle task routing and handoffs at the framework level. Memory is not solved:
                every agent starts blind unless you explicitly re-brief it, and cross-process
                shared state has no standard layer underneath it.
              </p>
              <p>
                6,000 downloads does not prove product-market fit. It does prove that the problem
                is real, that engineers are actively looking for solutions, and that they will
                install something that looks credible and backs its claims with benchmark data.
                That is enough signal to keep building.
              </p>
            </div>

            <div className="border-t border-[var(--border-subtle)]" />

            <div>
              <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3">What is coming next</h2>
              <p className="mb-4">
                v0.3.21 is in progress. The main additions are <code className="text-xs text-teal-400 font-mono bg-[var(--bg-code)] px-1 py-0.5 rounded">iranti list-rules</code> and
                {" "}<code className="text-xs text-teal-400 font-mono bg-[var(--bg-code)] px-1 py-0.5 rounded">iranti delete-rule</code> for managing
                user operating rules from the CLI. User operating rules, introduced in v0.3.20,
                let you write policy rules that surface only when the agent is about to do something
                relevant: a rule about how to handle releases only fires when release keywords
                appear in context, not on every turn.
              </p>
              <p className="mb-4">
                Beyond v0.3.21: MCP registry submissions for Smithery and Glama, remote and team
                mode for multi-machine setups, and continued hardening of the Copilot integration.
                The local-first design will not change: the default path should run with no external
                dependencies beyond Postgres, and that stays true.
              </p>
              <p>
                If you are running multi-agent workflows and hitting the re-briefing problem,
                Iranti is built for exactly that. The feedback we most want right now is which
                failure modes you are hitting that Iranti does not yet cover.
              </p>
            </div>

            <div className="p-6 border border-[var(--border-light)] rounded-xl bg-[var(--bg-surface)]">
              <div className="text-xs font-mono text-[var(--text-faint)] uppercase tracking-wider mb-3">Try it</div>
              <div className="p-3 bg-[var(--bg-code)] rounded-lg font-mono text-sm text-teal-400 mb-4">
                <span className="text-[var(--text-faint)] select-none mr-2">$</span>
                npm install -g iranti
              </div>
              <div className="flex gap-3 flex-wrap">
                <a
                  href="https://github.com/nfemmanuel/iranti#readme"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Install guide
                </a>
                <Link
                  href="/benchmarks"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  See the benchmarks
                </Link>
                <Link
                  href="/docs"
                  className="text-xs font-mono px-3 py-1.5 border border-[var(--border-light)] rounded text-[var(--text-code)] hover:border-teal-500/50 transition-colors"
                >
                  Docs
                </Link>
              </div>
            </div>

          </div>
        </section>

        <section className="px-6 pb-16">
          <div className="max-w-3xl mx-auto">
            <Comments slug="6k-downloads" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
