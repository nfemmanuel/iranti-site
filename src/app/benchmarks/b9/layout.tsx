import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B9: Relationship Traversal — Iranti Internal Benchmark",
  description:
    "9/9: relationship writes, one-hop traversal, and deep graph traversal all pass. Structured relationship memory for AI agent knowledge graphs.",
  alternates: { canonical: "/benchmarks/b9" },
  openGraph: {
    title: "B9: Relationship Traversal — Iranti",
    description:
      "9/9: relationship writes, one-hop, deep graph traversal all pass. Knowledge graph traversal for multi-agent AI.",
    url: "https://iranti.dev/benchmarks/b9",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
