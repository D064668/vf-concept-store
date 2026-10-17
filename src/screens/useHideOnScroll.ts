// useHideOnScroll — hides the stylist button while you scroll down to read,
// and brings it back when you scroll up or stop. So it never sits on content
// you are looking at. (iOS: same behaviour as Safari's toolbar.)
import { useEffect, useState, type RefObject } from 'react';

export function useHideOnScroll(ref: RefObject<HTMLElement | null>, idleMs = 900) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let last = el.scrollTop;
    let idle: ReturnType<typeof setTimeout>;
    const on = () => {
      const y = el.scrollTop;
      if (y > last + 4 && y > 80) setHidden(true);
      else if (y < last - 4) setHidden(false);
      last = y;
      clearTimeout(idle);
      idle = setTimeout(() => setHidden(false), idleMs);
    };
    el.addEventListener('scroll', on, { passive: true });
    return () => {
      el.removeEventListener('scroll', on);
      clearTimeout(idle);
    };
  }, [ref, idleMs]);
  return hidden;
}
