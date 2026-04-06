import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B14: Context Economy — Iranti Internal Benchmark",
  description:
    "37% fewer input tokens at turn 15 with Iranti vs. a baseline agent that re-reads files on recall turns. Measured via Anthropic countTokens API (exact, not estimated) over a 15-turn DebugAuth session.",
  alternates: { canonical: "/benchmarks/b14" },
  openGraph: {
    title: "B14: Context Economy — Iranti",
    description:
      "37% token savings at turn 15. Divergence starts at turn 8. Exact measurement via Anthropic countTokens API over a 15-turn coding session.",
    url: "https://iranti.dev/benchmarks/b14",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
