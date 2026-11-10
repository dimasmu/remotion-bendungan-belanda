# STYLE-03 — Glow Sketch

**Specification version:** 2.0  
**Status:** Production direction — requires a visual benchmark and user approval per project  
**Canonical identity:** Luminous hand-drawn line art on a nearly black stage

## 1. Purpose and style identity

Glow Sketch is a sparse, dark visual language in which subjects, people, objects, mechanisms and selected spatial edges are drawn with luminous contour lines. The viewer should feel that a drawing is being revealed by light in darkness.

The reference treatment is closer to a glowing wire sketch than to a conventional neon illustration, sci-fi interface, HUD, dashboard, or fully rendered 3D scene. A simplified human figure and a few architectural/floor contours can be enough to establish a scene. The darkness and negative space are active parts of the composition.

**The subject must look drawn with light. It must not look like ordinary UI components decorated with a glow effect.**

Use this style for:
- Human figures, gestures and simple actions.
- Machines, mechanisms, routes, connections and technical explanations.
- Architectural spaces and abstract systems.
- Dramatic reveals where a contour is progressively illuminated.

A diagram is allowed, but it must be constructed as an illuminated sketch. Information architecture must never overpower the drawing.

## 2. Reference interpretation and confidence

The supplied reference visibly supports these characteristics:
- Nearly black background and substantial unused dark space.
- A simplified human figure made from luminous warm-white/gold outlines.
- Sparse architectural or room-like edges and a floor plane.
- A restrained glow around selected lines, with the brightest contour remaining crisp.
- A minimal composition in which one illuminated subject is the focal point.

The reference does **not** establish exact sampled HEX values, exact pixel stroke widths, a universal camera lens, or fixed animation timings. Any numerical values below are production starting points, not measurements claimed to have been extracted from the source video. Validate them against an approved project style frame.

## 3. Non-negotiable visual rules

1. Use a near-black or black background as the default.
2. Build the focal subject primarily from luminous linework, not filled shapes or shaded surfaces.
3. Keep the main contour crisp and legible. Glow is a secondary halo, not a substitute for the line.
4. Use warm amber/gold and warm-white as the primary visual family.
5. Keep environmental lines fewer, thinner and dimmer than the focal subject.
6. Preserve large areas of negative space. Every visible line must explain form, space, movement or hierarchy.
7. Show one dominant visual idea per shot.
8. Use a restrained, deliberate reveal. Do not make every line pulse or flicker.
9. Keep labels and typography separate from the illustrated subject unless the scene explicitly depicts writing or a label attached to an object.
10. At normal playback size, the viewer must recognize the subject and understand the action without zooming in.

## 4. Strict anti-drift rules

### 4.1 Forbidden default interpretation

Do not turn Glow Sketch into:
- A futuristic dashboard or control panel.
- A cyberpunk HUD or video-game menu.
- A grid of cards, buttons, tiles, widgets or status indicators.
- A full-screen scanline/CRT interface.
- A neon sign composition or nightclub/cyberpunk city.
- A conventional technical infographic with glowing borders.
- A generic SVG wireframe interface.

Do not add decorative progress bars, page counters, corner brackets, status readouts, keyboard grids, circular indicators, interface frames or random data labels unless the approved storyboard explicitly requires those objects as story content.

**Important:** A progress indicator or chapter label may be part of the documentary's global UI system, but it must remain visually quiet and must not become the main visual language of the shot. If a frame is about a machine, draw the machine. Do not replace it with rows of glowing controls.

### 4.2 Avoid visual noise

- No full-canvas scanlines, noise texture or animated glitch by default.
- No random sparks, floating particles or random flicker.
- No multiple competing glow colors.
- No thick neon tubes around every object.
- No bright filled panels behind the subject.
- No excessive labels, microtext or decorative numerals.
- No dense perspective grids unless the mechanism genuinely needs one.
- No photorealistic object mixed with a simple line-art figure.

If a requested subject is complex, simplify its silhouette and reveal its essential parts in sequence rather than drawing every detail at once.

## 5. Shape construction and line hierarchy

Construct each object from a deliberate hierarchy of paths.

### 5.1 Three line levels

| Level | Role | Relative treatment |
|---|---|---|
| A — Hero contour | Main silhouette, active mechanism, key gesture | Brightest, clearest core; strongest but still narrow halo |
| B — Structural contour | Secondary edges, joints, room/floor geometry | Dimmer and thinner than A |
| C — Guide/detail | Hidden continuation, construction marks, inactive parts | Very dim, sparse, often revealed only when needed |

Do not give every path the same brightness or thickness. The eye should immediately know which contour matters.

### 5.2 Starting stroke measurements

For a 1920×1080 composition, use these as initial design ranges and scale proportionally for other resolutions:
- Hero contour: 2–4 px core stroke.
- Structural contour: 1.5–2.5 px.
- Guide/detail contour: 1–1.5 px.
- Small technical highlights: 1.5–2 px, used sparingly.

These are starting ranges, not mandatory constants. Avoid hairline strokes that disappear after video compression and avoid thick strokes that resemble neon tubing.

### 5.3 Path quality

- Prefer smooth, intentional curves and confident geometric segments.
- Use slight hand-drawn character only where it helps the subject feel illustrated; do not make paths messy.
- Join limbs and mechanical parts cleanly. Avoid accidental gaps, floating endpoints and ambiguous intersections.
- Use simple silhouettes and a small number of meaningful internal lines.
- Use line caps and joins consistently (usually round caps and round joins for organic subjects; controlled angular joins for engineered objects).
- Use overlaps deliberately to clarify which part passes in front.
- Avoid outlining every tiny surface. Let darkness describe the parts that do not need to be seen.

### 5.4 Human figure construction

When a person is required:
- Use a simplified continuous gesture and recognizable head/torso/limb proportions.
- Prioritize pose, balance and direction of movement over facial detail.
- A head may be a simple circle or restrained contour; facial features are usually omitted.
- Use a clear shoulder, hip, elbow and knee articulation.
- Keep limb thickness consistent and joints connected.
- Make the action readable in silhouette: walking, reaching, pointing, carrying, turning or standing.
- Do not create a realistic shaded human, a filled mannequin, or a complex anatomical wireframe.

### 5.5 Object and mechanism construction

For a machine or technical object:
- Begin with the outer silhouette and the few structural divisions needed to identify it.
- Draw only the functional parts relevant to the narration.
- Use a brighter line to show the active path, energy transfer, moving component or key connection.
- Use dimmer lines for inactive structure.
- Use a small, intentional pulse or traveling highlight to show flow; do not animate every component simultaneously.
- If a cross-section is needed, keep the cutaway sparse and make the functional route visually dominant.

## 6. Palette and glow behavior

### 6.1 Provisional palette

The following values are a practical starting palette, **not exact color samples from the reference video**. A project may refine them after reviewing a generated style test.

| Token | Starting HEX | Usage |
|---|---|---|
| Void | #030609 | Main background |
| Deep charcoal | #091116 | Rare secondary depth / subdued area |
| Guide grey | #26343A | Very dim construction lines |
| Warm gold | #FFC45C | Main active contour |
| Pale amber | #FFE0A0 | Bright gold highlight |
| Warm white | #F4F2E8 | Secondary hero contour / brightest accents |
| Muted cyan | #70D9E8 | Optional technical accent only; use sparingly |

Recommended default ratio: most of the frame remains black; gold and warm-white linework occupy a small portion of the image. Cyan is optional and should not be introduced merely to make the image look more futuristic.

### 6.2 Glow stack

Treat glow as layered rendering:
1. **Core:** crisp, narrow, high-contrast stroke that defines the shape.
2. **Inner light:** a restrained, slightly softer edge immediately around the core.
3. **Outer halo:** low-opacity, wider blur that fades quickly into black.
4. **Optional reflection:** a very subtle local floor reflection only when the environment supports it.

The core must remain readable if the outer halo is disabled. If blur makes the path look fuzzy, reduce the blur rather than increasing brightness.

### 6.3 Glow discipline

- Hero contours may have the strongest halo.
- Structural contours receive a weaker halo.
- Guide lines may have no halo at all.
- Glow should not merge nearby paths into an unreadable mass.
- Avoid broad bloom that lifts the whole background from black.
- Do not use a constant animated opacity oscillation on all lines.
- Use a short, subtle pulse only to identify a meaningful active point or event.

## 7. Composition and camera

### 7.1 Composition

- Use a wide, dark stage with a clear focal region.
- Leave negative space around the subject; do not fill every corner.
- Place the focal subject where its silhouette and action read immediately.
- Keep room edges, floor traces and perspective guides subordinate.
- Avoid enclosing the whole composition inside a decorative glowing frame.
- Avoid defaulting to a centered title above a panel. The scene should be composed around the subject and narration, not around a dashboard template.

### 7.2 Spatial depth

Depth may be suggested with:
- A few perspective floor lines.
- A dim room corner or wall edge.
- Scale and overlap.
- Slight brightness differences between near and far contours.
- A subtle ground contact line or local pool of light.

Do not build a dense 3D wireframe room unless the scene specifically requires it.

### 7.3 Camera behavior

- Default to a locked camera.
- Use a very slow push-in or lateral drift only when it supports the story.
- Keep the subject's line geometry stable; avoid simulated handheld shake.
- Do not use fast zooms, whip pans or interface-like camera transitions by default.
- For technical explanations, use a fixed view while the mechanism is drawn or activated.

## 8. Motion language and timing

Motion should feel like light drawing a subject into existence, not like UI widgets animating.

### 8.1 Preferred actions

- Draw-on reveal: a path is progressively traced.
- Sequential construction: silhouette first, then structural details, then the active component.
- Controlled activation: one important line brightens briefly when it becomes relevant.
- Traveling highlight: a small bright point follows a real route or energy path.
- Pose change: a simplified figure transitions between clear line poses.
- Footstep/contact response: a small floor trace brightens when a foot lands.
- Fade/recede: inactive lines dim while the next important contour appears.

### 8.2 Suggested beat pattern

For a short explanatory shot, consider this flexible order:
1. Darkness / establish the empty stage.
2. Reveal the main silhouette.
3. Add only the structural lines needed to understand it.
4. Animate the key action or mechanism.
5. Emphasize the conclusion with one controlled highlight.
6. Hold a clean, readable final state before transition.

Timing must follow narration and shot duration. Do not force every shot into identical timings.

### 8.3 Motion constraints

- Use deterministic, frame-driven animation in Remotion.
- Reveal SVG paths with stroke-dash techniques or equivalent frame-based masks.
- Stagger related paths so the drawing has a deliberate order.
- Keep glow animation subtle and tied to an event.
- Do not use unseeded randomness, CSS wall-clock animation, timers or uncontrolled flicker.
- Avoid animating all paths at once; the viewer must be guided through the drawing.

## 9. Typography and labels

Typography is not the subject of Glow Sketch. It is a supporting information layer.

- Prefer a restrained sans-serif or technical mono face only when the project calls for it.
- Use warm-white or muted grey for most text; gold is reserved for a key value or active label.
- Keep labels short and large enough to read at final playback size.
- Place labels near the relevant object with clear spacing and a simple leader line when needed.
- Avoid paragraphs, microtext, repeated numeric strings and decorative pseudo-data.
- Do not use glowing button treatments for ordinary headings.
- Do not let the chapter marker, title or progress system dominate the drawing.

All final documentary copy should be added as editable typography in Remotion unless the storyboard specifically requires text to be part of a generated physical object.

## 10. Background and atmosphere

Default background is a clean, nearly black field. Texture is optional, not mandatory.

Allowed only when it supports the shot:
- Very subtle vignette.
- Extremely faint ambient haze behind a hero subject.
- A dim ground plane or a few architectural guide lines.
- A localized reflection beneath a glowing object.

Avoid:
- Visible full-screen scanlines.
- Strong grain/noise.
- Starfields, floating particles and random sparks.
- Bright gradients or colored fog.
- Decorative grids that compete with the subject.

The background should remain dark enough that the linework feels self-illuminated.

## 11. Prompt construction contract

Every image or video prompt for this style must explicitly state:

1. **Style lock:** luminous hand-drawn line art on a nearly black stage; not a HUD, dashboard or cyberpunk interface.
2. **Subject:** one specific person, object or mechanism.
3. **Action/state:** one readable pose or story moment.
4. **Construction:** which contours are hero, structural and guide lines.
5. **Palette:** approved project HEX values and which elements use each color.
6. **Glow:** crisp core, restrained inner light, narrow low-opacity halo.
7. **Composition:** focal placement, negative space, camera angle and crop.
8. **Environment:** only the minimum room/floor/architectural lines required.
9. **Detail budget:** sparse, medium or detailed, with a reason.
10. **Output constraints:** aspect ratio, resolution, clean edges, no unwanted text/logos/watermarks.
11. **Negative constraints:** explicitly prohibit UI/dashboard/HUD elements unless required by the storyboard.

Do not rely on the phrase "neon glow" alone. It is too broad and often causes the model to generate generic cyberpunk visuals.

### Prompt skeleton

```text
Create a [shot size] visual in STYLE-03 GLOW SKETCH.

STYLE LOCK:
A sparse luminous hand-drawn line illustration on a nearly black stage. The subject is constructed from clean glowing contours, as if drawn by light. This is NOT a futuristic user interface, dashboard, HUD, cyberpunk poster, neon sign, or fully rendered 3D scene.

SUBJECT:
[One clearly described subject.]

ACTION / STORY MOMENT:
[One readable pose or mechanism state.]

LINE CONSTRUCTION:
- Hero contours: [subject parts], warm gold [HEX].
- Secondary contours: [supporting parts], warm white [HEX].
- Guide contours: [minimal environment], dim grey [HEX].
- Keep the silhouette clean, connected and recognizable.

GLOW:
Crisp bright line core, restrained inner light, narrow low-opacity outer halo. Preserve deep black between lines. No broad bloom.

COMPOSITION:
[Camera angle, subject placement, negative space, crop.]
Use only the minimum environmental lines needed to establish space.

PALETTE:
[Approved project palette with HEX values.]

DETAIL:
[Sparse / medium / detailed]. Prioritize readability over decoration.

OUTPUT:
[Resolution and aspect ratio]. Clean edges. No watermark, no logo, no unrequested text.

STRICT NEGATIVE CONSTRAINTS:
No dashboard, no HUD, no buttons, no cards, no panels, no decorative progress bars, no status readouts, no full-screen scanlines, no random particles, no rainbow neon, no excessive bloom, no photorealistic shading.
```

## 12. Remotion implementation guidance

When implementing Glow Sketch procedurally:
- Prefer SVG paths for contours and frame-driven path reveals.
- Keep the core stroke, glow layers and optional reflection as separate visual layers.
- Use stable SVG IDs for filters, gradients and masks.
- Keep labels and chapter graphics in a separate foreground layer.
- Use frame-based interpolation for path reveal, opacity and controlled pulses.
- Do not bake important documentary labels into generated artwork.
- Use a small reusable set of glow tokens rather than giving every scene arbitrary blur values.
- Test the actual compressed render; very thin lines and subtle glow may disappear or merge after encoding.

Suggested layer order:
1. Near-black background.
2. Optional faint environment / floor guides.
3. Dim structural contours.
4. Hero contour core and glow.
5. Active path / highlight.
6. Editable labels and narration callouts.
7. Minimal chapter/footer system.

The background must never sit above the linework, and labels must not be hidden by the SVG or glow layers.

## 13. Quality assurance checklist

A Glow Sketch frame is not approved merely because it contains glowing lines.

### Style identity
- [ ] The image reads as a luminous drawing, not a dashboard or HUD.
- [ ] The subject is constructed primarily from contours.
- [ ] The background is nearly black with meaningful negative space.
- [ ] Warm gold and warm-white dominate; secondary colors are restrained.

### Drawing quality
- [ ] The focal silhouette is recognizable at normal playback size.
- [ ] Lines are connected, clean and intentionally layered.
- [ ] Hero, structural and guide line levels are distinguishable.
- [ ] No unnecessary outlines or decorative geometry compete with the subject.

### Glow and contrast
- [ ] The core line remains crisp.
- [ ] The halo is narrow and restrained.
- [ ] Nearby lines do not merge into a bright blob.
- [ ] Black levels remain dark; the whole frame is not washed out.

### Composition and typography
- [ ] One clear focal point dominates.
- [ ] Negative space is preserved.
- [ ] Labels are short, readable and subordinate.
- [ ] No accidental UI elements, microtext or pseudo-data appear.

### Motion and render
- [ ] The reveal order supports the narration.
- [ ] The main subject or mechanism visibly changes when required.
- [ ] No random flicker or uncontrolled movement exists.
- [ ] Start, middle and end frames have been inspected at target resolution.
- [ ] The rendered video has been played at normal speed.

**Automatic rejection conditions:** the result is mainly a grid of glowing controls; the subject is not identifiable; broad bloom destroys line separation; or the frame resembles a generic cyberpunk HUD more than a hand-drawn luminous sketch.

## 14. Benchmark protocol before calling the style production-ready

For a new project, create one controlled style test using the same subject and composition across model iterations. Change only one variable at a time (model, prompt wording, palette or detail level).

Recommended benchmark subject: one simplified human figure standing in a dark room and reaching toward a single outlined object, with a minimal floor trace. This tests figure construction, line hierarchy, negative space and glow without inviting a dashboard layout.

Compare:
- Fidelity to the reference direction.
- Subject readability.
- Line hierarchy and continuity.
- Glow restraint.
- Amount of negative space.
- Unwanted UI drift.

Do not declare a model or prompt successful from one attractive still alone. Approve a style frame, then test a short motion sample before using it throughout a video.

## 15. Do not mix styles by accident

Glow Sketch may depict technical subjects, but it must retain its own line-art construction. Do not borrow:
- Pixel grids and sprite logic from STYLE-01.
- Chalk dust and board surfaces from STYLE-02.
- Low-poly geometry and console-era textures from STYLE-04.
- Comic halftones and impact bursts from STYLE-05.
- Flat filled vector shapes from STYLE-06.
- Pure unlit minimal outlines from STYLE-07.
- Photorealistic materials and cinematic 3D lighting from STYLE-08.
- Brick construction from STYLE-09.
- Soft shaded educational 3D characters from STYLE-10.

A hybrid is allowed only when explicitly selected and documented in the project style lock.
