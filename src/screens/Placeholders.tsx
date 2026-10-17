'use client';
// Placeholders.tsx — tabs that come in later builds.
//   My Visit : your visit status + the store's screens (Hologram, Tabletop);
//              stitching + vault come next build (HANDOFF §6 · 03/04)
//   Wardrobe : not designed yet, "coming soon" (HANDOFF §9.1)
//   More     : overlay menu, a simple version for now (HANDOFF §6 · 05)
import { useLayoutEffect, useRef, useState } from 'react';
import { Sparkle } from '@/components/brand';
import { BagButton, CuratedPicksButton, TopBar } from '@/components/Chrome';
import { Icon, type IconName } from '@/components/Icon';
import { BottomSheet } from '@/components/Sheet';
import { CUSTOMER, INTERESTS, interestById, PLAN_IDEAS, PLAN_WHENS, STYLES, STYLIST_NAME_MAX, TODAY_PICK } from '@/data/catalog';
import { DEVICES, handoffSheet, useStore, useStylist } from '@/state/store';
import { RevealWords } from '@/components/Reveal';
import { HologramStage } from './Handoff';
import { PoweredBy } from '@/components/PoweredBy';
import s from './Placeholders.module.css';

export function Visit() {
  const { state, go } = useStore();
  const pickId = TODAY_PICK.productId;
  return (
    <div className={s.screen}>
      <TopBar search="always">
        <BagButton />
        <CuratedPicksButton />
      </TopBar>
      <div className={s.visitScroll}>
        <header className={s.visitHead}>
          <RevealWords as="h1" text="My visit" />
          <p>
            Checked in at <span className="num">{CUSTOMER.checkInTime}</span>
            {/* your next plan, if you've told your stylist one (More → Member → Your plans) */}
            {state.profile.plans[0] && ` · ${state.profile.plans[0].what} · ${state.profile.plans[0].when}`}
          </p>
        </header>

        {/* what's happening with your order (Tajima stitching + vault come next build) */}
        <section className={s.status}>
          <Sparkle className={s.statusMark} />
          <div>
            <b>
              {!state.order ? 'Nothing on the hoop yet' : state.order.stitching ? 'Your piece is on its way to the Tajima cell' : `Your pieces are ready in vault ${state.order.vault}`}
            </b>
            <p>
              {!state.order
                ? 'When you pay for a personalised piece, you can follow it here while it is made.'
                : state.order.stitching
                  ? 'The live stitching view arrives in the next build.'
                  : 'Show your code at the vault to collect them.'}
            </p>
            {state.order && (
              <button className={s.statusLink} onClick={() => go({ type: 'push', screen: 'order' })}>
                Show my order and vault code
              </button>
            )}
          </div>
        </section>

        {/* the store's screens: they belong to the visit, not to the curated looks */}
        <section className={s.screensSec} aria-labelledby="screens-h">
          <div className={s.secHead}>
            <RevealWords id="screens-h" text="In the store" />
            <p>{state.paired.length ? `${state.paired.length} connected` : 'Tap to connect'}</p>
          </div>

          <button className={s.service} onClick={() => go({ type: 'sheet', sheet: handoffSheet(state, 'hologram', pickId) })}>
            <span className={s.serviceMedia}>
              <HologramStage productId={pickId} compact />
            </span>
            <span className={s.serviceText}>
              <span className={s.serviceTitle}>
                {DEVICES.hologram.action}
                {state.paired.includes('hologram') && <i className={s.on}>Connected</i>}
              </span>
              <span>See your pick on you, life-size. No fitting room needed.</span>
            </span>
            <Icon name="chevron" size={18} />
          </button>

          <button className={s.service} onClick={() => go({ type: 'sheet', sheet: handoffSheet(state, 'tabletop', pickId) })}>
            <span className={`${s.serviceMedia} ${s.serviceTable}`}>
              <Icon name="table" size={30} />
            </span>
            <span className={s.serviceText}>
              <span className={s.serviceTitle}>
                {DEVICES.tabletop.action}
                {state.paired.includes('tabletop') && <i className={s.on}>Connected</i>}
              </span>
              <span>Design your embroidery on the big table, then bring it back here.</span>
            </span>
            <Icon name="chevron" size={18} />
          </button>
        </section>
      </div>
    </div>
  );
}

/** More (the drop-up menu). Structure from Hyun's RE/DONE menu:
 *    your name (→ Member page) · In the store · the usual links · Powered by (SAP & VF) · Sign out
 *  The Member page holds "What your stylist knows": fit, your style, interests,
 *  and a plan coming up. Your style and Interests open a page of chips to change them;
 *  your interests decide which curated looks come first (Curated picks).
 *  iOS: a .sheet with a NavigationStack inside (menu → Member → Your style / Interests). */
export function MoreSheet() {
  const { state, dispatch, go } = useStore();
  const [view, setView] = useState<View>('menu');
  const { styles, interests, stylistName, plans } = state.profile;
  // the plan being added (Your plans page)
  const [newWhat, setNewWhat] = useState('');
  const [newWhen, setNewWhen] = useState('');
  const addPlan = () => {
    if (!newWhat.trim() || !newWhen.trim()) return;
    dispatch({ type: 'profile', patch: { plans: [...plans, { what: newWhat.trim(), when: newWhen.trim() }] } });
    setNewWhat('');
    setNewWhen('');
  };
  const stylist = useStylist();
  // What your stylist knows (Member page)
  const KNOWS: Row[] = [
    // first: what you call your stylist (Hyun, build 0.7). Empty = "Your stylist".
    { icon: 'sparkle', title: 'Your stylist’s name', sub: stylistName.trim() || 'Not named yet · tap to give it a name', onOpen: () => open('name') },
    { icon: 'hanger', title: 'Fit profile', sub: `Size ${CUSTOMER.fitSize} · Shoes EU ${CUSTOMER.shoeSize}`, onOpen: () => dispatch({ type: 'toast', text: 'Changing your fit comes in a later build' }) },
    { icon: 'needle', title: 'Your style', sub: styles.join(' · ') || 'Not set yet', onOpen: () => open('style') },
    { icon: 'heart', title: 'Interests', sub: interests.map((i) => interestById(i).label).join(' · ') || 'Not set yet', onOpen: () => open('interests') },
    // one-time things coming up (a trip, an event): they end, unlike interests
    { icon: 'calendar', title: 'Your plans', sub: plans.map((pl) => `${pl.what} · ${pl.when}`).join(', ') || 'Nothing planned · tap to add a plan', onOpen: () => open('plans') },
  ];
  // which store screens this phone is connected to right now
  const paired = state.paired.map((d) => DEVICES[d].name);
  const STORE_ROWS: { icon: IconName; title: string; sub: string }[] = [
    { icon: 'store', title: 'Store pass', sub: 'Show at the entrance gate' },
    {
      icon: 'link',
      title: 'Connected screens',
      sub: paired.length ? `${paired.join(' · ')} · connected` : 'None yet · scan the code on a store screen',
    },
  ];
  const LINKS: { icon: IconName; title: string; sub: string }[] = [
    { icon: 'pin', title: 'Store location & hours', sub: '' },
    { icon: 'bag', title: 'Shop & returns', sub: '' },
    { icon: 'lock', title: 'Privacy policy', sub: '' },
    { icon: 'doc', title: 'Terms & agreements', sub: '' },
    { icon: 'people', title: 'Partners', sub: '' },
  ];

  // ONE sheet for both levels, so it never drops down and pops back up.
  // The menu's height is measured once and kept for the Member page, and the
  // content slides sideways (forward → in from the right, back → from the left).
  const box = useRef<HTMLDivElement>(null);
  const [h, setH] = useState<number>();
  useLayoutEffect(() => {
    if (view === 'menu' && box.current) setH(box.current.offsetHeight);
  }, [view]);
  const [dir, setDir] = useState<'fwd' | 'back'>('fwd');
  // deeper = slide in from the right; back = from the left
  const DEPTH: Record<View, number> = { menu: 0, member: 1, style: 2, interests: 2, name: 2, plans: 2 };
  const open = (v: View) => {
    setDir(DEPTH[v] > DEPTH[view] ? 'fwd' : 'back');
    setView(v);
  };
  const toggle = <T,>(list: T[], x: T) => (list.includes(x) ? list.filter((y) => y !== x) : [...list, x]);
  const TITLES: Record<View, string> = { menu: 'More', member: 'Member', style: 'Your style', interests: 'Interests', name: 'Your stylist’s name', plans: 'Your plans' };

  return (
    <BottomSheet
      title={TITLES[view]}
      onBack={view === 'menu' ? undefined : () => open(view === 'member' ? 'menu' : 'member')}
      onClose={() => go({ type: 'sheet', sheet: null })}
      closeIcon="close"
    >
      <div ref={box} className={s.levels} style={{ minHeight: h }}>
        {view === 'plans' ? (
          /* your plans: things coming up. Each can be removed; add a new one below. */
          <div key="plans" className={`${s.more} ${s.level} ${dir === 'fwd' ? s.inRight : s.inLeft}`}>
            <p className={s.editIntro}>Tell your stylist what’s coming up, like a trip or an event. Your picks get ready for it, and a plan disappears once it’s over.</p>
            {plans.length > 0 && (
              <ul className={s.plans}>
                {plans.map((pl, i) => (
                  <li key={`${pl.what}-${i}`} className={s.plan}>
                    <span className={s.rowIcon}>
                      <Icon name="calendar" size={18} />
                    </span>
                    <span className={s.rowText}>
                      <b>{pl.what}</b>
                      <span>{pl.when}</span>
                    </span>
                    <button
                      className={s.planRemove}
                      aria-label={`Remove ${pl.what}`}
                      onClick={() => dispatch({ type: 'profile', patch: { plans: plans.filter((_, n) => n !== i) } })}
                    >
                      <Icon name="close" size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {/* add a plan: type it, or tap an idea */}
            <div className={s.addPlan}>
              <h4>Add a plan</h4>
              <input className={s.planInput} value={newWhat} maxLength={40} placeholder="What’s happening? e.g. Ski trip" onChange={(e) => setNewWhat(e.target.value)} />
              <div className={s.chipsSmall}>
                {PLAN_IDEAS.map((idea) => (
                  <button key={idea} className={s.chip} aria-pressed={newWhat === idea} onClick={() => setNewWhat(idea)}>
                    {idea}
                  </button>
                ))}
              </div>
              <input className={s.planInput} value={newWhen} maxLength={30} placeholder="When? e.g. 14 March" onChange={(e) => setNewWhen(e.target.value)} />
              <div className={s.chipsSmall}>
                {PLAN_WHENS.map((w) => (
                  <button key={w} className={s.chip} aria-pressed={newWhen === w} onClick={() => setNewWhen(w)}>
                    {w}
                  </button>
                ))}
              </div>
              <button className={s.planAdd} disabled={!newWhat.trim() || !newWhen.trim()} onClick={addPlan}>
                <Icon name="plus" size={18} />
                Add plan
              </button>
            </div>
          </div>
        ) : view === 'name' ? (
          /* give your stylist a name: it replaces "Your stylist" everywhere in the app */
          <div key="name" className={`${s.more} ${s.level} ${dir === 'fwd' ? s.inRight : s.inLeft}`}>
            <p className={s.editIntro}>Call your stylist anything you like. Leave it empty to keep “Your stylist”.</p>
            <label className={s.nameField}>
              <span className="sr-only">Your stylist’s name</span>
              <input
                value={stylistName}
                maxLength={STYLIST_NAME_MAX}
                placeholder="Your stylist"
                autoComplete="off"
                enterKeyHint="done"
                data-autofocus
                onChange={(e) => dispatch({ type: 'profile', patch: { stylistName: e.target.value } })}
                onKeyDown={(e) => e.key === 'Enter' && open('member')}
              />
              <span className={`${s.nameCount} num`}>
                {stylistName.length}/{STYLIST_NAME_MAX}
              </span>
            </label>
            {/* a live preview of how the stylist will sign its messages */}
            <p className={s.namePreview}>
              <Sparkle className={s.namePreviewMark} />
              {stylist.title} · With you now
            </p>
            {stylistName.trim() && (
              <button className={s.seeLooks} onClick={() => dispatch({ type: 'profile', patch: { stylistName: '' } })}>
                Go back to “Your stylist”
              </button>
            )}
          </div>
        ) : view === 'style' || view === 'interests' ? (
          /* change your style words or your interests: tap a chip to turn it on or off */
          <div key={view} className={`${s.more} ${s.level} ${dir === 'fwd' ? s.inRight : s.inLeft}`}>
            <p className={s.editIntro}>
              {view === 'style'
                ? 'How do you like to dress? Pick any that sound like you.'
                : 'What do you love doing? Your curated looks follow these, in the order you pick them.'}
            </p>
            <div className={s.chips} role="group" aria-label={TITLES[view]}>
              {view === 'style'
                ? STYLES.map((st) => (
                    <button key={st} className={s.chip} aria-pressed={styles.includes(st)} onClick={() => dispatch({ type: 'profile', patch: { styles: toggle(styles, st) } })}>
                      {styles.includes(st) && <Icon name="check" size={16} />}
                      {st}
                    </button>
                  ))
                : INTERESTS.map((it) => {
                    const n = interests.indexOf(it.id);
                    return (
                      <button key={it.id} className={s.chip} aria-pressed={n >= 0} onClick={() => dispatch({ type: 'profile', patch: { interests: toggle(interests, it.id) } })}>
                        {/* the number shows the order: 1 comes first in your curated looks */}
                        {n >= 0 && <span className={`${s.chipNum} num`}>{n + 1}</span>}
                        {it.label}
                      </button>
                    );
                  })}
            </div>
            {view === 'interests' && (
              <button className={s.seeLooks} onClick={() => go({ type: 'push', screen: 'picks' })}>
                See your curated looks <Icon name="arrowRight" size={16} />
              </button>
            )}
          </div>
        ) : view === 'member' ? (
          <div key="member" className={`${s.more} ${s.level} ${dir === 'fwd' ? s.inRight : s.inLeft}`}>
            <div className={`${s.profile} ${s.profileBig}`}>
              <span className={s.avatar}>{CUSTOMER.initials}</span>
              <span className={s.rowText}>
                <b>{CUSTOMER.fullName}</b>
                <span>{CUSTOMER.email} · Member</span>
              </span>
            </div>
            <Group title={`What ${stylist.inline} knows`} rows={KNOWS} />
            <p className={s.knowsNote}>{stylist.title} uses these to choose your picks. Change them any time.</p>
          </div>
        ) : (
          <div key="menu" className={`${s.more} ${s.level} ${dir === 'back' ? s.inLeft : ''}`}>
            <button className={s.profile} onClick={() => open('member')}>
              <span className={s.avatar}>{CUSTOMER.initials}</span>
              <span className={s.rowText}>
                <b>{CUSTOMER.fullName}</b>
                <span>{CUSTOMER.email} · Member</span>
              </span>
              <Icon name="chevron" size={20} />
            </button>
            <Group title="In the store" rows={STORE_ROWS} />
            <Group rows={LINKS} />
            {/* Settings → Appearance: System (default), Light or Dark */}
            <section className={s.group} aria-labelledby="settings-h">
              <h3 id="settings-h">Settings</h3>
              <div className={`${s.list} ${s.setting}`}>
                <span className={s.rowIcon}>
                  <Icon name="contrast" size={18} />
                </span>
                <span className={s.rowText}>
                  <b>Appearance</b>
                </span>
                <div className={s.seg} role="radiogroup" aria-label="Appearance">
                  {(['system', 'light', 'dark'] as const).map((t) => (
                    <button key={t} role="radio" aria-checked={state.theme === t} onClick={() => dispatch({ type: 'theme', theme: t })}>
                      {t === 'system' ? 'System' : t === 'light' ? 'Light' : 'Dark'}
                    </button>
                  ))}
                </div>
              </div>
            </section>
            <div className={s.foot}>
              {/* "Powered by" on top, the SAP & VF Corporation lockup under it */}
              <PoweredBy size="md" />
              <button className={s.signout}>Sign out</button>
            </div>
          </div>
        )}
      </div>
    </BottomSheet>
  );
}

type View = 'menu' | 'member' | 'style' | 'interests' | 'name' | 'plans';
type Row = { icon: IconName | 'sparkle'; title: string; sub: string; onOpen?: () => void };

function Group({ title, rows }: { title?: string; rows: Row[] }) {
  return (
    <section className={s.group}>
      {title && <h3>{title}</h3>}
      <div className={s.list}>
        {rows.map((r) => (
          <button key={r.title} className={s.row} onClick={r.onOpen}>
            <span className={s.rowIcon}>
              {/* the stylist's own mark for its name row; icons for the rest */}
              {r.icon === 'sparkle' ? <Sparkle className={s.rowSpark} /> : <Icon name={r.icon} size={18} />}
            </span>
            <span className={s.rowText}>
              <b>{r.title}</b>
              {r.sub && <span>{r.sub}</span>}
            </span>
            <Icon name="chevron" size={18} />
          </button>
        ))}
      </div>
    </section>
  );
}
