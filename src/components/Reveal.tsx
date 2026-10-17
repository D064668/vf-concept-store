'use client';
// Reveal.tsx — editorial scroll reveals (design-system motion tokens).
// ------------------------------------------------------------------
// The rule from the design system, in plain words:
//   • Only EDITORIAL content animates in as you scroll (headlines, looks,
//     campaign tiles, text blocks). Never shopping controls (sizes, buttons
//     you need right away, the bag, checkout).
//   • Headlines: each word slides UP out of an invisible line, one after
//     another, 80ms apart (HANDOFF 01b "words reveal upward, staggered 80ms").
//   • Blocks: fade in while rising 16px (distance-md), 900ms
//     (duration-editorial), brand curve, cascading 120ms apart (stagger-editorial).
//   • Each thing animates once, the first time it scrolls into view.
//   • Reduce Motion on: everything simply shows, no movement.
//
// iOS: an .onAppear (or scrollTransition) that animates opacity + offset(y)
// with .timingCurve(0.22, 1, 0.36, 1, duration: 0.9) and .delay(i * 0.12).
// ------------------------------------------------------------------
import { createElement, Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

/** true once the element has scrolled into view (and stays true) */
export function useInView<T extends HTMLElement>(margin = '0px 0px -12% 0px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      // -12% at the bottom: it starts a little after it peeks in, so you see it happen
      { rootMargin: margin, threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, margin]);
  return [ref, inView] as const;
}

type Tag = 'div' | 'p' | 'span' | 'li' | 'ul' | 'section' | 'h1' | 'h2' | 'h3';

/** A block that fades up into place. `i` = its place in a cascade (0, 1, 2…). */
export function Reveal({
  as = 'div',
  i = 0,
  className,
  style,
  children,
  ...rest
}: { as?: Tag; i?: number; className?: string; style?: CSSProperties; children?: ReactNode } & Record<string, unknown>) {
  const [ref, inView] = useInView<HTMLElement>();
  return createElement(
    as,
    {
      ref,
      className,
      'data-reveal': '',
      'data-in': inView ? '' : undefined,
      style: { ...style, ['--i' as string]: i },
      ...rest,
    },
    children
  );
}

/** A headline whose words rise up one by one. Screen readers hear the plain sentence. */
export function RevealWords({
  text,
  as = 'h2',
  className,
  delay = 0,
  id,
}: {
  text: string;
  as?: Tag;
  className?: string;
  /** wait this many ms before the first word (e.g. after an image has faded in) */
  delay?: number;
  id?: string;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  const words = text.split(' ');
  return createElement(
    as,
    { ref, id, className, 'aria-label': text, 'data-words': '', 'data-in': inView ? '' : undefined },
    words.map((w, n) => (
      // outer span = the invisible "line" that hides the word; inner span = the word that slides up
      <Fragment key={n}>
        <span className="rw" aria-hidden="true">
          <span style={{ transitionDelay: `${delay + n * 80}ms` }}>{w}</span>
        </span>
        {n < words.length - 1 ? ' ' : ''}
      </Fragment>
    ))
  );
}
