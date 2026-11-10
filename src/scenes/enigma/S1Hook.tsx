import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";
import { WIDTH, SAFE } from "../../data/enigma";

// DIA-006: schematic Enigma silhouette. Lamp row above a keyboard grid.
// Drawn in a 936 x 420 local box, placed in the diagram zone.
const BOX_W = 936;
const BOX_H = 420;

const lampCols = Array.from({ length: 9 }, (_, i) => 60 + i * 96);
const keyRows = [
  { y: 250, count: 9, x0: 60, step: 96 },
  { y: 330, count: 8, x0: 108, step: 96 },
];

const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Stroke reveal of the outline: 0 -> 1 over frames 0-60.
  const draw = interpolate(frame, [0, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title rises 30-75.
  const titleT = spring({ frame: frame - 30, fps, config: { damping: 22, stiffness: 120 } });
  const titleY = interpolate(titleT, [0, 1], [28, 0]);
  const titleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Sub-label fades in at 90.
  const subOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Lamp row pulses once at 150.
  const pulse = interpolate(frame, [140, 150, 170], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle push-in across the whole scene.
  const scale = interpolate(frame, [0, 209], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const boxLeft = SAFE.left + (SAFE.right - SAFE.left - BOX_W) / 2;
  const boxTop = SAFE.diagramTop + (SAFE.diagramBottom - SAFE.diagramTop - BOX_H) / 2;

  // Outline path length is approximated by the drawn fraction; each element
  // gets its own draw window so the reveal reads left to right.
  const seg = (start: number, end: number) =>
    interpolate(draw, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <SceneShell sceneId="S1">
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: "50% 50%",
        }}
      >
        {/* Title zone */}
        <div
          style={{
            position: "absolute",
            left: SAFE.left,
            right: WIDTH - SAFE.right,
            top: SAFE.titleTop + 60,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontFamily: fontFamily.display,
              fontWeight: 700,
              fontSize: 112,
              letterSpacing: "0.18em",
              color: palette.textPrimary,
              textShadow: `0 0 18px rgba(127,231,255,0.35)`,
            }}
          >
            ENIGMA
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: fontFamily.mono,
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: "0.1em",
              color: palette.textMuted,
              opacity: subOpacity,
            }}
          >
            MESIN SANDI JERMAN · 1940
          </div>
        </div>

        {/* Diagram zone: DIA-006 silhouette */}
        <svg
          width={BOX_W}
          height={BOX_H}
          viewBox={`0 0 ${BOX_W} ${BOX_H}`}
          style={{ position: "absolute", left: boxLeft, top: boxTop, overflow: "visible" }}
        >
          {/* Machine body outline: reveals first */}
          <rect
            x={24}
            y={150}
            width={BOX_W - 48}
            height={250}
            rx={8}
            fill="none"
            stroke={palette.iceLine}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={1 - seg(0, 0.45)}
            style={{ filter: `drop-shadow(0 0 6px ${palette.iceLine})` }}
          />
          {/* Lamp row: reveals from 0.45 to 0.7 and pulses at 150 */}
          {lampCols.map((x, i) => (
            <circle
              key={`lamp-${i}`}
              cx={x}
              cy={190}
              r={22}
              fill="none"
              stroke={palette.lampAmber}
              strokeWidth={3}
              opacity={seg(0.45, 0.7)}
              style={{
                filter: `drop-shadow(0 0 ${4 + pulse * 14}px ${palette.lampAmber})`,
              }}
            />
          ))}
          {/* Keyboard keys */}
          {keyRows.map((row, r) =>
            Array.from({ length: row.count }, (_, i) => (
              <rect
                key={`key-${r}-${i}`}
                x={row.x0 + i * row.step}
                y={row.y}
                width={64}
                height={52}
                rx={6}
                fill="none"
                stroke={palette.iceDim}
                strokeWidth={2}
                opacity={seg(0.6, 1)}
              />
            )),
          )}
        </svg>
      </div>
    </SceneShell>
  );
};

export { S1Hook };
