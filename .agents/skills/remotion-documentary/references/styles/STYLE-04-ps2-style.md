# STYLE-04 — PS2 Style

## Reference reading
The first reference depicts a red bus in a stylized early-console 3D city. The bus has simple angular geometry, the buildings are tall blocky forms with repeated windows, and the road/environment has visible chunky texture. The bus is staged as a game-world object, with a slightly exaggerated, nostalgic real-time-render feel. Do not treat this as generic modern low-poly art.

## Visual signature
- Early-2000s console-era 3D game aesthetic.
- Angular, simplified geometry with visible facets and relatively low polygon density.
- Repeating or modest-resolution textures; surfaces may look slightly coarse rather than physically perfect.
- Stylized city architecture, simple road geometry and chunky environmental details.
- Strong red bus against muted grey/brown/purple city tones.
- Slightly game-like lighting and shading rather than modern photoreal path tracing.

## Geometry and materials
- Keep bus body planes simple, with angular edges and limited small details.
- Wheels, windows, bumpers and lights should be readable but not hyper-detailed.
- Buildings can use repeated window textures and large geometric masses.
- Use restrained specular highlights and simple material response.
- Lock polygon density and texture sharpness across all assets; do not mix ultra-detailed hero objects with crude backgrounds.

## Palette and lighting
- Sample frame colors before assigning HEX values. The shown direction uses a saturated red hero bus, subdued urban greys/browns, muted purple/blue shadows and warm window lights.
- Lighting is readable and directional but not glossy modern CGI.
- Fog or distance haze can help depth, but should remain subtle and game-like.
- Keep contrast high enough for the red bus to remain the focal point.

## Camera and layout
- Use game-world camera framing: low/eye-level street view, side tracking or a modest three-quarter view.
- Keep road plane, vehicle scale and building perspective coherent.
- Camera may follow the vehicle as if in a third-person or cutscene shot.
- Avoid extreme wide-angle distortion unless present in the chosen reference shot.

## Motion language
- Bus movement should include wheel rotation, mild suspension bounce and grounded contact/shadow.
- Camera tracking and parallax should feel like a game camera.
- Environmental motion may include simple passing lights, road movement or small dust/impact effects.
- Use controlled, slightly mechanical game animation rather than highly fluid cinematic motion.

## Asset and prompt requirements
Describe console-era game render, polygon budget, texture resolution/roughness, bus proportions, city architecture, camera angle and lighting. Request consistent front/side/three-quarter views where needed. Keep all generated assets within one chosen retro-game rendering target.

## Do not
Do not use modern photoreal PBR, ultra-smooth surfaces, dense microgeometry, voxel/block-toy construction, pixel-art sprites, exaggerated anime proportions or a generic faceted low-poly diorama.