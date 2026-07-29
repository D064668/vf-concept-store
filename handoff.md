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
- **Note:** Remote is SAP GitHub — not github.com. Joule pushes via MCP; run `git pull --rebase origin main` to sync locally.

---

## Document Status

| File | Status | Notes |
|---|---|---|
| `README.md` | ✅ Current | Updated 2026-07-29 — VS Code workflow, Proto Luma noted |
| `agent.md` | ✅ Current | v2.3.0 — dashboard removed, rules streamlined |
| `project-summary.md` | ✅ Written | Full project overview |
| `mobile-app-requirements.md` | ✅ Complete draft | F-01 to F-10 |
| `in-store-displays-requirements.md` | ✅ Current | D-02 confirmed as Proto Luma Hologram 2026-07-29 |
| `digital-product-passport-requirements.md` | ✅ Complete draft | P-01 to P-06 |
| `cross-cutting-requirements.md` | ✅ Complete draft | X-01 to X-03 |
| `design-system/design-tokens.md` | 📍 Stub | Fill when design/prototype work begins |
| `design-system/component-rules.md` | 📍 Stub | Fill when design/prototype work begins |
| `design-system/motion-guide.md` | ✅ Final | Read-only reference |
| `design-system/evaluation-loop.md` | ✅ Added | Blind adversarial eval — activate when rendered screens exist |
| `handoff.md` | ✅ This file | Updated 2026-07-29 |
| `Reference/VF_Concept_Store_V2_DRAFT.pptx` | ⚠️ Gitignored | 33 MB — local only, restore via OneDrive if missing |

---

## What Happened This Session (2026-07-29)

- **D-02 Proto Luma confirmed** — user provided hardware image. D-02 is Proto Luma Hologram (large cabinet + top-mounted camera bar). All docs updated.
- **HTML dashboard removed** — replaced by VS Code for file browsing. `project-dashboard.html` and `_build_dashboard.py` are gone. Rule 1 (Dashboard Sync) removed from `agent.md`.
- **evaluation-loop.md added** to `design-system/` and wired into `agent.md` Skill Routing.
- **Workflow locked in:** Joule pushes via MCP; user runs `git pull --rebase origin main` to sync.

---

## Standing Rules (quick ref — full detail in `agent.md`)

1. **Pre-push quality loop** — 5 checks before every `git push` (Rule 1 in agent.md)
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

Always verify requirement claims against the PPTX. Flag inferences explicitly.

---

## Design System

Stubs live in `design-system/`. Motion reference at `design-system/motion-guide.md`. Full token + component content in `Skills/o11-ux-design-system/`. Fill stubs when design/prototype work begins.

---

## Immediate Next Actions

1. **Continue requirements** — vault hardware spec, robotic embroidery integration, staff/ops portal, SAP architecture
2. **Fill design-system stubs** — `design-tokens.md` and `component-rules.md` when prototype work starts
3. **Resolve open questions** — 14 open in `agent.md` registry
4. **PPTX review** — confirm which slide covers Digital Product Passport

---

## Quick Reference — Document IDs

| Area | Feature IDs |
|---|---|
| Mobile app | F-01 to F-10 |
| In-store displays | D-01 (Graffiti Wall), D-02 (AI Cover Kiosk — **Proto Luma Hologram**, confirmed), D-03 (Endless Aisle) |
| Digital Product Passport | P-01 to P-06 |
| Cross-cutting | X-01 (Loyalty), X-02 (Tier differentiation), X-03 (Accessibility/Error handling) |

---

## Key Gotchas

- **D-02 IS a Proto Luma Hologram** — confirmed 2026-07-29 with hardware image. Do not change this.
- **Remote is SAP GitHub** — `https://github.tools.sap/D064668/VFConcept_Store` not github.com
- **PPTX is gitignored** — 33 MB, local only; restore from OneDrive if missing
- **No HTML dashboard** — removed 2026-07-29; use VS Code Explorer instead
- **Joule pushes via MCP** — run `git pull --rebase origin main` to sync local copy
