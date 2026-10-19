'use client';
// StitchTracker.tsx — My Visit: follow a personalised piece while the Tajima cell makes it.
// ------------------------------------------------------------------
//   [photo]  Mountain Jacket · Monogram H·L
//            Stitching now · 64%                 ready about 14:41
//            ███████████░░░░░
//   ✓ Paid                             14:20
//   ✓ In the machine queue · Tajima    14:22
//   ● Stitching · 3,970 of 6,200       since 14:24
//   ○ Quality check                    about 14:38
//   ○ Ready in vault 04                about 14:41
// It updates by itself every second; when it's done, every step is ticked and the
// card offers the vault code. The timing lives in src/state/stitching.ts (demo clock).
// iOS: a card with a List of steps; the stitching step has a ProgressView.
// ------------------------------------------------------------------
import { useEffect, useState } from 'react';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { byId, MOTIFS, thumbFor } from '@/data/catalog';
import { useStore, type Order } from '@/state/store';
import { STITCH_COUNT, stitchStatus } from '@/state/stitching';
import s from './StitchTracker.module.css';

export function StitchTracker({ order }: { order: Order }) {
  const { go } = useStore();
  const finished = !order.stitching;
  const [now, setNow] = useState(() => Date.now());
  const [tajimaTip, setTajimaTip] = useState(false);

  // tick every second while it's being made
  useEffect(() => {
    if (finished) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [finished]);

  // close tooltip on escape key
  useEffect(() => {
    if (!tajimaTip) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setTajimaTip(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [tajimaTip]);

  const st = stitchStatus(order.paidAt ?? now, now, finished);
  const item = order.items.find((b) => b.personalisation) ?? order.items[0];
  const p = byId(item.productId);
  const pz = item.personalisation;
  const motif = pz ? MOTIFS.find((m) => m.id === pz.motif) : undefined;
  const pct = Math.round(st.progress * 100);

  const headline = finished
    ? `Ready in vault ${order.vault}`
    : st.current === 'stitch'
      ? `Stitching now · ${pct}%`
      : st.current === 'check'
        ? 'Quality check'
        : st.current === 'hoop'
          ? 'In the Tajima embroidery studio'
          : 'Paid · going to the embroidery studio';

  return (
    <section className={`${s.card} ${finished ? s.done : ''}`} aria-labelledby="stitch-h" aria-live="polite">
      {/* the piece and where it is */}
      <div className={s.top}>
        <span className={s.thumb}>
          <PhotoSlot kind="garment" photo={thumbFor(p)} color={p.color} category={p.category} label={`${p.brandName} ${p.name}`} />
        </span>
        <div className={s.what}>
          <span className={s.piece}>
            {p.name}
            {pz && motif && ` · ${pz.motif === 'sprig' ? motif.name : `${motif.name} ${pz.text}`}`}
          </span>
          <b id="stitch-h" className={s.headline}>
            {headline}
          </b>
          <span className={s.eta}>{finished ? `Since ${st.readyAt}` : `Ready about ${st.readyAt}`}</span>
        </div>
      </div>

      {/* overall progress: the stitching itself fills the bar */}
      {!finished && (
        <div className={s.bar} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Stitching progress">
          <i style={{ width: `${Math.max(st.current === 'paid' || st.current === 'hoop' ? 2 : 0, pct)}%` }} />
        </div>
      )}

      {/* the steps, with their times */}
      <ol className={s.steps}>
        {st.steps.map((step) => (
          <li key={step.key} className={s[step.state]}>
            <span className={s.dot} aria-hidden="true">
              {step.state === 'done' && <Icon name="check" size={12} strokeWidth={3} />}
            </span>
            <span className={s.label}>
              {step.key === 'ready' && `Ready in vault ${order.vault}`}
              {step.key === 'hoop' && (
                <>
                  In the{' '}
                  <span className={s.tajimaWrap}>
                    <button
                      type="button"
                      className={s.tajimaLink}
                      onClick={() => setTajimaTip((v) => !v)}
                      aria-expanded={tajimaTip}
                      aria-label="What is Tajima? Tap for info"
                    >
                      Tajima
                    </button>
                    {tajimaTip && (
                      <>
                        <div className={s.tooltipBackdrop} onClick={() => setTajimaTip(false)} />
                        <div className={s.tooltip} role="tooltip">
                          <div className={s.tooltipArrow} />
                          <div className={s.tooltipHead}>
                            <b className={s.tooltipTitle}>Tajima</b>
                            <button
                              type="button"
                              className={s.tooltipClose}
                              onClick={() => setTajimaTip(false)}
                              aria-label="Close"
                            >
                              ✕
                            </button>
                          </div>
                          <p className={s.tooltipText}>
                            A premier Japanese maker of precision embroidery machines. In this store, an automated Tajima unit precision-stitches your personalised monogram or motif.
                          </p>
                        </div>
                      </>
                    )}
                  </span>{' '}
                  embroidery studio
                </>
              )}
              {step.key !== 'ready' && step.key !== 'hoop' && step.label}
              {step.key === 'stitch' && step.state === 'now' && (
                <em className="num">
                  {' '}
                  · {st.stitches.toLocaleString('en')} of {STITCH_COUNT.toLocaleString('en')} stitches
                </em>
              )}
            </span>
            <span className={`${s.time} num`}>{step.time}</span>
          </li>
        ))}
      </ol>

      <button className={s.link} onClick={() => go({ type: 'push', screen: 'order' })}>
        {finished ? 'Show my vault code' : 'Show my order and vault code'}
      </button>
    </section>
  );
}
