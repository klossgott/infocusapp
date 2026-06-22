# focus-hero

The Hero panel for **The FOCUS Practice** (Heartbeat course). One embeddable 16:9 page that combines, per stage: the stage's **archetype slide** as a full-bleed backdrop, a compact **bottom-left player** (play/pause with a small scarlet countdown ring), and a **write timer** — over a looping music track with its real title + source credit shown.

## URL parameters

`?stage=` `find` · `orient` · `clarify` · `unfold` · `steer`  (default `find`)
`?mode=`  `write` (10 min) · `move` (≈1 min cue)  (default `write`)

Example: `…/widgets/focus-hero/?stage=find&mode=write`

One hosted page serves all stages/modes — see [EMBED-URLS.md](EMBED-URLS.md) for the per-lesson URLs.

## How it behaves

- Tap the play button → the stage's looping track starts and the ring counts down (10:00 for write, 1:00 for move). Tap again to pause; tap the loop toggle to stop looping. A 5-second fade-out runs at the end (carried over from the `timer` engine).
- Autoplay is never forced — the learner taps play (browser policy + good manners).

## Embedding in Heartbeat

Heartbeat lesson **bodies don't accept custom HTML**, so this widget is delivered as:
1. **Lesson hero** where Heartbeat's embed resolver accepts it (this page exposes `twitter:player` + Open Graph metadata to improve those odds), **or**
2. a **click-out link** to the URL (opens full-screen in a new tab) — the dependable fallback, **or**
3. inside a **Resources document** (docs *do* host custom iframes — that's how the VBL course embeds its widgets).

## Assets

- `assets/music/<stage>.mp3` — the five FOCUS stage tracks (from the course's `hearthis-upload-kit`).
- `assets/slides/<stage>.png` — the stage archetype slides (the `*-3-write-hero.png` "letter + name" slides from `pulse-build`).

## Notes / not-yet

- `write` is a single 10-minute countdown; the course's "2×5" (two five-minute blocks) is not yet segmented — a future enhancement.
- `move` reuses the stage's music track as a short 1-minute cue.
- Remember-lesson guided-voice variant (title "Guided practice — {Stage}", credit "In Kai's voice") is not built here — Remember lessons use the voice audio, not this music widget.
