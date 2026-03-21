import React from "react";

// ─── IrantiMark ─────────────────────────────────────────────────────────────
// Five-node memory graph: amber center hub, four corner nodes with spokes.
// Used both inside the full Logo and exported standalone for Nav.

interface IrantiMarkProps {
  /** Outer size in px. The SVG fills this square. */
  size?: number;
  /** If true, render on a transparent background (no amber square). */
  bare?: boolean;
}

export function IrantiMark({ size = 24, bare = false }: IrantiMarkProps) {
  if (bare) {
    // Bare mark — used when the caller controls the container.
    // ViewBox 14×14, same geometry as the original Nav SVG, refined with spokes.
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        {/* Spokes: center (7,7) → each corner node */}
        <line x1="7" y1="7" x2="2" y2="4" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.5" />
        <line x1="7" y1="7" x2="12" y2="4" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.5" />
        <line x1="7" y1="7" x2="2" y2="10" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.35" />
        <line x1="7" y1="7" x2="12" y2="10" stroke="#f59e0b" strokeWidth="0.6" strokeOpacity="0.35" />
        {/* Corner nodes — lower opacity, smaller */}
        <circle cx="2"  cy="4"  r="1.4" fill="#f59e0b" opacity="0.55" />
        <circle cx="12" cy="4"  r="1.4" fill="#f59e0b" opacity="0.55" />
        <circle cx="2"  cy="10" r="1.4" fill="#f59e0b" opacity="0.38" />
        <circle cx="12" cy="10" r="1.4" fill="#f59e0b" opacity="0.38" />
        {/* Center hub — full amber */}
        <circle cx="7" cy="7" r="2.4" fill="#f59e0b" />
      </svg>
    );
  }

  // Default: amber square container, dark nodes (as in original Nav).
  return (
    <span
      style={{ width: size, height: size }}
      className="rounded-sm bg-amber-500 flex items-center justify-center flex-shrink-0"
      aria-hidden="true"
    >
      <svg
        width={Math.round(size * 0.57)}
        height={Math.round(size * 0.57)}
        viewBox="0 0 14 14"
        fill="none"
        aria-hidden="true"
      >
        {/* Spokes */}
        <line x1="7" y1="7" x2="2"  y2="4"  stroke="#080808" strokeWidth="0.6" strokeOpacity="0.4" />
        <line x1="7" y1="7" x2="12" y2="4"  stroke="#080808" strokeWidth="0.6" strokeOpacity="0.4" />
        <line x1="7" y1="7" x2="2"  y2="10" stroke="#080808" strokeWidth="0.6" strokeOpacity="0.3" />
        <line x1="7" y1="7" x2="12" y2="10" stroke="#080808" strokeWidth="0.6" strokeOpacity="0.3" />
        {/* Corner nodes */}
        <circle cx="2"  cy="4"  r="1.4" fill="#080808" opacity="0.65" />
        <circle cx="12" cy="4"  r="1.4" fill="#080808" opacity="0.65" />
        <circle cx="2"  cy="10" r="1.4" fill="#080808" opacity="0.45" />
        <circle cx="12" cy="10" r="1.4" fill="#080808" opacity="0.45" />
        {/* Center hub */}
        <circle cx="7" cy="7" r="2.4" fill="#080808" />
      </svg>
    </span>
  );
}

// ─── Logo ────────────────────────────────────────────────────────────────────

export type LogoVariant = "mark" | "full" | "og";

interface LogoProps {
  size?: number;
  variant?: LogoVariant;
  /** Override text color (CSS value). Defaults to var(--text-primary) for site, white for og. */
  color?: string;
}

export default function Logo({ size = 24, variant = "full", color }: LogoProps) {
  if (variant === "mark") {
    return <IrantiMark size={size} />;
  }

  if (variant === "og") {
    // Rendered inside ImageResponse — no CSS vars, all inline, larger scale.
    // size here is the mark square size (default 80 recommended by caller).
    const markSize = size;
    const innerSize = Math.round(markSize * 0.57);
    const wordmarkSize = Math.round(markSize * 0.75);
    const versionSize = Math.round(markSize * 0.22);

    return (
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Mark: amber square + dark nodes */}
        <div
          style={{
            width: markSize,
            height: markSize,
            borderRadius: 6,
            backgroundColor: "#f59e0b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width={innerSize}
            height={innerSize}
            viewBox="0 0 14 14"
            fill="none"
          >
            <line x1="7" y1="7" x2="2"  y2="4"  stroke="#080808" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="7" y1="7" x2="12" y2="4"  stroke="#080808" strokeWidth="0.6" strokeOpacity="0.4" />
            <line x1="7" y1="7" x2="2"  y2="10" stroke="#080808" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="7" y1="7" x2="12" y2="10" stroke="#080808" strokeWidth="0.6" strokeOpacity="0.3" />
            <circle cx="2"  cy="4"  r="1.4" fill="#080808" opacity="0.65" />
            <circle cx="12" cy="4"  r="1.4" fill="#080808" opacity="0.65" />
            <circle cx="2"  cy="10" r="1.4" fill="#080808" opacity="0.45" />
            <circle cx="12" cy="10" r="1.4" fill="#080808" opacity="0.45" />
            <circle cx="7" cy="7" r="2.4" fill="#080808" />
          </svg>
        </div>

        {/* Wordmark + version */}
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: wordmarkSize,
              letterSpacing: "-0.02em",
              color: color ?? "#ffffff",
              lineHeight: 1,
            }}
          >
            iranti
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 400,
              fontSize: versionSize,
              color: "#a8874a",
              lineHeight: 1,
            }}
          >
            v0.2.12
          </span>
        </div>
      </div>
    );
  }

  // variant === "full" — site usage, CSS vars apply
  return (
    <div className="flex items-center gap-2.5">
      <IrantiMark size={size} />
      <div className="flex flex-col gap-0">
        <span
          className="font-semibold leading-none"
          style={{
            fontSize: Math.round(size * 0.625),
            letterSpacing: "-0.01em",
            color: color ?? "var(--text-primary)",
          }}
        >
          iranti
        </span>
      </div>
    </div>
  );
}
