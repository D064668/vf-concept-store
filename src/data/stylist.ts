// stylist.ts — what the search does with what you type or say.
// ------------------------------------------------------------------
// The prototype has no AI connected yet, so the stylist's answers here
// are DEMO answers chosen by simple keywords. They only use pieces that
// are in the catalogue, and never promise stock, prices or orders.
// In the real app this file is replaced by a call to the stylist agent.
// ------------------------------------------------------------------
import { GOES_WITH, PRODUCTS, type Plan, type Product } from './catalog';

/** Starter questions shown when the search opens */
export const ASK_PILLS = ['What should I wear on Saturday?', 'Something warmer', 'What’s new today?', 'Show me boots'];

/** Example questions that take turns inside the chat's message field */
export const CHAT_HINTS = ['Tell me what you’re after…', 'Try “A jacket for the rain”', 'Try “I’ve got a wedding next week”', 'Try “Show me boots”'];

/** Hints that rotate inside the empty field */
export const SEARCH_HINTS = ['Search brands, styles, sizes…', 'Try “a jacket for rain”', 'Try “what goes with my pick?”', 'Try “Vans in 42”'];

/** Demo: the question the microphone "hears" */
export const VOICE_DEMO = 'What should I wear on Saturday?';

/** Pieces whose name, colour or type matches the words typed */
export function matchProducts(q: string): Product[] {
  const words = q.toLowerCase().split(/\s+/).filter((w) => w.length > 1);
  if (!words.length) return [];
  const alias: Record<string, string> = { green: 'green', jacket: 'outerwear', coat: 'outerwear', puffer: 'puffer', shoe: 'footwear', shoes: 'footwear', sneaker: 'footwear', sneakers: 'footwear', boot: 'boot', boots: 'boot', bag: 'bags', backpack: 'backpack', tote: 'tote', top: 'tops', 't-shirt': 'tee', merino: 'merino', brown: 'brown', tnf: 'north face' };
  return PRODUCTS.filter((p) => {
    const hay = `${p.brandName} ${p.name} ${p.colorName} ${p.category}`.toLowerCase();
    return words.every((w) => hay.includes(w) || (alias[w] && hay.includes(alias[w])) || /^(m|in|a|for|the|size|xs|s|l|xl|\d{2})$/.test(w));
  });
}

export interface StylistReply {
  text: string;
  bold?: string;
  productIds: string[];
  followUps: string[];
}

/** Demo replies by intent. Order matters: the first match wins. */
export function stylistReply(q: string): StylistReply {
  const t = q.toLowerCase();
  // formal events: these brands don't make suits, so the stylist is honest and dresses the trip
  if (/wedding|gala|black tie|formal|suit\b/.test(t))
    return {
      text: 'We don’t carry suits or formal wear here. For the trip there and the days around it, I’d pack the puffer, a merino tee and the Old Skools.',
      bold: 'the trip there and the days around it',
      productIds: ['napapijri-puffer', 'icebreaker-tee', 'vans-oldskool'],
      followUps: ['Show me bags', 'Something warmer'],
    };
  if (/dinner|party|offsite|meeting|interview|conference|event/.test(t))
    return {
      text: 'For an occasion, keep it smart and warm: the merino crew under the Napapijri puffer, with the Timberland boots for the walk there.',
      bold: 'smart and warm',
      productIds: ['smartwool-crew', 'napapijri-puffer', 'timberland-boot'],
      followUps: ['Something warmer', 'Show me bags'],
    };
  if (/saturday|weekend|mountain|wear|occasion|trip|hike|style a look|outfit/.test(t))
    return {
      text: 'For the mountains I’d layer the Smartwool base layer under The North Face jacket, with the Altra trail shoes.',
      bold: 'the Smartwool base layer under The North Face jacket',
      productIds: ['tnf-mountain', 'smartwool-crew', 'altra-trail'],
      followUps: ['Try on with Hologram', 'Something warmer'],
    };
  if (/warm|cold|rain|wet|weather|outer|jacket|layer|puffer/.test(t))
    return {
      text: 'For colder evenings, the Napapijri puffer is the warmest piece in store. The North Face shell is best for wind and rain.',
      bold: 'the Napapijri puffer',
      productIds: ['napapijri-puffer', 'tnf-mountain'],
      followUps: ['What goes with my pick?', 'Show me boots'],
    };
  if (/boot|shoe|sneaker|footwear/.test(t))
    return {
      text: 'Three pairs in your size: trail shoes for Saturday, boots for town, and Old Skools for every day.',
      bold: 'in your size',
      productIds: ['altra-trail', 'timberland-boot', 'vans-oldskool'],
      followUps: ['What goes with my pick?', 'Show me bags'],
    };
  if (/bag|backpack|tote|carry/.test(t))
    return {
      text: 'For a weekend away, the JanSport carries the most. The Kipling tote is the one for the train.',
      bold: 'the JanSport carries the most',
      productIds: ['jansport-superbreak', 'kipling-art', 'eastpak-day'],
      followUps: ['What should I wear on Saturday?', 'What’s new today?'],
    };
  if (/new|latest|today|arriv/.test(t)) {
    const fresh = PRODUCTS.filter((p) => p.isNew).map((p) => p.id);
    return { text: 'Two pieces arrived in store this week.', bold: 'Two pieces', productIds: fresh, followUps: ['Something warmer', 'What goes with my pick?'] };
  }
  if (/goes|pair|match|with|pick|combine/.test(t))
    return {
      text: 'These three work with your jacket: one underneath, one for the trail, one to carry the rest.',
      bold: 'your jacket',
      productIds: GOES_WITH.map((g) => g.productId),
      followUps: ['What should I wear on Saturday?', 'Show me boots'],
    };
  if (/fit|size|run small|run large|true to/.test(t))
    return {
      text: 'Your fit profile says M for clothes and EU 42 for shoes. The Mountain Jacket is cut roomy, so M leaves space for a layer underneath.',
      bold: 'M leaves space for a layer underneath',
      productIds: ['tnf-mountain'],
      followUps: ['What goes with my pick?', 'Something warmer'],
    };
  if (/similar|like this|alternative|other option/.test(t))
    return {
      text: 'Two other outer layers in your size: a warmer puffer for town, and the shell for the mountains.',
      bold: 'in your size',
      productIds: ['napapijri-puffer', 'tnf-mountain'],
      followUps: ['What goes with my pick?', 'Show me boots'],
    };
  const found = matchProducts(q);
  if (found.length)
    return { text: `Here’s what I found in the store for “${q}”.`, productIds: found.slice(0, 4).map((p) => p.id), followUps: ['What goes with my pick?', 'Something warmer'] };
  return {
    text: 'I couldn’t find that in the store today. Here are the pieces I’d start with instead.',
    productIds: ['tnf-mountain', 'smartwool-crew'],
    followUps: ['What’s new today?', 'Something warmer'],
  };
}

/** Colours offered in the filter sheet (from the catalogue) */
export const FILTER_COLOURS = Array.from(new Map(PRODUCTS.map((p) => [p.colorName, p.color])).entries()).map(([name, color]) => ({ name, color }));

/** Suggested questions above the stylist sheet's message field, for this piece */
export function piecePills(p: Product): string[] {
  const pills = ['What goes with it?', 'How does it fit?'];
  if (p.category === 'Outerwear' || p.category === 'Tops') pills.push('Something warmer');
  pills.push('Show me similar');
  return pills;
}

/** Example questions that take turns inside the stylist sheet's message field */
export const PIECE_HINTS = ['Ask why I chose it…', 'Try “Is it warm enough?”', 'Try “What goes with it?”', 'Try “Do you have it in L?”'];

/** …and inside the Home message field */
export const HOME_HINTS = ['Or tell me what you need today…', 'Try “A jacket for the rain”', 'Try “What should I wear on Saturday?”', 'Try “Show me boots”'];

/* ------------------------------------------------------------------
 * Plans the stylist hears in a question (Hyun, build 0.7).
 * "I've got a wedding next week" → { what: 'Wedding', when: 'Next week' }.
 * Then it asks "Want me to remember that?" (only if it's not already in Your plans).
 * Demo version: simple keyword matching. The real agent understands any wording.
 * ------------------------------------------------------------------ */
const WHENS: [RegExp, string][] = [
  [/\btonight\b/, 'Tonight'],
  [/\btoday\b/, 'Today'],
  [/\btomorrow\b/, 'Tomorrow'],
  [/\bnext week(end)?\b/, 'Next week'],
  [/\b(this )?weekend\b/, 'This weekend'],
  [/\bnext month\b/, 'Next month'],
  [/\bmonday\b/, 'Monday'],
  [/\btuesday\b/, 'Tuesday'],
  [/\bwednesday\b/, 'Wednesday'],
  [/\bthursday\b/, 'Thursday'],
  [/\bfriday\b/, 'Friday'],
  [/\bsaturday\b/, 'Saturday'],
  [/\bsunday\b/, 'Sunday'],
];
const WHATS: [RegExp, string][] = [
  [/wedding/, 'Wedding'],
  [/offsite/, 'Team offsite'],
  [/ski|snow/, 'Ski trip'],
  [/hik|mountain|trail|camp/, 'Hiking trip'],
  [/race|marathon|run\b|running/, 'Race day'],
  [/business trip|conference|meeting|presentation|interview/, 'Work event'],
  [/dinner|party|date|concert/, 'Evening out'],
  [/trip|travel|holiday|vacation|city break|flight/, 'Trip'],
];
export function detectPlan(q: string): Plan | null {
  const t = q.toLowerCase();
  const when = WHENS.find(([re]) => re.test(t))?.[1];
  if (!when) return null;
  const what = WHATS.find(([re]) => re.test(t))?.[1] ?? 'Day out';
  return { what, when };
}
