
## Forms and choice pills (added 2026-09-11, laplandtours planner)

Vesa on a three-column, 40-control planner: *"mäkään en jaksaisi alkaa täyttää kun näyttää
niin työläältä, lisäksi värimaailma ei natsaa, eikö meillä ole porttia siihen mitkä asiat
pitää olla mitäkin."* This is that gate, in words.

- **One question per screen.** A form that asks more than ~6 things is a wizard: progress
  `n / N` + dots, `Seuraava` / `Takaisin`, contact fields on the last screen only. Everything
  is React state (only the current screen is in the DOM); the submitted brief is composed from
  state. Funnel events stay `{form}_view / start / blocked / submit / success / error`.
- **Choices are pills, not selects or checkboxes:** `rounded-full border border-snow/20
  bg-white/[0.04] text-snow/85 hover:border-arctic-cyan`, selected `bg-vibe-pink border-vibe-pink
  text-white`, `min-h-[44px]`. Pink appears only on the selected state and the primary button.
- **Text fields:** `rounded-full border border-snow/20 bg-white/[0.04] min-h-[48px]`, focus ring
  arctic-cyan. Textarea `rounded-2xl`. Labels: `text-[11px] uppercase tracking-[0.15em]
  text-white/60 font-semibold`.
- **Buttons:** primary `rounded-full bg-vibe-pink` (same as newsletter/footer), secondary
  `rounded-full border border-snow/20 text-snow/75`. Counters are `−`/`+` round buttons, not
  number spinners.
- **Card:** `max-w-2xl mx-auto rounded-3xl border border-white/10 bg-white/[0.03]` on
  deep-night. No `deeper-night` slabs, no `rounded-lg` boxes.
- **Gate:** before "valmis", a 375 px and a 1280 px screenshot of every screen of the wizard,
  and the e2e that submits through the screens (`e2e/laplandtours.spec.ts` is the model).
