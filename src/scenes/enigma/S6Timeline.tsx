import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";
import { SAFE } from "../../data/enigma";

// DIA-005: vertical timeline, three nodes (F5 Research Brief).
const NODES = [
  { year: "1932", label: "WARSAWA", sub: "REJEWSKI MEMECAHKAN ENIGMA" },
  { year: "1939", label: "PYRY → BLETCHLEY", sub: "METODE DISERAHKAN" },
  { year: "1940", label: "BOMBE", sub: "BOMBE PERTAMA BEROPERASI" },
] as const;

const LINE_X = 300;
const NODE_Y = [680, 980, 1280];

const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const S6Timeline: React.FC = () => {
  const f = useCurrentFrame();

  const lineDraw = ramp(f, 0, 40);
  const nodeIn = (i: number) => ramp(f, 30 + i * 30, 30 + i * 30 + 20);

  // Highlight travels from node 0 (1932) to node 1 (1939) at local 120.
  const highlightPos = interpolate(f, [90, 120, 150], [0, 0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const highlightY = NODE_Y[0] + (NODE_Y[1] - NODE_Y[0]) * highlightPos;
  const highlightVisible = ramp(f, 90, 105);

  return (
    <SceneShell sceneId="S6">
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      >
        <line
          x1={LINE_X}
          y1={NODE_Y[0]}
          x2={LINE_X}
          y2={NODE_Y[0] + (NODE_Y[2] - NODE_Y[0]) * lineDraw}
          stroke={palette.construction}
          strokeWidth={3}
        />
        {NODE_Y.map((y, i) => {
          const colour = i === 0 ? palette.rotorViolet : i === 1 ? palette.iceLine : palette.lampAmber;
          return (
            <circle
              key={`node-${i}`}
              cx={LINE_X}
              cy={y}
              r={14}
              fill={palette.void}
              stroke={colour}
              strokeWidth={3}
              opacity={nodeIn(i)}
              style={{ filter: `drop-shadow(0 0 6px ${colour})` }}
            />
          );
        })}
        {/* Travelling highlight marker, 1932 -> 1939 */}
        <circle
          cx={LINE_X}
          cy={highlightY}
          r={22}
          fill="none"
          stroke={palette.iceLine}
          strokeWidth={2}
          opacity={highlightVisible * 0.9}
          style={{ filter: `drop-shadow(0 0 10px ${palette.iceLine})` }}
        />
      </svg>

      {NODES.map((n, i) => {
        const o = nodeIn(i);
        return (
          <div
            key={n.year}
            style={{
              position: "absolute",
              left: LINE_X + 60,
              width: SAFE.right - (LINE_X + 60),
              top: NODE_Y[i] - 34,
              opacity: o,
              transform: `translateX(${interpolate(o, [0, 1], [24, 0])}px)`,
            }}
          >
            <div
              style={{
                fontFamily: fontFamily.mono,
                fontWeight: 500,
                fontSize: 44,
                letterSpacing: "0.06em",
                color: palette.textPrimary,
              }}
            >
              {n.year}
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: fontFamily.display,
                fontWeight: 600,
                fontSize: 30,
                letterSpacing: "0.08em",
                color: palette.textPrimary,
              }}
            >
              {n.label}
            </div>
            <div
              style={{
                marginTop: 4,
                fontFamily: fontFamily.mono,
                fontSize: 22,
                letterSpacing: "0.05em",
                color: palette.textMuted,
              }}
            >
              {n.sub}
            </div>
          </div>
        );
      })}
    </SceneShell>
  );
};

export { S6Timeline };
