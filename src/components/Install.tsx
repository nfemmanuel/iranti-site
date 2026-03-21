"use client";

import { useState } from "react";

type Step = {
  label: string;
  cmd: string;
  comment: string;
};

const steps: Step[] = [
  {
    label: "Install the CLI",
    cmd: "npm install -g iranti",
    comment: "# requires Node.js 18+",
  },
  {
    label: "Run guided setup",
    cmd: "iranti setup",
    comment: "# walks you through postgres, API keys, and project binding",
  },
  {
    label: "Start your instance",
    cmd: "iranti run --instance local",
    comment: "# runs on port 3001 by default",
  },
  {
    label: "Bind your project",
    cmd: "iranti project init . --instance local --agent-id my_agent",
    comment: "# writes .env.iranti to your project",
  },
];

const claudeSteps = [
  { cmd: "iranti claude-setup", comment: "# configures .mcp.json and hooks automatically" },
];

const codexSteps = [
  { cmd: "iranti codex-setup", comment: "# registers in global MCP config" },
  { cmd: "codex -C /path/to/your/project", comment: "# launch Codex in your bound project" },
];

function CodeBlock({ lines }: { lines: { cmd: string; comment: string }[] }) {
  const [copied, setCopied] = useState(false);

  const text = lines.map((l) => l.cmd).join("\n");
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 text-[var(--text-faint)] hover:text-[var(--text-secondary)] transition-colors opacity-0 group-hover:opacity-100"
        aria-label="Copy"
      >
        {copied ? (
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" /><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" />
          </svg>
        )}
      </button>
      <div className="p-4 space-y-1">
        {lines.map((l, i) => (
          <div key={i} className="font-mono text-sm">
            <span className="text-[var(--text-faint)] mr-2">$</span>
            <span className="text-[var(--text-code)]">{l.cmd}</span>
            {l.comment && (
              <span className="text-[var(--text-faint)] ml-3">{l.comment}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Install() {
  return (
    <section id="install" className="py-24 px-6 border-t border-[var(--border-subtle)]">
      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-amber-500" />
          <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
            Get started
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left: steps */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              Up in four commands.
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              Iranti requires Node.js 18+ and PostgreSQL. The setup wizard
              walks you through configuration — no manual env file editing on
              the happy path.
            </p>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={step.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full border border-[var(--border-light)] flex items-center justify-center text-xs font-mono text-[var(--text-faint)] mt-0.5">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-[var(--text-code)] mb-2">
                      {step.label}
                    </div>
                    <CodeBlock lines={[{ cmd: step.cmd, comment: step.comment }]} />
                  </div>
                </div>
              ))}
            </div>

            {/* Diagnostics note */}
            <div className="mt-6 p-4 border border-[var(--border-subtle)] rounded-xl">
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                If something fails at any step, use{" "}
                <code className="text-[var(--text-secondary)] font-mono">
                  iranti doctor --debug
                </code>{" "}
                for a full diagnostic report. Setup friction is real — we
                document it honestly rather than pretending it doesn&apos;t
                exist.
              </p>
            </div>
          </div>

          {/* Right: integrations */}
          <div className="space-y-8">
            {/* Python */}
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                Python client
              </h3>
              <CodeBlock
                lines={[
                  { cmd: "pip install iranti", comment: "" },
                ]}
              />
              <div className="mt-3 bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs font-mono text-[var(--text-muted)] leading-relaxed">
{`from iranti import IrantiClient

client = IrantiClient(
    base_url="http://localhost:3001",
    api_key="your_api_key"
)

# Write a fact
client.write(
    entity="project/my_project",
    key="deadline",
    value={"date": "2026-04-01"},
    summary="Project deadline is April 2026",
    confidence=90,
    source="project_brief",
    agent="planner_agent"
)

# Any agent reads it back
result = client.query("project/my_project", "deadline")
print(result.value)  # {"date": "2026-04-01"}`}
                </pre>
              </div>
            </div>

            {/* Claude Code */}
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                Claude Code via MCP
              </h3>
              <CodeBlock lines={claudeSteps} />
            </div>

            {/* Codex */}
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                Codex via MCP
              </h3>
              <CodeBlock lines={codexSteps} />
            </div>

            {/* npm */}
            <div>
              <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-3">
                TypeScript SDK
              </h3>
              <CodeBlock
                lines={[
                  { cmd: "npm install @iranti/sdk", comment: "# v0.2.12" },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
