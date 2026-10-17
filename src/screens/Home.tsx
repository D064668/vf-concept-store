'use client';
// Home.tsx — 01 · Home, the arrival screen (D1, HANDOFF §6 · 01).
// Structure, top to bottom (adapted from the reference's home rhythm):
//   1. Arrival   : the store video, the stylist's welcome, ONE main button, "Talk to your stylist"
//   2. Statement : one sentence about today's visit that lights up as you scroll
//   3. Looks     : the stylist's three looks, full width, each opens the stylist sheet
//   4. Close     : a deep sage band that hands over to the Shop
import { useEffect, useRef, useState } from 'react';
import { Sparkle } from '@/components/brand';
import { BagButton, CuratedPicksButton, TopBar } from '@/components/Chrome';
import { Icon } from '@/components/Icon';
import { PhotoSlot } from '@/components/PhotoSlot';
import { Button } from '@/components/ui';
import { BRANDS, byId, CUSTOMER, HOME_LOOKS, isFormal, looksFor, planWords } from '@/data/catalog';
import { BrandLogo } from '@/components/BrandLogo';
import { useStore, useStylist } from '@/state/store';
import { PoweredBy } from '@/components/PoweredBy';
import { SplitReveal } from '@/components/SplitReveal';
import s from './Home.module.css';
import { Reveal, RevealWords } from '@/components/Reveal';

/** "Good morning / afternoon / evening" from the check-in time (e.g. "14:02") */
const greeting = (hhmm: string) => {
  const h = Number(hhmm.split(':')[0]);
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
};

const reducedNow = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Home() {
  const { state, go, dispatch } = useStore();
  const stylist = useStylist(); // "Your stylist", or the name you gave it
  // the statement follows your plan once you've told the stylist one (otherwise: what you love)
  const plan = state.profile.plans[0];
  const { planLook } = looksFor(state.profile.interests, plan);
  const statement = `Today is about one piece. Chosen ${planLook && plan ? (isFormal(plan) ? `for the trip to your ${planWords(plan)}` : `for your ${planWords(plan)}`) : 'for what you love'}, made yours at the Tajima cell, and waiting in the vault when you are.`;
  const scroller = useRef<HTMLDivElement>(null);
  const composer = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState(0);
  const [composerGone, setComposerGone] = useState(false);
  const [reduced, setReduced] = useState(false);
  const video = useRef<HTMLVideoElement>(null);

  // only play the video while Home is on screen (saves battery on other tabs)
  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (state.tab === 'home' && !state.stack.length && !reduced) v.play().catch(() => {});
    else v.pause();
  }, [state.tab, state.stack.length, reduced]);

  useEffect(() => {
    const el = scroller.current!;
    const onScroll = () => {
      // frost the top bar over the first 48px of scroll (iOS scroll-edge), so the logo
      // never sits on a busy part of the photo or on text passing underneath
      setBar(el.scrollTop / 48);
    };
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    onScroll();
    el.addEventListener('scroll', onScroll, { passive: true });
    // the logo in the top bar, tapped while already Home, scrolls back to the top
    const toTop = () => el.scrollTo({ top: 0, behavior: reducedNow() ? 'auto' : 'smooth' });
    window.addEventListener('sf:home-top', toTop);
    // the top search appears only once the composer has scrolled away
    const io = new IntersectionObserver(
      ([e]) => {
        setComposerGone(!e.isIntersecting);
        dispatch({ type: 'composer', onScreen: e.isIntersecting }); // the stylist button waits until it's gone
      },
      { root: el, threshold: 0 }
    );
    if (composer.current) io.observe(composer.current);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('sf:home-top', toTop);
      io.disconnect();
    };
  }, []);


  return (
    <div className={s.screen}>
      {/* the search slides down only once the composer has scrolled away: one place to ask, always */}
      <TopBar progress={bar} search="reveal" revealed={composerGone}>
        <BagButton />
        <CuratedPicksButton />
      </TopBar>

      <div className={s.scroll} ref={scroller}>
        {/* 1 · Arrival ------------------------------------------------ */}
        <section className={s.arrival} aria-labelledby="welcome">
          {/* full-screen background video (silent, loops). The first frame shows
              while it loads; with Reduce Motion on, only that still frame shows.
              iOS: AVPlayerLayer with isMuted = true and an AVPlayerLooper. */}
          <div className={s.photo} aria-hidden="true">
            <video
              ref={video}
              src="/video/home-bg.mp4"
              poster="/video/home-bg-poster.jpg"
              muted
              loop
              playsInline
              autoPlay={!reduced}
              preload="auto"
              disablePictureInPicture
            />
          </div>
          <div className={s.veil} aria-hidden="true" />

          <div className={s.hero}>
            <Sparkle className={`${s.gem} ${s.r0}`} />
            {/* greet by first name (HANDOFF §2 + §7); the S·Fashion logo already sits in the top bar */}
            <h1 id="welcome" className={s.r1}>
              <span className={s.welcome}>{greeting(CUSTOMER.checkInTime)},</span>
              <span className={s.name}>{CUSTOMER.firstName}.</span>
            </h1>
            <p className={`${s.line} ${s.r2}`}>I’m your personal stylist today.</p>
            <p className={`${s.checkin} ${s.r3}`}>
              <span className={s.tick}>
                <Icon name="check" size={14} strokeWidth={2.4} />
              </span>
              You’re checked in · <span className="num">{CUSTOMER.checkInTime}</span>
            </p>
          </div>

          <div className={`${s.footer} ${s.r4}`}>
            {/* ONE main button: talk to the stylist (Hyun). It opens the chat, where the
                conversation starts. "Show my curated pick" was removed: Curated picks is
                always top right. The top-bar search appears once this has scrolled away. */}
            <div ref={composer}>
              <Button full onClick={() => go({ type: 'sheet', sheet: { kind: 'chat' } })}>
                <span className={s.talk}>
                  <Sparkle className={s.talkMark} />
                  Talk to {stylist.inline}
                </span>
              </Button>
            </div>
          </div>
        </section>

        {/* 2 · Statement ---------------------------------------------- */}
        <section className={s.statement} aria-label="Today’s visit">
          {/* the sentence rises in line by line, each line from behind its own mask */}
          {/* highlight: the words light up grey → ink as you scroll (Hyun: back, but starting later) */}
          <SplitReveal key={statement} className={s.words} text={statement} highlight />
          <Reveal as="p" className={s.sign}>
            <Sparkle className={s.signMark} />
            {stylist.title}
          </Reveal>
        </section>

        {/* 3 · Looks -------------------------------------------------- */}
        <section className={s.looks} aria-labelledby="looks-h">
          <div className={s.looksHead}>
            <RevealWords key={stylist.possessive} id="looks-h" text={`${stylist.possessive} picks`} />
            <Reveal as="p" i={2}>Three looks for this visit</Reveal>
          </div>
          {HOME_LOOKS.map((l) => {
            const p = byId(l.productId);
            return (
              <button
                key={l.id}
                className={s.look}
                data-tone={l.tone}
                // every look opens its piece-by-piece breakdown (store screens live in My Visit)
                onClick={() => go({ type: 'push', screen: `look:${l.lookId}` })}
              >
                <span className={s.lookMedia} data-media>
                  <PhotoSlot kind="fabric" photo={{ src: `/photos/${l.photo}.webp`, focus: l.focus }} label={`${l.title}: ${p.brandName} ${p.name} worn by a model`} />
                </span>
                {/* the look's words rise in as it scrolls into view */}
                <span className={s.lookText}>
                  <RevealWords as="span" className={s.lookTitle} text={l.title} delay={150} />
                  <Reveal as="span" i={3} className={s.lookItems}>
                    {l.items}
                  </Reveal>
                  <Reveal as="span" i={4} className={s.explore}>
                    {l.cta} <Icon name="arrowRight" size={16} />
                  </Reveal>
                </span>
              </button>
            );
          })}
        </section>

        {/* 4 · Close -------------------------------------------------- */}
        <section className={s.close} aria-labelledby="close-h">
          <RevealWords id="close-h" text="In the store today" />
          <Reveal as="p" i={2}>Ten brands on the rails, every piece in your size.</Reveal>
          <ul className={s.brandWall} aria-label="Brands in the store">
            {BRANDS.map((b, n) => (
              // the logos cascade in, a quick 50ms apart (stagger-ui) so ten don't drag
              <Reveal as="li" key={b.id} style={{ transitionDelay: `${300 + n * 50}ms` }}>
                {/* tap a logo → that brand's page */}
                <button className={s.brandBtn} onClick={() => go({ type: 'push', screen: `brand:${b.id}` })} aria-label={`Show ${b.name}`}>
                  <BrandLogo id={b.id} title={b.name} />
                </button>
              </Reveal>
            ))}
          </ul>
          <Button variant="onDark" trailing="arrowRight" onClick={() => go({ type: 'tab', tab: 'shop' })}>
            Explore the store
          </Button>
          {/* "Powered by" on top, the SAP & VF Corporation lockup under it */}
          <PoweredBy size="lg" className={s.powered} />
        </section>
      </div>

    </div>
  );
}
