import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B7: Episodic Memory — Iranti Internal Benchmark",
  description:
    "9/9 episodic recall tasks pass. Partial temporal ordering achieved. Episodic memory via structured knowledge base is a viable pattern for AI agents.",
  alternates: { canonical: "/benchmarks/b7" },
  openGraph: {
    title: "B7: Episodic Memory — Iranti",
    description:
      "9/9 episodic recall tasks pass. Partial temporal ordering. Episodic memory via structured KB is viable.",
    url: "https://iranti.dev/benchmarks/b7",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
