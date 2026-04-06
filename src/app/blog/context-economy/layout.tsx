import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Why Iranti Uses 37% Fewer Tokens in Long Coding Sessions — Iranti Blog",
  description:
    "We measured cumulative input token usage over a 15-turn coding session with and without Iranti. By turn 15, the Iranti arm uses 37% fewer tokens. Here's exactly how we measured it and why the gap grows over time.",
  alternates: { canonical: "/blog/context-economy" },
  openGraph: {
    title: "Why Iranti Uses 37% Fewer Tokens in Long Coding Sessions",
    description:
      "Exact token counts via Anthropic countTokens API. Turns 1–7: identical. Turn 8 onward: Iranti injects compact blocks instead of re-reading files. By turn 15: 5,677 vs 8,949 tokens.",
    url: "https://iranti.dev/blog/context-economy",
    type: "article",
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
