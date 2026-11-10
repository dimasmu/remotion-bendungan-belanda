# Template Remotion

Reusable Remotion boilerplate for documentary, explainer and motion-graphics video projects.

This repository intentionally contains no finished documentary or topic-specific footage. Start every video through the production workflow in `AGENTS.md` and `.agents/skills/remotion-documentary/`.

## What's included

- Remotion starter composition (1920×1080, 30 fps, 10-second placeholder).
- TypeScript, ESLint and Prettier configuration.
- Documentary production skill and references.
- Platform presets for YouTube, Shorts, Instagram and Facebook.
- Content idea catalog, the 10-style reference-based visual library, and character/object model guide.
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

## New video workflow and branch policy

**Do not build an individual video directly on `feat/template-remotion`.** That branch is the clean, reusable boilerplate.

1. Start by planning the video. Follow the intake workflow in `AGENTS.md` and the production skill: topic, platform/duration, aspect ratio/resolution, visual style, character/object direction, research/narration, timecoded breakdown, and storyboard.
2. Get the user's approval of the complete plan before creating a project branch.
3. When the user approves moving into build/implementation, create a new branch from the latest `feat/template-remotion`.
4. Name the branch `feat/<video-title-slug>` using lowercase kebab-case. Example: `feat/why-netherlands-does-not-sink`.
5. Do all video-specific code, compositions, scenes, scripts, research documents, assets, and build changes on that project branch.
6. Keep `feat/template-remotion` generic. Only reusable boilerplate improvements belong there.
7. Do not overwrite an existing project branch or merge any project branch into the boilerplate or `main` without explicit user approval.

The expected branch flow is:

```text
feat/template-remotion
  └── feat/<video-title-slug>
        └── all implementation, iteration, and QA for that video
```

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

Google Flow is used for image generation, revisions and approval. Export only approved final assets into `public/assets/<category>/`.

## Production skill

Start here:
- `.agents/skills/remotion-documentary/SKILL.md`
- `.agents/skills/remotion-documentary/references/`
- `.agents/skills/remotion-documentary/templates/`

## Notes

- The starter composition is a placeholder, not a finished video.
- Do not assume a scene passed QA until it has been type-checked, visually inspected in Studio, and rendered.
- Keep installed Remotion packages version-aligned.
