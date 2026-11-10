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


---

# Project Intake Wizard and Production Architecture

This section extends the original production workflow. It is mandatory for every new video project. The workflow is intentionally separated into content, visual design, character design, and Remotion execution so that the agent does not mix story decisions with art direction or code.

## Required order: choose the idea first

The user asked that idea selection be step one. Follow this order exactly unless the user explicitly asks to skip a stage.

### Stage 1 — Choose the content idea

Read and use:

- references/CONTENT_IDEA_CATALOG.md

Offer content pillars, then 5–10 concrete topic ideas in the selected pillar. Example categories:

1. History and historical events.
2. How a thing, object or infrastructure is made.
3. Inventions and discoveries (for example, how the light bulb evolved).
4. Hidden infrastructure and engineering systems.
5. Everyday objects and how they work.
6. Science, nature and the planet.
7. Civilizations, architecture and engineering.
8. War, strategy and military history.

For each idea, give the working title, central question, visual potential, likely story arc and factual research risks. Ask the user to choose one. Do not write the final script, design the character or implement a scene before topic approval.

### Stage 2 — Select platform and desired duration

Read:

- references/PLATFORM_PRESETS.md

Ask where the content will be published. Offer the matching destination template and duration choices. The user must select or confirm the duration; the agent must never silently assume it.

Examples:

- YouTube long-form: 6 / 8 / 10 / 12 / 15 / 20 / 30 minutes or custom.
- YouTube Shorts: 30 / 45 / 60 / 90 / 120 / 180 seconds.
- Instagram Reels: 15 / 30 / 45 / 60 / 90 / 180 seconds.
- Facebook Reels: 30 / 60 / 90 / 180 seconds, 5 minutes or custom.
- Instagram Feed: portrait 4:5 or square 1:1; ask which one if not clear.

These are practical creative presets, not guaranteed platform maximums. Re-check official publishing rules before upload.

### Stage 3 — Set aspect ratio and auto-resolution

Once destination is known, preselect its standard aspect ratio and resolution from PLATFORM_PRESETS.md. Tell the user what will be used and allow an override.

Default mappings:
- Vertical 9:16 => 1080 × 1920.
- Horizontal 16:9 => 1920 × 1080.
- Portrait feed 4:5 => 1080 × 1350.
- Square 1:1 => 1080 × 1080.

Set social FPS to 30 unless the user chooses otherwise. Calculate durationInFrames from duration × FPS. Keep metadata in one configuration object. If a composition must be selectable by props, study the installed Remotion version and use Composition defaultProps / calculateMetadata() where appropriate. Do not just change the canvas size while leaving scene coordinates and typography hardcoded for the old aspect ratio.

For multiple destinations, make deliberate layout variants. A vertical version is not a stretched or center-cropped horizontal version.

### Stage 4 — Select visual style / model

Read:

- references/VISUAL_STYLE_LIBRARY.md

Show the user the available style IDs, explain what each looks like, and request a selection or custom reference. The style library is about art direction, not the AI provider/tool model.

Do not force a stickman style because an older project used it. The current project must follow the newly selected style.

Create a project-level STYLE_GUIDE.md after approval. Include palette, typography, shape language, line weight, materials, camera, lighting, background detail, movement language, consistency rules and forbidden deviations. Produce a style test frame and a short motion test before building many scenes.

### Stage 5 — Design characters and objects separately

If the style needs recurring characters, read:

- references/CHARACTER_MODEL_GUIDE.md

Character creation is its own deliverable, not part of the scriptwriting step. Create a character brief and model sheet (front, three-quarter, side, back, expressions, poses, colors, props, proportions), then wait for approval. Keep a character registry with stable IDs. The script must refer to IDs; it must not redefine character appearance in every scene.

For non-character documentaries, create object model sheets for important machines, buildings, mechanisms and recurring places. An engineering explainer needs consistent pumps, dikes, gates, buildings and diagrams even if it has no characters.

Do not use the character-model guide to invent historical facts or to write content. Do not use the content script as the canonical character design.

### Stage 6 — Research, then script

Create a research brief using credible sources. Separate established facts, contested claims, approximations and artistic simplifications. Cite important claims. Then write the full narration in the selected language and tone.

Do not use an illustrative example or a generated image as a factual source. For complex invention histories, avoid the “single inventor” simplification unless research supports it.

### Stage 7 — Break the narration into 1–5 second beats

Read:

- templates/SCENE_BREAKDOWN_TEMPLATE.md

First define macro scenes / chapters. Then break each macro scene into short timecoded beats, typically 1–5 seconds. Example:
- 00:00–00:05 — exact narration line, visual action, text animation and sound cue.
- 00:05–00:10 — next narration line, next action and transition.
- 00:10–00:15 — next beat.

For every beat, provide:
- Global timecode in/out.
- Global frame in/out.
- Exact voice-over words.
- Approximate word count and target delivery time.
- On-screen text (short phrase, not a copy of the whole narration).
- Visual/action.
- Primary motion graphics.
- Typography animation.
- Secondary movement.
- Camera movement.
- Music/ambience/SFX cues.
- Asset IDs.
- Continuity and QA notes.

Each narration beat should be recordable as an individual audio clip. Use stable filenames such as VO_001_000-005.wav. A 5-second beat is a planning unit, not a command to rush the voice actor. If a line does not fit naturally, rewrite it or extend the beat and recalculate subsequent timecodes.

Do not create a separate React component for every 5-second beat by default. Beats can live inside a larger macro-scene component and use frame-based animation.

### Stage 8 — Storyboard and motion plan

Create a shot list or storyboard matching the timecoded beats. Identify where every asset appears, how it moves, where the camera goes, how text enters, and what the viewer should notice. Approve the storyboard before implementation.

### Stage 9 — Remotion implementation and QA

Use the original step-by-step workflow in this skill. Implement only approved scenes, use frame-driven and deterministic animation, preserve the project metadata unless explicitly changed, and follow the full QA gate.

## New-project files

Use these separate files rather than placing everything in one enormous prompt:

- references/CONTENT_IDEA_CATALOG.md — subject ideas and research framing.
- references/PLATFORM_PRESETS.md — destinations, duration choices, resolution and export presets.
- references/VISUAL_STYLE_LIBRARY.md — art-direction/model choices.
- references/CHARACTER_MODEL_GUIDE.md — character and object model sheets.
- templates/PRODUCTION_BRIEF_TEMPLATE.md — approved production configuration.
- templates/SCENE_BREAKDOWN_TEMPLATE.md — timecoded narration and visual beat handoff.
- project/research/RESEARCH_BRIEF.md — factual research and sources.
- project/script/VOICEOVER_SCRIPT.md — approved continuous narration.
- project/script/SCENE_BREAKDOWN.md — timecoded 1–5 second beats.
- project/style/STYLE_GUIDE.md — approved art direction.
- project/characters/CHARACTER_REGISTRY.md — stable character IDs.
- project/assets/ASSET_REGISTRY.md — asset names, sources, licenses and usage.
- project/qa/SCENE_QA.md — rendered frames, review notes, test status.

Do not put style/character instructions into the voice-over document. Do not put narration/factual claims in the model sheet. Keep all documents linked through stable scene, beat, character and asset IDs.

## Additional advanced requirements

- **Research traceability:** important factual claims map to source references.
- **Narration-first timing:** voice recording duration is authoritative; update animation timing to audio, not the other way around.
- **Asset licensing:** record origin, creator, license, attribution requirement and usage restrictions for every external asset.
- **Caption deliverable:** prepare subtitles/captions in addition to burned-in graphics when the platform or workflow needs them.
- **Multi-platform composition:** build safe areas and responsive layouts for each aspect ratio.
- **Versioning:** version the production brief, style guide, character sheets and approved script. Do not overwrite an approved design silently.
- **Approval gates:** topic → format/duration → style and palette → research/script → timecoded breakdown → storyboard and dynamic asset inventory → final asset approval in Google Flow → scene implementation → render QA.
- **Production status:** report code committed, lint/typecheck, still renders, Studio playback, final MP4 render and full playback as separate statuses.

## Agent behavior

The agent should not dump every choice at once. Ask one short question, record the answer, then proceed to the next stage. At each approval gate, show the user the decision in a compact summary and ask for approval before expensive downstream work. If the user asks to “surprise me” or “choose for me”, provide a recommendation and clearly mark it as an assumption for confirmation.


---

# Image Generation Prompt and Reference Asset Workflow

This is mandatory after style selection and character/object approval. Read \`references/IMAGE_GENERATION_WORKFLOW.md\`.

- Give the user ready-to-copy image prompts; do not silently generate images unless the user explicitly requests image generation.
- Generate a Style Board Prompt and Style Test Frame Prompt after style approval.
- Generate a Character Turnaround, Expression Sheet and Action Pose prompt after the character brief is approved.
- Keep style, character and object reference images separate from Remotion render assets.
- Character model sheets and iterations remain in Google Flow; they are optional references, not required repository files.
- Approved final character exports: \`public/assets/characters/\`.
- Object references and revisions remain in Google Flow.
- Approved final object exports: \`public/assets/objects/\`.
- Keep the full prompts, versions, approval status and asset registry in the project.

Do not code a recurring character before its model sheet is approved. Do not use an unapproved prompt-generation experiment in the final composition.


---

# Git Branch Isolation for New Video Projects

This repository is a reusable boilerplate, not the working branch for individual videos.

## Branch roles

- **Boilerplate source:** `feat/template-remotion`. Keep this branch generic, stable, and reusable.
- **Video project:** one dedicated branch per video, named `feat/<video-title-slug>`.
- **Default branch:** `main` is not the starting point for new video work under the current workflow.

## When to create a project branch

Do not create a project branch at the beginning of planning. First complete and obtain the user's approval for the production plan:

1. Topic and working title.
2. Platform, target duration, aspect ratio, resolution, and FPS.
3. Visual style and style guide direction.
4. Character/object model direction and approvals where applicable.
5. Research brief and approved narration.
6. Timecoded scene/beat breakdown.
7. Storyboard and motion plan.

Only after the user approves the plan and authorizes moving into build/implementation should the agent create the project branch.

## Branch creation rules

1. Verify the current repository and confirm that `feat/template-remotion` exists.
2. Read the current HEAD SHA of `feat/template-remotion`.
3. Create `feat/<video-title-slug>` directly from that branch's current HEAD.
4. Use lowercase kebab-case for the slug. Example: `feat/why-netherlands-does-not-sink`.
5. If the proposed branch already exists, inspect it and ask the user whether to continue on it. Never force-reset, overwrite, or silently reuse it.
6. Confirm the created branch and its base commit before making project files.

## What belongs where

**Keep on `feat/template-remotion`:**
- Reusable Remotion configuration and starter composition.
- Generic components, utilities, styles, and folder conventions.
- Production skills, reference guides, templates, and general documentation.
- Generic fixes that improve the starter for future videos.

**Keep on a video project branch:**
- Topic-specific compositions and scenes.
- Video-specific scripts, research, storyboards, and production briefs.
- Character/object designs and approved assets for that video.
- Topic-specific dependencies, data, graphics, and rendering configuration.

Do not copy a completed video's code or assets back into the boilerplate merely because they were developed from it. If a genuinely reusable improvement is discovered, propose it separately and wait for approval before changing the boilerplate.

## Isolation and merge policy

- All build, implementation, iteration, and QA commits for a video stay on its project branch.
- Never commit topic-specific work to `feat/template-remotion`.
- Never merge into `feat/template-remotion` or `main` without explicit user approval.
- Report the project branch name, base branch, and base commit when starting implementation.


---

## Visual identity, palette and isolated character assets

For every new project, follow this order before scene production:

1. Select and approve the visual style from `references/VISUAL_STYLE_LIBRARY.md`. Detailed Documentary Stickman (STYLE-01) is an available style option.
2. Declare the visual identity: style ID/version, shape language, line weight, proportions, materials and rendering rules.
3. Create `project/style/PALETTE.md` with named colors and exact HEX values. Include background, outlines, character base colors, clothing/skin/fur/hair, accents, shadows and semantic colors as needed. Obtain user approval before image generation.
4. Create the style board and style test using only the approved palette.
5. Inventory recurring characters and assign a unique Character ID to each.
6. Create exactly one independent image-generation prompt per character. Each prompt must generate a sheet for one character only. Never combine multiple characters in one prompt or sheet.
7. Each character sheet may show that same character in separate turnaround views, expressions, action poses and accessory callouts, arranged cleanly with no overlaps or cropping.
8. Approve each canonical character sheet. Generate isolated transparent poses/sprites or rig parts separately for Remotion production when required.

Follow `references/CHARACTER_MODEL_GUIDE.md` and `references/IMAGE_GENERATION_WORKFLOW.md` exactly. A composite model sheet is a reference document, not automatically a render-ready sprite atlas.


---

# Dynamic asset planning and style-specific visual specifications

Asset scope is derived from the actual story. There is no fixed number of characters, props, objects, environments, vehicles, diagrams or generated images.

Before preparing any image-generation prompt:
1. Read `references/ASSET_PLANNING_GUIDE.md`.
2. Inspect the approved script, scene breakdown and storyboard.
3. Build a deduplicated asset inventory with stable IDs and usage by scene/beat.
4. Classify each item as reference sheet, isolated production asset, procedural Remotion graphic, reuse or no asset needed.
5. Calculate and report the actual prompt count by category. Zero characters is valid when the story does not need characters.
6. Obtain approval of the inventory when it changes scope or generation cost.

When a visual style is selected, read its dedicated specification in `references/styles/` as well as `references/VISUAL_STYLE_LIBRARY.md`. The dedicated style guide defines the visual construction rules. STYLE-01 stickman rules apply only when STYLE-01 is selected; do not transfer them to other styles.

Generate one independent prompt per independent character or asset requiring separate generation. A character sheet contains one character only; an object sheet contains one object or coherent assembly only. Do not combine unrelated entities. Views, poses and callouts inside one sheet must all belong to that same subject.


---

# Separate visual style, asset production method and animation method

These are independent planning dimensions. The selected visual style controls the final appearance, but it does not force the production tool for every asset.

Before creating assets or implementing scenes, read `references/PRODUCTION_METHODS_AND_ANIMATION.md`. For every scene and asset:
1. Select the visual style and read its dedicated style specification.
2. Determine the asset requirements from the script and storyboard.
3. Choose the most suitable production method independently for each asset: AI still, AI video, Blender/3D, SVG/React/Canvas procedural graphics, licensed stock, hybrid, reuse or no asset.
4. Choose how the result will be animated in Remotion: still-image transforms, 2D layers/parallax, SVG motion, pre-rendered video/image sequence, 3D render compositing or procedural React animation.
5. Record output format, alpha/layer requirements, source/license and integration path in the asset registry.
6. Keep all methods visually coherent with the approved style guide and palette.

Remotion can compose high-resolution still images, video, image sequences, SVG/vector graphics, transparent renders and React-generated graphics. It can animate timing, transforms, layers, masks, paths, typography and transitions. It does not generate source images by itself and is not a substitute for Blender's modeling, rigging or 3D simulation. Use a suitable external production tool where needed, then integrate its output.

A scene may legitimately combine a photorealistic background plate, detailed close-up image, Blender-rendered reconstruction, SVG technical overlay and Remotion typography. This is an example of a hybrid approach, not a mandatory template.

---

# Repository asset storage policy — approved final exports only

The user performs image generation revisions and iterations in Google Flow, not inside this repository. The repository is the production handoff location, not the image-iteration archive.

Default workflow:
1. Create and revise prompts/images in Google Flow.
2. Approve the final result in Google Flow.
3. Export only the approved production-ready asset into `public/assets/<category>/`.
4. Reference that file from Remotion using `staticFile("assets/<category>/<filename>")`.

Use simple category folders: `characters/`, `objects/`, `environments/`, `backgrounds/`, `diagrams/`, `effects/`, `audio/`. Add a category only when the project needs it.

Do not create draft, temp, generated, reference, model-sheet archive, or version folders in the repository by default. Do not copy every iteration from Google Flow into the repo. Use descriptive filenames rather than deep ID/version paths.

Model sheets and visual references remain in Google Flow unless a particular sheet is deliberately used in the final video. A model sheet is optional, not a mandatory step for every character/object. If a layered deliverable is needed, store only the final approved layers required by Remotion in the relevant category folder.

This storage policy supersedes older examples in this skill that show `project/assets/references/`, `project/assets/generated/temp/`, `v001/` or other nested reference/version structures.
