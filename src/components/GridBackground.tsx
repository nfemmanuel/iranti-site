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
        {/*
          Amber worm — total path length ~4224px, snapped to 48px grid.
          stroke-dasharray: 320 3904 creates a 320px visible segment.
          Animating dashoffset 0 → -4224 (= one full pattern repeat) gives
          seamless infinite motion — no stop, no reset flash.
        */}
        <path
          d="M 96 192 H 480 V 144 H 816 V 240 H 1104 V 192 H 1392 V 336 H 1200 V 288 H 912 V 384 H 624 V 432 H 336 V 528 H 576 V 480 H 864 V 576 H 1152 V 528 H 1392"
          stroke="#f59e0b"
          strokeWidth="1"
          strokeOpacity="0.22"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trace-amber"
        />
        {/*
          Teal worm — total path length ~3408px, different screen region.
          stroke-dasharray: 260 3148 creates a 260px visible segment.
        */}
        <path
          d="M 192 432 V 384 H 528 V 480 H 816 V 432 H 1104 V 528 H 912 V 624 H 624 V 576 H 336 V 672 H 624 V 720 H 912 V 768 H 1200 V 720 H 1392"
          stroke="#14b8a6"
          strokeWidth="1"
          strokeOpacity="0.18"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="trace-teal"
        />
      </svg>
    </div>
  );
}
