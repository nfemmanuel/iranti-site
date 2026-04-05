import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iranti.dev"),
  alternates: { canonical: "/" },
  title: "Iranti — Memory Infrastructure for Multi-Agent AI",
  description:
    "Iranti is persistent memory infrastructure for multi-agent AI systems. Identity-based shared memory with conflict resolution. Framework-agnostic. Self-hostable. AGPL-3.0.",
  keywords: [
    "multi-agent AI memory",
    "LLM memory infrastructure",
    "persistent agent memory",
    "AI memory infrastructure",
    "multi-agent systems",
    "agent memory",
    "shared agent memory",
    "MCP memory server",
    "knowledge base for agents",
  ],
  openGraph: {
    title: "Iranti — Memory Infrastructure for Multi-Agent AI",
    description:
      "Persistent, identity-based shared memory for multi-agent AI systems. Conflict-aware. Framework-agnostic. Not an agent framework — infrastructure.",
    type: "website",
    url: "https://iranti.dev",
    siteName: "Iranti",
    images: [{ url: "https://iranti.dev/og", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Iranti — Memory Infrastructure for Multi-Agent AI",
    description:
      "Persistent, identity-based shared memory for multi-agent AI systems. Conflict-aware. Framework-agnostic. Not an agent framework — infrastructure.",
    images: ["https://iranti.dev/og"],
  },
};

// Inline script to set theme before first paint, preventing flash
const themeScript = `
(function() {
  try {
    var stored = localStorage.getItem('iranti-theme');
    var theme = stored === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme initialization — must run before any rendering to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        {/* Structured data — SoftwareApplication + Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "SoftwareApplication",
                  name: "Iranti",
                  applicationCategory: "DeveloperApplication",
                  description: "Memory infrastructure for multi-agent AI systems. Persistent, identity-based shared memory with conflict resolution.",
                  url: "https://iranti.dev",
                  license: "https://www.gnu.org/licenses/agpl-3.0.en.html",
                  operatingSystem: "Any",
                  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
                },
                {
                  "@type": "Organization",
                  name: "Iranti",
                  url: "https://iranti.dev",
                  description: "Memory infrastructure for multi-agent AI systems.",
                  sameAs: [
                    "https://www.npmjs.com/package/iranti",
                    "https://pypi.org/project/iranti/",
                  ],
                },
                {
                  "@type": "WebSite",
                  url: "https://iranti.dev",
                  name: "Iranti",
                },
              ],
            }),
          }}
        />
        {/* Plausible analytics — cookie-free, GDPR-compliant, <1KB */}
        <script
          defer
          data-domain="iranti.dev"
          src="https://plausible.io/js/script.js"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
