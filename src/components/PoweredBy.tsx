// PoweredBy.tsx — the credit at the foot of the app (Hyun, build 0.7):
//     POWERED BY
//     [SAP] & [VF CORPORATION]
// One component for every place it shows (Home footer, More menu, stylist chat),
// so a change here changes it everywhere. The lockup takes the text colour around
// it (white on the dark Home footer, ink elsewhere); the label is a little quieter.
// The blue SAP logo is no longer used here.
import { SapVfLockup } from './SapVfLockup';
import s from './PoweredBy.module.css';

export function PoweredBy({
  size = 'md',
  align = 'start',
  row,
  className,
}: {
  size?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center';
  /** one line: "POWERED BY  [SAP & VF]", left-aligned and centred top to bottom (the chat) */
  row?: boolean;
  className?: string;
}) {
  return (
    <div className={`${s.wrap} ${s[size]} ${align === 'center' ? s.center : ''} ${row ? s.row : ''} ${className ?? ''}`}>
      <span className={s.label}>Powered by</span>
      <SapVfLockup className={s.lockup} />
    </div>
  );
}
