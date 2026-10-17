'use client';
// Shop.tsx — 06 · Shop, the catalogue hub (HANDOFF §6 · 06).
//   • Curated slider (~420px): three stories from the stylist, swipe or tap the dots
//   • Sticky filter rail: chips filter the grid live, with a count in each chip
//   • Helper row: fit profile + sort
//   • 2-column grid: tap a card and the garment travels into the stylist sheet
import type React from 'react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { BagButton, CuratedPicksButton, TopBar } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { ProductCard } from '@/components/ProductCard';
import { Button, FilterChip, Tag } from '@/components/ui';
import { byBrandOrder, byId, CUSTOMER, FILTERS, interestById, lookHero, PRODUCTS, type Filter, looksFor, planTag } from '@/data/catalog';
import { filterCount, NO_FILTERS, useStore, withTransition } from '@/state/store';
import { RevealWords } from '@/components/Reveal';
import { applyFilters } from '@/data/filters';
import { useAutoplay } from './useAutoplay';
import s from './Shop.module.css';

// sort order for the grid. ("Colour" was dropped: A–Z by colour name meant nothing.
// To see one colour, use the Filters sheet → Colour.)
const SORTS = ['Recommended', 'New in', 'Price: low to high', 'Price: high to low'] as const;
type Sort = (typeof SORTS)[number];

export function Shop() {
  const { state, dispatch } = useStore();
  const [collapsed, setCollapsed] = useState(false);
  const scroller = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState<Filter>('All');
  const [sort, setSort] = useState<Sort>('Recommended');
  const [menu, setMenu] = useState(false);
  const [slide, setSlide] = useState(0);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = scroller.current!;
    let last = el.scrollTop;
    const on = () => {
      const now = el.scrollTop;
      setY(now);
      // the logo row tucks away while you scroll down the grid, and returns when you scroll up
      if (now < 140) setCollapsed(false);
      else if (now > last + 6) setCollapsed(true);
      else if (now < last - 6) setCollapsed(false);
      last = now;
    };
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  }, []);

  // global filters (from the filter sheet) first, then the category chip
  const base = useMemo(() => applyFilters(PRODUCTS, state.filters), [state.filters]);
  const active = filterCount(state.filters);
  const items = useMemo(() => {
    const list = base.filter((p) => filter === 'All' || p.category === filter);
    if (sort === 'New in') return [...list].sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (sort === 'Price: low to high') return [...list].sort((a, b) => a.amount - b.amount);
    if (sort === 'Price: high to low') return [...list].sort((a, b) => b.amount - a.amount);
    return [...list].sort((a, b) => Number(!!b.pick) - Number(!!a.pick)); // the stylist's pick first
  }, [filter, sort, base]);

  const count = (f: Filter) => (f === 'All' ? base.length : base.filter((p) => p.category === f).length);
  const change = (f: Filter) => withTransition(() => setFilter(f));
  const changeSort = (v: Sort) => {
    setMenu(false);
    withTransition(() => setSort(v));
  };

  // the slider now starts BELOW the top bar, so the bar always sits on the plain
  // page colour (dark text). It frosts over the first 48px of scroll.
  const barProgress = y / 48;

  return (
    <div className={s.screen} data-collapsed={collapsed ? '' : undefined}>
      <TopBar tone="ink" progress={barProgress} search="always" collapsed={collapsed}>
        <BagButton />
        <CuratedPicksButton />
      </TopBar>

      <div className={s.scroll} ref={scroller}>
        {/* key: when your interests change, the slider starts again on its first look */}
        <Carousel key={state.profile.interests.join()} active={slide} onActive={setSlide} collapse={Math.min(1, y / 220)} />

        {/* no looks row here: the Shop is for your own browsing, so it goes straight
            from the slider to the store (Hyun). Curated looks live in Curated picks. */}
        <section className={s.catalogue} aria-labelledby="cat-h">
          <div className={s.head}>
            <RevealWords id="cat-h" text="In the store today" />
            <p className="num" aria-live="polite">
              {items.length} {items.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <div className={s.rail}>
            <div className={s.chips} role="group" aria-label="Filter by category">
              {FILTERS.map((f) => (
                <FilterChip key={f} on={filter === f} count={count(f)} onClick={() => change(f)}>
                  {f}
                </FilterChip>
              ))}
            </div>
          </div>

          <div className={s.helper}>
            {active ? (
              <p className={s.fit}>
                <Icon name="sliders" size={16} />
                <span className="num">{active}</span> {active === 1 ? 'filter' : 'filters'} on ·
                <button className={s.clearLink} onClick={() => withTransition(() => dispatch({ type: 'filters', filters: NO_FILTERS }))}>
                  Clear
                </button>
              </p>
            ) : (
              <p className={s.fit}>
                <Icon name="check" size={16} strokeWidth={2.2} />
                Your sizes · {CUSTOMER.fitSize} and EU {CUSTOMER.shoeSize}
              </p>
            )}
            <div className={s.sortWrap}>
              <button className={s.sort} aria-haspopup="menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
                <span className="sr-only">Sort: </span>
                {sort}
                <Icon name="down" size={16} />
              </button>
              {menu && (
                <>
                  <div className={s.menuScrim} onClick={() => setMenu(false)} aria-hidden="true" />
                  <div className={s.menu} role="menu" aria-label="Sort by">
                    {SORTS.map((o) => (
                      <button key={o} role="menuitemradio" aria-checked={sort === o} className={s.menuItem} onClick={() => changeSort(o)}>
                        {o}
                        {sort === o && <Icon name="check" size={18} />}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {items.length ? (
            <div className={s.grid}>
              {items.map((p, i) => (
                <ProductCard key={p.id} p={p} index={i} reorder />
              ))}
            </div>
          ) : (
            <div className={s.empty}>
              <p>
                Nothing {filter !== 'All' ? `in ${filter} ` : ''}matches your filters right now.
              </p>
              <Button
                variant="secondary"
                onClick={() =>
                  withTransition(() => {
                    setFilter('All');
                    dispatch({ type: 'filters', filters: NO_FILTERS });
                  })
                }
              >
                Show everything
              </Button>
            </div>
          )}
        </section>
      </div>

    </div>
  );
}

/* ---------- Curated slider ---------- */
/** The Shop's hero slider: the curated looks for YOUR interests (Hyun, build 0.7),
 *  one per interest, each saying why ("Because you love hiking"). Same looks as the
 *  Curated picks slider; change your interests (More → your name) and it follows.
 *  Tap the photo or "Shop the look" → the look's page. */
function Carousel({
  active,
  onActive,
  collapse,
}: {
  active: number;
  onActive: (i: number) => void;
  /** 0 at rest → 1 once scrolled 220px: the slide's words fade up and away before they reach the top bar */
  collapse: number;
}) {
  const { state, go } = useStore();
  const { interests } = state.profile;
  const plan = state.profile.plans[0];
  // the same order as Curated picks: your plan's look first (if any), then your interests
  const { featured: slides, planLook } = looksFor(interests, plan);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = track.current!;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && onActive(Number((e.target as HTMLElement).dataset.i))),
      { root: el, threshold: 0.6 }
    );
    el.querySelectorAll('[data-i]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [onActive]);
  // the slider moves on by itself every 5s (pauses while you touch it)
  useAutoplay(track, slides.length);
  const goTo = (i: number) => {
    const el = track.current!;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <section
      className={s.carousel}
      aria-roledescription="carousel"
      aria-label="Curated for you"
      style={{ ['--c' as string]: collapse } as React.CSSProperties}
    >
      <div className={s.track} ref={track}>
        {slides.map((l, i) => {
          const pieces = l.items.map((it) => byId(it.productId));
          // each brand once, in the client's brand order
          const brands = Array.from(new Map(pieces.map((p) => [p.brand, p.brandName])).entries())
            .sort(([x], [y]) => byBrandOrder(x, y))
            .map(([, name]) => name);
          const forYou = interests.includes(l.interest);
          return (
            <article
              key={l.id}
              data-i={i}
              data-tone="dark"
              className={s.slide}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              {/* overview slider: tapping the photo opens the look, same as "Shop the look" */}
              <div className={s.slideMedia} data-media onClick={() => go({ type: 'push', screen: `look:${l.id}` })}>
                <PhotoSlot cover kind="fabric" photo={lookHero(l)} label={`${l.title}, worn by a model`} />
              </div>
              <div className={s.slideTag}>
                {/* why this look is here */}
                {l === planLook && plan ? <Tag kind="pick">{planTag(plan)}</Tag> : forYou ? <Tag kind="pick">{interestById(l.interest).because}</Tag> : <Tag>{`Curated look · ${i + 1} of ${slides.length}`}</Tag>}
              </div>
              <div className={s.slideText}>
                <h2 className={s.slideTitle}>{l.title}</h2>
                <p className={s.slideSub}>
                  {pieces.length} pieces · {brands.join(', ')}
                </p>
                {/* a curated look opens its piece-by-piece breakdown */}
                <button className={s.explore} onClick={() => go({ type: 'push', screen: `look:${l.id}` })}>
                  Shop the look <Icon name="arrowRight" size={16} />
                </button>
              </div>
            </article>
          );
        })}
      </div>
      <div className={s.dots} data-tone="dark">
        {slides.map((l, i) => (
          <button key={l.id} aria-label={`Show slide ${i + 1}`} aria-current={active === i ? 'true' : undefined} onClick={() => goTo(i)}>
            <span className={active === i ? s.dotOn : s.dot} />
          </button>
        ))}
      </div>
    </section>
  );
}
