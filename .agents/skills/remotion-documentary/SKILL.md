---
name: remotion-documentary-production
description: Build, animate, review, and render reliable Remotion documentary scenes with frame-accurate motion graphics, readable typography, narration-led pacing, and visual QA. Use whenever editing this repository or any Remotion documentary/video composition.
---

# Remotion Documentary Production Skill

## Mission

Create documentary scenes that are visually intentional, narration-led, frame-accurate, readable at 1920x1080, deterministic across renders, and verifiably buildable.

This skill exists because a scene that compiles is not automatically a good scene. Never call a scene complete merely because JSX was committed. A scene is complete only after its layout, animation, timing, and render have been inspected.

## Project baseline

For this repository, inspect the actual code before editing. The current project baseline is:

- Remotion / React / TypeScript.
- Composition: `NetherlandsDocumentary`.
- Canvas: 1920x1080, 30 fps.
- Total documentary: 112 seconds / 3,360 frames.
- Existing scene order: Opening, Geography, Foundations, Polders, Water Management, Challenges, Conclusion.
- Current package baseline: Remotion 4.0.542. Keep `remotion`, `@remotion/cli`, and any installed `@remotion/*` packages on compatible, deliberately aligned versions. Do not copy an API from newer docs without checking that it exists in the installed version's TypeScript types.

Do not assume file paths, scene frame ranges, or package versions remain unchanged. Inspect `package.json`, `src/Root.tsx`, the composition registration, and the target scene before editing.

## Non-negotiable principles

1. **Narration leads the visuals.** Every important visual action must explain, illustrate, compare, or emphasize a line of narration. Decorative movement alone is not an animation plan.
2. **One scene, one focused change.** When asked to fix a scene, do not redesign unrelated scenes, change the composition ID, alter the master duration, or change the global visual identity unless explicitly requested.
3. **Frame-driven only.** Every animation must be a deterministic function of the current frame and composition configuration.
4. **Text is a foreground layer.** Headings, captions, callouts, and chapter markers must never be accidentally hidden behind water, diagrams, SVGs, or other visual layers.
5. **Design before code.** Define the scene's story beat, screen layout, text, visual hierarchy, motion, and timing before implementing JSX.
6. **Verify before claiming.** A GitHub commit is not a successful build, a Studio preview is not a final render, and a still frame does not prove that motion works.
7. **No silent factual invention.** Documentary claims, statistics, dates, engineering descriptions, maps, and labels must be supported by the approved research/script. Mark simplifications as simplified diagrams.

## Step-by-step workflow

### Step 1 — Inspect the project

Before changing code:

1. Read `package.json` and lockfile versions.
2. Read the Remotion entry point and registered `<Composition />`.
3. Read the target scene and any shared components/styles/data it uses.
4. Identify the target scene's global start frame, duration, FPS, and local frame range.
5. Run or inspect the current lint/type-check scripts when possible.
6. List existing assets and fonts. Do not assume a file exists because a README mentions it.

Deliver a short inspection summary before making a large refactor. Never replace a working file wholesale if a scoped patch is sufficient.

### Step 2 — Write the scene brief

For each scene, define:

- **Purpose:** what one idea should the viewer understand?
- **Narration:** exact approved voice-over text.
- **Duration:** seconds and frames.
- **Visual metaphor:** the main visual that makes the idea understandable.
- **Primary action:** the key thing that changes on screen.
- **Secondary motion:** 1–3 supporting movements.
- **Typography:** exact headline, body, labels, and their placement.
- **Transition:** how the scene enters and exits.
- **Facts to verify:** claims, labels, units, and diagram assumptions.

A useful scene is not a list of objects. It is a sequence of visual explanations.

### Step 3 — Create a beat sheet before JSX

Split each scene into 3–5 beats. A default 18-second scene at 30 fps has 540 frames, but use the actual timeline.

Example beat sheet:

| Beat | Time | Frames at 30 fps | Narration purpose | Visual action |
| --- | ---: | ---: | --- | --- |
| Establish | 0–3 s | 0–89 | Introduce the question | Wide composition, restrained camera move |
| Explain | 3–8 s | 90–239 | Explain the mechanism | Main diagram assembles or reveals |
| Compare | 8–13 s | 240–389 | Make a difference visible | Labels, measuring line, data callout |
| Resolve | 13–18 s | 390–539 | State the takeaway | Diagram resolves, key phrase lands |

The exact durations should follow the narration. Do not force every scene into the same rhythm.

### Step 4 — Draw a layout map

Before writing animation code, allocate screen zones.

For a 1920x1080 documentary frame, use these as starting heuristics, not hard rules:

- Keep essential content inside a 5% outer safe margin (about 96 px).
- Reserve a deliberate title zone, usually in the upper 20–35% of the frame.
- Reserve a separate diagram/action zone.
- Reserve a caption/lower-third zone above the footer.
- Keep the chapter/footer system consistent from scene to scene.
- Do not place body copy over a visually busy area unless a sufficiently opaque backing panel is used.
- Use a contrast check for every text-on-background pairing.
- Design at full 1920x1080, then inspect the composition scaled down as a viewer would see it.

For typography, start with a clear hierarchy: one dominant headline, one supporting sentence, and only the labels needed to read the diagram. Avoid multiple competing headlines.

### Step 5 — Plan motion graphics, not just moving backgrounds

Every scene must include movement with a narrative job.

Minimum motion plan for a typical documentary scene:

- **Primary motion:** the mechanism or subject changes (e.g. a cross-section is revealed, a pump activates, a foundation pile descends).
- **Typography motion:** the title, key phrase, or label is revealed in a deliberate order.
- **Secondary motion:** contextual movement (water, clouds, particles, camera drift, indicator pulse, moving pointer, or environmental detail).

At least one primary or typography action must be clearly visible. If only waves/particles move while the main diagram and typography stay static, the scene is not done.

Use deliberate staging:
1. Establish the space.
2. Reveal the subject.
3. Animate the mechanism.
4. Add labels/callouts only when the viewer needs them.
5. Resolve on a clean, readable takeaway.

Do not animate every object at once. Motion should direct attention, not compete for it.

### Step 6 — Implement with Remotion's frame model

Use Remotion's timing APIs rather than wall-clock animation.

Recommended pattern:

```tsx
import {
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const frame = useCurrentFrame();
const { fps, durationInFrames } = useVideoConfig();

const reveal = interpolate(frame, [0, 36], [0, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
});

const titleIn = spring({
  frame: frame - 12,
  fps,
  config: { damping: 20, stiffness: 90 },
});
```

Rules:

- Use `useCurrentFrame()` for time. Frames are zero-indexed.
- Use `useVideoConfig()` for `fps`, `width`, `height`, and `durationInFrames`.
- Pass the composition FPS to `spring()`; do not hardcode an assumed FPS inside reusable animation components.
- Use `interpolate()` with explicit `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"` for bounded effects such as opacity, scale, progress bars, and reveals.
- Use `spring()` for physical/soft entrances and overshoot where appropriate; use `interpolate()` for controlled, exact motion.
- Stagger typography with distinct frame offsets. Do not animate a whole paragraph as one indivisible block if the story benefits from line-by-line reveals.
- Calculate seconds-to-frames with `Math.round(seconds * fps)`; centralize timeline constants rather than scattering magic numbers.
- Remember that `useCurrentFrame()` inside a `<Sequence>` is relative to that sequence's start. Do not accidentally mix local frames with global timeline frames.
- Use the last valid frame `durationInFrames - 1`, not `durationInFrames`, when sampling the final frame.
- Give every mapped React element a stable `key`.

### Step 7 — Build explicit visual layers

Use a predictable layer order. Example:

1. Background / atmosphere.
2. Distant environment.
3. Main subject or diagram.
4. Foreground details.
5. Diagram labels / pointers.
6. Headline and narration callouts.
7. Captions, chapter label, footer, and progress indicator.

Implementation rules:

- Use a root `<AbsoluteFill>` or equivalent full-canvas wrapper.
- Use a single documented composition coordinate system. For SVG, the `viewBox` should match the composition coordinate system (1920x1080 for this project).
- Keep SVG artwork and HTML typography in clearly separate layers where practical.
- Set explicit positioning and `zIndex` values for overlays. Do not rely on accidental DOM ordering.
- A full-frame SVG must not cover text that is meant to sit above it. Put the text layer after the SVG and give it a documented z-index.
- Use unique SVG IDs for gradients, masks, filters, and clip paths. Duplicate IDs across scenes can point to the wrong definition.
- Verify every `clipPath`, mask, gradient, path, and transform at the frames where it is revealed.
- Do not let a diagram label sit on top of an unrelated layer or use low-contrast colors.
- If text is inside SVG, verify its font, baseline, anchor, line spacing, and clipping at render resolution.

### Step 8 — Make typography safe and intentional

- Write the final copy before choosing font size and line breaks.
- Set a maximum text box width; do not use a fixed font size without checking the longest string.
- Keep important words away from the edge of the frame and from the scene's moving focal point.
- Avoid headings colliding with roofs, charts, waves, map labels, or other content.
- Use line-by-line masks/containers when revealing headlines so text does not slide through neighboring objects.
- Do not reveal text before its background/contrast treatment exists.
- Use the same font family and weights consistently. If using custom fonts, follow the official font-loading guide and verify the font in a rendered still.
- Avoid tiny labels. If a label is not readable at normal playback size, simplify it or remove it.
- Always render at least one still after the final font/layout change. Studio zoom alone can hide a bad full-resolution wrap.

### Step 9 — Keep all animation deterministic

Remotion can render frames in parallel and re-render the page. The same frame must produce the same result.

Allowed:
- `useCurrentFrame()`, `interpolate()`, `spring()`.
- Deterministic calculations from frame, props, and video config.
- `random(seed)` from Remotion for repeatable pseudo-random layouts.

Do not use:
- `Math.random()` for visual positions or particle states.
- `Date.now()`, `performance.now()`, timers, intervals, or wall-clock time to drive animation.
- Browser scroll position, user interaction state, or viewport size as the timeline clock.
- Unseeded live API calls or external data that can change between frames/renders.
- CSS `animation` or `transition` as the source of timeline timing. Prefer Remotion frame-driven styles.

If a visual effect needs randomness, derive it from stable seeds and stable item IDs. If a scene needs live data, freeze the data as a versioned project input before rendering.

### Step 10 — Handle assets, fonts, and audio deliberately

- Put local visual/audio assets in `public/` and reference them with `staticFile()` where the selected Remotion component expects a public asset path.
- Check file existence, extension, and case before referencing an asset.
- Avoid depending on remote resources that may fail or change during rendering. Prefer local, licensed, versioned assets.
- Follow the official Remotion font-loading guide. Do not assume a font installed on the developer's machine exists on the render machine.
- For new projects on supported versions, check the official `@remotion/media` documentation for `<Audio>` and `<Video>`; do not add packages without confirming version compatibility.
- Keep narration, music, ambience, and sound effects on intentional timeline positions. Avoid accidentally starting every audio layer at frame 0.
- Check gain, clipping, fades, and voice/music balance. Silence is acceptable only when explicitly intended.
- Never fabricate an audio filename or mark audio complete when the file has not been supplied.

### Step 11 — Manage the scene timeline safely

- Keep a single source of truth for scene start frames and durations.
- Check that all scene ranges are positive, ordered, and cover the intended composition duration.
- Avoid off-by-one errors: if a scene starts at frame `from` and lasts `durationInFrames`, its final included frame is `from + durationInFrames - 1`.
- For hard cuts, `<Sequence from={...} durationInFrames={...}>` is sufficient.
- If using `<TransitionSeries>`, account for overlap: transitions shorten the total timeline. Do not reuse hard-cut start frames without recalculating the overall duration.
- Respect transition rules from the official docs: no transition longer than either adjacent sequence, no adjacent transitions/overlays, and valid neighboring sequences.
- Never add a transition package or change the timing architecture casually. Inspect the installed version and update all related package versions deliberately.

### Step 12 — Validate in increasing cost order

Run checks after each scene change, not only at the end.

1. **Static check:** inspect JSX/TSX, keys, IDs, imports, missing assets, frame ranges, and text bounds.
2. **Type/lint:** run the project's scripts (currently `npm run lint`, if still defined).
3. **Studio preview:** scrub through the whole scene, not just the first frame.
4. **Still-frame QA:** render representative frames:
   - first frame;
   - title fully entered;
   - primary motion halfway;
   - each major callout;
   - final frame;
   - one frame before and after any timing boundary.
5. **Motion QA:** play the scene at real speed. Confirm that non-background elements animate and that text does not flicker, jump, or disappear.
6. **Short/full render:** render the scene in context, then render the full composition when the scene is approved.
7. **Playback QA:** inspect the exported file from beginning to end, check audio sync and the final frame.

Useful commands (adapt the entry point and composition ID to the repository):

```bash
npm install
npm run dev
npm run lint
npm run build

# Render representative still frames (frame numbers are global composition frames).
npx remotion still NetherlandsDocumentary out/scene-02-start.png --frame=360
npx remotion still NetherlandsDocumentary out/scene-02-middle.png --frame=555
npx remotion still NetherlandsDocumentary out/scene-02-end.png --frame=749

# Final render only after visual approval.
npx remotion render NetherlandsDocumentary out/netherlands-documentary.mp4
```

If the CLI requires an explicit entry point in the local setup, include the repository's Remotion entry file (for this repository, inspect whether `src/index.ts` is the configured entry point). Do not assume a CLI command succeeded unless its exit code and output confirm it.

### Step 13 — Report status honestly

For every scene, report separately:

- Code committed? (yes/no, commit SHA).
- TypeScript/lint passed? (yes/no/not run).
- Still frames rendered and inspected? (list frames).
- Studio playback inspected? (yes/no).
- Final render completed? (yes/no).
- Remaining visual or factual issues.

Never say "bug-free", "rendered successfully", or "tested" based only on a successful GitHub commit or source inspection.

## DO — quality rules

- Do create a beat sheet tied to narration before implementation.
- Do establish a screen layout and safe zones before adding SVG paths.
- Do keep a clear foreground/background layering contract.
- Do animate text and the actual subject/mechanism, not just decorative water or particles.
- Do use frame-driven motion and deterministic values.
- Do derive animation values from `useCurrentFrame()` and `useVideoConfig()`.
- Do clamp bounded interpolations.
- Do keep timeline constants centralized and verify the last included frame.
- Do preview the start, middle, end, and key transitions.
- Do render stills after typography, font, or layout changes.
- Do inspect the final exported MP4, not just the Studio preview.
- Do update documentation when timing, scene structure, assets, or commands change.

## DON'T — bug patterns to avoid

- Don't put a large headline in the same area as a skyline, diagram, or water surface.
- Don't draw water after the title in a way that covers it.
- Don't let an SVG overlay silently sit above HTML title layers; define explicit z-index/layer order.
- Don't make "animation" mean only a moving water wave, particle, or camera drift.
- Don't render a full diagram and all labels at frame 0 if the narration calls for a staged explanation.
- Don't put the whole narration in one dense paragraph on screen.
- Don't use small, low-contrast labels that only look readable when zoomed in.
- Don't hardcode arbitrary end frames such as 540 inside a reusable scene wrapper without checking that scene's actual duration.
- Don't mix global frame numbers and sequence-local frame numbers.
- Don't use `Math.random()` or wall-clock time for rendered visuals.
- Don't trust a still frame to prove animation works.
- Don't start another scene before the current one has passed visual review when the workflow is scene-by-scene.
- Don't rewrite unrelated scenes or merge directly into `main` during iterative visual work.
- Don't claim a render, lint, or type-check passed if it was not run.

## Required scene handoff template

When finishing a scene, provide:

1. **What changed:** layout, narrative, visual, and motion.
2. **Motion timeline:** frame/time ranges and what enters/moves/exits.
3. **Verification:** commands actually run and their result.
4. **Known limitations:** missing assets/audio, untested render, or remaining overflow.
5. **Preview request:** exact global frame numbers or scene interval for the user to inspect.

## Prompt template for an AI coding agent

Use this prompt when asking an agent to implement a scene:

> Follow `.agents/skills/remotion-documentary/SKILL.md` strictly. First inspect the existing composition, target scene, package versions, timeline, shared styles, and assets. Do not edit files until you have identified the scene start frame, duration, and local frame range.
>
> Implement only scene **[SCENE NUMBER / NAME]**. Use this approved narration: **[NARRATION]**.
>
> Before coding, produce a beat sheet with 3–5 beats, a layout map, and an animation plan. The scene must have a clear primary visual action, kinetic typography, and supporting motion that illustrates the narration. Keep titles readable and separate from diagrams/water/backgrounds. Use deterministic frame-driven Remotion animation.
>
> Preserve composition dimensions, FPS, duration, existing scene order, and unrelated scenes. Use installed Remotion APIs only. Add no package unless necessary and version-compatible.
>
> After coding, run lint/type-check, render stills at the scene start, title settle, every major beat, and final frame, then inspect the motion in Remotion Studio. Report exactly what was and was not tested. Do not claim success without evidence.

## Official Remotion documentation

Use the official documentation as the source of truth. Read the page relevant to the API being changed; documentation can evolve, so confirm that the API exists in the installed project version.

- [Remotion documentation home](https://www.remotion.dev/docs/)
- [The core idea and frame model](https://www.remotion.dev/docs/idea)
- [`useCurrentFrame()`](https://www.remotion.dev/docs/use-current-frame)
- [`useVideoConfig()`](https://www.remotion.dev/docs/use-video-config)
- [`interpolate()`](https://www.remotion.dev/docs/interpolate)
- [`spring()`](https://www.remotion.dev/docs/spring)
- [`<Sequence>`](https://www.remotion.dev/docs/sequence)
- [Composition](https://www.remotion.dev/docs/composition)
- [Transitions and `<TransitionSeries>`](https://www.remotion.dev/docs/transitions/transitionseries)
- [Using fonts](https://www.remotion.dev/docs/fonts)
- [Video and Audio](https://www.remotion.dev/docs/video-and-audio)
- [`<Audio>`](https://www.remotion.dev/docs/media/audio)
- [Still images and frame inspection](https://www.remotion.dev/docs/stills)
- [Render your video](https://www.remotion.dev/docs/render)
- [Deterministic `random()`](https://www.remotion.dev/docs/random)
