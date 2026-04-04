import { ImageResponse } from "next/og";
import { CURRENT_VERSION } from "@/lib/siteData";

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
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
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
              <line x1="7" y1="7" x2="2" y2="4" stroke="#080808" strokeWidth="0.7" strokeOpacity="0.4" />
              <line x1="7" y1="7" x2="12" y2="4" stroke="#080808" strokeWidth="0.7" strokeOpacity="0.4" />
              <line x1="7" y1="7" x2="2" y2="10" stroke="#080808" strokeWidth="0.7" strokeOpacity="0.3" />
              <line x1="7" y1="7" x2="12" y2="10" stroke="#080808" strokeWidth="0.7" strokeOpacity="0.3" />
              <circle cx="2" cy="4" r="1.4" fill="#080808" opacity="0.65" />
              <circle cx="12" cy="4" r="1.4" fill="#080808" opacity="0.65" />
              <circle cx="2" cy="10" r="1.4" fill="#080808" opacity="0.45" />
              <circle cx="12" cy="10" r="1.4" fill="#080808" opacity="0.45" />
              <circle cx="7" cy="7" r="2.4" fill="#080808" />
            </svg>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 40, letterSpacing: "-0.02em", color: "#ffffff", lineHeight: 1 }}>
              iranti
            </span>
            <span style={{ fontFamily: "monospace", fontWeight: 400, fontSize: 14, color: "#a8874a", lineHeight: 1, letterSpacing: "0.01em" }}>
              v{CURRENT_VERSION}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28, zIndex: 1, width: "100%" }}>
          <span style={{ fontFamily: "Inter, sans-serif", fontWeight: 600, fontSize: 52, letterSpacing: "-0.03em", color: "#ffffff", lineHeight: 1.1, maxWidth: 920 }}>
            Shared memory for agents that need to agree.
          </span>

          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            {[
              "exact retrieval",
              "shared facts",
              "upgrade continuity",
              "operator visibility",
            ].map((label, index) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "6px 14px",
                  borderRadius: 999,
                  backgroundColor: index < 2 ? "rgba(20,184,166,0.12)" : "rgba(245,158,11,0.10)",
                  border: index < 2 ? "1px solid rgba(20,184,166,0.35)" : "1px solid rgba(245,158,11,0.30)",
                }}
              >
                <span style={{ fontFamily: "monospace", fontSize: 14, color: index < 2 ? "#14b8a6" : "#f59e0b", letterSpacing: "0.01em" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 52,
            right: 64,
            display: "flex",
            zIndex: 1,
          }}
        >
          <span style={{ fontFamily: "monospace", fontWeight: 400, fontSize: 15, color: "#a8874a", letterSpacing: "0.02em" }}>
            iranti.dev
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}

