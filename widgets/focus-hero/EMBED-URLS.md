# FOCUS Hero — per-lesson embed URLs

Base: `https://klossgott.github.io/infocusapp/widgets/focus-hero/`

The FOCUS Practice has **5 stages × 3 lessons (Move · Remember · Write) + 2 intro lessons = 17 lessons.**
This one widget now serves **all three lesson types** per stage via `?mode=`:
`move` (music cue), `remember` (guided voice), `write` (music + write timer). The 2 intro lessons use a static hero.

| # | Lesson | URL |
|---|---|---|
| 1 | Before you begin (a) | — static hero — |
| 2 | Before you begin (b) | — static hero — |
| 3 | Find · Move | `?stage=find&mode=move` |
| 4 | Find · Remember | `?stage=find&mode=remember` |
| 5 | Find · Write | `?stage=find&mode=write` |
| 6 | Orient · Move | `?stage=orient&mode=move` |
| 7 | Orient · Remember | `?stage=orient&mode=remember` |
| 8 | Orient · Write | `?stage=orient&mode=write` |
| 9 | Clarify · Move | `?stage=clarify&mode=move` |
| 10 | Clarify · Remember | `?stage=clarify&mode=remember` |
| 11 | Clarify · Write | `?stage=clarify&mode=write` |
| 12 | Unfold · Move | `?stage=unfold&mode=move` |
| 13 | Unfold · Remember | `?stage=unfold&mode=remember` |
| 14 | Unfold · Write | `?stage=unfold&mode=write` |
| 15 | Steer · Move | `?stage=steer&mode=move` |
| 16 | Steer · Remember | `?stage=steer&mode=remember` |
| 17 | Steer · Write | `?stage=steer&mode=write` |

## Iframe embed code (paste into Heartbeat's "Embed Code" field)

Heartbeat's embed field needs an **`<iframe>` tag**, not a bare URL, and frames it 16:9 itself. Template:

```html
<iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=STAGE&mode=MODE" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
```

Ready-to-paste, per lesson:

```html
<!-- Find · Move -->     <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=find&mode=move" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Find · Remember --> <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=find&mode=remember" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Find · Write -->    <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=find&mode=write" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Orient · Move -->     <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=orient&mode=move" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Orient · Remember --> <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=orient&mode=remember" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Orient · Write -->    <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=orient&mode=write" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Clarify · Move -->     <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=clarify&mode=move" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Clarify · Remember --> <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=clarify&mode=remember" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Clarify · Write -->    <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=clarify&mode=write" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Unfold · Move -->     <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=unfold&mode=move" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Unfold · Remember --> <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=unfold&mode=remember" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Unfold · Write -->    <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=unfold&mode=write" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Steer · Move -->     <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=steer&mode=move" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Steer · Remember --> <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=steer&mode=remember" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
<!-- Steer · Write -->    <iframe src="https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=steer&mode=write" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
```

## Full URLs (15 stage lessons)

```
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=find&mode=move
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=find&mode=remember
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=find&mode=write
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=orient&mode=move
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=orient&mode=remember
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=orient&mode=write
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=clarify&mode=move
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=clarify&mode=remember
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=clarify&mode=write
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=unfold&mode=move
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=unfold&mode=remember
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=unfold&mode=write
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=steer&mode=move
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=steer&mode=remember
https://klossgott.github.io/infocusapp/widgets/focus-hero/?stage=steer&mode=write
```

> The lesson count/labels follow the course's Move·Remember·Write beat; adjust rows if the live course numbering differs. URLs go live once the repo is deployed to GitHub Pages.
