import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";
import { WIDTH, SAFE } from "../../data/enigma";

// DIA-004: 8 x 8 relation grid (letters A-H). Diagonal cells are A->A, B->B, ...
// Impossible under the reflector, so each one is struck in Alert Red.
const N = 8;
const CELL = 72;
const GRID = N * CELL; // 576
const GRID_LEFT = (WIDTH - GRID) / 2;
const GRID_TOP = 680;
const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

// Illustrative crib pair (labelled CONTOH). Column 0 matches: A over A.
const CRIB_PLAIN = ["A", "B", "C", "D", "E"];
const CRIB_CIPHER = ["A", "X", "Q", "M", "N"];

const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const S4Flaw: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gridOpacity = ramp(f, 0, 45);

  // Diagonal strikes: one after another, 9 frames apart, starting at 45.
  const strike = (i: number) => ramp(f, 45 + i * 9, 45 + i * 9 + 12);

  // "A != A" slams in at 100.
  const slam = spring({ frame: f - 100, fps, config: { damping: 14, stiffness: 180 } });
  const slamScale = interpolate(slam, [0, 1], [1.18, 1]);
  const slamOpacity = ramp(f, 100, 115);

  // Crib block fades in at 120.
  const cribOpacity = ramp(f, 120, 140);

  // Matching column flashes at 150-180.
  const flash = interpolate(f, [150, 160, 170, 180], [0, 1, 0.3, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cross-out of the whole alignment at 185-225.
  const cross = ramp(f, 185, 225);

  const cribLeft = SAFE.left;
  const cribCell = 110;
  const cribWidth = cribCell * CRIB_PLAIN.length;

  return (
    <SceneShell sceneId="S4">
      {/* Headline zone */}
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 260,
          textAlign: "center",
          fontFamily: fontFamily.display,
          fontWeight: 600,
          fontSize: 64,
          lineHeight: 1.15,
          letterSpacing: "0.12em",
          color: palette.textPrimary,
        }}
      >
        TIDAK ADA HURUF
        <br />
        KE DIRINYA SENDIRI
      </div>

      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 400,
          textAlign: "center",
          fontFamily: fontFamily.display,
          fontWeight: 700,
          fontSize: 96,
          letterSpacing: "0.04em",
          color: palette.alertRed,
          opacity: slamOpacity,
          transform: `scale(${slamScale})`,
          textShadow: `0 0 16px rgba(255,92,92,0.4)`,
        }}
      >
        A ≠ A
      </div>

      {/* Relation grid (SVG in composition coordinates) */}
      <svg
        width={WIDTH}
        height={1920}
        viewBox={`0 0 ${WIDTH} 1920`}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      >
        {LETTERS.flatMap((_, row) =>
          LETTERS.map((_c, col) => {
            const x = GRID_LEFT + col * CELL;
            const y = GRID_TOP + row * CELL;
            const isDiag = row === col;
            const s = isDiag ? strike(row) : 0;
            return (
              <g key={`cell-${row}-${col}`} opacity={gridOpacity}>
                <rect
                  x={x + 4}
                  y={y + 4}
                  width={CELL - 8}
                  height={CELL - 8}
                  rx={4}
                  fill={isDiag ? palette.alertRed : "none"}
                  fillOpacity={isDiag ? 0.35 * s : 0}
                  stroke={isDiag ? palette.alertRed : palette.construction}
                  strokeOpacity={isDiag ? 0.35 + 0.65 * s : 0.9}
                  strokeWidth={isDiag ? 2 : 1.5}
                />
                {isDiag && (
                  <line
                    x1={x + 14}
                    y1={y + CELL - 14}
                    x2={x + CELL - 14}
                    y2={y + 14}
                    stroke={palette.alertRed}
                    strokeWidth={3}
                    strokeOpacity={s}
                    strokeLinecap="round"
                  />
                )}
              </g>
            );
          }),
        )}
        {LETTERS.map((L, i) => (
          <text
            key={`lab-${L}`}
            x={GRID_LEFT + i * CELL + CELL / 2}
            y={GRID_TOP - 16}
            textAnchor="middle"
            fontFamily={fontFamily.mono}
            fontSize={26}
            fill={palette.textMuted}
            opacity={gridOpacity}
          >
            {L}
          </text>
        ))}
      </svg>

      {/* Crib example, labelled CONTOH, in the caption zone */}
      <div
        style={{
          position: "absolute",
          left: cribLeft,
          width: SAFE.right - SAFE.left,
          top: 1268,
          opacity: cribOpacity,
          fontFamily: fontFamily.mono,
          fontSize: 22,
          letterSpacing: "0.12em",
          color: palette.textMuted,
          textAlign: "center",
        }}
      >
        CONTOH
      </div>
      <div
        style={{
          position: "absolute",
          left: cribLeft + (SAFE.right - SAFE.left - cribWidth) / 2,
          top: 1300,
          width: cribWidth,
          opacity: cribOpacity,
        }}
      >
        {[CRIB_PLAIN, CRIB_CIPHER].map((row, r) => (
          <div key={`crib-${r}`} style={{ display: "flex" }}>
            {row.map((ch, c) => {
              const matchCol = c === 0;
              return (
                <div
                  key={`crib-${r}-${c}`}
                  style={{
                    width: cribCell,
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fontFamily.mono,
                    fontWeight: 500,
                    fontSize: 40,
                    color: matchCol && r === 1 ? palette.alertRed : palette.textPrimary,
                    border: `2px solid ${matchCol ? palette.alertRed : palette.iceDim}`,
                    borderRadius: 6,
                    marginLeft: -2,
                    marginTop: r === 1 ? -2 : 0,
                    background: matchCol ? `rgba(255,92,92,${0.12 + 0.3 * flash})` : palette.panel,
                  }}
                >
                  {ch}
                </div>
              );
            })}
          </div>
        ))}
        {/* Cross-out spans the full alignment: both rows, all columns */}
        <svg
          width={cribWidth}
          height={150}
          viewBox={`0 0 ${cribWidth} 150`}
          style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
        >
          <line
            x1={-12}
            y1={-12}
            x2={-12 + (cribWidth + 24) * cross}
            y2={-12 + (150 + 24) * cross}
            stroke={palette.alertRed}
            strokeWidth={5}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${palette.alertRed})` }}
          />
        </svg>
      </div>
    </SceneShell>
  );
};

export { S4Flaw };
