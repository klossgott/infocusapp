# Voice of the Blank Page — embed URLs

## Combined writing-practice widget (timer + prompts, one borderless iframe)

`practice.html` is one self-contained page — a type-minutes countdown timer **and** a
tap-for-a-prompt generator, side by side, **no table / no grey lines**. Parameterised by week.
Use it to replace the old two-iframe-in-a-Heartbeat-table layout in each Weekly Prompts doc.

Base: `https://infocus.institute/widgets/voiceblankpage/practice.html?week=…`

| Doc | week | iframe |
|---|---|---|
| Week 1 · PRESENCE | `presence` | `<iframe src="https://infocus.institute/widgets/voiceblankpage/practice.html?week=presence" width="100%" height="340" style="border:0"></iframe>` |
| Week 2 · COURAGE | `courage` | `<iframe src="https://infocus.institute/widgets/voiceblankpage/practice.html?week=courage" width="100%" height="340" style="border:0"></iframe>` |
| Week 3 · CURIOSITY | `curiosity` | `<iframe src="https://infocus.institute/widgets/voiceblankpage/practice.html?week=curiosity" width="100%" height="340" style="border:0"></iframe>` |

**To apply (per doc):** edit the doc → delete the existing 2-column table holding the two
iframes → paste the single iframe above for that week → save. The grey lines were the
Heartbeat table's cell borders; one borderless iframe removes them.

## Individual widgets (still available if needed)
- Timer only: `https://infocus.institute/widgets/countdown-timer/`
- Prompt decks: `…/voiceblankpage/presence-prompts.html` · `…/courage-prompts.html` · `…/curiosity-prompts.html`
- The old combined container `curiosity.html` nested two iframes (fixed heights) — superseded by `practice.html` (inline, responsive, no nesting).
