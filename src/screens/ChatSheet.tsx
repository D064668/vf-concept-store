'use client';
// ChatSheet.tsx — the stylist chat (Hyun, build 0.7: "it should feel like a chat").
// ------------------------------------------------------------------
// Opened by the stylist button (bottom right), or by asking anything anywhere
// (the search, the Home field, a piece's page). One conversation for the whole app.
// Structure from Hyun's RE/DONE reference, in the S·Fashion design:
//   • start: the stylist's question "Anything coming up I should dress you for?" with answer
//     buttons (after check-in: "You're checked in. …"; after you clear the chat: "Hi Hyun. …")
//   • chatting: your messages on the right (sage), the stylist's on the left
//     (the same bubble as everywhere else), and the pieces it suggests as a
//     row of cards you can swipe (tap = the piece's page, "+ Add" = quick add)
//   • bottom: follow-up questions in one swipeable row, then the message field,
//     then "Powered by" with the SAP & VF Corporation lockup
//   • top right: clear the conversation (asks first: "Yes, clear" / "Cancel")
// iOS: a .sheet (large detent) with a ScrollView of messages + a bottom inset composer.
// ------------------------------------------------------------------
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/Icon';
import { ProductCard } from '@/components/ProductCard';
import { PoweredBy } from '@/components/PoweredBy';
import { BottomSheet } from '@/components/Sheet';
import { Composer, StylistAvatar, StylistMessage } from '@/components/ui';
import { PhotoSlot } from '@/components/PhotoSlot';
import { byId, lookById, lookForPlan, lookHero, PLAN_IDEAS, planTag, type Look, type Plan } from '@/data/catalog';
import { CHAT_HINTS, CHAT_STARTERS } from '@/data/stylist';
import { arrivalQuestion, DEVICES, handoffSheet, SHOW_PICKS, useStore, useStylist, type ChatLine } from '@/state/store';
import s from './ChatSheet.module.css';

export function ChatSheet() {
  const { state, dispatch, go } = useStore();
  const { thread, thinking } = state.search;
  const stylist = useStylist(); // its name, if you gave it one (Member page)
  const [confirmClear, setConfirmClear] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  // new message → scroll down to it
  // (scrolls only the sheet itself — and the effect returns nothing: some hosts, like the
  //  claude.ai preview, wrap scrollIntoView and return a value, which React then tried to call)
  useEffect(() => {
    let box = end.current?.parentElement ?? null;
    while (box && !/auto|scroll/.test(getComputedStyle(box).overflowY)) box = box.parentElement;
    box?.scrollTo({ top: box.scrollHeight, behavior: 'smooth' });
  }, [thread.length, thinking]);

  // two follow-ups are actions, not questions:
  //   "Try on with Hologram" sends the piece to the Hologram; "Show my curated picks" opens them
  const ask = (q: string) =>
    q === DEVICES.hologram.action
      ? go({ type: 'sheet', sheet: handoffSheet(state, 'hologram', lastPiece(thread) ?? 'tnf-mountain') })
      : q === SHOW_PICKS
        ? go({ type: 'push', screen: 'picks' })
        : dispatch({ type: 'ask', text: q });

  // the follow-up questions under the stylist's last answer sit right above the field
  const lastReply = [...thread].reverse().find((l) => l.role === 'stylist');
  // the suggestion pills above the message field: the stylist's follow-ups after it answers,
  // otherwise (a fresh chat) the starter questions. Hidden while the stylist is typing.
  const followUps = thinking ? undefined : (lastReply?.followUps ?? CHAT_STARTERS);

  return (
    <BottomSheet
      tall
      title={stylist.title}
      subtitle={
        <>
          <span className={s.live} aria-hidden="true" />
          At your service
        </>
      }
      leading={<StylistAvatar size={40} />}
      actions={
        // clear the chat: only once there's something to clear
        thread.length > 0 && (
          <button className={s.round} onClick={() => setConfirmClear(true)} aria-label="Clear the conversation">
            <Icon name="refresh" size={20} />
          </button>
        )
      }
      onClose={() => go({ type: 'sheet', sheet: null })}
      footer={
        <>
          <Composer compact placeholder="Tell me what you’re after…" hints={CHAT_HINTS} pills={followUps} onAsk={ask} />
          <PoweredBy size="sm" row className={s.powered} />
        </>
      }
    >
      {/* clear the conversation? asks first, like RE/DONE */}
      {confirmClear && (
        <div className={s.confirm} role="alertdialog" aria-label="Clear the conversation?">
          <span>Clear the conversation?</span>
          <button
            className={s.yes}
            onClick={() => {
              dispatch({ type: 'clearChat' }); // starts again with the stylist's greeting question
              setConfirmClear(false);
            }}
          >
            Yes, clear
          </button>
          <button className={s.cancel} onClick={() => setConfirmClear(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* ---- the conversation: it always starts with the stylist's question ---- */}
      <div className={s.thread} aria-live="polite">
        <Arrival />
        {thread.map((l) => (
          <Message key={l.id} line={l} />
        ))}
        {thinking && (
          <div className={s.thinking} aria-label={`${stylist.title} is typing`}>
            <StylistAvatar />
            <span className={s.dots}>
              <i />
              <i />
              <i />
            </span>
          </div>
        )}
        <div ref={end} />
      </div>
    </BottomSheet>
  );
}

/** One message: yours (right, sage) or the stylist's (left, with the pieces it suggests) */
function Message({ line }: { line: ChatLine }) {
  const { go } = useStore();
  if (line.role === 'user') return <p className={s.user}>{line.text}</p>;
  return <StylistLine line={line} go={go} />;
}

function StylistLine({ line, go }: { line: ChatLine; go: ReturnType<typeof useStore>['go'] }) {
  const [before, after] = line.bold ? line.text.split(line.bold) : [line.text, ''];
  return (
    <div className={s.reply}>
      <StylistMessage>
        {before}
        {line.bold && <b>{line.bold}</b>}
        {after}
      </StylistMessage>
      {/* the look it put together: one tap opens the whole look */}
      {line.lookId && <LookLink look={lookById(line.lookId)} label={line.lookLabel} />}
      {!!line.productIds?.length && (
        // the pieces, as the same cards as the Shop; tapping one opens its page,
        // with a Back arrow that returns here
        <div className={s.cards}>
          {line.productIds.map((id, i) => (
            <div key={id} className={s.card}>
              <ProductCard p={byId(id)} index={i} onOpen={() => go({ type: 'sheet', sheet: { kind: 'pick', productId: id, back: 'chat' } })} />
            </div>
          ))}
        </div>
      )}
      {/* heard a plan in your question? offer to remember it */}
      {line.plan && <RememberPlan plan={line.plan} />}
    </div>
  );
}

/** "Want me to remember that?" — for a plan heard in your question ("…a wedding next week").
 *  Skipped if Your plans already has something on that day. */
function RememberPlan({ plan }: { plan: Plan }) {
  const { state, dispatch } = useStore();
  const [answer, setAnswer] = useState<'yes' | 'no' | null>(null);
  const { plans } = state.profile;
  const known = plans.some((p) => p.when.toLowerCase() === plan.when.toLowerCase());
  if (known && answer !== 'yes') return null;
  if (answer === 'no') return null;
  if (answer === 'yes') {
    const look = lookForPlan(plan); // the look for this plan, now first in Curated picks
    return (
      <>
        <p className={s.remembered}>
          <Icon name="check" size={16} />
          Saved to Your plans: {plan.what} · {plan.when}
        </p>
        {look && <LookLink look={look} label={planTag(plan)} />}
      </>
    );
  }
  return (
    <div className={s.remember}>
      <p>
        Want me to remember <b>{plan.what} · {plan.when}</b>? I’ll keep your picks ready for it.
      </p>
      <div className={s.rememberBtns}>
        <button
          className={s.rememberYes}
          onClick={() => {
            dispatch({ type: 'profile', patch: { plans: [...plans, plan] } });
            setAnswer('yes');
          }}
        >
          Remember it
        </button>
        <button className={s.rememberNo} onClick={() => setAnswer('no')}>
          No thanks
        </button>
      </div>
    </div>
  );
}

/** The conversation starts here: after check-in the stylist asks
 *  "You're checked in. Anything coming up I should dress you for?"
 *  Tap an idea, then when → it's saved to Your plans, and the stylist answers with a look
 *  for it right away (curation on the fly). The look also moves to the front of Curated picks.
 *  Skip it ("Nothing planned") and the picks stay as they are: they follow your interests.
 *  (iOS: the first message in the chat after the gate scan.) */
const WHEN_CHIPS = ['Tomorrow', 'Saturday', 'Next week', 'This month'];
function Arrival() {
  const { state, dispatch } = useStore();
  const [what, setWhat] = useState<string | null>(null);
  if (state.plansAsked) return null; // answered: the exchange now lives in the conversation
  const finish = (p: Plan | null) => {
    dispatch({ type: 'arrival', plan: p });
    setWhat(null); // forget the half-answer, so a cleared chat starts completely fresh
  };
  const [lead, bold] = arrivalQuestion(state.chatRestarted).split(/(coming up I should dress you for)/);
  return (
    <div className={s.arrival}>
      <StylistMessage>
        {lead}
        <b>{bold}</b>?
      </StylistMessage>
      {!what && (
        <div className={s.answers}>
          {PLAN_IDEAS.slice(0, 5).map((idea) => (
            <button key={idea} className={s.answer} onClick={() => setWhat(idea)}>
              {idea}
            </button>
          ))}
          <button className={`${s.answer} ${s.answerQuiet}`} onClick={() => finish(null)}>
            Nothing planned
          </button>
        </div>
      )}
      {what && <p className={s.user}>{what}</p>}
      {what && (
        <>
          <StylistMessage>When is it?</StylistMessage>
          <div className={s.answers}>
            {WHEN_CHIPS.map((w) => (
              <button key={w} className={s.answer} onClick={() => finish({ what, when: w })}>
                {w}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** A link card to a whole curated look, inside the chat:
 *  [photo]  For your wedding next week
 *           Office to after-work
 *           Shop the look →
 *  Tap → the look's page (the chat closes; the stylist button brings it back). */
function LookLink({ look, label }: { look: Look; label?: string }) {
  const { go } = useStore();
  return (
    <button className={s.lookLink} onClick={() => go({ type: 'push', screen: `look:${look.id}` })}>
      <span className={s.lookThumb}>
        <PhotoSlot cover kind="fabric" photo={lookHero(look)} label="" />
      </span>
      <span className={s.lookText}>
        <span className={s.lookEyebrow}>{label ?? `Curated look · ${look.items.length} pieces`}</span>
        <b>{look.title}</b>
        <span className={s.lookCta}>
          Shop the look <Icon name="arrowRight" size={14} />
        </span>
      </span>
    </button>
  );
}

/** the first piece of the stylist's latest suggestion (what "Try on with Hologram" sends) */
function lastPiece(thread: ChatLine[]) {
  return [...thread].reverse().find((l) => l.productIds?.length)?.productIds?.[0];
}
