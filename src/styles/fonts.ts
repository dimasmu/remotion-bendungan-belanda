import { continueRender, delayRender, staticFile } from "remotion";

// Local WOFF2 files (SIL OFL). Loaded once before the first frame renders.
// If a file is missing, the fallback stack in palette.ts is used.
const faces = [
  { family: "Space Grotesk", file: "fonts/space-grotesk-latin.woff2", weight: "300 700" },
  { family: "IBM Plex Mono", file: "fonts/ibm-plex-mono-400.woff2", weight: "400" },
  { family: "IBM Plex Mono", file: "fonts/ibm-plex-mono-500.woff2", weight: "500" },
];

const handle = delayRender("Loading Enigma fonts");

Promise.all(
  faces.map(async (f) => {
    const face = new FontFace(f.family, `url(${staticFile(f.file)}) format('woff2')`, {
      weight: f.weight,
      style: "normal",
    });
    await face.load();
    document.fonts.add(face);
  }),
)
  .then(() => continueRender(handle))
  .catch((err) => {
    // Do not hang the render: fall back to the system stack.
    console.warn("Font load failed, using fallback stack:", err);
    continueRender(handle);
  });

export {};
