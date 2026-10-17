'use client';
// Handoff.tsx — sending a piece from the phone to a store screen.
// ------------------------------------------------------------------
// Two store screens can take a piece from the phone:
//   • Tabletop 55″ : "Personalize on Tabletop", design the embroidery big
//   • Hologram     : "Try on with Hologram", see the piece on you, life-size
//
// The flow, like explaining it to a five-year-old:
//   1. PAIR (once per visit): the phone and the screen shake hands.
//      Scan the QR code on the screen, OR type the 6-digit code it shows.
//   2. HAND OFF (one tap): the piece jumps from the phone to the screen.
//   3. LIVE: a small pill above the tab bar says "Live on the Hologram",
//      so you can keep browsing and come back to it.
//
// The prototype fakes the store network: the scan "finds" a code after a
// moment, and the demo codes are 482913 (Tabletop) and 730618 (Hologram).
// iOS: QR scanning = VisionKit DataScannerViewController (.barcode(.qr));
// the session = a WebSocket / Multipeer session to the device, keyed by the code.
// ------------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { BottomSheet } from '@/components/Sheet';
import { Button } from '@/components/ui';
import { byId, PRODUCTS, THREADS, thumbFor } from '@/data/catalog';
import { DEVICES, sizeFor, useStore, type Device } from '@/state/store';
import s from './Handoff.module.css';

const ICON = { tabletop: 'table', hologram: 'hologram' } as const;
const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* =================================================================
   1 · PAIR — scan the QR code or type the 6-digit code
   ================================================================= */
export function PairSheet({ device, productId }: { device: Device; productId: string }) {
  const { dispatch, go } = useStore();
  const d = DEVICES[device];
  const [mode, setMode] = useState<'scan' | 'code'>('scan');
  const [done, setDone] = useState(false); // true once the phone is connected

  // once connected, show the tick for a moment, then hand the piece over
  const connect = () => {
    if (done) return;
    setDone(true);
    dispatch({ type: 'pair', device });
    setTimeout(() => go({ type: 'sheet', sheet: { kind: 'handoff', device, productId } }), reduced() ? 300 : 900);
  };

  return (
    <BottomSheet
      title={d.name}
      subtitle="Connect once for your whole visit"
      leading={
        <span className={s.lead}>
          <Icon name={ICON[device]} size={22} />
        </span>
      }
      onClose={() => go({ type: 'sheet', sheet: { kind: 'pick', productId } })}
      closeIcon="close"
    >
      <div className={s.pair}>
        {done ? (
          <Connected name={d.name} />
        ) : (
          <>
            {/* two ways to connect: a segmented control (iOS: Picker .segmented) */}
            <div className={s.seg} role="tablist" aria-label="How to connect">
              <button role="tab" aria-selected={mode === 'scan'} onClick={() => setMode('scan')}>
                <Icon name="scan" size={18} /> Scan code
              </button>
              <button role="tab" aria-selected={mode === 'code'} onClick={() => setMode('code')}>
                <span className={s.hash} aria-hidden="true">123</span> Enter code
              </button>
            </div>
            {mode === 'scan' ? <Scanner device={device} onFound={connect} /> : <CodeEntry device={device} onMatch={connect} />}
          </>
        )}
      </div>
    </BottomSheet>
  );
}

/** The camera view. In the prototype it "finds" the code after a short moment. */
function Scanner({ device, onFound }: { device: Device; onFound: () => void }) {
  const [found, setFound] = useState(false);
  const cb = useRef(onFound);
  cb.current = onFound; // always call the latest version, without restarting the timers
  useEffect(() => {
    // pretend the camera sees the QR code on the store screen
    const t1 = setTimeout(() => setFound(true), 2200);
    const t2 = setTimeout(() => cb.current(), 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
  return (
    <div className={s.scanWrap}>
      <div className={`${s.viewfinder} ${found ? s.found : ''}`} role="img" aria-label={`Camera view, pointed at the code on the ${DEVICES[device].name}`}>
        {/* what the camera "sees": the store screen with its code */}
        <div className={s.cameraScene} aria-hidden="true">
          <div className={s.screenGlow}>
            <QrCode seed={DEVICES[device].code} />
            <span className={s.screenLabel}>S·Fashion · {DEVICES[device].name}</span>
          </div>
        </div>
        <span className={s.corners} aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        {!found && <span className={s.scanLine} aria-hidden="true" />}
        {found && (
          <span className={s.foundTick} aria-hidden="true">
            <Icon name="check" size={28} strokeWidth={2.4} />
          </span>
        )}
      </div>
      <p className={s.help} role="status">
        {found ? 'Code found. Connecting…' : `Point your camera at the code on the ${DEVICES[device].name} screen.`}
      </p>
    </div>
  );
}

/** Six boxes for the code. One real input sits underneath, so paste and
 *  iOS "one-time code" autofill both work. */
function CodeEntry({ device, onMatch }: { device: Device; onMatch: () => void }) {
  const [code, setCode] = useState('');
  const [wrong, setWrong] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const expected = DEVICES[device].code;

  useEffect(() => {
    input.current?.focus({ preventScroll: true });
  }, []);

  const change = (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 6); // numbers only, max 6
    setCode(digits);
    setWrong(false);
    if (digits.length === 6) {
      if (digits === expected) onMatch();
      else {
        setWrong(true);
        setTimeout(() => setCode(''), 650); // clear it so they can try again
      }
    }
  };

  return (
    <div className={s.codeWrap}>
      <label className={s.codeLabel} htmlFor="pair-code">
        Type the 6-digit code shown on the {DEVICES[device].name}
      </label>
      <div className={`${s.cells} ${wrong ? s.shake : ''}`} onClick={() => input.current?.focus()}>
        <input
          id="pair-code"
          ref={input}
          className={s.codeInput}
          value={code}
          onChange={(e) => change(e.target.value)}
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]*"
          maxLength={6}
          aria-invalid={wrong}
          aria-describedby="pair-help"
        />
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={`${s.cell} num ${i === code.length ? s.cellNow : ''} ${wrong ? s.cellWrong : ''}`} aria-hidden="true">
            {code[i] ?? ''}
          </span>
        ))}
      </div>
      <p id="pair-help" className={`${s.help} ${wrong ? s.helpWrong : ''}`} role="status">
        {wrong ? 'That code doesn’t match. Check the screen and try again.' : 'The code changes every few minutes, so it only works in the store.'}
      </p>
      {/* demo only: fills in the right code */}
      <button className={s.demo} onClick={() => change(expected)}>
        Demo code: <span className="num">{expected.replace(/(\d{3})(\d{3})/, '$1 $2')}</span>
      </button>
    </div>
  );
}

function Connected({ name }: { name: string }) {
  return (
    <div className={s.connected} role="status">
      <span className={s.bigTick}>
        <Icon name="check" size={34} strokeWidth={2.2} />
      </span>
      <b>Connected to the {name}</b>
      <span>For the rest of your visit.</span>
    </div>
  );
}

/** A QR-looking pattern drawn from the code (decorative: the real code comes from the device). */
export function QrCode({ seed, size = 21 }: { seed: string; size?: number }) {
  // a tiny pseudo-random generator, so the same code always draws the same pattern
  let n = Number(seed) || 1;
  const rnd = () => ((n = (n * 1103515245 + 12345) % 2147483648) / 2147483648);
  const finder = (x: number, y: number) =>
    [[0, 0], [size - 7, 0], [0, size - 7]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const cells: [number, number][] = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (!finder(x, y) && rnd() > 0.52) cells.push([x, y]);
  return (
    <svg viewBox={`-1 -1 ${size + 2} ${size + 2}`} className={s.qr} aria-hidden="true" shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={size + 2} height={size + 2} fill="#fff" />
      {[[0, 0], [size - 7, 0], [0, size - 7]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#111" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#111" />
        </g>
      ))}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#111" />
      ))}
    </svg>
  );
}

/* =================================================================
   2 · HAND OFF — the piece goes to the screen, then it's live
   ================================================================= */
export function HandoffSheet({ device, productId }: { device: Device; productId: string }) {
  const { state, dispatch, go } = useStore();
  const p = byId(productId);
  const d = DEVICES[device];
  const alreadyLive = state.live?.device === device && state.live.productId === productId;
  const [phase, setPhase] = useState<'sending' | 'live'>(alreadyLive ? 'live' : 'sending');
  // Hologram: colour, size and "add" happen ON the Hologram. When you tap
  // "Send to my phone" there, the piece lands back here to add to the bag.
  const [received, setReceived] = useState(false);
  const size = sizeFor(state, p.id);
  const inBag = state.bag.some((b) => b.productId === p.id);
  const oneSize = p.sizes.length === 1;

  useEffect(() => {
    if (alreadyLive) return;
    // "sending" for a moment, then the screen confirms it's showing the piece
    const t = setTimeout(() => {
      setPhase('live');
      dispatch({ type: 'live', live: { device, productId } });
    }, reduced() ? 200 : 1400);
    return () => clearTimeout(t);
  }, [alreadyLive, device, productId, dispatch]);

  const end = (then: 'pick' | 'atelier') => {
    dispatch({ type: 'live', live: null });
    if (then === 'atelier') dispatch({ type: 'toast', text: 'Your design is back from the Tabletop' });
    go({ type: 'sheet', sheet: { kind: then, productId } });
  };

  const steps =
    device === 'tabletop'
      ? ['Go to the Tabletop 55″. Your piece is already on it.', 'Place, size and colour your embroidery on the big screen.', 'Your design comes back to this phone to check out.']
      : // the Hologram's camera sees you; no marker on the floor (Hyun). Confirm the wording with the hardware team.
        ['Stand in front of the Hologram, facing the screen.', `Its camera sees you, and the ${p.name} appears on you, life-size.`, 'Choose colour and size on the Hologram, then tap “Send to my phone”.'];

  return (
    <BottomSheet
      title={d.name}
      subtitle={
        phase === 'live' ? (
          <>
            <span className={s.liveDot} aria-hidden="true" />
            Live · showing your piece
          </>
        ) : (
          'Sending from your phone…'
        )
      }
      leading={
        <span className={s.lead}>
          <Icon name={ICON[device]} size={22} />
        </span>
      }
      onClose={() => go({ type: 'sheet', sheet: null })}
    >
      <div className={s.handoff}>
        {/* the store screen, showing the piece */}
        <div className={`${s.device} ${s[device]} ${phase === 'live' ? s.isLive : ''}`}>
          {device === 'hologram' ? (
            <HologramStage productId={p.id} />
          ) : (
            <TabletopStage productId={p.id} />
          )}
          {phase === 'sending' && (
            <div className={s.sending} aria-hidden="true">
              <Icon name="phone" size={20} />
              <span className={s.beam}>
                <i />
                <i />
                <i />
              </span>
              <Icon name={ICON[device]} size={20} />
            </div>
          )}
        </div>

        <div className={s.what} aria-live="polite">
          <p className={s.whatName}>
            {p.brandName} {p.name}
          </p>
          <p className={s.whatMeta}>
            {p.colorName}
            {!oneSize && ` · Size ${size}`}
            {device === 'tabletop' && ` · ${state.draft.text} in ${THREADS.find((t) => t.id === state.draft.thread)!.name.toLowerCase()}`}
          </p>
        </div>

        <ol className={s.steps}>
          {steps.map((t, i) => (
            <li key={i}>
              <span className={`${s.stepNo} num`}>{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>

        <div className={s.actions}>
          {device === 'tabletop' ? (
            <>
              <Button full icon="phone" disabled={phase !== 'live'} onClick={() => end('atelier')}>
                Bring my design back
              </Button>
              <Button full variant="quiet" onClick={() => end('pick')}>
                End session
              </Button>
            </>
          ) : (
            <>
              {received ? (
                // the piece came back from the Hologram, with what was chosen there
                <div className={s.back} aria-live="polite">
                  <p className={s.backLabel}>
                    <Icon name="phone" size={16} /> Sent from the Hologram
                  </p>
                  <div className={s.backRow}>
                    <span className={s.backThumb}>
                      <PhotoSlot kind="garment" photo={thumbFor(p)} color={p.color} category={p.category} label={`${p.brandName} ${p.name}`} />
                    </span>
                    <span className={s.backText}>
                      <b>{p.name}</b>
                      <span>
                        {p.colorName}
                        {!oneSize && ` · Size ${size}`}
                      </span>
                    </span>
                  </div>
                  {inBag ? (
                    <Button full icon="bag" onClick={() => go({ type: 'sheet', sheet: { kind: 'bag' } })}>
                      In your bag · View bag
                    </Button>
                  ) : (
                    <Button full icon="bag" onClick={() => dispatch({ type: 'add', items: [{ productId: p.id, size }] })}>
                      Add to bag
                    </Button>
                  )}
                  <Button full variant="quiet" onClick={() => setReceived(false)}>
                    Keep trying on
                  </Button>
                </div>
              ) : (
                <>
                  <div className={s.waiting}>
                    <span className={s.liveDot} aria-hidden="true" />
                    {phase === 'live' ? 'Waiting for “Send to my phone” on the Hologram' : 'Connecting…'}
                  </div>
                  {/* prototype only: stands in for the tap on the Hologram */}
                  <button className={s.demoSend} disabled={phase !== 'live'} onClick={() => setReceived(true)}>
                    Demo: send it from the Hologram
                  </button>
                  <Button full variant="quiet" onClick={() => end('pick')}>
                    End try-on
                  </Button>
                </>
              )}
            </>
          )}
        </div>
        <p className={s.note}>Close this and keep browsing. The {d.name} stays connected.</p>
      </div>
    </BottomSheet>
  );
}

/** The hologram: the model photo in a dark column of light (no floor ring: people just stand in front of it) */
/** The Hologram: the store photo of someone trying a jacket on the Hologram (Hyun, build 0.7).
 *  Same frame everywhere it shows (My Visit card, the hand-off sheet). productId is kept
 *  for the label, and for when the real Hologram feed replaces the photo. */
export function HologramStage({ productId, compact, side }: { productId: string; compact?: boolean; side?: boolean }) {
  const p = byId(productId);
  return (
    <div className={`${s.holo} ${compact ? s.holoCompact : ''} ${side ? s.holoSide : ''}`}>
      <img
        className={s.holoPhoto}
        src="/assets/hologram-store.jpg"
        alt={`Trying the ${p.brandName} ${p.name} on the Hologram`}
        draggable={false}
      />
    </div>
  );
}

/** The tabletop: the garment laid flat with the monogram placed on it */
function TabletopStage({ productId }: { productId: string }) {
  const { state } = useStore();
  const p = byId(productId);
  const photo = p.photos.find((ph) => ph.packshot) ?? p.photos[0];
  const thread = THREADS.find((t) => t.id === state.draft.thread)!;
  return (
    <div className={s.table}>
      <div className={s.tablePiece}>
        <PhotoSlot kind="garment" photo={photo} label={`${p.brandName} ${p.name} on the tabletop`} />
      </div>
      {/* a little tool palette, like the big screen shows */}
      <div className={s.tableTools} aria-hidden="true">
        {THREADS.map((t) => (
          <i key={t.id} style={{ background: t.color }} className={t.id === thread.id ? s.toolOn : undefined} />
        ))}
      </div>
      <span className={s.tableMono} style={{ color: thread.color }} aria-hidden="true">
        {state.draft.text}
      </span>
    </div>
  );
}

/* =================================================================
   3 · LIVE — the pill above the tab bar while a screen shows your piece
   ================================================================= */
export function LivePill() {
  const { state, go } = useStore();
  const live = state.live;
  if (!live || state.sheet || state.search.open) return null;
  const p = PRODUCTS.find((x) => x.id === live.productId);
  if (!p) return null;
  return (
    <button className={s.pill} onClick={() => go({ type: 'sheet', sheet: { kind: 'handoff', device: live.device, productId: live.productId } })}>
      <span className={s.liveDot} aria-hidden="true" />
      <span className={s.pillText}>
        <b>Live on the {DEVICES[live.device].name}</b>
        <span>{p.name}</span>
      </span>
      <Icon name="chevron" size={16} />
    </button>
  );
}

