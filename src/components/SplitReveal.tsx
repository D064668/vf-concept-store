'use client';
// SplitReveal.tsx — a paragraph that rises in LINE BY LINE from behind a mask.
// ------------------------------------------------------------------
// Used for Home's statement (Hyun, build 0.7: "an elegant split text masking reveal").
// How it works, simply:
//   1. the words are laid out once, so we can see which words landed on which line
//   2. each line gets its own window (overflow: hidden) — the "mask"
//   3. when the paragraph scrolls into view, each line slides up into its
//      window from just below it, one line after another (200ms apart)
//   4. if the screen width changes, the lines are worked out again
// It plays once. Reduce Motion: the text simply shows.
// Screen readers read the whole sentence once (the split lines are hidden from them).
// iOS: split the text into lines (TextKit / Text.LayoutKey), each line in a
//      .clipped() frame with .offset(y:) animated in, .delay(i * 0.14).
// ------------------------------------------------------------------
import { useLayoutEffect, useRef, useState } from 'react';
import { useInView } from './Reveal';
import s from './SplitReveal.module.css';

export function SplitReveal({ text, className }: { text: string; className?: string }) {
  // starts once the text is well into view, not as it peeks in (Hyun: start later)
  const [ref, inView] = useInView<HTMLParagraphElement>('0px 0px -40% 0px');
  const measure = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const words = text.split(' ');

  // find the lines: words with the same distance from the top share a line
  useLayoutEffect(() => {
    const box = measure.current;
    if (!box) return;
    const split = () => {
      const out: string[][] = [];
      let lastTop = -1;
      box.querySelectorAll('span').forEach((w) => {
        const top = (w as HTMLElement).offsetTop;
        if (top !== lastTop) out.push([]);
        out[out.length - 1].push((w.textContent ?? '').trim());
        lastTop = top;
      });
      setLines(out.map((l) => l.join(' ')));
    };
    split();
    const ro = new ResizeObserver(split);
    ro.observe(box);
    document.fonts?.ready.then(split); // the brand font can change where lines break
    return () => ro.disconnect();
  }, [text]);

  return (
    <p ref={ref} className={`${s.wrap} ${className ?? ''} ${inView ? s.in : ''}`}>
      {/* what screen readers read: the sentence, once */}
      <span className="sr-only">{text}</span>
      {/* invisible copy, only used to see where the lines break */}
      <span ref={measure} className={s.measure} aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>{w} </span>
        ))}
      </span>
      {/* the lines you see: each in its own mask, rising in turn */}
      <span className={s.lines} aria-hidden="true">
        {(lines ?? [text]).map((l, i) => (
          <span key={i} className={s.mask}>
            <span className={s.line} style={{ transitionDelay: `${i * 200}ms` }}>
              {l}{' '}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}
