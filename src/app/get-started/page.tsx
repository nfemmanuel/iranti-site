import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import GetStartedContent from "@/components/GetStartedContent";

export const metadata: Metadata = {
  title: "Get Started — Iranti",
  description:
    "Install Iranti in four commands. Quick install, Claude Code MCP integration, Codex integration, and iranti chat. PostgreSQL-backed, self-hostable. iranti doctor --debug for troubleshooting.",
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
