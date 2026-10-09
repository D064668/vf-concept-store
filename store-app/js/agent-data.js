/* S·Fashion Store App — Agent Knowledge Base & Product Presets */

export const CATALOG = {
  "boxy-tee": {
    id: "boxy-tee",
    title: "Heavyweight Boxy Tee",
    price: 140,
    currency: "EUR",
    material: "100% Organic Pima Cotton · 280 GSM",
    description: "A relaxed, architectural silhouette tailored for structured draping. Dense knit provides a crisp, warp-free foundation for tactile tone-on-tone embroidery.",
    colors: [
      { id: "sage-900", name: "Deep Forest Sage", hex: "#2D4A3E", threadMatch: "#3D6B5A" },
      { id: "sage-100", name: "Chalk Mint", hex: "#D4E4DC", threadMatch: "#7A9A8A" },
      { id: "black", name: "Onyx Black", hex: "#1A1A1A", threadMatch: "#2D4A3E" }
    ],
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "M",
    defaultColor: "sage-900",
    svgBody: `
      <!-- T-Shirt Contour Silhouette -->
      <path d="M70,35 C85,45 125,45 140,35 L190,65 L170,105 L150,95 L150,195 L60,195 L60,95 L40,105 L20,65 Z" 
            fill="currentColor" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
      <!-- Ribbed Crewneck Collar -->
      <path d="M70,35 C85,48 125,48 140,35 C125,42 85,42 70,35 Z" 
            fill="rgba(0,0,0,0.1)" stroke="rgba(0,0,0,0.2)" stroke-width="1" />
      <!-- Subtle Fold Shadows -->
      <path d="M60,95 C75,115 75,170 65,195" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="1.5" />
      <path d="M150,95 C135,115 135,170 145,195" fill="none" stroke="rgba(0,0,0,0.07)" stroke-width="1.5" />
    `
  },
  "atelier-overshirt": {
    id: "atelier-overshirt",
    title: "Raw Linen Atelier Overshirt",
    price: 260,
    currency: "EUR",
    material: "100% Belgian Flax Linen · 340 GSM",
    description: "Relaxed workwear cut with horn buttons and dropped shoulders. Textured natural slub yarn creates depth beneath botanical stitchwork.",
    colors: [
      { id: "sage-700", name: "Atelier Sage", hex: "#3D6B5A", threadMatch: "#2D4A3E" },
      { id: "sand", name: "Raw Ecru", hex: "#E5DEC9", threadMatch: "#C4AF7E" }
    ],
    sizes: ["S", "M", "L", "XL"],
    defaultSize: "L",
    defaultColor: "sage-700",
    svgBody: `
      <!-- Overshirt Contour Silhouette -->
      <path d="M65,30 L90,40 L120,40 L145,30 L200,65 L180,110 L155,100 L155,200 L55,200 L55,100 L30,110 L10,65 Z" 
            fill="currentColor" stroke="rgba(0,0,0,0.15)" stroke-width="1.5" />
      <!-- Collar -->
      <path d="M65,30 L105,52 L90,40 Z" fill="rgba(0,0,0,0.15)" />
      <path d="M145,30 L105,52 L120,40 Z" fill="rgba(0,0,0,0.15)" />
      <!-- Placket and Pockets -->
      <line x1="105" y1="52" x2="105" y2="200" stroke="rgba(0,0,0,0.2)" stroke-width="2" />
      <rect x="68" y="80" width="26" height="32" rx="2" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1.2" />
      <rect x="116" y="80" width="26" height="32" rx="2" fill="none" stroke="rgba(0,0,0,0.15)" stroke-width="1.2" />
    `
  }
};

export const EMBROIDERY_MOTIFS = {
  "botanical-fern": {
    id: "botanical-fern",
    title: "Nordic Fern",
    category: "Botanical",
    promptMatch: ["botanical", "fern", "leaf", "nature", "plant", "organic"],
    svgPath: `
      <!-- Stem -->
      <path class="stitch-path" d="M28,52 C26,40 28,24 38,8" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
      <!-- Fronds Left -->
      <path class="stitch-path" d="M28,45 C20,43 14,40 10,43 C15,38 21,39 27,41" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <path class="stitch-path" d="M28,35 C18,31 12,28 8,30 C14,26 21,28 27,31" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <path class="stitch-path" d="M30,24 C22,19 16,16 13,18 C18,14 24,17 29,21" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <!-- Fronds Right -->
      <path class="stitch-path" d="M28,42 C36,40 43,39 46,42 C41,37 34,37 28,39" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <path class="stitch-path" d="M29,32 C38,29 45,27 49,30 C43,25 36,26 29,29" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
      <path class="stitch-path" d="M32,21 C40,17 46,14 48,17 C43,12 37,14 31,18" fill="currentColor" stroke="currentColor" stroke-width="1.2"/>
    `
  },
  "alpine-contour": {
    id: "alpine-contour",
    title: "Alpine Ridge",
    category: "Landscape",
    promptMatch: ["mountain", "ridge", "alpine", "peak", "contour", "lines", "minimal"],
    svgPath: `
      <path class="stitch-path" d="M6,44 L20,24 L32,34 L46,12 L54,44" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path class="stitch-path" d="M12,44 L24,30 L36,38 L48,22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="3,2"/>
      <circle cx="46" cy="7" r="3" fill="currentColor"/>
    `
  },
  "minimal-monogram": {
    id: "minimal-monogram",
    title: "Walldorf O11",
    category: "Editorial",
    promptMatch: ["monogram", "text", "initial", "o11", "logo", "walldorf", "vf"],
    svgPath: `
      <!-- Circle Triple Arc Accent -->
      <circle cx="28" cy="28" r="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="14,4"/>
      <!-- Letterform Stylized -->
      <path class="stitch-path" d="M21,18 C25,18 28,21 28,25 C28,29 25,32 21,32 C17,32 14,29 14,25 C14,21 17,18 21,18 Z" fill="none" stroke="currentColor" stroke-width="2.4"/>
      <line class="stitch-path" x1="36" y1="18" x2="36" y2="38" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
      <line class="stitch-path" x1="42" y1="18" x2="42" y2="38" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    `
  }
};

export const THREAD_PALETTES = [
  { id: "sage-tonal", name: "Tonal Sage (Quiet)", hex: "#3D6B5A", contrast: "tonal" },
  { id: "silver-frost", name: "Silver Frost (Subtle)", hex: "#A8C4B8", contrast: "soft" },
  { id: "sand-gold", name: "Walldorf Gold (Warm)", hex: "#C4AF7E", contrast: "accent" },
  { id: "black-onyx", name: "Onyx Shadow", hex: "#1A1A1A", contrast: "deep" }
];

export const CONVERSATION_FLOWS = {
  welcome: {
    agentText: "Good morning. You are authenticated at S·Fashion Walldorf. The atelier is calm today—how would you like to direct your collection?",
    intentChips: [
      { text: "✨ Curate Autumn Silhouette", action: "curate_look" },
      { text: "🧵 Custom Tonal Embroidery", action: "start_embroidery" },
      { text: "📍 Pair with Tabletop 55\"", action: "connect_table" },
      { text: "🏛️ Walldorf Executive Drop", action: "show_drop" }
    ]
  },
  curateLook: {
    agentText: "Based on our current in-store inventory and your tonal preference, I recommend the Heavyweight Boxy Tee in Deep Forest Sage. Dense 280 GSM Pima Cotton with an architectural drape.",
    cardType: "garment",
    intentChips: [
      { text: "🧵 Personalize with Embroidery", action: "start_embroidery" },
      { text: "📐 Sizing & Fit Details", action: "sizing_advice" },
      { text: "🔄 Switch to Linen Overshirt", action: "switch_garment" }
    ]
  },
  embroideryStudio: {
    agentText: "Welcome to the Embroidery Atelier. In our tonal aesthetic, stitches whisper through direction and relief rather than stark contrast. You can type an inspiration prompt, or sketch live on the 55\" table.",
    cardType: "atelier",
    intentChips: [
      { text: "🌿 Generate Nordic Botanical", action: "preset_botanical" },
      { text: "🏔️ Minimal Alpine Ridges", action: "preset_alpine" },
      { text: "🔲 Walldorf Monogram", action: "preset_monogram" },
      { text: "🚀 Checkout & Stitch Now", action: "proceed_checkout" }
    ]
  },
  tableSynced: {
    agentText: "Tabletop 55\" paired. Your phone is now an active design remote. Strokes drawn on this screen mirror instantly to the table canvas, and vice versa.",
    cardType: "table_paired",
    intentChips: [
      { text: "✨ Send Current Motif to Table", action: "push_to_table" },
      { text: "🎨 Pick Thread Color", action: "pick_thread" },
      { text: "✔️ Approve for Robotic Stitching", action: "proceed_checkout" }
    ]
  },
  checkoutSummary: {
    agentText: "Your bespoke piece is configured. Tajima Robot #1 in our atelier cell is idle and primed for your order. Confirm below to begin live robotic personalization.",
    cardType: "checkout",
    intentChips: [
      { text: "💳 Pay with Apple Pay (€140)", action: "execute_payment" },
      { text: "✏️ Adjust Embroidery Position", action: "adjust_placement" }
    ]
  },
  productionActive: {
    agentText: "Order confirmed. The robotic arm has retrieved your size M garment via RFID. Tajima 4-head machine is actively stitching your design. Watch the live needle feed above.",
    cardType: "production",
    intentChips: [
      { text: "📹 Watch Stitch Camera", action: "view_camera" },
      { text: "🔒 View Vault Assignment", action: "view_vault" }
    ]
  },
  vaultReady: {
    agentText: "Your personalized garment has been inspected, folded, and transferred to the Automated Fashion Vault. Tap to unlock your compartment.",
    cardType: "vault",
    intentChips: [
      { text: "🔑 Open Vault Compartment #04", action: "open_vault" },
      { text: "📜 View Digital Product Passport", action: "view_passport" }
    ]
  }
};
