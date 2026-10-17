'use client';
// store.tsx
// ------------------------------------------------------------------
// The app's memory. One object holds everything the customer has chosen
// (tab, open sheet, sizes, saved hearts, bag, personalisation), and every
// change goes through one function: `reducer`.
//
// iOS mapping: this is the `@Observable final class AppModel` in SwiftUI.
//   tab    -> TabView selection          sheet -> .sheet(item:)
//   stack  -> NavigationStack path       bag   -> [BagItem]
// ------------------------------------------------------------------
import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import type { BrandId } from '@/components/BrandLogo';
import { byId, CUSTOMER, DEFAULT_PROFILE, fitFor, isFormal, lookForPlan, planTag, planWords, type Category, type Interest, type Plan, type Photo, type MotifId, type PlacementId, type Size, type ThreadId } from '@/data/catalog';

export type Tab = 'home' | 'shop' | 'visit' | 'wardrobe';
/** screens pushed on top of a tab. `look:<id>` = a curated look's detail */
/** pushed pages: … and `brand:<id>` = a brand's results page (from a logo in search or on Home) */
export type Pushed = 'picks' | `look:${string}` | `brand:${string}` | 'bag' | 'checkout' | 'order';
export type Sheet =
  /** a piece's page; back: 'chat' when it was opened from the stylist chat (shows a Back arrow) */
  | { kind: 'pick'; productId: string; back?: 'chat' }
  /** the stylist chat: one conversation, opened by the stylist button or any question */
  | { kind: 'chat' }
  /** from: 'pick' when opened from the piece's page — sliding it down goes back there */
  | { kind: 'atelier'; productId: string; from?: 'pick' }
  | { kind: 'bag' }
  | { kind: 'more' }
  | { kind: 'filters' }
  | { kind: 'pair'; device: Device; productId: string }
  | { kind: 'handoff'; device: Device; productId: string }
  /** Quick add: one piece (from a thumbnail's +) or a whole look ("Add the whole look") */
  | { kind: 'quickadd'; productIds: string[]; lookId?: string };

/** In-store screens a phone can hand a piece to (iOS: a session over the store network) */
export type Device = 'tabletop' | 'hologram';
export const DEVICES: Record<Device, { name: string; action: string; code: string }> = {
  tabletop: { name: 'Tabletop 55″', action: 'Personalize on Tabletop', code: '482913' },
  hologram: { name: 'Hologram', action: 'Try on with Hologram', code: '730618' },
};

/** One line in a search conversation (iOS: an enum case with associated values) */
export interface ChatLine {
  id: number;
  role: 'user' | 'stylist';
  text: string;
  bold?: string;
  productIds?: string[];
  followUps?: string[];
  /** a plan the stylist heard in your question ("…next week") and offers to remember */
  plan?: Plan;
  /** a curated look the stylist put together: shown as a link card ("Shop the look →") */
  lookId?: string;
  /** the small line above the look's title ("For your wedding next week") */
  lookLabel?: string;
}

/** The global search (top field + Home composer share it) */
export interface SearchState {
  open: boolean;
  query: string;
  listening: boolean;
  thread: ChatLine[];
  thinking: boolean;
}

/** Global filters: set once, they apply in every tab until cleared */
export interface Filters {
  brands: BrandId[];
  sizes: Size[];
  colours: string[];
  categories: Category[];
  newIn: boolean;
  personalisable: boolean;
}
export const NO_FILTERS: Filters = { brands: [], sizes: [], colours: [], categories: [], newIn: false, personalisable: false };
export const filterCount = (f: Filters) =>
  f.brands.length + f.sizes.length + f.colours.length + f.categories.length + Number(f.newIn) + Number(f.personalisable);

export interface Personalisation {
  text: string;
  thread: ThreadId;
  placement: PlacementId;
  motif: MotifId;
}
export interface BagItem {
  productId: string;
  size: Size;
  /** how many (1 if not set) */
  qty?: number;
  personalisation?: Personalisation;
}
/** A paid order: what was bought, and where to collect it */
export interface Order {
  id: string;
  items: BagItem[];
  /** true if any piece is being embroidered (it goes to the Tajima cell first) */
  stitching: boolean;
  vault: string;
  /** when it was paid (ms): the stitching tracker in My Visit counts from here */
  paidAt?: number;
  /** when the embroidery was finished and the piece went into the vault (ms) */
  readyAt?: number;
}
/** total pieces in the bag, counting quantities */
export const bagCount = (bag: BagItem[]) => bag.reduce((n, b) => n + (b.qty ?? 1), 0);
/** the three checkout pages, so opening one replaces the others */
const CHECKOUT: Pushed[] = ['bag', 'checkout', 'order'];

export interface AppState {
  tab: Tab;
  stack: Pushed[];
  sheet: Sheet | null;
  sizes: Record<string, Size>;
  saved: string[];
  bag: BagItem[];
  draft: Personalisation;
  paid: boolean;
  /** Appearance (More → Settings). 'system' = follow the phone. Default: system. */
  theme: 'system' | 'light' | 'dark';
  /** Home's message field is on screen (the stylist button waits until it scrolls away) */
  composerOnScreen: boolean;
  /** full-screen photo gallery (tap any hero image) */
  lightbox: { photos: Photo[]; index: number; title: string } | null;
  /** the size guide sheet, for one kind of piece (opens on top of the piece's sheet) */
  sizeGuide: Category | null;
  /** the last paid order (shown on the order page and in My Visit) */
  order: Order | null;
  toast: { id: number; text: string; action?: 'bag' | 'wardrobe' } | null;
  search: SearchState;
  filters: Filters;
  /** which store screens this phone is connected to (pairing lasts the visit) */
  paired: Device[];
  /** a piece currently showing on a store screen */
  live: { device: Device; productId: string } | null;
  /** the stylist's arrival question ("Anything coming up?") has been answered this visit */
  plansAsked: boolean;
  /** the chat was cleared: the stylist greets you again ("Hi Hyun. Anything coming up…") */
  chatRestarted: boolean;
  /** What your stylist knows (More → your name): your style words and your interests, in order */
  profile: { styles: string[]; interests: Interest[]; /** the name you gave your stylist ('' = "Your stylist") */ stylistName: string; /** one-time things coming up */ plans: Plan[] };
}

export const DEFAULT_DRAFT: Personalisation = { text: 'H·L', thread: 'gold', placement: 'chest', motif: 'monogram' };

export const initialState: AppState = {
  tab: 'home',
  stack: [],
  sheet: null,
  sizes: {},
  profile: DEFAULT_PROFILE,
  plansAsked: false,
  chatRestarted: false,
  saved: ['tnf-mountain'], // the stylist's pick is saved by default (HANDOFF §6 · 06)
  bag: [],
  draft: DEFAULT_DRAFT,
  paid: false,
  theme: 'system',
  composerOnScreen: true,
  lightbox: null,
  sizeGuide: null,
  order: null,
  toast: null,
  search: { open: false, query: '', listening: false, thread: [], thinking: false },
  filters: NO_FILTERS,
  paired: [],
  live: null,
};

type Action =
  | { type: 'tab'; tab: Tab }
  | { type: 'push'; screen: Pushed }
  | { type: 'pop' }
  | { type: 'sheet'; sheet: Sheet | null }
  | { type: 'size'; productId: string; size: Size }
  | { type: 'save'; productId: string }
  | { type: 'reserve'; productId: string; size: Size }
  | { type: 'draft'; patch: Partial<Personalisation> }
  | { type: 'personalise'; productId: string }
  | { type: 'remove'; productId: string }
  | { type: 'qty'; productId: string; qty: number }
  | { type: 'lightbox'; lightbox: AppState['lightbox'] }
  | { type: 'sizeGuide'; category: Category | null }
  | { type: 'composer'; onScreen: boolean }
  | { type: 'theme'; theme: AppState['theme'] }
  | { type: 'pay' }
  /** the embroidery is finished (the demo clock in AppShell sends this) */
  | { type: 'stitchDone' }
  | { type: 'toast'; text: string | null; action?: 'bag' | 'wardrobe' }
  | { type: 'search'; patch: Partial<SearchState> }
  | { type: 'ask'; text: string }
  /** "Add to bag" tapped ON a store screen (Hologram, Tabletop): it lands in this phone's bag.
   *  From the Tabletop it comes with the embroidery designed there. */
  | { type: 'addFrom'; device: Device; productId: string }
  /** the arrival question was answered (or skipped) */
  | { type: 'plansAsked' }
  /** clear the conversation: it starts again with the stylist's greeting question */
  | { type: 'clearChat' }
  /** your answer to "Anything coming up I should dress you for?" (null = nothing planned).
   *  It's saved to Your plans, the chat shows the exchange, and the curated picks re-order. */
  | { type: 'arrival'; plan: Plan | null }
  /** change your style words or interests (Member page) */
  | { type: 'profile'; patch: Partial<AppState['profile']> }
  | { type: 'reply'; line: Omit<ChatLine, 'id' | 'role'> }
  | { type: 'filters'; filters: Filters }
  | { type: 'add'; items: { productId: string; size: Size }[] }
  | { type: 'pair'; device: Device }
  | { type: 'live'; live: AppState['live'] };

let toastId = 0;
/** the stylist's first question after check-in */
export const ARRIVAL_QUESTION = 'You’re checked in. Anything coming up I should dress you for?';
/** the same question after you clear the chat (you're already checked in, so it greets you instead) */
export const arrivalQuestion = (restarted: boolean) =>
  restarted ? `Hi ${CUSTOMER.firstName}. Anything coming up I should dress you for?` : ARRIVAL_QUESTION;
/** the follow-up that opens Curated picks (an action, not a question) */
export const SHOW_PICKS = 'Show my curated picks';
/** demo order-number prefix (the real one comes from SAP) */
const CUSTOMER_CODE = '2614';

function reducer(s: AppState, a: Action): AppState {
  switch (a.type) {
    case 'tab':
      return { ...s, tab: a.tab, stack: [], sheet: null, search: { ...s.search, open: false, listening: false } };
    case 'push':
      // checkout pages replace each other, so Back from the order never returns to a paid bag
      return { ...s, stack: [...(CHECKOUT.includes(a.screen) ? s.stack.filter((x) => !CHECKOUT.includes(x) || a.screen === 'checkout') : s.stack), a.screen], sheet: null, search: { ...s.search, open: false, listening: false } };
    case 'pop':
      return { ...s, stack: s.stack.slice(0, -1) };
    case 'sheet':
      // the bag is a page now (bag → checkout → order), not a sheet: "open the bag" pushes it
      if (a.sheet?.kind === 'bag')
        return { ...s, sheet: null, stack: [...s.stack.filter((x) => !CHECKOUT.includes(x)), 'bag'], search: { ...s.search, open: false, listening: false } };
      return { ...s, sheet: a.sheet, sizeGuide: null, search: a.sheet ? { ...s.search, open: false, listening: false } : s.search };
    case 'size':
      return { ...s, sizes: { ...s.sizes, [a.productId]: a.size } };
    case 'save': {
      // a heart saves a piece (or a look, "look:<id>") to Wardrobe → Saved, and says so
      const was = s.saved.includes(a.productId);
      return {
        ...s,
        saved: was ? s.saved.filter((x) => x !== a.productId) : [...s.saved, a.productId],
        toast: { id: ++toastId, text: was ? 'Removed from your Wardrobe' : 'Saved to your Wardrobe', action: was ? undefined : 'wardrobe' },
      };
    }
    case 'reserve': {
      // Reserving the same piece again just updates its size.
      const exists = s.bag.find((b) => b.productId === a.productId);
      const bag = exists
        ? s.bag.map((b) => (b.productId === a.productId ? { ...b, size: a.size } : b))
        : [...s.bag, { productId: a.productId, size: a.size }];
      return { ...s, bag, paid: false, toast: { id: ++toastId, text: 'Added to your bag', action: 'bag' } };
    }
    case 'add': {
      // Quick add: put one or more pieces in the bag (an existing piece just updates its size)
      let bag = s.bag;
      for (const it of a.items) {
        bag = bag.some((b) => b.productId === it.productId)
          ? bag.map((b) => (b.productId === it.productId ? { ...b, size: it.size } : b))
          : [...bag, { productId: it.productId, size: it.size }];
      }
      // plain wording, no sizes (Hyun): "Added to your bag" / "4 items added to your bag"
      const n = a.items.length;
      const text = n > 1 ? `${n} items added to your bag` : 'Added to your bag';
      return { ...s, bag, paid: false, sheet: null, toast: { id: ++toastId, text, action: 'bag' } };
    }
    case 'draft':
      return { ...s, draft: { ...s.draft, ...a.patch } };
    case 'personalise': {
      // Confirming the atelier puts the piece in the bag with its embroidery.
      const size = s.sizes[a.productId] ?? fitFor(byId(a.productId));
      const exists = s.bag.find((b) => b.productId === a.productId);
      const item = { productId: a.productId, size: exists?.size ?? size, personalisation: { ...s.draft } };
      const bag = exists ? s.bag.map((b) => (b.productId === a.productId ? item : b)) : [...s.bag, item];
      return { ...s, bag, paid: false, sheet: null, stack: [...s.stack.filter((x) => !CHECKOUT.includes(x)), 'bag'] };
    }
    case 'addFrom': {
      // tapped "Add to bag" on the Hologram or the Tabletop: the screen tells the phone
      const size = s.sizes[a.productId] ?? fitFor(byId(a.productId));
      const exists = s.bag.find((b) => b.productId === a.productId);
      const personalisation = a.device === 'tabletop' ? { ...s.draft } : exists?.personalisation;
      const item = { productId: a.productId, size: exists?.size ?? size, ...(personalisation ? { personalisation } : {}) };
      const bag = exists ? s.bag.map((b) => (b.productId === a.productId ? item : b)) : [...s.bag, item];
      return { ...s, bag, paid: false, toast: { id: ++toastId, text: `Added to your bag from the ${DEVICES[a.device].name}`, action: 'bag' } };
    }
    case 'remove':
      return { ...s, bag: s.bag.filter((b) => b.productId !== a.productId) };
    case 'theme':
      return { ...s, theme: a.theme };
    case 'composer':
      return s.composerOnScreen === a.onScreen ? s : { ...s, composerOnScreen: a.onScreen };
    case 'lightbox':
      return { ...s, lightbox: a.lightbox };
    case 'sizeGuide':
      return { ...s, sizeGuide: a.category };
    case 'qty':
      return { ...s, bag: s.bag.map((b) => (b.productId === a.productId ? { ...b, qty: Math.max(1, Math.min(5, a.qty)) } : b)) };
    case 'pay': {
      // Apple Pay (simulated): the bag becomes an order, then the order page shows
      const order: Order = {
        id: `SF-${CUSTOMER_CODE}-${String(++toastId).padStart(4, '0')}`,
        items: s.bag,
        stitching: s.bag.some((b) => b.personalisation),
        vault: '04',
        paidAt: Date.now(),
      };
      return { ...s, paid: true, order, bag: [], stack: [...s.stack.filter((x) => !CHECKOUT.includes(x)), 'order'] };
    }
    case 'stitchDone': {
      // the Tajima cell finished: the piece is in the vault
      if (!s.order?.stitching) return s;
      const piece = s.order.items.find((b) => b.personalisation);
      const name = piece ? byId(piece.productId).name : 'Your piece';
      return {
        ...s,
        order: { ...s.order, stitching: false, readyAt: Date.now() },
        toast: { id: ++toastId, text: `${name} is ready in vault ${s.order.vault}` },
      };
    }
    case 'toast':
      return { ...s, toast: a.text ? { id: ++toastId, text: a.text, action: a.action } : null };
    case 'search':
      return { ...s, search: { ...s.search, ...a.patch } };
    case 'plansAsked':
      return { ...s, plansAsked: true };
    case 'clearChat':
      // a fresh start looks like the first one: the stylist's question and the answer buttons
      // (your plans and picks stay: only the conversation is cleared)
      return { ...s, plansAsked: false, chatRestarted: true, search: { ...s.search, thread: [], thinking: false } };
    case 'arrival': {
      const look = lookForPlan(a.plan ?? undefined);
      // the exchange becomes the first lines of the conversation, so it's still there next time
      const lines: ChatLine[] = [
        { id: ++toastId, role: 'stylist', text: arrivalQuestion(s.chatRestarted), bold: 'coming up I should dress you for' },
        { id: ++toastId, role: 'user', text: a.plan ? `${a.plan.what} · ${a.plan.when}` : 'Nothing planned' },
        a.plan
          ? {
              // curation on the fly: the look for the plan, right here, and first in Curated picks
              id: ++toastId,
              role: 'stylist',
              // a wedding: we don't sell suits, so the stylist says so and dresses the trip instead
              text: isFormal(a.plan)
                ? `Got it: ${planWords(a.plan)}. We don’t carry suits or formal wear, so I’ve put together a look for the trip and the days around it.`
                : look
                  ? `Got it: ${planWords(a.plan)}. I’ve put a look together for it, and it’s first in your curated picks now.`
                  : `Got it: ${planWords(a.plan)}. I’ll keep your picks ready for it.`,
              bold: planWords(a.plan),
              lookId: look?.id, // the link to the whole look
              lookLabel: planTag(a.plan),
              productIds: look?.items.map((it) => it.productId),
              followUps: [SHOW_PICKS, 'Something warmer'],
            }
          : s.profile.plans[0]
            ? {
                // nothing new, but a plan from earlier still shapes the picks: say so
                id: ++toastId,
                role: 'stylist',
                text: `No problem. Your picks are still ready for your ${planWords(s.profile.plans[0])}.`,
                bold: planWords(s.profile.plans[0]),
                followUps: [SHOW_PICKS, 'What’s new today?'],
              }
            : {
                id: ++toastId,
                role: 'stylist',
                text: 'No problem. Your curated picks follow what you love. Tell me any time, or add a plan in Your plans.',
                bold: 'follow what you love',
                followUps: [SHOW_PICKS, 'What’s new today?'],
              },
      ];
      return {
        ...s,
        plansAsked: true,
        profile: a.plan ? { ...s.profile, plans: [a.plan, ...s.profile.plans] } : s.profile,
        search: { ...s.search, thread: [...lines, ...s.search.thread] },
      };
    }
    case 'profile':
      return { ...s, profile: { ...s.profile, ...a.patch } };
    case 'ask':
      // the question joins the conversation and the stylist chat opens (from anywhere:
      // the search, the Home field, a piece's page); the stylist "thinks", then replies
      return {
        ...s,
        sheet: { kind: 'chat' },
        search: { ...s.search, open: false, query: '', listening: false, thinking: true, thread: [...s.search.thread, { id: ++toastId, role: 'user', text: a.text }] },
      };
    case 'reply':
      return { ...s, search: { ...s.search, thinking: false, thread: [...s.search.thread, { id: ++toastId, role: 'stylist', ...a.line }] } };
    case 'filters':
      return { ...s, filters: a.filters };
    case 'pair':
      return { ...s, paired: s.paired.includes(a.device) ? s.paired : [...s.paired, a.device] };
    case 'live':
      return { ...s, live: a.live };
  }
}

/**
 * Runs a state change inside a View Transition when the browser supports it,
 * so the screen morphs instead of jumping. (iOS: withAnimation / matchedGeometryEffect.)
 * `morphFrom` is the element the garment "travels" from (e.g. the tapped card's image).
 */
export function withTransition(update: () => void, morphFrom?: HTMLElement | null) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!doc.startViewTransition || reduced) {
    update();
    return;
  }
  if (morphFrom) morphFrom.style.viewTransitionName = 'piece';
  const t = doc.startViewTransition(() => {
    if (morphFrom) morphFrom.style.viewTransitionName = '';
    flushSync(update);
  });
  t.finished.finally(() => {
    if (morphFrom) morphFrom.style.viewTransitionName = '';
  });
}

interface Ctx {
  state: AppState;
  dispatch: (a: Action) => void;
  /** Open a product's pick sheet; the garment morphs from `from` when given. */
  openPick: (productId: string, from?: HTMLElement | null) => void;
  go: (a: Action) => void;
}
const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children, initial }: { children: ReactNode; initial?: Partial<AppState> }) {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...initial });
  const go = useCallback((a: Action) => withTransition(() => dispatch(a)), []);
  const openPick = useCallback(
    (productId: string, from?: HTMLElement | null) =>
      withTransition(() => dispatch({ type: 'sheet', sheet: { kind: 'pick', productId } }), from),
    []
  );
  const value = useMemo(() => ({ state, dispatch, openPick, go }), [state, openPick, go]);
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

/** How to call the stylist in text: its name if you gave it one, otherwise "your stylist".
 *  title: at the start of a line ("Jarvis" / "Your stylist"); inline: mid-sentence ("Jarvis" / "your stylist");
 *  possessive: "Jarvis’s" / "Your stylist’s". */
export function stylistLabels(name: string) {
  const n = name.trim();
  return {
    title: n || 'Your stylist',
    inline: n || 'your stylist',
    possessive: n ? `${n}’s` : 'Your stylist’s',
    possessiveInline: n ? `${n}’s` : 'your stylist’s',
  };
}
/** the stylist's name labels, from the app state (use inside components) */
export function useStylist() {
  return stylistLabels(useStore().state.profile.stylistName);
}

export function useStore() {
  const c = useContext(StoreContext);
  if (!c) throw new Error('useStore must be used inside <StoreProvider>');
  return c;
}

/** The size to show for a product: what the customer picked, else their fit profile. */
export const sizeFor = (s: AppState, productId: string): Size => s.sizes[productId] ?? fitFor(byId(productId));

/** Hand a piece to a store screen: pair first if this phone isn't connected yet */
export const handoffSheet = (s: AppState, device: Device, productId: string): Sheet =>
  s.paired.includes(device) ? { kind: 'handoff', device, productId } : { kind: 'pair', device, productId };
