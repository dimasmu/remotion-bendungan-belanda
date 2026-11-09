# Image Generation Workflow for Visual Style, Characters and Objects

This guide tells the agent when and how to produce image-generation prompts after the user has selected a visual style and approved a character/object brief.

It defines prompts and file organization. It does not require generating images automatically. Unless the user explicitly asks the agent to generate the image using an available image tool, provide ready-to-copy prompts and wait for the user's image approval.

## 1. Where this sits in production

Required order:

1. User approves a content idea.
2. User selects platform, duration and aspect ratio.
3. User selects a visual style from VISUAL_STYLE_LIBRARY.md.
4. Agent writes the project style guide.
5. Agent creates and presents a **Visual Style Prompt Pack**.
6. User generates/reviews/approves the style reference image.
7. If characters are needed, agent creates a character brief and stable Character ID.
8. Agent writes and presents a **Character Model Prompt Pack**.
9. User generates/reviews/approves the character model sheet.
10. Agent writes a scene/object-specific prompt pack only when new assets are needed.
11. Approved references are stored in the correct folders and registered.
12. Only then does the agent produce final storyboards and scene implementation prompts.

Do not generate a character before the style is approved. Do not ask an image model to invent the story, historical facts or engineering mechanism.

## 2. Exact folder structure

Keep **AI reference images** separate from **render-ready assets**.

~~~text
project/
  production/
    PRODUCTION_BRIEF.md
  research/
    RESEARCH_BRIEF.md
    SOURCES.md
  script/
    VOICEOVER_SCRIPT.md
    SCENE_BREAKDOWN.md
  style/
    STYLE_GUIDE.md
    PALETTE.md
    CAMERA_AND_LIGHTING.md
  assets/
    references/
      visual-style/
        STYLE-01-v001/
          STYLE-01_style-board.png
          STYLE-01_environment-test.png
          STYLE-01_motion-reference.png
          PROMPTS.md
          APPROVAL.md
      characters/
        CHAR-001/
          v001/
            CHAR-001_model-sheet.png
            CHAR-001_expressions.png
            CHAR-001_action-poses.png
            CHAR-001_front.png
            CHAR-001_three-quarter.png
            CHAR-001_side.png
            CHAR-001_back.png
            PROMPTS.md
            CHARACTER.md
            APPROVAL.md
      objects/
        OBJ-001/
          v001/
            OBJ-001_model-sheet.png
            OBJ-001_cutaway.png
            OBJ-001_detail-views.png
            PROMPTS.md
            OBJECT.md
            APPROVAL.md
    generated/
      temp/
        [unapproved experiment files]
  characters/
    CHARACTER_REGISTRY.md
  objects/
    OBJECT_REGISTRY.md
  qa/
    IMAGE_REFERENCE_QA.md

public/
  assets/
    characters/
      CHAR-001/
        CHAR-001_idle.png
        CHAR-001_walk_0001.png
        CHAR-001_walk_0002.png
    objects/
      OBJ-001/
        OBJ-001_front.png
        OBJ-001_cutaway.png
    backgrounds/
    illustrations/
    textures/
    images/
    video/
    audio/
    fonts/
~~~

### Folder rules

- \`project/assets/references/\` stores the model sheets, style boards, reference images and prompt files that agents consult. These are not automatically render assets.
- \`project/assets/generated/temp/\` stores unapproved experiments. Never let an unapproved image silently become a production asset.
- \`public/assets/\` stores only the final approved images, cutouts, sprite frames, backgrounds, videos, audio and fonts that Remotion actually loads.
- \`project/characters/\` and \`project/objects/\` store registries and design specifications, not the only copy of the images.
- Character reference sheets belong under \`project/assets/references/characters/CHAR-001/v001/\`.
- The production-ready transparent character renders / sprite frames belong under \`public/assets/characters/CHAR-001/\`.
- Do not place the canonical model sheet inside \`public/\` unless the video intentionally displays that sheet. This avoids mixing design documentation with render inputs.
- If the repository does not already contain \`project/\`, create it. The folders are part of the project convention, not a Remotion-enforced directory structure.
- Use forward slashes in paths even on Windows.
- Use lowercase file extensions and stable IDs. Do not use filenames such as \`final2-new.png\`, \`image123.png\` or \`latest-character.png\`.

### How Remotion uses production assets

Remotion's standard convention is to place media files in the project's \`public/\` directory and reference them with \`staticFile()\`. For example:

~~~tsx
import {Img, staticFile} from "remotion";

<Img src={staticFile("assets/characters/CHAR-001/CHAR-001_idle.png")} />
~~~

For the reference/model-sheet folder outside \`public/\`, do not use \`staticFile()\`; those files are for the agent/designer, not automatically loaded by the composition. See the official Remotion asset guide:
https://www.remotion.dev/docs/assets

## 3. Prompt-pack output contract

After a style is selected, the agent must present:

1. Selected style ID and version.
2. Short description of what the image will validate.
3. One ready-to-copy **Style Board Prompt**.
4. One ready-to-copy **Style Test Frame Prompt** using the approved topic as content context.
5. A concise negative/avoid list.
6. Recommended aspect ratio and image output size.
7. Exact save location and expected filename.
8. Approval checklist.

After a character brief is approved, the agent must present:

1. Character ID and version.
2. Short appearance specification copied from the approved character brief.
3. One ready-to-copy **Character Turnaround Prompt**.
4. One **Expression Sheet Prompt**.
5. One **Action Pose Sheet Prompt**.
6. Optional prompts for separate clean transparent renders / sprite frames if the animation needs them.
7. Required image reference to attach (approved style board and/or existing character sheet).
8. Exact save locations and filenames.
9. Consistency checklist and forbidden changes.

Do not overwhelm the user with every possible prompt. Present the minimum set that is useful for the selected visual style and intended video. Character-free / object-led explainers do not need a character prompt pack.

## 4. General prompt-construction rules

Every image-generation prompt should state:

- What type of image is being generated (style board, environment test, turnaround sheet, expression sheet, pose sheet, object cutaway).
- Intended aspect ratio and preferred image dimensions.
- Approved visual style and version.
- Exact subject description.
- Composition and camera angle.
- Lighting, palette, materials, line/edge treatment and detail level.
- Which features must remain consistent.
- What must not appear.
- Whether text is allowed. By default, avoid generated text, captions, logos and watermarks because these are usually added later in Remotion.
- Whether the image is a reference sheet or a render-ready asset.
- The output filename and project folder.

For image references, instruct the model to use attached approved references as visual identity/style constraints, not as permission to redesign them. Do not ask the generator to reproduce factual labels or precise engineering dimensions inside the image; add precise labels and measurements later in Remotion.

## 5. Style prompt template

~~~text
Create a VISUAL STYLE REFERENCE BOARD only. This is an art-direction validation image, not a finished video scene and not a storyboard.

PROJECT:
[Project title]

SELECTED STYLE:
[STYLE ID — style name — version]

CONTENT CONTEXT:
[One-sentence description of the approved subject. Do not add new facts.]

CANVAS:
Landscape 16:9 reference sheet, high resolution, intended for visual inspection.

ART DIRECTION:
[Shape language, outline/edge rules, detail level, palette, materials, textures, lighting, shadows, camera perspective and atmosphere copied from the approved STYLE_GUIDE.md.]

SHOW:
1. One representative environment.
2. One representative hero subject or object.
3. One close-up showing the surface/material treatment.
4. A small visual palette of the approved colors without written color names.

CONSISTENCY:
All areas must look like the same project, made by the same art team, with identical line treatment, palette, lighting logic and detail level.

DO NOT:
- Do not create the final storyboard or a multi-scene collage.
- Do not invent historical or technical facts.
- Do not change the approved style.
- Do not introduce unapproved colors, props, characters or logos.
- Do not add readable text, labels, watermarks or UI.
- Do not mix 2D and 3D rendering unless the selected style requires it.

OUTPUT:
Save as [STYLE-ID]_style-board.png in:
project/assets/references/visual-style/[STYLE-ID]-v[VERSION]/
~~~

## 6. Example style prompt — detailed documentary stickman

~~~text
Create a visual style reference board for a detailed documentary stickman series.

This is a visual-style test only, not a storyboard and not a finished video frame.

Canvas: 16:9 landscape, high resolution.

Style: detailed documentary stickman illustration. Characters have simple, readable stickman silhouettes with round heads, clean expressive faces, consistent black line weight and restrained proportions. Environments, machinery, architecture and props are richly illustrated and more detailed than the characters, but they must still belong to one coherent 2D illustrated world.

Show:
- One representative street or industrial environment.
- One anonymous stickman engineer in a neutral standing pose.
- One close-up of a mechanical object with hand-drawn detail.
- A small palette of dark ink, warm off-white, muted teal, ochre and brick red.

Visual treatment: hand-drawn 2D illustration, controlled ink outlines, layered color blocks, subtle paper grain, cinematic depth through overlapping foreground/midground/background, directional soft light, detailed but readable props.

Character proportions must remain simple and consistent. Do not turn characters into realistic humans. Do not create a Pixar-like 3D render, photorealistic scene, anime face or glossy vector icon.

No text, title, logo, watermark, extra captions or comic speech bubbles.
~~~

## 7. Example style prompt — technical blueprint / infographic

~~~text
Create a visual style reference board for a technical documentary infographic series.

This is an art-direction sample only, not a complete engineering diagram and not a final video frame.

Canvas: 16:9 landscape, high resolution.

Style: premium technical blueprint motion-graphics language. Deep navy background, precise cyan and warm amber linework, clean sectional geometry, subtle grid, dimensional callout markers, measured line weights, restrained glow and clear visual hierarchy.

Show:
- One simplified infrastructure cutaway.
- One isolated mechanical component.
- One close-up of technical linework and material hatching.
- A small palette of navy, cyan, pale grey and amber swatches.

The visual language must feel precise, calm and documentary-grade. Use straight leaders, alignment guides and clear negative space. Avoid clutter.

Do not invent exact dimensions, data, engineering claims, labels or units. Add real measurements and labels later from verified research. No logos, fake writing, watermark or photorealistic people.
~~~

## 8. Style test frame prompt

After the style board is approved, create one representative frame using the selected video's actual subject. It validates whether the art direction works at the chosen platform resolution.

~~~text
Create one STYLE TEST FRAME for the approved documentary project.

Use the attached approved style board as the strict visual reference. Match its palette, line quality, materials, lighting, camera language and detail budget.

Approved subject: [one factual subject from the selected research topic].
Moment in story: [one sentence describing this exact shot].
Composition: [selected platform aspect ratio and resolution].
Main focal subject: [subject].
Environment: [environment].
Camera: [shot size, angle and perspective].
Lighting: [approved lighting direction].
Motion implication: [describe a clear pose or visual state that can later be animated].

Show one clear visual idea, with intentional negative space for typography that will be added in Remotion. Do not add any title, caption, UI, labels, logo or watermark. Do not invent objects or facts absent from the approved content brief.
~~~

## 9. Character prompt pack

The model sheet is a design reference, not a scene. Generate separate sheets in sequence to avoid changing a character while trying to fit every pose into one crowded image.

### A. Character turnaround prompt

~~~text
Create a CHARACTER MODEL TURNAROUND SHEET only. Do not create a storyboard or story scene.

CHARACTER ID: [CHAR-001]
VERSION: [v001]
ROLE: [role]
IDENTITY STATUS: [fictional / composite / historical, as approved]

CANONICAL APPEARANCE:
[Paste the complete approved Character Brief. Do not invent additional design details.]

STYLE:
Use the attached approved STYLE GUIDE / STYLE BOARD as a strict reference. Match the exact line treatment, proportions, palette, shading and material style.

LAYOUT:
Show exactly the same character in four full-body views:
1. Front view.
2. Three-quarter view.
3. Side profile.
4. Back view.

Keep the character the same height and scale in all four views. Use a neutral standing pose, consistent anatomy, identical clothing, same hair/headwear, same accessories, same colors and same proportions. Orthographic/model-sheet presentation, consistent camera height, neutral plain background, even studio lighting.

The face and costume must be recognizable as the same individual from every angle. Keep feet and top of head fully inside every view. Leave generous spacing between views.

Do not add other characters, props not present in the brief, new costume parts, text labels, captions, logos, borders or watermarks. Do not use perspective distortion or dramatic camera angles. Do not redesign the character.

OUTPUT:
[CHAR-ID]_model-sheet.png
Save to:
project/assets/references/characters/[CHAR-ID]/v[VERSION]/
~~~

### B. Expression sheet prompt

~~~text
Create an EXPRESSION REFERENCE SHEET for [CHAR-ID], using the attached approved model sheet as the exact identity reference.

Show the same character's head and shoulders in a clean 2x3 grid:
neutral, curious, concerned, surprised, confident and explaining.

Keep head shape, eye style, facial proportions, hair/headwear and line style identical in every expression. Only expression changes. Neutral plain background, same camera scale and lighting. No extra costume/accessory changes. No text, labels, logos or watermark.

Save as [CHAR-ID]_expressions.png in project/assets/references/characters/[CHAR-ID]/v[VERSION]/.
~~~

### C. Action pose sheet prompt

~~~text
Create an ACTION POSE REFERENCE SHEET for [CHAR-ID]. Use the attached approved model sheet as a strict identity reference.

Show the same character in four full-body poses relevant to this project:
[POSE 1], [POSE 2], [POSE 3], [POSE 4].

The character's design must not change: identical head/body proportions, face, costume, palette, footwear, accessories and line treatment. Only pose and expression may change. Each pose must be clearly separated and fully visible, with no overlapping limbs. Use the same approved visual style and a plain neutral background.

Do not add unapproved objects, clothing details, characters, captions, labels, logos or watermark.

Save as [CHAR-ID]_action-poses.png in project/assets/references/characters/[CHAR-ID]/v[VERSION]/.
~~~

### D. Clean production cutout prompt

Use only after the model sheet is approved. This is a production asset that may go into Remotion's public folder.

~~~text
Create one production-ready full-body character render of [CHAR-ID], matching the attached approved model sheet exactly.

Pose: [specific pose].
Facing direction: [front / 3-quarter left / 3-quarter right / profile].
Expression: [expression].
Keep the canonical design unchanged: [short identity checklist].
Full body visible, feet and head not cropped, centered with enough transparent padding. Isolated subject, transparent background (alpha), no ground shadow unless requested, no text, no labels, no border, no watermark, no extra props.

The output must be a clean reusable asset, not a model sheet or a scene illustration.
Preferred format: PNG with alpha.
Save as [CHAR-ID]_[POSE]_[DIRECTION].png in:
public/assets/characters/[CHAR-ID]/
~~~

Note: if the image tool does not support a true alpha channel, generate on a flat solid background suitable for clean removal and verify the result before placing it in public/.

## 10. Object model prompt pack

For an object or mechanism such as a pump station, dike or light bulb, use an object-specific model sheet:

~~~text
Create an OBJECT MODEL SHEET for [OBJ-001 — object name].

Purpose in story: [approved purpose].
Factual reference: [approved research/source summary].
Visual style: match [STYLE-ID and version].
Required views: [front, side, top, isometric, cutaway, exploded view as useful].
Fixed components: [list].
Moving components: [list].
Materials and approved colors: [list].
Mechanism: [explain only verified mechanism].
Simplifications: [list any intentional simplification].

Keep the object structurally consistent across views. Do not invent components, measurements, labels, logos or functions. Leave labels out; precise annotations will be added in Remotion.

Save as [OBJ-ID]_model-sheet.png in:
project/assets/references/objects/[OBJ-ID]/v[VERSION]/
~~~

## 11. Approval and promotion rules

- Generated images first go into \`project/assets/generated/temp/\` or the relevant reference folder with status "pending".
- The user must approve the style board before character generation.
- The user must approve the character turnaround before expression/action/production cutouts are treated as canonical.
- Do not overwrite an approved image. Create v002 and record the change.
- Update APPROVAL.md with approved-by, date, version, prompt file, final image names and notes.
- Only approved production-ready outputs are copied to \`public/assets/\`.
- Update ASSET_REGISTRY.md with ID, file path, source/generator, prompt file, date, license/rights status, approval status and scene usage.
- Keep the prompt text in PROMPTS.md alongside the source reference.
- Never use an unapproved experiment image for a final render.
- Do not send the user only a folder path: also provide a checklist of the exact expected filenames.

## 12. AI agent response format

After a visual style is selected, respond with:

1. Style selected and what visual aspects the prompt will lock.
2. Style Board Prompt (ready to copy).
3. Style Test Frame Prompt (ready to copy, using the selected project topic).
4. Where to save the outputs.
5. What the user should send back / approve.

After the character brief is approved, respond with:

1. Character ID and canonical description.
2. Turnaround Prompt.
3. Expression Prompt.
4. Action Pose Prompt.
5. Optional clean-cutout prompt.
6. The exact path and filenames for each.
7. A consistency checklist.

Do not jump directly to coding when an image reference is expected but not yet generated/approved.
