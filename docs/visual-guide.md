# Visual guide — v3

The page is built on the **Dennis Snellenberg style reference** (`DESIGN.md`), inverted to light. Light editorial canvas, single typeface at a single weight, uniform tracking, pill-shaped interactives, one violet accent used as punctuation.

**v3 — light only.** The dark theme is gone. Not toggled off, not hidden behind a media query: removed. There is one palette and it is light, ground `#EFF0F1`. Every token below was re-derived from that ground rather than mechanically inverted, because a straight inversion of a dark system produces glare and mud.

This document records how the system was applied, and the four places I deviated from it — each with a reason, so you can overrule any of them.

---

## Tokens as implemented

### Colour

| Token | Value | Contrast on canvas | Role |
|---|---|---|---|
| `--canvas` | `#eff0f1` | — | Page ground. Owns ~95% of the interface. |
| `--ink` | `#1c1d20` | 14.7:1 | All primary text. |
| `--fog` | `#62666a` | 5.1:1 | Secondary copy, captions, metadata. |
| `--faint` | `#83878b` | 3.2:1 | Placeholder markers only — never real copy. |
| `--iris` | `#455ce9` | 4.6:1 | The accent. |
| `--iris-deep` | `#334bd3` | — | Accent hover / stepped companion. |
| `--on-accent` | `#ffffff` | 5.2:1 *on iris* | The only true white left: text sitting on the accent. |

**`--white` is gone, renamed to `--ink`.** A token called white holding `#1c1d20` is the kind of thing that rots a system in a month. Same reason `--graphite-*` became `--surface-*`: on light these are steps *down* from the canvas, not up.

| Token | Value | Role |
|---|---|---|
| `--surface` | `#e4e6e8` | Card, quote and fork ground |
| `--surface-hi` | `#dbdde0` | Card and pill hover |

**One token split in two.** The old `--graphite` did two unrelated jobs — pill hover fill and placeholder text — and got away with it on dark because both wanted "a step toward mid grey". On light they pull in opposite directions: the fill wants to be barely darker than the ground, the text wants to be much darker. They are now `--surface-hi` and `--faint`.

Hairlines flipped from white-alpha to ink-alpha: `--hair` `rgba(28,29,32,.16)`, `--hair-soft` `rgba(28,29,32,.10)`, and the inset ring `rgba(28,29,32,.18)`.

### Violet discipline

The rule is one accent element per viewport. Exactly four exist on the whole page:

1. ~~**Parfee card** — the lead case, filled `--iris`.~~ **Gone with the "Selected work" section.** That card was the page's one piece of accent-as-hierarchy below the hero; removing the section removed it. The remaining "More work" cards are all neutral, so nothing in that half of the page now carries the accent.
2. ~~**Case panel spine** — the vertical bar with the case number.~~ **Removed.** With it went the last accent inside the drawer; the panel is now entirely neutral.
3. **Email pill** in contact.
4. **Focus ring** — functional, not decorative.

Plus one that only exists while the cursor is moving: the **wet edge of the hero fluid reveal**, and the status pills inside the schematic it uncovers. The hero previously had no accent at all, so this is that viewport's one — the rule holds. See *Motion → The hero fluid reveal*.

Nothing else is violet. Adding another would start diluting it.

### Type

**Geist, variable (100–900).** Served from Google Fonts, one family, no second face.

Swapped from Inter in v4. Two things to know about the change:

- **The single-weight rule is already gone** — the hero's artboard uses 700 for the headline and the work list, and the drawer's lede is bold. Body copy stays at 450.
- **`ch` measures moved with it.** Geist's zero is narrower than Inter's, so the headline's `max-width:20ch` resolves to ~853px where Inter gave ~900. Checked at the artboard width: the three-line break — *systems / complex / can't be.* — survives. Any future `ch` measure wants re-checking against Geist, not Inter.

Letter-spacing is `0.05em` on every element including body copy. That single number reproduces the reference's whole scale exactly: 0.05em × 216px = 10.8px, × 15px = 0.75px, × 10px = 0.5px.

```
hero name   clamp(52px, 12.4vw, 176px)  /  lh 1.00
h-lg        clamp(44px, 7.6vw, 88px)    /  lh 1.06
h           clamp(34px, 5.4vw, 60px)    /  lh 1.07
h-sm        33px                        /  lh 1.20
body-lg     17px                        /  lh 1.50
body        15px                        /  lh 1.66
meta        12px                        /  lh 1.40
caption     10px  uppercase             /  lh 1.45
```

**Emphasis is tone, not weight.** `strong` is redefined to keep weight 450 and switch colour from Fog to White. That is how the case copy stresses *"one booking is seen by four different parties"* without breaking the single-weight rule.

### Shape and depth

- Cards `10px`. Every interactive element `36.72px` — full pill.
- **No drop shadows anywhere.** The only elevation is `rgba(255,255,255,.2) 0 0 0 1px inset`.
- Hover states are **background swaps only** — no lift, no shadow, no scale.

### Layout

Full-bleed, no max-width container. Edge gutter `clamp(12px, 3.4vw, 43px)`, element gap `12px`, section gap `clamp(88px, 12vw, 160px)`. Everything anchors left. Reading columns cap at `62ch` — the canvas is full-bleed, the *text* is not, which is how the reference's own body copy behaves beside its photography.

---

## Four deviations

### 1. The hero is Artjoms's own artboard, not the reference

**Superseded in v4.** The hero is now built from a 1920×1080 layout Artjoms designed himself, and it overrides the reference wherever the two disagree. The name is no longer a display headline at all — it is a 17px caption under a portrait card, and the statement carries the visual weight instead. See *The hero layout* below.

### 2. Photography: delivered

All three assets are in and wired. See `assets/README.md` for the working notes.

| Asset | Size | Role |
|---|---|---|
| `Profile_picture_Grey.png` | 344×430 | portrait card — the surface |
| `Profile_picture.png` | 344×430 | the colour underneath it |
| `Project_preview.png` | 808×632 | hover preview |
| `background1.jpg` | 2400×1590 | the layer the cursor uncovers |

**`background1.jpg` arrived at 4928×3264 / 10.5 MB and was resized in place to 587 KB.** It is the hero background — it downloads on every visit, and 10.5 MB was not shippable. It is also uploaded as a WebGL texture, where the original would have cost roughly 64 MB of GPU memory; `paintReveal()` now caps the upload at 2048px regardless.

### The portrait joins the wipe

The greyscale portrait sits on the surface and the cursor uncovers the colour one — Segerman's own move, finally literal.

Getting there meant **re-ordering the hero's z-axis**, because an opaque DOM image above the canvas can never be crossed by it:

| z | |
|---|---|
| 1 | the portrait plate — greyscale, the surface being opened |
| 2 | the fluid canvas |
| 3 | everything else — text, nav, work list, work preview |

Only the portrait was lowered. Text and the work preview stay above the canvas, so the wipe still never runs over them.

The colour portrait is not a second DOM layer — it is **drawn into the reveal texture** in `paintReveal()`, at the exact rectangle the grey plate occupies, after the dim so it keeps full colour. The two register pixel for pixel, so the wipe reads as colour bleeding into greyscale rather than as one photo sliding over another. Nothing in the hero sits over that rectangle, so the bright area costs no legibility.

With the effect off there is no way to reach the colour at all, so `.hero.no-fluid` swaps the plate to the colour version outright. Touch users get the photograph, not a permanently grey one.

**One preview image serves all five projects** for now, so the hover swap changes nothing visible yet — the zoom is currently the only hover feedback on the plate. The mechanism is wired by slug and ready for per-project shots.

**The preview frame keeps the artboard's 451:300 slot, by choice.** The asset is 808:632, so `cover` crops 15% off its height and clips the two badges along its bottom edge. Matching the frame to the asset was tried and rejected on looks — the plate grew 50px taller, which read as too heavy in the composition. The crop is the accepted cost. **Replacement shots want 3:2**; anything taller loses its top and bottom edges.

### 3. The mono layer is gone

The previous version used IBM Plex Mono for metadata, which carried the concept — *the portfolio of someone who designs admin systems, written in admin-system grammar.* The single-family rule removes that voice.

The concept survives structurally: the meta table, the `Options / Chose / Gave up / Why` fork blocks, and the numeric scope list are all still admin-UI information design. But it now lives in **structure only**, not in typography. Worth knowing what the trade cost.

### 4. Removals

- **The dark theme and the theme toggle** — the system is light-only by definition as of v3. `body` paints the canvas explicitly and `html` declares `color-scheme:light`, so the page holds on any host background and native controls follow.
- **The skill marquee** — not a component in this system, and it carried no argument. Easy to bring back if you miss it.

---

## Components

**Pill** — the only interactive shape. Three variants: inset-ring (default), iris (one per section), solid white (unused, held in reserve).

**Work card** — graphite-soft, 10px radius, 22px padding. Number and arrow top, name pushed to the bottom by `margin-top:auto` so the cards align on their names regardless of copy length. Hover lifts the surface half a step and adds the inset ring.

**Fork block** — the most subject-specific component on the page: each design decision as a record, `Options → Chose → Gave up → Why`. An architecture decision record borrowed into a portfolio.

**Case panel** — right drawer, deep-linkable at `#/work/<id>`, Esc / scrim to close, arrow keys to move between entries.

Both kinds open on a **hero plate** — a 12:5 image with the project name over its lower left, **wiped open from the top edge downwards** — followed by a two-column block: the meta pairs on the left, the one-line argument in bold on the right, then a rule. Built from Artjoms's reference.

The bar rides **over** the hero: transparent with white type, pulled up under it by exactly `--bar-h`, and it swaps to the page ground once the hero scrolls past so Close never becomes unreadable. That swap is the one piece of JS in the drawer's chrome — a scroll handler toggling `.is-stuck` at `heroHeight − barHeight`.

### The hero plate, and the four attempts it took

The plate is wiped open from its top edge **in lockstep with the slide** — same delay (`--t-scrim`), same duration (`--t-drawer`), same curve — so it finishes exactly as the panel lands. Confirmed straight from the browser: both are running `CSSTransition`s reporting delay 360ms, duration 1100ms.

Getting here took four goes, and the useful part is why three of them failed:

| Attempt | What happened |
|---|---|
| Wipe alongside the slide | Looked invisible — but the real cause was a bug, see below |
| Wipe after the slide | Read as the drawer loading in pieces |
| Dark ground behind the wipe | Better, still read as a load |
| **Warm the image, wipe alongside the slide** | Works |

**The image was never loaded.** The plate is a `background-image` on an element that does not exist until a drawer opens, so the browser only began fetching at the moment of opening — 560 KB arriving *after* the panel had landed. Every timing change was decorating a loading glitch. `warmHeroes()` fetches and `decode()`s every distinct hero on idle; measured on a cold load the image lands at **263ms**, long before a drawer can be opened.

**And the first attempt was never actually tested.** The hero list entries are links with a real `href`; the browser followed it after the click handler, the hash router opened the same entry a second time, and that second call found the drawer already open and rendered the plate finished. The wipe ran only from the "More work" buttons. `e.preventDefault()` on the `[data-case]` branch fixed it — `openCase` pushes the hash itself.

Two things that are structural rather than tuning:

- **The clip is on the wrapper, not the image.** The plate has no ground of its own — unrevealed it is the drawer's white surface — so the title must be inside the clip and be uncovered with the photograph, or it hangs white on white.
- **Closing is not the mirror.** `0s` duration held back by `--t-drawer`, so the clip resets only once the panel is off-screen: the plate leaves *with* the drawer instead of collapsing in front of the reader. Verified — the clip holds `inset(0)` for the whole close.

`.panel-root.is-revealing` holds the bar in its solid state for `--t-scrim + --t-drawer`, read off the tokens. Without it the bar's white label and Close pill sit on a still-white plate and are invisible for the whole entrance.

It serves **two kinds of content through one mechanism**. `CASES` render an argument; `SUPPORTING` render a gallery of screens, with the eyebrow reading "Screens" instead of "Case study". Everything else — the slide, the keyboard, deep links, the content cross-fade — is shared. Arrows cycle **within the group you opened**, so a case never steps sideways into a gallery.

`entryOf(id)` is the seam: it resolves an id against both lists and reports which kind it is. Adding a third kind means adding a branch there and a renderer, nothing else.

**DBMC sits in both places and neither.** It is listed in the hero rather than the "More work" grid, but its data stays in `SUPPORTING` because that is where its drawer content lives — the grid filters it out explicitly.

---

## The hero layout

Built from a 1920×1080 artboard with 60px margins, so the page gutter `--pad` is now `clamp(20px,3.125vw,60px)` — sections below the hero share that edge.

Two anchors carry the composition: the left edge, and a second column at **54.8%** of the content width (x=1046 on the artboard). The grid declares its columns as artboard fractions — `348fr 638fr 451fr 363fr` — so the proportions hold at any width rather than only at 1920. Measured against the artboard at 1920 the built layout lands within a few pixels everywhere; the type scale uses `clamp()` values that hit the artboard sizes exactly at that width.

**Hovering a project name swaps the preview plate, and zooms the photograph inside it to 1.2.** Fiducia is the resting state, matching the artboard.

**The zoom answers the names, not the plate.** Hovering the preview itself does nothing: it is a readout of what is hovered, not a control. Only `.is-zoom`, set by the name handler, drives it.

The frame does not move — only the image inside it scales, with `.hero-preview` clipping. That is a constraint, not a preference: the plate's right edge clears the work list by 24px, and scaling the frame itself by 20% would push it 45px right, driving it 19px under the project names. The zoom is driven by an `.is-zoom` class the hover handler toggles, plus `.hero-preview:hover` so the plate responds to being pointed at directly.

### The difference blend

The wipe opens a near-black window under the text, and ink on near-black is invisible. The hero type is therefore painted **white and blended with `mix-blend-mode:difference`**, which makes it invert itself: over the light canvas `#eff0f1` white resolves to `#100f0e`, over the revealed `#0f1015` it resolves to near-white. No JS, no measuring, and it degrades correctly when the effect is off.

Greys need a grey source for the same reason: `#8d8e8f` differenced against the canvas gives `|239-141| = 98`, landing on the fog already in the system.

**Two traps, both hit during the build.** First, `isolation:isolate` on the hero makes it a blend group whose backdrop starts transparent — the hero must paint `--canvas` itself or the type stays white. Second, **any ancestor that creates a stacking context isolates its descendants' blending**, so the wrapper could not carry `z-index`. The elements that must clear the canvas are lifted leaf by leaf instead: an element making its own stacking context isolates its children, not itself, so each leaf still blends against the hero's group. Do not wrap them.

**`.inv` goes on the element that paints the glyphs, never on a wrapper.** `mix-blend-mode` makes the element a stacking context, which both drops the whole group below the canvas and isolates its children's blending. The nav shipped with `.inv` on `<nav>` instead of on the links, so the wipe did not blend with it — it simply covered it. Same trap as the grid wrapper, one level down.

### The accent is the one thing that cannot invert

`difference` renders type as `|255c − backdrop|`. For a **white** source that is `255 − backdrop`, which is far from the backdrop everywhere except mid-grey — which is what `REVEAL_DIM` exists to prevent. For any **coloured** source there is always a backdrop of that same tone where the result goes to zero and the text disappears. Iris measured **1.45:1** over the brighter parts of the photograph. So a stable hue and guaranteed contrast cannot both be had; the accent has to pick one, and which one it picks depends on where the cursor is:

| State | Treatment | Why |
|---|---|---|
| Resting accent (`.is-on`, no cursor) | iris, `mix-blend-mode:normal` | It sits on the light canvas at 4.6:1, and by definition the wipe is not there. This is the artboard's still frame. |
| Hovered (`a:hover`) | white, `difference`, nudged `-0.38em` | The cursor is on it, so the wipe is on it. It gives up the hue and takes the inversion. With no colour left to signal itself, the feedback is carried by a small nudge — motion survives inversion, and unlike an underline it puts no extra mark in the composition. |

`.hero-work a:hover` (0,2,1) outranks `.hero-work .is-on` (0,2,0), so hover wins whenever both apply.

---

## Motion

Two curves. `--ease` `cubic-bezier(.22,.61,.36,1)` for card and pill state (220–260ms) and arrow drift (260ms).

`--ease-modal` `cubic-bezier(.76,0,.24,1)` for the case panel — a symmetric ease-in-out (easeInOutQuart). The panel gathers speed, crosses, and settles, rather than launching at full speed and coasting.

This **replaced** videinfra's own `cubic-bezier(.25,.74,.22,.99)`, which is a pure ease-out. Their curve covers a quarter of the distance in the first 6% of the run; a surface this large reads better easing in. Durations: `--t-drawer` **1.1s**, `--t-scrim` **0.36s**, against the reference's 1.2s / 0.4s. Measured end to end — scrim 33→383ms, drawer 383→1483ms — so the handoff lands in the same millisecond and a full open is **1.46s**.

The reference numbers are kept below for provenance — what was measured off their site, and what we run now.

| | Theirs | Ours |
|---|---|---|
| Panel slide | `transform` 1.2s, `translateX(100%)` → 0, opacity untouched | same move, **1.1s** |
| Backdrop | opacity 0 → 1, 0.4s | **0.36s** |
| Content swap | opacity 0 → 1, 0.4s | 0.4s, unchanged |
| Curve | `cubic-bezier(.25,.74,.22,.99)` ease-out | `cubic-bezier(.76,0,.24,1)` ease-in-out |

Their project modal carries `modal--right-in modal--full-height`, and the detail that matters is **what actually moves**: the element they translate is `.modal__scroller`, which is the full viewport wide (1440 at 1440), while the white surface inside it is inset 160px from the left. So the slide covers a whole viewport width in 1.2s.

The first port matched their durations and curve exactly and still felt wrong, because our panel was only 780px wide — the same 1.2s over 780px reads as sluggish rather than sweeping. **Duration alone does not carry the feel; the distance does.**

That was then over-corrected: the slider was made full-viewport with the surface padded into its right half, which decoupled travel from width but meant **half the travel happened off-screen**. The drawer appeared to stall and then arrive with a jolt — read from the outside as the drawer and the overlay colliding. **The panel is now exactly the surface**, 50% wide, travelling half a viewport, so the instant it starts it is already entering the frame.

### The two are sequenced, not simultaneous

| | order |
|---|---|
| Opening | scrim covers the page → drawer comes in |
| Closing | drawer leaves → scrim lifts |

No JS. A transition uses the delay from the style it is moving **to**, so the delays live on the two states: `.panel` carries the closing delay (0) and `.panel-root.open .panel` the opening one (`--t-scrim`); the scrim is the mirror image. Verified by `transitionstart`/`transitionend` order in both directions.

Total open is `--t-scrim` + `--t-drawer` = **1.46s**.

### The drawer was not settling — the page was moving

It looked like the drawer drifted a couple of pixels left just after opening. It was not the drawer. `is-locked` hides the body overflow, which removes the 15px scrollbar, which makes the layout 15px wider; the drawer is anchored right and sized `50%`, so it gained 7.67px and its left edge stepped left by exactly that. **The whole page shifted 15px too** — the drawer just made it visible.

Fixed with `html { scrollbar-gutter: stable }`: the gutter is reserved whether or not the scrollbar is drawn, so locking changes nothing. Verified at zero — root, panel and hero all measure identical locked and unlocked. Any future full-screen overlay that locks the body inherits the fix.

### A second, separate bounce: focus was scrolling the container

The width fix did not end it, because a second cause was hiding behind the first. `openCase` focuses the panel body — for keyboard users — but it did so while the panel was still translated off-screen. The browser dutifully scrolled the nearest scrollable ancestor to reveal the focused element, setting `.panel-root.scrollLeft` to **712**, which then decayed back to 0 as the panel arrived. The whole layer, scrim included, slid sideways and crept back.

Two changes, one intentional and one structural:

- `bodyEl.focus({ preventScroll:true })` — keep the focus, drop the scroll.
- `.panel-root` moved from `overflow:hidden` to `overflow:clip`, which is not scrollable at all, so nothing else can do this again. `.panel-body` keeps its own vertical scrolling.

Verified across a full open: `scrollLeft/scrollTop` never leaves `0/0`, and the resting x is a single value.

**The lesson worth keeping:** `overflow:hidden` is still a scroll container. Programmatic scrolling — `focus()`, `scrollIntoView()`, anchor jumps — moves it happily. `overflow:clip` is the one that actually cannot move.

**The transparent strip must not take clicks.** `.panel` is `pointer-events:none` with the spine and body set back to `auto`. Without that the full-width panel silently covers the scrim and dismissing by clicking outside the drawer stops working — which is exactly what happened when the panel first went full-width.

Below 900px the padding drops to 0 and the drawer is full-screen, as before. The 0.4s content fade is not part of opening: it is what runs when their ‹ › arrows swap projects while the drawer stays put. Our `step()` does exactly that, so the fade is wired there and not on a cold open, where the content rides in with the panel.

All of it collapses under `prefers-reduced-motion: reduce`.

Durations live in `--t-drawer` and `--t-scrim`, so the pace is two numbers rather than a hunt through rules. The content cross-fade is deliberately **not** scaled with them: it belongs to switching entries, not to opening.

### The hero fluid reveal

The one exception to the "nothing else animates" rule, and it is confined to the hero.

A GPU fluid simulation — incompressible Navier–Stokes on ping-pong framebuffers, the same class of effect as [segerman.dev](https://segerman.dev) — runs on a `<canvas class="hero-fluid">` layered between the media plate (z 0) and the name (z 2). **The dye field is never drawn as ink. It is used as a mask.** The cursor wipes the calm surface away and **a photograph shows through** — a night street, dimmed hard before it becomes a texture. Iris pools at the wet edge of the wipe.

The procedural admin-system schematic that used to be the revealed layer is still in the file as `paintSchematic()`, and still earns its place: it stands in while the photograph loads, and if the photograph ever fails.

**`REVEAL_DIM = 0.70` is a measured value, not a taste call.** The difference blend renders type as `255 − backdrop`, so a backdrop near mid-grey produces type near mid-grey — invisible. Sampling the whole photograph: undimmed, 10.5% of its pixels would render text below 3:1 contrast; at 0.55, 3.2%; at 0.70, none, with the brightest pixel falling from 121 to 84. Brightening it back up starts hiding words.

**Locked at v3.** The light repaint did not touch a line of the simulation or the schematic. It did not need to: the reveal layer was already dark, so on a light ground the wipe now cuts a genuinely dark window into a clean page instead of a slightly-darker one. The contrast between surface and revealed layer went up, not down, which is the one place the theme flip made the effect stronger rather than weaker. If that reads too heavy, the fix is `paintSchematic()`'s ground fill — nothing else.

That is the argument the statement block makes in words — *"multi-role systems where the state is complex and the interface can't be"* — made once, physically, before the reader has read a line of copy.

**Written in raw WebGL2. No three.js, no GSAP, no build step** — it is inline in `index.html` like everything else, so `build-artifact.mjs` carries it into the Artifact preview unchanged.

| Parameter | Value | What it controls |
|---|---|---|
| `SIM_RES` / `DYE_RES` | 128 / 512 | Velocity grid vs. mask detail |
| `DYE_DISS` | 1.224 | How fast the surface closes back over — half-life ~0.44s of wall clock |
| `VEL_DISS` | 0.90 | How fast the motion dies down — high, so the wipe stays under the cursor instead of drifting across the hero |
| `CURL` | 15 | Vorticity confinement — the swirl in the wipe |
| `RADIUS` / `FORCE` | 0.115 / 6000 | Size and push of each cursor splat |
| `ITER` | 18 | Jacobi pressure iterations |
| `SPEED` | 1.3 | Global time scale — the whole effect plays 30% faster |

**`RADIUS` is an area, not a length.** The splat shader is `exp(-|p|² / uRadius)`, so the visible spot radius goes as `sqrt(RADIUS)`. Shrinking the cursor by 40% means multiplying by `0.6² = 0.36` — 0.32 → 0.115. Scaling it linearly to 0.192 would have shrunk the spot by only 22%. The exponent makes the ratio independent of where you put the mask threshold, so this holds however `m` is tuned.

**Two independent time controls, and it matters which one you reach for.** `SPEED` sets the pace of the whole effect. `DYE_DISS` sets how long the ink survives *at that pace* — the trail's lifetime alone, with the motion untouched. Note the direction: dye decays as `exp(-DYE_DISS · t)`, so lifetime is proportional to `1/DYE_DISS`. Cutting the trail's life by 30% means dividing by 0.7, not subtracting 30%. Two such cuts have been applied: 0.60 → 0.857 → 1.224, taking the half-life from ~0.89s to ~0.44s of wall clock — the trail now lives about half as long as it originally did.

**Where the floor is.** Two more cuts of the same size would land near 0.21s, and at that point the wipe stops reading as a trail and becomes a blob stuck to the cursor with no history behind it. The effect needs a beat of persistence for "there's a system underneath" to register — the reader has to see the opening survive long enough to look into it. Worth knowing before the next 30%.

**`SPEED` is the only knob for pace.** Every part of the simulation reads its rate off `dt` — advection, vorticity, and both dissipations — so scaling `dt` once at the top of the frame plays the entire effect faster without changing anything about how it looks. Do not chase the same result by editing `DYE_DISS` and `VEL_DISS` separately; that changes the character of the wipe, not its speed. The intro sweep divides its duration by `SPEED` so it keeps pace.

**It refuses to run** on `prefers-reduced-motion: reduce`, on coarse pointers (all touch), without WebGL2, or without float render targets. In every one of those cases the script sets `.no-fluid` on the hero, the canvas and the hint are `display:none`, and the hero is exactly what it was before. Nothing in the hero's meaning depends on it. It also pauses via `IntersectionObserver` the moment it scrolls out of view, and on `document.hidden`.

**The reveal layer is swappable.** It is painted procedurally in `paintSchematic()` on a 2D canvas and uploaded as a texture. When the portrait arrives, replacing that function's body with a single `drawImage` of a colour version turns the effect into Segerman's exact move — greyscale on the surface, colour underneath — without touching a line of the simulation.

---

## Accessibility notes

- Fog `#62666a` on canvas `#eff0f1` is ~5.1:1 — comfortably AA for body text.
- Violet `#455ce9` is used as a **surface** with white text on it, not as text on the canvas. That matters more on light than it did on dark: as text it clears AA by a hair (4.6:1), as a ground under white it sits at 5.2:1. Keep it a surface.
- `--faint` at 3.2:1 fails AA and is meant to. It marks copy Artjoms still has to write, and it should look unfinished. Nothing that ships to a reader may use it.
- Case panel is a real `role="dialog"` with `aria-modal`, scroll lock, and focus returned on close.
- Focus ring is the iris at 2px with 3px offset, visible on every interactive element.

---

## Still open

1. **The portrait.** Everything else is waiting on it.
2. Case copy in the `⟨you⟩` slots — shown in dashed graphite on the page.
3. Behance and Upwork URLs, and the CV file for the download links.
