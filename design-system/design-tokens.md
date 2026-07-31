# O11 by VF — Design Tokens

This is the single source of truth for all visual values in the O11 by VF Concept Store project. Every value used in any HTML, CSS, or visual spec must trace back to a token defined here.

---

## How to Use These Tokens

In CSS, declare all tokens in a `:root {}` block at the top of every file:

```css
:root {
  --color-bg-base: #141412;
  --color-brand-sage: #838572;
  /* ... all tokens ... */
}
```

Always reference tokens by name — never use raw values:

```css
/* CORRECT */
background-color: var(--color-bg-base);
color: var(--color-text-primary);

/* WRONG — never do this */
background-color: #141412;
color: #F0EDE5;
```

---

## 1. Color Tokens

### 1.1 Brand Colors

| Token | Value | Description |
|---|---|---|
| `--color-brand-sage` | `#838572` | Hero brand color — the dominant sage/khaki used on kiosk panels, vault units, and brand surfaces |
| `--color-brand-sage-light` | `#9A9B87` | Lighter sage — hover states, secondary brand surfaces |
| `--color-brand-sage-dark` | `#676858` | Darker sage — pressed states, borders on sage backgrounds |

### 1.2 Background Colors

| Token | Value | Description |
|---|---|---|
| `--color-bg-base` | `#141412` | App base background — near-black with warm undertone |
| `--color-bg-surface` | `#1E1E1B` | Cards, sheets, nav bars — one layer above base |
| `--color-bg-elevated` | `#2A2A26` | Modals, drawers, tooltips — second layer above base |
| `--color-bg-sage` | `#838572` | Sage-colored surface — used for brand panels, feature highlights |
| `--color-bg-overlay` | `rgba(0,0,0,0.6)` | Modal/sheet backdrop scrim |

### 1.3 Accent Colors

| Token | Value | Description |
|---|---|---|
| `--color-accent-gold` | `#C4AF7E` | Warm brass/gold — CTAs, premium badges, O11 logo moments |
| `--color-accent-gold-dim` | `#9E8C5E` | Muted gold — secondary states, borders on premium elements, disabled gold |
| `--color-accent-gold-subtle` | `rgba(196,175,126,0.12)` | Gold tint background — premium card backgrounds, subtle highlights |
| `--color-premium` | `#C4AF7E` | Alias of `--color-accent-gold` — used exclusively for Premium member tier indicators |

### 1.4 Text Colors

| Token | Value | Description |
|---|---|---|
| `--color-text-primary` | `#F0EDE5` | Primary text — warm off-white, headlines and body on dark backgrounds |
| `--color-text-secondary` | `#B0ADA6` | Supporting text — subtitles, metadata, descriptions |
| `--color-text-tertiary` | `#706E69` | Dim text — timestamps, hints, placeholders, disabled labels |
| `--color-text-on-sage` | `#EAE7DC` | Text displayed on sage-colored surfaces |
| `--color-text-on-gold` | `#141412` | Text displayed on gold accent backgrounds |
| `--color-text-link` | `#C4AF7E` | Inline links — uses gold to maintain brand consistency |

### 1.5 Border Colors

| Token | Value | Description |
|---|---|---|
| `--color-border` | `#2E2E2A` | Default subtle border — dividers, input outlines |
| `--color-border-light` | `#48483F` | Slightly more visible border — active input states, table rows |
| `--color-border-gold` | `#C4AF7E` | Gold border — focused inputs in premium contexts, selected premium cards |

### 1.6 Status Colors

| Token | Value | Description |
|---|---|---|
| `--color-success` | `#5A8C6E` | Muted earthy green — confirmation states, checkmarks, order complete |
| `--color-success-subtle` | `rgba(90,140,110,0.12)` | Success tint background |
| `--color-error` | `#C4624A` | Warm terracotta red — errors, destructive actions |
| `--color-error-subtle` | `rgba(196,98,74,0.12)` | Error tint background |
| `--color-warning` | `#C49A4A` | Warm amber — non-critical warnings, estimated wait alerts |
| `--color-warning-subtle` | `rgba(196,154,74,0.12)` | Warning tint background |
| `--color-info` | `#6A8FBF` | Cool steel blue — informational states, tech/SAP integration indicators |

---

## 2. Typography Tokens

### 2.1 Font Families

| Token | Value | Role |
|---|---|---|
| `--font-display` | `'Cormorant Garamond', 'Palatino Linotype', Georgia, serif` | Brand/editorial moments only — magazine covers, vault reveal screen, product passport hero. Never use for UI navigation or body copy. |
| `--font-heading` | `'Futura PT', 'Century Gothic', 'Trebuchet MS', sans-serif` | All UI headings — always uppercase, always tracked. Screen titles, section labels, feature names. |
| `--font-body` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | All body copy, descriptions, inputs, captions, labels. |

### 2.2 Type Scale

| Token | Value | Usage |
|---|---|---|
| `--text-display` | `font-size: 56px; line-height: 1.05; font-weight: 700; font-family: var(--font-display)` | Hero numerals (O11 logo, vault countdown), magazine-style hero text |
| `--text-h1` | `font-size: 28px; line-height: 1.2; font-weight: 600; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.08em` | Primary screen title — one per screen |
| `--text-h2` | `font-size: 20px; line-height: 1.3; font-weight: 600; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.06em` | Section headings within scrollable content |
| `--text-h3` | `font-size: 15px; line-height: 1.4; font-weight: 500; font-family: var(--font-heading); text-transform: uppercase; letter-spacing: 0.10em` | Card headings, feature section labels |
| `--text-body-lg` | `font-size: 16px; line-height: 1.65; font-weight: 400; font-family: var(--font-body)` | Primary readable content — long descriptions, onboarding text |
| `--text-body` | `font-size: 14px; line-height: 1.6; font-weight: 400; font-family: var(--font-body)` | Standard body copy — requirements, cards, modal content |
| `--text-body-sm` | `font-size: 13px; line-height: 1.55; font-weight: 400; font-family: var(--font-body)` | Dense body copy — tables, compact list items |
| `--text-caption` | `font-size: 12px; line-height: 1.5; font-weight: 400; font-family: var(--font-body)` | Metadata, timestamps, helper text, footnotes |
| `--text-label` | `font-size: 10px; line-height: 1.4; font-weight: 600; font-family: var(--font-body); text-transform: uppercase; letter-spacing: 0.12em` | Status badges, nav labels, form field labels, tags |

---

## 3. Spacing Tokens

All spacing is based on a **4px grid unit**. Every margin, padding, and gap value must be a multiple of 4.

| Token | Value | Typical Use |
|---|---|---|
| `--space-unit` | `4px` | Base grid unit — reference only |
| `--space-xs` | `4px` | Icon padding, tight inline gaps |
| `--space-sm` | `8px` | Inner element padding, icon-to-label gap |
| `--space-md` | `16px` | Card internal padding, form field spacing |
| `--space-lg` | `24px` | Section gaps, card-to-card spacing |
| `--space-xl` | `32px` | Screen-level padding, major section separation |
| `--space-2xl` | `48px` | Hero section padding, top-of-screen breathing room |
| `--space-3xl` | `64px` | Full-bleed section spacing, bottom sheet top padding |

---

## 4. Border Radius Tokens

The O11 brand is architectural and precise — radius values are intentionally small. Do not use large or pill radius on structural elements.

| Token | Value | Usage |
|---|---|---|
| `--radius-none` | `0px` | Tables, dividers, full-bleed elements |
| `--radius-xs` | `2px` | Status chips, tags, inline badges |
| `--radius-sm` | `4px` | Input fields, small secondary buttons |
| `--radius-md` | `8px` | Cards, product thumbnails, image containers |
| `--radius-lg` | `16px` | Bottom sheets, modals, vault compartment cells |
| `--radius-xl` | `24px` | Large feature cards, holographic preview panel |
| `--radius-pill` | `9999px` | Primary CTA buttons, member tier badges only |

---

## 5. Elevation & Shadow Tokens

| Token | Value | Usage |
|---|---|---|
| `--shadow-card` | `0 2px 12px rgba(0,0,0,0.4)` | Standard card lift on dark surface |
| `--shadow-card-hover` | `0 4px 24px rgba(0,0,0,0.55)` | Card on hover/focus |
| `--shadow-modal` | `0 8px 40px rgba(0,0,0,0.7)` | Modal and bottom sheet depth |
| `--shadow-nav` | `0 -1px 0 var(--color-border)` | Bottom nav bar separator |
| `--shadow-gold` | `0 0 20px rgba(196,175,126,0.2)` | Premium glow — vault reveal, product passport hero, gold CTA focus ring |
| `--shadow-sage` | `0 0 16px rgba(131,133,114,0.15)` | Sage panel ambient glow — in-store display contexts |

---

## 6. Motion Tokens

Motion in O11 is **unhurried, confident, and quiet**. Things drift into place. Nothing snaps, bounces, or overshoots.

### 6.1 Easing Curves

| Token | Value | Character |
|---|---|---|
| `--ease-standard` | `cubic-bezier(0.22, 1, 0.36, 1)` | Primary ease — soft deceleration. Use for all entrance animations. |
| `--ease-in-out` | `cubic-bezier(0.4, 0, 0.2, 1)` | Symmetrical — toggles, color changes. |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Quick start, slow finish — micro-interactions. |
| `--ease-reveal` | `cubic-bezier(0.16, 1, 0.3, 1)` | Dramatic deceleration — premium moments only. |

### 6.2 UI Motion

| Token | Value | Usage |
|---|---|---|
| `--motion-instant` | `0ms` | `prefers-reduced-motion` fallback |
| `--motion-fast` | `120ms var(--ease-out)` | Button press, checkbox, ripple |
| `--motion-default` | `240ms var(--ease-in-out)` | Color changes, opacity fades, focus rings |
| `--motion-slow` | `400ms var(--ease-in-out)` | Bottom sheet, nav transitions |
| `--motion-reveal` | `600ms var(--ease-reveal)` | Vault door, passport entry, gold glow |

### 6.3 Content Motion

| Token | Value | Usage |
|---|---|---|
| `--content-motion-sm` | `600ms var(--ease-standard)` | Metadata fading in — opacity only |
| `--content-motion-md` | `900ms var(--ease-standard)` | Scroll reveals — sections, cards |
| `--content-motion-lg` | `1200ms var(--ease-standard)` | Hero sequences, large content blocks |
| `--content-motion-xl` | `1400ms var(--ease-standard)` | Focal point reveals, clip-path animations |
| `--content-stagger` | `120ms` | Delay between staggered list items |

### 6.4 Motion Constraints

| Token | Value | Rule |
|---|---|---|
| `--motion-max-y` | `32px` | Max vertical translate. Typical: 16–24px. Hard ceiling. |
| `--motion-default-y` | `20px` | Default Y for scroll reveals |
| `--motion-max-x` | `0px` | No horizontal movement |
| `--motion-viewport-margin` | `-15%` | Scroll trigger fires slightly early |
| `--motion-parallax-range` | `12%` | Max parallax drift for backgrounds |
| `--motion-parallax-scale` | `1.05` | Max parallax zoom |
| `--motion-metadata-opacity` | `0.65` | Metadata settles at reduced opacity |

---

## 7. Full `:root {}` Block Template

Paste this at the top of every new HTML/CSS file:

```css
:root {
  /* Brand */
  --color-brand-sage:          #838572;
  --color-brand-sage-light:    #9A9B87;
  --color-brand-sage-dark:     #676858;

  /* Backgrounds */
  --color-bg-base:             #141412;
  --color-bg-surface:          #1E1E1B;
  --color-bg-elevated:         #2A2A26;
  --color-bg-sage:             #838572;
  --color-bg-overlay:          rgba(0,0,0,0.6);

  /* Accents */
  --color-accent-gold:         #C4AF7E;
  --color-accent-gold-dim:     #9E8C5E;
  --color-accent-gold-subtle:  rgba(196,175,126,0.12);
  --color-premium:             #C4AF7E;

  /* Text */
  --color-text-primary:        #F0EDE5;
  --color-text-secondary:      #B0ADA6;
  --color-text-tertiary:       #706E69;
  --color-text-on-sage:        #EAE7DC;
  --color-text-on-gold:        #141412;
  --color-text-link:           #C4AF7E;

  /* Borders */
  --color-border:              #2E2E2A;
  --color-border-light:        #48483F;
  --color-border-gold:         #C4AF7E;

  /* Status */
  --color-success:             #5A8C6E;
  --color-success-subtle:      rgba(90,140,110,0.12);
  --color-error:               #C4624A;
  --color-error-subtle:        rgba(196,98,74,0.12);
  --color-warning:             #C49A4A;
  --color-warning-subtle:      rgba(196,154,74,0.12);
  --color-info:                #6A8FBF;

  /* Typography */
  --font-display:   'Cormorant Garamond', 'Palatino Linotype', Georgia, serif;
  --font-heading:   'Futura PT', 'Century Gothic', 'Trebuchet MS', sans-serif;
  --font-body:      'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Spacing */
  --space-unit:  4px;
  --space-xs:    4px;
  --space-sm:    8px;
  --space-md:    16px;
  --space-lg:    24px;
  --space-xl:    32px;
  --space-2xl:   48px;
  --space-3xl:   64px;

  /* Radius */
  --radius-none: 0px;
  --radius-xs:   2px;
  --radius-sm:   4px;
  --radius-md:   8px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-card:       0 2px 12px rgba(0,0,0,0.4);
  --shadow-card-hover: 0 4px 24px rgba(0,0,0,0.55);
  --shadow-modal:      0 8px 40px rgba(0,0,0,0.7);
  --shadow-nav:        0 -1px 0 var(--color-border);
  --shadow-gold:       0 0 20px rgba(196,175,126,0.2);
  --shadow-sage:       0 0 16px rgba(131,133,114,0.15);

  /* Easing */
  --ease-standard:   cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-out:        cubic-bezier(0, 0, 0.2, 1);
  --ease-reveal:     cubic-bezier(0.16, 1, 0.3, 1);

  /* UI Motion */
  --motion-instant:  0ms;
  --motion-fast:     120ms var(--ease-out);
  --motion-default:  240ms var(--ease-in-out);
  --motion-slow:     400ms var(--ease-in-out);
  --motion-reveal:   600ms var(--ease-reveal);

  /* Content Motion */
  --content-motion-sm:  600ms var(--ease-standard);
  --content-motion-md:  900ms var(--ease-standard);
  --content-motion-lg:  1200ms var(--ease-standard);
  --content-motion-xl:  1400ms var(--ease-standard);
  --content-stagger:    120ms;

  /* Motion Constraints */
  --motion-max-y:             32px;
  --motion-default-y:         20px;
  --motion-max-x:             0px;
  --motion-viewport-margin:   -15%;
  --motion-parallax-range:    12%;
  --motion-parallax-scale:    1.05;
  --motion-metadata-opacity:  0.65;
}
```