import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          backgroundColor: "#0a0a08",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "56px 64px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Amber radial glow — top center */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 640,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(245,158,11,0.18) 0%, rgba(245,158,11,0.06) 45%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Top row: mark + wordmark + version */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
          {/* Amber square mark */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 8,
              backgroundColor: "#f59e0b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <svg width="36" height="36" viewBox="0 0 14 14" fill="none">
              {/* Spokes */}
              <line x1="7" y1="7" x2="2"  y2="4"  stroke="#080808" strokeWidth="0.7" strokeOpacity="0.4" />
              <line x1="7" y1="7" x2="12" y2="4"  stroke="#080808" strokeWidth="0.7" strokeOpacity="0.4" />
              <line x1="7" y1="7" x2="2"  y2="10" stroke="#080808" strokeWidth="0.7" strokeOpacity="0.3" />
              <line x1="7" y1="7" x2="12" y2="10" stroke="#080808" strokeWidth="0.7" strokeOpacity="0.3" />
              {/* Corner nodes */}
              <circle cx="2"  cy="4"  r="1.4" fill="#080808" opacity="0.65" />
              <circle cx="12" cy="4"  r="1.4" fill="#080808" opacity="0.65" />
              <circle cx="2"  cy="10" r="1.4" fill="#080808" opacity="0.45" />
              <circle cx="12" cy="10" r="1.4" fill="#080808" opacity="0.45" />
              {/* Center hub */}
              <circle cx="7" cy="7" r="2.4" fill="#080808" />
            </svg>
          </div>

          {/* Wordmark + version stacked */}
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: 40,
                letterSpacing: "-0.02em",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              iranti
            </span>
            <span
              style={{
                fontFamily: "monospace",
                fontWeight: 400,
                fontSize: 14,
                color: "#a8874a",
                lineHeight: 1,
                letterSpacing: "0.01em",
              }}
            >
              v0.2.12
            </span>
          </div>
        </div>

        {/* Center block: tagline + proof chips */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 32,
            zIndex: 1,
            width: "100%",
          }}
        >
          {/* Tagline */}
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              fontSize: 52,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              lineHeight: 1.1,
              maxWidth: 900,
            }}
          >
            Memory infrastructure for multi-agent AI.
          </span>

          {/* Proof chips */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {/* Chip: 20/20 cross-session */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(20,184,166,0.12)",
                border: "1px solid rgba(20,184,166,0.35)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#14b8a6",
                  letterSpacing: "0.01em",
                }}
              >
                20/20 cross-session
              </span>
            </div>

            {/* Separator dot */}
            <span style={{ color: "#3a3a36", fontSize: 18, lineHeight: 1 }}>·</span>

            {/* Chip: 16/16 conflict suite */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(20,184,166,0.12)",
                border: "1px solid rgba(20,184,166,0.35)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#14b8a6",
                  letterSpacing: "0.01em",
                }}
              >
                16/16 conflict suite
              </span>
            </div>

            {/* Separator dot */}
            <span style={{ color: "#3a3a36", fontSize: 18, lineHeight: 1 }}>·</span>

            {/* Chip: 4/5 external */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "6px 14px",
                borderRadius: 999,
                backgroundColor: "rgba(245,158,11,0.10)",
                border: "1px solid rgba(245,158,11,0.30)",
              }}
            >
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 400,
                  fontSize: 14,
                  color: "#f59e0b",
                  letterSpacing: "0.01em",
                }}
              >
                4/5 external
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-right: iranti.dev */}
        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 64,
            display: "flex",
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontWeight: 400,
              fontSize: 15,
              color: "#a8874a",
              letterSpacing: "0.02em",
            }}
          >
            iranti.dev
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
