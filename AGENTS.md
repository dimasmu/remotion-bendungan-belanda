# Repository Agent Instructions

For every new documentary project or any Remotion composition/scene change:

1. Read `.agents/skills/remotion-documentary/SKILL.md`.
2. For a new video, follow the project intake wizard in this order: content idea; platform and duration; aspect ratio/resolution; visual style; separate character/object model sheets; research and narration; timecoded 1–5 second breakdown; storyboard; implementation and QA.
3. Read the relevant references before working:
   - Content selection: `.agents/skills/remotion-documentary/references/CONTENT_IDEA_CATALOG.md`
   - Platform/duration/resolution: `.agents/skills/remotion-documentary/references/PLATFORM_PRESETS.md`
   - Visual style: `.agents/skills/remotion-documentary/references/VISUAL_STYLE_LIBRARY.md`
   - Character/object models: `.agents/skills/remotion-documentary/references/CHARACTER_MODEL_GUIDE.md`
   - Production brief template: `.agents/skills/remotion-documentary/templates/PRODUCTION_BRIEF_TEMPLATE.md`
   - Scene/voice-over breakdown: `.agents/skills/remotion-documentary/templates/SCENE_BREAKDOWN_TEMPLATE.md`
4. Ask the user one decision at a time. Do not silently choose the topic, duration or visual style.
5. Work on one scene at a time unless the user explicitly asks for a full-project refactor.
6. Inspect package versions, registered composition, timeline, assets and shared components before editing.
7. Preserve composition ID, dimensions, FPS, total duration and unrelated scenes unless explicitly approved.
8. Never stretch or blindly crop a composition when changing aspect ratio. Create deliberate layouts for each selected destination.
9. Treat a commit as source-control success only. Never claim build, render or visual QA unless actually performed.
10. Do not merge iterative work into `main` without explicit approval.


11. After visual-style approval, read \`.agents/skills/remotion-documentary/references/IMAGE_GENERATION_WORKFLOW.md\` and provide the user with a style-board and style-test-frame prompt.
12. After character/object model approval, provide the corresponding turnaround/model-sheet, expression and action-pose prompts. Ask for approval before using them in scenes.
13. Store character reference/model sheets in \`project/assets/references/characters/[CHAR-ID]/v[VERSION]/\`; store only approved render-ready cutouts and sprite frames in \`public/assets/characters/[CHAR-ID]/\`.
14. Store style reference boards in \`project/assets/references/visual-style/[STYLE-ID]-v[VERSION]/\` and object references in \`project/assets/references/objects/[OBJ-ID]/v[VERSION]/\`. Keep source prompts and approval metadata beside them.
15. Do not mix AI reference sheets with assets actually used by Remotion. Read IMAGE_GENERATION_WORKFLOW.md for exact prompts, naming and approval gates.
