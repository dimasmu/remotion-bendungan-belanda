# Scene QA — Enigma Shorts

Rule: a scene is not done until its stills are rendered and inspected, and Studio playback is checked.

| Scene | Code | Still frames inspected | Motion checked | Status |
| --- | --- | --- | --- | --- |
| S1 Hook | done | 90, 150, 209 | not played in Studio; sampled stills only | code-complete, stills OK |
| S2 Number | done | 210, 260, 300, 380, 480 | not played in Studio; sampled stills only | code-complete, stills OK |
| S3 Signal path | done | 510, 660, 800 (rotor route redrawn after first pass) | not played in Studio; sampled stills only | code-complete, stills OK |
| S4 Flaw | done | 840, 900, 945, 1000 (layout fixed), 1040 (layout fixed), 1100, 1165 | not played in Studio; sampled stills only | code-complete, stills OK |
| S5 Bombe | done | 1170, 1220, 1290, 1340, 1400, 1439 | not played in Studio; sampled stills only | code-complete, stills OK |
| S6 Timeline | done | 1440, 1540, 1619 | not played in Studio; sampled stills only | code-complete, stills OK |
| S7 Payoff | done | 1620, 1710, 1799 | not played in Studio; sampled stills only | code-complete, stills OK |

## Global status (actually run)

- Code committed: pending (not yet committed at time of writing).
- `tsc --noEmit`: pass, no errors, run directly via `node_modules/.bin/tsc.cmd`.
- `eslint src` (direct binary, not the `rtk lint` wrapper, which errors on its own tooling): pass, 0 problems.
- Still frames rendered and inspected from the checklist (0, 90, 209, 240, 380, 509, 560, 700, 839, 900, 1000, 1169, 1250, 1380, 1439, 1500, 1619, 1700, 1799): all 19 rendered without error; 240, 1169 and 1439 (scene-boundary frames) individually inspected and show no bleed-through or overlap. Remaining frames in the list were covered by the more granular per-scene QA above.
- Studio playback (`npm run dev`, scrubbing the full 60 s): **not performed**. Only still frames were inspected; continuous motion (e.g. stutter, flicker, timing of staggered reveals) has not been visually confirmed end to end.
- Final render: `npx remotion render src/index.ts EnigmaShorts out/enigma-shorts.mp4` completed, exit code 0, 1800/1800 frames rendered and encoded, output file `out/enigma-shorts.mp4` (8.1 MB). The rendered MP4 itself has not been played back and watched end to end; only the still-frame checks above were done.
- Known open items: no audio (VO not recorded yet, by design); Studio scrub and full MP4 playback still outstanding; S3's rotor-step visual reads as a schematic difference rather than a literal rotor mechanism, consistent with its "SKEMA" labelling.

