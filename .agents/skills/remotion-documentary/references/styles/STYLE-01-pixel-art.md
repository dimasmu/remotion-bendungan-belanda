# STYLE-01 — Pixel Art

## Reference reading
The supplied examples show a side-view red city bus in a compact night-time pixel-art city. The scene uses block-built buildings, a deep violet/purple sky, bright window pixels, a road/platform at the bottom and small game-like HUD elements. Treat this as the primary reference direction; do not reduce it to a generic pixel filter.

## Visual signature
- Clearly visible square pixel clusters with hard, crisp edges.
- Side-on 2D game-scene composition; subject reads like a playable game sprite in a designed level.
- Compact city skyline with repeated rectangular windows and layered depth.
- Night palette dominated by purple, indigo and dark blue, with warm yellow/orange windows and red bus accents.
- Small HUD/status details may frame the scene when useful, but are not mandatory in every shot.
- Strong contrast between sprite, city silhouette, road/platform and background.

## Geometry and rendering
- Establish a logical pixel canvas and sprite scale for the entire project. Scale up with nearest-neighbour only.
- Use clustered pixels, not individual random noise. Curves and diagonals should stair-step intentionally.
- Characters, vehicles, buildings and props should use compatible pixel density and outline logic.
- Build environments from repeatable tiles and modular pixel clusters.
- Keep the bus/hero subject silhouette simple enough to read at phone size.
- Avoid mixing modern smooth vector UI with pixel artwork unless the UI is intentionally designed as a retro game HUD.

## Palette and lighting
- Sample the actual reference frame before locking HEX values. Expected family: deep violet/indigo night, purple midtones, dark navy/black silhouettes, warm yellow/orange window lights, red hero vehicle and a small cyan/blue highlight range.
- Use palette ramps: shadow, base, highlight. Avoid uncontrolled gradients; use deliberate dithering if needed.
- Keep the light source and window glow direction consistent between shots.

## Camera and layout
- Default to side-view or slight 2D game perspective, with a clear ground/platform line.
- Compose the hero vehicle/character as the focal point; use city layers behind it.
- For vertical video, place the main action in the central safe area and reserve HUD only if it is part of the chosen layout.
- Camera movement should respect the pixel grid; use integer-pixel translations where practical.

## Motion language
- Sprite-based wheel/leg cycles, vehicle travel, simple suspension bounce, blinking windows, parallax skyline, scrolling road and discrete particle effects.
- Use stepped timing or short sprite loops where the reference has game-like motion; do not automatically use buttery-smooth easing.
- Camera tracking should feel like a game camera, not a cinematic handheld camera.

## Asset and prompt requirements
State logical canvas size, sprite scale, palette, side-view angle, pixel cluster density, outline style, environment tiles and required sprite states. Request crisp nearest-neighbour pixel art, no anti-aliasing, no blur and no pseudo-text. Create vehicle, character and environment assets separately if they need independent animation.

## Do not
Do not use smooth vector curves, soft airbrush gradients, photorealistic materials, 3D voxel cubes, inconsistent pixel sizes, blurry scaling or modern UI styling that breaks the retro game world.