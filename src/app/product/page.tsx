import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProductStaffCards from "@/components/ProductStaffCards";
import ProductCapabilityCards from "@/components/ProductCapabilityCards";

export const metadata: Metadata = {
  title: "Product — Iranti Memory Infrastructure",
  description:
    "How Iranti works: The Staff architecture, identity-first retrieval, conflict resolution, and why Iranti is different from memory libraries, agent frameworks, and vector databases.",
};


const vsMemoryLibraries = [
  {
    them: "MemGPT / Letta",
    note: "Memory lives inside the agent process. One agent, one memory system. Facts do not cross agent boundaries without custom wiring.",
  },
  {
    them: "Raw in-context memory",
    note: "Prompt stuffing. Token-bounded. No persistence across sessions. No deduplication. No conflict detection.",
  },
  {
    them: "Custom database",
    note: "You build the schema, the retrieval logic, the conflict resolution, the archiving, and the per-agent injection. Iranti is that infrastructure pre-built.",
  },
];

const vsFrameworks = [
  {
    them: "LangChain memory",
    note: "Memory is a plugin inside the chain. Tied to the framework's execution model. Sharing across chains requires custom work.",
  },
  {
    them: "CrewAI memory",
    note: "Memory is bundled into crew configuration. Works within a crew; not portable to other frameworks or raw API agents.",
  },
  {
    them: "AutoGen",
    note: "Conversation history sharing between agents is explicit and manual. No identity-based lookup, no conflict tracking.",
  },
];

const vectorRows = [
  { feature: "Retrieval", vectorDB: "Similarity (nearest neighbor)", iranti: "Identity-first + optional hybrid search" },
  { feature: "Storage model", vectorDB: "Embeddings in vector space", iranti: "Structured facts with entity + key" },
  { feature: "Persistence", vectorDB: "Stateless between calls", iranti: "Persistent across sessions" },
  { feature: "Confidence", vectorDB: "None", iranti: "Per-fact confidence scores" },
  { feature: "Conflict handling", vectorDB: "None", iranti: "Automatic resolution + escalation" },
  { feature: "Context injection", vectorDB: "None", iranti: "observe() injects missing facts" },
];

export default function ProductPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />

      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px bg-amber-500" />
            <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
              Product
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-primary)] mb-6 max-w-3xl">
            Memory infrastructure,
            <br />
            <span className="text-amber-500">not another framework.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed mb-4">
            Iranti is the memory layer that sits underneath your agents. It is
            not an orchestrator, not a model provider, not a prompt library. It
            stores facts, resolves conflicts, and makes those facts available
            across any agent — regardless of which framework they run in.
          </p>
          <p className="text-base text-[var(--text-muted)] max-w-xl leading-relaxed">
            The mental model: a shared, conflict-aware knowledge base that any
            agent can read from and write to through exact{" "}
            <code className="text-[var(--text-secondary)] font-mono">entity + key</code>{" "}
            lookup.
          </p>
        </section>

        {/* Architecture — The Staff */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
                Architecture
              </span>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
                  Five components.
                  <br />
                  <span className="text-[var(--text-muted)]">Called The Staff.</span>
                </h2>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  Iranti is not a single process. It is a small system of
                  specialized components, each with a clear responsibility and a
                  clear interface. That design is what makes the memory layer
                  inspectable, maintainable, and honest about failure.
                </p>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
                  Each component has a single job. The Library stores facts. The
                  Librarian handles writes. The Attendant serves agents. The
                  Archivist cleans up. The Resolutionist handles human review of
                  genuine conflicts.
                </p>

                {/* Architecture diagram */}
                <div className="bg-[var(--bg-code)] border border-[var(--border-subtle)] rounded-xl p-5 font-mono text-xs">
                  <div className="text-[var(--text-faint)] mb-3">// iranti write flow</div>
                  <div className="space-y-1">
                    <div className="text-[var(--text-secondary)]">agent.write(entity, key, value)</div>
                    <div className="text-[var(--text-faint)] pl-4">↓</div>
                    <div className="text-amber-400 pl-4">
                      Librarian.receive()
                      <span className="text-[var(--text-faint)] ml-2">// conflict check</span>
                    </div>
                    <div className="text-[var(--text-faint)] pl-8">↓ resolved</div>
                    <div className="text-teal-400 pl-8">
                      Library.write()
                      <span className="text-[var(--text-faint)] ml-2">// knowledge_base</span>
                    </div>
                    <div className="text-[var(--text-faint)] pl-8">↓ escalated</div>
                    <div className="text-[var(--text-muted)] pl-8">
                      escalation/active/
                      <span className="text-[var(--text-faint)] ml-2">// human queue</span>
                    </div>
                  </div>
                  <div className="border-t border-[var(--border-subtle)] mt-4 pt-4 text-[var(--text-faint)]">
                    // iranti read flow
                  </div>
                  <div className="space-y-1 mt-2">
                    <div className="text-[var(--text-secondary)]">agent.handshake(task)</div>
                    <div className="text-[var(--text-faint)] pl-4">↓</div>
                    <div className="text-teal-400 pl-4">
                      Attendant.brief()
                      <span className="text-[var(--text-faint)] ml-2">// relevance filter</span>
                    </div>
                    <div className="text-[var(--text-faint)] pl-8">↓</div>
                    <div className="text-[var(--text-secondary)] pl-8">working memory injected</div>
                  </div>
                </div>
              </div>

              {/* Staff cards — animated */}
              <ProductStaffCards />
            </div>
          </div>
        </section>

        {/* Why not vector DBs */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
                vs Vector Databases
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-4 leading-tight">
              Vector DBs answer &ldquo;what&apos;s similar to X?&rdquo;
              <br />
              <span className="text-amber-500">Iranti answers &ldquo;what do we know about X?&rdquo;</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-2xl">
              Multi-agent systems need more than nearest-neighbor retrieval. When
              Agent A writes a deadline, Agent B needs to look it up by name —
              not approximate a semantically similar one. And when two agents
              disagree about the same fact, someone has to be in charge of
              resolving that. Vector databases are excellent tools; they are not
              memory infrastructure.
            </p>

            <div className="border border-[var(--border-subtle)] rounded-xl overflow-hidden max-w-3xl">
              <div className="grid grid-cols-3 text-xs font-mono uppercase tracking-wider border-b border-[var(--border-subtle)]">
                <div className="px-4 py-3 text-[var(--text-faint)]">Feature</div>
                <div className="px-4 py-3 text-[var(--text-faint)] border-l border-[var(--border-subtle)]">Vector DB</div>
                <div className="px-4 py-3 text-amber-500 border-l border-[var(--border-subtle)]">Iranti</div>
              </div>
              {vectorRows.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-3 text-sm ${i < vectorRows.length - 1 ? "border-b border-[var(--border-subtle)]" : ""}`}
                >
                  <div className="px-4 py-3.5 text-[var(--text-secondary)] font-medium">{row.feature}</div>
                  <div className="px-4 py-3.5 text-[var(--text-faint)] border-l border-[var(--border-subtle)]">{row.vectorDB}</div>
                  <div className="px-4 py-3.5 text-teal-400 border-l border-[var(--border-subtle)] flex items-start gap-2">
                    <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-teal-500" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                    </svg>
                    {row.iranti}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* vs Memory Libraries */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                vs Memory Libraries
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3 leading-tight">
              Memory libraries store facts inside the agent.
              <br />
              <span className="text-teal-400">Iranti stores facts across agents.</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
              The difference matters the moment you have more than one agent.
              MemGPT, Letta, and custom in-context approaches give an individual
              agent better memory. Iranti gives a system of agents shared,
              consistent, conflict-managed memory.
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {vsMemoryLibraries.map((item) => (
                <div key={item.them} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{item.them}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-5 border border-teal-500/20 bg-teal-500/5 rounded-xl max-w-2xl">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                <span className="text-teal-400 font-medium">The Iranti position:</span> these
                tools solve real problems for single-agent scenarios. Iranti solves the next
                layer — what happens when five agents need to share a consistent view of the
                same entity, and two of them write conflicting facts.
              </p>
            </div>
          </div>
        </section>

        {/* vs Agent Frameworks */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-amber-500" />
              <span className="text-xs text-amber-500 font-mono uppercase tracking-wider">
                vs Agent Frameworks
              </span>
            </div>
            <h2 className="text-3xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-3 leading-tight">
              Frameworks bundle memory inside orchestration.
              <br />
              <span className="text-amber-500">Iranti is memory infrastructure you plug frameworks into.</span>
            </h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl">
              LangChain, CrewAI, AutoGen — they all include some form of memory. But
              that memory is coupled to the framework&apos;s execution model. Iranti is
              the uncoupled alternative: a persistence layer any framework can write
              to and read from, with deterministic retrieval and conflict management
              that does not depend on the framework&apos;s internals.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {vsFrameworks.map((item) => (
                <div key={item.them} className="p-5 bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl">
                  <div className="text-sm font-semibold text-[var(--text-code)] mb-2">{item.them}</div>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.note}</p>
                </div>
              ))}
            </div>

            <div className="p-5 border border-amber-500/20 bg-amber-500/5 rounded-xl max-w-2xl">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                <span className="text-amber-400 font-medium">Validated:</span> Iranti has been
                tested with CrewAI (6/6 fact transfer), LangChain (5/5), and raw OpenAI API (5/5).
                The point is that none of those frameworks needed to change — Iranti slipped in
                underneath them.
              </p>
            </div>
          </div>
        </section>

        {/* Additional capabilities */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-teal-500" />
              <span className="text-xs text-teal-500 font-mono uppercase tracking-wider">
                Capabilities
              </span>
            </div>
            <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-10 leading-tight">
              Beyond write and read.
            </h2>
            {/* Capability cards — animated */}
            <ProductCapabilityCards />
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-16 border-t border-[var(--border-subtle)]">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[var(--text-primary)] mb-2">
                Ready to evaluate?
              </h2>
              <p className="text-[var(--text-muted)] text-sm">
                See the benchmark results, or go straight to install.
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link
                href="/proof"
                className="px-5 py-2.5 border border-[var(--border-light)] hover:border-[var(--text-faint)] text-[var(--text-code)] text-sm rounded-lg transition-colors"
              >
                See proof
              </Link>
              <Link
                href="/get-started"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-[#080808] text-sm font-medium rounded-lg transition-colors"
              >
                Get started
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
