import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B1: Entity Retrieval at Scale — Iranti Internal Benchmark",
  description:
    "Null accuracy gap vs. long-context reading at 2,000 entities (~107k tokens). Iranti structured retrieval matches raw long-context at a fraction of the token cost.",
  alternates: { canonical: "/benchmarks/b1" },
  openGraph: {
    title: "B1: Entity Retrieval at Scale — Iranti",
    description:
      "2,000 entities, ~107k tokens. Null accuracy gap vs. long-context reading. Structured retrieval at a fraction of the token cost.",
    url: "https://iranti.dev/benchmarks/b1",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
