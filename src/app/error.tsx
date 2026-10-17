'use client';
// error.tsx — if something in the app breaks, show a calm "Reload" screen instead of
// the browser's blank "Application error" page. It also reloads by itself once when
// the preview was updated while it was open (old files no longer match the new build).
import { useEffect } from 'react';

export default function AppError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
    // a newer version was published while this page was open → load it once, automatically
    const stale = /ChunkLoadError|Loading chunk|Failed to fetch dynamically imported module/i.test(`${error?.name} ${error?.message}`);
    try {
      if (stale && !sessionStorage.getItem('sf-reloaded')) {
        sessionStorage.setItem('sf-reloaded', '1');
        window.location.reload();
      }
    } catch {}
  }, [error]);

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'grid',
        placeItems: 'center',
        padding: 32,
        textAlign: 'center',
        fontFamily: 'var(--font-brand), system-ui, sans-serif',
        background: 'var(--canvas, #F6F5F2)',
        color: 'var(--ink, #1A1A1A)',
      }}
    >
      <div>
        <p style={{ font: '600 18px/24px inherit', marginBottom: 8 }}>Something went wrong</p>
        <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 20 }}>Reload to start the app again.</p>
        {/* the technical reason, small, so a screenshot tells us what broke */}
        <p style={{ fontSize: 11, opacity: 0.45, marginBottom: 20, maxWidth: 320, wordBreak: 'break-word' }}>{String(error?.message ?? error).slice(0, 240)}</p>
        <button
          onClick={() => {
            reset();
            window.location.reload();
          }}
          style={{ height: 48, padding: '0 24px', borderRadius: 999, background: 'var(--primary, #3D6B5A)', color: 'var(--on-primary, #fff)', fontWeight: 600 }}
        >
          Reload
        </button>
      </div>
    </div>
  );
}
