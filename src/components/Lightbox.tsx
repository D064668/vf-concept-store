'use client';
// Lightbox.tsx — tap any hero image to see it whole, full screen.
// ------------------------------------------------------------------
// Hero images have a fixed height, so some photos get cropped to fit their
// box. Tapping one opens this gallery: every photo shown complete (never
// cropped), on a dark background, swipeable left and right, with a counter
// and a close button. Escape or the ✕ closes it. Pinch to zoom works on a
// phone. One behaviour everywhere a hero image appears.
//
//   <ExpandHint />        the small ⤢ button drawn on a hero image
//   openLightbox(...)     what a hero image calls when tapped
//   <Lightbox />          mounted once in AppShell, above everything
//
// iOS: a fullScreenCover with TabView(.page) of zoomable images
// (ScrollView with MagnifyGesture), plus a close button.
// ------------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import type { Photo } from '@/data/catalog';
import { useStore } from '@/state/store';
import { useAutoplay } from '@/screens/useAutoplay';
import s from './Lightbox.module.css';

/** returns a function that opens the gallery at photo `index` */
export function useLightbox() {
  const { dispatch } = useStore();
  return (photos: Photo[], index: number, title: string) => dispatch({ type: 'lightbox', lightbox: { photos, index, title } });
}

/** The ⤢ button on a hero image: says "tap to see it whole" */
export function ExpandHint({ onClick, label = 'See the full photo' }: { onClick: () => void; label?: string }) {
  return (
    <button
      className={s.hint}
      aria-label={label}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <Icon name="expand" size={18} />
    </button>
  );
}

export function Lightbox() {
  const { state, dispatch } = useStore();
  const lb = state.lightbox;
  const track = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [i, setI] = useState(0);
  const [closing, setClosing] = useState(false);
  useAutoplay(track, lb?.photos.length ?? 0, 5000, false); // swipe + mouse drag, no autoplay

  const close = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return dispatch({ type: 'lightbox', lightbox: null });
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      dispatch({ type: 'lightbox', lightbox: null });
    }, 200);
  };

  // open at the photo that was tapped; focus the close button; Escape and arrows work
  useEffect(() => {
    if (!lb) return;
    const back = document.activeElement as HTMLElement | null;
    setI(lb.index);
    requestAnimationFrame(() => {
      const el = track.current;
      if (el) el.scrollLeft = lb.index * el.clientWidth;
      closeBtn.current?.focus({ preventScroll: true });
    });
    const onKey = (e: KeyboardEvent) => {
      const el = track.current;
      if (e.key === 'Escape') close();
      if (!el) return;
      if (e.key === 'ArrowRight') el.scrollTo({ left: el.scrollLeft + el.clientWidth, behavior: 'smooth' });
      if (e.key === 'ArrowLeft') el.scrollTo({ left: el.scrollLeft - el.clientWidth, behavior: 'smooth' });
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      back?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lb]);

  if (!lb) return null;
  const n = lb.photos.length;
  return (
    <div className={`${s.layer} ${closing ? s.closing : ''}`} role="dialog" aria-modal="true" aria-label={`${lb.title}, photos`}>
      <div className={s.top}>
        <p className={s.title}>{lb.title}</p>
        <button ref={closeBtn} className={s.close} onClick={close} aria-label="Close photos">
          <Icon name="close" size={22} />
        </button>
      </div>

      <div className={s.track} ref={track} onScroll={(e) => setI(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}>
        {lb.photos.map((ph, k) => (
          // tapping the empty dark area around a photo closes it, like iOS Photos
          <div key={ph.src + k} className={s.slide} onClick={(e) => e.target === e.currentTarget && close()}>
            <img
              src={ph.src}
              alt={`${lb.title}, photo ${k + 1} of ${n}`}
              draggable={false}
              className={s.img}
              style={{ background: ph.bg ?? '#fff' }}
            />
          </div>
        ))}
      </div>

      {n > 1 && (
        <div className={s.foot}>
          <span className={`${s.count} num`} aria-live="polite">
            {i + 1} / {n}
          </span>
          {/* dots only when there are few photos; the counter says it all for long galleries */}
          {n <= 8 && <div className={s.dots} aria-hidden="true">
            {lb.photos.map((ph, k) => (
              <span key={ph.src + k} className={k === i ? s.on : undefined} />
            ))}
          </div>}
        </div>
      )}
    </div>
  );
}
