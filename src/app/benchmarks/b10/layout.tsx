import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B10: Knowledge Provenance — Iranti Internal Benchmark",
  description:
    "Source and confidence visible on all reads. Agent attribution (whoKnows) is MCP-only — not exposed via REST. Core lineage works; full attribution is bounded to the MCP surface.",
  alternates: { canonical: "/benchmarks/b10" },
  openGraph: {
    title: "B10: Knowledge Provenance — Iranti",
    description:
      "Source and confidence on all reads. Agent attribution is MCP-only. Core lineage works; full attribution bounded.",
    url: "https://iranti.dev/benchmarks/b10",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
