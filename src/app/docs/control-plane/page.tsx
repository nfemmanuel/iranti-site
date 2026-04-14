import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export const metadata: Metadata = {
  title: "Control Plane — Iranti Docs",
  description: "Download and use the Iranti Control Plane: a local web UI for browsing memory, watching agents, resolving conflicts, and reading the full session ledger.",
  alternates: { canonical: "/docs/control-plane" },
};

const panels = [
  {
    title: "Memory Explorer",
    color: "teal" as const,
    desc: "Browse every entity type in your memory store. Search by entity or keyword, see live fact counts, and inspect individual facts with their confidence scores and source attribution.",
  },
  {
    title: "Agent & Session View",
    color: "teal" as const,
    desc: "See which agents are connected, what facts each one has accessed, and when they last checked in. Useful when multiple tools or agents share the same memory space.",
  },
  {
    title: "Health & Conflicts",
    color: "amber" as const,
    desc: "Inspect system state and resolve write conflicts in a UI instead of a CLI prompt. When two agents disagree on the same fact, this is where you adjudicate it.",
  },
  {
    title: "Fleet Ledger",
    color: "amber" as const,
    desc: "Full audit trail across every agent and session. See exactly what changed, who wrote it, and when — useful for debugging unexpected state or reviewing what happened in a previous session.",
  },
];

const colorMap = {
  teal: { dot: "bg-teal-500", title: "text-teal-400", border: "border-teal-500/20", bg: "bg-teal-500/5" },
  amber: { dot: "bg-amber-500", title: "text-amber-400", border: "border-amber-500/20", bg: "bg-amber-500/5" },
};

export default function ControlPlaneGuidePage() {
  return (
    <div className="min-h-screen">
      <GridBackground />
      <Nav />

      <main className="relative z-10 pt-24 pb-16">
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Control Plane</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            See what your agents believe.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            The Control Plane is a local web UI that ships with Iranti. Browse your full memory
            store, watch agents connect in real time, inspect facts by entity, and resolve
            conflicts before they become bugs. It runs on your machine at{" "}
            <code className="text-sm text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">localhost:7500</code>.
          </p>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto space-y-6">
          {/* Step 1 — Download */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">1</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Download the app</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  Download the latest release for your platform from GitHub. The Control Plane is
                  a standalone app — no separate install step, no cloud account.
                </p>
                <a
                  href="https://github.com/nfemmanuel/iranti-control-plane/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 hover:opacity-90 text-[#080808] text-[13px] font-medium rounded-full transition-opacity"
                >
                  Download →
                </a>
              </div>
            </div>
          </div>

          {/* Step 2 — Launch */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">2</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Start it</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  With Iranti already running, open the Control Plane from the terminal. It
                  connects to the local instance automatically.
                </p>
                <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm">
                  <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                  <pre className="text-[var(--text-code)] whitespace-pre">iranti ui</pre>
                </div>
                <p className="text-xs text-[var(--text-faint)] mt-3 leading-relaxed">
                  The UI opens at localhost:7500. You can also open it directly in a browser after starting it.
                </p>
              </div>
            </div>
          </div>

          {/* Step 3 — What you get */}
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <div className="flex items-start gap-4">
              <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">3</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">Four panels</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                  The Control Plane has four views. Each one covers a different part of your
                  memory and agent activity.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {panels.map((panel) => {
                    const c = colorMap[panel.color];
                    return (
                      <div key={panel.title} className={`p-4 rounded-xl border ${c.border} ${c.bg}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-1.5 h-1.5 rounded-full ${c.dot} flex-shrink-0`} />
                          <span className={`text-sm font-semibold ${c.title}`}>{panel.title}</span>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">{panel.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Tip box */}
          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">When to open it</h2>
            <div className="space-y-2 text-sm text-[var(--text-secondary)] leading-relaxed">
              <p>
                The Control Plane is most useful when something feels wrong. If an agent is writing facts
                you did not expect, the Fleet Ledger shows exactly when and why. If two agents
                produced conflicting values for the same fact, Health and Conflicts surfaces it before
                the next session inherits the wrong state.
              </p>
              <p>
                For routine operation you do not need it open — the CLI{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti doctor</code>{" "}
                and{" "}
                <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti status</code>{" "}
                cover the health checks. Use the UI when you want to browse or understand memory state visually.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/quickstart" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
              ← Quickstart
            </Link>
            <Link href="/docs/operator" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
              Operator reference →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
