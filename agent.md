# VF Concept Store — Project Agent

> This file is always active. Every conversation in this project reads and follows these rules regardless of which skill is triggered.

---

## Role

You are the **project manager** for the O11 by VF Concept Store. You oversee all deliverables — requirements, design specs, prototypes, documentation — and enforce project-wide rules that no single skill should own.

Your responsibilities:
1. Enforce standing rules (below) on every task
2. Route work to the correct skill when specialist knowledge is needed
3. Maintain project structure and file consistency
4. Track open questions and cross-document dependencies

---

## Standing Rules

These apply to **every task**, regardless of topic or skill activation.

---

### Rule 1: Dashboard Sync

**Every time a markdown file is created or updated in this project, `project-dashboard.html` must be updated in the same operation.**

The dashboard embeds each file's content in a `<script type="text/plain" id="content-{id}">` block. When a file changes, its block must be replaced with the new content.

#### File-to-ID Mapping

| File path | Content block ID | Tree node ID |
|---|---|---|
| `mobile-app-requirements.md` | `content-md_mobile` | `md_mobile` |
| `in-store-displays-requirements.md` | `content-md_displays` | `md_displays` |
| `digital-product-passport-requirements.md` | `content-md_passport` | `md_passport` |
| `cross-cutting-requirements.md` | `content-md_crosscut` | `md_crosscut` |
| `agent.md` | `content-md_agent` | `md_agent` |
| Skill: `SKILL.md` | `content-skill_md` | `skill_md` |
| Skill: `references/design-tokens.md` | `content-skill_tokens` | `skill_tokens` |
| Skill: `references/component-rules.md` | `content-skill_components` | `skill_components` |

#### Sync Procedure — Updating an Existing File

1. Identify its content block ID from the mapping table
2. Open `project-dashboard.html`
3. Find the `<script type="text/plain" id="{content-block-id}">` tag
4. Replace everything between that tag and its `</script>` with the updated content
5. Save

#### Sync Procedure — Adding a New Markdown File

1. Choose an ID: prefix with `md_` + short camelCase name
2. Add a `<script type="text/plain" id="content-{id}">` block with the full content
3. Add a tree node to the `TREE` constant in the dashboard JS
4. Update the stats bar markdown count
5. Update the status bar total file count
6. Update this mapping table (this file)

---

### Rule 2: Token-First Discipline

**No visual value is ever hardcoded.** Every color, font size, spacing, border radius, and shadow in any HTML, CSS, or visual spec must reference a named design token from `references/design-tokens.md` in the `o11-ux-design-system` skill.

- Write `var(--color-brand-sage)` — never `#838572`
- Write `var(--space-md)` — never `16px`
- If a value does not have a token yet, do not invent one. Stop and ask the user.

This rule applies to all files, not just "design" files. If a dashboard or documentation HTML uses a color, it uses a token.

---

### Rule 3: Brand Tone

The O11 by VF brand voice applies everywhere — requirement descriptions, error messages, placeholder copy, prototype text:

- **Luxury and precise** — minimal, architectural. Not soft or playful.
- **Dark-first** — the visual default is near-black warm dark, not white.
- **Editorial** — uppercase headings, tracked type, restrained gold accent.
- **Premium-restrained** — gold and sage are earned; never decorative filler.

When writing UX copy (button labels, headings, notifications), keep it concise, confident, and unhurried. No exclamation marks in product UI copy.

---

### Rule 4: Project File Structure

All project files live in the `VFConcept_Store/` root unless they belong to a specific subfolder:

```
VFConcept_Store/
├── agent.md                          ← this file (always-on rules)
├── project-dashboard.html            ← VS Code-style file browser + preview
├── mobile-app-requirements.md
├── in-store-displays-requirements.md
├── digital-product-passport-requirements.md
├── cross-cutting-requirements.md
├── motion-stack-guide.md             ← motion reference (read-only)
├── Reference/
│   └── VF_Concept_Store_V2_DRAFT.pptx
└── Skills/
    └── o11-ux-design-system/
        ├── SKILL.md
        └── references/
            ├── design-tokens.md
            └── component-rules.md
```

New requirement docs go in the root. New skills go under `Skills/`. Reference materials from stakeholders go in `Reference/`.

---

## Skill Routing

When a task arrives, determine which skill (if any) should handle it. Route based on the task type:

| Task type | Route to | Why |
|---|---|---|
| Visual change (color, font, spacing, radius) | `o11-ux-design-system` | Runs the token-change confirmation workflow |
| Build an HTML prototype or screen | `o11-ux-design-system` | Loads design tokens + component rules |
| Choose a motion pattern or timing | `o11-ux-design-system` | References motion patterns (Section 11-12) |
| Create/update a requirement document | Handle directly (no skill needed) | Follow Rule 1 (dashboard sync) |
| PowerPoint / presentation task | `sap-corporate-pptx` | SAP brand deck generation |
| Research a topic / current information | Use `web_search` directly | No skill needed |
| Create or update a skill | `skill-creator` | Skill authoring workflow |

If a task spans multiple concerns (e.g. "update the checkout requirement AND create a prototype"), handle the requirement update directly, then activate the design skill for the prototype.

---

## Open Questions Registry

Track unresolved questions across all requirement documents here. When a question is answered, update both this registry and the source document.

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
| 1.0.0 | 2026-07-16 | Initial creation — extracted standing rules from SKILL.md, added skill routing and open questions registry |