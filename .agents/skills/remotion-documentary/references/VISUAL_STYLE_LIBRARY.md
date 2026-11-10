# Visual Style Library

This catalogue replaces the previous 10-style library. It is based on the two user-provided animation reference videos. Duplicate names and near-duplicate directions have been consolidated into one canonical set of 10 styles.

## Canonical style catalogue

| ID | Style | Core visual language | Good fit |
|---|---|---|---|
| STYLE-01 | Pixel Art | Crisp pixel grid, limited palette, sprite/tile construction | Retro game-inspired stories, timelines, playful explainers |
| STYLE-02 | Chalkboard Style | Chalk drawings on dark board, dusty strokes, educational diagrams | Teaching mechanisms, history, step-by-step explanations |
| STYLE-03 | Glow Sketch | Luminous hand-drawn lines on dark backgrounds | Abstract systems, technology, dramatic reveals |
| STYLE-04 | PS2 Style | Early-2000s console 3D, low-to-mid poly geometry, era-specific textures | Nostalgic game-like documentary scenes |
| STYLE-05 | Comic Art | Bold ink, halftone, panels, graphic shadows and impact shapes | Energetic storytelling, historical beats, action |
| STYLE-06 | Flat Vector | Geometric 2D forms, solid fills, clean editorial layout | Clear educational explainers, data and processes |
| STYLE-07 | Minimal Line / Stickman | Sparse line figures, simple poses, high contrast and negative space | Minimalist narration-led stories and simple demonstrations |
| STYLE-08 | CGI Motion | Cinematic dimensional 3D, materials, depth and deliberate camera | Hero objects, environments, cinematic documentary shots |
| STYLE-09 | Lego Style | Interlocking toy-brick construction, minifigure-like figures, miniature world | Playful reconstructions, cities, machines and process explainers |
| STYLE-10 | Explainer 3D | Friendly stylized 3D characters, clean environments and clear mechanisms | Educational storytelling and approachable technical explanations |

## Deduplication decisions from the references

- “Papan Kapur” and “Chalkboard Style” are one style: **STYLE-02 Chalkboard Style**.
- “Gaya PS2” and “PS2 Style” are one style: **STYLE-04 PS2 Style**.
- “Komik” and “Comic Art” are one style: **STYLE-05 Comic Art**.
- “Bata Mainan” and “Lego Style” are one style: **STYLE-09 Lego Style**.
- “Stickman Minimalis” and “Minimal Line” are consolidated as **STYLE-07 Minimal Line / Stickman** because both use sparse line-based figures and minimal visual construction. Preserve the specific reference treatment selected by the user in the project style lock.
- “CGI Motion” remains distinct from “Explainer 3D”: CGI Motion allows a broader cinematic/realistic 3D treatment, while Explainer 3D prioritizes simplified educational readability.
- The two videos show some styles more clearly than others. The dedicated guides capture the visible direction and provide production rules; they do not claim to reproduce an unseen prompt pack from the video creators.

## Mandatory selection rule

The user must select a style or approve a recommendation. Do not silently choose one. A project may use one dominant style and a compatible secondary treatment only when the user approves the hybrid. Do not blend all styles into one video by default.

After selection:
1. Read the matching dedicated style specification below.
2. Explain the proposed art direction in plain language.
3. Define a project-specific palette with named swatches and exact HEX values.
4. Obtain palette approval before writing character or asset prompts.
5. Create a style-board prompt and one topic-specific style-test-frame prompt.
6. Obtain visual approval before generating the full asset set or implementing scenes.

## Dedicated style specifications

| ID | File |
|---|---|
| STYLE-01 | [STYLE-01-pixel-art.md](styles/STYLE-01-pixel-art.md) |
| STYLE-02 | [STYLE-02-chalkboard-style.md](styles/STYLE-02-chalkboard-style.md) |
| STYLE-03 | [STYLE-03-glow-sketch.md](styles/STYLE-03-glow-sketch.md) |
| STYLE-04 | [STYLE-04-ps2-style.md](styles/STYLE-04-ps2-style.md) |
| STYLE-05 | [STYLE-05-comic-art.md](styles/STYLE-05-comic-art.md) |
| STYLE-06 | [STYLE-06-flat-vector.md](styles/STYLE-06-flat-vector.md) |
| STYLE-07 | [STYLE-07-minimal-line-stickman.md](styles/STYLE-07-minimal-line-stickman.md) |
| STYLE-08 | [STYLE-08-cgi-motion.md](styles/STYLE-08-cgi-motion.md) |
| STYLE-09 | [STYLE-09-lego-style.md](styles/STYLE-09-lego-style.md) |
| STYLE-10 | [STYLE-10-explainer-3d.md](styles/STYLE-10-explainer-3d.md) |

Each dedicated guide is mandatory before asset prompts or implementation. It defines the relevant geometry, line/material treatment, palette behavior, characters (if any), environment, camera, motion and prompt constraints.

## Project style lock

For every video, create a project-level style document containing:
- Style ID, canonical name and version.
- Whether the project uses one style or an explicitly approved hybrid.
- Shape language, proportions and detail budget.
- Named palette swatches with exact HEX values and usage.
- Line weight, edge treatment, materials and textures.
- Lighting, shadow direction and contrast rules.
- Camera perspective, lens language and movement.
- Environment/background treatment.
- Typography and motion-graphics language.
- Allowed variation and forbidden deviations.
- Approved reference images and their permitted use.

## Palette approval gate

Before any character/object generation prompt:
- Define background, outline, base, clothing/skin/fur/hair, accent, shadow and semantic colors as applicable.
- Provide exact HEX values and intended use for every swatch.
- Explain contrast and usage ratios where useful.
- Ask the user to approve or revise the palette.
- Use only the approved palette in all style boards and asset prompts.

Do not assume every style needs characters. Asset count and prompt count must come from the approved script, storyboard and asset inventory.

## Style-board prompt template

```text
Create a visual style board for [STYLE-ID — STYLE NAME].

Use the attached visual reference as the style direction. This is an art-direction test, not a finished story scene.

Canvas: [aspect ratio and resolution]
Style: [canonical style]
Approved palette: [named HEX swatches]
Subject domain: [topic and factual subject]
Shape / line / material language: [from the dedicated style guide]
Lighting and camera: [approved direction]
Detail budget: [level]
Motion language: [how the style should move]

Show a representative environment, one relevant hero subject, and a few close-up details that demonstrate the style. Keep the design coherent and leave clean negative space where Remotion typography may be added.

Do not add unrequested text, logos, watermarks, extra subjects or facts.
```

## Style test frame prompt template

```text
Create one style test frame for the approved video project.

Match the approved style board exactly: palette, geometry, linework/materials, lighting, camera and detail level.

Approved subject: [one verified subject]
Story moment: [one precise shot description]
Composition: [aspect ratio and resolution]
Focal subject: [subject]
Environment: [environment]
Camera: [shot size, angle and perspective]
Lighting: [direction and quality]
Intended motion: [pose/state that can be animated later]

Show one clear visual idea. Preserve negative space for editable typography that will be added in Remotion. Do not add titles, labels, logos, watermark or unsupported factual details.
```

## Production and animation are separate decisions

A visual style describes the final appearance; it does not dictate a single tool. For each asset/scene, independently choose AI still, AI video, Blender/3D, SVG/React/Canvas, licensed stock, hybrid, reuse or no new asset. Then choose the Remotion integration method: still transforms, layered parallax, SVG motion, pre-rendered video/image sequence, 3D compositing or procedural React animation. Read `PRODUCTION_METHODS_AND_ANIMATION.md`.

Remotion is the frame-based composition/rendering layer. It does not generate source images and is not a replacement for 3D modeling, rigging or simulation tools.

## Quality gate

Before full production, inspect:
- One approved style board.
- One topic-specific test frame.
- One short motion test.
- Palette consistency.
- Character/object continuity, if applicable.
- Legibility at the target output size.

Do not mark a style approved until the user has reviewed it.
