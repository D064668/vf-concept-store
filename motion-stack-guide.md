# Motion Stack Guide for Designers

> Drop this file into your project's `CLAUDE.md` or paste it at the start of a Claude conversation.
> It teaches Claude your motion system so every animation feels intentional and consistent.

---

## How to Use This

This isn't a reference doc for you to memorize. It's **context for Claude**. When this file is loaded, Claude will:

- Automatically pick the right library for each animation type
- Use your project's exact easing, timing, and motion values
- Avoid common pitfalls (layout shift, re-triggering, jarring motion)
- Keep motion subtle and premium — never theme-park

Just describe the *feeling* you want. Claude handles the implementation.

---

## The Motion Stack

| Library | What It Does | When Claude Reaches for It |
|---------|-------------|---------------------------|
| **Framer Motion** | Declarative animations on React components | 90% of the time — scroll reveals, parallax, staggers, entrance sequences |
| **GSAP** + **@gsap/react** | Imperative timeline engine | Complex choreography, scroll-scrubbed progress bars, multi-step sequences |
| **Lenis** | Smooth scroll feel | Always on globally — never needs to be added per-component |

**Important:** These are the only motion libraries in the project. Claude must never install additional ones.

---

## Motion Language

The project has a specific motion personality. All animations should feel:

- **Unhurried** — nothing snaps or pops. Things drift into place.
- **Confident** — elements don't bounce or overshoot. They arrive and stay.
- **Quiet** — motion supports content, never competes with it.

Think: a page that *breathes* rather than *performs*.

---

## The Standard Values

These values are the project's motion DNA. Claude must use them by default:

```
Ease:         [0.22, 1, 0.36, 1]     (soft deceleration — things slow into rest)
Duration:     0.8s – 1.2s            (scroll reveals)
              1.2s – 1.4s            (large elements, hero sequences)
              0.6s – 0.9s            (small UI elements, labels)
Max Y offset: 16–32px                (never more — subtle, not theatrical)
Max X offset: 0px                    (things move vertically, not sideways)
Stagger gap:  0.12s per item         (enough to read as a cascade)
Viewport margin: "-15%" to "-20%"    (trigger before element fully enters view)
```

---

## Pattern Catalog

### 1. Hero Entrance Sequence

The first thing users see. Elements cascade in with staggered delays on page load.

```
Title       → fade up 24px, 1.2s, no delay
Subtitle    → fade up 16px, 1.0s, 0.3s delay
CTA/Form    → fade up 16px, 1.0s, 0.55s delay
Metadata    → fade in only (no movement), 0.8s, appears last
```

Tell Claude: *"Cascade the hero content in — title first, then description, then the form. Slow and confident."*

---

### 2. Scroll Reveals (Most Common)

Elements fade up into view as the user scrolls. They animate **once** and stay.

```
Trigger:     whileInView with once: true
Movement:    fade from opacity 0 + translate Y 16–24px
Timing:      0.8–1.0s
Ease:        [0.22, 1, 0.36, 1]
Viewport:    margin "-15%" (fires slightly early for seamless feel)
```

Tell Claude: *"Sections should reveal as I scroll — fade up, once only, nothing dramatic."*

---

### 3. Line / Divider Reveals

Vertical lines grow from their origin point (top or center) to signal section transitions.

```
Animation:   scaleY from 0 → 1
Origin:      transform-origin: top
Duration:    0.8s
Followed by: label fading in 0.4s later
```

Tell Claude: *"Add a vertical line that grows downward before the section label fades in."*

---

### 4. Image Reveals (Clip-Path)

Images don't just fade — they expand from a cropped state to full visibility.

```
Animation:   clipPath from "inset(20% 20% 20% 20%)" → "inset(0% 0% 0% 0%)"
Combined:    opacity 0 → 1 simultaneously
Duration:    1.4s (longer — images are focal points)
Ease:        [0.22, 1, 0.36, 1]
```

Tell Claude: *"The image should open up from the center — like a window expanding. Slow and cinematic."*

---

### 5. Parallax (Scroll-Linked)

Background images drift slightly as the user scrolls past, creating depth.

```
Movement:    y shifts 0% → 12% over the section's scroll range
Scale:       1 → 1.05 (barely perceptible zoom)
Trigger:     tied to scrollYProgress of the section container
```

Tell Claude: *"The hero image should drift up gently as I scroll past — subtle parallax, not aggressive."*

---

### 6. Staggered Lists

Cards, quotes, or features cascade in sequentially.

```
Per item:    fade up 16px, 0.9s duration
Delay:       i * 0.12s (index × stagger gap)
Ease:        [0.22, 1, 0.36, 1]
Trigger:     whileInView, once: true
```

Tell Claude: *"Stagger the cards so they cascade in one after another — each one a beat behind the last."*

---

### 7. Opacity-Only Reveals (Metadata & Labels)

Small text (eyebrows, dates, captions) fades in without moving.

```
Animation:   opacity 0 → target (often 0.4–0.7, not full 1.0)
Duration:    0.8–0.9s
Note:        These often settle at reduced opacity by design (0.4–0.7)
```

Tell Claude: *"The label should just fade in quietly — no movement, and keep it at 60–70% opacity."*

---

## Anti-Patterns (What Claude Must Avoid)

| Don't | Why | Do Instead |
|-------|-----|-----------|
| Animate elements more than once | Feels restless, breaks premium feel | `once: true` always |
| Move things sideways on scroll | Feels gimmicky, breaks vertical rhythm | Vertical movement only |
| Use `spring` or `bounce` easing | Too playful for this brand | Use `[0.22, 1, 0.36, 1]` |
| Translate more than 32px | Draws too much attention to the motion itself | Keep it 16–24px |
| Animate to full opacity for labels | Supporting text should stay subdued | Target 0.4–0.7 for metadata |
| Add scroll-jacking or position-locking | Frustrates users, fights Lenis | Let the page scroll naturally |
| Use `delay` without `once: true` | Re-triggering delayed elements looks broken | Always pair them |
| Install new animation libraries | Fragments the system | Use Framer Motion or GSAP |

---

## Prompting Claude — What Works

### Describe the feeling, not the code:

- *"The page should feel like it's waking up as you scroll"*
- *"Each section breathes in — nothing sudden"*
- *"The quotes should ripple in like a slow wave"*
- *"Images expand like you're opening a window"*

### Add constraints when needed:

- *"Keep motion to 1s max — this section needs to feel faster"*
- *"No movement on this one, just a gentle fade"*
- *"Make the stagger tighter — 0.08s between items"*
- *"This image needs the clip-path reveal, not a simple fade"*

### Reference this guide explicitly:

- *"Follow the motion stack guide for scroll reveals"*
- *"Use the standard ease and timing from the guide"*
- *"Apply pattern #4 (image reveal) to the product shots"*

---

## Technical Context (For Claude, Not You)

```
Framework:          Next.js (App Router) with React
Smooth scroll:      Lenis — globally wrapped via <LenisProvider> in layout
                    Config: duration 1.2, expo easing, smoothWheel: true
                    Never re-initialize or compete with it

Framer Motion:      Use "use client" directive on any component with motion
                    Import: import { motion, useScroll, useTransform } from "framer-motion"
                    Handles prefers-reduced-motion automatically

GSAP (when needed): Import: import gsap from "gsap"
                    React: import { useGSAP } from "@gsap/react"
                    Register plugins: gsap.registerPlugin(ScrollTrigger)
                    Always clean up in useGSAP's cleanup or useEffect return
                    Must check prefers-reduced-motion manually

Reduced motion:     Framer Motion respects it automatically.
                    For GSAP: wrap in matchMedia check.
                    Never skip this — it's an accessibility requirement.
```

---

## Quick Decision Tree

```
"I want something to appear on scroll"
  → Scroll reveal (Pattern #2)

"I want things to appear one by one"
  → Staggered list (Pattern #6)

"I want the image to feel cinematic"
  → Clip-path reveal (Pattern #4)

"I want depth / layers"
  → Parallax (Pattern #5)

"I want a sequence of things happening in order"
  → Hero entrance (Pattern #1) or GSAP timeline if complex

"I want a line to draw itself"
  → Line reveal (Pattern #3)

"I want the page to feel smooth"
  → Already done (Lenis is global)
```