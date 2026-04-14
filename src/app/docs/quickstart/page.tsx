import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GridBackground from "@/components/GridBackground";

export const metadata: Metadata = {
  title: "Quickstart — Iranti Docs",
  description: "Install Iranti, connect a database, start an instance, and wire it into your AI tool in under 10 minutes.",
  alternates: { canonical: "/docs/quickstart" },
};

const steps = [
  {
    n: "1",
    title: "Install the CLI",
    body: "Install Iranti globally. You need Node.js 18 or later.",
    code: `npm install -g iranti`,
  },
  {
    n: "2",
    title: "Run setup",
    body: "The setup wizard walks you through database onboarding, LLM provider keys, and project binding. Bring your own Postgres with pgvector, or let the wizard guide you through a Docker or managed option.",
    code: `iranti setup`,
    note: "Supports local Postgres, Docker, Supabase, Neon, and any managed Postgres with pgvector.",
  },
  {
    n: "3",
    title: "Start the instance",
    body: "Start the local MCP server. Keep this running while you work.",
    code: `iranti run --instance local`,
  },
  {
    n: "4",
    title: "Bind your project",
    body: "From the root of your project, bind it to the running instance. This writes a .env.iranti file with the server URL, API key, and agent identity.",
    code: `cd /path/to/your/project\niranti project init . --instance local --agent-id my_agent`,
    note: "In a multi-agent setup, give each agent its own --agent-id so writes are attributed correctly.",
  },
  {
    n: "5",
    title: "Wire in your AI tool",
    body: "Run the setup command for the tool you use. Each one configures the MCP connection and protocol instructions automatically.",
    code: `iranti claude-setup    # Claude Code\niranti codex-setup     # Codex CLI\niranti copilot-setup   # GitHub Copilot`,
  },
  {
    n: "6",
    title: "Verify the connection",
    body: "Run the doctor command to confirm the database, API key, and provider are all reachable.",
    code: `iranti doctor`,
  },
];

export default function QuickstartPage() {
  return (
    <div className="min-h-screen">
      <GridBackground />
      <Nav />

      <main className="relative z-10 pt-24 pb-16">
        <section className="px-6 py-16 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">Quickstart</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-4">
            Get Iranti running in 10 minutes.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-3">
            You need Node.js 18+ and a PostgreSQL database with pgvector. Everything else is handled by the setup wizard.
          </p>
          <p className="text-sm text-[var(--text-muted)]">
            If you want to skip the wizard, pass{" "}
            <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">
              --defaults --db-url &lt;your_postgres_url&gt;
            </code>{" "}
            to <code className="text-xs text-teal-400 bg-[var(--bg-surface)] px-1.5 py-0.5 rounded font-mono">iranti setup</code>.
          </p>
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto space-y-6">
          {steps.map((step) => (
            <div key={step.n} className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
              <div className="flex items-start gap-4">
                <div className="text-2xl font-mono text-teal-400 shrink-0 mt-0.5">{step.n}</div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base font-semibold text-[var(--text-primary)] mb-2">{step.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">{step.body}</p>
                  <div className="flex items-start gap-2 px-4 py-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg font-mono text-sm overflow-x-auto">
                    <span className="text-[var(--text-faint)] select-none shrink-0">$</span>
                    <pre className="text-[var(--text-code)] whitespace-pre">{step.code}</pre>
                  </div>
                  {step.note && (
                    <p className="text-xs text-[var(--text-faint)] mt-3 leading-relaxed">{step.note}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="px-6 pb-16 max-w-3xl mx-auto">
          <div className="p-6 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
            <h2 className="text-base font-semibold text-[var(--text-primary)] mb-3">What happens next</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
              Once your AI tool is wired in, it will call{" "}
              <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_handshake</code>{" "}
              at session start and{" "}
              <code className="text-xs text-teal-400 bg-[var(--bg-code)] px-1.5 py-0.5 rounded font-mono">iranti_attend</code>{" "}
              before each response. Facts get written after edits and tool calls, and the next session starts with the relevant ones already injected.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/docs/claude-code" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
                Claude Code guide →
              </Link>
              <Link href="/docs/codex" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
                Codex guide →
              </Link>
              <Link href="/docs/operator" className="px-4 py-2 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-[13px] rounded-full transition-colors">
                Operator reference →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
