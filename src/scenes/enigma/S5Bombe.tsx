import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { SceneShell } from "../../components/SceneShell";
import { palette, fontFamily } from "../../styles/palette";
import { SAFE } from "../../data/enigma";

// DIA-003 schematic: 12 triplets (36 Enigma-equivalents) in a bank, plus a
// candidate column that is eliminated down to one survivor. SKEMA, not a
// technical reproduction of the real Bombe wiring.
const ROWS = 12;
const COLS = 3;
const ROW_Y0 = 640;
const ROW_GAP = 46;
const COL_X0 = 240;
const COL_GAP = 64;
const DRUM_R = 16;

const ramp = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

// Deterministic per-row strike order (not random): rows are eliminated in a
// fixed, varied sequence so it does not read as top-to-bottom.
const STRIKE_ORDER = [2, 5, 0, 8, 3, 10, 1, 6, 9, 4, 7]; // 11 of 12 struck; row 11 survives
const SURVIVOR_ROW = 11;

const S5Bombe: React.FC = () => {
  const f = useCurrentFrame();

  const rowIn = (row: number) => ramp(f, row * 4, row * 4 + 20);
  const spin = (row: number) => (f - row * 4) * (2 + (row % 3));

  const strikeAt = (row: number) => {
    const idx = STRIKE_ORDER.indexOf(row);
    if (idx === -1) return 0;
    const start = 120 + idx * 7;
    return ramp(f, start, start + 10);
  };

  const survivorPulse = interpolate(
    f,
    [200, 215, 230, 245, 260],
    [0, 1, 0.5, 1, 0.6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const labelOpacity = ramp(f, 220, 250);

  return (
    <SceneShell sceneId="S5">
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 260,
          textAlign: "center",
          fontFamily: fontFamily.display,
          fontWeight: 600,
          fontSize: 72,
          letterSpacing: "0.1em",
          color: palette.textPrimary,
        }}
      >
        BOMBE
      </div>
      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: 380,
          textAlign: "center",
          fontFamily: fontFamily.mono,
          fontWeight: 500,
          fontSize: 26,
          letterSpacing: "0.1em",
          color: palette.textMuted,
        }}
      >
        SKEMA · 36 TIRUAN ENIGMA
      </div>

      <svg
        width={1080}
        height={1920}
        viewBox="0 0 1080 1920"
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      >
        {Array.from({ length: ROWS }, (_, row) => {
          const y = ROW_Y0 + row * ROW_GAP;
          const opacity = rowIn(row);
          const struck = strikeAt(row);
          const isSurvivor = row === SURVIVOR_ROW;
          const glow = isSurvivor ? 0.4 + 0.6 * survivorPulse : 1 - struck;
          const colour = isSurvivor ? palette.lampAmber : struck > 0 ? palette.alertRed : palette.iceDim;
          return (
            <g key={`row-${row}`} opacity={opacity}>
              {Array.from({ length: COLS }, (_, col) => {
                const x = COL_X0 + col * COL_GAP;
                const angle = spin(row) + col * 40;
                const dx = Math.cos((angle * Math.PI) / 180) * 10;
                return (
                  <g key={`drum-${row}-${col}`}>
                    <circle
                      cx={x}
                      cy={y}
                      r={DRUM_R}
                      fill="none"
                      stroke={colour}
                      strokeWidth={2}
                      opacity={glow}
                      style={{ filter: isSurvivor ? `drop-shadow(0 0 ${8 * survivorPulse}px ${palette.lampAmber})` : undefined }}
                    />
                    <line
                      x1={x}
                      y1={y}
                      x2={x + dx}
                      y2={y - Math.sin((angle * Math.PI) / 180) * 10}
                      stroke={colour}
                      strokeWidth={2}
                      opacity={glow}
                    />
                  </g>
                );
              })}
              {struck > 0 && (
                <line
                  x1={COL_X0 - 24}
                  y1={y}
                  x2={COL_X0 + (COLS - 1) * COL_GAP + 24}
                  y2={y}
                  stroke={palette.alertRed}
                  strokeWidth={3}
                  strokeOpacity={struck}
                />
              )}
            </g>
          );
        })}
        {/* Candidate column marker on the right */}
        <text
          x={COL_X0 + (COLS - 1) * COL_GAP + 70}
          y={ROW_Y0 + SURVIVOR_ROW * ROW_GAP + 6}
          fontFamily={fontFamily.mono}
          fontSize={24}
          fill={palette.lampAmber}
          opacity={labelOpacity}
        >
          KANDIDAT
        </text>
      </svg>

      <div
        style={{
          position: "absolute",
          left: SAFE.left,
          width: SAFE.right - SAFE.left,
          top: SAFE.captionTop,
          textAlign: "center",
          fontFamily: fontFamily.display,
          fontWeight: 600,
          fontSize: 36,
          letterSpacing: "0.04em",
          color: palette.textPrimary,
          opacity: labelOpacity,
        }}
      >
        BERHENTI = KANDIDAT
      </div>
    </SceneShell>
  );
};

export { S5Bombe };
