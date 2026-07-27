# Project Handoff — O11 by VF Concept Store
**Prepared:** 2026-07-27  
**Purpose:** Context for a new agent session to continue where the previous session left off.

---

## Project in One Line

UX requirements and design system for the **O11 by VF Concept Store** — a 148 m² unmanned luxury fashion retail space powered by SAP (Commerce Cloud, Customer Data Cloud, S/4HANA, Business AI Platform). The store features robotic embroidery, AI art generation, a Fashion Vault, holographic displays, and a Digital Product Passport.

---

## Repository

- **GitHub:** https://github.tools.sap/D064668/VFConcept_Store (private)
- **Branch:** `main`
- **Local working directory:** `VFConcept_Store/`

---

## Document Status

| File | Status | Notes |
|---|---|---|
| `README.md` | ✅ Final | Up to date |
| `agent.md` | ✅ Final | Project manager rules — always-active, read before every session |
| `mobile-app-requirements.md` | ✅ Complete draft | 10 features (F-01 to F-10) |
| `in-store-displays-requirements.md` | ⚠️ NEEDS FIX | D-02 section has incorrect Proto Hologram content — see Critical Issues below |
| `digital-product-passport-requirements.md` | ✅ Complete draft | 6 sections (P-01 to P-06) |
| `cross-cutting-requirements.md` | ✅ Complete draft | Loyalty, tier differentiation, accessibility |
| `open-questions.md` | ✅ Up to date | 33 open questions across 6 domains |
| `motion-stack-guide.md` | ✅ Final | Motion/animation reference — read-only |
| `design-system/design-tokens.md` | 📍 Stub | Actual content lives in the `o11-ux-design-system` skill |
| `design-system/component-rules.md` | 📍 Stub | Actual content lives in the `o11-ux-design-system` skill |
| `project-dashboard.html` | ⚠️ Not pushed to GitHub | 78KB file — push separately if needed |
| `Reference/VF_Concept_Store_V2_DRAFT.pptx` | ⚠️ Not pushed to GitHub | 35MB binary — requires Git LFS or CLI push |

---

## ⚠️ CRITICAL: Pending Fix — D-02 Section is Incorrect

The `in-store-displays-requirements.md` file has a **known error in the D-02 section** that was never corrected.

### What happened
1. User asked to note that D-02 uses Proto Hologram hardware
2. AI updated D-02 to reference Proto Hologram throughout
3. User then corrected: **Proto Luma Hologram is NOT part of D-02**
4. D-02 is a **standard camera + screen kiosk** (no hologram)
5. The AI acknowledged the error and offered to revert — but the session moved on and the revert was never applied

### What currently exists (wrong)
The D-02 section currently says:
- `**Hardware:** Proto Hologram (confirmed)`
- "A Proto hologram display with a front-facing camera..."
- "The Proto hologram hardware delivers the magazine cover as a volumetric 3D holographic display..."
- Display Environments table: `AI Fashion Cover Kiosk | **Proto Hologram** with front-facing camera | ...`

### What it should say (correct)
- **No hardware tag** (or: `**Hardware:** Standard touchscreen kiosk with front-facing camera`)
- D-02 is a **standing kiosk** with a front-facing camera
- Correct scope: front-facing camera, AI styling, magazine template composition, AI background removal and editorial lighting, QR delivery to phone
- Display Environments table: `AI Fashion Cover Kiosk | Standing kiosk with integrated front-facing camera | Near fitting area / Fashion Studio zone | Touch + camera`

### Action required
Fix the D-02 section in `in-store-displays-requirements.md` — remove all Proto Hologram references and replace with correct standard kiosk description. Then push the corrected file to GitHub.

---

## Session Context — What Was Discussed

### D-02 AI Fashion Cover Kiosk (slide 9 of the PPTX)
- Sourced from slide 9 ("AI Fashion Cover, Virtual Try on & Holograms") and slide 3 (Technology Ecosystem)
- Correct hardware: **standard kiosk with front-facing camera** (NOT Proto Hologram)
- The detail "AI background removal and editorial lighting" was **inferred** from the PPTX's "editorial-quality" language — not explicitly stated. User confirmed this inference is correct and should stay in the requirements.

### D-03 Endless Aisle / AI Styling Screen (slide 9 of the PPTX)
- Sourced from:
  - Slide 3: "AI Fashion display (Endless aisle)" — explicitly named
  - Slide 9: AI-driven styling recommendations, inventory-aware, virtual try-on bullets
- D-03 does NOT have its own dedicated slide — it's spread across slide 3 (named) and slide 9 (behaviors described)

### GitHub repo setup
- No remote existed before this session
- Created `D064668/VFConcept_Store` as a private repo
- Pushed all markdown documents in 3 commits
- `project-dashboard.html` and the PPTX were not pushed (size constraints)

---

## Source of Truth — The PowerPoint

The original concept deck is `Reference/VF_Concept_Store_V2_DRAFT.pptx`. Key slides for requirements work:

| Slide | Content |
|---|---|
| Slide 3 | Technology Ecosystem — SAP stack, AI Fashion display (Endless aisle), store systems |
| Slide 9 | Experience #5: AI Fashion Cover, Virtual Try-On & Holograms — source for D-01, D-02, D-03 |
| Other slides | Vault mechanics, robotic embroidery, Digital Product Passport |

When making claims about scope, always verify against the PPTX. If a detail was inferred rather than sourced, flag it explicitly.

---

## Design System

The O11 design system lives in the **`o11-ux-design-system` skill** (not in the repo stubs). Before doing any visual/UX work, read:
- `/skills/o11-ux-design-system/SKILL.md`
- The skill's `references/design-tokens.md` and `references/component-rules.md`

**Token-first rule is absolute:** never hardcode a color, spacing, or radius value. Always use `var(--token-name)`.

---

## Standing Rules (from `agent.md`)

1. **Dashboard Sync** — whenever a markdown file changes, `project-dashboard.html` must be updated in the same operation (it embeds file content in `<script type="text/plain">` blocks)
2. **Token-First** — no hardcoded visual values anywhere
3. **Brand Tone** — luxury, minimal, editorial, dark-first, no exclamation marks in UI copy
4. **File Structure** — requirement docs in root, skills in `Skills/`, references in `Reference/`

---

## Immediate Next Actions

1. **Fix D-02** — remove Proto Hologram references from `in-store-displays-requirements.md` (see Critical Issues above)
2. **Push dashboard** — `project-dashboard.html` was not pushed to GitHub; push when convenient
3. **Continue requirements** — next areas to cover (if needed): vault hardware spec, robotic embroidery integration, staff/ops portal, or deeper architecture requirements
4. **Open questions** — 33 open questions in `open-questions.md` awaiting owner assignment and resolution

---

## Quick Reference — Document IDs

| Area | Feature IDs |
|---|---|
| Mobile app | F-01 to F-10 |
| In-store displays | D-01 (Graffiti Wall), D-02 (AI Cover Kiosk), D-03 (Endless Aisle) |
| Digital Product Passport | P-01 to P-06 |
| Cross-cutting | X-01 (Loyalty), X-02 (Tier differentiation), X-03 (Accessibility/Error handling) |
