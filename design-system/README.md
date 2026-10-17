*A stylist in your pocket.* S•Fashion is a mobile-first shop with a personal stylist built in. Customers can **browse** the catalog or **ask** the stylist, then **review** every piece before they buy. The phone is the main canvas. Everything here is built for one thumb.

**Where this applies.** This design system covers three S•Fashion experiences:

| Experience | What it is | Status |
|---|---|---|
| **Mobile app** | The shopping app with the personal stylist. | Fully specified — chapters 01–11 and the components. |
| **Interactive table** | A large touch-screen display table in store. | Foundations apply; its own rules in chapter 12. |
| **Proto Luma hologram** | A life-size hologram produced on a Proto Luma display. | Foundations apply; its own rules in chapter 13. |

**Shared by all three:** colour, typography (72), logo, voice and motion personality. **Specific to each:** layout, sizes, components and how people interact. When a surface chapter says something different from the mobile rules, the surface chapter wins for that surface.

---

## 01 — Principles

| | |
|---|---|
| **Thumb first** | Core navigation and the main action stay in the bottom third of the screen. Tap targets are at least `touch-target` (44px). |
| **Browse or ask** | Shop and Stylist are equal entry points into one catalog. The stylist is always one tap away, never buried under a long feed. |
| **Explicit, then complete** | Size choice, subtotal and budget are always shown before an add. The customer approves; the stylist only suggests and prepares. |
| **Calm surfaces, one strong action** | Light, sage-tinted neutrals carry the screen. `primary` is saved for the one action that moves the journey forward. |

---

## 02 — Voice

Short. Warm. Confident. Write like a good stylist talks: one clear idea per line.

- **Headlines are short sentences in sentence case, ending with a full stop.** "The edit for you." · "A look that works harder." · "Looking good."
- **Subtitles add one quiet fact.** "3 pieces. One effortless edit." · "Tell me what you have in mind."
- **Buttons start with a verb and say what happens.** "Explore this look" · "Add 3 pieces to bag" · "Review demo order". Put the price in the button when it is one item: "Add to bag · $79".
- **Join facts with a middle dot ( · ).** "$297 total · $3 below budget" · "Sand · Relaxed fit".
- **Speak as "you" to the customer.** The stylist speaks as "I" only inside the chat.
- **Be honest about the demo.** Say "No payment was taken." Never imply a real order, delivery date or tracking that does not exist.
- No emoji. No exclamation marks. No all-caps sentences (caps are for `eyebrow` labels only).

---

## 03 — Color

**This chapter is the single source of truth for S•Fashion colour** — no other colour sheet applies. A balance of classic retail authority and soft, natural tones. **Sage** is the atmospheric highlight; **black** carries the reading; **gold** is a small warm splash for links and live details. Most of every screen is Background, Surface and Text — the sage scale adds calm, and colour is never decoration for its own sake.

### Brand swatches

| Name | Token | HEX | RGB | CMYK (starting point) | Pantone | Use |
|---|---|---|---|---|---|---|
| Sage 900 (darkest) | `sage-900` | #2D4A3E | 45 / 74 / 62 | C39 M0 Y16 K71 | — | Deep accents, dense backgrounds |
| Sage 700 (primary) | `sage-700` | #3D6B5A | 61 / 107 / 90 | C43 M0 Y16 K58 | **4208 C** | Primary (filled) and secondary (outlined) buttons, active states |
| Sage 500 (accent) | `sage-500` | #7A9A8A | 122 / 154 / 138 | C21 M0 Y10 K40 | **4208 C 45%** | Brand accent, highlights, tags |
| Sage 300 | `sage-300` | #A8C4B8 | 168 / 196 / 184 | C14 M0 Y6 K23 | — | Soft highlights, subtle tints |
| Sage 100 (lightest) | `sage-100` | #D4E4DC | 212 / 228 / 220 | C7 M0 Y4 K11 | — | Dividers, subtle backgrounds |
| Gold 500 (splash) | `gold-500` | #C4AF7E | 196 / 175 / 126 | C0 M11 Y36 K23 | — | Live dots, badges, thin rules, highlights on photos and dark grounds |
| Gold 700 (gold text) | `gold-700` | #7E6A3E | 126 / 106 / 62 | C0 M16 Y51 K51 | — | Text links and small labels on light grounds |
| Black | `black` | #1A1A1A | 26 / 26 / 26 | C0 M0 Y0 K90 | — | Body copy, metadata, labels |

### Functional colour roles

| Name | Token | HEX | RGB | CMYK (starting point) | Use |
|---|---|---|---|---|---|
| Primary — **fill** | `primary` | #3D6B5A | 61 / 107 / 90 | C43 M0 Y16 K58 | Sage 700 as a **filled** button with white text, selected states |
| Secondary — **outline** | `secondary` | #3D6B5A | 61 / 107 / 90 | C43 M0 Y16 K58 | The same Sage 700, used only as an **outline and label** (white inside); also totals |
| Accent | `accent` | #7A9A8A | 122 / 154 / 138 | C21 M0 Y10 K40 | Brand highlights, tags, illustration |
| Accent gold | `accent-gold` | #7E6A3E | 126 / 106 / 62 | C0 M16 Y51 K51 | Gold 700 for text links ("Explore look") and small highlights; Gold 500 in dark mode |
| Background | `canvas` | #F4F7F5 | 244 / 247 / 245 | C1 M0 Y1 K3 | Page backgrounds, subtle green tint |
| Surface | `surface` | #FFFFFF | 255 / 255 / 255 | C0 M0 Y0 K0 | Cards, modals, elevated surfaces |
| Text Primary | `ink` | #1A1A1A | 26 / 26 / 26 | C0 M0 Y0 K90 | Headings and body text |
| Text Secondary | `ink-muted` | #5B6B63 | 91 / 107 / 99 | C15 M0 Y7 K58 | Captions, metadata, muted text |
| Success | `success` | #2D7A4F | 45 / 122 / 79 | C63 M0 Y35 K52 | Confirmations, positive states |
| Warning | `warning` | #C4933D | 196 / 147 / 61 | C0 M25 Y69 K23 | Alerts, caution states |
| Error | `error` | #B84040 | 184 / 64 / 64 | C0 M65 Y65 K28 | Errors, destructive actions |
| Border | `border-subtle` | #D4E4DC | 212 / 228 / 220 | C7 M0 Y4 K11 | Dividers, input borders |

**Why Primary and Secondary share one colour.** It is deliberate: both are Sage 700. Primary is the *filled* button, Secondary the *outlined* one — they differ by weight, not by colour. This keeps the palette calm and makes the main action obvious.

### Print colours (Pantone)

For printed brand pieces, use these Pantone (PMS) spot colours. They win over the CMYK values whenever a Pantone ink is available.

| Brand colour | Screen (HEX) | Print (PMS) | Use in print |
|---|---|---|---|
| **Sage 700** (primary) | #3D6B5A | **PANTONE 4208 C** | Logo, main brand colour, solid areas |
| **Sage 500** (accent) | #7A9A8A | **PANTONE 4208 C at 45% tint** | Lighter brand areas, backgrounds, patterns |

- **Status:** locked for printing. Screen proof approved; the printer's physical proof is still to come. If it differs, this table is updated.
- **Coated paper only.** "C" means coated (gloss or silk). For uncoated paper and fabric, ask the printer for the matching uncoated (U) or textile (TCX) reference and add it here.
- **One ink, two tones.** The 45% tint is the same 4208 ink printed lighter, so the two greens always match. It sits slightly warmer and greyer than Sage 500 on screen — expected, and fine.
- Sage 900, Sage 300, Sage 100 and Black have no Pantone yet: use their CMYK values until they are matched.

**About the CMYK values.** They come from a straight conversion of the screen colour, so they are a *starting point*, not a press-ready recipe. Use them only where Pantone is not possible; convert with your printer's colour profile (e.g. Coated FOGRA39 or GRACoL) and print a proof.

**Rules**

- **Primary is Sage 700.** One filled `primary` button per screen, with a white label (6.1:1). The secondary button is the same green as an **outline**, so the two differ by weight, not colour.
- **Sage 500 is the accent**, not an action colour: tags, highlights, brand moments. It is too light for buttons (2.9:1 against Background) or for white text (3.1:1).
- **Gold is a splash, not a second brand colour.** One or two gold touches per screen: a text link, a live dot, a badge, a thin rule. On light grounds gold text is always `gold-700` (or `accent-gold`); `gold-500` is for dots, rules, badges with black text, and anything on photos or dark grounds. Never a button fill, never the main action.
- Body text is always `ink` (black) or `ink-muted`. Never set text in Sage 500, Sage 300, Sage 100 or Warning on light grounds — they are too light to read.
- Warning is a **fill** with black text, never text on its own. Success and Error can be text.
- Status is never colour alone: pair it with a word or glyph ("Size needed", ✓, ×). Success green and Error red are told apart by their labels as well as hue.
- `border-subtle` (Sage 100) is decoration. Fields and size options that must be found use `border-control`.
- Keyboard focus: a 2px solid `focus-ring` (Sage 700) with a 2px gap.

### Dark mode

Brand swatches stay the same; the functional roles switch. In dark mode the primary button turns light (Sage 300) with a black label.

| Token | Light | Dark |
|---|---|---|
| `canvas` | #F4F7F5 | #121614 |
| `surface` | #FFFFFF | #1A1F1C |
| `primary` (fill) | #3D6B5A (Sage 700) | #A8C4B8 (Sage 300) |
| `on-primary` | #FFFFFF | #1A1A1A |
| `secondary` (outline) | #3D6B5A (Sage 700) | #A8C4B8 (Sage 300) |
| `accent` | #7A9A8A (Sage 500) | #7A9A8A (Sage 500) |
| `accent-gold` | #7E6A3E (Gold 700) | #C4AF7E (Gold 500) |
| `ink` | #1A1A1A | #EEF2F0 |
| `ink-muted` | #5B6B63 | #A3B1AA |
| `user-message` | #A8C4B8 (Sage 300) | #2D4A3E (Sage 900) |
| `success` | #2D7A4F | #6FC08F |
| `warning` | #C4933D | #D9AE5F |
| `error` | #B84040 | #E88080 |

- Every text pair meets 4.5:1 in both themes.
- Product photography stays as shot.

---

## 04 — Typography

One family: **72**, SAP's brand typeface, in four weights. Each weight has a job:

| Weight | Use it for |
|---|---|
| **Bold (700)** | Headlines, card titles, product names, buttons, totals, eyebrow labels. |
| **Medium (500)** | Top bar titles, chips, sizes, prices in lists, text links. |
| **Regular (400)** | Reading text, chat messages, field input, fine print. |
| **Light (300)** | Large intro lines only, 20px and up. Never for small text. |

| Style | Weight | Size / line | Use |
|---|---|---|---|
| `display` | 72 Bold | 30 / 36 | Screen title. |
| `title` | 72 Bold | 26 / 32 | Screen title on dense screens. |
| `section` | 72 Bold | 22 / 28 | Section head. |
| `section-sm` | 72 Bold | 20 / 26 | Card title. |
| `app-bar` | 72 Medium | 18 / 24 | Top bar title. |
| `lead` | 72 Light | 20 / 28 | Airy intro line under a headline. |
| `body` | 72 Regular | 16 / 24 | Reading text, chat, field input. |
| `body-strong` | 72 Bold | 16 / 24 | Product names, buttons, totals. |
| `label` | 72 Medium | 14 / 20 | Chips, sizes, prices in lists. |
| `meta` | 72 Regular | 12 / 16 | Fine print. The floor. |
| `eyebrow` | 72 Bold, caps, +0.06em | 12 / 16 | Label above a card title. |

- Pair weights for contrast: a Bold headline over a Regular or Light line reads clearly. Avoid Bold next to Bold.
- Nothing is smaller than 12px. Light never goes below 20px. Layouts must survive 200% text size.
- One `display` or `title` per screen, top-left, under the top bar.
- **Font stack:** `"72", "72full", Arial, Helvetica, sans-serif`. Arial is the fallback while 72 is not installed.
- **Font files:** 72 is SAP's licensed typeface and is not bundled here yet. Add `72-Light`, `72-Regular`, `72-Medium` and `72-Bold` (.woff2) to this system's `fonts/` folder, or load them from your SAP source, under your SAP licence terms.

---

## 05 — Layout

- **Frame:** design at `canvas-width` (390 × 844). Check `canvas-narrow` (360 × 800) and `canvas-wide` (430 × 932). The layout is fluid; never scale the whole UI.
- **Gutters:** `gutter` (20px) left and right on every screen.
- **Rhythm:** 8px steps (`space-2`, `space-4`, `space-6`, `space-8`) with 4px refinements (`space-1`, `space-3`).
- **Product grid:** `grid-columns` (2) equal columns, `space-3` (12px) gap.
- **Radii:** crisp, not bubbly. Buttons, fields and cards `radius-control` (8px); message cards `radius-message` (10px); thumbnails, small tiles and list rows `radius-image-sm` (4px); tops of bottom sheets and overlay menus `radius-sheet` (12px); chips, size tags, small labels and the floating bottom tab bar `radius-pill` (round at both ends). Avatars and round icon buttons stay circles.
- **Borders, not shadows:** cards are `surface` with a 1px `border-subtle` outline. No drop shadows.
- **Fixed areas:** respect the device safe-area insets. The bottom nav has four destinations. On detail, outfit and bag screens a `StickyAction` replaces the nav.
- **Bigger screens:** at `tablet` widths use 2–3 columns; at `desktop` the stylist may sit to the right of the catalog. Same components, same states.

---

## 06 — Iconography

**Stylist mark: the sparkle.** A faceted gem with three small sparkles. It is the face of the personal stylist: wherever the stylist speaks or has chosen something, the sparkle can sit beside it.

| File | Use on |
|---|---|
| `S.Fashion_Sparkle_Sage700.svg` | Background, Surface, Sage 100 (the default). |
| `S.Fashion_Sparkle_White.svg` | Photography, Sage 700, Sage 900 and the dark theme. |
| `S.Fashion_Sparkle_Black.svg` | One-colour print. |

- Where it goes: above the welcome headline on Home (about 60px), in the "Your pick" and "Today's pick" tags (12–13px, in `on-primary` on a `primary` fill), and next to the stylist's intro lines.
- Motion (optional): the gem floats up and down by 8px over 4.8s and the three sparkles twinkle in turn. Turn it off for `prefers-reduced-motion`.
- Keep it one colour. Never put it inside a circle, add a gradient or use it as a button on its own.
- Minimum size 12px. Keep clear space of at least a quarter of its width.

**Interface icons.** Simple stroke icons on a 24px grid, 1.6px stroke, round caps and joins, single colour in `ink` (or `on-primary` on a `primary` fill). Always pair a nav icon with its word. Until a production icon set is approved, text glyphs stand in: ✳ Stylist · ▦ Shop · ♡ Saved · ○ You · ‹ Back · ↑ Send · × Remove · ✓ Success.

**Logo.** The S•Fashion mark: the "S", a middle dot, then the "Fashion" logotype. It is a **responsive logo**: two drawings of the same mark, chosen by size.

| Drawing | When to use it | Files |
|---|---|---|
| **Full logo — line S** (the circled triple-line "S") | Large sizes: **32px tall and up** on screen. Splash and welcome screens, hero headings, store signage, print. | `S.Fashion_Logo_Sage700.svg` · `S.Fashion_Logo_White.svg` · `S.Fashion_Logo_Black.svg` (1052 × 185, vector) |
| **Small logo — solid S** | Small sizes: **under 32px tall**, down to a minimum of **12px tall**. App top bars, navigation, emails, footers, small labels. | `S.Fashion_Logo_Small_Sage700.svg` · `S.Fashion_Logo_Small_White.svg` · `S.Fashion_Logo_Small_Black.svg` (2253 × 388, vector) |

Why: at small sizes the three thin lines of the "S" blur together, so the solid "S" keeps the mark crisp and readable. In print, use the same rule by eye: when the lines of the "S" start to merge, switch to the solid S.

| Colour version | Use on |
|---|---|
| **Primary** (dark on light) — Sage 700 | Background, Surface, Sage 100. |
| **Reverse** (light on dark) — white | Sage 700, Sage 900, black, photography and the dark theme. |
| **Monochrome** — black #1A1A1A | One-colour print and anywhere colour is not possible. |

- Always use the vector SVG files. Never use a screenshot or a picture of the logo saved as SVG; it blurs when scaled.
- Never recolour it to other colours, outline it, stretch it or add effects. Never mix the two drawings (for example a solid S with the line-S logotype).
- Keep clear space around it at least the height of the "S" mark.
- In the app top bar: the **small logo at 16px tall**. On the welcome screen: the **full logo at 32px tall**.
- Below 12px tall, set the type wordmark "S.Fashion" in `app-bar` instead.

*No production icon set was supplied.* Replace the glyphs with a real icon set when one is approved.

---

## 07 — Imagery

- Fashion photography on a light, natural ground; product cut-outs on white or warm neutrals.
- Product images use `radius-control` (large) or `radius-image-sm` (thumbnails), always cropped to fill.
- While loading, or if an image fails, show an `image-fallback` block — never a blank space or a broken icon.
- Use only approved catalog imagery.

---

## Using the components

The components live in `components/bundle.js` as `window.SFashion` and need React 18 on the page. Load `components/bundle.css` after the tokens. Each component's own guideline says what you must pass in (names, prices, images, handlers) — the system never invents product data.

---

## Consuming this system (generated — do not edit)

Every path named below is under `project/` in this design system: read `project/api/tokens.md`, not `api/tokens.md`.

`components/bundle.js` defines `window.SFashion` (15 components); `components/bundle.css` is its stylesheet; `tokens.css` is every token as a CSS variable plus `@font-face` for the fonts. `components/bundle.css` reads its variables from `tokens.css`. The bundle needs react 18 (not packed in this system: bring your own copy) (`window.React`), react-dom 18 (not packed in this system: bring your own copy) (`window.ReactDOM`), loaded before it. Build any UI by mounting these components; never hand-build a control or draw an icon the system provides.

- **Standalone page:** inline `tokens.css` and `components/bundle.css` in a `<style>`, then the library files and `components/bundle.js` as classic scripts (a file containing `</style`, `</script` or `<!--` breaks an inline element: write the sequence `<\/style`, `<\/script` or `\x3C!--` in your copy, or load that file by URL).
- **Design canvas:** bring `components/bundle.css`, `components/bundle.js` and `components/index.d.ts` (for the editor’s props panel) onto the canvas in full, as the canvas type’s design-system components reference says (a server-side copy first where it offers one); load the stylesheet before the script; skip the library files (the artboard supplies React); mount with `<x-import component-from-global-scope="SFashion.<Comp>" …>`.
- **Slides deck, or any surface that cannot run the bundle:** tokens only — the values are on `api/tokens.md`; the deck takes `tokens.json` by file path for its colour pickers.

**Read, per thing:** a component’s props, parts and examples: `api/components/<Comp>.md`; token values: `api/tokens.md`; stored assets and their paths: `api/assets/<Group>.md`. After this README, fetch the cards and fonts you need in ONE message as parallel calls — none depends on another.

**Two rules.** Before you use a thing — a component, a token group, an icon, an asset — read its card from the index below; a value you did not read from a card is a guess. `tokens.json`, `manifest.json`, `components/index.d.ts` and `design-system.json` are sources for tools: hand them over. `components/<Comp>/README.md` and `assets/<Group>/README.md` are the long-form second read a card links to; `SKILL.md` and `artifact-type/` beside them are authoring guidance, not needed to consume the system.

## Index (generated — do not edit)

**Tokens**

- `api/tokens.md` — Every token: surface, text, fill, border, palette, type, spacing, radius, size, layout. (8.5k)

**Icons and assets**

- `api/assets/Logos.md` — 1 file, by asset id. (1.1k)
- `api/assets/Other.md` — 4 files, by asset id. (0.9k)

**Components** (`api/components/<Comp>.md`, 16; 1 of them showcase pages)

- **Actions**: `Button` — The one action that moves the journey forward
- **Navigation**: `TopBar` — The top of every screen: brand or back, a title, and the bag · `StickyAction` — The purchase action pinned to the bottom of detail, outfit and bag screens · `BottomNav` — Four destinations: Shop, Stylist, Saved, You
- **Discovery**: `SearchField` — Search across fashion, brands and outfits · `FilterChip` — A toggle that narrows the feed · `EditorialTile` — A compact editorial story near the top of Discover · `ProductCard` — A product in the two-column grid, with a save heart
- **Stylist**: `StylistMessage` — A turn in the stylist conversation: the customer's request or the stylist's personal edit · `Composer` — The message field for refining a look
- **Outfit + bag**: `OutfitItem` — One piece of a suggested look, with its size and a Swap action · `SizeOption` — Choose a size on product detail · `BagItem` — A chosen variant in the shopping bag · `SummaryPanel` — A subtotal with one honest note under it
- **Feedback**: `Toast` — A short confirmation after adding to the bag
- **Showcase**: `ThemePreview` (showcase page) — A showcase page that shows two real S•Fashion screens, Discover and Stylist, with a switch for Light, Dark or Side by side
