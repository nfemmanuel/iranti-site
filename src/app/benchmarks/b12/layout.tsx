import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B12: Session Recovery — Iranti Internal Benchmark",
  description:
    "8/8 full session recovery when prior checkpoint state is rich. 5/8 partial recovery. Recovery quality scales directly with checkpoint completeness.",
  alternates: { canonical: "/benchmarks/b12" },
  openGraph: {
    title: "B12: Session Recovery — Iranti",
    description:
      "8/8 full recovery with rich checkpoints. 5/8 partial. Recovery quality scales with checkpoint completeness.",
    url: "https://iranti.dev/benchmarks/b12",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
