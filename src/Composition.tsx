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
const fade = (f: number, length = 24) =>
  interpolate(f, [0, length, 9999 - length, 9999], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
  const zoom = interpolate(f, [0, 360], [1.12, 1], clamp);
  const rise = spring({ frame: f - 45, fps, config: { damping: 18 } });
  return <SceneFrame chapter="A country shaped by water" number="01">
    <AbsoluteFill style={{ background: "linear-gradient(180deg,#102F43 0%,#31596A 55%,#D5A779 100%)" }} />
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", width: "100%", height: "100%", transform: `scale(${zoom})` }}>
      <circle cx="1510" cy="210" r="90" fill={C.gold} opacity=".8" />
      <path d="M0 500 Q500 420 950 490 T1920 450 V1080 H0Z" fill="#24485A" />
      <Skyline />
      <Water y={770} shift={f * 1.2} />
      <path d="M0 770 Q450 740 960 770 T1920 770" fill="none" stroke={C.cream} strokeWidth="5" opacity=".7" />
    </svg>
    <div style={{ position: "absolute", left: 112, top: 150, opacity: rise, transform: `translateY(${(1 - rise) * 35}px)` }}>
      <Eyebrow>Engineering a nation</Eyebrow>
      <Heading size={92}>WHY DOESN’T<br />THE NETHERLANDS<br />SINK?</Heading>
      <div style={{ color: C.cream, fontSize: 27, marginTop: 28, letterSpacing: 2 }}>THE COUNTRY THAT LEARNED TO LIVE WITH WATER</div>
    </div>
    <div style={{ position: "absolute", right: 115, bottom: 145, color: C.white, fontSize: 18, letterSpacing: 3 }}>NORTH SEA · WESTERN EUROPE</div>
  </SceneFrame>;
};

const Geography: React.FC = () => {
  const f = useCurrentFrame();
  const reveal = interpolate(f, [30, 100], [0, 1], clamp);
  return <SceneFrame chapter="A landscape below sea level" number="02">
    <div style={{ position: "absolute", left: 100, top: 110 }}>
      <Eyebrow>01 — The geography</Eyebrow><Heading>Living below<br />the waterline</Heading>
      <p style={{ color: C.cream, fontSize: 25, maxWidth: 610, lineHeight: 1.5 }}>Large parts of the Netherlands sit at or below sea level. The ground is low, soft and shaped by centuries of water.</p>
    </div>
    <svg viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs><clipPath id="groundReveal"><rect x="0" y={520} width={1920 * reveal} height="560" /></clipPath></defs>
      <path d="M0 550 Q350 520 680 550 T1300 540 T1920 550 V1080 H0Z" fill={C.sand} />
      <g clipPath="url(#groundReveal)">
        <path d="M0 650 Q500 600 1000 660 T1920 630 V1080 H0Z" fill={C.clay} />
        <path d="M0 790 Q500 740 1000 800 T1920 770 V1080 H0Z" fill={C.peat} />
        <path d="M0 920 Q500 880 1000 930 T1920 900 V1080 H0Z" fill="#55483F" />
        {Array.from({ length: 35 }, (_, i) => <path key={i} d={`M${i * 62} 680 q35 22 70 0`} stroke="#D8B18A" strokeWidth="5" fill="none" opacity=".4" />)}
      </g>
      <path d="M0 520 H1920" stroke={C.gold} strokeWidth="5" strokeDasharray="16 12" />
      <path d="M0 430 H1920" stroke="#5DB9C6" strokeWidth="4" />
      <Label x={120} y={405} color="#8AD2D9" size={24}>SEA LEVEL</Label>
      <Label x={120} y={505} color={C.ink} size={22}>LOW-LYING LAND</Label>
      <path d="M1450 430 V520" stroke={C.gold} strokeWidth="3" />
      <path d="M1437 440 L1450 425 L1463 440" stroke={C.gold} strokeWidth="3" fill="none" />
      <Label x={1490} y={475} color={C.cream} size={22}>Below sea level</Label>
      <path d="M0 520 Q320 480 650 520 T1300 520 T1920 520 V560 H0Z" fill="#4B8B86" opacity=".65" />
      <Water y={350} shift={f * 1.5} opacity={.9} />
    </svg>
    <div style={{ position: "absolute", right: 110, top: 140, width: 420, padding: 28, background: "rgba(4,17,29,.82)", borderLeft: `4px solid ${C.gold}` }}>
      <div style={{ color: C.gold, fontSize: 17, letterSpacing: 3 }}>THE CHALLENGE</div>
      <div style={{ color: C.white, fontSize: 27, lineHeight: 1.35, marginTop: 12 }}>Keep the sea out. Keep the land dry. Keep the ground stable.</div>
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
