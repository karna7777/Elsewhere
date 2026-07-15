# The Destination Storytelling System

> One design language for the entire destination experience. Not a set of tabs or
> cards — a single, scrolling editorial journey where **every chapter answers one
> emotion**. Think National Geographic feature, not React dashboard.
>
> This document is the source of truth. The Hero is built **last within the design
> phase / first within implementation**, and every other chapter reuses the exact
> same primitives so the whole thing reads as one magazine.

---

## 1. The narrative — chapters, each answering ONE emotion

A destination is a story told in order. Each chapter is a "room" you walk into.
Chapters **collapse when their data is absent** (Adventure only appears if the place
has adventures, etc.), so no destination ever shows an empty section.

| # | Chapter | The one question it answers | Real data it uses |
|---|---|---|---|
| 1 | **Hero** | *Where am I?* | name, heroQuote, hierarchy, moods (tag row), hero image |
| 2 | **Atmosphere** | *What's it like right now?* | weather, bestSeason, golden hour (from lat/lng), local time (timezone) |
| 3 | **Story** | *Why is this place special?* | story (serif lede), one large feature photo |
| 4 | **Experiences** | *What should I feel here?* | experiences[] → immersive vignettes (see §4) |
| 5 | **Photography** | *What will I remember?* | visualJourney[] → full-bleed cinematic gallery |
| 6 | **Culture** | *How do people live here?* | culture.{festivals,traditions,etiquette,phrases,dresscode} |
| 7 | **Food** | *What should I taste?* | food[] → menu-scale food photography |
| 8 | **Hidden** | *What do locals know?* | hiddenGems[] → image-first secret cards |
| 9 | **Adventure** | *What should I do?* | adventures[] → bold action cards |
| 10 | **Seasons / Journey** | *When should I come?* | seasons → a temporal band |
| 11 | **Nearby** | *Where next?* | similar vibes / continue-journey rails (Netflix-scale) |
| 12 | **Ellie** | *Who's my guide?* | contextual companion, woven throughout (see §5) |

**Scroll model:** one continuous vertical journey. A slim, glassy **chapter rail**
(right or top) scroll-spies the current chapter and lets you jump — replacing the
current tab bar. Same data, same modules, re-skinned into chapters; no logic,
routing, AI, camera, or state changes.

---

## 2. One design language (the shared system)

Every chapter is assembled from the **same primitives** so nothing looks bespoke.

### Type scale (exaggerated, editorial)
- **Hero name** — Fraunces, `clamp(64px, 7vw, 132px)`, weight 300, tight tracking
- **Chapter title** — Fraunces, `clamp(40px, 5vw, 72px)`, weight 400
- **Chapter kicker** — the emotion, uppercase, tracked `0.2em`, 13–14px, **gold** `#e8c07a`
- **Lede** — Fraunces serif, 26–30px, line-height 1.7, narrow measure (~760px)
- **Body** — Inter, 18–19px, line-height 1.7
- **Meta / caption** — 15px · **Tag** — 14px

### Rhythm & layout
- **~140px between chapters** (they breathe; luxury = space, not density)
- Reading columns max ~760px (comfortable measure); **media goes full-bleed** to the
  panel edges, breaking the column — photography dominates
- Layouts **alternate**: full-bleed → split-left → split-right → full-bleed…

### Imagery (primary content)
- Full-bleed heroes, large feature images, asymmetric editorial splits
- Slow ken-burns / parallax on scroll; text overlays photography, not beside tiny cards

### Motion (expensive, never flashy)
- Chapter reveals: fade + 32px rise on `whileInView`, ease `[0.16,1,0.3,1]`
- Staggered children (80ms), image fade-up on load, subtle parallax
- Nothing bounces or spins; everything eases

### Color / glass
- Dark editorial base, **glass** cards (`backdrop-filter`), white type, **gold** accents
  (migrating off cyan), blue Earth. Minimal icons.

### Reusable primitives (to build once, use everywhere)
`<Chapter>` (kicker + title + rhythm + scroll reveal) · `<FullBleedMedia>` ·
`<EditorialSplit>` · `<ExperienceVignette>` · `<AtmosphereStrip>` ·
`<PhotoGallery>` · `<TagRow>` · `<EllieNudge>`

---

## 3. Chapter anatomy (the template every chapter follows)

```
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
   WHAT'S IT LIKE RIGHT NOW              ← kicker (emotion, gold, tracked)

   Atmosphere                            ← chapter title (huge Fraunces)

   [ full-bleed or editorial content ]   ← photography-first body

   ↳ Ask Ellie …                         ← optional contextual nudge (§5)
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄  ~140px gap
```

---

## 4. Experiences become immersive, not checklists

The single biggest storytelling upgrade. Kill the `✓` list. Each experience is a
small editorial vignette:

```
   Sunrise at Fushimi Inari

   A peaceful climb before the crowds arrive. Golden light spills across
   thousands of vermillion torii gates while Kyoto slowly wakes below.

   🕔 Best time  ·  5:20–6:30 AM        🥾 Adventure
```

Built from real data: the experience sentence → **title + a poetic supporting line**
(derived, never fabricated facts); category + a "best time" chip where the sentence
implies one (sunrise/sunset/after-dark → golden hour). Where an image exists, the
vignette goes full-width cinematic; otherwise a large glass panel with generous space.

---

## 5. Ellie is a companion, not the last tab

Ellie stops being tab #7. She lives **alongside** the journey via `<EllieNudge>` — a
small, glassy, gold-accented prompt that appears inside relevant chapters and
deep-links into Ellie with a **seeded prompt** (reuses the existing Ellie engine; no
AI changes):

- Story → *"Ask Ellie to plan a walking route through here →"*
- Food → *"Ask Ellie where to eat tonight →"*
- Hidden → *"Ask Ellie to order these into a perfect afternoon →"*
- Photography → *"Ask Ellie the best hour for each shot →"*

The persistent AIStrip becomes the always-present companion; a full Ellie chapter
still exists for open conversation.

---

## 6. Implementation order (after sign-off)

1. **Foundation** — design tokens + `<Chapter>` + shared primitives + motion + the
   scroll-spy chapter rail (replaces tabs).
2. **Arrival** — Hero + Atmosphere.
3. **Narrative** — Story + Experiences (immersive vignettes).
4. **Photography** gallery.
5. **Re-skin** Culture, Food, Hidden, Adventure, Seasons, Nearby into the system.
6. **Ellie** contextual nudges.

### Guardrails (unchanged, production-ready — do NOT touch)
Globe · CameraRig · Search · Fly-to · AI pipeline · Knowledge Builder ·
Destination Repository · routing · APIs · state · backend. This is **presentation
only** — HTML / CSS / motion / layout inside `LocationWorld` + shared UI.
```
