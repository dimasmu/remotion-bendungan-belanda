import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";

type Pt = readonly [number, number];

// Schematic routes. Forward lane goes up through the rotor stack on the left,
// reflector at the top, return lane comes down on the right. Route B enters
// each rotor one row higher (rotor stepped), so the path visibly changes.
const ROUTE_A: Pt[] = [
  [300, 1080], // keyboard
  [300, 960], // plugboard
  [340, 800], // rotor 1
  [500, 800], // rotor 2
  [660, 800], // rotor 3
  [540, 600], // reflector
  [800, 800], // return lane, right
  [800, 1080], // lamp
];

const ROUTE_B: Pt[] = [
  [300, 1080],
  [300, 960],
  [340, 860],
  [500, 860],
  [660, 860],
  [540, 600],
  [800, 860],
  [800, 1080],
];

// Cumulative lengths for a polyline, used to place the dot by progress t in [0, 1].
const lengths = (pts: Pt[]) => {
  const out = [0];
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    out.push(out[i - 1] + Math.hypot(x1 - x0, y1 - y0));
  }
  return out;
};

const pointAt = (pts: Pt[], t: number): Pt => {
  const L = lengths(pts);
  const total = L[L.length - 1];
  const d = Math.min(Math.max(t, 0), 1) * total;
  for (let i = 1; i < pts.length; i++) {
    if (d <= L[i]) {
      const seg = L[i] - L[i - 1];
      const k = seg === 0 ? 0 : (d - L[i - 1]) / seg;
      const [x0, y0] = pts[i - 1];
      const [x1, y1] = pts[i];
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
  }
  return pts[pts.length - 1];
};

const toPath = (pts: Pt[]) =>
  pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const Label: React.FC<{ x: number; y: number; align: "left" | "right"; children: React.ReactNode; opacity?: number }> = ({
  x,
  y,
  align,
  children,
  opacity = 1,
}) => (
  <div
    style={{
      position: "absolute",
      left: align === "left" ? x : undefined,
      right: align === "right" ? 1080 - x : undefined,
      top: y - 18,
      fontFamily: fontFamily.mono,
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: "0.1em",
      color: palette.textPrimary,
      opacity,
      textAlign: align,
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

const S3SignalPath: React.FC = () => {
  const f = useCurrentFrame();

  // Route A draws 0-60; dot A travels 60-150; route B draws 150-210; dot B travels 150-240.
  const drawA = ramp(f, 0, 60);
  const drawB = ramp(f, 150, 210);
  const dotA = f >= 60 && f <= 150 ? pointAt(ROUTE_A, (f - 60) / 90) : null;
  const dotB = f >= 150 && f <= 240 ? pointAt(ROUTE_B, (f - 150) / 90) : null;

  // Lamp glows when a dot arrives.
  const lampA = ramp(f, 150, 165);
  const lampB = ramp(f, 240, 255);
  const lampGlow = Math.max(lampA, lampB);

  const caption = ramp(f, 240, 270);

  const boxes = [340, 500, 660];

  return (
    <SceneShell sceneId="S3">
      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      >
        {/* Rotor boxes (rotor order I, II, III left to right) */}
        {boxes.map((x, i) => (
          <rect
            key={`rotor-${i}`}
            x={x - 60}
            y={745}
            width={120}
            height={170}
            rx={8}
            fill={palette.panel}
            stroke={palette.rotorViolet}
            strokeWidth={2}
            opacity={0.25 + 0.75 * ramp(f, 0, 40)}
          />
        ))}
        {/* Routes: stroke reveal with pathLength normalised to 1 */}
        <path
          d={toPath(ROUTE_A)}
          fill="none"
          stroke={palette.iceLine}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawA}
          style={{ filter: `drop-shadow(0 0 5px ${palette.iceLine})` }}
        />
        <path
          d={toPath(ROUTE_B)}
          fill="none"
          stroke={palette.lampAmber}
          strokeWidth={3}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - drawB}
          opacity={drawB}
          style={{ filter: `drop-shadow(0 0 5px ${palette.lampAmber})` }}
        />
        {/* Nodes */}
        {[ROUTE_A[0], ROUTE_A[1], ROUTE_A[4], ROUTE_A[7]].map(([x, y], i) => (
          <circle key={`node-${i}`} cx={x} cy={y} r={7} fill={palette.void} stroke={palette.iceLine} strokeWidth={2} />
        ))}
        {/* Traveling dots */}
        {dotA && <circle cx={dotA[0]} cy={dotA[1]} r={9} fill={palette.iceLine} style={{ filter: `drop-shadow(0 0 10px ${palette.iceLine})` }} />}
        {dotB && <circle cx={dotB[0]} cy={dotB[1]} r={9} fill={palette.lampAmber} style={{ filter: `drop-shadow(0 0 10px ${palette.lampAmber})` }} />}
        {/* Lamp */}
        <circle cx={800} cy={1080} r={22} fill="none" stroke={palette.lampAmber} strokeWidth={3} opacity={0.4 + 0.6 * lampGlow} style={{ filter: `drop-shadow(0 0 ${4 + 14 * lampGlow}px ${palette.lampAmber})` }} />
      </svg>

      <Label x={72} y={960} align="left" opacity={ramp(f, 20, 50)}>PLUGBOARD</Label>
      <Label x={72} y={800} align="left" opacity={ramp(f, 40, 70)}>ROTOR</Label>
      <Label x={72} y={600} align="left" opacity={ramp(f, 60, 90)}>REFLEKTOR</Label>
      <Label x={1008} y={1080} align="right" opacity={ramp(f, 80, 110)}>LAMPU</Label>
      <Label x={72} y={1080} align="left" opacity={ramp(f, 100, 130)}>KEYBOARD</Label>

      <div
        style={{
          position: "absolute",
          left: 72,
          width: 936,
          top: 1230,
          textAlign: "center",
          fontFamily: fontFamily.display,
          fontWeight: 600,
          fontSize: 40,
          letterSpacing: "0.04em",
          color: palette.textPrimary,
          opacity: caption,
        }}
      >
        1 TOMBOL, 1 JALUR BARU
      </div>
    </SceneShell>
  );
};

export { S3SignalPath };
