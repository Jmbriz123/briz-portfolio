import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tiers = [
  { label: "gold / engineering", color: "#d9b65e" },
  { label: "silver / experience", color: "#bcc2cb" },
  { label: "bronze / foundations", color: "#c98b5b" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "72px 80px",
          background: "#0b0c0e",
          color: "#ecebe7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 680 }}>
          <div style={{ fontSize: 26, color: "#6e737c" }}>{profile.name}</div>
          <div style={{ marginTop: 24, fontSize: 64, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
            {profile.headline}
          </div>
          <div style={{ marginTop: 32, fontSize: 24, color: "#a3a6ad" }}>{profile.focus.slice(0, 3).join(" · ")}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {tiers.map((t) => (
            <div
              key={t.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "16px 22px",
                border: "1px solid #30353d",
                borderRadius: 14,
                background: "#111316",
                fontSize: 22,
                color: t.color,
              }}
            >
              <div style={{ width: 12, height: 12, borderRadius: 6, background: t.color }} />
              {t.label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
