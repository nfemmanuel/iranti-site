import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B4: Multi-Hop Discovery — Iranti Internal Benchmark",
  description:
    "Oracle lookups, multi-hop entity chains, and vector-backed search all pass. Foundation for structured knowledge base reasoning in multi-agent AI systems.",
  alternates: { canonical: "/benchmarks/b4" },
  openGraph: {
    title: "B4: Multi-Hop Discovery — Iranti",
    description:
      "Oracle lookups, multi-hop chains, vector search: all pass. Structured knowledge base reasoning for multi-agent AI.",
    url: "https://iranti.dev/benchmarks/b4",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
