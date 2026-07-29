# Project Handoff — O11 by VF Concept Store
**Prepared:** 2026-07-29
**Purpose:** Context for a new agent session to continue where this session left off.

---

## Project in One Line

UX requirements and design system for the **O11 by VF Concept Store** — a 148 m² unmanned luxury fashion retail space powered by SAP (Commerce Cloud, Customer Data Cloud, S/4HANA, Business AI Platform). The store features robotic embroidery, AI art generation, a Fashion Vault, holographic displays, and a Digital Product Passport.

---

## Repository

- **GitHub:** https://github.tools.sap/D064668/VFConcept_Store (private, SAP internal)
- **Branch:** `main`
- **Local working directory:** `VFConcept_Store/`
- **Note:** Remote is SAP GitHub — not github.com. The remote was misconfigured earlier and is now fixed.

---

## Document Status

| File | Status | Notes |
|---|---|---|
| `README.md` | ✅ Final | Up to date |
| `agent.md` | ✅ Current | Restructured with CLAUDE.md template 2026-07-29 — living doc, update as project deepens |
| `project-summary.md` | ✅ Written | Full project overview — created this session |
| `mobile-app-requirements.md` | ✅ Complete draft | F-01 to F-10 |
| `in-store-displays-requirements.md` | ✅ Fixed | D-02 Proto Hologram error corrected 2026-07-28 |
| `digital-product-passport-requirements.md` | ✅ Complete draft | P-01 to P-06 |
| `cross-cutting-requirements.md` | ✅ Complete draft | X-01 to X-03 |
| `design-system/design-tokens.md` | 📍 Stub | Fill when design/prototype work begins |
| `design-system/component-rules.md` | 📍 Stub | Fill when design/prototype work begins |
| `design-system/motion-guide.md` | ✅ Final | Moved from root this session — read-only reference |
| `project-dashboard.html` | ✅ In repo | Rebuilt and pushed this session — all 11 markdown files + PPTX |
| `handoff.md` | ✅ This file | Updated this session |
| `Reference/VF_Concept_Store_V2_DRAFT.pptx` | ⚠️ Gitignored | 33 MB — local only, restore via OneDrive if missing |

---

## What Happened This Session

### Fixes
- **D-02 Proto Hologram corrected** — removed all three incorrect Proto Hologram references from `in-store-displays-requirements.md` (Display Environments table, hardware tag, description). D-02 is a standard touchscreen kiosk with integrated front-facing camera. Committed and pushed.
- **Git remote fixed** — remote was pointing to `github.com` instead of `github.tools.sap`. Corrected to `https://github.tools.sap/D064668/VFConcept_Store.git`.
- **`git reset --hard` recovery** — local history had diverged from remote; resolved by resetting to remote and re-applying the D-02 fix. PPTX was briefly lost but restored via OneDrive sync.

### New files
- `project-summary.md` — full project overview written from scratch (prior file was a truncated stub)
- `handoff.md` — this file, updated

### Restructuring
- `motion-stack-guide.md` moved to `design-system/motion-guide.md` — motion is part of the design system, not a root-level doc
- `open-questions.md` deleted — per user request
- `_build_dashboard.py` rewritten to include all 11 markdown files, auto-detect file sizes and modified dates, and render correct folder structure in the dashboard sidebar
- `agent.md` restructured with CLAUDE.md template — added Project, Stack, Commands, Always/Never, Where Things Live, Definition of Done, Naming Conventions, Good to Know sections
- `Q3_2026_Progress_Check_Hyun_Lee.html` added to `.gitignore` — personal file, never committed

### Caveman skill
- Installed at `~/.claude/skills/caveman/SKILL.md` — activate with "caveman mode", deactivate with "stop caveman"

---

## Standing Rules (quick ref — full detail in `agent.md`)

1. **Dashboard Sync** — run `python3 _build_dashboard.py` after every markdown change, commit `project-dashboard.html` in the same operation
2. **Token-First** — no hardcoded visual values, always `var(--token-name)`
3. **Brand Tone** — luxury, minimal, editorial, dark-first, no exclamation marks in UI copy
4. **agent.md is a living doc** — update it proactively as the project scope deepens

---

## Source of Truth — The PowerPoint

`Reference/VF_Concept_Store_V2_DRAFT.pptx` (local only, gitignored, 33 MB).

Key slides:
| Slide | Content |
|---|---|
| Slide 3 | Technology Ecosystem — SAP stack, AI Fashion display (Endless aisle) |
| Slide 9 | Experience #5: AI Fashion Cover, Virtual Try-On & Holograms — source for D-01, D-02, D-03 |
| Other slides | Vault mechanics, robotic embroidery, Digital Product Passport |

Always verify requirement claims against the PPTX. Flag inferences explicitly.

---

## Design System

Stubs live in `design-system/`. Motion reference is at `design-system/motion-guide.md`. Token and component content lives in `Skills/o11-ux-design-system/` (skill-based, not yet written into the stubs). Fill the stubs when design/prototype work begins.

---

## Immediate Next Actions

1. **Continue requirements** — next areas to cover: vault hardware spec, robotic embroidery integration details, staff/ops portal, deeper SAP architecture requirements
2. **Fill design-system stubs** — `design-tokens.md` and `component-rules.md` need real content when design/prototype work starts
3. **Open questions** — 14 open questions in `agent.md` (Open Questions Registry) awaiting owner assignment and resolution
4. **PPTX review** — DPP slide number unknown; user to confirm which slide covers Digital Product Passport

---

## Quick Reference — Document IDs

| Area | Feature IDs |
|---|---|
| Mobile app | F-01 to F-10 |
| In-store displays | D-01 (Graffiti Wall), D-02 (AI Cover Kiosk — standard kiosk, NOT hologram), D-03 (Endless Aisle) |
| Digital Product Passport | P-01 to P-06 |
| Cross-cutting | X-01 (Loyalty), X-02 (Tier differentiation), X-03 (Accessibility/Error handling) |

---

## Key Gotchas

- **D-02 is not a hologram** — this was wrong in a prior session, corrected 2026-07-28. Never reintroduce Proto Hologram for D-02.
- **Remote is SAP GitHub** — `https://github.tools.sap/D064668/VFConcept_Store` not github.com
- **PPTX is gitignored** — it's 33 MB and lives locally only; if missing, restore from OneDrive
- **`_build_dashboard.py` is gitignored** — only commit the output `project-dashboard.html`
- **agent.md is a living document** — update it as the project scope deepens, per user instruction
