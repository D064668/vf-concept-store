'use client';
// Sheet.tsx — the bottom sheet used by the stylist, bag and More (§5.10).
// What it does for you:
//  • slides up over a dimmed app; tap the dim area, press Escape,
//    tap close, or drag the top down to close it
//  • keeps keyboard focus inside while open, and gives it back on close
// iOS: a native .sheet with .presentationDetents([.large]) and a grabber.
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from './Icon';
import s from './Sheet.module.css';

const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function BottomSheet({
  title,
  subtitle,
  leading,
  onClose,
  onBack,
  footer,
  children,
  closeIcon = 'down',
  actions,
  tall,
}: {
  title: string;
  subtitle?: ReactNode;
  leading?: ReactNode;
  onClose: () => void;
  onBack?: () => void;
  footer?: ReactNode;
  children: ReactNode;
  closeIcon?: 'down' | 'close';
  /** extra round buttons next to Close (the chat's "clear conversation") */
  actions?: ReactNode;
  /** always open almost to the top (the chat), even when it holds little */
  tall?: boolean;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  // the header floats over the content as frosted glass (Hyun): the content starts just
  // below it (--head-h) and scrolls softly underneath. Its height is measured, so a
  // two-line title or a back button never covers anything.
  useLayoutEffect(() => {
    const h = head.current;
    const p = panel.current;
    if (!h || !p) return;
    const set = () => p.style.setProperty('--head-h', `${h.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(h);
    return () => ro.disconnect();
  }, []);
  const [closing, setClosing] = useState(false);
  const [drag, setDrag] = useState(0);
  const start = useRef<{ y: number; t: number } | null>(null);

  // keep the latest onClose in a ref, so a parent re-render (e.g. typing in a
  // field) doesn't re-run the focus effect below and pull focus out of the field
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  const requestClose = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return closeRef.current();
    setClosing(true);
    setTimeout(() => closeRef.current(), 220);
  }, []);

  // focus in on open, trap Tab, Escape to close, give focus back on close
  useEffect(() => {
    const back = document.activeElement as HTMLElement | null;
    const el = panel.current!;
    (el.querySelector<HTMLElement>('[data-autofocus]') ?? el).focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') requestClose();
      if (e.key !== 'Tab') return;
      const f = [...el.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((n) => n.offsetParent !== null);
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      back?.focus?.({ preventScroll: true });
    };
  }, [requestClose]);

  // drag the grabber/header down to close
  const onDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button')) return;
    start.current = { y: e.clientY, t: performance.now() };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    setDrag(Math.max(0, e.clientY - start.current.y));
  };
  const onUp = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dy = e.clientY - start.current.y;
    const v = dy / Math.max(1, performance.now() - start.current.t);
    start.current = null;
    if (dy > 110 || v > 0.6) requestClose();
    setDrag(0);
  };

  return (
    <div className={`${s.layer} ${closing ? s.closing : ''}`}>
      <div className={s.scrim} onClick={requestClose} aria-hidden="true" />
      <div
        ref={panel}
        className={`${s.panel} ${tall ? s.tall : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        style={drag ? { transform: `translateY(${drag}px)`, transition: 'none' } : undefined}
      >
        <div ref={head} className={s.head} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
          <span className={s.grabber} aria-hidden="true" />
          <div className={s.headRow}>
            {onBack && (
              <button className={s.round} onClick={onBack} aria-label="Back">
                <Icon name="back" size={22} />
              </button>
            )}
            {leading}
            <div className={s.titles}>
              <h2 className={s.title}>{title}</h2>
              {subtitle && <p className={s.subtitle}>{subtitle}</p>}
            </div>
            {actions}
            <button className={s.round} onClick={requestClose} aria-label="Close">
              <Icon name={closeIcon} size={22} />
            </button>
          </div>
        </div>
        <div className={s.body}>{children}</div>
        {footer && <div className={s.foot}>{footer}</div>}
      </div>
    </div>
  );
}
