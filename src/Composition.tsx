import React from "react";
import {
  AbsoluteFill,
  Composition,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const W = 1920;
const H = 1080;
const FPS = 30;
const DURATION = 3360;
const C = {
  ink: "#071B2B",
  deep: "#04111D",
  water: "#0C5267",
  teal: "#4CA6A5",
  earth: "#70513F",
  peat: "#3C302B",
  clay: "#9A765E",
  sand: "#D5C09A",
  cream: "#F0E4CE",
  concrete: "#9AA5A8",
  white: "#F7F4EC",
  gold: "#D4AD68",
  red: "#D77B64",
};

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };
const Label: React.FC<{ x: number; y: number; children: React.ReactNode; size?: number; color?: string; weight?: number; anchor?: "start" | "middle" | "end" }> = ({
  x, y, children, size = 24, color = C.cream, weight = 500, anchor = "start",
}) => (
  <text x={x} y={y} fill={color} fontSize={size} fontWeight={weight} textAnchor={anchor}
    fontFamily="Arial, Helvetica, sans-serif" letterSpacing="0.4">{children}</text>
);

const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ color: C.gold, fontSize: 19, fontWeight: 700, letterSpacing: 5, textTransform: "uppercase" }}>{children}</div>
);

const Heading: React.FC<{ children: React.ReactNode; size?: number }> = ({ children, size = 66 }) => (
  <div style={{ color: C.white, fontSize: size, fontWeight: 800, lineHeight: 1.02, letterSpacing: -2, maxWidth: 850 }}>{children}</div>
);

const SceneFrame: React.FC<{ children: React.ReactNode; chapter: string; number: string }> = ({ children, chapter, number }) => {
  const f = useCurrentFrame();
  const opacity = interpolate(f, [0, 20, 510, 540], [0, 1, 1, 0], clamp);
  return (
    <AbsoluteFill style={{ backgroundColor: C.ink, opacity, overflow: "hidden", fontFamily: "Arial, Helvetica, sans-serif" }}>
      {children}
      <div style={{ position: "absolute", left: 74, right: 74, bottom: 48, display: "flex", justifyContent: "space-between", alignItems: "center", color: "rgba(240,228,206,.66)", fontSize: 16, letterSpacing: 3, textTransform: "uppercase" }}>
        <span>{chapter}</span><span>{number} / 07</span>
      </div>
      <div style={{ position: "absolute", left: 74, right: 74, bottom: 30, height: 2, background: "rgba(240,228,206,.18)" }}>
        <div style={{ width: `${Math.min(100, (f / 540) * 100)}%`, height: "100%", background: C.gold }} />
      </div>
    </AbsoluteFill>
  );
};

const Water = ({ y = 600, shift = 0, opacity = 1 }: { y?: number; shift?: number; opacity?: number }) => (
  <g opacity={opacity}>
    <path d={`M0 ${y} Q180 ${y - 18} 360 ${y} T720 ${y} T1080 ${y} T1440 ${y} T1920 ${y} V1080 H0Z`} fill={C.water} />
    {Array.from({ length: 9 }, (_, i) => (
      <path key={i} d={`M${-100 + i * 245 + shift} ${y + 55 + (i % 3) * 38} q70 -13 140 0 t140 0`} fill="none" stroke="#6AB4B2" strokeWidth="3" opacity=".32" />
    ))}
  </g>
);

const Skyline = () => (
  <g stroke={C.cream} strokeWidth="3" strokeLinejoin="round">
    <path d="M0 610 H1920" stroke={C.gold} strokeWidth="5" />
    {Array.from({ length: 13 }, (_, i) => {
      const x = 55 + i * 145;
      const width = 95 + (i % 3) * 12;
      const height = 180 + ((i * 47) % 150);
      return <g key={i} transform={`translate(${x} ${610 - height})`}>
        <path d={`M0 ${height} V35 Q0 0 ${width / 2} 0 Q${width} 0 ${width} 35 V${height}Z`} fill={i % 2 ? "#A65F4F" : "#C18B65"} />
        <path d={`M${width / 2 - 13} 0 V-18 H${width / 2 + 13} V0`} fill={C.cream} />
        {Array.from({ length: 4 }, (_, j) => <rect key={j} x={14 + (j % 2) * 42} y={55 + Math.floor(j / 2) * 58} width="17" height="25" fill={C.ink} stroke="none" />)}
      </g>;
    })}
    <path d="M0 610 Q250 640 500 610 T1000 610 T1500 610 T2000 610" fill="none" stroke={C.gold} strokeWidth="8" />
  </g>
);

const Opening: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const titleIn = spring({ frame: f - 10, fps, config: { damping: 20, stiffness: 75 } });
  const camera = interpolate(f, [0, 360], [1.035, 1.085], clamp);
  const boatX = interpolate(f, [0, 360], [-260, 2050], clamp);
  const sunPulse = 0.98 + Math.sin(f / 46) * 0.025;

  const houses = [
    { x: -18, w: 132, h: 220, color: "#A85F50", roof: 0 },
    { x: 122, w: 124, h: 258, color: "#C18B65", roof: 1 },
    { x: 254, w: 136, h: 198, color: "#B76D59", roof: 2 },
    { x: 398, w: 124, h: 245, color: "#A85F50", roof: 3 },
    { x: 530, w: 134, h: 212, color: "#C18B65", roof: 0 },
    { x: 672, w: 124, h: 268, color: "#A85F50", roof: 1 },
    { x: 804, w: 138, h: 204, color: "#B76D59", roof: 2 },
    { x: 950, w: 126, h: 248, color: "#C18B65", roof: 3 },
    { x: 1084, w: 136, h: 218, color: "#A85F50", roof: 0 },
    { x: 1228, w: 124, h: 262, color: "#B76D59", roof: 1 },
    { x: 1360, w: 136, h: 202, color: "#C18B65", roof: 2 },
    { x: 1504, w: 126, h: 244, color: "#A85F50", roof: 3 },
    { x: 1638, w: 136, h: 216, color: "#B76D59", roof: 0 },
    { x: 1782, w: 150, h: 258, color: "#C18B65", roof: 1 },
  ];

  return <SceneFrame chapter="A country shaped by water" number="01">
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#102B3D 0%,#1D4355 48%,#52717A 100%)" }} />
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", transform: `scale(${camera})` }}>
      <defs>
        <linearGradient id="openingSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D2638" />
          <stop offset="68%" stopColor="#31576A" />
          <stop offset="100%" stopColor="#C18B65" />
        </linearGradient>
        <linearGradient id="canalWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14586B" />
          <stop offset="100%" stopColor="#082D40" />
        </linearGradient>
        <linearGradient id="facadeShade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#071B2B" stopOpacity=".2" />
          <stop offset="45%" stopColor="#FFFFFF" stopOpacity=".08" />
          <stop offset="100%" stopColor="#071B2B" stopOpacity=".24" />
        </linearGradient>
      </defs>

      <rect width="1920" height="1080" fill="url(#openingSky)" />
      <circle cx="1570" cy="210" r={120 * sunPulse} fill={C.gold} opacity=".9" />
      <circle cx="1570" cy="210" r="150" fill="none" stroke="#E9D4A7" strokeWidth="2" opacity=".2" />

      <g opacity=".24" fill="#C2D0CC">
        <path d={`M${-180 + (f * 0.45) % 2200} 245 q100 -45 200 0 q90 -35 170 0 q-90 24 -180 10 q-100 28 -190 -10Z`} />
        <path d={`M${550 + (f * 0.28) % 1900} 330 q90 -35 180 0 q100 -40 190 0 q-80 25 -180 10 q-100 25 -190 -10Z`} />
      </g>

      <path d="M0 560 Q360 500 720 550 T1440 540 T1920 530 V760 H0Z" fill="#183D4E" opacity=".55" />
      <path d="M0 665 Q340 640 660 660 T1320 650 T1920 660 V770 H0Z" fill="#2A5360" opacity=".45" />

      {houses.map((house, index) => {
        const base = 755;
        const top = base - house.h;
        const w = house.w;
        const roofShape = house.roof === 0
          ? `M0 ${top + 38} L0 ${top + 18} L${w / 2 - 14} ${top + 18} L${w / 2 - 14} ${top} L${w / 2 + 14} ${top} L${w / 2 + 14} ${top + 18} L${w} ${top + 18} L${w} ${base} L0 ${base}Z`
          : house.roof === 1
          ? `M0 ${top + 42} Q0 ${top + 5} ${w / 2} ${top + 5} Q${w} ${top + 5} ${w} ${top + 42} L${w} ${base} L0 ${base}Z`
          : house.roof === 2
          ? `M0 ${top + 48} L${w * .22} ${top + 48} L${w * .22} ${top + 25} L${w * .38} ${top + 25} L${w * .5} ${top} L${w * .62} ${top + 25} L${w * .78} ${top + 25} L${w * .78} ${top + 48} L${w} ${top + 48} L${w} ${base} L0 ${base}Z`
          : `M0 ${top + 30} L${w * .18} ${top + 30} L${w * .18} ${top + 14} L${w * .82} ${top + 14} L${w * .82} ${top + 30} L${w} ${top + 30} L${w} ${base} L0 ${base}Z`;
        const rows = Math.floor((house.h - 90) / 48);
        return <g key={index} transform={`translate(${house.x} 0)`}>
          <path d={roofShape} fill={house.color} stroke="#F0E4CE" strokeWidth="4" strokeLinejoin="round" />
          <path d={`M8 ${top + 55} H${w - 8} V${base - 5} H8Z`} fill="url(#facadeShade)" />
          <path d={`M10 ${base - 13} H${w - 10}`} stroke="#E8D7B7" strokeWidth="3" opacity=".7" />
          <path d={`M14 ${top + 58} V${base - 8} M${w - 14} ${top + 58} V${base - 8}`} stroke="#F0D8B4" strokeWidth="3" opacity=".38" />
          {Array.from({ length: Math.max(2, rows) }, (_, row) =>
            [0, 1].map((column) => {
              const wx = 20 + column * (w - 60);
              const wy = top + 78 + row * 48;
              const glow = .76 + Math.sin(f / 20 + index * 1.7 + row * .8 + column) * .09;
              return <g key={`${row}-${column}`} opacity={glow}>
                <rect x={wx} y={wy} width="23" height="31" rx="2" fill="#102638" stroke="#E7CF9D" strokeWidth="2" />
                <path d={`M${wx + 11.5} ${wy + 2} V${wy + 29} M${wx + 2} ${wy + 15.5} H${wx + 21}`} stroke="#D6B77D" strokeWidth="1.5" opacity=".75" />
                <path d={`M${wx + 4} ${wy + 4} H${wx + 9} V${wy + 12} H${wx + 4}Z`} fill="#E8C98F" opacity=".23" />
              </g>;
            })
          )}
          <rect x={w / 2 - 15} y={base - 65} width="30" height="65" fill="#172F3D" stroke="#E7CF9D" strokeWidth="2" />
          <circle cx={w / 2 + 7} cy={base - 34} r="3" fill={C.gold} />
          {house.roof === 2 && <path d={`M${w / 2 - 15} ${top + 4} L${w / 2} ${top - 17} L${w / 2 + 15} ${top + 4}`} fill="#D5B58D" stroke="#F0E4CE" strokeWidth="2" />}
          <path d={`M${w / 2 - 8} ${top - 1} H${w / 2 + 8} V${top - 20} H${w / 2 - 8}Z`} fill="#E8D8BC" />
          <path d={`M0 ${base} H${w}`} stroke="#F0E4CE" strokeWidth="5" />
        </g>;
      })}

      <path d="M0 756 Q320 746 640 756 T1280 752 T1920 750" fill="none" stroke="#E8BD72" strokeWidth="9" />
      <path d="M0 774 H1920" stroke="#7C5E4B" strokeWidth="16" />
      <path d="M0 787 H1920" stroke="#D8BD94" strokeWidth="5" />

      <rect x="0" y="802" width="1920" height="278" fill="url(#canalWater)" />
      <path d="M0 810 Q340 790 680 810 T1360 808 T1920 810" stroke="#D9C9A6" strokeWidth="6" fill="none" opacity=".8" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = ((i * 175 + f * (i % 2 ? 1.1 : -.7)) % 2200 + 2200) % 2200 - 140;
        const y = 865 + (i % 4) * 40;
        return <g key={i} opacity={.18 + (i % 3) * .06}>
          <path d={`M${x} ${y} q55 -12 110 0 t110 0`} stroke="#9BCBC9" strokeWidth="3" fill="none" />
          <path d={`M${x + 14} ${y + 11} q35 -5 70 0`} stroke="#D6D5C5" strokeWidth="2" fill="none" />
        </g>;
      })}

      <g transform={`translate(${boatX} 0)`}>
        <path d="M0 858 L190 858 L163 895 L28 895Z" fill="#6D4436" stroke="#E8D7B7" strokeWidth="4" />
        <path d="M54 858 V824 H132 V858" fill="#D0B38A" stroke="#E8D7B7" strokeWidth="4" />
        <rect x="68" y="834" width="22" height="16" fill="#183449" />
        <rect x="98" y="834" width="22" height="16" fill="#183449" />
        <path d="M18 900 Q95 912 175 900" stroke="#8ED0CF" strokeWidth="5" fill="none" opacity=".75" />
      </g>

      <g transform="translate(1460 0)" opacity=".8">
        <path d="M0 808 H280" stroke="#E0C59A" strokeWidth="8" />
        <path d="M38 808 Q140 720 242 808" stroke="#E0C59A" strokeWidth="10" fill="none" />
        <path d="M75 808 Q140 755 205 808" stroke="#6B5547" strokeWidth="7" fill="none" />
      </g>
      <path d="M0 1015 Q480 995 960 1015 T1920 1015" stroke="#71B4B8" strokeWidth="3" fill="none" opacity=".2" />
    </svg>

    <div style={{ position: "absolute", left: 110, top: 128, width: 1070, opacity: titleIn, transform: `translateY(${(1 - titleIn) * 32}px)` }}>
      <div style={{ color: C.gold, fontSize: 21, fontWeight: 800, letterSpacing: 6, textTransform: "uppercase", marginBottom: 22 }}>
        Engineering a nation
      </div>
      <div style={{ color: C.white, fontSize: 91, fontWeight: 900, lineHeight: .96, letterSpacing: -3.5, textShadow: "0 5px 22px rgba(0,0,0,.28)" }}>
        <span style={{ display: "block", whiteSpace: "nowrap" }}>WHY DOESN’T THE</span>
        <span style={{ display: "block", whiteSpace: "nowrap" }}>NETHERLANDS</span>
        <span style={{ display: "block", whiteSpace: "nowrap", color: "#F2D8A7" }}>SINK?</span>
      </div>
      <div style={{ color: "#F2E8D6", fontSize: 23, fontWeight: 600, letterSpacing: 2.4, marginTop: 22, textShadow: "0 3px 12px rgba(0,0,0,.5)" }}>
        THE COUNTRY THAT LEARNED TO LIVE WITH WATER
      </div>
    </div>
    <div style={{ position: "absolute", right: 118, bottom: 143, color: C.white, fontSize: 17, fontWeight: 700, letterSpacing: 3, textShadow: "0 2px 12px rgba(0,0,0,.65)" }}>
      NORTH SEA · WESTERN EUROPE
    </div>
  </SceneFrame>;
};

const Geography: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = interpolate(f, [18, 112], [0, 1], clamp);
  const waterLevel = interpolate(f, [0, 110, 240, 390], [0, 1, 0.82, 1], clamp);
  const bracket = interpolate(f, [75, 150], [0, 1], clamp);
  const cardIn = spring({ frame: f - 28, fps: 30, config: { damping: 19, stiffness: 80 } });
  const drift = (f * 1.1) % 220;
  const particles = Array.from({ length: 22 }, (_, i) => ({
    x: (i * 97 + f * (i % 2 ? 0.32 : -0.22) + 2200) % 1920,
    y: 730 + (i * 59) % 300,
    r: 2 + (i % 3),
  }));

  return <SceneFrame chapter="A landscape below sea level" number="02">
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#0B2232 0%,#102E40 38%,#16394A 100%)" }} />
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <linearGradient id="geoSea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#23798A" />
          <stop offset="100%" stopColor="#0B465A" />
        </linearGradient>
        <linearGradient id="geoClay" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C29A70" />
          <stop offset="100%" stopColor="#8A654F" />
        </linearGradient>
        <linearGradient id="geoPeat" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#49392F" />
          <stop offset="50%" stopColor="#60483A" />
          <stop offset="100%" stopColor="#3D302A" />
        </linearGradient>
        <clipPath id="geoGroundReveal">
          <rect x="0" y="485" width={1920 * reveal} height="595" />
        </clipPath>
        <clipPath id="geoSeaClip">
          <rect x="0" y="0" width="430" height="1080" />
        </clipPath>
      </defs>

      {/* Quiet upper sky/header zone: diagram elements stay below y=410. */}
      <path d="M0 390 Q480 370 960 390 T1920 390" fill="none" stroke="#6E9AA0" strokeWidth="2" opacity=".14" />
      <path d="M0 410 H1920" stroke="#D7BD91" strokeWidth="2" opacity=".2" />
      <g opacity=".15" stroke="#8CB9BC" strokeWidth="2" fill="none">
        <path d="M950 105 q55 -20 110 0 t110 0 t110 0" />
        <path d="M1030 145 q55 -20 110 0 t110 0" />
        <path d="M1460 280 q55 -20 110 0 t110 0" />
      </g>

      {/* Sea outside the lowland. Its animated surface stays below the title area. */}
      <path d={`M0 500 Q95 ${486 - Math.sin(f / 18) * 5} 190 500 T380 500 T430 500 V1080 H0Z`} fill="url(#geoSea)" />
      {Array.from({ length: 7 }, (_, i) => (
        <path key={i}
          d={`M${-170 + i * 84 + drift} ${526 + i * 34} q45 -8 90 0 t90 0`}
          fill="none" stroke="#8AD0D1" strokeWidth="3" opacity=".3" />
      ))}
      <g clipPath="url(#geoSeaClip)" opacity=".32">
        {Array.from({ length: 15 }, (_, i) => (
          <path key={i} d={`M${-80 + i * 45 + drift * .45} ${620 + (i % 4) * 80} q35 -8 70 0`}
            stroke="#B5D9D2" strokeWidth="2" fill="none" />
        ))}
      </g>

      {/* Land and subsurface strata reveal from left to right. */}
      <g clipPath="url(#geoGroundReveal)">
        <path d="M395 575 Q520 558 650 572 T930 566 T1230 572 T1540 563 T1920 570 V1080 H395Z" fill="#D4BC94" />
        <path d="M395 650 Q560 625 760 648 T1120 640 T1510 650 T1920 638 V1080 H395Z" fill="url(#geoClay)" />
        <path d="M395 785 Q580 750 820 784 T1280 778 T1680 785 T1920 770 V1080 H395Z" fill="url(#geoPeat)" />
        <path d="M395 925 Q610 890 830 925 T1270 918 T1690 925 T1920 910 V1080 H395Z" fill="#63564A" />
        <path d="M395 1020 Q650 990 920 1017 T1460 1015 T1920 1000 V1080 H395Z" fill="#B6A17E" />

        {/* Sediment details and strata texture. */}
        {Array.from({ length: 22 }, (_, i) => (
          <path key={i} d={`M${440 + i * 70} ${670 + (i % 3) * 18} q25 12 52 0`}
            stroke="#E0C19A" strokeWidth="4" fill="none" opacity=".48" />
        ))}
        {Array.from({ length: 18 }, (_, i) => (
          <path key={i} d={`M${430 + i * 86} ${820 + (i % 4) * 19} q38 -10 72 3`}
            stroke="#9B8063" strokeWidth="5" fill="none" opacity=".42" />
        ))}
        {Array.from({ length: 16 }, (_, i) => (
          <path key={i} d={`M${470 + i * 90} ${960 + (i % 3) * 17} q32 -8 68 2`}
            stroke="#D1B991" strokeWidth="3" fill="none" opacity=".35" />
        ))}

        {/* Groundwater line with moving current marks. */}
        <path d="M395 748 Q650 730 900 748 T1410 748 T1920 740" stroke="#72C2C7" strokeWidth="5" strokeDasharray="18 13" fill="none" />
        <path d={`M${-100 + drift} 748 h90 m18 0 h38 m18 0 h90`} stroke="#D0F1E8" strokeWidth="4" fill="none" opacity=".72" />

        {/* Grass and reeds along the lowland surface. */}
        {Array.from({ length: 32 }, (_, i) => {
          const x = 470 + i * 47;
          const y = 572 + Math.sin(i * 1.8) * 6;
          const sway = Math.sin(f / 13 + i) * 7;
          return <g key={i} stroke="#D6D99E" strokeWidth="4" strokeLinecap="round" fill="none" opacity=".88">
            <path d={`M${x} ${y} q${-5 + sway * .2} -15 ${-10 + sway} -28`} />
            <path d={`M${x + 3} ${y} q${7 + sway * .3} -13 ${15 + sway} -23`} />
          </g>;
        })}
        <path d="M395 576 Q520 558 650 572 T930 566 T1230 572 T1540 563 T1920 570" stroke="#E9D5B4" strokeWidth="8" fill="none" />
      </g>

      {/* Sea level datum: it deliberately crosses the land to show the elevation difference. */}
      <path d="M0 500 H1920" stroke="#72CFD1" strokeWidth="5" strokeDasharray="17 11" opacity=".92" />
      <path d="M0 500 H1920" stroke="#E4F1E8" strokeWidth="1.5" opacity=".42" />

      {/* Reclaimed lowland embankment and a small canal cut into the polder. */}
      <path d="M330 500 L370 480 L418 500 L418 615 L330 615Z" fill="#B89B72" stroke="#E5D0A7" strokeWidth="5" />
      <path d="M340 505 L372 488 L405 505" stroke="#F0DEBD" strokeWidth="4" fill="none" />
      <path d="M820 573 Q1040 568 1240 574 T1660 572" stroke="#287E8A" strokeWidth="14" fill="none" opacity=".95" />
      <path d="M820 565 Q1040 560 1240 566 T1660 564" stroke="#C0E2D6" strokeWidth="3" fill="none" opacity=".9" />

      {/* Measuring bracket animates the difference between sea level and land. */}
      <g opacity={bracket}>
        <path d={`M1065 500 V${500 + 72 * waterLevel}`} stroke={C.gold} strokeWidth="5" fill="none" />
        <path d="M1049 500 H1081 M1049 572 H1081" stroke={C.gold} strokeWidth="5" />
        <path d="M1065 507 l-10 12 M1065 507 l10 12" stroke={C.gold} strokeWidth="3" fill="none" />
        <path d="M1065 565 l-10 -12 M1065 565 l10 -12" stroke={C.gold} strokeWidth="3" fill="none" />
      </g>

      {/* Depth particles and bubbles move slowly beneath the water table. */}
      {particles.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill={i % 3 === 0 ? "#D7C09A" : "#A5D6D0"} opacity=".28" />
      ))}
      {Array.from({ length: 6 }, (_, i) => {
        const y = 815 + ((f * .7 + i * 58) % 190);
        const x = 520 + i * 245 + Math.sin(f / 28 + i) * 13;
        return <circle key={i} cx={x} cy={y} r={5 + (i % 2) * 3} fill="none" stroke="#9AD5D1" strokeWidth="2" opacity=".38" />;
      })}

      {/* Compact labels are positioned in the diagram zone, not over the title. */}
      <g fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" letterSpacing="2">
        <text x="85" y="470" fill="#BCE7E0" fontSize="22">NORTH SEA</text>
        <text x="520" y="625" fill="#102B37" fontSize="20">LOW-LYING LAND</text>
        <text x="520" y="780" fill="#E7D5B6" fontSize="20">CLAY</text>
        <text x="520" y="915" fill="#E7D5B6" fontSize="20">PEAT</text>
        <text x="520" y="1050" fill="#243B3D" fontSize="20">SAND</text>
        <text x="1370" y="725" fill="#BEE8E2" fontSize="19">GROUNDWATER</text>
      </g>
      <path d="M1345 716 L1300 746" stroke="#BEE8E2" strokeWidth="3" fill="none" />
    </svg>

    {/* Foreground typography: these layers are above all water and soil artwork. */}
    <div style={{ position: "absolute", left: 100, top: 92, width: 800, zIndex: 3 }}>
      <Eyebrow>01 — The geography</Eyebrow>
      <div style={{ color: C.white, fontSize: 68, fontWeight: 900, lineHeight: .99, letterSpacing: -2.6, marginTop: 20, textShadow: "0 4px 18px rgba(0,0,0,.22)" }}>
        LIVING BELOW<br />THE WATERLINE
      </div>
      <div style={{ color: "#D8E3DE", fontSize: 25, lineHeight: 1.48, maxWidth: 680, marginTop: 23 }}>
        Large parts of the Netherlands sit at or below sea level. Beneath the cities lies soft ground shaped by water.
      </div>
    </div>

    <div style={{
      position: "absolute", right: 112, top: 105, width: 535,
      padding: "27px 32px 29px", boxSizing: "border-box",
      background: "rgba(4,19,30,.92)", border: "1px solid rgba(209,189,145,.22)",
      borderLeft: `5px solid ${C.gold}`, borderRadius: 4,
      zIndex: 3, opacity: cardIn, transform: `translateY(${(1 - cardIn) * 24}px)`,
      boxShadow: "0 18px 45px rgba(0,0,0,.18)"
    }}>
      <div style={{ color: C.gold, fontSize: 17, fontWeight: 800, letterSpacing: 3.5 }}>THE CHALLENGE</div>
      <div style={{ color: C.white, fontSize: 29, fontWeight: 700, lineHeight: 1.22, marginTop: 14 }}>
        The sea can stand higher than the land.
      </div>
      <div style={{ color: "#BFD0CD", fontSize: 19, lineHeight: 1.4, marginTop: 12 }}>
        The difference is visible in this cross-section.
      </div>
    </div>

    <div style={{ position: "absolute", left: 1110, top: 432, zIndex: 3, opacity: bracket, color: C.gold, fontSize: 18, fontWeight: 800, letterSpacing: 2 }}>
      LAND BELOW SEA LEVEL
    </div>
    <div style={{ position: "absolute", right: 115, top: 510, zIndex: 3, color: "#F3E5C8", fontSize: 17, fontWeight: 700, letterSpacing: 2, textShadow: "0 2px 8px rgba(0,0,0,.6)" }}>
      SEA LEVEL
    </div>
  </SceneFrame>;
};

const Foundations: React.FC = () => {
  const f = useCurrentFrame();
  const pileHeight = interpolate(f, [40, 170], [0, 360], clamp);
  return <SceneFrame chapter="What holds the cities up?" number="03">
    <div style={{ position: "absolute", left: 100, top: 100 }}>
      <Eyebrow>02 — Hidden foundations</Eyebrow><Heading>Buildings need<br />deep roots</Heading>
      <p style={{ color: C.cream, fontSize: 24, maxWidth: 570, lineHeight: 1.45 }}>In older parts of Amsterdam, many historic buildings stand on long wooden piles driven through weak soil into stronger sand layers.</p>
    </div>
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <path d="M0 590 H1920 V1080 H0Z" fill={C.sand} />
      <path d="M0 700 Q400 670 800 700 T1600 700 T1920 700 V1080 H0Z" fill={C.clay} />
      <path d="M0 850 Q500 820 1000 850 T1920 850 V1080 H0Z" fill={C.peat} />
      <path d="M0 990 H1920 V1080 H0Z" fill="#D8C8A9" />
      <path d="M0 570 H1920" stroke={C.gold} strokeWidth="7" />
      <path d="M0 660 Q400 630 800 660 T1600 660 T1920 660" stroke="#5DB9C6" strokeWidth="4" fill="none" strokeDasharray="15 12" />
      <Label x={120} y={640} color="#8DE0E4" size={20}>GROUNDWATER</Label>
      <g transform="translate(900 0)">
        <path d="M-40 570 V370 L100 265 L240 370 V570Z" fill="#B96F52" stroke={C.ink} strokeWidth="8" />
        <path d="M-55 370 L100 240 L255 370" stroke={C.cream} strokeWidth="18" fill="none" />
        <rect x="35" y="425" width="55" height="145" fill={C.ink} /><rect x="145" y="405" width="50" height="55" fill="#E7C58E" />
        {[-10,55,120,185].map((x) => <rect key={x} x={x} y="565" width="22" height={pileHeight} fill="#72513B" stroke="#3C302B" strokeWidth="3" />)}
        <path d="M-70 570 H270" stroke={C.ink} strokeWidth="15" />
      </g>
      <path d="M850 900 H1200" stroke={C.gold} strokeWidth="3" />
      <Label x={1250} y={890} color={C.cream} size={24}>WOODEN PILES</Label>
      <Label x={1250} y={925} color={C.cream} size={19}>Transfer the building load</Label>
      <Label x={1250} y={952} color={C.cream} size={19}>to deeper, stronger ground</Label>
      <path d="M1190 890 L1135 890 L1100 850" stroke={C.gold} strokeWidth="3" fill="none" />
      <Label x={120} y={1040} color={C.ink} size={18}>SIMPLIFIED FOUNDATION CROSS-SECTION</Label>
    </svg>
    <div style={{ position: "absolute", right: 105, top: 145, width: 390, color: C.cream, fontSize: 21, lineHeight: 1.5 }}>
      <div style={{ color: C.gold, letterSpacing: 3, fontSize: 16, marginBottom: 12 }}>THE PRINCIPLE</div>
      The secret is not that the soil is strong. It is that engineers learned how to reach the stronger layers beneath it.
    </div>
  </SceneFrame>;
};

const Polders: React.FC = () => {
  const f = useCurrentFrame();
  const waterY = interpolate(f, [0, 180], [610, 790], clamp);
  return <SceneFrame chapter="Turning water into farmland" number="04">
    <div style={{ position: "absolute", left: 100, top: 95 }}>
      <Eyebrow>03 — The polder system</Eyebrow><Heading>Make land.<br />Manage water.</Heading>
      <p style={{ color: C.cream, fontSize: 24, maxWidth: 560, lineHeight: 1.45 }}>Dikes enclose low-lying areas. Canals and pumps move excess water out, creating polders: land whose water level is carefully controlled.</p>
    </div>
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect x="0" y="600" width="1920" height="480" fill={C.water} />
      <path d={`M0 ${waterY} Q450 ${waterY - 20} 900 ${waterY} T1920 ${waterY} V1080 H0Z`} fill="#167083" />
      <path d="M0 590 L230 560 L420 590 L420 480 L1920 480 L1920 590 L1500 590 L1500 530 L420 530 L420 650 L0 650Z" fill={C.sand} stroke={C.cream} strokeWidth="5" />
      <path d="M450 520 H1870 V585 H450Z" fill="#7E9B59" />
      {Array.from({ length: 14 }, (_, i) => <path key={i} d={`M${520 + i * 95} 520 l-12 -45 m12 45 l15 -38`} stroke="#D9D99A" strokeWidth="5" />)}
      <path d="M0 640 H1920" stroke={C.gold} strokeWidth="5" />
      <g transform="translate(1300 180)">
        <path d="M0 300 V80 H210 V300Z" fill="#B86F51" stroke={C.ink} strokeWidth="8" />
        <path d="M-25 80 L105 0 L235 80" fill="#D9B58A" stroke={C.ink} strokeWidth="8" />
        <circle cx="105" cy="185" r="52" fill={C.cream} stroke={C.ink} strokeWidth="9" />
        <path d={`M105 185 L105 ${185 - 43}`} stroke={C.ink} strokeWidth="9" />
        <path d="M105 185 L145 205" stroke={C.ink} strokeWidth="9" />
        <path d="M0 300 H210" stroke={C.ink} strokeWidth="12" />
      </g>
      <path d="M1400 500 V620" stroke={C.gold} strokeWidth="8" strokeDasharray="14 12" />
      <path d="M1380 600 L1400 630 L1420 600" stroke={C.gold} strokeWidth="8" fill="none" />
      <Label x={1320} y={150} color={C.cream} size={20}>PUMPING STATION</Label>
      <Label x={500} y={445} color={C.cream} size={22}>RECLAIMED LAND</Label>
      <Label x={110} y={760} color={C.cream} size={24}>OUTSIDE WATER</Label>
      <Label x={110} y={800} color={C.cream} size={18}>Canal and drainage network</Label>
      <path d="M430 700 H950" stroke="#8AD2D9" strokeWidth="4" strokeDasharray="12 12" />
      <Label x={650} y={740} color={C.cream} size={21}>CONTROLLED WATER LEVEL</Label>
    </svg>
  </SceneFrame>;
};

const WaterManagement: React.FC = () => {
  const f = useCurrentFrame();
  const pulse = 1 + Math.sin(f / 12) * .08;
  return <SceneFrame chapter="A system that never stops working" number="05">
    <div style={{ position: "absolute", left: 100, top: 100 }}>
      <Eyebrow>04 — The water network</Eyebrow><Heading>Protection is<br />a team effort</Heading>
      <p style={{ color: C.cream, fontSize: 24, maxWidth: 570, lineHeight: 1.45 }}>Dikes, dunes, storm barriers, rivers, canals and pumping stations work together. Water management is a continuous national system.</p>
    </div>
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <path d="M0 650 Q250 600 500 650 T1000 650 T1500 650 T1920 650 V1080 H0Z" fill={C.water} />
      <path d="M0 625 Q300 560 620 625 L620 700 H0Z" fill={C.sand} />
      <path d="M620 625 Q1000 590 1320 625 T1920 625" stroke={C.gold} strokeWidth="10" fill="none" />
      <g transform="translate(820 260)">
        <rect x="0" y="160" width="660" height="260" rx="8" fill="#9A765E" stroke={C.cream} strokeWidth="6" />
        {Array.from({ length: 7 }, (_, i) => <g key={i} transform={`translate(${30 + i * 92} 0)`}>
          <rect x="0" y="160" width="62" height="260" fill="#C7B18B" stroke={C.ink} strokeWidth="5" />
          <path d="M0 160 L31 115 L62 160" fill="#D7C8A9" stroke={C.ink} strokeWidth="5" />
        </g>)}
        <rect x="250" y="45" width="160" height="115" fill="#B86F51" stroke={C.ink} strokeWidth="6" />
        <path d="M230 45 L330 -15 L430 45" fill={C.sand} stroke={C.ink} strokeWidth="6" />
        <circle cx="330" cy="100" r={50 * pulse} fill={C.gold} opacity=".25" />
        <circle cx="330" cy="100" r="32" fill={C.cream} stroke={C.ink} strokeWidth="5" />
        <path d="M330 100 L330 72 M330 100 L355 113" stroke={C.ink} strokeWidth="6" />
      </g>
      <path d="M120 590 Q300 500 500 590" stroke={C.cream} strokeWidth="8" fill="none" />
      <path d="M100 590 L130 555 L160 590" fill={C.cream} />
      <Label x={120} y={510} color={C.cream} size={23}>DUNES & DIKES</Label>
      <Label x={850} y={230} color={C.cream} size={22}>PUMPING STATION</Label>
      <Label x={1520} y={520} color={C.cream} size={22}>STORM BARRIER</Label>
      <path d="M1510 550 V650 M1560 550 V650 M1510 550 H1560" stroke={C.gold} strokeWidth="12" fill="none" />
      <path d="M1500 610 H1580" stroke={C.cream} strokeWidth="5" />
      <g fill="none" stroke="#8AD2D9" strokeWidth="4" strokeDasharray="12 10">
        <path d="M180 700 Q500 760 800 700 T1400 700 T1800 700" />
        <path d="M400 820 Q700 770 1000 820 T1600 820" />
      </g>
      <Label x={960} y={920} color={C.cream} size={24} anchor="middle">A CONNECTED NETWORK — NOT ONE GIANT WALL</Label>
    </svg>
  </SceneFrame>;
};

const Challenges: React.FC = () => {
  const f = useCurrentFrame();
  const rain = Array.from({ length: 28 }, (_, i) => {
    const x = (i * 83 + (f * 9) % 1920) % 1920;
    const y = (i * 47 + f * 15) % 540;
    return <path key={i} d={`M${x} ${y} l-12 34`} stroke="#A7D8DE" strokeWidth="4" opacity=".65" />;
  });
  return <SceneFrame chapter="The water challenge is changing" number="06">
    <div style={{ position: "absolute", left: 100, top: 90 }}>
      <Eyebrow>05 — The next challenge</Eyebrow><Heading>Even this system<br />faces new pressure</Heading>
    </div>
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <rect x="0" y="0" width="1920" height="1080" fill="#102C40" />
      <circle cx="1500" cy="230" r="115" fill={C.red} opacity=".75" />
      <path d="M0 600 Q400 550 800 600 T1600 600 T1920 600 V1080 H0Z" fill={C.earth} />
      <path d="M0 650 Q400 610 800 650 T1600 650 T1920 650" stroke={C.gold} strokeWidth="7" fill="none" />
      <path d="M0 680 Q400 630 800 680 T1600 680 T1920 680 V1080 H0Z" fill={C.water} opacity=".9" />
      {rain}
      <path d="M0 560 Q300 520 600 560 T1200 560 T1920 560" stroke="#8AD2D9" strokeWidth="5" fill="none" />
      <path d="M1250 570 V680 M1320 570 V680 M1390 570 V680" stroke={C.gold} strokeWidth="13" />
      <path d="M1220 570 H1420" stroke={C.gold} strokeWidth="13" />
      <path d="M250 900 Q450 850 650 900 T1050 900" stroke="#D5B28E" strokeWidth="8" fill="none" />
      <path d="M600 900 l30 -50 l30 50 M720 900 l30 -50 l30 50" stroke="#D5B28E" strokeWidth="7" fill="none" />
    </svg>
    <div style={{ position: "absolute", left: 100, right: 100, bottom: 150, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18 }}>
      {[
        ["01", "SEA-LEVEL RISE", "Higher water puts more pressure on coastal defenses."],
        ["02", "EXTREME RAIN", "Heavy downpours can overwhelm urban drainage."],
        ["03", "DROUGHT", "Dry periods can damage peat and foundations."],
        ["04", "SUBSIDENCE", "Soft ground can slowly sink as it dries and compacts."],
      ].map(([n, title, body]) => <div key={n} style={{ padding: 22, background: "rgba(4,17,29,.86)", borderTop: `3px solid ${C.gold}` }}>
        <div style={{ color: C.gold, fontSize: 17, letterSpacing: 3 }}>{n}</div>
        <div style={{ color: C.white, fontWeight: 800, fontSize: 22, marginTop: 10 }}>{title}</div>
        <div style={{ color: C.cream, fontSize: 17, lineHeight: 1.4, marginTop: 10 }}>{body}</div>
      </div>)}
    </div>
  </SceneFrame>;
};

const Conclusion: React.FC = () => {
  const f = useCurrentFrame();
  const scale = interpolate(f, [0, 360], [1.15, 1], clamp);
  return <SceneFrame chapter="A living relationship with water" number="07">
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#0A2639 0%,#17485A 60%,#C18D62 100%)" }} />
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", transform: `scale(${scale})` }}>
      <path d="M0 600 Q300 540 600 600 T1200 600 T1920 600 V1080 H0Z" fill={C.water} />
      <path d="M0 560 H1920" stroke={C.gold} strokeWidth="6" />
      <g transform="translate(450 330)" fill="none" stroke={C.cream} strokeWidth="9" opacity=".9">
        <path d="M0 180 L200 70 L400 180 L600 70 L800 180 L1000 70" />
        <path d="M0 180 V400 H1000 V180" />
        <path d="M100 400 V270 H260 V400 M390 400 V270 H550 V400 M680 400 V270 H840 V400" />
        <path d="M-60 180 H1060" stroke={C.gold} strokeWidth="15" />
      </g>
      <Water y={770} shift={f * 1.1} opacity={.8} />
    </svg>
    <div style={{ position: "absolute", top: 150, left: 0, right: 0, textAlign: "center" }}>
      <Eyebrow>Not a battle won once</Eyebrow>
      <div style={{ color: C.white, fontSize: 86, fontWeight: 900, lineHeight: 1.02, letterSpacing: -3, marginTop: 24 }}>THE NETHERLANDS<br />DOESN’T DEFEAT WATER.</div>
      <div style={{ color: C.gold, fontSize: 37, fontWeight: 700, marginTop: 28, letterSpacing: 2 }}>IT LEARNS TO LIVE WITH IT.</div>
      <div style={{ color: C.cream, fontSize: 22, marginTop: 42, letterSpacing: 2 }}>ENGINEERING · PLANNING · CONSTANT ADAPTATION</div>
    </div>
  </SceneFrame>;
};

const scenes = [
  { from: 0, duration: 360, component: Opening },
  { from: 360, duration: 390, component: Geography },
  { from: 750, duration: 540, component: Foundations },
  { from: 1290, duration: 510, component: Polders },
  { from: 1800, duration: 540, component: WaterManagement },
  { from: 2340, duration: 540, component: Challenges },
  { from: 2880, duration: 480, component: Conclusion },
] as const;

export const NetherlandsDocumentary: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: C.ink }}>
    {scenes.map(({ from, duration, component: Scene }, index) => (
      <Sequence key={index} from={from} durationInFrames={duration}>
        <Scene />
      </Sequence>
    ))}
  </AbsoluteFill>
);

export const MyComposition: React.FC = () => (
  <Composition
    id="NetherlandsDocumentary"
    component={NetherlandsDocumentary}
    durationInFrames={DURATION}
    fps={FPS}
    width={W}
    height={H}
  />
);

export const MyComponent = NetherlandsDocumentary;
