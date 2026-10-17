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
//
// `highlight` (Hyun: "bring back the text highlight, but start it a little later"):
// after the lines rise in (in soft grey), the words light up to full ink one by one
// AS YOU SCROLL: none lit while the paragraph's top is below the middle of the screen,
// all lit once it has moved up to ~15% from the top. Scroll back down and they dim again.
// Screen readers read the whole sentence once (the split lines are hidden from them).
// iOS: split the text into lines (TextKit / Text.LayoutKey), each line in a
//      .clipped() frame with .offset(y:) animated in, .delay(i * 0.14).
//      Highlight: read the ScrollView offset (onScrollGeometryChange) and colour each
//      word .primary or .secondary depending on how far you've scrolled.
// ------------------------------------------------------------------
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useInView } from './Reveal';
import s from './SplitReveal.module.css';

/** where the highlight starts and ends: the paragraph's top, as a share of the screen height */
const LIGHT_START = 0.5; // top at the middle of the screen → the first word lights up
const LIGHT_END = 0.15; // top at 15% from the top → every word is lit

export function SplitReveal({ text, className, highlight }: { text: string; className?: string; highlight?: boolean }) {
  // starts once the text is well into view, not as it peeks in (Hyun: start later)
  const [ref, inView] = useInView<HTMLParagraphElement>('0px 0px -40% 0px');
  const measure = useRef<HTMLSpanElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const words = text.split(' ');
  // how many words are lit (highlight only); everything is lit when there's no highlight
  const [lit, setLit] = useState(highlight ? 0 : words.length);

  // follow the scroll (any scrolling box on the page) and work out how many words are lit
  useEffect(() => {
    if (!highlight) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setLit(words.length); // Reduce Motion: no scrubbing, just the full text
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top / window.innerHeight; // 0 = top of the screen, 1 = bottom
      const progress = Math.min(1, Math.max(0, (LIGHT_START - top) / (LIGHT_START - LIGHT_END)));
      setLit(Math.round(progress * words.length));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update); // at most once per frame
    };
    update();
    window.addEventListener('scroll', onScroll, { capture: true, passive: true }); // capture: hears inner scroll boxes too
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll, { capture: true });
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [highlight, words.length, ref]);

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
      {/* the lines you see: each in its own mask, rising in turn; each word can light up */}
      <span className={s.lines} aria-hidden="true">
        {(lines ?? [text]).map((l, i) => {
          // the number of words on the lines above, so every word knows its place in the sentence
          const before = (lines ?? [text]).slice(0, i).join(' ').split(' ').filter(Boolean).length;
          return (
            <span key={i} className={s.mask}>
              <span className={s.line} style={{ transitionDelay: `${i * 200}ms` }}>
                {l.split(' ').map((w, j) => (
                  <span key={j} className={highlight ? (before + j < lit ? s.lit : s.dim) : undefined}>
                    {w}{' '}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </p>
  );
}
