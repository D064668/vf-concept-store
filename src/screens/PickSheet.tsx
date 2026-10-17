'use client';
// PickSheet.tsx — 01b · the stylist sheet with one piece (HANDOFF §6 · 01b).
// Order of the sheet: stage (real photos) → why it suits you → brand + piece + size →
// Add to bag (the one main button) / Personalise → hand it to a store screen → composer.
import { useEffect, useRef, useState } from 'react';
import { Accordion, SpecTable } from '@/components/Accordion';
import { BrandLogo } from '@/components/BrandLogo';
import { BagButton } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import { ExpandHint, useLightbox } from '@/components/Lightbox';
import { PhotoSlot } from '@/components/PhotoSlot';
import { BottomSheet } from '@/components/Sheet';
import { Button, Composer, SizeRail, StylistAvatar, StylistMessage } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';
import { ABOUT, byId, GOES_WITH, PRODUCTS, fitFor, isPersonalisable, noteFor, TECH } from '@/data/catalog';
import { DEVICES, handoffSheet, sizeFor, useStore, useStylist } from '@/state/store';
import { PIECE_HINTS, piecePills } from '@/data/stylist';
import { useAutoplay } from './useAutoplay';
import s from './PickSheet.module.css';

/** The stylist's stories, in order: they lead "Other options for you". */
const STORIES = ['tnf-mountain', 'napapijri-puffer', 'smartwool-crew', 'altra-trail'];

export function PickSheet({ productId, back }: { productId: string; back?: 'chat' }) {
  const { state, dispatch, go } = useStore();
  const stylist = useStylist();
  const p = byId(productId);
  const size = sizeFor(state, p.id);
  const fit = fitFor(p); // the size the fit profile suggests (M, or 42 for shoes)
  const oneSize = p.sizes.length === 1; // bags: no size to choose
  const inBag = state.bag.find((b) => b.productId === p.id);
  const reserved = inBag?.size === size;
  // the stylist's line: mentions your plan if this piece leads the look for it
  const note = noteFor(p.id, state.profile.plans[0]);
  const [angle, setAngle] = useState(0);
  const openLightbox = useLightbox();
  const track = useRef<HTMLDivElement>(null);
  // the hologram can show clothes and shoes on you; bags stay on the phone
  const canTryOn = p.category !== 'Bags';
  const liveHere = state.live?.productId === p.id ? state.live : null;

  // the photos move on by themselves (pauses while you touch them)
  useAutoplay(track, p.photos.length, 4500);

  // reset the photo carousel when the piece changes
  useEffect(() => {
    track.current?.scrollTo({ left: 0 });
    // and back to the top of the sheet, so a new piece opened from "Other options" starts at its photo
    let el = track.current?.parentElement;
    while (el && !/auto|scroll/.test(getComputedStyle(el).overflowY)) el = el.parentElement;
    el?.scrollTo({ top: 0, behavior: 'smooth' });
    setAngle(0);
  }, [p.id]);

  // other options, shown right here as thumbnails (no extra tap to see them):
  // the stylist's other stories first, then pieces of the same type, then what goes with it
  const others = [...STORIES, ...PRODUCTS.filter((x) => x.category === p.category).map((x) => x.id), ...GOES_WITH.map((g) => g.productId)]
    .filter((id, i, all) => id !== p.id && all.indexOf(id) === i)
    .slice(0, 6);

  return (
    <BottomSheet
      title={stylist.title}
      subtitle={
        <>
          <span className={s.live} aria-hidden="true" />
          With you now
        </>
      }
      leading={<StylistAvatar size={40} />}
      // the bag, next to the close button (Hyun): see what's in it without leaving the piece first
      actions={<BagButton round />}
      // no Back arrow on a sheet: sliding it down returns you to the chat if you came from there
      onClose={() => go({ type: 'sheet', sheet: back === 'chat' ? { kind: 'chat' } : null })}
      // the message field: suggested questions above it, example questions taking turns inside it
      footer={<Composer compact placeholder="Ask why, or for something else…" hints={PIECE_HINTS} pills={piecePills(p)} />}
    >
      {/* Stage: swipe through the product's real photos */}
      <div className={s.stage}>
        <div
          className={s.track}
          ref={track}
          style={{ viewTransitionName: 'piece' }}
          onScroll={(e) => setAngle(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          aria-label={`${p.brandName} ${p.name}, ${p.photos.length} photos`}
          role="group"
        >
          {p.photos.map((ph, i) => (
            // tap a photo to see it whole (lightbox)
            <div key={ph.src} className={s.angle} onClick={() => openLightbox(p.photos, i, `${p.brandName} ${p.name}`)}>
              <PhotoSlot
                cover // hero: model photos fill the frame; the lightbox shows them whole
                kind="garment"
                stage
                photo={ph}
                color={p.color}
                category={p.category}
                label={`${p.brandName} ${p.name}, ${p.colorName}, photo ${i + 1} of ${p.photos.length}`}
              />
            </div>
          ))}
        </div>
        <ExpandHint onClick={() => openLightbox(p.photos, angle, `${p.brandName} ${p.name}`)} />
        {liveHere && (
          // a small badge on the photo while the piece is showing on a store screen
          <span className={s.onScreen}>
            <span className={s.live} aria-hidden="true" />
            On the {DEVICES[liveHere.device].name}
          </span>
        )}
        <div className={s.angleDots} aria-hidden="true">
          {p.photos.map((ph, i) => (
            <span key={ph.src} className={i === angle ? s.on : undefined} />
          ))}
        </div>
      </div>

      <div className={s.content}>
        <StylistMessage>
          {note.lead}
          <b>{note.bold}</b>
          {note.tail}
        </StylistMessage>

        {/* the piece: brand, name + price on one line, what it's made of.
            Left-aligned, like the rest of the page (Hyun: more structure) */}
        <div className={s.piece}>
          <BrandLogo id={p.brand} title={p.brandName} className={s.logo} />
          <div className={s.nameRow}>
            <h3 className={s.title} key={p.id}>
              {p.name.split(' ').map((w, i) => (
                <span key={i} style={{ animationDelay: `${i * 80}ms` }}>
                  {w}
                </span>
              ))}
            </h3>
            <span className={`${s.price} num`}>{p.price}</span>
          </div>
          <p className={s.meta}>{[p.fabric, oneSize && 'One size'].filter(Boolean).join(' · ')}</p>
        </div>

        {/* the choices, together in one card: colour, then size */}
        <div className={s.options}>
          {/* Colour: one tidy row — "Colour  Taupe Green" on the left, the dots on the right */}
          <div className={`${s.option} ${s.colorRow}`}>
            <p className={s.optionLabel}>
              Colour <span>{p.colorName}</span>
            </p>
            <div className={s.dots} role="radiogroup" aria-label="Colour">
              {(p.colors ?? [{ name: p.colorName, color: p.color }]).map((c) => (
                <button
                  key={c.name}
                  role="radio"
                  aria-checked={c.name === p.colorName}
                  aria-label={c.name}
                  className={s.dot}
                  style={{ ['--dot' as string]: c.color }}
                  onClick={() => c.name !== p.colorName && dispatch({ type: 'toast', text: `${c.name} comes in a later build` })}
                />
              ))}
            </div>
          </div>
          {!oneSize && (
            <div className={s.option}>
              <SizeRail
                value={size}
                fit={fit}
                sizes={p.sizes}
                soldOut={p.soldOut}
                category={p.category} // shows "Size guide →" for this kind of piece
                onChange={(z) => dispatch({ type: 'size', productId: p.id, size: z })}
              />
            </div>
          )}
        </div>

        <div className={s.ctas}>
          {reserved ? (
            <Button icon="bag" onClick={() => go({ type: 'sheet', sheet: { kind: 'bag' } })}>
              View bag · <span className="num">{state.bag.length}</span>
            </Button>
          ) : (
            <Button onClick={() => dispatch({ type: 'reserve', productId: p.id, size })}>Add to bag</Button>
          )}
          {isPersonalisable(p) && (
            <Button variant="secondary" icon="needle" onClick={() => go({ type: 'sheet', sheet: { kind: 'atelier', productId: p.id, from: 'pick' } })}>
              Personalise
            </Button>
          )}
        </div>
        {reserved && (
          <p className={s.held} role="status">
            In your bag. We’ll hold it for you in store.
          </p>
        )}

        {/* Hand the piece to a store screen with one tap (pairs first if needed) */}
        {(canTryOn || isPersonalisable(p)) && (
          <div className={s.screens} role="group" aria-label="Use a store screen">
            {canTryOn && (
              <button className={s.screenBtn} onClick={() => go({ type: 'sheet', sheet: handoffSheet(state, 'hologram', p.id) })}>
                <span className={s.screenIcon}>
                  <IconFor device="hologram" />
                </span>
                <span className={s.screenText}>
                  <b>{DEVICES.hologram.action}</b>
                  <span>See it on you, life-size</span>
                </span>
              </button>
            )}
            {isPersonalisable(p) && (
              <button className={s.screenBtn} onClick={() => go({ type: 'sheet', sheet: handoffSheet(state, 'tabletop', p.id) })}>
                <span className={s.screenIcon}>
                  <IconFor device="tabletop" />
                </span>
                <span className={s.screenText}>
                  <b>{DEVICES.tabletop.action}</b>
                  <span>Design the embroidery on a big screen</span>
                </span>
              </button>
            )}
          </div>
        )}

        {/* About this piece: the product description and details */}
        {ABOUT[p.id] && (
          <section className={s.about} aria-labelledby="about-h">
            <h4 id="about-h">About this piece</h4>
            <p>{ABOUT[p.id].about}</p>
            <ul>
              {ABOUT[p.id].details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Product details (Hyun): closed under "About this piece"; tap + to slide open the
            material and tech: Type · Material · Technology · Fit · Care · Colour · Product ID · SKU,
            like a spec sheet. Closes again when you open another piece. */}
        {TECH[p.id] && (
          <Accordion key={p.id} title="Product details" className={s.details}>
            <SpecTable
              rows={[
                ['Type', TECH[p.id].type],
                ['Material', TECH[p.id].material],
                ['Technology', TECH[p.id].technology],
                ['Fit', TECH[p.id].fit],
                ['Care', TECH[p.id].care],
                ['Colour', p.colorName],
                ['Product ID', TECH[p.id].productId],
                ['SKU', TECH[p.id].sku],
              ]}
            />
          </Accordion>
        )}
      </div>

      {/* Other options for you: the same thumbnails as the Shop (tap = open it here, + Add = quick add) */}
      <section className={s.others} aria-labelledby="others-h">
        <div className={s.othersHead}>
          <h4 id="others-h">Other options for you</h4>
          <span className="num">{others.length}</span>
        </div>
        <div className={s.othersRail}>
          {others.map((id, i) => (
            <div key={id} className={s.othersItem}>
              <ProductCard p={byId(id)} index={i} />
            </div>
          ))}
        </div>
      </section>
    </BottomSheet>
  );
}

/** Icon for each store screen, with a small "paired" link mark once connected */
function IconFor({ device }: { device: 'tabletop' | 'hologram' }) {
  const { state } = useStore();
  return (
    <>
      <Icon name={device === 'tabletop' ? 'table' : 'hologram'} size={22} />
      {state.paired.includes(device) && <span className={s.pairedDot} aria-label="Connected" />}
    </>
  );
}

