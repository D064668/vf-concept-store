'use client';
// ReviewFrame.tsx — PROTOTYPE REVIEW TOOLS. NOT PART OF THE APP.
// ------------------------------------------------------------------
// Only shown with ?review=1 in the link. On a computer it draws an iPhone frame
// with a fake status bar, plus a panel to switch theme, phone width and jump to
// any screen. Handy for design reviews; the iOS app does not need any of this
// (iOS draws its own status bar and home indicator). Safe to ignore or delete:
// remove this file and the review branch in AppShell.tsx.
// ------------------------------------------------------------------
import { useStore } from '@/state/store';
import s from './AppShell.module.css';

type Theme = 'system' | 'light' | 'dark';
/** phone widths to preview, and the screen height that goes with each */
export const WIDTHS = { 360: 800, 390: 844, 430: 932 } as const;
export type Width = keyof typeof WIDTHS;

export function StatusBar() {
  return (
    <div className={s.status} aria-hidden="true">
      <span className="num">14:06</span>
      <span className={s.island} />
      <svg width="68" height="12" viewBox="0 0 68 12" fill="currentColor">
        <rect x="0" y="7" width="3" height="5" rx="1" />
        <rect x="5" y="5" width="3" height="7" rx="1" />
        <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
        <rect x="15" y="0" width="3" height="12" rx="1" />
        <path d="M30 3.2a9 9 0 0 1 12 0l-1.4 1.5a7 7 0 0 0-9.2 0zM32.6 6a5 5 0 0 1 6.8 0L38 7.5a3 3 0 0 0-4 0zM36 11.5l-1.7-1.8a2.4 2.4 0 0 1 3.4 0z" />
        <rect x="45.5" y=".5" width="20" height="11" rx="3.2" fill="none" stroke="currentColor" opacity=".45" />
        <rect x="47.5" y="2.5" width="15" height="7" rx="1.6" />
        <rect x="66.5" y="4" width="1.5" height="4" rx=".75" opacity=".45" />
      </svg>
    </div>
  );
}

export function ReviewPanel({
  theme,
  setTheme,
  width,
  setWidth,
}: {
  theme: Theme;
  setTheme: (t: Theme) => void;
  width: Width;
  setWidth: (w: Width) => void;
}) {
  const { dispatch } = useStore();
  const jump = (screen: string) => {
    const q = new URLSearchParams(window.location.search);
    q.set('screen', screen);
    window.location.search = q.toString();
  };
  return (
    <aside className={s.panel} aria-label="Review controls">
      <p className={s.panelTitle}>S·Fashion · iOS prototype</p>
      <p className={s.panelSub}>Review mode · build 0.7</p>
      <fieldset className={s.seg}>
        <legend>Appearance</legend>
        {(['system', 'light', 'dark'] as Theme[]).map((t) => (
          <button key={t} aria-pressed={theme === t} onClick={() => setTheme(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </fieldset>
      <fieldset className={s.seg}>
        <legend>Phone width</legend>
        {(Object.keys(WIDTHS).map(Number) as Width[]).map((w) => (
          <button key={w} aria-pressed={width === w} onClick={() => setWidth(w)}>
            {w}
          </button>
        ))}
      </fieldset>
      <fieldset className={s.jump}>
        <legend>Jump to</legend>
        {[
          ['home', 'Home'],
          ['shop', 'Shop'],
          ['picks', 'Curated picks'],
          ['look', 'Curated look'],
          ['quickadd', 'Quick add'],
          ['chat', 'Stylist chat'],
          ['pick', 'Product page'],
          ['atelier', 'Personalise'],
          ['wardrobe', 'Wardrobe'],
          ['bag', 'Bag'],
          ['checkout', 'Checkout'],
          ['order', 'Order'],
          ['pair', 'Pair a screen'],
          ['handoff', 'Hologram try-on'],
        ].map(([k, l]) => (
          <button key={k} onClick={() => jump(k)}>
            {l}
          </button>
        ))}
      </fieldset>
    </aside>
  );
}
