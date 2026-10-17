'use client';
// AtelierSheet.tsx — 02 · Personalise: design the embroidery and see it live (HANDOFF §6 · 02).
// Three small choices, each updating the garment straight away:
//   1. Where  : tap a pin (Left chest, Sleeve) or tap the back view (Center back)
//   2. Thread : one of four Madeira silk colours
//   3. What   : your initials (max 5), a botanical sprig, or initials with a line
// Then ONE main button adds it to the bag.
import { useEffect, useId, useRef, useState } from 'react';
import { Embroidery, flatFor, GarmentFlat, pinsFor, VIEWBOX } from '@/components/GarmentFlat';
import { Icon } from '@/components/Icon';
import { BottomSheet } from '@/components/Sheet';
import { Button, StylistMessage } from '@/components/ui';
import { byId, cleanMonogram, MOTIFS, PLACEMENTS, eur, PERSONALISATION_PRICE, THREADS, type PlacementId } from '@/data/catalog';
import { DEVICES, handoffSheet, sizeFor, useStore } from '@/state/store';
import s from './AtelierSheet.module.css';

const LIGHT_THREADS = ['gold', 'ecru'];

export function AtelierSheet({ productId, from }: { productId: string; from?: 'pick' }) {
  const { state, dispatch, go } = useStore();
  const p = byId(productId);
  const d = state.draft;
  const thread = THREADS.find((t) => t.id === d.thread)!;
  const place = PLACEMENTS.find((x) => x.id === d.placement)!;
  const view = d.placement === 'back' ? 'back' : 'front';
  const inputId = useId();
  const empty = d.motif !== 'sprig' && !d.text;
  const setPlace = (placement: PlacementId) => dispatch({ type: 'draft', patch: { placement } });
  const variant = flatFor(p);
  const PIN = pinsFor(variant);

  // gold measurement leader from the active pin to the stitch loupe (tech-pack style)
  const stage = useRef<HTMLDivElement>(null);
  const loupe = useRef<HTMLDivElement>(null);
  const [leader, setLeader] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);
  useEffect(() => {
    const measure = () => {
      const st = stage.current?.getBoundingClientRect();
      const pin = stage.current?.querySelector('[aria-pressed="true"][data-pin]')?.getBoundingClientRect();
      const lp = loupe.current?.getBoundingClientRect();
      if (!st || !pin || !lp) return setLeader(null);
      const a = { x: pin.left + pin.width / 2 - st.left, y: pin.top + pin.height / 2 - st.top };
      const b = { x: lp.left + lp.width / 2 - st.left, y: lp.top + lp.height / 2 - st.top };
      const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
      const ux = (b.x - a.x) / len;
      const uy = (b.y - a.y) / len;
      // start at the ring's edge, stop at the loupe's edge
      setLeader({ x1: a.x + ux * 22, y1: a.y + uy * 22, x2: b.x - ux * (lp.width / 2 + 4), y2: b.y - uy * (lp.width / 2 + 4) });
    };
    setLeader(null);
    const t = setTimeout(measure, 600); // after the front/back swap settles
    return () => clearTimeout(t);
  }, [d.placement, p.id]);

  const mark = (v: 'front' | 'back') => {
    if (v !== view) return null;
    const pin = PIN[d.placement];
    return <Embroidery text={d.text} motif={d.motif} thread={thread.color} x={pin.x} y={pin.y} size={pin.size} rotate={pin.rotate} />;
  };

  return (
    <BottomSheet
      title="Personalise"
      subtitle={`${p.name} · ${sizeFor(state, p.id)}`}
      // a sheet has no Back arrow (Hyun): slide it down, or tap ⌄, and you're back
      // where you were — the piece's page if you came from there, otherwise the page underneath
      onClose={() => go({ type: 'sheet', sheet: from === 'pick' ? { kind: 'pick', productId } : null })}
      footer={
        <Button full disabled={empty} onClick={() => dispatch({ type: 'personalise', productId })}>
          Add personalisation · <span className="num">{eur(PERSONALISATION_PRICE)}</span>
        </Button>
      }
    >
      {/* ---------- Live stage ---------- */}
      <div className={s.stageWrap}>
        <div className={s.stage} ref={stage} style={{ viewTransitionName: 'piece' }} data-view={view}>
          {leader && (
            <svg className={s.leader} aria-hidden="true">
              <line className={s.leaderHalo} x1={leader.x1} y1={leader.y1} x2={leader.x2} y2={leader.y2} />
              <line x1={leader.x1} y1={leader.y1} x2={leader.x2} y2={leader.y2} />
              <circle cx={leader.x1} cy={leader.y1} r="2" />
              <circle cx={leader.x2} cy={leader.y2} r="2" />
            </svg>
          )}
          {(['front', 'back'] as const).map((v) => {
            const main = v === view;
            return (
              <div key={v} className={`${s.view} ${main ? s.main : s.side}`}>
                <GarmentFlat view={v} color={p.color} variant={variant}>
                  {mark(v)}
                </GarmentFlat>
                {main ? (
                  PLACEMENTS.filter((x) => (v === 'back' ? x.id === 'back' : x.id !== 'back')).map((x) => {
                    const pin = PIN[x.id];
                    const on = d.placement === x.id;
                    return (
                      <button
                        key={x.id}
                        className={`${s.pin} ${on ? s.pinOn : ''}`}
                        style={{ left: `${(pin.x / VIEWBOX.w) * 100}%`, top: `${(pin.y / VIEWBOX.h) * 100}%` }}
                        aria-pressed={on}
                        data-pin
                        aria-label={`${x.name}, ${x.mm} millimetres`}
                        onClick={() => setPlace(x.id)}
                      >
                        <span className={s.dot} />
                        <span className={s.pinLabel}>
                          {x.name} · <span className="num">{x.mm} mm</span>
                        </span>
                      </button>
                    );
                  })
                ) : (
                  <button
                    className={s.sideHit}
                    onClick={() => setPlace(v === 'back' ? 'back' : 'chest')}
                    aria-label={v === 'back' ? 'Show the back: Center back placement' : 'Show the front: Left chest placement'}
                  >
                    <span className={s.sideLabel}>{v === 'back' ? 'Back' : 'Front'}</span>
                  </button>
                )}
              </div>
            );
          })}

          {/* stitch detail loupe: the monogram at real-thread scale */}
          <div className={s.loupe} ref={loupe} aria-hidden="true" style={{ ['--cloth' as string]: p.color, ['--thread' as string]: thread.color }}>
            {d.motif === 'sprig' ? (
              <svg viewBox="0 0 16 16" className={s.loupeSprig}>
                <path
                  d="M8 16c0-5 .3-9 2-13.5M8 11C5 11 3.2 9.2 3 6.5 5.8 6.6 7.6 8.3 8 11zm.6-3.4c.5-2.6 2.2-4 4.7-4.1-.2 2.6-1.9 4-4.7 4.1z"
                  fill="var(--thread)"
                  stroke="var(--thread)"
                  strokeWidth=".9"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              <span className={`${s.loupeText} ${d.motif === 'line' ? s.loupeLine : ''}`} data-len={d.text.length}>
                {d.text}
              </span>
            )}
          </div>
          <p className={s.loupeCap}>
            Stitch detail
            <br />
            <span className="num">{place.mm} mm</span>
          </p>
        </div>

        {/* ---------- Thread ---------- */}
        <div className={s.thread}>
          <p className={s.threadName}>
            Thread · <b>{thread.name}</b>
          </p>
          <div className={s.spools} role="group" aria-label="Thread colour">
            {THREADS.map((t) => (
              <button
                key={t.id}
                className={`${s.spool} ${t.id === d.thread ? s.spoolOn : ''} ${LIGHT_THREADS.includes(t.id) ? '' : s.spoolDark}`}
                style={{ ['--thread' as string]: t.color }}
                aria-pressed={t.id === d.thread}
                aria-label={t.name}
                onClick={() => dispatch({ type: 'draft', patch: { thread: t.id } })}
              >
                {t.id === d.thread && <Icon name="check" size={18} strokeWidth={2.4} className={LIGHT_THREADS.includes(t.id) ? s.inkCheck : s.lightCheck} />}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={s.content}>
        <StylistMessage>
          Your initials, <b>tone on tone</b>. They catch the light only when you move.
        </StylistMessage>

        {/* ---------- Co-creation ---------- */}
        <section className={s.card} aria-label="Your embroidery">
          <div className={s.cardHead}>
            <label htmlFor={inputId} className={s.cardLabel}>
              Monogram
            </label>
            <span className={s.spec}>
              <span className={s.specDot} aria-hidden="true" />
              {place.name} · <span className="num">{place.mm} mm</span>
            </span>
          </div>
          <div className={s.fieldRow}>
            <input
              id={inputId}
              className={s.mono}
              value={d.text}
              disabled={d.motif === 'sprig'}
              onChange={(e) => dispatch({ type: 'draft', patch: { text: cleanMonogram(e.target.value) } })}
              autoCapitalize="characters"
              autoComplete="off"
              spellCheck={false}
              aria-describedby={`${inputId}-help`}
            />
            <span className={`${s.count} num`} aria-hidden="true">
              {d.text.length}/5
            </span>
          </div>
          <p id={`${inputId}-help`} className={s.help}>
            {d.motif === 'sprig' ? 'The sprig is stitched on its own, no letters.' : empty ? 'Add at least one letter to continue.' : 'Up to 5 letters, numbers or “·”.'}
          </p>

          <div className={s.motifs} role="group" aria-label="Motif">
            {MOTIFS.map((m) => (
              <button
                key={m.id}
                className={`${s.motif} ${d.motif === m.id ? s.motifOn : ''}`}
                aria-pressed={d.motif === m.id}
                onClick={() => dispatch({ type: 'draft', patch: { motif: m.id } })}
              >
                <MotifGlyph id={m.id} />
                {m.name}
              </button>
            ))}
          </div>
        </section>

        {/* one tap sends the piece and this design to the big table (pairs first if needed) */}
        <Button variant="secondary" icon="table" full onClick={() => go({ type: 'sheet', sheet: handoffSheet(state, 'tabletop', productId) })}>
          {DEVICES.tabletop.action}
        </Button>
      </div>
    </BottomSheet>
  );
}

function MotifGlyph({ id }: { id: 'monogram' | 'sprig' | 'line' }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      {id === 'monogram' && <path d="M4 15 7.5 5 11 15M5.3 11.5h4.4M13 5v10h3.5" />}
      {id === 'sprig' && <path d="M10 18c0-6 .4-10 2.5-14.5M10 12c-3.4 0-5.2-2-5.5-5 3.2.1 5.1 2 5.5 5zm.8-3.8c.6-2.9 2.5-4.4 5.3-4.6-.2 2.9-2.1 4.5-5.3 4.6z" />}
      {id === 'line' && <path d="M3 13h14M3 7.5h5M10.5 7.5h1.5M14.5 7.5h2.5" strokeDasharray="0" />}
    </svg>
  );
}
