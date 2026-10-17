'use client';
// Search.tsx — the global search: one field you can type in, talk to, or ask.
//
//   SearchRow   : [filters]  [ search field ]  [mic / send]   (under the logo)
//   SearchPanel : slides down when the field is tapped:
//                 • empty  → questions for the stylist, quick picks, recent searches
//                 • typing → "Ask your stylist: …" + matching pieces, live
//                 • asked  → a short conversation, with pieces you can open
//   SearchBrain : mounted once; plays the demo stylist and the demo voice input
//
// iOS: .searchable(text:isPresented:) with .searchSuggestions, a custom
// toolbar for the filter + mic buttons, and SFSpeechRecognizer for voice.
import { useEffect, useId, useRef, useState } from 'react';
import { Icon } from './Icon';
import { Sparkle } from './brand';
import { PhotoSlot } from './PhotoSlot';
import { BrandLogo, type BrandId } from './BrandLogo';
import { BRANDS, CUSTOMER, TODAY_PICK, type Product } from '@/data/catalog';
import { ASK_PILLS, detectPlan, matchProducts, SEARCH_HINTS, stylistReply, VOICE_DEMO } from '@/data/stylist';
import { DEVICES, filterCount, handoffSheet, useStore, useStylist, withTransition } from '@/state/store';
import s from './Search.module.css';

const RECENT = ['The North Face', 'Merino base layer'];

/* ------------------------------------------------------------------ */
export function SearchRow() {
  const { state, dispatch, go } = useStore();
  const stylist = useStylist();
  const { open, query, listening } = state.search;
  const input = useRef<HTMLInputElement>(null);
  const fieldId = useId();
  const [hint, setHint] = useState(0);
  const active = filterCount(state.filters);

  // rotate the example hints while the field is empty and closed
  useEffect(() => {
    if (open || query) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setHint((h) => (h + 1) % SEARCH_HINTS.length), 3600);
    return () => clearInterval(t);
  }, [open, query]);

  // when the panel opens from elsewhere (e.g. the Home composer), put the cursor here
  useEffect(() => {
    if (open && !listening && input.current?.offsetParent) input.current.focus({ preventScroll: true });
  }, [open, listening]);

  const close = () => dispatch({ type: 'search', patch: { open: false, listening: false } });
  const submit = () => query.trim() && dispatch({ type: 'ask', text: query.trim() });

  return (
    <div className={s.row}>
      {open ? (
        <button className={s.round} onClick={close} aria-label="Close search">
          <Icon name="close" size={20} />
        </button>
      ) : (
        <button
          className={s.round}
          onClick={() => go({ type: 'sheet', sheet: { kind: 'filters' } })}
          aria-label={active ? `Filters, ${active} on` : 'Filters'}
        >
          <Icon name="sliders" size={20} />
          {active > 0 && (
            <span className={`${s.badge} num`} aria-hidden="true">
              {active}
            </span>
          )}
        </button>
      )}

      <form
        className={`${s.field} ${open ? s.fieldOpen : ''}`}
        role="search"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <Icon name="search" size={18} className={s.glass} />
        <label className="sr-only" htmlFor={fieldId}>
          Search the store or ask {stylist.inline}
        </label>
        <input
          ref={input}
          id={fieldId}
          className={s.input}
          value={query}
          onChange={(e) => dispatch({ type: 'search', patch: { query: e.target.value, open: true } })}
          onFocus={() => !open && dispatch({ type: 'search', patch: { open: true } })}
          onKeyDown={(e) => e.key === 'Escape' && close()}
          autoComplete="off"
          enterKeyHint="search"
          readOnly={listening}
        />
        {!query && (
          <span className={s.hint} aria-hidden="true" key={listening ? 'l' : hint}>
            {listening ? (
              <>
                <span className={s.liveDot} />
                Listening…
              </>
            ) : (
              SEARCH_HINTS[hint]
            )}
          </span>
        )}
      </form>

      {query && !listening ? (
        <button className={`${s.square} ${s.send}`} onClick={submit} aria-label="Send">
          <Icon name="send" size={20} />
        </button>
      ) : (
        <button
          className={`${s.square} ${listening ? s.listening : ''}`}
          onClick={() => dispatch({ type: 'search', patch: { open: true, listening: !listening, query: listening ? '' : query } })}
          aria-label={listening ? 'Stop listening' : `Speak to ${stylist.inline}`}
          aria-pressed={listening}
        >
          {listening ? (
            <span className={s.wave} aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
          ) : (
            <Icon name="mic" size={22} />
          )}
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
export function SearchPanel() {
  const { state, dispatch, go, openPick } = useStore();
  const stylist = useStylist();
  const { open, query, thread } = state.search;
  if (!open) return null;

  // a follow-up like "Try on with Hologram" is an action, not a question:
  // it sends the jacket straight to the hologram (pairing first if needed)
  const ask = (t: string) =>
    t === DEVICES.hologram.action ? go({ type: 'sheet', sheet: handoffSheet(state, 'hologram', TODAY_PICK.productId) }) : dispatch({ type: 'ask', text: t });
  // a brand logo opens that brand's results page: its looks, then all its pieces (Hyun)
  const brand = (id: BrandId) => go({ type: 'push', screen: `brand:${id}` });
  const typed = query.trim();
  const matches = typed ? matchProducts(typed) : [];
  const openPiece = (id: string) => openPick(id);
  const quick = (label: string) => {
    const f = { ...state.filters };
    if (label === `Size ${CUSTOMER.fitSize}`) f.sizes = [CUSTOMER.fitSize];
    if (label === 'New in') f.newIn = true;
    if (label === 'Personalisable') f.personalisable = true;
    if (label === 'Outerwear') f.categories = ['Outerwear'];
    withTransition(() => {
      dispatch({ type: 'filters', filters: f });
      dispatch({ type: 'tab', tab: 'shop' });
    });
  };

  return (
    <>
      <div className={s.scrim} onClick={() => dispatch({ type: 'search', patch: { open: false, listening: false } })} aria-hidden="true" />
      <div className={s.panel} role="region" aria-label={`Search and ask ${stylist.inline}`}>
        {typed ? (
          /* ---- typing: ask + live matches ---- */
          <div className={s.block}>
            <button className={s.askRow} onClick={() => ask(typed)}>
              <span className={s.askIcon}>
                <Sparkle />
              </span>
              <span className={s.askText}>
                Ask {stylist.inline}: <b>“{typed}”</b>
              </span>
              <Icon name="arrowRight" size={18} />
            </button>
            {matches.length > 0 ? (
              <>
                <p className={s.label}>
                  In the store · <span className="num">{matches.length}</span>
                </p>
                <ul className={s.results}>
                  {matches.slice(0, 5).map((p) => (
                    <li key={p.id}>
                      <ResultRow p={p} onOpen={() => openPiece(p.id)} />
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className={s.none}>No pieces match “{typed}”. {stylist.title} can still help.</p>
            )}
          </div>
        ) : (
          /* ---- empty: suggestions ---- */
          <div className={s.block}>
            {thread.length > 0 && (
              // a conversation is going: one tap goes back to it (the chat sheet)
              <button className={s.askRow} onClick={() => go({ type: 'sheet', sheet: { kind: 'chat' } })}>
                <span className={s.askIcon}>
                  <Sparkle />
                </span>
                <span className={s.askText}>
                  Continue with <b>{stylist.inline}</b>
                </span>
                <Icon name="arrowRight" size={18} />
              </button>
            )}
            <p className={s.label}>Ask {stylist.inline}</p>
            <div className={s.pills}>
              {ASK_PILLS.map((q) => (
                <button key={q} className={`${s.pill} ${s.askPill}`} onClick={() => ask(q)}>
                  <Sparkle className={s.pillSpark} />
                  {q}
                </button>
              ))}
            </div>
            <p className={s.label}>Quick picks</p>
            <div className={s.pills}>
              {[`Size ${CUSTOMER.fitSize}`, 'New in', 'Personalisable', 'Outerwear'].map((q) => (
                <button key={q} className={s.pill} onClick={() => quick(q)}>
                  {q}
                </button>
              ))}
            </div>
            <p className={s.label}>Brands in the store</p>
            <div className={s.brands}>
              {BRANDS.map((b) => (
                <button key={b.id} className={s.brand} onClick={() => brand(b.id)} aria-label={`Show ${b.name}`}>
                  <BrandLogo id={b.id} />
                </button>
              ))}
            </div>
            <p className={s.label}>Recent</p>
            <ul className={s.recent}>
              {RECENT.map((r) => (
                <li key={r}>
                  <button onClick={() => dispatch({ type: 'search', patch: { query: r } })}>
                    <Icon name="clock" size={18} />
                    {r}
                  </button>
                </li>
              ))}
            </ul>
            <button className={s.browse} onClick={() => go({ type: 'sheet', sheet: { kind: 'filters' } })}>
              <Icon name="sliders" size={18} />
              Browse by size, colour and type
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function ResultRow({ p, onOpen }: { p: Product; onOpen: () => void }) {
  return (
    <button className={s.result} onClick={onOpen}>
      <span className={s.thumb}>
        <PhotoSlot kind="garment" photo={p.photos[0]} color={p.color} category={p.category} label={`${p.brandName} ${p.name}, ${p.colorName}`} />
      </span>
      <span className={s.resultText}>
        <b>{p.name}</b>
        <span>
          {p.brandName} · {p.colorName}
        </span>
      </span>
      <Icon name="chevron" size={18} />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/** Mounted once in the app. Plays the demo stylist and demo voice input. */
export function SearchBrain() {
  const { state, dispatch } = useStore();
  const { thinking, thread, listening } = state.search;

  // the stylist answers the last question after a short pause
  useEffect(() => {
    if (!thinking) return;
    const q = [...thread].reverse().find((l) => l.role === 'user')?.text ?? '';
    // the answer, plus any plan heard in the question ("…next week") for the stylist to offer to remember
    const t = setTimeout(() => dispatch({ type: 'reply', line: { ...stylistReply(q), plan: detectPlan(q) ?? undefined } }), 950);
    return () => clearTimeout(t);
  }, [thinking, thread, dispatch]);

  // demo voice: the words appear as if spoken, then the question is sent
  useEffect(() => {
    if (!listening) return;
    let i = 0;
    let done: ReturnType<typeof setTimeout>;
    const start = setTimeout(function tick() {
      i += 1;
      dispatch({ type: 'search', patch: { query: VOICE_DEMO.slice(0, i) } });
      if (i < VOICE_DEMO.length) done = setTimeout(tick, 45);
      else done = setTimeout(() => dispatch({ type: 'ask', text: VOICE_DEMO }), 600);
    }, 900);
    return () => {
      clearTimeout(start);
      clearTimeout(done);
    };
  }, [listening, dispatch]);

  return null;
}
