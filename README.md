# S·Fashion — iOS prototype (SAP × VF Corporation)

A working web prototype of the S·Fashion store app, for the iOS team to rebuild natively.
Built with Next.js 15, React 19 and TypeScript. Owner: Hyun Lee (product design).

## Run it

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # once, downloads the packages
npm run dev      # starts the app at http://localhost:3300
```

Open it in a desktop browser (you'll see the app at phone width) or on your phone.

**Handy links**

- `?screen=shop` (also `picks`, `chat`, `pick`, `look`, `bag`, `checkout`, `order`, `more`, `pair`, `handoff`) opens that screen straight away.
- `?theme=dark` or `?theme=light` sets the appearance.
- `npm run dev:review` (or `?review=1` on the link) turns on review mode: an iPhone frame plus a panel to switch theme and phone width and jump between screens. This is a prototype tool only, not part of the app (`src/app/ReviewFrame.tsx`).

## Read these first

| File | What it is |
|---|---|
| `BUILD-NOTES.md` | What's built, build by build, with iOS notes for each feature. **The record of every decision.** (Code comments that say "HANDOFF §…" point to the original spec, which is in the git history: `git show c670a0a:HANDOFF.md`.) |
| `DESIGN.md` | The design system as built: colour, type, spacing, motion. |
| `design-system/tokens.json` | Design tokens. `ios/SFTokens.swift` is the same tokens for Swift. |

## Where things are

```
src/
  app/          the page and the app shell (AppShell.tsx); ReviewFrame.tsx = review tools only
  screens/      one file per screen or sheet (Home, Shop, Picks, Look, PickSheet, ChatSheet, Checkout…)
  components/   shared parts (buttons, sheets, photo slot, tab bar, icons, logos)
  state/        store.tsx: everything the app remembers (bag, profile, open sheet…)
  data/         catalog.ts (products, looks, interests); stylist.ts (the demo stylist's answers)
  styles/       tokens.css (generated from design-system/tokens.json by `npm run tokens`)
public/         photos, brand logos, video and assets the app loads
scripts/        build-tokens.mjs (runs before dev/build) and the logo converters
design-system/  tokens.json: the design tokens (source of truth for colour, type, spacing)
ios/            SFTokens.swift: the same tokens for Swift
```

The original photos, mockups and brand guidelines stay with Hyun (ask if you need them).

## Good to know

- **Demo data:** the stylist's answers, products, prices and the member profile are sample data. In the real app they come from SAP.
- **No secrets:** there are no keys or passwords in this project.
- Every source file starts with a plain-English comment saying what it does and how to build it on iOS.

## Working together

- Make a branch for your change, then open a pull request: `git checkout -b my-change`.
- Run `npm run build` before you push. It must finish without errors.
