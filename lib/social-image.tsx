import { ImageResponse } from "next/og";

export const socialImageSize = { width: 1200, height: 630 };

export function createSocialImage() {
  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "66px 74px",
        backgroundColor: "#0b1421",
        color: "#e7eef6"
      }}
    >
      <div style={{ position: "absolute", top: -110, right: -30, width: 550, height: 550, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #293a4e", borderRadius: 275 }}>
        <div style={{ width: 390, height: 390, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #364b61", borderRadius: 195 }}>
          <div style={{ width: 225, height: 225, display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid #245fc7", borderRadius: 113 }}>
            <div style={{ width: 86, height: 86, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 22, backgroundColor: "#1c2b3c", color: "#83b9ff", fontSize: 30, fontWeight: 700 }}>SYS</div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 34 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 8, height: 54, borderRadius: 4, backgroundColor: "#83b9ff" }} />
          <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>
            <span>SYSADMIN</span><span style={{ color: "#83b9ff" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 760, fontSize: 38, fontWeight: 600, lineHeight: 1.2 }}>
          <span>Build the skills to</span>
          <span style={{ color: "#bac7d5" }}>run reliable systems.</span>
        </div>
      </div>

      <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 14, paddingTop: 22, borderTop: "1px solid #364b61", color: "#91a5ba", fontSize: 17, letterSpacing: 1.2 }}>
        <span>ROADMAPS</span><span style={{ color: "#83b9ff" }}>·</span><span>TECHNOLOGIES</span><span style={{ color: "#83b9ff" }}>·</span><span>CAREERS</span>
      </div>
    </div>,
    socialImageSize
  );
}
