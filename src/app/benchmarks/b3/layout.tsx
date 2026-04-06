import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B3: Internal Conflict Resolution — Iranti Internal Benchmark",
  description:
    "3/3 conflict resolution cases pass: deterministic resolution, close-gap escalation, and equal-confidence contradiction. High-confidence challengers win cleanly; ambiguous conflicts escalate to human review.",
  alternates: { canonical: "/benchmarks/b3" },
  openGraph: {
    title: "B3: Conflict Resolution — Iranti",
    description:
      "3/3 cases: deterministic resolution, close-gap escalation, contradiction handling. High-confidence wins cleanly; ambiguity escalates.",
    url: "https://iranti.dev/benchmarks/b3",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
