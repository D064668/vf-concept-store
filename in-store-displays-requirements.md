# Interactive In-Store Displays — UX Requirements
**Project:** VF Concept Store — Fashion Retail Reimagined
**Document type:** UX Requirements
**Status:** Draft
**Last updated:** 2026-07-27

---

## Table of Contents
1. [Overview](#1-overview)
2. [Scope](#2-scope)
3. [Display Environments](#3-display-environments)
4. [Feature Requirements](#4-feature-requirements)
   - [D-01 Digital Graffiti Wall Canvas](#d-01-digital-graffiti-wall-canvas)
   - [D-02 AI Fashion Cover Kiosk](#d-02-ai-fashion-cover-kiosk)
   - [D-03 Endless Aisle / AI Styling Screen](#d-03-endless-aisle--ai-styling-screen)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Out of Scope](#6-out-of-scope)
7. [Open Questions](#7-open-questions)

---

## 1. Overview

The VF Concept Store features three interactive in-store display experiences that complement the mobile app. These are large-format touchscreen interfaces mounted in the store environment — they are public-facing, shared surfaces designed for brief, high-impact interactions that draw customers into the personalization journey.

Unlike the mobile app (a personal, authenticated device), these displays are **ambient, communal, and theatrical**. They must attract attention, be immediately intuitive without onboarding, and create moments worth sharing.

---

## 2. Scope

This document covers UX requirements for three in-store interactive display experiences:

1. **Digital Graffiti Wall** — an interactive table where customers draw artwork that AI converts into embroidery-ready designs
2. **AI Fashion Cover Kiosk** — a standing kiosk that generates editorial-quality O11 magazine cover photos
3. **Endless Aisle / AI Styling Screen** — a wall-mounted display showing inventory-aware styling recommendations

**In scope:**
- Touch interface design for each display
- Interaction flows from idle state → engagement → output
- Integration points with the mobile app (handoff moments)
- Idle/attract mode behavior
- Accessibility on large-format shared surfaces

---

## 3. Display Environments

| Display | Form Factor | Location | Interaction Mode |
|---------|-------------|----------|------------------|
| Digital Graffiti Wall | Horizontal interactive table (~55") | Center of store floor | Multi-touch drawing, two-handed |
| AI Fashion Cover Kiosk | Standing kiosk with integrated front-facing camera | Near fitting area / Fashion Studio zone | Touch + camera |
| Endless Aisle / AI Styling | Wall-mounted vertical display (~55") | Main product wall | Touch browse + scroll |

---

## 4. Feature Requirements

---

### D-01 Digital Graffiti Wall Canvas

**Description:**
A horizontal interactive table where customers create personalized artwork via two creative paths: (1) selecting and customizing from a curated design library, or (2) freehand sketching with AI-assisted refinement. AI converts all output into embroidery-ready, production-constrained artwork in the O11 tonal embroidery style. The customer's raw sketch is never used as final output — it serves as creative input that the AI refines into production-quality designs.

**Design Direction — Tonal Embroidery Style:**
Based on the confirmed concept, the output style is **tone-on-tone embroidery** — same-color or similar-color thread on fabric (e.g., sage thread on sage garment). The design reads through stitch texture and direction, not through color contrast. The aesthetic is botanical, organic, and line-based — delicate but premium.

**Two Creative Paths:**

| Path | Entry point | Customer action | AI role | Output |
|---|---|---|---|---|
| **Library** | "Choose a design" button | Browse curated patterns, select one, resize, reposition, combine elements | Minimal — applies modifications, previews on garment | Guaranteed quality, fast, low friction |
| **Draw your own** | "Create from scratch" button | Sketch a rough concept (stick figures, shapes, scribbles) + optional text prompt | Heavy — interprets intent, generates polished artwork in the O11 tonal embroidery style | One-of-one, higher emotional payoff |

Both paths end at the same point: a polished, embroidery-ready design that the customer approves before transfer to the mobile app.

**User Stories:**
- As a customer, I want to browse a curated library of pre-made designs so I can personalize my garment quickly without needing to draw.
- As a customer, I want to customize a library design (resize, reposition, combine elements) so it feels unique to me.
- As a customer, I want to draw a rough sketch of my idea so the AI can turn it into something beautiful.
- As a customer, I want to add a text prompt alongside my sketch (e.g., "botanical, minimalist") so the AI understands my creative direction.
- As a customer, I want to see 2–3 AI-generated variations of my concept so I can pick the one I like most.
- As a customer, I want to preview how the design looks embroidered on my chosen garment (not just as a flat image) so I can set accurate expectations.
- As a customer, I want to transfer my approved design to the mobile app so I can proceed to selection, payment, and production.

**Functional Requirements:**

*Canvas & Drawing (both paths):*
- FR-D01.1: The canvas shall support multi-touch freehand drawing with variable brush sizes.
- FR-D01.2: The canvas shall provide at least 5 brush tools: pen, marker, spray, eraser, and fill.
- FR-D01.3: An undo/redo stack (minimum 20 steps) shall be available via on-screen controls.
- FR-D01.4: The system shall support simultaneous use by up to 2 customers on the same table surface (split-screen mode).

*Library Path:*
- FR-D01.5: The system shall provide a curated design library of at least 30 pre-made patterns organized by theme (botanical, geometric, abstract, sport, text/monogram).
- FR-D01.6: Library designs shall be customizable: resize, rotate, reposition on garment, and combine up to 3 elements.
- FR-D01.7: All library designs shall be pre-validated against the embroidery production constraints.

*Draw Your Own Path:*
- FR-D01.8: The system shall accept an optional text prompt (typed or voice) to guide AI interpretation of the sketch.
- FR-D01.9: Upon submission, the AI shall generate 2–3 embroidery-ready artwork variants within 10 seconds.
- FR-D01.10: The AI shall NEVER produce the customer's raw sketch as a final output — all output must be AI-refined into the tonal embroidery style.
- FR-D01.11: If a generated variant cannot meet production constraints, the system shall flag it and offer to "simplify" automatically.

*Preview & Output (both paths):*
- FR-D01.12: Each variant shall display a stitch-simulation preview showing the design embroidered on the selected garment (not a flat image overlay).
- FR-D01.13: The customer shall be able to select their preferred variant and transfer it to their mobile app session via QR code scan.
- FR-D01.14: The canvas shall automatically reset to idle/attract mode after 90 seconds of inactivity.
- FR-D01.15: The idle/attract mode shall display looping examples of previous customer creations (with consent) and a clear "Touch to start" CTA.

*Production Constraints (enforced by AI at generation time):*
- FR-D01.16: AI output shall conform to the embroidery style envelope: maximum 4 thread colors per design (tonal palette), minimum element size 3mm × 3mm, minimum line width 1.5mm, closed shapes preferred.
- FR-D01.17: For the default tonal style, output shall be single-color or 2-color (tone-on-tone thread on fabric).
- FR-D01.18: The system shall never present a design to the customer that cannot be physically produced by the Tajima embroidery machine.
- FR-D01.19: Design output shall be constrained to the available hoop size (production area TBC — see open questions).

**Interaction Model — Phone-Primary with Table Preview:**

The customer's phone is the primary design input device. The table serves as the large-format live preview surface and fallback canvas.

| Device | Role | What it handles |
|---|---|---|
| **Phone** (primary input) | Design tool — personal, private, comfortable | Drawing, text prompts, voice commands, reference image upload, library browsing, variant selection |
| **Table** (live preview + fallback) | Theatrical display — shared, large-scale, impressive | Real-time mirror of phone drawing, AI variant display at full scale, stitch-simulation preview, garment mockup |

CTA on table when customer connects:
- **"Design on your phone"** — primary CTA (`--color-accent-gold`), recommended label
- **"Draw on this table"** — secondary CTA, for customers who prefer the hands-on surface experience

Phone drawing syncs to the table in real-time via the session broker. Customers draw on their phone and watch it appear live on the 55" surface — theatrical for onlookers, comfortable for the creator.

**Connection Priority & Fallback Hierarchy:**

| Priority | Connection | Behavior |
|---|---|---|
| 1 (primary) | Phone on SAP store WiFi | Same network as table. Lowest latency (~30–50ms). Real-time drawing sync feels instant. |
| 2 (fallback) | Phone on cellular (5G/4G) | Works via cloud session broker. Slightly higher latency (~100–300ms). Drawing syncs with minor smoothing. Text/voice/library unaffected. |
| 3 (last resort) | Table surface directly | No phone connection needed. Customer draws and prompts directly on the table using on-screen tools and keyboard. |

- FR-D01.20: The system shall suggest SAP store WiFi connection during the store entry flow (one-time prompt in the app after QR scan).
- FR-D01.21: The phone-to-table session shall function over any internet connection (WiFi or cellular) via the cloud session broker hosted on SAP BTP.
- FR-D01.22: Drawing sync latency shall be masked via stroke interpolation/smoothing on the table when phone latency exceeds 150ms.
- FR-D01.23: If phone connection drops entirely, the table shall display a prompt: "Connection lost — continue designing on this surface" and activate the full on-table drawing tools.
- FR-D01.24: The table shall always remain functional as a standalone drawing surface regardless of phone connection state.

**UX Notes:**
- The canvas must feel **immediate and tactile** — zero perceptible latency between touch and ink. Target: <16ms touch-to-pixel response (on-table drawing). Phone-to-table sync target: <100ms on WiFi.
- Keep tool controls minimal and docked to the edge. The drawing/preview area is the hero.
- The phone-primary CTA should be the **default/prominent entry** — it's the smarter, more private experience. Table-direct is the fallback/alternative.
- The library path should be the **default creative option within the phone** — lower friction, guaranteed quality. "Draw your own" is the premium creative path.
- AI generation should use Pattern 4 (Image Reveal) from the motion system when presenting artwork variants on the table — cinematic, not instant.
- The stitch-simulation preview is critical for expectation-setting. Customers must see how thread texture looks, not a flat graphic.
- The "wow moment": customer casually sketching on their phone while their drawing unfolds live on the large glowing table. Other shoppers see the creation happening — this drives social sharing and organic brand amplification.
- For the "draw your own" path, reduce pressure: show an encouraging message like "Sketch your idea — the AI will refine it" so customers don't feel their drawing skill is being judged.

---

### D-02 AI Fashion Cover Kiosk

**Hardware:** Standard touchscreen kiosk with integrated front-facing camera

**Description:**
A standing kiosk with a front-facing camera that generates editorial-quality O11 magazine cover images featuring the customer. The output is a styled, shareable digital image combining the customer's photo with their chosen garment, AI background removal and editorial lighting, and a branded O11 magazine layout. The final cover is delivered to the customer's phone via QR code.

**User Stories:**
- As a customer, I want to take a photo of myself at the kiosk so I can be featured on a personalized magazine cover.
- As a customer, I want to choose from different magazine cover styles (seasonal themes, sport, editorial) so my cover feels unique.
- As a customer, I want to preview the cover before it's finalized so I can retake if I'm not happy.
- As a customer, I want to receive my magazine cover on my phone so I can share it on social media immediately.

**Functional Requirements:**
- FR-D02.1: The kiosk shall capture a front-facing photo using an integrated camera with studio-quality lighting guidance.
- FR-D02.2: The interface shall display real-time camera framing guides (face position, body crop) to ensure optimal photo composition.
- FR-D02.3: The system shall offer at least 4 magazine cover templates (e.g., "O11 Expedition", "O11 Modern", "O11 Summit", "Celebrity Style").
- FR-D02.4: After capture, the AI shall generate the styled magazine cover within 8 seconds, showing a progress animation during processing.
- FR-D02.5: The customer shall be able to preview the final cover and either accept or retake (maximum 3 retakes per session).
- FR-D02.6: Accepted covers shall be deliverable to the customer via QR code (links to a download page) or direct transfer to the mobile app.
- FR-D02.7: The kiosk shall display a privacy notice before camera activation, requiring explicit "Start" tap to begin.
- FR-D02.8: Photos shall not be stored beyond the session unless the customer explicitly opts in to the gallery.
- FR-D02.9: The idle/attract mode shall display a rotating gallery of (consented) sample covers with a "Create yours" CTA.
- FR-D02.10: The kiosk shall timeout and return to idle after 60 seconds of inactivity during an active session.

**UX Notes:**
- The camera UX must feel **premium, not surveillance**. Frame it as a "photoshoot" — use warm language ("Step into the light", "Strike your pose"), not clinical ("Position face in frame").
- Generation progress should use a cinematic reveal (Pattern 4 — clip-path expanding) when the final cover appears.
- Privacy must be front-and-center. The camera is OFF until the customer explicitly taps Start. No passive capture.
- The download QR should appear with `--shadow-gold` glow — this is a moment of delight.

---

### D-03 Endless Aisle / AI Styling Screen

**Description:**
A wall-mounted display that extends the physical store's product range beyond what's on the shelves. It surfaces AI-powered styling recommendations based on the current in-store inventory, customer preferences (if authenticated), and trending combinations.

**User Stories:**
- As a customer, I want to browse products that aren't physically on the shelf so I can discover more options.
- As a customer, I want to see AI-curated outfits and styling combinations so I can get inspiration.
- As a customer, I want to filter by size and category so I only see items available to me.
- As a customer, I want to send a product to my mobile app so I can add it to my cart from my phone.

**Functional Requirements:**
- FR-D03.1: The display shall show a real-time inventory-aware product catalog sourced from SAP Commerce Cloud.
- FR-D03.2: Products shall be browsable by category, size, color, and personalization type via touch gestures (swipe, tap, pinch-to-zoom).
- FR-D03.3: Out-of-stock items shall be hidden by default; an optional "Notify me" toggle can reveal them with a restock alert CTA.
- FR-D03.4: AI-generated "Complete the Look" outfit combinations shall be presented as full-outfit cards showing 3–4 items styled together.
- FR-D03.5: Styling recommendations shall be inventory-aware — only surface combinations where all items are currently available.
- FR-D03.6: If the customer authenticates (via QR scan from mobile app), recommendations shall personalize to their size, purchase history, and preferences from SAP Customer Data Platform.
- FR-D03.7: Each product card shall include a "Send to my app" action that transfers the item to the customer's mobile cart via SAP Commerce Cloud.
- FR-D03.8: The display shall support a "Trending Now" section showing the most-interacted-with items of the current day/week.
- FR-D03.9: Idle/attract mode shall cycle through featured outfits and new arrivals with gentle scroll animation (Pattern 6 — stagger).
- FR-D03.10: The display shall return to idle after 45 seconds of inactivity.

**UX Notes:**
- This display is the most "shoppable" of the three — it should feel like a curated editorial lookbook, not a product grid.
- Large imagery, minimal text. Product details appear on tap, not by default.
- The AI outfit recommendations should feel **opinionated and curated** — "Our AI styled this for you" — not generic.
- Use Pattern 5 (Parallax) for background lifestyle imagery behind the product cards to create depth.

---

## 5. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-D01 | Performance | Touch-to-ink latency on the Graffiti Wall ≤ 16ms (60fps rendering) |
| NFR-D02 | Performance | AI artwork generation (Graffiti Wall) ≤ 10 seconds |
| NFR-D03 | Performance | Magazine cover generation (Kiosk) ≤ 8 seconds |
| NFR-D04 | Reliability | All displays shall recover gracefully from network interruption (show cached content, retry silently) |
| NFR-D05 | Accessibility | All displays shall meet WCAG 2.1 AA for large-format touch interfaces — minimum 60px tap targets, minimum 24px text |
| NFR-D06 | Accessibility | Graffiti Wall: support single-hand drawing mode for users with limited mobility |
| NFR-D07 | Privacy | AI Fashion Cover Kiosk: no facial data stored beyond session; camera disabled in idle mode |
| NFR-D08 | Durability | Interfaces shall handle accidental multi-touch (palm rejection), stray taps, and aggressive gestures without breaking state |
| NFR-D09 | Localization | All display text shall support EN, DE, FR; language selection available via flag icons in corner |

---

## 6. Out of Scope

- Mobile app screens (covered in `mobile-app-requirements.md`)
- Holographic display hardware interface (separate document — hardware-specific)
- Backend AI model selection and training (engineering/ML scope)
- Physical display hardware specifications (procurement/engineering)
- Staff management interface for display content

---

## 7. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-01 | How are customer-created artworks stored and displayed in the gallery? What is the consent mechanism and data retention policy? | Legal / Privacy | Open |
| OQ-02 | Can the Graffiti Wall support more than 2 simultaneous users, or is the table size a hard constraint? | Hardware / UX | Open |
| OQ-03 | What happens when the AI generates artwork that is inappropriate or offensive? Is there a content filter before display? | AI / Ethics | Open |
| OQ-04 | For the Endless Aisle, how does unauthenticated browsing handle size filtering — does it show all sizes or require authentication first? | Business / UX | Open |
| OQ-05 | What is the maximum queue for magazine cover generation? If 3 customers are waiting, how is the wait communicated? | Operations / UX | Open |
| OQ-06 | Should the Endless Aisle "Send to my app" work for unauthenticated users (via QR-to-app deep link) or require prior login? | Business / Tech | Open |