'use client';
// Picks.tsx — Curated picks: an overview of every look your stylist put together.
// Opened from the "Curated picks" button. Built around YOUR INTERESTS (Hyun, build 0.7;
// set them in More → your name → Interests):
//   1. a full-width hero slider with three looks for what you love, each saying why:
//      "Because you love hiking", "Because you love running"… (moves on by itself,
//      swipe either way), each with "Shop the look"
//   2. below it, nothing repeats: for each interest a swipeable row of its OTHER
//      looks ("More for hiking", "More for running"…), then "Something different":
//      looks outside your interests, in two columns
//      (tap = the look's page, "+ Add" = shop the complete look)
// iOS: a NavigationStack destination; TabView(.page) on top, LazyVGrid(2) below.
import { useEffect, useRef, useState } from 'react';
import { Sparkle } from '@/components/brand';
import { BagButton } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { RevealWords } from '@/components/Reveal';
import { Tag } from '@/components/ui';
import { byBrandOrder, byId, CUSTOMER, interestById, listWords, lookHero, looksFor, planTag } from '@/data/catalog';
import { useStore } from '@/state/store';
import { LookCard } from './Look';
import { useAutoplay } from './useAutoplay';
import s from './Picks.module.css';

export function Picks() {
  const { state, go } = useStore();
  const { interests } = state.profile;
  const plan = state.profile.plans[0]; // your next plan, if you told the stylist one
  // featured = the slider (your plan's look first, then one look per interest);
  // more = each interest's other looks; rest = everything outside your interests. No look shows twice.
  const { featured: FEATURED, more, rest, planLook } = looksFor(interests, plan);
  const scroller = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [slide, setSlide] = useState(0);
  useAutoplay(track, FEATURED.length);

  useEffect(() => {
    const el = scroller.current!;
    const on = () => setScrolled(el.scrollTop > 8);
    el.addEventListener('scroll', on, { passive: true });
    return () => el.removeEventListener('scroll', on);
  }, []);

  const goTo = (i: number) => {
    const el = track.current!;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className={s.screen}>
      <header className={`${s.bar} ${scrolled ? s.barSolid : ''}`}>
        <button className={s.back} onClick={() => go({ type: 'pop' })} aria-label="Back">
          <Icon name="back" size={22} />
        </button>
        <h1 className={s.barTitle}>Curated picks</h1>
        {/* the bag is always one tap away (Hyun) */}
        <BagButton glass />
      </header>

      <div className={s.scroll} ref={scroller}>
        <div className={s.intro}>
          <Sparkle className={s.mark} />
          <p className={s.hello}>
            Chosen for you, <b>{CUSTOMER.firstName}</b>.
          </p>
          <p className={s.why}>
            {planLook && plan
              ? `${planTag(plan).replace('For', 'Ready for')}, plus looks for what you love.`
              : interests.length
                ? `Whole looks for what you love: ${listWords(interests.map((i) => interestById(i).label.toLowerCase()))}.`
                : 'Whole looks for the week ahead, ready to try on and take home.'}
          </p>
        </div>

        {/* 1 · featured looks: full-width hero slider */}
        <section className={s.hero} aria-roledescription="carousel" aria-label="Featured looks">
          <div
            className={s.track}
            ref={track}
            onScroll={(e) => setSlide(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
          >
            {FEATURED.map((l, i) => (
              <article key={l.id} className={s.slide} aria-roledescription="slide" aria-label={`${i + 1} of ${FEATURED.length}`}>
                {/* overview slider: tapping the photo opens the look, same as "Shop the look" */}
                <div className={s.slideMedia} onClick={() => go({ type: 'push', screen: `look:${l.id}` })}>
                  <PhotoSlot cover kind="fabric" photo={lookHero(l)} label={`${l.title}, worn by a model`} />
                </div>
                <div className={s.slideTag}>
                  {/* why this look is here: "For your wedding next week" or "Because you love hiking" */}
                  {l === planLook && plan ? (
                    <Tag kind="pick">{planTag(plan)}</Tag>
                  ) : interests.includes(l.interest) ? <Tag kind="pick">{interestById(l.interest).because}</Tag> : <Tag>{`Featured look · ${i + 1} of ${FEATURED.length}`}</Tag>}
                </div>
                <div className={s.slideText}>
                  <p className={s.slideEyebrow}>{l.occasion}</p>
                  <h2 className={s.slideTitle}>{l.title}</h2>
                  <p className={s.slideSub}>
                    {l.items.length} pieces · {Array.from(new Set(l.items.map((it) => byId(it.productId).brand)))
                      .sort(byBrandOrder)
                      .map((b) => byId(l.items.find((it) => byId(it.productId).brand === b)!.productId).brandName)
                      .join(', ')}
                  </p>
                  <button className={s.explore} onClick={() => go({ type: 'push', screen: `look:${l.id}` })}>
                    Shop the look <Icon name="arrowRight" size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className={s.dots}>
            {FEATURED.map((l, i) => (
              <button key={l.id} aria-label={`Show look ${i + 1}`} aria-current={slide === i ? 'true' : undefined} onClick={() => goTo(i)}>
                <span className={slide === i ? s.dotOn : s.dot} />
              </button>
            ))}
          </div>
        </section>

        {/* 2 · more for each interest: one swipeable row each */}
        {more.map((g) => {
          const it = interestById(g.interest);
          return (
            <section key={g.interest} className={s.section} aria-labelledby={`more-${g.interest}`}>
              <div className={s.head}>
                <RevealWords id={`more-${g.interest}`} text={`More for ${it.label.toLowerCase()}`} />
                <p className="num">{g.looks.length} looks</p>
              </div>
              <div className={s.rail}>
                {g.looks.map((l) => (
                  <div key={l.id} className={s.railItem}>
                    <LookCard look={l} />
                  </div>
                ))}
              </div>
            </section>
          );
        })}

        {/* 3 · something different: looks outside your interests */}
        {rest.length > 0 && (
          <section className={s.section} aria-labelledby="diff-h">
            <div className={s.head}>
              <RevealWords id="diff-h" text={more.length ? 'Something different' : 'More curated looks'} />
              <p className="num">{rest.length} looks</p>
            </div>
            <div className={s.grid}>
              {rest.map((l) => (
                // the small tag on the photo says what the look is for: Office days, Skate…
                <LookCard key={l.id} look={l} badge={interestById(l.interest).label} />
              ))}
            </div>
          </section>
        )}
      </div>

    </div>
  );
}
