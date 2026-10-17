'use client';
// Chrome.tsx — the app frame around every screen:
//   TopBar     : small logo left, actions right (§5.1)
//   TabBar     : the floating 5-tab pill (D2, §5.3)
//   StylistFab : the floating stylist button, now the brand sparkle (§5.4)
import type React from 'react';
import { useEffect, useState, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { LogoSolid, Sparkle } from './brand';
import { GlassButton } from './ui';
import { SearchPanel, SearchRow } from './Search';
import { bagCount, useStore, useStylist, type Tab } from '@/state/store';
import s from './Chrome.module.css';

/**
 * `progress` (0–1) fades the frosted backing in as content scrolls under the bar,
 * like iOS's scroll-edge appearance, so text never runs under the logo unreadably.
 */
export function TopBar({
  tone = 'ink',
  solid,
  progress,
  search = 'none',
  revealed,
  collapsed,
  children,
}: {
  tone?: 'ink' | 'light';
  solid?: boolean;
  progress?: number;
  /** 'always': the search row is there from the start · 'reveal': it slides down when `revealed` */
  search?: 'none' | 'always' | 'reveal';
  revealed?: boolean;
  /** hide the logo row while scrolling down (Safari-style); the search row stays */
  collapsed?: boolean;
  children?: ReactNode;
}) {
  const { state, go } = useStore();
  const open = state.search.open;
  // tapping the logo always takes you Home; if you're already Home, it scrolls back to the top
  const goHome = () => {
    if (state.tab === 'home' && !state.stack.length) window.dispatchEvent(new Event('sf:home-top'));
    else go({ type: 'tab', tab: 'home' });
  };
  const showSearch = search === 'always' || (search === 'reveal' && (revealed || open));
  const bar = open ? 1 : progress;
  return (
    <header
      className={`${s.topbar} ${solid ? s.solid : ''} ${bar !== undefined ? s.driven : ''}`}
      data-tone={open ? 'ink' : tone}
      style={bar !== undefined ? ({ ['--bar' as string]: Math.max(0, Math.min(1, bar)) } as React.CSSProperties) : undefined}
    >
      <div className={s.fold} data-shut={collapsed && !open ? '' : undefined}>
        <div className={s.row1}>
          <button className={s.logoBtn} onClick={goHome} aria-label="S·Fashion, go to Home">
            <LogoSolid className={s.logo} />
          </button>
          <div className={s.actions}>{children}</div>
        </div>
      </div>
      {search !== 'none' && (
        <div className={s.fold} data-shut={showSearch ? undefined : ''} aria-hidden={!showSearch}>
          <div className={s.row2} inert={!showSearch ? true : undefined}>
            <SearchRow />
          </div>
        </div>
      )}
      {search !== 'none' && showSearch && <SearchPanel />}
    </header>
  );
}

/** "Curated picks" — quiet glass, text only, on every main screen (D5) */
export function CuratedPicksButton() {
  const { go } = useStore();
  return <GlassButton onClick={() => go({ type: 'push', screen: 'picks' })}>Curated picks</GlassButton>;
}

/** The bag, top right of every screen, with a count once something is in it.
 *  `glass`: a frosted round button, for the back-arrow bars (look, curated picks). */
export function BagButton({ glass }: { glass?: boolean }) {
  const { state, go } = useStore();
  const n = bagCount(state.bag);
  return (
    <button
      className={`${s.bag} ${glass ? s.bagGlass : ''}`}
      aria-label={n ? `Bag, ${n} ${n === 1 ? 'piece' : 'pieces'}` : 'Bag, empty'}
      onClick={() => go({ type: 'sheet', sheet: { kind: 'bag' } })}
    >
      <Icon name="bag" size={22} />
      {n > 0 && (
        <span key={n} className={`${s.badge} num`} aria-hidden="true">
          {n}
        </span>
      )}
    </button>
  );
}

const TABS: { id: Tab | 'more'; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'shop', label: 'Shop', icon: 'bag' },
  { id: 'visit', label: 'My Visit', icon: 'store' },
  { id: 'wardrobe', label: 'Wardrobe', icon: 'hanger' },
  { id: 'more', label: 'More', icon: 'more' },
];

export function TabBar() {
  const { state, go } = useStore();
  // Curated picks has no tab of its own, so nothing is highlighted there (§3).
  const active = state.stack.length ? null : state.tab;
  return (
    <nav className={s.tabbar} aria-label="Main">
      {TABS.map((t) => {
        const on = active === t.id;
        return (
          <button
            key={t.id}
            className={`${s.tab} ${on ? s.tabOn : ''}`}
            aria-current={on ? 'page' : undefined}
            onClick={() =>
              t.id === 'more'
                ? go({ type: 'sheet', sheet: { kind: 'more' } })
                : // a tab from the bar always opens at the top of its page (Hyun, build 0.7)
                  (window.dispatchEvent(new CustomEvent('sf:tab-top', { detail: t.id })), go({ type: 'tab', tab: t.id as Tab }))
            }
          >
            <span className={s.tabIcon}>
              <Icon name={t.icon} size={22} />
            </span>
            <span className={s.tabLabel}>{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/** Opens the stylist sheet. Hides while scrolling down so it never sits on content. */
/** The stylist button: ONE for the whole app (mounted in AppShell), bottom right
 *  above the tab bar, on every screen. It hides while you scroll down anywhere
 *  and comes back when you scroll up or stop (Safari-toolbar style). It steps
 *  aside while a sheet, the search or the photo gallery is open, and on Home
 *  while Home's "Talk to your stylist" button is on screen (one place to ask at a time).
 *  No notification dot (Hyun removed it): the thin gold ring is enough. */
export function StylistFab() {
  const { state, go } = useStore();
  const stylist = useStylist();
  const [scrollHidden, setScrollHidden] = useState(false);
  useEffect(() => {
    // listen to every scrolling area at once (scroll events reach the document in the capture phase)
    const last = new WeakMap<EventTarget, number>();
    let idle: ReturnType<typeof setTimeout>;
    const on = (e: Event) => {
      const el = e.target as HTMLElement;
      if (!(el instanceof HTMLElement) || el.scrollHeight <= el.clientHeight + 4) return; // ignore sideways rails
      const y = el.scrollTop;
      const prev = last.get(el) ?? y;
      if (y > prev + 4 && y > 80) setScrollHidden(true);
      else if (y < prev - 4) setScrollHidden(false);
      last.set(el, y);
      clearTimeout(idle);
      idle = setTimeout(() => setScrollHidden(false), 700); // back a moment after scrolling stops, with a pop (Hyun)
    };
    document.addEventListener('scroll', on, true);
    return () => {
      document.removeEventListener('scroll', on, true);
      clearTimeout(idle);
    };
  }, []);
  if (state.sheet || state.search.open || state.lightbox) return null;
  const onHomeTop = state.tab === 'home' && !state.stack.length && state.composerOnScreen;
  const hidden = scrollHidden || onHomeTop;
  return (
    <button
      className={`${s.fab} ${hidden ? s.fabHidden : ''}`}
      aria-label={`Open ${stylist.inline}`}
      onClick={() => go({ type: 'sheet', sheet: { kind: 'chat' } })} // opens the stylist chat
      tabIndex={hidden ? -1 : 0}
      aria-hidden={hidden || undefined}
    >
      <Sparkle className={s.fabMark} />
    </button>
  );
}
