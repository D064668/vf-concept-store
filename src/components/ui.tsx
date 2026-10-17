'use client';
// ui.tsx — the small building blocks every screen reuses (HANDOFF §5).
// Each block has one job. iOS: each maps to one SwiftUI View or ButtonStyle.
import { forwardRef, useEffect, useId, useState, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from './Icon';
import { Sparkle } from './brand';
import { SIZE_GUIDES, SIZES, type Category, type Size } from '@/data/catalog';
import { useStore, useStylist } from '@/state/store';
import s from './ui.module.css';

const cx = (...c: (string | false | undefined | null)[]) => c.filter(Boolean).join(' ');

/* ---------------- Buttons (§5.5 primary, §5.6 secondary) ----------------
   Rule: exactly ONE primary button per screen. */
type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'quiet' | 'onDark';
  icon?: IconName;
  trailing?: IconName;
  full?: boolean;
};
export const Button = forwardRef<HTMLButtonElement, BtnProps>(function Button(
  { variant = 'primary', icon, trailing, full, className, children, ...p },
  ref
) {
  return (
    <button ref={ref} className={cx(s.btn, s[variant], full && s.full, className)} {...p}>
      {icon && <Icon name={icon} size={20} className={s.btnLead} />}
      <span className={s.btnLabel}>{children}</span>
      {trailing && <Icon name={trailing} size={20} />}
    </button>
  );
});

/** Quiet frosted-glass text button, e.g. "Curated picks" (D5, §5.2) */
export function GlassButton({ className, ...p }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cx(s.glassBtn, className)} {...p} />;
}

/** Round 44px icon button. Always give it an aria-label. */
export function IconButton({
  icon,
  label,
  variant = 'glass',
  className,
  children,
  ...p
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconName; label: string; variant?: 'glass' | 'surface' | 'plain' | 'well' }) {
  return (
    <button aria-label={label} className={cx(s.iconBtn, s['ib-' + variant], className)} {...p}>
      <Icon name={icon} size={22} />
      {children}
    </button>
  );
}

/* ---------------- Chips (§5.8) ---------------- */
export function SuggestionChip({ icon, children, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { icon: IconName }) {
  return (
    <button className={s.suggest} {...p}>
      <Icon name={icon} size={18} />
      {children}
    </button>
  );
}

export function FilterChip({ on, count, children, ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { on: boolean; count?: number }) {
  return (
    <button aria-pressed={on} className={cx(s.filter, on && s.filterOn)} {...p}>
      {children}
      {count !== undefined && <span className={cx(s.filterCount, 'num')}>{count}</span>}
    </button>
  );
}

/** Small status tag on images: "Your pick" (primary + sparkle) or glass ("New", "Last visit") */
export function Tag({ kind = 'glass', children }: { kind?: 'pick' | 'glass'; children: ReactNode }) {
  return (
    <span className={cx(s.tag, kind === 'pick' ? s.tagPick : s.tagGlass)}>
      {kind === 'pick' && <Sparkle className={s.tagSpark} />}
      {children}
    </span>
  );
}

/* ---------------- Stylist (§5.9) ---------------- */
export function StylistAvatar({ size = 32 }: { size?: number }) {
  return (
    <span className={s.avatar} style={{ width: size, height: size }} aria-hidden="true">
      <Sparkle style={{ width: size * 0.56, height: size * 0.56 }} />
    </span>
  );
}

export function StylistMessage({ children }: { children: ReactNode }) {
  const stylist = useStylist();
  return (
    <div className={s.msg}>
      <StylistAvatar />
      <p className={s.bubble}>
        <span className="sr-only">{stylist.title}: </span>
        {children}
      </p>
    </div>
  );
}

/* ---------------- Size selector ---------------- */
/** Size buttons + (when `category` is given) a "Size" header with the Size guide link,
 *  and an availability line underneath (Hyun, build 0.7, from RE/DONE):
 *    ● Available in M · XL sold out
 *  Sold-out sizes look disabled (no fill, struck through) and can't be picked.
 *  iOS: an HStack of buttons; the guide opens a .sheet over the current one. */
export function SizeRail({
  value,
  fit,
  soldOut = [],
  sizes = SIZES,
  category,
  onChange,
}: {
  value: Size;
  fit: Size;
  soldOut?: Size[];
  /** the sizes this piece comes in (clothes XS–XL, shoes 40–45) */
  sizes?: Size[];
  /** the piece's category: shows the "Size" header and the right size guide */
  category?: Category;
  onChange: (s: Size) => void;
}) {
  const { dispatch } = useStore();
  const guide = category && SIZE_GUIDES[category];
  const out = soldOut.filter((z) => sizes.includes(z));
  return (
    <div className={s.sizeWrap}>
      {category && (
        <div className={s.sizeHead}>
          <span className={s.sizeTitle}>
            Size <span>Your fit is {fit}</span>
          </span>
          {guide && (
            <button type="button" className={s.guideLink} onClick={() => dispatch({ type: 'sizeGuide', category })}>
              Size guide
              <Icon name="arrowRight" size={14} />
            </button>
          )}
        </div>
      )}
      {/* one column per size, so shoes (6 sizes) and clothes (5) both fill the row */}
      <div className={s.sizes} role="group" aria-label="Size" style={{ gridTemplateColumns: `repeat(${sizes.length}, 1fr)` }}>
        {sizes.map((z) => {
          const isOut = out.includes(z);
          return (
            <button
              key={z}
              aria-pressed={value === z}
              disabled={isOut}
              onClick={() => onChange(z)}
              className={cx(s.size, value === z && s.sizeOn)}
              aria-label={`${z}${z === fit ? ', your fit' : ''}${isOut ? ', sold out' : ''}`}
            >
              <span>{z}</span>
            </button>
          );
        })}
      </div>
      {/* the legend: is the chosen size here? which sizes are gone? what's the gold dot? */}
      <p className={s.sizeLegend} role="status">
        <span className={s.available}>
          <span className={s.availDot} aria-hidden="true" />
          Available in {value}
          {out.length > 0 && <span className={s.soldNote}> · {out.join(', ')} sold out</span>}
        </span>
      </p>
    </div>
  );
}

/* ---------------- Composer (D11, §5.7) ----------------
   Plain + on the left, field in the middle, mic on the right.
   A send button appears once there is text. */
/** `linked`: this composer is a doorway into the stylist chat (Home, Hyun):
 *  tapping the field opens the chat sheet, so the conversation starts there
 *  (with the arrival question first, if it hasn't been answered yet).
 *  The mic still opens the voice demo in the search panel; it ends in the chat too.
 *  The top-bar search is unchanged: it's for finding things quickly.
 *  `hints`: example questions that take turns inside the empty field.
 *  `pills`: suggested questions in a row just above the field; one tap asks it.
 *  `compact`: a shorter field (52px) for sheets, so pills + field fit. */
export function Composer({
  placeholder,
  label,
  linked,
  hints,
  pills,
  compact,
  onAsk,
}: {
  placeholder: string;
  label?: string;
  linked?: boolean;
  hints?: string[];
  pills?: string[];
  compact?: boolean;
  /** what to do with a question (the chat passes its own); otherwise it goes to the stylist chat */
  onAsk?: (q: string) => void;
}) {
  const [text, setText] = useState('');
  const [hint, setHint] = useState(0);
  const [focused, setFocused] = useState(false);
  const { dispatch, go } = useStore();
  const stylist = useStylist();
  const id = useId();
  const openSearch = (listening = false) => dispatch({ type: 'search', patch: { open: true, listening, query: listening ? '' : text } });
  // a question goes to the stylist chat (it opens as a sheet, over whatever page you're on)
  const ask = (q: string) => {
    if (!q.trim()) return;
    setText('');
    if (onAsk) onAsk(q.trim());
    else dispatch({ type: 'ask', text: q.trim() });
  };

  // the example hints take turns every few seconds while the field is empty
  useEffect(() => {
    if (!hints?.length || text || focused) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const iv = setInterval(() => setHint((h) => (h + 1) % hints.length), 3600);
    return () => clearInterval(iv);
  }, [hints, text, focused]);
  const showHint = !!hints?.length && !text;

  return (
    <div className={s.composerWrap}>
      {!!pills?.length && (
        <div className={s.askPills} role="group" aria-label="Suggested questions">
          {pills.map((q) => (
            <button key={q} type="button" className={s.askPill} onClick={() => (linked ? dispatch({ type: 'ask', text: q }) : ask(q))}>
              {q}
            </button>
          ))}
        </div>
      )}
      <form
        className={cx(s.composer, compact && s.compact)}
        onSubmit={(e) => {
          e.preventDefault();
          ask(text);
        }}
      >
        <button
          type="button"
          className={s.plus}
          aria-label="Add a photo or search by image"
          onClick={() => dispatch({ type: 'toast', text: 'Photo search connects in the next build' })}
        >
          <Icon name="plus" size={24} />
        </button>
        <label htmlFor={id} className="sr-only">
          {label ?? `Message ${stylist.inline}`}
        </label>
        <div className={s.fieldWrap}>
          <input
            id={id}
            className={s.field}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onFocus={
              linked
                ? (e) => {
                    e.currentTarget.blur();
                    go({ type: 'sheet', sheet: { kind: 'chat' } }); // open the stylist chat
                  }
                : () => setFocused(true)
            }
            onBlur={() => setFocused(false)}
            placeholder={showHint ? '' : placeholder}
            autoComplete="off"
            enterKeyHint="send"
          />
          {showHint && (
            // the rotating hint: drawn over the empty field, it rises in each time it changes
            <span className={s.hint} aria-hidden="true" key={hint}>
              {hints![hint]}
            </span>
          )}
        </div>
        <button
          type="button"
          className={s.mic}
          aria-label={`Speak to ${stylist.inline}`}
          onClick={() => (linked ? openSearch(true) : dispatch({ type: 'toast', text: 'Voice connects in the next build' }))}
        >
          <Icon name="mic" size={22} />
        </button>
        {text.trim() && (
          <button type="submit" className={s.send} aria-label="Send">
            <Icon name="send" size={20} />
          </button>
        )}
      </form>
    </div>
  );
}

/* ---------------- Toast ---------------- */
export function Toast() {
  const { state, dispatch, go } = useStore();
  const t = state.toast;
  useEffect(() => {
    if (!t) return;
    const h = setTimeout(() => dispatch({ type: 'toast', text: null }), 3200);
    return () => clearTimeout(h);
  }, [t, dispatch]);
  return (
    <div className={s.toastLane} aria-live="polite" role="status">
      {t && (
        <div key={t.id} className={s.toast}>
          {t.action === 'bag' && <Icon name="check" size={18} className={s.toastIcon} />}
          {t.action === 'wardrobe' && <Icon name="heart" size={18} filled className={s.toastIcon} />}
          <span>{t.text}</span>
          {t.action === 'bag' && (
            <button className={s.toastAction} onClick={() => go({ type: 'sheet', sheet: { kind: 'bag' } })}>
              View bag
            </button>
          )}
          {t.action === 'wardrobe' && (
            // where hearts go: one tap to see everything you've saved
            <button className={s.toastAction} onClick={() => (go({ type: 'tab', tab: 'wardrobe' }), dispatch({ type: 'toast', text: null }))}>
              View
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export { cx };
