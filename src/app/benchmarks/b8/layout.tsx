import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B8: Agent Coordination — Iranti Internal Benchmark",
  description:
    "6/6 coordination tests pass. Zero missed cross-agent writes. Shared knowledge base as coordination layer for multi-agent AI systems holds up under concurrent workloads.",
  alternates: { canonical: "/benchmarks/b8" },
  openGraph: {
    title: "B8: Agent Coordination — Iranti",
    description:
      "6/6 coordination tests pass. Zero missed cross-agent writes. Shared KB as coordination layer for multi-agent AI.",
    url: "https://iranti.dev/benchmarks/b8",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
