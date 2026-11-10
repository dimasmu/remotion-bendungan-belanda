# STYLE-08 — CGI Motion

## Reference reading
The references show a dark cinematic 3D scene: a red bus or a human figure stands in a nearly black environment with a reflective floor. A cool blue/cyan light glows beneath or around the subject, with atmospheric depth and dramatic contrast. The subject is dimensional and shaded, unlike the line-only Glow Sketch style.

## Visual signature
- Dark cinematic environment, often near-black or deep charcoal.
- One hero subject isolated against a large dark negative-space field.
- Real 3D geometry and material shading, not a wireframe drawing.
- Cool blue/cyan underlighting, rim light or localized floor glow contrasted with a warm/red hero subject.
- Reflective or subtly glossy floor that anchors the subject.
- Controlled atmosphere, depth and dramatic light falloff.

## Geometry and materials
- Use dimensional geometry with a defined realism/stylization target.
- Hero object/character receives the highest detail; environment remains dark and restrained.
- Define roughness, reflectivity, metal/plastic/fabric response and edge highlights.
- Ensure objects have grounded contact, believable scale and consistent shadow/reflection behavior.
- Do not use the same material for all surfaces; separate bus paint, glass, tires, skin, clothing and floor.

## Palette and lighting
- Sample the reference frame before fixing HEX values. The visible examples use deep black/charcoal, saturated red on the bus example, cool cyan/blue emission and restrained neutral highlights.
- Use a deliberate key/rim/fill setup. The blue light is an accent source, not a full-scene blue wash.
- Keep blacks rich while preserving enough detail in the hero subject.
- Glow and reflection must remain localized and physically coherent.

## Camera and layout
- Use cinematic low-angle, medium or wide framing with the hero subject clearly separated.
- The reflective floor can provide a subtle mirror or light pool.
- Use a slow dolly, orbit or tracking move; avoid gratuitous camera movement.
- Keep lens, depth of field and horizon consistent across connected shots.

## Motion language
- Use physically motivated movement: vehicle hover/drive, subtle suspension, character walk/gesture, light activation and reflection changes.
- Camera movement should emphasize the subject and scale.
- Add particles, haze or energy effects only when story-relevant.
- For complex 3D movement, produce the source render in Blender or another 3D tool and composite/timestamp it in Remotion.

## Asset and prompt requirements
Specify 3D render style, subject geometry, materials, floor reflectivity, dark environment, key/rim light colors, camera/lens, pose and motion state. Request consistent isolated hero assets or rendered passes if compositing is needed.

## Do not
Do not make it a bright explainer scene, wireframe glow sketch, generic low-poly game, plastic toy world, over-bloomed cyberpunk city or photoreal scene with uncontrolled reflections.