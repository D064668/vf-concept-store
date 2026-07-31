# Project Handoff — O11 by VF Concept Store
**Prepared:** 2026-07-31
**Purpose:** Context for a new agent session to continue where the previous session left off.

---

## Project in One Line

UX requirements and design system for the **O11 by VF Concept Store** — a 148 m² unmanned luxury fashion retail space powered by SAP.

---

## Repository

- **GitHub:** https://github.tools.sap/D064668/VFConcept_Store (private, SAP internal)
- **Branch:** `main`
- **File browsing:** VS Code
- **Workflow:** Joule pushes via MCP. Run `git pull --rebase origin main` to sync locally.

---

## Document Status

| File | Status | Notes |
|---|---|---|
| `README.md` | ✅ Current | Updated 2026-07-31 |
| `agent.md` | ✅ Current | v2.5.0 — trimmed to <200 lines, token-change workflow added |
| `project-summary.md` | ✅ Written | Full project overview |
| `mobile-app-requirements.md` | ✅ Current | F-03 corrected — no in-app AR try-on |
| `in-store-displays-requirements.md` | ✅ Current | D-02 confirmed Proto Luma Hologram |
| `digital-product-passport-requirements.md` | ✅ Complete draft | P-01 to P-06 |
| `cross-cutting-requirements.md` | ✅ Complete draft | X-01 to X-03 |
| `design-system/design-tokens.md` | ✅ Full content | Merged from Joule skill 2026-07-31 |
| `design-system/component-rules.md` | ✅ Full content | Merged from Joule skill 2026-07-31 |
| `design-system/motion-guide.md` | ✅ Final | Read-only reference |
| `design-system/evaluation-loop.md` | ⏸ On hold | Activate only after design system filled + rendered screens exist |
| `handoff.md` | ✅ This file | Updated 2026-07-31 |
| `Reference/VF_Concept_Store_V2_DRAFT.pptx` | ⚠️ Gitignored | 35 MB — local only, restore via OneDrive if missing |

---

## What Happened This Session (2026-07-31)

- **Design system merged** — full `design-tokens.md` and `component-rules.md` content moved from Joule Desktop skill into project repo. One source of truth, visible in VS Code.
- **Dashboard removed** — all `_build_dashboard.py` and `project-dashboard.html` references purged from all markdown files.
- **`.gitignore` fixed** — added `Reference/*.pptx` (was missing); removed `_build_dashboard.py`.
- **`agent.md` trimmed** — restructured to stay under 200 lines; token-change workflow added inline.
- **PPTX confirmed readable** — file placed in `Reference/`, Joule can read it when needed.

---

## Standing Rules (quick ref — full detail in `agent.md`)

1. **Pre-Push Quality Loop** — 5 checks before every `git push`
2. **Token-First** — no hardcoded visual values, always `var(--token-name)`
3. **Token-Change Workflow** — identify token → confirm scope → update token first → reference in files
4. **Brand Tone** — luxury, minimal, editorial, dark-first, no exclamation marks in UI copy

---

## Key Gotchas

- **D-02 IS a Proto Luma Hologram** — confirmed 2026-07-29. Do not change this.
- **Virtual try-on is in-store only** — D-02 Proto Luma. Not in the mobile app.
- **evaluation-loop on hold** — activate only after design system filled + rendered screens exist.
- **Remote is SAP GitHub** — `https://github.tools.sap/D064668/VFConcept_Store`
- **PPTX is gitignored** — local only, restore from OneDrive if missing.

---

## Immediate Next Actions

1. **Delete `o11-ux-design-system` Joule skill** — design system now lives in repo; skill is redundant
2. **Continue requirements** — vault hardware spec, robotic embroidery integration, staff/ops portal
3. **Resolve open questions** — 14 open in `agent.md` registry
4. **PPTX review** — confirm which slide covers Digital Product Passport

---

## Quick Reference — Document IDs

| Area | Feature IDs |
|---|---|
| Mobile app | F-01 to F-10 |
| In-store displays | D-01 (Graffiti Wall), D-02 (**Proto Luma Hologram**), D-03 (Endless Aisle) |
| Digital Product Passport | P-01 to P-06 |
| Cross-cutting | X-01 (Loyalty), X-02 (Tier differentiation), X-03 (Accessibility) |