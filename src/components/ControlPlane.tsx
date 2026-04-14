import Link from "next/link";

const features = [
  {
    title: "Memory Explorer",
    desc: "Browse all entity types, see live fact counts, and search the full knowledge base by entity or keyword.",
    color: "teal",
  },
  {
    title: "Agent & Session View",
    desc: "See which agents are connected, what facts they accessed, and when they last checked in.",
    color: "teal",
  },
  {
    title: "Health & Conflicts",
    desc: "Inspect system state and resolve write conflicts when two agents disagree on the same fact.",
    color: "amber",
  },
  {
    title: "Fleet Ledger",
    desc: "Full audit trail across every agent and session. Know exactly what changed, who wrote it, and when.",
    color: "amber",
  },
];

const colorMap = {
  amber: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    dot: "bg-amber-500",
    title: "text-amber-500",
  },
  teal: {
    border: "border-teal-500/20",
    bg: "bg-teal-500/5",
    dot: "bg-teal-500",
    title: "text-teal-500",
  },
};

export default function ControlPlane() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-teal-500" />
          <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
            Control Plane
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              See what your agents believe.
              <br />
              <span className="text-[var(--text-muted)]">All of it. In one place.</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              The control plane is a local web UI that ships with Iranti. Browse your full memory store,
              watch agents connect in real time, inspect facts by entity, and resolve conflicts before
              they become bugs. You own it. It runs on your machine.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="https://github.com/nfemmanuel/iranti-control-plane/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-amber-500 hover:opacity-90 text-[#080808] text-[13px] font-medium rounded-full transition-opacity"
              >
                Download →
              </a>
              <Link
                href="/docs"
                className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors"
              >
                Setup guide
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {features.map((f) => {
              const c = colorMap[f.color as keyof typeof colorMap];
              return (
                <div
                  key={f.title}
                  className={`p-4 rounded-xl border ${c.border} ${c.bg}`}
                >
                  <div className="flex items-start gap-2 mb-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-1.5 flex-shrink-0`} />
                    <span className={`text-sm font-semibold ${c.title}`}>{f.title}</span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed pl-3.5">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Screenshot */}
        <div className="rounded-xl overflow-hidden border border-[var(--border-subtle)] shadow-2xl">
          {/* Browser chrome bar */}
          <div className="flex items-center gap-2 px-4 h-9 bg-[var(--bg-surface)] border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[var(--border-light)]" />
            </div>
            <div className="ml-2 flex items-center gap-1.5 px-3 h-5 rounded bg-[var(--bg-code)] text-[10px] text-[var(--text-faint)] font-mono">
              localhost:7500/control-plane/memory
            </div>
          </div>
          {/* Light mode screenshot */}
          <img
            src="/control-plane-light.png"
            alt="Iranti control plane — Memory Explorer showing 6 entity types"
            className="cp-img-light w-full block"
          />
          {/* Dark mode screenshot */}
          <img
            src="/control-plane-dark.png"
            alt="Iranti control plane — Memory Explorer showing 6 entity types"
            className="cp-img-dark w-full hidden"
          />
        </div>

      </div>
    </section>
  );
}
