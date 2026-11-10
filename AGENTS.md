# Repository Agent Instructions

For every new documentary project or any Remotion composition/scene change:

1. Read `.agents/skills/remotion-documentary/SKILL.md`.
2. For a new video, follow the project intake wizard in this order: content idea; platform and duration; aspect ratio/resolution; visual style and palette; research and narration; timecoded 1–5 second breakdown; storyboard; dynamic asset inventory; implementation and QA.
3. Read the relevant references before working:
   - Content selection: `.agents/skills/remotion-documentary/references/CONTENT_IDEA_CATALOG.md`
   - Platform/duration/resolution: `.agents/skills/remotion-documentary/references/PLATFORM_PRESETS.md`
   - Visual style: `.agents/skills/remotion-documentary/references/VISUAL_STYLE_LIBRARY.md`
   - Character/object models: `.agents/skills/remotion-documentary/references/CHARACTER_MODEL_GUIDE.md`
   - Production brief template: `.agents/skills/remotion-documentary/templates/PRODUCTION_BRIEF_TEMPLATE.md`
   - Scene/voice-over breakdown: `.agents/skills/remotion-documentary/templates/SCENE_BREAKDOWN_TEMPLATE.md`
4. Ask the user one decision at a time. Do not silently choose the topic, duration or visual style.
5. Work on one scene at a time unless the user explicitly asks for a full-project refactor.
6. Inspect package versions, registered composition, timeline, assets and shared components before editing.
7. Preserve composition ID, dimensions, FPS, total duration and unrelated scenes unless explicitly approved.
8. Never stretch or blindly crop a composition when changing aspect ratio. Create deliberate layouts for each selected destination.
9. Treat a commit as source-control success only. Never claim build, render or visual QA unless actually performed.
10. Do not merge iterative work into `main` without explicit approval.

## Mandatory Git branch workflow

The reusable boilerplate branch is `feat/template-remotion`. It is the clean source template and must not receive video-specific implementation.

For every new video:

1. Complete the planning and approval stages first. Planning includes the approved topic/title, platform and duration, aspect ratio/resolution, visual style, character/object direction, research and narration, timecoded breakdown, and storyboard.
2. Do not create the video project branch during planning. Create it only after the user approves the plan and the project is ready to enter the build/implementation phase.
3. Create a new branch from `feat/template-remotion` (never from an old video branch and never from `main` unless the user explicitly changes this policy).
4. Use the naming format `feat/<video-title-slug>`, in lowercase kebab-case. Example: `feat/why-netherlands-does-not-sink`.
5. Perform all project-specific code, compositions, scenes, assets, scripts, production documents, and build changes on that video's branch.
6. Keep `feat/template-remotion` generic and reusable. Do not add a finished video's composition, narration, topic-specific assets, or project-specific dependencies to it.
7. If a project branch already exists, inspect it and ask before reusing or replacing it. Never overwrite or force-reset an existing project branch automatically.
8. Do not merge a project branch into `feat/template-remotion` or `main` without the user's explicit approval.
9. Before creating the branch, verify that `feat/template-remotion` exists and use its current HEAD as the branch base. Report the new branch name and base commit to the user.

## Image generation and asset workflow

11. After visual-style approval, read `.agents/skills/remotion-documentary/references/IMAGE_GENERATION_WORKFLOW.md` and provide the user with a style-board and style-test-frame prompt.
12. After character/object model approval, provide the corresponding turnaround/model-sheet, expression and action-pose prompts. Ask for approval before using them in scenes.
13. Store only approved final production assets in simple category folders under `public/assets/`. Google Flow owns image iteration and model-sheet references.
14. Do not create repository reference archives, draft folders or versioned asset directories by default. Export only the selected final files from Google Flow.
15. Do not mix AI reference sheets with assets actually used by Remotion. Read IMAGE_GENERATION_WORKFLOW.md for exact prompts, naming and approval gates.


## Visual style, palette and character asset rules

- Before image generation, select and approve a visual style. STYLE-01 Detailed Documentary Stickman is an available option; do not force it when another style is selected.
- Declare and approve a project color palette with named colors and exact HEX values in `project/style/PALETTE.md` before creating character prompts.
- Use the approved style board and the same approved palette across all character prompts.
- Create a character inventory with a unique Character ID for each recurring character.
- Generate one separate prompt and one separate canonical model sheet per character. If there are three characters, there must be three prompts and three separate character sheets. Never combine them into one group sheet.
- Each individual character sheet can show multiple views/poses of that same character in a clean, evenly spaced, non-overlapping production-sheet layout. Keep the full character visible.
- Keep model sheets and image variations in Google Flow. Export only final isolated assets needed by the actual Remotion scenes.
- Read `.agents/skills/remotion-documentary/references/CHARACTER_MODEL_GUIDE.md` and `IMAGE_GENERATION_WORKFLOW.md` before preparing character prompts.


## Dynamic asset scope and style-specific design guides

- Asset count is never fixed. Derive the exact required assets from the approved script, scene breakdown and storyboard. A project may need zero, one or many characters, objects, environments, vehicles, diagrams, backgrounds or effects.
- Before creating asset prompts, read `.agents/skills/remotion-documentary/references/ASSET_PLANNING_GUIDE.md`, build a deduplicated asset inventory, and state the actual prompt count by category.
- Do not create prompts for assets that can be reused, drawn procedurally in Remotion, or are not required by the story.
- After a visual style is selected, read its dedicated file under `.agents/skills/remotion-documentary/references/styles/`. The style catalogue alone is not a sufficient prompt specification.
- Each style-specific file defines how its characters (if any), objects, environments, materials, palette, camera and animation should look. Do not apply stickman design rules to other styles.
- For each independent recurring character, create a separate prompt and reference sheet. For each object/environment, create its own prompt when a dedicated asset is needed. Never force a fixed character or asset count.
- A single character/object sheet may show multiple views of that same subject; unrelated subjects must not be combined.


## Separate visual style, asset production and animation decisions

- A visual style describes the final look; it does NOT dictate that every asset must be generated by one tool or method.
- For each asset and scene, choose the production method independently: AI-generated still, AI-generated video, Blender/3D, SVG/React/Canvas procedural graphics, licensed stock media, hybrid compositing, reuse, or no new asset.
- Before planning production, read `.agents/skills/remotion-documentary/references/PRODUCTION_METHODS_AND_ANIMATION.md`.
- Also decide how each asset will be animated/composited in Remotion: still-image transforms, layered parallax, SVG/vector animation, pre-rendered video/image sequence, 3D render compositing, or procedural React animation.
- Remotion is the composition and frame-based video rendering layer; it is not itself an image generator or a full 3D modeling/rigging application. Use Blender or other suitable tools for source 3D work, then integrate rendered outputs.
- Hybrid scenes are allowed and often useful, provided every element follows the approved visual style, palette and continuity rules.
- Do not assume high-detail photorealistic assets are unsupported. High-resolution stills, footage, 3D renders, SVG graphics and layered compositions can all be used as Remotion inputs.

## Final assets only — simple project asset folders

The user's image revision and iteration workflow happens in Google Flow, outside this repository. Therefore, do not create repository folders for generated drafts, temporary images, intermediate versions, or reference/model-sheet archives by default.

- Save only approved, final, production-ready exports into `public/assets/`, grouped by simple category folders such as `characters/`, `objects/`, `environments/`, `backgrounds/`, `diagrams/`, `effects/`, and `audio/`.
- Use clear descriptive filenames (for example `researcher.png`, `cathedral-interior.png`, `gothic-arch-diagram.svg`). Avoid deeply nested IDs/version directories unless the user explicitly requests them or a concrete technical need requires them.
- Do not create `project/assets/references/`, `generated/temp/`, `v001/` or similar intermediate folder trees by default.
- Do not save every generated variation or model sheet into the repository. Google Flow is the workspace for prompt iteration and revisions.
- Generate a model sheet only when it is useful for consistency. Keep it in Google Flow; export it into the repository only if it is itself used by the final video.
- If an asset needs multiple layers or cutouts, save only the approved production files needed by Remotion, using clear filenames in the relevant category folder.
- The asset inventory should record final filename, category, production method, source/license where relevant, and scene usage. Keep the inventory lightweight; do not invent a separate archive structure.
- Remotion reads files under `public/` through `staticFile()`. Example: `staticFile("assets/objects/cathedral-interior.png")`.
