// PhotoSlot.tsx — every product or model photo in the app (§5.11).
// Pass `photo` and the real image shows in the same frame and corner radius:
//   • packshots (product alone) sit on their own background colour, so a white
//     studio photo blends into its tile with no visible box
//   • model photos on a plain backdrop (they have a `bg`) are shown whole, with
//     room above the head; other model photos fill the frame on their focus point
//   • `cover` (on by default since build 0.7, heroes AND thumbnails): model photos
//     fill the frame edge to edge (object-fit: cover), kept on the head, so no
//     backdrop edges show. The whole photo is one tap away in the lightbox.
//     Packshots stay whole on their own studio colour. cover={false} = old "whole model" look.
// While a photo loads, or if it fails, the labelled stand-in shows instead.
//
//   kind="garment" : product shot on the warm tile (grid, stage, rails)
//   kind="fabric"  : full-bleed cloth field (model photos, hero slides)
//   kind="store"   : the real store photo, cropped on the hologram
import { useId, useState, type CSSProperties } from 'react';
import { Icon } from './Icon';
import type { Category, Photo } from '@/data/catalog';
import s from './PhotoSlot.module.css';

const DARK_GARMENTS = ['obsidian', 'forest', 'sage-700'];

interface Props {
  kind: 'garment' | 'fabric' | 'store';
  color?: string;
  category?: Category;
  /** what the photo will show, e.g. "Relaxed Studio Overshirt, Botanical Sage" */
  label: string;
  /** short caption printed on the slot; omit to show none */
  caption?: string;
  src?: string;
  /** a real photo from the catalogue */
  photo?: Photo;
  className?: string;
  style?: CSSProperties;
  /** larger, lit composition for the pick sheet stage */
  stage?: boolean;
  /** fill the frame (cover). Default true; false shows a model photo whole on its backdrop */
  cover?: boolean;
}

export function PhotoSlot({ kind, color = 'var(--garment-sage)', category = 'Tops', label, caption, src, photo, className, style, stage, cover = true }: Props) {
  const dark = DARK_GARMENTS.some((d) => color.includes(d));
  const pic = photo ?? (src ? { src } : undefined);
  // remember how each photo did, so a new photo in the same slot starts fresh
  const [status, setStatus] = useState<Record<string, 'ok' | 'error'>>({});
  const state = (pic && status[pic.src]) || 'loading';
  const setState = (v: 'ok' | 'error') => pic && setStatus((m) => (m[pic.src] === v ? m : { ...m, [pic.src]: v }));
  if (pic && state !== 'error') {
    return (
      <div
        className={`${s.slot} ${s.photo} ${pic.packshot ? s.pack : pic.bg && !cover ? s.studio : ''} ${stage ? s.stagePhoto : ''} ${state === 'ok' ? s.loaded : ''} ${className ?? ''}`}
        style={{ ...style, background: pic.bg }}
      >
        <img
          src={pic.src}
          alt={label}
          loading="lazy"
          decoding="async"
          draggable={false}
          // cover: keep the top of the photo (the head) in the frame
          style={{ objectPosition: pic.focus ?? (cover ? '50% 15%' : undefined) }}
          onLoad={() => setState('ok')}
          onError={() => setState('error')}
          ref={(el) => {
            if (el?.complete && el.naturalWidth && state === 'loading') setState('ok');
          }}
        />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Photo placeholder: ${label}`}
      className={`${s.slot} ${s[kind]} ${stage ? s.stage : ''} ${dark ? s.darkCloth : ''} ${className ?? ''}`}
      style={{ ...style, ['--cloth' as string]: color }}
    >
      {kind === 'store' && <img src="/assets/store-interior.jpg" alt="" className={s.storeImg} />}
      {kind === 'garment' && <Garment category={category} />}
      {state === 'error' && <span className={s.caption}>Photo unavailable</span>}
      {caption && (
        <span className={s.caption}>
          <Icon name="photo" size={16} />
          {caption}
        </span>
      )}
    </div>
  );
}

/** A folded garment seen from above, drawn in the garment colour. Decorative. */
function Garment({ category }: { category: Category }) {
  const id = useId().replace(/:/g, '');
  const shade = 'color-mix(in oklab, var(--cloth) 72%, #000)';
  const light = 'color-mix(in oklab, var(--cloth) 82%, #fff)';
  return (
    <svg viewBox="0 0 100 124" className={s.fold} aria-hidden="true">
      <defs>
        <pattern id={`tw${id}`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3" height="3" fill="var(--cloth)" />
          <rect width="1" height="3" fill={light} opacity=".35" />
        </pattern>
        <linearGradient id={`lt${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".18" />
          <stop offset=".55" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".16" />
        </linearGradient>
        <filter id={`sh${id}`} filterUnits="userSpaceOnUse" x="-20" y="-20" width="140" height="170" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#2D4A3E" floodOpacity=".28" />
        </filter>
      </defs>
      <g filter={`url(#sh${id})`}>
        {false ? (
          <>
            <path d="M29 12h42a3 3 0 0 1 3 3v94a3 3 0 0 1-3 3H29a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill={`url(#tw${id})`} />
            <path d="M29 12h42a3 3 0 0 1 3 3v94a3 3 0 0 1-3 3H29a3 3 0 0 1-3-3V15a3 3 0 0 1 3-3z" fill={`url(#lt${id})`} />
            <path d="M26 15a3 3 0 0 1 3-3h42a3 3 0 0 1 3 3v6H26z" fill={shade} opacity=".55" />
            <path d="M50 21v91M26 64h48" stroke={shade} strokeWidth=".8" opacity=".55" fill="none" />
            <path d="M36 12v9M64 12v9" stroke={shade} strokeWidth="1.6" opacity=".5" />
          </>
        ) : (
          <>
            <path
              d="M14 24a5 5 0 0 1 4-5l19-3 13 7 13-7 19 3a5 5 0 0 1 4 5v86a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z"
              fill={`url(#tw${id})`}
            />
            <path
              d="M14 24a5 5 0 0 1 4-5l19-3 13 7 13-7 19 3a5 5 0 0 1 4 5v86a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z"
              fill={`url(#lt${id})`}
            />
            <path d="M27 21v93M73 21v93" stroke={shade} strokeWidth=".7" opacity=".4" />
            {false && (
              <>
                <path d="M37 16l13 7-6 15-10-17z" fill={light} />
                <path d="M63 16l-13 7 6 15 10-17z" fill={light} />
                <path d="M50 23v91" stroke={shade} strokeWidth=".9" opacity=".6" />
                {[48, 64, 80, 96].map((y) => (
                  <circle key={y} cx="52.6" cy={y} r="1.3" fill={shade} opacity=".75" />
                ))}
              </>
            )}
            {category === 'Tops' && <path d="M37 16q13 14 26 0" stroke={shade} strokeWidth="2.6" fill="none" opacity=".45" />}
            {category === 'Outerwear' && (
              <>
                <path d="M33 17q17-12 34 0l-4 15q-13 7-26 0z" fill={shade} opacity=".5" />
                <path d="M50 33v81" stroke={shade} strokeWidth="1.1" opacity=".7" />
                <path d="M30 78l8-4M70 78l-8-4" stroke={shade} strokeWidth="1.2" opacity=".6" strokeLinecap="round" />
              </>
            )}
          </>
        )}
      </g>
    </svg>
  );
}
