# Style Guide — Enigma Shorts

Status: APPROVED. Style lock: STYLE-03 Glow Sketch. No hybrid.

## Identity

Dark technical world. Mechanisms are luminous sketch lines; the line carries the information.

## Shape language

- Technical geometry: straight runs, right angles, circles for drums, arcs for turnover.
- Chips and captions: 8 px radius. Machine parts: sharp corners.
- Diagrams are schematic. Labelled `SKEMA` where a real machine differs.

## Line weight

| Layer | Width | Colour |
| --- | ---: | --- |
| Primary stroke | 3 px | Ice Line |
| Secondary contour | 2 px | Ice Dim |
| Construction / leader | 1 px | Construction |
| Emphasis | 5 px | Lamp Amber or Alert Red |

Glow: 6 px tight core, 18 px soft outer, max 35% opacity so labels stay legible.

## Lighting and camera

- Constant dark background. No cast shadows. Depth from line weight and glow.
- Static by default. Allowed: push-in to 1.06, pull-back, vertical drift of 24 px.
- No rotation, shake, or 3D perspective on 2D diagrams.

## Typography

| Role | Family | Size | Weight | Tracking |
| --- | --- | ---: | ---: | ---: |
| Headline | Space Grotesk | 64–112 px | 600 | 0.14–0.18em, uppercase |
| Big number | Space Grotesk | 96–120 px | 700 | -0.01em |
| Exact digits | IBM Plex Mono | 28 px | 500 | 0.02em |
| Diagram label | IBM Plex Mono | 26–30 px | 500 | 0.10em, uppercase |
| Caption | Space Grotesk | 34–40 px | 500 | 0.04em |
| Source | IBM Plex Mono | 22 px | 400 | 0.02em |

Headline max width 936 px, max 3 lines. One dominant headline per scene. Labels never below 24 px.

## Motion

- Reveal along path (`strokeDashoffset`), then illuminate.
- Stagger 8–14 frames. Never everything at once.
- Everything is a function of `useCurrentFrame()` and `useVideoConfig()`.
- No CSS animation or transition, no `Math.random()`, no wall-clock time.

## Safe area

- Content box x 72–1008, y 160–1400.
- Y 1400–1920 stays empty for platform UI.

## Forbidden

Photographic textures, realistic materials, more than one accent per beat, decorative glow on body text, palette values not in `PALETTE.md`.
