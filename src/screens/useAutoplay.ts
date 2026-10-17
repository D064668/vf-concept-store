// useAutoplay.ts — hero sliders move on by themselves.
// Every few seconds the slider glides right-to-left to the next picture, and
// after the last one it returns to the first. It stops for a while as soon as
// the person touches it (so it never fights their finger), pauses when it's
// off screen, and stays still when Reduce Motion is on.
// Swiping works both ways (left or right) with a finger; on a computer you can
// also drag with the mouse, so the preview behaves like the phone.
// iOS: a Timer that advances a TabView(.page) selection withAnimation.
import { useEffect, type RefObject } from 'react';

/** `auto: false` keeps the swiping (and mouse drag) but never moves on by itself (e.g. the lightbox) */
export function useAutoplay(track: RefObject<HTMLElement | null>, count: number, every = 5000, auto = true) {
  useEffect(() => {
    const el = track.current;
    if (!el || count < 2) return;
    el.dataset.paged = '1'; // tells DragScroll this slider drags itself
    const still = !auto || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pausedUntil = 0;
    let visible = true;
    // a touch, a scroll or a key on the slider = the person is in charge for 8s
    const hold = () => (pausedUntil = Date.now() + 8000);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting && e.intersectionRatio > 0.5), { threshold: [0, 0.5, 1] });
    io.observe(el);
    el.addEventListener('pointerdown', hold);
    el.addEventListener('touchstart', hold, { passive: true });
    el.addEventListener('wheel', hold, { passive: true });
    el.addEventListener('keydown', hold);
    // mouse drag = swipe (touch and trackpads already swipe natively)
    let drag: { x: number; left: number; moved: boolean } | null = null;
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: el.scrollLeft, moved: false };
      el.style.scrollSnapType = 'none';
    };
    const move = (e: PointerEvent) => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (Math.abs(dx) > 6) drag.moved = true;
      el.scrollLeft = drag.left - dx;
    };
    const up = (e: PointerEvent) => {
      if (!drag) return;
      const w = el.clientWidth;
      const start = Math.round(drag.left / w);
      const dx = e.clientX - drag.x;
      // a short flick is enough: 15% of the width moves one picture in that direction
      const target = Math.max(0, Math.min(count - 1, Math.abs(dx) > w * 0.15 ? start + (dx < 0 ? 1 : -1) : start));
      el.style.scrollSnapType = '';
      el.scrollTo({ left: target * w, behavior: 'smooth' });
      if (drag.moved) dragEnd = Date.now();
      drag = null;
    };
    // a drag is not a tap: swallow the click that comes right after it
    let dragEnd = 0;
    const click = (c: MouseEvent) => {
      if (Date.now() - dragEnd < 300) {
        c.stopPropagation();
        c.preventDefault();
      }
    };
    el.addEventListener('click', click, true);
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);

    const tick = setInterval(() => {
      if (still || !visible || document.hidden || Date.now() < pausedUntil || !el.offsetParent) return;
      const w = el.clientWidth;
      const now = Math.round(el.scrollLeft / w);
      const next = (now + 1) % count;
      el.scrollTo({ left: next * w, behavior: 'smooth' });
    }, every);
    return () => {
      clearInterval(tick);
      io.disconnect();
      el.removeEventListener('pointerdown', hold);
      el.removeEventListener('touchstart', hold);
      el.removeEventListener('wheel', hold);
      el.removeEventListener('keydown', hold);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('click', click, true);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [track, count, every, auto]);
}
