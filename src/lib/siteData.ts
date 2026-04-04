export const CURRENT_VERSION = '0.3.2'

export const benchmarkHighlights = [
  {
    id: 'B1',
    href: '/evidence/b1',
    label: 'Exact retrieval holds at scale',
    score: '10/10 — null accuracy gap vs. long-context',
    detail: 'Iranti\'s structured retrieval arm matches raw long-context reading on a 2000-entity, ~107k token blind dataset — at a fraction of the token cost. The efficiency differential is the result, not just the accuracy.',
  },
  {
    id: 'B2',
    href: '/evidence/b2',
    label: 'Shared facts survive process boundaries',
    score: '10/10 — cross-process, cross-agent',
    detail: 'Facts written by one agent are retrievable by a completely independent process with a different agent identity. Provenance is preserved. This is the persistence guarantee the product is built on.',
  },
  {
    id: 'B4',
    href: '/evidence/b4',
    label: 'Multi-hop discovery works',
    score: '10/10 — oracle, multi-hop, and search',
    detail: 'Oracle lookups, multi-hop entity chains, and vector-backed search all pass cleanly. The foundation for structured reasoning across a shared KB is in place.',
  },
  {
    id: 'B9',
    href: '/evidence/b9',
    label: 'Relationships support richer project context',
    score: '9/9 — writes, one-hop, deep traversal',
    detail: 'Relationship writes plus one-hop and deep traversal all work. When work spans people, repos, tasks, and systems, the KB can model those connections explicitly.',
  },
]

export const allBenchmarks = [
  {
    id: 'B1',
    href: '/evidence/b1',
    label: 'Entity retrieval at scale',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'Null accuracy gap vs. long-context reading at 2,000 entities, ~107k tokens. Structured retrieval at fraction of the token cost.',
  },
  {
    id: 'B2',
    href: '/evidence/b2',
    label: 'Cross-process persistence',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'Facts written by one agent retrieved by a completely independent process with a different identity. Provenance preserved.',
  },
  {
    id: 'B3',
    href: '/evidence/b3',
    label: 'Conflict resolution',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: 'Deterministic resolution passes cleanly. LLM arbitration path times out under load — known active area.',
  },
  {
    id: 'B4',
    href: '/evidence/b4',
    label: 'Multi-hop discovery',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'Oracle lookups, multi-hop entity chains, and vector-backed search all pass. Foundation for structured KB reasoning.',
  },
  {
    id: 'B5',
    href: '/evidence/b5',
    label: 'Knowledge update',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: 'Deterministic update path works. LLM arbitration on ambiguous updates times out — same bounded area as B3.',
  },
  {
    id: 'B6',
    href: '/evidence/b6',
    label: 'Ingest pipeline',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'v0.2.16 extraction: 8/8 writes, 2/2 provenance checks, 0 contamination. Prior version bugs fixed.',
  },
  {
    id: 'B7',
    href: '/evidence/b7',
    label: 'Episodic memory',
    status: 'null' as const,
    statusLabel: 'NULL',
    detail: 'Non-discriminative at current scale — both arms 10/10. Larger-scale run planned to find the meaningful threshold.',
  },
  {
    id: 'B8',
    href: '/evidence/b8',
    label: 'Agent coordination',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '6/6 coordination tests pass. Zero missed cross-agent writes. Shared KB as coordination layer holds up.',
  },
  {
    id: 'B9',
    href: '/evidence/b9',
    label: 'Relationship traversal',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '9/9: relationship writes, one-hop traversal, and deep graph traversal all pass cleanly.',
  },
  {
    id: 'B10',
    href: '/evidence/b10',
    label: 'Knowledge provenance',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '5/5 provenance checks. 100% source attribution on all tracked writes. Operator-visible lineage works.',
  },
  {
    id: 'B11',
    href: '/evidence/b11',
    label: 'Context recovery',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: '5/5 full recovery with explicit hints. 3/5 partial recovery. Cold-start without hints: 0/5 — bounded.',
  },
  {
    id: 'B12',
    href: '/evidence/b12',
    label: 'Session recovery',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: '8/8 full session recovery. 5/8 partial session context. Recovery quality scales with available prior state.',
  },
  {
    id: 'B13',
    href: '/evidence/b13',
    label: 'Upgrade continuity',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '4/5 facts preserved across versions, 3/3 post-upgrade writes, conflict state intact, API surface stable.',
  },
]

export const boundedClaims = [
  'Conflict resolution is strongest in deterministic cases; ambiguous conflicts escalate conservatively and may need human review.',
  'Entity discovery is a bounded story under controlled conditions — addressed retrieval is stronger than broad search.',
  'Automatic context recovery works best with explicit entity hints; cold autonomous recovery is a known area of active development.',
  'Multi-agent coordination is strongest when agents address known facts directly rather than relying on broad search discovery.',
]

export const researchLinks = [
  {
    title: 'Evidence overview',
    href: '/evidence',
    description: 'Benchmark highlights, bounded claims, and evaluator notes for the current v0.3.2 release. The right starting point for serious evaluation.',
  },
  {
    title: 'B1 — Entity retrieval at scale',
    href: '/evidence/b1',
    description: 'Exact retrieval vs. long-context reading at 2000 entities, ~107k tokens. Null accuracy gap with large token efficiency differential.',
  },
  {
    title: 'B2 — Cross-process persistence',
    href: '/evidence/b2',
    description: 'Facts written by one agent retrieved by a completely independent process with a different identity. The core persistence guarantee.',
  },
  {
    title: 'B4 — Multi-hop discovery',
    href: '/evidence/b4',
    description: 'Oracle lookups, multi-hop entity chains, and vector-backed search all pass cleanly. The foundation for structured reasoning across a shared KB.',
  },
  {
    title: 'B9 — Relationship traversal',
    href: '/evidence/b9',
    description: 'Relationship writes plus one-hop and deep traversal. When work spans people, repos, tasks, and systems, the KB can model those connections.',
  },
]

