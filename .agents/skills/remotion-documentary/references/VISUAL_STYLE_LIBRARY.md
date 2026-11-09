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
