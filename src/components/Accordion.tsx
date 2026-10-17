'use client';
// Accordion.tsx — a closed section that opens when you tap its title (Hyun, build 0.7).
// ------------------------------------------------------------------
//   PRODUCT DETAILS                                     +
//   ───────────────────────────────────────────────────────
// Tap → the + turns into a −, and the content slides open (height grows smoothly,
// the content fades up). Tap again to close. Starts closed.
// Used on a product's sheet, under "About this piece", for its material and tech (TECH in catalog.ts).
// Accessibility: the title is a real button with aria-expanded; the content is a region.
// iOS: DisclosureGroup with a custom label, or a Button toggling a @State + .animation.
// ------------------------------------------------------------------
import { useId, useState, type ReactNode } from 'react';
import s from './Accordion.module.css';

export function Accordion({ title, meta, className, children }: { title: string; meta?: string; className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className={`${s.accordion} ${open ? s.open : ''} ${className ?? ''}`}>
      <button className={s.toggle} aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)}>
        <span className={s.title}>{title}</span>
        {meta && <span className={s.meta}>{meta}</span>}
        {/* the + : its vertical bar folds away to make a − when open */}
        <span className={s.sign} aria-hidden="true">
          <i />
          <i />
        </span>
      </button>
      {/* the content: a grid row that grows from 0 to its full height, so it can animate */}
      <div id={id} role="region" className={s.panel} aria-hidden={!open}>
        <div className={s.inner}>{children}</div>
      </div>
    </div>
  );
}

/** A key / value table, like a spec sheet: small grey label on the left, value on the right */
export function SpecTable({ rows }: { rows: [string, string][] }) {
  return (
    <dl className={s.spec}>
      {rows.map(([k, v]) => (
        <div key={k} className={s.row}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}
