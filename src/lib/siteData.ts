export const CURRENT_VERSION = '0.3.10'

// ─── System colors for competitive charts ────────────────────────────────────

export const competitiveSystems = [
  { id: 'iranti',   label: 'Iranti',   color: '#14b8a6', bg: 'bg-teal-500',   version: 'v0.3.10' },
  { id: 'shodh',    label: 'Shodh',    color: '#60a5fa', bg: 'bg-blue-400',   version: 'v0.1.91' },
  { id: 'mem0',     label: 'Mem0',     color: '#f59e0b', bg: 'bg-amber-500',  version: 'v1.0.x'  },
  { id: 'graphiti', label: 'Graphiti', color: '#a78bfa', bg: 'bg-violet-400', version: 'v0.28.2' },
] as const

// ─── C1: Recall accuracy (isolated namespaces) ───────────────────────────────

export const b3aResults = {
  id: 'C1',
  href: '/benchmarks/competitive-recall',
  label: 'Recall Accuracy',
  description: '20 facts, 40 questions, per-fact isolated namespace. Score = expected answer substring in returned context.',
  date: '2026-04-05',
  corpus: { facts: 20, questions: 40 },
  systems: {
    iranti:   { score: 40, total: 40, pct: 100, tokPerQuery: 20 },
    shodh:    { score: 40, total: 40, pct: 100, tokPerQuery: 20 },
    mem0:     { score: 32, total: 40, pct: 80,  tokPerQuery: 13 },
    graphiti: { score: 23, total: 40, pct: 57,  tokPerQuery: 37 },
  },
  byTier: {
    HIGH:   { iranti: [16, 16], shodh: [16, 16], mem0: [12, 16], graphiti: [9,  16] },
    MEDIUM: { iranti: [12, 12], shodh: [12, 12], mem0: [12, 12], graphiti: [6,  12] },
    LOW:    { iranti: [12, 12], shodh: [12, 12], mem0: [8,  12], graphiti: [8,  12] },
  },
  keyFindings: [
    'Iranti and Shodh achieve perfect recall on exact-match factual questions.',
    'Mem0 misses 8 questions (F03, F11, F14, F17) — concentrated in HIGH and LOW risk tiers.',
    'Graphiti extracts entities and relationships via LLM but rephrases numeric config values, causing 43% miss rate.',
    'Cognee could not be tested: Python 3.14 incompatible (requires <3.14).',
  ],
}

// ─── C2: Pool efficiency (shared namespace) ──────────────────────────────────

export const b3bResults = {
  id: 'C2',
  href: '/benchmarks/pool-efficiency',
  label: 'Pool Efficiency',
  description: 'All 20 facts in one shared namespace. 40 queries must find the right fact among all stored. Efficiency = accuracy% / avg_tok_per_query.',
  date: '2026-04-05',
  corpus: { facts: 20, questions: 40 },
  systems: {
    iranti:   { score: 40, total: 40, pct: 100, tokPerQuery: 20, efficiency: 5.00 },
    shodh:    { score: 37, total: 40, pct: 92,  tokPerQuery: 66, efficiency: 1.39 },
    mem0:     { score: 32, total: 40, pct: 80,  tokPerQuery: 18, efficiency: 4.44 },
    graphiti: { score: 24, total: 40, pct: 60,  tokPerQuery: 49, efficiency: 1.22 },
  },
  keyFindings: [
    'Iranti\'s structured attend-based injection returns only the relevant entity fact — 20 tok/query regardless of pool size.',
    'Shodh\'s recall returns full memory text from the pool: 66 tok/query despite 92% accuracy collapses efficiency to 1.39.',
    'Mem0 is lean (18 tok/query) but at 80% accuracy — efficiency score 4.44, second only to Iranti.',
    'Graphiti returns ~49 tok/query of rephrased edge facts at 60% accuracy: worst efficiency score at 1.22.',
  ],
}

// ─── C3: Conflict resolution ─────────────────────────────────────────────────

export const b3cResults = {
  id: 'C3',
  href: '/benchmarks/conflict-resolution',
  label: 'Conflict Resolution',
  description: 'Write v1 (original value) then v2 (updated value) for 10 fact pairs. Query each — correct answer = v2 (latest). Verdicts: v2=correct, both=mixed, v1=stale, none=miss.',
  date: '2026-04-05',
  corpus: { conflictPairs: 10 },
  systems: {
    iranti:   { correct: 10, total: 10, pct: 100, v2: 9,  both: 1,  stale: 0, miss: 0 },
    shodh:    { correct: 10, total: 10, pct: 100, v2: 0,  both: 10, stale: 0, miss: 0 },
    mem0:     { correct: 8,  total: 10, pct: 80,  v2: 7,  both: 1,  stale: 0, miss: 2 },
    graphiti: { correct: 4,  total: 10, pct: 40,  v2: 2,  both: 2,  stale: 2, miss: 4 },
  },
  keyFindings: [
    'Iranti uses entity+key addressing — v2 write deterministically replaces v1 at the same key. 9/10 clean v2-only returns.',
    'Shodh scores 100% technically but returns BOTH old and new values on every query — the caller must disambiguate.',
    'Mem0 misses 2 conflicts entirely (none verdict) — semantic similarity surfaces neither v1 nor v2 on those queries.',
    'Graphiti shows 2 stale returns (returns old v1 value) and 4 total misses — temporal ordering only partially helps.',
  ],
}

// ─── C4: Cross-session persistence ───────────────────────────────────────────

export const b3dResults = {
  id: 'C4',
  href: '/benchmarks/cross-session',
  label: 'Cross-Session Persistence',
  description: 'Write 20 facts in process 1. Recall all 40 questions in a fresh subprocess with no shared Python state. Tests that persistence layers survive process restart.',
  date: '2026-04-05',
  corpus: { facts: 20, questions: 40 },
  systems: {
    iranti:   { score: 40, total: 40, pct: 100, storage: 'PostgreSQL' },
    shodh:    { score: 40, total: 40, pct: 100, storage: 'Docker volume' },
    mem0:     { score: 30, total: 40, pct: 75,  storage: 'Chroma (disk)' },
    graphiti: { score: 23, total: 40, pct: 57,  storage: 'Neo4j (Docker)' },
  },
  keyFindings: [
    'All four systems persist across process restart — none rely on in-memory state alone.',
    'Iranti (PostgreSQL) and Shodh (Docker volume) are fully consistent: 100% recall in the fresh process.',
    'Mem0 drops from 80% (same-session C1) to 75% cross-session — Chroma read variance under repeated parallel queries.',
    'Graphiti\'s cross-session score (57%) mirrors its same-session score — consistent but bounded by entity extraction quality.',
  ],
}

// ─── Competitive overview for summary table ────────────────────────────────────

export const competitiveOverview = [
  {
    benchmark: 'Recall accuracy',
    id: 'C1',
    href: '/benchmarks/competitive-recall',
    anchor: '#competitive-recall',
    scores: { iranti: '100%', shodh: '100%', mem0: '80%', graphiti: '57%' },
    metric: 'pct correct',
  },
  {
    benchmark: 'Pool efficiency',
    id: 'C2',
    href: '/benchmarks/pool-efficiency',
    anchor: '#pool-efficiency',
    scores: { iranti: '5.0', shodh: '1.39', mem0: '4.44', graphiti: '1.22' },
    metric: 'acc% / avg_tok',
  },
  {
    benchmark: 'Conflict resolution',
    id: 'C3',
    href: '/benchmarks/conflict-resolution',
    anchor: '#conflict-resolution',
    scores: { iranti: '100%', shodh: '100%*', mem0: '80%', graphiti: '40%' },
    metric: 'pct returns latest',
  },
  {
    benchmark: 'Cross-session',
    id: 'C4',
    href: '/benchmarks/cross-session',
    anchor: '#cross-session',
    scores: { iranti: '100%', shodh: '100%', mem0: '75%', graphiti: '57%' },
    metric: 'pct recalled fresh',
  },
]

// ─── Internal benchmarks (B1–B13) ─────────────────────────────────────────────

export const benchmarkHighlights = [
  {
    id: 'B1',
    href: '/benchmarks/b1',
    label: 'Exact retrieval holds at scale',
    score: '10/10 — null accuracy gap vs. long-context',
    detail: 'Iranti\'s structured retrieval arm matches raw long-context reading on a 2000-entity, ~107k token blind dataset — at a fraction of the token cost. The efficiency differential is the result, not just the accuracy.',
  },
  {
    id: 'B2',
    href: '/benchmarks/b2',
    label: 'Shared facts survive process boundaries',
    score: '10/10 — cross-process, cross-agent',
    detail: 'Facts written by one agent are retrievable by a completely independent process with a different agent identity. Provenance is preserved. This is the persistence guarantee the product is built on.',
  },
  {
    id: 'B4',
    href: '/benchmarks/b4',
    label: 'Multi-hop discovery works',
    score: '10/10 — oracle, multi-hop, and search',
    detail: 'Oracle lookups, multi-hop entity chains, and vector-backed search all pass cleanly. The foundation for structured reasoning across a shared KB is in place.',
  },
  {
    id: 'B9',
    href: '/benchmarks/b9',
    label: 'Relationships support richer project context',
    score: '9/9 — writes, one-hop, deep traversal',
    detail: 'Relationship writes plus one-hop and deep traversal all work. When work spans people, repos, tasks, and systems, the KB can model those connections explicitly.',
  },
]

export const allBenchmarks = [
  {
    id: 'B1',
    href: '/benchmarks/b1',
    label: 'Entity retrieval at scale',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'Null accuracy gap vs. long-context reading at 2,000 entities, ~107k tokens. Structured retrieval at fraction of the token cost.',
  },
  {
    id: 'B2',
    href: '/benchmarks/b2',
    label: 'Cross-process persistence',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'Facts written by one agent retrieved by a completely independent process with a different identity. Provenance preserved.',
  },
  {
    id: 'B3',
    href: '/benchmarks/b3',
    label: 'Conflict resolution',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '3/3: deterministic resolution, close-gap escalation, and equal-confidence contradictory escalation all pass. High-confidence challengers win cleanly; ambiguous conflicts escalate to human review.',
  },
  {
    id: 'B4',
    href: '/benchmarks/b4',
    label: 'Multi-hop discovery',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: 'Oracle lookups, multi-hop entity chains, and vector-backed search all pass. Foundation for structured KB reasoning.',
  },
  {
    id: 'B5',
    href: '/benchmarks/b5',
    label: 'Knowledge update',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: 'Direct write path works. LLM arbitration on ambiguous updates is a regression in v0.3.2 — conservative scoring silently rejects same-source updates that previously resolved. Only large confidence gaps trigger updates.',
  },
  {
    id: 'B6',
    href: '/benchmarks/b6',
    label: 'Ingest pipeline',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: 'Write-then-query is solid: 6/6 writes, provenance intact, zero contamination. Bulk ingest endpoint regressed in v0.3.2 — crashes or extracts nothing. Direct write path is the reliable surface.',
  },
  {
    id: 'B7',
    href: '/benchmarks/b7',
    label: 'Episodic memory',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '9/9 episodic recall tasks pass on v0.3.2, plus partial temporal ordering. Substantial improvement over prior bounded findings — episodic memory via structured KB is a viable pattern.',
  },
  {
    id: 'B8',
    href: '/benchmarks/b8',
    label: 'Agent coordination',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '6/6 coordination tests pass. Zero missed cross-agent writes. Shared KB as coordination layer holds up.',
  },
  {
    id: 'B9',
    href: '/benchmarks/b9',
    label: 'Relationship traversal',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '9/9: relationship writes, one-hop traversal, and deep graph traversal all pass cleanly.',
  },
  {
    id: 'B10',
    href: '/benchmarks/b10',
    label: 'Knowledge provenance',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: 'Source and confidence visible on all reads. Agent/writer identity attribution and whoKnows are MCP-only — not exposed on the REST API. Core lineage works; full attribution is bounded.',
  },
  {
    id: 'B11',
    href: '/benchmarks/b11',
    label: 'Context recovery',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: '5/5 full recovery with explicit hints. 3/5 partial recovery. Cold-start without hints: 0/5 — bounded.',
  },
  {
    id: 'B12',
    href: '/benchmarks/b12',
    label: 'Session recovery',
    status: 'partial' as const,
    statusLabel: 'PARTIAL',
    detail: '8/8 full session recovery. 5/8 partial session context. Recovery quality scales with available prior state.',
  },
  {
    id: 'B13',
    href: '/benchmarks/b13',
    label: 'Upgrade continuity',
    status: 'pass' as const,
    statusLabel: 'PASS',
    detail: '4/5 facts preserved across versions, 3/3 post-upgrade writes, conflict state intact, API surface stable.',
  },
]

// ─── Weaknesses (honest disclosure) ───────────────────────────────────────────

export const weaknessFindings = [
  {
    subject: 'Iranti',
    subjectColor: 'teal',
    finding: 'Automatic context recovery without hints fails cold',
    detail: 'B11: 5/5 full recovery with explicit entity hints. 0/5 without hints. Autonomous cold-start recovery is a known open problem — the system does not know what it does not know without a starting anchor.',
    evidence: 'B11 — Context recovery',
    evidenceHref: '/benchmarks/b11',
  },
  {
    subject: 'Iranti',
    subjectColor: 'teal',
    finding: 'LLM-arbitrated updates regressed in v0.3.2',
    detail: 'B5: Conservative LLM scoring silently rejects same-source updates that previously resolved. Only large confidence gaps trigger overwrites. Direct writes are unaffected — this is a bounded LLM path regression.',
    evidence: 'B5 — Knowledge update',
    evidenceHref: '/benchmarks/b5',
  },
  {
    subject: 'Iranti',
    subjectColor: 'teal',
    finding: 'Bulk ingest endpoint broken in v0.3.2',
    detail: 'B6: The bulk /ingest endpoint crashes or extracts nothing. The direct write path (iranti_write per fact) is solid and is the recommended surface. The endpoint regression is documented and tracked.',
    evidence: 'B6 — Ingest pipeline',
    evidenceHref: '/benchmarks/b6',
  },
  {
    subject: 'Shodh',
    subjectColor: 'blue',
    finding: 'Conflict resolution returns both old and new values',
    detail: 'C3: Shodh scores 100% on conflict resolution — but only because it returns both v1 and v2 on every query. It never replaces a fact; it accumulates them. The caller receives mixed context and must disambiguate.',
    evidence: 'C3 — Conflict resolution',
    evidenceHref: '/benchmarks/conflict-resolution',
  },
  {
    subject: 'Shodh',
    subjectColor: 'blue',
    finding: 'Token bloat in shared-pool retrieval (66 tok/query)',
    detail: 'C2: When all 20 facts share one namespace, Shodh returns full memory text per query — averaging 66 tokens versus Iranti\'s 20. Accuracy holds at 92% but the injection volume collapses efficiency from competitive to 1.39.',
    evidence: 'C2 — Pool efficiency',
    evidenceHref: '/benchmarks/pool-efficiency',
  },
  {
    subject: 'Mem0',
    subjectColor: 'amber',
    finding: 'Semantic search misses 20% of high-risk config facts',
    detail: 'C1: Mem0 misses F03, F11, F14, F17 across HIGH and LOW risk tiers. The pattern is structured config facts with specific numeric values where vector similarity finds semantically related but not exact context.',
    evidence: 'C1 — Recall accuracy',
    evidenceHref: '/benchmarks/competitive-recall',
  },
  {
    subject: 'Mem0',
    subjectColor: 'amber',
    finding: 'Cross-session consistency drops 5 points vs same-session',
    detail: 'C4: Mem0 scores 80% same-session (C1) but 75% in a fresh subprocess. The 5-point drop suggests minor Chroma read variance or initialization inconsistency across processes — not a fundamental persistence failure.',
    evidence: 'C4 — Cross-session persistence',
    evidenceHref: '/benchmarks/cross-session',
  },
  {
    subject: 'Graphiti',
    subjectColor: 'violet',
    finding: 'Entity extraction loses numeric values in config-heavy facts',
    detail: 'C1/C4: Graphiti\'s LLM entity extraction rephrases facts into semantic relationships. "JWT expiry is 3600 seconds" becomes "JWT token expiry is issued by myapp.prod" — the number is lost. 57% recall on config facts.',
    evidence: 'C1 — Recall accuracy',
    evidenceHref: '/benchmarks/competitive-recall',
  },
  {
    subject: 'Graphiti',
    subjectColor: 'violet',
    finding: 'Conflict resolution returns stale values',
    detail: 'C3: Graphiti uses temporal ordering (v1 at t-1h, v2 at t-0) but still returns stale v1 on 2/10 pairs and misses 4/10 entirely. The graph\'s temporal awareness does not fully surface the latest value in LLM-rephrased edge facts.',
    evidence: 'C3 — Conflict resolution',
    evidenceHref: '/benchmarks/conflict-resolution',
  },
]

// ─── Legacy exports ────────────────────────────────────────────────────────────

export const boundedClaims = [
  'Conflict resolution is strongest in deterministic cases (entity+key addressing). Ambiguous LLM-arbitrated updates regressed in v0.3.2 and may reject valid same-source changes.',
  'Entity discovery is a bounded story under controlled conditions — addressed retrieval is significantly stronger than broad search.',
  'Automatic context recovery works best with explicit entity hints; cold autonomous recovery (0/5 without hints) is an open area.',
  'Multi-agent coordination is strongest when agents address known facts directly rather than relying on broad search discovery.',
  'The bulk ingest endpoint is broken in v0.3.2. The direct write path (iranti_write per fact) is the reliable surface.',
]

export const researchLinks = [
  {
    title: 'Benchmarks overview',
    href: '/benchmarks',
    description: 'Full competitive suite results (C1–C4) plus internal benchmarks B1–B13. Includes honest weakness disclosure. Starting point for serious evaluation.',
  },
  {
    title: 'C1 — Competitive recall accuracy',
    href: '/benchmarks/competitive-recall',
    description: '20 facts, 40 questions across Iranti, Shodh, Mem0, and Graphiti. Iranti and Shodh 100%. Mem0 80%. Graphiti 57% — entity extraction loses numeric values.',
  },
  {
    title: 'C2 — Pool efficiency',
    href: '/benchmarks/pool-efficiency',
    description: 'All 20 facts in one namespace. Iranti: 100% accuracy, 20 tok/query, efficiency 5.0. Shodh: 92% but 66 tok/query. Mem0: 80% at 4.44 efficiency.',
  },
  {
    title: 'C3 — Conflict resolution',
    href: '/benchmarks/conflict-resolution',
    description: 'Iranti deterministically replaces v1 with v2 (entity+key). Shodh returns both. Mem0 80%. Graphiti 40%.',
  },
  {
    title: 'C4 — Cross-session persistence',
    href: '/benchmarks/cross-session',
    description: 'Fresh subprocess recall. Iranti and Shodh: 100%. Mem0: 75%. Graphiti: 57%. All systems persist — differences reflect retrieval quality.',
  },
  {
    title: 'B1 — Entity retrieval at scale',
    href: '/benchmarks/b1',
    description: 'Exact retrieval vs. long-context reading at 2000 entities, ~107k tokens. Null accuracy gap with large token efficiency differential.',
  },
  {
    title: 'B2 — Cross-process persistence',
    href: '/benchmarks/b2',
    description: 'Facts written by one agent retrieved by a completely independent process with a different identity. The core persistence guarantee.',
  },
]
