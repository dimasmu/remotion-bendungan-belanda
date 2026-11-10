import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";
import { SAFE } from "../../data/enigma";

// Chips: configuration facts from the approved research brief (F1).
const chips = ["3 DARI 5 ROTOR", "10 PASANG PLUG", "PENGATURAN HARIAN"];

const S2Number: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ramp = (start: number, end: number) =>
    interpolate(frame, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // Big number rises from below over 45-110.
  const numT = spring({ frame: frame - 45, fps, config: { damping: 24, stiffness: 110 } });
  const numY = interpolate(numT, [0, 1], [70, 0]);
  const numOpacity = ramp(45, 80);

  // Exact digits fade in at 120.
  const digitsOpacity = ramp(120, 150);

  // Underline sweeps 165-195.
  const underline = ramp(165, 195);

  // Subtle deterministic jitter during the count-up, from the frame only.
  const jitter = frame >= 45 && frame < 110 ? Math.sin(frame * 1.7) * 1 : 0;

  return (
    <SceneShell sceneId="S2">
      {/* Chips zone: top of the diagram band */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 22,
        }}
      >
        {chips.map((label, i) => {
          const o = ramp(i * 14, i * 14 + 30);
          return (
            <div
              key={label}
              style={{
                opacity: o,
                transform: `translateY(${interpolate(o, [0, 1], [12, 0])}px)`,
                border: `2px solid ${palette.iceDim}`,
                background: palette.panel,
                borderRadius: 8,
                padding: "14px 28px",
                fontFamily: fontFamily.mono,
                fontWeight: 500,
                fontSize: 28,
                letterSpacing: "0.1em",
                color: palette.textPrimary,
              }}
            >
              {label}
            </div>
          );
        })}
      </div>

      {/* Number zone */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 680,
          textAlign: "center",
        }}
      >
        <div
          style={{
            opacity: numOpacity,
            transform: `translateY(${numY + jitter}px)`,
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: 112,
            lineHeight: 1,
            letterSpacing: "-0.01em",
            color: palette.textPrimary,
            textShadow: `0 0 16px rgba(127,231,255,0.3)`,
          }}
        >
          ≈159
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: fontFamily.display,
            fontWeight: 600,
            fontSize: 64,
            letterSpacing: "0.14em",
            color: palette.textPrimary,
            opacity: numOpacity,
          }}
        >
          KUINTILIUN
        </div>
        <div
          style={{
            margin: "18px auto 0",
            height: 3,
            width: 520 * underline,
            background: palette.lampAmber,
            boxShadow: `0 0 10px ${palette.lampAmber}`,
          }}
        />
      </div>

      {/* Exact digits and source note, muted, in the caption zone */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: SAFE.captionTop,
          textAlign: "center",
          opacity: digitsOpacity,
          fontFamily: fontFamily.mono,
          fontWeight: 500,
          fontSize: 28,
          letterSpacing: "0.02em",
          color: palette.textMuted,
          lineHeight: 1.5,
        }}
      >
        <div>158.962.555.217.826.360.000</div>
        <div style={{ marginTop: 18, fontSize: 22, letterSpacing: "0.1em" }}>
          ENIGMA 3 ROTOR · 10 KABEL PLUG
        </div>
      </div>
    </SceneShell>
  );
};

export { S2Number };
