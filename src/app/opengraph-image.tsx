import { ImageResponse } from "next/og";

export const alt = "Klickhafen Website-Hilfe";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f8fafc",
          color: "#020617",
          padding: 70,
          fontFamily: "Arial",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
            <div style={{ width: 72, height: 72, borderRadius: 10, background: "#0e7490", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, fontWeight: 700 }}>K</div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>Klickhafen</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 62, fontWeight: 800, lineHeight: 1.08, maxWidth: 930 }}>Website- & Shop-Hilfe für WordPress, Shopify, Wix & Baukästen</div>
            <div style={{ marginTop: 28, fontSize: 30, color: "#0e7490", fontWeight: 700 }}>29 Euro pro Stunde</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
