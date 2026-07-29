# Mobile App — UX Requirements
**Project:** VF Concept Store — Fashion Retail Reimagined
**Document type:** UX Requirements
**Status:** Draft
**Last updated:** 2026-07-29

---

## Table of Contents
1. [Overview](#1-overview)
2. [Scope](#2-scope)
3. [User Roles](#3-user-roles)
4. [Feature Requirements](#4-feature-requirements)
   - [F-01 Store Entry & Authentication](#f-01-store-entry--authentication)
   - [F-02 Product Discovery & Personalization Browsing](#f-02-product-discovery--personalization-browsing)
   - [F-03 Fashion Studio — Garment Preview & Configuration](#f-03-fashion-studio--garment-preview--configuration)
   - [F-04 Garment Configuration & Checkout](#f-04-garment-configuration--checkout)
   - [F-05 Real-Time Order Progress](#f-05-real-time-order-progress)
   - [F-06 Notification & Vault Ready](#f-06-notification--vault-ready)
   - [F-07 Digital Product Passport](#f-07-digital-product-passport)
   - [F-08 Vault Collection](#f-08-vault-collection)
   - [F-09 Vault Return Flow](#f-09-vault-return-flow)
   - [F-10 Loyalty & Engagement](#f-10-loyalty--engagement)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Out of Scope](#6-out-of-scope)
7. [Open Questions](#7-open-questions)

---

## 1. Overview

The VF Concept Store mobile app is the primary digital touchpoint for customers visiting the SAP × VF S.Home Store. It orchestrates the end-to-end in-store experience — from authenticated entry through personalized product creation to vault pickup — and serves as the post-purchase home for the Digital Product Passport.

The app replaces traditional cashier and front-of-house interactions with a seamless, unmanned self-service experience underpinned by the SAP technology ecosystem (Commerce Cloud, Customer Data Cloud, Business AI Platform, S/4HANA Retail).

---

## 2. Scope

This document covers UX requirements for the **mobile app** only. In-store touchscreens, interactive table (Digital Graffiti Wall), kiosk displays, and holographic hardware interfaces are addressed in separate requirement documents.

**In scope:**
- Customer authentication and store entry
- Product discovery and personalization selection
- Fashion Studio — garment preview, embroidery configuration, and magazine cover generation
- Checkout and payment
- Real-time order tracking
- Push notifications and vault ready alerts
- Digital Product Passport viewer
- Vault collection (QR/unlock code)
- Vault return initiation
- Loyalty points and engagement messaging

---

## 3. User Roles

| Role | Description |
|------|-------------|
| **Standard Member** | Registered app user with access to standard store features and product personalization |
| **Premium Member** | Elevated tier with exclusive access to the Fashion Vault product showcase, premium product drops, and priority service |
| **Guest / Unregistered** | Not supported — store entry requires an authenticated account |

---

## 4. Feature Requirements

---

### F-01 Store Entry & Authentication

**Description:**
The app is the gate to the unmanned store. Customers must authenticate and scan a QR code to unlock the store entrance.

**User Stories:**
- As a member, I want to open the app and see a clear entry screen so I can quickly access the store.
- As a member, I want to scan a QR code at the door so I can enter without queuing at a reception desk.
- As a returning member, I want my session to be remembered so I am not prompted to log in every visit.

**Functional Requirements:**
- FR-01.1: The app shall support email/password and social login (OAuth 2.0).
- FR-01.2: The app shall support biometric authentication (Face ID / fingerprint) as a returning-session shortcut.
- FR-01.3: Upon successful authentication, the app shall display a scannable entry QR code on the home screen.
- FR-01.4: The entry QR code shall be time-limited (e.g. 60 seconds) and regenerate automatically.
- FR-01.5: The app shall display the member tier (Standard / Premium) visibly on the entry screen.
- FR-01.6: Failed authentication must surface a clear error state with recovery options (forgot password, support contact).

**UX Notes:**
- Entry screen should be optimized for one-handed use and quick scanning — minimal UI chrome.
- The QR code should have high contrast and be large enough to scan at arm's length.

---

### F-02 Product Discovery & Personalization Browsing

**Description:**
Customers browse the product catalog in-app, discover available garments, and explore personalization options before interacting with in-store displays.

**User Stories:**
- As a customer, I want to browse available products in the store so I can plan my personalization experience.
- As a customer, I want to see which personalization options (embroidery, print, patches) are available per product.
- As a premium member, I want to see exclusive vault products that are not accessible to standard members.

**Functional Requirements:**
- FR-02.1: The app shall display a real-time, inventory-aware product catalog sourced from SAP Commerce Cloud.
- FR-02.2: Each product listing shall show available sizes, colors, and personalization types.
- FR-02.3: Out-of-stock items shall be clearly flagged and hidden from the add-to-cart flow.
- FR-02.4: Premium-exclusive products shall be visually distinguished and locked/hidden for standard members.
- FR-02.5: AI-powered styling recommendations (from SAP Product Recommendation) shall be surfaced as a "Recommended for You" section.
- FR-02.6: Products shall be filterable by category, personalization type, and size.

**UX Notes:**
- Product cards should prominently surface the personalization CTA ("Personalize this item") rather than a generic "Add to Cart."
- Avoid showing unavailable personalization options — only surface what the current in-store setup supports at that time.

---

### F-03 Fashion Studio — Garment Preview & Configuration

**Description:**
Before committing to a design, customers preview their personalized garment on a static 3D model within the app, adjust thread colors and embroidery placement, and optionally generate an AI Fashion Magazine Cover. Virtual try-on is an in-store holographic experience (D-02 Proto Luma) — not an in-app feature.

**User Stories:**
- As a customer, I want to see my chosen design previewed on a 3D garment model so I can confirm it looks right before paying.
- As a customer, I want to adjust the embroidery placement and thread colors in real time so I can fine-tune my design.
- As a customer, I want to generate a personalized magazine cover with my look so I can share it on social media.

**Functional Requirements:**
- FR-03.1: Embroidery placement (chest, back, sleeve) shall be selectable via an interactive garment diagram with real-time preview on a 3D model.
- FR-03.2: Thread color options shall be displayed as swatches with real-time preview updates on the garment model.
- FR-03.3: The app shall support saving or sharing a screenshot of the garment preview.
- FR-03.4: The AI Fashion Magazine Cover generator shall produce a styled editorial image combining the customer's photo and chosen garment.
- FR-03.5: Generated magazine cover images shall be downloadable and shareable directly from the app.

**UX Notes:**
- Thread color swatches should match real Pantone/thread color codes used by the Tajima embroidery machine to avoid expectation mismatch.
- Magazine cover generation should set clear expectations on processing time (progress indicator + estimated wait).
- Virtual try-on (AR) is handled by the Proto Luma in-store (D-02) — do not replicate that experience in-app.

---

### F-04 Garment Configuration & Checkout

**Description:**
The final confirmation step where the customer locks in all garment choices and completes payment before the automated production process begins.

**User Stories:**
- As a customer, I want to review my full order (garment, size, design, placement, thread colors) on one screen before paying.
- As a customer, I want to pay via multiple methods (card, mobile wallet) so I can use whichever is most convenient.
- As a customer, I want a clear confirmation that my order has been placed and production is starting.

**Functional Requirements:**
- FR-04.1: The order summary screen shall display: garment name, size, color, embroidery design preview, placement, thread colors, and total price.
- FR-04.2: The app shall support payment via credit/debit card, Apple Pay, Google Pay, and any retailer loyalty wallet.
- FR-04.3: Payment processing shall integrate with SAP Customer Checkout / Payfree.
- FR-04.4: On successful payment, the app shall transition immediately to the order progress screen (F-05).
- FR-04.5: A failed payment must return the customer to the payment screen with a clear error and retry option — the garment configuration must not be lost.
- FR-04.6: The app shall display an estimated completion time after order placement.

**UX Notes:**
- This is the highest-stakes screen in the flow — keep it clean, with one primary CTA ("Confirm & Pay"). Avoid distracting elements.
- Show the embroidery design preview thumbnail prominently so the customer can do a final visual check.

---

### F-05 Real-Time Order Progress

**Description:**
After checkout, customers can follow the automated production process live — from RFID retrieval through embroidery to vault storage — via the app.

**User Stories:**
- As a customer, I want to watch my order being processed so the wait feels engaging rather than passive.
- As a customer, I want to see a live camera feed of my embroidery being stitched so I feel connected to the creation.
- As a customer, I want to know how much longer the process will take so I can decide whether to stay in-store or leave.

**Functional Requirements:**
- FR-05.1: The app shall display a step-by-step progress indicator reflecting the 14-step production journey (Retrieval → Hooping → Embroidery → QC → Packing → Vault).
- FR-05.2: The current active step shall be highlighted; completed steps shall be visually marked as done.
- FR-05.3: The app shall stream or display captured images/video of the embroidery process in real time (sourced from in-machine cameras).
- FR-05.4: A dynamic estimated time remaining shall be displayed and updated as each step completes.
- FR-05.5: The progress screen shall be accessible from the app home screen / persistent notification while the order is active.
- FR-05.6: If a production error occurs, the app shall notify the customer with a clear message and staff contact option.

**UX Notes:**
- The live embroidery view is a key emotional differentiator — give it visual prominence. Consider a "theater mode" full-screen view.
- Progress steps should use plain language (e.g., "Your garment is being embroidered") not internal system labels.

---

### F-06 Notification & Vault Ready

**Description:**
When production is complete and the item has been placed in the vault, the customer receives a push notification with everything they need to collect their order.

**User Stories:**
- As a customer, I want to receive a push notification when my order is ready so I know when to collect it.
- As a customer, I want the notification to contain my locker number and QR code so I can collect my order without opening multiple screens.

**Functional Requirements:**
- FR-06.1: The app shall send a push notification when the order status transitions to "Vault Ready."
- FR-06.2: The notification shall include: locker number, QR/unlock code, and a deep link directly to the collection screen.
- FR-06.3: The in-app notification screen shall display the Digital Product Passport preview, embroidery video, and receipt alongside the collection QR.
- FR-06.4: The QR/unlock code shall remain valid until the item is collected (no expiry until pickup).
- FR-06.5: The app shall support email fallback for customers who have push notifications disabled, via SAP Emarsys.

**UX Notes:**
- The "ready" moment is a premium brand moment — the notification design and in-app landing screen should feel like a luxury unboxing reveal, not a generic order alert.

---

### F-07 Digital Product Passport

**Description:**
Each personalized product receives a permanent Digital Product Passport (DPP) accessible via the app — containing authentication, craftsmanship details, embroidery media, materials, and sustainability information.

**User Stories:**
- As a customer, I want to view my product's passport in the app so I can see the story behind its creation.
- As a customer, I want to watch the embroidery video of my product being made so I can relive the experience.
- As a customer, I want to share my product's story on social media so I can show others my unique piece.

**Functional Requirements:**
- FR-07.1: Each order shall generate a unique Digital Product Passport linked to the customer's account.
- FR-07.2: The DPP shall contain: product name, garment details, embroidery artwork image, craftsmanship narrative, embroidery video, materials breakdown, and sustainability data.
- FR-07.3: The DPP shall include an authenticity certificate with a unique product ID (sourced from SAP S/4HANA Retail).
- FR-07.4: The DPP shall be shareable via a public link (web) that does not require app installation to view.
- FR-07.5: Embroidery photos and video shall be viewable inline within the DPP and downloadable.
- FR-07.6: The DPP shall be permanently accessible in the customer's order history — it must not expire.

**UX Notes:**
- Design the DPP as a storytelling experience, not an invoice. Think editorial layout — large imagery, narrative text, video autoplay (muted by default).
- The public share link should render as a beautiful, branded web page that works well as a social media preview card.

---

### F-08 Vault Collection

**Description:**
The customer uses the app to open their assigned vault compartment and collect their order.

**User Stories:**
- As a customer, I want to scan a QR code at the vault so my locker opens automatically.
- As a customer, I want a fallback option (manual unlock code) in case QR scanning fails.

**Functional Requirements:**
- FR-08.1: The app shall display a scannable QR code on the collection screen for vault door activation.
- FR-08.2: A numeric unlock code shall be displayed alongside the QR as a fallback.
- FR-08.3: Upon successful collection (vault door opened and closed), the app shall confirm pickup and trigger loyalty points (F-10).
- FR-08.4: The collection screen shall clearly indicate the locker number and its physical location in the store.
- FR-08.5: If the QR scan fails, the app shall surface the unlock code prominently with instructions.

**UX Notes:**
- The collection screen should be the most streamlined screen in the app — large QR, locker number, single instruction. No distractions.

---

### F-09 Vault Return Flow

**Description:**
Customers who wish to return a purchase can deposit the item back into the vault via the app, initiating the return/exchange workflow in SAP.

**User Stories:**
- As a customer, I want to initiate a return from the app so I can deposit my item in the vault without speaking to staff.
- As a customer, I want to see my refund status in the app so I know when to expect my money back.

**Functional Requirements:**
- FR-09.1: The app shall provide a "Return Item" flow accessible from the order history.
- FR-09.2: The return flow shall assign the customer a vault locker for deposit and display the locker number and QR.
- FR-09.3: After the item is deposited, the app shall display a confirmation and initiate the SAP return/refund workflow.
- FR-09.4: Optional AI vision verification result (pass/fail) shall be surfaced to the customer after deposit if available.
- FR-09.5: The app shall display refund/exchange status and estimated timeline after the return is confirmed.
- FR-09.6: The return flow shall respect the retailer's return policy rules (e.g., personalized items may be non-returnable — this must be communicated clearly before initiating).

**UX Notes:**
- If personalized items are non-returnable, surface this policy prominently at the start of the return flow — not as a dead end at the end.

---

### F-10 Loyalty & Engagement

**Description:**
The app surfaces loyalty points, rewards, and brand engagement moments throughout the customer journey to deepen the relationship with the brand.

**User Stories:**
- As a customer, I want to see my loyalty points balance in the app so I can track my rewards.
- As a customer, I want to receive a personalized thank-you after my purchase so the experience feels valued.
- As a premium member, I want to be notified of exclusive drops and vault events so I can take advantage of member benefits.

**Functional Requirements:**
- FR-10.1: The app shall display the customer's current loyalty points balance and tier on the home/profile screen.
- FR-10.2: Points shall be awarded automatically after each completed purchase and reflected in real time.
- FR-10.3: A thank-you message shall be triggered via SAP Emarsys after vault collection, personalized to the customer's name and product.
- FR-10.4: Premium members shall receive push notifications for exclusive product drops and vault access events.
- FR-10.5: The app shall surface a shareable "loyalty milestone" moment (e.g., "You've reached Gold status") when a tier threshold is crossed.

**UX Notes:**
- Loyalty messaging should feel like a brand gesture, not a points ledger. Lead with the emotional message; the points number is secondary.

---

## 5. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | App launch to entry QR code displayed in ≤ 2 seconds on mid-range devices |
| NFR-02 | Performance | Garment preview updates (thread color / placement changes) in ≤ 500 ms |
| NFR-03 | Reliability | Real-time order progress shall degrade gracefully (polling fallback if WebSocket fails) |
| NFR-04 | Accessibility | All screens shall meet WCAG 2.1 AA contrast and tap target size standards |
| NFR-05 | Offline | Entry QR code must be cacheable for ≤ 5 minutes to handle brief connectivity loss in-store |
| NFR-06 | Security | Vault QR codes and unlock codes shall be single-use after collection is confirmed |
| NFR-07 | Localisation | App shall support internationalisation (i18n) for at minimum EN, DE, FR at launch |
| NFR-08 | Platform | App shall support iOS 16+ and Android 13+ |

---

## 6. Out of Scope

The following are explicitly **not** covered in this document:

- In-store Digital Graffiti Wall interactive canvas (separate requirements document)
- In-store AI Fashion Cover kiosk UI (separate requirements document)
- Endless Aisle / AI styling in-store display (separate requirements document)
- Virtual try-on — this is an in-store holographic experience via the Proto Luma (D-02), not a mobile app feature
- SAP backend system architecture and API specifications
- Robotic and RFID hardware integration specifications
- Staff / admin-facing app or store management portal

---

## 7. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-01 | Will personalized items be eligible for return? What is the return policy for embroidered garments? | Business / Legal | Open |
| OQ-02 | What is the maximum embroidery design queue size, and how does the app communicate delays beyond the estimated time? | Operations | Open |
| OQ-03 | Is the AI magazine cover generation (F-03) processed on-device, on SAP Business AI Platform, or a third-party service? What are latency expectations? | Architecture | Open |
| OQ-04 | Which payment providers are supported at launch (Payfree confirmed — others TBC)? | Payments / Business | Open |
| OQ-05 | Will the Digital Product Passport public link require the customer to authenticate, or is it fully public? | Privacy / Legal | Open |
| OQ-06 | What is the Premium member tier entry criteria, and is tier status managed in SAP Customer Data Cloud? | CRM / Business | Open |
| OQ-07 | Are real-time embroidery camera feeds streamed directly or delivered as periodic snapshots? What are the data/privacy implications? | Architecture / Legal | Open |