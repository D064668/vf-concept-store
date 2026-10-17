import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import '@/styles/tokens.css';
import './globals.css';

// Poppins is the stand-in for SAP "72" until the licensed files arrive
// (HANDOFF §4.2). The font files live in src/fonts so the app works offline
// and the iOS developer can bundle the same files.
const poppins = localFont({
  variable: '--font-poppins',
  display: 'swap',
  src: [
    { path: '../fonts/poppins-latin-300-normal.woff2', weight: '300' },
    { path: '../fonts/poppins-latin-400-normal.woff2', weight: '400' },
    { path: '../fonts/poppins-latin-500-normal.woff2', weight: '500' },
    { path: '../fonts/poppins-latin-600-normal.woff2', weight: '600' },
    { path: '../fonts/poppins-latin-700-normal.woff2', weight: '700' },
  ],
});
// Archivo Narrow: the embroidered monogram only.
const archivo = localFont({
  variable: '--font-archivo-narrow',
  display: 'swap',
  src: [
    { path: '../fonts/archivo-narrow-latin-600-normal.woff2', weight: '600' },
    { path: '../fonts/archivo-narrow-latin-700-normal.woff2', weight: '700' },
  ],
});

export const metadata: Metadata = {
  title: 'S·Fashion',
  description: 'Your personal stylist in the S·Fashion store. SAP × VF Corporation.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover', // lets the app use the full screen; safe areas are handled in CSS
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F5F2' },
    { media: '(prefers-color-scheme: dark)', color: '#121614' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${archivo.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
