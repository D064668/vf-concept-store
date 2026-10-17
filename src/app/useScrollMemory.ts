'use client';
// useScrollMemory.ts — Back returns you to where you were (Hyun).
// ------------------------------------------------------------------
// Every page remembers how far you'd scrolled (down, and sideways in its rows):
//   • open a new page (a look, a brand, Curated picks…) → it starts at the top
//   • tap Back                                         → the page you return to is
//                                                        exactly where you left it
//   • tap a tab in the bottom bar                      → that page starts at the top
//                                                        (handled in AppShell: 'sf:tab-top')
// How, simply: while you scroll, we note the position of whatever you scrolled, under
// the name of the page you're on (e.g. "home|look:mountain"). When Back brings that page
// back, we put every scroll position back.
// iOS: NavigationStack does this by itself (each pushed view keeps its ScrollView offset).
// ------------------------------------------------------------------
import { useEffect, useLayoutEffect, useRef, type RefObject } from 'react';

type Spot = { top: number; left: number };

/** the page that's showing: the one child of <main> that isn't hidden */
const visibleRoot = (main: HTMLElement | null) => (main ? ([...main.children].find((c) => !(c as HTMLElement).hidden) as HTMLElement | undefined) : undefined);

export function useScrollMemory(main: RefObject<HTMLElement | null>, tab: string, stack: string[]) {
  const key = `${tab}|${stack.join('>')}`; // the name of the page you're on
  const keyRef = useRef(key);
  const prev = useRef({ tab, depth: stack.length, key });
  const memory = useRef(new Map<string, Map<number, Spot>>());
  const tabTap = useRef(false); // a bottom-tab tap: that page goes to the top, never restored

  // the tab bar announces a tap (AppShell scrolls that tab to the top): forget its old spots
  useEffect(() => {
    const onTab = (e: Event) => {
      tabTap.current = true;
      const t = (e as CustomEvent<string>).detail;
      [...memory.current.keys()].forEach((k) => k.startsWith(`${t}|`) && memory.current.delete(k));
    };
    window.addEventListener('sf:tab-top', onTab);
    return () => window.removeEventListener('sf:tab-top', onTab);
  }, []);

  // note scroll positions as you scroll (at most once per frame)
  useEffect(() => {
    let frame = 0;
    let last: HTMLElement | null = null;
    const save = () => {
      frame = 0;
      const root = visibleRoot(main.current);
      if (!last || !root || !root.contains(last)) return;
      const index = [...root.querySelectorAll('*')].indexOf(last);
      if (index < 0) return;
      const page = memory.current.get(keyRef.current) ?? new Map<number, Spot>();
      page.set(index, { top: last.scrollTop, left: last.scrollLeft });
      memory.current.set(keyRef.current, page);
    };
    const onScroll = (e: Event) => {
      if (!(e.target instanceof HTMLElement)) return;
      last = e.target;
      if (!frame) frame = requestAnimationFrame(save);
    };
    window.addEventListener('scroll', onScroll, { capture: true, passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      cancelAnimationFrame(frame);
    };
  }, [main]);

  // when the page changes: Back → put the positions back; a new page → start at the top
  useLayoutEffect(() => {
    const before = prev.current;
    prev.current = { tab, depth: stack.length, key };
    keyRef.current = key;
    if (before.key === key) return;
    const fromTab = tabTap.current;
    tabTap.current = false;
    if (fromTab) return; // AppShell already took that tab to the top
    const root = visibleRoot(main.current);
    if (!root) return;
    const all = () => [...root.querySelectorAll<HTMLElement>('*')];

    if (before.tab === tab && stack.length < before.depth) {
      // Back: restore (now, and once more next frame in case something was still laying out)
      const page = memory.current.get(key);
      if (!page) return;
      const restore = () => {
        const els = all();
        page.forEach((spot, i) => {
          const el = els[i];
          if (el) {
            el.scrollTop = spot.top;
            el.scrollLeft = spot.left;
          }
        });
      };
      // now, then again a moment later in case photos or rows were still laying out
      restore();
      requestAnimationFrame(restore);
      setTimeout(restore, 150);
    } else if (before.tab === tab && stack.length > before.depth) {
      // a new page: forget anything old under this name, and start at the top
      [...memory.current.keys()].forEach((k) => (k === key || k.startsWith(`${key}>`)) && memory.current.delete(k));
      all().forEach((el) => {
        if (el.scrollTop) el.scrollTop = 0;
        if (el.scrollLeft) el.scrollLeft = 0;
      });
    }
  }, [key, tab, stack.length, main]);
}
