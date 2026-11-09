# Platform, Duration, Resolution & Export Presets

This file controls destination format selection. These are production presets, not a guarantee that every account, region, placement, ad type, upload tool, or API accepts every duration. Check current platform rules before publishing.

## Ask the user first

Ask one decision at a time:
1. Where will it be published? YouTube long-form, YouTube Shorts, Instagram Reels, Instagram Feed, Facebook Reels, or multiple platforms.
2. How long should it be? Offer duration presets and a custom option. Never silently decide.
3. Use the platform default aspect ratio/resolution, or override it?
4. One master video or separate platform-specific versions?

## Platform templates

| Destination | Default ratio | Default resolution | FPS | Duration choices |
| --- | ---: | ---: | ---: | --- |
| YouTube long-form | 16:9 | 1920 × 1080 | 30 | 6, 8, 10, 12, 15, 20, 30 min or custom |
| YouTube Shorts | 9:16 | 1080 × 1920 | 30 | 30, 45, 60, 90, 120, 180 sec |
| Instagram Reels | 9:16 | 1080 × 1920 | 30 | 15, 30, 45, 60, 90, 180 sec |
| Instagram Feed portrait | 4:5 | 1080 × 1350 | 30 | 15, 30, 45, 60, 90 sec or custom |
| Instagram Feed square | 1:1 | 1080 × 1080 | 30 | 15, 30, 45, 60, 90 sec or custom |
| Facebook Reels | 9:16 | 1080 × 1920 | 30 | 30, 60, 90, 180 sec, 5 min or custom |
| Facebook landscape video | 16:9 | 1920 × 1080 | 30 | 1, 3, 5, 10, 15, 20 min or custom |

### Platform notes

- YouTube's official help says square or vertical uploads up to 3 minutes are categorized as Shorts for eligible videos uploaded on or after October 15, 2024. Use 9:16 by default; do not assume a 16:9 video will qualify as a Short.
- Instagram announced 3-minute Reels in January 2025. Use 9:16 for a full-screen Reel. For discovery-oriented storytelling, recommend 3 minutes or less unless the user intentionally wants a longer video and confirms the publishing route.
- Meta announced that Facebook video publishing would be simplified into Reels, without the previous length or format restrictions. Still choose vertical for mobile-first storytelling and 16:9 for an intentional long-form documentary.
- Ask whether “Instagram” means Reels or Feed. These are different layouts.

## Auto-resolution map

| Aspect ratio | Resolution | Use |
| --- | ---: | --- |
| 9:16 | 1080 × 1920 | Vertical mobile video |
| 16:9 | 1920 × 1080 | Horizontal video |
| 4:5 | 1080 × 1350 | Portrait feed |
| 1:1 | 1080 × 1080 | Square feed |
| 9:16 4K | 2160 × 3840 | Only when requested and render resources allow |
| 16:9 4K | 3840 × 2160 | Only when requested and render resources allow |

Rules:
- Resolution follows aspect ratio. Duration does not determine resolution.
- Default social FPS is 30. Use 24 only when the user wants a cinematic cadence and the delivery plan supports it; use 60 only when motion detail justifies it.
- Use square pixels (pixel aspect ratio 1:1).
- Reserve top/bottom safe areas for platform UI. Exact overlay locations can vary by placement and app version; preview with the current UI.
- Never stretch 16:9 into 9:16. Reframe the layout.
- For multiple platforms, create and inspect a layout variant for every aspect ratio. Never blindly center-crop text, characters, maps or diagrams.

## Duration to frames

At selected FPS, durationInFrames = round(durationInSeconds × fps).

| Duration | Frames at 30 FPS |
| ---: | ---: |
| 15 sec | 450 |
| 30 sec | 900 |
| 45 sec | 1,350 |
| 60 sec | 1,800 |
| 90 sec | 2,700 |
| 180 sec | 5,400 |
| 8 min | 14,400 |
| 10 min | 18,000 |
| 12 min | 21,600 |

Keep width, height, FPS, durationInFrames, aspect ratio and destination in one configuration object. Remotion Composition requires a width, height, FPS, duration and unique ID. Use calculateMetadata() when dimensions/duration need to depend on selected props.

## Export starting point

- MP4 container, H.264 video
- Constant frame rate matching the composition
- yuv420p for broad playback compatibility
- AAC stereo audio, 48 kHz where supported
- Progressive scan, square pixels
- Rec.709 SDR unless HDR is intentional
- No accidental black frames, clipped audio, missing end card or audio tail

These settings are a safe starting point, not a guarantee of platform acceptance. Platforms may re-encode uploads.

## Multi-platform workflow

1. Choose the primary destination.
2. Confirm duration and aspect ratio.
3. Create separate responsive scene layouts for all selected aspect ratios.
4. Reposition text and focal subjects for each composition.
5. Keep narration where it fits; retime visuals if the edit duration changes.
6. Render and inspect every version separately.

## References

- Remotion Composition: https://www.remotion.dev/docs/composition
- Remotion dynamic metadata: https://www.remotion.dev/docs/dynamic-metadata
- Remotion parameterized rendering: https://www.remotion.dev/docs/parameterized-rendering
- YouTube three-minute Shorts: https://support.google.com/youtube/answer/15424877
- Meta Facebook video changes: https://about.fb.com/news/2025/06/making-it-easier-create-videos-facebook/
- Instagram 3-minute Reels announcement: https://www.socialmediatoday.com/news/instagram-officially-expands-reels-length-3-minutes/737766/

Re-check platform rules when publishing. Duration limits, eligibility and recommendations can change.
