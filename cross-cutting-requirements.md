# Cross-Cutting Concerns — UX Requirements
**Project:** VF Concept Store — Fashion Retail Reimagined
**Document type:** UX Requirements
**Status:** Draft
**Last updated:** 2026-07-16

---

## Table of Contents
1. [Overview](#1-overview)
2. [Scope](#2-scope)
3. [Feature Requirements](#4-feature-requirements)
   - [X-01 Loyalty Touchpoints](#x-01-loyalty-touchpoints)
   - [X-02 Premium vs. Standard Member Differentiation](#x-02-premium-vs-standard-member-differentiation)
   - [X-03 Accessibility & Error Handling for Unmanned Interactions](#x-03-accessibility--error-handling-for-unmanned-interactions)
4. [Non-Functional Requirements](#4-non-functional-requirements)
5. [Open Questions](#5-open-questions)

---

## 1. Overview

This document addresses three cross-cutting UX concerns that apply across all touchpoints in the VF Concept Store — mobile app, in-store displays, vault interactions, and the Digital Product Passport. These are not standalone features but **systemic behaviors** that must be consistently applied everywhere.

1. **Loyalty touchpoints** — where and how loyalty/rewards messaging surfaces throughout the journey
2. **Premium vs. Standard tier differentiation** — how the experience changes based on member level
3. **Accessibility & error handling** — how the unmanned store communicates problems and accommodates diverse users

---

## 2. Scope

These requirements apply to **all touchpoints** defined in the other requirement documents:
- Mobile app (`mobile-app-requirements.md`)
- In-store displays (`in-store-displays-requirements.md`)
- Digital Product Passport (`digital-product-passport-requirements.md`)

This document defines the rules and patterns. The other documents may reference these rules (e.g., "Apply X-02 tier differentiation here") rather than restating them.

---

## 3. Feature Requirements

---

### X-01 Loyalty Touchpoints

**Description:**
The O11 loyalty program must surface at deliberate moments throughout the customer journey — not as a persistent points counter, but as brand gestures that feel earned and personal. Loyalty messaging should feel like recognition, not accounting.

**Principles:**
- Loyalty is a **gesture**, not a ledger. Lead with the emotional message; the points number is secondary.
- Show points at moments of earning (purchase complete, vault pickup, tier milestone) — not everywhere.
- Never block a flow to show loyalty content. Loyalty messaging is always non-intrusive and dismissible.

**Touchpoint Map:**

| Journey Moment | Loyalty Surface | Behavior |
|---|---|---|
| After vault pickup (F-08 complete) | Push notification + in-app toast | "Welcome to the club. +250 points earned." Animated gold confetti (subtle, `--content-motion-sm`). |
| Tier threshold crossed | Full-screen celebration modal | Pattern 1 (Hero Entrance): "You've reached Gold." Display new tier badge with `--shadow-gold` glow. |
| Product Passport viewed (first time) | Subtle inline badge | "This piece earned you 250 points" — shown as metadata below the hero, `--text-caption` style. |
| Order progress complete (F-05 → F-06) | In-app card in notification feed | "Your order is ready — and 250 points are on the way." Gold accent on the notification card border. |
| Monthly/seasonal brand campaign | Push notification | Personalized message via SAP Emarsys: "New vault drop for Gold members. Preview now." |
| Store entry (daily first visit) | Subtle welcome banner | "Welcome back, [Name]. You're 120 points from Gold." Disappears after 3 seconds or tap. |

**Functional Requirements:**
- FR-X01.1: Points shall be awarded automatically upon vault pickup confirmation (not payment — the complete experience is what earns loyalty).
- FR-X01.2: Points balance shall be visible on the Profile screen and the Entry screen — nowhere else by default.
- FR-X01.3: Tier milestone celebrations shall use a full-screen modal with `--motion-reveal` entrance and gold theming.
- FR-X01.4: All loyalty messaging shall be personalized to the customer's first name (sourced from SAP Customer Data Cloud).
- FR-X01.5: Loyalty notifications shall be configurable — customers can mute loyalty push notifications independently of order notifications.
- FR-X01.6: A "Rewards" section in the app profile shall show: current points, current tier, next tier threshold, and points history.
- FR-X01.7: Points history entries shall show the product that earned them (with DPP link).

**UX Notes:**
- The tier milestone screen is a **premium brand moment**. Use `--font-display` for the tier name, `--color-accent-gold` throughout. This is one of the rare moments gold dominates the screen.
- Daily welcome banners must be ephemeral — 3 seconds, then gone. Never sticky. Never intrusive.
- The "250 points earned" notification should arrive AFTER the vault pickup celebration (F-08), not simultaneously. Stagger by 5–10 seconds.

---

### X-02 Premium vs. Standard Member Differentiation

**Description:**
The store supports two membership tiers — Standard and Premium. The UX must clearly distinguish what each tier can access without making Standard members feel excluded or creating confusion. The differentiation is **additive** (Premium gets more) not **restrictive** (Standard gets less).

**Tier Definitions:**

| Aspect | Standard Member | Premium Member |
|---|---|---|
| Store entry | Yes | Yes |
| Product personalization (Graffiti Wall, embroidery) | Yes | Yes |
| AI Fashion Cover kiosk | Yes | Yes |
| Endless Aisle browsing | Yes | Yes |
| Fashion Vault product drops (exclusive items) | No — vault displays visible but locked | Yes — full access to vault exclusives |
| Priority embroidery queue | No — standard queue | Yes — priority queue, shorter wait |
| Exclusive push notifications (new drops, events) | No | Yes |
| Vault pickup locker preference | Assigned | Customer selects preferred locker |
| Monthly tier challenge / bonus points | No | Yes |

**Functional Requirements:**
- FR-X02.1: Premium-exclusive content (vault products, priority queue indicator) shall be visually marked with the Premium chip style (`--color-accent-gold-subtle` background, `--color-accent-gold` text).
- FR-X02.2: On the mobile app, Standard members viewing Premium-only items shall see a clear but non-dismissive indicator: "Premium members only" with a "Learn more about Premium" link.
- FR-X02.3: Standard members shall **never** encounter a dead-end or error when tapping Premium content — always show a graceful upgrade path, not a block.
- FR-X02.4: The Vault display (in-store) shall physically illuminate Premium items differently (hardware) — in the app, Premium vault items use a gold top-border card style (see Component Rules: Premium Card).
- FR-X02.5: The entry QR screen shall display the member's tier badge — `var(--text-label)` style with the tier name and Premium gold accent if applicable.
- FR-X02.6: Priority queue status (Premium) shall be surfaced on the order progress screen (F-05) — "Priority: your order is next" with a subtle gold indicator.
- FR-X02.7: Tier upgrade prompts shall appear at maximum once per session, only at natural pause points (post-pickup, after browsing Premium items). Never mid-task.
- FR-X02.8: All tier-specific logic shall be driven by the `memberTier` field from SAP Customer Data Cloud — the app shall never hardcode tier rules.

**UX Notes:**
- The differentiation must feel **aspirational, not gatekeeping**. A Standard member seeing locked vault items should think "I want that" not "I'm excluded."
- Never use red, gray-out, or padlock icons for Premium-only items. Use gold tinting and positive language ("Unlock with Premium").
- The tier badge on the entry screen is a small but important status symbol — visible, proud, but not ostentatious.

---

### X-03 Accessibility & Error Handling for Unmanned Interactions

**Description:**
The VF Concept Store is unmanned — there is no staff to help when something goes wrong. The UX must handle failures gracefully, communicate problems clearly, and accommodate users with diverse abilities — all without human intervention.

**Design Principles for Unmanned Error Handling:**
1. **Never dead-end.** Every error state must offer at least one actionable next step.
2. **Speak human, not system.** Error messages use plain language ("Something went wrong with your payment" not "Error 502: Gateway timeout").
3. **Escalate visibly.** If self-recovery fails, surface a clear support contact (phone, chat) within 2 taps.
4. **Preserve work.** A failure in step 8 of 14 must never lose steps 1–7. All user input is preserved until explicitly abandoned.
5. **Fail gracefully.** If a subsystem is down (embroidery, vault, AI), the parts that work should still function.

**Error Scenario Handling:**

| Scenario | Display | Action Offered |
|---|---|---|
| Network lost during checkout | Full-screen overlay: "Connection lost. Your order is saved." | "Try again" button + "We'll resume when you're back online" |
| Payment declined | Inline error on payment screen | "Try a different payment method" + "Contact your bank" |
| Embroidery machine error during production | Push notification + in-app progress update | "We've paused your order. A team member has been alerted. We'll notify you when it resumes." |
| Vault door fails to open | QR screen: "Having trouble? Try your backup code below." | Show numeric unlock code + "Still stuck? Call [support number]" |
| AI artwork generation fails | Graffiti Wall display: "Our AI needs a moment. Let's try again." | "Retry" button + "Try a different prompt" |
| QR scan fails at store entry | Entry screen: "Scan didn't work. Hold steady and try again." | Auto-regenerate QR + manual entry code fallback |
| Display hardware unresponsive | Built-in watchdog shows: "This display is resting. Try the next one or use your app." | Arrow pointing to nearest alternative + app fallback |

**Functional Requirements:**
- FR-X03.1: All error states shall follow the pattern: **Clear message → Reason (one sentence) → Primary action → Secondary fallback**.
- FR-X03.2: Critical errors (payment failure, vault malfunction, production stoppage) shall trigger a push notification within 30 seconds if the customer has left the error screen.
- FR-X03.3: A global "Help" floating action button shall be available on every app screen (excluding the QR entry screen which needs maximum simplicity). It shall surface: FAQ, live chat (if available), and phone support number.
- FR-X03.4: All user input (drawings, configurations, cart contents) shall be auto-saved to the customer's session every 10 seconds. Recovery after crash or connection loss shall restore the last saved state.
- FR-X03.5: Error messages shall never expose technical details (status codes, system names, stack traces) to the customer.
- FR-X03.6: A "Store Status" indicator on the app home screen shall show if any major system is currently degraded (e.g., "Embroidery: longer wait times today").

**Accessibility Requirements (Unmanned Store Context):**

| Requirement | Standard | Implementation |
|---|---|---|
| Visual impairment | WCAG 2.1 AA minimum, AAA for critical actions | All text meets 4.5:1 contrast; critical buttons meet 7:1; screen reader support on mobile app |
| Motor impairment | Large tap targets, alternative input | All targets ≥44×44px; Graffiti Wall supports single-hand mode; voice input for AI prompts |
| Hearing impairment | No audio-only information | All audio feedback paired with visual/haptic; video captions available |
| Cognitive accessibility | Plain language, consistent patterns | Maximum 2 actions per screen; consistent button placement; progress indicators on all multi-step flows |
| Wheelchair access | Physical display positioning | Graffiti Wall table height adjustable or provides seated-height section; kiosk camera adjusts angle for seated users |
| Reduced motion | Respect system preference | All animations fall back to `--motion-instant` when `prefers-reduced-motion` is set |
| Language barriers | Multi-language support | All touchpoints support EN, DE, FR minimum; language auto-detected from phone locale or selectable on displays |

**Functional Requirements (Accessibility):**
- FR-X03.7: The mobile app shall support Dynamic Type (iOS) and font scaling (Android) up to 200% without layout breaking.
- FR-X03.8: All in-store displays shall have a physical "Accessibility" button (hardware) that increases text size and enables high-contrast mode.
- FR-X03.9: The app shall support VoiceOver (iOS) and TalkBack (Android) for all critical flows (entry, checkout, vault collection).
- FR-X03.10: Error messages shall be announced to screen readers immediately upon display (ARIA live region or equivalent).
- FR-X03.11: The Graffiti Wall shall provide a "guided drawing" assistive mode — simplified brush tools, larger controls, voice-guided prompts.
- FR-X03.12: Color is never the sole indicator of state (see Component Rules: Section 10). Every status change pairs color with an icon and/or label.

---

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-X01 | Resilience | Auto-save user state every 10 seconds; recover on reconnect within 5 seconds |
| NFR-X02 | Resilience | No single subsystem failure shall prevent store entry or exit |
| NFR-X03 | Support | "Help" action shall connect to live support within 2 taps from any screen |
| NFR-X04 | Accessibility | WCAG 2.1 AA compliance across all digital touchpoints; AAA for payment and vault collection |
| NFR-X05 | Accessibility | Screen reader pass-through time for the complete checkout flow ≤ 4 minutes |
| NFR-X06 | Localization | Error messages translated for all supported languages (EN, DE, FR minimum) |
| NFR-X07 | Degradation | If AI services are down, personalization flows shall offer a "manual design upload" fallback |

---

## 5. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-01 | What are the exact tier thresholds (points required for Standard → Premium)? | Business / CRM | Open |
| OQ-02 | Is there a staff escalation path for physical emergencies (medical, fire)? How does the unmanned store handle non-digital crises? | Operations / Safety | Open |
| OQ-03 | Should the "Store Status" degradation indicator be automatic (from SAP monitoring) or manually set by operations? | Architecture / Ops | Open |
| OQ-04 | What happens if the entire store loses power/network? Is there a physical emergency exit protocol? | Facilities / Safety | Open |
| OQ-05 | Are Premium tier benefits identical across all VF Concept Store locations, or can they vary by store? | Business / Product | Open |
| OQ-06 | Should the accessibility "guided drawing" mode on the Graffiti Wall be opt-in via a button, or auto-offered based on interaction patterns? | UX / Accessibility | Open |