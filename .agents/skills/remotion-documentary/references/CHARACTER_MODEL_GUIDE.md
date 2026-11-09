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
