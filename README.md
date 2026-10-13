# S·Fashion Concept Store (Walldorf Flagship)

> **Fashion Retail Reimagined:** Autonomous Luxury Experience powered by SAP × VF Corporation.

This repository contains the design system, master implementation plan, creative design brief, and application companion code for the **S·Fashion Concept Store** — a 148 m² unmanned luxury retail space at SAP HQ in Walldorf, Germany.

---

## 🏛️ Project Touchpoint Triad

The S·Fashion store experience is driven by an agent-led architecture across three physical/digital touchpoints:

1. **Store App (Downloadable Mobile App for iOS & Android):**
   * **Audience:** Exclusively for **SAP employees only** at the moment (internal corporate flagship, not for general public).
   * **Enterprise Security:** Downloaded to employee mobile devices under **SAP Mobile Device Management (MDM) / Intune** and authenticated via **SAP Corporate SSO**.
   * Turnstile NFC / QR entry, Private Atelier Creative Director (Joule AI), custom Tajima embroidery co-creation, and vault locker pickup key (#04).
2. **Tabletop Interaction App:**
   * 55" Ideum multi-touch table in the store center for shared co-design and fabric exploration.
3. **Proto Luma Hologram & AI Fashion Cover Kiosk:**
   * Life-size 1:1 vertical holographic display for virtual try-on and editorial magazine photoshoots.

---

## 📐 Design Single Source of Truth

All visual styling strictly adheres to the official design tokens and component standards defined in:
* **[`S-Fashion-Design-Guidelines.html`](./S-Fashion-Design-Guidelines.html)**

### Core Styling Tokens
* **Color System:**
  * Light Mode: Calm Sage canvas (`--canvas: #F4F7F5`), Pure White surface (`--surface: #FFFFFF`), Brand Primary (`--primary: #3D6B5A`), Stylist Surface (`--stylist-surface: #D4E4DC`), User Bubble (`--user-message: #A8C4B8`), Ink (`--ink: #1A1A1A`), Walldorf Gold (`--gold: #C4AF7E`).
  * Dark Mode: Charcoal canvas (`--canvas: #121614`), Surface (`--surface: #1A1F1C`), Primary (`--primary: #A8C4B8`), Ink (`#EEF2F0`).
* **Corner Radii Hierarchy:**
  * `--radius-image-sm: 8px` (editorial lookbook media, product images)
  * `--radius-control: 12px` (buttons, inputs, size selector tiles, item cards, summary)
  * `--radius-message: 15px` (conversational speech bubbles)
  * `--radius-pill: 999px` (chips, tags, status pills, save button)
* **Typography:**
  * Official SAP `72` / `72full` (300 Light, 400 Regular, 500 Medium, 700 Bold).

---

## 🛠️ Architecture & Technical Stack

* **Platform Target:** Downloadable native/hybrid app for **iOS & Android**, packaged with corporate security wrappers (MDM / SAP Cloud Identity Services).
* **Canvas Discipline:** Strict mobile-first 390px logical canvas (`min-width: 360px`, `max-width: 430px`).
* **Runtime Core:** Zero-build vanilla web stack (HTML5 + CSS Custom Properties + Modular ES6+ JS), transitioning to Next.js App Router and native container packaging.
* **Motion Engine:** Lenis smooth momentum scroll + GSAP 3 / ScrollTrigger with S·Fashion brand curve (`cubic-bezier(0.22, 1, 0.36, 1)`).
* **Shell & State:** `nav.js` injecting shared bottom navigation, Joule AI button, and Lenis initialization; `localStorage` for cross-page persistence.
* **Forms:** `16px` font size to enforce the iOS Safari zoom lock.
* **Icons:** Clean SVG stroke outlines only (zero emojis).

---

## 📂 Repository Structure

```
.
├── README.md                          # Project overview & colleague onboarding
├── IMPLEMENTATION_PLAN.md             # Master technical blueprint & architecture
├── S_FASHION_MOBILE_DESIGN_BRIEF.md   # Creative brief for competing agents / designers
├── S-Fashion-Design-Guidelines.html   # Visual design single source of truth
├── store_app_agent_led_brainstorming.md # Orchestrated journey & touchpoint specs
│
├── store-app/                         # Production application companion
│   ├── index.html                     # 390px mobile viewport entry
│   ├── css/                           # Design tokens & component styling
│   ├── js/                            # Modular ES6 controllers (app, agent data)
│   └── assets/                        # High-resolution studio & editorial imagery
│
├── assets/                            # Editorial campaign assets
└── Reference/                         # Architectural floorplans (SVG, PDF)
```

---

## 🚀 Local Development

To run the local server:

```bash
# Standard dev server (port 3000):
npx serve . -p 3000

# Or with Python:
python3 -m http.server 3000
```

Open `http://localhost:3000/store-app/index.html` in your browser.

---

## 👥 Collaboration & Contribution

1. Create a feature branch: `git checkout -b feature/your-name`
2. Follow token standards in `S-Fashion-Design-Guidelines.html`.
3. Commit with semantic messages and submit a Pull Request.

---

**Confidential & Proprietary:** SAP SE × VF Corporation.
