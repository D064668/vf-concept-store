'use client';
// Brand.tsx — a brand's results page (Hyun, build 0.7). Opened by tapping a brand
// logo in the search panel (or on Home's brand wall). It reads like a search result:
//   • the brand logo and how many pieces are in store
//   • "Looks with Vans": the curated looks that include this brand (if any)
//   • "All Vans pieces": every piece from the brand, two columns
// No hero slider here — just what you asked for.
// iOS: a NavigationStack destination with a LazyVGrid.
import { useEffect, useRef, useState } from 'react';
import { BagButton } from '@/components/Chrome';
import { BrandLogo, type BrandId } from '@/components/BrandLogo';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { RevealWords } from '@/components/Reveal';
import { brandName, byId, LOOKS, PRODUCTS } from '@/data/catalog';
import { useStore } from '@/state/store';
import { LookCard } from './Look';
import s from './Look.module.css';
import b from './Brand.module.css';

export function BrandScreen({ id }: { id: BrandId }) {
  const { go } = useStore();
  const name = brandName(id);
  const pieces = PRODUCTS.filter((p) => p.brand === id);
  // looks that have at least one piece from this brand
  const looks = LOOKS.filter((l) => l.items.some((it) => byId(it.productId).brand === id));
  const scroller = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const el = scroller.current!;
    const on = () => setScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  }, []);

  return (
    <div className={s.screen}>
      <header className={`${s.bar} ${scrolled ? s.barSolid : ''}`}>
        <button className={s.back} onClick={() => go({ type: 'pop' })} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <h1 className={s.barTitle}>{name}</h1>
        <BagButton glass />
      </header>

      <div className={s.scroll} ref={scroller}>
        {/* the brand, big, with the count */}
        <div className={b.head}>
          <BrandLogo id={id} title={name} className={b.logo} />
          <p className="num">
            {pieces.length} {pieces.length === 1 ? 'piece' : 'pieces'} in store today
          </p>
        </div>

        {looks.length > 0 && (
          <section className={s.section} aria-labelledby="brand-looks-h">
            <div className={s.head}>
              <RevealWords id="brand-looks-h" text={`Looks with ${name}`} />
              <p className="num">{looks.length} looks</p>
            </div>
            <div className={s.rail}>
              {looks.map((l) => (
                <div key={l.id} className={s.railItem}>
                  <LookCard look={l} />
                </div>
              ))}
            </div>
          </section>
        )}

        <section className={s.section} aria-labelledby="brand-all-h">
          <div className={s.head}>
            <RevealWords id="brand-all-h" text={`All ${name} pieces`} />
            <p className="num">{pieces.length}</p>
          </div>
          <div className={s.grid}>
            {pieces.map((p, i) => (
              <ProductCard key={p.id} p={p} index={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
