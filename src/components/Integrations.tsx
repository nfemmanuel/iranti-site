const integrations = [
  {
    name: "Claude Code",
    type: "MCP + hooks",
    desc: "Best current path when you want memory to show up before the turn, persist after the response, and stay visible to operators.",
    cmd: "iranti claude-setup",
    tier: "native",
  },
  {
    name: "Codex",
    type: "MCP",
    desc: "Strong for explicit retrieval, durable writes, and cross-tool handoffs once the project is bound to the same memory layer.",
    cmd: "iranti codex-setup",
    tier: "native",
  },
  {
    name: "SDK / HTTP",
    type: "Any agent stack",
    desc: "The durable path for teams that want memory to outlive one IDE, one framework, or one generation of agent tooling.",
    cmd: "npm install @iranti/sdk",
    tier: "validated",
  },
  {
    name: "CrewAI / LangChain",
    type: "Validated pattern",
    desc: "Best used as frameworks that plug into Iranti rather than memory systems Iranti competes with directly.",
    cmd: "pip install iranti",
    tier: "validated",
  },
  {
    name: "iranti chat",
    type: "Operator CLI",
    desc: "Direct inspection, seeding, history checks, and conflict debugging when you need to understand the state underneath the agent experience.",
    cmd: "iranti chat",
    tier: "native",
  },
  {
    name: "Browser-tab AI UIs",
    type: "Not the product",
    desc: "Iranti is not positioned as browser injection or extension memory. The right layer is MCP, SDK, HTTP, and runtime hooks.",
    cmd: "Use MCP or SDK instead",
    tier: "boundary",
  },
];

const tierColors = {
  native: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  validated: "text-teal-500 bg-teal-500/10 border-teal-500/20",
  boundary: "text-[var(--text-muted)] bg-[var(--border-subtle)] border-[var(--border-light)]",
};

const tierLabels = {
  native: "Native",
  validated: "Validated",
  boundary: "Boundary",
};

export default function Integrations() {
  return (
    <section id="integrations" className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Integrations</span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3 leading-tight">
              Keep the tools you already trust.
              <br />
              <span className="text-[var(--text-muted)]">Unify the memory underneath them.</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl leading-relaxed">
              The selling point is not a flashy plugin. It is one shared memory and recovery layer
              across Claude Code, Codex, SDK clients, HTTP callers, and operator tooling.
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {integrations.map((item) => (
            <div key={item.name} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl transition-colors hover:border-[var(--border-light)]">
              <div className="flex items-start justify-between mb-3 gap-3">
                <div>
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-0.5">{item.name}</div>
                  <div className="text-xs text-[var(--text-faint)] font-mono">{item.type}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full border text-xs ${tierColors[item.tier as keyof typeof tierColors]}`}>
                  {tierLabels[item.tier as keyof typeof tierLabels]}
                </span>
              </div>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4">{item.desc}</p>
              <div className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg">
                <span className="text-[var(--text-faint)] font-mono text-xs">$</span>
                <span className="text-xs text-[var(--text-secondary)] font-mono">{item.cmd}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

