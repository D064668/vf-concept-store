'use client';
// DragScroll.tsx — every sideways row can be swiped left and right.
// On a phone, rows already swipe with a finger. On a computer (the review
// preview), this lets you grab any sideways row with the mouse and drag it,
// with a little glide, then it settles on the nearest card.
// Mounted once in AppShell; it finds the row under the mouse by itself.
// Hero sliders handle their own dragging (useAutoplay marks them data-paged).
// iOS: not needed — ScrollView(.horizontal) does this natively.
import { useEffect } from 'react';

const sideways = (el: HTMLElement | null): HTMLElement | null => {
  while (el && el !== document.body) {
    const cs = getComputedStyle(el);
    if (/auto|scroll/.test(cs.overflowX) && el.scrollWidth > el.clientWidth + 4) return el;
    el = el.parentElement;
  }
  return null;
};

export function DragScroll() {
  useEffect(() => {
    let row: HTMLElement | null = null;
    let startX = 0;
    let startLeft = 0;
    let moved = false;
    let lastX = 0;
    let lastT = 0;
    let v = 0;
    let dragEnd = 0;

    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const el = sideways(e.target as HTMLElement);
      if (!el || el.dataset.paged) return;
      row = el;
      startX = lastX = e.clientX;
      lastT = performance.now();
      startLeft = el.scrollLeft;
      moved = false;
      v = 0;
    };
    const move = (e: PointerEvent) => {
      if (!row) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) < 6) return;
      if (!moved) {
        moved = true;
        row.style.scrollSnapType = 'none'; // follow the mouse freely while dragging
        row.style.cursor = 'grabbing';
      }
      const now = performance.now();
      v = (e.clientX - lastX) / Math.max(1, now - lastT);
      lastX = e.clientX;
      lastT = now;
      row.scrollLeft = startLeft - dx;
    };
    const up = () => {
      if (!row) return;
      const el = row;
      row = null;
      if (!moved) return;
      dragEnd = Date.now();
      el.style.cursor = '';
      // a little glide in the direction of the flick, then snap to the nearest card
      el.scrollBy({ left: -v * 220, behavior: 'smooth' });
      setTimeout(() => (el.style.scrollSnapType = ''), 320);
    };
    // a drag is not a tap: swallow the click that comes right after it
    const click = (e: MouseEvent) => {
      if (Date.now() - dragEnd < 300) {
        e.stopPropagation();
        e.preventDefault();
      }
    };
    document.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    document.addEventListener('click', click, true);
    return () => {
      document.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('click', click, true);
    };
  }, []);
  return null;
}
