'use client';
// Wardrobe.tsx — your Wardrobe tab (Hyun, build 0.7), in two parts:
//   • Saved: everything you've hearted — whole looks and single pieces.
//     Tap one to open it; "+ Add" puts it in your bag; tap the heart again to remove it.
//   • Owned: what you've bought, each with its Digital Product Passport.
// Tapping any heart in the app shows "Saved to your Wardrobe · View", so people
// learn where hearts go.
// iOS: a NavigationStack page with a segmented Picker (Saved | Owned) and LazyVGrids.
import { useState } from 'react';
import { BagButton, CuratedPicksButton, TopBar } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { ProductCard } from '@/components/ProductCard';
import { RevealWords } from '@/components/Reveal';
import { byId, lookById, thumbFor } from '@/data/catalog';
import { useStore } from '@/state/store';
import { LookCard } from './Look';
import s from './Wardrobe.module.css';

export function Wardrobe() {
  const { state, dispatch, openPick } = useStore();
  const [part, setPart] = useState<'saved' | 'owned'>('saved');
  // saved looks are stored as "look:<id>", saved pieces by their product id
  const looks = state.saved.filter((id) => id.startsWith('look:')).map((id) => lookById(id.slice(5)));
  const pieces = state.saved.filter((id) => !id.startsWith('look:')).map(byId);
  const owned = state.order?.items ?? [];

  return (
    <div className={s.screen}>
      <TopBar search="always">
        <BagButton />
        <CuratedPicksButton />
      </TopBar>
      <div className={s.scroll}>
        <header className={s.head}>
          <RevealWords as="h1" text="Wardrobe" />
          {/* Saved | Owned */}
          <div className={s.seg} role="tablist" aria-label="Wardrobe">
            {(
              [
                ['saved', 'Saved', looks.length + pieces.length],
                ['owned', 'Owned', owned.length],
              ] as const
            ).map(([id, label, n]) => (
              <button key={id} role="tab" aria-selected={part === id} onClick={() => setPart(id)}>
                {label} <span className="num">{n}</span>
              </button>
            ))}
          </div>
        </header>

        {part === 'saved' ? (
          looks.length + pieces.length === 0 ? (
            <Empty icon="heart" text="Tap ♥ on any piece or look, and it waits for you here." />
          ) : (
            <>
              {looks.length > 0 && (
                <section className={s.section}>
                  <h2 className={s.label}>Looks</h2>
                  <div className={s.grid}>
                    {looks.map((l) => (
                      <LookCard key={l.id} look={l} />
                    ))}
                  </div>
                </section>
              )}
              {pieces.length > 0 && (
                <section className={s.section}>
                  <h2 className={s.label}>Pieces</h2>
                  <div className={s.grid}>
                    {pieces.map((p, i) => (
                      <ProductCard key={p.id} p={p} index={i} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )
        ) : owned.length === 0 ? (
          <Empty icon="hanger" text="Pieces you buy appear here, each with its Digital Product Passport." />
        ) : (
          <ul className={s.owned}>
            {owned.map((b) => {
              const p = byId(b.productId);
              return (
                <li key={b.productId} className={s.ownedRow}>
                  <button className={s.ownedThumb} onClick={() => openPick(p.id)} aria-label={`${p.name}, ${p.brandName}`}>
                    <PhotoSlot kind="garment" photo={thumbFor(p)} color={p.color} category={p.category} label={`${p.brandName} ${p.name}`} />
                  </button>
                  <div className={s.ownedText}>
                    <b>{p.name}</b>
                    <span>
                      {p.brandName} · {b.size === 'One size' ? 'One size' : `Size ${b.size}`}
                      {b.personalisation && ' · Personalised'}
                    </span>
                    {/* the Digital Product Passport: where it was made, materials, care, repair */}
                    <button className={s.passport} onClick={() => dispatch({ type: 'toast', text: 'Digital Product Passport comes in a later build' })}>
                      <Icon name="doc" size={16} />
                      Digital Product Passport
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function Empty({ icon, text }: { icon: 'heart' | 'hanger'; text: string }) {
  return (
    <div className={s.empty}>
      <span className={s.emptyIcon}>
        <Icon name={icon} size={26} />
      </span>
      <p>{text}</p>
    </div>
  );
}
