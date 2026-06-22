# Claude Code brief — organise `infocusapp` + build the FOCUS Hero widget

**Repo:** `klossgott/infocusapp` (this folder). A 2022 collection of self-contained HTML/CSS/JS widgets for creative journalling (GoBrunch-style embeds), by Kai Lossgott. It has drifted into a junk-drawer and needs organising, and we need one new widget built from the existing timer.

Work in two parts. **Preserve git history; never hard-delete — move retired files into `_archive/`.** Each widget must stay a single self-contained page that can be embedded via URL (GitHub Pages), because that's how they're dropped into the Heartbeat course (as 16:9 Hero/`<iframe>` embeds — a Wordle widget already embeds this way, so the pattern is proven).

---

## Part 1 — Organise the repo

Current state:
- **Widget folders:** `card-flip/ countdown-timer/ cube/ fortunecookie/ icebreaker/ lifecoachcards/ pricing/ storyflip/ timer/ voiceblankpage/ what-type-test/ wordblob/` plus shared `audios/`.
- **Loose at root:** ~70 image files (`prompt (1..41).*`, `IMG_*.JPEG`, two `.gif`, two unsplash `.jpg`) and 8 loose `.html` (`doorbell, icebreakers, random-images, random, svg_test, timer-hardcode, timer-random-image, index`).
- **Five timer variants:** `timer/timer.html`, `timer-hardcode.html`, `timer-random-image.html`, `countdown-timer/countdown-timer.html`, `countdown-timer/countdown-timer-white.html`.

**Caution — some of this repo belongs to *The Voice of the Blank Page* (VOBP) course** (notably `voiceblankpage/`, and likely the writing-prompt images + random-image timer, which are writing-inspiration tools). Before moving anything, map which widgets/assets are VOBP vs general, keep VOBP pieces grouped and intact, and confirm the mapping in the README. When unsure, ask rather than archive.

Do:
1. **Adopt one structure:** `widgets/<name>/` for every widget (move the loose root `.html` into their own `widgets/<name>/index.html`); shared assets in `assets/` (`assets/prompts/` for the loose journalling images, `assets/audio/`, `assets/images/`).
2. **Consolidate the timers:** compare all five variants and document what differs (random-image background vs hardcoded vs white theme). **Pick whichever is the most developed and functional as the canonical base** — evaluate the code, don't assume. (Kai leans toward the `countdown-timer/` variant but isn't certain, so let function decide.) Promote the winner to `widgets/timer/`; keep the random-image / writing-prompt variant as its own widget (see item 3); archive any genuine dead duplicates to `_archive/timer-variants/` with a one-line note each.
3. **The loose root images are NOT clutter — they are writing-inspiration prompt images** for the *random-image* timer variant (the timer shows a random image to spark writing). Keep them as a first-class asset set in `assets/prompts/`, de-duplicate (same `IMG_*.JPEG` recur in several places — one copy), and keep them wired to the random-image timer. Do not archive this variant: the **random-image / writing-prompt timer is its own kept widget** (`widgets/prompt-timer/`), distinct from the plain countdown timer.
4. **Root README + index:** write a real `README.md` (what the repo is, how to run/embed each widget, the GitHub Pages URL pattern) and a clean `index.html` that links to every widget demo. Add a one-paragraph `README.md` inside each `widgets/<name>/`.
5. Add a `.gitignore` and keep commits small and descriptive.

---

## Part 2 — Build the FOCUS Hero widget  (`widgets/focus-hero/`)

**Purpose.** One embeddable 16:9 page used as the **Hero of each lesson** in the Heartbeat course *The FOCUS Practice*. It must render where hearthis/native players don't fit, combining in a single embed: the stage's archetype slide as backdrop + a compact looping music player + a write timer.

**Base it on whichever timer variant is the most developed and functional** (evaluate all five first — Kai leans `countdown-timer/` but pick the strongest code). The timer engine across these variants already does the hard parts: a circular SVG countdown ring, looping `<audio loop>` tracks, preset-duration start, click-to-pause, and a 5-second fade-out at the end. Reuse that engine; restyle and re-lay-out per below.

**Layout (Kai's spec):**
- **Backdrop:** the stage's Canva archetype slide, full-bleed, 16:9. (Check slide dimensions — they may be taller than 16:9; fit/crop to the frame, don't letterbox awkwardly. Add a subtle dark scrim in the bottom-left corner so controls/text stay readable over any slide.)
- **Player, bottom-left:** a play/pause button with the **circular countdown ring drawn small, around the play button**; beside/above it the **track title** and a **loop toggle**. Keep it compact — it's a corner control, not a centrepiece. Everything bottom-left.
- Dark, legible styling. Infocus brand: ink `#1E1A16`, scarlet `#FF2400` (use AA-safe `#C81E00` for text/!important contrast), cream `#F7F3EA`.

**Per-stage data (parameterise by URL query, e.g. `?stage=find`, so ONE hosted page serves all five):**

| stage | slide (backdrop) | music track | write duration |
|---|---|---|---|
| find | Find archetype slide | Satie — Gymnopédie No. 1 (harp) | 10 min (2×5) |
| orient | Orient archetype slide | Cumbia Colombiana | 10 min |
| clarify | Clarify archetype slide | Rio at Night | 10 min |
| unfold | Unfold archetype slide | Happy Journey | 10 min |
| steer | Steer archetype slide | Bach — Cello Suite No. 1, Prelude | 10 min |

- Accept a `?mode=` param with **three** modes, so one widget serves all three lesson types per stage with the same slide-backdrop framing:
  - `mode=move` — stage **music**, ≈1 min cue.
  - `mode=write` — stage **music**, 10 min (2×5) timer. (Default.)
  - `mode=remember` — the stage's **guided voice** track (in Kai's voice): play **once, no loop, no countdown ring** — just a play/pause button (a simple progress arc is fine), slide backdrop, title "Guided practice — {Stage}", credit "In Kai's voice". This is the Remember lesson's player.
- Music modes loop for the whole duration (`<audio loop>` handles it); the voice mode must NOT loop.
- **Display the proper track title + source credit** in the player (this is the "lost names" fix — the files are named `1-find-music` etc. but must SHOW the real names). Use these exact strings:

| stage | display title | credit line |
|---|---|---|
| find | Gymnopédie No. 1 — Erik Satie (arr. harp) | Public domain · Musopen |
| orient | Cumbia Colombiana | Royalty-free · Pixabay |
| clarify | Rio at Night | Royalty-free · Pixabay |
| unfold | Happy Journey | Royalty-free · Pixabay |
| steer | Cello Suite No. 1, Prelude (BWV 1007) — J.S. Bach | Public domain · Musopen |

For the Remember lessons (if they reuse this widget for the guided voice): title "Guided practice — {Stage}", credit "In Kai's voice". Keep a single consolidated **Music & sources** credit in the course's *Before you begin* lesson as well.

> Note: the same names/credits should be applied if the hearthis tracks are kept as a private backup — rename the 10 uploads from `1-find-music` etc. to these titles there too.

**Assets to pull in** (copy into `widgets/focus-hero/assets/`). All under `…/_INFOCUS Projects/_COMMUNITY/_PRACTICES/FOCUS Method/FOCUS Method Course/_media/`:
- **Music** (Move/Write): `hearthis-upload-kit/1-find-music.mp3` … `5-steer-music.mp3`.
- **Voice** (Remember — the 5 archetype guided audios, Kai's voice): `hearthis-upload-kit/find-voice.mp3, orient-voice.mp3, clarify-voice.mp3, unfold-voice.mp3, steer-voice.mp3` (originals also in `pulse-build/{stage}-remember-voice.mp3` and `voice/{stage}-{archetype}.mp3`).
- **Slides:** the stage archetype/numbered slides in `pulse-build/` (`{stage}-1-move-hero.png`, `-2-remember-hero.png`, `-3-write-hero.png`) — use the matching slide per mode (Move/Remember/Write each has its own numbered hero) as the backdrop.

Voice → stage map for `mode=remember`: find→find-voice, orient→orient-voice, clarify→clarify-voice, unfold→unfold-voice, steer→steer-voice.

**Hosting & embedding.** Host on **Netlify** — the other `infocusapp` widgets are already deployed there and **confirmed embedding successfully in Heartbeat** (16:9 Hero embeds, like Wordle). Deploy `focus-hero` to the **same Netlify site** and use its path. The per-lesson embed is then `https://<kai-netlify-site>/widgets/focus-hero/?stage=find&mode=write` etc. Set each lesson's **Hero → Video → "use an embed"** to that URL (16:9). Produce a short `widgets/focus-hero/EMBED-URLS.md` listing the exact URL for all 17 lessons. (Ignore any earlier GitHub Pages reference — Netlify is the live host.)

**Constraints:** responsive (Heartbeat is responsive; it began as a mobile timer — keep it working on phones); no external build step (plain HTML/CSS/JS like the other widgets); fonts/icons may load from CDN as the timer already does; respect autoplay rules (user taps play).

**Acceptance:** open `?stage=find&mode=write` → Find slide fills the 16:9 frame, bottom-left play button starts the looping Satie track with a small ring counting down 10:00, title + loop + credit visible, readable over the slide, works on mobile. Then the same for all five stages by swapping the param.
