import { ImageResponse } from "next/og";
import { apps, liveApps } from "../lib/apps";

/**
 * The 1200x630 social share card, generated at build time from the app list in
 * lib/apps.ts — so the numbers on it can never drift out of sync with the site.
 *
 * This is a plain route handler rather than Next's `opengraph-image` file
 * convention on purpose: the convention emits an extension-less file, which
 * GitHub Pages serves as application/octet-stream and social crawlers reject.
 * A route literally named `og-image.png` exports to `out/og-image.png`.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          padding: "68px 76px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: 34,
              fontWeight: 700,
              color: "#60a5fa",
              letterSpacing: -1,
            }}
          >
            <span style={{ color: "#4b5563", fontWeight: 400 }}>{"{"}</span>
            <span style={{ padding: "0 6px" }}>AK</span>
            <span style={{ color: "#4b5563", fontWeight: 400 }}>{"}"}</span>
          </div>
          <div
            style={{
              fontSize: 22,
              color: "#9ca3af",
              letterSpacing: 6,
              textTransform: "uppercase",
            }}
          >
            Ananya Kaul
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 700,
              color: "#f9fafb",
              letterSpacing: -3,
              lineHeight: 1.05,
            }}
          >
            iOS &amp; Flutter Developer
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 34,
              color: "#60a5fa",
              lineHeight: 1.3,
            }}
          >
            Building AI-powered mobile apps · Swift · SwiftUI · Flutter
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {[
            `${apps.length} production apps`,
            `${liveApps.length} live on the App Store & Google Play`,
            "6,000+ users reached",
          ].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                fontSize: 23,
                color: "#d1d5db",
                border: "1px solid #1f2937",
                backgroundColor: "#161b22",
                borderRadius: 999,
                padding: "12px 24px",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
