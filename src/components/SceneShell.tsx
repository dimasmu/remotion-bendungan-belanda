import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { palette, fontFamily } from "../styles/palette";
import { HEIGHT, SCENES, SceneId, WIDTH, DURATION_IN_FRAMES, sceneOf } from "../data/enigma";

// Deterministic film grain: a fixed set of offsets that shift with the frame.
const GrainOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 37) % 97;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        opacity: 0.06,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0 1px, transparent 1px 3px)",
        backgroundPosition: `0px ${shift}px`,
        mixBlendMode: "screen",
        zIndex: 50,
      }}
    />
  );
};

// Thin progress rail at the top, plus the scene tag. Sits above the content.
const ProgressRail: React.FC<{ sceneId: SceneId }> = ({ sceneId }) => {
  // useCurrentFrame() is local to the Sequence; add the scene start to get the global frame.
  const localFrame = useCurrentFrame();
  const scene = sceneOf(sceneId);
  const frame = localFrame + scene.from;
  const progress = interpolate(frame, [0, DURATION_IN_FRAMES - 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const index = SCENES.findIndex((s) => s.id === sceneId) + 1;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <div style={{ position: "absolute", left: 72, right: 72, top: 96, zIndex: 40 }}>
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: 24,
          letterSpacing: "0.1em",
          color: palette.textMuted,
          marginBottom: 14,
        }}
      >
        {pad(index)} / {pad(SCENES.length)}
      </div>
      <div style={{ height: 2, background: palette.construction, width: "100%" }}>
        <div
          style={{
            height: 2,
            width: `${progress * 100}%`,
            background: palette.iceLine,
            boxShadow: `0 0 6px ${palette.iceLine}`,
          }}
        />
      </div>
    </div>
  );
};

// Shared scene wrapper: background, grid, vignette, grain, progress rail.
// The scene body sits above the background and below the grain.
export const SceneShell: React.FC<{ sceneId: SceneId; children: React.ReactNode }> = ({
  sceneId,
  children,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor: palette.void, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(${palette.construction} 1px, transparent 1px), linear-gradient(90deg, ${palette.construction} 1px, transparent 1px)`,
          backgroundSize: "96px 96px",
          opacity: 0.18,
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(14,20,28,0) 0%, rgba(7,10,15,0.85) 75%, rgba(7,10,15,1) 100%)",
        }}
      />
      <div style={{ position: "absolute", left: 0, top: 0, width: WIDTH, height: HEIGHT }}>
        {children}
      </div>
      <ProgressRail sceneId={sceneId} />
      <GrainOverlay />
    </AbsoluteFill>
  );
};
