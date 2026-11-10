# Character Model Design Guide

This file is only for reusable character and object design. It is separate from topic research, narration and scene workflow. Use it only when the selected visual style needs characters. For object-led explainers, use the Object Model Sheet section.

## Character-design sequence

1. Select and approve a visual style in VISUAL_STYLE_LIBRARY.md.
2. Define the character's narrative role (host, historical person, engineer, worker, civilian, anonymous explainer).
3. Write a character brief without scene-specific actions.
4. Prepare a model sheet.
5. Review and lock the design with the user.
6. Assign a stable Character ID.
7. Reference the locked design in storyboard and scene prompts.

Do not create final character identity while writing the script.

## Character brief fields

- Character ID: CHAR-001
- Name / label:
- Narrative role:
- Fictional, composite or historical:
- Historical period, if relevant:
- Silhouette and body proportions:
- Head / face design:
- Hair / headwear:
- Clothing and material:
- Main colors:
- Distinguishing props:
- Personality and acting range:
- Neutral pose:
- Movement capabilities:
- Features that must never change:
- Allowed scene-specific changes:
- Reference sources (for historical designs):
- Style guide version:

## Required model sheet

For a recurring character, make:

1. Front view, neutral stance.
2. Three-quarter view.
3. Side view.
4. Back view.
5. Expression set: neutral, curious, concerned, surprised, confident (only as needed).
6. Action poses relevant to the story.
7. Scale reference beside recurring props or other characters.
8. Color/material swatches.
9. Detail close-ups for costume or unique features.

All views must depict the same design. Do not change head size, proportions, costume, palette or identifying props between views.

## Consistency rules

- Give every reusable character a stable ID and canonical reference sheet.
- Maintain project/characters/CHARACTER_REGISTRY.md.
- Lock a style guide version across all shots.
- Do not let a prompt invent accessories or change costume details.
- Keep permanent features and left/right orientation consistent.
- Define base proportions before key poses.
- Separate appearance specification from shot action.
- Version any approved design change and list exactly what changed.

## Historical documentary characters

- Separate documented appearance from artistic interpretation.
- Do not invent clothing, insignia, rank, equipment or identity details as facts.
- If references are incomplete, use a clearly labeled stylized/composite design.
- For crowds, define a small set of reusable variants rather than generating many inconsistent individuals.

## Object model sheets

For machines, buildings, vehicles, tools and infrastructure, record:

- Object ID and name
- Purpose in the story
- Overall silhouette and dimensions where factual
- Main components and connections
- Material and color
- Moving/operating parts
- Front/side/top/isometric views as useful
- Cutaway or exploded view when explaining a mechanism
- Fixed vs animated components
- Factual source references
- Simplifications or artistic liberties

For the Dutch water-management documentary, likely reusable objects include a dike cross-section, pump station, sluice gate, canal, polder layout, historic pile foundation and storm-surge barrier.

## Character model prompt

~~~text
Create a MODEL SHEET only. Do not create a storyboard, environment, title card or story scene.

Character ID: [CHAR-001]
Role: [role]
Visual style: [STYLE ID and guide version]
Fictional / composite / historical: [status]
Silhouette and proportions: [description]
Face and head: [description]
Hair / headwear: [description]
Clothing: [description]
Palette: [approved colors]
Props: [approved props]
Required views: front, three-quarter, side, back
Required expressions: [list]
Required action poses: [list]
Consistency constraints: [fixed features]

All views must show the exact same character design.
No extra characters, scene backgrounds, captions, logos or watermarks.
~~~

## Approval output

Before use in Remotion, provide the Character ID/version, approved model sheet location, appearance checklist, allowed variations and historical uncertainties. Do not mark a design locked until the user approves it.


## Mandatory character image-generation stage

After the user approves the character brief, read \`references/IMAGE_GENERATION_WORKFLOW.md\` and provide a Character Model Prompt Pack:
- Character turnaround prompt (front, three-quarter, side and back).
- Expression sheet prompt.
- Action pose sheet prompt.
- Optional separate transparent production-cutout prompt.
- Exact output paths and filename conventions.

The canonical character reference sheet must be stored at:
\`project/assets/references/characters/[CHAR-ID]/v[VERSION]/[CHAR-ID]_model-sheet.png\`

Supporting references go beside it. Production-ready cutouts/sprite frames used by Remotion go in:
\`public/assets/characters/[CHAR-ID]/\`

Do not mix reference/model-sheet images with production-ready assets. Read IMAGE_GENERATION_WORKFLOW.md for approval gates and registry rules.


---

## Character-isolated asset sheets (mandatory for multi-character projects)

The reference-sheet layout should resemble a clean production asset/model sheet: multiple clearly separated views and poses arranged on one canvas, with consistent scale, spacing and a plain uncluttered background. However, **never put different named characters together in one generated character prompt or one character sheet**.

### One character = one independent prompt and one independent output

First create a character inventory and assign stable IDs. Example:

| Character ID | Character | Separate generation |
| --- | --- | --- |
| CHAR-001 | Dog companion | Prompt 01 → its own sheet/image |
| CHAR-002 | Main explorer | Prompt 02 → its own sheet/image |
| CHAR-003 | Supporting guide | Prompt 03 → its own sheet/image |

If a project has N recurring characters, generate N separate character prompts and N separate canonical character sheets. Do not use one group prompt that asks the image model to draw all N characters together. This applies even when the characters appear in the same story or scene.

Each character sheet may contain several views/poses of that **same character only**:
- Front, three-quarter, side and back turnaround views.
- A compact expression row (neutral, happy, concerned, surprised, angry, as relevant).
- A compact action-pose row (idle, walk, run, point, hold/operate a story prop, as relevant).
- Small isolated prop/accessory callouts belonging only to that character.
- A small palette/material swatch strip.

Arrange each view as a distinct, non-overlapping figure with generous whitespace. Keep the character fully visible; do not crop ears, hats, feet, tails, hands or props. Use a plain, neutral, consistent background. Avoid decorative story environments, panels full of text, extra characters and overlapping poses.

### Separate character sheets from individual production assets

The canonical model sheet is a reference document. For actual animation, generate/export separate transparent assets for the individual poses, body parts or props needed by the chosen rig/cut-out workflow. Give every production asset a stable filename. Do not expect Remotion to extract isolated sprites reliably from a composite model sheet.

Suggested per-character files:
- `[CHAR-ID]_model-sheet.png` — one character's complete reference sheet.
- `[CHAR-ID]_expressions.png` — optional expression sheet for the same character.
- `[CHAR-ID]_action-poses.png` — optional action poses for the same character.
- `[CHAR-ID]_idle.png`, `[CHAR-ID]_walk-01.png`, etc. — isolated transparent production poses/sprites when needed.

### Per-character prompt template

~~~text
Create ONE CHARACTER'S PRODUCTION MODEL SHEET. This prompt is for exactly one character, not a group.

PROJECT: [project title]
CHARACTER ID: [CHAR-001]
CHARACTER NAME: [one character name]
ROLE: [story role]
APPROVED STYLE: [style ID and version]
APPROVED PALETTE: [exact palette names and HEX values from PALETTE.md]
APPROVED STYLE REFERENCE: use the attached approved style board as a strict visual guide.
CHARACTER DESIGN: [locked silhouette, proportions, face, clothing/fur, colors, materials and distinguishing features]
SIGNATURE PROPS: [only props assigned to this character]

LAYOUT:
Create a clean, organized model-sheet layout on a plain neutral background. Show this same character in separate, evenly spaced, non-overlapping positions:
1. Front view, neutral standing pose.
2. Three-quarter view.
3. Side view.
4. Back view.
5. [selected expressions] in a small expression row.
6. [selected action poses] in a small action row.
7. Small isolated callouts for this character's signature accessories/props.
8. Small color/material swatches matching the approved palette.

CONSISTENCY:
Every view must be recognizably the exact same character. Preserve head/body proportions, silhouette, markings, clothing, accessories, colors and line weight. Keep scale consistent between views. Make all body parts and props fully visible.

STRICT EXCLUSIONS:
No second character, no crowd, no character lineup, no interaction scene, no storyboard, no environment, no scenery, no title, no captions, no labels, no watermark, and no unrelated props. Do not redesign the approved style or add colors outside the palette.

OUTPUT:
One image containing only this character's organized reference sheet.
Save as [CHAR-ID]_model-sheet.png in:
project/assets/references/characters/[CHAR-ID]/v[VERSION]/
~~~

Repeat this template as a separate prompt for every Character ID. Replace every character-specific field; do not combine prompts.


---

## Dynamic scope — no fixed character or object count

The number of characters and objects is determined by the approved story and scene breakdown. There is no default count and no requirement that every project contain characters. Some projects may need zero characters; others may need one, two, or many.

Before assigning IDs or writing prompts, read `ASSET_PLANNING_GUIDE.md` and identify only recurring or visually important subjects. Do not create a character sheet for every background extra. Use reusable crowd variants or procedural silhouettes when appropriate.

For each independently designed recurring character, create one separate character prompt and one canonical sheet. For objects, machines, vehicles, locations and diagrams, use the corresponding asset category and generate separate prompts only where a dedicated reference is useful. One sheet may contain multiple views of the same subject, never unrelated subjects.

The selected style's dedicated specification under `references/styles/` determines the character proportions, face grammar, materials, linework and presentation. The generic rules in this guide do not override a selected style specification.
