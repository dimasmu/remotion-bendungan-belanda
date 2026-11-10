# Asset Production Methods and Remotion Animation Methods

## Purpose

Visual style, asset production method and animation method are three separate decisions. Never assume that selecting a visual style determines the tool used to create every asset.

- **Visual style** defines the final appearance: shape language, color, materials, lighting, texture, typography and visual consistency.
- **Asset production method** defines how a source asset is created or acquired.
- **Remotion animation method** defines how that asset is presented, transformed, layered or animated in the rendered video.

A project may combine several production methods while maintaining one coherent visual style.

## 1. Asset production methods

Choose per asset based on narrative purpose, required fidelity, editability, consistency, time and rendering constraints.

### AI-generated still images
Use for high-detail scenes, architecture, historical reconstructions, environments, hero objects, character references and visual plates when a still image is sufficient.

Specify aspect ratio, composition, camera, lighting, palette, subject continuity and negative constraints. For recurring subjects, maintain canonical reference images and prompt details. Generate isolated subjects or transparent cutouts when independent movement is required.

### AI-generated video
Use when the shot requires complex organic motion, atmosphere, crowds, water, fire, camera movement or realistic action that would be expensive to recreate procedurally.

Treat the result as a video plate. Check duration, frame rate, resolution, temporal consistency, artifacts, rights and whether the shot needs trimming, looping or compositing. Do not assume every generated video is editable at object level.

### Blender / 3D production
Use when the story requires controllable camera movement, accurate spatial relationships, object rotation, cutaways, exploded assemblies, repeated angles, mechanical animation or reusable 3D assets.

Possible outputs include PNG sequences, transparent renders, ProRes/other intermediate video where supported, and still reference renders. Keep 3D project files and source models when future revisions are likely. Remotion generally consumes the rendered output; it is not a replacement for Blender's modeling, rigging or 3D simulation tools.

### SVG / React / Canvas procedural graphics
Use for diagrams, labels, arrows, charts, maps, timelines, geometry, technical drawings, icons, captions, UI-like elements and repeatable motion graphics.

Prefer code-generated graphics when precision, data updates, responsive layout or exact animation timing matter. Keep text and labels editable in code where practical. Use SVG for vector paths and shapes; use Canvas only where raster drawing or many primitives make it appropriate.

### Stock / licensed photography and footage
Use when authentic real-world footage is more valuable than generated imagery or when it improves credibility. Track source, license, attribution requirements, download provenance and permitted use in the asset registry. Never assume an asset is royalty-free merely because it is publicly accessible.

### Hybrid / composited production
Combine methods when a scene benefits from it: for example, an AI-generated cathedral interior as a background plate, an SVG architectural overlay, and separately animated labels; or a Blender machine render with Remotion callouts and data graphics.

Hybrid does not mean mixing incompatible art styles. The chosen visual style guide controls the final grade, palette, linework, material treatment and compositional language.

## 2. Per-asset decision matrix

For each asset, record:
- Required visual result and story purpose.
- Selected visual style and its dedicated style guide.
- Production method: AI still, AI video, Blender/3D, SVG/React/Canvas, stock/licensed media, hybrid, existing asset, or no asset.
- Why this method is appropriate.
- Output type: PNG/JPG/WebP, transparent PNG, SVG, image sequence, video, 3D source file, or code component.
- Whether it needs alpha transparency, independent layers, multiple views, animation or editable labels.
- Source/license/reference details where applicable.
- Remotion integration plan.

Do not default every asset to image generation. Do not default every complex visual to a still image. Use the least complex method that satisfies the shot's visual and animation requirements.

## 3. Remotion integration and animation methods

Remotion composes video using React components and frame-based timing. Typical approaches include:

### Still image / image plate
Use a still image for a designed frame or environment. Animate position, scale, crop, opacity and masks over time. Use slow pan/zoom deliberately; do not imply that a flat image contains real 3D motion.

### Layered 2D / parallax
Separate foreground, midground, background and hero elements when depth movement is needed. Use independent transforms and restrained parallax. Avoid separating layers when the source image cannot support clean edges or plausible hidden areas.

### SVG / vector motion
Animate SVG paths, strokes, masks, shapes, labels and callouts. Ideal for blueprints, diagrams, maps, flow lines, charts and architectural construction overlays.

### Pre-rendered video / image sequence
Use video or image sequences for complex animation made in Blender or AI video tools. Remotion controls timing, trimming, sequencing, compositing and synchronization; it does not automatically expose the internal objects of a flattened render.

### 3D render compositing
Use rendered 3D output as image sequence or video, optionally with alpha. Add Remotion overlays, titles, diagrams, transitions and sound. For interactive camera changes or real-time 3D rendering, evaluate a dedicated 3D workflow rather than assuming ordinary Remotion image layers can do it.

### Procedural React animation
Use frame-driven React components for typography, transitions, simple illustrations, diagrams, data visualization and UI-style motion. Use Remotion's frame/time APIs and deterministic calculations; avoid non-deterministic animation.

## 4. Decision workflow per scene

1. Read the narration and identify the viewer's visual question.
2. Decide whether the scene needs realism, explanation, emotion, spatial understanding or decorative atmosphere.
3. Choose the visual style and read its dedicated specification.
4. Identify the exact assets required.
5. Choose a production method for each asset independently.
6. Choose a Remotion animation method for each shot independently.
7. Record output formats, alpha/layer needs, source files and integration path.
8. Present the scene plan for approval before costly or scope-changing generation.
9. After production, verify quality at final video resolution and frame rate.

## 5. Example: Gothic architecture documentary

A single scene can combine:
- AI still: high-resolution cathedral interior as the establishing plate.
- AI still or licensed photo: close-up of carved stone details.
- Blender: a controllable 3D vault or flying-buttress reconstruction if camera movement/cutaway is essential.
- SVG: pointed-arch geometry, construction lines and dimension annotations.
- Remotion: camera-like pan/zoom on stills, animated SVG strokes, captions, transitions and audio synchronization.

This is an example, not a fixed recipe. Choose only methods that serve the actual scene.

## 6. Quality, rights and technical checks

- Inspect every source asset; do not trust prompt text alone.
- Verify visual consistency with the approved style guide and palette.
- Check dimensions, aspect ratio, frame rate, transparency and codec before integration.
- Confirm asset licenses, model/tool terms and required attribution.
- Avoid upscaling low-resolution assets as a substitute for a proper source.
- Test motion for edge artifacts, cropping, flicker, aliasing and continuity.
- Preserve source files and record provenance for assets used in the final render.
- Never claim a render, lint, build or asset QA passed unless it was actually run and inspected.

## 7. Asset registry fields

Add these fields to each asset record when relevant:

| Field | Meaning |
|---|---|
| Asset ID | Stable project identifier |
| Visual style | Selected style ID |
| Production method | AI still / AI video / Blender / SVG / stock / hybrid / reuse |
| Output format | PNG / transparent PNG / SVG / sequence / video / source |
| Alpha/layers | Whether transparency or separated layers are required |
| Animation method | Still transform / parallax / SVG / video / 3D render / procedural |
| Source/license | Provenance and usage rights |
| Integration path | Final location used by Remotion |
| QA status | Pending / approved / needs revision |

