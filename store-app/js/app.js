/* S·Fashion Store App — Application Controller & Interactive Experience */
import { CATALOG, EMBROIDERY_MOTIFS, THREAD_PALETTES, CONVERSATION_FLOWS } from "./agent-data.js";

class StoreApp {
  constructor() {
    this.state = {
      theme: "light",
      currentGarmentId: "boxy-tee",
      currentSize: "M",
      currentColorId: "sage-900",
      currentMotifId: "botanical-fern",
      currentPlacement: "chest-left",
      currentThreadId: "sage-tonal",
      tablePaired: false,
      orderState: "browsing", // browsing | checkout | stitching | vaulted
      stitchingProgress: 0,
      stitchingTimer: null,
      isRecordingVoice: false
    };

    this.dom = {
      viewport: document.getElementById("viewport-wrapper"),
      deviceShell: document.getElementById("device-shell"),
      garmentSvg: document.getElementById("stage-garment-svg"),
      embroideryLayer: document.getElementById("embroidery-layer"),
      embroiderySvg: document.getElementById("embroidery-svg"),
      stageTag: document.getElementById("stage-tag"),
      pairingBadge: document.getElementById("stage-pairing-badge"),
      placementChips: document.querySelectorAll(".placement-chip"),
      threadSwatches: document.getElementById("thread-swatches"),
      robotOverlay: document.getElementById("robot-production-overlay"),
      robotProgressFill: document.getElementById("robot-progress-fill"),
      robotPercentText: document.getElementById("robot-percent-text"),
      robotTimeText: document.getElementById("robot-time-text"),
      conciergeStream: document.getElementById("concierge-stream"),
      chipsCarousel: document.getElementById("chips-carousel"),
      composerInput: document.getElementById("composer-input"),
      composerSendBtn: document.getElementById("composer-send-btn"),
      composerVoiceBtn: document.getElementById("composer-voice-btn"),
      toast: document.getElementById("app-toast"),
      toastMessage: document.getElementById("toast-message"),
      themeToggleBtn: document.getElementById("theme-toggle-btn")
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.renderThreadSwatches();
    this.updateStageGarment();
    this.updateEmbroideryMotif();
    this.renderConversationStep(CONVERSATION_FLOWS.welcome);
  }

  bindEvents() {
    // Theme toggle
    if (this.dom.themeToggleBtn) {
      this.dom.themeToggleBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Presentation view toggles
    const btnPresTheme = document.getElementById("pres-btn-theme");
    const btnPresView = document.getElementById("pres-btn-view");
    if (btnPresTheme) {
      btnPresTheme.addEventListener("click", () => this.toggleTheme());
    }
    if (btnPresView) {
      btnPresView.addEventListener("click", () => this.toggleViewMode());
    }

    // Stage placement selector
    this.dom.placementChips.forEach(chip => {
      chip.addEventListener("click", (e) => {
        const placement = e.currentTarget.getAttribute("data-placement");
        this.setPlacement(placement);
      });
    });

    // Tabletop pairing badge tap
    if (this.dom.pairingBadge) {
      this.dom.pairingBadge.addEventListener("click", () => this.toggleTablePairing());
    }

    // Composer send
    this.dom.composerSendBtn.addEventListener("click", () => this.handleUserSubmit());
    this.dom.composerInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.handleUserSubmit();
    });

    // Voice simulation
    this.dom.composerVoiceBtn.addEventListener("click", () => this.simulateVoiceInput());
  }

  toggleTheme() {
    this.state.theme = this.state.theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", this.state.theme);
    this.showToast(`Theme switched to ${this.state.theme === "light" ? "Calm Sage" : "Velvet Atelier"}`);
  }

  toggleViewMode() {
    const isFull = this.dom.viewport.classList.toggle("fullscreen-mode");
    const btn = document.getElementById("pres-btn-view");
    if (btn) btn.textContent = isFull ? "iPhone Frame" : "Full Viewport";
  }

  showToast(message, actionText = null, onAction = null) {
    this.dom.toastMessage.textContent = message;
    this.dom.toast.classList.add("visible");
    setTimeout(() => {
      this.dom.toast.classList.remove("visible");
    }, 4000);
  }

  // -------------------------------------------------------------
  // ATELIER STAGE RENDERERS
  // -------------------------------------------------------------
  updateStageGarment() {
    const garment = CATALOG[this.state.currentGarmentId];
    if (!garment) return;

    const currentColor = garment.colors.find(c => c.id === this.state.currentColorId) || garment.colors[0];
    
    // Set SVG body & color
    this.dom.garmentSvg.innerHTML = garment.svgBody;
    this.dom.garmentSvg.style.color = currentColor.hex;

    // Update label
    this.dom.stageTag.textContent = `${garment.title} · ${currentColor.name}`;
  }

  updateEmbroideryMotif() {
    const motif = EMBROIDERY_MOTIFS[this.state.currentMotifId];
    const thread = THREAD_PALETTES.find(t => t.id === this.state.currentThreadId) || THREAD_PALETTES[0];
    if (!motif) return;

    this.dom.embroiderySvg.innerHTML = motif.svgPath;
    this.dom.embroiderySvg.style.color = thread.hex;

    // Trigger stroke draw animation
    const paths = this.dom.embroiderySvg.querySelectorAll(".stitch-path");
    paths.forEach(p => {
      p.classList.remove("animating");
      void p.offsetWidth; // reflow
      p.classList.add("animating");
    });
  }

  setPlacement(placement) {
    this.state.currentPlacement = placement;
    this.dom.embroideryLayer.setAttribute("data-placement", placement);
    
    this.dom.placementChips.forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-placement") === placement);
    });

    this.showToast(`Embroidery moved to ${placement.replace("-", " ")}`);
    if (this.state.tablePaired) {
      this.showToast(`Tabletop 55" updated to ${placement} position`);
    }
  }

  renderThreadSwatches() {
    this.dom.threadSwatches.innerHTML = "";
    THREAD_PALETTES.forEach(tp => {
      const el = document.createElement("div");
      el.className = `thread-swatch ${tp.id === this.state.currentThreadId ? "active" : ""}`;
      el.style.backgroundColor = tp.hex;
      el.title = tp.name;
      el.addEventListener("click", () => {
        this.setThread(tp.id);
      });
      this.dom.threadSwatches.appendChild(el);
    });
  }

  setThread(threadId) {
    this.state.currentThreadId = threadId;
    const thread = THREAD_PALETTES.find(t => t.id === threadId);
    this.renderThreadSwatches();
    this.updateEmbroideryMotif();
    this.showToast(`Thread adjusted to ${thread.name}`);
  }

  toggleTablePairing() {
    this.state.tablePaired = !this.state.tablePaired;
    if (this.state.tablePaired) {
      this.dom.pairingBadge.innerHTML = `<span class="sync-dot-pulse"></span> Table 01 Paired`;
      this.dom.pairingBadge.style.color = "var(--success)";
      this.dom.pairingBadge.style.borderColor = "var(--success)";
      this.showToast("Connected to Ideum 55\" Digital Graffiti Table on SAP WiFi (35ms)");
      this.appendAgentMessage("Tabletop 55\" paired. Strokes and configurations drawn on your mobile screen will mirror live on the interactive table.");
    } else {
      this.dom.pairingBadge.innerHTML = `Pair Table 55" ↗`;
      this.dom.pairingBadge.style.color = "var(--gold)";
      this.dom.pairingBadge.style.borderColor = "rgba(196, 175, 126, 0.3)";
      this.showToast("Disconnected from Tabletop");
    }
  }

  // -------------------------------------------------------------
  // CONCIERGE STREAM ORCHESTRATION
  // -------------------------------------------------------------
  renderConversationStep(flow) {
    this.appendAgentMessage(flow.agentText);

    if (flow.cardType) {
      this.renderMicroCard(flow.cardType);
    }

    this.renderIntentChips(flow.intentChips || []);
    this.scrollToBottom();
  }

  appendAgentMessage(text) {
    const item = document.createElement("div");
    item.className = "stream-item";
    item.innerHTML = `
      <div class="agent-msg-row">
        <div class="agent-avatar">✳</div>
        <div class="agent-bubble">
          <div class="agent-meta">S·Fashion Concierge</div>
          <p>${text}</p>
        </div>
      </div>
    `;
    this.dom.conciergeStream.appendChild(item);
    this.scrollToBottom();
  }

  appendUserMessage(text) {
    const item = document.createElement("div");
    item.className = "stream-item";
    item.innerHTML = `
      <div class="user-msg-row">
        <div class="user-bubble">
          <p>${text}</p>
        </div>
      </div>
    `;
    this.dom.conciergeStream.appendChild(item);
    this.scrollToBottom();
  }

  renderIntentChips(chips) {
    this.dom.chipsCarousel.innerHTML = "";
    chips.forEach(chip => {
      const btn = document.createElement("button");
      btn.className = "intent-chip";
      btn.textContent = chip.text;
      btn.addEventListener("click", () => this.handleIntentAction(chip.action, chip.text));
      this.dom.chipsCarousel.appendChild(btn);
    });
  }

  renderMicroCard(cardType) {
    const item = document.createElement("div");
    item.className = "stream-item";

    if (cardType === "garment") {
      const garment = CATALOG[this.state.currentGarmentId];
      item.innerHTML = `
        <div class="micro-card-garment">
          <div class="garment-head">
            <h4 class="garment-title">${garment.title}</h4>
            <span class="garment-price">€${garment.price}</span>
          </div>
          <p class="garment-specs">${garment.material}</p>
          <p class="garment-specs">${garment.description}</p>
          <div class="size-pill-group">
            ${garment.sizes.map(s => `
              <button class="size-pill ${s === this.state.currentSize ? "active" : ""}" data-size="${s}">${s}</button>
            `).join("")}
          </div>
        </div>
      `;
      // Bind size pills
      item.querySelectorAll(".size-pill").forEach(pill => {
        pill.addEventListener("click", (e) => {
          this.state.currentSize = e.target.getAttribute("data-size");
          item.querySelectorAll(".size-pill").forEach(p => p.classList.remove("active"));
          e.target.classList.add("active");
          this.showToast(`Selected size ${this.state.currentSize}`);
        });
      });
    } else if (cardType === "atelier") {
      item.innerHTML = `
        <div class="micro-card-atelier">
          <div class="atelier-prompt-row">
            <input type="text" class="atelier-input" id="card-prompt-input" placeholder="Prompt (e.g. Nordic fern, alpine peak)..." />
            <button class="atelier-btn-ai" id="card-prompt-btn">Refine ✨</button>
          </div>
          <div class="variants-row">
            ${Object.values(EMBROIDERY_MOTIFS).map(m => `
              <div class="variant-tile ${m.id === this.state.currentMotifId ? "active" : ""}" data-motif="${m.id}">
                <div class="variant-thumb">
                  <svg viewBox="0 0 56 56" fill="none" style="color:var(--sage-700)">${m.svgPath}</svg>
                </div>
                <span class="variant-title">${m.title}</span>
              </div>
            `).join("")}
          </div>
          <div class="tabletop-sync-bar">
            <div class="sync-info">
              <span class="sync-dot-pulse"></span>
              <span>${this.state.tablePaired ? "Table 01 Connected" : "Ideum 55\" Ready"}</span>
            </div>
            <button class="btn-sync-table" id="card-sync-table-btn">
              ${this.state.tablePaired ? "Push Design ↗" : "Pair Tabletop ↗"}
            </button>
          </div>
        </div>
      `;

      // Bind prompt button
      const promptBtn = item.querySelector("#card-prompt-btn");
      const promptInput = item.querySelector("#card-prompt-input");
      promptBtn.addEventListener("click", () => {
        if (promptInput.value.trim()) {
          this.generateCustomMotif(promptInput.value.trim());
        }
      });

      // Bind tiles
      item.querySelectorAll(".variant-tile").forEach(tile => {
        tile.addEventListener("click", (e) => {
          const motifId = e.currentTarget.getAttribute("data-motif");
          this.state.currentMotifId = motifId;
          item.querySelectorAll(".variant-tile").forEach(t => t.classList.remove("active"));
          e.currentTarget.classList.add("active");
          this.updateEmbroideryMotif();
          this.showToast(`Motif switched to ${EMBROIDERY_MOTIFS[motifId].title}`);
        });
      });

      // Bind table sync
      const syncBtn = item.querySelector("#card-sync-table-btn");
      syncBtn.addEventListener("click", () => this.toggleTablePairing());

    } else if (cardType === "checkout") {
      const garment = CATALOG[this.state.currentGarmentId];
      const motif = EMBROIDERY_MOTIFS[this.state.currentMotifId];
      const thread = THREAD_PALETTES.find(t => t.id === this.state.currentThreadId);

      item.innerHTML = `
        <div class="micro-card-checkout">
          <div class="checkout-summary-row">
            <span>Base Garment: ${garment.title} (Size ${this.state.currentSize})</span>
            <span>€${garment.price}</span>
          </div>
          <div class="checkout-summary-row">
            <span>Robotic Personalization: ${motif.title}</span>
            <span>Included</span>
          </div>
          <div class="checkout-summary-row">
            <span>Thread Spec: ${thread.name}</span>
            <span>Tajima 4-Head</span>
          </div>
          <div class="checkout-summary-row total-row">
            <span>Total</span>
            <span>€${garment.price}.00</span>
          </div>
          <button class="btn-apple-pay" id="card-apple-pay-btn">
            <span>Pay with</span> Pay
          </button>
        </div>
      `;

      const payBtn = item.querySelector("#card-apple-pay-btn");
      payBtn.addEventListener("click", () => this.executeCheckout());
    } else if (cardType === "vault") {
      item.innerHTML = `
        <div class="micro-card-vault">
          <div class="vault-eyebrow">Automated Fashion Vault</div>
          <div class="vault-compartment-num">COMPARTMENT #04</div>
          <div class="vault-qr-wrapper">
            <!-- Simulated High-Contrast Passcode QR -->
            <svg viewBox="0 0 100 100" width="100" height="100">
              <rect width="100" height="100" fill="#FFF"/>
              <rect x="10" y="10" width="25" height="25" fill="#1A1A1A"/>
              <rect x="15" y="15" width="15" height="15" fill="#FFF"/>
              <rect x="65" y="10" width="25" height="25" fill="#1A1A1A"/>
              <rect x="70" y="15" width="15" height="15" fill="#FFF"/>
              <rect x="10" y="65" width="25" height="25" fill="#1A1A1A"/>
              <rect x="15" y="70" width="15" height="15" fill="#FFF"/>
              <!-- Data dots -->
              <rect x="45" y="15" width="10" height="10" fill="#1A1A1A"/>
              <rect x="45" y="45" width="10" height="10" fill="#1A1A1A"/>
              <rect x="65" y="45" width="10" height="10" fill="#1A1A1A"/>
              <rect x="25" y="45" width="10" height="10" fill="#1A1A1A"/>
              <rect x="45" y="75" width="10" height="10" fill="#1A1A1A"/>
              <rect x="75" y="75" width="10" height="10" fill="#1A1A1A"/>
            </svg>
          </div>
          <p style="font-size:12px;color:var(--sage-300);margin:0;">Tap below to command vault door release</p>
          <button class="btn-open-vault" id="card-open-vault-btn">Unlock Compartment Door</button>
        </div>
      `;

      const vaultBtn = item.querySelector("#card-open-vault-btn");
      vaultBtn.addEventListener("click", () => {
        this.showToast("Vault Door #04 Unlocked. Please retrieve your garment.");
        this.appendAgentMessage("Vault Door #04 is open. Thank you for creating at S·Fashion. Your Digital Product Passport is now permanently activated.");
        this.renderMicroCard("passport");
      });
    } else if (cardType === "passport") {
      item.innerHTML = `
        <div class="micro-card-passport">
          <div class="passport-badge">
            <span>🛡️</span>
            <span>Digital Product Passport Active</span>
          </div>
          <div class="passport-cert-row">CERT ID: SF-2026-WDF-08492</div>
          <div class="passport-cert-row">YARN: GOTS Organic Pima (Peru)</div>
          <div class="passport-cert-row">STITCHING: Tajima Robot #1 (Walldorf Atelier)</div>
          <div class="passport-cert-row">CARBON IMPACT: 2.1 kg CO2e (Neutralized)</div>
          <button class="pres-btn" style="margin-top:8px;background:var(--primary);color:#FFF;">View Full Craftsmanship Story ↗</button>
        </div>
      `;
    }

    this.dom.conciergeStream.appendChild(item);
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.dom.conciergeStream.scrollTop = this.dom.conciergeStream.scrollHeight;
    }, 50);
  }

  // -------------------------------------------------------------
  // USER SUBMISSIONS & INTENT PROCESSING
  // -------------------------------------------------------------
  handleUserSubmit() {
    const text = this.dom.composerInput.value.trim();
    if (!text) return;

    this.appendUserMessage(text);
    this.dom.composerInput.value = "";
    this.processNaturalLanguage(text);
  }

  simulateVoiceInput() {
    if (this.state.isRecordingVoice) return;
    this.state.isRecordingVoice = true;
    this.dom.composerVoiceBtn.classList.add("recording");
    this.dom.composerInput.placeholder = "Listening to voice intent...";

    const voicePhrases = [
      "Show me a heavyweight boxy tee in sage with a botanical fern",
      "Switch to the raw linen atelier overshirt",
      "Move the embroidery to the left sleeve with gold thread",
      "Pair with the table in the center of the store",
      "Ready to checkout and start robot production"
    ];
    const phrase = voicePhrases[Math.floor(Math.random() * voicePhrases.length)];

    setTimeout(() => {
      this.state.isRecordingVoice = false;
      this.dom.composerVoiceBtn.classList.remove("recording");
      this.dom.composerInput.placeholder = "Ask your concierge or direct a look...";
      this.appendUserMessage(`🎙️ "${phrase}"`);
      this.processNaturalLanguage(phrase);
    }, 1800);
  }

  processNaturalLanguage(query) {
    const q = query.toLowerCase();

    // Check intents
    if (q.includes("overshirt") || q.includes("linen")) {
      this.state.currentGarmentId = "atelier-overshirt";
      this.state.currentColorId = "sage-700";
      this.updateStageGarment();
      this.renderConversationStep({
        agentText: "Switched to the Raw Linen Atelier Overshirt. Belgian flax linen (340 GSM) with natural slub texture.",
        cardType: "garment",
        intentChips: [
          { text: "🧵 Personalize Embroidery", action: "start_embroidery" },
          { text: "🔄 Back to Boxy Tee", action: "switch_to_tee" }
        ]
      });
    } else if (q.includes("fern") || q.includes("botanical") || q.includes("leaf")) {
      this.state.currentMotifId = "botanical-fern";
      this.updateEmbroideryMotif();
      this.renderConversationStep({
        agentText: "Selected Nordic Fern. The dense tonal stitchwork flows naturally along the contour of the fabric.",
        cardType: "atelier",
        intentChips: [
          { text: "📍 Move to Chest Left", action: "pos_chest" },
          { text: "📍 Move to Sleeve", action: "pos_sleeve" },
          { text: "💳 Proceed to Checkout", action: "proceed_checkout" }
        ]
      });
    } else if (q.includes("mountain") || q.includes("alpine") || q.includes("ridge")) {
      this.state.currentMotifId = "alpine-contour";
      this.updateEmbroideryMotif();
      this.renderConversationStep({
        agentText: "Selected Alpine Ridge. Minimalist line vectors translated into continuous embroidery paths.",
        cardType: "atelier",
        intentChips: [
          { text: "💳 Proceed to Checkout", action: "proceed_checkout" },
          { text: "📍 Pair with Tabletop", action: "connect_table" }
        ]
      });
    } else if (q.includes("table") || q.includes("canvas") || q.includes("pair")) {
      this.toggleTablePairing();
    } else if (q.includes("checkout") || q.includes("pay") || q.includes("order")) {
      this.renderConversationStep(CONVERSATION_FLOWS.checkoutSummary);
    } else if (q.includes("gold") || q.includes("thread")) {
      this.setThread("sand-gold");
      this.appendAgentMessage("Applied Walldorf Gold embroidery thread. Warm, restrained satin sheen.");
    } else {
      // General concierge reply
      this.renderConversationStep({
        agentText: `I have noted: "${query}". I've refined our garment preview accordingly. Would you like to review the embroidery placement or proceed?`,
        intentChips: [
          { text: "🧵 Adjust Atelier Motif", action: "start_embroidery" },
          { text: "💳 Checkout & Produce", action: "proceed_checkout" },
          { text: "📍 Pair Tabletop 55\"", action: "connect_table" }
        ]
      });
    }
  }

  handleIntentAction(action, label) {
    this.appendUserMessage(label);

    switch (action) {
      case "curate_look":
        this.renderConversationStep(CONVERSATION_FLOWS.curateLook);
        break;
      case "start_embroidery":
        this.renderConversationStep(CONVERSATION_FLOWS.embroideryStudio);
        break;
      case "connect_table":
        this.toggleTablePairing();
        break;
      case "show_drop":
        this.renderConversationStep({
          agentText: "The Walldorf Executive Drop celebrates the SAP × VF partnership. Featuring botanical tone-on-tone embroidery engineered for high-density robotic production.",
          cardType: "garment",
          intentChips: [
            { text: "🧵 Customize this Drop", action: "start_embroidery" },
            { text: "💳 Immediate Checkout", action: "proceed_checkout" }
          ]
        });
        break;
      case "proceed_checkout":
        this.renderConversationStep(CONVERSATION_FLOWS.checkoutSummary);
        break;
      case "execute_payment":
        this.executeCheckout();
        break;
      case "preset_botanical":
        this.state.currentMotifId = "botanical-fern";
        this.updateEmbroideryMotif();
        this.showToast("Applied Nordic Botanical motif");
        break;
      case "preset_alpine":
        this.state.currentMotifId = "alpine-contour";
        this.updateEmbroideryMotif();
        this.showToast("Applied Alpine Ridge motif");
        break;
      case "preset_monogram":
        this.state.currentMotifId = "minimal-monogram";
        this.updateEmbroideryMotif();
        this.showToast("Applied Walldorf O11 Monogram");
        break;
      case "switch_garment":
        this.state.currentGarmentId = "atelier-overshirt";
        this.state.currentColorId = "sage-700";
        this.updateStageGarment();
        this.renderConversationStep({
          agentText: "Updated to the Raw Linen Atelier Overshirt in Atelier Sage.",
          cardType: "garment",
          intentChips: [
            { text: "🧵 Design Embroidery", action: "start_embroidery" },
            { text: "💳 Checkout", action: "proceed_checkout" }
          ]
        });
        break;
      case "switch_to_tee":
        this.state.currentGarmentId = "boxy-tee";
        this.state.currentColorId = "sage-900";
        this.updateStageGarment();
        this.renderConversationStep({
          agentText: "Reverted to the Heavyweight Boxy Tee in Deep Forest Sage.",
          cardType: "garment",
          intentChips: [
            { text: "🧵 Design Embroidery", action: "start_embroidery" },
            { text: "💳 Checkout", action: "proceed_checkout" }
          ]
        });
        break;
      case "pos_chest":
        this.setPlacement("chest-left");
        break;
      case "pos_sleeve":
        this.setPlacement("sleeve-left");
        break;
      case "open_vault":
        this.showToast("Command sent: Vault Door #04 opened.");
        this.appendAgentMessage("Vault Door #04 is unlocked. Please collect your folded garment.");
        this.renderMicroCard("passport");
        break;
      default:
        this.appendAgentMessage("Action acknowledged. How would you like to direct the atelier next?");
        break;
    }
  }

  generateCustomMotif(prompt) {
    this.appendAgentMessage(`Translating "${prompt}" into embroidery-ready vectors in the S·Fashion tonal style...`);
    setTimeout(() => {
      // Toggle to alpine or fern based on words
      if (prompt.toLowerCase().includes("mountain") || prompt.toLowerCase().includes("geo")) {
        this.state.currentMotifId = "alpine-contour";
      } else {
        this.state.currentMotifId = "botanical-fern";
      }
      this.updateEmbroideryMotif();
      this.appendAgentMessage(`Generated bespoke motif for "${prompt}". Stitches are mapped to 4mm relief satin thread.`);
      this.showToast("AI stitch pattern generated successfully");
    }, 1200);
  }

  // -------------------------------------------------------------
  // ROBOTIC TAJIMA EMBROIDERY & VAULT FULFILLMENT SIMULATION
  // -------------------------------------------------------------
  executeCheckout() {
    this.showToast("Apple Pay Authenticated. Order transmitted to S/4HANA & Tajima Cell.");
    this.dom.robotOverlay.classList.add("active");
    this.state.orderState = "stitching";
    this.state.stitchingProgress = 0;

    this.appendAgentMessage("Payment complete. Universal Robot retrieved your garment; Tajima 4-head machine has commenced stitching. Watch live progress above.");

    // Progress simulation
    this.state.stitchingTimer = setInterval(() => {
      this.state.stitchingProgress += 10;
      this.dom.robotProgressFill.style.width = `${this.state.stitchingProgress}%`;
      this.dom.robotPercentText.textContent = `${this.state.stitchingProgress}%`;
      
      const secondsLeft = Math.max(0, Math.ceil((100 - this.state.stitchingProgress) * 0.1));
      this.dom.robotTimeText.textContent = `${secondsLeft}s remaining`;

      if (this.state.stitchingProgress >= 100) {
        clearInterval(this.state.stitchingTimer);
        setTimeout(() => {
          this.dom.robotOverlay.classList.remove("active");
          this.state.orderState = "vaulted";
          this.renderConversationStep(CONVERSATION_FLOWS.vaultReady);
        }, 800);
      }
    }, 500);
  }
}

// Instantiate on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.sFashionApp = new StoreApp();
});
