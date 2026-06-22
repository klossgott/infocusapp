# infocusapp

A collection of small, **self-contained HTML/CSS/JS widgets for creative journalling**, by Kai Lossgott (2022– ). Each widget is a single page with no build step, designed to be dropped into a course or page as a **16:9 `<iframe>` embed** (GoBrunch originally; now the Heartbeat community courses).

## Layout

```
widgets/<name>/index.html   one self-contained widget per folder
assets/audio/               shared piano tracks (pianomusic1–7.mp3)
assets/prompts/             writing-prompt image libraries (3 distinct sets — see assets/prompts/README.md)
assets/images/              decorative images (unsplash backgrounds, gifs)
_archive/                   retired files, kept for reference — never hard-deleted
```

## Running & embedding

- **Locally:** open `index.html` for the gallery, or open any `widgets/<name>/index.html` directly.
- **Note:** the random-image widgets (`prompt-timer`, `random`, `random-images`) load their image list at runtime from the GitHub *contents* API (`…/contents/assets/prompts`). They therefore need this repo's `assets/prompts/` to exist on GitHub and are best viewed on the deployed site rather than a bare `file://` open.
- **Hosting:** GitHub Pages, served from the repo root. The URL pattern is:
  ```
  https://klossgott.github.io/infocusapp/widgets/<name>/
  ```
- **Embedding:** drop that URL into a 16:9 iframe, e.g.
  ```html
  <iframe src="https://klossgott.github.io/infocusapp/widgets/timer/"
          width="100%" style="aspect-ratio:16/9;border:0"></iframe>
  ```

## Widget catalogue

| Widget | What it is |
|---|---|
| [timer](widgets/timer/) | **Canonical write timer.** Circular SVG countdown ring, looping piano tracks, preset durations, click-to-pause, 5-sec fade-out. Base engine for the others. |
| [prompt-timer](widgets/prompt-timer/) | The write timer + a random **writing-prompt image** revealed on tap (writing-inspiration tool). |
| [countdown-timer](widgets/countdown-timer/) | A simpler, distinct timer: type a number of minutes, Web-Audio synth chime, celebration animation. `index.html` (dark) + `white.html` (light theme). |
| [random](widgets/random/) | Minimal single random-image viewer. |
| [random-images](widgets/random-images/) | Random-image viewer with looping piano audio. |
| [voiceblankpage](widgets/voiceblankpage/) | **Voice of the Blank Page (VOBP) course.** Courage / Curiosity / Presence writing-prompt decks + a timed-writing container page. |
| [card-flip](widgets/card-flip/) | Prompt card with a flip animation. |
| [lifecoachcards](widgets/lifecoachcards/) | Life-coaching question-prompt cards. |
| [icebreaker](widgets/icebreaker/) | Smash-the-ice-cube game (mallet + sound) revealing a prompt. |
| [icebreakers](widgets/icebreakers/) | Deck of ~170 conversation / icebreaker questions (distinct from `icebreaker`). |
| [fortunecookie](widgets/fortunecookie/) | Virtual fortune cookie. |
| [storyflip](widgets/storyflip/) | Story / word-generation game. |
| [wordblob](widgets/wordblob/) | Animated word card on an organic blob background. |
| [cube](widgets/cube/) | "The Cube" personality/assessment test (+ FAQ page). |
| [what-type-test](widgets/what-type-test/) | Journalling-style / archetype test (+ archetype list). |
| [pricing](widgets/pricing/) | Membership pricing toggle. |
| [doorbell](widgets/doorbell/) | Visitor-ping page (fires a Zapier webhook on visit). |

## "Voice of the Blank Page" (VOBP) mapping

The brief flagged that some of this repo belongs to the **VOBP writing course**. After review, the VOBP-specific material is grouped and intact:

- **`widgets/voiceblankpage/`** — clearly VOBP: Courage / Curiosity / Presence prompt decks and the timed-writing container.
- **`widgets/prompt-timer/`** + **`assets/prompts/`** — writing-inspiration tools (a timer that surfaces a random prompt image). VOBP-adjacent but kept as a general, reusable writing widget rather than filed under VOBP.

Everything else (games, tests, pricing, doorbell, the plain timers) is general-purpose.

## Asset & consolidation notes

- **Timers:** five historical variants were consolidated. `timer/timer.html` won as the canonical engine (it has the SVG ring + looping audio + presets + fade-out). The random-image variant became `prompt-timer`; the input-minutes/synth variant stayed as `countdown-timer`. `timer-hardcode.html` (same engine, hard-coded URLs) and the dead directory-listing `random-image.html` were moved to `_archive/timer-variants/`.
- **Prompt images — three separate libraries, kept distinct** (see [`assets/prompts/README.md`](assets/prompts/README.md)): `writing-prompts/` (the varied `prompt (N)` set, 2022-10-20), `curated-20/` (the curated `prompt_img01–20` set, 2022-10-19), and `photos/` (the `IMG_*` iPhone photos). These are genuinely different sets from different dates, not duplicates. The `prompt (N).*` files are distinct images even when they share a number (e.g. `prompt (1).jpeg/.jpg/.png` are three different photos), so every format is kept. The only things collapsed were **byte-identical** copies — the same photos that earlier lived in two/three locations at once because successive widget generations read different folders — plus the `timer/audios/` copy of the piano tracks.
- **`_archive/`** holds retired files (`svg_test.html`, the two dead timer variants, the old `readme`). Nothing was hard-deleted.

---
*See `CLAUDE-CODE-BRIEF.md` for the original organisation + build brief.*
