# Remotion Composition Architecture

**Scope:** Global reusable architecture for every documentary project created from this template.  
**Default pattern:** One independently registered scene Composition per scene, plus one master Composition that assembles the complete video.

## 1. Goals

Every scene should be independently previewable, renderable, testable and reviewable, while the complete documentary remains renderable as one master video.

Do not confuse:
- A **React scene component**: reusable implementation code.
- A **scene Composition**: a registered Remotion entry with its own preview/render configuration.
- A **master Composition**: the final timeline that assembles scene compositions/components in narrative order.
- A **Sequence**: a time-offset container inside a Composition; it does not automatically create a separately registered Composition in Studio.

Creating seven TSX files does not by itself create seven selectable compositions in Remotion Studio. Register the scene compositions explicitly in the Remotion root.

## 2. Required architecture

Use this logical structure, adapting names to the project:

```text
src/
├── Root.tsx
├── compositions/
│   ├── DocumentaryMaster.tsx
│   └── scenes/
│       ├── Scene01Composition.tsx
│       ├── Scene02Composition.tsx
│       └── ...
├── scenes/
│   ├── scene-01/
│   │   ├── Scene01.tsx
│   │   └── ...
│   ├── scene-02/
│   │   ├── Scene02.tsx
│   │   └── ...
│   └── ...
├── components/
│   ├── SceneShell.tsx
│   ├── transitions/
│   └── ...
├── data/
│   ├── timeline.ts
│   └── ...
└── styles/
    ├── palette.ts
    └── ...
```

The exact folder layout may vary, but responsibilities must remain clear:
- Scene components contain that scene's visual implementation.
- Scene Composition wrappers provide the standalone scene preview/render context.
- The master Composition assembles all scenes in the approved order.
- Shared components, style tokens, fonts and helpers live outside individual scene folders.
- Timeline metadata is defined once and reused by both scene registrations and the master.

## 3. Registration rules

Register the master Composition and every standalone scene Composition in `src/Root.tsx`.

Use stable, descriptive IDs, for example:
- `DocumentaryMaster`
- `Scene01_Hook`
- `Scene02_TheNumbers`

Each scene Composition must have:
- The project's approved width and height.
- The same project FPS as the master.
- A standalone duration matching the scene's local duration.
- The same shared fonts, palette, background and design system as the master.
- A clear Studio display name.
- A stable component implementation that does not depend on being mounted inside the master timeline.

The master Composition must have:
- The approved full-video duration.
- The same width, height and FPS as the scene compositions.
- Every scene assembled in the approved order.
- Exact scene durations and start frames from the shared timeline definition.
- Explicit transition/overlap behavior where the storyboard requires it.

Do not register a scene composition by copying its entire scene implementation. The standalone Composition and master should reuse the same scene component.

## 4. Single source of truth for timeline

Create one typed timeline configuration containing, at minimum:
- Scene ID and stable composition ID.
- Scene name.
- Start frame or ordering.
- Duration in frames.
- Optional transition/overlap metadata.
- Optional approval/QA status if useful.

Prefer deriving cumulative start frames from ordered durations rather than manually duplicating numbers in multiple files. If explicit `from` values are stored, add validation that scenes are contiguous (or intentionally overlap), have no accidental gaps, and cover the master duration.

Add runtime or build-time assertions for:
- Positive integer durations.
- Unique scene IDs and composition IDs.
- Consistent FPS and dimensions.
- Valid ordering.
- Expected total master duration.
- Explicitly documented intentional gaps/overlaps.

Avoid scattering magic frame numbers across scene components. Scene-local animation should use local frame time; master-level transitions should use global timeline metadata.

## 5. Frame coordinate rules

A standalone scene Composition starts at local frame 0. The same scene rendered inside the master should behave identically.

- Use `useCurrentFrame()` for deterministic frame-based animation.
- Inside a scene's local Sequence, treat the frame as scene-local.
- Do not add the global start frame a second time.
- If a shared overlay needs global progress, pass the global frame or derive it deliberately from the timeline metadata.
- Do not make a scene's animation depend on the master Composition being its parent.
- Use the actual FPS from `useVideoConfig()`; do not assume 30 FPS in reusable components.

Test the standalone scene and the same scene in the master at matching local frames. Their scene content should match, excluding intentionally master-only transitions or global overlays.

## 6. Shared design and global overlays

Keep shared visual rules centralized:
- Scene background / atmosphere.
- Typography and font loading.
- Color palette and visual tokens.
- Safe areas and layout constants.
- Chapter/progress indicator.
- Grain, vignette and global texture.
- Common transitions and reusable diagram primitives.

Decide explicitly whether each global overlay belongs:
- Inside every standalone scene, so scene previews match the final video; or
- Only in the master, when it is truly a master-level element.

Avoid accidentally rendering duplicate progress bars, backgrounds, audio or overlays when nesting scenes in the master. Use explicit props or separate scene-content and scene-frame wrappers where needed.

The standalone scene Composition should preview the intended scene appearance. The master must not double-wrap it in a second copy of the same background or global overlay.

## 7. Audio and transitions

Keep narration, music and sound effects ownership explicit:
- Scene-specific voice-over/SFX may live with the scene or be composed at master level, but never both.
- Global music beds generally belong at master level.
- Define audio start offsets and trim behavior in the timeline.
- Avoid duplicate audio when a scene is reused in both standalone and master compositions.

Use the storyboard to determine hard cuts, fades, dips, overlaps or other transitions. Do not add a transition merely because a helper exists. Master-only transitions should not change the standalone scene's own visual content.

## 8. Render and QA workflow

For every scene:
1. Preview its standalone Composition in Remotion Studio.
2. Render a representative still at the opening, key action, resolution and final valid frame.
3. Render a short scene MP4 when motion/audio needs inspection.
4. Check typography, safe areas, clipping, contrast, frame timing and visual continuity.
5. Mark its QA state only after the relevant checks are actually performed.

For the master:
1. Verify total duration and scene boundaries.
2. Inspect frames immediately before, at and after every scene boundary.
3. Check transitions and audio continuity.
4. Render the complete master MP4.
5. Play the complete MP4 at normal speed and inspect the final output.

A scene composition compiling does not prove the master works. A master preview does not prove the final encoded video is correct. Never claim a check that was not performed.

## 9. Suggested commands and render naming

Use the project's actual scripts and registered IDs. Example commands (adapt IDs and paths):

```bash
# Preview Studio
npm run dev

# Render one standalone scene
npx remotion render Scene03_SignalPath out/scenes/scene-03-signal-path.mp4

# Render the master
npx remotion render DocumentaryMaster out/documentary-master.mp4
```

Do not add permanent output files to source control unless the user explicitly asks. Use the project's ignored output directory.

## 10. When a single Composition is sufficient

The hybrid pattern is the default for documentary projects because it supports independent review and final assembly. A single Composition with multiple Sequences may be used when:
- The project is a small one-off with no need for independent scene rendering.
- Scene components are not expected to be reviewed or reused separately.
- The user explicitly prefers a single Studio entry.

Document the exception in the project README or production brief. Do not silently omit standalone scene compositions from a project that is expected to use the standard workflow.

## 11. Project branch vs template branch

The reusable architecture belongs in `feat/template-remotion`. Project-specific scene code and timeline data belong only in the video's feature branch.

When this architecture or another reusable rule changes:
1. Update the relevant global reference/skill and repository-level agent instructions on `feat/template-remotion`.
2. Keep the change generic; do not copy Enigma names, frame values, assets or story details into the template.
3. Commit and push the template change.
4. In an existing video branch, merge/pull the updated template branch into that project branch when the user chooses to sync it.
5. Resolve conflicts carefully, preserving project-specific work and applying only reusable changes.
6. Never merge a project branch back into the template without explicit user approval.

Recommended sync from an existing project branch:

```bash
git switch feat/<video-title-slug>
git fetch origin
git merge origin/feat/template-remotion
```

The user's shorthand `git pull origin feat/template-remotion` while checked out on the project branch also fetches and merges that remote template branch into the current project branch. Prefer the explicit fetch + merge commands above because they make the operation easier to inspect and resolve.

## 12. Completion checklist

- [ ] Every scene has a reusable React scene component.
- [ ] Every scene is registered as a standalone Remotion Composition.
- [ ] The master Composition is registered separately.
- [ ] Standalone and master use the same FPS, dimensions, fonts and visual tokens.
- [ ] One timeline configuration controls order and duration.
- [ ] Scene-local frame behavior is correct in standalone and master contexts.
- [ ] Shared overlays/audio are not duplicated.
- [ ] Individual scenes have been previewed and QA'd.
- [ ] Master boundaries, transitions and audio have been checked.
- [ ] Final encoded master has been rendered and played.
- [ ] No project-specific content has been added to the reusable template branch.
