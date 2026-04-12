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
          linear-gradient(color-mix(in srgb, var(--text-primary) 4%, transparent) 1px, transparent 1px),
          linear-gradient(90deg, color-mix(in srgb, var(--text-primary) 4%, transparent) 1px, transparent 1px)
        `,
        backgroundSize: "48px 48px",
      }}
    >
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Amber trace — length 1440, snapped to 48px grid */}
        <path
          d="M 96 192 L 480 192 L 480 144 L 768 144 L 768 240 L 1056 240 L 1056 192 L 1344 192"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeOpacity="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trace-amber"
        />
        {/* Teal trace — length 1200, snapped to 48px grid */}
        <path
          d="M 240 384 L 240 336 L 624 336 L 624 432 L 912 432 L 912 384 L 1200 384 L 1200 336"
          stroke="#14b8a6"
          strokeWidth="1.5"
          strokeOpacity="0.45"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trace-teal"
        />
      </svg>
    </div>
  );
}
