# Prompt image libraries

These are **three distinct image libraries**, kept separate on purpose — they are different sets from different dates, not duplicates of one another. (Git history: the curated set + photos arrived 2022-10-19 with the first timer; the `prompt (N)` set was a separate upload on 2022-10-20.)

| Folder | What it is | Count | Origin |
|---|---|---|---|
| `writing-prompts/` | The large, varied writing-inspiration set (`prompt (1)…(41)`). Same number ≠ same image — `prompt (1).jpeg/.jpg/.png` are three *different* photos, so every format is kept. | 55 | Root upload, 2022-10-20 |
| `curated-20/` | A deliberately curated, web-sized, sequentially-named set (`prompt_img01–20`). | 20 | Original timer build, 2022-10-19 |
| `photos/` | iPhone inspiration photographs (`IMG_*.JPEG`). | 15 | Original timer build, 2022-10-19 |
| `tap_here.JPEG` | Shared UI "tap here" seed image shown before the first random pick. | 1 | — |

## Which widget uses which library

Each random-image widget fetches **one** library (via the GitHub contents API; the path's last segment is the library name and is commented in each widget's source so it's easy to swap):

| Widget | Library |
|---|---|
| `widgets/prompt-timer/` | `writing-prompts/` |
| `widgets/random/` | `curated-20/` |
| `widgets/random-images/` | `photos/` |

These assignments are a sensible default (the live widgets historically all read one shared root pool); change the last path segment in a widget's `fetch(...)` call to repoint it.

## Note on the deduped copies

These same photos previously existed in two or three places at once (repo root, `timer/random-prompts/`, `timer/images/`). That was **not** three different libraries — it was the *same* images duplicated because successive widget generations looked in different locations (an old directory-listing widget read `random-prompts/`; the newer GitHub-API widget read the repo root). Only the byte-identical copies were collapsed; the genuinely distinct sets above were preserved.
