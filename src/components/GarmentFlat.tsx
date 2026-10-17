// GarmentFlat.tsx — a technical "flat" drawing of the garment being personalised,
// front and back, like the sketches in a fashion tech pack. It is a placement
// guide, not a product photo, so it stays even after real photos arrive.
// The live monogram is drawn on it at the chosen spot, in the chosen thread.
import { useId } from 'react';
import type { MotifId, Product } from '@/data/catalog';

/** Which flat to draw: a hooded shell, a tee, a long-sleeve crew, or a shirt */
export type FlatVariant = 'shell' | 'tee' | 'longsleeve' | 'shirt';
export const flatFor = (p: Product): FlatVariant =>
  p.category === 'Outerwear' ? 'shell' : p.category === 'Tops' ? (/tee/i.test(p.name) ? 'tee' : 'longsleeve') : 'shirt';

const PINS = {
  chest: { x: 197, y: 104, size: 17, rotate: 0 }, // wearer's left chest = viewer's right
  sleeve: { x: 266, y: 178, size: 11, rotate: -102 }, // along the left sleeve, above the cuff
  back: { x: 160, y: 58, size: 14, rotate: 0 }, // center back, under the collar
};
/** Where each placement sits on the drawing. Tees have short sleeves, so the sleeve spot moves up. */
export const pinsFor = (v: FlatVariant) =>
  v === 'tee' ? { ...PINS, sleeve: { x: 253, y: 92, size: 11, rotate: -112 } } : v === 'shell' ? { ...PINS, back: { x: 160, y: 84, size: 14, rotate: 0 } } : PINS;
export const VIEWBOX = { w: 320, h: 300 };

const BODY = 'M98 40 140 30q20 12 40 0l42 10 6 70 2 172q-70 9-140 0l2-172z';
const SLEEVE_L = 'M98 40 60 62 26 226l28 10 38-126z';
const SLEEVE_R = 'M222 40l38 22 34 164-28 10-38-126z';
const TEE_L = 'M98 40 60 62 42 128l32 10 18-36z';
const TEE_R = 'M222 40l38 22 18 66-32 10-18-36z';

export function Embroidery({ text, motif, thread, x, y, size, rotate, raised = true }: {
  text: string; motif: MotifId; thread: string; x: number; y: number; size: number; rotate: number; raised?: boolean;
}) {
  const id = useId().replace(/:/g, '');
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate})`} style={{ transition: 'transform 420ms cubic-bezier(.22,1,.36,1)' }}>
      <defs>
        {/* satin stitch: fine slanted threads catching the light */}
        <pattern id={`st${id}`} width="1.6" height="1.6" patternUnits="userSpaceOnUse" patternTransform="rotate(68)">
          <rect width="1.6" height="1.6" fill={thread} />
          <rect width=".55" height="1.6" fill="#fff" opacity=".32" />
        </pattern>
        <filter id={`rz${id}`} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy=".6" stdDeviation=".5" floodColor="#000" floodOpacity=".45" />
        </filter>
      </defs>
      <g filter={raised ? `url(#rz${id})` : undefined} fill={`url(#st${id})`}>
        {motif === 'sprig' ? (
          <path
            transform={`scale(${size / 16}) translate(-8 -8)`}
            d="M8 16c0-5 .3-9 2-13.5M8 11C5 11 3.2 9.2 3 6.5 5.8 6.6 7.6 8.3 8 11zm.6-3.4c.5-2.6 2.2-4 4.7-4.1-.2 2.6-1.9 4-4.7 4.1z"
            stroke={thread}
            strokeWidth="1.1"
            strokeLinecap="round"
          />
        ) : (
          <text
            textAnchor="middle"
            dominantBaseline="central"
            fontFamily="var(--font-monogram)"
            fontWeight={700}
            fontSize={size}
            letterSpacing={size * 0.06}
          >
            {text}
          </text>
        )}
      </g>
      {motif === 'line' && (
        <path d={`M${-size * 1.2} ${size * 0.72}h${size * 2.4}`} stroke={thread} strokeWidth={Math.max(0.8, size / 14)} strokeDasharray="1.6 1.1" />
      )}
    </g>
  );
}

export function GarmentFlat({ view, color, variant = 'shirt', children }: { view: 'front' | 'back'; color: string; variant?: FlatVariant; children?: React.ReactNode }) {
  const shortSleeve = variant === 'tee';
  const crew = variant === 'tee' || variant === 'longsleeve';
  const shell = variant === 'shell';
  const id = useId().replace(/:/g, '');
  const line = 'color-mix(in oklab, var(--cloth) 55%, #000)';
  return (
    <svg viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`} aria-hidden="true" style={{ ['--cloth' as string]: color, width: '100%', height: '100%', overflow: 'visible' }}>
      <defs>
        <pattern id={`tw${id}`} width="3" height="3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="3" height="3" fill="var(--cloth)" />
          <rect width="1" height="3" fill="#fff" opacity=".09" />
        </pattern>
        <linearGradient id={`lt${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".16" />
          <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".14" />
        </linearGradient>
        <filter id={`sh${id}`} x="-10%" y="-10%" width="120%" height="125%" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#2D4A3E" floodOpacity=".22" />
        </filter>
      </defs>
      <g filter={`url(#sh${id})`} stroke={line} strokeWidth="1.1" strokeLinejoin="round">
        {(shortSleeve ? [TEE_L, TEE_R, BODY] : [SLEEVE_L, SLEEVE_R, BODY]).map((d) => (
          <g key={d}>
            <path d={d} fill={`url(#tw${id})`} />
            <path d={d} fill={`url(#lt${id})`} stroke="none" />
          </g>
        ))}
      </g>
      <g fill="none" stroke={line} strokeWidth=".9" strokeLinecap="round" opacity=".8">
        {/* cuffs or sleeve hems */}
        {shortSleeve ? (
          <path d="M45 120l30 9M275 120l-30 9" strokeDasharray="1.5 2" opacity=".7" />
        ) : (
          <>
            <path d="M30 206l27 9M290 206l-27 9" />
            <path d="M31 210l26 9M289 210l-26 9" strokeDasharray="1.5 2" opacity=".7" />
          </>
        )}
        {/* hem topstitch */}
        <path d="M91 276q69 8 138 0" strokeDasharray="1.5 2" opacity=".7" />
        {crew ? (
          <path d={view === 'front' ? 'M140 30q20 26 40 0' : 'M140 30q20 8 40 0'} strokeWidth="2.6" />
        ) : shell ? (
          view === 'front' ? (
            <>
              {/* hood folded down, centre zip, welt pockets */}
              <path d="M128 36q32-30 64 0l-10 26q-22 10-44 0z" fill="var(--cloth)" />
              <path d="M160 52v232" strokeWidth="1.6" />
              <path d="M112 196l16-8M208 196l-16-8" strokeWidth="1.6" />
            </>
          ) : (
            <>
              <path d="M126 34q34-26 68 0l-6 34q-28 12-56 0z" fill="var(--cloth)" />
              <path d="M160 26v40" strokeDasharray="1.5 2" />
              <path d="M95 104q65 10 130 0" />
            </>
          )
        ) : view === 'front' ? (
          <>
            <path d="M140 30l20 16-12 20-20-24zM180 30l-20 16 12 20 20-24z" fill="var(--cloth)" />
            <path d="M160 46v238M166 66v218" />
            {[84, 118, 152, 186, 220, 254].map((y) => (
              <circle key={y} cx="163" cy={y} r="2" fill={line} stroke="none" />
            ))}
            {/* pocket on the wearer's right */}
            <path d="M110 94h34v42h-34z" />
            <path d="M110 94h34v9h-34z" fill={line} fillOpacity=".08" />
          </>
        ) : (
          <>
            <path d="M140 30q20-6 40 0" strokeWidth="2.2" />
            <path d="M95 76q65 10 130 0" />
            <path d="M95 79q65 10 130 0" strokeDasharray="1.5 2" opacity=".7" />
            <path d="M154 84v40M166 84v40" />
          </>
        )}
      </g>
      {children}
    </svg>
  );
}
