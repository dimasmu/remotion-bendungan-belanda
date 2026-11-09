# Timecoded Scene & Voice-over Breakdown

This is the handoff between research/scriptwriting, voice recording and Remotion animation.

## Timing rules

- Split the video into macro scenes / chapters.
- Within each macro scene, split the narration into short visual beats, normally 1–5 seconds each.
- A common example is 00:00–00:05, 00:05–00:10, 00:10–00:15.
- Do not break a sentence unnaturally just to make every unit exactly five seconds.
- Let natural narration pace and pauses determine beat length.
- Timecodes refer to the full video timeline.
- At 30 FPS, 5 seconds = 150 frames. 00:00–00:05 is inclusive frames 0–149, or a half-open code range [0, 150).
- Record each narration beat as a separate clip when practical. The recorded file duration is authoritative; script estimates are not.
- Do not create a React component for every 5-second beat by default. A macro scene can contain several timeline beats.

## Required fields per beat

1. Global timecode in/out.
2. Global frame in/out.
3. Macro scene / chapter.
4. Exact voice-over text.
5. Approximate word count and target read duration.
6. On-screen text (shorter than the narration).
7. Visual subject/action.
8. Primary motion graphics.
9. Typography entrance/emphasis/exit.
10. Camera motion.
11. Music, ambience and SFX cue.
12. Asset IDs and continuity notes.

## Example: Netherlands water engineering (illustrative)

| Timecode | Frames at 30 FPS | Exact voice-over | Visual / motion | On-screen text |
| --- | --- | --- | --- | --- |
| 00:00–00:05 | 0–149 | “Much of the Netherlands lies close to, or below, sea level.” | Map pushes toward the Dutch coast; coastline draws on; datum line sweeps across. | BELOW SEA LEVEL |
| 00:05–00:10 | 150–299 | “So how does a country keep water from taking over?” | Camera dives into a cutaway; water moves on one side; land profile reveals; measuring bracket draws. | THE WATERLINE |
| 00:10–00:15 | 300–449 | “The answer is not one giant wall.” | A wall icon appears, pauses, then separates into dikes, canals and pumps. | NOT ONE WALL |
| 00:15–00:20 | 450–599 | “It is a system, built and maintained over generations.” | Components connect; flow arrows animate through the network; camera pulls back. | A CONNECTED SYSTEM |

This example is a timing illustration, not a complete researched script. Verify each factual statement against approved sources before production.

## Voice-over recording sheet

| Clip ID | Timecode | Exact text | Target length | File name | Status |
| --- | --- | --- | ---: | --- | --- |
| VO-001 | 00:00–00:05 | Much of the Netherlands lies close to, or below, sea level. | 5 sec | VO_001_000-005.wav | Pending |
| VO-002 | 00:05–00:10 | So how does a country keep water from taking over? | 5 sec | VO_002_005-010.wav | Pending |
| VO-003 | 00:10–00:15 | The answer is not one giant wall. | 5 sec | VO_003_010-015.wav | Pending |
| VO-004 | 00:15–00:20 | It is a system, built and maintained over generations. | 5 sec | VO_004_015-020.wav | Pending |

If a line does not fit naturally, shorten it or extend the beat and update later timecodes. Never ask the narrator to rush unnaturally.

## Copyable beat template

~~~text
BEAT ID: B001
MACRO SCENE: S01 — [Chapter]
TIMECODE: 00:00–00:05
GLOBAL FRAMES: [0, 150) at [30] FPS

VOICE-OVER (exact words):
"[Sentence to read]"

WORD COUNT:
[Number]

TARGET READ DURATION:
[Seconds]

ON-SCREEN TEXT:
[Short phrase / label / none]

VISUAL:
[What the viewer sees]

PRIMARY MOTION:
[The movement that explains the narration]

TYPOGRAPHY MOTION:
[How words enter, emphasize and exit]

SECONDARY MOTION:
[Supporting movement]

CAMERA:
[Static / pan / zoom / orbit / push-in / pull-out]

AUDIO:
[Voice file, ambience, music, SFX and cue times]

ASSETS:
[Character IDs, object IDs, image/video/font IDs]

EXIT / TRANSITION:
[Connection to the next beat]

QA NOTES:
[Safe area, legibility, factual accuracy, continuity]
~~~

## Macro scene summary

| Macro scene | Start | End | Purpose | Beat IDs | Narration summary | Main visual |
| --- | --- | --- | --- | --- | --- | --- |
| S01 | 00:00 | 00:20 | Hook and question | B001–B004 | [summary] | [hero visual] |
| S02 | 00:20 | 00:45 | Explain mechanism | B005–B009 | [summary] | [diagram] |

Macro scenes are story/chapter units. Beats are short timed visual units. Keep them distinct in the script and implementation.
