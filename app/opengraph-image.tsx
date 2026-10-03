import { ImageResponse } from "next/og";

export const alt = "Mohit Aggarwal — AI & Automation Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px 88px",
          background: "#060810",
          color: "#f5f5f0",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: "#c8ff00", fontSize: 22, fontWeight: 700, letterSpacing: 3 }}>
          <span style={{ width: 12, height: 12, borderRadius: 99, background: "#c8ff00" }} />
          MOHIT AGGARWAL
        </div>
        <div style={{ display: "flex", marginTop: 42, fontSize: 66, fontWeight: 700, letterSpacing: -3 }}>
          AI &amp; Automation Developer
        </div>
        <div style={{ display: "flex", maxWidth: 900, marginTop: 24, color: "#a3adbd", fontSize: 28, lineHeight: 1.45 }}>
          I build practical tools that automate repetitive work and make complex information easier to use.
        </div>
        <div style={{ display: "flex", marginTop: 52, color: "#c8ff00", fontSize: 18, fontWeight: 600, letterSpacing: 2 }}>
          JAMMU, INDIA
        </div>
      </div>
    ),
    { ...size },
  );
}
