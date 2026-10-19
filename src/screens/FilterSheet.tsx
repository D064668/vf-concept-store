'use client';
// FilterSheet.tsx — the global filters, opened from the filter button left of the search.
// Choices apply in every tab until cleared. The one main button ("See 10 results") shows the live
// number of pieces and takes you to the Shop.
// Brands show as their real logos (from public/brands).
import { useMemo, useState } from 'react';
import { BottomSheet } from '@/components/Sheet';
import { Icon } from '@/components/Icon';
import { Button } from '@/components/ui';
import { BrandLogo } from '@/components/BrandLogo';
import { APPAREL_SIZES, BRANDS, CUSTOMER, FILTERS, PRODUCTS, SHOE_SIZES, type Category } from '@/data/catalog';
import { applyFilters } from '@/data/filters';
import { FILTER_COLOURS } from '@/data/stylist';
import { filterCount, NO_FILTERS, useStore, withTransition, type Filters } from '@/state/store';
import s from './FilterSheet.module.css';

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function FilterSheet() {
  const { state, dispatch, go } = useStore();
  const [f, setF] = useState<Filters>(state.filters);
  const n = useMemo(() => applyFilters(PRODUCTS, f).length, [f]);
  const close = () => go({ type: 'sheet', sheet: null });
  const apply = () =>
    withTransition(() => {
      dispatch({ type: 'filters', filters: f });
      dispatch({ type: 'tab', tab: 'shop' });
    });

  return (
    <BottomSheet
      title="Filters"
      subtitle={filterCount(f) ? `${filterCount(f)} on · they apply everywhere` : 'They apply in every tab'}
      onClose={close}
      closeIcon="close"
      footer={
        <div className={s.foot}>
          <button className={s.clear} onClick={() => setF(NO_FILTERS)} disabled={!filterCount(f)}>
            Clear all
          </button>
          <Button onClick={apply} disabled={n === 0}>
            {n === 0 ? 'No results' : `See ${n} ${n === 1 ? 'result' : 'results'}`}
          </Button>
        </div>
      }
    >
      <div className={s.body}>
        <section>
          <h3>Brand</h3>
          <div className={s.brands} role="group" aria-label="Brand">
            {BRANDS.map((b) => (
              <button key={b.id} className={s.brand} aria-pressed={f.brands.includes(b.id)} aria-label={b.name} onClick={() => setF({ ...f, brands: toggle(f.brands, b.id) })}>
                <BrandLogo id={b.id} />
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3>Size</h3>
          {/* clothes and shoes each get their own row; "your fit" marks the fit profile */}
          {[
            { label: 'Clothing', list: APPAREL_SIZES, fit: CUSTOMER.fitSize },
            { label: 'Shoes · EU', list: SHOE_SIZES, fit: CUSTOMER.shoeSize },
          ].map((row) => (
            <div key={row.label} className={s.sizeRow}>
              <p className={s.sizeLabel}>{row.label}</p>
              <div className={s.sizes} role="group" aria-label={`${row.label} size`} style={{ gridTemplateColumns: `repeat(${row.list.length}, 1fr)` }}>
                {row.list.map((z) => (
                  <button key={z} className={s.chip} aria-pressed={f.sizes.includes(z)} onClick={() => setF({ ...f, sizes: toggle(f.sizes, z) })}>
                    {z}
                    {z === row.fit && <span className={s.fit}>your fit</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section>
          <h3>Colour</h3>
          <div className={s.colours} role="group" aria-label="Colour">
            {FILTER_COLOURS.map((c) => {
              const on = f.colours.includes(c.name);
              return (
                <button key={c.name} className={s.colour} aria-pressed={on} onClick={() => setF({ ...f, colours: toggle(f.colours, c.name) })}>
                  <span className={s.swatch} style={{ background: c.color }}>
                    {on && <Icon name="check" size={16} strokeWidth={2.4} />}
                  </span>
                  {c.name}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          <h3>Type</h3>
          <div className={s.wrap} role="group" aria-label="Type">
            {FILTERS.filter((x) => x !== 'All').map((c) => (
              <button
                key={c}
                className={s.chip}
                aria-pressed={f.categories.includes(c as Category)}
                onClick={() => setF({ ...f, categories: toggle(f.categories, c as Category) })}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section className={s.switches}>
          <Switch label="New in" sub="Arrived in store this week" on={f.newIn} set={(v) => setF({ ...f, newIn: v })} />
          <Switch label="Personalisable" sub="Can be embroidered in the Ricoma studio" on={f.personalisable} set={(v) => setF({ ...f, personalisable: v })} />
        </section>
      </div>
    </BottomSheet>
  );
}

function Switch({ label, sub, on, set }: { label: string; sub: string; on: boolean; set: (v: boolean) => void }) {
  return (
    <button className={s.switchRow} role="switch" aria-checked={on} onClick={() => set(!on)}>
      <span className={s.switchText}>
        <b>{label}</b>
        <span>{sub}</span>
      </span>
      <span className={`${s.switch} ${on ? s.switchOn : ''}`} aria-hidden="true">
        <i />
      </span>
    </button>
  );
}
