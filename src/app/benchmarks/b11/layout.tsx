import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B11: Context Recovery — Iranti Internal Benchmark",
  description:
    "5/5 full recovery with explicit entity hints. 0/5 cold-start without hints. Autonomous context recovery without a starting anchor is a documented open problem in Iranti v0.3.x.",
  alternates: { canonical: "/benchmarks/b11" },
  openGraph: {
    title: "B11: Context Recovery — Iranti",
    description:
      "5/5 with hints. 0/5 without. Cold-start autonomous context recovery is a known open problem — documented honestly.",
    url: "https://iranti.dev/benchmarks/b11",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
