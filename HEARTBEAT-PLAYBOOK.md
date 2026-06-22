# Heartbeat embeds & widgets — playbook

Everything learned wiring the **infocusapp** widgets (timers, decks, the FOCUS Hero) into the
**Heartbeat** community at `community.infocus.institute`. Written June 2026.

**Related documents (read together):** `_COWORK/HEARTBEAT-SOP.md` (the broader Heartbeat
build/run SOP — this playbook is its hands-on embeds-and-widgets companion) ·
`_COWORK/FOCUS-WORK-LOG.md` (build log) · `widgets/focus-hero/EMBED-URLS.md` (per-lesson iframes) ·
memory `heartbeat-embedding-surfaces` + `infocusapp-reorg`.

---

## 1. The one rule that trips everyone up

**Heartbeat's embed field wants an `<iframe>` tag, not a bare URL.** Paste a link and it says
*"No Iframe found."* Paste an iframe and it renders it at a fixed **16:9** ratio.

```html
<iframe src="https://YOUR-URL" width="100%" height="100%" style="border:0" allow="autoplay; fullscreen"></iframe>
```

Width/height don't really matter (Heartbeat frames 16:9 itself) — what matters is a valid `<iframe>`.

---

## 2. Where embeds actually work (the surface map)

| Surface | Custom HTML/JS widget? | Comments? | How |
|---|---|---|---|
| **Lesson HERO** | ✅ **yes** | ❌ | Edit lesson → Hero Section → **Video** → *"Click here to embed an external video instead"* → **Use HTML embed code** → paste iframe → **Create Embed** → **Save Changes** |
| **Document / wiki body** | ✅ yes | ✅ (docs have comments) | `/embed` an iframe or a supported link. This is how the VBL course embeds its widgets. |
| **Chat / thread message** | ✅ yes (most permissive) | ✅ | Paste embed in a message |
| **Lesson BODY** | ❌ **no** — raw HTML/iframe is stripped | ➖ | Lessons can't take custom HTML in the body; use the hero or a doc instead |
| **Course "community embed"** | n/a | ✅ **native** | Attach a discussion post or channel to a course/lesson — the native way to get comments onto a lesson |

**Key consequences**
- Lessons have **no native comments** → either embed a discussion (community embed) or pair the
  lesson with a Resources **document** (docs do have comments). The VBL course uses the two-space
  (course + Resources docs) pattern for exactly this reason.
- The hero accepts the iframe via the **"Embed External Video → Use HTML embed code"** path
  (it's labelled "video" but takes any iframe). Confirmed working for a full JS app.

---

## 3. The lesson-hero embed flow (step by step)

1. **Learn → the course → hover a lesson → pencil (edit).**
2. Hero Section: click **Video** (if it's currently an Image/None hero, switching to Video shows
   the upload box).
3. Click **"Click here to embed an external video instead."**
4. In the dialog choose **"Use HTML embed code."**
5. Paste the `<iframe>` into the **Embed Code** box → **Create Embed**.
6. **Save Changes.** The hero preview updates immediately.
7. To change an existing embed: **Remove Video** first, then repeat from step 3.

Heartbeat shows the live widget right in the hero preview, so you can confirm before saving.

---

## 4. The widget system

Widgets are **single self-contained HTML/CSS/JS pages, no build step**, embedded as 16:9 iframes.
Source: the `infocusapp` repo (`widgets/<name>/index.html` + `assets/`).

- Keep each widget self-contained (its own `assets/`), or share via a sibling folder and use
  **relative** paths — never absolute paths to a specific host (they break when you move hosts).
- Parameterise with the URL query so **one page serves many cases** (e.g. the FOCUS Hero:
  `?stage=find&mode=write`). One hosted file → every lesson.
- Respect **autoplay rules**: the learner taps play; never autoplay audio.
- Filenames: if a file is ever uploaded *into* Heartbeat (not just iframed), use only
  `a–z A–Z 0–9 _ -` — Heartbeat rejects accents/spaces/symbols.

### The FOCUS Hero (the flagship widget)
`widgets/focus-hero/` — one page, three modes, five stages:
- `?stage=find|orient|clarify|unfold|steer`
- `?mode=write` (music + write timer + duration presets), `move` (music cue, lighter slide),
  `remember` (guided voice, play/pause + progress ring, no presets).
- Per-lesson iframes are listed in `widgets/focus-hero/EMBED-URLS.md`.

---

## 5. Hosting & locking (IP protection)

### Two hosts in play
- **GitHub Pages** (`klossgott.github.io/infocusapp/…`) — public, **unlocked**, easy. Fine for
  non-sensitive widgets; anyone can embed/scrape.
- **Main site on Netlify** (`infocus.institute/widgets/…`) — branded, and **lockable**. This is
  the canonical home for the FOCUS Hero and the migrated widgets.

### How the lock works (Netlify/Cloudflare only — GitHub Pages can't do this)
A `_headers` rule on the main site scopes a Content-Security-Policy to the widget paths:

```
/widgets/*
  Content-Security-Policy: frame-ancestors 'self' https://community.infocus.institute https://*.heartbeat.chat
  X-Robots-Tag: noindex
```

- `frame-ancestors` = **only your community can iframe-embed the widget**. Embed it from any other
  site and it renders blank. (Direct-open / click-out still works — this only blocks *framing*.)
- ⚠️ If a Heartbeat embed goes blank after enabling, the parent origin differs from the list —
  add the actual origin and redeploy.
- `frame-ancestors` does **not** protect raw asset URLs (e.g. an `.mp3`) from direct download —
  for that, gate the file (hearthis private embed, member-only, or signed URLs).
- A root `robots.txt` blocks AI/scraper crawlers and de-indexes — invisible to learners, doesn't
  affect iframe embedding (browsers ignore robots.txt).

### Deploy pipeline (main site)
- Source: `_COWORK/sites/infocus/prototype/`. Widgets live under `prototype/widgets/<name>/`,
  shared media under `prototype/widgets/shared/`.
- **Sync** the latest widgets from the repo: `sites/infocus/_sync-widgets.sh` (rsyncs
  `infocusapp/widgets/*` → `prototype/widgets/`, rewrites `../../assets/` → `../shared/`).
- **Deploy:** `sites/infocus/_deploy.sh` (builds, zips, POSTs to the Netlify API with the saved
  token — no CLI/login needed). After any widget edit: run sync, then deploy.

---

## 6. Migrating a host (URLs change) — checklist

When you move a widget's host (e.g. github.io → infocus.institute):
1. The **iframe `src` changes** → update the embeds (lesson heroes, docs, posts).
2. If you also turn off the **old host**, leave a redirect first. The infocusapp GitHub Pages site
   has a `404.html` that forwards old `/<widget>/<file>.html` paths to the new `/widgets/<name>/`
   homes, so legacy embeds keep working through a deploy.
3. Re-test one embed in a real lesson (especially if `frame-ancestors` is on — confirm your
   community origin is whitelisted).

---

## 7. Gotchas & lessons

- **"No Iframe found"** = you pasted a URL; paste an `<iframe>`.
- **Lesson body won't take HTML** — use the hero (or a doc).
- **`file://` previews and locked-down browser tabs won't play audio** — test over `http(s)` in a
  real foreground tab; audio that "won't play" is usually the preview, not the widget.
- **Don't hardcode a host in a widget's internal asset paths** — relative paths survive a host move.
- **The hero "video" embed is the resolver path** — it accepts arbitrary iframes via *Use HTML
  embed code*, so you don't need the widget to masquerade as a video. (twitter:player/OG metadata
  only helps the auto-resolver, which you don't need once you're pasting iframes.)
- **Course at 0% started = safe to edit** — check Course Analytics before bulk-editing live lessons.
- **frame-ancestors locks framing, not downloads** — gate sensitive media separately.

---

## 8. Quick reference — the FOCUS Practice wiring

15 stage lessons, each hero = the FOCUS Hero at its stage+mode:

| Module | Move | Remember | Write |
|---|---|---|---|
| Find / Orient / Clarify / Unfold / Steer | `?stage=…&mode=move` | `?stage=…&mode=remember` | `?stage=…&mode=write` |

Base (locked, branded): `https://infocus.institute/widgets/focus-hero/`
Full per-lesson iframes: `widgets/focus-hero/EMBED-URLS.md`.
