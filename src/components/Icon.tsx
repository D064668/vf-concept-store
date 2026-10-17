// Icon.tsx — the app's one icon set.
// All icons are drawn on a 24 × 24 grid with a 1.75px rounded stroke, so they
// match each other. Colour follows the text colour (currentColor).
// iOS: swap each for the closest SF Symbol (name in the comment).
import type { SVGProps } from 'react';

const PATHS = {
  home: 'M4 10.5 12 4l8 6.5V20h-5.25v-5.5h-5.5V20H4z', // house
  bag: 'M5.5 8.5h13l-1 11.5h-11zM9 8.5V7a3 3 0 0 1 6 0v1.5', // bag
  store: 'M4 9.5 5.5 5h13L20 9.5M4.5 9.5V20h15V9.5M10 20v-5h4v5M4 9.5c0 1.4 1.1 2.5 2.7 2.5S9.3 10.9 9.3 9.5c0 1.4 1.2 2.5 2.7 2.5s2.7-1.1 2.7-2.5c0 1.4 1.1 2.5 2.6 2.5S20 10.9 20 9.5', // storefront
  hanger: 'M10 6.5a2 2 0 1 1 2.6 1.9c-.4.1-.6.5-.6.9V10m0 0-8.4 6.2c-.8.6-.4 1.8.6 1.8h15.6c1 0 1.4-1.2.6-1.8z', // hanger
  more: '', // three dots, drawn below
  plus: 'M12 5v14M5 12h14', // plus
  mic: 'M12 4a2.75 2.75 0 0 1 2.75 2.75v4.5a2.75 2.75 0 0 1-5.5 0v-4.5A2.75 2.75 0 0 1 12 4zM6.5 11a5.5 5.5 0 0 0 11 0M12 16.5V20', // mic
  send: 'M12 19V5m0 0-5.5 5.5M12 5l5.5 5.5', // arrow.up
  arrowRight: 'M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5', // arrow.right
  back: 'M14.5 5.5 8 12l6.5 6.5', // chevron.left
  down: 'M6 9.5 12 15.5 18 9.5', // chevron.down
  chevron: 'M9.5 6 15.5 12 9.5 18', // chevron.right
  close: 'M6.5 6.5l11 11m0-11-11 11', // xmark
  heart: 'M12 19.5s-7-4.3-7-9.6A3.9 3.9 0 0 1 8.9 6c1.3 0 2.4.6 3.1 1.6.7-1 1.8-1.6 3.1-1.6A3.9 3.9 0 0 1 19 9.9c0 5.3-7 9.6-7 9.6z', // heart
  check: 'M5.5 12.5 10 17l8.5-9.5', // checkmark
  calendar: 'M5 7.5h14V19H5zM5 11h14M9 5v4M15 5v4', // calendar
  needle: 'M18.5 5.5 7 17m11.5-11.5c-1.2-1.2-3-.6-3.2.9l-.2 1.3M5 19l2-2m-1.5-3.5c3-3 9 1.5 6 4.5', // embroidery needle + thread
  table: 'M3.5 9.5h17v3h-17zM6 12.5V19M18 12.5V19M8 6.5h8', // tabletop display
  refresh: 'M19 12a7 7 0 1 1-2.05-4.95M19 5v3.5h-3.5', // arrow.clockwise
  photo: 'M4.5 6.5h15v11h-15zM4.5 15l4-4 3.5 3.5 2.5-2.5 5 4.5M15.5 9.75h.01', // photo
  trash: 'M5.5 7h13M10 7V5h4v2M7 7l.8 12h8.4L17 7', // trash
  hologram: 'M7 3.5h10v17H7zM12 10.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4zM9.3 16.5c0-1.8 1.2-3.2 2.7-3.2s2.7 1.4 2.7 3.2', // person in a display (person.crop.rectangle)
  scan: 'M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16M4 12h16', // qrcode.viewfinder
  link: 'M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1', // link
  phone: 'M8 3.5h8a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-15a1 1 0 0 1 1-1zM10.5 17.5h3', // iphone
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.3 15.3 20 20', // magnifyingglass
  sliders: 'M4 7h9M17 7h3M15 5v4M4 17h3M11 17h9M9 15v4', // slider.horizontal.3
  expand: 'M4.5 9.5v-5h5M19.5 9.5v-5h-5M4.5 14.5v5h5M19.5 14.5v5h-5', // arrow.up.left.and.arrow.down.right
  pin: 'M12 20.5s-6.5-5.8-6.5-10.7a6.5 6.5 0 0 1 13 0c0 4.9-6.5 10.7-6.5 10.7zM12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', // mappin
  lock: 'M6.5 10.5h11V20h-11zM9 10.5V8a3 3 0 0 1 6 0v2.5', // lock
  doc: 'M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12h5M9.5 15.5h5', // doc.text
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 19.5c.4-3 2.6-5 5.5-5s5.1 2 5.5 5M15.5 5.2a3 3 0 0 1 0 5.6M17.5 14.6c1.8.6 2.8 2.3 3 4.9', // person.2
  contrast: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 4v16', // circle.lefthalf.filled
  clock: 'M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM12 8v4l3 2', // clock
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name, size = 22, filled, ...p }: { name: IconName; size?: number; filled?: boolean } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...p}
    >
      {name === 'more' ? (
        <g fill="currentColor" stroke="none">
          <circle cx="6" cy="12" r="1.6" />
          <circle cx="12" cy="12" r="1.6" />
          <circle cx="18" cy="12" r="1.6" />
        </g>
      ) : (
        <path d={PATHS[name]} />
      )}
    </svg>
  );
}
