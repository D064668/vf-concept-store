# Digital Product Passport — UX Requirements
**Project:** VF Concept Store — Fashion Retail Reimagined
**Document type:** UX Requirements
**Status:** Draft
**Last updated:** 2026-07-16

---

## Table of Contents
1. [Overview](#1-overview)
2. [Scope](#2-scope)
3. [Access Points](#3-access-points)
4. [Feature Requirements](#4-feature-requirements)
   - [P-01 Passport Entry & Hero Experience](#p-01-passport-entry--hero-experience)
   - [P-02 Craftsmanship Story](#p-02-craftsmanship-story)
   - [P-03 Embroidery Video & Media Gallery](#p-03-embroidery-video--media-gallery)
   - [P-04 Materials & Sustainability](#p-04-materials--sustainability)
   - [P-05 Authenticity Certificate](#p-05-authenticity-certificate)
   - [P-06 Social Sharing & Public Link](#p-06-social-sharing--public-link)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Out of Scope](#6-out-of-scope)
7. [Open Questions](#7-open-questions)

---

## 1. Overview

The Digital Product Passport (DPP) is a permanent, immersive digital companion for every personalized garment created in the VF Concept Store. It transforms a transaction into a story — documenting the product's journey from customer sketch through AI art generation, robotic embroidery, quality verification, and final delivery.

The DPP is not an invoice or order receipt. It is a **storytelling experience** — editorial in tone, rich in media, and designed to be shared. It serves three purposes:

1. **Emotional connection** — relive the creation experience, build attachment to the product
2. **Authenticity** — prove provenance, verify the item is genuine O11 by VF
3. **Sustainability transparency** — disclose materials, sourcing, and environmental impact

---

## 2. Scope

This document covers the UX for the complete Digital Product Passport experience as accessed through the mobile app and as a standalone public web page.

**In scope:**
- DPP layout and content sections (hero, story, video, materials, auth, sharing)
- In-app DPP viewer (within order history)
- Public shareable web page version
- Social media preview card rendering
- NFC/QR trigger from the physical garment

**Out of scope:**
- Mobile app checkout flow (see `mobile-app-requirements.md`)
- Backend data pipeline from embroidery system to DPP (engineering)
- SAP S/4HANA product data integration (architecture)

---

## 3. Access Points

The DPP can be accessed via multiple entry points:

| Entry Point | Context | Behavior |
|---|---|---|
| Mobile app → Order History → product | Authenticated owner | Full DPP with all media, edit/share controls |
| Push notification deep link (post-collection) | Authenticated owner | Opens directly to DPP hero |
| QR code on physical garment tag/label | Anyone | Opens public DPP web page (read-only, no edit) |
| NFC tap on embedded garment chip | Anyone | Opens public DPP web page |
| Shared link (social media, messaging) | Anyone | Opens public DPP web page |

---

## 4. Feature Requirements

---

### P-01 Passport Entry & Hero Experience

**Description:**
The DPP opens with a full-bleed cinematic hero that sets the editorial tone. This is the first impression — it must feel like opening a luxury lookbook, not viewing an order status page.

**User Stories:**
- As a product owner, I want the passport to open with a beautiful, immersive hero so it feels like a premium brand experience.
- As a viewer (shared link), I want to immediately understand what this product is and who made it.

**Functional Requirements:**
- FR-P01.1: The hero shall display a full-bleed image or looping video of the finished garment, using Pattern 4 (clip-path image reveal) as the entrance animation.
- FR-P01.2: The product name shall be rendered in `--text-display` / `--font-display` — the only screen in the app where display typography is used for content.
- FR-P01.3: Below the hero, a concise tagline shall summarize the product (e.g., "One-of-one. Embroidered by robot. Designed by you.").
- FR-P01.4: A scroll indicator shall signal that more content exists below the fold.
- FR-P01.5: The hero image/video shall be the final QC-approved product photo captured by the in-store camera system.
- FR-P01.6: Entry via NFC/QR from the garment shall bypass app navigation and land directly on this hero.

**UX Notes:**
- This screen uses `--motion-reveal` entrance (600ms) with a slight gold glow pulse (`--shadow-gold`) around the hero edge — a premium moment.
- No navigation chrome on the hero. The back button appears only after first scroll.
- The hero must feel like a magazine spread, not an app screen.

---

### P-02 Craftsmanship Story

**Description:**
A narrative section that tells the story of how this specific garment was made — from the customer's original sketch through AI interpretation to robotic embroidery. Written in editorial voice, not technical language.

**User Stories:**
- As a product owner, I want to read the story of how my garment was created so I can appreciate the craftsmanship behind it.
- As a viewer, I want to understand the unique creation process so I see why this item is special.

**Functional Requirements:**
- FR-P02.1: The story shall include a timeline of creation steps with timestamps:
  - Customer sketch (original drawing from Graffiti Wall)
  - AI interpretation (the embroidery-ready artwork)
  - Embroidery start time
  - Embroidery completion time
  - Quality verification result
  - Vault placement time
- FR-P02.2: Each timeline step shall include a thumbnail image (where available) from the production cameras.
- FR-P02.3: The original customer sketch and the final AI-generated artwork shall be displayed side-by-side for comparison.
- FR-P02.4: Narrative text shall be written in editorial voice (e.g., "Your design was brought to life by a Tajima embroidery head, stitching 12,400 passes over 18 minutes.").
- FR-P02.5: The timeline shall use Pattern 1 (Hero Entrance) stagger when first scrolled into view — each step cascading in.

**UX Notes:**
- This section should read like a feature article, not a log file. Lead with emotion, support with data.
- The side-by-side sketch vs. AI interpretation is a key "wow" moment — give it visual prominence.
- Use `--text-body-lg` for narrative paragraphs, `--text-caption` for timestamps.

---

### P-03 Embroidery Video & Media Gallery

**Description:**
The captured video of the embroidery process — filmed by the in-machine cameras during production — is a key differentiator. The DPP includes the full video plus any progress photos taken during the production journey.

**User Stories:**
- As a product owner, I want to watch the video of my item being embroidered so I can relive the experience.
- As a product owner, I want to download the video to share on my own social channels.
- As a viewer, I want to see the craftsmanship in action so I understand the quality.

**Functional Requirements:**
- FR-P03.1: The embroidery video shall be displayed as a prominent inline player with custom controls (play/pause, scrub, mute, fullscreen).
- FR-P03.2: Video controls shall use `--color-accent-gold` for the play button and progress bar fill.
- FR-P03.3: The video shall autoplay muted when scrolled into view (respecting `prefers-reduced-motion`).
- FR-P03.4: A "Download Video" button shall save the video to the device (Secondary button style).
- FR-P03.5: A thumbnail gallery below the video shall show production stills (hooping, embroidery in progress, QC, packing) — tappable to view full-screen.
- FR-P03.6: The media gallery shall use Pattern 6 (Staggered Lists) for thumbnail entrance animation.

**UX Notes:**
- The video player should feel cinematic — dark surround, generous padding, `--shadow-modal` depth.
- Video is the most shareable asset in the DPP — make the download/share action easily findable without cluttering the viewing experience.

---

### P-04 Materials & Sustainability

**Description:**
Transparency section disclosing the materials used, their sourcing, and the environmental profile of the garment. This fulfills the EU Digital Product Passport regulation requirements while maintaining the editorial brand voice.

**User Stories:**
- As a customer, I want to know what materials my garment is made from so I can make informed choices.
- As a sustainability-conscious buyer, I want to see the environmental impact data so I can trust the brand's claims.

**Functional Requirements:**
- FR-P04.1: The materials section shall list all primary materials with their composition percentages and sourcing origin.
- FR-P04.2: Thread colors used in embroidery shall be listed with color swatches and thread brand/type.
- FR-P04.3: A sustainability score or rating (if provided by the brand) shall be displayed as a visual indicator, not just a number.
- FR-P04.4: Certifications (e.g., OEKO-TEX, GRS, organic) shall be displayed as badge icons with tap-to-learn-more detail.
- FR-P04.5: A "Recycled content" percentage shall be highlighted if applicable.
- FR-P04.6: Care instructions shall be included in an expandable section at the bottom of materials.
- FR-P04.7: This section shall use the Sage Feature Card style (`--color-bg-sage` background) to visually distinguish it from the narrative sections.

**UX Notes:**
- This section must be **transparent but not overwhelming**. Lead with 3–4 headline facts, then expand for detail.
- Use iconography heavily here — fiber type icons, origin country flags, certification logos.
- Don't hide sustainability behind a link. It should be visible on scroll without requiring extra taps.

---

### P-05 Authenticity Certificate

**Description:**
A unique digital certificate proving this specific garment was created in the VF Concept Store, with a verifiable product ID linked to SAP S/4HANA Retail.

**User Stories:**
- As a product owner, I want proof that my item is an authentic O11 piece so I can verify its provenance.
- As a potential resale buyer, I want to verify authenticity without needing the original owner's account.

**Functional Requirements:**
- FR-P05.1: The certificate shall display a unique product ID (alphanumeric, human-readable).
- FR-P05.2: The certificate shall include: date of creation, store location, production method (robotic embroidery), and customer first name (or "Anonymous" if opted out).
- FR-P05.3: A "Verify" action shall validate the product ID against the SAP backend and display a verified/unverified status.
- FR-P05.4: The verified state shall display with Premium chip styling (`--color-accent-gold-subtle` background, `--color-accent-gold` text, `--shadow-gold` glow).
- FR-P05.5: The certificate shall be visually styled as a formal document — centered layout, serif display type (`--font-display`), gold border accent.
- FR-P05.6: The certificate shall be downloadable as a standalone image (for printing or sharing).

**UX Notes:**
- The certificate should feel like a luxury authentication card — think watches, fine art, or limited-edition sneakers.
- The "Verify" tap should trigger `--motion-reveal` (600ms) and resolve with a gold checkmark animation.
- Keep the certificate distinct from the rest of the DPP — it's a self-contained artifact within the larger story.

---

### P-06 Social Sharing & Public Link

**Description:**
Every DPP has a public, non-authenticated URL that renders as a beautiful standalone web page. It must work without the app installed and render well as a social media preview card (Open Graph / Twitter Card).

**User Stories:**
- As a product owner, I want to share my DPP link on Instagram/Twitter so my followers can see what I created.
- As a viewer clicking a shared link, I want to see a beautiful, fast-loading page that doesn't require me to install an app.

**Functional Requirements:**
- FR-P06.1: Each DPP shall have a unique public URL (e.g., `passport.o11.vf/p/{product-id}`).
- FR-P06.2: The public page shall render all DPP sections (hero, story, video, materials, certificate) without requiring authentication.
- FR-P06.3: The public page shall not expose the owner's full name or account details — only first name if opted in.
- FR-P06.4: The page shall include Open Graph and Twitter Card meta tags for rich preview cards when shared on social platforms.
- FR-P06.5: The preview card shall show: product hero image, product name, and tagline ("One-of-one. Made in the O11 Concept Store.").
- FR-P06.6: The public page shall include a "Get the app" CTA for viewers who want to create their own.
- FR-P06.7: Page load time for the public URL shall be under 2 seconds on 4G connections.
- FR-P06.8: A "Share" button in the in-app DPP shall offer: copy link, share to Instagram Stories, share to WhatsApp, and native share sheet.

**UX Notes:**
- The public page must be as beautiful as the in-app version — not a stripped-down fallback. Same tokens, same motion, same editorial quality.
- The Open Graph image should be auto-generated from the hero photo — not a generic brand thumbnail.
- The "Get the app" CTA should use Secondary button style — it's available but never pushy.

---

## 5. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-P01 | Performance | DPP in-app load time ≤ 1.5 seconds (including hero image) |
| NFR-P02 | Performance | Public DPP page load ≤ 2 seconds on 4G |
| NFR-P03 | Performance | Embroidery video playback must begin within 1 second of tap/autoplay trigger |
| NFR-P04 | Data persistence | DPP must remain accessible permanently — no expiry, no deletion unless owner requests |
| NFR-P05 | Offline | Core DPP content (text, certificate, hero image) shall be cached for offline viewing in the app |
| NFR-P06 | Accessibility | Video must have captions/alt-text describing the embroidery process for screen readers |
| NFR-P07 | Privacy | Owner may request DPP anonymization (remove name, restrict public link) at any time |
| NFR-P08 | SEO | Public DPP pages shall be indexable by search engines (discoverable product stories) |

---

## 6. Out of Scope

- DPP data pipeline from production cameras to storage (engineering)
- SAP S/4HANA product ID generation and validation API (architecture)
- NFC chip embedding in garments (hardware/manufacturing)
- Blockchain/Web3 authenticity verification (not in scope for V1)
- Resale/transfer-of-ownership flow (future consideration)

---

## 7. Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| OQ-01 | What is the video file format and maximum size? Will it be streamed or fully downloaded? | Architecture / Ops | Open |
| OQ-02 | Is the DPP public URL permanent even if the owner deletes their account? | Legal / Privacy | Open |
| OQ-03 | What data does the EU DPP regulation specifically require vs. what we are including as brand storytelling? | Legal / Compliance | Open |
| OQ-04 | Should the sustainability score use an industry standard (e.g., Higg Index) or a proprietary brand metric? | Sustainability / Business | Open |
| OQ-05 | Can the owner update their DPP after creation (e.g., add a personal note, change visibility)? | Product / UX | Open |