import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B5: Knowledge Update — Iranti Internal Benchmark",
  description:
    "Direct write path works. LLM arbitration regressed in v0.3.2: conservative scoring silently rejects same-source updates. Only large confidence gaps trigger overwrites. Bounded, tracked regression.",
  alternates: { canonical: "/benchmarks/b5" },
  openGraph: {
    title: "B5: Knowledge Update — Iranti",
    description:
      "Direct writes work. LLM arbitration regressed in v0.3.2 — conservative scoring silently rejects same-source updates. Documented and tracked.",
    url: "https://iranti.dev/benchmarks/b5",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
