import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ResearchAIHub — Best AI Tools for Research & Productivity";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #060d18 0%, #0f1a2e 50%, #132337 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #2563eb, #60a5fa)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
            }}
          >
            ✦
          </div>
          <span style={{ fontSize: 48, fontWeight: 700, color: "#f1f5f9" }}>
            Research<span style={{ color: "#3b82f6" }}>AI</span>Hub
          </span>
        </div>
        <p
          style={{
            fontSize: 32,
            color: "#94a3b8",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
            padding: "0 48px",
          }}
        >
          Discover the Best AI Tools for Research & Productivity
        </p>
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 48,
            fontSize: 18,
            color: "#64748b",
          }}
        >
          <span>30+ Tools</span>
          <span>•</span>
          <span>Researchers</span>
          <span>•</span>
          <span>Students</span>
          <span>•</span>
          <span>Developers</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
