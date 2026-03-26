import { ImageResponse } from "next/og";

export const alt = "Bless You - AI Fortune Stick Interpreter | 籤詩 AI 解籤";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(212,168,75,0.12) 0%, transparent 70%), linear-gradient(to bottom, #2c1810 0%, #1a0f0a 40%, #1a0f0a 100%)",
          fontFamily: "serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Vignette overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at center, transparent 30%, rgba(26,15,10,0.7) 100%)",
          }}
        />

        {/* Decorative lantern left */}
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: 0.2,
          }}
        >
          <div
            style={{
              width: 2,
              height: 20,
              background: "#d4a84b",
            }}
          />
          <div
            style={{
              width: 28,
              height: 44,
              borderRadius: "50%",
              background: "#8b2c2c",
              border: "1px solid #a33b3b",
            }}
          />
        </div>

        {/* Decorative lantern right */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 100,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: 0.15,
          }}
        >
          <div
            style={{
              width: 2,
              height: 16,
              background: "#d4a84b",
            }}
          />
          <div
            style={{
              width: 24,
              height: 38,
              borderRadius: "50%",
              background: "#8b2c2c",
              border: "1px solid #a33b3b",
            }}
          />
        </div>

        {/* Fortune stick container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            marginBottom: 20,
          }}
        >
          {/* Golden glow behind container */}
          <div
            style={{
              position: "absolute",
              width: 200,
              height: 200,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(212,168,75,0.2) 0%, rgba(212,168,75,0.05) 50%, transparent 70%)",
              top: 20,
              filter: "blur(20px)",
            }}
          />

          {/* Sticks */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: -15,
              position: "relative",
            }}
          >
            <div
              style={{
                width: 4,
                height: 70,
                background:
                  "linear-gradient(to bottom, #c9a86c, #a08050)",
                borderRadius: 2,
                transform: "rotate(-5deg)",
              }}
            />
            <div
              style={{
                width: 4,
                height: 65,
                background:
                  "linear-gradient(to bottom, #c9a86c, #a08050)",
                borderRadius: 2,
                transform: "rotate(-2deg)",
              }}
            />
            {/* Golden stick */}
            <div
              style={{
                width: 5,
                height: 80,
                background:
                  "linear-gradient(to bottom, #f0d080, #d4a84b, #b8922f)",
                borderRadius: 3,
                boxShadow: "0 0 12px rgba(212,168,75,0.4)",
                marginTop: -15,
              }}
            />
            <div
              style={{
                width: 4,
                height: 68,
                background:
                  "linear-gradient(to bottom, #c9a86c, #a08050)",
                borderRadius: 2,
                transform: "rotate(3deg)",
              }}
            />
            <div
              style={{
                width: 4,
                height: 62,
                background:
                  "linear-gradient(to bottom, #c9a86c, #a08050)",
                borderRadius: 2,
                transform: "rotate(6deg)",
              }}
            />
          </div>

          {/* Container body */}
          <div
            style={{
              width: 100,
              height: 110,
              background:
                "linear-gradient(135deg, #5a3825, #4a2c1a, #3a1f12)",
              borderRadius: "8px 8px 12px 12px",
              border: "1px solid #6b4530",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* Gold bands */}
            <div
              style={{
                width: 70,
                height: 2,
                background: "#d4a84b",
                opacity: 0.4,
                borderRadius: 1,
                marginBottom: 16,
              }}
            />
            {/* Character */}
            <div
              style={{
                color: "#d4a84b",
                fontSize: 28,
                opacity: 0.5,
              }}
            >
              籤
            </div>
            <div
              style={{
                width: 70,
                height: 2,
                background: "#d4a84b",
                opacity: 0.3,
                borderRadius: 1,
                marginTop: 16,
              }}
            />
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#d4a84b",
            textShadow:
              "0 0 40px rgba(212,168,75,0.3), 0 0 80px rgba(212,168,75,0.15)",
            letterSpacing: "0.05em",
            lineHeight: 1.2,
            marginBottom: 4,
          }}
        >
          籤詩 AI 解籤
        </div>

        {/* Flourish */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 80,
              height: 1,
              background: "#d4a84b",
              opacity: 0.4,
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              background: "#d4a84b",
              opacity: 0.6,
              transform: "rotate(45deg)",
            }}
          />
          <div
            style={{
              width: 80,
              height: 1,
              background: "#d4a84b",
              opacity: 0.4,
            }}
          />
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(245,239,230,0.6)",
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            marginBottom: 16,
          }}
        >
          Bless You — AI Fortune Stick Interpreter
        </div>

        {/* Tech badges */}
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          {["RAG", "Knowledge Graph", "LLM"].map((label) => (
            <div
              key={label}
              style={{
                padding: "6px 16px",
                borderRadius: 8,
                border: "1px solid rgba(74,44,26,0.6)",
                background: "rgba(44,24,16,0.5)",
                color: "rgba(245,239,230,0.5)",
                fontSize: 14,
                letterSpacing: "0.05em",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
