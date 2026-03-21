import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GetStartedContent from "@/components/GetStartedContent";

export const metadata: Metadata = {
  title: "Install Iranti — Self-Hosted Agent Memory in 4 Commands",
  description:
    "Install Iranti in four commands. Self-hosted, PostgreSQL-backed persistent memory for AI agents. MCP integration for Claude Code and Codex. AGPL-3.0 open source.",
  openGraph: {
    title: "Install Iranti — Self-Hosted Agent Memory in 4 Commands",
    description:
      "Install Iranti in four commands. Self-hosted, PostgreSQL-backed persistent memory for AI agents. MCP integration for Claude Code and Codex.",
    type: "website",
    url: "https://iranti.dev/get-started",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary_large_image",
    title: "Install Iranti — Self-Hosted Agent Memory in 4 Commands",
    description:
      "Install Iranti in four commands. Self-hosted, PostgreSQL-backed persistent memory for AI agents. MCP integration for Claude Code and Codex.",
  },
};

export default function GetStartedPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Nav />
      <GetStartedContent />
      <Footer />
    </div>
  );
}
