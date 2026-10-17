# S·Fashion app: build 0.4 (Home, Shop, real brands, store screens)

This file explains what was built, how to run it and how it maps to iOS.

## Run it

```bash
npm install
npm run dev        # http://localhost:3300
```

- **On a computer**, the app sits in an iPhone frame. A small panel on the left switches light and dark mode, the phone width (360 / 390 / 430) and lets you jump to any screen.
- **On a phone**, the app fills the screen.
- **Review links:** `?screen=shop`, `picks`, `pick` (add `&id=altra-trail` etc.), `atelier`, `bag`, `more`, `filters`, `search`, `pair` or `handoff` (add `&device=tabletop` or `hologram`), plus `&theme=dark` and `&w=360`.

## What's in this build

| Screen | File | What works |
|---|---|---|
| 01 Home | `src/screens/Home.tsx` | **Arrival:** store photo, welcome, check-in, the one main button, composer. **Statement:** rises in line by line, each line from behind its own mask, when it scrolls into view. **Looks:** three stylist looks, each opening the stylist sheet. **Close:** a deep sage band that leads to the Shop. |
| 06 Shop | `src/screens/Shop.tsx` | **Slider:** swipe or tap the dots. **Chips:** filter the grid live, with counts. **Sort menu:** Recommended / New in / Colour. **Hearts:** save a piece. **Cards:** tapping one opens the stylist sheet. |
| 07 Curated picks | `src/screens/Picks.tsx` | An overview of the looks (build 0.6): a full-width hero slider with three featured looks (autoplay, swipe either way, "Shop the look"), then "All curated looks" as two-column look cards (tap = look page, "+ Add" = shop the complete look). Back button; no tab is highlighted. |
| 01b Stylist sheet | `src/screens/PickSheet.tsx` | **Photos:** swipe between angles. **Size:** XS–XL, with M pre-selected from the fit profile. **Add to bag:** adds the piece to the bag (was "Reserve size M"). **Personalise:** opens 02. "Show another option" moves to the next story. |
| 02 Personalise | `src/screens/AtelierSheet.tsx` | **Placement:** pins for Left chest and Sleeve; tap the back view for Center back, and the two views swap. **Thread:** four spools. **Monogram:** max 5 characters, cleaned as you type. **Motif:** Monogram, Botanical sprig or Line. A stitch loupe shows the detail. "Add personalisation" puts the embroidery in the bag. |
| 05 Bag → Checkout → Order | `src/screens/Checkout.tsx` | Three pages (structure from Hyun's RE/DONE flow). **Bag:** pieces with size, embroidery, quantity, Remove; subtotal; Proceed to checkout / Continue shopping; Recommended for you. **Checkout:** compact list (Edit), promo code, subtotal → total, Pay with Apple Pay. **Order:** status, vault QR code, order number, details; Go to My Visit. Payment is simulated. |
| My Visit / Wardrobe / More | `src/screens/Placeholders.tsx` | Simple placeholders. My Visit (stitching and vault) comes next. |

## Real brands and photos (build 0.4)

- **Logos:** the ten SVGs from `VF-Dev/brands` live in `public/brands`. `node scripts/build-brand-logos.mjs` turns them into one component, `src/components/BrandLogo.tsx`. The colour follows the text colour, and `--logo-k` evens out their sizes so stacked and wide logos look equally big.
- **Photos:** the 34 photos from `VF-Dev/photos` are in `public/photos` as `.webp`. Each product lists its photos in `src/data/catalog.ts`.
  - **Packshots** (product alone on white or black) sit on their own background colour, so there's no visible box.
  - **Model photos on a plain studio backdrop** are shown whole: the person stands at the bottom of the frame with a little room above the head, on the photo's own backdrop colour. Heads are never cut off.
  - **Hero rule:** a hero photo always runs full width, edge to edge (Shop slider, Curated picks "For today", the stylist sheet's photos, Home looks). The Shop slider starts *below* the top bar, so a photo never sits under the logo or the search.
  - If a photo fails, the old labelled stand-in shows instead.
- **Where they show:** Shop slider and grid, Curated picks, the stylist sheet (swipe through every photo), search results, Home looks, and the brand wall at the bottom of Home. The filter sheet and search panel have brand logo buttons.
- **Sizes now follow the product:** clothes XS–XL (your fit M), shoes EU 40–45 (your fit 42), bags "One size" (no size rail).
- **Please check, Hyun:** product names, colour names and the stylist lines are **sample data** I wrote from the photos. Check them against the brands' own catalogues before showing this outside the team.

## Tabletop and Hologram handoff (build 0.4)

How the phone hands a piece to a store screen (`src/screens/Handoff.tsx`):

1. **Pair, once per visit.** The first tap on a store-screen action opens the pair sheet:
   - **Scan code:** a camera view with a scanning line. In the prototype it "finds" the QR code after about 2 seconds.
   - **Enter code:** six boxes for the 6-digit code shown on the screen. A wrong code shakes and explains. Demo codes: **482 913** (Tabletop) and **730 618** (Hologram), or tap "Demo code".
2. **Hand off, one tap.** After pairing, "Personalize on Tabletop" or "Try on with Hologram" sends the piece straight away: *Sending…* then *Live*.
   - **Tabletop:** shows the piece with your monogram and thread. "Bring my design back" returns you to Personalise.
   - **Hologram (updated build 0.6):** colour, size and adding happen **on the Hologram**, not on the phone. The phone shows the piece live and waits. When you tap "Send to my phone" on the Hologram, the piece lands back on the phone with what you chose ("Sent from the Hologram · Rust · Size M"), and one tap adds it to the bag. In the prototype, "Demo: send it from the Hologram" stands in for that tap. Same idea as the Tabletop's "Bring my design back".
   - **Hologram (before):** shows the model in a column of light. The steps say to stand in front of the Hologram, where its camera sees you; there's no floor marker. You can reserve your size right there, or "End try-on". *Please confirm the step wording with the hardware team.*
3. **Live pill.** Close the sheet and keep browsing: a pill above the tab bar says "Live on the Hologram · Mountain Jacket". Tap it to go back.

**Where the actions are:**
- **Stylist sheet:** both actions (Hologram for clothes and shoes; Tabletop only for pieces that can be embroidered).
- **Personalise:** "Personalize on Tabletop".
- **Shop slider:** slide 2.
- **Home:** the "Seen on the hologram" look.
- **Search:** the "Try on with Hologram" follow-up.
- **More:** "Connected screens" lists what you're paired with.

**iOS:**
- QR scanning: VisionKit `DataScannerViewController` with `.barcode(symbologies: [.qr])`.
- Code field: `TextField` with `.textContentType(.oneTimeCode)` and `.keyboardType(.numberPad)`.
- The session: a WebSocket (or MultipeerConnectivity) channel to the device, keyed by the code.
- The live pill: a `safeAreaInset(edge: .bottom)` view above the tab bar. A Live Activity could do the same on the lock screen.

## Brand order (client feedback)

Wherever brands are listed together, they follow the client's order: **Vans, The North Face, Timberland, Altra, Eastpak, Icebreaker, JanSport, Kipling, Napapijri, Smartwool**.

This applies to:
- The logo wall on Home.
- Brand filters.
- The brand row in search.
- The logos on a look page.
- The brand lists on slides.

It's set once in `BRAND_ORDER` (`src/data/catalog.ts`); `byBrandOrder` sorts any shorter list the same way.

## Appearance setting (build 0.6)

**More → Settings → Appearance:** System (the default, follows the phone), Light or Dark.
- It changes the whole app right away and is remembered on the device.
- The review panel's Appearance switch changes the same setting.
- **iOS:** `@AppStorage("appearance")` plus `.preferredColorScheme(nil / .light / .dark)` on the root view.

The stylist button's sparkle is always the primary sage (sage-700). In dark mode it sits on a light frosted circle so it stays clear.

## More menu (build 0.6)

The structure follows Hyun's RE/DONE drop-up menu (`MoreSheet` in `src/screens/Placeholders.tsx`):
- **Your name:** "Hyun Lee · email · Member". Tapping it opens the **Member** page, which holds "What your stylist knows" (fit profile, style preferences, occasions).
- **In the store:** Store pass, Connected screens.
- **Links:** Store location & hours, Shop & returns, Privacy policy, Terms & agreements, Partners.
- **Footer:** SAP & VF Corporation lockup, then Powered by SAP (logo) · Sign out.

The links don't open anything yet.

## SAP logo (build 0.6)

"Powered by SAP" now uses the real SAP logo from `VF-Dev/brands/SAP Logo.svg` (`src/components/SapLogo.tsx`, a copy in `public/brands/sap.svg`), kept exactly as supplied: blue gradient tile, white letters. It appears at the foot of Home and in the More menu.

## SAP & VF Corporation lockup

Right above "Powered by SAP", in both places it appears (the foot of Home and the More menu), sits the SAP & VF Corporation lockup from `VF-Dev/brands/sap-vf.svg` (`src/components/SapVfLockup.tsx`). The file is one colour, so it takes the text colour around it: white on the dark Home footer (24pt tall), ink in the More menu (20pt tall, so it follows light and dark mode). iOS: add the SVG to the asset catalog with Preserve Vector Data and render it as a Template image.

## Sideways rows and saving looks (build 0.6)

- **Every sideways row swipes left and right:** Curated looks, More looks, Other options, Recommended for you and the like. The next card peeks in at the edge, so people know there's more.
  - On a phone this is a normal finger swipe.
  - In the computer preview you can grab a row with the mouse and drag it (`src/components/DragScroll.tsx`, mounted once in AppShell). It glides a little, then settles on a card.
- **Look cards have a heart** (top right), like product cards. A saved look is stored in the same `saved` list as `look:<id>`.

## Stylist button everywhere, look page buttons (build 0.6)

- **The stylist button is back on every screen.** There is now ONE button for the whole app, mounted in `AppShell`, bottom right above the tab bar.
  - It hides while you scroll down and comes back when you scroll up or stop.
  - It steps aside while a sheet, the search or the photo gallery is open.
  - **Home:** it appears as soon as Home's own message field scrolls away, so the two never sit on top of each other.
- **Look page:** the buttons are now in the page instead of stuck to the bottom. Under the stylist's comment:
  1. "Add complete look to bag" (main button, full width).
  2. "Try on with Hologram" (secondary, full width).
  3. Then "In this look" with the thumbnails.
- **Curated picks:** the slider dots moved just under the photo, so the stylist button never covers them.

## Lightbox for hero images (build 0.6)

Hero images have a fixed height, so some photos get cropped. On **detail pages** (a product, a curated look), **tap the hero image** (or its small ⤢ button, top right) to open a full-screen gallery (`src/components/Lightbox.tsx`):
- Every photo is shown whole, never cropped, on a dark background.
- **Swipe** left or right (arrow keys and mouse drag also work on a computer). A counter shows "2 / 14".
- **Close** with ✕, Escape, or a tap on the dark area. Pinch to zoom works on a phone.
- **Where it works:**
  - **Product photos:** the gallery holds all of that product's photos.
  - **Look page:** the look photo first, then every piece's photos.
- **Overview sliders** (Shop, Curated picks) don't open the gallery: tapping the photo opens the look, the same as "Shop the look".
- **iOS:** `fullScreenCover` with a `TabView(.page)` of zoomable images.

## Checkout, stylist field, sliders (build 0.6)

- **Checkout = three pages** (`src/screens/Checkout.tsx`, review links `?screen=bag`, `checkout`, `order`):
  - **Bag:** each piece with its embroidery, a quantity stepper (1–5) and Remove.
  - **Checkout:** the order in a card, a promo code and the total under a gold rule, then Apple Pay.
  - **Order:** "You're all set", with the status (being stitched, or ready in the vault), the vault QR, the order number and the details.

  The store is unmanned, so there's no "pay at the counter": you pay on the phone and collect from the vault. **My Visit** shows the order and links back to the code.
- **Stylist message field:**
  - Example questions take turns inside the field (as in the search).
  - Suggested question pills sit just above it.
  - The field is shorter (52px) in sheets so both fit.
  - A pill or a sent question opens the stylist conversation at the top of the screen.
- **Hero sliders move on by themselves:**
  - The Shop slider every 5s; the product photos every 4.5s.
  - Right-to-left, then back to the first.
  - They stop for 8s when you touch them and stay still with Reduce Motion.
  - You can swipe either way; on a computer you can drag with the mouse.
- **Product page:**
  - **Colour** now sits right above the sizes, as a dot per colour with the chosen one ringed. It's ready for pieces with several colours (`colors` in the catalogue).
  - **"Other options for you"** replaces "Show another option": the same thumbnails as the Shop, so you see the options straight away.

## Curated looks and Quick add (build 0.5)

Your stylist now curates whole outfits, not only single pieces. The customers are SAP employees, so the looks follow their week. The looks live in `LOOKS` in `src/data/catalog.ts`:
- **Saturday in the mountains:** jacket, base layer, trail shoes, backpack.
- **Office to after-work:** puffer, merino tee, Old Skool, day backpack.
- **The team offsite:** base layer, boots, tote.

- **Sunday run club:** merino tee, trail shoes, day backpack.

**Curated = looks only.** Store screens (Hologram, Tabletop) moved out of the curated spots into **My Visit → "In the store"**. They're still one tap away from any product.

**Where looks appear:**
- Home looks.
- Shop slider (slides 1 and 3).
- A "Curated looks" rail in the Shop and in Curated picks.

**Look card** (`LookCard` in `src/screens/Look.tsx`): the full photo with a "+ Add" pill, then the title and the pieces in it.
- **Tap the card:** opens the look.
- **Tap "+ Add":** opens "Shop the complete look".

**Look page** (`LookScreen`, `?screen=look&id=mountain`), top to bottom:
- The full-width photo.
- The occasion in gold, then the title.
- The brand logos.
- The stylist's comment.
- "In this look": a thumbnail per piece with its role ("Outer layer", "Shoes"…).
- "Try on with Hologram".
- More looks.
- A sticky "Add complete look to bag" button.

**Thumbnails:**
- **Tap the photo:** opens the product detail (the stylist sheet), which now ends with "About this piece": description, details and colour.
- **Tap "+ Add":** opens Quick add.

**Quick add** (`src/screens/QuickAddSheet.tsx`, `?screen=quickadd`) slides up from the bottom:
- **One piece:** photo, name, colour and the size row with your fit chosen, then "Add to bag · Size M".
- **Whole look ("Shop the complete look"):** every piece with its own size row (bags are "One size"), then "Add 4 pieces to bag".
- A toast confirms and links to the bag. Once a piece is in the bag, its "+ Add" turns into a sage "✓ In bag".

Every product card (Shop grid, rails) now has the same "+ Add".

**To add pants and accessories:** drop the photos into `VF-Dev/photos`, add the products to `PRODUCTS`, then add one line per piece to a look's `items` with its role (`'Bottoms'` or `'Accessory'`).

**Please check, Hyun:**
- The look names and the stylist comments are new copy.
- "About this piece" is sample text written from the photos. Replace it with the brands' own descriptions.

**iOS:**
- Look page: a `NavigationStack` destination with a `LazyVGrid(columns: 2)`.
- Quick add: `.sheet` with `.presentationDetents([.medium, .large])`.
- "+ Add": a `Button` overlaid `.bottomTrailing` on the image.

## Scroll reveals and the logo (build 0.4)

- **Logo = Home.** Tapping the S·Fashion logo in the top bar takes you Home from any tab. If you're already Home, it scrolls back to the top (like tapping the status bar on iOS).
- **Scroll reveals** (`src/components/Reveal.tsx`), following the design-system motion tokens:
  - **Headlines** (`RevealWords`): each word slides up out of its line, 80ms apart (HANDOFF 01b). Used on "Your stylist's picks", each look title, "In the store today" (Home and Shop), and the Curated picks section heads.
  - **Blocks** (`Reveal`): fade in while rising 16px (`distance-md`), 900ms (`duration-editorial`), on the brand curve, cascading 120ms apart (`stagger-editorial`). Used on look captions, "Explore look", the closing line and the brand logos.
  - Each one plays once, the first time it scrolls into view. **Only editorial content animates.** Shopping controls (sizes, Add to bag, bag, filters) never wait on an animation.
  - With Reduce Motion on, everything simply shows.
  - **iOS:** `.onAppear` + `withAnimation(.timingCurve(0.22, 1, 0.36, 1, duration: 0.9).delay(i * 0.12))` animating opacity and `offset(y:)`; for headlines, one `Text` per word in an `HStack`/flow layout, each clipped and offset.

## Global search (build 0.3)

One field to type in, talk to or ask (`src/components/Search.tsx`).

- **Where it is:**
  - **Shop, My Visit and Wardrobe:** always there, under the logo. On Shop, the logo row tucks away while you scroll down and comes back when you scroll up.
  - **Home:** hidden at first. It slides down once the message box at the bottom scrolls away, so there's always exactly one place to ask. Tapping the Home message box opens the same search.
- **The row:**
  - **Filters (left):** opens the filter sheet (size, colour, type, New in, Personalisable). Filters apply in every tab, and a gold number shows how many are on.
  - **Field:** its example hint changes every few seconds.
  - **Mic (right):** listens, with a gold dot, a moving wave and the words appearing. In the prototype, voice is simulated with a sample question.
- **The panel that slides down:**
  - **Empty:** stylist questions, quick picks, recent searches.
  - **Typing:** "Ask your stylist: …" plus matching pieces, live.
  - **Asking:** a short conversation with pieces to open.
- **Demo answers:** the stylist's answers are keyword-based demo answers in `src/data/stylist.ts`. Replace that file with the real stylist agent.
- **iOS:** `.searchable` with search suggestions, plus a toolbar for the filter and mic buttons. Voice uses `SFSpeechRecognizer`.

## Build 0.7 · stylist chat and the stitched statement

**Stylist chat** (`src/screens/ChatSheet.tsx`). The stylist button (bottom right) now opens a chat, not a product page. The structure comes from Hyun's RE/DONE reference, in the S·Fashion design:
- **Empty:** gold eyebrow "Ask me anything", the headline "Hi Hyun, what are you looking for today?", and four starter questions: What's new today?, Style a look for Saturday, Something warmer, Try on with Hologram.
- **Chatting:** your messages on the right in sage, the stylist's on the left in the usual stylist bubble, and the pieces it suggests as a swipeable row of Shop cards. Tapping a card opens the piece's page; closing it (⌄ or drag down) returns to the chat; "+ Add" is quick add.
- **Bottom:** follow-up questions in one row, the message field, and "Powered by SAP".
- **Top right:** clear the conversation, which asks first ("Yes, clear" / "Cancel").
- **One conversation for the whole app.** Questions from the search, the Home button and a piece's page all open this chat. The search shows "Continue with your stylist" when a conversation is going. **Home has a "Talk to your stylist" button instead of a text field** (Hyun: a button says exactly what happens). It is **the one main button on Home** (primary style, sparkle + label, and it uses the stylist's name if you gave it one). "Show my curated pick" was removed, because **Curated picks** is always top right. The button opens the chat, so the conversation starts there, with the arrival question first if it is still unanswered. The top-bar search is unchanged and still slides in once the button scrolls away; it is for finding things quickly. iOS: the primary `Button` presents the chat sheet.
- The sheet always opens tall, so it doesn't grow as messages arrive.
- iOS: a `.sheet` (large detent) with a ScrollView of messages and the composer in the bottom safe-area inset.

**Statement reveal** (Home, section 2; `src/components/SplitReveal.tsx`). The typography is back to how it was: light 300, 28/38, the full sentence. The whole sentence is now in ink, with no grey-to-black word light-up (Hyun used that in the last project). **Update (Hyun): the light-up is back, but later and slower to notice.** The lines rise in, in soft grey; then, as you scroll, the words light up to full ink one by one, starting a little below the middle of the screen (its top at 62% of the screen height; Hyun: "a little sooner") and finishing when it's 20% from the top (`highlight` prop on `SplitReveal`; scroll back and they dim again). Before, it had finished before you noticed it. Also fixed: the hidden measuring copy could be stretched by the unsplit sentence and leave everything on one long line (grid column now `minmax(0, 1fr)`). Two other versions were tried and dropped: a gold stitch and a pixel wall.
- When the paragraph scrolls into view, it rises in **line by line**. Each line slides up from behind its own mask with a slight 2° tilt that settles flat, 200ms after the line before. Each line takes 1.3s on the brand ease. It starts once the text is well into view (its top at about 60% of the screen), not as it peeks in.
- The lines are worked out from the real layout, so they follow the screen width. If the width changes, the split is done again.
- It plays once. Screen readers read the sentence once. Reduced motion: the text simply shows.
- iOS: split the text into lines (TextKit), put each line in a `.clipped()` frame, and animate `.offset(y:)` in with `.delay(i * 0.14)`.

**Member profile and interests** (More → your name). "What your stylist knows" now has four rows:
- **Fit profile:** Size M · Shoes EU 42.
- **Your style:** everyday words a shopper would pick: Outdoorsy, Sporty, Casual, Smart casual, Streetwear, Minimal. Colour and "quiet details" are gone; the stylist can learn colour from what you save and buy.
- **Interests:** what you love doing: Hiking, Running, Travel, Office days, Skate, Camping, Cycling. The order matters, and a number on each chip shows it.
- **Your plans** (was "Coming up"): one-time plans like "Mountain weekend · Saturday". **The demo starts with none**: the stylist asks on arrival. Your first plan decides which look leads the picks.
- Your style and Interests open a page of chips to turn on or off. Changes apply straight away.
- The data is `INTERESTS`, `STYLES`, `DEFAULT_PROFILE` and `looksFor()` in `catalog.ts`. Every look has an `interest`: mountain = hiking, run club = running, offsite = travel, office = office days. In the app state it's `state.profile`.

**Curated picks, built around interests** (Option B, Hyun). Nothing on the page repeats.
1. **Slider:** one look for each of your interests, in your order. Each slide's tag says why: "Because you love hiking", "Because you love running", "Because you love to travel".
2. **"More for hiking", "More for running", "More for travel":** one swipeable row per interest, holding that interest's *other* looks.
3. **"Something different":** looks outside your interests, in two columns. Each card is tagged with what it's for (Office days, Skate).
- The intro line says "Whole looks for what you love: hiking, running and travel."
- Change your interests in More → your name → Interests, and the whole page reshuffles.
- **11 looks now:** 3 each for hiking, running and travel, plus office and skate. The new ones are Cold-morning hike, Rainy trail day, Run to work, Easy recovery day, City weekend, Carry-on only and Skate park afternoon. They're built from pieces already in store, with hero photos from the brand model shots; swap them as new photos arrive.
- Logic: `looksFor(interests)` in `catalog.ts` returns `featured` (slider), `more` (rows per interest) and `rest` (Something different).
- **The stylist talks to you on a look page.** When a look is for one of your interests, the stylist's comment becomes personal, for example "You love hiking, so this is **the one for your next trail**…" or "You love running, so why not run in?…". Looks outside your interests keep the general comment. Every look has a `personal` line next to its `note` in `catalog.ts`. A new interest (skiing, say) just needs its looks and lines.
- **The Shop's hero slider follows your interests too:** the same three looks as Curated picks, each tagged "Because you love…". There's no looks row under it any more (Hyun): the Shop goes straight from the slider to "In the store today". Curated looks live in Curated picks.
- Elsewhere: the Shop row puts your interests first, and a look page's "More looks" shows the same interest first.

**"Powered by" credit, one layout everywhere** (Hyun). "POWERED BY" sits on top, with the SAP & VF Corporation lockup under it, on the Home footer, in the More menu and under the stylist chat field. The blue SAP logo is gone. It's one component, `src/components/PoweredBy.tsx`, so a change there changes all three. Under the chat field it's a single row instead ("POWERED BY  [SAP & VF Corporation]"), left-aligned, with a slightly bigger lockup (`row` prop).

**How the stylist learns your plans** (Hyun chose two ways).
1. **You tell it in the chat.** If a question mentions a day or time ("I've got a wedding on Friday"), the stylist answers, then asks "Want me to remember Wedding · Friday?" with **Remember it** / **No thanks**. Saying yes adds it to Your plans. It doesn't ask if you already have a plan on that day. Detection is demo keyword matching (`detectPlan` in `stylist.ts`); the real agent would understand any wording.
2. **It asks when you arrive (the chat starts here).** Until you answer, the chat opens straight on "You're checked in. Anything coming up I should dress you for?" (no hello screen). You tap an idea (Mountain weekend, Business trip, Team offsite, Ski trip, Race day), then when (Tomorrow, Saturday, Next week, This month), or **Nothing planned**. The exchange becomes the first lines of the conversation (`arrival` action in `store.tsx`), so it's still there next time. (The stylist button's little gold notification dot was removed later: Hyun found it distracting; the gold ring is enough.) In the store app this would follow the gate check-in.

**Clearing the chat starts it the same way (Hyun).** The old "Ask me anything / Hi Hyun, what are you looking for today?" screen with starter questions is gone. After **Clear → Yes, clear**, the stylist asks again: "Hi Hyun. Anything **coming up I should dress you for**?" (no "You're checked in", because you already are), with the same answer buttons. Your plans and picks stay; only the conversation is cleared (`clearChat` action, `arrivalQuestion()` in `store.tsx`). If you answer **Nothing planned** but told it a plan earlier, it says "No problem. Your picks are still ready for your mountain weekend on Saturday."

**Suggestion pills are always there (Hyun).** Right above the message field (and its rotating hint), one swipeable row: in a fresh or cleared chat the starter questions (What's new today? · Style a look for Saturday · Something warmer · Try on with Hologram, `CHAT_STARTERS` in `stylist.ts`); once the stylist answers, its own follow-ups replace them. They hide while the stylist is typing. **The pills are text only** (Hyun: the sparkle icon was removed), in the chat and on a product's sheet.

**Product details accordion (Hyun, product sheet).** Under "About this piece" on every product's sheet: a closed row "PRODUCT DETAILS" with a +. Tap → it slides open (height eases open over ~0.5s, the content fades up, the + turns into a −) and shows a spec table: Type, Material, Technology, Fit, Care, Colour, Product ID, SKU (RE/DONE-style: small grey caps labels, values on the right, hairlines between rows). Tap again to close; it closes by itself when you open another piece. (First tried on the look page; Hyun moved it here.) Components: `Accordion` + `SpecTable` in `src/components/Accordion.tsx`. Data: `TECH` in `catalog.ts`, **sample values** until SAP's product master supplies the real ones (it also holds a legacy ID and barcode, not shown). iOS: `DisclosureGroup` (or a button toggling `@State` with `.animation`).

**Top bars: the title is centred (Hyun)** on Curated look, Curated picks, a brand's page, the bag and checkout, like an iOS navigation title (`.barTitle`, 64px kept clear for the back and bag buttons, "…" if too long). iOS: `.navigationBarTitleDisplayMode(.inline)`.

**Product sheet price is bold** (700, like the name next to it).

**Look cards: "+ Add" adds the piece in the photo (Hyun, bug fix).** On a look card (More looks, Curated picks rows, Wardrobe), "+ Add" opens Quick add for that look's lead piece only (`heroProductId`, e.g. the Kipling Art Tote on "City weekend"), not the whole look. The whole look is still one tap away on the look's own page: "Add complete look · €…".

**Stylist button (Hyun):** the sparkle mark is bigger (38px, was 30px) in the same 60px circle, nudged up 2px so it looks centred; in light mode it's the darkest sage (sage-900), in dark mode sage-700. The gold notification dot is gone.

**Curation on the fly (Hyun).** When you name a plan, the stylist answers "Got it: wedding next week. I've put a look together for it…", followed by a **link card to that look** (photo, "For your wedding next week", the look's title, Shop the look →), then the look's pieces, then the follow-up **Show my curated picks**. At the same moment:
- Curated picks: the look moves to the front of the slider with the tag "For your wedding next week", and the intro says "Ready for your wedding next week, plus looks for what you love."
- Shop slider: the same order.
- Home: the statement says "Chosen for your wedding next week".
- The product sheet: the lead piece's stylist line says "For your … : this is the one piece I'd choose for it." (`noteFor`)

Saying **Remember it** to a plan heard in a question shows the same link card. With **no plan** (or Nothing planned), everything stays on the default: looks follow your interests, and the statement says "Chosen for what you love". Plan → look is demo keyword matching (`lookForPlan` in `catalog.ts`). **No formal wear (Hyun).** These brands don't make suits, so "Wedding" is no longer an idea button; **Ski trip** replaced it (→ "Cold-morning hike"). If someone types or picks a wedding (or gala, black tie, formal), the stylist says so plainly: "We don't carry suits or formal wear…". It then dresses **the trip and the days around it**, with the "City weekend" look tagged "For the trip to your wedding next week" (`isFormal`, `planTag` in `catalog.ts`).
- Calendar access was left out on purpose (privacy; to discuss with the client).

**Brand results page** (Hyun; `src/screens/Brand.tsx`). Tapping a brand logo, in the search panel or on Home's brand wall, opens that brand's page, like a search result with no hero slider:
- the brand logo and how many pieces are in store
- "Looks with Vans": the curated looks that include the brand
- "All Vans pieces": every piece from the brand, in two columns

Back returns you to where you were. Review link: `?screen=brand&id=vans`.

**Chat crash fixed.** In the claude.ai preview, tapping a question in the stylist chat showed "Something went wrong". The cause: the preview wraps the browser's scroll-to function, and our code accidentally handed its result back to React, which then tried to run it. The chat now scrolls its own list, so it works everywhere. The error screen also shows the technical reason in small print, to help next time.

**"Your plans"** (was "Coming up", Hyun). This row on the Member page holds one-time things coming up, like a trip or an event. Unlike interests, plans end.
- Tap it to see your plans and remove one (×).
- To add one, type what's happening (or tap an idea: Weekend away, Business trip, Team offsite, Wedding, Race day, City break) and when (or tap This weekend, Next week, This month), then tap Add plan.
- My Visit's header shows the first plan.
- The data is `profile.plans` and `PLAN_IDEAS` / `PLAN_WHENS` in `catalog.ts`.

**One category label per card** (Hyun). When a card already has a tag top left, like a look's "Top" or "Shoes", the small category pill bottom left is left out.

**If something breaks** (`src/app/error.tsx`). Instead of the browser's blank "Application error" page, the app shows "Something went wrong · Reload". If the preview was updated while it was open, it reloads by itself once.

**Hologram picture** (Hyun). The drawn hologram comp is replaced by the store photo of someone trying a jacket on the Hologram, in `public/assets/hologram-store.jpg`. It's used on the My Visit card and in the Hologram sheet, filling the frame. When the real Hologram feed exists, it replaces the photo inside `HologramStage`.

**Recommended for you (Bag page): New first** (Hyun). Pieces tagged New always lead the row on the left, then what goes with your bag, then earlier picks. Nothing already in the bag shows.

**"Add to bag" instead of "Reserve size M"** (Hyun). The main button on a product page now simply says **Add to bag**; the size is chosen right above it. Once added, it reads "View bag · N", with the line "In your bag. We'll hold it for you in store." The toast says "Added to your bag · View bag", or "4 items added to your bag" for several (no sizes in the wording, Hyun). We say "bag" (not "cart") everywhere, to match the bag icon and the Bag page.

**Sheets have no Back arrow** (Hyun). Sheets that slide up (Personalise, and a product opened from the chat) only have ⌄ to close; you can also drag them down. Closing takes you back to where you came from: the product's page for Personalise, the chat for a product opened from it. In-sheet steps (More → Member → Interests) keep their Back arrow, as on iOS.

**Stylist button timing** (Hyun). It now waits 0.7s after scrolling stops, then pops back in: it grows slightly past full size and settles, over about half a second. Hiding is quick (0.2s).

**Shop sort: Colour removed** (Hyun). Sorting A–Z by colour name meant nothing, so the sort menu is now Recommended, New in, Price: low to high and Price: high to low. To see one colour, use Filters → Colour.

**Bag always in reach** (Hyun, build 0.7). The bag button, with its count, now sits top right on every screen: Home, Shop, My Visit, Wardrobe, and the look and Curated picks pages (as a frosted round button next to Back). The "View bag" toast still shows after adding, but you no longer depend on it.

**Thumbnails, simpler** (Hyun, build 0.7).
- Every product card now reads: **product name**, then the brand in small caps, then the price. The colour is gone.
- A tiny frosted pill with the category (Outerwear, Tops, Footwear, Bags) sits at the bottom left of the photo, level with "+ Add".

**Wardrobe: Saved and Owned** (Hyun, build 0.7; `src/screens/Wardrobe.tsx`).
- **Tapping a heart** anywhere shows "Saved to your Wardrobe · View", so people learn where hearts go. Tapping it again shows "Removed from your Wardrobe".
- **Saved:** every look and piece you've hearted, in two-column grids. Tap one to open it; "+ Add" adds it to your bag.
- **Owned:** what you've paid for, one row per piece with size, "Personalised", and a **Digital Product Passport** button (placeholder for now).
- Each tab has a friendly empty state.

**Sample prices** (Hyun: "could be random").
- Every piece now has a price in euros, stored as `amount` in `catalog.ts`. For example: The North Face €330, Napapijri €260, Timberland €220, Altra €150, Kipling €110, Smartwool €95, Vans €85, Icebreaker €75, Eastpak €60, JanSport €45.
- Personalisation is €25 a piece.
- The bag, checkout and order pages add up real totals; VAT is included.
- The look page button reads "Add complete look · €620".
- Real prices will come from SAP.

**Tabs start at the top.** Tapping Home or Shop in the tab bar always opens that page at the top. Back from a look or product still returns you to where you were, like iOS.

**Home sign-off** ("Your stylist" / your stylist's name) now sits at the right edge of the paragraph, like a signature.

**Size guide and availability** (Hyun, build 0.7, from RE/DONE).
- **Above the sizes:** "Size · Your fit is M" on the left and **Size guide →** on the right. This shows on the product page and in Quick add.
- **The guide:** it opens on top of the piece's sheet, so closing it takes you straight back. It picks the right table for the kind of piece:
  - Jackets & coats: chest, sleeve, shoulder.
  - Tops & base layers: chest, length, sleeve.
  - Shoes: EU, UK, US and foot length.
- In the guide, your fit row (M or 42) has a soft sage band across the full width of the sheet (text keeps the page margin) and a gold "Your fit" tag, followed by "How to measure". The data is `SIZE_GUIDES` in `catalog.ts`; the sample measurements are in cm, and the real ones come from each brand.
- **Under the sizes:** one short line, "● Available in M · XL sold out". (The gold "Your fit" dot and key were removed: "Your fit is M" above the sizes already says it.)
- **Product sheet layout (Hyun: "more structure"):** everything is left-aligned. Brand logo → name with the **price on the right** → fabric. Then **one options card**: a "Colour · Taupe Green" row with the colour dots on the right, a thin line, then the Size block. Size pills have a thin outline so they show in dark mode. iOS: a `GroupBox` / inset-grouped `List` section with two rows.
- **Sold-out sizes look disabled:** no fill, faint, struck through, and they can't be tapped.
- **Demo stock:** The North Face XL, Napapijri XS, Smartwool L, Altra 45 and Timberland 40 and 44 are sold out (never the customer's own fit).

**Name your stylist** (Hyun, build 0.7).
- More → your name → **Your stylist's name** (the first row). Type any name, up to 20 characters, or leave it empty to keep "Your stylist".
- The name then shows everywhere the stylist speaks or signs: the chat and product page headers, the sign-off under the Home paragraph, "Jarvis's picks", "Ask Jarvis" in the search, "What Jarvis knows", and the screen-reader labels.
- A live preview under the field shows how it will look.
- Code: `profile.stylistName` in the store, and `useStylist()` gives the right wording (title, mid-sentence, possessive).
- The client may give the agent an official name; that would become the default, and people could still rename it.

**"How to wear it" on the look page** (Hyun, build 0.7).
- A short editorial now sits *below* "In this look", so the top stays short and the buttons stay high. The order is: hero, title, logos, the stylist's line, buttons, the pieces, How to wear it, More looks.
- It has one more full-width photo of the look (tap = lightbox), then three numbered blocks with gold 01, 02 and 03: **Wear it**, **Pack it**, **Wear it again**.
- The text is sample copy, stored as `story` on each look in `catalog.ts`.
- The photo is another model shot from the look's pieces; it's skipped if there isn't one.
- iOS: a VStack under the pieces grid; the photo in a 4:5 frame, `.scaledToFill()`.

**Hero images fill the frame** (Hyun, build 0.7).
- Every hero now fills its frame edge to edge, like `object-fit: cover`. That covers the Shop slider, the Curated picks slider, the look page hero and the product page photos.
- The crop keeps the top of the photo, so the head stays in frame.
- Tap a hero to see the whole photo in the lightbox.
- Packshots (a product on its own studio colour) stay whole.
- Since then it applies to cards and thumbnails too (Hyun: "white border cut off"), so model photos fill every frame and no backdrop edges show.
- Packshot background colours were matched to their photos (Timberland #F1F1F1, Vans #E9E5E1 / #E7E5E1).
- `cover` is now on by default; `cover={false}` brings back the old "whole model" look.
- In code it's the `cover` prop on `PhotoSlot`. iOS: `.scaledToFill()` with top alignment, `.clipped()`.

**Pure UI by default, ready for GitHub.**
- The app now shows on its own: full screen on a phone, and a phone-width column on a computer.
- The phone frame, fake status bar and review panel only appear with `?review=1`. They live in `src/app/ReviewFrame.tsx`, labelled as prototype tools; the iOS app doesn't need them.
- Added `README.md` (how to run it, where things are, how to work together) and a `.gitignore` that leaves out `node_modules`, build output, `_to_delete/`, `.DS_Store` and env files.

## The signature move: "the piece travels"

The garment you tap moves smoothly into the stylist sheet, and from there into Personalise. On the web this uses the browser's View Transitions (`withTransition` in `src/state/store.tsx`). Browsers without it simply skip the animation. **iOS:** `matchedGeometryEffect` with the brand curve `timingCurve(0.22, 1, 0.36, 1)`.

## For the iOS developer

| Web | SwiftUI |
|---|---|
| `src/state/store.tsx` (`AppState` + `reducer`) | `@Observable AppModel`: `tab` → `TabView`, `stack` → `NavigationStack` path, `sheet` → `.sheet(item:)` |
| `src/styles/tokens.css` | `ios/SFTokens.swift`. Both are generated from `design-system/tokens.json` by `npm run tokens`. |
| `src/components/ui.tsx` | `Button` → ButtonStyle (primary / secondary / quiet), `SizeRail`, `Composer`, `StylistMessage`, `Toast` |
| `src/components/Chrome.tsx` | `TopBar`, a custom floating `TabBar`, `StylistFab` |
| `src/components/Sheet.tsx` | `.sheet` with `.presentationDetents([.large])` and a grabber |
| `src/components/PhotoSlot.tsx` | `AsyncImage` with a placeholder; packshots use `.scaledToFit()` on their background colour, model photos `.scaledToFill()` |
| `src/components/BrandLogo.tsx` | Bundle the SVGs in the asset catalog (Preserve Vector Data, render as Template) |
| `src/components/GarmentFlat.tsx` | Placement-guide drawing (SVG to SwiftUI `Path`, or export it as a vector PDF) |
| Bag "Pay with Apple Pay" | `PKPaymentButton(paymentButtonType: .buy, paymentButtonStyle: .automatic)` |
| `src/components/Icon.tsx` | Closest SF Symbol (named in each comment) |
| Fonts in `src/fonts` | Poppins (stand-in for SAP 72) and Archivo Narrow; bundle the same files |

## Decisions made in this build (please check, Hyun)

1. **The stylist button is your sparkle on frosted glass,** on every screen (build 0.6). It hides while you scroll down and comes back when you scroll up or stop, so it doesn't sit on what you're reading. On Home it appears once the message field has scrolled away.
2. **Sizes run XS–XL** for clothes, from the Shop build prompt (HANDOFF listed S–XL). Shoes run EU 40–45.
3. **Personalise is offered for jackets and tops.** It isn't offered for shoes or bags, because there is no chest or sleeve to stitch. Each garment type has its own flat drawing.
4. **Reserving holds the piece in the bag.** After you reserve, the main button becomes "View bag".
5. **New copy written for this build:**
   - **Home greeting:** "Good afternoon, Hyun." (morning / afternoon / evening from the check-in time) replaces "Welcome to S·Fashion": the logo is already in the top bar, and HANDOFF §2 says Home welcomes people by name.
   - **Home video veil:** much lighter in the light theme (`--veil-*` in `globals.css`), so the video isn't washed out. Dark theme unchanged.
   - **Home statement:** "Today is about one piece…".
   - **Home section labels:** "Your stylist's picks", "Three looks for this visit".
   - **Home closing band:** "Ten brands on the rails, every piece in your size."
   - **Stylist lines** for each piece, based on the mountain weekend on Saturday.

   Edit these freely in `src/data/catalog.ts` and `src/screens/Home.tsx`.
6. **The slider tag is now a badge.** "Curated for you · 1 of 3" sits as a badge at the top-left of the slide instead of as a label above the title.
7. **The old previous-agent files are out of the build.** `src/data/storeData.ts` and `src/components/GarmentIllustration.tsx` had invented prices and mill names, which HANDOFF says not to invent. They were moved to `_to_delete/`.

## Still placeholder

- **Prices:** sample numbers until they come from SAP.
- **Home background video:** coming from Hyun. The store photo stays until then.
- **Stylist chat, voice and photo search:** show a short note instead.
- **Apple Pay:** simulated; the button text uses the system font, but the real button comes from Apple.
- **At 360px wide,** the Home composer hint ends in "…".

## Next

- **My Visit:** stitching live on the Tajima cell, then the vault with the unlock code. The bag's "Go to My Visit" already leads there.
- **The full More menu,** then Wardrobe once it's designed.
