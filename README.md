# O11 by VF — Concept Store

> Fashion Retail Reimagined — AI, Automation, and the SAP Ecosystem.

This repository contains the UX design system, requirement specifications, and project configuration for the **O11 by VF Concept Store** — a futuristic luxury fashion retail experience powered by SAP technology.

---

## Quick Start

Open this repository in **VS Code** to navigate all project files. Use the Explorer panel to browse specs and the built-in Markdown preview (`⌘K V`) to read them.

---

## Project Overview

The O11 Concept Store is a 148 m² unmanned retail space that combines:
- **Robotic embroidery** — live garment personalization (Tajima)
- **AI art generation** — customer drawings converted to fashion-quality graphics
- **Automated Fashion Vault** — premium product storage, pickup, and returns
- **Digital Product Passport** — authenticity, craftsmanship video, sustainability data
- **Holographic displays** — virtual try-on and celebrity interactions
- **Full SAP backbone** — Commerce Cloud, Customer Data Cloud, S/4HANA, Business AI Platform

---

## Repository Structure

```
├── agent.md                                 # Project manager config (AI assistant rules)
├── design-system/                           # Visual design system
│   ├── design-tokens.md                     #   Color, typography, spacing, motion tokens
│   ├── component-rules.md                   #   Per-component usage rules + motion patterns
│   └── motion-guide.md                      #   Motion reference
├── mobile-app-requirements.md               # Mobile app UX requirements (10 features)
├── in-store-displays-requirements.md        # Interactive displays (Graffiti Wall, Kiosk, Endless Aisle)
├── digital-product-passport-requirements.md # Digital Product Passport experience
├── cross-cutting-requirements.md            # Loyalty, tier differentiation, accessibility
└── Reference/
    └── VF_Concept_Store_V2_DRAFT.pptx       # Original concept deck (33 MB, gitignored)
```

---

## Design System

The O11 design system is defined in `design-system/` and enforces:

| Category | Highlights |
|---|---|
| **Colors** | Sage/khaki brand (`#838572`), warm dark base (`#141412`), gold accent (`#C4AF7E`) |
| **Typography** | Cormorant Garamond (display), Futura PT (headings), Inter (body) |
| **Spacing** | 4px grid, 8 named sizes (xs → 3xl) |
| **Radius** | Minimal/architectural — 2px to 8px typical, pill for CTAs only |
| **Motion** | Unhurried, confident, quiet — soft deceleration easing, 16–24px max offset |

All visual values are defined as CSS custom properties. No hardcoded values permitted.

---

## Requirement Documents

| Document | Covers |
|---|---|
| `mobile-app-requirements.md` | Store entry, product discovery, virtual try-on, checkout, order tracking, vault collection, Digital Product Passport, returns, loyalty |
| `in-store-displays-requirements.md` | Digital Graffiti Wall canvas, AI Fashion Cover kiosk, Endless Aisle styling screen |
| `digital-product-passport-requirements.md` | Passport structure, craftsmanship story, embroidery video, sustainability, public share |
| `cross-cutting-requirements.md` | Loyalty touchpoints, premium vs. standard tiers, accessibility/error handling |

---

## Technology Stack

| Layer | Components |
|---|---|
| **Robotics** | Universal Robots / KUKA, Tajima embroidery |
| **RFID** | Nedap / Keonn |
| **Holograms** | Proto Luma / Samsung |
| **SAP** | Commerce Cloud, Customer Data Cloud, S/4HANA Retail, Business AI Platform, Emarsys, Customer Data Platform |
| **Payments** | SAP Customer Checkout / Payfree |

---

## Working with This Repo

### For designers
Browse specs directly in VS Code. Refer to `design-system/design-tokens.md` for exact token values when building screens.

### For developers
The design tokens in `design-system/design-tokens.md` include a ready-to-paste CSS `:root {}` block. Copy it into your project's global stylesheet.

### For product/business
Requirement documents follow a consistent structure: overview → user stories → functional requirements → UX notes → open questions. Review the "Open Questions" sections for pending decisions.

---

## Status

**Draft** — This is an active concept in development. All documents are living and subject to change.

---

## License

Internal / Confidential — SAP SE. Not for public distribution.