# VF Concept Store — Project Agent

> Always active. Read and follow every session.

---

## Project

- **What:** O11 by VF — 148 m² unmanned luxury fashion retail concept store powered by SAP
- **Who:** SAP internal stakeholders, UX/design team; end users are concept store visitors
- **Platforms:** Mobile app (iOS/Android), in-store touchscreen displays, web (Digital Product Passport)

---

## Stack & Tools

- **UX/requirements project** — no application codebase
- **Design system:** `design-system/` — tokens, component rules, motion patterns
- **Prototyping:** Single-file HTML + CSS token vars
- **Source of truth:** `Reference/VF_Concept_Store_V2_DRAFT.pptx`
- **File browsing:** VS Code

---

## Always

- Run the pre-push quality loop before every `git push`
- Use `var(--token-name)` for every visual value — never raw hex, px, or inline styles
- Verify requirement claims against the PPTX; flag inferences explicitly
- Match brand tone: luxury, minimal, editorial, dark-first, no exclamation marks in UI copy
- Source-tag new requirements with slide or stakeholder confirmation

---

## Never

- Hardcode a color, spacing, radius, or shadow value
- Invent a design token — if one doesn't exist, stop and ask
- Describe D-02 as a standard kiosk — D-02 is a **Proto Luma Hologram** (confirmed 2026-07-29)
- Refactor, expand scope, or add features beyond the task at hand
- Activate the evaluation loop until `design-tokens.md` and `component-rules.md` are filled and rendered screens exist

---

## Where Things Live

- Design tokens: `design-system/design-tokens.md`
- Component rules: `design-system/component-rules.md`
- Motion patterns: `design-system/motion-guide.md`
- Evaluation loop: `design-system/evaluation-loop.md` (⏸ on hold)
- Source deck: `Reference/VF_Concept_Store_V2_DRAFT.pptx`
- Open questions: Open Questions Registry below

---

## Definition of Done

**Requirement doc:** sourced from PPTX or confirmed by user; inferences flagged; pre-push checklist passed; committed and pushed.

**Prototype / HTML:** token vars only; brand tone applied; no hardcoded values; pre-push checklist passed.

---

## Naming Conventions

- **Tokens:** `--category-role-variant` (e.g. `--color-brand-sage`, `--space-md`)
- **Feature IDs:** `F-xx` mobile · `D-xx` displays · `P-xx` passport · `X-xx` cross-cutting
- **Files:** kebab-case (e.g. `cross-cutting-requirements.md`)

---

## Good to Know

- **D-02 IS a Proto Luma Hologram** — confirmed 2026-07-29. Large cabinet + top-mounted camera bar. Never revert.
- **Virtual try-on is in-store only** — D-02 Proto Luma. Not in the mobile app.
- **PPTX is 33 MB** — gitignored, local only. Restore via OneDrive if lost.
- **Remote is SAP GitHub:** `https://github.tools.sap/D064668/VFConcept_Store`
- **Workflow:** Joule pushes via MCP. Run `git pull --rebase origin main` to sync locally.

---

## Role

**Project manager** for O11 by VF. Oversee all deliverables — requirements, design specs, prototypes, docs — and enforce the rules in this file.

---

## Task Routing

| Task | Approach |
|---|---|
| Visual change / prototype / motion | Read `design-system/design-tokens.md` + `component-rules.md` first — token-change confirmation workflow applies |
| Evaluate a rendered screen | `design-system/evaluation-loop.md` — ⏸ on hold until design system filled + screens exist |
| Requirement doc | Handle directly |
| PowerPoint / presentation | `sap-corporate-pptx` skill |
| Research / current info | `web_search` directly |

---

## Pre-Push Quality Loop

| # | Check | How |
|---|---|---|
| 1 | No hardcoded values in HTML | `grep -rn "#[0-9a-fA-F]\{3,6\}\b" *.html` |
| 2 | No broken markdown links | Verify each `[text](path)` link exists on disk |
| 3 | No conflict markers | `grep -rn "<<<<<<\|>>>>>>\|=======" .` |
| 4 | `.gitignore` respected | `git status` — no personal or binary files staged |
| 5 | Commit message descriptive | `type(scope): description` |

---

## Token-Change Workflow

For any visual change — even small — follow before touching any file:

1. **Identify** — read `design-system/design-tokens.md`, find the token(s) the change maps to
2. **Confirm scope** — ask: global change (affects all uses) or scoped variant (new token)?
3. **Update token first** — edit `design-tokens.md`, then reference it in target files
4. **Never** write a raw value anywhere — only `var(--token-name)`

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
| 2.0.0 | 2026-07-29 | Restructured — added quick-reference sections |
| 2.1.0 | 2026-07-29 | Added pre-push quality loop |
| 2.2.0 | 2026-07-29 | D-02 Proto Luma confirmed; evaluation-loop routing added |
| 2.3.0 | 2026-07-29 | Dashboard removed; VS Code workflow |
| 2.4.0 | 2026-07-29 | F-03 corrected; evaluation-loop on hold |
| 2.5.0 | 2026-07-31 | Design system merged into repo; token-change workflow added; trimmed to <200 lines |