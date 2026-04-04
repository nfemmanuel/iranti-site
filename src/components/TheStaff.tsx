import ArchDiagram from "./ArchDiagram";

const staff = [
  {
    name: "Library",
    role: "Knowledge base",
    desc: "PostgreSQL tables. Active truth in knowledge_base. Superseded truth in archive. Relationships in entity_relationships. Identity registry in entities with aliases in entity_aliases.",
    color: "amber",
  },
  {
    name: "Librarian",
    role: "Write manager",
    desc: "All agent writes go through here. Detects conflicts, resolves them deterministically when possible, and escalates to humans when a disagreement is genuinely ambiguous.",
    color: "teal",
  },
  {
    name: "Attendant",
    role: "Per-agent memory",
    desc: "One instance per external agent per process. Manages working memory: what to load at handshake, what to inject per turn, and what brief state to persist between sessions.",
    color: "teal",
  },
  {
    name: "Archivist",
    role: "Periodic cleanup",
    desc: "Archives expired and low-confidence entries on a schedule. Processes human-resolved conflict files. Never deletes - worst case is a messy archive.",
    color: "amber",
  },
  {
    name: "Resolutionist",
    role: "Conflict review",
    desc: "Interactive CLI for human conflict review. Reads pending escalation files, guides resolution, and writes AUTHORITATIVE_JSON for the Archivist to apply.",
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
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Architecture
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              Why operators can trust it.
              <br />
              <span className="text-[var(--text-muted)]">Because the moving parts stay visible.</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Iranti is not trying to hide its architecture behind magic language. The system is split into bounded components
              so teams can understand how facts are written, loaded, archived, and disputed. That clarity is part of the product.
            </p>

            <ArchDiagram />
          </div>

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
