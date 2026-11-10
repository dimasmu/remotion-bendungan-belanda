# STYLE-01 — Pixel Art

## Visual identity
A deliberately pixelated 2D world built from a consistent pixel grid. Every contour, highlight, shadow and texture must respect the selected logical pixel size. The result should feel like a polished animated pixel-art documentary, not a blurry image with a pixel filter.

## Construction rules
- Choose and lock a logical canvas/grid scale for the whole project; use integer scaling only.
- Use crisp nearest-neighbour edges. Never apply anti-aliasing or bilinear blur to pixel artwork.
- Build characters, props and environments from readable silhouettes and tileable modules.
- Limit clusters of tiny details; use deliberate clusters, dithering and palette ramps.
- Keep character proportions, sprite scale, outline clusters and animation cadence consistent.
- Use parallax layers for depth while preserving the pixel grid.

## Palette and lighting
Define a compact palette with named HEX swatches before asset prompts. Use controlled ramps for shadow, base and highlight. Light direction must remain consistent across connected scenes. Avoid gradients unless they are intentionally dithered.

## Camera and motion
Use integer-position camera movement where possible to prevent shimmer. Prefer sprite animation, tile reveals, scrolling environments, palette swaps and stepped motion. Keep easing restrained; overly smooth subpixel movement breaks the pixel-art look.

## Asset prompt requirements
Specify logical resolution, pixel scale, palette, outline treatment, view, sprite/background separation and transparent-background needs. Request crisp pixel edges, no anti-aliasing, no text, no watermark. Generate each independent subject separately; use sprite sheets only when every cell has identical dimensions and spacing.

## Avoid
Photorealistic textures, soft blur, vector-smooth edges, inconsistent pixel sizes, noisy dithering, tiny unreadable labels and mixed retro eras.