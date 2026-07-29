# Project Handoff — O11 by VF Concept Store
**Prepared:** 2026-07-29
**Purpose:** Context for a new agent session to continue where the previous session left off.

---

## Project in One Line

UX requirements and design system for the **O11 by VF Concept Store** — a 148 m² unmanned luxury fashion retail space powered by SAP (Commerce Cloud, Customer Data Cloud, S/4HANA, Business AI Platform). The store features robotic embroidery, AI art generation, a Fashion Vault, holographic displays, and a Digital Product Passport.

---

## Repository

- **GitHub:** https://github.tools.sap/D064668/VFConcept_Store (private, SAP internal)
- **Branch:** `main`
- **Local working directory:** `VFConcept_Store/`
- **File browsing:** VS Code (open repo folder)
- **Workflow:** Joule pushes via MCP. Run `git pull --rebase origin main` to sync locally.

---

## Document Status

| File | Status | Notes |
|---|---|---|
| `README.md` | ✅ Current | Updated 2026-07-29 |
| `agent.md` | ✅ Current | v2.4.0 |
| `project-summary.md` | ✅ Written | Full project overview |
| `mobile-app-requirements.md` | ✅ Current | F-03 corrected 2026-07-29 — no in-app AR try-on |
| `in-store-displays-requirements.md` | ✅ Current | D-02 confirmed Proto Luma Hologram 2026-07-29 |
| `digital-product-passport-requirements.md` | ✅ Complete draft | P-01 to P-06 |
| `cross-cutting-requirements.md` | ✅ Complete draft | X-01 to X-03 |
| `design-system/design-tokens.md` | 📍 Stub | Fill when design/prototype work begins |
| `design-system/component-rules.md` | 📍 Stub | Fill when design/prototype work begins |
| `design-system/motion-guide.md` | ✅ Final | Read-only reference |
| `design-system/evaluation-loop.md` | ⏸ On hold | Do not activate until design-tokens.md + component-rules.md filled AND rendered screens exist |
| `handoff.md` | ✅ This file | Updated 2026-07-29 |
| `Reference/VF_Concept_Store_V2_DRAFT.pptx` | ⚠️ Gitignored | 33 MB — local only, restore via OneDrive if missing |

---

## What Happened This Session (2026-07-29)

- **D-02 Proto Luma confirmed** — user provided hardware image. D-02 = Proto Luma Hologram (large cabinet + top-mounted camera bar).
- **F-03 corrected** — removed in-app AR virtual try-on. Try-on is in-store D-02 Proto Luma only. F-03 is now "Garment Preview & Configuration" (3D model, thread colours, magazine cover).
- **Virtual try-on** added to Out of Scope in `mobile-app-requirements.md`.
- **HTML dashboard removed** — VS Code replaces it.
- **evaluation-loop.md** added to `design-system/` but marked on hold until design system stubs are filled.
- **Workflow locked in:** Joule pushes via MCP; user runs `git pull --rebase origin main` to sync.

---

## Standing Rules (quick ref — full detail in `agent.md`)

1. **Pre-push quality loop** — 5 checks before every `git push`
2. **Token-First** — no hardcoded visual values, always `var(--token-name)`
3. **Brand Tone** — luxury, minimal, editorial, dark-first, no exclamation marks in UI copy
4. **agent.md is a living doc** — update proactively as project scope deepens

---

## Source of Truth — The PowerPoint

`Reference/VF_Concept_Store_V2_DRAFT.pptx` (local only, gitignored, 33 MB).

| Slide | Content |
|---|---|
| Slide 3 | Technology Ecosystem — SAP stack, AI Fashion display (Endless aisle) |
| Slide 9 | Experience #5: AI Fashion Cover, Virtual Try-On & Holograms — source for D-01, D-02, D-03 |
| Other slides | Vault mechanics, robotic embroidery, Digital Product Passport |

Virtual try-on on slide 9 = in-store hologram (D-02), not mobile app.

---

## Design System

Stubs in `design-system/`. Full token + component content in `Skills/o11-ux-design-system/`. Fill stubs before any prototype or evaluation-loop work begins.

---

## Immediate Next Actions

1. **Fill design system** — `design-tokens.md` and `component-rules.md` stubs (unblocks evaluation-loop)
2. **Continue requirements** — vault hardware spec, robotic embroidery integration, staff/ops portal
3. **Resolve open questions** — 14 open in `agent.md` registry
4. **PPTX review** — confirm which slide covers Digital Product Passport

---

## Quick Reference — Document IDs

| Area | Feature IDs |
|---|---|
| Mobile app | F-01 to F-10 |
| In-store displays | D-01 (Graffiti Wall), D-02 (AI Cover Kiosk — **Proto Luma Hologram**), D-03 (Endless Aisle) |
| Digital Product Passport | P-01 to P-06 |
| Cross-cutting | X-01 (Loyalty), X-02 (Tier differentiation), X-03 (Accessibility/Error handling) |

---

## Key Gotchas

- **D-02 IS a Proto Luma Hologram** — confirmed 2026-07-29. Do not change this.
- **Virtual try-on is in-store only** — D-02 Proto Luma. Not in the mobile app. F-03 corrected.
- **evaluation-loop on hold** — activate only after design system stubs filled + rendered screens exist.
- **Remote is SAP GitHub** — `https://github.tools.sap/D064668/VFConcept_Store`
- **PPTX is gitignored** — local only, restore from OneDrive if missing
- **No HTML dashboard** — removed; use VS Code Explorer
