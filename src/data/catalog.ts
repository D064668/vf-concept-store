// catalog.ts
// ------------------------------------------------------------------
// All the content the app shows, in one place.
// Brands and photos are real (from VF-Dev/brands and VF-Dev/photos).
// Product NAMES, colour names and prices are SAMPLE data for the demo:
// check them against the brands' own catalogues before showing outside
// the team. Prices are sample numbers until SAP commerce data is connected.
// iOS: this maps 1:1 to a `Catalog` struct / JSON fixture.
// ------------------------------------------------------------------
import type { BrandId } from '@/components/BrandLogo';

export type Category = 'Outerwear' | 'Tops' | 'Footwear' | 'Bags';
export type Filter = 'All' | Category;
export type Size = string;

/** One photo of a product. `packshot` = product alone on a plain background */
export interface Photo {
  src: string;
  packshot?: boolean;
  /** the photo's backdrop colour. Packshots sit on it; model photos with a `bg`
   *  are shown whole ("studio"), standing in the frame with room above the head */
  bg?: string;
  /** focus point for model photos, e.g. '50% 20%' keeps the face and chest */
  focus?: string;
}

export interface Product {
  id: string;
  brand: BrandId;
  brandName: string;
  name: string;
  category: Category;
  colorName: string;
  /** swatch colour for the product (sampled from the photos) */
  color: string;
  /** every colour this piece comes in (dots on the product page); defaults to just `color` */
  colors?: { name: string; color: string }[];
  /** price in euros (sample) */
  amount: number;
  /** the same, ready to show: "€330" */
  price: string;
  photos: Photo[];
  sizes: Size[];
  pick?: boolean;
  isNew?: boolean;
  fabric?: string;
  /** Sizes that are out of stock (none yet; the UI supports it, HANDOFF §7) */
  soldOut?: Size[];
}

/** "€330". Sample prices (Hyun: "could be random"); the real ones come from SAP commerce. */
export const eur = (n: number) => `€${n.toLocaleString('en-IE')}`;
/** embroidery at the Tajima cell, per piece (sample) */
export const PERSONALISATION_PRICE = 25;
export const APPAREL_SIZES: Size[] = ['XS', 'S', 'M', 'L', 'XL'];
export const SHOE_SIZES: Size[] = ['40', '41', '42', '43', '44', '45'];
export const ONE_SIZE: Size[] = ['One size'];

/* ------------------------------------------------------------------
 * Size guides, one per kind of piece (Hyun, build 0.7, from RE/DONE's guide).
 * The Size guide link on a piece opens the right one for its category.
 * Sample measurements in cm — the real ones come from each brand via SAP.
 * ------------------------------------------------------------------ */
export interface SizeGuide {
  title: string;
  /** one or two lines about the fit */
  note: string;
  columns: string[];
  /** first cell is the size; it must match the size buttons (XS…XL, 40…45) */
  rows: string[][];
  howTo: { name: string; how: string }[];
}
export const SIZE_GUIDES: Partial<Record<Category, SizeGuide>> = {
  Outerwear: {
    title: 'Jackets & coats',
    note: 'Cut with room for a layer underneath. Between sizes? Take the larger one for a fleece or thick knit.',
    columns: ['Size', 'Chest', 'Sleeve', 'Shoulder'],
    rows: [
      ['XS', '92', '62', '44'],
      ['S', '98', '63', '46'],
      ['M', '104', '64', '48'],
      ['L', '110', '65', '50'],
      ['XL', '116', '66', '52'],
    ],
    howTo: [
      { name: 'Chest', how: 'around the fullest part of your chest, arms relaxed at your sides.' },
      { name: 'Sleeve', how: 'from the top of your shoulder to your wrist, arm slightly bent.' },
      { name: 'Shoulder', how: 'across your back, from one shoulder seam to the other.' },
    ],
  },
  Tops: {
    title: 'Tops & base layers',
    note: 'Merino sits close to the skin to keep you warm. Size up for a relaxed fit.',
    columns: ['Size', 'Chest', 'Length', 'Sleeve'],
    rows: [
      ['XS', '88', '66', '61'],
      ['S', '94', '68', '62'],
      ['M', '100', '70', '63'],
      ['L', '106', '72', '64'],
      ['XL', '112', '74', '65'],
    ],
    howTo: [
      { name: 'Chest', how: 'around the fullest part of your chest, arms relaxed at your sides.' },
      { name: 'Length', how: 'from the highest point of the shoulder down to the hem.' },
      { name: 'Sleeve', how: 'from the top of your shoulder to your wrist.' },
    ],
  },
  Footwear: {
    title: 'Shoes',
    note: 'EU sizes. Trail shoes have a roomy toe box; if you’re between sizes, take the larger one.',
    columns: ['EU', 'UK', 'US', 'Foot (cm)'],
    rows: [
      ['40', '6.5', '7', '25.0'],
      ['41', '7.5', '8', '25.7'],
      ['42', '8', '8.5', '26.3'],
      ['43', '9', '9.5', '27.0'],
      ['44', '9.5', '10', '27.6'],
      ['45', '10.5', '11', '28.3'],
    ],
    howTo: [
      { name: 'Foot length', how: 'stand on a sheet of paper, mark your heel and longest toe, and measure between the marks.' },
      { name: 'Best time', how: 'measure in the evening, when your feet are at their largest.' },
    ],
  },
};
/** Sizes shown in the filter sheet */
export const SIZES = APPAREL_SIZES;

const ph = (name: string, o: Omit<Photo, 'src'> = {}): Photo => ({ src: `/photos/${name}.webp`, ...o });
const pack = (name: string, bg = '#FFFFFF') => ph(name, { packshot: true, bg });
/** a model on a plain studio backdrop: shown whole, never cropped at the head */
const model = (name: string, bg: string) => ph(name, { bg });

export const PRODUCTS: Product[] = [
  {
    id: 'tnf-mountain', brand: 'the-north-face', brandName: 'The North Face', name: 'Mountain Jacket', category: 'Outerwear',
    colorName: 'Taupe Green', color: '#5E6150', amount: 330, price: eur(330), pick: true, fabric: 'Waterproof shell', sizes: APPAREL_SIZES, soldOut: ['XL'],
    photos: [model('northface01', '#EFEFEF'), model('northface02', '#EFEFEF'), model('northface03', '#EFEFEF'), model('northface04', '#EFEFEF')],
  },
  {
    id: 'napapijri-puffer', brand: 'napapijri', brandName: 'Napapijri', name: 'Hooded Puffer Jacket', category: 'Outerwear',
    colorName: 'Black', color: '#1F2021', amount: 260, price: eur(260), isNew: true, sizes: APPAREL_SIZES, soldOut: ['XS'],
    photos: [model('napapijri01', '#F0F1EE'), model('napapijri02', '#F0F1EE'), model('napapijri03', '#F0F1EE'), ph('napapijri04')],
  },
  {
    id: 'icebreaker-tee', brand: 'icebreaker', brandName: 'Icebreaker', name: 'Merino Graphic Tee', category: 'Tops',
    colorName: 'Rust', color: '#B5583B', amount: 75, price: eur(75), fabric: 'Merino wool', sizes: APPAREL_SIZES,
    photos: [pack('icebreaker01'), model('icebreaker02', '#FFFFFF'), model('icebreaker03', '#FFFFFF')],
  },
  {
    id: 'smartwool-crew', brand: 'smartwool', brandName: 'Smartwool', name: 'Merino Base Layer Crew', category: 'Tops',
    colorName: 'Berry', color: '#A2405E', amount: 95, price: eur(95), fabric: 'Merino wool', sizes: APPAREL_SIZES, soldOut: ['L'],
    photos: [pack('smartwool03'), model('smartwool02', '#FFFFFF'), model('smartwool04', '#FFFFFF')],
  },
  {
    id: 'altra-trail', brand: 'altra', brandName: 'Altra', name: 'Trail Running Shoe', category: 'Footwear',
    colorName: 'Black / Orange', color: '#E8642C', amount: 150, price: eur(150), isNew: true, sizes: SHOE_SIZES, soldOut: ['45'],
    photos: [pack('altra01', '#000000'), pack('altra03', '#000000'), pack('altra02', '#000000')],
  },
  {
    id: 'timberland-boot', brand: 'timberland', brandName: 'Timberland', name: '6-Inch Premium Boot', category: 'Footwear',
    colorName: 'Dark Brown', color: '#5B4330', amount: 220, price: eur(220), sizes: SHOE_SIZES, soldOut: ['40', '44'],
    photos: [pack('timberland01', '#F1F1F1'), pack('timberland02', '#F1F1F1'), pack('timberland03', '#F1F1F1')],
  },
  {
    id: 'vans-oldskool', brand: 'vans', brandName: 'Vans', name: 'Old Skool', category: 'Footwear',
    colorName: 'Black / White', color: '#1A1A1A', amount: 85, price: eur(85), sizes: SHOE_SIZES,
    photos: [pack('vans01', '#E9E5E1'), pack('vans02', '#E7E5E1'), ph('vans04'), model('vans03', '#E6E2DA')],
  },
  {
    id: 'eastpak-day', brand: 'eastpak', brandName: 'Eastpak', name: 'Day Backpack', category: 'Bags',
    colorName: 'Black', color: '#1C1C1C', amount: 60, price: eur(60), sizes: ONE_SIZE,
    photos: [pack('eastpak01'), model('eastpak02', '#FFFFFF'), pack('eastpak03')],
  },
  {
    id: 'jansport-superbreak', brand: 'jansport', brandName: 'JanSport', name: 'SuperBreak Backpack', category: 'Bags',
    colorName: 'Moss Green', color: '#5E6E4E', amount: 45, price: eur(45), sizes: ONE_SIZE,
    photos: [pack('jansport01'), model('jansport02', '#FFFFFF'), pack('jansport03')],
  },
  {
    id: 'kipling-art', brand: 'kipling', brandName: 'Kipling', name: 'Art Tote', category: 'Bags',
    colorName: 'Olive', color: '#5F6248', amount: 110, price: eur(110), sizes: ONE_SIZE,
    photos: [pack('kipling01'), model('kipling02', '#ECEEF0'), model('kipling03', '#ECEEF0')],
  },
];

export const byId = (id: string) => PRODUCTS.find((p) => p.id === id)!;

export const FILTERS: Filter[] = ['All', 'Outerwear', 'Tops', 'Footwear', 'Bags'];

/** The ten VF brands in the store, for the filter sheet and search */
/** The client's brand order (VF feedback): wherever logos or brand names are
 *  listed together, they appear in exactly this order. */
export const BRAND_ORDER: BrandId[] = ['vans', 'the-north-face', 'timberland', 'altra', 'eastpak', 'icebreaker', 'jansport', 'kipling', 'napapijri', 'smartwool'];
export const brandName = (id: BrandId) => PRODUCTS.find((p) => p.brand === id)!.brandName;
export const BRANDS: { id: BrandId; name: string }[] = BRAND_ORDER.map((id) => ({ id, name: brandName(id) }));
/** sort any list of brands into the client's order */
export const byBrandOrder = (a: BrandId, b: BrandId) => BRAND_ORDER.indexOf(a) - BRAND_ORDER.indexOf(b);

/** The customer (placeholder, HANDOFF §7: first name in greetings) */
export const CUSTOMER = {
  firstName: 'Hyun',
  fullName: 'Hyun Lee',
  email: 'funhyun1@gmail.com', // placeholder: comes from the member account
  initials: 'HL',
  fitSize: 'M' as Size,
  shoeSize: '42' as Size,
  checkInTime: '14:02', // comes from the entrance gate scan
};

/* ------------------------------------------------------------------
 * The member profile: "What your stylist knows" (Hyun, build 0.7).
 *   • Your style: everyday words a shopper would pick for themselves
 *   • Interests: what you love doing. Every curated look belongs to one
 *     interest, so the looks you see follow what you love.
 * ------------------------------------------------------------------ */
export type Interest = 'hiking' | 'running' | 'travel' | 'office' | 'skate' | 'camping' | 'cycling';
export const INTERESTS: { id: Interest; label: string; because: string }[] = [
  { id: 'hiking', label: 'Hiking', because: 'Because you love hiking' },
  { id: 'running', label: 'Running', because: 'Because you love running' },
  { id: 'travel', label: 'Travel', because: 'Because you love to travel' },
  { id: 'office', label: 'Office days', because: 'For your office days' },
  { id: 'skate', label: 'Skate', because: 'Because you love to skate' },
  { id: 'camping', label: 'Camping', because: 'Because you love camping' },
  { id: 'cycling', label: 'Cycling', because: 'Because you love cycling' },
];
export const interestById = (id: Interest) => INTERESTS.find((i) => i.id === id)!;
export const STYLES = ['Outdoorsy', 'Sporty', 'Casual', 'Smart casual', 'Streetwear', 'Minimal'];
/** what Hyun's profile says when the demo starts */
/** Your plans: one-time things coming up (a trip, an event). Unlike interests, they end.
 *  The demo starts with NO plans: the stylist asks on arrival ("Anything coming up I should
 *  dress you for?"). Until you answer, the curated picks follow your interests (the default).
 *  Once you tell it a plan, the look for that plan jumps to the front (see lookForPlan). */
export interface Plan {
  what: string;
  when: string;
}
/** quick picks when adding a plan */
// only plans these brands can dress: outdoor, travel and everyday (no suits or formal wear)
export const PLAN_IDEAS = ['Mountain weekend', 'Business trip', 'Team offsite', 'Ski trip', 'Race day', 'City break'];
export const PLAN_WHENS = ['This weekend', 'Next week', 'This month'];
export const DEFAULT_PROFILE = {
  styles: ['Outdoorsy', 'Casual'],
  interests: ['hiking', 'running', 'travel'] as Interest[],
  stylistName: '',
  plans: [] as Plan[], // nothing yet: the stylist asks on arrival
};
/** longest name you can give your stylist (so it fits every title) */
export const STYLIST_NAME_MAX = 20;

/** Which look fits a plan? (Demo: simple keyword matching; the real agent understands any wording.)
 *  Returns undefined when nothing fits, and then the picks stay as they are. */
const PLAN_LOOKS: [RegExp, string][] = [
  [/ski|snow/i, 'cold-hike'],
  [/mountain|hik|trail|camp|weekend away/i, 'mountain'],
  [/offsite/i, 'offsite'],
  [/business|work|conference|meeting/i, 'carry-on'],
  [/wedding|gala|black tie|formal/i, 'city-weekend'], // no formal wear here: a look for the trip around it
  [/evening|dinner|party/i, 'commute'],
  [/race|run/i, 'run'],
  [/city|trip|travel|holiday/i, 'city-weekend'],
];
export const lookForPlan = (plan?: Plan) => {
  const id = plan && PLAN_LOOKS.find(([re]) => re.test(plan.what))?.[1];
  return id ? LOOKS.find((l) => l.id === id) : undefined;
};
/** Plans these brands can't fully dress (no suits or formal wear): the stylist says so, honestly */
export const isFormal = (plan?: Plan) => !!plan && /wedding|gala|black tie|formal/i.test(plan.what);
/** the tag on the plan's look: "For your mountain weekend on Saturday",
 *  or for a wedding "For the trip to your wedding next week" (we dress the trip, not the ceremony) */
export const planTag = (plan: Plan) => (isFormal(plan) ? `For the trip to your ${planWords(plan)}` : `For your ${planWords(plan)}`);
/** "mountain weekend this weekend", "wedding on Friday" — a plan, said in a sentence */
const DAYS = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i;
export const planWords = (plan: Plan) => `${plan.what.toLowerCase()} ${DAYS.test(plan.when) ? `on ${plan.when}` : plan.when.toLowerCase()}`;

/** "hiking, running and travel" */
export const listWords = (w: string[]) => (w.length < 2 ? w.join('') : `${w.slice(0, -1).join(', ')} and ${w[w.length - 1]}`);

/** The size the stylist pre-selects for a piece, from the fit profile */
export const fitFor = (p: Product): Size => (p.category === 'Footwear' ? CUSTOMER.shoeSize : p.category === 'Bags' ? 'One size' : CUSTOMER.fitSize);

/** Embroidery needs a chest, sleeve or back: jackets and tops only */
export const isPersonalisable = (p: Product) => p.category === 'Outerwear' || p.category === 'Tops';

/** What the stylist says about each piece. Every pick shows WHY (HANDOFF §7). */
export const STYLIST_NOTES: Record<string, { lead: string; bold: string; tail: string }> = {
  'tnf-mountain': { lead: 'You love hiking, so this is ', bold: 'the shell I’d choose', tail: ' for your next trail.' },
  'napapijri-puffer': { lead: 'For the ', bold: 'coldest evenings', tail: ' in town, a warm hooded puffer.' },
  'smartwool-crew': { lead: 'Wear it ', bold: 'under the jacket', tail: '. Merino keeps you warm while you move.' },
  'altra-trail': { lead: 'For rocky, muddy paths: ', bold: 'built for the trail', tail: '.' },
  'jansport-superbreak': { lead: 'It ', bold: 'carries the rest', tail: ' of your weekend kit.' },
  'timberland-boot': { lead: 'For colder days in town: ', bold: 'a classic boot', tail: ' that goes with everything.' },
  'vans-oldskool': { lead: 'For ', bold: 'city days', tail: ', with almost anything.' },
  'icebreaker-tee': { lead: 'An ', bold: 'easy everyday layer', tail: ' in merino.' },
  'kipling-art': { lead: 'A ', bold: 'weekend carry-all', tail: ' that folds flat in your bag.' },
  'eastpak-day': { lead: 'A ', bold: 'clean everyday backpack', tail: ' for city days.' },
};
/** The stylist's line on a piece. If it leads the look for your plan, it says so:
 *  "For your mountain weekend this weekend: this is the one piece I'd choose for it." */
export function noteFor(productId: string, plan?: Plan) {
  if (plan && !isFormal(plan) && lookForPlan(plan)?.heroProductId === productId)
    return { lead: 'For your ', bold: planWords(plan), tail: ': this is the one piece I’d choose for it.' };
  return STYLIST_NOTES[productId] ?? DEFAULT_NOTE;
}
export const DEFAULT_NOTE = { lead: 'Want me to check how this works ', bold: 'with your pick', tail: '? Just ask below.' };

/* Shop carousel: since build 0.7 it shows looksFor(interests).featured (see Shop.tsx) */

/** Home: the stylist's three looks */
export const HOME_LOOKS = [
  { id: 'l1', productId: 'tnf-mountain', lookId: 'mountain', title: 'Weekend in the mountains', items: 'Jacket · base layer · trail shoes · backpack', photo: 'northface01', focus: '50% 25%', tone: 'dark' as const, action: 'look' as const, cta: 'Shop the look' },
  { id: 'l2', productId: 'kipling-art', lookId: 'offsite', title: 'The team offsite', items: 'Base layer · boots · weekend tote', photo: 'kipling02', focus: '30% 40%', tone: 'light' as const, action: 'look' as const, cta: 'Shop the look' },
  { id: 'l3', productId: 'napapijri-puffer', lookId: 'commute', title: 'Office to after-work', items: 'Puffer · merino tee · Old Skool · day backpack', photo: 'vans03', focus: '50% 30%', tone: 'light' as const, action: 'look' as const, cta: 'Shop the look' },
];

/** Curated LOOKS: a whole outfit, not one piece (Hyun, build 0.5).
 *  The customers are SAP employees, so the looks follow their week:
 *  a weekend away, the commute, the team offsite, a sporty Sunday.
 *  (Store screens like the Hologram live in My Visit, not here.)
 *  `role` is the label on each thumbnail ("Outer layer", "Shoes"…).
 *  Pants and accessories join each look once their photos land in VF-Dev/photos:
 *  add the product above, then add one line to `items` here. */
export type LookRole = 'Outer layer' | 'Top' | 'Base layer' | 'Bottoms' | 'Shoes' | 'Bag' | 'Accessory';
export interface Look {
  id: string;
  title: string;
  /** one short line under the title */
  occasion: string;
  /** the stylist's reason, with one bold phrase */
  note: { lead: string; bold: string; tail: string };
  /** what the stylist says instead when this look is for one of YOUR interests
   *  (it talks to you: "you love hiking, so…"). Optional: falls back to `note`. */
  personal?: { lead: string; bold: string; tail: string };
  /** the short editorial under "In this look": how to wear it, what to pack, how to wear it again */
  story?: { wear: string; pack: string; again: string };
  /** hero photo: a product photo by file name */
  hero: string;
  heroProductId: string;
  /** the interest this look is for: it decides who sees it first */
  interest: Interest;
  items: { productId: string; role: LookRole }[];
}
export const LOOKS: Look[] = [
  {
    id: 'mountain',
    interest: 'hiking',
    title: 'Weekend in the mountains',
    occasion: 'For a weekend on the trail',
    note: { lead: 'Warm underneath, waterproof on top, and ', bold: 'built for the trail', tail: '. Everything packs into the backpack.' },
    personal: { lead: 'You love hiking, so this is ', bold: 'the one for your next trail', tail: '. Warm underneath, waterproof on top, and it all packs into the backpack.' },
    story: {
      wear: 'Start with the merino crew next to skin. Zip the shell over it when the wind picks up, and open the vents on the climb.',
      pack: 'The backpack takes a spare layer, water and lunch. The shell packs down small when the sun comes out.',
      again: 'Back in town, the shell works over a tee, and the trail shoes are fine for a long walk with friends.',
    },
    hero: 'northface01',
    heroProductId: 'tnf-mountain',
    items: [
      { productId: 'tnf-mountain', role: 'Outer layer' },
      { productId: 'smartwool-crew', role: 'Base layer' },
      { productId: 'altra-trail', role: 'Shoes' },
      { productId: 'jansport-superbreak', role: 'Bag' },
    ],
  },
  {
    id: 'commute',
    interest: 'office',
    title: 'Office to after-work',
    occasion: 'For the walk in, and the evening out',
    note: { lead: 'A warm puffer over an easy merino tee: ', bold: 'smart enough for the office', tail: ', relaxed enough for after.' },
    personal: { lead: 'For your office days: ', bold: 'smart enough for the meeting', tail: ', relaxed enough for after, and the backpack carries the laptop.' },
    story: {
      wear: 'Wear the merino tee on its own at your desk. The puffer goes on for the walk in and comes off at the door.',
      pack: 'The day backpack fits a laptop, a charger and a book, with room for the puffer when you don\'t need it.',
      again: 'After work, keep the tee and Old Skools and leave the backpack at the office. It reads as a relaxed evening look.',
    },
    hero: 'napapijri02',
    heroProductId: 'napapijri-puffer',
    items: [
      { productId: 'napapijri-puffer', role: 'Outer layer' },
      { productId: 'icebreaker-tee', role: 'Top' },
      { productId: 'vans-oldskool', role: 'Shoes' },
      { productId: 'eastpak-day', role: 'Bag' },
    ],
  },
  {
    id: 'offsite',
    interest: 'travel',
    title: 'The team offsite',
    occasion: 'Two days away with the team',
    note: { lead: 'One tote for two days, and boots that ', bold: 'handle the walk and the dinner', tail: '.' },
    personal: { lead: 'You love to travel, so I kept it light: ', bold: 'one tote for two days away', tail: ', and boots for the walk and the dinner.' },
    story: {
      wear: 'The merino crew works for the workshop and the dinner. Roll the sleeves for the day, wear them down at night.',
      pack: 'One tote holds two days: a second top, a wash bag and a notebook. The boots are the only shoes you need.',
      again: 'The crew and boots go straight into a weekend look with jeans. The tote becomes your everyday bag.',
    },
    hero: 'kipling02',
    heroProductId: 'kipling-art',
    items: [
      { productId: 'smartwool-crew', role: 'Top' },
      { productId: 'timberland-boot', role: 'Shoes' },
      { productId: 'kipling-art', role: 'Bag' },
    ],
  },
  {
    id: 'run',
    interest: 'running',
    title: 'Sunday run club',
    occasion: 'For a sporty weekend',
    note: { lead: 'A merino tee that ', bold: 'stays fresh after the run', tail: ', trail shoes with grip, and a backpack for the change of clothes.' },
    personal: { lead: 'Made for your next run club: ', bold: 'merino that stays fresh after the run', tail: ', trail shoes with grip, and room for a change of clothes.' },
    story: {
      wear: 'The merino tee keeps you warm at the start and dry by the end. Trail shoes give grip on wet paths in the park.',
      pack: 'The backpack carries a change of top, keys and a bottle, so you can go straight for coffee after.',
      again: 'On rest days the tee is just a good tee. Wear it under a jacket, and keep the shoes for weekend walks.',
    },
    hero: 'icebreaker02',
    heroProductId: 'icebreaker-tee',
    items: [
      { productId: 'icebreaker-tee', role: 'Top' },
      { productId: 'altra-trail', role: 'Shoes' },
      { productId: 'eastpak-day', role: 'Bag' },
    ],
  },
  /* ---- more looks for each interest (build 0.7): Curated picks shows one per interest
     in the slider, and these in a "More for hiking / running / travel" row below.
     Built from pieces already in store; photos get swapped as new ones arrive. ---- */
  {
    id: 'cold-hike',
    interest: 'hiking',
    title: 'Cold-morning hike',
    occasion: 'For an early start above the clouds',
    note: { lead: 'A puffer for the cold start, merino underneath, and ', bold: 'boots that keep your feet dry', tail: ' when the path turns muddy.' },
    personal: { lead: 'For the hikes that start before sunrise: ', bold: 'warm at the top, dry underfoot', tail: '. Your next early trail is covered.' },
    story: {
      wear: 'Layer the merino under the puffer for the cold start. Take the puffer off once you warm up, and keep the crew on.',
      pack: 'Strap the puffer to the backpack when you\'re moving, with a flask and gloves inside.',
      again: 'The puffer and boots are your winter-in-town look too. Swap the backpack for a tote.',
    },
    hero: 'napapijri01',
    heroProductId: 'napapijri-puffer',
    items: [
      { productId: 'napapijri-puffer', role: 'Outer layer' },
      { productId: 'smartwool-crew', role: 'Base layer' },
      { productId: 'timberland-boot', role: 'Shoes' },
      { productId: 'jansport-superbreak', role: 'Bag' },
    ],
  },
  {
    id: 'rainy-trail',
    interest: 'hiking',
    title: 'Rainy trail day',
    occasion: 'When the forecast says maybe',
    note: { lead: 'The shell keeps the rain out, the tee ', bold: 'dries fast if it gets in', tail: ', and the trail shoes grip on wet rock.' },
    personal: { lead: 'You hike in all weather, so this one is ', bold: 'ready for a wet trail', tail: '. The shell keeps rain out and the tee dries fast.' },
    story: {
      wear: 'The shell goes over the merino tee. Pull the hood up and close the cuffs, and the rain stays outside.',
      pack: 'The day backpack carries a dry top for the car and a snack. Keep it light so you can move.',
      again: 'On a dry day the shell is a light jacket over anything, and the trail shoes double as city sneakers.',
    },
    hero: 'northface03',
    heroProductId: 'tnf-mountain',
    items: [
      { productId: 'tnf-mountain', role: 'Outer layer' },
      { productId: 'icebreaker-tee', role: 'Top' },
      { productId: 'altra-trail', role: 'Shoes' },
      { productId: 'eastpak-day', role: 'Bag' },
    ],
  },
  {
    id: 'run-commute',
    interest: 'running',
    title: 'Run to work',
    occasion: 'Run in, change, start the day',
    note: { lead: 'Run in with ', bold: 'your work clothes in the backpack', tail: '. The merino tee stays fresh until you change.' },
    personal: { lead: 'You love running, so why not run in? ', bold: 'Your work clothes ride in the backpack', tail: ', and the merino stays fresh till you change.' },
    story: {
      wear: 'Run in the merino tee and trail shoes. It handles the run and still feels fresh when you arrive.',
      pack: 'Your work clothes go in the backpack, rolled, not folded, so they don\'t crease.',
      again: 'The tee and backpack work for the gym too. Keep the shoes by the door for the next run-in.',
    },
    hero: 'eastpak02',
    heroProductId: 'eastpak-day',
    items: [
      { productId: 'icebreaker-tee', role: 'Top' },
      { productId: 'altra-trail', role: 'Shoes' },
      { productId: 'eastpak-day', role: 'Bag' },
    ],
  },
  {
    id: 'recovery',
    interest: 'running',
    title: 'Easy recovery day',
    occasion: 'For the day after the long run',
    note: { lead: 'Soft merino, easy shoes and ', bold: 'nothing that asks anything of you', tail: '. Rest is part of training.' },
    personal: { lead: 'Every runner needs this one: ', bold: 'soft, easy and nothing to think about', tail: ' on the day after your long run.' },
    story: {
      wear: 'Soft merino and easy shoes, nothing tight. Wear the crew loose over leggings or relaxed trousers.',
      pack: 'The tote carries a water bottle, a book and a foam roller if you\'re heading to stretch.',
      again: 'The crew is warm enough for an evening out, and the Old Skools go with everything.',
    },
    hero: 'smartwool02',
    heroProductId: 'smartwool-crew',
    items: [
      { productId: 'smartwool-crew', role: 'Top' },
      { productId: 'vans-oldskool', role: 'Shoes' },
      { productId: 'kipling-art', role: 'Bag' },
    ],
  },
  {
    id: 'city-weekend',
    interest: 'travel',
    title: 'City weekend',
    occasion: 'Two days of walking and good food',
    note: { lead: 'Shoes for walking all day, a tote for what you find, and ', bold: 'a puffer for the evening', tail: '.' },
    personal: { lead: 'For your next city trip: ', bold: 'shoes for walking all day', tail: ', a tote for what you find, and a puffer for the evening.' },
    story: {
      wear: 'Start the day in the tee and Old Skools. Add the puffer at night, when the city gets cold.',
      pack: 'The tote takes what you find: a book, a coffee bag, a new tee. It folds flat in your suitcase.',
      again: 'Every piece works at home too. The puffer and Old Skools are an easy everyday pair.',
    },
    hero: 'kipling03',
    heroProductId: 'kipling-art',
    items: [
      { productId: 'napapijri-puffer', role: 'Outer layer' },
      { productId: 'icebreaker-tee', role: 'Top' },
      { productId: 'vans-oldskool', role: 'Shoes' },
      { productId: 'kipling-art', role: 'Bag' },
    ],
  },
  {
    id: 'carry-on',
    interest: 'travel',
    title: 'Carry-on only',
    occasion: 'Everything fits under the seat',
    note: { lead: 'One backpack, ', bold: 'merino you can wear two days running', tail: ', and boots you wear on the plane.' },
    personal: { lead: 'You love to travel, so pack less: ', bold: 'everything fits under the seat', tail: ', and the boots are the ones you wear on the plane.' },
    story: {
      wear: 'Wear the boots and the merino crew on the plane: they\'re your heaviest pieces, so they\'re not in the bag.',
      pack: 'The backpack fits under the seat. Roll a second top, underwear and a wash bag, and you\'re done.',
      again: 'Merino can be worn two days running without washing. It\'s the most useful top in your wardrobe.',
    },
    hero: 'jansport02',
    heroProductId: 'jansport-superbreak',
    items: [
      { productId: 'smartwool-crew', role: 'Top' },
      { productId: 'timberland-boot', role: 'Shoes' },
      { productId: 'jansport-superbreak', role: 'Bag' },
    ],
  },
  {
    id: 'skate',
    interest: 'skate',
    title: 'Skate park afternoon',
    occasion: 'For a few hours on the board',
    note: { lead: 'Old Skools for grip and feel, a tee that ', bold: 'moves with you', tail: ', and a backpack for the board.' },
    personal: { lead: 'For your next session at the park: ', bold: 'Old Skools for grip and feel', tail: ', and a backpack that carries the board.' },
    story: {
      wear: 'The tee moves with you, and the Old Skools give grip and board feel. Keep it loose and easy.',
      pack: 'The backpack carries water and a spare tee, and its straps hold the board on the way there.',
      again: 'Off the board, the Old Skools and tee are a weekend uniform. The backpack goes to class or work.',
    },
    hero: 'vans03',
    heroProductId: 'vans-oldskool',
    items: [
      { productId: 'icebreaker-tee', role: 'Top' },
      { productId: 'vans-oldskool', role: 'Shoes' },
      { productId: 'eastpak-day', role: 'Bag' },
    ],
  },
];
export const lookById = (id: string) => LOOKS.find((l) => l.id === id) ?? LOOKS[0];
/** the photo used as a look's hero (the product's own photo, so it keeps its backdrop) */
export const lookHero = (l: Look) => {
  const p = byId(l.heroProductId);
  return p.photos.find((ph) => ph.src.includes(l.hero)) ?? p.photos[0];
};

/** Curated picks screen (HANDOFF §6 · 07) */
export const TODAY_PICK = {
  productId: 'tnf-mountain',
  meta: 'Taupe Green · Size M · In store now',
  reason: 'A shell that layers over everything you pack for the trail.',
};
export const GOES_WITH = [
  { productId: 'smartwool-crew', why: 'Berry · wear it underneath' },
  { productId: 'altra-trail', why: 'Black / Orange · for the trail' },
  { productId: 'jansport-superbreak', why: 'Moss Green · carries the rest' },
];
export const EARLIER_PICKS = [
  { productId: 'icebreaker-tee', why: 'Rust · an easy everyday layer', when: 'Last visit' },
  { productId: 'vans-oldskool', why: 'Black / White · city days', when: 'Last visit' },
  { productId: 'kipling-art', why: 'Olive · weekend carry-all', when: 'Earlier' },
  { productId: 'timberland-boot', why: 'Dark Brown · for colder days', when: 'Earlier' },
];

/** Personalise (HANDOFF §6 · 02) */
export type ThreadId = 'gold' | 'ecru' | 'forest' | 'obsidian';
export type PlacementId = 'chest' | 'sleeve' | 'back';
export type MotifId = 'monogram' | 'sprig' | 'line';

export const THREADS: { id: ThreadId; name: string; color: string }[] = [
  { id: 'gold', name: 'Champagne gold', color: 'var(--thread-gold)' },
  { id: 'ecru', name: 'Raw ecru', color: 'var(--thread-ecru)' },
  { id: 'forest', name: 'Botanical forest', color: 'var(--thread-forest)' },
  { id: 'obsidian', name: 'Obsidian', color: 'var(--thread-obsidian)' },
];
export const PLACEMENTS: { id: PlacementId; name: string; mm: number }[] = [
  { id: 'chest', name: 'Left chest', mm: 28 },
  { id: 'sleeve', name: 'Sleeve', mm: 18 },
  { id: 'back', name: 'Center back', mm: 22 },
];
export const MOTIFS: { id: MotifId; name: string }[] = [
  { id: 'monogram', name: 'Monogram' },
  { id: 'sprig', name: 'Botanical sprig' },
  { id: 'line', name: 'Line' },
];

/** Monogram rule (HANDOFF §7): uppercase, max 5, letters, digits and "·" */
export const cleanMonogram = (v: string) =>
  v.toUpperCase().replace(/[.•]/g, '·').replace(/[^A-Z0-9·]/g, '').slice(0, 5);

/** The photo for a small thumbnail: the product on its own (packshot) when there is one */
export const thumbFor = (p: Product) => p.photos.find((ph) => ph.packshot) ?? p.photos[0];

/** "Product details" (the accordion on a look's page): the material and tech of each piece.
 *  SAMPLE data written from the photos and product names. In the real app every row comes
 *  from SAP's product master (material composition, technology, care, product ID, SKU). */
export interface Tech {
  type: string;
  material: string;
  technology: string;
  fit: string;
  care: string;
  productId: string;
  sku: string;
}
export const TECH: Record<string, Tech> = {
  'tnf-mountain': { type: 'Jacket', material: '100% recycled nylon face, polyester lining', technology: 'Waterproof, breathable 2-layer shell; taped seams', fit: 'Relaxed, room for a layer', care: 'Machine wash 30°C, re-proof after washing', productId: '100000001', sku: 'TNF-MTJ-TAUPEGRN-M' },
  'napapijri-puffer': { type: 'Jacket', material: '100% recycled polyester shell, recycled fill', technology: 'Insulated, quilted baffles; water-repellent finish', fit: 'Boxy', care: 'Machine wash 30°C, tumble dry low', productId: '100000002', sku: 'NAP-HPJ-BLACK-M' },
  'icebreaker-tee': { type: 'T-shirt', material: '100% merino wool, 150 g/m²', technology: 'Breathable, odour-resistant, temperature-regulating', fit: 'Regular', care: 'Machine wash 30°C, dry flat', productId: '100000003', sku: 'ICB-MGT-RUST-M' },
  'smartwool-crew': { type: 'Base layer', material: '100% merino wool, 250 g/m²', technology: 'Warm when wet, quick-drying, odour-resistant', fit: 'Slim, made to layer', care: 'Machine wash 30°C, dry flat', productId: '100000004', sku: 'SMW-MBC-BERRY-M' },
  'altra-trail': { type: 'Trail shoe', material: 'Engineered mesh upper, rubber outsole', technology: 'Wide toe box, cushioned midsole, lugged grip', fit: 'True to size (EU)', care: 'Hand wash, air dry', productId: '100000005', sku: 'ALT-TRS-BLKORG-42' },
  'timberland-boot': { type: 'Boot', material: 'Waterproof full-grain leather, rubber lug sole', technology: 'Seam-sealed waterproof build, padded collar', fit: 'True to size (EU)', care: 'Brush clean, leather balm', productId: '100000006', sku: 'TBL-6IN-DKBRN-42' },
  'vans-oldskool': { type: 'Sneaker', material: 'Canvas and suede upper, rubber waffle sole', technology: 'Vulcanised construction, padded collar', fit: 'True to size (EU)', care: 'Spot clean', productId: '100000007', sku: 'VNS-OSK-BLKWHT-42' },
  'eastpak-day': { type: 'Backpack', material: 'Recycled polyester', technology: 'Padded laptop sleeve (15"), water-repellent coating', fit: '24 L', care: 'Spot clean', productId: '100000008', sku: 'EPK-DAY-BLACK-OS' },
  'jansport-superbreak': { type: 'Backpack', material: '100% recycled polyester', technology: 'Large main compartment, side bottle pocket', fit: '26 L', care: 'Spot clean', productId: '100000009', sku: 'JSP-SBK-MOSS-OS' },
  'kipling-art': { type: 'Tote', material: 'Recycled nylon', technology: 'Zip-top, folds flat, light (0.6 kg)', fit: '26 L', care: 'Spot clean', productId: '100000010', sku: 'KPL-ART-OLIVE-OS' },
};

/** "About this piece" in the product detail. SAMPLE copy written from the photos:
 *  replace with the brands' own product descriptions (SAP commerce data). */
export const ABOUT: Record<string, { about: string; details: string[] }> = {
  'tnf-mountain': { about: 'A waterproof mountain shell with a roomy hood that fits over a beanie or helmet. Built to sit over warm layers on cold, wet days.', details: ['Waterproof, breathable shell', 'Adjustable hood and cuffs', 'Two hand pockets, one chest pocket', 'Relaxed fit: room for a layer underneath'] },
  'napapijri-puffer': { about: 'A warm, boxy hooded puffer for the coldest days in town. The quilted baffles hold the heat without the bulk.', details: ['Insulated, quilted body', 'Fixed hood', 'Zip and snap front', 'Boxy fit'] },
  'icebreaker-tee': { about: 'A soft merino tee with a hand-drawn graphic. Merino stays fresh for days and keeps you comfortable warm or cool.', details: ['Merino wool', 'Crew neck, short sleeves', 'Regular fit'] },
  'smartwool-crew': { about: 'A fitted merino base layer that keeps you warm while you move and dries quickly. Wear it alone or under a shell.', details: ['Merino wool base layer', 'Crew neck, long sleeves', 'Slim fit, made to layer'] },
  'altra-trail': { about: 'A cushioned trail shoe with a wide toe box and grippy outsole for rocky, muddy paths.', details: ['Wide, foot-shaped toe box', 'Cushioned midsole', 'Lugged trail outsole'] },
  'timberland-boot': { about: 'The classic six-inch boot in waterproof leather, with a padded collar and a lug sole that handles city and trail.', details: ['Waterproof leather', 'Padded collar', 'Lug rubber sole'] },
  'vans-oldskool': { about: 'The low-top skate shoe with the side stripe. Canvas and suede upper, padded collar, waffle sole.', details: ['Canvas and suede upper', 'Padded collar', 'Waffle rubber sole'] },
  'eastpak-day': { about: 'A clean, everyday backpack with a padded laptop sleeve and one big main compartment.', details: ['Padded laptop sleeve', 'Front zip pocket', 'Padded shoulder straps'] },
  'jansport-superbreak': { about: 'The everyday backpack that carries everything: one big compartment, a front pocket and a side bottle pocket.', details: ['Large main compartment', 'Front utility pocket', 'Side water-bottle pocket'] },
  'kipling-art': { about: 'A roomy, light tote for weekends away, with a zip top and the Kipling monkey charm.', details: ['Zip-top main compartment', 'Inside pockets', 'Shoulder and hand straps'] },
};

/** The looks, split by your interests: the ones for what you love come first
 *  (in the order you listed your interests), then everything else.
 *  `featured`: the slider — the first look for each interest (up to 3), topped up if needed.
 *  `more`: for each interest, its other looks (not in the slider).
 *  `rest`: looks for things outside your interests ("Something different"). */
export function looksFor(interests: Interest[], plan?: Plan) {
  const planLook = lookForPlan(plan); // the look for your next plan (if you told the stylist one)
  const forYou = LOOKS.filter((l) => interests.includes(l.interest)).sort((a, b) => interests.indexOf(a.interest) - interests.indexOf(b.interest));
  const rest = LOOKS.filter((l) => !interests.includes(l.interest));
  const firsts = interests.map((i) => forYou.find((l) => l.interest === i)).filter((l): l is Look => !!l);
  // the slider: your plan's look first (if any), then one look per interest
  const featured = [...(planLook ? [planLook] : []), ...firsts, ...forYou, ...rest].filter((l, n, all) => all.indexOf(l) === n).slice(0, 3);
  const more = interests
    .map((i) => ({ interest: i, looks: forYou.filter((l) => l.interest === i && !featured.includes(l)) }))
    .filter((g) => g.looks.length);
  return { forYou, rest: rest.filter((l) => !featured.includes(l)), featured, more, planLook };
}
