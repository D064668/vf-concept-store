'use client';
// SizeGuideSheet.tsx — the size guide, for the kind of piece you're looking at
// (Hyun, build 0.7, structure from RE/DONE's guide).
// Opened by "Size guide →" above the sizes. It picks the right table by category:
// jackets (chest, sleeve, shoulder), tops (chest, length, sleeve), shoes (EU, UK, US, foot).
// Your fit row (M, or 42) is marked in gold. Then "How to measure".
// It opens ON TOP of the piece's sheet, so closing it takes you straight back.
// iOS: a second .sheet (medium/large detents) with a Grid table.
import { BottomSheet } from '@/components/Sheet';
import { CUSTOMER, SIZE_GUIDES, type Category } from '@/data/catalog';
import { useStore } from '@/state/store';
import s from './SizeGuideSheet.module.css';

export function SizeGuideSheet({ category }: { category: Category }) {
  const { dispatch } = useStore();
  const guide = SIZE_GUIDES[category];
  if (!guide) return null;
  // the size your fit profile says, for this kind of piece
  const yours = category === 'Footwear' ? CUSTOMER.shoeSize : CUSTOMER.fitSize;
  return (
    <BottomSheet title="Size guide" subtitle={guide.title} closeIcon="close" onClose={() => dispatch({ type: 'sizeGuide', category: null })}>
      <div className={s.body}>
        <p className={s.note}>{guide.note}</p>

        <table className={s.table}>
          <caption className="sr-only">{guide.title} sizes, in centimetres</caption>
          <thead>
            <tr>
              {guide.columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {guide.rows.map((r) => (
              <tr key={r[0]} className={r[0] === yours ? s.yours : undefined}>
                {r.map((cell, i) =>
                  i === 0 ? (
                    <th key={i} scope="row">
                      {cell}
                      {r[0] === yours && <span className={s.yourTag}>Your fit</span>}
                    </th>
                  ) : (
                    <td key={i} className="num">
                      {cell}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {category !== 'Footwear' && <p className={s.unit}>All measurements in cm.</p>}

        <h3 className={s.howTitle}>How to measure</h3>
        <ul className={s.how}>
          {guide.howTo.map((h) => (
            <li key={h.name}>
              <b>{h.name}</b>: {h.how}
            </li>
          ))}
        </ul>
      </div>
    </BottomSheet>
  );
}
