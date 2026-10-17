'use client';
// ProductCard.tsx — one piece in the Shop grid (§5.12).
// Tapping the card opens the stylist sheet and the garment image travels
// into it. The heart saves the piece (44px tap area). The + at the bottom
// right of the photo ("+ Add") is Quick add: a sheet slides up to pick a size and add
// it to the bag without leaving the page (a ✓ shows once it's in the bag).
import { useRef } from 'react';
import { PhotoSlot } from './PhotoSlot';
import { Icon } from './Icon';
import { Tag } from './ui';
import type { Product } from '@/data/catalog';
import { useStore } from '@/state/store';
import s from './ProductCard.module.css';

export function ProductCard({
  p,
  index = 0,
  tag,
  reorder,
  onOpen,
}: {
  p: Product;
  index?: number;
  tag?: string;
  /** animate position when the grid is filtered */
  reorder?: boolean;
  /** what tapping the card does, when it isn't the usual "open the piece" (the chat adds a Back arrow) */
  onOpen?: () => void;
}) {
  const { state, dispatch, openPick, go } = useStore();
  const inBag = state.bag.some((b) => b.productId === p.id);
  const img = useRef<HTMLDivElement>(null);
  const saved = state.saved.includes(p.id);
  return (
    <article className={s.card} style={{ ['--i' as string]: Math.min(index, 6), viewTransitionName: reorder ? `card-${p.id}` : undefined }}>
      <button className={s.hit} onClick={() => (onOpen ? onOpen() : openPick(p.id, img.current))} aria-label={`${p.brandName} ${p.name}, ${p.colorName}`} />
      <div className={s.media} ref={img}>
        <PhotoSlot kind="garment" photo={p.photos[0]} color={p.color} category={p.category} label={`${p.brandName} ${p.name}, ${p.colorName}`} />
        <div className={s.badge}>
          {tag ? <Tag>{tag}</Tag> : p.pick ? <Tag kind="pick">Your pick</Tag> : p.isNew ? <Tag>New</Tag> : null}
        </div>
        {/* a tiny category pill, bottom left of the photo — skipped when the card already
            has a role tag top left (a look's "Top", "Shoes"…), so it never says it twice */}
        {!tag && <span className={s.cat}>{p.category}</span>}
        <button
          className={`${s.plus} ${inBag ? s.plusDone : ''}`}
          aria-label={inBag ? `${p.brandName} ${p.name} is in your bag. Change size` : `Quick add ${p.brandName} ${p.name}`}
          onClick={() => go({ type: 'sheet', sheet: { kind: 'quickadd', productIds: [p.id] } })}
        >
          <span className={s.plusPill}>
            <Icon name={inBag ? 'check' : 'plus'} size={14} strokeWidth={2.4} />
            {inBag ? 'In bag' : 'Add'}
          </span>
        </button>
      </div>
      <button
        className={`${s.heart} ${saved ? s.on : ''}`}
        aria-pressed={saved}
        aria-label={`Save ${p.brandName} ${p.name}`}
        onClick={() => dispatch({ type: 'save', productId: p.id })}
      >
        <span className={s.heartDisc}>
          <Icon name="heart" size={18} filled={saved} />
        </span>
      </button>
      {/* the text, top to bottom: product name, brand, price (no colour — Hyun, build 0.7) */}
      <div className={s.text}>
        <h3 className={s.name}>{p.name}</h3>
        <p className={s.brand}>{p.brandName}</p>
        <p className={`${s.price} num`}>
          <span className="sr-only">Price: </span>
          {p.price}
        </p>
      </div>
    </article>
  );
}
