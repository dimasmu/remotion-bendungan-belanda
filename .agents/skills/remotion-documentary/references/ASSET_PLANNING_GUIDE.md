# Dynamic Asset Planning Guide

## Core rule: derive asset count from the approved project

There is no fixed number of characters, objects, backgrounds, vehicles, locations, diagrams or image prompts. Never assume three characters, five objects, or any preset count.

The agent must inspect the approved research, narration, scene breakdown and storyboard, then determine the assets actually required to communicate the story clearly and maintain continuity.

**One required reusable asset = one independently identifiable asset record.** Generate a dedicated prompt only when an asset needs a separately generated reference or production file. Several assets may be created from one prompt only when they form one coherent set or assembly and can be separated reliably; do not bundle unrelated subjects.

## Asset discovery workflow

1. Read the approved script and scene breakdown.
2. Inspect every scene/beat and note visible subjects, props, locations, environments, diagrams and transitions.
3. Identify recurring entities versus one-off background details.
4. Decide which items need canonical reference sheets, which need isolated production images/sprites, which can be drawn procedurally in Remotion, and which can be reused from an existing approved asset.
5. Deduplicate repeated entities across scenes. A recurring dog is one character asset with multiple required poses, not a new character in every scene.
6. Create an asset inventory with only the items justified by the story.
7. Assign stable IDs by category and output one prompt per independently generated asset.
8. Present the inventory and prompt count to the user for approval before image generation.

## Asset categories and IDs

Use only categories needed by the project:
- Character: CHAR-001...
- Object/prop: OBJ-001...
- Environment/location: ENV-001...
- Vehicle: VEH-001...
- Architecture/infrastructure: ARC-001...
- Diagram/map/chart: DIA-001...
- Creature/animal: CRE-001...
- Background plate: BG-001...
- FX/texture: FX-001...

IDs are sequential within each project and category. Do not create empty categories or placeholder records.

## Decide the right asset treatment

For each inventory item choose one:
- **Reference sheet:** recurring character, hero object, machine or location whose design must remain consistent.
- **Isolated production asset:** transparent cutout, sprite, pose, prop or background plate used in the composition.
- **Procedural Remotion graphic:** simple shapes, labels, arrows, charts, lines, maps or diagrams better built in code.
- **Reuse:** an already approved project asset.
- **No asset needed:** represented by typography, camera framing, narration or a simple transition.

A model sheet is not automatically a sprite atlas. Generate transparent isolated production components separately when the implementation requires them.

## Dynamic prompt count

Prompt count is determined by the approved asset inventory, not a preset. Examples:
- A two-person interview may need two character prompts, one location prompt and a few reusable props.
- An object-only engineering explainer may need zero character prompts and several machine/component prompts.
- An animal story may need one or more creature prompts and no human character prompts.
- A historical battle may need a small set of representative character designs, environment/vehicle references and procedural crowd treatment rather than a prompt for every background person.

State the actual count in the production plan: e.g. "4 character prompts, 3 object prompts, 2 environment prompts, 1 diagram prompt." If no character is needed, explicitly say "0 character prompts" and explain that this is intentional.

## Asset inventory template

| Asset ID | Name | Category | Scene/beat usage | Recurring? | Treatment | Prompt required? | Status |
|---|---|---|---|---|---|---|---|
| [ID] | [name] | [category] | [scene IDs] | [yes/no] | [sheet/isolated/procedural/reuse/none] | [yes/no] | [planned/approved/generated/QA] |

## Per-asset prompt contract

Every independent prompt must specify:
- Project and asset ID/name/category.
- The selected style guide filename and version.
- The approved palette (exact HEX values).
- Reference images to follow.
- Only the subject(s) belonging to that asset record.
- Required views, poses, components or states based on scene needs.
- Background/alpha requirements and intended Remotion usage.
- Exact output path and filename.
- Negative constraints preventing style drift and unrelated additions.

For a character, create one character-only prompt and sheet. For an object, create one object-only prompt/sheet. For an environment, create one environment prompt. Do not combine unrelated characters and objects into one generation merely to reduce prompt count.

## Prompt and output directories

- Final approved assets only: `public/assets/<category>/<descriptive-filename>`.
- Prompt iteration, model sheets, alternatives and visual approval: Google Flow.
- Keep a lightweight asset inventory in the production brief or scene breakdown; do not create a separate nested asset archive.

## Approval and change control

The agent must show the proposed asset inventory and prompt count before generation. Do not invent assets to fill a quota. Do not generate assets for every beat if an existing asset or procedural graphic is sufficient. Any new asset discovered during build must be added to the registry with a reason and user approval when it changes scope or generation cost.


---

## Production method and Remotion integration are per-asset decisions

For every inventory item, choose a production method and an animation/integration method independently. Read `PRODUCTION_METHODS_AND_ANIMATION.md` before finalizing the inventory.

Allowed production methods include AI-generated still, AI-generated video, Blender/3D, SVG/React/Canvas procedural graphics, licensed stock media, hybrid compositing, reuse, or no new asset. Do not assume all assets should be image-generated.

Record at minimum: visual style ID, production method, output format, transparency/layer requirements, animation method, source/license and Remotion integration path.

A high-detail image is a valid Remotion asset. So are video plates, image sequences, SVGs, transparent renders and procedural React graphics. Choose based on the shot's requirements, not on a low-poly/stickman-only assumption.

---

## Final repository exports only

All prompt/image revision and iteration is performed by the user in Google Flow. This repository receives only approved final assets for the video.

After the asset inventory is approved and the result is finalized in Google Flow:
- Export the final asset directly to `public/assets/<category>/`.
- Use simple category folders and descriptive filenames.
- Do not create intermediate, draft, temp, generated, reference, model-sheet or version directories in the repository by default.
- Keep unused variations and working references in Google Flow.
- A model sheet is optional; only export it if the sheet itself is used in the video or the user explicitly requests it.
- If the final shot needs separate layers, export only the approved layers required for compositing.

The lightweight inventory should point to the final repository path. It should not become a second asset archive.
