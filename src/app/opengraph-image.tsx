import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          background:
            "linear-gradient(135deg, #09090b 0%, #171717 45%, #3b0764 100%)",
          color: "#fafafa",
          fontFamily: "Arial, sans-serif",
          padding: "56px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            border: "1px solid rgba(167, 139, 250, 0.25)",
            borderRadius: "32px",
            padding: "44px",
            background: "rgba(10, 10, 10, 0.55)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#c4b5fd",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Portfolio
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 74,
                fontWeight: 700,
                lineHeight: 1.05,
                maxWidth: "900px",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 36,
                color: "#e4e4e7",
                maxWidth: "920px",
                lineHeight: 1.3,
              }}
            >
              Desenvolvedora full stack com foco em websites, sistemas web e apps mobile.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              {["React", "Next.js", "Node.js", "React Native"].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    borderRadius: "999px",
                    border: "1px solid rgba(167, 139, 250, 0.35)",
                    color: "#ddd6fe",
                    padding: "12px 20px",
                    fontSize: 24,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                fontSize: 24,
                color: "#a1a1aa",
              }}
            >
              {siteConfig.location}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

