# S·Fashion: agent-led store app (build handoff)

**Read this first.** This file has everything a build agent needs to turn the approved mockups into a working mobile app. It covers the concept, the decisions already made, the design rules, and a spec for every screen.

- **Client:** SAP × VF Corporation. S·Fashion is an unmanned, agent-led fashion store.
- **Surface:** mobile app, one thumb, phone first. Base frame **390 × 844**.
- **Stage:** design approved for build. Photos and prices are still placeholders.
- **Owner:** Hyun Lee (product designer). Please explain decisions in plain language; Hyun is not a developer.

---

## 0. What's in this package

| Path | What it is | How to use it |
|---|---|---|
| `HANDOFF.md` | This spec. | Source of truth for decisions and behaviour. |
| `guidelines/S-Fashion-Design-Guidelines-v2.html` | The team's brand and design guidelines (v2): colour with gold, type, corners, logos, sparkle, components, and the store app (chapter 15). Keep it next to its `screens/` folder. | The visual reference people read; open in a browser. |
| `mockups/index.html` | All 8 screens as live phones on one page. | Open in a browser (serve the folder, e.g. `npx serve mockups`). Tap through the flow. |
| `mockups/screens/*.html` | Each screen on its own, runnable. | Inspect exact CSS values, spacing, copy and interactions. |
| `mockups/screens/runtime.js` | Tiny template runtime used only by the mockups. | **Don't ship this.** Rebuild with real components. |
| `mockups-source/*.dc.html` | Original design-canvas source of each screen. | Same content as `screens/`, in the canvas format. Use when you need the raw template and logic. |
| `design-system/tokens.json` | S•Fashion design system tokens (colour, type, spacing, radius, size, motion). | Generate CSS variables / theme from this. |
| `design-system/README.md` | S•Fashion brand book (principles, voice, colour, type, layout, logo, imagery). | Read sections 01–07 before building. |
| `assets/logos/S.Fashion_Logo_*.svg` | **Full logo, line S** (1052 × 185 vector): Sage 700, Black, White. | 32px tall and up: Home hero (32px), splash, large headings. |
| `assets/logos/S.Fashion_Logo_Small_*.svg` | **Small logo, solid S** (2253 × 388 vector): Sage 700, Black, White. | Under 32px tall: app top bars (16px). |
| `assets/icons/S.Fashion_Sparkle_*.svg` | The stylist's sparkle mark (vector): Sage 700, Black, White. | Home hero (60px), "Your pick" / "Today's pick" tags, stylist intro lines. Rules in the design system README §06. |
| `assets/store-interior.jpg` | Store interior photo (portrait). | Home background. |

**Live links (owner's account):**
- Design canvas: https://claude.ai/artifact/PXM71EDrhR4Cw3WNhHob24
- All screens page: https://claude.ai/artifact/6oNQCPvUG9JFYGfmSUBtZb
- Design system: https://claude.ai/artifact/SJNGidT6xGtYkXeYw3gpZe
- Design guidelines (v2, for the team): https://claude.ai/artifact/SvjmxjT4j9bwrmg4QQRpGn

**Order of authority when things disagree:** (1) this file, (2) the mockups, (3) the design system. The mockups include decisions Hyun made after the design system was written; section 2 lists every known difference.

---

## 1. The concept in one minute

A customer scans a QR code at the door and the app opens on **Home**: their personal AI stylist greets them over a photo of the store. From there:

1. **Arrive** → Home welcomes them by name, confirms check-in, and offers one clear next step: *Show my curated pick*.
2. **Get a pick** → the stylist slides up as a **sheet** over the app with one piece chosen for a real occasion ("studio review on Thursday"), size pre-selected.
3. **Personalise** → choose monogram text, thread and placement on the garment.
4. **Made in store** → **My Visit** shows the piece being embroidered live on a Tajima machine.
5. **Collect** → **My Visit** switches to the vault: an unlock code for the compartment, plus the piece's Digital Product Passport.
6. Anytime → **Shop** to browse the whole store, **Curated picks** to see everything the stylist has chosen, **More** for profile and settings.

**Principles (from the design system, all still apply):** thumb first · browse or ask · explicit, then complete · calm surfaces, one strong action.

**Agent-led means:** the stylist is the front door (Home), suggests and prepares, and the customer always approves. The stylist is reachable everywhere: the composer on Home, the floating stylist button on other screens, and the sheet.

---

## 2. Decisions already made (do not reopen without Hyun)

| # | Decision | Notes |
|---|---|---|
| D1 | **Home = the arrival screen.** | Agent-led: the stylist greets you first. Shop is a separate tab. |
| D2 | **Bottom tab bar has 5 tabs:** Home · Shop · My Visit · Wardrobe · More. | Differs from the design system's "four destinations". The mockups win. |
| D3 | **Stylist is not a tab.** It opens as a **bottom sheet** over the current screen. | Opened from Home's main button or composer, the floating stylist button, or the cards. |
| D4 | **More opens as an overlay menu** (a sheet), not a full page. | |
| D5 | **"Curated picks" button sits top-right on every main screen** (Home, Shop, My Visit). It opens the Curated picks page. | Quiet **frosted-glass** style, text only, no icon. Only one green (primary) button per screen. |
| D6 | **Responsive logo:** solid-S logo under 32px tall (top bars, at 16px); line-S logo at 32px and up (Home hero, at 32px). Both are in `assets/logos/` as vectors; use Sage 700 or Black on light grounds, White on photos and dark. | In the design system README §06. |
| D7 | **No** "Walldorf" or location names in copy, **no** VIP badge, **no** top-right avatar. Profile lives in More. | |
| D8 | **"Soft Studio" look:** warm stone background, sage palette, frosted glass, soft shadows, **no outline strokes**. | Differs from the design system's "borders, not shadows". The mockups win. |
| D9 | **Corners are crisp:** 8px controls/cards, 10px messages, 4px small items, 12px sheet tops, round pills for chips and the tab bar. | Already in the design system. |
| D10 | **Gold is a splash:** text links ("Explore look"), live dots, badges, thin rules. Never a button fill. | Already in the design system (`gold-500`, `gold-700`, `accent-gold`). |
| D11 | **Composer layout:** plain **+** on the left (photo / camera / image search), text field in the middle, **microphone** on the right. | The + has no circle behind it. |
| D12 | **Home background:** real store photo, full colour at the top, fading to warm stone towards the bottom so text is readable. | Hyun rejected a frosted-card version; keep the fade. |
| D13 | Product imagery is **placeholder blocks** until real photos arrive. | Keep `image-fallback`-style blocks, labelled. |

**Known differences from the design system, intentional:** D2, D8, the warm stone canvas (`#F6F5F2` vs `canvas #F4F7F5`), and Poppins as the stand-in font while SAP's licensed **72** isn't available.

---

## 3. Information architecture and navigation

```
QR scan ──▶ 01 Home (stylist welcome)                     [tab: Home]
             ├─ "Show my curated pick" ─▶ 01b Stylist sheet (pick)
             │                              └─ "Personalise" ─▶ 02 Stylist sheet (personalise)
             │                                                   └─ confirm ─▶ 03 My Visit · being stitched
             ├─ "Curated picks" (top right) ─▶ 07 Curated picks
             └─ composer (type / + / mic) ─▶ stylist sheet

06 Shop        [tab: Shop]       slider of picks + full catalogue with filters
03/04 My Visit [tab: My Visit]   today's visit: stitching ➜ ready in the vault
Wardrobe       [tab: Wardrobe]   NOT DESIGNED YET (see §9)
05 More        [tab: More]       opens as an overlay menu over the current screen
```

| Tab | Destination | Icon (24px stroke) |
|---|---|---|
| Home | 01 Home | house |
| Shop | 06 Shop | shopping bag |
| My Visit | 03 (while stitching) / 04 (when ready) | storefront |
| Wardrobe | not built: show a simple "coming soon" placeholder | clothes hanger |
| More | 05 More overlay | three dots |

- **Curated picks (07)** has no tab of its own. It has a back arrow, and the tab bar shows no active tab.
- **My Visit vs Wardrobe:** My Visit = *today's* visit (temporary: the order being made, collection, unlock). Wardrobe = pieces you *own* over time, each with its Digital Product Passport.

---

## 4. Design tokens

Use tokens, never raw values. The full set (with usage notes and contrast ratios) is in `design-system/tokens.json`. The values below are what the mockups use.

### 4.1 Colour

| Token | Light | Dark | Use |
|---|---|---|---|
| `sage-900` | #2D4A3E | same | deep accents, shadow tint |
| `sage-700` | #3D6B5A | same | **primary** fill, focus ring |
| `sage-500` | #7A9A8A | same | accent fills, tags (never text/buttons) |
| `sage-300` | #A8C4B8 | same | soft tints, primary in dark |
| `sage-100` | #D4E4DC | same | `stylist-surface`, active tab pill |
| `gold-500` | #C4AF7E | same | live dots, badges, thin rules, on-photo links |
| `gold-700` | #7E6A3E | — | gold text on light grounds |
| `accent-gold` | {gold-700} | {gold-500} | text links ("Explore look") |
| `canvas` (app) | **#F6F5F2** warm stone | #121614 | page background |
| backdrop gradient | #F8F7F4 → #E9E6E0 | — | Home / screen background, top to bottom |
| `surface` | #FFFFFF | #1A1F1C | cards, tab bar, field |
| `primary` / `on-primary` | sage-700 / #FFFFFF | sage-300 / #1A1A1A | the one main button |
| `stylist-surface` | sage-100 | #232B27 | stylist messages, icon buttons, active tab |
| `ink` | #1A1A1A | #EEF2F0 | text |
| `ink-muted` | #5B6B63 | #A3B1AA | secondary text (not on `stylist-surface`) |
| `success` | #2D7A4F | #6FC08F | confirmations |
| glass | surface @ 58–62% + `backdrop-filter: blur(18px) saturate(1.2)` | surface @ 70% | frosted buttons, pills, tags |
| sheet glass | surface @ 82% + `blur(26px) saturate(1.15)` | — | bottom sheets |

**Product colour names used in the catalogue** (placeholder swatches): Botanical Sage `sage-500`, Raw Ecru #E7DFCB, Obsidian #2B2E2C, Stone grey #C9CCC7, Forest `sage-900`, Soft Sage `sage-300`.
**Thread colours (Personalise):** Champagne gold #C4AF7E · Raw ecru #E7DFCB · Botanical forest #2D4A3E · Obsidian #1F2120.

### 4.2 Typography

- **Family:** `"72", "72full", "Poppins", Arial, Helvetica, sans-serif`. Use SAP **72** when licensed files are available; **Poppins** (Google Fonts, 300/400/500/600) is the stand-in.
- **Monogram font:** `"Archivo Narrow", "Arial Narrow", Arial, sans-serif` (600).
- Use the design-system type styles (`display`, `title`, `section`, `section-sm`, `app-bar`, `lead`, `body`, `body-strong`, `label`, `meta`, `eyebrow`). Values are in `tokens.json`.
- **Floor:** nothing under 12px.

**Fix while building (from the design critique; the mockups break these, the build should not):**
1. Light (300) only at 20px and up. In the mockups the Home stylist line (18px), the Shop slide subtitle (16px) and the thread caption (15px) use 300; use 400 instead, or raise to 20px.
2. Headings use **700** (`display`/`section` etc.). The mockups use 600.
3. Eyebrows follow the system: 700, 12/16, +0.06em, uppercase, `ink-label` (sage-700). The mockups use 500 / 0.14em / grey.

### 4.3 Spacing, radius, size, elevation

| Group | Tokens |
|---|---|
| Spacing | `space-1` 4 · `space-2` 8 · `space-3` 12 · `space-4` 16 · `gutter` 20 · `space-6` 24 · `space-8` 32 |
| Radius | `radius-image-sm` 4 · `radius-control` 8 · `radius-message` 10 · `radius-sheet` 12 · `radius-pill` 999 |
| Size | `touch-target` 44 (minimum tap area) · `button-height` 52–56 · `chip-height` 32–40 |
| Elevation (app) | `shadow-chip`: 0 8px 18px −10px sage-900 @ 45% · `shadow-soft`: 0 18px 40px −18px sage-900 @ 50% · tab bar: 0 18px 40px −14px sage-900 @ 45% |

- **Gutters:** 20px left/right on every screen.
- **Safe areas:** respect device insets. The floating tab bar sits 14px above the bottom inset.

### 4.4 Motion

| Token | Value | Use |
|---|---|---|
| `duration-instant` | 100ms | press feedback |
| `duration-quick` | 200ms | chips, toggles, heart, tab highlight |
| `duration-standard` | 300ms | sheets, toasts, swaps, pin labels |
| `duration-screen` | 350ms | push / back |
| `duration-editorial` | 900ms | entrance "rise" of hero content |
| `ease-brand` | cubic-bezier(0.22, 1, 0.36, 1) | everything arriving |
| `ease-exit` | cubic-bezier(0.4, 0, 1, 1) | things leaving |

All motion is vertical and small (8–16px). Honour `prefers-reduced-motion`: turn every animation off.

---

## 5. Shared components

Use the design-system React bundle (`window.SFashion`) where a component matches (Button, FilterChip, ProductCard, StylistMessage, Composer, SizeOption, Toast). Restyle it to the "Soft Studio" look (D8) rather than building look-alikes. New components the app needs are specced here.

### 5.1 Top bar
- Height 44px, 12px from top (below the safe area). Left: **solid-S logo, 16px tall** (93 × 16), `ink`. Right: **Curated picks** button.
- On Shop the top bar also has a **bag** button with a count badge.

### 5.2 Curated picks button (D5)
- 40px tall, padding 0 16px, `radius-control`, **frosted glass**, text `ink`, 500 13/16, `shadow-chip`. Text only.
- Tap → 07 Curated picks. Present on Home, Shop and My Visit.

### 5.3 Floating tab bar (D2)
- Position: 12px from left/right, 14px above bottom, height 68px, `surface`, **`radius-pill`** (round at both ends), tab bar shadow.
- 5 equal columns. Each tab: 58px tall, icon 22px in a 48 × 30 pill, label 500 12/14.
- **Inactive:** `ink-muted`. **Active:** label `ink` 600; icon pill `stylist-surface` with icon in `primary`. Highlight change `duration-quick`.
- `aria-current="page"` on the active tab.

### 5.4 Floating stylist button (FAB)
- 60px circle, 18px from right, 98px from bottom (above the tab bar). Sage sphere gradient (surface → sage-100 → sage-300 → sage-500 → sage-700), soft sage glow, gentle 4.8s "breathe" scale (1 → 1.05).
- Optional gold notification dot (14px, `gold-500`, 3px surface ring) when the stylist has news.
- Tap → opens the stylist sheet. Shown on Shop, My Visit and Curated picks. Not on Home (Home has the composer).
- Open idea: swap the sphere for the sparkle icon. Ask Hyun.

### 5.5 Primary button
- Full width, 56px, `radius-control`, `primary` fill, `on-primary` 600 16/20, optional trailing arrow icon, soft primary-tinted shadow. Press: scale 0.98 (`duration-quick`).
- **Exactly one per screen.**

### 5.6 Secondary button (white)
- Same size; `surface` fill, `ink` text, optional leading icon (gold-tinted). Used for "Personalise", "Unlock vault door".

### 5.7 Composer (D11)
- 60px tall, `radius-control`, `surface`, `shadow-soft`, inner padding 0 6px, gap 4px.
- Left: **plus** button, 46px tap area, no background, 24px "+" icon `ink`, label "Add a photo or search by image".
- Middle: text input, 400 16/24, placeholder in `ink-muted` (Home: "Or tell me what you need today…", sheets: "Ask why, or for something else…").
- Right: **microphone** button, 46px, `stylist-surface`, `radius-image-sm`, label "Speak to your stylist". In sheets, a **send** button (arrow up, `primary`) follows the mic when there is text.
- Focus: 2px `focus-ring` around the field plus its shadow.

### 5.8 Chips and filter chips
- Suggestion chip (sheets): 40px, `radius-pill`, `surface`, `shadow-chip`, icon + 500 13/16.
- Filter chip (Shop): 38px pill, `surface`, `shadow-chip`, 500 13/16. Selected = `ink` fill with `canvas`-coloured text, no shadow (`duration-quick`). `aria-pressed`. (The design system suggests `user-message` sage-300 for the selected chip; the mockup's ink fill is the approved look.)

### 5.9 Stylist message
- Avatar: 32px sage sphere. Bubble: `stylist-surface`, padding 11px 14px, radius `6px radius-message radius-message radius-message` (pointed top-left), 400 15/22, key phrase in **bold**.

### 5.10 Bottom sheet (stylist and More)
- Slides up over a dimmed app (scrim: sage-900 @ ~38%). Top corners `radius-sheet`, sheet glass, a 38 × 5 grab handle, a header (title + subtitle), and a 44px round close button.
- Enter: translateY(60px) → 0 with fade, `duration-standard` to 700ms, `ease-brand`. Exit: `ease-exit`.
- Swipe down or tap the scrim to close.

### 5.11 Image placeholder (D13)
- Soft sage block (`sage-100` mixed with surface), fine 135° hairlines every 14px (sage-700 @ 7%), a 28px photo icon and a 12px label ("Product photo", "Model photo · …"). `role="img"` with `aria-label="Photo placeholder: …"`.
- Swap for real `<img>` with `object-fit: cover`, same radius, `image-fallback` while loading.

### 5.12 Product card (Shop grid)
- 2 columns, 12px column gap, 20px row gap. Image 3:4, `radius-control`.
- Overlays: top-left tag ("Your pick" in `primary` with the sparkle, or "New" in glass), top-right heart (glass circle, toggles saved).
- Below: name 500, colour name `ink-muted`, price (currently "€ —").
- **Fix:** the heart is 36px in the mockup; make its tap area 44px.

---

## 6. Screens

Exact CSS for each screen is in `mockups/screens/<Name>.html`. Copy and data below are the real mockup content; product names and prices are placeholders.

### 01 · Home (arrival) · `Main.html`
**Job:** greet the customer, confirm check-in, give one next step.
- **Background:** store photo full-bleed, `object-position: 50% 28%`, slow Ken Burns zoom (1 → 1.06, 24s, alternate). Veil: soft at the top, clear 12–30%, then fades to warm stone (82% at 42%, solid by 50%) down to the bottom.
- **Top bar:** small logo + Curated picks (glass).
- **Hero block (bottom-aligned above the footer, centred):**
  - Sparkle icon, 60px, `primary`. The gem floats ±8px over 4.8s; the three small sparkles twinkle (scale 0.55, staggered 0.9s).
  - "Welcome to" (300 22/28 `ink-muted`), then the **line-S logo** at 32px tall (182 × 32), `ink`.
  - "I'm your personal stylist today." centred, max-width 300px, `ink`. Use 400 weight or 20px (see §4.2).
  - Check-in pill (glass, 36px, `shadow-chip`): green tick circle + "You're checked in · 14:02" (real check-in time).
- **Footer (padding 0 20px, clears the tab bar):** primary button **"Show my curated pick" →** opens 01b; then the composer.
- **Tab bar:** Home active. **No FAB.**
- **Entrance:** sparkle, title, line, pill and footer rise in sequence (16px, 900ms, delays 0 / 150 / 320 / 500 / 680ms).

### 01b · Stylist sheet: curated pick · `Pick.html`
**Job:** present one piece, why it suits the customer, and let them reserve.
- Dimmed app behind; sheet header "Your stylist" / "With you now"; close → back to where it was opened.
- **Stage (330px):** product photo placeholder (inset 20px, 262px tall, `radius-control`) + 3 carousel dots (more angles).
- **Message:** "You have a **studio review on Thursday**. This is the one piece I'd choose for it."
- **Garment card:** title "Relaxed Studio Overshirt" (words reveal upward, staggered 80ms); meta "Botanical Sage · Soft cotton · Your size is M"; size pills S / M / L / XL (M pre-selected from the fit profile; single select; `aria-pressed`); buttons **"Reserve size {size}"** (primary, label follows the chosen size) and **"Personalise"** (white, → 02).
- **Suggestion chips:** "Show another option" · "View on the 55″ table" (sends the look to the in-store tabletop display).
- **Composer:** "Ask why, or for something else…".

### 02 · Stylist sheet: personalise · `Atelier.html`
**Job:** design the embroidery and see it live on the garment.
- Header "Personalise" / "Relaxed Studio Overshirt · M".
- **Stage (422px):** close-up photo placeholder of the overshirt, with the **live monogram** drawn on top (thread sheen + stitch-line texture, slight raised shadow) at the chosen spot.
- **Placement pins** (44px tap targets with a 14px dot; the active one is `primary` with a pulsing halo; a label appears on hover/active): Sleeve (18 mm, rotated −80°) · Center back (22 mm) · Left chest (28 mm, default). A dotted guide joins them.
- **Thread card (glass, floating at 270px):** "Thread · **Champagne gold**" + 4 spool tiles (Champagne gold default · Raw ecru · Botanical forest · Obsidian). The selected tile shows a tick.
- **Message:** "Your initials, tone on tone. They catch the light only when you move."
- **Co-creation card:** "Monogram" input (uppercase, max 5 characters, default "H·L"; updates live), spec tag (e.g. "Left chest · 28 mm"), motif buttons: Monogram · Botanical sprig · Line.
- Button **"Pair with Tabletop 55″"** (preview on the store table). Then composer.
- **Missing, to build:** a clear confirm step ("Add personalisation · {price}"), then go to 03.

### 03 · My Visit: being stitched · `Tajima.html`
**Job:** show the order being made, live.
- **Hero:** live embroidery view (currently an illustration of the hoop and needle; will be a live camera feed or a photo placeholder). Overlays: "Live · Tajima cell" with a pulsing gold dot; "2m 45s left"; "Needle 03 active"; "Madeira silk filament · 15-needle head"; a progress ring at **62%**.
- Top bar with Curated picks (glass).
- **Sheet (frosted, overlapping the hero by 36px):** "My visit" · "Today" · summary pill "Paid with Apple Pay" · line "Overshirt · H·L".
- **Message:** "On the hoop now. I'll press, fold and stage it in the vault the moment it's done."
- **Steps:** 01 Hooped ✓ · 02 Stitching (active) · 03 Press · 04 Vault.
- Tab bar (My Visit active) + FAB.
- **Live data:** time left, progress %, active needle and step must update in real time.

### 04 · My Visit: ready in the vault · `Vault.html`
**Job:** let the customer collect the piece and keep its passport.
- **Hero:** the vault wall with compartments (03 · 05 · **04** highlighted) and the customer's compartment card: "Your compartment #04", Size M, Monogram H·L; an unlock code (QR, with a scanning line) valid **15 min**.
- Primary/white button **"Unlock vault door"**. Tap toggles the door open (button turns to a done state; compartment opens). `aria-pressed`.
- Status: "Ready · door 04 is on your left".
- **Digital Product Passport card:** "Archived today · permanent record" + **View**; rows: Yarn provenance "[MILL · REGION]" · **Traced**; Craftsmanship "Tajima cell · Needle 03 · Madeira silk" · 14:31.
- Tab bar (My Visit active) + FAB with a gold dot.

### 05 · More (overlay menu) · `More.html`
- Sheet over the blurred, dimmed app; title "More"; close button.
- Profile row: avatar "HL", "Hyun Lee", "Member", chevron.
- **What your stylist knows:** Fit profile "Size M · relaxed fit" · Style preferences "Sage tones · quiet details" · Occasions "Studio review · Thursday".
- **In the store:** Store pass "Show at the entrance gate" · Connected devices "Tabletop 55″ · Hologram".
- Store location & hours · Privacy & terms.
- Footer: "POWERED BY **SAP**" · Sign out.
- Rows: 54px min height, 36px round icon on `stylist-surface`, chevron, row hover tint, `radius-image-sm`.

### 06 · Shop · `Shop.html`
**Job:** browse the whole store; picks first, then the catalogue.
- **Top bar:** logo, bag (count badge), Curated picks (glass).
- **Curated slider** (horizontal, snap per slide, dots): **reduce height from 540px to about 420px** so products show above the fold (critique).
  1. "CURATED FOR YOU · 1 OF 3": Relaxed Studio Overshirt, "Botanical Sage · for Thursday's review", **EXPLORE LOOK** (gold link) → 01b.
  2. "SEEN ON THE HOLOGRAM · 2 OF 3": store photo zoomed on the hologram, Hooded Shell Jacket, "Stone grey · new in store", white text on a dark fade.
  3. "PAIRS WITH YOUR PICK · 3 OF 3": Everyday Heavy Tee, "Raw Ecru · under the overshirt".
- **Catalogue section:** title "In the store today", count "8 pieces"; filter chips **All · Shirts · Outerwear · Tees · Trousers** (filter the grid live; the count updates); helper row "Size M · in stock" and "Recommended" sort.
- **Grid:** 8 product cards (see §5.12). The heart toggles saved (the overshirt is saved by default).
- Tab bar (Shop active) + FAB.

### 07 · Curated picks · `Picks.html`
**Job:** everything the stylist has chosen, and why.
- Sticky header: back arrow (→ previous screen) + "Curated picks".
- Intro with sparkle: "Chosen for you, **Hyun**." / "Every piece your stylist picked, and why."
- **For today (1 piece):** large card with the "Today's pick" tag, image, "Relaxed Studio Overshirt", "Botanical Sage · Size M · In store now", a reason box with a calendar icon ("For your studio review on Thursday: soft structure that looks sharp on camera."), buttons **"Reserve size M"** (primary → 01b) and **"Personalise"** (→ 02).
- **Goes with it (3 pieces):** horizontal rail of 156px cards: tee "Raw Ecru · wear it underneath", trouser "Obsidian · balances the volume", jacket "Stone grey · for rainy days".
- **Earlier picks (from past visits):** 2-column grid with "Last visit" / "Earlier" glass tags.
- Tab bar (no active tab) + FAB.

---

## 7. States, data and edge cases

| Area | Requirement |
|---|---|
| Check-in | The time comes from the gate scan. If check-in fails, Home shows the pass and a retry, not the welcome. |
| Customer name | "Hyun" and "Hyun Lee" are placeholders. Show the first name in greetings. If unknown, "Chosen for you." |
| Stylist reasons | Every pick shows *why* (occasion, fit, pairing). The stylist never claims an order or payment that didn't happen (design system voice §02). |
| Prices | Currently "€ —". Show the real price; for one item put it in the button ("Reserve size M · €89"). |
| Size | Pre-select from the fit profile. If out of stock: show the pill disabled with "Out of stock" text, not colour alone. |
| Images | Loading → `image-fallback` block. Error → same block with a label. Never a broken icon. |
| Empty Curated picks | "Your stylist hasn't picked anything yet." + "Ask your stylist" button. |
| Empty Shop filter | "Nothing in {category} in size M right now." + "Show all sizes". |
| Monogram input | Uppercase, max 5 characters, letters, digits and "·". Empty → preview shows nothing; the confirm button is disabled. |
| Stitching | Live updates (polling or push). If the machine pauses: show "Paused · we're on it" with the gold dot steady, not pulsing. |
| Vault code | Expires in 15 min; show a countdown; "Refresh code" when expired. |
| Long text | Product names wrap to 2 lines, then ellipsis. Labels never truncate mid-word. Test at 200% text size. |
| Narrow / wide | Validate at 360 × 800 and 430 × 932. Layout is fluid; never scale the whole UI. |
| Dark mode | Every screen has a dark variant via tokens (each mockup has a `dark` switch); check contrast in both. |

---

## 8. Accessibility (WCAG 2.1 AA)

- Text 4.5:1 (3:1 at 24px+). Watch for `ink-muted` on `stylist-surface` (4.3:1): use `ink` there.
- Touch targets ≥ 44px (fix the Shop heart).
- Real `<button>` / `<a>` elements; icon-only buttons need `aria-label` (plus, mic, send, close, heart, pins, threads).
- Toggles use `aria-pressed` (sizes, filters, threads, pins, motifs, heart, vault door). Active tab uses `aria-current="page"`.
- Sheets are dialogs: move focus into the sheet on open, trap focus, return it on close; Escape closes.
- Live regions: stitching progress and the vault status use `aria-live="polite"`.
- Decorative art (sparkle, sphere, hero illustrations) is `aria-hidden`. Placeholders use `role="img"` with a label.
- Focus ring: 2px solid `focus-ring`, 2px offset.
- `prefers-reduced-motion`: no Ken Burns, no float, twinkle, breathe or rise.

---

## 9. Open items and backlog

1. **Wardrobe screen:** not designed. Owned pieces with their passports. Show "coming soon" until designed.
2. **Real photography:** replace every placeholder (model shots, product shots, close-up for Personalise). Portrait, light neutral backgrounds.
3. **Real prices and stock** from SAP commerce data.
4. **Personalise confirm step** and its price.
5. **My Visit heroes:** the Tajima and vault illustrations should become a live feed or photos.
6. **Typography alignment** with the design system (§4.2 fixes).
7. **Stylist FAB:** keep the sphere or switch to the sparkle icon (ask Hyun).
8. **The S•Fashion design system HTML export** is maintained separately; keep it in sync when tokens change.

---

## 10. Build notes

- **Stack is open.** Pick what fits SAP's environment; the design system ships a React 18 bundle, so React is the path of least resistance. Generate CSS variables from `tokens.json` (light + dark).
- Build the shared components first (§5), then screens in journey order: 01 → 01b → 02 → 03 → 04 → 06 → 07 → 05.
- Keep copy exactly as written in §6 unless Hyun changes it. Voice rules: short, warm, sentence case, a middle dot (·) between facts, no emoji, no exclamation marks.
- The mockups' `runtime.js` and `.dc.html` template syntax (`{{holes}}`, `<sc-for>`, `<sc-if>`) are a prototyping format only. Read them for values and behaviour; don't port them.
- When something isn't specified, follow the design system README, then ask Hyun. Don't invent product data.
