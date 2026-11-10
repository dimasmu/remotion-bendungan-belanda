# Visual Style Library

This file defines **how the video looks**. It is separate from the content idea and character model sheet.

Here, “model” means the visual/art-direction style, not an AI foundation model such as GPT, Claude or Gemini. Choosing an AI image/video provider is a separate technical decision.

## Choose a style

| ID | Visual direction | Best for | Visual language |
| --- | --- | --- | --- |
| STYLE-01 | Detailed documentary stickman | History, war, engineering explainers | Consistent simple characters, expressive poses, detailed environments, cinematic camera and meaningful props |
| STYLE-02 | Flat 2D explainer | Science, everyday technology | Clean geometry, limited palette, icons and diagrams |
| STYLE-03 | 2D cut-out / paper collage | History and inventions | Layered paper, tactile edges, parallax and puppet-like motion |
| STYLE-04 | Hand-drawn illustrated documentary | Historical stories | Ink linework, textured shading, illustrated environments |
| STYLE-05 | Low-poly 3D | Engineering and objects | Faceted forms, readable silhouettes and simplified materials |
| STYLE-06 | Stylized cinematic 3D | Large infrastructure and historical scenes | Layered depth, cinematic lighting and controlled camera movement |
| STYLE-07 | Isometric diorama | Cities, factories and infrastructure | Consistent isometric camera and modular miniature environments |
| STYLE-08 | Technical blueprint / infographic | How-it-works and engineering | Dimensions, callouts, exploded views and annotated cutaways |
| STYLE-09 | Clay / stop-motion | Playful explainers and inventions | Tactile surfaces, handcrafted models and stepped motion |
| STYLE-10 | Cinematic photorealism | Serious documentary | Realistic environments/materials and strict continuity controls |

The user may select one ID, combine compatible styles or provide a reference. Do not silently choose a style.

## Style-lock document

After selection, create a project style guide with:

- Style ID, name and version (e.g. STYLE-01-v1)
- Shape language, proportions and detail level
- Primary/secondary palette with hex values
- Line width / edge treatment
- Materials and surface texture
- Lighting and shadow direction
- Camera perspective and movement rules
- Background/environment treatment
- Typography and motion-design language
- Allowed variations and forbidden deviations
- Reference images and their permitted use

## Consistency rules

- Keep camera perspective coherent between connected scenes.
- Maintain scale relationships for recurring subjects and props.
- Reuse design tokens for colors, strokes, shadows, radii and typography.
- Set a detail budget; do not make one scene unexpectedly photorealistic while others are flat.
- Maintain a reference board for recurring locations, objects and machines.
- For 3D, lock camera lens, lighting, materials and render style.
- For 2D, lock outline width, shape grammar, perspective, texture and shading.
- Make one style test frame and one motion test before production.
- Do not create characters in this document. Use CHARACTER_MODEL_GUIDE.md.

## Style approval gate

Before coding, present:
1. One-paragraph art direction.
2. Palette and typography sample.
3. Environment test frame.
4. Representative character or hero object.
5. A short motion test.

Wait for style approval before generating all scenes.

## Suggested project-level style files

- project/style/STYLE_GUIDE.md
- project/style/PALETTE.md
- project/style/CAMERA_AND_LIGHTING.md
- project/style/REFERENCE_BOARD.md

## Style prompt template

~~~text
Create a visual style test for [STYLE ID].

This is an art-direction test only. Do not invent the story or factual content.

Canvas: [ratio and resolution]
Style: [selected style]
Palette: [approved colors]
Shape language: [description]
Line / edge treatment: [description]
Materials / texture: [description]
Lighting: [description]
Camera / perspective: [description]
Typography / motion language: [description]
Detail level: [description]

Show one representative environment and one representative subject.
Keep the selected style consistent. No unrequested title, logo or watermark.
~~~


## Mandatory image-generation prompt stage

After the user selects and approves a style, read \`references/IMAGE_GENERATION_WORKFLOW.md\` and prepare a Visual Style Prompt Pack before implementing scenes.

The pack must include:
- One ready-to-copy style-board prompt.
- One style-test-frame prompt grounded in the approved topic.
- A short avoid/negative list.
- Recommended output ratio and size.
- Exact save path and filenames.

The first image is a reusable project art-direction reference, not the final scene. Ask the user to approve the style board and test frame. Do not make character designs yet if the style is not approved.


---

## Mandatory palette declaration before character generation

A project palette must be defined and approved **before writing any character-generation prompt**. Do not leave color decisions to the image model.

After style selection, create `project/style/PALETTE.md` with:
- Palette version and the selected style ID.
- Primary/background colors with HEX values.
- Character base colors and skin/fur/hair/clothing colors as applicable.
- Accent/highlight colors.
- Outline/ink color.
- Shadow and neutral colors.
- Semantic colors (warning, water, vegetation, metal, fire, etc.) only if the project needs them.
- Usage ratios or rules (for example, background 60%, primary 30%, accent 10%).
- Forbidden colors and contrast/readability notes.

Present the palette as named swatches with exact HEX values and explain where each color is used. Ask the user to approve or revise it. Only the approved palette may be included in style-board, character-sheet, object-sheet and scene-asset prompts.

### Stickman direction

STYLE-01 is the **Detailed Documentary Stickman** option and is a first-class supported visual style, not a default forced on every project. When selected, lock:
- Head shape and head-to-body ratio.
- Eye, eyebrow and mouth construction and expression range.
- Body/limb line weight, joint style and hand/foot design.
- Clothing silhouette and accessory rules.
- Outline color and thickness.
- Flat fill, limited shading and texture treatment.
- Character-specific palette assignments and shared environmental palette.

Stickman characters must remain visually simple and readable, but may have distinct clothing, hats, tools, uniforms and props. Do not turn them into realistic human anatomy or change them into a different illustration style between shots.

### Style approval order

1. Select visual style.
2. Propose and lock the project palette with HEX values.
3. Generate and approve the style board/style test.
4. Define the character inventory and individual character briefs.
5. Generate one separate prompt and one separate sheet per character.
6. Approve each character sheet before creating scene-specific production assets.


---

## Detailed style specification files (mandatory)

The table above is only a style catalogue. When a style is selected, the agent MUST read its dedicated specification before writing prompts or creating assets. Do not rely on the short catalogue description alone.

| Style ID | Dedicated specification |
|---|---|
| STYLE-01 | [styles/STYLE-01-detailed-documentary-stickman.md](styles/STYLE-01-detailed-documentary-stickman.md) |
| STYLE-02 | [styles/STYLE-02-flat-2d-explainer.md](styles/STYLE-02-flat-2d-explainer.md) |
| STYLE-03 | [styles/STYLE-03-2d-cut-out-paper-collage.md](styles/STYLE-03-2d-cut-out-paper-collage.md) |
| STYLE-04 | [styles/STYLE-04-hand-drawn-illustrated-documentary.md](styles/STYLE-04-hand-drawn-illustrated-documentary.md) |
| STYLE-05 | [styles/STYLE-05-low-poly-3d.md](styles/STYLE-05-low-poly-3d.md) |
| STYLE-06 | [styles/STYLE-06-stylized-cinematic-3d.md](styles/STYLE-06-stylized-cinematic-3d.md) |
| STYLE-07 | [styles/STYLE-07-isometric-diorama.md](styles/STYLE-07-isometric-diorama.md) |
| STYLE-08 | [styles/STYLE-08-technical-blueprint-infographic.md](styles/STYLE-08-technical-blueprint-infographic.md) |
| STYLE-09 | [styles/STYLE-09-clay-stop-motion.md](styles/STYLE-09-clay-stop-motion.md) |
| STYLE-10 | [styles/STYLE-10-cinematic-photorealism.md](styles/STYLE-10-cinematic-photorealism.md) |

Each style specification defines its own character construction (if characters are needed), geometry, line/material treatment, palette behavior, environments, camera and animation rules, asset-sheet format and prompt constraints. Style-specific rules take precedence over generic assumptions, while project-specific approved choices take precedence over defaults inside the style guide.

## Dynamic asset scope

There is no default or fixed asset count. Determine the required characters, objects, environments, vehicles, diagrams, backgrounds and effects from the approved story and storyboard. Read `ASSET_PLANNING_GUIDE.md`, build an asset inventory, deduplicate recurring entities and generate prompts only for assets actually required. A project may legitimately need zero characters. Do not assume a fixed number such as three.


---

## Visual style does not prescribe the production tool

The style guide defines the final art direction and consistency requirements, not a mandatory asset-generation application. A photorealistic style may use AI stills, licensed footage, Blender renders or a hybrid. A blueprint style may use AI-generated reference imagery, SVG diagrams or both. A stickman style may use generated character references and separately animated SVG/PNG cutouts.

For every selected style, use `PRODUCTION_METHODS_AND_ANIMATION.md` to choose production and Remotion integration methods per asset/scene. Maintain the approved palette, lighting, material, linework and composition regardless of source method.
