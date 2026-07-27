# Open Questions — VF Concept Store

**Last updated:** 2026-07-27
**Purpose:** Consolidated list of decisions needed from business, architecture, legal, and operations teams.

---

## Business & Product

| ID | Question | Owner | Source | Status |
|---|---|---|---|---|
| BIZ-01 | Will personalized items be eligible for return? What is the return policy for embroidered garments? | Business / Legal | Mobile App | Open |
| BIZ-02 | Which payment providers are supported at launch (Payfree confirmed — others TBC)? | Payments / Business | Mobile App | Open |
| BIZ-03 | What is the Premium member tier entry criteria, and is tier status managed in SAP Customer Data Cloud? | CRM / Business | Mobile App | Open |
| BIZ-04 | What are the exact tier thresholds (points required for Standard to Premium)? | Business / CRM | Cross-cutting | Open |
| BIZ-05 | Are Premium tier benefits identical across all VF Concept Store locations, or can they vary by store? | Business / Product | Cross-cutting | Open |
| BIZ-06 | What is the garment assortment at launch (T-shirts only, or hoodies, caps, bags, jackets)? | Business / Merchandising | Conversation | Open |
| BIZ-07 | Which personalization methods (embroidery, DTG print, patches) apply to each garment type? | Business / Production | Conversation | Open |

---

## Architecture & Technology

| ID | Question | Owner | Source | Status |
|---|---|---|---|---|
| ARCH-01 | Is the AI magazine cover generation processed on-device, on SAP Business AI Platform, or a third-party service? What are latency expectations? | Architecture | Mobile App | Open |
| ARCH-02 | Are real-time embroidery camera feeds streamed directly or delivered as periodic snapshots? What are the data/privacy implications? | Architecture / Legal | Mobile App | Open |
| ARCH-03 | What is the video file format and maximum size for DPP embroidery video? Streamed or downloaded? | Architecture / Ops | DPP | Open |
| ARCH-04 | Should the Store Status degradation indicator be automatic (from SAP monitoring) or manually set? | Architecture / Ops | Cross-cutting | Open |
| ARCH-05 | For the "Draw your own" path: will we host a custom ControlNet/Stable Diffusion endpoint on a hyperscaler, or rely on Amazon Titan Image Generator's img2img mode? | Architecture / AI | Conversation | Open |
| ARCH-06 | What model provider will be registered in SAP AI Core for sketch-to-image generation? Custom executable vs. out-of-box GenAI Hub model? | Architecture / AI | Conversation | Open |
| ARCH-07 | How will the embroidery style envelope be enforced — fine-tuned LoRA model, prompt constraints, or post-processing filter? | Architecture / AI | Conversation | Open |
| ARCH-08 | Is a separate auto-digitization service needed to convert AI output to stitch files (.DST/.PES), or can the Tajima software handle raster input? | Architecture / Production | Conversation | Open |

---

## Legal, Privacy & Compliance

| ID | Question | Owner | Source | Status |
|---|---|---|---|---|
| LEG-01 | Will the Digital Product Passport public link require the customer to authenticate, or is it fully public? | Privacy / Legal | Mobile App | Open |
| LEG-02 | How are customer-created artworks stored? What is the consent mechanism and data retention policy? | Legal / Privacy | In-store Displays | Open |
| LEG-03 | Is the DPP public URL permanent even if the owner deletes their account? | Legal / Privacy | DPP | Open |
| LEG-04 | What data does the EU DPP regulation specifically require vs. what we include as brand storytelling? | Legal / Compliance | DPP | Open |
| LEG-05 | What content filtering is needed for AI-generated artwork to prevent inappropriate/offensive output? | AI / Ethics / Legal | In-store Displays | Open |

---

## Operations & Safety

| ID | Question | Owner | Source | Status |
|---|---|---|---|---|
| OPS-01 | What is the maximum embroidery design queue size, and how does the app communicate delays? | Operations | Mobile App | Open |
| OPS-02 | What is the maximum queue for magazine cover generation? How is the wait communicated? | Operations / UX | In-store Displays | Open |
| OPS-03 | Is there a staff escalation path for physical emergencies in the unmanned store? | Operations / Safety | Cross-cutting | Open |
| OPS-04 | What happens if the entire store loses power/network? Is there a physical emergency exit protocol? | Facilities / Safety | Cross-cutting | Open |

---

## UX & Design

| ID | Question | Owner | Source | Status |
|---|---|---|---|---|
| UX-01 | For the Endless Aisle, how does unauthenticated browsing handle size filtering? | Business / UX | In-store Displays | Open |
| UX-02 | Should the Endless Aisle "Send to my app" work for unauthenticated users via QR deep link? | Business / Tech | In-store Displays | Open |
| UX-03 | Should the accessibility guided drawing mode be opt-in via button, or auto-offered based on interaction patterns? | UX / Accessibility | Cross-cutting | Open |
| UX-04 | Can the owner update their DPP after creation (add a personal note, change visibility)? | Product / UX | DPP | Open |
| UX-05 | Should the sustainability score use an industry standard (Higg Index) or a proprietary brand metric? | Sustainability / Business | DPP | Open |

---

## Production & Hardware

| ID | Question | Owner | Source | Status |
|---|---|---|---|---|
| PROD-01 | What thread palette is available at launch? (Drives the AI color constraint — max 12 colors per design) | Production / Merchandising | Conversation | Open |
| PROD-02 | What hoop sizes will the store stock? (Drives the maximum design area constraint) | Production / Hardware | Conversation | Open |
| PROD-03 | Will we offer direct-to-garment printing (DTG) as an alternative for designs too complex for embroidery? | Business / Production | Conversation | Open |
| PROD-04 | Can the Graffiti Wall support more than 2 simultaneous users, or is the table size a hard constraint? | Hardware / UX | In-store Displays | Open |

---

## Summary

| Domain | Count |
|---|---|
| Business & Product | 7 |
| Architecture & Technology | 8 |
| Legal, Privacy & Compliance | 5 |
| Operations & Safety | 4 |
| UX & Design | 5 |
| Production & Hardware | 4 |
| **Total** | **33** |