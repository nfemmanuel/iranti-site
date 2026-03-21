import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iranti — Memory Infrastructure for Multi-Agent AI",
  description:
    "Iranti gives agents persistent, identity-based shared memory. Facts written by one agent are retrievable by any other through exact entity+key lookup. Conflict-aware, session-persistent, framework-agnostic.",
  keywords: [
    "AI memory",
    "multi-agent systems",
    "memory infrastructure",
    "agent memory",
    "LLM memory",
    "knowledge base",
  ],
  openGraph: {
    title: "Iranti — Memory Infrastructure for Multi-Agent AI",
    description:
      "Shared, persistent, conflict-aware memory for multi-agent AI systems. Not a framework. Infrastructure.",
    type: "website",
    url: "https://iranti.dev",
    siteName: "Iranti",
  },
  twitter: {
    card: "summary",
    title: "Iranti — Memory Infrastructure for Multi-Agent AI",
    description:
      "Shared, persistent, conflict-aware memory for multi-agent AI systems. Not a framework. Infrastructure.",
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
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
