// filters.ts — applies the global filters (set in the filter sheet) to a list of pieces.
import { isPersonalisable, type Product } from './catalog';
import type { Filters } from '@/state/store';
export { isPersonalisable };

/** Sizes: clothes sizes (XS–XL) only narrow clothes, shoe sizes (40–45) only narrow shoes,
 *  and one-size bags always pass. So "M + 42" shows M clothes and 42 shoes. */
function sizeOk(p: Product, sizes: string[]) {
  const mine = sizes.filter((z) => p.sizes.includes(z) || (p.sizes.length > 1 && sameSystem(p.sizes, z)));
  const anyInSystem = sizes.some((z) => sameSystem(p.sizes, z));
  if (p.sizes.length === 1 || !anyInSystem) return true;
  return mine.some((z) => p.sizes.includes(z) && !p.soldOut?.includes(z));
}
const sameSystem = (list: string[], z: string) => /^\d+$/.test(z) === /^\d+$/.test(list[0]);

export function applyFilters(list: Product[], f: Filters): Product[] {
  return list.filter(
    (p) =>
      (!f.categories.length || f.categories.includes(p.category)) &&
      (!f.brands.length || f.brands.includes(p.brand)) &&
      (!f.colours.length || f.colours.includes(p.colorName)) &&
      sizeOk(p, f.sizes) &&
      (!f.newIn || !!p.isNew) &&
      (!f.personalisable || isPersonalisable(p))
  );
}
