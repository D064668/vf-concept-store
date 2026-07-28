# O11 by VF — Project Summary
**Last updated:** 2026-07-28

---

## What Is This

O11 by VF is a 148 m² unmanned luxury fashion retail concept store. Customers personalize garments using AI and robotics, pick up via an automated vault, and receive a permanent digital story of their product. Everything runs on SAP.

---

## The Experience in Order

1. Customer arrives — scans QR at entrance, unlocks mobile app session
2. Browses product wall (Endless Aisle screen) or physical shelves
3. Designs custom embroidery on the Graffiti Wall table (phone-primary, table as live preview)
4. Takes a styled magazine cover photo at the AI Cover Kiosk
5. Checks out on mobile — selects garment, confirms embroidery, pays
6. Watches live embroidery feed as the Tajima robot produces the garment
7. Vault door opens — picks up the finished product
8. Receives a Digital Product Passport — craftsmanship video, materials, authenticity cert, shareable link

---

## Hardware

| Component | What It Does |
|---|---|
| Tajima embroidery machine | Robotic garment personalization |
| Digital Graffiti Wall | 55" horizontal multi-touch table — customer design canvas |
| AI Fashion Cover Kiosk | Standing touchscreen kiosk with front-facing camera |
| Endless Aisle Screen | 65" wall-mounted display — full product catalog + AI styling |
| Automated Fashion Vault | Robotic storage and pickup for finished personalized garments |
| NFC/QR on garment tag | Triggers Digital Product Passport from the physical product |

---

## SAP Stack

| SAP Product | Role |
|---|---|
| Commerce Cloud | Product catalog, cart, checkout, order management |
| Customer Data Cloud | Identity, authentication, consent |
| Customer Data Platform | Personalization, purchase history, preferences |
| S/4HANA Retail | Inventory, fulfillment, production orders |
| Business AI Platform (BTP) | AI art generation, session broker, DPP hosting |
| Emarsys | Loyalty, CRM, post-purchase communications |

---

## Requirement Documents

| File | Covers | Feature IDs |
|---|---|---|
| `mobile-app-requirements.md` | Store entry, product discovery, virtual try-on, design canvas, checkout, order tracking, vault collection, DPP, returns, loyalty | F-01 – F-10 |
| `in-store-displays-requirements.md` | Graffiti Wall, AI Cover Kiosk, Endless Aisle | D-01 – D-03 |
| `digital-product-passport-requirements.md` | Passport hero, craftsmanship story, embroidery video, materials/sustainability, authenticity cert, social sharing | P-01 – P-06 |
| `cross-cutting-requirements.md` | Loyalty touchpoints, premium vs. standard tier differentiation, accessibility and error handling | X-01 – X-03 |

---

## Design System

Lives in `Skills/o11-ux-design-system/`. Key values:

| Category | Value |
|---|---|
| Brand colors | Sage `#838572`, warm dark `#141412`, gold `#C4AF7E` |
| Typography | Cormorant Garamond (display), Futura PT (headings), Inter (body) |
| Spacing grid | 4px base, 8 named sizes xs → 3xl |
| Motion | Unhurried, soft deceleration — never snappy or bouncy |
| Rule | No hardcoded values — always `var(--token-name)` |

---

## Key Design Principles

- **Unmanned** — no staff assistance; the interface must be self-explanatory at every step
- **Phone-primary** — the customer's phone is the primary input device; displays are theatrical surfaces
- **Dark-first** — near-black warm dark as the visual default; gold as a restrained accent
- **Editorial tone** — luxury, minimal, precise; no exclamation marks in UI copy
- **Privacy-forward** — cameras off by default, no passive capture, explicit consent required

---

## Open Questions (selected)

Full registry in `agent.md`. Key unresolved items:

| ID | Question | Owner |
|---|---|---|
| OQ-01 | Return policy for personalized items? | Business / Legal |
| OQ-03 | AI magazine cover — on-device vs cloud processing? | Architecture |
| OQ-07 | Live embroidery feed — stream vs snapshots? Privacy? | Architecture / Legal |
| OQ-10 | Cover kiosk camera — GDPR consent flow? | Legal |
| OQ-11 | NFC tag placement on garment? | Product / Manufacturing |
| OQ-14 | Network failure fallback — offline vault access? | Architecture |
