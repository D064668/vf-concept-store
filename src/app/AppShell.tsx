'use client';
// AppShell.tsx — puts the app on screen.
//  • On a phone: the app fills the screen and respects the notch / home bar.
//  • On a computer: just the app, phone width, centred on a plain background.
//  • Review mode (add ?review=1, or run `npm run dev:review`; prototype only): an iPhone frame + a review panel
//    (theme, phone size, jump to a screen). That lives in ReviewFrame.tsx; it is
//    NOT part of the app.
// Jump straight to a screen: ?screen=shop | picks | chat | pick | atelier | bag | pair | handoff (&device=tabletop|hologram)  &theme=dark  &w=360
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { StylistFab, TabBar } from '@/components/Chrome';
import { Toast } from '@/components/ui';
import { StoreProvider, useStore, type AppState } from '@/state/store';
import { Home } from '@/screens/Home';
import { Shop } from '@/screens/Shop';
import { Picks } from '@/screens/Picks';
import { PickSheet } from '@/screens/PickSheet';
import { AtelierSheet } from '@/screens/AtelierSheet';
import { BagScreen, CheckoutScreen, OrderScreen } from '@/screens/Checkout';
import { MoreSheet, Visit } from '@/screens/Placeholders';
import { Wardrobe } from '@/screens/Wardrobe';
import { useScrollMemory } from './useScrollMemory';
import { STITCH_RUN_MS } from '@/state/stitching';
import { FilterSheet } from '@/screens/FilterSheet';
import { LookScreen } from '@/screens/Look';
import { BrandScreen } from '@/screens/Brand';
import type { BrandId } from '@/components/BrandLogo';
import { QuickAddSheet } from '@/screens/QuickAddSheet';
import { ChatSheet } from '@/screens/ChatSheet';
import { SizeGuideSheet } from '@/screens/SizeGuideSheet';
import { HandoffSheet, LivePill, PairSheet } from '@/screens/Handoff';
import { SearchBrain } from '@/components/Search';
import { Lightbox } from '@/components/Lightbox';
import { DragScroll } from '@/components/DragScroll';
import { ReviewPanel, StatusBar, WIDTHS, type Width } from './ReviewFrame';
import s from './AppShell.module.css';

type Theme = 'system' | 'light' | 'dark';
/** Hyun's private preview turns review mode on by default (built with NEXT_PUBLIC_REVIEW=1,
 *  or run with `npm run dev:review`). Everyone else gets the plain app. ?review=0 / 1 overrides. */
const REVIEW_BY_DEFAULT = process.env.NEXT_PUBLIC_REVIEW === '1';

function fromUrl(): { initial: Partial<AppState>; theme: Theme; width: Width; review: boolean } {
  const q = new URLSearchParams(window.location.search);
  const screen = q.get('screen');
  const initial: Partial<AppState> = {};
  if (screen === 'shop') initial.tab = 'shop';
  if (screen === 'picks') Object.assign(initial, { tab: 'shop', stack: ['picks'] });
  if (screen === 'pick') Object.assign(initial, { tab: 'shop', sheet: { kind: 'pick', productId: q.get('id') ?? 'tnf-mountain' } });
  if (screen === 'atelier') Object.assign(initial, { tab: 'shop', sheet: { kind: 'atelier', productId: 'tnf-mountain' } });
  // demo bag for the review links: the jacket with a monogram, and a backpack
  const demoBag = [
    { productId: 'tnf-mountain', size: 'M', personalisation: { text: 'H·L', thread: 'gold', placement: 'chest', motif: 'monogram' } },
    { productId: 'jansport-superbreak', size: 'One size' },
  ];
  if (screen === 'bag') Object.assign(initial, { tab: 'shop', stack: ['bag'], bag: demoBag });
  if (screen === 'checkout') Object.assign(initial, { tab: 'shop', stack: ['bag', 'checkout'], bag: demoBag });
  if (screen === 'order')
    Object.assign(initial, { tab: 'shop', stack: ['order'], paid: true, order: { id: 'SF-2614-0001', items: demoBag, stitching: true, vault: '04', paidAt: Date.now() } });
  // My Visit with a personalised piece being stitched (the live tracker), for demos
  if (screen === 'visit' || screen === 'stitching')
    Object.assign(initial, {
      tab: 'visit',
      ...(screen === 'stitching' ? { paid: true, order: { id: 'SF-2614-0001', items: demoBag, stitching: true, vault: '04', paidAt: Date.now() } } : {}),
    });
  if (screen === 'more') Object.assign(initial, { sheet: { kind: 'more' } });
  if (screen === 'filters') Object.assign(initial, { tab: 'shop', sheet: { kind: 'filters' } });
  if (screen === 'pair') Object.assign(initial, { tab: 'shop', sheet: { kind: 'pair', device: q.get('device') ?? 'tabletop', productId: 'tnf-mountain' } });
  if (screen === 'handoff')
    Object.assign(initial, {
      tab: 'shop',
      paired: ['tabletop', 'hologram'],
      sheet: { kind: 'handoff', device: q.get('device') ?? 'hologram', productId: 'tnf-mountain' },
    });
  if (screen === 'look') Object.assign(initial, { tab: 'home', stack: [`look:${q.get('id') ?? 'mountain'}`] });
  if (screen === 'quickadd')
    Object.assign(initial, {
      tab: 'home',
      stack: ['look:mountain'],
      sheet: q.get('all')
        ? { kind: 'quickadd', productIds: ['tnf-mountain', 'smartwool-crew', 'altra-trail', 'jansport-superbreak'], lookId: 'mountain' }
        : { kind: 'quickadd', productIds: [q.get('id') ?? 'smartwool-crew'] },
    });
  if (screen === 'chat') Object.assign(initial, { tab: 'shop', sheet: { kind: 'chat' } });
  if (screen === 'brand') Object.assign(initial, { tab: 'shop', stack: [`brand:${q.get('id') ?? 'vans'}`] });
  if (screen === 'wardrobe') Object.assign(initial, { tab: 'wardrobe' });
  if (screen === 'search') Object.assign(initial, { tab: 'shop', search: { open: true, query: '', listening: false, thread: [], thinking: false } });
  // appearance: the review link wins (?theme=dark), else what the person chose last time, else system
  let saved: Theme | null = null;
  try {
    saved = localStorage.getItem('sf-theme') as Theme | null;
  } catch {}
  const theme = (q.get('theme') as Theme) || saved || 'system';
  initial.theme = theme;
  const w = Number(q.get('w')) as Width;
  return { initial, theme, width: w in WIDTHS ? w : 390, review: q.get('review') ? q.get('review') === '1' : REVIEW_BY_DEFAULT };
}

export function AppShell() {
  const [boot, setBoot] = useState<ReturnType<typeof fromUrl> | null>(null);
  useEffect(() => {
    setBoot(fromUrl());
    // the app started fine: allow one automatic reload again next time (see error.tsx)
    const ok = setTimeout(() => {
      try {
        sessionStorage.removeItem('sf-reloaded');
      } catch {}
    }, 5000);
    return () => clearTimeout(ok);
  }, []);
  if (!boot) return <div className={s.boot} />;
  return (
    <StoreProvider initial={boot.initial}>
      <Frame width0={boot.width} review={boot.review} />
    </StoreProvider>
  );
}

function Frame({ width0, review }: { width0: Width; review: boolean }) {
  // the appearance lives in the app's memory (More → Settings → Appearance);
  // the review panel's switch changes the same setting
  const { state, dispatch } = useStore();
  const theme = state.theme;
  const setTheme = (t: Theme) => dispatch({ type: 'theme', theme: t });
  const [width, setWidth] = useState<Width>(width0);
  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'system') html.removeAttribute('data-theme');
    else html.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('sf-theme', theme); // remembered on this device
    } catch {}
  }, [theme]);

  // the app on its own (what ships)
  if (!review)
    return (
      <div className={s.desk}>
        <div className={s.device}>
          <App />
        </div>
      </div>
    );

  // review mode (?review=1): phone frame, fake status bar and the review panel
  return (
    <div className={s.desk} data-review="">
      <ReviewPanel theme={theme} setTheme={setTheme} width={width} setWidth={setWidth} />
      <div className={s.device} style={{ ['--w' as string]: `${width}px`, ['--h' as string]: `${WIDTHS[width]}px` }}>
        <StatusBar />
        <App />
        <span className={s.homeBar} aria-hidden="true" />
      </div>
    </div>
  );
}

/** Which screen and which sheet are showing. iOS: TabView + NavigationStack + .sheet */
function App() {
  const { state, dispatch } = useStore();
  // Home and Shop stay mounted (so Back from a look returns to where you were),
  // but tapping them in the tab bar always starts at the top of the page.
  const panes = useRef<Record<string, HTMLDivElement | null>>({});
  const pending = useRef<string | null>(null); // the tab that should open at the top
  useEffect(() => {
    const ask = (e: Event) => void (pending.current = (e as CustomEvent<string>).detail);
    window.addEventListener('sf:tab-top', ask);
    return () => window.removeEventListener('sf:tab-top', ask);
  }, []);
  const top0 = state.stack[state.stack.length - 1];
  // once that tab is on screen, scroll everything in it back to the top
  useLayoutEffect(() => {
    const want = pending.current;
    if (!want || want !== state.tab || top0) return;
    pending.current = null;
    panes.current[want]?.querySelectorAll<HTMLElement>('*').forEach((el) => {
      if (el.scrollTop > 0) el.scrollTop = 0;
    });
  });
  const top = state.stack[state.stack.length - 1];
  const sheet = state.sheet;
  // the Tajima cell's clock: while a piece is being stitched, finish it on time (demo: ~1 minute
  // after paying, see stitching.ts), wherever you are in the app
  const stitchingSince = state.order?.stitching ? state.order.paidAt : undefined;
  useEffect(() => {
    if (stitchingSince === undefined) return;
    const t = setTimeout(() => dispatch({ type: 'stitchDone' }), Math.max(0, stitchingSince + STITCH_RUN_MS - Date.now()));
    return () => clearTimeout(t);
  }, [stitchingSince, dispatch]);
  // Back returns to where you were on every page (not only Home and Shop); new pages start at the top
  const main = useRef<HTMLElement>(null);
  useScrollMemory(main, state.tab, state.stack);
  return (
    <>
      <main className={s.screens} ref={main}>
        {/* tabs stay mounted so each keeps its scroll position, like iOS */}
        <div hidden={!!top || state.tab !== 'home'} className={s.pane} ref={(el) => void (panes.current.home = el)}>
          <Home />
        </div>
        <div hidden={!!top || state.tab !== 'shop'} className={s.pane} ref={(el) => void (panes.current.shop = el)}>
          <Shop />
        </div>
        {!top && state.tab === 'visit' && <Visit />}
        {!top && state.tab === 'wardrobe' && <Wardrobe />}
        {top === 'picks' && <Picks />}
        {top?.startsWith('look:') && <LookScreen id={top.slice(5)} />}
        {top?.startsWith('brand:') && <BrandScreen key={top} id={top.slice(6) as BrandId} />}
        {top === 'bag' && <BagScreen />}
        {top === 'checkout' && <CheckoutScreen />}
        {top === 'order' && <OrderScreen />}
      </main>
      <TabBar />
      <LivePill />
      {/* the stylist button: one for the whole app */}
      <StylistFab />
      <Toast />
      {sheet?.kind === 'pick' && <PickSheet key="stylist" productId={sheet.productId} back={sheet.back} />}
      {sheet?.kind === 'chat' && <ChatSheet />}
      {sheet?.kind === 'atelier' && <AtelierSheet key="stylist" productId={sheet.productId} from={sheet.from} />}
      {sheet?.kind === 'more' && <MoreSheet />}
      {sheet?.kind === 'filters' && <FilterSheet />}
      {sheet?.kind === 'quickadd' && <QuickAddSheet key={sheet.productIds.join()} productIds={sheet.productIds} lookId={sheet.lookId} />}
      {sheet?.kind === 'pair' && <PairSheet key={`pair-${sheet.device}`} device={sheet.device} productId={sheet.productId} />}
      {sheet?.kind === 'handoff' && <HandoffSheet key={`handoff-${sheet.device}-${sheet.productId}`} device={sheet.device} productId={sheet.productId} />}
      {/* the size guide opens on top of the piece's sheet */}
      {state.sizeGuide && state.sheet && <SizeGuideSheet key={state.sizeGuide} category={state.sizeGuide} />}
      <SearchBrain />
      <Lightbox />
      <DragScroll />
    </>
  );
}
