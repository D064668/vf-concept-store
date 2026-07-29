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
- **Source of truth:** `Reference/VF_Concept_Store_V2_DRAFT.pptx` — the original concept deck
- **File browsing:** VS Code (open the repo folder)

---

## Always

- Always run the pre-push quality loop (Rule 1) before every `git push`
- Always use `var(--token-name)` for every visual value — never raw hex, px, or inline styles
- Always verify requirement claims against the PPTX; flag inferences explicitly ("inferred from slide X")
- Always match brand tone: luxury, minimal, editorial, dark-first, no exclamation marks in UI copy
- Always source-tag new requirements with the slide or stakeholder confirmation they came from

---

## Never

- Never hardcode a color, spacing, radius, or shadow value
- Never invent a design token — if one doesn't exist, stop and ask
- Never describe D-02 as a standard kiosk — D-02 is a **Proto Luma Hologram** (confirmed 2026-07-29 with hardware image)
- Never refactor, expand scope, or add features beyond the task at hand

---

## Where Things Live

- Design tokens: `Skills/o11-ux-design-system/references/design-tokens.md`
- Component rules: `Skills/o11-ux-design-system/references/component-rules.md`
- Motion patterns: `design-system/motion-guide.md` (read-only reference)
- Evaluation loop: `design-system/evaluation-loop.md` (activate for rendered screens/prototypes)
- Source deck: `Reference/VF_Concept_Store_V2_DRAFT.pptx`
- Open questions: this file, Open Questions Registry section below

---

## Definition of Done

**Requirement doc:** sourced from PPTX or confirmed by user; all inferences flagged; pre-push checklist passed; committed and pushed to GitHub.

**Prototype / HTML:** uses only token vars; brand tone applied; no hardcoded values; pre-push checklist passed; single-file deliverable.

---

## Naming Conventions

- **Tokens:** `--category-role-variant` (e.g. `--color-brand-sage`, `--space-md`, `--shadow-gold`)
- **Feature IDs:** `F-xx` mobile · `D-xx` displays · `P-xx` passport · `X-xx` cross-cutting
- **Files:** kebab-case, descriptive (e.g. `cross-cutting-requirements.md`)

---

## Good to Know

- **D-02 IS a Proto Luma Hologram.** Confirmed 2026-07-29 with hardware image. Large cabinet display with top-mounted camera bar. Sessions prior to 2026-07-29 incorrectly described it as a standard kiosk — that is wrong. Never revert to standard kiosk description.
- **The PPTX is 33 MB** — too large for standard `git push`. It lives in `Reference/` locally but is gitignored. Restore via OneDrive if lost.
- **Inference rule:** when a requirement detail is inferred from PPTX language rather than explicitly stated, mark it in the doc. Example: "AI background removal — inferred from 'editorial-quality' language, confirmed by user."
- **Remote is SAP GitHub:** `https://github.tools.sap/D064668/VFConcept_Store` — not github.com.
- **Workflow:** I (Joule) push via MCP. You `git pull --rebase origin main` to sync locally. No need to `git push` unless I ask.

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
| Evaluate a rendered screen or prototype | `evaluation-loop` (`design-system/evaluation-loop.md`) | Blind adversarial critic panel — activate only when rendered screens exist |
| Create/update a requirement document | Handle directly | No skill needed |
| PowerPoint / presentation task | `sap-corporate-pptx` | SAP brand deck generation |
| Research / current information | `web_search` directly | No skill needed |
| Create or update a skill | `skill-creator` | Skill authoring workflow |

---

## Standing Rules (Detail)

### Rule 1: Pre-Push Quality Loop

**Before every `git push`, run the following checklist. Do not push until all pass.**

| # | Check | How |
|---|---|---|
| 1 | No hardcoded values in HTML | `grep -rn "#[0-9a-fA-F]\{3,6\}\b" *.html` — flag any outside a token definition |
| 2 | No broken markdown links | Scan requirement docs for `[text](path)` links — verify each path exists on disk |
| 3 | No conflict markers | `grep -rn "<<<<<<\|>>>>>>\|=======" .` — must return empty |
| 4 | `.gitignore` respected | `git status` — confirm no personal, binary, or build files are staged |
| 5 | Commit message is descriptive | Format: `type(scope): description` (e.g. `fix(D-02): ...`, `docs(agent): ...`) |

**Loop:** run all checks → fix failures → repeat → push only when all pass.

#### When an app codebase is added — extend with:
- Lint, type check, tests, build — update this rule when commands are established.

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
├── README.md
├── handoff.md
├── mobile-app-requirements.md
├── in-store-displays-requirements.md
├── digital-product-passport-requirements.md
├── cross-cutting-requirements.md
├── design-system/
│   ├── design-tokens.md
│   ├── component-rules.md
│   ├── motion-guide.md
│   └── evaluation-loop.md
├── Reference/
│   └── VF_Concept_Store_V2_DRAFT.pptx    ← gitignored, local only
└── Skills/
    └── o11-ux-design-system/
        ├── SKILL.md
        └── references/
            ├── design-tokens.md
            └── component-rules.md
```

New requirement docs go in the root. New skills go under `Skills/`. Reference materials go in `Reference/`.

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
| 2.0.0 | 2026-07-29 | Restructured with CLAUDE.md template |
| 2.1.0 | 2026-07-29 | Added pre-push quality loop |
| 2.2.0 | 2026-07-29 | Fixed D-02 (Proto Luma confirmed); added evaluation-loop to Skill Routing |
| 2.3.0 | 2026-07-29 | Removed HTML dashboard; VS Code replaces it; cleaned all dashboard refs |
