# O11 by VF — Component Rules

Per-component usage guidance for the O11 Concept Store design system. Every component must be built using tokens from `design-tokens.md`. These rules define how tokens are applied, what is allowed, and what is explicitly forbidden.

---

## 1. Buttons

### Primary CTA
- Background: `var(--color-accent-gold)`
- Text: `var(--color-text-on-gold)` — always dark on gold
- Font: `var(--font-heading)`, `var(--text-label)` style — uppercase, tracked
- Radius: `var(--radius-pill)`
- Padding: `var(--space-md)` vertical, `var(--space-xl)` horizontal
- Hover: background shifts to `var(--color-accent-gold-dim)`
- Focus ring: `var(--shadow-gold)`
- **DO NOT** use gold buttons for destructive actions. **DO NOT** use more than one primary CTA per screen.

### Secondary Button
- Background: transparent
- Border: `1px solid var(--color-border-light)`
- Text: `var(--color-text-primary)`
- Radius: `var(--radius-sm)`
- Hover: background `var(--color-bg-elevated)`

### Ghost / Text Button
- No background, no border
- Text: `var(--color-text-link)` (gold)
- Use for low-priority actions only (e.g. "Skip", "Cancel")

### Destructive Button
- Background: `var(--color-error)`
- Text: `var(--color-text-primary)`
- Radius: `var(--radius-sm)`
- Use only in confirmation modals — never as an in-line action

---

## 2. Input Fields

- Background: `var(--color-bg-elevated)`
- Border: `1px solid var(--color-border)`
- Text: `var(--color-text-primary)`
- Placeholder: `var(--color-text-tertiary)`
- Radius: `var(--radius-sm)`
- Padding: `var(--space-sm)` vertical, `var(--space-md)` horizontal
- **Focus state**: border changes to `var(--color-border-gold)`, add `var(--shadow-gold)` — this is the only context where gold is used on form elements
- **Error state**: border `var(--color-error)`, helper text `var(--color-error)` below the field
- Label: use `var(--text-label)` style above the input, color `var(--color-text-secondary)`
- **DO NOT** use `var(--color-bg-surface)` for inputs — they must read as distinct from the card they sit on

---

## 3. Cards

### Standard Card
- Background: `var(--color-bg-surface)`
- Border: `1px solid var(--color-border)` (optional — use when cards sit on `--color-bg-base`)
- Radius: `var(--radius-md)`
- Shadow: `var(--shadow-card)`
- Padding: `var(--space-md)`
- Hover shadow: `var(--shadow-card-hover)`

### Premium Card
- Same as Standard Card, plus:
- Top border: `2px solid var(--color-accent-gold)`
- Background may use `var(--color-accent-gold-subtle)` as a very subtle tint
- Must include a premium member badge using `var(--color-premium)` and `var(--text-label)` typography

### Sage Feature Card (in-store / brand contexts)
- Background: `var(--color-bg-sage)`
- Text: `var(--color-text-on-sage)`
- Radius: `var(--radius-md)`
- Used for brand feature highlights — Digital Graffiti, Vault showcase, Fashion Studio panels

---

## 4. Navigation

### Bottom Tab Bar
- Background: `var(--color-bg-surface)`
- Top separator: `var(--shadow-nav)`
- Active tab icon/label: `var(--color-accent-gold)`
- Inactive tab icon/label: `var(--color-text-tertiary)`
- Label font: `var(--text-label)`
- **DO NOT** use the sage color for navigation states

### Top Navigation / Header
- Background: `var(--color-bg-base)` (transparent when over full-bleed content)
- Title: `var(--text-h2)` style, `var(--color-text-primary)`
- Back arrow / icon buttons: `var(--color-text-secondary)`
- Divider: `var(--color-border)` only if content scrolls beneath it

---

## 5. Bottom Sheets & Modals

- Backdrop: `var(--color-bg-overlay)`
- Sheet background: `var(--color-bg-elevated)`
- Radius: `var(--radius-lg)` on top corners only, `0` on bottom
- Drag handle: `4px × 32px`, `var(--color-border-light)`, `var(--radius-pill)`
- Padding: `var(--space-lg)` all sides
- Transition open: `var(--motion-slow)`
- **Premium reveal modal** (vault, product passport): use `var(--shadow-gold)` on the sheet edge, and `var(--motion-reveal)` for the entrance animation

---

## 6. Status Badges & Chips

- Font: `var(--text-label)`
- Radius: `var(--radius-xs)`
- Padding: `var(--space-xs)` vertical, `var(--space-sm)` horizontal

| State | Background | Text |
|---|---|---|
| Success | `var(--color-success-subtle)` | `var(--color-success)` |
| Error | `var(--color-error-subtle)` | `var(--color-error)` |
| Warning | `var(--color-warning-subtle)` | `var(--color-warning)` |
| Info | `rgba(106,143,191,0.12)` | `var(--color-info)` |
| Premium | `var(--color-accent-gold-subtle)` | `var(--color-accent-gold)` |
| Standard | `var(--color-bg-elevated)` | `var(--color-text-secondary)` |

---

## 7. Progress Indicators

### Step Progress (Order Journey)
- Completed step: icon filled `var(--color-success)`, label `var(--color-text-secondary)`, `var(--text-body-sm)`
- Active step: icon outlined `var(--color-accent-gold)`, label `var(--color-text-primary)` bold, `var(--text-body)`
- Pending step: icon outlined `var(--color-border-light)`, label `var(--color-text-tertiary)`, `var(--text-body-sm)`
- Connector line: `var(--color-border)`, becomes `var(--color-success)` as steps complete

### Progress Bar (e.g. embroidery completion)
- Track: `var(--color-bg-elevated)`
- Fill: `var(--color-accent-gold)` — animates with `var(--motion-slow)`
- Height: `2px` — keep it minimal

---

## 8. QR Code Display Screen

- QR module: white on white background — use a white card (`#FFFFFF`) inset on `var(--color-bg-base)`
- Card radius: `var(--radius-md)`
- Locker number: `var(--text-h1)` style, `var(--color-accent-gold)` — this is a key premium moment
- Supporting instruction text: `var(--text-body)`, `var(--color-text-secondary)`
- This screen must have maximum contrast and minimum UI chrome — the QR code is the entire focus

---

## 9. Digital Product Passport

- Hero image/video: full-bleed, `var(--radius-none)` — editorial, immersive
- Product name: `var(--text-display)` in `var(--font-display)` — the only screen where display type is appropriate in the app UI
- Section headers: `var(--text-h3)` style, `var(--color-text-secondary)`, with a `var(--color-border)` divider below
- Authenticity badge: Premium chip style (see Status Badges), with `var(--shadow-gold)` glow
- Share button: Secondary button style — do not use gold here; sharing is not a premium action
- Video player controls: `var(--color-accent-gold)` play button on `var(--color-bg-overlay)` background

---

## 10. Accessibility Rules

- **Contrast minimum**: All text on backgrounds must meet WCAG 2.1 AA (4.5:1 for body, 3:1 for large text / UI components). The `--color-text-tertiary` on `--color-bg-base` pair is borderline — do not use it for essential information.
- **Tap target size**: Minimum 44×44px for all interactive elements
- **Motion**: All transitions must respect `prefers-reduced-motion`. Use `var(--motion-instant)` as the fallback value.
- **Focus states**: Every interactive element must have a visible focus ring. Use `var(--shadow-gold)` for gold elements, `2px solid var(--color-border-light)` for neutral elements.
- **Color alone**: Never use color as the only signal for state — always pair with an icon or label.

---

## 11. Motion Patterns

Seven named patterns for the O11 brand. All entrance animations trigger **once only**.

### Pattern 1: Hero Entrance Sequence

| Element | Behavior | Duration | Delay | Y offset |
|---|---|---|---|---|
| Title | Fade up | `var(--content-motion-lg)` | `0ms` | `24px` |
| Subtitle | Fade up | `var(--content-motion-md)` | `300ms` | `16px` |
| CTA | Fade up | `var(--content-motion-md)` | `550ms` | `16px` |
| Metadata | Fade in only | `var(--content-motion-sm)` | `700ms` | `0px` — settle at `var(--motion-metadata-opacity)` |

### Pattern 2: Scroll Reveal (Most Common)
- Trigger: `whileInView`, `once: true`
- Movement: opacity 0 + translateY `var(--motion-default-y)`, duration `var(--content-motion-md)`, easing `var(--ease-standard)`

### Pattern 3: Line / Divider Reveal
- `scaleY` 0→1, transform origin top, `var(--content-motion-md)`, `var(--ease-standard)`
- Label fades in 400ms later via Pattern 7

### Pattern 4: Image Reveal (Clip-Path)
- `clip-path` from `inset(20% 20% 20% 20%)` → `inset(0%)` + opacity 0→1
- Duration `var(--content-motion-xl)` — images are focal points

### Pattern 5: Parallax (Scroll-Linked)
- Y shift 0%→`var(--motion-parallax-range)`, scale 1→`var(--motion-parallax-scale)`
- Backgrounds and decorative imagery only — never text or UI

### Pattern 6: Staggered Lists
- Per item: opacity 0 + translateY 16px, `var(--content-motion-md)`, delay = `index × var(--content-stagger)`
- Max 5–6 visible stagger items; batch if more

### Pattern 7: Opacity-Only Reveal
- opacity 0 → `var(--motion-metadata-opacity)` (0.65), `var(--content-motion-sm)`, no movement
- Use for timestamps, captions, eyebrow labels

---

## 12. Motion Anti-Patterns

| Forbidden | Correct Alternative |
|---|---|
| Animate elements more than once on scroll | `once: true` always |
| Horizontal (X-axis) movement | Vertical only (`--motion-max-x: 0`) |
| Spring or bounce easing | `var(--ease-standard)` |
| TranslateY > 32px | 16–24px; hard max `var(--motion-max-y)` |
| Full opacity for metadata | `var(--motion-metadata-opacity)` |
| Scroll-jacking / position-locking | Let page scroll naturally |
| Delay without `once: true` | Always pair delay with once |

---

## 13. Motion Decision Tree

```
"First screen cascade in"     → Pattern 1: Hero Entrance
"Sections appear on scroll"   → Pattern 2: Scroll Reveal
"Divider draws itself"        → Pattern 3: Line Reveal
"Image opens cinematically"   → Pattern 4: Clip-Path Reveal
"Depth as I scroll past"      → Pattern 5: Parallax
"Items appear one by one"     → Pattern 6: Staggered Lists
"Label appears quietly"       → Pattern 7: Opacity-Only
```