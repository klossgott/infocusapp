# focus-hero

The Hero panel for **The FOCUS Practice** (Heartbeat course). One embeddable 16:9 page that combines, per stage: the stage's **archetype slide** as a full-bleed backdrop, a compact **bottom-left player** (play/pause with a small scarlet countdown ring), and a **write timer** — over a looping music track with its real title + source credit shown.

## URL parameters

`?stage=` `find` · `orient` · `clarify` · `unfold` · `steer`  (default `find`)
`?mode=`  `write` (10 min) · `move` (≈1 min cue)  (default `write`)

Example: `…/widgets/focus-hero/?stage=find&mode=write`

One hosted page serves all stages/modes — see [EMBED-URLS.md](EMBED-URLS.md) for the per-lesson URLs.

## How it behaves

- Tap the play button → the stage's looping track starts and the ring counts down. Tap again to pause; tap the loop toggle to stop looping.
- **Duration presets** (`1 · 5 · 10 · 15 · 20 m`) sit above the player; `?mode` sets the default highlight. Tapping a length resets and starts at that time. The red ring mirrors the chosen length — so no need to pre-cut the tracks into blocks.
- The music **fades out over the final 6 seconds** before the timer stops.
- Autoplay is never forced — the learner taps play (browser policy + good manners).

## Embedding in Heartbeat

Heartbeat lesson **bodies don't accept custom HTML**, so this widget is delivered as:
1. **Lesson hero** where Heartbeat's embed resolver accepts it (this page exposes `twitter:player` + Open Graph metadata to improve those odds), **or**
2. a **click-out link** to the URL (opens full-screen in a new tab) — the dependable fallback, **or**
3. inside a **Resources document** (docs *do* host custom iframes — that's how the VBL course embeds its widgets).

## Assets

- `assets/music/<stage>.mp3` — the five FOCUS stage tracks (from the course's `hearthis-upload-kit`).
- `assets/slides/<stage>.png` — the **archetype** slide (letter + name, `*-3-write-hero.png`), used as the **write** backdrop.
- `assets/slides/<stage>-move.png` — the lighter doodle slide (`*-1-move-hero.png`), used as the **move** backdrop.

## Notes

- No track-splitting: the duration presets (mirrored in the red ring) control how long playback runs, so the "2×5" blocks don't need separate files.
- `move` reuses the stage's music track as a short cue over the lighter doodle slide; `write` uses the archetype slide.
- Remember-lesson guided-voice variant (title "Guided practice — {Stage}", credit "In Kai's voice") is not built here — Remember lessons use the voice audio, not this music widget.
