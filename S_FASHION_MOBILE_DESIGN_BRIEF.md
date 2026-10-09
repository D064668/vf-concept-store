# S·Fashion Mobile App — Agent-Led Design Brief & Creative Competition

> **Client:** SAP × VF Corporation  
> **Project:** S·Fashion Concept Store (Walldorf Flagship — 148 m² Unmanned Luxury Experience)  
> **Purpose:** Design brief for AI agents / designers to create competing visual markups of the agent-led mobile experience. The winning design language will establish the master design DNA across the **55" Ideum Tabletop** and **Proto Luma Hologram**.  
> **Target Deliverable:** Interactive Visual UI Markup (Single-file HTML/CSS/SVG or structured visual component markup).

---

## 1. Executive Summary & Creative Vision

S·Fashion is **not** a traditional shopping app. It is the digital companion to an autonomous, unmanned luxury retail environment in Walldorf, Germany. 

### The Problem with Traditional Retail Apps:
Standard eCommerce apps force the customer to do all the labor: browsing category trees, scrolling grids of 40 identical items, toggling filters, and reading static product descriptions.

### The S·Fashion Imperative:
In this store, the experience is **100% Agent-Led**. The app behaves like a **Private Atelier Creative Director** at a bespoke fashion house. The agent:
* Understands intent, ambient context, and in-store inventory.
* Immediately curates **1 or 2 tailored garments** with styling rationale, eliminating decision fatigue.
* Collaborates with the shopper on custom embroidery (prompting, sketching, thread selection).
* Hands off seamlessly to the **55" multi-touch table** and the **Proto Luma Hologram**.
* Dispatches the order to the **Tajima embroidery robotics cell** and issues the **Automated Fashion Vault** unlock key.

**The Creative Goal:** Create a design that is **jaw-dropping, ultra-cool, and unmistakably luxury**. It must feel like the year 2030, balancing high-tech precision with tactile, quiet fashion restraint.

---

## 2. Technical Stack & Design Source of Truth

Every competing markup must strictly respect the foundational tokens and components from `S-Fashion-Design-Guidelines.html` while leveraging the proven structural stack:

### A. Stylistic Single Source of Truth (`S-Fashion-Design-Guidelines.html`)
* **Color Palette:**
  * Light Mode: Calm Sage canvas (`--canvas: #F4F7F5`), Pure White surface (`--surface: #FFFFFF`), Brand Primary (`--primary: var(--sage-700) #3D6B5A`), Stylist Surface (`--stylist-surface: var(--sage-100) #D4E4DC`), User Bubble (`--user-message: var(--sage-300) #A8C4B8`), Ink (`--ink: #1A1A1A`), Muted Ink (`--ink-muted: #5B6B63`), Focus Ring (`--focus-ring: var(--sage-700)`), and Walldorf Gold (`--gold: #C4AF7E`).
  * Dark Mode: Deep Charcoal canvas (`--canvas: #121614`), Surface (`--surface: #1A1F1C`), Stylist Surface (`#232B27`), User Bubble (`var(--sage-900) #2D4A3E`), Primary (`var(--sage-300) #A8C4B8`), Ink (`#EEF2F0`).
  * **Strict Rule:** Never hardcode hex values. No external brand color overrides (no RE/DONE tan or Kaia rose).
* **Corner Radii System (Official Standard):**
  * `--radius-image-sm: 8px` (editorial tiles, product media)
  * `--radius-control: 12px` (buttons, inputs, size selector tiles, item cards, summary, toast)
  * `--radius-message: 15px` (stylist & user message bubbles)
  * `--radius-pill: 999px` (chips, tags, status pills, save button)
* **Typography Stack:**
  * SAP `72` / `72full` (with clean system fallback `Arial, Helvetica, sans-serif`), Light 300, Regular 400, Medium 500, Bold 700.
* **Component Classes:**
  * Must implement official `sf-*` components (`.sf-btn`, `.sf-chip`, `.sf-field`, `.sf-size`, `.sf-msg-stylist`, `.sf-msg-user`, `.sf-item`, `.sf-summary`, `.sf-nav`).

### B. Structural Stack Architecture (Technical Baseline)
* **Canvas Discipline:** Strict mobile-first **390px logical canvas** (`min-width: 360px`, `max-width: 430px`).
* **Technology:** Zero-build vanilla web stack (HTML5 + CSS Custom Properties + Modular ES6+ JS), architected for future transition to Next.js App Router.
* **Development Server:** Standard dev command: `npx serve . -p 3000`.
* **Global Shell Injection:** `nav.js` dynamically injects the shared bottom navigation (`.sf-nav`), Joule AI floating button, and Lenis smooth scroll initialization.
* **Cross-Page State:** `localStorage` for persistence (`s_fashion_cart`, user state, station pairing).
* **Forms & Inputs (iOS Zoom Lock):**
  * `.sf-field` with `16px` font size to lock mobile Safari from auto-zooming.
* **Iconography & Asset Rules:**
  * Clean SVG stroke outlines ONLY (1.5px–2px stroke).
  * **NEVER use emojis anywhere** (no 🛍, ✨, 🧵, 📦, 🌓, etc.).

### C. Motion Engineering
* **Libraries:** Lenis (smooth momentum scroll) + GSAP 3 / ScrollTrigger.
* **The S·Fashion Brand Curve:** `--ease-brand: cubic-bezier(0.22, 1, 0.36, 1)`.
* **Durations:** `--duration-quick: 200ms`, `--duration-standard: 300ms`, `--duration-screen: 350ms`, `--duration-editorial: 900ms`, `--duration-hero: 1200ms`.
* **Displacements & Reveals:** Maximum `16px`–`24px` `translateY`, `once: true`.
* **Word / Split Mask Reveals:** Heading words in clipping boxes (`.sf-split-w` and `.sf-split-i`) sliding up with `--ease-brand`.

---

## 3. The Required UI Layout: The "Hybrid Living Visual Stage"

The mobile screen must implement the **Hybrid Stage** architecture:

```
┌──────────────────────────────────────────────────────────────┐
│  [S·Fashion Logo]             [Walldorf Flagship]  [VIP] (●) │  <- App Header
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  TOP ~45%: THE LIVING VISUAL STAGE                           │
│  • Visual hero spotlighting the current curated garment      │
│  • Realistic fabric drape & slub texture                     │
│  • Dynamic tactile embroidery layer with simulated sheen     │
│  • Interactive placement pins (Left Chest · Center · Sleeve) │
│  • Live camera feed when Tajima robot stitches               │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  BOTTOM ~55%: CONCIERGE DIALOGUE & GENERATIVE MICRO-UIS      │
│  • Conversational stream with agent speech bubbles           │
│  • In-stream generative cards:                               │
│      - Curated Garment Card (materials, size pills)          │
│      - Atelier Co-Creation Card (prompts, motif tiles)       │
│      - 1-Tap Apple Pay Sheet (itemized total)                │
│      - Fashion Vault Passcard (Compartment #04 QR)           │
│                                                              │
├──────────────────────────────────────────────────────────────┤
│  [Curate Look]   [Bespoke Atelier]   [Pair Table 55"]        │  <- Intent Chips (SVG icons)
├──────────────────────────────────────────────────────────────┤
│  [Mic]  "Direct your look or describe a bespoke motif..." [↑] │  <- Composer
└──────────────────────────────────────────────────────────────┘
```

---

## 4. The 4 Essential Screen States to Mark Up

Each competing agent must represent these 4 critical states in their markup:

### State 1: The Store Handshake (Arrival)
* Shopper enters via mobile QR / NFC turnstile passcard.
* The agent delivers its opening bold curation: proposes 1 specific hero piece (e.g. *Relaxed Studio Overshirt in Botanical Sage*) tailored to the occasion.
* Shows near-square size selector pills (`[ S ] [ M ] [ L ] [ XL ]`) and ambient store status (*"Store Wi-Fi Connected · Tabletop Station 01 Nearby"*).

### State 2: The Atelier Co-Creation (Embroidery Design)
* Shopper explores custom embroidery.
* Visual stage shows the tactile stitch motif on the garment fabric.
* The agent presents the **Co-Creation Card**:
  * Monogram / motif input (Archivo Narrow 700, 16px iOS lock, borderless with `2px solid var(--tan)`).
  * Luxury thread spool selector (*Champagne Gold, Raw Ecru, Botanical Forest, Obsidian*).
  * Prominent **"Pair with Tabletop 55\""** action button to beam the design to the table.

### State 3: Robotic Fulfillment (Tajima Cell)
* Order confirmed via 1-tap checkout.
* The top visual stage displays the **Tajima Craftsmanship Feed**:
  * Tajima 15-needle robotics cell status (*"Needle 03 active · Madeira Silk Filament"*).
  * Calm luxury progress meter and estimated time remaining (*"2m 45s remaining"*).
  * Live stitch simulation showing the monogram completing on fabric.

### State 4: Vault Collection & Digital Product Passport (DPP)
* Garment is completed, folded, and staged.
* Agent surfaces the **Automated Fashion Vault Passcard**:
  * Compartment Number (*COMPARTMENT #04*).
  * High-contrast animated unlock QR code and "Unlock Vault Door" button.
* Archival badge for the permanent **Digital Product Passport (DPP)** with yarn provenance and craftsmanship cert.

---

## 5. Cross-Touchpoint Continuity Rules

The visual identity established in this mobile app must directly translate to:
1. **The 55" Ideum Tabletop App:** The same thread sheen, button geometry, color swatches, and typography must scale to the horizontal multi-touch canvas.
2. **The Proto Luma Hologram:** The same garment 3D rendering and dark velvet aesthetic must be optimized for light-on-black holographic projection.

---

## 6. Deliverable Format for Competing Agents

Agents tasked with creating a concept markup must output:
1. **A Single-File Interactive Markup (`.html` or self-contained component):**
   * Pure HTML5 + modern CSS (vanilla, using tokens).
   * Embedded SVG assets for the garment, logo, and embroidery stitches (no external broken image URLs).
   * Interactive toggles (theme toggle, state switcher between States 1–4, and interactive placement pins).
2. **A Design Rationale (Markdown summary):**
   * How their design achieves the "wow factor".
   * How they handled the balance between luxury quietness and high-tech coolness.

---

## 7. Judging & Evaluation Rubric

| Criterion | Weight | What Winning Looks Like |
| :--- | :---: | :--- |
| **Visual "Cool" & Wow Factor** | **35%** | Sleek, modern, editorial, feels like 2030. Flawless micro-interactions, lighting, and glass textures. |
| **Agent-Led UX Purity** | **25%** | Does not look or feel like Amazon or Shopify. Truly feels like a private atelier director guiding the journey. |
| **Tactile Quality & Embroidery Sheen** | **20%** | The fabric and stitches look tangible, textural, and luxurious rather than flat vectors. |
| **Cross-Screen Scalability** | **10%** | Clear potential to scale to the 55" table and hologram display. |
| **Design Token Compliance** | **10%** | Strict adherence to the S·Fashion Sage palette, `#C4AF7E` gold, and SAP `72` typography. |
