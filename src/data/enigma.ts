// Single source of truth for the 60-second Enigma Shorts timeline.
// Frames are global, half-open [from, from + durationInFrames) at 30 fps.
export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION_IN_FRAMES = 1800;

// Safe-area layout (see project/style/STYLE_GUIDE.md).
export const SAFE = {
  left: 72,
  right: 1008,
  top: 160,
  bottom: 1400,
  titleTop: 220,
  titleBottom: 560,
  diagramTop: 560,
  diagramBottom: 1200,
  captionTop: 1230,
  captionBottom: 1370,
} as const;

export const SCENES = [
  { id: "S1", name: "Hook", from: 0, durationInFrames: 210 },
  { id: "S2", name: "Angka", from: 210, durationInFrames: 300 },
  { id: "S3", name: "Jalur sinyal", from: 510, durationInFrames: 330 },
  { id: "S4", name: "Kelemahan", from: 840, durationInFrames: 330 },
  { id: "S5", name: "Bombe", from: 1170, durationInFrames: 270 },
  { id: "S6", name: "Linimasa", from: 1440, durationInFrames: 180 },
  { id: "S7", name: "Penutup", from: 1620, durationInFrames: 180 },
] as const;

export type SceneId = (typeof SCENES)[number]["id"];

export const sceneOf = (id: SceneId) => {
  const s = SCENES.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown scene ${id}`);
  return s;
};

// Guard: scenes must be contiguous and cover the full duration.
const covered = SCENES.reduce((end, s) => {
  if (s.from !== end) throw new Error(`Scene ${s.id} starts at ${s.from}, expected ${end}`);
  return end + s.durationInFrames;
}, 0);
if (covered !== DURATION_IN_FRAMES) {
  throw new Error(`Scenes cover ${covered} frames, expected ${DURATION_IN_FRAMES}`);
}
