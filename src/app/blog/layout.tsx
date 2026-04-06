import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog — Iranti",
  description:
    "Research notes, benchmark methodology, and engineering insights on persistent memory for multi-agent AI systems.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Iranti",
    description:
      "Research notes, benchmark methodology, and engineering insights on persistent memory for multi-agent AI systems.",
    url: "https://iranti.dev/blog",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
