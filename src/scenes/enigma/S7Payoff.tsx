import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";
import { SAFE } from "../../data/enigma";

const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const S7Payoff: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Network contracts to a single line 0-48.
  const contract = ramp(f, 0, 48);
  const lineWidth = interpolate(contract, [0, 1], [0, 420]);
  const lineOpacity = ramp(f, 0, 20);

  // First line lands 30-60.
  const line1T = spring({ frame: f - 30, fps, config: { damping: 20, stiffness: 120 } });
  const line1Opacity = ramp(f, 30, 55);
  const line1Y = interpolate(line1T, [0, 1], [20, 0]);

  // Second line 60-90.
  const line2T = spring({ frame: f - 60, fps, config: { damping: 20, stiffness: 120 } });
  const line2Opacity = ramp(f, 60, 85);
  const line2Y = interpolate(line2T, [0, 1], [16, 0]);

  // Slow ripple hold.
  const ripple = Math.sin((f - 90) * 0.06) * 3;

  // Fade to black at the very end.
  const fadeOut = ramp(f, 168, 180);

  const sourceOpacity = ramp(f, 100, 130);

  return (
    <SceneShell sceneId="S7">
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 700,
          textAlign: "center",
        }}
      >
        <div
          style={{
            margin: "0 auto",
            height: 3,
            width: lineWidth,
            background: palette.iceLine,
            opacity: lineOpacity,
            boxShadow: `0 0 10px ${palette.iceLine}`,
          }}
        />
        <div
          style={{
            marginTop: 56,
            opacity: line1Opacity,
            transform: `translateY(${line1Y + ripple}px)`,
            fontFamily: fontFamily.display,
            fontWeight: 700,
            fontSize: 76,
            lineHeight: 1.15,
            letterSpacing: "0.03em",
            color: palette.textPrimary,
            textShadow: `0 0 16px rgba(127,231,255,0.3)`,
          }}
        >
          ENIGMA TIDAK
          <br />
          PERNAH MUSTAHIL
        </div>
        <div
          style={{
            marginTop: 28,
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
            fontFamily: fontFamily.display,
            fontWeight: 500,
            fontSize: 44,
            letterSpacing: "0.08em",
            color: palette.textMuted,
          }}
        >
          HANYA DIANGGAP BEGITU
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: SAFE.captionTop + 40,
          textAlign: "center",
          opacity: sourceOpacity,
          fontFamily: fontFamily.mono,
          fontSize: 22,
          letterSpacing: "0.04em",
          color: palette.textMuted,
        }}
      >
        SUMBER: WIKIPEDIA — ENIGMA MACHINE, BOMBE
      </div>

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 1080,
          height: 1920,
          background: palette.void,
          opacity: fadeOut,
          pointerEvents: "none",
        }}
      />
    </SceneShell>
  );
};

export { S7Payoff };
