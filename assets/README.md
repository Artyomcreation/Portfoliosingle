# Hero assets

All three are wired. The two plates are CSS `background-image`; the background
is loaded by the fluid script and uploaded as a WebGL texture.

| File | Size | Used by |
|---|---|---|
| `Profile_picture_Grey.png` | 344×430 | the portrait card — what you see at rest |
| `Profile_picture.png` | 344×430 | the colour version the cursor uncovers |
| `Project_preview.png` | 808×632 | the hover preview beside the work list |
| `background1.jpg` | 2400×1590 | the layer the cursor uncovers |
| `Drawer_hero.jpg` | 2000×1128 | the plate at the top of every drawer |

## Notes

**`background1.jpg` was resized in place**, from 4928×3264 / 10.5 MB down to
2400×1590 / 587 KB. It is the hero background, so it downloads on every visit —
10.5 MB was not shippable. Keep your full-resolution original elsewhere.

**One preview image, five projects.** All five names currently point at
`Project_preview.png`, so hovering swaps nothing visible yet. Drop per-project
shots and point each `.hero-shot` at its own file — the swap mechanism is
already wired by slug. **Export them 3:2** — the frame is `aspect-ratio: 451/300`
and `cover` crops anything taller. The current 808:632 asset loses 15% of its
height that way, including the lower edge of its two badges.

**The background is dimmed 70% before it becomes a texture** (`REVEAL_DIM` in
index.html). That is not taste: the hero type is kept readable by a `difference`
blend, which renders text as `255 − backdrop`, so a mid-grey backdrop produces
mid-grey text. Measured across the photo, an undimmed image left 10.5% of pixels
rendering text below 3:1 contrast, and 0.55 left 3.2%. At 0.70 it is zero.
Raising the brightness back up will start hiding words.

**The portrait is a two-layer reveal.** The grey plate sits *below* the fluid
canvas (z 1 vs z 2) so the wipe can cross it; the colour version is composited
into the reveal texture at the grey plate's exact rectangle. If you replace one
of the two, replace both and keep them the same size, or they will not register.

With the effect off (touch, reduced motion, no WebGL2) there is no way to reach
the colour, so the plate swaps to `Profile_picture.png` outright.

## Project screens

The three supporting projects open a second kind of drawer — screens rather than
an argument. Each expects four plates at **16:10**:

| Project | Path |
|---|---|
| DBMC | `screens/dbmc/01.webp` … `04.webp` |
| Xdose | `screens/xdose/01.webp` … `04.webp` |
| Smartinterior | `screens/smartinterior/01.webp` … `04.webp` |

Same rule as everywhere else: background-images, so a missing file paints the
plate colour and nothing breaks. To change how many a project shows, edit its
`shots` value in `SUPPORTING` — the captions renumber themselves.

## Drawer hero

`Drawer_hero.jpg` was **recompressed from 2145 KB to 560 KB** at the same
2000×1128. The drawer opens in 1.46s and the image has to be there when it
lands, so 2 MB was not going to arrive in time. The untouched original is kept
beside it as `Drawer_hero-original.jpg`.

It is the fallback for **all** drawers. To give a project its own, add a
`hero` field to its entry in `CASES` or `SUPPORTING`:

```js
{ id:'fiducia', /* … */ hero:'assets/heroes/fiducia.jpg' }
```

The plate is cropped to **12:5**, so anything wider than that loses its top and
bottom; the title sits over the lower left, so keep that corner quiet.

**Drawer heroes are preloaded.** `warmHeroes()` in index.html fetches and decodes
every distinct `hero` on idle, so an opened drawer paints with its image already
there. Add a new hero image and it is warmed automatically — it reads the list
off `CASES` and `SUPPORTING`, nothing to register by hand.
