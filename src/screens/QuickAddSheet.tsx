'use client';
// QuickAddSheet.tsx — "Quick add", the sheet that slides up from the bottom.
// ------------------------------------------------------------------
// Opens two ways:
//   • the + on a product thumbnail  → ONE piece: pick a size, "Add to bag"
//   • "Add the whole look"          → EVERY piece in the look, each with its
//                                     own size row, then one button adds them all
// Your fit size is already chosen (M for clothes, 42 for shoes), so most
// people just tap the button. Bags are "One size", so they have no size row.
// iOS: .sheet with .presentationDetents([.medium, .large]).
// ------------------------------------------------------------------
import { useState } from 'react';
import { PhotoSlot } from '@/components/PhotoSlot';
import { BottomSheet } from '@/components/Sheet';
import { Button, SizeRail } from '@/components/ui';
import { byId, fitFor, lookById, thumbFor, type Size } from '@/data/catalog';
import { sizeFor, useStore } from '@/state/store';
import s from './QuickAddSheet.module.css';

export function QuickAddSheet({ productIds, lookId }: { productIds: string[]; lookId?: string }) {
  const { state, dispatch, go } = useStore();
  const look = lookId ? lookById(lookId) : null;
  const many = productIds.length > 1;
  // the size chosen for each piece, starting from what the customer picked before (or their fit)
  const [sizes, setSizes] = useState<Record<string, Size>>(() => Object.fromEntries(productIds.map((id) => [id, sizeFor(state, id)])));
  const setSize = (id: string, z: Size) => {
    setSizes((m) => ({ ...m, [id]: z }));
    dispatch({ type: 'size', productId: id, size: z }); // remember it for the rest of the visit
  };
  const add = () => dispatch({ type: 'add', items: productIds.map((id) => ({ productId: id, size: sizes[id] })) });
  const first = byId(productIds[0]);

  return (
    <BottomSheet
      title={many ? 'Shop the complete look' : 'Quick add'}
      subtitle={many ? `${look?.title ?? 'This look'} · ${productIds.length} pieces` : `${first.brandName} · ${first.name}`}
      onClose={() => go({ type: 'sheet', sheet: null })}
      closeIcon="close"
      footer={
        <div className={s.foot}>
          <Button full onClick={add}>
            {/* plain wording: the size is chosen right above (Hyun) */}
            {many ? `Add ${productIds.length} items to bag` : 'Add to bag'}
          </Button>
          {!many && (
            <button className={s.details} onClick={() => go({ type: 'sheet', sheet: { kind: 'pick', productId: first.id } })}>
              See full details
            </button>
          )}
        </div>
      }
    >
      <ul className={`${s.list} ${many ? s.many : ''}`}>
        {productIds.map((id) => {
          const p = byId(id);
          const role = look?.items.find((i) => i.productId === id)?.role;
          const oneSize = p.sizes.length === 1;
          const inBag = state.bag.some((b) => b.productId === id);
          return (
            <li key={id} className={s.item}>
              <div className={s.row}>
                <span className={s.thumb}>
                  <PhotoSlot kind="garment" photo={thumbFor(p)} color={p.color} category={p.category} label={`${p.brandName} ${p.name}`} />
                </span>
                <span className={s.text}>
                  {role && <span className={s.role}>{role}</span>}
                  <span className={s.brand}>{p.brandName}</span>
                  <b className={s.name}>{p.name}</b>
                  <span className={s.meta}>
                    <i className={s.swatch} style={{ background: p.color }} aria-hidden="true" />
                    {p.colorName} · <span className="num">{p.price}</span>
                    {inBag && <span className={s.inBag}> · In your bag</span>}
                  </span>
                </span>
              </div>
              {oneSize ? (
                <p className={s.oneSize}>One size</p>
              ) : (
                <div className={s.sizeBlock}>
                  {/* the rail brings its own "Size · Your fit is M · Size guide →" header */}
                  <SizeRail value={sizes[id]} fit={fitFor(p)} sizes={p.sizes} soldOut={p.soldOut} category={p.category} onChange={(z) => setSize(id, z)} />
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </BottomSheet>
  );
}

