import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "B6: Ingest Pipeline — Iranti Internal Benchmark",
  description:
    "Write-then-query solid: 6/6 writes, provenance intact, zero contamination. Bulk ingest endpoint regressed in v0.3.2. Direct write path (iranti_write per fact) is the recommended surface.",
  alternates: { canonical: "/benchmarks/b6" },
  openGraph: {
    title: "B6: Ingest Pipeline — Iranti",
    description:
      "6/6 direct writes, provenance intact. Bulk ingest regressed in v0.3.2. iranti_write per fact is the reliable path.",
    url: "https://iranti.dev/benchmarks/b6",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
