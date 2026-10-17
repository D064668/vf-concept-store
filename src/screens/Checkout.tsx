'use client';
// Checkout.tsx — the bag, the checkout and the order: three pages in a row
// (structure from Hyun's RE/DONE flow, in the S·Fashion design).
// ------------------------------------------------------------------
//   1. BAG       "Your bag (2)": each piece with size, embroidery, quantity and
//                Remove; the subtotal; "Proceed to checkout" / "Continue
//                shopping"; then "Recommended for you".
//   2. CHECKOUT  "Your order (2)": the pieces in a compact card (Edit goes back),
//                a promo code, subtotal → total, then how to pay (Apple Pay).
//   3. ORDER     "You're all set": a card with the status, the vault code (QR)
//                to collect your pieces, the order number and the details.
// The store is unmanned, so there's no cashier: you pay with Apple Pay and
// collect from your vault compartment. Prices are sample numbers until they come
// from SAP; payment is simulated, and the order page says so.
// iOS: three NavigationStack destinations; Apple Pay = PKPaymentButton.
// ------------------------------------------------------------------
import { useState, type ReactNode } from 'react';
import { Sparkle } from '@/components/brand';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { ProductCard } from '@/components/ProductCard';
import { RevealWords } from '@/components/Reveal';
import { Button } from '@/components/ui';
import { byId, CUSTOMER, EARLIER_PICKS, GOES_WITH, PRODUCTS, isPersonalisable, MOTIFS, PLACEMENTS, eur, PERSONALISATION_PRICE, THREADS, thumbFor } from '@/data/catalog';

/** what the pieces cost, what the embroidery costs, and the two together (sample prices) */
function sums(items: BagItem[]) {
  const pieces = items.reduce((t, b) => t + byId(b.productId).amount * (b.qty ?? 1), 0);
  const stitching = items.filter((b) => b.personalisation).reduce((t, b) => t + PERSONALISATION_PRICE * (b.qty ?? 1), 0);
  return { pieces, stitching, total: pieces + stitching };
}
import { bagCount, useStore, type BagItem } from '@/state/store';
import { QrCode } from './Handoff';
import s from './Checkout.module.css';

/** the back bar shared by the three pages */
function Page({ title, children, onBack }: { title: string; children: ReactNode; onBack?: () => void }) {
  const { go } = useStore();
  const [scrolled, setScrolled] = useState(false);
  return (
    <div className={s.screen}>
      <header className={`${s.bar} ${scrolled ? s.barSolid : ''}`}>
        <button className={s.back} onClick={onBack ?? (() => go({ type: 'pop' }))} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <span className={s.barTitle}>{title}</span>
      </header>
      <div className={s.scroll} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)}>
        {children}
      </div>
    </div>
  );
}

/** "Monogram H·L · Left chest · Champagne gold" */
function embroideryLine(b: BagItem) {
  const pz = b.personalisation;
  if (!pz) return null;
  const thread = THREADS.find((t) => t.id === pz.thread)!;
  const place = PLACEMENTS.find((x) => x.id === pz.placement)!;
  const motif = MOTIFS.find((m) => m.id === pz.motif)!;
  return `${pz.motif === 'sprig' ? motif.name : `${motif.name} ${pz.text}`} · ${place.name} · ${thread.name}`;
}
const sizeLabel = (b: BagItem) => (b.size === 'One size' ? 'One size' : `Size ${b.size}`);

/* =================================================================
   1 · BAG
   ================================================================= */
export function BagScreen() {
  const { state, dispatch, go } = useStore();
  const n = bagCount(state.bag);
  // pieces the stylist would add next, that aren't in the bag yet
  // Recommended for you: NEW pieces always come first (left), then what goes with
  // your bag, then earlier picks — never something already in the bag (Hyun)
  const recs = [...PRODUCTS.filter((p) => p.isNew).map((p) => p.id), ...[...GOES_WITH, ...EARLIER_PICKS].map((g) => g.productId)].filter(
    (id, i, a) => a.indexOf(id) === i && !state.bag.some((b) => b.productId === id)
  );

  return (
    <Page title="Your bag">
      <div className={s.pad}>
        <h1 className={s.h1}>
          Your bag <span className="num">({n})</span>
        </h1>

        {n === 0 ? (
          <div className={s.empty}>
            <Icon name="bag" size={28} />
            <p>Your bag is empty. Add a piece or a whole look, and it waits here while you look around.</p>
            <Button variant="secondary" onClick={() => go({ type: 'tab', tab: 'shop' })}>
              Go to the Shop
            </Button>
          </div>
        ) : (
          <>
            <ul className={s.items}>
              {state.bag.map((b) => {
                const p = byId(b.productId);
                const qty = b.qty ?? 1;
                const emb = embroideryLine(b);
                return (
                  <li key={b.productId} className={s.item}>
                    <button className={s.thumb} onClick={() => go({ type: 'sheet', sheet: { kind: 'pick', productId: p.id } })} aria-label={`See ${p.name}`}>
                      <PhotoSlot kind="garment" photo={thumbFor(p)} color={p.color} category={p.category} label={`${p.brandName} ${p.name}`} />
                    </button>
                    <div className={s.info}>
                      <span className={s.brand}>{p.brandName}</span>
                      <b className={s.name}>{p.name}</b>
                      <span className={s.meta}>
                        <i className={s.swatch} style={{ background: p.color }} aria-hidden="true" />
                        {p.colorName} · {sizeLabel(b)}
                      </span>
                      {emb && (
                        <span className={s.emb}>
                          <Icon name="needle" size={15} />
                          {emb}
                        </span>
                      )}
                      <div className={s.itemFoot}>
                        <span className={`${s.price} num`}>{p.price}</span>
                        {/* quantity: − 1 + */}
                        <div className={s.stepper} role="group" aria-label={`Quantity of ${p.name}`}>
                          <button onClick={() => dispatch({ type: 'qty', productId: p.id, qty: qty - 1 })} disabled={qty <= 1} aria-label="One fewer">
                            −
                          </button>
                          <span className="num" aria-live="polite">
                            {qty}
                          </span>
                          <button onClick={() => dispatch({ type: 'qty', productId: p.id, qty: qty + 1 })} disabled={qty >= 5} aria-label="One more">
                            +
                          </button>
                        </div>
                      </div>
                      <div className={s.itemLinks}>
                        {isPersonalisable(p) && (
                          <button className={s.gold} onClick={() => go({ type: 'sheet', sheet: { kind: 'atelier', productId: p.id } })}>
                            {b.personalisation ? 'Edit personalisation' : 'Personalise'}
                          </button>
                        )}
                        <button className={s.remove} onClick={() => dispatch({ type: 'remove', productId: p.id })}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className={s.subtotal}>
              <span>Subtotal</span>
              <span className="num">{eur(sums(state.bag).total)}</span>
            </div>
            <p className={s.note}>VAT included. You see the full total before you pay.</p>

            <div className={s.actions}>
              <Button full trailing="arrowRight" onClick={() => go({ type: 'push', screen: 'checkout' })}>
                Proceed to checkout
              </Button>
              <Button full variant="secondary" onClick={() => go({ type: 'tab', tab: 'shop' })}>
                Continue shopping
              </Button>
            </div>
          </>
        )}
      </div>

      {recs.length > 0 && (
        <section className={s.recs} aria-labelledby="recs-h">
          <RevealWords id="recs-h" text="Recommended for you" className={s.h2} />
          <div className={s.rail}>
            {recs.map((id, i) => (
              <div key={id} className={s.railItem}>
                <ProductCard p={byId(id)} index={i} />
              </div>
            ))}
          </div>
        </section>
      )}
    </Page>
  );
}

/* =================================================================
   2 · CHECKOUT
   ================================================================= */
export function CheckoutScreen() {
  const { state, dispatch, go } = useStore();
  const n = bagCount(state.bag);
  const [code, setCode] = useState('');
  const [codeNote, setCodeNote] = useState('');
  const anyEmbroidery = state.bag.some((b) => b.personalisation);

  return (
    <Page title="Checkout">
      <div className={s.pad}>
        <p className={s.eyebrow}>S·Fashion · Checkout</p>
        <h1 className={s.h1}>
          Your order <span className="num">({n})</span>
        </h1>

        <section className={s.card} aria-labelledby="inbag-h">
          <div className={s.cardHead}>
            <h2 id="inbag-h">In your bag</h2>
            <button className={s.gold} onClick={() => go({ type: 'pop' })}>
              Edit
            </button>
          </div>
          <ul className={s.mini}>
            {state.bag.map((b) => {
              const p = byId(b.productId);
              return (
                <li key={b.productId}>
                  <span className={s.miniThumb}>
                    <PhotoSlot kind="garment" photo={thumbFor(p)} color={p.color} category={p.category} label={`${p.brandName} ${p.name}`} />
                  </span>
                  <span className={s.miniText}>
                    <b>{p.name}</b>
                    <span>
                      {p.colorName} · {sizeLabel(b)} · Qty <span className="num">{b.qty ?? 1}</span>
                    </span>
                    {b.personalisation && <span className={s.miniEmb}>+ {embroideryLine(b)}</span>}
                  </span>
                  <span className={`${s.miniPrice} num`}>{p.price}</span>
                </li>
              );
            })}
          </ul>

          {/* promo code: an underlined field and Apply */}
          <form
            className={s.promo}
            onSubmit={(e) => {
              e.preventDefault();
              if (code.trim()) setCodeNote(`“${code.trim().toUpperCase()}” is saved. It’s checked when prices load from the store system.`);
            }}
          >
            <label htmlFor="promo" className="sr-only">
              Promo code
            </label>
            <input id="promo" value={code} onChange={(e) => (setCode(e.target.value), setCodeNote(''))} placeholder="Promo code" autoComplete="off" />
            <button type="submit" disabled={!code.trim()}>
              Apply
            </button>
          </form>
          {codeNote && (
            <p className={s.promoNote} role="status">
              {codeNote}
            </p>
          )}

          <dl className={s.sums}>
            <div>
              <dt>Subtotal</dt>
              <dd className="num">{eur(sums(state.bag).pieces)}</dd>
            </div>
            {anyEmbroidery && (
              <div>
                <dt>Personalisation</dt>
                <dd className="num">{eur(sums(state.bag).stitching)}</dd>
              </div>
            )}
            <div>
              <dt>VAT</dt>
              <dd>Included</dd>
            </div>
            <div className={s.total}>
              <dt>Total</dt>
              <dd className="num">{eur(sums(state.bag).total)}</dd>
            </div>
          </dl>
        </section>

        <section className={s.paySec} aria-labelledby="pay-h">
          <h2 id="pay-h" className={s.h2}>
            How to pay
          </h2>
          <div className={s.payRow}>
            <span className={s.payIcon}>
              <Icon name="phone" size={20} />
            </span>
            <span className={s.payText}>
              <b>Pay on this phone</b>
              <span>Then collect from your vault compartment. No queue, no counter.</span>
            </span>
          </div>
          {/* iOS: PKPaymentButton (type .buy, style .automatic): Apple draws this button */}
          <button className={s.applePay} onClick={() => dispatch({ type: 'pay' })} disabled={!n}>
            Pay with Apple Pay
          </button>
          <p className={s.note}>{anyEmbroidery ? 'Personalised pieces go to the Tajima cell first; the rest wait in the vault.' : 'Your pieces wait for you in the vault.'}</p>
        </section>
      </div>
    </Page>
  );
}

/* =================================================================
   3 · ORDER
   ================================================================= */
export function OrderScreen() {
  const { state, go } = useStore();
  const o = state.order;
  if (!o) return <BagScreen />;
  const n = bagCount(o.items);
  return (
    <Page title="Order" onBack={() => go({ type: 'tab', tab: state.tab })}>
      <div className={s.pad}>
        <section className={s.ticket} aria-labelledby="order-h">
          <span className={s.status}>
            <span className={s.statusDot} aria-hidden="true" />
            {o.stitching ? 'Being stitched · Tajima cell' : `Ready in vault ${o.vault}`}
          </span>
          <Sparkle className={s.ticketMark} />
          <h1 id="order-h" className={s.ticketTitle}>
            You’re all set
          </h1>
          <p className={s.ticketSub}>
            {o.stitching
              ? `Paid with Apple Pay. When your embroidery is done, this code opens vault ${o.vault}.`
              : `Paid with Apple Pay. Show this code at vault ${o.vault} to collect your pieces.`}
          </p>
          <div className={s.qr}>
            <QrCode seed={o.id.replace(/\D/g, '')} />
          </div>
          <p className={`${s.orderNo} num`}>Order {o.id}</p>
          <dl className={s.rows}>
            <div>
              <dt>Pieces</dt>
              <dd className="num">
                {n} {n === 1 ? 'piece' : 'pieces'} · {eur(sums(o.items).total)}
              </dd>
            </div>
            <div>
              <dt>Customer</dt>
              <dd>{CUSTOMER.fullName}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>Apple Pay</dd>
            </div>
            <div>
              <dt>Collect from</dt>
              <dd className="num">Vault {o.vault}</dd>
            </div>
          </dl>
        </section>
        <div className={s.actions}>
          <Button full trailing="arrowRight" onClick={() => go({ type: 'tab', tab: 'visit' })}>
            {o.stitching ? 'Follow the stitching in My Visit' : 'Go to My Visit'}
          </Button>
        </div>
        <p className={s.proto}>Prototype · no payment was taken</p>
      </div>
    </Page>
  );
}
