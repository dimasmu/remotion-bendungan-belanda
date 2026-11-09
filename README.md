# Template Remotion

Reusable Remotion boilerplate for documentary, explainer and motion-graphics video projects.

This repository intentionally contains no finished documentary or topic-specific footage. Start every video through the production workflow in `AGENTS.md` and `.agents/skills/remotion-documentary/`.

## What's included

- Remotion starter composition (1920×1080, 30 fps, 10-second placeholder).
- TypeScript, ESLint and Prettier configuration.
- Documentary production skill and references.
- Platform presets for YouTube, Shorts, Instagram and Facebook.
- Content idea catalog, visual-style library and character/object model guide.
- Image-generation prompt workflow and reference/production asset folder conventions.
- Production brief and timecoded scene-breakdown templates.

## Quick start

Requirements: Node.js version supported by the `engines` field in `package.json`.

```bash
npm install
npm run dev
```

Open Remotion Studio and select `BoilerplateVideo`.

## Build and render

```bash
npm run lint
npm run build
npm run render
```

The default render command writes `out/video.mp4`. Change the composition ID and output path when starting a new production.

## Start a new video

1. Open this repository in your coding agent from the repository root.
2. Invoke `@remotion-documentary`.
3. Follow `AGENTS.md` and the skill's intake workflow: choose content idea, platform/duration, ratio/resolution, visual style, character/object references, research/script, timecoded narration, storyboard, implementation and QA.
4. Store project-specific documents in `project/`.
5. Store approved render-ready assets in `public/assets/`.
6. Work on a separate project branch; do not commit topic-specific work to the reusable boilerplate branch.

## Recommended project structure

```text
project/
  production/
  research/
  script/
  style/
  characters/
  objects/
  assets/
    references/
    generated/
  qa/

public/
  assets/
    characters/
    objects/
    backgrounds/
    illustrations/
    images/
    audio/
    fonts/
    video/

src/
  components/
  compositions/
  scenes/
  data/
  styles/
```

Reference images/model sheets belong in `project/assets/references/`. Only approved images actually used by the video belong in `public/assets/`.

## Production skill

Start here:
- `.agents/skills/remotion-documentary/SKILL.md`
- `.agents/skills/remotion-documentary/references/`
- `.agents/skills/remotion-documentary/templates/`

## Notes

- The starter composition is a placeholder, not a finished video.
- Do not assume a scene passed QA until it has been type-checked, visually inspected in Studio, and rendered.
- Keep installed Remotion packages version-aligned.
