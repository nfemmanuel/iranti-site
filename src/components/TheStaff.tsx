import ArchDiagram from "./ArchDiagram";

const staff = [
  {
    name: "Library",
    role: "Knowledge base",
    desc: "PostgreSQL tables. Current truth lives in knowledge_base. Closed and contested intervals live in archive. Facts are attached to entities by key.",
    color: "amber",
  },
  {
    name: "Librarian",
    role: "Write manager",
    desc: "All agent writes go through here. Detects conflicts, resolves them deterministically when possible, escalates to humans when genuinely ambiguous.",
    color: "teal",
  },
  {
    name: "Attendant",
    role: "Per-agent memory",
    desc: "One instance per agent. Manages working memory — what to load at session start, what to inject per turn, what to persist between sessions.",
    color: "teal",
  },
  {
    name: "Archivist",
    role: "Periodic cleanup",
    desc: "Archives expired and low-confidence entries on a schedule. Processes human-resolved conflict files. Never deletes — worst case is a messy archive.",
    color: "amber",
  },
  {
    name: "Resolutionist",
    role: "Conflict review",
    desc: "Interactive CLI for human conflict review. Reads pending escalation files, guides a reviewer through competing facts, writes authoritative resolutions.",
    color: "amber",
  },
];

const colorMap = {
  amber: {
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    dot: "bg-amber-500",
    label: "text-amber-500",
  },
  teal: {
    border: "border-teal-500/20",
    bg: "bg-teal-500/5",
    dot: "bg-teal-500",
    label: "text-teal-500",
  },
};

export default function TheStaff() {
  return (
    <section className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Architecture
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              Five components.
              <br />
              <span className="text-[var(--text-muted)]">Called The Staff.</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Iranti is not a single process. It is a small system of
              specialized components, each with a clear responsibility and a
              clear interface. That design is what makes the memory layer
              inspectable, maintainable, and honest about failure.
            </p>

            {/* Animated architecture diagram */}
            <ArchDiagram />
          </div>

          {/* Staff cards */}
          <div className="space-y-3">
            {staff.map((s) => {
              const c = colorMap[s.color as keyof typeof colorMap];
              return (
                <div
                  key={s.name}
                  className={`p-4 rounded-xl border ${c.border} ${c.bg} transition-all`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full ${c.dot} mt-1.5 flex-shrink-0`}
                    />
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span
                          className={`text-sm font-semibold ${c.label}`}
                        >
                          {s.name}
                        </span>
                        <span className="text-xs text-[var(--text-faint)] font-mono">
                          {s.role}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
