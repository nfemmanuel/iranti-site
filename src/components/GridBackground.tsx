"use client";

import { usePathname } from "next/navigation";

export default function GridBackground() {
  const pathname = usePathname();

  // Home page has its own Hero grid — skip
  if (pathname === "/") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        backgroundImage: `
          linear-gradient(color-mix(in srgb, var(--text-primary) 3%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 3%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    />
  );
}
