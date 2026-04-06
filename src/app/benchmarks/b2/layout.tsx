import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B2: Cross-Process Persistence — Iranti Internal Benchmark",
  description:
    "Facts written by one agent retrieved by a completely independent process with a different identity. Provenance preserved across process boundaries.",
  alternates: { canonical: "/benchmarks/b2" },
  openGraph: {
    title: "B2: Cross-Process Persistence — Iranti",
    description:
      "Agent A writes. Agent B reads. Different process, different identity. Facts and provenance survive process termination.",
    url: "https://iranti.dev/benchmarks/b2",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
