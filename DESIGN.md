---
name: "S·Fashion (SAP × VF Corporation)"
description: "Soft Studio: the agent-led store app where one piece travels from card to stylist sheet to Personalise board to bag"
colors:
  sage-900: "#2D4A3E"
  sage-700: "#3D6B5A"
  sage-500: "#7A9A8A"
  sage-300: "#A8C4B8"
  sage-100: "#D4E4DC"
  gold-500: "#C4AF7E"
  gold-700: "#7E6A3E"
  black: "#1A1A1A"
  canvas: "#F6F5F2"
  surface: "#FFFFFF"
  tile: "#EEECE7"
  backdrop-top: "#F8F7F4"
  backdrop-bottom: "#E9E6E0"
  stylist-surface: "#D4E4DC"
  primary: "#3D6B5A"
  on-primary: "#FFFFFF"
  accent-gold: "#7E6A3E"
  ink: "#1A1A1A"
  ink-muted: "#5B6B63"
  focus-ring: "#3D6B5A"
  success: "#2D7A4F"
  on-photo: "#FFFFFF"
  garment-sage: "#7A9A8A"
  garment-ecru: "#E7DFCB"
  garment-obsidian: "#2B2E2C"
  garment-stone: "#C9CCC7"
  garment-forest: "#2D4A3E"
  garment-soft-sage: "#A8C4B8"
  garment-sage-700: "#3D6B5A"
  thread-gold: "#C4AF7E"
  thread-ecru: "#E7DFCB"
  thread-forest: "#2D4A3E"
  thread-obsidian: "#1F2120"
  canvas-dark: "#121614"
  surface-dark: "#1A1F1C"
  tile-dark: "#1F2521"
  backdrop-top-dark: "#151A17"
  backdrop-bottom-dark: "#0F1311"
  stylist-surface-dark: "#232B27"
  primary-dark: "#A8C4B8"
  on-primary-dark: "#1A1A1A"
  accent-gold-dark: "#C4AF7E"
  ink-dark: "#EEF2F0"
  ink-muted-dark: "#A3B1AA"
  focus-ring-dark: "#A8C4B8"
  success-dark: "#6FC08F"
  apple-pay-light: "#000000"
  apple-pay-dark: "#FFFFFF"
typography:
  statement:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "28px"
    fontWeight: 300
    lineHeight: "38px"
    letterSpacing: "-0.01em"
  lead:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "20px"
    fontWeight: 300
    lineHeight: "28px"
  headline:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: "32px"
    letterSpacing: "-0.01em"
  title:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: "28px"
    letterSpacing: "-0.01em"
  sheet-title:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: "24px"
    letterSpacing: "-0.01em"
  body:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  message:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: "22px"
  button:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "20px"
  label:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "13px"
    fontWeight: 500
    lineHeight: "16px"
  meta:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  link:
    fontFamily: "\"72\", \"72full\", Poppins, Arial, Helvetica, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: "16px"
    letterSpacing: "0.08em"
  monogram:
    fontFamily: "\"Archivo Narrow\", \"Arial Narrow\", Arial, sans-serif"
    fontSize: "30px"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "0.14em"
rounded:
  image-sm: "4px"
  segment: "6px"
  control: "8px"
  message: "10px"
  sheet: "12px"
  pill: "999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  gutter: "20px"
  space-6: "24px"
  space-8: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 20px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 20px"
  button-quiet:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    height: "56px"
    padding: "0 20px"
  button-glass:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    height: "40px"
    padding: "0 16px"
  button-apple-pay:
    backgroundColor: "{colors.apple-pay-light}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.control}"
    height: "56px"
  button-apple-pay-dark:
    backgroundColor: "{colors.apple-pay-dark}"
    textColor: "{colors.apple-pay-light}"
    rounded: "{rounded.control}"
    height: "56px"
  chip-filter:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "38px"
    padding: "0 15px"
  chip-filter-selected:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "38px"
    padding: "0 15px"
  chip-suggestion:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "0 16px 0 13px"
  tag-pick:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    height: "26px"
    padding: "0 10px"
  size-option:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.pill}"
    height: "44px"
  size-option-selected:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    height: "44px"
  segment:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.control}"
    padding: "3px"
  segment-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.segment}"
    height: "44px"
  composer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.control}"
    height: "60px"
    padding: "0 7px 0 2px"
  input-monogram:
    textColor: "{colors.ink}"
    typography: "{typography.monogram}"
    height: "54px"
  stylist-message:
    backgroundColor: "{colors.stylist-surface}"
    textColor: "{colors.ink}"
    typography: "{typography.message}"
    rounded: "{rounded.message}"
    padding: "11px 14px"
  tab-bar:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.pill}"
    height: "68px"
  tab-active-pill:
    backgroundColor: "{colors.stylist-surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    width: "48px"
    height: "30px"
  stylist-fab:
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    size: "60px"
  bag-badge:
    backgroundColor: "{colors.gold-500}"
    textColor: "{colors.black}"
    rounded: "{rounded.pill}"
    height: "18px"
  toast:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.control}"
    padding: "6px 8px 6px 16px"
---

# Design System: S·Fashion (SAP × VF Corporation)

## Overview

**Creative North Star: "The Soft Studio Concierge"**

S·Fashion is the phone side of an unmanned, agent-led store: a quiet personal stylist, an embroidery desk and a vault key. The world is a sunlit fitting studio. Warm stone ground, white surfaces that float on sage-tinted shadow, sage for the stylist and the one main action, a splash of champagne gold for links, live signals and thin rules, and frosted glass only where it sits over imagery or scrolling content. Nothing is outlined.

The system's signature is that **the piece travels**. One garment is the hero of every surface, and it visibly moves (a shared-element View Transition named `piece`) from its card to the stylist sheet's stage to the Personalise board. Garment imagery is honest until photography arrives: each slot is a folded-garment drawing or cloth field in that garment's own colour, labelled as a placeholder, so the catalogue still reads by colour and shape. The Personalise board is a tech-pack sheet: front and back flats, placement pins, a stitch loupe at thread scale and a gold measurement leader.

Type plays airy Poppins Light (300, only at 20px and up) against grounded 700 headings, with Archivo Narrow kept for stitched monograms. Density is calm: one pick, one reason, one next step.

**Key Characteristics:**
- Zero-stroke surfaces: separation by tone, frosted glass and sage-tinted shadow, never a 1px outline.
- One sage-700 filled primary per screen; the platform Apple Pay button is the only other primary-weight button.
- Gold is a splash (D10): text links, live dots, the bag badge, thin rules. Never a button fill.
- Folded-garment placeholders in each garment's own colour, always labelled.
- The piece travels: a 520ms shared-element morph is the signature motion.
- 300 Light at 20px+ only, against 700 headings; Archivo Narrow for monograms.

## Colors

Warm architectural stone, five botanical sage steps, a champagne gold splash, and a set of garment and thread colours that belong to the products, not the chrome.

### Primary
- **Botanical Sage 700** (primary, light; Soft Sage 300 in dark): the single filled main button, the selected size, the "Your pick" tag, active tab icon, the active pin ring, the chosen spool ring, the FAB's sparkle mark, caret and focus ring.
- **Deep Forest Sage 900**: the tint of every shadow and scrim in light mode, and the full-bleed closing band at the foot of Home.

### Secondary
- **Stylist Sage 100** (stylist-surface): the stylist's voice only. Message bubbles, the avatar well, the mic well, the active tab pill, spec pills and the bag summary card.
- **Soft Sage 300**: primary in dark mode, toast icon, and the "Powered by" line on the deep sage band.

### Tertiary
- **Champagne Gold 500**: pulsing live dots in the pick sheet, the bag count badge, fit dots under sizes, the monogram field's 1px underline, the bag total rule, the FAB news dot, and "Explore look" on dark photos.
- **Deep Gold 700** (accent-gold, light; gold 500 in dark): gold text on light grounds: "Explore look", bag text links, leading icons in secondary buttons and suggestion chips, the spec dot, and the dashed pin-to-loupe measurement leader.

### Neutral
- **Warm Stone Canvas**: the app ground in light mode, and the text colour on ink-filled chips and toasts.
- **Studio White** (surface): cards, composer, tab bar, chips, size options, sheet buttons.
- **Warm Tile**: the ground under garment placeholders and the Personalise board.
- **Backdrop Top / Bottom**: the stone gradient that Home's photo veil and statement section fade into.
- **Charcoal Ink** and **Sage-Grey Muted Ink**: text and secondary text. Muted ink never sits on stylist-surface.

### Garment and thread colours
Product colours (Botanical Sage, Raw Ecru, Obsidian, Stone grey, Forest, Soft Sage, Sage 700) fill placeholders and swatches. Thread colours (Champagne gold, Raw ecru, Botanical forest, Obsidian) fill spools and the stitched monogram. They are content colours: never use them for chrome.

### Named Rules
**The One Sage Button Rule.** Every screen or open sheet has at most one sage-700 filled button. In the bag, the platform Apple Pay button (black in light, white in dark; PKPaymentButton on iOS) takes that place. No other non-sage button carries primary weight.

**The Gold Splash Rule.** Gold appears as text links, live dots, badges and thin rules (1px underline, total rule, dashed leader). It is never a button fill or a surface.

**The Stylist's Voice Rule.** Sage-100 belongs to the stylist and to selection wells. Ordinary cards are white.

## Typography

**Brand Font:** SAP 72 ("72", "72full") when licensed, Poppins stand-in (with Arial, Helvetica)
**Monogram Font:** Archivo Narrow (with Arial Narrow)

**Character:** Whisper-light 300 openings and statements set against crisp 700 headings; condensed Archivo Narrow appears only where a monogram is being stitched.

### Hierarchy
- **Statement** (300, 28/38px, -0.01em): Home's one-sentence visit statement, in full ink; it rises in line by line from behind per-line masks (1.3s, 200ms apart, brand ease) once it is well into view (top at ~60% of the screen).
- **Lead** (300, 20/28px): the stylist's welcome line; also 22px "Welcome to" and the 30px Curated picks lead.
- **Headline** (700, 26/32px; 28/34px on Shop slides): look titles, the closing band, Shop slide titles.
- **Title** (700, 22/28px): section heads ("Your stylist's picks", "In the store today") and the pick name.
- **Sheet Title** (700, 18/24px): bottom-sheet headers.
- **Body** (400, 16/24px): body text and every text input.
- **Message** (400, 15/22px, key phrase 600): stylist bubbles, max 34ch.
- **Button** (600, 16/20px): button labels.
- **Label** (500, 13/16px): chips, glass buttons, sort, check-in pill. Tab labels 500 12/14px, 600 when active.
- **Meta** (400, 12/16px): captions, helper text, counts. Nothing smaller than 12px.
- **Link** (700, 12/16px, +0.08em, uppercase, gold): "Explore look" only. This is a text link, not a heading label.
- **Monogram** (Archivo Narrow 700, 30px, +0.14em, uppercase): the monogram field; 38px (26px for 4–5 characters) inside the loupe, filled with a thread-twill gradient.

### Named Rules
**The 20px Floor for Light.** Weight 300 is used only at 20px and up. Anything smaller is 400 or 500.

**The 700 Heading Rule.** Headings are 700, never 600. 600 is for button labels, bold phrases and selected states.

**The 16px Input Rule.** Inputs are 16px so iOS never zooms. Placeholders may drop to 15px, and to 14px (-0.01em) in containers 375px wide or less, so the hint fits.

## Layout

A single phone column. 390 × 844 is the primary viewport, working down to 360 × 800 and up to 430 × 932, in light and dark. Every screen has 20px gutters. The spacing scale runs 4 / 8 / 12 / 16 / 20 / 24 / 32.

- **Chrome:** top bar 44px tall, 12px below the safe area, solid-S logo 16px tall on the left. It gains a frosted canvas backdrop once content scrolls under it. Floating tab bar 12px from each side and 14px above the bottom inset. Scrolling content clears tab bar plus FAB.
- **Home is a four-section scroll story** (Home.tsx; the brief's arrival → statement → stacked looks → closing band). (1) Arrival: the store photo full colour at the top, a veil that turns to stone by mid-screen (D12), sparkle, "Welcome to" with the 32px line-S logo, the lead line, a glass check-in pill, the full-width primary and the composer, all rising in sequence. (2) Statement: one sentence that rises in line by line from behind per-line masks, signed with the sparkle. (3) Looks: a 22px heading, then full-bleed 4:5 look panels stacked 4px apart, each with its title, items and gold "Explore look". (4) Closing band: deep sage-900 with a white headline and a surface button on dark, handing over to Shop, ending in a small "Powered by" credit.
- **Shop:** a 400px full-bleed slider (snap, pill dots, glass tag), then a 22px heading with a count, a sticky frosted chip rail, a helper row, and a 2-column grid (12px column gap, 22px row gap, 3:4 images).
- **Sheets:** bottom sheets up to the safe-top minus 10px, with a pinned foot that fades in from transparent over the sheet glass.

## Elevation & Depth

Depth comes from layering: stone ground, white surfaces, sage-tinted ambient shadow, and frosted glass. In light mode shadows are tinted with sage-900, never black. In dark mode the tint becomes black and the glass grows more opaque (72% and 90%).

### Shadow Vocabulary
- **Chip** (`0 8px 18px -10px` shadow tint @ 45%): chips, size options, glass buttons, sheet round buttons, list and bag cards, pin labels.
- **Soft** (`0 18px 40px -18px` shadow tint @ 50%): composer, the Personalise board, menus, toasts, the loupe.
- **Bar** (`0 18px 40px -14px` shadow tint @ 45%): the floating tab bar.
- **Primary** (`0 16px 30px -16px` primary @ 80%): the sage primary button and the selected size.
- **Sheet** (`0 -24px 60px -28px` shadow tint @ 60%): bottom sheets.

### Glass
- **Glass:** surface @ 62% (72% dark) with `blur(18px) saturate(1.2)`, used on glass buttons, tags, heart discs, the check-in pill, the thread panel over the board, and the FAB (surface @ 55%).
- **Sheet glass:** surface @ 84% (90% dark) with `blur(26px) saturate(1.15)`, used on sheets and menus.
- **Bars:** canvas or surface @ 92% with `blur(20–24px)`, used on the top bar, chip rail and tab bar.

### Named Rules
**The Zero-Stroke Rule.** No outline strokes on cards, inputs, chips or sheets (D8). Rings drawn with box-shadow are allowed only for state: the focus ring, the selected spool's ring, the active pin ring. Hairlines are allowed only inside a material: the swatch and spool edges, and the gold underline and rules.

**The Glass Over Something Rule.** Frosted glass sits only over imagery or scrolling content. On a flat ground, use solid surface.

## Shapes

Crisp corners (D9): 4px small media and wells (mic, send, thumbnails, menu items), 6px for segmented-control segments, 8px controls and cards (buttons, composer, board, cards, product images), 10px messages with a pointed 6px top-left corner toward the stylist, 12px sheet tops, and full pills for chips, tags, sizes, the tab bar, the FAB and round buttons. Round elements are reserved for the physical: pins, spools, the loupe, swatch dots, live dots.

## Components

### Buttons
Calm, full-weight, pressed with a small scale.
- **Shape:** 8px radius, 56px tall, 600 16/20 label, optional trailing arrow or leading icon.
- **Primary:** sage-700 fill with the primary shadow. Hover darkens 10% toward black. Press scales to 0.98 over 100ms. Disabled drops to 45% opacity with no shadow.
- **Secondary:** white surface with the chip shadow; its leading icon is accent-gold. **Quiet** is the same button on the stone ground, for use on white cards. **On dark** is a white surface with a black-tinted shadow, for the sage-900 band.
- **Glass (Curated picks):** 40px tall (44px tap area), glass, 500 13/16, text only.
- **Apple Pay:** the platform button, black with white text in light mode and white with black text in dark, 600 17/22 SF Pro. On iOS this is PKPaymentButton (.buy, .automatic). Never restyle it in sage.

### Chips
- **Filter (Shop):** 38px pill, white, chip shadow, 500 13/16, with a muted count. **Selected:** ink fill, canvas text, count at 72% canvas, no shadow; changes over 200ms; `aria-pressed`.
- **Suggestion (sheets):** 40px pill, white, chip shadow, with a gold leading icon.
- **Tags:** 26px pills on images: "Your pick" (primary with the sparkle) or glass ("New", "Curated for you · 1 of 3").

### Cards / Containers
- **Corner Style:** 8px.
- **Background:** white surface. The bag summary uses stylist-surface, with a 1px gold rule above the total.
- **Shadow Strategy:** chip shadow for list and bag cards; soft shadow for the board and composer.
- **Border:** none.
- **Internal Padding:** 12–16px.

### Product card
A 3:4 placeholder or photo (8px radius) with a tag top-left and a glass heart disc (34px inside a 44px tap area) top-right; the saved heart is primary and beats once. Below: name 500 13/18 (two-line clamp), colour swatch with name in muted meta, and price 600 13/18 ("€ —" until SAP data). The whole card is one tap target.

### Photo placeholder (PhotoSlot)
An honest stand-in, labelled with `role="img"` and "Photo placeholder: …". It comes in three kinds. *Garment:* a folded-garment drawing in the garment's own colour on the warm tile, lit from the top. *Fabric:* a full-bleed cloth field in the garment colour, with fine twill and window light, for model photos and hero slides. *Store:* the real store photo. A 12px caption with an image icon names what the photo will show. Pass a real `src` and an `<img>` takes the same frame and radius.

### Inputs / Fields
- **Composer (D11):** 60px, 8px radius, white, soft shadow. A plain + (no circle), a 16px text field, a 44px mic in a stylist-surface well, and a primary send button that pops in when there is text. Focus adds a 2px focus ring around the field, over its shadow.
- **Monogram field:** a bare 54px field in Archivo Narrow 700 30px, uppercase, sitting on a 1px gold underline. Focus turns the line into a 2px primary line. It shows a character count (n/5) and 12px helper text.
- **Segmented control (motif):** a 3px stone track (8px radius) holding three 44px segments. The chosen segment lifts to white with the chip shadow, 600 ink text and a primary icon. Use it for small mutually exclusive choices inside a card.
- **Size options:** 5-up 44px pills. Selected is primary with its shadow, unavailable is struck through and muted, and a 4px gold dot marks your fit.

### Navigation
- **Tab bar (D2):** 68px pill, surface @ 92% glass, bar shadow, five tabs (Home · Shop · My Visit · Wardrobe · More). Inactive tabs are muted. The active tab is ink 600 with its 22px icon in primary on a 48 × 30 stylist-surface pill. `aria-current="page"`.
- **Top bar:** solid-S logo and Curated picks glass button. Shop adds a bag button with an 18px gold count badge (black text, 2px canvas ring) that bumps on add.
- **Stylist FAB:** 60px circle, 18px from the right, 16px above the tab bar. The brand sparkle mark (30px, twinkling) in primary on neutral frosted glass (surface @ 55%), with an optional 14px gold news dot. It hides while you scroll down and returns on scroll up or 700ms after scrolling stops, popping in (520ms, slight overshoot). On Home it appears only once the composer has scrolled out of view.
- **Bottom sheet:** a sage-900 scrim @ 38% with a 2px blur, sheet glass, 12px top corners, a 38 × 5 grabber, a 700 18/24 title with a muted subtitle, and 44px round white buttons. Enter rises 60px over 420ms on the brand ease; exit is 220ms on the exit ease.

### Personalise board (signature)
A 392px tech-pack board on the warm tile (8px radius, soft shadow).
- **Flats:** a front and back flat drawing (GarmentFlat) in the garment colour. The main view sits left at full scale; the other side sits top-right at 0.38 scale and 70% opacity, labelled. Choosing Center back swaps the two over 560ms.
- **Pins:** 14px white dots in 44px tap areas. The active pin opens into a 40px primary ring around the live monogram, with a soft pulsing halo, and shows a white pill label ("Left chest · 28 mm").
- **Loupe:** a 92px circle of cloth (3px white ring, soft shadow) showing the monogram at thread scale in the chosen thread, with a "Stitch detail" caption.
- **Leader:** a dashed 1.25px gold-700 line, over a soft white halo, from the pin to the loupe. Its 4px end dot is gold-500.
- **Thread panel:** glass, overlapping the board's foot. 44px silk spools with a sheen band; the chosen spool gets a 2px surface gap and a 2px primary ring.

### Stylist message
A 32px sage-100 avatar with the primary sparkle beside a stylist-surface bubble (11px 14px padding, 6/10/10/10 corners), 400 15/22, key phrase 600.

### Toast
48px min height, ink fill, canvas text 500 14/20, sage-300 icon, gold-500 action text; rises 8px over 300ms. It sits above the tab bar.

### Motion: the piece travels
The garment media carries `view-transition-name: piece` on its card, the pick sheet stage and the Personalise board, and morphs between them over 520ms on the brand ease (iOS: matchedGeometryEffect). Other view-transition groups run at 350ms, and the root cross-fade at 240ms. Everything arriving uses `cubic-bezier(0.22, 1, 0.36, 1)`; everything leaving uses `cubic-bezier(0.4, 0, 1, 1)`. Movement is vertical and small (8–16px). Home's arrival rises in a 150–680ms stagger over 900ms. `prefers-reduced-motion` turns all of it off: no morph, no rise, and the statement simply shows.

## Do's and Don'ts

### Do:
- **Do** keep exactly one sage-700 filled button per screen or sheet; in the bag, let the platform Apple Pay button take that place.
- **Do** make every garment the hero by name with `view-transition-name: piece` when it moves between card, sheet stage and board.
- **Do** show product imagery as a labelled PhotoSlot in the garment's own colour until real photography arrives (D13).
- **Do** use gold only as text links (accent-gold on light, gold-500 on photos and dark), live dots, badges and 1px rules.
- **Do** select filter chips with an ink fill and canvas text, no shadow.
- **Do** keep inputs at 16px; drop only the placeholder to 15px (14px at 375px or less).
- **Do** use the solid-S logo at 16px in top bars and the line-S logo at 32px on the Home hero (D6).
- **Do** keep every interactive control at a 44 × 44px tap area, including hearts, pins, spools and segments.
- **Do** use ink, never muted ink, for text on stylist-surface.

### Don't:
- **Don't** add 1px outline borders to cards, inputs, chips or sheets.
- **Don't** fill a button with gold, or put gold on generic chrome surfaces.
- **Don't** use weight 300 below 20px, or 600 for headings.
- **Don't** add a VIP badge, location names or a top-right avatar (D7).
- **Don't** put a sage-filled or custom-styled button where Apple Pay belongs, or restyle the Apple Pay button.
- **Don't** use frosted glass on a flat ground with nothing behind it.
- **Don't** turn the stylist or More sheets into full-screen tabs (D3, D4).
