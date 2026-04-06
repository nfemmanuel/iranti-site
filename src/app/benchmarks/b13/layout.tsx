import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B13: Upgrade Continuity — Iranti Internal Benchmark",
  description:
    "4/5 facts preserved across version upgrades, 3/3 post-upgrade writes succeed, conflict state intact, API surface stable. Acceptable upgrade continuity for a pre-1.0 product.",
  alternates: { canonical: "/benchmarks/b13" },
  openGraph: {
    title: "B13: Upgrade Continuity — Iranti",
    description:
      "4/5 facts preserved across versions. 3/3 post-upgrade writes succeed. Conflict state intact. API stable.",
    url: "https://iranti.dev/benchmarks/b13",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
