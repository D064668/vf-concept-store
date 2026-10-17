'use client';
// Look.tsx — a curated LOOK: the whole outfit, broken down piece by piece.
// ------------------------------------------------------------------
// Opened from a curated look on Home or in the Shop slider. Top to bottom:
//   1. the look's photo, full width (hero rule), below the back bar
//   2. the occasion (gold), its title, the brands in it, the stylist's comment
//   2b. "Add complete look to bag" (main) and "Try on with Hologram" (secondary), full width
//   3. "In this look": a thumbnail for every piece (jacket, top, shoes, bag…),
//      each with a + for Quick add, and a tap to see the piece in full
//   4. more looks to swipe through
// iOS: a NavigationStack destination; the grid is a LazyVGrid(2 columns).
// ------------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { BrandLogo } from '@/components/BrandLogo';
import { BagButton } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import { ExpandHint, useLightbox } from '@/components/Lightbox';
import { PhotoSlot } from '@/components/PhotoSlot';
import { ProductCard } from '@/components/ProductCard';
import { Reveal, RevealWords } from '@/components/Reveal';
import { Button, StylistMessage, Tag } from '@/components/ui';
import { byBrandOrder, byId, eur, lookById, lookHero, LOOKS, type Look } from '@/data/catalog';
import { DEVICES, handoffSheet, useStore } from '@/state/store';
import s from './Look.module.css';

export function LookScreen({ id }: { id: string }) {
  const { state, go } = useStore();
  const look = lookById(id);
  const scroller = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const pieces = look.items.map((i) => byId(i.productId));
  // each brand once, in the order the pieces appear
  const brands = Array.from(new Map(pieces.map((p) => [p.brand, p.brandName])).entries()).sort(([a], [b]) => byBrandOrder(a, b)); // client's brand order
  const inBag = pieces.filter((p) => state.bag.some((b) => b.productId === p.id)).length;
  // more looks: the same interest first (another hiking look after a hiking look), then the rest
  const others = LOOKS.filter((l) => l.id !== look.id).sort((a, b) => Number(b.interest === look.interest) - Number(a.interest === look.interest));
  const openLightbox = useLightbox();
  // the stylist's comment: personal when this look is for one of your interests
  const note = state.profile.interests.includes(look.interest) && look.personal ? look.personal : look.note;
  // the story's photo: another model photo from the look (not the hero, not a packshot)
  const storyPhoto = pieces.flatMap((p) => p.photos).find((ph) => !ph.packshot && ph.bg && ph.src !== lookHero(look).src);
  // the gallery: the look photo first, then every piece's photos
  const gallery = [lookHero(look), ...pieces.flatMap((p) => p.photos)].filter((ph, i, a) => a.findIndex((x) => x.src === ph.src) === i);

  useEffect(() => {
    const el = scroller.current!;
    el.scrollTo({ top: 0 }); // a new look always starts at the top
    const on = () => setScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  }, [id]);

  return (
    <div className={s.screen} key={id}>
      <header className={`${s.bar} ${scrolled ? s.barSolid : ''}`}>
        <button className={s.back} onClick={() => go({ type: 'pop' })} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <h1 className={s.barTitle}>Curated look</h1>
        {/* the bag is always one tap away (Hyun) */}
        <BagButton glass />
      </header>

      <div className={s.scroll} ref={scroller}>
        {/* 1 · the look, full width */}
        {/* tap the photo to see the whole look, then swipe through each piece */}
        <div className={s.hero} onClick={() => openLightbox(gallery, 0, look.title)}>
          <PhotoSlot cover kind="fabric" photo={lookHero(look)} label={`${look.title}: the full look, worn by a model`} />
          <ExpandHint onClick={() => openLightbox(gallery, 0, look.title)} />
          <div className={s.heroTag}>
            <Tag>{`Curated look · ${pieces.length} pieces`}</Tag>
          </div>
        </div>

        {/* 2 · title, occasion, brands, why */}
        <section className={s.intro}>
          <Reveal as="p" className={s.eyebrow}>
            {look.occasion}
          </Reveal>
          <RevealWords as="h2" className={s.title} text={look.title} delay={80} />
          <Reveal as="ul" i={1} className={s.brands} aria-label="Brands in this look">
            {brands.map(([b, name]) => (
              <li key={b}>
                <BrandLogo id={b} title={name} />
              </li>
            ))}
          </Reveal>
          {/* the stylist's comment on the look (Hyun: keep it under the hero).
              When the look is for one of YOUR interests, the stylist talks to you
              ("You love hiking, so this is the one for your next trail…") */}
          <div className={s.note}>
            <StylistMessage>
              {note.lead}
              <b>{note.bold}</b>
              {note.tail}
            </StylistMessage>
          </div>

          {/* the two actions, in the page (not stuck to the bottom): add first, try on second */}
          <div className={s.ctas}>
            <Button full icon="bag" onClick={() => go({ type: 'sheet', sheet: { kind: 'quickadd', productIds: look.items.map((i) => i.productId), lookId: look.id } })}>
              Add complete look · <span className="num">{eur(pieces.reduce((n, p) => n + p.amount, 0))}</span>
            </Button>
            <Button full variant="secondary" icon="hologram" onClick={() => go({ type: 'sheet', sheet: handoffSheet(state, 'hologram', look.heroProductId) })}>
              {DEVICES.hologram.action}
            </Button>
          </div>
        </section>

        {/* 3 · every piece, with Quick add */}
        <section className={s.section} aria-labelledby="pieces-h">
          <div className={s.head}>
            <RevealWords id="pieces-h" text="In this look" />
            <p className="num">{inBag ? `${inBag} of ${pieces.length} in your bag` : `${pieces.length} pieces`}</p>
          </div>
          <div className={s.grid}>
            {look.items.map((it, n) => (
              <ProductCard key={it.productId} p={byId(it.productId)} tag={it.role} index={n} />
            ))}
          </div>
        </section>

        {/* 3b · the story: a short editorial about the look, after you've seen the pieces
            (Hyun: below the thumbnails, so the top stays short and the buttons stay high) */}
        {look.story && (
          <section className={s.section} aria-labelledby="story-h">
            <div className={s.head}>
              <RevealWords id="story-h" text="How to wear it" />
            </div>
            {storyPhoto && (
              // one more photo of the look (tap = see it whole, in the lightbox)
              <Reveal className={s.storyPhoto} onClick={() => openLightbox([storyPhoto], 0, look.title)}>
                <PhotoSlot kind="fabric" photo={storyPhoto} label={`${look.title}, another view`} />
              </Reveal>
            )}
            <ol className={s.story}>
              {[
                ['Wear it', look.story.wear],
                ['Pack it', look.story.pack],
                ['Wear it again', look.story.again],
              ].map(([title, text], n) => (
                <Reveal as="li" key={title} i={n}>
                  <span className={`${s.storyNum} num`}>{String(n + 1).padStart(2, '0')}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* 4 · more looks */}
        <section className={s.section} aria-labelledby="more-h">
          <div className={s.head}>
            <RevealWords id="more-h" text="More looks" />
            <p className="num">{others.length} looks</p>
          </div>
          <div className={s.rail}>
            {others.map((l) => (
              <div key={l.id} className={s.railItem}>
                <LookCard look={l} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

/** A look as a card (2-column grids and rails): the full photo, a "+ Add" pill
 *  that opens "Shop the complete look", then the title and what's in it.
 *  Tapping the card opens the look's breakdown. `badge`: a small tag on the photo
 *  (Curated picks shows the interest the look is for: "Hiking"). */
export function LookCard({ look, badge }: { look: Look; badge?: string }) {
  const { state, dispatch, go } = useStore();
  const pieces = look.items.map((i) => byId(i.productId));
  // a look is saved with the same heart as a product (stored as "look:<id>")
  const saved = state.saved.includes(`look:${look.id}`);
  return (
    <article className={s.lookCard}>
      <button className={s.lookHit} onClick={() => go({ type: 'push', screen: `look:${look.id}` })} aria-label={`${look.title}, ${pieces.length} pieces`} />
      <div className={s.lookMedia}>
        <PhotoSlot kind="fabric" photo={lookHero(look)} label={`${look.title}, worn by a model`} />
        {badge && (
          <span className={s.lookBadge}>
            <Tag>{badge}</Tag>
          </span>
        )}
        <button
          className={`${s.lookHeart} ${saved ? s.lookHeartOn : ''}`}
          aria-pressed={saved}
          aria-label={`Save the look: ${look.title}`}
          onClick={() => dispatch({ type: 'save', productId: `look:${look.id}` })}
        >
          <span>
            <Icon name="heart" size={18} filled={saved} />
          </span>
        </button>
        <button
          className={s.addPill}
          onClick={() => go({ type: 'sheet', sheet: { kind: 'quickadd', productIds: look.items.map((i) => i.productId), lookId: look.id } })}
          aria-label={`Add the whole look: ${look.title}`}
        >
          <Icon name="plus" size={14} strokeWidth={2.4} />
          Add
        </button>
      </div>
      <div className={s.lookText}>
        <b>{look.title}</b>
        <span>{pieces.map((p) => p.name).join(' · ')}</span>
      </div>
    </article>
  );
}
