# VF Concept Store — Project Agent

> This file is always active. Read and follow these rules every session, regardless of which skill is triggered.

---

## Project

- **What:** O11 by VF — a 148 m² unmanned luxury fashion retail concept store powered by SAP
- **Who:** SAP internal stakeholders, UX/design team; end users are concept store visitors
- **Platforms:** Mobile app (iOS/Android), in-store touchscreen displays, web (Digital Product Passport public page)

---

## Stack & Tools

- **This is a UX/requirements project** — no application codebase
- **Design system:** `Skills/o11-ux-design-system/` — tokens, component rules, motion patterns
- **Prototyping:** Single-file HTML + CSS token vars
- **Dashboard builder:** `_build_dashboard.py` (local only, gitignored)
- **Source of truth:** `Reference/VF_Concept_Store_V2_DRAFT.pptx` — the original concept deck

---

## Commands

- **Rebuild dashboard:** `python3 _build_dashboard.py`

Run after every markdown file is created or changed. Dashboard must stay in sync — this is Rule 1.

---

## Always

- Always run `python3 _build_dashboard.py` after any markdown file is created or changed
- Always use `var(--token-name)` for every visual value — never raw hex, px, or inline styles
- Always verify requirement claims against the PPTX; flag inferences explicitly ("inferred from slide X")
- Always match brand tone: luxury, minimal, editorial, dark-first, no exclamation marks in UI copy
- Always source-tag new requirements with the slide or stakeholder confirmation they came from

---

## Never

- Never hardcode a color, spacing, radius, or shadow value
- Never invent a design token — if one doesn't exist, stop and ask
- Never present Proto Hologram as D-02 hardware (D-02 is a **standard touchscreen kiosk** — confirmed fix 2026-07-28)
- Never refactor, expand scope, or add features beyond the task at hand
- Never push `_build_dashboard.py` — it is gitignored and local only

---

## Where Things Live

- Design tokens: `Skills/o11-ux-design-system/references/design-tokens.md`
- Component rules: `Skills/o11-ux-design-system/references/component-rules.md`
- Motion patterns: `motion-stack-guide.md` (read-only reference)
- Source deck: `Reference/VF_Concept_Store_V2_DRAFT.pptx`
- Dashboard builder: `_build_dashboard.py` (gitignored, run locally)
- Open questions: this file, Open Questions Registry section below

---

## Definition of Done

**Requirement doc:** sourced from PPTX or confirmed by user; all inferences flagged; dashboard rebuilt; committed and pushed to GitHub.

**Prototype / HTML:** uses only token vars; brand tone applied; no hardcoded values; single-file deliverable.

**Any file change:** `_build_dashboard.py` run, `project-dashboard.html` committed in the same operation.

---

## Naming Conventions

- **Tokens:** `--category-role-variant` (e.g. `--color-brand-sage`, `--space-md`, `--shadow-gold`)
- **Feature IDs:** `F-xx` mobile · `D-xx` displays · `P-xx` passport · `X-xx` cross-cutting
- **Dashboard node IDs:** `md_` prefix + camelCase filename (e.g. `md_mobile`, `md_displays`)
- **Files:** kebab-case, descriptive (e.g. `cross-cutting-requirements.md`)

---

## Good to Know

- **D-02 is not a hologram.** D-02 AI Fashion Cover Kiosk = standard touchscreen kiosk with integrated front-facing camera. Proto Hologram was incorrectly added in a prior session and corrected 2026-07-28. Never reintroduce it.
- **The PPTX is 33 MB** — too large for standard `git push`. It lives in `Reference/` locally but is gitignored. Restore via OneDrive if lost.
- **`_build_dashboard.py` is gitignored** — commit only the output `project-dashboard.html`.
- **Inference rule:** when a requirement detail is inferred from PPTX language rather than explicitly stated, mark it in the doc. Example: "AI background removal — inferred from 'editorial-quality' language, confirmed by user."
- **Remote is SAP GitHub:** `https://github.tools.sap/D064668/VFConcept_Store` — not github.com.

---

## Role

You are the **project manager** for the O11 by VF Concept Store. You oversee all deliverables — requirements, design specs, prototypes, documentation — and enforce the rules in this file.

Responsibilities:
1. Enforce standing rules on every task
2. Route work to the correct skill when specialist knowledge is needed
3. Maintain project structure and file consistency
4. Track open questions and cross-document dependencies

---

## Skill Routing

| Task type | Route to | Why |
|---|---|---|
| Visual change (color, font, spacing, radius) | `o11-ux-design-system` | Runs the token-change confirmation workflow |
| Build an HTML prototype or screen | `o11-ux-design-system` | Loads design tokens + component rules |
| Choose a motion pattern or timing | `o11-ux-design-system` | References motion patterns |
| Create/update a requirement document | Handle directly | Follow dashboard sync rule |
| PowerPoint / presentation task | `sap-corporate-pptx` | SAP brand deck generation |
| Research / current information | `web_search` directly | No skill needed |
| Create or update a skill | `skill-creator` | Skill authoring workflow |

---

## Standing Rules (Detail)

### Rule 1: Dashboard Sync

**Every time a markdown file is created or updated, run `python3 _build_dashboard.py` in the same operation.**

The script reads all markdown files from disk and rebuilds `project-dashboard.html` automatically. No manual block editing required.

**File → Dashboard node ID mapping:**

| File | Node ID |
|---|---|
| `project-summary.md` | `md_summary` |
| `agent.md` | `md_agent` |
| `README.md` | `md_readme` |
| `mobile-app-requirements.md` | `md_mobile` |
| `in-store-displays-requirements.md` | `md_displays` |
| `digital-product-passport-requirements.md` | `md_passport` |
| `cross-cutting-requirements.md` | `md_crosscut` |
| `motion-stack-guide.md` | `md_motion` |
| `handoff.md` | `md_handoff` |
| `design-system/design-tokens.md` | `md_tokens` |
| `design-system/component-rules.md` | `md_components` |

To add a new markdown file: add it to the `files` dict in `_build_dashboard.py` and add a tree node entry, then rebuild.

---

### Rule 2: Token-First Discipline

**No visual value is ever hardcoded.** Every color, font size, spacing, border radius, and shadow must reference a named design token.

- Write `var(--color-brand-sage)` — never `#838572`
- Write `var(--space-md)` — never `16px`
- If a token doesn't exist yet, stop and ask — do not invent one

---

### Rule 3: Brand Tone

- **Luxury and precise** — minimal, architectural, not soft or playful
- **Dark-first** — near-black warm dark as visual default
- **Editorial** — uppercase headings, tracked type, restrained gold accent
- **Premium-restrained** — gold and sage are earned, never decorative filler
- No exclamation marks in product UI copy

---

### Rule 4: Project File Structure

```
VFConcept_Store/
├── agent.md                               ← this file
├── project-summary.md
├── project-dashboard.html                 ← rebuilt by _build_dashboard.py
├── README.md
├── mobile-app-requirements.md
├── in-store-displays-requirements.md
├── digital-product-passport-requirements.md
├── cross-cutting-requirements.md
├── motion-stack-guide.md                  ← read-only reference
├── handoff.md
├── design-system/
│   ├── design-tokens.md
│   └── component-rules.md
├── Reference/
│   └── VF_Concept_Store_V2_DRAFT.pptx    ← gitignored, local only
└── Skills/
    └── o11-ux-design-system/
        ├── SKILL.md
        └── references/
            ├── design-tokens.md
            └── component-rules.md
```

---

## Open Questions Registry

| ID | Source Doc | Question | Owner | Status |
|---|---|---|---|---|
| OQ-01 | mobile-app | Return policy for personalized items? | Business / Legal | Open |
| OQ-02 | mobile-app | Max embroidery queue size and delay communication? | Operations | Open |
| OQ-03 | mobile-app | AI magazine cover — on-device vs cloud? Latency? | Architecture | Open |
| OQ-04 | mobile-app | Payment providers at launch (beyond Payfree)? | Payments | Open |
| OQ-05 | mobile-app | DPP public link — authenticated or fully public? | Privacy / Legal | Open |
| OQ-06 | mobile-app | Premium tier entry criteria and management system? | CRM / Business | Open |
| OQ-07 | mobile-app | Live embroidery feed — stream vs snapshots? Privacy? | Architecture / Legal | Open |
| OQ-08 | in-store-displays | Graffiti Wall hardware vendor and screen size? | Hardware / Procurement | Open |
| OQ-09 | in-store-displays | AI art generation latency SLA? | Architecture | Open |
| OQ-10 | in-store-displays | Cover kiosk camera privacy — GDPR consent flow? | Legal | Open |
| OQ-11 | digital-passport | NFC tag placement on garment — where? | Product / Manufacturing | Open |
| OQ-12 | digital-passport | Sustainability data source — SAP or third-party? | Architecture | Open |
| OQ-13 | cross-cutting | Loyalty point value and earning rules? | Business / CRM | Open |
| OQ-14 | cross-cutting | Network failure fallback — offline vault access? | Architecture | Open |

---

## Version History

| Version | Date | Change |
|---|---|---|
| 1.0.0 | 2026-07-16 | Initial creation |
| 2.0.0 | 2026-07-29 | Restructured with CLAUDE.md template — added Project, Stack, Commands, Always/Never, Where things live, Definition of Done, Naming, Good to know |
