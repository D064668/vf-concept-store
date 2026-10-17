// stitching.ts — where a personalised piece is, from "paid" to "ready in the vault".
// ------------------------------------------------------------------
// Demo clock (Hyun: show the embroidery's status until it's finished, with times).
// The real Tajima cell reports its own progress; here the whole run takes about a
// minute so it can be shown in a meeting, and the clock on screen reads like store time:
//
//   step            real seconds after paying   store time
//   Paid            0                           14:20
//   On the hoop     5                           14:22
//   Stitching       10 → 45 (0 → 100%)          14:24
//   Quality check   45                          14:38
//   Ready in vault  55                          14:41
//
// iOS: the same steps come from the order status API (push updates); show them in a
//      List with a ProgressView on the stitching step.
// ------------------------------------------------------------------
import { CUSTOMER } from '@/data/catalog';

/** when each step starts, in real seconds after paying, and in store minutes after paying */
const STEPS = [
  { key: 'paid', label: 'Paid', at: 0, minute: 0 },
  { key: 'hoop', label: 'On the hoop', at: 5, minute: 2 },
  { key: 'stitch', label: 'Stitching', at: 10, minute: 4 },
  { key: 'check', label: 'Quality check', at: 45, minute: 18 },
  { key: 'ready', label: 'Ready in the vault', at: 55, minute: 21 },
] as const;
export type StepKey = (typeof STEPS)[number]['key'];

/** how long the demo run takes (ms), from paying to ready */
export const STITCH_RUN_MS = STEPS[STEPS.length - 1].at * 1000;
/** the embroidery's size, for "3,970 of 6,200 stitches" */
export const STITCH_COUNT = 6200;
/** store time when you paid: 18 minutes after check-in (sample) */
const PAID_MINUTE_OF_DAY = (() => {
  const [h, m] = CUSTOMER.checkInTime.split(':').map(Number);
  return h * 60 + m + 18;
})();

const clock = (minuteOfDay: number) => `${String(Math.floor(minuteOfDay / 60) % 24).padStart(2, '0')}:${String(Math.round(minuteOfDay) % 60).padStart(2, '0')}`;

export interface StitchStep {
  key: StepKey;
  label: string;
  /** done, happening now, or still to come */
  state: 'done' | 'now' | 'next';
  /** "14:22", "since 14:24" or "about 14:38" */
  time: string;
}

/** Everything the tracker shows, worked out from how long ago you paid */
export function stitchStatus(paidAt: number, now: number, finished: boolean) {
  const sec = finished ? Infinity : Math.max(0, (now - paidAt) / 1000);
  const current = finished ? STEPS.length - 1 : STEPS.reduce((i, st, n) => (sec >= st.at ? n : i), 0);
  const stitch = STEPS[2];
  const check = STEPS[3];
  // stitching progress 0 → 1 between the stitching and quality-check steps
  const progress = Math.min(1, Math.max(0, (sec - stitch.at) / (check.at - stitch.at)));
  // "Paid" is a moment, not a stage: it's always done, and the next step is the one in progress
  const active = Math.max(1, current);
  const steps: StitchStep[] = STEPS.map((st, n) => {
    const t = clock(PAID_MINUTE_OF_DAY + st.minute);
    const state = n < active || (finished && n === active) ? 'done' : n === active ? 'now' : 'next';
    const started = sec >= st.at; // the step in progress may not have started yet (on its way to the hoop)
    const time = state === 'done' ? t : state === 'now' ? (started && n !== STEPS.length - 1 ? `since ${t}` : `about ${t}`) : `about ${t}`;
    return { key: st.key, label: st.label, state, time };
  });
  return {
    steps,
    current: STEPS[current].key,
    progress,
    stitches: Math.round(progress * STITCH_COUNT),
    readyAt: clock(PAID_MINUTE_OF_DAY + STEPS[STEPS.length - 1].minute),
  };
}
