# S·Fashion Mobile Store Companion — Master Implementation Plan

> **Client:** SAP × VF Corporation  
> **Project:** S·Fashion Concept Store (Walldorf Flagship — 148 m² Unmanned Luxury Retail Experience)  
> **Design Single Source of Truth:** `S-Fashion-Design-Guidelines.html` (All visual styles, colors, radii, components, and typography)  
> **Structural Stack Baseline:** Modern Web Architecture (Mobile-first 390px, zero-build vanilla ES6+ stack, `npx serve . -p 3000`, Lenis + GSAP 3 motion, modular `nav.js` shell)  
> **Document Version:** 3.0 (Strict Alignment with S·Fashion Design Guidelines)

---

## 1. System Architecture & Foundation (Structural Stack Guidance)

The technical foundation borrows the proven structural stack from modern web architecture without overriding S·Fashion's visual design guidelines:

### 1.1 Canvas & Viewport Architecture
* **Canvas Discipline:** Strict **Mobile-First 390px logical canvas** (`var(--canvas-width: 390px)`, with narrow support down to `360px` and wide support up to `430px`, centered with subtle neutral backing on larger review viewports).
* **Stack Lifecycle:**
  * **Phase 1 (Atelier Prototyping & Visual Markups):** Zero-build vanilla web stack (HTML5 + CSS Custom Properties + Modular ES6+ JS).
  * **Phase 2 (Production Flagship Deployment):** Transition to **Next.js App Router** (React Server Components, modular route handlers, and shared token packages).
* **Development Server:**
  * Standard dev command: `npx serve . -p 3000` (zero-configuration, instant local testing, matching production staging).

```
Project Architecture Flow:
┌────────────────────────────────────────────────────────┐
│  Mobile Web App / PWA (390px Canvas)                   │
│  • HTML5 + CSS Tokens (S-Fashion-Design-Guidelines)    │
│  • Zero-Build Local Runtime (`npx serve . -p 3000`)    │
├────────────────────────────────────────────────────────┤
│  Core Shell & Motion Services                          │
│  • nav.js (Shell injection, Joule AI button, Lenis)    │
│  • state.js (localStorage sync for cart & presence)    │
│  • motion.js (Lenis + GSAP 3 / ScrollTrigger engine)   │
├────────────────────────────────────────────────────────┤
│  Cross-Touchpoint Spatial Web API Layer                │
│  • WebSocket / SSE Store Sync Broker                   │
│  • 55" Ideum Tabletop Station Pairing                  │
│  • Proto Luma Holographic 1:1 Projection               │
│  • Tajima 15-Needle Cell Telemetry & Vault Lockers     │
└────────────────────────────────────────────────────────┘
```

---

## 2. Design System & Visual Tokens (`S-Fashion-Design-Guidelines.html`)

> [!IMPORTANT]
> `S-Fashion-Design-Guidelines.html` is the **absolute single source of truth** for all visual design.  
> No external brand styling (no RE/DONE tan, no Kaia rose, no near-square 2px overrides) is permitted.  
> Every color, spacing increment, radius, and font family must strictly reference the official S·Fashion design tokens.

### 2.1 Color Palette & Theme Tokens
All colors are defined via CSS variables with full Light/Dark theme switching:

```css
/* Core Palette Tokens from S-Fashion-Design-Guidelines.html */
:root {
  /* Brand Swatches (Immutable) */
  --sage-900: #2D4A3E;             /* Deep forest shadow */
  --sage-700: #3D6B5A;             /* Core S·Fashion brand primary */
  --sage-500: #7A9A8A;             /* Muted accent */
  --sage-300: #A8C4B8;             /* Soft highlight / user bubble surface */
  --sage-100: #D4E4DC;             /* Tonal stylist surface / chip backing */
  --black: #1A1A1A;                /* Pure ink / high contrast */
  --gold: #C4AF7E;                 /* Walldorf Gold (threads, VIP accents) */
  --gold-glow: rgba(196, 175, 126, 0.25);
}

/* Light Theme (Default S·Fashion Calm Retail Aesthetic) */
:root, [data-theme="light"] {
  --canvas: #F4F7F5;               /* Calm Sage canvas */
  --surface: #FFFFFF;              /* Pure card surface */
  --surface-raised: #FFFFFF;
  --surface-translucent: rgba(255, 255, 255, 0.85);
  --stylist-surface: var(--sage-100); /* #D4E4DC */
  --user-message: var(--sage-300);    /* #A8C4B8 */
  --primary: var(--sage-700);         /* #3D6B5A */
  --on-primary: #FFFFFF;
  --secondary: var(--sage-700);
  --accent: var(--sage-500);
  --ink: var(--black);                /* #1A1A1A */
  --ink-muted: #5B6B63;
  --ink-subtle: #8A9A92;
  --ink-label: var(--sage-700);
  --border-subtle: var(--sage-100);
  --border-control: #728F81;
  --border-focus: var(--sage-700);
  --focus-ring: var(--sage-700);
  --success: #2D7A4F;
  --warning: #C4933D;
  --error: #B84040;
  --image-fallback: #E9EFEC;
  --shadow-soft: 0 4px 20px -2px rgba(45, 74, 62, 0.08);
  --shadow-float: 0 12px 36px -4px rgba(45, 74, 62, 0.14);
}

/* Dark Theme (Velvet Atelier Mode) */
[data-theme="dark"] {
  --canvas: #121614;
  --surface: #1A1F1C;
  --surface-raised: #232B27;
  --surface-translucent: rgba(26, 31, 28, 0.88);
  --stylist-surface: #232B27;
  --user-message: var(--sage-900);
  --primary: var(--sage-300);
  --on-primary: var(--black);
  --secondary: var(--sage-300);
  --accent: var(--sage-500);
  --ink: #EEF2F0;
  --ink-muted: #A3B1AA;
  --ink-label: var(--sage-300);
  --border-subtle: #2C3631;
  --border-control: #6E7F76;
  --focus-ring: var(--sage-300);
  --success: #6FC08F;
  --warning: #D9AE5F;
  --error: #E88080;
  --image-fallback: #26302B;
}
```

### 2.2 Corner Radii System (S·Fashion Standard)
As specified in `S-Fashion-Design-Guidelines.html`:
* **`--radius-image-sm: 8px`**: Editorial tiles, lookbook previews, product image media.
* **`--radius-control: 12px`**: Interactive buttons (`.sf-btn`), inputs (`.sf-field`), size tiles (`.sf-size`), shared item cards (`.sf-item`), toast notices (`.sf-toast`), and summary containers (`.sf-summary`).
* **`--radius-message: 15px`**: Stylist and user conversational speech bubbles (`.sf-msg-user`, `.sf-msg-stylist`).
* **`--radius-pill: 999px`**: Filter chips (`.sf-chip`), status tags (`.sf-tag`), wishlist discs (`.sf-save span`), and success discs (`.sf-success`).

### 2.3 Typography Stack (SAP 72)
* **Official Font Family:** SAP `72` / `72full`, with high-legibility clean system fallback:
  ```css
  --font-brand: "72", "72full", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-body: "72", "72full", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  ```
* **Weights:**
  * Light: `300` (Hero subtitle, editorial introductions)
  * Regular: `400` (Body copy, chat text)
  * Medium: `500` (Subheadings, filter chips, secondary actions)
  * Bold: `700` (Display headings, primary buttons, price tags)
* **Scale & Hierarchy:**
  * Eyebrow: `700 12px/16px`, `letter-spacing: .06em`, uppercase, `color: var(--ink-label)`
  * Top Bar Title: `700 18px/24px var(--font-brand)`
  * Stylist Message Title: `700 20px/26px var(--font-brand)`
  * Display 01 (Cover/Lookbook): `700 clamp(32px, 6vw, 48px)/.95 var(--font-brand)`
  * Body: `400 16px/24px var(--font-body)`
  * Meta / Timestamp: `400 12px/16px var(--font-body)`, `color: var(--ink-muted)`

### 2.4 Inputs & Controls (iOS Zoom Lock)
* **Composer / Form Field (`.sf-field`):**
  * `min-height: 48px`, background `var(--surface)`, border `1px solid var(--border-control)`, border-radius `var(--radius-control: 12px)`.
  * Input text uses `16px` font size to guarantee the **iOS zoom lock** (prevents mobile Safari from auto-zooming).
  * Focus state: `outline: 2px solid var(--focus-ring); outline-offset: 2px;`

### 2.5 Strict Iconography & Visual Asset Rules
* **Stroke SVG Only:** Clean, 1.5px–2px stroke SVG line graphics (`viewBox="0 0 24 24"` or similar).
* **Strict Zero-Emoji Mandate:** **Never use emojis** anywhere in the interface (no `🛍`, `✨`, `🖥`, `🧵`, `📦`, `🌓` etc.).

---

## 3. Motion Engineering & Cinematic Reveals

The motion physics are derived directly from the intersection of the S·Fashion Design Guidelines and the structural motion engine:

### 3.1 Motion Engine & Libraries
* **Lenis:** Smooth momentum scroll engine (`@studio-freight/lenis` or vanilla ES6 wrapper) bound to the scrollable container.
* **GSAP 3 & ScrollTrigger:** Kinetic reveals and state choreography.

### 3.2 S·Fashion Motion Tokens
* **The Brand Easing Curve:** `--ease-brand: cubic-bezier(0.22, 1, 0.36, 1);`
* **Durations:**
  * `--duration-instant: 100ms` (tap response, scale press)
  * `--duration-quick: 200ms` (color hover, border-color)
  * `--duration-standard: 300ms` (dialogue bubble reveals)
  * `--duration-screen: 350ms` (view state transitions)
  * `--duration-editorial: 900ms` (lookbook image and hero reveals)
  * `--duration-hero: 1200ms` (spatial projection animations)
* **Displacements:**
  * `--distance-sm: 8px` (button & chip micro-rise)
  * `--distance-md: 16px` (card reveal translateY)
  * `--distance-lg: 24px` (hero section entry)
* **Interactive Micro-Press:**
  * `.sf-btn:active, .sf-size:active, .sf-chip:active { transform: scale(0.98); }`
* **Execution Constraint:** `once: true` on ScrollTrigger reveals.

### 3.3 Word / Split-Character Mask Reveals
Directly matching S·Fashion Guidelines section 14:
* Headline words wrapped in clipping containers (`.sf-split-w`), sliding up from below:
  ```css
  .sf-split-w { display: inline-block; overflow: hidden; vertical-align: top; }
  .sf-split-i { 
    display: inline-block; 
    transform: translateY(110%);
    transition: transform var(--duration-editorial) var(--ease-brand) calc(var(--sf-line, 0) * var(--stagger-editorial));
  }
  .sf-split.is-in .sf-split-i { transform: none; }
  ```

---

## 4. Shell, State & Joule AI Architecture (`nav.js`)

### 4.1 Modular Shell Injection
A dedicated `nav.js` module dynamically initializes and injects the global application shell:
1. **S·Fashion Shared Bottom Navigation (`.sf-nav`):**
   * Grid of 4 navigation destinations adhering to `S-Fashion-Design-Guidelines.html`:
     * `Lookbook` (Capsule collection / quick pass)
     * `Garment` (Curated piece, size selector, living stage)
     * `Atelier` (Tactile Tajima embroidery co-creation)
     * `Spatial` (55" Tabletop & Proto Luma Hologram sync)
   * Minimum touch target: `52px` height, active state highlights with `background: var(--stylist-surface); color: var(--ink); font-weight: 700;`.
2. **Joule AI Action Button:**
   * Styled cleanly using `S-Fashion` tokens (`var(--primary)`, `var(--on-primary)`).
   * Opens the conversational concierge drawer or voice prompt overlay.
3. **Lenis Initialization:**
   * Seamlessly binds to the root viewport upon load.

### 4.2 State Management & Persistence
* Single source of truth via modular ES6 store backed by `localStorage`:
  * `s_fashion_cart` (Selected garments, sizes, custom embroidery monogram, thread color).
  * `s_fashion_user` (Shopper identity, SAP employee vs public guest, RF pass state).
  * `s_fashion_spatial` (Paired Ideum 55" Tabletop Station ID, Proto Luma queue status).
* Event-driven broadcast (`window.dispatchEvent(new CustomEvent('sfashion:statechange'))`) ensures live UI synchronization without heavy framework overhead.

---

## 5. Physical Store Journey & Component Mapping

Each state implements standard `sf-*` components from the design guidelines:

### State 1: Arrival & Zero-Friction Turnstile Pass
* **UI Elements:**
  * Top bar (`.sf-topbar`) with S·Fashion wordmark and store connection status (`.sf-meta`).
  * Turnstile NFC / QR pass card using `.sf-editorial` with `.sf-editorial-band`.
  * Bold Opening Editorial Curation (1 hero garment: *Relaxed Studio Overshirt in Botanical Sage*).
  * Filter chip rail (`.sf-chip`).

### State 2: Living Visual Stage & Joule AI Concierge
* **UI Elements:**
  * Top living stage with garment photography and tactile fabric drape.
  * Joule Concierge speech bubble (`.sf-msg-stylist` with title `.sf-msg-title` and body `.sf-msg-body`).
  * Size selector tiles (`.sf-sizes` with `.sf-size` 5-column grid, 12px radius, 44px touch target).
  * Primary action button (`.sf-btn .sf-btn-primary .sf-btn-block`).

### State 3: Atelier Co-Creation (Tajima Robotics)
* **UI Elements:**
  * Interactive fabric embroidery canvas displaying live monogram positioning.
  * Form input (`.sf-field` with `16px` font size and focus ring).
  * Madeira thread selector using guideline swatches (Walldorf Gold `#C4AF7E`, Botanical Sage `#3D6B5A`, Raw Ecru `#F4F7F5`, Pure Black `#1A1A1A`).
  * Macro 1:1 stitch detail card (`.sf-item` with `.sf-thumb`).
  * Queue button (`.sf-btn .sf-btn-primary`).

### State 4: Cross-Touchpoint Spatial Sync & Vault Collection
* **UI Elements:**
  * Ideum 55" Tabletop pairing card (`.sf-item` with action button).
  * Proto Luma 1:1 Hologram projection trigger.
  * Tajima 15-needle robotics cell status countdown.
  * Automated Fashion Vault Locker #04 collection passcard with dynamic barcode.

---

## 6. Project Directory & File Structure

```
VFConcept_Store/
├── IMPLEMENTATION_PLAN.md             # This master specification document
├── S-Fashion-Design-Guidelines.html   # Absolute Single Source of Truth for Design
├── S_FASHION_MOBILE_DESIGN_BRIEF.md   # Creative brief for competing agents / designers
├── store_app_agent_led_brainstorming.md # High-level vision & touchpoint triad
│
├── store-app/                         # Production application root
│   ├── index.html                     # Main application entry point (390px canvas)
│   │
│   ├── css/
│   │   ├── tokens.css                 # Master tokens from S-Fashion-Design-Guidelines.html
│   │   ├── app.css                    # Official sf-* component stylesheets
│   │   └── motion.css                 # Lenis smooth scroll & GSAP split-reveal styles
│   │
│   ├── js/
│   │   ├── nav.js                     # Global shell: bottom navigation, Joule AI, Lenis
│   │   ├── state.js                   # Store state engine & localStorage persistence
│   │   ├── motion.js                  # GSAP 3 & ScrollTrigger unhurried reveals
│   │   ├── atelier.js                 # Embroidery canvas, thread spools, monogram logic
│   │   ├── spatial.js                 # Ideum 55" tabletop & Proto Luma hologram handoff
│   │   └── app.js                     # Main controller & view state routing
│   │
│   └── assets/
│       ├── icons/                     # Stroke SVG icon set only (no emojis)
│       └── images/                    # High-res editorial lifestyle & studio photography
```

---

## 7. Migration Path to Next.js App Router (Phase 2)

1. **Tokens & CSS:** `tokens.css` directly imports into Next.js `globals.css`.
2. **Modular Components:** Vanilla `sf-*` components map 1:1 to React Server Components (`<LivingVisualStage />`, `<AtelierCustomizer />`, `<JouleConciergeSheet />`).
3. **State & Storage:** The `state.js` store maps to a Zustand / React Context hook (`useStoreApp()`).
4. **Motion Engine:** Lenis and GSAP 3 hooks instantiate inside `useEffect` / `useGSAP` in client boundary components (`'use client'`).

---

## 8. Development & Review Commands

```bash
# Standard dev server command:
npx serve . -p 3000

# Alternative Python server:
python3 -m http.server 3000
```
