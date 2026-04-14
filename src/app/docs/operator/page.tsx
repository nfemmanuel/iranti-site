import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export const metadata: Metadata = {
  title: "Operator Reference — Iranti Docs",
  description: "Iranti CLI reference for operators: doctor, status, chat, upgrade, API keys, project binding, conflict resolution, and common repair workflows.",
  alternates: { canonical: "/docs/operator" },
};

const commands = [
  {
    group: "Health",
    items: [
      { cmd: "iranti doctor", desc: "Validate the database, API key, and LLM provider. Run this first when something feels wrong." },
      { cmd: "iranti status", desc: "Show known instances and project bindings for the current machine and directory." },
      { cmd: "iranti doctor --debug", desc: "Print extra diagnostics, structured error details, and stack traces." },
    ],
  },
  {
    group: "Lifecycle",
    items: [
      { cmd: "iranti run --instance local", desc: "Start the Iranti API server for a named instance." },
      { cmd: "iranti upgrade --check", desc: "Check whether a newer version is available without applying it." },
      { cmd: "iranti upgrade --yes", desc: "Apply all available upgrades. Add --restart --instance local to restart immediately." },
    ],
  },
  {
    group: "Interactive shell",
    items: [
      { cmd: "iranti chat", desc: "Open an interactive chat shell for querying and writing memory directly. Useful for sanity-checking state." },
    ],
  },
  {
    group: "Project binding",
    items: [
      { cmd: "iranti project init . --instance local", desc: "Bind the current directory to a running instance. Writes .env.iranti." },
      { cmd: "iranti configure project . --interactive", desc: "Update an existing binding interactively." },
      { cmd: "iranti project unbind .", desc: "Remove the binding. Add --keep-integrations to leave MCP and Claude scaffolding in place." },
    ],
  },
  {
    group: "API keys",
    items: [
      { cmd: "iranti auth create-key --instance local --key-id my_app --owner \"My App\" --scopes \"kb:read,kb:write,memory:read,memory:write\"", desc: "Create a scoped key for an agent or service." },
      { cmd: "iranti auth list-keys --instance local", desc: "List all active keys for an instance." },
      { cmd: "iranti auth revoke-key --instance local --key-id my_app", desc: "Revoke a key by ID." },
    ],
  },
  {
    group: "Operating rules",
    items: [
      { cmd: "iranti list-rules", desc: "Show all user-defined operating rules with their triggers, enforcement level, and scope." },
      { cmd: "iranti delete-rule <rule-id>", desc: "Remove a rule by entity ID." },
    ],
  },
  {
    group: "Conflict resolution",
    items: [
      { cmd: "iranti resolve", desc: "Walk through escalated conflicts the Librarian could not auto-resolve." },
    ],
  },
  {
    group: "Uninstall",
    items: [
      { cmd: "iranti uninstall --dry-run", desc: "Preview what would be removed without touching anything." },
      { cmd: "iranti uninstall --all --yes", desc: "Remove runtime, project bindings, MCP entries, and Claude scaffolding. Use --dry-run first." },
    ],
  },
];

export default function OperatorPage() {
  return (
    <div className="min-h-screen">
      <GridBackground />
      <Nav />

      <main className="relative z-10 pt-24 pb-16">
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Operator reference</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Run and maintain Iranti.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            The operator surface covers health checks, instance lifecycle, project binding, key
            management, and conflict resolution. Most of the time you will not need it — but when
            something breaks, this is where you fix it.
          </p>
        </section>

        {/* Common repair workflow */}
        <section className="px-6 pb-8 max-w-3xl mx-auto">
          <div className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Repair workflow</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              When a project cannot talk to Iranti, run these in order:
            </p>
            <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm overflow-x-auto">
              <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
              <pre className="text-[var(--text-code)] whitespace-pre">{`iranti doctor\niranti status\niranti configure instance local --interactive\niranti configure project . --interactive`}</pre>
            </div>
          </div>
        </section>

        {/* Command reference */}
        <section className="px-6 pb-16 max-w-3xl mx-auto space-y-6">
          {commands.map((group) => (
            <div key={group.group} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
              <h2 className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-4">{group.group}</h2>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.cmd} className="space-y-1.5">
                    <div className="flex items-start gap-2 px-3 py-2 bg-[var(--bg-code)] rounded-lg font-mono text-xs overflow-x-auto">
                      <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                      <pre className="text-[var(--text-code)] whitespace-pre">{item.cmd}</pre>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed px-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Chat slash commands */}
        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">Inside iranti chat</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              The interactive shell exposes slash commands for direct memory operations. Useful
              for checking state without writing code.
            </p>
            <div className="grid grid-cols-2 gap-2">
              {[
                ["/memory", "Show current memory summary"],
                ["/search <query>", "Hybrid search across all facts"],
                ["/history <entity> <key>", "Full version history for a fact"],
                ["/write <key> <value>", "Write a fact directly"],
                ["/relate <from> <to> <type>", "Create a relationship"],
                ["/related <entity>", "List related entities"],
                ["/confidence <entity> <key> <n>", "Update confidence score"],
                ["/resolve", "Walk through escalated conflicts"],
              ].map(([cmd, desc]) => (
                <div key={cmd} className="p-3 bg-[var(--bg-code)] rounded-lg">
                  <code className="text-xs text-teal-400 font-mono block mb-1">{cmd}</code>
                  <p className="text-xs text-[var(--text-faint)] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-3">
            <Link href="/docs/claude-code" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
              ← Claude Code guide
            </Link>
            <Link href="/docs/control-plane" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
              Control Plane →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
